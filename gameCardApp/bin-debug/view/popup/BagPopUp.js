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
var BagPopUp = (function (_super) {
    __extends(BagPopUp, _super);
    function BagPopUp() {
        var _this = _super.call(this) || this;
        _this.totalNum = 200;
        _this.dataArr = [];
        //加入卖出的单价是一样的
        _this.singleCost = 1;
        _this.ownNum = 0;
        return _this;
    }
    BagPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        egret.Tween.get(this.content).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
        }, this);
        this.arrayCollect = new eui.ArrayCollection();
        this.list.itemRenderer = Item;
        this.list.dataProvider = this.arrayCollect;
        this.scroller.viewport = this.list;
        var ownGoodsNum = egret.localStorage.getItem(LocalStorageEnum.GOODS_NUM);
        if (ownGoodsNum) {
            this.ownNum = parseInt(ownGoodsNum);
        }
        var dataStr = egret.localStorage.getItem(LocalStorageEnum.GOODS);
        if (dataStr) {
            var obj = JSON.parse(dataStr);
            for (var key in obj) {
                var dataObj = {};
                dataObj["res"] = "item_" + key;
                dataObj["num"] = obj[key];
                this.dataArr.push(dataObj);
            }
        }
        else {
            this.dataArr = [];
        }
        this.arrayCollect.source = this.dataArr;
        this.addTouchEvent(this.sellBtn, this.onSellAll, true);
        this.addTouchEvent(this.btnClose, this.onClose, true);
    };
    BagPopUp.prototype.onSellAll = function () {
        if (!this.dataArr.length) {
            return;
        }
        GameApp.ins().role_gold += this.ownNum * this.singleCost;
        egret.localStorage.setItem(LocalStorageEnum.GOLD_NUM, GameApp.ins().role_gold.toString());
        egret.localStorage.setItem(LocalStorageEnum.GOODS_NUM, "0");
        egret.localStorage.setItem(LocalStorageEnum.GOODS, "");
        UserTips.ins().showTips("恭喜获得元宝x" + (this.ownNum * this.singleCost));
        this.arrayCollect.source = [];
        this.list.dataProviderRefreshed();
        this.dataArr = [];
    };
    BagPopUp.prototype.onClose = function () {
        var _this = this;
        egret.Tween.get(this.content).to({ verticalCenter: -600 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.ins().close(BagPopUp);
        }, this);
    };
    BagPopUp.prototype.close = function () {
        this.removeTouchEvent(this.btnClose, this.onClose);
        this.removeTouchEvent(this.sellBtn, this.onSellAll);
    };
    return BagPopUp;
}(BaseEuiView));
__reflect(BagPopUp.prototype, "BagPopUp");
ViewManager.ins().reg(BagPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=BagPopUp.js.map