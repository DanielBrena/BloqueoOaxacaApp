(function() {
  'use strict';

angular.module('app')
	.controller('CrearCtrl',function($scope,Tipo,Nivel,$timeout,$window,Parse){
		$scope.bloqueo = {};
		$scope.bloqueo.ubicacion ={};
		$scope.tipos = [];
		$scope.niveles = [];
		$scope.bloqueo.estado = "";
		$scope.mapa = null;


		function selectAllTipo(){
			Tipo.selectAll(function(results){
				$scope.$apply(function(){
					$scope.tipos = results;
	                $scope.bloqueo.tipo = $scope.tipos[0].id;

				});
			});
		}

		function selectAllNivel(){
			Nivel.selectAll(function(results){
				$scope.$apply(function(){
					$scope.niveles = results;
	                $scope.bloqueo.nivel = 'LBJ9Ksfht8';
				});
			});
		}
		$scope.publicar = function(bloqueo){


			var login = $window.localStorage.getItem('login');


			if(login == null){

				ons.createDialog('login.html').then(function(dialog) {
      				dialog.show();
   			 	});

			}else{
				var usuario = $window.localStorage.getItem('login');
				var usuario = JSON.parse(usuario);
				bloqueo.usuario = usuario.objectId;
				Parse.saveBloqueo(bloqueo);

                $scope.alert("¡ Muchas Gracias ! Se ha publicado.");
                $scope.bloqueo.estado = "";
			}

		}


		$scope.cargar_mapa = function(){

				if (navigator.geolocation) {

			        navigator.geolocation.getCurrentPosition(function(position) {

			            var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

			            var myOptions = {
			                zoom: 21,
			                center: myLatlng,
			                mapTypeId: google.maps.MapTypeId.ROADMAP,
			                disableDefaultUI:true,
			                draggable:true,
			                maxZoom:16,
			                minZoom:14
			            }

			            $scope.mapa = new google.maps.Map($("#mapa_crear").get(0), myOptions);

			          	$scope.bloqueo.ubicacion.lat = position.coords.latitude;
			           	$scope.bloqueo.ubicacion.lng = position.coords.longitude;

			           	var marker = new google.maps.Marker({
		                    position: {
		                    	lat:position.coords.latitude,
		                    	lng:position.coords.longitude
		                    },
		                    map: $scope.mapa,
		                    draggable: true,
		                    animation: google.maps.Animation.DROP
		                });

		                 google.maps.event.addListener(marker, 'dragend', function(){ actualizarPos(marker); });




			        });
			    }else{
			        $scope.alert("¡ Habilita la ubicación en tu navegador !");
			    }

		}

		$scope.cargar_mapa();

		function actualizarPos(marker){
			var posicion = marker.getPosition();
			$scope.bloqueo.ubicacion.lat = posicion.lat();
			$scope.bloqueo.ubicacion.lng = posicion.lng();
		}


		selectAllTipo();
		selectAllNivel();
		$scope.usuario = {};


		$scope.alert = function(m) {
	    	ons.notification.alert({message: m});
	  	}


	});

 })();
