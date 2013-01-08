package main

import (
        "net/http"
        "flag"
        "fmt"
)

var (
        addr string
        dist string
)

func init() {
        flag.StringVar(&addr, "http", ":8080", "Address of webserver")
        flag.StringVar(&dist, "f", "dist", "directory")
}

func createHandler(pattern string) {
        dir := http.Dir(fmt.Sprintf("%s%s", dist, pattern))
        http.Handle(pattern, http.StripPrefix(pattern, http.FileServer(dir)))
}



func main() {

        flag.Parse()

        createHandler("/")
        http.ListenAndServe(addr, nil)
}
