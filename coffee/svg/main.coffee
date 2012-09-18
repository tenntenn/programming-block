define("svg/main",
    [
        "svg/Shape"
        "svg/Rotate"
        "svg/Line"
        "svg/Path"
        "svg/MoveTo"
        "svg/LineTo"
        "svg/ClosePath"
        "svg/Circle"
        "svg/binding"
        "svg/templating"
    ],
    (Shape, Rotate, Line, Path, MoveTo, LineTo, ClosePath, Circle, binding, TemplateEngine)->
        $$ =
            Shape : Shape
            Rotate : Rotate
            Line : Line
            Path : Path
            MoveTo : MoveTo
            LineTo : LineTo
            ClosePath: ClosePath
            Circle : Circle
            binding : binding
            TemplateEngine : TemplateEngine
)