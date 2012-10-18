#!/bin/bash

pushd `dirname $0` > /dev/null

blockFiles=""
blockJsDir="../../../js/block/*.js"

for i in `ls $blockJsDir`
do
    blockFiles="$blockFiles $i"
done

cat ../../../js/package.js $blockJsDir blockTest.js | node
popd > /dev/null

