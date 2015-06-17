


(function() {
  	'use strict';

 	angular.module('app')
 	.controller('IndexCtrl',function($scope,Bloqueo){

		$scope.mapa = null;
        $scope.markers = [];
        $scope.bloqueo = "#BloqueoOaxaca";

        var infowindow = new google.maps.InfoWindow();
        var geocoder = new google.maps.Geocoder();

  		$scope.cargar_mapa = function(){

				if (navigator.geolocation) {

			        navigator.geolocation.getCurrentPosition(function(position) {

			            var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

			            var myOptions = {
			                zoom: 15,
			                center: myLatlng,
			                mapTypeId: google.maps.MapTypeId.ROADMAP,
			                disableDefaultUI:true,
			                draggable:true,
			                maxZoom:16,
			                minZoom:14
			            }

			            $scope.mapa = new google.maps.Map($("#mapa_principal").get(0), myOptions);


			           	 Bloqueo.selectAll(function(data){
                           $scope.$apply(function(){

                            $scope.markers = data;
                            console.log(data);
                             mostrarMarkers($scope.markers);

                           });
                        });

			           	google.maps.event.addListener($scope.mapa, 'click', function(){
				            infowindow.close();
				        });



			        });
			    }else{
			        $scope.alert("¡ Habilita la ubicación en tu navegador !");
			    }

		}


		$scope.cargar_mapa();

        $scope.busqueda = function(){
            ons.notification.prompt({
              message: "Busca la ubicación para verificar si hay bloqueos.",
              callback: function(b) {
                 geocoder.geocode({ 'address': b}, geocodeResult);
                console.log(b);
              }
            });
          
        }

        function geocodeResult(results, status) {
        // Verificamos el estatus
            if (status == 'OK') {
               
                var mapOptions = {
                    center: results[0].geometry.location,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

               
                $scope.mapa = new google.maps.Map($("#mapa_principal").get(0), mapOptions);
                // fitBounds acercará el mapa con el zoom adecuado de acuerdo a lo buscado
                $scope.mapa.fitBounds(results[0].geometry.viewport);
                // Dibujamos un marcador con la ubicación del primer resultado obtenido

                Bloqueo.selectAll(function(data){
                    $scope.$apply(function(){

                        $scope.markers = data;
                        console.log(data);
                        mostrarMarkers($scope.markers);

                        });
                });

                google.maps.event.addListener($scope.mapa, 'click', function(){
                    infowindow.close();
                });
               
            } else {
                // En caso de no haber resultados o que haya ocurrido un error
                // lanzamos un mensaje con el error
                $scope.alert("Geocoding no tuvo éxito debido a: " + status);
            }
        }


        function mostrarMarkers(arreglo){
            for(var i = 0; i< arreglo.length; i++){
                var obj = arreglo[i];

                var coordenada = obj.get('ubicacion').toJSON();

                console.log(coordenada.latitude + ":" + coordenada.longitude);
                var marker = new google.maps.Marker({
                    position: {
                        lat:parseFloat(coordenada.latitude),
		              	lng:parseFloat(coordenada.longitude)
		              },
		                    map: $scope.mapa,
		                    animation: google.maps.Animation.DROP
		       });

                openInfoWindow(marker,obj);
                //google.maps.event.addListener(marker, 'click', openInfoWindow(obj));


            }	
        }



        function openInfoWindow(marker,obj){
        	
            //$scope.$apply(function(){
            		google.maps.event.addListener(marker, 'click', function(){
            			$scope.$apply(function(){
            				var ubi = marker.getPosition();
            				
            				$scope.bloqueo = obj.get("estado");

            				var latlng = new google.maps.LatLng(ubi.lat(), ubi.lng());
                                geocoder.geocode({'latLng': latlng}, function(results, status) {
                                    if (status == google.maps.GeocoderStatus.OK) {
                                        if (results[0]) {
                                            infowindow.setContent(results[0].formatted_address);
        									infowindow.open($scope.mapa, marker);
                                           
                                        } else {
                                            console.log('No results found');
                                        }
                                    } else {
                                      console.log('Geocoder failed due to: ' + status);
                                    }
                                });


		            		
		                	


	                	});
            	});
                
           // });
            

        }
        



	});

})();
