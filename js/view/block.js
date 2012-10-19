(function() {

    /**
     * ブロックのビューモデルです。
     * @constructor
     */
    pb.view.Block = function(name, model, x, y, col, row, panels) {
        var that = this;
        this.x = ko.observable(x);
        this.y = ko.observable(y);         
        this.id = "block-"+name;
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
        this.selected = ko.observable(false);
        this.selectedFilter = ko.observable("filter-selected");
        this.filter = ko.computed(function() {
           if (that.selected()) {
                return "url(#"+that.selectedFilter()+")";
           }

            return "";
        });
    };

    pb.view.renderBlocks(node, viewBox, blocks) {
        node.data(blocks)
            .enter()
            .append("svg:g")
            .classed("block", true)
            .attr("id", function(block) {
                return block.id;
            })
            .attr("data-bind", function(block) {
                return "attr:{transform:transform, filter: filter}";
            })
            .attr("width", function(block) {
                return block.width();
            })
            .attr("height", function(block) {
                return block.height();
            })
            .on("click", function(block) {

                var cx, cy;

                // すでに選択されているものがあるか？
                var isSelected = !(d3.selectAll(".selected").empty());
                if (isSelected) {
                    return;
                }
               
                // 選択する 
                d3.select(this)
                  .classed("selected", true);
                block.select(true); 


                // 前面に持ってくる
                d3.selectAll(".block")
                  .sort(function(b1, b2) {
                            if (block === b1) {
                                return 1;
                            }
                            return 0;
                        });
                
                // 中心に持ってくる
                cx = block.x + block.width()  / 2;
                cy = block.y + block.height() / 2;
            })
            .each(function(block) {
                ko.applyBindings(block, d3.select(this)[0]);
            });
    };

})();
