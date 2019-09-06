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
var GameMainView = (function (_super) {
    __extends(GameMainView, _super);
    function GameMainView() {
        return _super.call(this) || this;
    }
    GameMainView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    GameMainView.prototype.initialize = function () {
        //初始化
        console.log("game---initialize");
    };
    GameMainView.prototype.close = function () {
    };
    return GameMainView;
}(BaseEuiView));
__reflect(GameMainView.prototype, "GameMainView");
ViewManager.ins().reg(GameMainView, LayerManager.UI_Main);
//# sourceMappingURL=GameMainView.js.map