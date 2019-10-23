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
 * 神将技能----神将转生提示弹窗
 */
var RebornTipPopUp = (function (_super) {
    __extends(RebornTipPopUp, _super);
    function RebornTipPopUp() {
        return _super.call(this) || this;
    }
    RebornTipPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        egret.Tween.get(this.content).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this);
        }, this);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        this.addTouchEvent(this.sureBtn, this.onSure, true);
        this.addTouchEvent(this.cancleBtn, this.onCancle, true);
        if (param && param.length) {
            if (param[0].cost) {
                this._cost = param[0].cost;
                this.costLab.text = this._cost.toString();
            }
            if (param[0].mid) {
                this._mid = param[0].mid;
            }
            if (param[0].cb) {
                this._cb = param[0].cb;
            }
            if (param[0].arg) {
                this._arg = param[0].arg;
            }
        }
    };
    RebornTipPopUp.prototype.onSure = function () {
        var goldNum = GameApp.inst().gold;
        if (this._cost) {
            this._param = 1;
            if (this._cost > goldNum) {
                UserTips.inst().showTips("金币不足");
                return;
            }
            else {
                GameApp.inst().gold -= this._cost;
                UserTips.inst().showTips("转生成功");
                GameApp.rebornIds.push(this._mid);
                egret.localStorage.setItem(LocalStorageEnum.REBORNIDS, JSON.stringify(GameApp.rebornIds));
            }
        }
        else {
            this._param = -1;
        }
        this.onReturn();
    };
    RebornTipPopUp.prototype.onCancle = function () {
        this._param = 0;
        this.onReturn();
    };
    RebornTipPopUp.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.content).to({ verticalCenter: -500 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.inst().close(RebornTipPopUp);
            if (_this._cb && _this._arg) {
                _this._cb.call(_this._arg, _this._param);
            }
        }, this);
    };
    RebornTipPopUp.prototype.close = function () {
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        this.removeTouchEvent(this.sureBtn, this.onSure);
        this.removeTouchEvent(this.cancleBtn, this.onCancle);
    };
    return RebornTipPopUp;
}(BaseEuiView));
__reflect(RebornTipPopUp.prototype, "RebornTipPopUp");
ViewManager.inst().reg(RebornTipPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=RebornTipPopUp.js.map