// binding block test

// observabale となるオブジェクトの生成
var hoge = sb.observable(100);




var hogeOutConnector = new pb.Connector("hoge", "int", []);
var hogeTerminal = new pb.Block(
		[], [hogeOutConnector], function(input) {			
			return hoge
		}
		
);

var hogeOutConnector = new pb.Connector("hoge", "int", []);
var hogeTerminal = new pb.Block(
		[], [hogeOutConnector], function(input) {			
			return hoge; 
			});


// block1
var bk1_in1 = new pb.Connector("x", "int", ["hoge", "foo"]);

var bk1_out1 = new pb.Connector("twice", "int", ["twice"]);

var bk1 = new pb.Block(
    // inputs
    [bk1_in1],
    // outputs
    [bk1_out1],
    // func
    function(input) {
        return [input[0] * 2];
});

var foo = sb.observable(10);

var binding = new sb.Binding(
		{hoge : hoge},
		{foo : foo},
		function(input) {
			return {foo : bk1.func([input.hoge()])[0]};
		}
		);

binding.bind();
console.log("-----------start----------");
console.log(hoge());
console.log(foo());
console.log("-----------input----------");
hoge(500);
console.log(hoge());
console.log(foo())


console.log("------------end-----------");
