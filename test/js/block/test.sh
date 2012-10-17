#!/bin/sh

pushd `dirname $0` > /dev/null
cat ../../../js/package.js ../../../js/block/block.js blockTest.js | node
popd > /dev/null
