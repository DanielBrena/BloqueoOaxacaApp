

(function() {
  'use strict';

  angular.module('app')
  .factory('BloqueoBD',function(DataSource){
	return{
		init: function(){
			var sql = "CREATE TABLE IF NOT EXISTS bloqueos ";
			sql += "(id integer primary key autoincrement,nombre,ubicacion,fecha)";

			DataSource.ejecutarConsulta(sql,function(r){
				console.log("Se creo con exito la tabla");
			});

		},
		selectAll: function(callback){
			DataSource.ejecutarConsulta("SELECT * FROM bloqueos").then(callback);
		},
		selectAllFecha: function(fecha,callback){
			DataSource.ejecutarConsulta("SELECT * FROM bloqueos where fecha = '" + fecha +"'").then(callback);
		},
		insert: function(obj,callback){
			var sql = "INSERT INTO bloqueos (nombre,ubicacion,fecha) VALUES (?,?,?)"
			var arreglo = [obj.nombre,obj.ubicacion,obj.fecha]
			DataSource.ejecutarActualizacion(sql,arreglo,callback);
		},
		clean: function(callback){
			var sql = "DELETE FROM bloqueos";
			DataSource.ejecutarActualizacion(sql,[],callback);

		}


	}
});



})();
