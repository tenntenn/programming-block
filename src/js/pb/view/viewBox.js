(function() {

    pb.view.ViewBox = function(svg, param) {

        var that = this;
        var x = param["x"] & 0;
        var y = param["y"] & 0;
        var w = param["width"] & 1;
        var h = param["height"] & 1;

        this.getX = function() {
            return x;
        };

        this.getY = function() {
            return y;
        };

        this.getWidth = function() {
            return w;
        };

        this.getHeight = function() {
            return h;
        };

        this.toString = function() {
            return x + " " + y + " " + w + " " + h;
        };

        // 中心に持ってくる
        this.center = function(cx, cy, transition) {
            
            x = cx - w/2;
            y = cy - h/2;
            if (transition) {
               svg.transition()
                  .attr("viewBox", that.tostring); 
            } else {
               svg.attr("viewBox", that.toString); 
            }
        };
        
        // 初期位置・サイズを設定する
        svg.attr("viewBox", that.toString); 
    };
})();
