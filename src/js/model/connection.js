/**
 * 接続を表すクラス
 * @param {pb.model.Connector} pin
 * @param {pb.model.Connector} socket
 */
pb.model.Connection = function(pin, socket) {
    this.pin = pin;
    this.socket = socket;
};
