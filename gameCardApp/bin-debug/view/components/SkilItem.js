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
var SkilItem = (function (_super) {
    __extends(SkilItem, _super);
    function SkilItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "SkillItemSkin";
        return _this;
    }
    SkilItem.prototype.dataChanged = function () {
        if (this.data.skillIcon) {
            this.skillIcon.source = this.data.skillIcon;
        }
        if (this.data.skillTitle) {
            this.skillTitle.source = this.data.skillTitle;
        }
        if (this.data.skillId) {
            this._skillId = this.data.skillId;
        }
    };
    Object.defineProperty(SkilItem.prototype, "skillId", {
        get: function () {
            return this._skillId;
        },
        enumerable: true,
        configurable: true
    });
    return SkilItem;
}(eui.ItemRenderer));
__reflect(SkilItem.prototype, "SkilItem");
//# sourceMappingURL=SkilItem.js.map