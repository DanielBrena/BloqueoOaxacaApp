

(function() {
  'use strict';

  angular.module('app')
.factory('DataSource',function($q,$timeout){
	return{
		get: function(){
			var db = openDatabase('BDListenMe', '1.0', 'Base de datos', 2 * 1024 * 1024);
			return  db;

		},
		ejecutarConsulta: function(sql,callback){
			var deferred = $q.defer();


				this.get().transaction(function(t){
					t.executeSql(sql,[],function(t,resultado){
					 	$timeout(function(){
				var r = [];
					 //	callback(resultado);
					 	for(var i = 0; i < resultado.rows.length; i++){
					 		r.push(resultado.rows.item(i));
					 	}
					 	if(r.length > 0){
					deferred.resolve(r);
				}else{
					deferred.reject("No ");
				}
					 	},1000);

					}, function(tx, e){
						console.log("There has been an error: " + e.message);

					});
				});






			return deferred.promise;

		},
		ejecutarActualizacion: function(sql,arreglo,callback){



			this.get().transaction(function(t){
				 t.executeSql(sql,arreglo,function(t,resultado){

				 	callback(resultado);

				 }, function(tx, e){
					console.log("There has been an error: " + e.message);

				});
			});
		}
	}
});

})();
