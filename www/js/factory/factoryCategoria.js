


(function() {
  'use strict';

  angular.module('app')
  .factory('Categoria',function(DataSource){
	return{
		init: function(){
			var sql = "CREATE TABLE IF NOT EXISTS categoria ";
			sql += "(id integer primary key autoincrement,nombre unique, descripcion,permiso)";

			DataSource.ejecutarConsulta(sql,function(r){
				console.log("Se creo con exito la tabla");
			});

			var defaultC = [
				{id: 1, nombre: "Calle",descripcion:"Frases en la calle.",permiso:1},
				{id: 2,nombre: "Escuela",descripcion:"Frases en la escuela.",permiso:1},
				{id: 3, nombre: "Hogar",descripcion:"Frases en el Hogar.",permiso:1},
				{id: 4,nombre: "Restaurante",descripcion:"Frases en un restaurant.",permiso:1},
				{id: 5, nombre: "Oficina",descripcion:"Frases en la oficina.",permiso:1},
				{id: 6,nombre: "Saludos",descripcion:"Frases de saludos",permiso:1},
				{id: 7,nombre: "Despedidas",descripcion:"Frases de despedidas.",permiso:1}
			];

			for(var i in defaultC){

				var sql = "INSERT INTO categoria (id,nombre,descripcion,permiso) VALUES (?,?,?,?)"
				var arreglo = [defaultC[i].id,defaultC[i].nombre,defaultC[i].descripcion,defaultC[i].permiso]
				DataSource.ejecutarActualizacion(sql,arreglo,function(r){
					console.log(r);
				});
			}

		},
		selectAll: function(callback){
			DataSource.ejecutarConsulta("SELECT * FROM categoria",callback);

		}
	}
});

})();
