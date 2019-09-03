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
var HeroEntity = (function (_super) {
    __extends(HeroEntity, _super);
    function HeroEntity() {
        return _super.call(this) || this;
    }
    HeroEntity.prototype.initialize = function () {
        this.createShadow();
        this._roleMc = new MovieClip();
        this.addChild(this._roleMc);
        this._id = this.hashCode;
        GameApp.ins().role_insId = this._id;
        this._camp = 1;
        this._hp = 800;
    };
    HeroEntity.prototype.createShadow = function () {
        var jobstr = egret.localStorage.getItem(LocalStorageEnum.ROLE_JOB);
        var w = (jobstr && jobstr != "0") ? 60 : 30;
        var h = (jobstr && jobstr != "0") ? 30 : 15;
        var sp = new egret.Shape();
        sp.graphics.beginFill(0x000000, 0.4);
        sp.graphics.drawEllipse(0, 0, w, h);
        sp.graphics.endFill();
        this.addChild(sp);
        sp.anchorOffsetX = sp.width >> 1;
        sp.anchorOffsetY = sp.height >> 1;
        sp.y = (jobstr && jobstr != "0") ? 20 : 10;
    };
    /**
     * name:特效名称
     * dic 方向
     */
    HeroEntity.prototype.playAction = function (action, playCount) {
        if (playCount === void 0) { playCount = -1; }
        if (this.curAction == action && this.curDic == this.dic) {
            return;
        }
        this.curAction = action;
        this.curDic = this.dic;
        var name = GlobalFun.getMainEntityRes(action);
        this._roleMc.playFile("" + EFFECT + name, playCount, null, false, this._dic.toString());
    };
    return HeroEntity;
}(BaseEntity));
__reflect(HeroEntity.prototype, "HeroEntity");
//# sourceMappingURL=HeroEntity.js.map