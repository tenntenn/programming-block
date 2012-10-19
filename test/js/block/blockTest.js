// TestSample

// block1
var bk1_in1 = pb.model.connector("x", "int", ["ikko"]);
var bk1_in2 = pb.model.connector("y", "int", ["niko", "niko"]);

var bk1_out1 = pb.model.connector("add", "int", []);
var bk1_out2 = pb.model.connector("subs", "int", []);


var bk1 = new pb.model.Block(
    // inputs
    [bk1_in1, bk1_in2],
    // outputs
    [bk1_out1, bk1_out2],
    //[bk1_out1],
    // func
    function(input) {
        return [input[0] + input[1], input[0]-input[1]];
});

/////////////// 数値
var numberTerminals = (function(){
    var i;
    var numbers = ["one", "two", "three",
		   "four", "five", "six", 
		   "seven", "eight", "nine" ];
    var results = [];
    var connectors = (function(){
	var conR = [];
	for (i = 0; i < numbers.length; i++) {
	    conR[i] = new pb.model.connector(numbers[i], "int", []);
	}
	return conR
    })();
    
    results[0] = new pb.model.Block( 
	[], [connectors[0]], function(input){
	    return [ 0 ];
	}
    );
    results[1] = new pb.model.Block(
	[], [connectors[1]], function(input){
	    return [ 1 ];
	}
    );
    results[2] = new pb.model.Block(
	[], [connectors[2]], function(input){
	    return [ 2 ];
	}
    );
    results[3] = new pb.model.Block(
	[], [connectors[3]], function(input){
	    return [ 3 ];
	}
    );
    results[4] = new pb.model.Block(
	[], [connectors[4]], function(input){
	    return [ 4 ];
	}
    );
    results[5] = new pb.model.Block(
	[], [connectors[5]], function(input){
	    return [ 5 ];
	}
    );
    results[6] = new pb.model.Block(
	[], [connectors[6]], function(input){
	    return [ 6 ];
	}
    );
    results[7] = new pb.model.Block(
	[], [connectors[7]], function(input){
	    return [ 7 ];
	}
    );
    results[8] = new pb.model.Block(
	[], [connectors[8]], function(input){
	    return [ 8 ];
	}
    );
    return results;
})();


var connections = (function(){
	var result = [];
	
	result[0] = new pb.model.Connection(
			numberTerminals[2].outputs[0],
			bk1.inputs[0]);
	result[1] = new pb.model.Connection(
			numberTerminals[5].outputs[0],
			bk1.inputs[1]);
	
	return result;
})();

var cb = new pb.model.Combine(connections);
console.log(cb.func([]));

console.log("------------end-----------");



