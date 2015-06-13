
(function() {
  'use strict';
 angular.module('app')
	.controller('TwitterCtrl',function($scope){

        $scope.oauth = null;
        var callbackUrl = "http://example.com";
        $scope.oauth = OAuth({
                    consumerKey: "eFszoQFkofI8BQegCOBdw", // REPLACE HERE TO YOUR CONSUMER KEY or API KEY
                    consumerSecret: "8g3zp7n2x3XVx7qUAXyFChgXoksKubn6J4XP57FWy4g", // REPLACE HERE TO YOUR CONSUMER SECRET OR API SECRET
                    callbackUrl: callbackUrl,
                    requestTokenUrl: "https://api.twitter.com/oauth/request_token",
                    authorizationUrl: "https://api.twitter.com/oauth/authorize",
                    accessTokenUrl: "https://api.twitter.com/oauth/access_token"
                });

		$scope.activarTwitter = function(){

			setImmediate(function() {
				if($scope.twitter_switch.isChecked()){
					console.log("si");


      // jsOAuth object


                $scope.oauth.fetchRequestToken(function (url) {
                    console.log("Opening Request Token URL: " + url);
                    showAuthWindow(url);
                  }, function (data) {
                    console.log(JSON.stringify(data));
                  });


				}else{
					console.log("no");
				}

			});
		}

        function showAuthWindow(url) {
            var browser = window.open(url, '_blank', 'location=yes');

            browser.addEventListener('loadstart', function(event) {

              if (event.url.indexOf(callbackUrl) >= 0) {
                event.url.match(/oauth_verifier=([a-zA-Z0-9]+)/);
                $scope.oauth.setVerifier(RegExp.$1);
                $scope.oauth.fetchAccessToken(function (data) {
                  //getTwits();
                  browser.close();
                }, function (data) {
                  console.log(JSON.stringify(data));
                });
              }
            });

        }



	});

 })();
