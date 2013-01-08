define(
	"pb/model/ConnectorFactory",	
	[
		"pb/model/Connector"
	],
	function(Connector) {

		/**
		 * @class ConnectorFactory
		 * @namespace pb.model.ConnectorFactory
		 * @constructor
		 * @param {string} name 生成するConnectorの名前
		 * @param {string} type 生成するConnectorの型
		 * @param {Array<string>} tags 生成するConnectorのタグ(メタ情報)
		 */
		function ConnectorFactory(name, type, tags) {

			/**
			 * コネクタを作成します。
			 * @public
			 * @method create
			 * @param {pb.model.Block} block 配置されるブロック
			 * @param {Number} id ブロック内でのコネクタ番号
			 */
			this.create = function(block, id) {
				return new Connector(
					name,
					type,
					tags,

					block,
					id
				);
			};
		}

		return ConnectorFactory;
	}
);
