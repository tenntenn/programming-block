package main

import (
    "flag"
    "net/http"
    "html/template"
)

// Programming arguments
var (
    // address of this webserver
    addr string
)

// Parse templates
var templates = template.Must(template.ParseGlob("template/*.html"))

func init() {
    flag.StringVar(&addr, "-http", ":8080", "Address of webserver")
}

// handler of "/"
func index(w http.ResponseWriter, r *http.Request) {
}

func main() {
    flag.Parse()

    http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css"))))
    http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js"))))
    http.Handle("/lib/", http.StripPrefix("/lib/", http.FileServer(http.Dir("lib"))))
    http.HandleFunc("/", index)

    http.ListenAndServe(addr, nil)
}
