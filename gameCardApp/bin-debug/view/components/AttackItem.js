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
var AttackItem = (function (_super) {
    __extends(AttackItem, _super);
    function AttackItem(res, tarx, tary, curx, cury, camp) {
        var _this = _super.call(this) || this;
        _this._gy = 0.5;
        _this.vy = 0;
        _this._rotationV = 0.8;
        _this._res = res;
        _this._tarx = tarx;
        _this._tary = tary;
        _this._camp = camp;
        _this._curx = curx;
        _this._cury = cury;
        _this._angle = -20;
        _this.initialize();
        return _this;
    }
    AttackItem.prototype.initialize = function () {
        this.img = new eui.Image();
        this.img.source = this._res;
        this.addChild(this.img);
        var arrowFire = new MovieClip();
        this.addChild(arrowFire);
        arrowFire.playFile(EFFECT + "arrow_fire", -1);
        arrowFire.scaleX = arrowFire.scaleY = 0.3;
        this._highX = ((Math.abs(this._tarx) - Math.abs(this._curx)) >> 1) + 150;
        this._highY = (StageUtils.ins().getHeight() >> 1) - 300;
        // this.scaleX*=-this._camp;
        this.anchorOffsetX = this.width;
        this.anchorOffsetY = this.height >> 1;
        this._tary = (Math.random() * (StageUtils.ins().getHeight() - 200) + 100) >> 0;
        this.x = this._curx;
        this.y = this._cury;
        this.rotation = this._angle;
        arrowFire.x = this.img.x + 30;
        arrowFire.y = this.img.y + 5;
    };
    //利用egret的缓动动画Tween来实现动画  
    //二次方贝塞尔公式  
    //起点P0  控制点P1  终点P2  
    //(1 - t)^2 P0 + 2 t (1 - t) P1 + t^2 P2  
    //在1秒内，this的factor属性将会缓慢趋近1这个值，这里的factor就是曲线中的t属性，它是从0到1的闭区间。  
    AttackItem.prototype.doTween = function () {
        var _this = this;
        egret.Tween.get(this).to({ factor: 1 }, 1000).call(function () {
            var loopFire = new MovieClip();
            _this.addChild(loopFire);
            loopFire.playFile(SKILL_EFF + "loopFire", -1);
            loopFire.alpha = 0.8;
            loopFire.scaleX = loopFire.scaleY = 0.8;
            loopFire.x = _this.img.x + _this.img.width;
            loopFire.rotation = -45;
            loopFire.y = _this.img.y + (_this.img.height >> 1);
            egret.Tween.removeTweens(_this);
            var self = _this;
            _this.rotation = 45;
            var timeout = setTimeout(function () {
                clearTimeout(timeout);
                if (self && self.parent) {
                    self.parent.removeChild(self);
                }
            }, 3000);
        }, this);
    };
    Object.defineProperty(AttackItem.prototype, "factor", {
        //添加factor的set,get方法,注意用public  
        get: function () {
            return 0;
        },
        //计算方法参考 二次贝塞尔公式  
        set: function (value) {
            this.x = (1 - value) * (1 - value) * this._curx + 2 * value * (1 - value) * this._highX + value * value * (this._tarx);
            this.y = (1 - value) * (1 - value) * (this._cury) + 2 * value * (1 - value) * (this._highY) + value * value * (this._tary);
            this.vy += this._gy;
            this.y += this.vy;
            this._angle += this._rotationV;
            var angle = Math.atan2(this._tary - this.y, this._tarx - this.x) * 180 / Math.PI;
            this.rotation = this._angle;
        },
        enumerable: true,
        configurable: true
    });
    return AttackItem;
}(eui.Component));
__reflect(AttackItem.prototype, "AttackItem");
//# sourceMappingURL=AttackItem.js.map