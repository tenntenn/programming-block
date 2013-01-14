define(
	"spec/testSample",
	[
	    "pb/model/ConnectorFactory",
	    "pb/model/Block"
	],
	function(ConnectorFactory, Block) {
		describe("テストですよー", function(){
		    
			it('テスト', function(){
				var cf = new ConnectorFactory("aaaaa", "int", ["test"]);
				var b = new Block([cf], [cf], function(){return 5;});
				expect((b.getFunc())()).to.equal(5);
			});
		});
	}
);
