define("svg/binding",
    [
    ],
    ()->
        ns = "http://www.w3.org/2000/svg"
        ko.bindingHandlers.shape =
            init:(element, valueAccessor, allBindingsAccessor, viewModel)->

                # e = document.createElementNS(ns, element.localName)
                # for a in element.attributes
                #     e.setAttributeNS(ns, a.localName, a.nodeValue)
                # $(element).after(e)
                # $(element).remove()
                for k, v of valueAccessor()
                    value = ko.utils.unwrapObservable(v)
                    if $.isArray(value)
                        $(element).attr(k, (m.toString() for m in value).join(" "))
                    else
                        $(element).attr(k, value)
            ,
            update:(element, valueAccessor, allBindingsAccessor, viewModel)->
                for k, v of valueAccessor()
                    value = ko.utils.unwrapObservable(v)
                    if $.isArray(value)
                        $(element).attr(k, (m.toString() for m in value).join(" "))
                    else
                        $(element).attr(k, value)
)