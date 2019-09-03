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
var Item = (function (_super) {
    __extends(Item, _super);
    function Item() {
        var _this = _super.call(this) || this;
        _this.skinName = "ItemSkin";
        return _this;
    }
    Item.prototype.dataChanged = function () {
        if (this.data.res) {
            this.img.source = this.data.res;
        }
        this.numLab.text = this.data.num.toString();
        if (this.data.itemName) {
            this.itemName.text = this.data.itemName;
        }
    };
    return Item;
}(eui.ItemRenderer));
__reflect(Item.prototype, "Item");
//# sourceMappingURL=Item.js.map