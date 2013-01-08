define(
    "pb/model/Connector",
    [],
    function() {

	/**
	 * コネクタ
	 * @param {String} name 生成するConnectorの名前
         * @param {String} type 生成するConnectorの型
         * @param {Array<string>} tags 生成するConnectorのタグ(メタ情報)
	 * @param {pb.model.Block} block 配置されるブロック
         * @param {Number} id ブロック内でのコネクタ番号
	 */
	function Connector(name, type, tags, block, id) {
	    
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
	     * @property block
	     * @type {pb.model.Block}
	     */
	    _.owner = block;

	    /*
	     * ブロック内でのConnector番号です。
	     * @private
	     * @property id
	     * @type {Number}
	     */
	    _.id = id;

	    /**
	     * Connectorの名前を取得します。
	     * @method getName
	     * @return {String} Connectorの名前
	     */
	    that.getName = function(){
		return _.name;
	    }
	    
	    /**
	     * Connectorの型を取得します。
	     * @method getType
	     * @return {String} Connectorの型を取得します。
	     */
	    that.getType = function(){
		return _.type;
	    }

	    /**
	     * Connectorのタグ(メタ情報)を取得します。
	     * @method getTags
	     * @return {Array<String>} Connectorのタグ(メタ情報)
	     */
	    that.getTags = function(){
		return _.tags;
	    }

	    /**
	     * Connectorが配置されているブロックを取得します。
	     * @method getBlock
	     * @return {pb.model.Block} Connectorが配置されているブロック
	     */
	    that.getBlock = function(){
		return _.block;
	    }

	    /*
	     * ブロック内でのConnector番号を取得します。
	     * @method getId
	     * @return {Number} ブロック内でのConnector番号
	     */	    
	    that.getId = function(){
		return _.id;
	    }
	}
    }
);
