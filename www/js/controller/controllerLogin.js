(function() {
  	'use strict';

 	angular.module('app')
 	.controller('LoginCtrl',function($scope,$window,Parse){
		$scope.usuario = {};

		$scope.login = function(user){
			console.log(user);

			Parse.login(user,function(data){

				if(data != null){
					$window.localStorage.setItem('login',JSON.stringify(data));
					$scope.dialog.hide();
				}else{
					$scope.alert("¡ Usuario Invalido !");
				}
			});


		}

		$scope.registro = function(){
			$scope.dialog.hide();
			ons.createDialog('register.html').then(function(dialog) {
      			dialog.show();
   			});
		}

		$scope.alert = function(m) {
	    	ons.notification.alert({message: m});
	  	}

	});

})();

