(function() {
  'use strict';

angular.module('app')
	.controller('CrearCtrl',function($scope,Tipo,Nivel,$timeout,$window,Parse,$http){
		$scope.bloqueo = {};
		$scope.bloqueo.ubicacion ={};
		$scope.tipos = [];
		$scope.niveles = [];
		$scope.bloqueo.estado = "#BloqueoOaxaca ";
		$scope.mapa = null;


		function selectAllTipo(){
			Tipo.selectAll(function(results){
				$scope.$apply(function(){
					$scope.tipos = results;
	                $scope.bloqueo.tipo = $scope.tipos[0] ;
	                $scope.bloqueo.estado = $scope.tipos[0].get('mensaje');

				});
			});
		}

		$scope.cambiarEstado = function(m){
			$scope.bloqueo.estado = m;
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
			console.log(bloqueo.tipo.id);

			var login = $window.localStorage.getItem('login');


			if(login == null){

				ons.createDialog('login.html').then(function(dialog) {
      				dialog.show();
   			 	});

			}else{
				var usuario = $window.localStorage.getItem('login');
				var usuario = JSON.parse(usuario);
				bloqueo.tipo = bloqueo.tipo.id;
				bloqueo.usuario = usuario.objectId;
				
				var fecha = new Date();
				bloqueo.fecha = parseInt(fecha.getFullYear()) + "-" + parseInt(fecha.getMonth() + 1) + "-" + parseInt(fecha.getDate());
				console.log(bloqueo);
				Parse.saveBloqueo(bloqueo);

                $scope.alert("¡ Muchas Gracias ! Se ha publicado.");
               
                //Share Twitter
                var option = $window.localStorage.getItem('apiTwitter');
                var option2 = $window.localStorage.getItem('apiFacebook');
                if(option != null){
                	option = JSON.parse(option);
					console.log(option);
					
					$scope.oauth = OAuth({
		                    consumerKey: "MpK5vpTF8o3bTO9gbib46sitr", // REPLACE HERE TO YOUR CONSUMER KEY or API KEY
		                    consumerSecret: "YQjocjuwY3JpQumHG1j5v2xCKPUZN2R25BDxb0LofKnDh9sgAO", // REPLACE HERE TO YOUR CONSUMER SECRET OR API SECRET
		                    requestTokenUrl: "https://api.twitter.com/oauth/request_token",
		                    authorizationUrl: "https://api.twitter.com/oauth/authorize",
		                    accessTokenUrl: "https://api.twitter.com/oauth/access_token",
		                    accessTokenKey:option.accessTokenKey,
		                    accessTokenSecret:option.accessTokenSecret
		                });

					var dataObj = {
						'status':bloqueo.estado,
						'display_coordinates':true,
						'lat':bloqueo.ubicacion.lat,
						'long':bloqueo.ubicacion.lng,
						'trim_user':true,
						'geo': { 'type':'Point', 'coordinates':[bloqueo.ubicacion.lat, bloqueo.ubicacion.lng] }
					}

					$scope.oauth.post('https://api.twitter.com/1.1/statuses/update.json',dataObj, 
			        function(data) {
			          console.log(data);
			           

			        },
			        function(data){
			          console.log(JSON.stringify(data));
			        });
                }

                if(option2 != null){

                	$http.post('https://graph.facebook.com/v2.3/me/feed',
                	{
                		message:bloqueo.estado,
                		access_token:option2

                	}).success(function(data, status, headers, config) {
					    console.log(data);
					}).error(function(data, status, headers, config) {
					    
					  });
                }
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
