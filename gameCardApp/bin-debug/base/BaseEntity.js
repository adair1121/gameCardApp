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
        _this._hp = 100;
        _this._attack = 20;
        _this._changeValue = 0.1;
        _this._isDead = false;
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
            return this._attack + dic * (this._attack * this._changeValue);
        },
        enumerable: true,
        configurable: true
    });
    BaseEntity.prototype.reduceHp = function (dmg) {
        this._hp -= dmg;
        if (this._hp <= 0) {
            this._hp = 0;
            this._isDead = true;
        }
    };
    BaseEntity.prototype.dispose = function () {
    };
    return BaseEntity;
}(eui.Component));
__reflect(BaseEntity.prototype, "BaseEntity");
//# sourceMappingURL=BaseEntity.js.map