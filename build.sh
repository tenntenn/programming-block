#!/bin/sh

if [ -e dist ]; then
    rm -r dist
fi
mkdir dist

# build webserver
if [ -e webserver.go ]; then
    echo "building webserver..."
    go build -o dist/webserver webserver.go 
    cp run.sh dist/
    echo "built webserver."
fi

# compile js
if [ -e js -a -e jsfiles.txt ]; then
    echo "compiling javascript files..."
    mkdir dist/js
    java -jar compiler.jar --js_output_file dist/js/programming-block.min.js --js `awk -v ORS=' ' '1;END{printf"\n"}' jsfiles.txt`
    echo js/programming-block.min.js > dist/jsfiles.txt
    echo "compiled javascript files."
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
    cp -r template/* dist/template/
    echo "copied templates."
fi

# copy css files
if [ -e css ]; then
    echo "copying css files..."
    mkdir dist/css
    cp -r css/* dist/css/
    echo "copied css files."
fi
