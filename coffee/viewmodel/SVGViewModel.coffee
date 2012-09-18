define('viewmodel/SVGViewModel',
    [
        'svg/main'
    ],
    (svg)->
        class SVGViewModel
            constructor:->
                @circle = new svg.Circle(
                    cx: 100
                    cy: 100
                    r : 100
                )
                @path = new svg.Path(
                    [
                        new svg.MoveTo(
                            x: 250
                            y: 100
                        ),
                        new svg.LineTo(
                            x: 100
                            y: 250
                        ),
                        new svg.LineTo(
                            x: 400
                            y: 250
                        ),
                        new svg.ClosePath(
                        ),
                    ]
                )
)