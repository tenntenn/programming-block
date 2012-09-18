define("svg/templating",
    [
    ],
    ()->

        # namespace of svg
        ns = "http://www.w3.org/2000/svg"

        TemplateEngine = ()->
            @.allowTemplateRewriting = false

        TemplateEngine.prototype = new ko.templateEngine()
        TemplateEngine.prototype.renderTemplateSource = (templateSource, bindingContext, options) ->
            # already exsiting nodes?
            nodes = templateSource.nodes()
            if nodes
                return nodes

            div = document.createElement('div')
            div.innerHTML = """<svg xmlns="#{ns}">#{templateSource.text()}</svg>"""
            ko.utils.arrayPushAll([], div.childNodes[0].childNodes)

        return TemplateEngine
)