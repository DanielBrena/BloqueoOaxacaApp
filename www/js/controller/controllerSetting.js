
(function() {
  'use strict';
 angular.module('app')
	.controller('ConfigSetting',function($scope,$window,Parse){

		$scope.usuario = JSON.parse($window.localStorage.getItem('login'));
		

		$scope.sesion =(( $scope.usuario == null) ? "Iniciar sesión":"Cerrar sesión");
		$scope.showUser = (( $scope.usuario != null) ? true:false);

		$scope.cuenta = function(){
			if($scope.usuario != null){
				$window.localStorage.removeItem('login');
				var login = $window.localStorage.getItem('login');
				$scope.menu.setMainPage('config.html', {closeMenu: true});
				Parse.logout();
			}else{
				ons.createDialog('login.html').then(function(dialog) {
      				dialog.show();
   			 	});
			}

		}

		$scope.mostrar = function(){
			var option = $window.localStorage.getItem('apiTwitter');
			option = JSON.parse(option);
			console.log(option.accessTokenSecret);
			$scope.oauth = OAuth({
                    consumerKey: "MpK5vpTF8o3bTO9gbib46sitr", // REPLACE HERE TO YOUR CONSUMER KEY or API KEY
                    consumerSecret: "YQjocjuwY3JpQumHG1j5v2xCKPUZN2R25BDxb0LofKnDh9sgAO", // REPLACE HERE TO YOUR CONSUMER SECRET OR API SECRET
                  	
                    requestTokenUrl: "https://api.twitter.com/oauth/request_token",
                    authorizationUrl: "https://api.twitter.com/oauth/authorize",
                    accessTokenUrl: "https://api.twitter.com/oauth/access_token",
                    accessTokenKey:option.accessTokenKey,
                    accessTokenSecret:option.accessTokenSecret
                });

			
			//$scope.oauth.setAccessToken(option.accessTokenKey, option.accessTokenSecret);

			$scope.oauth.getJSON('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=monaca_io&count=20', 
	        function(data) {
	          console.log(data);
	        }, function(data){
	          console.log(JSON.stringify(data));
	        });
		}


	});

 })();
