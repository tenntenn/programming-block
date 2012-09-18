define('main',
    [
        'viewmodel/SVGViewModel'
    ],
    (SVGViewModel)->
        model = new SVGViewModel()
        ko.applyBindings(model)
)