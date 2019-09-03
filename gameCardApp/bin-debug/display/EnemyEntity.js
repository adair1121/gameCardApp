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
var EnemyEntity = (function (_super) {
    __extends(EnemyEntity, _super);
    function EnemyEntity() {
        var _this = _super.call(this) || this;
        _this.hpcount = 5;
        _this.isDead = false;
        return _this;
    }
    EnemyEntity.prototype.initialize = function () {
        this.createShadow();
        this.mc = new MovieClip();
        this.addChild(this.mc);
        this.progressGroup = new eui.Group();
        this.addChild(this.progressGroup);
        this.progressGroup.anchorOffsetX = 50;
        this.progressGroup.anchorOffsetX = 50;
        this.progressGroup.top = -100;
        this.progressGroup.x = 0;
        this.speakGroup = new eui.Group();
        this.addChild(this.speakGroup);
        this.speakGroup.top = -130;
        this.speakGroup.scaleX = 1;
        this.probg = new eui.Image();
        this.progressGroup.addChild(this.probg);
        this.probg.scale9Grid = new egret.Rectangle(12, 9, 6, 6);
        this.probg.width = 100;
        this.probg.source = "enemy_probg_png";
        this.probar = new eui.Image();
        this.progressGroup.addChild(this.probar);
        this.probar.width = 90;
        this.probg.scale9Grid = new egret.Rectangle(8, 5, 6, 6);
        this.probar.source = "enemy_pro_png";
        this.probar.x = 4;
        this.probar.y = 4;
        this.speakBg = new eui.Image();
        this.speakBg.source = "common_speak_bg_png";
        this.speakGroup.addChild(this.speakBg);
        this.speakBg.scaleX = this.speakBg.scaleY = 0.8;
        this.speakBg.horizontalCenter = 0;
        this.speakTxt = new eui.Label();
        this.speakGroup.addChild(this.speakTxt);
        this.speakTxt.horizontalCenter = 0;
        this.speakTxt.width = 150;
        this.speakTxt.y = -50;
        this.speakTxt.size = 15;
        this.speakTxt.textColor = 0x423C3C;
        this.speakTxt.text = "";
        this.speakGroup.alpha = 0;
        this.speakGroup.x = -85;
        this.speakBg.y = -70;
        this._camp = 2;
        this._id = this.hashCode;
        eui.Binding.bindHandler(this, ["scaleX"], this.onScaleXChange, this);
    };
    EnemyEntity.prototype.createShadow = function () {
        var sp = new egret.Shape();
        sp.graphics.beginFill(0x000000, 0.4);
        sp.graphics.drawEllipse(0, 0, 40, 15);
        sp.graphics.endFill();
        this.addChild(sp);
        sp.anchorOffsetX = sp.width >> 1;
        sp.anchorOffsetY = sp.height >> 1;
    };
    EnemyEntity.prototype.reduceHp = function () {
        this.hpcount -= 1;
        if (this.hpcount <= 0) {
            this.hpcount = 0;
            this.isDead = true;
        }
        this.probar.width = (this.hpcount / 5) * 90;
    };
    /**
     * name:特效名称
     * dic 方向
     */
    EnemyEntity.prototype.playAction = function (action, playCount) {
        if (playCount === void 0) { playCount = -1; }
        if (this.curAction == action && this.curDic == this.dic) {
            return;
        }
        this.curAction = action;
        this.curDic = this.dic;
        var name = GlobalFun.getEnemyRes(action);
        this.mc.playFile("" + EFFECT + name, playCount, null, false, this._dic.toString());
    };
    EnemyEntity.prototype.onScaleXChange = function () {
        this.speakTxt.scaleX = this.scaleX;
    };
    EnemyEntity.prototype.showSpeak = function (str) {
        var _this = this;
        this.speakTxt.text = str;
        this.speakTxt.scaleX = this.scaleX;
        egret.Tween.get(this.speakGroup).to({ alpha: 1 }, 600).call(function () {
            egret.Tween.removeTweens(_this.speakGroup);
            var self = _this;
            var timeout = setTimeout(function () {
                self.speakGroup.alpha = 0;
                clearTimeout(timeout);
            }, 2000);
        }, this);
    };
    return EnemyEntity;
}(BaseEntity));
__reflect(EnemyEntity.prototype, "EnemyEntity");
//# sourceMappingURL=EnemyEntity.js.map