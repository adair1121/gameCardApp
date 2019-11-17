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
        ViewManager.inst().open(RebornPanel, [{ skillId: this._skillId }]);
    };
    UpgradeItem.prototype.onUpgrade = function () {
        var userGold = GameApp.inst().gold;
        if (this._curCost > userGold) {
            UserTips.inst().showTips("元宝不足");
            return;
        }
        GameApp.inst().gold -= this._curCost;
        GameApp.skillCfg[this._skillId].level += 1;
        if (this._skillId >= 1000) {
            GameApp.skillCfg[this._skillId].atk = 5 * GameApp.skillCfg[this._skillId].level + 45;
            GameApp.skillCfg[this._skillId].hp = 50 * GameApp.skillCfg[this._skillId].level + 450;
            GameApp.skillCfg[this._skillId].cost = 10 * GameApp.skillCfg[this._skillId].level + 90;
        }
        else {
            if (this._skillId == 101 || this._skillId == 102) {
                GameApp.skillCfg[this._skillId].atk = 0.5 * GameApp.skillCfg[this._skillId].level + 4.5;
                GameApp.skillCfg[this._skillId].cost = 5 * GameApp.skillCfg[this._skillId].level + 45;
            }
            else {
                GameApp.skillCfg[this._skillId].atk = 2 * GameApp.skillCfg[this._skillId].level + 18;
                GameApp.skillCfg[this._skillId].cost = 10 * GameApp.skillCfg[this._skillId].level + 90;
            }
        }
        egret.localStorage.setItem(LocalStorageEnum.REBORNCFG, JSON.stringify(GameApp.skillCfg));
        // let levelstr:string = egret.localStorage.getItem(LocalStorageEnum.SKILL_LEVEL + this._skillId);
        // let curLevel:number = parseInt(levelstr)+1
        // egret.localStorage.setItem(LocalStorageEnum.SKILL_LEVEL + this._skillId,(curLevel).toString());
        this._curCost = GameApp.skillCfg[this._skillId].cost;
        this.levelLab.text = "Lv." + GameApp.skillCfg[this._skillId].level;
        this.costLab.text = this._curCost.toString();
        this.atkLab.text = (GameApp.skillCfg[this._skillId].level * this.data.atk).toString();
        UserTips.inst().showTips("升级成功");
    };
    UpgradeItem.prototype.dataChanged = function () {
        this.refresh(this.data);
    };
    UpgradeItem.prototype.refresh = function (data) {
        this.skillIcon.source = data.skillIcon;
        this.skillTitle.source = data.skillTitle;
        this.skillDesc.text = data.desc;
        this._skillId = data.skillId;
        var levelstr = data.level;
        this.atkLab.text = data.atk.toString();
        this._curCost = data.cost;
        this.costLab.text = this._curCost.toString();
        this.levelLab.text = "Lv." + levelstr;
        this.rebornBtn.visible = false;
        if (this.data.skillType == 1) {
            this.rebornBtn.visible = true;
        }
    };
    Object.defineProperty(UpgradeItem.prototype, "skillId", {
        get: function () {
            return this._skillId;
        },
        enumerable: true,
        configurable: true
    });
    UpgradeItem.prototype.dispose = function () {
        this.rebornBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReborn, this);
        this.upgradeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpgrade, this);
    };
    return UpgradeItem;
}(eui.ItemRenderer));
__reflect(UpgradeItem.prototype, "UpgradeItem");
//# sourceMappingURL=UpgradeItem.js.map