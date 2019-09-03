var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Node 节点
 * @author chenkai
 * @since 2017/11/3
 */
var astar;
(function (astar) {
    var Node = (function () {
        function Node(x, y) {
            this.walkable = true;
            this.costMultiplier = 1.0;
            this.x = x;
            this.y = y;
        }
        return Node;
    }());
    astar.Node = Node;
    __reflect(Node.prototype, "astar.Node");
})(astar || (astar = {}));
//# sourceMappingURL=Node.js.map