#!/bin/bash

pushd `dirname $0` > /dev/null

# Block test
./js/block/test.sh

popd > /dev/null

