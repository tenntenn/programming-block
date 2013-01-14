define(
	"spec/testSample",
	[
	    "pb/model/ConnectorFactory",
	    "pb/model/Block"
	],
	function(ConnectorFactory, Block) {
		describe("ブロックのテスト", function(){
		    
			it('定数値を返す関数の動作テスト', function(){
				var outputCF = new ConnectorFactory("output", "int", ["test"]);
				var b = new Block([], [outputCF], function(){return 1;});
				expect((b.getFunc())()).to.equal(1);
			});

			it('足し算', function(){
				var input1CF = new ConnectorFactory("input1", "int", ["test"]);
				var input2CF = new ConnectorFactory("input2", "int", ["test"]);
				var output= new ConnectorFactory("output", "int", ["test"]);
				var b = new Block([input1CF, input2CF], [output], function(inputs){return [inputs[0] + inputs[1]];});
				var result = (b.getFunc())([2, 4]);
				expect(result[0]).to.equal(6);
			});
		});

		describe("コネクタのテスト", function(){
		    
			it('コネクタが入力・出力の判断できるか', function(){
				var inputCF = new ConnectorFactory("input", "int", ["test"]);
				var outputCF = new ConnectorFactory("input", "int", ["test"]);
				var b = new Block([inputCF], [outputCF], function(){return 1;});

				var input = (b.getInputs())[0];

				expect(input.isInput()).to.be.true;
				expect(input.isOutput()).to.be.not.true;
			});
		});

	}
);
