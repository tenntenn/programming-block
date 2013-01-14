define(
	"pb/model/Connector",
	[],
	function() {

		/**
		 * コネクタです。
		 * ブックの接続部分を表します。
		 * 入力と出力の両方に使用されます。
		 * @class Connector
		 * @namespace pb.model
		 * @constructor
		 *
		 * @param {String} name 生成するConnectorの名前
		 * @param {String} type 生成するConnectorの型
		 * @param {Array<String>} tags 生成するConnectorのタグ(メタ情報)
		 * @param {pb.model.Block} owner 配置されるブロック
		 * @param {Number} id ブロック内でのコネクタ番号
		 */
		function Connector(name, type, tags, owner, id) {

			var that = this;

			// private property
			var _ = {};

			/**
			 * Connectorの名前です。
			 * @private
			 * @property name
			 * @type {String}
			 */
			_.name = name;

			/**
			 * Connectorの型です。
			 * @private
			 * @property type
			 * @type {String}
			 */
			_.type = type;

			/**
			 * Connectorのタグ(メタ情報)です。
			 * @private
			 * @property tags
			 * @type {Array<String>}
			 */
			_.tags = tags;

			/**
			 * Connectorが配置されているブロックです。
			 * @private
			 * @property owner
			 * @type {pb.model.Block}
			 */
			_.owner = owner;

			/*
			 * ブロック内でのConnector番号です。
			 * @private
			 * @property id
			 * @type {Number}
			 */
			_.id = id;

			/**
			 * Connectorの名前を取得します。
			 * @public
			 * @method getName
			 * @return {String} Connectorの名前
			 */
			that.getName = function(){
				return _.name;
			};

			/**
			 * Connectorの型を取得します。
			 * @public
			 * @method getType
			 * @return {String} Connectorの型を取得します。
			 */
			that.getType = function(){
				return _.type;
			};

			/**
			 * Connectorのタグ(メタ情報)を取得します。
			 * @public
			 * @method {Array<String>} getTags
			 * @return Connectorのタグ(メタ情報)
			 */
			that.getTags = function(){
				return _.tags;
			};

			/**
			 * Connectorが配置されているブロックを取得します。
			 * @public
			 * @method getOwner
			 * @return {pb.model.Block} Connectorが配置されているブロック
			 */
			that.getOwner= function(){
				return _.owner;
			};

			/**
			 * ブロック内でのConnector番号を取得します。
			 * @public
			 * @method getId
			 * @return {Number} ブロック内でのConnector番号
			 */
			that.getId = function(){
				return _.id;
			};

			/**
			 * Connectorが入力コネクタかどうか取得します。
			 * @public
			 * @method isInput
			 * @return {Boolean} 入力コネクタである場合は、true
			 */
			that.isInput = function(){
				var connectorIndex = _.owner.getInputs().indexOf(that);

				if (connectorIndex < 0) {
					return false;
				}
				return true;
			};

			/**
			 * Connectorが出力コネクタかどうか取得します。
			 * @public
			 * @method isOutput
			 * @return {Boolean} 出力コネクタである場合は、true
			 */
			that.isOutput = function(){
				var connectorIndex = _.owner.getOutputs().indexOf(that);

				if (connectorIndex < 0) {
					return false;
				}
				return true;
			};

		}
		return Connector;
	}
);
