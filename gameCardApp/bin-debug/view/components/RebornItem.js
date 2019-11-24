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
        _this.descs = ["攻速暴增200%", "全属性增加1倍", "攻击力增幅4倍"];
        _this.skinName = "RebornItemSkin";
        return _this;
    }
    RebornItem.prototype.dataChanged = function () {
        var index = this.itemIndex + 1;
        this.descLab.text = this.descs[this.itemIndex];
        if (index >= 5) {
            index = 4;
        }
        this.headIcon.source = "reborn_" + this.data.rmodel + "_png";
        // if(this.itemIndex == 2){
        // 	this.headIcon.x
        // }
        this.titleImg.source = "reborn_title_" + this.data.rmodel + "_png";
        this.rebornCostLab.text = this.data.cost;
        var reborns = GameApp.reborns[this.data.skillId];
        if (reborns && (!!~reborns.indexOf(this.data.mid))) {
            this._rebornBoo = true;
            this.rebornCostLab.text = "已转生";
        }
        this._cost = this.data.cost;
        // this._rebornBoo = this.data.rebornBoo;
        this._id = this.data.mid;
    };
    RebornItem.prototype.reborn = function () {
        this._rebornBoo = true;
        this.rebornCostLab.text = "已转生";
        if (!GameApp.reborns[this.data.skillId]) {
            GameApp.reborns[this.data.skillId] = [this.data.mid];
        }
        else {
            GameApp.reborns[this.data.skillId].push(this.data.mid);
        }
        egret.localStorage.setItem(LocalStorageEnum.REBORNIDS, JSON.stringify(GameApp.reborns));
        var skillCfg = GameApp.skillCfg[this.data.skillId];
        var rebornCfg = RebornCfg.cfg;
        var curRebornCfg = null;
        for (var i = 0; i < rebornCfg.length; i++) {
            if (rebornCfg[i].mid == this.data.mid) {
                curRebornCfg = rebornCfg[i];
                break;
            }
        }
        1;
        var obj = { skillId: this.data.skillId, rebornId: this.data.mid, skillIcon: this.icon, skillTitle: "reborn_title_" + this.data.rmodel + "_png", level: skillCfg.level, desc: curRebornCfg.desc, atk: 5 * skillCfg.level + 45, hp: 50 * skillCfg.level + 450, atkDis: 100, cost: 10 * skillCfg.level + 90, skillType: 1 };
        GameApp.skillCfg[this.data.skillId] = obj;
        egret.localStorage.setItem(LocalStorageEnum.REBORNCFG, JSON.stringify(GameApp.skillCfg));
        MessageManager.inst().dispatch(CustomEvt.REBORNSUCCESS, { skillId: this.data.skillId });
    };
    Object.defineProperty(RebornItem.prototype, "icon", {
        get: function () {
            return "reborn_head_" + (this.itemIndex + 1) + "_png";
        },
        enumerable: true,
        configurable: true
    });
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