var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LocalStorageEnum = (function () {
    function LocalStorageEnum() {
    }
    /**角色职业 */
    LocalStorageEnum.ROLE_JOB = "role_job";
    /**角色名字 */
    LocalStorageEnum.ROLE_NAME = "roleName";
    /**角色元宝数量 */
    LocalStorageEnum.GOLD_NUM = "goldNum";
    /**角色职称 */
    LocalStorageEnum.LEVEL_NUM = "levelName";
    /**角色头像字段 */
    LocalStorageEnum.HEAD_ICON = "headIcon";
    /**是否第一次进入游戏 */
    LocalStorageEnum.ENTER_FIRST = "first";
    /**当前人物经验值 */
    LocalStorageEnum.ROLE_EXP = "role_exp";
    /**当前人物等级总经验值 */
    LocalStorageEnum.ROLE_MAIN_EXP = "role_main_exp";
    /**物品总数量 */
    LocalStorageEnum.GOODS_NUM = "goodsNum";
    /**所拥有的物品数据 */
    LocalStorageEnum.GOODS = "goods";
    /**当前练兵剩余时间*/
    LocalStorageEnum.TRAINREMINTIME = "trainReminTime";
    /**本次练兵获得经验值 */
    LocalStorageEnum.TRAIN_EXP = "train_exp";
    /**练兵状态 */
    LocalStorageEnum.TRAIN_STATE = "train_state";
    return LocalStorageEnum;
}());
__reflect(LocalStorageEnum.prototype, "LocalStorageEnum");
//# sourceMappingURL=LocalStorageEnum.js.map