


(function() {
  	'use strict';

 	angular.module('app')
 	.controller('IndexCtrl',function($scope,Bloqueo){

		$scope.mapa = null;
        $scope.markers = [];
        $scope.bloqueo = "#BloqueoOaxaca";



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
                             mostrarMarkers($scope.markers);

                           });
                        });



			        });
			    }else{
			        $scope.alert("¡ Habilita la ubicación en tu navegador !");
			    }

		}


		$scope.cargar_mapa();



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
		       })

                google.maps.event.addListener(marker, 'click', function(){ openInfoWindow(obj); });


            }
        }



        function openInfoWindow(obj){
            $scope.$apply(function(){
                $scope.bloqueo = obj.get("estado");
            });
            console.log(obj.get("estado"));

        }




	});

})();
