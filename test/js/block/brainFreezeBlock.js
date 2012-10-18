// test freeze magic square
// ただし、最後の結果を受けるブロックは作ってない。

// 数値ブロックの作成
var numberTerminals = (function(){
    var i;
    var numbers = ["one", "two", "three",
		   "four", "five", "six", 
		   "seven", "eight", "nine" ];
    var results = [];
    var connectors = (function(){
	var conR = [];
	for (i = 0; i < numbers.length; i++) {
	    conR[i] = new pb.Connector(numbers[i], "int", []);
	}
	return conR
    })();
    
    results[0] = new pb.Block( 
	[], [connectors[0]], function(input){
	    return [ 0 ];
	}
    );
    results[1] = new pb.Block( 
	[], [connectors[1]], function(input){
	    return [ 1 ];
	}
    );
    results[2] = new pb.Block( 
	[], [connectors[2]], function(input){
	    return [ 2 ];
	}
    );
    results[3] = new pb.Block( 
	[], [connectors[3]], function(input){
	    return [ 3 ];
	}
    );
    results[4] = new pb.Block( 
	[], [connectors[4]], function(input){
	    return [ 4 ];
	}
    );
    results[5] = new pb.Block( 
	[], [connectors[5]], function(input){
	    return [ 5 ];
	}
    );
    results[6] = new pb.Block( 
	[], [connectors[6]], function(input){
	    return [ 6 ];
	}
    );
    results[7] = new pb.Block( 
	[], [connectors[7]], function(input){
	    return [ 7 ];
	}
    );
    results[8] = new pb.Block( 
	[], [connectors[8]], function(input){
	    return [ 8 ];
	}
    );
    return results;
})();

console.log("-------- number block ---------");
var i;
var testInput = [];
for (i = 0; i < numberTerminals.length; i++) {
    console.log("number terminal i = " + i + " >> ");
    console.log(numberTerminals[i].func(testInput));
}


/*---------------------------------------------------*/

// 入力セル対応のコネクタ
var calcLinesInConnectors = (function(){
    var inCons = [];
    var i;
    var names = ["leftUpper", "upper", "rightUpper", 
		 "left", "center", "right", 
		 "leftBelow", "below", "rightBelow"];
    for (i = 0; i < names.length; i++) {
	inCons[i] = new pb.Connector(names[i], "int", ["cell"]);
    }
    return inCons;
})();

// ラインの計算結果を伝えるコネクタ
var calcLinesOutConnectors = (function(){
    var outCons = [];
    var i;
    var names = ["leftLine", "centerLine", "rightLine",
		 "rightDownLine", "rightUpLine",
		 "upperLine", "centerLine", "belowLine"];
    for (i = 0; i < names.length; i++) {
	outCons[i] = new pb.Connector(names[i], "int", ["line"]);
    }
    return outCons;
})();

// 行、列、斜めの計算ブロック
var calcLine = new pb.Block(
    calcLinesInConnectors, calcLinesOutConnectors, 
    function(input) {
	return [
	    input[0] + input[3] + input[6],
	    input[1] + input[4] + input[7],
	    input[2] + input[5] + input[8],
	    input[0] + input[4] + input[8],
	    input[2] + input[4] + input[6],
	    input[0] + input[1] + input[2],
	    input[3] + input[4] + input[5],
	    input[6] + input[7] + input[8]
	];
    }
);

console.log("----------- calc line --------");
testInput = [8, 1, 6, 3, 5, 7, 4, 9, 2];
console.log("input >> " + testInput);
console.log(calcLine.func(testInput));

// n 個の入力が等しいかを判定するブロック要素を作成する
var mekeNInputsCheck = function(n){
    
    var i;
    inputs = [];
    for (i = 0; i < n; i++) {
	inputs[i] = new pb.Connector("input", "obj", []);
    }
    return {
	inputs : inputs,
	result : new pb.Connector("result", "bool", ["kekka"]),
	func : function(input) {
	    var i, j;
	    for (i = 0; i < input.length - 1; i++) {
		for (j = i + 1; j < input.length; j++) {
		    if (input[i] !== input[j]) {
			return ["false"];
		    }
		}
	    }
	    return ["true"];
	}
    }
};

// n 個の入力が等しいかを判定するブロックを num 個作成
var sameBlocks = function(n, num){
    var i;
    var result = [];
    var block;
    for (i = 0; i < num; i++){
	block = mekeNInputsCheck(n);
	result[i] = new pb.Block(
	    block.inputs,
	    [block.result],
	    block.func
	);
    }
    return result;
};

// 3つが等しいを3ブロック
var threeSameBlocks = sameBlocks(3, 3);

// 2つが等しいを1ブロック
var twoSameBlocks = sameBlocks(2, 1);

console.log("-------- equals block --------");
var j;
for(i = 0; i < threeSameBlocks.length; i++) {
    testInput = [i, i, i];
    console.log(" Three[" + i + "] , input >> " + testInput);
    console.log(threeSameBlocks[i].func(testInput));
}


/*---------------------------------------------------*/

// 後ろのほうから接続
var connections3 = (function() {
    var results = [];
    results[0] = new pb.Connection(
	threeSameBlocks[0].outputs[0],
	threeSameBlocks[2].inputs[0]
    );
    results[1] = new pb.Connection(
	twoSameBlocks[0].outputs[0],
	threeSameBlocks[2].inputs[1]
    );
    results[2] = new pb.Connection(
	threeSameBlocks[1].outputs[0],
	threeSameBlocks[2].inputs[2]
    );
    return results;
})();

var cb1 = new pb.Combine(connections3);

console.log("-------------- cb1 ------------");
testInput = ["aaa", "aaa", "aaa", "bbb", "bbb", "ccc", "ccc", "ccc"];
console.log("input >> " + testInput);
console.log(cb1.func(testInput));

console.log("------- cb1 fail pattern -----");
testInput = ["aaa", "a", "a", "bbb", "bbb", "ccc", "ccc", "ccc"];
console.log("input >> " + testInput);
console.log(cb1.func(testInput));


var connections2 = (function(){
    var results = [];
    var i;
    for (i = 0; i < 8; i++) {
	results[i] = new pb.Connection(
	    calcLine.outputs[i],
	    cb1.inputs[i]
	);
    }
    return results;
})();
var cb2 = new pb.Combine(connections2);


console.log("----------- cb2 ----------");
testInput = [8, 1, 6, 3, 5, 7, 4, 9, 2];
console.log("input >> " + testInput);
console.log(cb2.func(testInput));

console.log("---- cb2 fail pattern ----");
testInput = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log("input >> " + testInput);
console.log(cb2.func(testInput));


var connections1 = (function(){
    var i;
    var results = [];
    
    results[0] = new pb.Connection(
	numberTerminals[7].outputs[0],
	cb2.inputs[0]
    );
    results[1] = new pb.Connection(
	numberTerminals[0].outputs[0],
	cb2.inputs[1]
    );
    results[2] = new pb.Connection(
	numberTerminals[5].outputs[0],
	cb2.inputs[2]
    );
    results[3] = new pb.Connection(
	numberTerminals[2].outputs[0],
	cb2.inputs[3]
    );
    results[4] = new pb.Connection(
	numberTerminals[4].outputs[0],
	cb2.inputs[4]
    );
    results[5] = new pb.Connection(
	numberTerminals[6].outputs[0],
	cb2.inputs[5]
    );
    results[6] = new pb.Connection(
	numberTerminals[3].outputs[0],
	cb2.inputs[6]
    );
    results[7] = new pb.Connection(
	numberTerminals[8].outputs[0],
	cb2.inputs[7]
    );
    results[8] = new pb.Connection(
	numberTerminals[1].outputs[0],
	cb2.inputs[8]
    );
    
    return results;
})();
var cb3 = new pb.Combine(connections1);

console.log("-------magic square-------");
testInput = [];
console.log("input >> " + testInput);
console.log(cb3.func(testInput));

console.log("------------end-----------");
