#!/bin/sh

# build tempalte tool
echo "build template.go..."
go build template.go

# init guard
echo "init guard..."
bundle install

# message
echo ""
echo "exec 'bundle exec guard' and press the enter key to run all guard"
