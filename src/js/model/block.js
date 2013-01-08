/**
 * 単体ブロック
 * @param {Array<function pb.model.connection>} inputs
 * @param {Array<function pb.model.connection>} outputs
 * @param {function} func
 */
pb.model.Block = function(inputConnectors, outputConnectors, func) {
    var i;
    
    var that = this;
    // input
    this.inputs = [];
    for (i = 0; i < inputConnectors.length; i++) {
    	this.inputs[i] = inputConnectors[i](that, i);
    }

    // output
    this.outputs = [];
    for (i = 0; i < outputConnectors.length; i++) {
    	this.outputs[i] = outputConnectors[i](that, i);
    };

    // func
    this.func = func;
    // blocks
    this.blocks = [that];
};
