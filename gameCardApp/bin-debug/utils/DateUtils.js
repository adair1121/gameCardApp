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
var DateStyle = (function (_super) {
    __extends(DateStyle, _super);
    function DateStyle(format, from, to, isFormatNum) {
        var _this = _super.call(this) || this;
        /**格式 */
        _this.format = [];
        /** 起始精确度*/
        _this.from = 0;
        /**结束精确度 */
        _this.to = 0;
        /**是否补齐0 */
        _this.isFormatNum = false;
        _this.format = format;
        _this.from = from;
        _this.to = to;
        _this.isFormatNum = isFormatNum;
        return _this;
    }
    return DateStyle;
}(BaseClass));
__reflect(DateStyle.prototype, "DateStyle");
/**
 * Created by yangsong on 2014/11/22.
 * Date工具类
 */
var DateUtils = (function () {
    function DateUtils() {
    }
    /**
     * 获取时间格式化的字符串
     * @second 秒
     * @style 格式化风格, 例如 :DateUtils.STYLE_1
     *  */
    DateUtils.getFormatTimeByStyle = function (second, style) {
        if (style === void 0) { style = DateUtils.STYLE_1; }
        if (second < 0) {
            second = 0;
            debug.log("输入参数有误!时间为负数:" + second);
        }
        if (style.from > style.to) {
            debug.log("输入参数有误!to参数必须大于等于from参数,请检查style参数的值");
            return "";
        }
        second = second >> 0;
        var result = "";
        for (var i = style.to; i >= style.from; i--) {
            var time = second / this.mul[i]; //总共
            var timeStr = "";
            if (i != style.to)
                time = time % this.mod[i]; //剩余
            if (style.isFormatNum && time < 10)
                timeStr = "0" + (time >> 0).toString(); //补0
            else
                timeStr = (time >> 0).toString();
            result += (timeStr + style.format[i]);
        }
        return result;
    };
    /**
     * 获取时间格式化的字符串
     * @ms 毫秒
     * @style 格式化风格, 例如 :DateUtils.STYLE_1
     *  */
    DateUtils.getFormatTimeByStyle1 = function (ms, style) {
        if (style === void 0) { style = DateUtils.STYLE_1; }
        return this.getFormatTimeByStyle(ms / this.MS_PER_SECOND);
    };
    /**
     * 把MiniDateTime转化为距离1970-01-01的毫秒数
     * @param mdt 从2010年开始算起的秒数
     * @return 从1970年开始算起的毫秒数
     */
    DateUtils.formatMiniDateTime = function (mdt) {
        return DateUtils.MINI_DATE_TIME_BASE + (mdt & 0x7FFFFFFF) * DateUtils.MS_PER_SECOND;
    };
    /**转成服务器要用的时间***/
    DateUtils.formatServerTime = function (time) {
        return (time - DateUtils.MINI_DATE_TIME_BASE) / DateUtils.MS_PER_SECOND;
    };
    /**
     * 根据秒数格式化字符串
     * @param  {number} second            秒数
     * @param  {number=1} type            时间格式类型（参考DateUtils.TIME_FORMAT_1, DateUtils.TIME_FORMAT_2...)
     * @param  {showLength}    showLength    显示长度（一个时间单位为一个长度，且仅在type为DateUtils.TIME_FORMAT_5的情况下有效）
     * @returns string
     */
    DateUtils.getFormatBySecond = function (second, type, showLength) {
        if (type === void 0) { type = 1; }
        if (showLength === void 0) { showLength = 2; }
        var str = "";
        var ms = second * 1000;
        switch (type) {
            case this.TIME_FORMAT_1:
                str = this.format_1(ms);
                break;
            case this.TIME_FORMAT_2:
                str = this.format_2(ms);
                break;
            case this.TIME_FORMAT_3:
                str = this.format_3(ms);
                break;
            case this.TIME_FORMAT_4:
                str = this.format_4(ms);
                break;
            case this.TIME_FORMAT_5:
                str = this.format_5(ms, showLength);
                break;
            case this.TIME_FORMAT_6:
                str = this.format_6(ms);
                break;
            case this.TIME_FORMAT_7:
                str = this.format_7(ms);
                break;
            case this.TIME_FORMAT_8:
                str = this.format_8(ms);
                break;
            case this.TIME_FORMAT_9:
                str = this.format_9(ms);
                break;
            case this.TIME_FORMAT_10:
                str = this.format_10(ms);
                break;
            case this.TIME_FORMAT_11:
                str = this.format_11(ms);
                break;
            case this.TIME_FORMAT_12:
                str = this.format_12(ms);
                break;
            case this.TIME_FORMAT_13:
                str = this.format_13(ms);
                break;
            case this.TIME_FORMAT_14:
                str = this.format_14(ms);
                break;
            case this.TIME_FORMAT_15:
                str = this.format_15(ms);
                break;
        }
        return str;
    };
    /**
     * 获取到指定日期00：00的秒数
     * **/
    DateUtils.getRenainSecond = function (ms) {
        var tmpDate = ms ? new Date(ms) : new Date();
        //tmpDate.setDate(tmpDate.getDate()+1);
        var ptime = (DateUtils.getTodayZeroSecond(tmpDate) + 60 * 60 * 24) - tmpDate.getTime() / 1000;
        // debug.log("ptime = " + ptime);
        return ptime.toFixed(0);
    };
    /**
     * 今天已过去的秒数
     * **/
    DateUtils.getTodayPassedSecond = function () {
        var tmpDate = new Date();
        var tdyPassTime = ((Date.now() - (new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate()).getTime())) / 1000).toFixed(0);
        return parseInt(tdyPassTime);
    };
    /**
     * 获取指定日期00:00时刻的秒数
     * @parma 毫秒
     * @returns {number}
     */
    DateUtils.getTodayZeroSecond = function (tdate) {
        var tmpDate = tdate ? tdate : new Date();
        return parseInt(((new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate()).getTime()) / 1000).toFixed(0));
    };
    /**
     * 获取本周第一天
     * **/
    DateUtils.showWeekFirstDay = function () {
        var Nowdate = new Date();
        var day = Nowdate.getDay();
        day = day ? day : 7;
        var WeekFirstDay = new Date(Nowdate - (day - 1) * 86400000);
        // var M=Number(WeekFirstDay.getMonth())+1
        // return WeekFirstDay.getYear()+"-"+M+"-"+WeekFirstDay.getDate();
        return WeekFirstDay;
    };
    /**
     * 获取本周最后一天
     * @param 毫秒差
     */
    DateUtils.showWeekLastDay = function () {
        var Nowdate = new Date();
        var WeekFirstDay = DateUtils.showWeekFirstDay();
        var WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);
        // var M=Number(WeekLastDay.getMonth())+1
        // return WeekLastDay.getYear()+"-"+M+"-"+WeekLastDay.getDate();
        return WeekLastDay;
    };
    /**
     * 求出当前时间离下周一凌晨0点还差
     * @param 毫秒差
     * **/
    DateUtils.calcWeekFirstDay = function () {
        // var lastDay = showWeekLastDay().getDay();
        // lastDay = lastDay > 0?lastDay:7;
        var Nowdate = new Date();
        var curDay = Nowdate.getDay();
        curDay = curDay > 0 ? curDay : 7;
        var difday = 7 - curDay; //用
        var hours = Nowdate.getHours();
        var minutes = Nowdate.getMinutes();
        var seconds = Nowdate.getSeconds();
        // debug.log("difday = "+difday);
        // debug.log("hours = "+hours);
        // debug.log("minutes = "+minutes);
        // debug.log("seconds = "+seconds);
        var sum = difday * 86400 * 1000 + 86400 * 1000 - (hours * 3600 * 1000 + minutes * 60 * 1000 + seconds * 1000);
        return new Date(sum);
    };
    /**
     * 格式1  00:00:00
     * @param  {number} sec 毫秒数
     * @returns string
     */
    DateUtils.format_1 = function (ms) {
        var n = 0;
        var result = "##:##:##";
        n = Math.floor(ms / DateUtils.MS_PER_HOUR);
        result = result.replace("##", DateUtils.formatTimeNum(n));
        if (n)
            ms -= n * DateUtils.MS_PER_HOUR;
        n = Math.floor(ms / DateUtils.MS_PER_MINUTE);
        result = result.replace("##", DateUtils.formatTimeNum(n));
        if (n)
            ms -= n * DateUtils.MS_PER_MINUTE;
        n = Math.floor(ms / 1000);
        result = result.replace("##", DateUtils.formatTimeNum(n));
        return result;
    };
    /**
     * 格式2  yyyy-mm-dd h:m:s
     * @param  {number} ms        毫秒数
     * @returns string            返回自1970年1月1号0点开始的对应的时间点
     */
    DateUtils.format_2 = function (ms) {
        var date = new Date(ms);
        var year = date.getFullYear();
        var month = date.getMonth() + 1; //返回的月份从0-11；
        var day = date.getDate();
        var hours = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return year + "-" + month + "-" + day + " " + hours + ":" + minute + ":" + second;
    };
    /**
     * 格式3  00:00
     * @param  {number} ms        毫秒数
     * @returns string            分:秒
     */
    DateUtils.format_3 = function (ms) {
        var str = this.format_1(ms);
        var strArr = str.split(":");
        return strArr[1] + ":" + strArr[2];
    };
    /**
     * 格式4  xx天前，xx小时前，xx分钟前
     * @param  {number} ms        毫秒
     * @returns string
     */
    DateUtils.format_4 = function (ms) {
        if (ms < this.MS_PER_HOUR) {
            return Math.floor(ms / this.MS_PER_MINUTE) + "分钟前";
        }
        else if (ms < this.MS_PER_DAY) {
            return Math.floor(ms / this.MS_PER_HOUR) + "小时前";
        }
        else {
            return Math.floor(ms / this.MS_PER_DAY) + "天前";
        }
    };
    /**
     * 格式5 X天X小时X分X秒
     * @param  {number} ms                毫秒
     * @param  {number=2} showLength    显示长度（一个时间单位为一个长度）
     * @returns string
     */
    DateUtils.format_5 = function (ms, showLength) {
        if (showLength === void 0) { showLength = 2; }
        var result = "";
        var unitStr = ["天", "时", "分", "秒"];
        var arr = [];
        var d = Math.floor(ms / this.MS_PER_DAY);
        arr.push(d);
        ms -= d * this.MS_PER_DAY;
        var h = Math.floor(ms / this.MS_PER_HOUR);
        arr.push(h);
        ms -= h * this.MS_PER_HOUR;
        var m = Math.floor(ms / this.MS_PER_MINUTE);
        arr.push(m);
        ms -= m * this.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        arr.push(s);
        for (var k in arr) {
            if (arr[k] > 0) {
                result += this.formatTimeNum(arr[k], Number(k)) + unitStr[k];
                showLength--;
                if (showLength <= 0)
                    break;
            }
        }
        return result;
    };
    /**
     * 格式6  h:m:s
     * @param  {number} ms        毫秒
     * @returns string            返回自1970年1月1号0点开始的对应的时间点（不包含年月日）
     */
    DateUtils.format_6 = function (ms) {
        var date = new Date(ms);
        var hours = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return this.formatTimeNum(hours) + ":" + this.formatTimeNum(minute) + ":" + this.formatTimeNum(second);
    };
    /**
     * 格式7  X天/X小时/<1小时
     * @param  {number} ms        毫秒
     * @returns string
     */
    DateUtils.format_7 = function (ms) {
        if (ms < this.MS_PER_HOUR) {
            return "<1小时";
        }
        else if (ms < this.MS_PER_DAY) {
            return Math.floor(ms / this.MS_PER_HOUR) + "小时";
        }
        else {
            return Math.floor(ms / this.MS_PER_DAY) + "天";
        }
    };
    //8:yyyy-mm-dd h:m
    DateUtils.format_8 = function (time) {
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1; //返回的月份从0-11；
        var day = date.getDate();
        var hours = date.getHours();
        var minute = date.getMinutes();
        return year + "-" + month + "-" + day + " " + hours + ":" + minute;
    };
    /**
     * 格式9  x小时x分钟x秒
     * @param  {number} ms        毫秒
     * @returns string
     */
    DateUtils.format_9 = function (ms) {
        var h = Math.floor(ms / this.MS_PER_HOUR);
        ms -= h * this.MS_PER_HOUR;
        var m = Math.floor(ms / this.MS_PER_MINUTE);
        ms -= m * this.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        return h + "小时" + m + "分钟" + s + "秒";
    };
    /**
     * 格式10  x分x秒
     * @param  {number} ms        毫秒
     * @returns string
     */
    DateUtils.format_10 = function (ms) {
        // let h: number = Math.floor(ms / this.MS_PER_HOUR);
        // ms -= h * this.MS_PER_HOUR;
        var m = Math.floor(ms / this.MS_PER_MINUTE);
        ms -= m * this.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        return m + "分" + s + "秒";
    };
    DateUtils.format_11 = function (ms) {
        var h = Math.floor(ms / this.MS_PER_HOUR);
        ms -= h * this.MS_PER_HOUR;
        var m = Math.floor(ms / this.MS_PER_MINUTE);
        ms -= m * this.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        return h + "时" + m + "分" + s + "秒";
    };
    DateUtils.format_12 = function (ms) {
        var h = Math.floor(ms / this.MS_PER_HOUR);
        ms -= h * this.MS_PER_HOUR;
        var m = Math.floor(ms / this.MS_PER_MINUTE);
        ms -= m * this.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        return DateUtils.formatTimeNum(h) + ":" + DateUtils.formatTimeNum(m) + ":" + DateUtils.formatTimeNum(s);
    };
    /**x月x日（周几）h:m */
    DateUtils.format_13 = function (time) {
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1; //返回的月份从0-11；
        var week = date.getDay();
        var day = date.getDate();
        var hours = date.getHours();
        var minute = date.getMinutes();
        return month + "月" + day + "日(周" + this.WEEK_CN[week] + ") " + DateUtils.formatTimeNum(hours) + ":" + DateUtils.formatTimeNum(minute);
    };
    /**时 分 */
    DateUtils.format_14 = function (time) {
        var date = new Date(time);
        var hours = date.getHours();
        var minute = date.getMinutes();
        return hours + "时" + minute + "分";
    };
    //15:yyyy-mm-dd h:m
    DateUtils.format_15 = function (time) {
        var date = new Date(time);
        var month = date.getMonth() + 1; //返回的月份从0-11；
        var day = date.getDate();
        var hours = date.getHours();
        var minute = date.getMinutes();
        return DateUtils.formatTimeNum(month) + "-" + DateUtils.formatTimeNum(day) + " " + DateUtils.formatTimeNum(hours) + ":" + DateUtils.formatTimeNum(minute);
    };
    /**
     * 格式化时间数为两位数
     * @param  {number} t 时间数
     * @returns String
     */
    DateUtils.formatTimeNum = function (t, k) {
        return t >= 10 ? t.toString() : (k == 0 ? t.toString() : "0" + t);
    };
    /**
     * 检验时间是否大于现在时间+天数
     * @param  time时间
     * @param  days天数
     * @returns String
     */
    DateUtils.checkTime = function (time, days) {
        var currentDate = new Date().getTime();
        var t = (time > (currentDate + days * this.MS_PER_DAY));
        return t;
    };
    /**
     * 格式化当前时间
     * @param  time时间
     * @returns String 2018年12月12日（周二） 12:12
     */
    DateUtils.formatFullTime = function (time) {
        var format;
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var weekDay = date.getDay();
        var hour = date.getHours();
        var hourStr;
        if (hour < 10) {
            hourStr = "0" + hour;
        }
        else {
            hourStr = hour.toString();
        }
        var min = date.getMinutes();
        var minStr;
        if (min < 10) {
            minStr = "0" + min;
        }
        else {
            minStr = min.toString();
        }
        var weekDayStr;
        switch (weekDay) {
            case 1:
                weekDayStr = "Monday";
                break;
            case 2:
                weekDayStr = "Tuesday";
                break;
            case 3:
                weekDayStr = "Wednesday";
                break;
            case 4:
                weekDayStr = "Thursday";
                break;
            case 5:
                weekDayStr = "Friday";
                break;
            case 6:
                weekDayStr = "Saturday";
                break;
            case 0:
                weekDayStr = "Sunday";
                break;
        }
        format = year + "years" + month + "month" + day + "day（" + weekDayStr + "） " + hourStr + ":" + minStr;
        return format;
    };
    /**
     *把字符串时间转换为毫秒数
     * 2018.3.14-0:0
     * */
    DateUtils.formatStrTimeToMs = function (str) {
        var date = new Date();
        var strList = str.split(".");
        date.setFullYear(strList[0]);
        date.setMonth((+strList[1]) - 1);
        var strL2 = strList[2].split("-");
        date.setDate(strL2[0]);
        var strL3 = strL2[1].split(":");
        date.setHours(strL3[0]);
        date.setMinutes(strL3[1]);
        date.setSeconds(0);
        return date.getTime();
    };
    /**时间格式1 00:00:00 */
    DateUtils.TIME_FORMAT_1 = 1;
    /**时间格式2 yyyy-mm-dd h:m:s */
    DateUtils.TIME_FORMAT_2 = 2;
    /**时间格式3 00:00 */
    DateUtils.TIME_FORMAT_3 = 3;
    /**时间格式4 xx天前/xx小时前/xx分钟前 */
    DateUtils.TIME_FORMAT_4 = 4;
    /**时间格式5 x天x小时x分x秒 */
    DateUtils.TIME_FORMAT_5 = 5;
    /**时间格式6 h:m:s */
    DateUtils.TIME_FORMAT_6 = 6;
    /**时间格式7 xx天/xx小时/<1小时 */
    DateUtils.TIME_FORMAT_7 = 7;
    /**时间格式8 yyyy-mm-dd h:m */
    DateUtils.TIME_FORMAT_8 = 8;
    /**时间格式9 x小时x分钟x秒 */
    DateUtils.TIME_FORMAT_9 = 9;
    /**时间格式10 x分x秒**/
    DateUtils.TIME_FORMAT_10 = 10;
    /**时间格式11x时x分x秒**/
    DateUtils.TIME_FORMAT_11 = 11;
    /**时间格式12 x:x:x**/
    DateUtils.TIME_FORMAT_12 = 12;
    /**时间格式13 x月x日（周几）h:m**/
    DateUtils.TIME_FORMAT_13 = 13;
    /**时间格式14 x时x分**/
    DateUtils.TIME_FORMAT_14 = 14;
    /**时间格式15 mm-dd h:m */
    DateUtils.TIME_FORMAT_15 = 15;
    /**一秒的毫秒数 */
    DateUtils.MS_PER_SECOND = 1000;
    /**一分钟的毫秒数 */
    DateUtils.MS_PER_MINUTE = 60 * 1000;
    /**一小时的毫秒数 */
    DateUtils.MS_PER_HOUR = 60 * 60 * 1000;
    /**一天的毫秒数 */
    DateUtils.MS_PER_DAY = 24 * 60 * 60 * 1000;
    DateUtils.SECOND_PER_HOUR = 3600; //一小时的秒数
    DateUtils.SECOND_PER_DAY = 86400; //一天的秒数
    DateUtils.SECOND_PER_MONTH = 2592000; //一个月(30天)的秒数
    DateUtils.SECOND_PER_YEAR = 31104000; //一年(360天)的秒数
    DateUtils.DAYS_PER_WEEK = 7; //一周的天数
    DateUtils.YEAR_PER_YEAR = 1; //每年的年数
    DateUtils.MONTH_PER_YEAR = 12; //每年的月数
    DateUtils.DAYS_PER_MONTH = 30; //每月的天数
    DateUtils.HOURS_PER_DAY = 24; //每天的小时数
    DateUtils.MUNITE_PER_HOUR = 60; //每小时的分钟数
    DateUtils.SECOND_PER_MUNITE = 60; //每分钟的秒数
    DateUtils.SECOND_PER_SECOND = 1; //每秒的秒数字
    DateUtils.SECOND_2010 = 1262275200; //1970年~2010年1月1日0时0分0秒的时间戳(单位:秒)
    /**余数 ,用来计算时间*/
    DateUtils.mod = [DateUtils.SECOND_PER_MUNITE, DateUtils.MUNITE_PER_HOUR, DateUtils.HOURS_PER_DAY, DateUtils.DAYS_PER_MONTH, DateUtils.MONTH_PER_YEAR, DateUtils.YEAR_PER_YEAR];
    /**除数 用来计算用来计算时间*/
    DateUtils.mul = [DateUtils.SECOND_PER_SECOND, DateUtils.SECOND_PER_MUNITE, DateUtils.SECOND_PER_HOUR, DateUtils.SECOND_PER_DAY, DateUtils.SECOND_PER_MONTH, DateUtils.SECOND_PER_YEAR];
    /**一周的天数 */
    /**一天的小时数 */
    /** 本游戏中使用的MiniDateTime时间的起始日期相对于flash时间(1970-01-01)的时差（毫秒） */
    DateUtils.MINI_DATE_TIME_BASE = Date.UTC(2010, 0) + new Date().getTimezoneOffset() * DateUtils.MS_PER_MINUTE;
    /**
     * 时区偏移（毫秒数）<BR>
     * 目前中国采用东八区，即比世界协调时间（UTC）/格林尼治时间（GMT）快8小时的时区 */
    DateUtils.TIME_ZONE_OFFSET = 8 * DateUtils.MS_PER_HOUR;
    /**精确度 */
    DateUtils.TO_SECOND = 0;
    DateUtils.TO_MINUTE = 1;
    DateUtils.TO_HOUR = 2;
    DateUtils.TO_DAY = 3;
    DateUtils.TO_MONTH = 4;
    DateUtils.TO_YEAR = 5;
    /** n年n月n日n时n分n秒 */
    DateUtils.FORMAT_1 = ["秒", "分", "时", "天", "月", "年"];
    /** xx:xx:xx */
    DateUtils.FORMAT_2 = [":", ":", ":", ":", ":", ":"];
    DateUtils.WEEK_CN = ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"];
    /**x小时x分x秒 */
    DateUtils.STYLE_1 = new DateStyle(DateUtils.FORMAT_1, DateUtils.TO_SECOND, DateUtils.TO_HOUR, false);
    /** x天x小时x分钟x秒 */
    DateUtils.STYLE_2 = new DateStyle(DateUtils.FORMAT_1, DateUtils.TO_SECOND, DateUtils.TO_DAY, false);
    /** 00:00:00 */
    DateUtils.STYLE_3 = new DateStyle(DateUtils.FORMAT_2, DateUtils.TO_SECOND, DateUtils.TO_HOUR, true);
    /** x分x秒 */
    DateUtils.STYLE_4 = new DateStyle(DateUtils.FORMAT_1, DateUtils.TO_SECOND, DateUtils.TO_MINUTE, true);
    return DateUtils;
}());
__reflect(DateUtils.prototype, "DateUtils");
//# sourceMappingURL=DateUtils.js.map