var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏里使用到的正则
 * @author WynnLam
 *
 */
var RegExpUtil = (function () {
    function RegExpUtil() {
    }
    //换行符\r
    RegExpUtil.LINE_BREAK = /\r+/g;
    //空白字符和“\”号的正则
    RegExpUtil.BLANK_REG = /[\s\\]/g;
    //8位ARGB颜色
    RegExpUtil.ARGB_COLOR = /[a-fA-F0-9]{8}/;
    //html正则
    RegExpUtil.HTML = /<[^>]+>/g;
    //去除空格的正则表达式
    RegExpUtil.DELETE_SPACE = /\s/g; //去除空格字符
    RegExpUtil.REPLACE_STRING = /%s/g; //去除空格字符
    RegExpUtil.NumericExp = /^\d+$/;
    RegExpUtil.NonNumericExp = /\D/;
    RegExpUtil.ActorNameExp = /^([\u4e00-\u9fa5]?\w?[^>|!@#$%&*\^\?]){1,48}$/;
    return RegExpUtil;
}());
__reflect(RegExpUtil.prototype, "RegExpUtil");
//# sourceMappingURL=RegExpUtil.js.map