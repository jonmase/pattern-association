(function() {
	angular.module('pattern')
		.controller('ProgressController', ProgressController);

	ProgressController.$inject = ['$scope','progressFactory'];
	
	function ProgressController($scope,progressFactory) {
		var vm = this;
		
		//Bindable Members - values
		vm.stage = progressFactory.getStage();
		//vm.synapses = learningFactory.getSynapses();
		//vm.pairs = learningFactory.getStimulusPairs();
		
		//Bindable Members - methods
		vm.setStage = setStage;
		vm.isStage = isStage;
		$scope.isStage = isStage;  //need to be referred to by ui-grid so needs to be attached to $scope as well?
		//vm.clearStimuli = clearStimuli;
		//vm.learnStimuli = learnStimuli;
		//vm.setUncondValue = setUncondValue;
		//vm.setCondValue = setCondValue;
		
		//Actions	
		//learningFactory.setAllSynapseValues();	//Set all the synapse values based on the initial stimuli

		//Methods
		function setStage(new_stage) {
			progressFactory.setStage(new_stage);
			return false;
		};
		function isStage(check_stage) {
			return progressFactory.isStage(check_stage);
		};
		/*function clearStimuli() {
			learningFactory.clearStimuli();
			return false;
		};
		
		function learnStimuli() {
			learningFactory.learnStimuli();
			return false;
		};

		function setUncondValue(uncondId) {
			learningFactory.setUncondValue(uncondId);
			return false;
		};
		
		function setCondValue(condId) {
			learningFactory.setCondValue(condId);
			return false;
		};*/
	};
})();