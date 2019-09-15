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
var UpgradeItem = (function (_super) {
    __extends(UpgradeItem, _super);
    function UpgradeItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "UpgradeItemSkin";
        return _this;
    }
    UpgradeItem.prototype.childrenCreated = function () {
        this.rebornBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReborn, this);
        this.upgradeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpgrade, this);
    };
    UpgradeItem.prototype.onReborn = function () {
        ViewManager.ins().open(RebornPanel);
    };
    UpgradeItem.prototype.onUpgrade = function () {
        var userGold = GameApp.ins().gold;
        if (this._curCost > userGold) {
            UserTips.ins().showTips("元宝不足");
            return;
        }
        GameApp.ins().gold -= this._curCost;
        var levelstr = egret.localStorage.getItem(LocalStorageEnum.SKILL_LEVEL + this._skillId);
        var curLevel = parseInt(levelstr) + 1;
        egret.localStorage.setItem(LocalStorageEnum.SKILL_LEVEL + this._skillId, (curLevel).toString());
        this._curCost = (curLevel * 1000);
        this.costLab.text = this._curCost.toString();
        this.atkLab.text = (curLevel * 1530).toString();
    };
    UpgradeItem.prototype.dataChanged = function () {
        this.skillIcon.source = this.data.skillIcon;
        this.skillTitle.source = this.data.skillTitle;
        this.skillDesc.text = this.data.desc;
        this._skillId = this.data.skillId;
        var levelstr = egret.localStorage.getItem(LocalStorageEnum.SKILL_LEVEL + this._skillId);
        this.atkLab.text = (parseInt(levelstr) * 1530).toString();
        this._curCost = (parseInt(levelstr) * 1000);
        this.costLab.text = this._curCost.toString();
        this.levelLab.text = "Lv." + levelstr;
        this.rebornBtn.visible = false;
        if (this.data.skillId == 103) {
            this.rebornBtn.visible = true;
        }
    };
    UpgradeItem.prototype.dispose = function () {
        this.rebornBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReborn, this);
        this.upgradeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpgrade, this);
    };
    return UpgradeItem;
}(eui.ItemRenderer));
__reflect(UpgradeItem.prototype, "UpgradeItem");
//# sourceMappingURL=UpgradeItem.js.map