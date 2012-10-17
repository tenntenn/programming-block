#!/bin/sh

pushd `dirname $0` > /dev/null

# Block test
sh js/block/test.sh

popd > /dev/null
