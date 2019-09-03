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
var ResultPopUp = (function (_super) {
    __extends(ResultPopUp, _super);
    function ResultPopUp() {
        return _super.call(this) || this;
    }
    ResultPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.list.itemRenderer = Item;
        this.arrayCollect = new eui.ArrayCollection();
        this.list.dataProvider = this.arrayCollect;
        egret.Tween.get(this.content).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeAllTweens();
            egret.Tween.removeTweens(_this.content);
        }, this);
        if (param[0].state == 1) {
            this.skin.currentState = "win";
            var expNum = (Math.random() * 200 + 100) >> 0;
            this.expNum.text = "+" + expNum;
            UserTips.ins().showTips("获得经验x" + expNum);
            GameApp.ins().exp += expNum;
            var goldNum = (Math.random() * 200 + 100) >> 0;
            // let timeout = setTimeout(()=>{
            // clearTimeout(timeout);
            UserTips.ins().showTips("获得元宝x" + goldNum);
            this.goldNum.text = "+" + goldNum;
            // },500)
            GameApp.ins().gold += goldNum;
            var data = [];
            var resObj = GlobalFun.getResUrl();
            for (var i = 0; i < resObj.resArr.length - 1; i++) {
                //刷新背包物品
                var itemnum = MapView.ins().refreshGoods(resObj.resArr[i], resObj.attrArr[i]["name"], 20, 20);
                var obj = {
                    res: resObj.resArr[i], num: itemnum, itemName: resObj.attrArr[i]["name"]
                };
                data.push(obj);
            }
            this.arrayCollect.source = data;
            this.list.dataProviderRefreshed();
        }
        else {
            this.skin.currentState = "fail";
        }
        if (param[0].cb) {
            this._cb = param[0].cb;
        }
        if (param[0].arg) {
            this._arg = param[0].arg;
        }
        this.addTouchEvent(this.sureBtn, this.onSure, true);
        this.addTouchEvent(this.againBtn, this.onAgain, true);
    };
    ResultPopUp.prototype.onAgain = function () {
        this.onClose(1);
    };
    ResultPopUp.prototype.onSure = function () {
        this.onClose(0);
    };
    ResultPopUp.prototype.onClose = function (num) {
        var _this = this;
        this.touchEnabled = false;
        egret.Tween.get(this.content).to({ verticalCenter: -600 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.ins().close(ResultPopUp);
            if (_this._cb && _this._arg) {
                _this._cb.call(_this._arg, num);
            }
        }, this);
    };
    ResultPopUp.prototype.close = function () {
        this.removeTouchEvent(this.sureBtn, this.onSure);
        this.removeTouchEvent(this.againBtn, this.onAgain);
    };
    return ResultPopUp;
}(BaseEuiView));
__reflect(ResultPopUp.prototype, "ResultPopUp");
ViewManager.ins().reg(ResultPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=ResultPopUp.js.map