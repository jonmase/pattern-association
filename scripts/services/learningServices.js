(function() {
	angular.module('pattern')
		.factory('learningFactory', learningFactory);
		
	//learningFactory.$inject = ['rows', 'cols', 'binary_threshold'];

	//function learningFactory(rows, cols, binary_threshold) {

	learningFactory.$inject = ['rows', 'cols'];

	function learningFactory(rows, cols) {
		//Variables
		//var stimuli = initialiseStimuli();	//For production, start with blank stimuli
		var stimuli = initialiseRandomStimuli();	//For development, start with some random stimuli set
		var synapses = initialiseSynapses();	//Set up the blank synapses array
		var stimulusPairs = initialiseStimulusPairs();	//Set up the stimulus pairs array
		var recallStimuli = initialiseRecallStimuli();	//Create empty array for stimuli
		//var recallStimulusPairs = initialiseStimulusPairs();  //Set up the recalledStimulus pairs array

		var binaryThreshold = initialiseBinaryThreshold();
		var chanceofSynapseDeath = initialiseChanceofSynapseDeath();

		//Exposed Methods
		var factory = {
			clearStimuli: clearStimuli,
			getStimuli: getStimuli,
			getStimulusPairs: getStimulusPairs,
			getSynapses: getSynapses,
			getBinaryThreshold: getBinaryThreshold,
			getChanceOfDeath: getChanceOfDeath,
			learnStimuli: learnStimuli,
			setAllSynapseValues: setAllSynapseValues,
			setCondValue: setCondValue,
			setUncondValue: setUncondValue,
			setRecallCondValue: setRecallCondValue,
			recall: recall,
			getRecallStimuli: getRecallStimuli,
			//getRecallStimulusPairs: getRecallStimulusPairs,
			hasLearnt: hasLearnt,
			attemptRecall: attemptRecall
		};
		return factory;
		
		//Methods
		//Clear the stimuli and reset the synapses to their saved values
		function clearStimuli() {
			//Reset all the stimuli to 0
			for(var condId = 0; condId < stimuli.conditioned.length; condId++) {
				stimuli.conditioned[condId] = 0;
				for(var uncondId = 0; uncondId < stimuli.unconditioned.length; uncondId++) {
					stimuli.unconditioned[uncondId] = 0;
				}
			}
			setAllSynapseValues();	//Set the synapse values - as their are no stimuli set, this will just be the saved values
		};
		
		function getStimuli() { 
			return stimuli;
		};

		function getRecallStimuli() { 
			return recallStimuli;
		};
		
		function getStimulusPairs() { 
			return stimulusPairs;
		};

		/*function getRecallStimulusPairs() { 
			return recallStimulusPairs;
		};*/
		
		function getSynapses() { 
			return synapses;
		};

		function getBinaryThreshold() { 
			return binaryThreshold;
		};
		
		function initialiseBinaryThreshold(){
			var binaryThreshold={threshold:2};
			return binaryThreshold;
		};

		function getChanceOfDeath() { 
			return chanceOfDeath;
		};
		
		function initialiseChanceOfDeath(){
			var chanceOfDeath={chance:0.1};
			return chanceOfDeath;
		};

		//Set some of the stimuli at random
		//Note - can result in all the stimuli (for either conditioned or unconditioned, or both) as blank, which results in blank synapses
		function initialiseRandomStimuli() {
			var stimuli = initialiseStimuli();
			
			for(var i = 0; i < cols; i++) {
				stimuli.unconditioned[i] = Math.round(Math.random());
			}
			for(var i = 0; i < rows; i++) {
				stimuli.conditioned[i] = Math.round(Math.random());
			}
			
			return stimuli;
		};
		
		//Set up blank stimuli
		function initialiseStimuli() { 
			var stimuli = {
				conditioned: [],
				unconditioned: [],
			};
			
			return stimuli;
		};
		
		//Set up the stimulus pairs array
		function initialiseStimulusPairs() { 
			var stimulusPairs = [];
			return stimulusPairs;
		};
		
		//Set up blank synapses (temp and saved)
		function initialiseSynapses() { 
			var emptySynapses = [];
			for(var i = 0; i < rows; i++) {
				emptySynapses[i] = [];
				for(var j = 0; j < cols; j++) {
					emptySynapses[i][j] = 0;
				}
			}
			
			var synapses = {
				saved: angular.copy(emptySynapses),
				temp: angular.copy(emptySynapses),
			};

			return synapses;
		};
		
		//Set up blank RecalledStimuli (temp and saved)
		function initialiseRecallStimuli(){
			//var recallStimuli = initialiseStimuli();

			var recallStimuli = {
				conditioned: [],
				activation: [],  
				firing_rate: []
			};

			for(var condId = 0; condId < rows; condId++) {
				recallStimuli.conditioned[condId] = 0;
				}
			
			return recallStimuli;
		};
		
		//Learn the stimuli 
		function learnStimuli() {
			//Add the stimuli to the stimuliPairs array
			stimulusPairs.push({
				id: stimulusPairs.length,
				unconditioned: angular.copy(stimuli.unconditioned),
				conditioned: angular.copy(stimuli.conditioned),
				recalledPairs:[]
			});
			saveCurrentSynapseValues();
			clearStimuli();
		};

		//Recall the stimuli 
		function recall() {
			var matched = "false"; 
			var conditionedFound = false;
			var unlearntId = null;
			for(var i=0; i<stimulusPairs.length;i++){
				if(angular.equals(stimulusPairs[i].conditioned, recallStimuli.conditioned)){
					conditionedFound = true;
					if(angular.equals(stimulusPairs[i].unconditioned, recallStimuli.firing_rate)){
						matched = "true"; 
						}
					stimulusPairs[i].recalledPairs.push({
						id: stimulusPairs[i].recalledPairs.length,
						activation: angular.copy(recallStimuli.activation),
						conditioned: angular.copy(recallStimuli.conditioned),
						firing_rate: angular.copy(recallStimuli.firing_rate),
						binary_threshold: binaryThreshold.threshold,
						matched: matched
						});
					}
				else if(stimulusPairs[i].conditioned[0] == 'unlearnt'){
					unlearntId = i;
					}
				}
			if(!conditionedFound){  //this recall attempt wasn't one of the learnt ones
				if(unlearntId==null){//if we don't already have an unlearnt stimulus pair, create one?
					unlearntId = stimulusPairs.length;
					stimulusPairs.push({
						id: unlearntId,
						unconditioned: ['unlearnt'],
						conditioned: ['unlearnt'],
						recalledPairs:[]
						});
					}
				//add thus unlearnt recall to the unlearnt stimulusPair
				stimulusPairs[unlearntId].recalledPairs.push({
					id: stimulusPairs[unlearntId].recalledPairs.length,
					activation: angular.copy(recallStimuli.activation),
					conditioned: angular.copy(recallStimuli.conditioned),
					firing_rate: angular.copy(recallStimuli.firing_rate),
					binary_threshold: binaryThreshold.threshold,
					matched: "false" //can't match an unlearnt stimulus
					});

				}
		};

		//Clear the stimuli and reset the synapses to their saved values
		function clearRecallStimuli() {
			//Reset all the stimuli to 0
			for(var condId = 0; condId < recallStimuli.conditioned.length; condId++) {
				recallStimuli.conditioned[condId] = 0;
				}
			for(var uncondId = 0; uncondId < recallStimuli.activation.length; uncondId++) {
				recallStimuli.activation[uncondId] = 0;
				}
			for(var uncondId = 0; uncondId < recallStimuli.firing_rate.length; uncondId++) {
				recallStimuli.firing_rate[uncondId] = 0;
				}
		};


		//Save the current values of the synapses
		function saveCurrentSynapseValues() {
			//For each synapse, copy the temp value into the saved array
			for(var condId = 0; condId < synapses.temp.length; condId++) {
				for(var uncondId = 0; uncondId < synapses.temp[condId].length; uncondId++) {
					synapses.saved[condId][uncondId] = synapses.temp[condId][uncondId];
				}
			}
		};
		
		//Update all the synapse values
		function setAllSynapseValues() {
			for(var condId = 0; condId < synapses.temp.length; condId++) {
				for(var uncondId = 0; uncondId < synapses.temp[condId].length; uncondId++) {
					setSynapseValue(condId, uncondId);
				}
			}
		};
		
		//Set the value of a conditioned stimulus
		function setCondValue(condId) {
			for(var uncondId = 0; uncondId < synapses.temp[condId].length; uncondId++) {
				setSynapseValue(condId, uncondId);
			}
		};

		//Calculate firing rates and activations
		function setRecallCondValue() {
			for(var uncondId = 0; uncondId < cols; uncondId++) {
				recallStimuli.activation[uncondId] = 0;
				recallStimuli.firing_rate[uncondId]= 0;
				for(var condId = 0; condId < rows; condId++) {	
					if(recallStimuli.conditioned[condId]){
						recallStimuli.activation[uncondId]+= synapses.saved[condId][uncondId];
						if(recallStimuli.activation[uncondId]>=binaryThreshold.threshold){
							recallStimuli.firing_rate[uncondId]=1;
						}else{
							recallStimuli.firing_rate[uncondId]=0;
						}
					}
				}		
			}
		};
		
		//Set the value of an unconditional stimulus
		function setUncondValue(uncondId) {
			for(var condId = 0; condId < synapses.temp.length; condId++) {
				setSynapseValue(condId, uncondId);
			}
		};
		
		//Set a synapse value by adding the result of the current stimuli to the saved value
		function setSynapseValue(condId, uncondId) {
			synapses.temp[condId][uncondId] = synapses.saved[condId][uncondId] + stimuli.unconditioned[uncondId] * stimuli.conditioned[condId];
		};

		//Do we have at least one saved learn?
		function hasLearnt() {
			if(stimulusPairs.length>0){
				return true;
			}else{
				return false;
			}
		};

		//attempt recall from conditioned value
		function attemptRecall(conditioned){
			recallStimuli.conditioned = angular.copy(conditioned);
			setRecallCondValue();
		}
	}
})();