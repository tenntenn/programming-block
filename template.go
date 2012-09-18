package main

import (
    "fmt"
    "text/template"
    "flag"
    "os"
)

func main() {

    var pattern string
    flag.StringVar(&pattern, "p", "templates/*.html", "template pattern like template/*.html")
    template, err := template.ParseGlob(pattern)
    if err != nil {
        fmt.Fprintln(os.Stderr, err.Error())
    }

    var mainTemplate string
    flag.StringVar(&mainTemplate, "t", "index", "main template like index")
    template.ExecuteTemplate(os.Stdout, mainTemplate, nil)
}
