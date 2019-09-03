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
var SoldierEntity = (function (_super) {
    __extends(SoldierEntity, _super);
    function SoldierEntity() {
        var _this = _super.call(this) || this;
        _this.curState = ActionState.STAND;
        return _this;
    }
    SoldierEntity.prototype.initialize = function () {
    };
    SoldierEntity.prototype.setSoldierData = function (camp, res, _atkDis, _speed, id) {
        this._camp = camp;
        this._direc = this._camp == 1 ? 1 : -1;
        this._atkDis = _atkDis;
        this._res = "" + SOLDIER + res;
        this._speed = _speed;
        this._mc = new MovieClip();
        this._typeId = id;
        // let scale:number = 0.7
        // if(id == SoldierType.SOLDIER_QI){
        // 	scale = 0.5;
        // }
        var scale = id == SoldierType.SOLDIER_QI ? 0.5 : 0.7;
        if (id == -1) {
            scale = 1;
        }
        this.scaleX = this._mc.scaleY = scale;
        if (id != -1) {
            this.scaleX *= this._direc;
        }
        this.addChild(this._mc);
        this._mc.playFile(this._res, -1, null, false, ActionState.STAND);
    };
    /**执行攻击动作 */
    SoldierEntity.prototype.execAtkAction = function () {
        if (this._atkTar && !this._atkTar._isDead && this.isInAtkDis()) {
            if (this.curState != ActionState.ATTACK) {
                this.curState = ActionState.ATTACK;
                egret.Tween.removeTweens(this);
                this._mc.playFile(this._res, 1, null, false, ActionState.ATTACK);
                if (this._typeId == SoldierType.SOLDIER_TOUSHICHE) {
                    this.createStone();
                }
                //当前实体执行攻击动作 目标实体血量值减少
                var self_1 = this;
                var timeout_1 = setTimeout(function () {
                    clearTimeout(timeout_1);
                    if (self_1 && self_1._mc) {
                        self_1.curState = ActionState.STAND;
                        self_1._mc.playFile(self_1._res, -1, null, false, ActionState.STAND);
                    }
                    if (self_1 && self_1._atkTar) {
                        self_1._atkTar.reduceHp(self_1.attack);
                    }
                }, 700);
            }
        }
    };
    SoldierEntity.prototype.createStone = function () {
        var dict = this.camp == 1 ? 1 : -1;
        var atkStone = new AttackStoneItem(this._atkTar.x, this._atkTar.y, this.x - 60 * dict, this.y - 30, this.camp);
        this.parent.addChild(atkStone);
        atkStone.anchorOffsetX = atkStone.width >> 1;
        atkStone.anchorOffsetY = atkStone.height >> 1;
        atkStone.x = this.x - 60 * dict;
        atkStone.y = this.y - 30;
        atkStone.scaleX = atkStone.scaleY = 0.6;
    };
    /**执行前往目标附近位置 */
    SoldierEntity.prototype.execMoveAction = function () {
        var _this = this;
        if (this.curState != ActionState.RUN) {
            this.curState = ActionState.RUN;
            this._mc.playFile(this._res, -1, null, false, ActionState.RUN);
        }
        if (this && this._atkTar && !this._atkTar.isDead) {
            var startP = new egret.Point(this.x, this.y);
            var endP = new egret.Point(this._atkTar.x, this._atkTar.y);
            var distance = Math.sqrt(Math.pow(startP.x - endP.x, 2) + Math.pow(startP.y - endP.y, 2));
            egret.Tween.removeTweens(this);
            var time = distance / this._speed;
            egret.Tween.get(this, { loop: false, onChange: function () {
                    if (_this.isInAtkDis()) {
                        egret.Tween.removeTweens(_this);
                    }
                }, onChangeObj: this }).to({ x: this._atkTar.x, y: this._atkTar.y }, time * 1000).call(function () {
                egret.Tween.removeTweens(_this);
            });
        }
    };
    /**执行站立状态 */
    SoldierEntity.prototype.execStandAction = function () {
        this.curState = ActionState.STAND;
        this._mc.playFile(this._res, -1, null, false, ActionState.STAND);
    };
    /**获取到目标位置的距离 是否达到攻击距离 */
    SoldierEntity.prototype.isInAtkDis = function () {
        if (this && this._atkTar && !this._atkTar.isDead) {
            var startP = new egret.Point(this.x, this.y);
            var endP = new egret.Point(this._atkTar.x, this._atkTar.y);
            var distance = Math.sqrt(Math.pow(endP.x - startP.x, 2) + Math.pow(endP.y - startP.y, 2));
            return Math.abs(distance) <= this._atkDis;
        }
        return false;
    };
    /**锁定目标 */
    SoldierEntity.prototype.lookAt = function (_atkTar) {
        if (!this._atkTar || (this._atkTar && this._atkTar._isDead)) {
            //重新锁定目标
            this._atkTar = _atkTar;
        }
        else {
            return;
        }
    };
    Object.defineProperty(SoldierEntity.prototype, "isDead", {
        get: function () {
            return this._isDead;
        },
        enumerable: true,
        configurable: true
    });
    SoldierEntity.prototype.dispose = function () {
        this._mc.playFile(this._res, 1, null, true, ActionState.DEAD);
        var self = this;
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            self._atkTar = null;
            if (self && self._mc) {
                self.removeChild(self._mc);
                self._mc = null;
            }
            if (self && self.parent) {
                self.parent.removeChild(self);
            }
        }, 600);
    };
    Object.defineProperty(SoldierEntity.prototype, "hp", {
        set: function (value) {
            this._hp = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoldierEntity.prototype, "atkTar", {
        get: function () {
            return this._atkTar;
        },
        enumerable: true,
        configurable: true
    });
    return SoldierEntity;
}(BaseEntity));
__reflect(SoldierEntity.prototype, "SoldierEntity");
//# sourceMappingURL=SoldierEntity.js.map