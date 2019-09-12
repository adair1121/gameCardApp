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
var SoldierShapType;
(function (SoldierShapType) {
    SoldierShapType[SoldierShapType["TYPE_RECT"] = 0] = "TYPE_RECT";
    SoldierShapType[SoldierShapType["TYPE_CIRCLE"] = 1] = "TYPE_CIRCLE";
    SoldierShapType[SoldierShapType["TYPE_HALFCIRCLE"] = 2] = "TYPE_HALFCIRCLE";
    SoldierShapType[SoldierShapType["TYPE_LINGXING"] = 3] = "TYPE_LINGXING";
    SoldierShapType[SoldierShapType["TYPE_TRIANGLE"] = 4] = "TYPE_TRIANGLE";
    SoldierShapType[SoldierShapType["TYPE_TIXING"] = 5] = "TYPE_TIXING";
    SoldierShapType[SoldierShapType["TYPE_ARROW"] = 6] = "TYPE_ARROW";
    SoldierShapType[SoldierShapType["TYPE_CROSS"] = 7] = "TYPE_CROSS";
})(SoldierShapType || (SoldierShapType = {}));
//# sourceMappingURL=CounstDataType.js.map