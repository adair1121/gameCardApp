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
var RebornItem = (function (_super) {
    __extends(RebornItem, _super);
    function RebornItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "RebornItemSkin";
        return _this;
    }
    RebornItem.prototype.dataChanged = function () {
        var index = this.itemIndex + 1;
        if (index >= 5) {
            index = 4;
        }
        this.headIcon.source = "reborn_head_" + index + "_png";
        this.titleImg.source = "reborn_title_" + index + "_png";
        this.rebornCostLab.text = this.data.cost;
        if (this.data.rebornBoo) {
            this.rebornCostLab.text = "已转生";
        }
        this._cost = this.data.cost;
        this._rebornBoo = this.data.rebornBoo;
        this._id = this.data.mid;
    };
    Object.defineProperty(RebornItem.prototype, "cost", {
        get: function () {
            return this._cost;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RebornItem.prototype, "ifReborn", {
        get: function () {
            return this._rebornBoo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RebornItem.prototype, "mid", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    return RebornItem;
}(eui.ItemRenderer));
__reflect(RebornItem.prototype, "RebornItem");
//# sourceMappingURL=RebornItem.js.map