/* Spotijuke
 * Spotify Jukebox, inspired by play.
 * (c) 2014 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

/* UMD LOADER: https://github.com/umdjs/umd/blob/master/returnExports.js */
(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals (root is window)
        root.Spotijuke = factory();
  }
}(this, function() {
    var Spotijuke,
        Spotetrack = require("spotetrack"),
        lame = require('lame'),
        fstream = require('fstream');

    Spotijuke = function(rlist) {
        this.rlist = (typeof rlist == 'string') ? rlist : 'spotedis';
        this.tracks = [];

        var encoder1 = new lame.Encoder({
            // input
            channels: 2,        // 2 channels (left and right)
            bitDepth: 16,       // 16-bit samples
            sampleRate: 48000,   // 48,000 Hz sample rate

            // output
            bitRate: 320,
            outSampleRate: 22050,
            mode: lame.STEREO // STEREO (default), JOINTSTEREO, DUALCHANNEL or MONO
        });

        var encoder2 = new lame.Encoder({
            // input
            channels: 2,        // 2 channels (left and right)
            bitDepth: 16,       // 16-bit samples
            sampleRate: 48000,   // 48,000 Hz sample rate

            // output
            bitRate: 320,
            outSampleRate: 22050,
            mode: lame.STEREO // STEREO (default), JOINTSTEREO, DUALCHANNEL or MONO
        });

        var encoder3 = new lame.Encoder({
            // input
            channels: 2,        // 2 channels (left and right)
            bitDepth: 16,       // 16-bit samples
            sampleRate: 48000,   // 48,000 Hz sample rate

            // output
            bitRate: 320,
            outSampleRate: 22050,
            mode: lame.STEREO // STEREO (default), JOINTSTEREO, DUALCHANNEL or MONO
        });

        this.track('spotify:track:0Sq3fQFSR7RW37gbpJV50r').pipe(encoder1).pipe(fstream.Writer('track1.mp3'));
        this.track('spotify:track:6ruBjchMNiaGtNJrHDWmt2').pipe(encoder2).pipe(fstream.Writer('track2.mp3'));
        this.track('spotify:track:5kaUGXmXxUxqMTM7gWMIHN').pipe(encoder3).pipe(fstream.Writer('track3.mp3'));
        //cat track1.pcm | lame --silent -V0 -h -r - \track1.mp3
        //cat track2.pcm | lame --silent -V0 -h -r - \track2.mp3
        //cat dump.pcm | lame --silent -V0 -h -r - \dump.mp3
        //fstream.Reader('track.pcm').pipe(encoder).pipe(fstream.Writer('track.mp3'));
    };

    Spotijuke.prototype.track = function(uri) {
        var track = new Spotetrack(this.rlist, uri);

        this.tracks.push(track);
        return track;
    };
    
    return Spotijuke;
}));
