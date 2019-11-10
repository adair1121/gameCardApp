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
var BaseEntity = (function (_super) {
    __extends(BaseEntity, _super);
    function BaseEntity() {
        var _this = _super.call(this) || this;
        //方向
        _this._dic = 3;
        _this._hp = 40;
        _this._thp = 40;
        _this._attack = 20;
        _this._changeValue = 0.1;
        _this._isDead = false;
        _this.buffAttack = 0;
        _this.buffHp = 0;
        _this.buffDef = 0;
        _this.scale = 1;
        _this.initialize();
        return _this;
    }
    BaseEntity.prototype.initialize = function () { };
    Object.defineProperty(BaseEntity.prototype, "camp", {
        get: function () {
            return this._camp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseEntity.prototype, "instId", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseEntity.prototype, "dic", {
        get: function () {
            return this._dic;
        },
        set: function (value) {
            this._dic = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseEntity.prototype, "attack", {
        get: function () {
            var index = (Math.random() * 100) >> 0;
            var dic = index >= 50 ? 1 : -1;
            return (this._attack + this.buffAttack) + dic * ((this._attack + this.buffAttack) * this._changeValue);
        },
        set: function (value) {
            this._attack = value;
        },
        enumerable: true,
        configurable: true
    });
    BaseEntity.prototype.reduceHp = function (dmg) {
        if (this.buffHp > 0) {
            this.buffHp -= dmg;
        }
        else {
            this._hp -= (dmg - this.buffDef);
            if (this._hp <= 0) {
                this._hp = 0;
                this._isDead = true;
            }
            var dmgfont_1 = new eui.BitmapLabel();
            dmgfont_1.scaleX = dmgfont_1.scaleY = 0.7;
            dmgfont_1.font = "dmg_fnt";
            if (this.parent) {
                this.parent.addChildAt(dmgfont_1, this.parent.numChildren - 1);
            }
            dmgfont_1.text = "-" + dmg;
            dmgfont_1.x = this.x;
            dmgfont_1.y = this.y + -100 + ((Math.random() * 50) >> 0);
            egret.Tween.get(dmgfont_1).to({ y: this.y - 150 }, 600 + ((Math.random() * 400) >> 0), egret.Ease.circIn).call(function () {
                egret.Tween.removeTweens(dmgfont_1);
                if (dmgfont_1 && dmgfont_1.parent) {
                    dmgfont_1.parent.removeChild(dmgfont_1);
                }
            }, this);
        }
    };
    //计算方向
    BaseEntity.prototype.calculEntityDic = function (angle) {
        if ((angle >= -90 && angle < 0) || (angle >= 0 && angle <= 90)) {
            this._dic = 1;
        }
        else {
            this._dic = -1;
        }
        this.scaleX = this._dic * this.scale * (-this.camp);
    };
    BaseEntity.prototype.dispose = function () {
    };
    return BaseEntity;
}(eui.Component));
__reflect(BaseEntity.prototype, "BaseEntity");
//# sourceMappingURL=BaseEntity.js.map