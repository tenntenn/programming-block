/**
 * 接続
 * @param {sb.Connector} pin
 * @param {sb.Connector} socket
 */
pb.Connection = function(pin, socket) {
    this.pin = pin;
    this.socket = socket;
};
