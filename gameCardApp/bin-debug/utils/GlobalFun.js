var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 共用方法
 */
var GlobalFun = (function () {
    function GlobalFun() {
    }
    GlobalFun.getOption = function (key) {
        if (window.location) {
            var search = location.search;
            if (search == "") {
                return "";
            }
            search = search.slice(1);
            var searchArr = search.split("&");
            var length_1 = searchArr.length;
            for (var i = 0; i < length_1; i++) {
                var str = searchArr[i];
                var arr = str.split("=");
                if (arr[0] == key) {
                    return arr[1];
                }
            }
        }
        return "";
    };
    /**
     * 震动显示对象
     * @param        target    震动目标对象
     * @param        time      震动持续时长（秒）
     * @param        rate      震动频率(一秒震动多少次)
     * @param        maxDis    震动最大距离
     */
    GlobalFun.shakeObj = function (target, time, rate, maxDis) {
        this.target = target;
        this.initX = target.x;
        this.initY = target.y;
        this.maxDis = maxDis;
        this.count = time * rate;
        this.rate = rate;
        this.timer.delay = 1000 / rate;
        this.timer.repeatCount = this.count;
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.shaking, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.shakeComplete, this);
        this.timer.reset();
        this.timer.start();
    };
    GlobalFun.shaking = function () {
        egret.Tween.removeTweens(this.target);
        this.target.x = this.initX - this.maxDis + Math.random() * this.maxDis * 2;
        this.target.y = this.initY - this.maxDis + Math.random() * this.maxDis * 2;
        egret.Tween.get(this.target).to({ x: this.initX, y: this.initY }, 999 / this.rate);
    };
    GlobalFun.shakeComplete = function () {
        if (this.target) {
            egret.Tween.removeTweens(this.target);
            this.target.x = this.initX;
            this.target.y = this.initY;
        }
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.shaking, this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.shakeComplete, this);
    };
    /**停止震动 */
    GlobalFun.stop = function () {
        this.shakeComplete();
    };
    GlobalFun.filterToGrey = function (tar) {
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        tar.filters = [colorFlilter];
    };
    GlobalFun.clearFilters = function (tar) {
        tar.filters = [];
    };
    GlobalFun.sendToNativePhurse = function (_data) {
        if (window["webkit"] && window["webkit"].messageHandlers && window["webkit"].messageHandlers.payGood) {
            window["webkit"].messageHandlers.payGood.postMessage(JSON.stringify(_data));
        }
    };
    GlobalFun.payCallBack = function (_cb) {
        GameApp.pay_cbDdata = _cb;
    };
    /**获取宝箱刷新时间戳 */
    GlobalFun.getBoxRfreshTimeSpan = function () {
        var startTp = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime();
        var time = 5 * 60 * 60 * 1000;
        return startTp + time;
    };
    GlobalFun.count = 0; //计时器次数
    GlobalFun.timer = new egret.Timer(1000);
    return GlobalFun;
}());
__reflect(GlobalFun.prototype, "GlobalFun");
//# sourceMappingURL=GlobalFun.js.map