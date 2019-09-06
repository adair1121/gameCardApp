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
    return LocalStorageEnum;
}());
__reflect(LocalStorageEnum.prototype, "LocalStorageEnum");
//# sourceMappingURL=LocalStorageEnum.js.map