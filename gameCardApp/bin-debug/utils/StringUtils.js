var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by yangsong on 14/12/18.
 * 字符串操作工具类
 */
var StringUtils = (function () {
    function StringUtils() {
    }
    /**
     * 去掉前后空格
     * @param str
     * @returns {string}
     */
    StringUtils.trimSpace = function (str) {
        return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
    };
    /**
     * 获取字符串长度，中文为2
     * @param str
     */
    StringUtils.getStringLength = function (str) {
        var strArr = str.split("");
        var length = 0;
        for (var i = 0; i < strArr.length; i++) {
            var s = strArr[i];
            if (this.isChinese(s)) {
                length += 2;
            }
            else {
                length += 1;
            }
        }
        return length;
    };
    /**
     * 判断一个字符串是否包含中文
     * @param str
     * @returns {boolean}
     */
    StringUtils.isChinese = function (str) {
        var reg = /^[\u4E00-\u9FA5]+$/;
        if (!reg.test(str)) {
            return true;
        }
        return false;
    };
    /**
     * 获取字符串的字节长度
     * 一个中文算2两个字节
     * @param str
     * @return
     */
    StringUtils.strByteLen = function (str) {
        var byteLen = 0;
        var strLen = str.length;
        for (var i = 0; i < strLen; i++) {
            byteLen += str.charCodeAt(i) >= 0x7F ? 2 : 1;
        }
        return byteLen;
    };
    /**
     * 补齐字符串
     * 因为这里使用的是字节长度（一个中文算2个字节）
     * 所以指定的长度是指字节长度，用来填补的字符按一个字节算
     * 如果填补的字符使用中文那么会导致结果不正确，但这里没有对填补字符做检测
     * @param str 源字符串
     * @param length 指定的字节长度
     * @param char 填补的字符
     * @param ignoreHtml 是否忽略HTML代码，默认为true
     * @return
     *
     */
    StringUtils.complementByChar = function (str, length, char, ignoreHtml) {
        if (char === void 0) { char = " "; }
        if (ignoreHtml === void 0) { ignoreHtml = true; }
        var byteLen = this.strByteLen(ignoreHtml ? str.replace(StringUtils.HTML, "") : str);
        return str + this.repeatStr(char, length - byteLen);
    };
    /**
     * 重复指定字符串count次
     * @param str
     * @param count
     * @return
     *
     */
    StringUtils.repeatStr = function (str, count) {
        var s = "";
        for (var i = 0; i < count; i++) {
            s += str;
        }
        return s;
    };
    /**
     * 为文字添加颜色
     * */
    StringUtils.addColor = function (content, color) {
        var colorStr;
        if (typeof (color) == "string")
            colorStr = String(color);
        else if (typeof (color) == "number")
            colorStr = Number(color).toString(10);
        return "<font color=\"" + colorStr + "\">" + content + "</font>";
    };
    /**
     * 这个函数还没改完,用来替代addColor
     *
     */
    StringUtils.addColor1 = function (content, color) {
        var obj = new Object;
        obj["style"] = new Object;
        obj["text"] = content;
        obj["textColor"] = Number(color).toString(16);
        return obj;
    };
    StringUtils.substitute = function (str) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var reg = RegExpUtil.REPLACE_STRING;
        var replaceReg = str.match(reg);
        if (replaceReg && replaceReg.length) {
            var len = replaceReg.length;
            for (var t_i = 0; t_i < len; t_i++) {
                str = str.replace(replaceReg[t_i], rest[t_i]);
            }
        }
        return str;
    };
    /**
     * 匹配替换字符串
     * @param 需要匹配替换的字符串
     * @param 匹配的字符串
     * @param 需要替换成的字符串
     * **/
    StringUtils.replaceStr = function (src, tar, des) {
        if (src.indexOf(tar) == -1)
            return src;
        var list = src.split(tar);
        return list[0] + des + list[1];
    };
    /**
     * 匹配替换颜色字符串
     * @param 需要匹配替换的字符串
     * @param 需要匹配目标颜色
     * @return 替换后的字符串
     * **/
    StringUtils.replaceStrColor = function (src, color) {
        // src = "0x102030asdas0xff1536tttt0xff15370x888888aabb0x789456";//测试
        var tci = src.indexOf("0x");
        var tci2 = tci;
        var arghr2 = "";
        var arghr3 = "";
        while (tci2 != -1) {
            arghr2 = src.substring(tci, tci + 8);
            src = src.replace(arghr2, color);
            tci += 8;
            arghr3 = src.substring(tci);
            tci2 = arghr3.indexOf("0x");
            tci = tci + tci2;
        }
        return src;
    };
    /**
     * 字符串匹配拼接
     * @param 需要拼接的字符串
     * @param 匹配项
     * @returns {string}
     */
    StringUtils.replace = function (str) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < args.length; i++) {
            str = str.replace("%s", args[i] + "");
        }
        return str;
    };
    /**
     * 根据正则匹配指定字符串 返回字符串中的包含所有数据的数组
     * @param 需要获取数字的字符串
     * @param 正则表达规则(缺省值)
     * **/
    StringUtils.getStrByRegExp = function (src, reg) {
        if (reg === void 0) { reg = /\d+/g; }
        var newStrlist = [];
        var newStr = src.replace(reg, function () {
            //调用方法时内部会产生 this 和 arguments
            // debug.log("arguments[0] = "+arguments[0]);//匹配的字符串值
            // debug.log("arguments[1] = "+arguments[1]);//字符串索引
            // debug.log("arguments[2] = "+arguments[2]);//原字符串
            //查找数字后，可以对数字进行其他操作
            newStrlist.push(arguments[0]);
            if (typeof arguments[0] == "number")
                return arguments[0].toString();
            else
                return arguments[0];
        });
        // debug.log("newStrlist = "+newStrlist);
        return newStrlist;
    };
    StringUtils.ChineseToNumber = function (chnStr) {
        var rtn = 0;
        var section = 0;
        var number = 0;
        var secUnit = false;
        var str = chnStr.split('');
        for (var i = 0; i < str.length; i++) {
            var num = StringUtils.chnNumCharCN[str[i]];
            if (typeof num !== 'undefined') {
                number = num;
                if (i === str.length - 1) {
                    section += number;
                }
            }
            else {
                var unit = StringUtils.chnNameValueCN[str[i]].value;
                secUnit = StringUtils.chnNameValueCN[str[i]].secUnit;
                if (secUnit) {
                    section = (section + number) * unit;
                    rtn += section;
                    section = 0;
                }
                else {
                    section += (number * unit);
                }
                number = 0;
            }
        }
        return rtn + section;
    };
    StringUtils.NumberToChinese = function (num) {
        var unitPos = 0;
        var strIns = '', chnStr = '';
        var needZero = false;
        var chnNumChar = StringUtils.chnNumChar;
        var chnUnitSection = StringUtils.chnUnitSection;
        if (num === 0) {
            return chnNumChar[0];
        }
        while (num > 0) {
            var section = num % 10000;
            if (needZero) {
                chnStr = chnNumChar[0] + chnStr;
            }
            strIns = StringUtils.SectionToChinese(section);
            strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
            chnStr = strIns + chnStr;
            needZero = (section < 1000) && (section > 0);
            num = Math.floor(num / 10000);
            unitPos++;
        }
        return chnStr;
    };
    //转万单位以下
    StringUtils.SectionToChinese = function (section) {
        var strIns = '', chnStr = '';
        var unitPos = 0;
        var zero = true;
        var chnNumChar = StringUtils.chnNumChar;
        var chnUnitChar = StringUtils.chnUnitChar;
        while (section > 0) {
            var v = section % 10;
            if (v === 0) {
                if (!zero) {
                    zero = true;
                    chnStr = chnNumChar[v] + chnStr;
                }
            }
            else {
                zero = false;
                strIns = chnNumChar[v];
                strIns += chnUnitChar[unitPos];
                chnStr = strIns + chnStr;
            }
            unitPos++;
            section = Math.floor(section / 10);
        }
        return chnStr;
    };
    StringUtils.HTML = /<[^>]+>/g;
    /**
     * 中文转数字
     * 例子:
     * StringUtils.ChineseToNumber(三百四十三) = 343 (number）
     * */
    StringUtils.chnNumCharCN = {
        "零": 0,
        "一": 1,
        "二": 2,
        "三": 3,
        "四": 4,
        "五": 5,
        "六": 6,
        "七": 7,
        "八": 8,
        "九": 9
    };
    StringUtils.chnNameValueCN = {
        "十": { value: 10, secUnit: false },
        "百": { value: 100, secUnit: false },
        "千": { value: 1000, secUnit: false },
        "万": { value: 10000, secUnit: true },
        "亿": { value: 100000000, secUnit: true }
    };
    /**
     * 数字转中文
     * 例子:
     * StringUtils.NumberToChinese(325) = "三百二十五" (string）
     * */
    StringUtils.chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    StringUtils.chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
    StringUtils.chnUnitChar = ["", "十", "百", "千"];
    return StringUtils;
}());
__reflect(StringUtils.prototype, "StringUtils");
//# sourceMappingURL=StringUtils.js.map