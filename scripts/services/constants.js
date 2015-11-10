(function() {
	angular.module('pattern')
		.constant('rows', 6)	//Conditioned
		.constant('cols', 4)	//Unconditioned
		.constant('init_stage', 1) //ie start at learning screen for now: 0=setup; 1=learn; 2=recall; mayeb 3=recall with die off?
		//.constant('binary_threshold', 2);  //ie min activation to create firing rate of 1
})();