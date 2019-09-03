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
    GlobalFun.getMainEntityRes = function (action) {
        var jobstr = egret.localStorage.getItem(LocalStorageEnum.ROLE_JOB);
        var str = (jobstr && jobstr != "0") ? "idle_ride" : "idle_normal";
        switch (action) {
            case ActionEnum.run:
                str = (jobstr && jobstr != "0") ? "move_ride" : "move_normal";
                break;
            case ActionEnum.stand:
                str = (jobstr && jobstr != "0") ? "idle_ride" : "idle_normal";
                break;
            case ActionEnum.attack:
                str = (jobstr && jobstr != "0") ? "attack_ride" : "attack_normal";
                break;
        }
        return str;
    };
    GlobalFun.getEnemyRes = function (action) {
        var str = "enemy_stand";
        switch (action) {
            case ActionEnum.run:
                str = "enemy_run";
                break;
            case ActionEnum.stand:
                str = "enemy_stand";
                break;
            case ActionEnum.attack:
                str = "enemy_attack";
                break;
        }
        return str;
    };
    /**获取兵种资源 */
    GlobalFun.getSoldierRes = function (camp) {
        var soldiers = [SoldierType.SOLDIER_QIANG, SoldierType.SOLDIER_DAO, SoldierType.SOLDIER_QI, SoldierType.SOLDIER_TOUSHICHE];
        var whCfgs = [{ w: 136, h: 102 }, { w: 101, h: 90 }, { w: 177, h: 139 }, { w: 101, h: 86 }, { w: 122, h: 110 }];
        var speeds = [80, 80, 130, 80, 50];
        var atkdis = [50, 50, 50, 400, 550];
        var percent = (Math.random() * 100) >> 0;
        var index = 0;
        if (percent <= 35) {
            index = 0;
        }
        else if (percent <= 70) {
            index = 1;
        }
        else if (percent <= 95) {
            index = 2;
        }
        else {
            index = 3;
        }
        ;
        var str = "";
        var id = soldiers[index];
        var whcfg = whCfgs[index];
        str = camp == 1 ? "soldier_" + id : "soldier_" + id;
        // switch(id){
        //     case SoldierType.SOLDIER_DAO:
        //     case SoldierType.SOLDIER_QIANG:
        //     case SoldierType.SOLDIER_QI:
        //         break;
        //     case SoldierType.SOLDIER_GONG:
        //         //暂时读这个资源
        //         str = "soldier_stand_"+SoldierType.SOLDIER_DAO;
        //         break;
        //     case SoldierType.SOLDIER_TOUSHICHE:
        //         //暂时读这个资源
        //         str = "soldier_stand_"+SoldierType.SOLDIER_GONG;
        //         break;
        // }
        return { res: str, id: id, wh: whcfg, speed: speeds[index], dist: atkdis[index] };
    };
    GlobalFun.getResUrl = function () {
        var arr = ["gold_icon_png", "gem_icon_png", "light_box_png"];
        var attr = [{ w: 27, h: 28, name: "五铢钱", resType: 0 }, { w: 47, h: 35, name: "矿石", resType: 0 }, { w: 71, h: 59, name: "宝箱", resType: 1 }];
        var index = (Math.random() * attr.length) >> 0;
        // let index:number = (Math.random()*100)>>0;
        // if(index<=30){index = 0}else if(index<=60){index = 1}else if(index<=90){index = 2}else{index = 3}
        return { res: arr[index], attr: attr[index], resArr: arr, attrArr: attr, resType: attr[index]["resType"] };
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
    GlobalFun.count = 0; //计时器次数
    GlobalFun.timer = new egret.Timer(1000);
    return GlobalFun;
}());
__reflect(GlobalFun.prototype, "GlobalFun");
//# sourceMappingURL=GlobalFun.js.map