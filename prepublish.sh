#!/bin/sh
# Spotijuke / prepublish.sh
# prepublish script for Spotijuke
# (c) 2014 David (daXXog) Volm ><> + + + <><
# Released under Apache License, Version 2.0:
# http://www.apache.org/licenses/LICENSE-2.0.html  
#################################################

if [ ! -f com-npm-install ]; then
	node make
	rm npm-debug.log >> /dev/null
	mv spotijuke.js ../.tmp.js
	mv spotijuke.h ../.tmp.h
else
	rm com-npm-install
fi