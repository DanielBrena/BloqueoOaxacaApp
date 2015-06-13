

(function() {
	'use strict';

	angular.module('app')
  	.factory('Tipo',function(Parse){
		return{
			selectAll: function(callback){
				return Parse.find('Tipo',callback);
			}


		}
	});

})();
