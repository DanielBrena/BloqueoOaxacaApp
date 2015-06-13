(function() {
  	'use strict';

 	angular.module('app')
 	.controller('RegisterCtrl',function($scope,Parse,$window){
		$scope.usuario = {};

		$scope.register = function(user){

			if(user.usuario  == null|| user.correo == null || user.contrasena == null){
				$scope.alert("¡ Hay campos vacios !");
			}else{
				Parse.saveUsuario(user,function(r){

					if(r.id != null){
						$window.localStorage.setItem('login',JSON.stringify(r));
						$scope.dialog2.hide();
						var fecha = r.createdAt;
						var mensaje = "Tu usuario ha sido creado la fecha : " +fecha;
						$scope.alert(mensaje);
					}else{
						$scope.alert("¡ Usuario invalido o ya existente !");
					}
				});
			}

		}



		$scope.alert = function(m) {
	    	ons.notification.alert({message: m});
	  	}

	});

})();
