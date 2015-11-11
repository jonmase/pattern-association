(function() {
	angular.module('pattern')
		.controller('LearningController', LearningController);

	LearningController.$inject = ['$scope','learningFactory'];
	
	function LearningController($scope, learningFactory) {
		var vm = this;
		
		//Bindable Members - values
		vm.stimuli = learningFactory.getStimuli();
		vm.recallStimuli = learningFactory.getRecallStimuli();
		vm.synapses = learningFactory.getSynapses();
		vm.pairs = learningFactory.getStimulusPairs();
		//vm.recallPairs = learningFactory.getRecallStimulusPairs();
		vm.binaryThreshold = learningFactory.getBinaryThreshold();
		vm.chanceOfSynapseDeath = learningFactory.getChanceOfSynapseDeath();
		vm.noOfDeadSynapses = learningFactory.getNoOfDeadSynapses();
		//vm.usingStored = learningFactory.getUsingStored();
		
		//Bindable Members - methods
		vm.clearStimuli = clearStimuli;
		vm.learnStimuli = learnStimuli;
		vm.setUncondValue = setUncondValue;
		vm.setCondValue = setCondValue;
		vm.setRecallCondValue = setRecallCondValue;
		vm.recall = recall;
		vm.hasLearnt = hasLearnt;
		vm.killSynapses = killSynapses;
		$scope.attemptRecall = attemptRecall; //note had to apply this to scope as ui-grid can only speak to its containing scope through grid.appScope below 
		vm.toggleSynapseState = toggleSynapseState;
		vm.resetSynapseDeath = resetSynapseDeath;
		//vm.reStart = reStart;
		//vm.continueWithSaved = continueWithSaved;

		vm.gridOptions = {
        	expandableRowTemplate: 'views/expandableRowTemplate.html',
        	expandableRowHeight: 150,
        	onRegisterApi: function (gridApi) {
            	gridApi.expandable.on.rowExpandedStateChanged($scope, function (row) {
                	if (row.isExpanded) {
                  		row.entity.subGridOptions = {
                    		columnDefs: [
                    			{field:"id", visible: false},
                    			{field:"conditioned"},
				        		{field:"activation"},
				        		{field:"firing_rate"},
				        		{field:"binary_threshold"},
				        		{field:"chance_of_synapse_death"},
				        		{field:"no_of_dead_synapses"},
				        		{
            						field:"matched",
            						cellTemplate: '<div class="ui-grid-cell-contents"><i class=\'fa fa-{{ row.entity.matched=="true"?"check":"times" }} fa-lg\'></i></div>'
        						}
                  			]};
						row.entity.subGridOptions.data = vm.pairs[row.entity.id].recalledPairs;
						//vm.gridOptions.expandableRowHeight = vm.pairs[row.entity.id].recalledPairs.length * 10;
                    	}
                    
                	}	
            	);
        	}
      	};
 
      	vm.unlearntArray = ['unlearnt'];
      	vm.gridOptions.columnDefs = [
        	{field:"id", visible: false},
        	{ field: 'conditioned' },
		    { field: 'unconditioned' },
		    { name:'     ', cellTemplate:'<div class="ui-grid-cell-contents"><button class="btn btn-default btn-xs" ng-show="grid.appScope.isStage(2) && row.entity.conditioned[0]!=\'unlearnt\'" ng-click="grid.appScope.attemptRecall(row.entity.conditioned)">Recall</button></div>'}
      	];

      	vm.gridOptions.data = vm.pairs;

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

		function setRecallCondValue() {
			learningFactory.setRecallCondValue();
			return false;
		};

		function recall() {
			learningFactory.recall();
			return false;
		};
		function hasLearnt() {
			learningFactory.hasLearnt();
		};
		function killSynapses() {
			learningFactory.killSynapses();
		};
		function attemptRecall(conditioned) {
			learningFactory.attemptRecall(conditioned);
		};
		function toggleSynapseState(condId,uncondId){
			learningFactory.toggleSynapseState(condId,uncondId);
		};
		function resetSynapseDeath(){
			learningFactory.resetSynapseDeath();
		}
		/*function reStart(){
			learningFactory.reStart();
		}
		function continueWithSaved(){
			learningFactory.continueWithSaved();
		}*/
	};
})();