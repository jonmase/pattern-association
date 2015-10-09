(function() {
	var app = angular.module('pattern.learning', [])
		.controller('LearningController', LearningController);

	LearningController.$inject = ['learningFactory'];
	
	function LearningController(learningFactory) {
		var vm = this;
		
		//Bindable Members - values
		vm.stimuli = learningFactory.getStimuli();
		vm.synapses = learningFactory.getSynapses();
		vm.pairs = learningFactory.getStimulusPairs();
		
		//Bindable Members - methods
		vm.clearStimuli = clearStimuli;
		vm.learnStimuli = learnStimuli;
		vm.setUncondValue = setUncondValue;
		vm.setCondValue = setCondValue;
		
		//Actions	
		learningFactory.setAllSynapseValues();	//Set all the synapse values based on the initial stimuli

		//Methods
		function clearStimuli() {
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
		};
	};
})();