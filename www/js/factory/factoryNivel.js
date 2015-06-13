

(function() {
	'use strict';

	angular.module('app')
  	.factory('Nivel',function(Parse){
		return{
			selectAll: function(callback){
				return Parse.find('Nivel',callback);
			}


		}
	});

})();
