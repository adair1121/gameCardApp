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
var TipsView = (function (_super) {
    __extends(TipsView, _super);
    function TipsView() {
        var _this = _super.call(this) || this;
        _this.labCount = 0;
        _this.list = [];
        _this.initUI();
        return _this;
    }
    TipsView.prototype.close = function () {
    };
    TipsView.prototype.initUI = function () {
        this.touchChildren = false;
        this.touchEnabled = false;
    };
    TipsView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    /**
     * 显示tips
     * @param str
     */
    TipsView.prototype.showTips = function (str) {
        var tips = ObjectPool.pop("TipsItem");
        tips.horizontalCenter = 0;
        var bottomNum = (StageUtils.inst().getHeight() >> 1);
        tips.bottom = bottomNum;
        this.addChild(tips);
        tips.labelText = str;
        this.list.unshift(tips);
        tips.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeTipsItem, this);
        for (var i = this.list.length - 1; i >= 0; i--) {
            egret.Tween.removeTweens(this.list[i]);
            var t = egret.Tween.get(this.list[i]);
            t.to({ "bottom": bottomNum + (i * 30) }, 300);
        }
    };
    TipsView.prototype.removeTipsItem = function (e) {
        var tips = e.currentTarget;
        tips.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeTipsItem, this);
        tips.left = NaN;
        tips.bottom = NaN;
        var index = this.list.indexOf(tips);
        this.list.splice(index, 1);
        ObjectPool.push(tips);
    };
    return TipsView;
}(BaseEuiView));
__reflect(TipsView.prototype, "TipsView");
ViewManager.inst().reg(TipsView, LayerManager.TIPS_LAYER);
//# sourceMappingURL=TipsView.js.map