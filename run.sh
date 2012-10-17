#!/bin/sh

./webserver -http=":8080" -js="`awk -v ORS=' ' '1;END{printf"\n"}' jsfiles.txt`"
