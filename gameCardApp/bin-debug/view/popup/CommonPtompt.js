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
var CommonPtompt = (function (_super) {
    __extends(CommonPtompt, _super);
    function CommonPtompt() {
        var _this = _super.call(this) || this;
        _this.oper = 0;
        return _this;
    }
    CommonPtompt.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.tipGroup.alpha = 0;
        this.tipGroup.scaleX = this.tipGroup.scaleY = 0;
        egret.Tween.get(this.tipGroup).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 600, egret.Ease.backOut).call(function () {
            egret.Tween.removeTweens(_this.tipGroup);
        }, this);
        this.addTouchEvent(this.cancleBtn, this.onReturn, true);
        this.addTouchEvent(this.sureBtn, this.onSure, true);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        if (param[0]) {
            if (param[0].cb) {
                this._cb = param[0].cb;
            }
            if (param[0].arg) {
                this._arg = param[0].arg;
            }
        }
    };
    CommonPtompt.prototype.onSure = function () {
        if (GameApp.roleGold < 200) {
            UserTips.inst().showTips("金币不足");
            return;
        }
        else {
            this.oper = 1;
            GameApp.roleGold -= 200;
            UserTips.inst().showTips("刷新成功");
        }
        this.onReturn();
    };
    CommonPtompt.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.tipGroup).to({ alpha: 0, scaleX: 0, scaleY: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.tipGroup);
            ViewManager.inst().close(CommonPtompt);
            if (_this._cb && _this._arg) {
                _this._cb.call(_this._arg, _this.oper);
            }
        }, this);
    };
    CommonPtompt.prototype.close = function () {
        this.removeTouchEvent(this.cancleBtn, this.onReturn);
        this.removeTouchEvent(this.sureBtn, this.onSure);
        this.removeTouchEvent(this.returnBtn, this.onReturn);
    };
    return CommonPtompt;
}(BaseEuiView));
__reflect(CommonPtompt.prototype, "CommonPtompt");
ViewManager.inst().reg(CommonPtompt, LayerManager.UI_Pop);
//# sourceMappingURL=CommonPtompt.js.map