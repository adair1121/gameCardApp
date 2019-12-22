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
        _this.showBlood = false;
        _this.rebornids = ["1000", "1001", "1002", "1003", "1004", "1005", "1006", "1007", "1008", "1009"];
        _this.extraBattle = false;
        _this.releaseSkill101 = false;
        _this.releaseSkill102 = false;
        _this.releaseSkill103 = false;
        _this.releaseSkill104 = false;
        return _this;
    }
    GameMainView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.alpha = 0;
        this._entitys = [];
        this._ownEntitys = [];
        this._levelEntitys = [];
        this.pos1["changeSize"]();
        this.pos2["changeSize"]();
        this.clickRect["changeSize"]();
        this.monGroup["autoSize"]();
        for (var i = 1; i <= 5; i++) {
            var skill1Level = egret.localStorage.getItem(LocalStorageEnum.SKILL_LEVEL + (100 + i));
            if (!skill1Level) {
                egret.localStorage.setItem(LocalStorageEnum.SKILL_LEVEL + (100 + i), "1");
            }
        }
        var skillCfg = egret.localStorage.getItem(LocalStorageEnum.REBORNCFG);
        if (!!skillCfg) {
            GameApp.skillCfg = JSON.parse(skillCfg);
        }
        var arr = [];
        arr = arr.concat(SkillCfg.skillCfg);
        var boo2 = GameApp.skillCfg ? true : false;
        if (!boo2) {
            GameApp.skillCfg = {};
            for (var i = 0; i < arr.length; i++) {
                GameApp.skillCfg[arr[i].skillId] = arr[i];
            }
            for (var i = 0; i < 10; i++) {
                var item = { skillId: 1000 + i, rebornId: 1, skillIcon: "skill_103_png", skillTitle: "skill_103_title_png", level: 1, desc: "神将", atk: 50, hp: 550, atkDis: 100, cost: 100, skillType: 1 };
                if (!GameApp.skillCfg[item.skillId]) {
                    GameApp.skillCfg[item.skillId] = item;
                }
            }
        }
        this.progressBar.mask = this.progressMark;
        this.totalHp = this.curHp = 50 * GameApp.level + 950;
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
        MessageManager.inst().addListener("start", this.onStart, this);
        MessageManager.inst().addListener("end", this.onStop, this);
        this.refreshRewardBoxState();
        var boo = this.changeTime();
        if (boo) {
            this.timer.start();
        }
        this.goldWatcher = eui.Binding.bindHandler(GameApp, ["roleGold"], this.roleGoldChange, this);
        this.gemWatcher = eui.Binding.bindHandler(GameApp, ["roleGem"], this.roleGemChange, this);
        // this.addTouchEvent(this.addGemBtn,this.onaddGem,true);
        this.addTouchEvent(this.addGoldBtn, this.onaddGold, true);
        this.addTouchEvent(this.upgradeBtn, this.onUpgrade, true);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEnd, this);
        MessageManager.inst().addListener(CustomEvt.REDUCE_HP, this.onTowerHpReduce, this);
        MessageManager.inst().addListener(CustomEvt.BOSS_RELEASESKILL, this.onBossReleaseSkill, this);
        MessageManager.inst().addListener("closeMain", this.onCloseMain, this);
        this.blood.visible = false;
        eui.Binding.bindHandler(GameApp, ["level"], this.onLevelChange, this);
        this.descLab.visible = false;
        this.descLab.alpha = 0;
        this.createLevelMonster();
        // 
    };
    GameMainView.prototype.onCloseMain = function () {
        // egret.Tween.removeAllTweens();
        ViewManager.inst().close(GameMainView);
        ViewManager.inst().open(StartGameView);
    };
    GameMainView.prototype.onStart = function () {
        // if(!GameApp.gameaEnd){
        egret.startTick(this.execAction, this);
        // }
    };
    GameMainView.prototype.onStop = function () {
        egret.stopTick(this.execAction, this);
        // egret.Tween.removeAllTweens();
        for (var i = 0; i < this._ownEntitys.length; i++) {
            egret.Tween.removeTweens(this._ownEntitys[i]);
        }
        for (var j = 0; j < this._levelEntitys.length; j++) {
            egret.Tween.removeTweens(this._levelEntitys[j]);
        }
    };
    GameMainView.prototype.onBegin = function (evt) {
        var _this = this;
        if (this.releaseSkill102 && evt.target == this.clickRect) {
            if (!this.skillrelease || (this.skillrelease && this.skillrelease != 102)) {
                this.skillrelease = 102;
                this.curItem.setCd();
                var skillCfg = GameApp.skillCfg[102];
                this.hideSkillUse();
                if (skillCfg.buffTime) {
                    this.showSkillUseTime(skillCfg.buffTime);
                }
            }
            var self_1 = this;
            this.beginPoint = new egret.Point(evt.stageX, evt.stageY);
            this.skill102 = new eui.Image("skill_102_pic_png");
            this.addChild(this.skill102);
            this.skill102.scaleX = this.skill102.scaleY = 0.5;
            this.skill102.anchorOffsetX = this.skill102.width >> 1;
            this.skill102.anchorOffsetY = this.skill102.height >> 1;
            this.skill102.x = evt.stageX;
            this.skill102.y = evt.stageY;
            GlobalFun.lighting(this.skill102, 0xF41AE3);
            this.interval = setInterval(function () {
                for (var i = 0; i < _this._levelEntitys.length; i++) {
                    var dis = egret.Point.distance(new egret.Point(_this._levelEntitys[i].x, _this._levelEntitys[i].y), new egret.Point(_this.skill102.x, _this.skill102.y));
                    if (dis <= 100) {
                        _this._levelEntitys[i].reduceHp(GameApp.skillCfg[102].atk + ((GameApp.skillCfg[102].atk * 0.2 * GlobalFun.getIndex()) >> 0));
                        egret.Tween.removeTweens(_this._levelEntitys[i]);
                        _this._levelEntitys[i].x -= ((Math.random() * 40) >> 0);
                    }
                }
            }, 150);
        }
    };
    GameMainView.prototype.showSkillUseTime = function (time) {
        var _this = this;
        if (this.skillInterval) {
            return;
        }
        this.skillUseGroup.visible = true;
        var self = this;
        this.bar.mask = this.barMask;
        var count = 0;
        this.proTxt.text = "施法时间:" + time;
        this.skillInterval = setInterval(function () {
            count += 1;
            var precentw = 300 - count / time * 300;
            _this.proTxt.text = "施法时间:" + (time - count);
            self.barMask.width = precentw;
            if (count >= time) {
                clearInterval(self.skillInterval);
                if (self.curItem) {
                    self.curItem.focus = false;
                    self.curItem = null;
                    self.skillrelease = null;
                    self.releaseSkill101 = self.releaseSkill102 = false;
                    self.hideSkillUse();
                }
            }
        }, 1000);
    };
    GameMainView.prototype.hideSkillUse = function () {
        this.skillUseGroup.visible = false;
        this.barMask.width = 300;
        if (this.skillInterval) {
            clearInterval(this.skillInterval);
            this.skillInterval = null;
        }
    };
    GameMainView.prototype.onEnd = function (evt) {
        if (this.skill102) {
            if (this.interval) {
                clearInterval(this.interval);
            }
            this.skill102.parent.removeChild(this.skill102);
            this.skill102 = null;
        }
    };
    GameMainView.prototype.onMove = function (evt) {
        if (this.skill102 && this.releaseSkill102) {
            this.skill102.x = evt.stageX;
            this.skill102.y = evt.stageY;
            var angle = Math.atan2(evt.stageY - this.beginPoint.y, evt.stageX - this.beginPoint.x) * 180 / Math.PI;
            var rotation = 0;
            if ((angle >= -30 && angle <= 0) || (angle > 0 && angle <= 30)) {
                rotation = 0;
            }
            else if (angle > 30 && angle <= 70) {
                rotation = 45;
            }
            else if ((angle > 70 && angle <= 120)) {
                rotation = 90;
            }
            else if (angle > 120 && angle <= 150) {
                rotation = 135;
            }
            else if ((angle > 150 && angle <= 180) || (angle > -180 && angle <= -150)) {
                rotation = 180;
            }
            else if (angle > -150 && angle <= -120) {
                rotation = 225;
            }
            else if (angle > -120 && angle <= -70) {
                rotation = -90;
            }
            else {
                rotation = -45;
            }
            this.skill102.rotation = rotation;
            this.beginPoint.x = evt.stageX;
            this.beginPoint.y = evt.stageY;
        }
        else {
            this.onEnd(null);
        }
    };
    GameMainView.prototype.onBossReleaseSkill = function (evt) {
        var index = ((Math.random() * 9 + 1) >> 0);
        // let xy:XY = {x:this._levelEntitys[0].x,y:this._levelEntitys[0].y};
        GlobalFun.createSkillEff(-1, index, this, 2, evt.data.xy);
        for (var i = 0; i < this._ownEntitys.length; i++) {
            var dmg_1 = (GameApp.level) * ((Math.random() * 10) >> 0);
            this._ownEntitys[i].reduceHp(dmg_1);
        }
        var dmg = (GameApp.level) * ((Math.random() * 10) >> 0);
        this.curHp -= dmg;
        this.onTowerHpReduce({ data: { hp: dmg } });
    };
    GameMainView.prototype.onTowerHpReduce = function (evt) {
        var _this = this;
        this.curHp -= evt.data.hp;
        if (this.curHp <= 0) {
            this.curHp = 0;
            this.gameFail();
        }
        if (!this.showBlood) {
            this.showBlood = true;
            this.blood.visible = true;
            this.blood.alpha = 0;
            egret.Tween.get(this.blood).to({ alpha: 1 }, 600).to({ alpha: 0 }, 600).to({ alpha: 1 }, 600).to({ alpha: 0 }, 600).call(function () {
                egret.Tween.removeTweens(_this.blood);
                _this.blood.visible = false;
                _this.showBlood = false;
            }, this);
        }
        this.showDmg(evt.data.hp);
        this.progressMark.width = this.curHp / this.totalHp * 277;
    };
    GameMainView.prototype.showDmg = function (dmg) {
        var dmgfont = new eui.BitmapLabel();
        dmgfont.scaleX = dmgfont.scaleY = 0.7;
        dmgfont.font = "dmg_fnt";
        this.addChild(dmgfont);
        dmgfont.text = "-" + Math.floor(dmg);
        dmgfont.bottom = 80;
        dmgfont.right = 150 + ((Math.random() * 50) >> 0);
        egret.Tween.get(dmgfont).to({ bottom: dmgfont.bottom + 100 }, 600 + ((Math.random() * 400) >> 0), egret.Ease.circIn).call(function () {
            egret.Tween.removeTweens(dmgfont);
            if (dmgfont && dmgfont.parent) {
                dmgfont.parent.removeChild(dmgfont);
            }
        }, this);
    };
    GameMainView.prototype.gameFail = function () {
        egret.stopTick(this.execAction, this);
        this.timer.stop();
        this.curReborns = null;
        GameApp.gameaEnd = true;
        var self = this;
        this.releaseSkill101 = this.releaseSkill102 = this.releaseSkill103 = this.releaseSkill104 = false;
        this.skillrelease = null;
        this.hideSkillUse();
        if (this.curItem) {
            this.curItem.focus = false;
            this.curItem = null;
        }
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            ViewManager.inst().open(BattleResultPopUp, [{ state: 0, cb: self.gameEnd, arg: self }]);
        }, 2000);
        console.log("游戏结束");
    };
    GameMainView.prototype.gameWin = function () {
        egret.stopTick(this.execAction, this);
        this.timer.stop();
    };
    GameMainView.prototype.gameEnd = function (param) {
        this.curReborns = null;
        this.rebornids = ["1000", "1001", "1002", "1003", "1004", "1005", "1006", "1007", "1008", "1009"];
        egret.stopTick(this.execAction, this);
        egret.Tween.removeAllTweens();
        for (var i = 0; i < this._entitys.length; i++) {
            if (this._entitys[i] && this._entitys[i].parent) {
                this._entitys[i].parent.removeChild(this._entitys[i]);
            }
        }
        for (var i = 0; i < this._ownEntitys.length; i++) {
            if (this._ownEntitys[i] && this._ownEntitys[i].parent) {
                this._ownEntitys[i].dispose();
            }
        }
        for (var i = 0; i < this._levelEntitys.length; i++) {
            if (this._levelEntitys[i] && this._levelEntitys[i].parent) {
                this._levelEntitys[i].dispose();
            }
        }
        this._entitys = [];
        this._ownEntitys = [];
        this._levelEntitys = [];
        if (param == BattleResultPopUp.OPER_EXIT) {
            ViewManager.inst().close(GameMainView);
            ViewManager.inst().open(StartGameView);
        }
        else if (param == BattleResultPopUp.OPER_CONTINUE) {
            this.reset();
        }
        else if (param == BattleResultPopUp.OPER_NEXT) {
            var self_2 = this;
            GameApp.level += 1;
            for (var i = 0; i < this._ownEntitys.length; i++) {
                if (this._ownEntitys[i] && this._ownEntitys[i].parent) {
                    this._ownEntitys[i].dispose();
                }
            }
            this._entitys = [];
            this._ownEntitys = [];
            this._levelEntitys = [];
            var skillItem = this.list.getChildAt(2);
            skillItem.num = 10;
            var timeout_1 = setTimeout(function () {
                clearTimeout(timeout_1);
                self_2.showLevelTxt(function () {
                    self_2.createLevelMonster();
                    egret.startTick(self_2.execAction, self_2);
                });
            }, 1200);
        }
    };
    GameMainView.prototype.reset = function () {
        for (var i = 0; i < this._entitys.length; i++) {
            if (this._entitys[i] && this._entitys[i].parent) {
                this._entitys[i].parent.removeChild(this._entitys[i]);
            }
        }
        for (var i = 0; i < this.list.numChildren; i++) {
            var item = this.list.$children[i];
            if (item) {
                item.removeCd();
            }
        }
        this.rebornids = ["1000", "1001", "1002", "1003", "1004", "1005", "1006", "1007", "1008", "1009"];
        this.curReborns = null;
        this._entitys = [];
        this._ownEntitys = [];
        this._levelEntitys = [];
        this.totalHp = this.curHp = 50 * GameApp.level + 950;
        this.list.$children[2].num = 10;
        this.touchEnabled = false;
        this.touchChildren = false;
        this.refreshRewardBoxState();
        var boo = this.changeTime();
        if (boo) {
            this.timer.start();
        }
        this.blood.visible = false;
        this.descLab.visible = false;
        this.descLab.alpha = 0;
        this.createLevelMonster();
        this.initialize();
    };
    /**创建关卡怪物 */
    GameMainView.prototype.createLevelMonster = function (cx) {
        var _this = this;
        var count = ((GameApp.level / 5) >> 0) + 1;
        var centery = this.clickRect.y + 150;
        var centerx = -270;
        for (var i = 0; i < count; i++) {
            var shapIndex = (Math.random() * 6) >> 0;
            var monsterCfg = GlobalFun.getMonsterCfg();
            var index = (Math.random() * monsterCfg.length) >> 0;
            if (GameApp.level <= 11) {
                index = GameApp.level;
            }
            var monsterVo = monsterCfg[index];
            monsterVo.atk = 2 * GameApp.level + 18 + (2 * GameApp.level + 18) * 0.2 * this.direct();
            monsterVo.hp = 10 * GameApp.level + 90 + (10 * GameApp.level + 90) * 0.2 * this.direct();
            SoldierShapeEntity.inst().initData(shapIndex, monsterVo.model, monsterVo.id, this, { x: centerx, y: centery }, function (arr) {
                _this._levelEntitys = _this._levelEntitys.concat(arr);
                _this._entitys = _this._entitys.concat(arr);
            }, this);
            var boss = new SoldierEntity();
            this.addChild(boss);
            boss.general = true;
            var bossCfgs = GlobalFun.getBossCfg();
            var bossIndex = (Math.random() * bossCfgs.length) >> 0;
            if (GameApp.level <= 9) {
                bossIndex = GameApp.level - 1;
            }
            centerx -= 230;
            var bossVo = bossCfgs[bossIndex];
            bossVo.atk = 5 * GameApp.level + 45 + (5 * GameApp.level + 45) * 0.2 * this.direct();
            bossVo.hp = 30 * GameApp.level + 800 + this.direct() * (30 * GameApp.level + 270) * 0.2;
            boss.setSoldierData(-1, bossVo.model, bossVo);
            this._levelEntitys.push(boss);
            this._entitys.push(boss);
            boss.y = this.clickRect.y + (this.clickRect.height >> 1);
            boss.x = centerx;
            centerx -= 650;
        }
        this.dealLayerRelation();
    };
    GameMainView.prototype.direct = function () {
        var index = (Math.random() * 100) >> 0;
        return index > 50 ? 1 : -1;
    };
    /**创建我方神将 */
    GameMainView.prototype.createOwnGenral = function (xy) {
        var _this = this;
        var soldierEntity = new SoldierEntity();
        // let rebornSkillId:number = 1000 + ((Math.random()*10)>>0);
        if (!this.curReborns || (this.curReborns && !this.curReborns.length)) {
            this.curReborns = [];
            for (var key in GameApp.reborns) {
                var index = this.rebornids.indexOf(key);
                if (index != -1) {
                    this.rebornids.splice(index, 1);
                    this.curReborns.push(GameApp.reborns[key]);
                }
            }
        }
        var rebornsId = 1;
        if (this.curReborns && this.curReborns.length) {
            var rebornItem = this.curReborns.shift();
            rebornsId = rebornItem[0];
        }
        var skillres = "skill_103_" + rebornsId;
        var cardVo = GlobalFun.getSkillGeneralCfg(rebornsId);
        if (rebornsId == 2) {
            cardVo.atkspd *= 2;
        }
        else if (rebornsId == 3) {
            cardVo.atk *= 2;
            cardVo.hp *= 2;
        }
        else if (rebornsId == 4) {
            cardVo.atk *= 4;
        }
        soldierEntity.setSoldierData(1, skillres, cardVo);
        this.addChild(soldierEntity);
        soldierEntity.alpha = 0;
        soldierEntity.x = xy.x;
        soldierEntity.y = xy.y;
        var birthEff = new MovieClip();
        this.addChild(birthEff);
        birthEff.scaleX = birthEff.scaleY = 0.8;
        birthEff.playFile(EFFECT + "birth", 1, null, true);
        birthEff.x = xy.x;
        birthEff.y = xy.y;
        egret.Tween.get(soldierEntity).to({ alpha: 1 }, 600, egret.Ease.circIn).call(function () {
            _this._ownEntitys.push(soldierEntity);
            _this._entitys.push(soldierEntity);
        }, this);
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
                var deathMc = new MovieClip();
                this_1.addChild(deathMc);
                deathMc.x = item.x;
                deathMc.y = item.y;
                deathMc.playFile(EFFECT + "death", 1);
                item.dispose();
                ownEntitys.splice(i, 1);
                i -= 1;
                return out_i_1 = i, "continue";
            }
            else {
                if (camp == -1) {
                    var guidepassStr = egret.localStorage.getItem(LocalStorageEnum.IS_PASS_GUIDE);
                    if (!guidepassStr) {
                        if (item.x >= 100) {
                            this_1.onStop();
                            this_1.touchEnabled = true;
                            this_1.touchChildren = true;
                            egret.localStorage.setItem(LocalStorageEnum.IS_PASS_GUIDE, "1");
                            ViewManager.inst().open(GuideView);
                            var item_1 = this_1.list.getChildAt(2);
                            this_1.guideView = ViewManager.inst().getView(GuideView);
                            this_1.guideView.nextStep({ id: "1_1", comObj: item_1, width: 75, height: 75 });
                            return { value: void 0 };
                        }
                    }
                }
                var atkItem = void 0;
                atkItem = this_1.getNearByEntity(item, levelEntitys);
                if (camp == 1) {
                    if (atkItem && atkItem.x >= this_1.clickRect.x + 50) {
                        item.lookAt(atkItem);
                    }
                }
                else {
                    if (!item.isInAtk) {
                        item.lookAt(atkItem);
                    }
                }
                if (item.isInAtkDis()) {
                    //在攻击距离
                    // console.log("进入攻击距离");
                    item.execAtkAction();
                }
                else {
                    if (!item.playState) {
                        if (item.atkTar && !item.atkTar.isDead && camp == 1) {
                            item.execMoveAction();
                            if (this_1.checkXBlock(1, item, this_1._ownEntitys)) {
                                //x轴有阻挡
                                var moveY = item.y + (((Math.random() * 100) >> 0) > 50 ? 1 : -1) * 40;
                                if (moveY >= this_1.clickRect.y + this_1.clickRect.height || moveY <= this_1.clickRect.y) {
                                    item.execStandAction();
                                    egret.Tween.removeTweens(item);
                                }
                                else {
                                    item.execYmoveAction(moveY);
                                }
                            }
                        }
                        else {
                            if (camp == -1) {
                                var xy = { x: StageUtils.inst().getWidth() - 200, y: item.y };
                                item.execMoveAction({ x: xy.x, y: xy.y }, function () {
                                    //当前移动到了塔的附近 到达了攻击距离 //执行攻击
                                    item.unlookAt();
                                    item.isInAtk = true;
                                }, this_1);
                            }
                            else {
                                egret.Tween.removeTweens(item);
                                // item.execStandAction();
                                item.execMoveAction({ x: (this_1.clickRect.x + this_1.clickRect.width - 100 - ((Math.random() * 150) >> 0)), y: item.y });
                            }
                        }
                    }
                    // if(this.checkXBlock(camp,item,ownEntitys)){
                    // 	item.waitMoveAction();
                    // }
                }
            }
            out_i_1 = i;
        };
        var this_1 = this, out_i_1;
        for (var i = 0; i < ownEntitys.length; i++) {
            var state_1 = _loop_1(i);
            i = out_i_1;
            if (typeof state_1 === "object")
                return state_1.value;
        }
        if (this._levelEntitys.length <= 0) {
            //当前波数战斗完毕 。进行下一波
            this.execNextCount();
            egret.stopTick(this.execAction, this);
        }
        this.dealLayerRelation();
    };
    GameMainView.prototype.execNextCount = function () {
        var _this = this;
        if (this.curCount >= this.totalCount) {
            //当前波数也已经打完 进行下一关;
            if (!this.extraBattle) {
                var index = (Math.random() * 100) >> 0;
                if (index >= 80) {
                    //触发隐藏关卡；
                    this.extraBattle = true;
                    var count = (Math.random() * 15 + 10) >> 0;
                    var num_1 = count;
                    var _loop_2 = function (i) {
                        var transres = ((Math.random() * 100) >> 0) > 50 ? EFFECT + "trans" : EFFECT + "trans2";
                        var mc = new MovieClip();
                        mc.scaleX = mc.scaleY = 0.6;
                        mc.playFile(transres, 3, null, true);
                        this_2.addChild(mc);
                        mc.x = (Math.random() * (this_2.clickRect.width - 350) + this_2.clickRect.x + 80) >> 0;
                        mc.y = (Math.random() * (this_2.clickRect.height - 30) + this_2.clickRect.y + 50) >> 0;
                        var monsterCfg = GlobalFun.getMonsterCfg();
                        var index_1 = (Math.random() * monsterCfg.length) >> 0;
                        var monsterVo = monsterCfg[index_1];
                        monsterVo.atk = 2 * GameApp.level + 18 + (2 * GameApp.level + 18) * 0.2 * this_2.direct();
                        monsterVo.hp = 10 * GameApp.level + 90 + (10 * GameApp.level + 90) * 0.2 * this_2.direct();
                        var monsterEntity = new SoldierEntity();
                        monsterEntity.setSoldierData(-1, monsterVo.model, monsterVo);
                        this_2.addChild(monsterEntity);
                        monsterEntity.x = mc.x;
                        monsterEntity.y = mc.y;
                        monsterEntity.alpha = 0;
                        egret.Tween.get(monsterEntity).to({ alpha: 1 }, 1000).call(function () {
                            _this._levelEntitys.push(monsterEntity);
                            _this._entitys.push(monsterEntity);
                            if (i >= num_1 - 1) {
                                egret.startTick(_this.execAction, _this);
                            }
                        }, this_2);
                    };
                    var this_2 = this;
                    for (var i = 0; i < num_1; i++) {
                        _loop_2(i);
                    }
                }
                else {
                    for (var i = 0; i < this.list.numChildren; i++) {
                        var item = this.list.$children[i];
                        if (item) {
                            item.removeCd();
                        }
                    }
                    this.extraBattle = false;
                    egret.stopTick(this.execAction, this);
                    this.curReborns = null;
                    GameApp.gameaEnd = true;
                    var self_3 = this;
                    this.releaseSkill101 = this.releaseSkill102 = this.releaseSkill103 = this.releaseSkill104 = false;
                    this.skillrelease = null;
                    this.hideSkillUse();
                    if (this.curItem) {
                        this.curItem.focus = false;
                        this.curItem = null;
                    }
                    var timeout_2 = setTimeout(function () {
                        clearTimeout(timeout_2);
                        ViewManager.inst().open(BattleResultPopUp, [{ state: 1, cb: self_3.gameEnd, arg: self_3 }]);
                    }, 2000);
                }
            }
            else {
                this.extraBattle = false;
                egret.stopTick(this.execAction, this);
                this.curReborns = null;
                GameApp.gameaEnd = true;
                var self_4 = this;
                this.releaseSkill101 = this.releaseSkill102 = this.releaseSkill103 = this.releaseSkill104 = false;
                this.skillrelease = null;
                this.hideSkillUse();
                if (this.curItem) {
                    this.curItem.focus = false;
                    this.curItem = null;
                }
                var timeout_3 = setTimeout(function () {
                    clearTimeout(timeout_3);
                    ViewManager.inst().open(BattleResultPopUp, [{ state: 1, cb: self_4.gameEnd, arg: self_4 }]);
                }, 2000);
            }
        }
        else {
            //打下一波；
            this.curCount += 1;
            this.countNumLab.text = this.curCount + "/" + this.totalCount;
            var self_5 = this;
            this.curReborns = null;
            this.rebornids = ["1000", "1001", "1002", "1003", "1004", "1005", "1006", "1007", "1008", "1009"];
            this.releaseSkill101 = this.releaseSkill102 = this.releaseSkill103 = this.releaseSkill104 = false;
            this.skillrelease = null;
            this.hideSkillUse();
            if (this.curItem) {
                this.curItem.focus = false;
                this.curItem = null;
            }
            this.showLevelTxt(function () {
                self_5.createLevelMonster();
                egret.startTick(_this.execAction, _this);
            }, this.curCount);
        }
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
    /**检测y轴是否有阻挡 */
    // private checkYBlock(camp:number,item:SoldierEntity,entitys:any[]):number{ 
    // 	let x:number = item.x;
    // 	let y:number = item.y;
    // 	let num:number = 0;
    // 	for(let i:number = 0;i<entitys.length;i++){
    // 		let otherItem:any = entitys[i];
    // 		if(item != otherItem){
    // 			let ox:number = otherItem.x;
    // 			let oy:number = otherItem.y;
    // 			if(oy > y && oy-y >= 40 && item.y <= (this.clickRect.y +this.clickRect.height -20)){
    // 				return 1;
    // 			}
    // 			if(oy < y && y-oy >= 40 && item.y >= this.clickRect.y + 20){
    // 				return -1
    // 			}
    // 		}
    // 	}
    // 	return num;
    // }
    /**检测X轴是否有阻挡 */
    GameMainView.prototype.checkXBlock = function (camp, item, entitys) {
        var x = item.x;
        var y = item.y;
        for (var i = 0; i < entitys.length; i++) {
            var otherItem = entitys[i];
            if (item != otherItem) {
                var ox = otherItem.x;
                var oy = otherItem.y;
                if (item.atkTar) {
                    var direct = item.x > item.atkTar.x ? 1 : -1;
                    var condition = false;
                    if (direct == 1) {
                        condition = (x - ox <= 40 && x > ox && Math.abs(y - oy) <= 20);
                    }
                    else {
                        condition = (ox - x <= 40 && ox > x && Math.abs(y - oy) <= 20);
                    }
                    if (condition) {
                        return true;
                    }
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
                // if(atkEntity.general){
                // 	if(soldiers[i].general){
                // 		minEntity = soldiers[i];
                // 		break;
                // 	}
                // }
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
    GameMainView.prototype.onTouchTap = function (evt) {
        if (this.releaseSkill103 && evt.target == this.clickRect) {
            //当前可以释放技人物;
            this.skillrelease = 103;
            this.hideSkillUse();
            if (this.curItem) {
                if ((!this.curItem.num)) {
                    //神将已经召唤完毕
                    UserTips.inst().showTips("已无更多的神将");
                }
                else {
                    this.createOwnGenral({ x: evt.stageX, y: evt.stageY });
                    this.curItem.num -= 1;
                }
            }
        }
        else if (this.releaseSkill101 && evt.target == this.clickRect) {
            var skillCfg = GameApp.skillCfg[101];
            if (!this.skillrelease || (this.skillrelease && this.skillrelease != 101)) {
                this.skillrelease = 101;
                this.curItem.setCd();
                this.hideSkillUse();
                if (skillCfg.buffTime) {
                    this.showSkillUseTime(skillCfg.buffTime);
                }
            }
            var skillMc = new MovieClip();
            this.addChild(skillMc);
            skillMc.playFile(SKILL_EFF + "skill_101", 1, null, true);
            skillMc.scaleX = skillMc.scaleY = 0.4;
            skillMc.x = evt.stageX;
            skillMc.y = evt.stageY;
            for (var i = 0; i < this._levelEntitys.length; i++) {
                var dis = egret.Point.distance(new egret.Point(this._levelEntitys[i].x, this._levelEntitys[i].y), new egret.Point(evt.stageX, evt.stageY));
                if (dis <= 100) {
                    this._levelEntitys[i].reduceHp(skillCfg.atk + ((skillCfg.atk * GlobalFun.getIndex() * 0.2) >> 0));
                }
            }
        }
        else if (this.releaseSkill102 && evt.target == this.clickRect) {
        }
        else if (this.releaseSkill104 && evt.target == this.clickRect) {
            if (this.curItem && this.curItem.isCd) {
                return;
            }
            var skillCfg_1 = GameApp.skillCfg[104];
            this.skillrelease = 104;
            this.curItem.setCd();
            this.hideSkillUse();
            var mc = new MovieClip();
            this.addChild(mc);
            mc.x = this.pos1.x;
            mc.y = this.pos1.y;
            var mc2 = new MovieClip();
            this.addChild(mc2);
            mc2.x = this.pos2.x;
            mc2.y = this.pos2.y;
            mc.playFile(SKILL_EFF + "skill_104_c", 1, null, true);
            mc2.playFile(SKILL_EFF + "skill_104_c", 1, null, true);
            var self_6 = this;
            var timeout_4 = setTimeout(function () {
                clearTimeout(timeout_4);
                GlobalFun.createSkillEff(1, 104, self_6, 2, { x: StageUtils.inst().getWidth() - 200, y: 200 }, self_6._levelEntitys, skillCfg_1.atk);
            }, 800);
        }
    };
    GameMainView.prototype.onLevelChange = function () {
        this.levelNumLab.text = GameApp.level.toString();
        this.totalCount = ((GameApp.level / GameApp.totalCount) >> 0) + 1;
        this.curCount = 1;
        if (this.totalCount >= GameApp.totalCount) {
            this.totalCount = GameApp.totalCount;
        }
        this.totalHp = this.curHp = 50 * GameApp.level + 950;
        // this.totalHp = this.curHp = GameApp.level*2000;
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
    GameMainView.prototype.showEffect = function () {
        var _this = this;
        egret.Tween.get(this.itemGroup).to({ top: 4 }, 300, egret.Ease.backOut).call(function () {
            egret.Tween.removeTweens(_this.itemGroup);
        }, this);
        egret.Tween.get(this.awardBox).to({ left: 17 }, 400, egret.Ease.backOut).call(function () {
            egret.Tween.removeTweens(_this.awardBox);
        }, this);
        egret.Tween.get(this.levelGroup).to({ top: 14 }, 500, egret.Ease.backOut).call(function () {
            egret.Tween.removeTweens(_this.levelGroup);
        }, this);
        egret.Tween.get(this.settingBtn).to({ right: 21 }, 600, egret.Ease.backOut).call(function () {
            egret.Tween.removeTweens(_this.settingBtn);
        }, this);
        egret.Tween.get(this.upgradeBtn).to({ right: 17 }, 700, egret.Ease.backOut).call(function () {
            egret.Tween.removeTweens(_this.upgradeBtn);
            _this.upred.visible = true;
        });
        egret.Tween.get(this.skillGroup).to({ right: -13 }, 800, egret.Ease.backOut).call(function () {
            egret.Tween.removeTweens(_this.skillGroup);
        }, this);
        egret.Tween.get(this.hpGroup).to({ bottom: 0 }, 900, egret.Ease.backOut).call(function () {
            egret.Tween.removeTweens(_this.hpGroup);
            _this.upred.visible = true;
        }, this);
    };
    GameMainView.prototype.initialize = function (boo) {
        var _this = this;
        //初始化
        this.upred.visible = false;
        var guidepassStr = egret.localStorage.getItem(LocalStorageEnum.IS_PASS_GUIDE);
        GameApp.gameaEnd = false;
        var bossnum = 0;
        if (boo) {
            if (!guidepassStr) {
                this.monImg.visible = true;
                this.monGroup.visible = true;
                egret.Tween.get(this).to({ alpha: 1 }, 1000).call(function () {
                    egret.Tween.removeTweens(_this);
                    var centerx = _this.monGroup.width - 200;
                    var txts = ["小的们,随本王出征", '列队！准备攻城!!!'];
                    for (var i = 0; i < 2; i++) {
                        var shapIndex = (Math.random() * 6) >> 0;
                        var monsterCfg = GlobalFun.getMonsterCfg();
                        var index = (Math.random() * monsterCfg.length) >> 0;
                        var monsterVo = monsterCfg[index];
                        SoldierShapeEntity.inst().initData(shapIndex, monsterVo.model, monsterVo.id, _this.monGroup, { x: centerx - i * 450, y: 100 }, function (arr) {
                            var _loop_3 = function (i_1) {
                                arr[i_1].alpha = 0;
                                var y = arr[i_1].y;
                                arr[i_1].y -= 200;
                                egret.Tween.get(arr[i_1]).wait(150 * i_1).to({ alpha: 1, y: arr[i_1].y + 200 }, 150, egret.Ease.backOut).call(function () {
                                    egret.Tween.removeTweens(arr[i_1]);
                                    if (i_1 >= arr.length - 1) {
                                        for (var j = 0; j < arr.length; j++) {
                                            arr[j].execOneTimeAtk(function (index) {
                                                if (index >= arr.length - 1) {
                                                    var txt_1 = new eui.Label();
                                                    _this.monGroup.addChild(txt_1);
                                                    txt_1.text = txts.shift();
                                                    txt_1.alpha = 0.3;
                                                    txt_1.scaleX = txt_1.scaleY = 5;
                                                    txt_1.anchorOffsetX = txt_1.width >> 1;
                                                    txt_1.anchorOffsetY = txt_1.height >> 1;
                                                    txt_1.y = 0;
                                                    txt_1.x = centerx;
                                                    egret.Tween.get(txt_1).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 600, egret.Ease.circOut).wait(300).call(function () {
                                                        egret.Tween.removeTweens(txt_1);
                                                    }, _this);
                                                    var boss_1 = new SoldierEntity();
                                                    boss_1.alpha = 0;
                                                    _this.monGroup.addChild(boss_1);
                                                    boss_1.general = true;
                                                    var bossCfgs = GlobalFun.getBossCfg();
                                                    var bossIndex = (Math.random() * bossCfgs.length) >> 0;
                                                    egret.Tween.get(boss_1).to({ alpha: 1 }, 600).call(function () {
                                                        egret.Tween.removeTweens(boss_1);
                                                    }, _this);
                                                    centerx -= 140;
                                                    var bossVo = bossCfgs[bossIndex];
                                                    boss_1.setSoldierData(-1, bossVo.model, bossVo);
                                                    boss_1.execOneTimeAtk(function (finalIndex) {
                                                        // if(this.monGroup){this.monGroup.visible = false};
                                                        // if(this.monImg){this.monImg.visible = false}
                                                        bossnum += 1;
                                                        if (bossnum >= 2) {
                                                            var rect_1 = new eui.Rect(StageUtils.inst().getWidth(), StageUtils.inst().getHeight(), 0x000000);
                                                            _this.addChild(rect_1);
                                                            rect_1.alpha = 0;
                                                            egret.Tween.get(rect_1).wait(2000).to({ alpha: 0.9 }, 1000).wait(300).call(function () {
                                                                if (_this.monGroup) {
                                                                    _this.monGroup.visible = false;
                                                                }
                                                                ;
                                                                if (_this.monImg) {
                                                                    _this.monImg.visible = false;
                                                                }
                                                                // this.monGroup.parent.removeChild(this.monGroup);
                                                                // this.monImg.parent.removeChild(this.monImg);
                                                            }, _this).to({ alpha: 0 }, 2000).call(function () {
                                                                rect_1.parent.removeChild(rect_1);
                                                                egret.Tween.removeTweens(rect_1);
                                                                _this.showEffect();
                                                                _this.showText();
                                                            }, _this);
                                                        }
                                                    }, _this, i_1);
                                                    boss_1.y = 200;
                                                    boss_1.x = centerx;
                                                    centerx -= 350;
                                                }
                                            }, _this, j);
                                        }
                                    }
                                }, _this);
                            };
                            for (var i_1 = 0; i_1 < arr.length; i_1++) {
                                _loop_3(i_1);
                            }
                        }, _this);
                    }
                    // 
                }, this);
            }
            else {
                this.monImg.visible = this.monGroup.visible = false;
                egret.Tween.get(this).to({ alpha: 1 }, 1000).call(function () {
                    egret.Tween.removeTweens(_this);
                    _this.showEffect();
                    _this.showText();
                }, this);
            }
        }
        else {
            this.monImg.visible = false;
            this.monGroup.visible = false;
            this.showEffect();
            this.showText();
        }
    };
    GameMainView.prototype.showText = function () {
        var _this = this;
        this.touchEnabled = false;
        this.touchChildren = false;
        this.showLevelTxt(function () {
            var guidepassStr = egret.localStorage.getItem(LocalStorageEnum.IS_PASS_GUIDE);
            egret.startTick(_this.execAction, _this);
            if (guidepassStr) {
                //执行正常出怪的逻辑
                _this.touchEnabled = true;
                _this.touchChildren = true;
            }
            else {
                _this.touchEnabled = false;
                _this.touchChildren = false;
            }
        });
    };
    GameMainView.prototype.roleGoldChange = function (value) {
        this.goldLab.text = GameApp.roleGold.toString();
        var boo = false;
        for (var key in GameApp.skillCfg) {
            if (GameApp.roleGold >= GameApp.skillCfg[key].cost && GameApp.skillCfg[key].cost != 0) {
                boo = true;
                break;
            }
        }
        this.upred.visible = boo;
    };
    GameMainView.prototype.roleGemChange = function (value) {
        this.gemLab.text = value.toString();
    };
    /**点击了引导技能 */
    GameMainView.prototype.onClickGuideSkill = function (evt) {
        if (this.guideView) {
            var xx = (StageUtils.inst().getWidth() >> 1) + 100;
            var yy = StageUtils.inst().getHeight() >> 1;
            this.curItem = this.list.$children[2];
            this.curItem.focus = true;
            this.releaseSkill103 = true;
            this.guideView.nextStep({ id: evt.data.id, comObj: { x: xx, y: yy }, width: 75, height: 75 });
        }
    };
    /**点击使用了技能-- 神将 */
    GameMainView.prototype.onUseGuideSkill = function (evt) {
        console.log("使用了技能-----" + evt.data.skillId + "----神将召唤");
        egret.startTick(this.execAction, this);
        var xx = (StageUtils.inst().getWidth() >> 1) + 100;
        var yy = (StageUtils.inst().getHeight() >> 1) + 50;
        this.createOwnGenral({ x: xx, y: yy });
    };
    GameMainView.prototype.onRewardGet = function (evt) {
        var getcountstr = egret.localStorage.getItem(LocalStorageEnum.BOX_REWARD_GET);
        var boxTimestr = egret.localStorage.getItem(LocalStorageEnum.BOX_REWARD_TIMESPAN);
        var nowTime = new Date().getTime();
        if (!getcountstr || (getcountstr && getcountstr == "0") || (boxTimestr && (nowTime - parseInt(boxTimestr)) > this.awardBoxGetTime)) {
            //第一次进入 。第二天重置 。现在的时间-创建时间 〉 10分钟 。可以领取
            //增加金币数量
            var goldMc = new MovieClip();
            this.awardBox.addChild(goldMc);
            goldMc.playFile(EFFECT + "gold", 1, null, true);
            goldMc.x = this.awardBox.width >> 1;
            goldMc.y = this.awardBox.height >> 1;
            GameApp.inst().gold += this.goldGetNum;
            UserTips.inst().showTips("获得金币+" + this.goldGetNum);
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
        var _this = this;
        var curItem = this.list.getChildAt(evt.itemIndex);
        if (curItem.isCd) {
            UserTips.inst().showTips("技能冷却中");
            return;
        }
        var skillId = evt.item.skillId;
        var skillCfg = GlobalFun.getSkillCfg(skillId);
        if (skillCfg) {
            if (skillCfg.skillId == 105) {
                // egret.Tween.removeAllTweens();
                // egret.stopTick(this.execAction,this);
                this.onStop();
                ViewManager.inst().open(CommonPtompt, [{ cb: function (oper) {
                            if (oper == 1) {
                                //需要刷新全部技能;
                                for (var i = 0; i < _this.list.numChildren; i++) {
                                    var item = _this.list.$children[i];
                                    item.removeCd();
                                    if (item.skillId == 103) {
                                        item.num = 10;
                                    }
                                }
                            }
                            egret.startTick(_this.execAction, _this);
                        }, arg: this }]);
                return;
            }
            this.descLab.visible = true;
            this.descLab.alpha = 0;
            this.descLab.text = skillCfg.desc;
            egret.Tween.removeTweens(this.descLab);
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            egret.Tween.get(this.descLab, { loop: true }).to({ alpha: 1 }, 500).to({ alpha: 0 }, 500);
            var self_7 = this;
            this.timeout = setTimeout(function () {
                clearTimeout(self_7.timeout);
                egret.Tween.removeTweens(self_7.descLab);
            }, 2000);
            for (var i = 0; i < this.list.numChildren; i++) {
                var item = this.list.$children[i];
                item.focus = false;
            }
            curItem.focus = true;
            curItem.dongyixia();
            this.curItem = curItem;
            if (curItem.skillId == 103) {
                //当前是神将召唤
                this.releaseSkill103 = true;
                this.releaseSkill101 = this.releaseSkill102 = this.releaseSkill104 = false;
            }
            else if (curItem.skillId == 104) {
                this.releaseSkill104 = true;
                this.releaseSkill101 = this.releaseSkill102 = this.releaseSkill103 = false;
            }
            else if (curItem.skillId == 101) {
                this.releaseSkill101 = true;
                this.releaseSkill102 = this.releaseSkill103 = this.releaseSkill104 = false;
            }
            else if (curItem.skillId == 102) {
                this.releaseSkill101 = this.releaseSkill103 = this.releaseSkill104 = false;
                this.releaseSkill102 = true;
            }
        }
        console.log("触发了技能----" + skillId);
    };
    /**展示关卡显示文字 */
    GameMainView.prototype.showLevelTxt = function (cb, txtstr) {
        var txt = new eui.Label();
        this.addChild(txt);
        txt.fontFamily = "yt";
        txt.size = 30;
        var levelstr = egret.localStorage.getItem(LocalStorageEnum.LEVEL);
        var level = levelstr ? parseInt(levelstr) : 1;
        // txt.text = `d${txtstr?txtstr:level}${txtstr?"b":"g"}`;
        txt.textFlow = new egret.HtmlTextParser().parse("\u7B2C<font color=0xffff00>" + (txtstr ? txtstr : level) + "</font>" + (txtstr ? "波" : "关"));
        txt.x = (StageUtils.inst().getWidth() >> 1) - (txt.width >> 1) - 200;
        txt.y = (StageUtils.inst().getHeight() >> 1);
        txt.alpha = 0;
        txt.scaleX = txt.scaleY = 0;
        egret.Tween.get(txt).to({ alpha: 1, scaleX: 2, scaleY: 2, x: txt.x + 200 }, 1000, egret.Ease.circOut).wait(500).to({ alpha: 0, scaleX: 0, scaleY: 0, x: txt.x + 600 }, 1000, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(txt);
            txt.parent.removeChild(txt);
            cb();
        }, this);
    };
    GameMainView.prototype.close = function () {
        this.removeTouchEvent(this.settingBtn, this.onSetHandler);
        this.removeTouchEvent(this.upgradeBtn, this.onUpgrade);
        MessageManager.inst().removeListener("start", this.onStart, this);
        MessageManager.inst().removeListener("end", this.onStop, this);
        MessageManager.inst().removeListener("closeMain", this.onCloseMain, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onEnd, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEnd, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        StageUtils.inst().getStage().removeEventListener(StartGameEvent.CLICK_GUIDE_SKILL, this.onClickGuideSkill, this);
        StageUtils.inst().getStage().removeEventListener(StartGameEvent.USE_GUIDE_SKILL, this.onUseGuideSkill, this);
        this.awardBox.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardGet, this);
        MessageManager.inst().removeListener(CustomEvt.BOSS_RELEASESKILL, this.onBossReleaseSkill, this);
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