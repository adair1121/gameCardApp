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
/**
 * 练兵
 */
var TrainingPopUp = (function (_super) {
    __extends(TrainingPopUp, _super);
    function TrainingPopUp() {
        var _this = _super.call(this) || this;
        _this.singleCost = 200;
        return _this;
    }
    TrainingPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        egret.Tween.get(this.content).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
        }, this);
        this.addTouchEvent(this.btnClose, this.onClose, true);
        this.addTouchEvent(this.startBtn, this.onStart, true);
        this.cost.text = this.singleCost.toString();
    };
    TrainingPopUp.prototype.onStart = function () {
        var goldNum = GameApp.ins().gold;
        if (goldNum < this.singleCost) {
            UserTips.ins().showTips("元宝不足");
            return;
        }
        GameApp.ins().gold -= this.singleCost;
        this.onClose();
        ViewManager.ins().open(TrainingShowView);
    };
    TrainingPopUp.prototype.onClose = function () {
        var _this = this;
        egret.Tween.get(this.content).to({ verticalCenter: -600 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.ins().close(TrainingPopUp);
        }, this);
    };
    TrainingPopUp.prototype.close = function () {
        this.removeTouchEvent(this.btnClose, this.onClose);
        this.removeTouchEvent(this.startBtn, this.onStart);
    };
    return TrainingPopUp;
}(BaseEuiView));
__reflect(TrainingPopUp.prototype, "TrainingPopUp");
ViewManager.ins().reg(TrainingPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=TrainingPopUp.js.map