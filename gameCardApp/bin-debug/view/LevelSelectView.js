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
 * 关卡选择界面
 */
var LevelSelectView = (function (_super) {
    __extends(LevelSelectView, _super);
    function LevelSelectView() {
        var _this = _super.call(this) || this;
        _this.unlockCondition = { 1: 2, 2: 3, 3: 4 };
        return _this;
    }
    LevelSelectView.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        egret.Tween.get(this.content).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
        }, this);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        var curJob = GameApp.ins().role_job;
        if (curJob >= 3) {
            this.cloud_1.visible = false;
        }
        if (curJob >= 4) {
            this.cloud_2.visible = false;
        }
    };
    LevelSelectView.prototype.onTouchTap = function (evt) {
        var namestr = evt.target.name;
        if (namestr) {
            var level = parseInt(namestr.split("_")[1]);
            var limitJob = this.unlockCondition[level];
            var curJob = GameApp.ins().role_job;
            if (curJob < limitJob) {
                UserTips.ins().showTips("参战所需军衔不足,需要达到-" + ("<font color=0xfc3434>" + GameApp.jobCfg[limitJob] + "</font>"));
                return;
            }
            else {
                // 进入战斗
                ViewManager.ins().open(BattleView, [{ level: level }]);
                this.onReturn();
                ViewManager.ins().open(GameLoadingUI);
                // ViewManager.ins<ViewManager>().open(GameLoadingUI,[{cls:BattleView,param:{level:level}}])
            }
        }
    };
    LevelSelectView.prototype.onReturn = function () {
        var _this = this;
        var width = StageUtils.ins().getWidth() + 20;
        egret.Tween.get(this.content).to({ verticalCenter: -600 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.ins().close(LevelSelectView);
        }, this);
    };
    LevelSelectView.prototype.close = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.removeTouchEvent(this.returnBtn, this.onReturn);
    };
    return LevelSelectView;
}(BaseEuiView));
__reflect(LevelSelectView.prototype, "LevelSelectView");
ViewManager.ins().reg(LevelSelectView, LayerManager.UI_Main);
//# sourceMappingURL=LevelSelectView.js.map