(function() {
	'use strict';

	angular.module('app')
  	.factory('Parse',function($q,$timeout){
		return{
			find: function(clase,callback){
				var Objecto = Parse.Object.extend(clase);
				var query = new Parse.Query(Objecto);
				return query.find(callback);
			},
            findBloqueos: function(callback){
                var Bloqueo = Parse.Object.extend("Bloqueo");
                var query = new Parse.Query(Bloqueo);
                var fecha = new Date();
                query.equalTo("fecha",parseInt(fecha.getFullYear()) + "-" + parseInt(fecha.getMonth() + 1) + "-" + parseInt(fecha.getDate()));
                return query.find(callback);
           },
			login:function(user,callback){
				return Parse.User.logIn(user.usuario,user.contrasena,callback);
			},
			session: function(){
				return Parse.User.current();
			},
			logout: function(){
				return Parse.User.logOut();
			},
			saveUsuario: function(user,callback){
				var Usuario = Parse.Object.extend('User');
				var usuario = new Usuario();
				usuario.set('email',user.correo);
				usuario.set('username',user.usuario);
				usuario.set('password',user.contrasena);

				return usuario.save(null,{
					success:function(user){
						callback(user);
					},error:function(e){
						callback(e);
		               console.log("Error: " +e);
		            }
				});
			},

			saveBloqueo:function(bloqueo){
				var Usuario = Parse.Object.extend('User');
		        var Bloqueo = Parse.Object.extend('Bloqueo');
		        var Nivel = Parse.Object.extend('Nivel');
		        var Tipo = Parse.Object.extend('Tipo');
                var fecha = new Date();


		        var bloqueo_temporal;
		        var nivel_temporal;
		        var tipo_temporal;
		        var bloqueoObject = new Bloqueo();

		        var query_nivel = new Parse.Query(Nivel);
		        query_nivel.equalTo("objectId", bloqueo.nivel);
		        query_nivel.find({
		        	success:function(nivel_){
		        		nivel_temporal = nivel_;
		        	},
		            error:function(){
		                console.log("Error");
		            }
		        });

		        var query_tipo = new Parse.Query(Tipo);
		        query_tipo.equalTo("objectId", bloqueo.tipo);
		        query_tipo.find({
		        	success:function(tipo_){
		        		tipo_temporal = tipo_;
		        	},
		            error:function(){
		                console.log("Error");
		            }
		        });


		        bloqueoObject.set('estado',bloqueo.estado);
		        bloqueoObject.set('positivo',0);
		        bloqueoObject.set('negativo',0);
		        bloqueoObject.set('ubicacion',new Parse.GeoPoint({latitude:bloqueo.ubicacion.lat,longitude:bloqueo.ubicacion.lng}));
		        bloqueoObject.set('fecha',parseInt(fecha.getFullYear())+"-"+parseInt(fecha.getMonth()+1)+"-"+parseInt(fecha.getDate()));
		        bloqueoObject.save(null,{
		            success:function(bloq){
		                bloqueo_temporal = bloq;

		                var relation1 = bloq.relation('nivel');
		                var relation2 = bloq.relation('tipo');

		                relation1.add(nivel_temporal);
		                relation2.add(tipo_temporal);

		                bloq.save();

		            }
		        });

		        var query = new Parse.Query(Usuario);
		        query.equalTo("objectId", bloqueo.usuario);
		        query.find({
		        	success:function(usuario_){

		        		var relation = usuario_[0].relation('bloqueos');
		                relation.add(bloqueo_temporal);
		                usuario_[0].save();
		        	},
		            error:function(){
		                console.log("Error");
		            }
		        });
			}


		}
	});

})();
