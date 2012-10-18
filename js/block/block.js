/**
 * 単体ブロック
 * @param {Array} inputs
 * @param {Array} outputs
 * @param {function} func
 */
pb.Block = function(inputs, outputs, func) {
    var i;
    
    var that = this;
    // input
    this.inputs = inputs;
    for (i = 0; i < inputs.length; i++) {
        this.inputs[i].owner = that;
        
        this.inputs[i].id = i;
    }

    // output
    this.outputs = outputs;
    for (i = 0; i < outputs.length; i++) {
        this.outputs[i].owner = that;
        
        this.outputs[i].id = i;
    };

    // func
    this.func = func;
    // blocks
    this.blocks = [that];
};

