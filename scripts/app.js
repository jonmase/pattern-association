(function() {
	//var app = angular.module('pattern', ['pattern.learning', 'pattern.recall']);
	var app = angular.module('pattern', ['frapontillo.bootstrap-switch','ui.grid', 'ui.grid.expandable','ngCookies']);
	app.directive('highlightOnChange', ['$timeout', function($timeout) {
		return {
		    restrict: 'A',
		    scope: {
		      	model: '=highlightOnChange'
		    },
		    link: function(scope, element) {
		      	scope.$watch('model', function (nv, ov) {
		        	if (nv !== ov) {
		          	// apply class
		          	element.addClass('highlight');
		          	// auto remove after some delay
		          	$timeout(function () {
		            	element.removeClass('highlight');
		          		}, 750);
		        	}
		      	});
		    	}
		  	};
		}]);
	})();

