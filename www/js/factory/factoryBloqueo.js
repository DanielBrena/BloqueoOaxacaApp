

(function() {
	'use strict';

	angular.module('app')
  	.factory('Bloqueo',function(Parse){
		return{
			selectAll: function(callback){
				return Parse.findBloqueos(callback);
			}

		}
	});

})();
