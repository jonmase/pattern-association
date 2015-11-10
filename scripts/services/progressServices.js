(function() {
	angular.module('pattern')
		.factory('progressFactory', progressFactory);
		
	progressFactory.$inject = ['init_stage'];

	function progressFactory(init_stage) {
		//Variables
		var stage = init_stage;

		//Exposed Methods
		var factory = {
			setStage: setStage,
			getStage: getStage,
			isStage: isStage,
		}
		return factory;
		
		//Methods
		
		//Set the stage value
		function setStage(new_stage) {
			stage=new_stage
		}

		//Get the stage value
		function getStage() { 
			return stage;
		}

		//Chcek the stage value
		function isStage(check_stage) { 
			return stage===check_stage;
		}
	}
})();