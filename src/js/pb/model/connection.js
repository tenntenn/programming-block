define(
	"pb.model.Connection",
	[],
	function() {

		/**
		 * 接続を表すクラスです。
		 * @class Connection
		 * @namespace pb.model
		 * @constructor
		 *
		 * @param {pb.model.Connector} from データの送信元のConnector
		 * @param {pb.model.Connection} to データの送信先のConnector
		 */
		function Connection(from, to) {
			var that = this;
			var _ = {};

			/**
			 * データの送信元のConnectorです。
			 * @private
			 * @property from
			 * @type {pb.model.Connector}
			 */
			_.from = from;

			/**
			 * データの送信先のConnectorです。
			 * @private
			 * @property to
			 * @type {pb.model.Connector}
			 */
			_.to = to;

			/**
			 * データの送信元のConnectorを取得します。
			 * @public
			 * @method getFrom
			 * @return {pb.model.Connector} データの送信元のConnector
			 */
			that.getFrom = function() {
				return _.from;
			};

			/**
			 * データの送信先のConnectorを取得します。
			 * @public
			 * @method getTo
			 * @return {pb.model.Connector} データの送信先のConnector
			 */
			that.getTo = function() {
				return _.to;
			};

		}

		return Connection;
	}
);
