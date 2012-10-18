(function() {

    /**
     * Block viewmodel.
     * @constructor
     */
    sb.view.Block = function(name, model, x, y, col, row, panels) {
        var that = this;
        this.x = ko.observable(x);
        this.y = ko.observable(y);         
        this.rotate = ko.observable(0);
        this.width = function() {
            return col * sb.view.PANEL_SIZE;
        };
        this.height = function() {
            return row * sb.view.PANEL_SIZE;
        };
        this.transform = ko.computed(function() {
            var translate = "translate("+that.x()+","+that.y()+");";
            var rotate = "rotate("+this.rotate()+");";
            return translate + rotate;
        });
    };


    sb.view.renderBlocks(node, blocks) {
        node.data(blocks)
            .enter()
            .append("svg:g")
            .classed("block", true)
            .attr("id", function(block) {
                return "block-"+name;
            })
            .attr("data-bind", function(block) {
                return "attr:{transform:transform}";
            })
            .attr("width", function(block) {
                return block.width();
            })
            .attr("height", function(block) {
                return block.height();
            })
    };

})();
