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
var MainProgress = (function (_super) {
    __extends(MainProgress, _super);
    function MainProgress() {
        var _this = _super.call(this) || this;
        _this.skinName = "MainProgressSkin";
        _this.initialize();
        return _this;
    }
    MainProgress.prototype.initialize = function () {
        var curExp = egret.localStorage.getItem(LocalStorageEnum.ROLE_EXP);
        if (curExp) {
            GameApp.ins().curExp = parseInt(curExp);
        }
        var totalExp = egret.localStorage.getItem(LocalStorageEnum.ROLE_MAIN_EXP);
        if (totalExp) {
            GameApp.ins().curLevelMaxExp = parseInt(totalExp);
        }
    };
    MainProgress.prototype.childrenCreated = function () {
        eui.Binding.bindHandler(GameApp.ins(), ["curExp"], this.onExpChange, this);
        eui.Binding.bindHandler(GameApp.ins(), ["curLevelMaxExp"], this.onExpChange, this);
    };
    MainProgress.prototype.onExpChange = function (value) {
        this.progressLab.text = GameApp.ins().curExp + "/" + GameApp.ins().curLevelMaxExp;
        this.exp_bar.width = GameApp.ins().curExp / GameApp.ins().curLevelMaxExp * StageUtils.ins().getWidth();
    };
    return MainProgress;
}(eui.Component));
__reflect(MainProgress.prototype, "MainProgress");
//# sourceMappingURL=MainProgress.js.map