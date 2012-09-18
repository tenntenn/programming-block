define("svg/Circle",
    [
        "svg/Shape"
    ],
    (Shape)->
        class Circle extends Shape
            constructor:(model)->

                @cx = ko.observable(0)
                @cy = ko.observable(0)
                @r = ko.observable(1)

                if model
                    @cx = ko.observable(ko.utils.unwrapObservable(model.cx)) if model.cx
                    @cy = ko.observable(ko.utils.unwrapObservable(model.cy)) if model.cy
                    @r = ko.observable(ko.utils.unwrapObservable(model.r)) if model.r
)