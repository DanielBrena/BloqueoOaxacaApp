(function() {
    'use strict';
    angular.module('app')
        .controller('ChatCtrl', function($scope,PubNub,$rootScope,$window) {

           // $scope.validar_mensaje = true;
            $scope.validar_boton = false;

            $scope.channel = "BloqueoOaxaca";
            $scope.messages = [];
            $scope.userId = "anonimo";

            $scope.usuario = JSON.parse($window.localStorage.getItem('login'));
           

            if($scope.usuario == null){
                 ons.createDialog('login.html').then(function(dialog) {
                        dialog.show();
                    });
             }else{
                $scope.userId = $scope.usuario.username;
             }

            
             

            
            
            
            
            PubNub.init({
                subscribe_key: 'sub-c-c25474c8-1334-11e5-87d4-02ee2ddab7fe',
                publish_key: 'pub-c-e04a39e9-b468-4815-bc50-9218981bf05d',
                uuid: $scope.userId
            });

            PubNub.ngSubscribe({
                channel: $scope.channel
            });

            $rootScope.$on(PubNub.ngMsgEv($scope.channel), function(ngEvent, payload) {
                $scope.$apply(function() {
                    $scope.messages.push(payload.message);
                });
            });

            $rootScope.$on(PubNub.ngPrsEv($scope.channel), function(ngEvent, payload) {
                $scope.$apply(function() {
                    $scope.users = PubNub.ngListPresence($scope.channel);
                });
            });


            PubNub.ngHereNow({
                channel: $scope.channel
            });
            

            $scope.validarMensaje = function(m){
                
                if( (100 - m.length) < 0){
                    $scope.validar_boton = true;
                }else{
                    $scope.validar_boton = false;
                }
            }

            $scope.enviar = function() {
                $scope.usuario = JSON.parse($window.localStorage.getItem('login'));
                
                if($scope.usuario == null){

                    ons.createDialog('login.html').then(function(dialog) {
                        dialog.show();
                    });

                }else{
                    $scope.userId = $scope.usuario.username;
                    var mensaje ={};
                    mensaje.usuario = $scope.userId;
                    mensaje.msj = $scope.newMessage;
                    var hora = new Date();
                    mensaje.hora  = hora.getHours()+":"+ (parseInt(hora.getMinutes()) < 10 ? "0" +hora.getMinutes() : hora.getMinutes() ) + ":" + hora.getSeconds();
                    if(parseInt(hora.getHours())>= 12){
                        mensaje.hora += " PM";
                    }else{
                        mensaje.hora += " AM";
                    }
                    PubNub.ngPublish({
                        channel: $scope.channel,
                        message: mensaje
                    });
                    $scope.newMessage = '';

                }
                
            };



            

        });

})();
