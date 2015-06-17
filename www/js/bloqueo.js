(function() {
  'use strict';
  	Parse.initialize("jUFcJgjtXcesYTfx4mmYKIqMikxhzDTT8OKR87At", "6tMTXPkc3dfHQ9ITY4XzxcX2XlrqrZdMgf7K9QZ6");
  	angular.module('app', ['onsen.directives','pubnub.angular.service'])
  	.controller('Init',function($scope,BloqueoBD){
  		BloqueoBD.init();

	}).constant('CONFIG',{
		'url':'http://localhost',
		'port':'8080'

	});

})();
