(function() {

    /**
     * ブロックのビューモデルです。
     * @constructor
     */
    pb.view.Block = function(model, x, y) {
        var that = this;
        var uuid = UUID.genV1();
        this.x = sb.observable(x);
        this.y = sb.observable(y);         
        this.panels = sb.observableArray(x);
        this.id = "block-" + uuid.toString();

        this.rotate = sb.observable(0);
        this.width = sb.observable(0);
        this.height = sb.observable(0); 
        this.transform = d3binding.transform();
        this.selected = ko.observable(false);
        this.selectedFilter = ko.observable("filter-selected");

   };

    pb.view.renderBlocks(node, viewBox, blocks) {
    };

})();
