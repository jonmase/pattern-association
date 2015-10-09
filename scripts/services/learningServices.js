(function() {
	angular.module('pattern.learning', [])
		.factory('learningFactory', learningFactory);
		
	learningFactory.$inject = ['rows', 'cols'];

	function learningFactory(rows, cols) {
		//var stimuli = initialiseStimuli();	//For production, start with blank stimuli
		var stimuli = initialiseRandomStimuli();	//For development, start with some random stimuli set
		var synapses = initialiseSynapses();	//Set up the blank synapses array
		var stimulusPairs = initialiseStimulusPairs();	//Set up the stimulus pairs array

		var factory = {
			clearStimuli: clearStimuli,
			getStimuli: getStimuli,
			getStimulusPairs: getStimulusPairs,
			getSynapses: getSynapses,
			learnStimuli: learnStimuli,
			setAllSynapseValues: setAllSynapseValues,
			setCondValue: setCondValue,
			setUncondValue: setUncondValue,
		}
		return factory;
		
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
		}
		
		function getStimulusPairs() { 
			return stimulusPairs;
		}
		
		function getSynapses() { 
			return synapses;
		}
		
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
		}
		
		//Set up blank stimuli
		function initialiseStimuli() { 
			var stimuli = {
				conditioned: [],
				unconditioned: [],
			};
			
			return stimuli;
		}
		
		//Set up the stimulus pairs array
		function initialiseStimulusPairs() { 
			var stimulusPairs = [];
			return stimulusPairs;
		}
		
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
		}
		
		//Learn the stimuli 
		function learnStimuli() {
			//Add the stimuli to the stimuliPairs array
			stimulusPairs.push({
				unconditioned: angular.copy(stimuli.unconditioned),
				conditioned: angular.copy(stimuli.conditioned),
			});
			saveCurrentSynapseValues();
			clearStimuli();
		}

		//Save the current values of the synapses
		function saveCurrentSynapseValues() {
			//For each synapse, copy the temp value into the saved array
			for(var condId = 0; condId < synapses.temp.length; condId++) {
				for(var uncondId = 0; uncondId < synapses.temp[condId].length; uncondId++) {
					synapses.saved[condId][uncondId] = synapses.temp[condId][uncondId];
				}
			}
		}
		
		//Update all the synapse values
		function setAllSynapseValues() {
			for(var condId = 0; condId < synapses.temp.length; condId++) {
				for(var uncondId = 0; uncondId < synapses.temp[condId].length; uncondId++) {
					setSynapseValue(condId, uncondId);
				}
			}
		}
		
		//Set the value of a conditional stimulus
		function setCondValue(condId) {
			for(var uncondId = 0; uncondId < synapses.temp[condId].length; uncondId++) {
				setSynapseValue(condId, uncondId);
			}
		}
		
		//Set the value of an unconditional stimulus
		function setUncondValue(uncondId) {
			for(var condId = 0; condId < synapses.temp.length; condId++) {
				setSynapseValue(condId, uncondId);
			}
		}
		
		//Set a synapse value by adding the result of the current stimuli to the saved value
		function setSynapseValue(condId, uncondId) {
			synapses.temp[condId][uncondId] = synapses.saved[condId][uncondId] + stimuli.unconditioned[uncondId] * stimuli.conditioned[condId];
		}
	}
})();