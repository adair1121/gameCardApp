var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * A星寻路
 * @author chenkai
 * @since 2017/11/3
 */
var astar;
(function (astar) {
    var AStar = (function () {
        function AStar() {
            this._straightCost = 1.0; //上下左右走的代价
            this._diagCost = Math.SQRT2; //斜着走的代价 
            //this._heuristic = this.manhattan;  
            //this._heuristic = this.euclidian;
            this._heuristic = this.diagonal;
        }
        //寻路
        AStar.prototype.findPath = function (grid) {
            this._grid = grid;
            this._open = [];
            this._closed = [];
            this._startNode = this._grid.startNode;
            this._endNode = this._grid.endNode;
            this._startNode.g = 0;
            this._startNode.h = this._heuristic(this._startNode);
            this._startNode.f = this._startNode.g + this._startNode.h;
            return this.search();
        };
        //查找路径
        AStar.prototype.search = function () {
            var node = this._startNode;
            while (node != this._endNode) {
                var startX = Math.max(0, node.x - 1);
                var endX = Math.min(this._grid.numCols - 1, node.x + 1);
                var startY = Math.max(0, node.y - 1);
                var endY = Math.min(this._grid.numRows - 1, node.y + 1);
                for (var i = startX; i <= endX; i++) {
                    for (var j = startY; j <= endY; j++) {
                        //不让斜着走
                        // if(i != node.x && j != node.y){
                        // 	continue;
                        // }
                        var test = this._grid.getNode(i, j);
                        if (test == node ||
                            !test.walkable ||
                            !this._grid.getNode(node.x, test.y).walkable ||
                            !this._grid.getNode(test.x, node.y).walkable) {
                            continue;
                        }
                        var cost = this._straightCost;
                        if (!((node.x == test.x) || (node.y == test.y))) {
                            cost = this._diagCost;
                        }
                        var g = node.g + cost * test.costMultiplier;
                        var h = this._heuristic(test);
                        var f = g + h;
                        if (this.isOpen(test) || this.isClosed(test)) {
                            if (test.f > f) {
                                test.f = f;
                                test.g = g;
                                test.h = h;
                                test.parent = node;
                            }
                        }
                        else {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = node;
                            this._open.push(test);
                        }
                    }
                }
                for (var o = 0; o < this._open.length; o++) {
                }
                this._closed.push(node);
                if (this._open.length == 0) {
                    console.log("AStar >> no path found" + this._endNode);
                    return false;
                }
                var openLen = this._open.length;
                for (var m = 0; m < openLen; m++) {
                    for (var n = m + 1; n < openLen; n++) {
                        if (this._open[m].f > this._open[n].f) {
                            var temp = this._open[m];
                            this._open[m] = this._open[n];
                            this._open[n] = temp;
                        }
                    }
                }
                node = this._open.shift();
            }
            this.buildPath();
            return true;
        };
        //获取路径
        AStar.prototype.buildPath = function () {
            this._path = new Array();
            var node = this._endNode;
            this._path.push(node);
            while (node != this._startNode) {
                node = node.parent;
                this._path.unshift(node);
            }
        };
        Object.defineProperty(AStar.prototype, "path", {
            get: function () {
                return this._path;
            },
            enumerable: true,
            configurable: true
        });
        //是否待检查
        AStar.prototype.isOpen = function (node) {
            for (var i = 0; i < this._open.length; i++) {
                if (this._open[i] == node) {
                    return true;
                }
            }
            return false;
        };
        //是否已检查
        AStar.prototype.isClosed = function (node) {
            for (var i = 0; i < this._closed.length; i++) {
                if (this._closed[i] == node) {
                    return true;
                }
            }
            return false;
        };
        //曼哈顿算法
        AStar.prototype.manhattan = function (node) {
            return Math.abs(node.x - this._endNode.x) * this._straightCost + Math.abs(node.y + this._endNode.y) * this._straightCost;
        };
        AStar.prototype.euclidian = function (node) {
            var dx = node.x - this._endNode.x;
            var dy = node.y - this._endNode.y;
            return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
        };
        AStar.prototype.diagonal = function (node) {
            var dx = Math.abs(node.x - this._endNode.x);
            var dy = Math.abs(node.y - this._endNode.y);
            var diag = Math.min(dx, dy);
            var straight = dx + dy;
            return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
        };
        Object.defineProperty(AStar.prototype, "visited", {
            get: function () {
                return this._closed.concat(this._open);
            },
            enumerable: true,
            configurable: true
        });
        return AStar;
    }());
    astar.AStar = AStar;
    __reflect(AStar.prototype, "astar.AStar");
})(astar || (astar = {}));
//# sourceMappingURL=AStar.js.map