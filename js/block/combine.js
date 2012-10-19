/**
 * 結合ブロック
 * @param {Array<pb.model.Connection>} connections
 */
pb.model.Combine = function(connections) {

    var i;
    
    var that = this;
    
    var connectionList = [];
    // 接続を記憶
    connections.forEach(function(connection, index){
    	connectionList[index] = {
    		pin : {
    			connector : connection.pin
    		},
    		socket : {
    			connector : connection.socket
    		}
    	};
    });
    
    var toUniqueArray = function(array) {
        var i;
        var uniqueArray = [];
        for (i = 0; i < array.length; i++) {
        	if (array.every(
        			function(element){
        				return element !== uniqueArray[i];
        			}
        	)) {
        		uniqueArray.push(array[i]);
        	}
        }
        return uniqueArray;
    };
    
    // 入力ブロックと出力ブロックの全てのコネクタ情報
    var pinBlocks = [];
    var socketBlocks = [];
    connections.forEach(function(connection){
    	if (pinBlocks.every(
    			function(block) {
    				return block.block !== connection; 
    			})) {
    		pinBlocks.push({
    			block : connection.pin.owner,
    			connect : [],
    			unconnect : []
    		});
    	}
    	
    	if (socketBlocks.every(
    			function(block){
    				return block.block !== connection;
    			})) {
    		socketBlocks.push({
    			block : connection.socket.owner,
    			connect : [],
    			unconnect : []
    		});
    	}
    });
    
    // 入力ブロックのコネクタ情報を求める
    pinBlocks.forEach(function(pinBlock){
    	pinBlock.block.outputs.forEach(function(outputConnector){
    		if (pinBlock.connect.indexOf(outputConnector) == -1) {
    			pinBlock.connect.push(outputConnector);
    		} else {
    			pinBlock.unconnect.push(outputConnector);
    		}     			
    	});
    });
    // 出力ブロックのコネクタ情報を求める
    socketBlocks.forEach(function(socketBlock){
    	socketBlock.block.inputs.forEach(function(inputConnector){
			if (socketBlock.connect.indexOf(inputConnector) == -1) {
				socketBlock.connect.push(inputConnector);
			} else {
				socketBlock.unconnect.push(inputConnector);
			}     			
		});
	});
	
    
    // まとめたブロックの入力と出力コネクタを得る
    this.inputs = [];
    this.outputs = [];
    
    (function(){
    	var inputConnectorFuncs = [];
    	var outputConnectorFuncs = [];
    	// ブロックのコネクタのうち接続がないものだけを、いれる
    	
    	// ブロックから、接続のないコネクタを作る関数を取得
    	var connectorSearch = function(connectBlock) {
    		connectBlock.block.inputs.forEach(
    				function(inputConnector){
    					if (connectBlock.connect.indexOf(inputConnector) == -1) {
    						inputConnectorFuncs.push(pb.model.connector(
    								inputConnector.name, 
    								inputConnector.type,
    								inputConnector.tag));
    					}
    				}
    		);
    		
    		connectBlock.block.outputs.forEach(
    				function(outputConnector){
    					if (connectBlock.connect.indexOf(outputConnector) == -1) {
    						outputConnectorFuncs.push(pb.model.connector(
    								outputConnector.name, 
    								outputConnector.type,
    								outputConnector.tag));
    					}
    				}
    		);
    	};
    	
    	pinBlocks.forEach(connectorSearch);
    	socketBlocks.forEach(connectorSearch);
    	
    	// input
    	for (i = 0; i < inputConnectorFuncs.length; i++) {
    		that.inputs[i] = inputConnectorFuncs[i](that, i);
    	}
    	
    	// output
    	this.outputs = [];
    	for (i = 0; i < outputConnectorFuncs.length; i++) {
    		that.outputs[i] = outputConnectorFuncs[i](that, i);
    	};
    	
    })();
    
    
    // blocks
    var allBlocks = [];
    connections.forEach(function(connection){
    	allBlocks = allBlocks.concat(connection.pin.owner.blocks);
    });
    connections.forEach(function(connection){
    	allBlocks = allBlocks.concat(connection.socket.owner.blocks);
    });
    this.blocks = toUniqueArray(allBlocks);
    
    // func
    this.func = function(input){
        
        var i;
        var result = [];
        
        // ブロックごとに分割した入力
        var sourceInputSets = [];
        var destInputSets = [];
        
        pinBlocks.forEach(function(connectBlock, index) {
        	sourceInputSets[index] = input.splice(0, connectBlock.block.inputs.length);
        });
        
        socketBlocks.forEach(function(connectBlock, index) {
        	destInputSets[index] = input.splice(0, connectBlock.block.inputs.length);
        });
                
        // 雄(入力)ブロック側の計算
        var sourceResults = [];
        pinBlocks.forEach(function(pinBlock, index){
        	sourceResults[index] = pinBlock.block.func(sourceInputSets[index]);
        });
        
        
        // 入力ブロックの計算結果を、出力ブロックの入力へ差し込む
        (function() {
            var i, j;
                        
            socketBlocks.forEach(function(socketBlock, index){
            	
            	socketBlock.connect.forEach(function(connectedSocketConnector){
            		
            		var pinConnector = (function(block, connector) {
            			var i;
            			for (i = 0; i < connectionList.length; i++){
            				if (connectionList[i].socket.connector === connector) {
            					return connectionList[i].pin.connector;
            				} 
            			}
            		})(socketBlock, connectedSocketConnector);
            		
            		var connectedPosition = connectedSocketConnector.id;
            		
            		var pinBlockIndex = (function(){
            			var i;
            			for (i = 0; i < pinBlocks.length; i++) {
            				if (pinBlocks[i].block === pinConnector.owner) {
            					return i;
            				}
            			}
            			return -1;
            		})();
            		
            		// 出力ブロックの入力に差し込む
            		destInputSets[index].splice(
            				connectedPosition,
            				0,
            				sourceResults[pinBlockIndex].slice(pinConnector.id, pinConnector.id + 1)[0]);
            	});
            });
            
            // 差し込んだ雄ブロックの出力を削除
            for (i = 0; i < pinBlocks.length; i++) {
                for (j = pinBlocks[i].connect.length - 1; j >= 0; j--) {
                    sourceResults[i].splice(pinBlocks[i].connect[j], 1);
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
};
