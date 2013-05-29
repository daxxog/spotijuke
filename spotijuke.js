/* spotijuke
 * Spotify Jukebox, inspired by play.
 * (c) 2013 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

var sp = require('libspotify'),
    whirlpool = require('whirlpool'),
    Speaker = require('speaker'),
    path = require('path'),
    spawn = require('child_process').spawn,
    fs = require('fs');

var ses = new sp.Session({
    applicationKey: 'spotify_appkey.key'
}),
    login = JSON.parse(fs.readFileSync(path.join(__dirname, 'spotify_login.json')));

var streams = {};

var idToFn = function(id) {
    return 'dump.'+id+'.pcm';
};

var writetmp = function(id) {
    var stream = fs.createWriteStream(idToFn(id));
    
    streams[id] = stream;
    stream.on('finish', function() {
        readtmp(id);
        ev(id);
    });
    
    return stream;
}, readtmp = function(id) {
    streams[id] = fs.createReadStream(idToFn(id));
    
    return streams[id];
};

var ev = {};
ev = function(e, cb) { //run / on event
    if(typeof ev._ == 'undefined') {
        ev._ = {};
    }
    
    if(typeof e == 'string') {
        if(!Array.isArray(ev._[e])) {
            ev._[e] = [];
        }
        
        if(typeof cb == 'function') { //if we have a function
            return ev._[e].push(cb); //push it on the stack
        } else if(cb === 'k') { //if we want to kill an event now
            ev._[e].forEach(function(v, i, a) { // loop and
                delete ev._[e][i];              // kill all events
            });
        } else { //execute event
            ev._[e].forEach(function(v, i, a) { // loop and
                if(typeof v == 'function') { //find functions
                    if(v() === 'k') { //if we should kill this function after running
                        delete ev._[e][i]; //delete the function
                    }
                }
            });
        }
    }
};

ses.once('login', function() {
    var searchQ = 'artist:"Selena Gomez" track:"Come and get it"',
        hash = whirlpool(searchQ);
    
    var _pre_loaded = function() {
        ev(hash, function() {
            var saved = streams[hash],
                speaker = new Speaker();
            
            saved.pipe(speaker);
        });
    };
    
    if(fs.existsSync(idToFn(hash))) {
        console.log('sexy pre-load');
        readtmp(hash);
        _pre_loaded();
        ev(hash);
    } else {
        var search = new sp.Search(searchQ);
        
        search.trackCount = 1; // we're only interested in the first result;
        search.execute();
        
        search.once('ready', function() {
            if(search.tracks.length === 0) {
                console.error('could not find track');
                ses.logout();
            }
    
            var track = search.tracks[0],
                player = ses.getPlayer();
            
            console.log(track);
            
            player.load(track);
            player.play();
    
            var dump = writetmp(hash);
            player.pipe(dump);
            
            console.log('pre-loading "' + track.title + '" by "' + track.artist.name + '"');
            player.once('track-end', function() {
                dump.end();
                player.stop();
                _pre_loaded();
            });
        });
    }
});

ses.login(login.username, login.password);