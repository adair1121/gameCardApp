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
var CustomEvt = (function (_super) {
    __extends(CustomEvt, _super);
    function CustomEvt(type, data, bubbles, cancelable) {
        if (data === void 0) { data = null; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this._data = data;
        return _this;
    }
    Object.defineProperty(CustomEvt.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    /**游戏loading完成 */
    CustomEvt.GAMELOADINGEND = 'gameLoadingEnd';
    CustomEvt.REDUCE_HP = 'reducehp';
    return CustomEvt;
}(egret.Event));
__reflect(CustomEvt.prototype, "CustomEvt");
//# sourceMappingURL=CustomEvt.js.map