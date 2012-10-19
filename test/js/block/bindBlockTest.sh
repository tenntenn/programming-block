#!/bin/bash

pushd `dirname $0` > /dev/null

blockFiles=""
blockJsDir="../../../js/block/*.js"

for i in `ls $blockJsDir`
do
    blockFiles="$blockFiles $i"
done

xBindingJs="x-binding.js"

cat ../../../js/package.js $blockJsDir $xBindingJs bindBlock.js > tmp.js

cat tmp.js | node

popd > /dev/null
