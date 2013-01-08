define(
	"pb/model/Block",
	[],
	function() {

		/**
	 	 * 単体ブロック
	 	 * @param {Array<function pb.model.connection>} inputs
	 	 * @param {Array<function pb.model.connection>} outputs
	 	 * @param {function} func
	 	 */
		function Block(inputConnectors, outputConnectors, func) {
			
			// 引数チェック
			if (!Array.isArray(inputConnectors)) {
				throw new Exception("first argument must be Array.");
			} else if (!Array.isArray(outputConnectors)) {
				throw new Exception("second argument must be Array.");
			}

			// inputs	
			this.inputs = inputConnectors.map(function(inputConnector, i) {
				this.inputs[i] = inputConnector(that, i);
			});

			// outputs
			this.outputs = outputConnectors.map(function(outputConnector, i) {
				this.outputs[i] = outputConnector(that, i);
			});	

			// func
			this.func = func;

			// blocks
			this.blocks = [this];
		}

		return Block;
	}
);
