package main

import (
    "flag"
    "net/http"
    "html/template"
    "strings"
)

// Programming arguments
var (
    // address of this webserver
    addr string
    // jsfiles
    jsfiles string
)

// Parse templates
var templates = template.Must(template.ParseGlob("template/*.html"))

func init() {
    flag.StringVar(&addr, "http", ":8080", "Address of webserver")
    flag.StringVar(&jsfiles, "js", "", "JSfiles")
}

// handler of "/"
func index(w http.ResponseWriter, r *http.Request) {
    data := struct {
        JSfiles []string
    } {
        strings.Split(strings.TrimSpace(jsfiles), " "),
    }

    templates.ExecuteTemplate(w, "index", data)
}

func main() {
    flag.Parse()

    http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css"))))
    http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js"))))
    http.Handle("/lib/", http.StripPrefix("/lib/", http.FileServer(http.Dir("lib"))))
    http.Handle("/img/", http.StripPrefix("/img/", http.FileServer(http.Dir("img"))))
    http.HandleFunc("/", index)

    http.ListenAndServe(addr, nil)
}
