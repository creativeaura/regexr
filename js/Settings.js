/*
The MIT License (MIT)

Copyright (c) 2014 gskinner.com, inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
(function (scope) {
	"use strict";

	var s = {};

	s.setRating = function(id, value) {
		store.set("r"+id, value);
	};

	s.getRating = function(id) {
		return store.get("r"+id) || 0;
	};

	s.setFavorite = function(id, value) {
		if (value) {
			store.set("f"+id, 1);
		} else {
			store.remove("f"+id);
		}
	};

	s.getFavorite = function(id) {
		return store.get("f"+id) == 1?true:false;
	};

	s.getAllFavorites = function() {
		return s.getAllByType("f");
	};

	s.getAllByType = function(type) {
		var items = [];
		var allPrefs = store.getAll();
		for (var n in allPrefs) {
			if (n.indexOf(type) == 0) {
				items.push(Number(n.substr(1)));
			}
		}
		return items;
	};

	s.setUpdateToken = function(patternID, token) {
		token.localExpire = new Date().getTime() + (1000*60*60*24);
		store.set("s"+patternID, token);
	};

	s.getUpdateToken = function(patternID) {
		return store.get("s"+patternID);
	};

	s.cleanSaveTokens = function() {
		var tokens = s.getAllByType("s");
		var now = new Date().getTime();
		for (var i=0;i<tokens.length;i++) {
			var item = s.getUpdateToken(tokens[i]);
			if (item && item.localExpire < now) {
				store.remove("s"+tokens[i]);
			}
		}
	};

	s.trackVisit = function() {
		var visitCount = store.get("v") || 0;
		store.set("v", ++visitCount);
	};

	s.getVisitCount = function() {
		return store.get("v") || 0;
	};

	scope.Settings = s;

}(window));
