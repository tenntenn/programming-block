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

    var blocks = [block1, block2];

    var svg = d3.select("#main-svg");
    var panelSize = 20;

    var dragmove = function(block) {
        block.x = d3.event.x;
        block.y = d3.event.y;
        d3.select(this)
        .attr("transform", "translate("+block.x+","+block.y+")"); 
    };
    var drag = d3.behavior.drag()
    .origin(Object)
    .on("drag", dragmove);

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
    .call(drag)
    .each(function(block, index) {
        var blockID = "block-"+index;
        var blockNode = d3.select("#"+blockID);
        blockNode.selectAll(".panel") 
        .data(block.panels)
        .enter()
        .append("svg:rect")
        .classed("panel", true)
        .attr("x",function(panel, index){
            return (index % block.col) * panelSize; 
        })
        .attr("y", function(panel, index) {
            return (Math.floor(index / block.col)) * panelSize;
        })
        .attr("width", function() {
            return panelSize;
        })
        .attr("height", function() {
            return panelSize;
        })
        .style("fill", function(panel) {
           return "red";
        });

        blockNode.selectAll(".panel")
        .filter(function(panel) {
            return panel == _;
        })
        .remove();
     });
})();
