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
 * 练兵展示界面
 */
var TrainingShowView = (function (_super) {
    __extends(TrainingShowView, _super);
    function TrainingShowView() {
        var _this = _super.call(this) || this;
        _this.timeCom = false;
        return _this;
    }
    TrainingShowView.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addMainCom(null, false, this.content);
        this.rectGroup = new eui.Group();
        this.content.addChildAt(this.rectGroup, 2);
        this.rectGroup2 = new eui.Group();
        this.content.addChildAt(this.rectGroup2, 2);
        egret.Tween.get(this.content).to({ left: 0, right: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            TrainingAction.ins().initialize(_this.rectGroup, _this.rectGroup2);
        }, this);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        this.trainCfg = GameApp.ins().TrainCfg;
        var remainTimeStr = egret.localStorage.getItem(LocalStorageEnum.TRAINREMINTIME);
        this.count = remainTimeStr ? parseInt(remainTimeStr) : this.trainCfg.time;
        this.time = new egret.Timer(1000, this.count);
        egret.localStorage.setItem(LocalStorageEnum.TRAINREMINTIME, this.count.toString());
        this.remainTimeLab.text = this.formatTime(this.count);
        var localExp = egret.localStorage.getItem(LocalStorageEnum.TRAIN_EXP);
        var realExp = localExp ? parseInt(localExp) : 0;
        this.exp.text = "本次练兵总经验:" + realExp;
        this.time.start();
        this.time.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.time.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimeComplete, this);
    };
    TrainingShowView.prototype.onTimer = function (evt) {
        this.count -= 1;
        if (this.count <= 0) {
            this.count = 0;
        }
        if ((this.count % this.trainCfg.getExpTime) == 0) {
            //当前到达经验增长时间
            var exp = (Math.random() * 3 + 2) >> 0;
            GameApp.ins().exp += exp;
            var localExp = egret.localStorage.getItem(LocalStorageEnum.TRAIN_EXP);
            var realExp = 0;
            if (!localExp) {
                realExp = exp;
            }
            else {
                realExp = exp + parseInt(localExp);
            }
            egret.localStorage.setItem(LocalStorageEnum.TRAIN_EXP, realExp.toString());
            this.exp.text = "本次练兵总经验:" + realExp;
            UserTips.ins().showTips("获得经验值+" + exp);
            egret.localStorage.setItem(LocalStorageEnum.TRAINREMINTIME, this.count.toString());
        }
        this.remainTimeLab.text = this.formatTime(this.count);
    };
    TrainingShowView.prototype.onTimeComplete = function (evt) {
        var totalExp = egret.localStorage.getItem(LocalStorageEnum.TRAIN_EXP);
        egret.localStorage.setItem(LocalStorageEnum.TRAIN_STATE, "");
        egret.localStorage.setItem(LocalStorageEnum.TRAINREMINTIME, "");
        this.time.stop();
        UserTips.ins().showTips("本次练兵结束，共获得经验值:" + totalExp);
        egret.localStorage.setItem(LocalStorageEnum.TRAIN_EXP, "");
        this.timeCom = true;
        TrainingAction.ins().dispose();
    };
    TrainingShowView.prototype.formatTime = function (time) {
        var minute = (time / 60) >> 0;
        var minStr = minute < 10 ? ("0" + minute) : minute.toString();
        var second = time - minute * 60;
        var secondStr = second < 10 ? ("0" + second) : second.toString();
        return minStr + ":" + secondStr;
    };
    TrainingShowView.prototype.refreshPage = function () {
        var _this = this;
        egret.Tween.get(this.content).to({ left: 0, right: 0 }, 600, egret.Ease.circOut).call(function () {
            TrainingAction.ins().initialize(_this.rectGroup, _this.rectGroup2);
            egret.Tween.removeTweens(_this.content);
        }, this);
    };
    TrainingShowView.prototype.onReturn = function () {
        var _this = this;
        var width = StageUtils.ins().getWidth() + 20;
        TrainingAction.ins().dispose();
        egret.Tween.get(this.content).to({ left: width, right: -width }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            if (_this.timeCom) {
                ViewManager.ins().close(TrainingShowView);
            }
        }, this);
    };
    TrainingShowView.prototype.close = function () {
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        this.time.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.time.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimeComplete, this);
    };
    return TrainingShowView;
}(BaseEuiView));
__reflect(TrainingShowView.prototype, "TrainingShowView");
ViewManager.ins().reg(TrainingShowView, LayerManager.UI_Main);
//# sourceMappingURL=TrainingShowView.js.map