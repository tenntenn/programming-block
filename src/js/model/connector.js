/**
 * コネクタを作る関数
 * @param {string} name
 * @param {string} type
 * @param {Array<string>} tags
 */
pb.model.connector = function(name, type, tags) {
	
	/**
	 * @param {block or combine} block 配置されるブロック
	 * @param {int} id ブロック内でのコネクタ番号
	 */
	return function(block, id) {
		return {
			name : name,
			type : type,
			tags : tags,
			owner : block,
			id : id,
		};
	};
};
