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
var RoleHeadCom = (function (_super) {
    __extends(RoleHeadCom, _super);
    function RoleHeadCom() {
        var _this = _super.call(this) || this;
        _this.skinName = "RoleHeadComSkin";
        return _this;
    }
    RoleHeadCom.prototype.childrenCreated = function () {
        var goldNum = egret.localStorage.getItem(LocalStorageEnum.GOLD_NUM);
        if (goldNum) {
            GameApp.ins().role_gold = parseInt(goldNum);
            // this.goldNum.text = goldNum;
        }
        var job = egret.localStorage.getItem(LocalStorageEnum.ROLE_JOB);
        if (job) {
            this.headIcon.source = parseInt(job) ? "headicon_prompt_png" : "headicon_noraml_png";
        }
        else {
            this.headIcon.source = "headicon_noraml_png";
        }
        this.curHp = this.totalHp = GameApp.ins().totalHp;
        this.hpLab.text = this.curHp + "/" + this.totalHp;
        this.hpBar.mask = this.hpMask;
        this.expBar.mask = this.expMask;
        var curExp = egret.localStorage.getItem(LocalStorageEnum.ROLE_EXP);
        if (curExp) {
            GameApp.ins().curExp = parseInt(curExp);
        }
        var totalExp = egret.localStorage.getItem(LocalStorageEnum.ROLE_MAIN_EXP);
        if (totalExp) {
            GameApp.ins().curLevelMaxExp = parseInt(totalExp);
        }
        eui.Binding.bindHandler(GameApp.ins(), ["role_gold"], this.onGoldChage, this);
        eui.Binding.bindHandler(GameApp.ins(), ["role_job"], this.levelNameChange, this);
        eui.Binding.bindHandler(GameApp.ins(), ["curExp"], this.onExpChange, this);
        eui.Binding.bindHandler(GameApp.ins(), ["curLevelMaxExp"], this.onExpChange, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ontouchTap, this);
    };
    RoleHeadCom.prototype.onExpChange = function (value) {
        this.expLab.text = GameApp.ins().curExp + "/" + GameApp.ins().curLevelMaxExp;
        this.expMask.width = GameApp.ins().curExp / GameApp.ins().curLevelMaxExp * 175;
    };
    RoleHeadCom.prototype.onGoldChage = function (value) {
        if (!isNaN(value)) {
            this.goldNum.text = value.toString();
            egret.localStorage.setItem(LocalStorageEnum.GOLD_NUM, value.toString());
        }
    };
    RoleHeadCom.prototype.ontouchTap = function (evt) {
        ViewManager.ins().open(SelectWayPopUp);
    };
    /**血量减少 */
    RoleHeadCom.prototype.reduceHp = function (damage) {
        var realReduce = damage * 100;
        this.curHp -= realReduce;
        if (this.curHp <= 0) {
            this.curHp = 0;
        }
        this.hpMask.width = this.curHp / this.totalHp * this.hpBar.width;
        this.hpLab.text = this.curHp + "/" + this.totalHp;
    };
    /**重置血条 */
    RoleHeadCom.prototype.resetHp = function () {
        this.curHp = this.totalHp;
        this.hpLab.text = this.curHp + "/" + this.totalHp;
        this.hpMask.width = this.hpBar.width;
    };
    RoleHeadCom.prototype.levelNameChange = function (value) {
        this.curHp = this.totalHp = GameApp.soldierCfg[GameApp.ins().role_job].length * 10 * 100;
        this.hpLab.text = this.totalHp + "/" + this.totalHp;
        this.levelName.source = "title_job_" + value + "_png";
    };
    RoleHeadCom.prototype.initialize = function (obj) {
        // this.goldNum.text = obj.goldNum;
        // egret.localStorage.setItem(LocalStorageEnum.GOLD_NUM,obj.goldNum);
    };
    return RoleHeadCom;
}(eui.Component));
__reflect(RoleHeadCom.prototype, "RoleHeadCom");
//# sourceMappingURL=RoleHeadCom.js.map