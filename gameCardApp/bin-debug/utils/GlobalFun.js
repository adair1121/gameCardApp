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
    /**外法光 */
    GlobalFun.lighting = function (obj, color, boo) {
        if (color === void 0) { color = 0x33CCFF; }
        if (boo === void 0) { boo = false; }
        var color = color; /// 光晕的颜色，十六进制，不包含透明度
        var alpha = 0.8; /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        var blurX = 35; /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY = 35; /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength = 2; /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality = 3 /* HIGH */; /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        var inner = boo; /// 指定发光是否为内侧发光，暂未实现
        var knockout = false; /// 指定对象是否具有挖空效果，暂未实现
        var glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        obj.filters = [glowFilter];
        egret.Tween.get(glowFilter, { loop: true }).to({ alpha: 0.2 }, 1000).to({ alpha: 0.8 }, 1000);
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
    /**获取所有boss配置 */
    GlobalFun.getBossCfg = function () {
        var cfgs = MonsterCfg.cfgs;
        var arr = [];
        for (var key in cfgs) {
            if (cfgs[key].type == 1) {
                arr.push(cfgs[key]);
            }
        }
        return arr;
    };
    /**获取所有小怪配置 */
    GlobalFun.getMonsterCfg = function () {
        var cfgs = MonsterCfg.cfgs;
        var arr = [];
        for (var key in cfgs) {
            if (cfgs[key].type == 2) {
                arr.push(cfgs[key]);
            }
        }
        return arr;
    };
    /**根据id获取怪物配置 */
    GlobalFun.getCardDataFromId = function (id) {
        var cfgs = MonsterCfg.cfgs;
        for (var key in cfgs) {
            if (cfgs[key].id == id) {
                return cfgs[key];
            }
        }
    };
    GlobalFun.deepCopy = function (obj) {
        var obj2 = {};
        for (var key in obj) {
            obj2[key] = obj[key];
        }
        return obj2;
    };
    /**根据id获取技能神将配置 */
    GlobalFun.getSkillGeneralCfg = function (id) {
        var cfgs = RebornCfg.cfg;
        var curCfg = null;
        for (var key in cfgs) {
            if (cfgs[key].mid == id) {
                cfgs[key].id = id;
                curCfg = this.deepCopy(cfgs[key]);
                // curCfg.atkDis  = curCfg.atkDis + ((Math.random()*15))
                break;
            }
        }
        for (var key in GameApp.skillCfg) {
            if (GameApp.skillCfg[key] && GameApp.skillCfg[key].rebornId && GameApp.skillCfg[key].rebornId == id) {
                curCfg.level = GameApp.skillCfg[key].level;
                curCfg.atk = GameApp.skillCfg[key].atk;
                curCfg.hp = GameApp.skillCfg[key].hp;
                break;
            }
        }
        return curCfg;
    };
    /**获取宝箱刷新时间戳 */
    GlobalFun.getBoxRfreshTimeSpan = function () {
        var startTp = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime();
        var time = 5 * 60 * 60 * 1000;
        return startTp + time;
    };
    GlobalFun.getSkillCfg = function (id) {
        var skillcfgs = SkillCfg.skillCfg;
        for (var key in skillcfgs) {
            if (skillcfgs[key].skillId == id) {
                return skillcfgs[key];
            }
        }
    };
    GlobalFun.getIndex = function () {
        return ((Math.random() * 100) >> 0) > 50 ? 1 : -1;
    };
    /**
     * 创建技能特效显示
     * @param id 技能id
     * @param parent 父级容器
     * @param loopCount 循环次数
     * @param pos 位置
     * */
    GlobalFun.createSkillEff = function (camp, id, parent, loopCount, pos, entitys, atk) {
        // let skillCfg:any = SkillCfg.skillCfg[camp];
        // let skillCfg:any
        // let curUseSkill:any;
        var loop = true;
        var skillNames = ["旋转雷球", "龙腾", "地爆", "狂怒斩", "凤凰展翅", "双龙戏珠", "践踏", "霸刀斩", "炎爆", "裂地", "雷霆万钧"];
        var skillName = skillNames[id - 1];
        var res = "skilleff" + id;
        // if(id == 100001 || id == 100002 || id == 100003 || id == 100004){
        //     loop = true;
        // }
        // for(let key in skillCfg){
        //     if(skillCfg[key].skillId == id){
        //         curUseSkill = skillCfg[key];
        //         break;
        //     }
        // }
        var textInfo = new eui.Label();
        textInfo.size = 40;
        textInfo.scaleX = textInfo.scaleY = 1;
        textInfo.textColor = 0xff0000;
        if (camp == -1) {
            // textInfo.textColor = 0xfc3434;
        }
        else {
            res = "skill_" + id;
        }
        parent.addChild(textInfo);
        textInfo.x = pos.x;
        textInfo.y = pos.y - 150;
        textInfo.text = skillName;
        egret.Tween.get(textInfo).to({ scaleX: 2, scaleY: 2 }, 600, egret.Ease.circIn).wait(500).call(function () {
            egret.Tween.removeTweens(textInfo);
            if (textInfo && textInfo.parent) {
                textInfo.parent.removeChild(textInfo);
            }
            textInfo = null;
        }, this);
        if (loop) {
            var count_1 = 1;
            var minx_1 = 150;
            var maxx_1 = StageUtils.inst().getWidth() - 240;
            var miny_1 = 150;
            var maxy_1 = StageUtils.inst().getHeight() - 100;
            var mc = new MovieClip();
            mc.scaleX = mc.scaleY = 1;
            parent.addChild(mc);
            mc.playFile("" + SKILL_EFF + res, loopCount, null, true);
            mc.x = (Math.random() * (maxx_1 - minx_1) + minx_1) >> 0;
            mc.y = (Math.random() * (maxy_1 - miny_1) + miny_1) >> 0;
            if (entitys && atk) {
                for (var i = 0; i < entitys.length; i++) {
                    if (entitys[i] && !entitys[i].isDead) {
                        var dis = egret.Point.distance(new egret.Point(entitys[i].x, entitys[i].y), new egret.Point(mc.x, mc.y));
                        if (dis <= 100) {
                            entitys[i].reduceHp(atk + ((this.getIndex() * 0.2) >> 0));
                        }
                    }
                }
            }
            var playCount_1 = 15;
            if (id == 104) {
                playCount_1 = 30;
            }
            var interVal_1 = setInterval(function () {
                count_1 += 1;
                var mc = new MovieClip();
                mc.scaleX = mc.scaleY = 0.7;
                parent.addChild(mc);
                mc.playFile("" + SKILL_EFF + res, loopCount, null, true);
                mc.x = (Math.random() * (maxx_1 - minx_1) + minx_1) >> 0;
                mc.y = (Math.random() * (maxy_1 - miny_1) + miny_1) >> 0;
                if (entitys && atk) {
                    for (var i = 0; i < entitys.length; i++) {
                        if (entitys[i] && !entitys[i].isDead) {
                            var dis = egret.Point.distance(new egret.Point(entitys[i].x, entitys[i].y), new egret.Point(mc.x, mc.y));
                            if (dis <= 100) {
                                entitys[i].reduceHp(atk);
                            }
                        }
                    }
                }
                if (count_1 >= playCount_1) {
                    clearInterval(interVal_1);
                }
            }, 200);
        }
    };
    GlobalFun.count = 0; //计时器次数
    GlobalFun.timer = new egret.Timer(1000);
    return GlobalFun;
}());
__reflect(GlobalFun.prototype, "GlobalFun");
//# sourceMappingURL=GlobalFun.js.map