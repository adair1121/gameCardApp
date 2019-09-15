var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LocalStorageEnum = (function () {
    function LocalStorageEnum() {
    }
    /**first enter */
    LocalStorageEnum.ENTER_FIRST = "enter_first";
    /**是否已经过了新手引导 */
    LocalStorageEnum.IS_PASS_GUIDE = "is_pass_guide";
    /**当前关卡 */
    LocalStorageEnum.LEVEL = "level";
    /**当天宝箱领取次数 */
    LocalStorageEnum.BOX_REWARD_GET = "box_reward_get";
    /**当前宝箱的时间戳 */
    LocalStorageEnum.BOX_REWARD_TIMESPAN = 'box_reward_timespan';
    /**宝箱刷新时间戳 */
    LocalStorageEnum.BOX_REFRESH_TIMESPAN = "box_refresh_timespan";
    /**人物货币数 */
    LocalStorageEnum.ROLE_GOLD = "role_gold";
    /**人物宝石数量 */
    LocalStorageEnum.ROLE_GEM = "role_gem";
    /**当前技能等级 */
    LocalStorageEnum.SKILL_LEVEL = "skill_level";
    return LocalStorageEnum;
}());
__reflect(LocalStorageEnum.prototype, "LocalStorageEnum");
//# sourceMappingURL=LocalStorageEnum.js.map