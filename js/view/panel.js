(function() {

    /**
     * @type {Number}
     */
    pb.view.PANEL_SIZE = 32;

    /**
     * Panel viewmodel
     * @constructor 
     */
    pb.view.Panel = function(name) {
        this.render = function(block, x, y) {
            block.append("svg:use")
                 .attr("xlink:href", "#"+name)
                 .attr("x", x)
                 .attr("y", y);
        };
    };

})();
