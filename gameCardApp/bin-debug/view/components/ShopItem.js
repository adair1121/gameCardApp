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
var ShopItem = (function (_super) {
    __extends(ShopItem, _super);
    function ShopItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "ShopItemSkin";
        return _this;
    }
    ShopItem.prototype.childrenCreated = function () {
        this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouch, this);
        this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onEndTouch, this);
        this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onCancle, this);
        this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onCancle, this);
    };
    ShopItem.prototype.onBeginTouch = function (evt) {
        this.changeFilter(this.buyBtn);
        this.touchBeginboo = true;
    };
    ShopItem.prototype.onCancle = function () {
        this.touchBeginboo = false;
        this.buyBtn.filters = [];
    };
    ShopItem.prototype.onEndTouch = function (evt) {
        this.buyBtn.filters = [];
        if (this.touchBeginboo) {
            this.onBuy();
            this.touchBeginboo = false;
        }
    };
    ShopItem.prototype.changeFilter = function (obj) {
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        obj.filters = [colorFlilter];
    };
    ShopItem.prototype.onBuy = function () {
        var obj = { "goodid": this.data.goodid, "goodname": this.data.goldNum, "goodtype": 0, "price": this.data.costNum };
        GlobalFun.sendToNativePhurse(obj);
    };
    ShopItem.prototype.dataChanged = function () {
        if (this.data.icon) {
            this.icon.source = this.data.icon;
        }
        if (this.data.goldNum) {
            this.goldNum.text = this.data.goldNum + "元宝";
        }
        if (this.data.desc) {
            this.desc.text = this.data.desc;
        }
        if (this.data.cost) {
            this.costNum.text = this.data.cost;
        }
    };
    ShopItem.prototype.dispose = function () {
        this.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuy, this);
    };
    return ShopItem;
}(eui.ItemRenderer));
__reflect(ShopItem.prototype, "ShopItem");
//# sourceMappingURL=ShopItem.js.map