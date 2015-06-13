

(function() {
  'use strict';

  angular.module('app')
  .factory('Frase',function(DataSource){
	return{
		init: function(){
			var sql = "CREATE TABLE IF NOT EXISTS frase ";
			sql += "(id integer primary key autoincrement,frase unique,rating DEFAULT 0,permiso, categoriaID integer, FOREIGN KEY (categoriaID) REFERENCES categoria (id) )";

			DataSource.ejecutarConsulta(sql,function(r){
				console.log("Se creo con exito la tabla");
			});


			var defaultF = [
				{id: 1, frase: "¡Hey Taxi!",permiso:1,categoriaID:1},
				{id: 2, frase: "Maestro",permiso:1,categoriaID:2},
				{id: 3, frase: "Vamos a comer",permiso:1,categoriaID:3},
				{id: 4, frase: "Me da la cuenta",permiso:1,categoriaID:4},
				{id: 5, frase: "¿Donde saco las copias?",permiso:1,categoriaID:5},
				{id: 6, frase: "¡Hola!",permiso:1,categoriaID:6},
				{id: 7, frase: "¡Adios!",permiso:1,categoriaID:7}

			];

			for(var i in defaultF){

				var sql = "INSERT INTO frase (id,frase,permiso,categoriaID) VALUES (?,?,?,?)"
				var arreglo = [defaultF[i].id,defaultF[i].frase,defaultF[i].permiso,defaultF[i].categoriaID]
				DataSource.ejecutarActualizacion(sql,arreglo,function(r){
					console.log(r);
				});
			}

		},
		selectAll: function(callback){
			DataSource.ejecutarConsulta("SELECT * FROM frase").then(callback);
		},
		updateRating:function(id,callback){
			var sql = "UPDATE  frase SET rating = rating +1 WHERE id = " + id;

			DataSource.ejecutarActualizacion(sql,[],callback);
		},
		selectRating: function(callback){
			var sql = "SELECT * FROM frase ORDER BY rating DESC LIMIT 5";
			DataSource.ejecutarConsulta(sql).then(callback);
		},
		insert: function(obj,callback){
			var sql = "INSERT INTO frase (frase,permiso,categoriaID) VALUES (?,?,?)"
			var arreglo = [obj.frase,2,obj.categoria]
			DataSource.ejecutarActualizacion(sql,arreglo,callback);
		}


	}
});



})();
