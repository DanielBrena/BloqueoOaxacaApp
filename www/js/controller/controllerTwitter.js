
(function() {
  'use strict';
  angular.module('app')
	.controller('TwitterCtrl',function($scope,$window){
        var option = $window.localStorage.getItem('apiTwitter');
        if(option != null){
            setImmediate(function() {
                   
                $scope.twitter_switch.setChecked(true);
            });
            
        }
      
       $scope.oauth = null;
        var callbackUrl = "http://example.com";
        $scope.oauth = OAuth({
                    consumerKey: "MpK5vpTF8o3bTO9gbib46sitr", // REPLACE HERE TO YOUR CONSUMER KEY or API KEY
                    consumerSecret: "YQjocjuwY3JpQumHG1j5v2xCKPUZN2R25BDxb0LofKnDh9sgAO", // REPLACE HERE TO YOUR CONSUMER SECRET OR API SECRET
                    callbackUrl: callbackUrl,
                    requestTokenUrl: "https://api.twitter.com/oauth/request_token",
                    authorizationUrl: "https://api.twitter.com/oauth/authorize",
                    accessTokenUrl: "https://api.twitter.com/oauth/access_token"
                });
        
        $scope.activarTwitter = function(){
            
                setImmediate(function() {
                    if($scope.twitter_switch.isChecked()){
                        console.log("si");
                    
                        $scope.oauth.fetchRequestToken(function (url) {
                            console.log("Opening Request Token URL: " + url);
                            showAuthWindow(url);
                        }, function (data) {
                            console.log(JSON.stringify(data));
                        });
                    

                    }else{
                        console.log("no");
                        $window.localStorage.removeItem('apiTwitter');
                    }

                });
            
            
        }
        
        function showAuthWindow(url) {
            $scope.$apply(function(){

                var browser = window.open(url, '_blank', 'location=yes');
            
                browser.addEventListener('loadstart', function(event) {
                   
                     
                    if (event.url.indexOf(callbackUrl) >= 0) {
                        event.url.match(/oauth_verifier=([a-zA-Z0-9]+)/);
                        $scope.oauth.setVerifier(RegExp.$1);
                        
                        $scope.oauth.fetchAccessToken(function (data) {
                        
                          
                            
                            var accessData = {};
                            accessData.accessTokenKey = $scope.oauth.getAccessTokenKey();
                            accessData.accessTokenSecret = $scope.oauth.getAccessTokenSecret();
                                                 

                           
                          $window.localStorage.setItem('apiTwitter',JSON.stringify(accessData));

                          browser.close();
                            
                             
                        }, function (data) {
                            console.log('aqui');
                          console.log(JSON.stringify(data));
                           
                        });
                  }else{
                     setImmediate(function() {
                   
                            $scope.twitter_switch.setChecked(false);
                        });
                  }
                });
            });
        }


       



	});

})();
