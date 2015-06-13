
(function() {
  'use strict';
 angular.module('app')
	.controller('ConfigSetting',function($scope,$window,Parse){

		$scope.usuario = JSON.parse($window.localStorage.getItem('login'));


		$scope.sesion =(( $scope.usuario == null) ? "Iniciar sesión":"Cerrar sesión");


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


	});

 })();
