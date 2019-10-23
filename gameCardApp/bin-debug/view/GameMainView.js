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
        //当前波数
        _this.curCount = 1;
        //当前关卡总波数
        _this.totalCount = 1;
        _this._entitys = [];
        _this._ownEntitys = [];
        _this._levelEntitys = [];
        _this._singleFrame = 33.3;
        _this._curTime = 0;
        _this.actionExecStandTime = 1000;
        _this.releaseSkill103 = false;
        return _this;
    }
    GameMainView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this._entitys = [];
        this._ownEntitys = [];
        this._levelEntitys = [];
        for (var i = 1; i <= 5; i++) {
            var skill1Level = egret.localStorage.getItem(LocalStorageEnum.SKILL_LEVEL + (100 + i));
            if (!skill1Level) {
                egret.localStorage.setItem(LocalStorageEnum.SKILL_LEVEL + (100 + i), "1");
            }
        }
        this.progressBar.mask = this.progressMark;
        this.totalHp = this.curHp = GameApp.level * 20000;
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
        StageUtils.inst().getStage().addEventListener(StartGameEvent.CLICK_GUIDE_SKILL, this.onClickGuideSkill, this);
        StageUtils.inst().getStage().addEventListener(StartGameEvent.USE_GUIDE_SKILL, this.onUseGuideSkill, this);
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
        this.addTouchEvent(this.upgradeBtn, this.onUpgrade, true);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        MessageManager.inst().addListener(CustomEvt.REDUCE_HP, this.onTowerHpReduce, this);
        eui.Binding.bindHandler(GameApp, ["level"], this.onLevelChange, this);
        this.descLab.visible = false;
        this.descLab.alpha = 0;
        this.createLevelMonster();
        egret.startTick(this.execAction, this);
    };
    GameMainView.prototype.onTowerHpReduce = function (evt) {
        this.curHp -= evt.data.hp;
        if (this.curHp <= 0) {
            this.curHp = 0;
            this.gameFail();
        }
        this.progressMark.width = this.curHp / this.totalHp * 277;
    };
    GameMainView.prototype.gameFail = function () {
        egret.stopTick(this.execAction, this);
        this.timer.stop();
        console.log("游戏结束");
    };
    /**创建关卡怪物 */
    GameMainView.prototype.createLevelMonster = function () {
        var _this = this;
        var count = ((GameApp.level / 5) >> 0) + 1;
        var centery = this.clickRect.y + 150;
        var centerx = 100;
        for (var i = 0; i < count; i++) {
            var shapIndex = (Math.random() * 7) >> 0;
            var monsterCfg = GlobalFun.getMonsterCfg();
            var index = (Math.random() * monsterCfg.length) >> 0;
            if (GameApp.level <= 11) {
                index = GameApp.level;
            }
            var monsterVo = monsterCfg[index];
            SoldierShapeEntity.inst().initData(SoldierShapType.TYPE_HALFCIRCLE, monsterVo.model, monsterVo.id, this, { x: centerx, y: centery }, function (arr) {
                _this._levelEntitys = _this._levelEntitys.concat(arr);
                _this._entitys = _this._entitys.concat(arr);
            }, this);
            var boss = new SoldierEntity();
            this.addChild(boss);
            boss.general = true;
            var bossCfgs = GlobalFun.getBossCfg();
            var bossIndex = (Math.random() * bossCfgs.length) >> 0;
            if (GameApp.level <= 9) {
                bossIndex = GameApp.level;
            }
            centerx -= 230;
            var bossVo = bossCfgs[bossIndex];
            boss.setSoldierData(-1, bossVo.model, bossVo.id);
            this._levelEntitys.push(boss);
            this._entitys.push(boss);
            boss.y = this.clickRect.y + (this.clickRect.height >> 1);
            boss.x = centerx;
            centerx -= 650;
        }
        this.dealLayerRelation();
    };
    GameMainView.prototype.execAction = function (timespan) {
        this._curTime += this._singleFrame;
        if (this._curTime >= this.actionExecStandTime) {
            this._curTime = 0;
            this.action(1);
            this.action(-1);
        }
        return false;
    };
    GameMainView.prototype.action = function (camp) {
        var ownEntitys = camp == 1 ? this._ownEntitys : this._levelEntitys;
        var levelEntitys = camp == 1 ? this._levelEntitys : this._ownEntitys;
        var _loop_1 = function (i) {
            var item = ownEntitys[i];
            if (item.isDead) {
                for (var j = 0; j < this_1._entitys.length; j++) {
                    if (this_1._entitys[j] == item) {
                        this_1._entitys.splice(j, 1);
                        break;
                    }
                }
                item.dispose();
                ownEntitys.splice(i, 1);
                i -= 1;
                return out_i_1 = i, "continue";
            }
            else {
                var atkItem = void 0;
                atkItem = this_1.getNearByEntity(item, levelEntitys);
                item.lookAt(atkItem);
                if (item.isInAtkDis()) {
                    //在攻击距离
                    console.log("进入攻击距离");
                    item.execAtkAction();
                }
                else {
                    if (this_1.checkXBlock(item, ownEntitys)) {
                        item.waitMoveAction();
                    }
                    else {
                        var xy = { x: StageUtils.inst().getWidth() - 150, y: item.y };
                        item.execMoveAction({ x: xy.x, y: xy.y }, function () {
                            //当前移动到了塔的附近 到达了攻击距离 //执行攻击
                            item.isInAtk = true;
                        }, this_1);
                    }
                }
            }
            out_i_1 = i;
        };
        var this_1 = this, out_i_1;
        for (var i = 0; i < ownEntitys.length; i++) {
            _loop_1(i);
            i = out_i_1;
        }
        this.dealLayerRelation();
    };
    /**处理层级显示关系 */
    GameMainView.prototype.dealLayerRelation = function () {
        this._entitys.sort(this.sortFun);
        for (var i = 0; i < this._entitys.length; i++) {
            this.setChildIndex(this._entitys[i], 3 + i);
        }
    };
    GameMainView.prototype.sortFun = function (param1, param2) {
        var s1y = param1.y;
        var s2y = param2.y;
        if (s1y > s2y) {
            return 1;
        }
        else if (s1y < s2y) {
            return -1;
        }
        else {
            return 0;
        }
    };
    /**检测X轴是否有阻挡 */
    GameMainView.prototype.checkXBlock = function (item, entitys) {
        var x = item.x;
        var y = item.y;
        for (var i = 0; i < entitys.length; i++) {
            var otherItem = entitys[i];
            if (item != otherItem) {
                var ox = otherItem.x;
                var oy = otherItem.y;
                if (ox - x <= 40 && ox - x >= 0 && Math.abs(oy - y) <= 10) {
                    return true;
                }
            }
        }
        return false;
    };
    /**获取最近攻击单位 */
    GameMainView.prototype.getNearByEntity = function (atkEntity, soldiers) {
        var minEntity = soldiers.length > 1 ? soldiers[1] : soldiers[0]; //避免士兵第一个选择就是武将
        if (minEntity) {
            var dis = Math.sqrt(Math.pow(minEntity.x - atkEntity.x, 2) + Math.pow(minEntity.y - atkEntity.y, 2));
            // let len:number = soldiers.length;
            // if(len >= 15){
            // 	len = 15;
            // }
            // let index:number = (Math.random()*len)>>0;
            // minEntity = soldiers[index];
            for (var i = 0; i < soldiers.length; i++) {
                if (atkEntity.general) {
                    if (soldiers[i].general) {
                        minEntity = soldiers[i];
                        break;
                    }
                }
                var item1 = soldiers[i];
                var dis2 = Math.sqrt(Math.pow(item1.x - atkEntity.x, 2) + Math.pow(item1.y - atkEntity.y, 2));
                if (dis2 <= dis) {
                    minEntity = item1;
                    dis = dis2;
                }
            }
        }
        return minEntity;
    };
    GameMainView.prototype.onTouchTap = function () {
        if (this.releaseSkill103) {
            //当前可以释放技人物;
        }
    };
    GameMainView.prototype.onLevelChange = function () {
        this.levelNumLab.text = GameApp.level.toString();
        this.totalCount = ((GameApp.level / GameApp.totalCount) >> 0) + 1;
        if (this.totalCount >= GameApp.totalCount) {
            this.totalCount = GameApp.totalCount;
        }
        this.totalHp = this.curHp = GameApp.level * 2000;
        this.countNumLab.text = this.curCount + "/" + this.totalCount;
        this.progressMark.width = this.curHp / this.totalHp * 277;
    };
    GameMainView.prototype.onaddGem = function () {
        ViewManager.inst().open(ShopPopUp, [{ selectIndex: 1 }]);
    };
    GameMainView.prototype.onaddGold = function () {
        ViewManager.inst().open(ShopPopUp, [{ selectIndex: 0 }]);
    };
    GameMainView.prototype.onUpgrade = function () {
        ViewManager.inst().open(UpgradePopUp);
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
                ViewManager.inst().open(GuideView);
                var item = _this.list.getChildAt(2);
                _this.guideView = ViewManager.inst().getView(GuideView);
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
            var xx = (StageUtils.inst().getWidth() >> 1) + 100;
            var yy = StageUtils.inst().getHeight() >> 1;
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
            GameApp.inst().gold += this.goldGetNum;
            //刷新新的宝箱倒计时时间戳
            var countStr = egret.localStorage.getItem(LocalStorageEnum.BOX_REWARD_GET);
            egret.localStorage.setItem(LocalStorageEnum.BOX_REWARD_GET, (parseInt(countStr) + 1).toString());
            egret.localStorage.setItem(LocalStorageEnum.BOX_REWARD_TIMESPAN, new Date().getTime().toString());
            this.refreshRewardBoxState(1);
        }
        else {
            UserTips.inst().showTips("未达领取时间");
        }
    };
    /**刷新宝箱盒子状态 */
    GameMainView.prototype.refreshRewardBoxState = function (num) {
        if (num === void 0) { num = 0; }
        GameApp.inst().refreshTimespan();
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
        ViewManager.inst().open(SettingPopUp);
    };
    GameMainView.prototype.onItemTap = function (evt) {
        var skillId = evt.item.skillId;
        var skillCfg = GlobalFun.getSkillCfg(skillId);
        if (skillCfg) {
            this.descLab.visible = true;
            this.descLab.alpha = 0;
            this.descLab.text = skillCfg.desc;
            egret.Tween.removeTweens(this.descLab);
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            egret.Tween.get(this.descLab, { loop: true }).to({ alpha: 1 }, 500).to({ alpha: 0 }, 500);
            var self_1 = this;
            this.timeout = setTimeout(function () {
                clearTimeout(self_1.timeout);
                egret.Tween.removeTweens(self_1.descLab);
            }, 2000);
            for (var i = 0; i < this.list.numChildren; i++) {
                var item = this.list.$children[i];
                item.focus = false;
            }
            var curItem = this.list.getChildAt(evt.itemIndex);
            curItem.focus = true;
            if (curItem.skillId == 103) {
                //当前是神将召唤
                if (!curItem.num) {
                    //神将已经召唤完毕
                    UserTips.inst().showTips("已无更多的神将");
                }
                else {
                    this.releaseSkill103 = true;
                }
            }
            else {
                this.releaseSkill103 = false;
                // 释放其他技能
            }
        }
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
        txt.x = (StageUtils.inst().getWidth() >> 1) - (txt.width >> 1) - 200;
        txt.y = (StageUtils.inst().getHeight() >> 1);
        txt.alpha = 0;
        txt.scaleX = txt.scaleY = 0;
        egret.Tween.get(txt).to({ alpha: 1, scaleX: 1, scaleY: 1, x: txt.x + 200 }, 1000, egret.Ease.circOut).wait(500).to({ alpha: 0, scaleX: 0, scaleY: 0, x: txt.x + 400 }, 1000, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(txt);
            txt.parent.removeChild(txt);
            cb();
        }, this);
    };
    GameMainView.prototype.close = function () {
        this.removeTouchEvent(this.settingBtn, this.onSetHandler);
        this.removeTouchEvent(this.upgradeBtn, this.onUpgrade);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        StageUtils.inst().getStage().removeEventListener(StartGameEvent.CLICK_GUIDE_SKILL, this.onClickGuideSkill, this);
        StageUtils.inst().getStage().removeEventListener(StartGameEvent.USE_GUIDE_SKILL, this.onUseGuideSkill, this);
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
ViewManager.inst().reg(GameMainView, LayerManager.UI_Main);
//# sourceMappingURL=GameMainView.js.map