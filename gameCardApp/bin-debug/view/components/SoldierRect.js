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
/**
 * 士兵方阵
 */
var SoldierRect = (function (_super) {
    __extends(SoldierRect, _super);
    function SoldierRect(resid, type, camp) {
        var _this = _super.call(this) || this;
        _this._col = 2;
        _this._row = 5;
        _this._mcEntitys = [];
        _this._res = resid;
        _this._type = type;
        _this._camp = camp;
        _this._resPath = camp == 1 ? "soldier" : "enemy";
        //因没资源所以需要修改一下
        if (_this._type == SoldierType.SOLDIER_TOUSHICHE) {
            _this._type = SoldierType.SOLDIER_GONG;
        }
        _this.soliderGroup = new eui.Group();
        _this.addChild(_this.soliderGroup);
        return _this;
    }
    SoldierRect.prototype.childrenCreated = function () {
        this.initialize();
    };
    SoldierRect.prototype.initialize = function () {
        var _this = this;
        this._mcEntitys = [];
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                var mc = new MovieClip();
                this_1.soliderGroup.addChild(mc);
                mc.scaleX = mc.scaleY = 0.7;
                if (this_1._type == SoldierType.SOLDIER_QI) {
                    mc.scaleX = mc.scaleY = 0.5;
                }
                mc.playFile(EFFECT + "soldier/" + this_1._res, -1, null, null, "", function () {
                    mc.x = j * mc.width * mc.scaleX;
                    mc.y = i * (mc.height >> 1) * mc.scaleY;
                    _this.anchorOffsetX = (mc.width * mc.scaleX);
                    _this.anchorOffsetY = (mc.height * mc.scaleY * _this._row) >> 1;
                });
                this_1._mcEntitys.push(mc);
            };
            for (var j = 0; j < this_1._col; j++) {
                _loop_2(j);
            }
        };
        var this_1 = this;
        for (var i = 0; i < this._row; i++) {
            _loop_1(i);
        }
    };
    /**播放动作 */
    SoldierRect.prototype.playAction = function (action, count, cb, arg) {
        if (count === void 0) { count = -1; }
        if (cb === void 0) { cb = null; }
        if (arg === void 0) { arg = null; }
        var res = this._resPath + "_" + action + "_" + this._type;
        for (var i = 0; i < this._mcEntitys.length; i++) {
            var mc = this._mcEntitys[i];
            mc.playFile(EFFECT + "soldier/" + res, count, function () {
                if (cb && arg) {
                    cb.call(arg);
                }
            });
        }
    };
    Object.defineProperty(SoldierRect.prototype, "damage", {
        /**获取方阵伤害值 */
        get: function () {
            var index = (Math.random() * 100) >> 0;
            var rate = index / 100;
            var dmg = 1;
            if (index <= 50) {
                dmg = 2;
            }
            else {
                dmg = 3;
            }
            return dmg;
        },
        enumerable: true,
        configurable: true
    });
    /**减少士兵个数 每一点伤害为1个士兵 */
    SoldierRect.prototype.reduceSoldier = function (dmg, cb, arg) {
        var realHp = 0;
        for (var i = 0; i < dmg; i++) {
            var index = (Math.random() * this._mcEntitys.length) >> 0;
            var mc = this._mcEntitys[index];
            if (!mc) {
                continue;
            }
            ;
            realHp += 1;
            mc.playFile(EFFECT + "soldier/" + this._resPath + "_dead_" + this._type, 1, null, true);
            this._mcEntitys.splice(index, 1);
        }
        var self = this;
        if (this._mcEntitys.length <= 0 && cb && arg) {
            cb.call(arg);
            var timeout_1 = setTimeout(function () {
                clearTimeout(timeout_1);
                if (self && self.parent) {
                    self.parent.removeChild(self);
                }
            }, 800);
        }
        return realHp;
    };
    Object.defineProperty(SoldierRect.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    return SoldierRect;
}(eui.Component));
__reflect(SoldierRect.prototype, "SoldierRect");
//# sourceMappingURL=SoldierRect.js.map