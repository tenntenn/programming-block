// TestSample

// block1
var bk1_in1 = new pb.Connector("x", "int", ["hoge", "foo"]);
var bk1_in2 = new pb.Connector("y", "int", ["hoge", "huge"]);

var bk1_out1 = new pb.Connector("add", "int", []);
var bk1_out2 = new pb.Connector("subs", "int", []);


var bk1 = new pb.Block(
    // inputs
    [bk1_in1, bk1_in2],
    // outputs
    [bk1_out1, bk1_out2],
    // func
    function(input) {
        return [input[0] + input[1], input[0] - input[1]];
});

// block2
var bk2_in1 = new pb.Connector("a", "int", []);
var bk2_in2 = new pb.Connector("b", "int", []);
var bk2_out1 = new pb.Connector("miulti", "int", []);

var bk2 = new pb.Block(
    // inputs
    [bk2_in1, bk2_in2],
    // output
    [bk2_out1],
    // func
    function(input) {
        return [input[0] * input[1]];
});


console.log(bk1.func([3, 4]));
console.log(bk2.func([7, -1]));


// block3
var bk3_in1 = new pb.Connector("tashi", "int", []);
var bk3_in2 = new pb.Connector("hiki", "int", []);
var bk3_in3 = new pb.Connector("kake", "int", []);

var bk3_out1 = new pb.Connector("shuturyoku", "int", []);

var bk3 = new pb.Block(
    [ bk3_in1, bk3_in2, bk3_in3 ],
    [ bk3_out1 ], 
    function(input) {
        return [ input[0] + input[1] + input[2] ];
    }
);

var con1 = new pb.Connection(bk1.outputs[0], bk3.inputs[0]);
var con2 = new pb.Connection(bk1.outputs[1], bk3.inputs[1]);
var con3 = new pb.Connection(bk2.outputs[0], bk3.inputs[2]);

var cb3 = new pb.Combine([con1, con2, con3]);

console.log(cb3.func([6,3,8,2]));

console.log("------------end-----------");
