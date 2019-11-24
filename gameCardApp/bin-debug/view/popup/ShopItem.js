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
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuy, this);
    };
    ShopItem.prototype.onBuy = function () {
        recharge.sendToNativePhurse({ Key1: this.data.costNum.toString() }, function (num) {
            GameApp.roleGold += parseInt(num);
        }, this);
    };
    ShopItem.prototype.dataChanged = function () {
        if (this.data.cost) {
            this.costLab.text = this.data.cost + "元";
        }
        if (this.data.desc) {
            this.desc.text = this.data.desc;
        }
        if (this.data.icon_title) {
            this.icon_title.source = this.data.icon_title;
        }
        if (this.data.icon) {
            this.icon.source = this.data.icon;
        }
        if (this.data.shopId) {
            this.shopId = this.data.shopId;
        }
        if (this.data.costNum) {
            this.costNum = this.data.costNum;
        }
    };
    ShopItem.prototype.dispose = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuy, this);
    };
    return ShopItem;
}(eui.ItemRenderer));
__reflect(ShopItem.prototype, "ShopItem");
//# sourceMappingURL=ShopItem.js.map