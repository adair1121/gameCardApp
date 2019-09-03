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
var SkillStone = (function (_super) {
    __extends(SkillStone, _super);
    function SkillStone(res, tarx, tary, curx, cury) {
        var _this = _super.call(this) || this;
        _this._gy = 0.5;
        _this.vy = 0;
        _this._rotationV = 0.8;
        _this._res = res;
        _this._tarx = tarx;
        _this._tary = tary;
        _this._curx = curx;
        _this._cury = cury;
        _this.initialize();
        return _this;
    }
    SkillStone.prototype.initialize = function () {
        var _this = this;
        this.img = new eui.Image();
        this.img.source = this._res;
        this.addChild(this.img);
        this.anchorOffsetX = this.width;
        this.anchorOffsetY = this.height >> 1;
        this.x = this._curx;
        this.y = this._cury;
        var self = this;
        egret.Tween.get(this, { loop: false, onChange: function () {
                _this.img.alpha -= 0.05;
            }, onChangeObj: this }).to({ x: this._tarx, y: this._tary }, 800, egret.Ease.circIn).call(function () {
            var mc = new MovieClip();
            _this.addChild(mc);
            mc.x = _this.img.x + (_this.img.width >> 1);
            mc.y = _this.img.y = (_this.img.height >> 1);
            egret.Tween.removeTweens(_this);
            mc.playFile(SKILL_EFF + "stoneBoom", 1, null, true);
            var timeout = setTimeout(function () {
                clearTimeout(timeout);
                if (self && self.parent) {
                    self.parent.removeChild(self);
                }
            }, 600);
        });
    };
    return SkillStone;
}(eui.Component));
__reflect(SkillStone.prototype, "SkillStone");
//# sourceMappingURL=SkillStone.js.map