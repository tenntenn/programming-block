(function() {

    // empty
    var _ = 0;

    // block
    var X = 1

    // IN
    var u = 2;
    var r = 3;
    var l = 4;
    var d = 5; 

    // OUT
    var U = 6;
    var R = 7;
    var L = 8;
    var D = 9;

    var block1 = {
        panels:[
         _,X,X,X,X,X,_,
         _,X,X,X,X,X,r,
         _,X,X,X,X,X,R,
         l,X,X,X,X,X,_,
         L,X,X,X,X,X,_,
         _,X,X,X,X,X,r,
         _,X,X,X,X,X,R,
         _,X,X,X,X,X,_,
        ],
        col: 7,
        row: 8,
        x: 100,
        y: 100, 
    };

    var block2 = {
        panels:[
         _,X,X,X,X,X,_,
         l,X,X,X,X,X,_,
         L,X,X,X,X,X,_,
         _,X,X,X,X,X,r,
         _,X,X,X,X,X,R,
         l,X,X,X,X,X,_,
         L,X,X,X,X,X,_,
         _,X,X,X,X,X,_,
        ],
        col: 7,
        row: 8,
        x: 250,
        y: 200,
    };

    var XPanel = function(blockNode, block, panel, index) {
        blockNode.append("svg:rect")
        .classed("panel", true)
        .attr("x",(index % block.col) * panelSize)
        .attr("y", (Math.floor(index / block.col)) * panelSize) 
        .attr("width", panelSize)
        .attr("height", panelSize);

    };

    var blocks = [block1, block2];

    var svg = d3.select("#main-svg");
    var panelSize = 20;

    svg.selectAll(".block")
    .data(blocks)
    .enter()
    .append("svg:g")
    .classed("block", true)
    .attr("id", function(block, index) {
        return "block-"+index;
    })
    .attr("transform", function(block) {
        return "translate("+block.x+","+block.y+")";
    })
    .attr("width", function(block) {
        return block.col * panelSize;
    })
    .attr("height", function(block) {
        return block.row * panelSize;
    })
    .attr("filter", "")
    .on("click", function() {
        d3.select(this)
        .classed("selected", true)
        .attr("filter", "url(#filter-selected)");

        d3.selectAll(".block")
        .sort(function(block1, block2) {
            if (block === block1) {
                return 1;
            }
            return 0;
        });
     })
    .each(function(block, index) {

        var blockID = "block-"+index;
        
        var blockNode = d3.select("#"+blockID);
        block.panels.map(function(panel, index) {
            if (panel != _) {
                XPanel(blockNode, block, panel, index);
            }
        });
     });
})();
