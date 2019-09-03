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
var EntityManager = (function (_super) {
    __extends(EntityManager, _super);
    function EntityManager() {
        var _this = _super.call(this) || this;
        _this._isinit = false;
        return _this;
    }
    EntityManager.prototype.init = function () {
        if (this._isinit) {
            return;
        }
        this._entityList = [];
        this._isinit = true;
        var heroEntity = new HeroEntity();
        LayerManager.MAP_LAYER.addChild(heroEntity);
        heroEntity.playAction(ActionEnum.stand);
        heroEntity.x = StageUtils.ins().getWidth() >> 1;
        heroEntity.y = StageUtils.ins().getHeight() >> 1;
        var pos = GameMap.point2Grid(heroEntity.x, heroEntity.y);
        heroEntity.gx = pos.x;
        heroEntity.gy = pos.y;
        this._entitys = [heroEntity];
    };
    EntityManager.prototype.reestRolePos = function () {
        var heroEntity = this.getEntity(GameApp.ins().role_insId);
        // heroEntity.x -= 100;
    };
    EntityManager.prototype.createEntity = function (xy) {
        var enemtyEntity = new EnemyEntity();
        LayerManager.MAP_LAYER.addChild(enemtyEntity);
        enemtyEntity.playAction(ActionEnum.stand);
        enemtyEntity.x = xy.x;
        enemtyEntity.y = xy.y;
        this._entitys.push(enemtyEntity);
        return enemtyEntity;
    };
    EntityManager.prototype.getEntity = function (id) {
        for (var i = 0; i < this._entitys.length; i++) {
            var entity = this._entitys[i];
            if (entity.instId == id) {
                return entity;
            }
        }
    };
    /**获取敌人列表 */
    EntityManager.prototype.getEnemyList = function () {
        var arr = [];
        for (var i = 0; i < this._entitys.length; i++) {
            if (this._entitys[i].camp == 2) {
                arr.push(this._entitys[i]);
            }
        }
        return arr;
    };
    /**从列表移除实体 */
    EntityManager.prototype.removeEntityFromList = function (entity) {
        for (var i = 0; i < this._entitys.length; i++) {
            if (this._entitys[i].instId == entity.instId) {
                this._entitys.splice(i, 1);
                break;
            }
        }
    };
    //计算方向
    EntityManager.prototype.calculEntityDic = function (entity, angle) {
        if (angle >= -20 && angle <= 20) {
            entity.dic = DirectionEnum.RIGHT;
            entity.scaleX = 1;
        }
        else if (angle < -20 && angle >= -70) {
            entity.dic = DirectionEnum.TR;
            entity.scaleX = 1;
        }
        else if (angle < -70 && angle > -110) {
            entity.dic = DirectionEnum.TOP;
            entity.scaleX = 1;
        }
        else if (angle > 20 && angle <= 70) {
            entity.dic = DirectionEnum.RB;
            entity.scaleX = 1;
        }
        else if (angle > 70 && angle <= 110) {
            entity.dic = DirectionEnum.BOTTOM;
            entity.scaleX = 1;
        }
        else if (angle > 110 && angle <= 160) {
            entity.dic = DirectionEnum.RB;
            entity.scaleX = -1;
        }
        else if ((angle > 160 && angle <= 200)) {
            entity.dic = DirectionEnum.RIGHT;
            entity.scaleX = -1;
        }
        else if (angle > -160 && angle <= -110) {
            entity.dic = DirectionEnum.TR;
            entity.scaleX = -1;
        }
    };
    return EntityManager;
}(BaseClass));
__reflect(EntityManager.prototype, "EntityManager");
//# sourceMappingURL=EntityManager.js.map