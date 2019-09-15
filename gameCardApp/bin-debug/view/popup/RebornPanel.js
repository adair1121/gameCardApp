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
var RebornPanel = (function (_super) {
    __extends(RebornPanel, _super);
    function RebornPanel() {
        return _super.call(this) || this;
    }
    RebornPanel.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        egret.Tween.get(this.rebornGroup).to({ left: 10 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.rebornGroup);
        });
        this.addTouchEvent(this.btnReturn, this.onReturn, true);
    };
    RebornPanel.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.rebornGroup).to({ left: -500 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.rebornGroup);
            ViewManager.ins().close(RebornPanel);
        });
    };
    RebornPanel.prototype.close = function () {
        this.removeTouchEvent(this.btnReturn, this.onReturn);
    };
    return RebornPanel;
}(BaseEuiView));
__reflect(RebornPanel.prototype, "RebornPanel");
ViewManager.ins().reg(RebornPanel, LayerManager.UI_Pop);
//# sourceMappingURL=RebornPanel.js.map