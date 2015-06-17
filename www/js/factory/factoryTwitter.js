
(function() {
    'use strict';

    angular.module('app')
    .factory('twitterService', function($q) {

    	var oauth = null;
    	var callbackUrl = "http://example.com";

    	return{
    		init: function(){
	    		oauth = OAuth({
	                    consumerKey: "eFszoQFkofI8BQegCOBdw", // REPLACE HERE TO YOUR CONSUMER KEY or API KEY
	                    consumerSecret: "8g3zp7n2x3XVx7qUAXyFChgXoksKubn6J4XP57FWy4g", // REPLACE HERE TO YOUR CONSUMER SECRET OR API SECRET
	                    callbackUrl: callbackUrl,
	                    requestTokenUrl: "https://api.twitter.com/oauth/request_token",
	                    authorizationUrl: "https://api.twitter.com/oauth/authorize",
	                    accessTokenUrl: "https://api.twitter.com/oauth/access_token"
	            });
	    	},
	    	isReady: function(){
	    		return oauth;
	    	},
	    	connecTwitter: function(oauth){
	    		oauth.fetchRequestToken(function (url) {
                    console.log("Opening Request Token URL: " + url);
                    showAuthWindow(url,oauth);
                }, function (data) {
                    console.log(JSON.stringify(data));
                });
	    	},
	    	showAuthWindow: function(url,oauth) {
	            var browser = window.open(url, '_blank', 'location=yes');

	            browser.addEventListener('loadstart', function(event) {

	              if (event.url.indexOf(callbackUrl) >= 0) {
	                event.url.match(/oauth_verifier=([a-zA-Z0-9]+)/);
	                oauth.setVerifier(RegExp.$1);
	                oauth.fetchAccessToken(function (data) {
	                  //getTwits();
	                  browser.close();
	                }, function (data) {
	                  console.log(JSON.stringify(data));
	                });
	              }
	            });
	        }



    	}


    });

})();
