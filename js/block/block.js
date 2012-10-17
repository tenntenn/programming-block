
/**
 * コネクタ
 * @param {string} name
 * @param {string} type
 * @param {Array<string>} tags
 */
pb.connector = function(name, type, tags) {
    this.name = name;
    this.type = type;
    this.tags = tags;
}

/**
 * 接続
 * @param {sb.connector} pin
 * @param {sb.connector} socket
 */
pb.connection = function(pin, socket) {
    this.pin = pin;
    this.socket = socket;
}

/**
 * 単体ブロック
 * @param {Array} inputs
 * @param {Array} outputs
 * @param {function} func
 */
pb.block = function(inputs, outputs, func) {
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
        
        this.outputs[i].id = i
    };

    // func
    this.func = func;
    // blocks
    this.blocks = [that];
}


/**
 * 結合ブロック
 * @param {Array<sb.connection>} connections
 */
pb.combine = function(connections) {

    var i;
    
    var that = this;
    
    var connectionList = [];
    // 接続を記憶
    for (i = 0; i < connections.length; i++) {
        connectionList[i] = {
            pin : {
                connector : connections[i].pin,
                owner : connections[i].pin.owner,
                id : connections[i].pin.id
            },
            socket : {
                connector : connections[i].socket.owner,
                owner : connections[i].socket.owner,
                id : connections[i].socket.id
            }
        };
    }
    
    var removeConnector = function(array, connector) {
        var i;
        for (i = array.length - 1; i >= 0; i--) {
            if (array[i] === connector) {
                array.splice(i, 1);
            }
        }
        return array;
    };
    
    var exists = function(array, element) {
        var i;
        for (i = 0; i < array.length; i++) {
            if (array[i] === element) {
                return true;
            }
        }
        return false;
    };
    
    var toUniqueArray = function(array) {
        var i;
        var uniqueArray = [];
        for (i = 0; i < array.length; i++) {
            if (!exists(uniqueArray, array[i])) {
                uniqueArray.push(array[i]);
            }
        }
        return uniqueArray;
    };
    
    var findIndexByBlock = function(array, block) {
        var i;
        for (i = 0; i < array.length; i++) {
            if (array[i].block === block) {
                return i;
            }
        }
        return -1;
    };
    
    
    // 入力ブロック
    var pinBlocks = [];
    var socketBlocks = [];
    for (i = 0; i < connections.length; i++) {
        if (findIndexByBlock(pinBlocks, connections[i].pin.owner) == -1) {
            pinBlocks.push({
                block : connections[i].pin.owner,
                connect : [],
                unconnect : []
               } );
           }
           if (findIndexByBlock(socketBlocks, connections[i].socket.owner) == -1) {
            socketBlocks.push({
                block : connections[i].socket.owner,
                connect : [],
                unconnect : []
               } );
           }
    }
    
    (function() {
        var i, j;
        var pinBlockIndex;
        var socketBlockIndex;
        
        for (i = 0; i < connections.length; i++) {
            pinBlockIndex = findIndexByBlock(pinBlocks, connections[i].pin.owner);
            pinBlocks[pinBlockIndex].connect.push(connections[i].pin.id);
            
            socketBlockIndex = findIndexByBlock(socketBlocks, connections[i].socket.owner);
            socketBlocks[socketBlockIndex].connect.push(connections[i].socket.id);
        }
        
        for (i = 0; i < pinBlocks.length; i++) {
            for (j = 0; j < pinBlocks[i].block.outputs.length; j++) {
                if (!exists(pinBlocks[i].connect, j)) {
                    pinBlocks[i].unconnect.push(j);
                }
            }
            pinBlocks[i].connect.sort;
        }
        for (i = 0; i < socketBlocks.length; i++) {
            for (j = 0; j < socketBlocks[i].block.inputs.length; j++) {
                if (!exists(socketBlocks[i].connect, j)) {
                    socketBlocks[i].unconnect.push(j);
                }
            }
            socketBlocks[i].connect.sort;
        }
    })();
    
    
    // inputs, outputs
    this.inputs = [];
    this.outputs = [];
    for (i = 0; i < pinBlocks.length; i++) {
        this.inputs = this.inputs.concat(pinBlocks[i].block.inputs);
        this.outputs = this.outputs.concat(pinBlocks[i].block.outputs);
    }
    for (i = 0; i < socketBlocks.length; i++) {
        this.inputs = this.inputs.concat(socketBlocks[i].block.inputs);
        this.outputs = this.outputs.concat(socketBlocks[i].block.outputs);
    }
    for (i = 0; i < connections.length; i++) {
        this.inputs = removeConnector(this.inputs, connections[i].socket);
        this.outputs = removeConnector(this.outputs, connections[i].pin);
    }
    for (i = 0; i < this.inputs.length; i++) {
        this.inputs[i].owner = that;
        this.inputs[i].id = i;
    }
    for (i = 0; i < this.outputs.length; i++) {
        this.outputs[i].owner = that;
        this.outputs[i].id = i;
    }
    

    // blocks
    this.blocks = [];
    for (i = 0; i < connections.length; i++) {
        this.blocks = this.blocks.concat(connections[i].pin.owner.blocks);
    }
    for (i = 0; i < connections.length; i++) {
        this.blocks = this.blocks.concat(connections[i].socket.owner.blocks);
    }
    this.blocks = toUniqueArray(this.blocks);
    
    var findConnectionBySocket = function(owner, id){
        var i;
        for (i = 0; i < connectionList.length; i++) {
            if (connectionList[i].socket.owner === owner
                 && connectionList[i].socket.id === id) {
                
                return connectionList[i].pin;
            }
        }
        return -1;
    };
    
    
    // func
    this.func = function(input){
        
        var i, j;
        var result = [];
        
        // ブロックごとに分割した入力
        var sourceInputSets = [];
        var destInputSets = [];
        (function(){
            var inputIndex = 0;
            var inputNum;
            for (i = 0; i < pinBlocks.length; i++) {
                inputNum = pinBlocks[i].block.inputs.length;
                sourceInputSets[i] = input.slice(inputIndex, inputIndex + inputNum);
                inputIndex += inputNum;
            }
            for (i = 0; i < socketBlocks.length; i++) {
                inputNum = socketBlocks[i].unconnect.length;
                destInputSets[i] = input.slice(inputIndex, inputIndex + inputNum);
                inputIndex += inputNum;
            }
        })();
        
        // 雄ブロック側の計算
        var sourceResults = [];
        for (i = 0; i < pinBlocks.length; i++) {
            sourceResults[i] = pinBlocks[i].block.func(sourceInputSets[i]);
        }
        
        // 雄ブロックの計算結果を、雌ブロックの入力へ差し込む
        (function() {
            var i, j;
            var socket;
            var pin;
            var pinIndex;
            var connectedPosition;
            for (i = 0; i < socketBlocks.length; i++) {
                socket = socketBlocks[i].block;
                for (j = 0; j < socketBlocks[i].connect.length; j++) {
                    connectedPosition = socketBlocks[i].connect[j];
                    pin = findConnectionBySocket(socket, connectedPosition);
                    
                    pinIndex = findIndexByBlock(pinBlocks, pin.owner);
                    
                    destInputSets[i].splice(connectedPosition, 0, sourceResults[pinIndex].slice(pin.id, pin.id + 1)[0]);
                }
            }
            for (i = 0; i < sourceResults.length; i++) {
                for (j = pinBlocks.length - 1; j >= 0; j--) {
                    sourceResults[i].splice(j, 1);
                }
            }
        })();
        
        // 雌ブロックの計算
        var destResults = [];
        for (i = 0; i < socketBlocks.length; i++) {
            destResults = socketBlocks[i].block.func(destInputSets[i]);
        }
        
        for (i = 0; i < sourceResults.length; i++) {
            result = result.concat(sourceResults[i]);
        }
         for (i = 0; i < destResults.length; i++) {
             result = result.concat(destResults[i]);
         }
        return result;
    };
}

