#!/bin/sh

rm -r dist
mkdir -p dist

# build webserver
go build -o dist/webserver webserver.go 
