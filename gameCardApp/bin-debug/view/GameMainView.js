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
var GameMainView = (function (_super) {
    __extends(GameMainView, _super);
    function GameMainView() {
        var _this = _super.call(this) || this;
        //十分钟 时间戳  ms
        _this.awardBoxGetTime = 10 * 60 * 1000;
        _this.totalGetCount = 3;
        //宝箱领取金币
        _this.goldGetNum = 50;
        return _this;
    }
    GameMainView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.touchEnabled = false;
        this.touchChildren = false;
        this.addTouchEvent(this.settingBtn, this.onSetHandler, true);
        this.arraycollect = new eui.ArrayCollection();
        this.list.itemRenderer = SkilItem;
        this.list.dataProvider = this.arraycollect;
        this.scroller.viewport = this.list;
        var data = SkillCfg.skillCfg;
        this.arraycollect.source = data;
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        StageUtils.ins().getStage().addEventListener(StartGameEvent.CLICK_GUIDE_SKILL, this.onClickGuideSkill, this);
        StageUtils.ins().getStage().addEventListener(StartGameEvent.USE_GUIDE_SKILL, this.onUseGuideSkill, this);
        this.awardBox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardGet, this);
        this.timer = new egret.Timer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.refreshRewardBoxState();
        var boo = this.changeTime();
        if (boo) {
            this.timer.start();
        }
        this.goldWatcher = eui.Binding.bindHandler(GameApp, ["roleGold"], this.roleGoldChange, this);
        this.gemWatcher = eui.Binding.bindHandler(GameApp, ["roleGem"], this.roleGemChange, this);
        this.addTouchEvent(this.addGemBtn, this.onaddGem, true);
        this.addTouchEvent(this.addGoldBtn, this.onaddGold, true);
    };
    GameMainView.prototype.onaddGem = function () {
        ViewManager.ins().open(ShopPopUp, [{ selectIndex: 1 }]);
    };
    GameMainView.prototype.onaddGold = function () {
        ViewManager.ins().open(ShopPopUp, [{ selectIndex: 0 }]);
    };
    GameMainView.prototype.initialize = function () {
        var _this = this;
        //初始化
        console.log("game---initialize");
        this.touchEnabled = false;
        this.touchChildren = false;
        this.showLevelTxt(function () {
            var guidepassStr = egret.localStorage.getItem(LocalStorageEnum.IS_PASS_GUIDE);
            _this.touchEnabled = true;
            _this.touchChildren = true;
            if (guidepassStr) {
                //执行正常出怪的逻辑
            }
            else {
                //需要过一下新手 指引操作
                egret.localStorage.setItem(LocalStorageEnum.IS_PASS_GUIDE, "1");
                ViewManager.ins().open(GuideView);
                var item = _this.list.getChildAt(2);
                _this.guideView = ViewManager.ins().getView(GuideView);
                _this.guideView.nextStep({ id: "1_1", comObj: item, width: 75, height: 75 });
            }
        });
    };
    GameMainView.prototype.roleGoldChange = function (value) {
        this.goldLab.text = value.toString();
    };
    GameMainView.prototype.roleGemChange = function (value) {
        this.gemLab.text = value.toString();
    };
    /**点击了引导技能 */
    GameMainView.prototype.onClickGuideSkill = function (evt) {
        if (this.guideView) {
            var xx = (StageUtils.ins().getWidth() >> 1) + 100;
            var yy = StageUtils.ins().getHeight() >> 1;
            this.guideView.nextStep({ id: evt.data.id, comObj: { x: xx, y: yy }, width: 75, height: 75 });
        }
    };
    /**点击使用了技能-- 神将 */
    GameMainView.prototype.onUseGuideSkill = function (evt) {
        console.log("使用了技能-----" + evt.data.skillId + "----神将召唤");
    };
    GameMainView.prototype.onRewardGet = function (evt) {
        var getcountstr = egret.localStorage.getItem(LocalStorageEnum.BOX_REWARD_GET);
        var boxTimestr = egret.localStorage.getItem(LocalStorageEnum.BOX_REWARD_TIMESPAN);
        var nowTime = new Date().getTime();
        if (!getcountstr || (getcountstr && getcountstr == "0") || (boxTimestr && (nowTime - parseInt(boxTimestr)) > this.awardBoxGetTime)) {
            //第一次进入 。第二天重置 。现在的时间-创建时间 〉 10分钟 。可以领取
            //增加金币数量
            GameApp.ins().gold += this.goldGetNum;
            //刷新新的宝箱倒计时时间戳
            var countStr = egret.localStorage.getItem(LocalStorageEnum.BOX_REWARD_GET);
            egret.localStorage.setItem(LocalStorageEnum.BOX_REWARD_GET, (parseInt(countStr) + 1).toString());
            egret.localStorage.setItem(LocalStorageEnum.BOX_REWARD_TIMESPAN, new Date().getTime().toString());
            this.refreshRewardBoxState(1);
        }
        else {
            UserTips.ins().showTips("未达领取时间");
        }
    };
    /**刷新宝箱盒子状态 */
    GameMainView.prototype.refreshRewardBoxState = function (num) {
        if (num === void 0) { num = 0; }
        GameApp.ins().refreshTimespan();
        var countstr = egret.localStorage.getItem(LocalStorageEnum.BOX_REWARD_GET);
        if (countstr) {
            var count = parseInt(countstr) + num;
            this.awardBox.visible = !(count >= this.totalGetCount);
            if (this.awardBox.visible == false) {
                //说明当前次数已经使用完了
                this.timer.stop();
            }
            else {
                if (num) {
                    //当前有加的值 而且awardBox.visible = true 
                    this.timer.start();
                }
            }
        }
        else {
            egret.localStorage.setItem(LocalStorageEnum.BOX_REWARD_GET, "0");
            this.awardBox.visible = true;
            this.boxLab.text = "领取";
        }
    };
    GameMainView.prototype.changeTime = function () {
        //刷新界面的相关显示
        var boxTimestr = egret.localStorage.getItem(LocalStorageEnum.BOX_REWARD_TIMESPAN);
        var nowTime = new Date().getTime();
        var offValue = (nowTime - parseInt(boxTimestr));
        if (!boxTimestr || (boxTimestr && offValue >= this.awardBoxGetTime)) {
            //当前宝箱已经领取时间已超 可以领取
            this.timer.stop();
            this.boxLab.text = "领取";
            return false;
        }
        else {
            this.boxLab.text = DateUtils.getFormatBySecond((this.awardBoxGetTime - offValue) / 1000, DateUtils.TIME_FORMAT_3);
            return true;
        }
    };
    /**路由回界面的刷新方法 */
    GameMainView.prototype.refreshPage = function () {
    };
    GameMainView.prototype.onTimer = function () {
        this.changeTime();
    };
    /**音频设置界面 */
    GameMainView.prototype.onSetHandler = function () {
        ViewManager.ins().open(SettingPopUp);
    };
    GameMainView.prototype.onItemTap = function (evt) {
        var skillId = evt.item.skillId;
        console.log("触发了技能----" + skillId);
    };
    /**展示关卡显示文字 */
    GameMainView.prototype.showLevelTxt = function (cb) {
        var txt = new eui.Label();
        this.addChild(txt);
        txt.size = 25;
        txt.fontFamily = "yt";
        var levelstr = egret.localStorage.getItem(LocalStorageEnum.LEVEL);
        var level = levelstr ? parseInt(levelstr) : 1;
        txt.textFlow = new egret.HtmlTextParser().parse("\u7B2C<font color=0x00ff00>" + level + "</font>\u5173");
        txt.x = (StageUtils.ins().getWidth() >> 1) - (txt.width >> 1) - 200;
        txt.y = (StageUtils.ins().getHeight() >> 1);
        txt.alpha = 0;
        txt.scaleX = txt.scaleY = 0;
        egret.Tween.get(txt).to({ alpha: 1, scaleX: 1, scaleY: 1, x: txt.x + 200 }, 1000, egret.Ease.circOut).wait(500).to({ alpha: 0, scaleX: 0, scaleY: 0, x: txt.x + 400 }, 1000, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(txt);
            txt.parent.removeChild(txt);
            cb();
        }, this);
    };
    GameMainView.prototype.close = function () {
        this.addTouchEvent(this.settingBtn, this.onSetHandler);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        StageUtils.ins().getStage().removeEventListener(StartGameEvent.CLICK_GUIDE_SKILL, this.onClickGuideSkill, this);
        StageUtils.ins().getStage().removeEventListener(StartGameEvent.USE_GUIDE_SKILL, this.onUseGuideSkill, this);
        this.awardBox.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardGet, this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        if (this.goldWatcher) {
            this.goldWatcher.unwatch();
        }
        if (this.gemWatcher) {
            this.gemWatcher.unwatch();
        }
    };
    return GameMainView;
}(BaseEuiView));
__reflect(GameMainView.prototype, "GameMainView");
ViewManager.ins().reg(GameMainView, LayerManager.UI_Main);
//# sourceMappingURL=GameMainView.js.map