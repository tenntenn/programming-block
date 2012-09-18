define("svg/Path",
    [
        "svg/Shape"
    ],
    (Shape)->
        class Path extends Shape
            constructor:(model)->
                @d = ko.observableArray(ko.utils.unwrapObservable(model)) if model
)