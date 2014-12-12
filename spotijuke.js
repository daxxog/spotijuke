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
        Spotetrack = require("spotetrack");

    Spotijuke = function(rlist) {
        this.rlist = (typeof rlist == 'string') ? rlist : 'spotedis';
        this.tracks = [];

        this.track('spotify:track:19MMEMJ2nNmq8FCOcmXdID').on('data', function(data) {
            console.log(data);
        });
    };

    Spotijuke.prototype.track = function(uri) {
        var track = new Spotetrack(this.rlist, uri);

        this.tracks.push(track);
        return track;
    };
    
    return Spotijuke;
}));
