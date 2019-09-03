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
 * 选择路线 -- 从军 从政 从商
 */
var SelectWayPopUp = (function (_super) {
    __extends(SelectWayPopUp, _super);
    function SelectWayPopUp() {
        var _this = _super.call(this) || this;
        _this._roleJobStr = "";
        return _this;
    }
    SelectWayPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (param && param.length && param[0].cb) {
            this.cb = param[0].cb;
        }
        if (param && param.length && param[0].arg) {
            this.arg = param[0].arg;
        }
        this._roleJobStr = egret.localStorage.getItem(LocalStorageEnum.ROLE_JOB);
        if (!this._roleJobStr) {
            this._roleJobStr = GameApp.ins().role_job.toString();
            egret.localStorage.setItem(LocalStorageEnum.ROLE_JOB, this._roleJobStr);
        }
        if (parseInt(this._roleJobStr) == 0) {
            this.light.visible = false;
        }
        else {
            this.light.visible = true;
            this.light.x = this["job_" + this._roleJobStr].x;
            this.light.y = this["job_" + this._roleJobStr].y;
        }
        this.job.text = GameApp.jobCfg[parseInt(this._roleJobStr)];
        var needGold = (parseInt(this._roleJobStr) + 1) * 300;
        this.cost1.text = needGold.toString();
        egret.Tween.get(this.content).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.addTouchEvent(this.way1, this.onway1, true);
        // GlobalFun.filterToGrey(this.way2);
        // GlobalFun.filterToGrey(this.way3);
    };
    SelectWayPopUp.prototype.onway1 = function () { };
    SelectWayPopUp.prototype.onTouchTap = function (evt) {
        var _this = this;
        switch (evt.target) {
            // case this.way2:
            // case this.way3:
            // 	UserTips.ins<UserTips>().showTips("未达到开启条件");
            // 	break;
            case this.btnClose:
            case this.way1:
                if (this.cb && this.arg) {
                    this.cb.call(this.arg);
                }
                if (evt.target == this.way1) {
                    //提升军衔
                    var curExp = GameApp.ins().exp;
                    var totalExp = GameApp.ins().Texp;
                    var curGold = GameApp.ins().gold;
                    if (curExp < totalExp) {
                        UserTips.ins().showTips("晋升所需经验不足,可通过<font color=0x00ff00>【答题】【演武】【战役】</font>获得");
                        return;
                    }
                    var needGold = (parseInt(this._roleJobStr) + 1) * 300;
                    if (curGold < needGold) {
                        UserTips.ins().showTips("\u664B\u5347\u6240\u9700\u5143\u5B9D\u4E0D\u8DB3\uFF0C\u53EF\u901A\u8FC7<font color=0x00ff00>\u3010\u62FE\u8352\u3011</font>\u83B7\u5F97");
                        return;
                    }
                    GameApp.ins().gold -= needGold;
                    GameApp.ins().upgradeLevel();
                }
                egret.Tween.get(this.content).to({ verticalCenter: -650 }, 600, egret.Ease.circOut).call(function () {
                    egret.Tween.removeTweens(_this.content);
                    ViewManager.ins().close(SelectWayPopUp);
                }, this);
                break;
        }
    };
    SelectWayPopUp.prototype.close = function () {
        this.removeTouchEvent(this.way1, this.onway1);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    return SelectWayPopUp;
}(BaseEuiView));
__reflect(SelectWayPopUp.prototype, "SelectWayPopUp");
ViewManager.ins().reg(SelectWayPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=SelectWayPopUp.js.map