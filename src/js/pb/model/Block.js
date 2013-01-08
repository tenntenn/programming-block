define(
	"pb/model/Block",
	[],
	function() {

		/**
	 	 * 結合されていないブロックです。
		 * @class Block
		 * @namespace pb.model
		 * @constructor
		 *
	 	 * @param {Array<pb.model.ConnectorFactory>} inputConnectorFactories 入力用のConnectorを生成するファクトリ
	 	 * @param {Array<pb.model.ConnectorFactory>} outputConnectorFactories 出力用のConnectorを生成するファクトリ
	 	 * @param {Function} func ブロックが行なう処理
		 * @param {Array<pb.model.Block>} [combinedBlocks] 結合元のブロック
	 	 */
		function Block(inputConnectorFactories, outputConnectorFactories, func, combinedBlocks) {
			
			// 引数チェック
			if (!Array.isArray(inputConnectors)) {
				throw new Exception("first argument must be Array.");
			} else if (!Array.isArray(outputConnectors)) {
				throw new Exception("second argument must be Array.");
			}

			// オブジェクト
			var that = this;

			// privateな変数
			var _ = {};

			/**
			 * 入力Connectorです。 
			 * @private
			 * @property inputs
			 * @type {Array<pb.model.Connector>}
			 */	
			_.inputs = inputConnectorFactories.map(function(factory, i) {
				return factory.create(that, i);
			});

			/**
			 * 出力Connectorです。
			 * @private
			 * @property outputs
			 * @type {Array<pb.model.Connector>}
			 */
			_.outputs = outputConnectorFactories.map(function(factory, i) {
				return factory.create(that, i);
			});		

			/**
			 * ブロックが行なう処理です。
			 * @private
			 * @property func
			 * @type {Function}
			 */
			_.func = func;

			/**
			 * 結合元のブロックです。
			 * @private
			 * @property combinedBlocks
			 * @type {Array<pb.model.Block>}
			 */
			if (combinedBlocks && Array.isArray(combinedBlocks)) {
				_.combinedBlocks = combinedBlocks.slice(0);
			} else {
				_.combinedBlocks = [that];
			}

			/**
			 * 入力Connectorを取得します。
			 * @public
			 * @method getInputs
			 * @return {Array<pb.model.Connector>} 入力Connectorの配列
			 */
			that.getInputs = function() {
				return _.inputs.slice(0);
			};	

			/**
			 * 出力Connectorを取得します。
			 * @public
			 * @method getOutputs
			 * @return {Array<pb.model.Connector>} 出力Connectorの配列
			 */
			that.getOutputs = function() {
				return _.outputs.slice(0);
			};

			/**
			 * ブロックが行なう処理を取得します。
			 * @public
			 * @method getFunc
			 * @return {Function} ブロックが行なう処理
			 */
			that.getFunc = function() {
				return _.func;
			};	

			/**
			 * 結合元のブロックを取得します。
			 * @public
			 * @method getCombinedBlocks
			 * @return {Array<pb.model.Block>} 結合元のブロックの配列
			 */
			that.getCombinedBlocks = function() {
				return _.combinedBlocks.slice(0);
			};
		}

		return Block;
	}
);
