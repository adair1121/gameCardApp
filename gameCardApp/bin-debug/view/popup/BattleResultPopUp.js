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
var BattleResultPopUp = (function (_super) {
    __extends(BattleResultPopUp, _super);
    function BattleResultPopUp() {
        return _super.call(this) || this;
    }
    BattleResultPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        // this.alpha = 0;
        // egret.Tween.get(this).to({alpha:1},300,egret.Ease.circOut).call(()=>{
        // 	egret.Tween.removeTweens(this);
        // })
        this.rewardGroup.alpha = 0;
        this.winIcon.alpha = 0;
        this.winIcon.scaleX = this.winIcon.scaleY = 5;
        this.resultImg.alpha = 0;
        this.resultImg.scaleX = this.resultImg.scaleY = 5;
        egret.Tween.get(this.winIcon).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 300, egret.Ease.circIn).call(function () {
            egret.Tween.removeTweens(_this.winIcon);
            egret.Tween.get(_this.resultImg).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 300, egret.Ease.circIn).call(function () {
                egret.Tween.removeTweens(_this.resultImg);
                egret.Tween.get(_this.rewardGroup).to({ alpha: 1 }, 300).call(function () {
                    egret.Tween.removeTweens(_this.rewardGroup);
                }, _this);
            }, _this);
        }, this);
        if (param[0].state == 1) {
            this.skin.currentState = "win";
            // let levelstr:string = egret.localStorage.getItem(LocalStorageEnum.LEVEL);
            this.goldNum = (10 * GameApp.level + 90) + ((Math.random() * 20) >> 0);
            // this.goldNum = parseInt(levelstr);
        }
        else {
            this.skin.currentState = "fail";
            this.goldNum = (5 * GameApp.level + 20) + ((Math.random() * 10) >> 0);
        }
        if (param[0].time) {
            // this.timeLab.text = param[0].time.toString();
        }
        if (param[0].cb) {
            this._cb = param[0].cb;
        }
        if (param[0].arg) {
            this._arg = param[0].arg;
        }
        this.goldNumLab.text = this.goldNum.toString();
        GameApp.inst().gold += this.goldNum;
        this.addTouchEvent(this.nextBtn, this.onNextLevel, true);
        this.addTouchEvent(this.continueBtn, this.onContinue, true);
        this.addTouchEvent(this.exitBtn, this.onExit, true);
    };
    BattleResultPopUp.prototype.onNextLevel = function () {
        this._param = BattleResultPopUp.OPER_NEXT;
        this.onReturn();
    };
    BattleResultPopUp.prototype.onContinue = function () {
        this._param = BattleResultPopUp.OPER_CONTINUE;
        this.onReturn();
    };
    BattleResultPopUp.prototype.onExit = function () {
        this._param = BattleResultPopUp.OPER_EXIT;
        this.onReturn();
    };
    BattleResultPopUp.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this).to({ alpha: 0 }, 300, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this);
            ViewManager.inst().close(BattleResultPopUp);
            if (_this._cb && _this._arg) {
                _this._cb.call(_this._arg, _this._param);
            }
        });
    };
    BattleResultPopUp.prototype.close = function () {
        this.removeTouchEvent(this.nextBtn, this.onNextLevel);
        this.removeTouchEvent(this.continueBtn, this.onContinue);
        this.removeTouchEvent(this.exitBtn, this.onExit);
    };
    BattleResultPopUp.OPER_CONTINUE = 1; //继续本关
    BattleResultPopUp.OPER_NEXT = 2; //进行下一关
    BattleResultPopUp.OPER_EXIT = 3; //退出;
    return BattleResultPopUp;
}(BaseEuiView));
__reflect(BattleResultPopUp.prototype, "BattleResultPopUp");
ViewManager.inst().reg(BattleResultPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=BattleResultPopUp.js.map