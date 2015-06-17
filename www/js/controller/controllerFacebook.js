
(function() {
  'use strict';
  angular.module('app')
	.controller('FacebookCtrl',function($scope,$window,$http){
        var option = $window.localStorage.getItem('apiFacebook');

        if(option != null){
            setImmediate(function() {
                   
                $scope.facebook_switch.setChecked(true);
            });
            
        }
      
       $scope.authorize_url = null;
        var client_id = '1572572989669831'; //YOUR App ID or API Key
        var client_secret = '533f04d7816ba0effc725a5b70220aba'; //// YOUR App Secret
        var redirect_uri = 'https://www.facebook.com/connect/login_success.html';  //// YOUR CALLBACK URL
        var display = 'touch';
        $scope.authorize_url = "https://graph.facebook.com/v2.3/oauth/authorize?";

        $scope.authorize_url += "client_id=" + client_id;
        $scope.authorize_url += "&redirect_uri=" + redirect_uri;
        $scope.authorize_url += "&display=" + display;
        $scope.authorize_url += "&scope=publish_actions";
        
        $scope.activarFacebook = function(){
            
                setImmediate(function() {
                    if($scope.facebook_switch.isChecked()){
                        console.log("si");
                    
                        
                            console.log("Opening Request Token URL: " + $scope.authorize_url);
                            showAuthWindow($scope.authorize_url);
                       

                    }else{
                        console.log("no");
                        $window.localStorage.removeItem('apiFacebook');
                    }

                });
            
            
        }
        
        function showAuthWindow(authorize_url) {
            $scope.$apply(function(){

                var ref = window.open(authorize_url, '_blank', 'location=yes');
                ref.addEventListener('loadstart', function(event)
                {
                    var loc = event.url;
                    if(loc.indexOf(redirect_uri + "?") >= 0)
                    {
                        ref.close();
                        var result = loc.split("#")[0];
                        var accessToken = result.split("&")[0].split("=")[1];
                        console.log(accessToken);
                        
                        var url = 'https://graph.facebook.com/v2.3/oauth/access_token?';
                            url += 'client_id=' + client_id;
                            url += '&client_secret=' + client_secret;
                            url += '&code=' + accessToken;
                            url += '&redirect_uri=' + redirect_uri;
                            console.log(url);
                
                        $http.post(url,null).success(function(data){
                            
                            //accessToken = data.split("&")[0].split("=")[1];
                              $window.localStorage.setItem('apiFacebook',data.access_token);

                            //url = "https://graph.facebook.com/v2.3/me/taggable_friends?access_token=" + accessToken;
                            //url = "https://graph.facebook.com/v2.3/me/feed?message='Probando api monaca.'&access_token=" + accessToken;
                            /*$http.post(url).success(function(data){
                               console.log(data)
                            });*/
                        });
                    }
                });
                
            });
        }


       



	});

})();
