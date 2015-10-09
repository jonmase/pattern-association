var mode = "learning";

var rows = 6;	//Conditioned
var cols = 4;	//Unconditioned
var cellCount = cols * rows;
		
var stimuli = {
	conditioned: [],
	unconditioned: [],
};
var synapses = [];
for(var j = 0; j < cols; j++) {
	stimuli.unconditioned[j] = Math.round(Math.random());
}
for(var i = 0; i < rows; i++) {
	stimuli.conditioned[i] = Math.round(Math.random());
	synapses[i] = [];
	for(var j = 0; j < cols; j++) {
		synapses[i][j] = 0;
	}
}

var stimulusPairs = [];