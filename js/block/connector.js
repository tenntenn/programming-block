/**
 * コネクタ
 * @param {string} name
 * @param {string} type
 * @param {Array<string>} tags
 */
pb.Connector = function(name, type, tags) {
    this.name = name;
    this.type = type;
    this.tags = tags;
};
