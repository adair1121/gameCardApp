/**
 * 自定义数据类型 以及枚举
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ActionState = (function () {
    function ActionState() {
    }
    ActionState.RUN = "run";
    ActionState.ATTACK = "attack";
    ActionState.DEAD = 'dead';
    ActionState.STAND = "stand";
    ActionState.HIT = "hit";
    return ActionState;
}());
__reflect(ActionState.prototype, "ActionState");
var ActionEnum;
(function (ActionEnum) {
    ActionEnum[ActionEnum["run"] = 0] = "run";
    ActionEnum[ActionEnum["attack"] = 1] = "attack";
    ActionEnum[ActionEnum["dead"] = 2] = "dead";
    ActionEnum[ActionEnum["stand"] = 3] = "stand";
})(ActionEnum || (ActionEnum = {}));
var EntityType;
(function (EntityType) {
    EntityType[EntityType["enemy"] = 0] = "enemy";
    EntityType[EntityType["energy"] = 1] = "energy";
})(EntityType || (EntityType = {}));
var DirectionEnum;
(function (DirectionEnum) {
    DirectionEnum[DirectionEnum["TOP"] = 1] = "TOP";
    DirectionEnum[DirectionEnum["TR"] = 2] = "TR";
    DirectionEnum[DirectionEnum["RIGHT"] = 3] = "RIGHT";
    DirectionEnum[DirectionEnum["RB"] = 4] = "RB";
    DirectionEnum[DirectionEnum["BOTTOM"] = 5] = "BOTTOM";
})(DirectionEnum || (DirectionEnum = {}));
var SoldierType;
(function (SoldierType) {
    /**枪兵 */
    SoldierType[SoldierType["SOLDIER_QIANG"] = 0] = "SOLDIER_QIANG";
    /**刀兵 */
    SoldierType[SoldierType["SOLDIER_DAO"] = 1] = "SOLDIER_DAO";
    /**骑兵 */
    SoldierType[SoldierType["SOLDIER_QI"] = 2] = "SOLDIER_QI";
    /**弓箭手 */
    SoldierType[SoldierType["SOLDIER_GONG"] = 3] = "SOLDIER_GONG";
    /**投石车 */
    SoldierType[SoldierType["SOLDIER_TOUSHICHE"] = 4] = "SOLDIER_TOUSHICHE";
})(SoldierType || (SoldierType = {}));
//# sourceMappingURL=CounstDataType.js.map