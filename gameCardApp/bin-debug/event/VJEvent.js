var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var VJEvent = (function (_super) {
    __extends(VJEvent, _super);
    function VJEvent(type, bubbles, data, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (data === void 0) { data = null; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.data = data;
        return _this;
    }
    VJEvent.VJ_START = "vj_start";
    VJEvent.VJ_END = "vj_end";
    VJEvent.VJ_MOVE = 'vj_move';
    return VJEvent;
}(egret.Event));
__reflect(VJEvent.prototype, "VJEvent");
//# sourceMappingURL=VJEvent.js.map