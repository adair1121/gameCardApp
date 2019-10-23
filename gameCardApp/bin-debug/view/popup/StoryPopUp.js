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
var StoryPopUp = (function (_super) {
    __extends(StoryPopUp, _super);
    function StoryPopUp() {
        return _super.call(this) || this;
    }
    StoryPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.font.mask = this.fontMask;
        this.fontMask.width = 0;
        egret.Tween.get(this.content).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            egret.Tween.get(_this.fontMask).to({ width: 734 }, 4000).call(function () {
                egret.Tween.removeTweens(_this.fontMask);
            }, _this);
        }, this);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
    };
    StoryPopUp.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.removeAllTweens();
        egret.Tween.get(this.content).to({ verticalCenter: -600 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.inst().close(StoryPopUp);
        }, this);
    };
    StoryPopUp.prototype.close = function () {
        this.removeTouchEvent(this.returnBtn, this.onReturn);
    };
    return StoryPopUp;
}(BaseEuiView));
__reflect(StoryPopUp.prototype, "StoryPopUp");
ViewManager.inst().reg(StoryPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=StoryPopUp.js.map