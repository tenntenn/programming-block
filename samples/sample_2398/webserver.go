package main

import (
    "net/http"
    "flag"
)

var (
    addr string
)

func init() {
    flag.StringVar(&addr, "http", ":8080", "Address of webserver")
}

func main() {

    flag.Parse()

    http.Handle("/", http.FileServer(http.Dir(".")))
    http.ListenAndServe(addr, nil)
}
