
(function() {
  'use strict';
  angular.module('app')
	.controller('DescargaCtrl',function($scope,Bloqueo,$window,BloqueoBD){
        
       $scope.bloqueos = [];

        $scope.descargar = function(){
            
            BloqueoBD.clean(function(){
                console.log('Base de datos local, actualizada.');
            });

         
            Bloqueo.selectAll(function(data){

                $scope.$apply(function(){
                    
                    var geocoder = new google.maps.Geocoder();
                    if(data.length == 0){
                        $scope.alert("No hay nada que descargar");
                    }else{
                       
                       for(var i = 0; i < data.length; i++){
                            var obj = data[i];
                            var coordenada = obj.get('ubicacion').toJSON();

                            
                            var latlng = new google.maps.LatLng(coordenada.latitude, coordenada.longitude);
                                geocoder.geocode({'latLng': latlng}, function(results, status) {
                                    if (status == google.maps.GeocoderStatus.OK) {
                                        
                                        if (results[0]) {

                                            var objeto = {};
                                            objeto.ubicacion = JSON.stringify(results[0].geometry.location);
                                            objeto.fecha = obj.get('fecha');
                                            objeto.nombre = results[0].formatted_address;
                                           
                                          
                                             guardar(objeto)


                                        
                                
                                        } else {
                                            console.log('No results found');
                                        }
                                    } else {
                                      console.log('Geocoder failed due to: ' + status);
                                    }
                                });
                              
                       }  
                       $scope.alert("Se han descargado los bloqueos.");                  
                       
                    }
                    
                    
                });
            });
        }



        function guardar(o){
            
            console.log(o);

            BloqueoBD.insert(o,function(data){
                console.log(data);
            });
            

            
        }

        $scope.alert = function(m) {
            ons.notification.alert({message: m});
        }

        $scope.mostrar = function(){
            var fecha = new Date();
            var query = parseInt(fecha.getFullYear()) + "-" + parseInt(fecha.getMonth() + 1) + "-" + parseInt(fecha.getDate());
           
            BloqueoBD.selectAllFecha(query,function(data){
                console.log(data);
                $scope.bloqueos = data;

            });
        }
        $scope.mostrar();

        $scope.enviarAMapa = function(b){
            
            var ubi = JSON.parse(b.ubicacion);
            var addressLongLat = ubi.A+','+ubi.F;
            $window.open("geo:0,0?q="+addressLongLat+"("+b.nombre+")");
        }


       



	});

})();
