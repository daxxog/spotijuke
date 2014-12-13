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
        Spotetrack= require('spotetrack'),
        fstream = require('fstream');

    Spotijuke = function(rlist) {
        this.rlist = (typeof rlist == 'string') ? rlist : 'spotedis';

        Spotetrack(this.rlist, function(track) {
            track('spotify:track:0Sq3fQFSR7RW37gbpJV50r').on('end', function() {
                console.log('loaded track1');
            }).pipe(fstream.Writer('track1.flac'));

            track('spotify:track:6ruBjchMNiaGtNJrHDWmt2').on('end', function() {
                console.log('loaded track2');
            }).pipe(fstream.Writer('track2.flac'));

            track('spotify:track:5kaUGXmXxUxqMTM7gWMIHN').on('end', function() {
                console.log('loaded track3');
            }).pipe(fstream.Writer('track3.flac'));
        });
    };
    
    return Spotijuke;
}));
