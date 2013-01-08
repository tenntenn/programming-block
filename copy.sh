#!/bin/sh

if [ ! -e dist ]; then
	mkdir dist
fi

# copy libs
if [ -e lib ]; then
    echo "copying libs..."
    mkdir dist/lib
    cp -r lib/* dist/lib/
    echo "copied libs."
fi

# copy templates
if [ -e template ]; then
    echo "copying templates..."
    mkdir dist/template
    cp -r src/template/* dist/template/
    echo "copied templates."
fi

# copy css files
if [ -e css ]; then
    echo "copying css files..."
    mkdir dist/css
    cp -r src/css/* dist/css/
    echo "copied css files."
fi

# copy images
if [ -e img ]; then
    echo "copying images..."
    mkdir dist/img
    cp -r img/* dist/img/
    find dist/img -name "*.ai" | xargs rm
    echo "copied images."
fi
