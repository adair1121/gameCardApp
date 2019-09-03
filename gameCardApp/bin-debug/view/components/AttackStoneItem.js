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
var AttackStoneItem = (function (_super) {
    __extends(AttackStoneItem, _super);
    function AttackStoneItem(tarx, tary, curx, cury, camp) {
        var _this = _super.call(this) || this;
        _this._gy = 0.5;
        _this.vy = 0;
        _this._rotationV = 0.8;
        _this.tarx = tarx;
        _this.tary = tary;
        _this.curx = curx;
        _this.cury = cury;
        _this.camp = camp;
        _this.highy = _this.cury - 500;
        _this.highx = camp == 1 ? _this.curx + (Math.abs(_this.curx - _this.tarx) >> 1) : _this.tarx + (Math.abs(_this.curx - _this.tarx) >> 1);
        _this.initialize();
        return _this;
    }
    AttackStoneItem.prototype.initialize = function () {
        var _this = this;
        this.img = new eui.Image();
        this.img.source = "stone_png";
        this.addChild(this.img);
        this.anchorOffsetX = this.width;
        this.anchorOffsetY = this.height >> 1;
        egret.Tween.get(this).to({ factor: 1 }, 2000).call(function () {
            var eff = new MovieClip();
            _this.parent.addChildAt(eff, 3);
            eff.x = _this.tarx;
            eff.y = _this.tary - 50;
            eff.playFile(EFFECT + "dropeff", 2, null, true);
            egret.Tween.removeTweens(_this);
            _this.parent.removeChild(_this);
        }, this);
    };
    Object.defineProperty(AttackStoneItem.prototype, "factor", {
        //添加factor的set,get方法,注意用public  
        get: function () {
            return 0;
        },
        //计算方法参考 二次贝塞尔公式  
        set: function (value) {
            this.x = (1 - value) * (1 - value) * this.curx + 2 * value * (1 - value) * this.highx + value * value * (this.tarx);
            this.y = (1 - value) * (1 - value) * (this.cury) + 2 * value * (1 - value) * (this.highy) + value * value * (this.tary);
            this.vy += this._gy;
            this.y += this.vy;
            // this._angle+=this._rotationV
            // let angle:number = Math.atan2(this.tary - this.y,this.tarx - this.x)*180/Math.PI;
            // this.rotation = this._angle;
        },
        enumerable: true,
        configurable: true
    });
    return AttackStoneItem;
}(eui.Component));
__reflect(AttackStoneItem.prototype, "AttackStoneItem");
//# sourceMappingURL=AttackStoneItem.js.map