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
var StartGameEvent = (function (_super) {
    __extends(StartGameEvent, _super);
    function StartGameEvent(type, data, bubbles, cancelable) {
        if (data === void 0) { data = null; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.data = data;
        return _this;
    }
    StartGameEvent.START = "start";
    StartGameEvent.VJ_END = "vjEnd";
    StartGameEvent.GAMELOADINGEND = "gameloadingend";
    StartGameEvent.REMOVE_ITEM = "remove_item";
    return StartGameEvent;
}(egret.Event));
__reflect(StartGameEvent.prototype, "StartGameEvent");
//# sourceMappingURL=StartGameEvent.js.map