#!/bin/bash

pushd `dirname $0` > /dev/null


blockJsFiles="../../../js/block/model.js ../../../js/block/connector.js ../../../js/block/connection.js ../../../js/block/block.js ../../../js/block/combine.js"    
cat ../../../js/package.js $blockJsFiles blockTest.js | node
popd > /dev/null

