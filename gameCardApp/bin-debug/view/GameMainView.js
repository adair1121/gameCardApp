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
        _this.trainUnlockJob = 1;
        return _this;
    }
    GameMainView.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.alpha = 0;
        /**提前加载 */
        MapView.ins().initMap();
        EntityManager.ins().init();
        MapView.ins().refrehMapViewPort();
        //--------------
        var role_job = egret.localStorage.getItem(LocalStorageEnum.ROLE_JOB);
        var cityNpc = new MovieClip();
        this.npc_city.addChild(cityNpc);
        var cityTitle = new eui.Image();
        this.npc_city.addChild(cityTitle);
        var city_mark = new MovieClip();
        this.npc_city.addChild(city_mark);
        city_mark.scaleX = city_mark.scaleY = 0.6;
        city_mark.visible = false;
        this.cityMark = city_mark;
        cityTitle.horizontalCenter = 0;
        cityTitle.top = -60;
        cityTitle.source = "npc_city_title_png";
        var self = this;
        cityNpc.playFile(EFFECT + "npc_city", -1, null, false, "", function () {
            cityNpc.x = self.npc_city.width >> 1;
            cityNpc.y = self.npc_city.height >> 1;
            city_mark.x = cityNpc.x;
            city_mark.y = cityNpc.y - 120;
        });
        var answerNpc = new MovieClip();
        this.npc_answer.addChild(answerNpc);
        var answer_mark = new MovieClip();
        this.npc_answer.addChild(answer_mark);
        answer_mark.scaleX = answer_mark.scaleY = 0.6;
        answer_mark.stop();
        answer_mark.visible = false;
        this.answerMark = answer_mark;
        var answerTitle = new eui.Image();
        this.npc_answer.addChild(answerTitle);
        answerTitle.horizontalCenter = 0;
        answerTitle.top = -60;
        answerTitle.source = "npc_answer_title_png";
        answerNpc.playFile(EFFECT + "npc_answer", -1, null, false, "", function () {
            answerNpc.x = self.npc_answer.width >> 1;
            answerNpc.y = self.npc_answer.height >> 1;
            answer_mark.x = answerNpc.x;
            answer_mark.y = answerNpc.y - 120;
        });
        var generalNpc = new MovieClip();
        this.npc_general.addChild(generalNpc);
        var general_mark = new MovieClip();
        this.npc_general.addChild(general_mark);
        general_mark.scaleX = general_mark.scaleY = 0.6;
        general_mark.visible = false;
        this.generalMark = general_mark;
        var generalTitle = new eui.Image();
        this.npc_general.addChild(generalTitle);
        generalTitle.horizontalCenter = 0;
        generalTitle.top = -40;
        generalTitle.source = "npc_general_title_png";
        generalNpc.playFile(EFFECT + "npc_general", -1, null, false, "", function () {
            generalNpc.x = self.npc_general.width >> 1;
            generalNpc.y = self.npc_general.height >> 1;
            general_mark.x = generalNpc.x;
            general_mark.y = generalNpc.y - 100;
        });
        var flag_left = new MovieClip();
        flag_left.x = 8;
        flag_left.y = 20;
        this.flagLeftGroup.addChild(flag_left);
        flag_left.playFile(EFFECT + "flag", -1);
        var flag_right = new MovieClip();
        flag_right.x = 8;
        flag_right.y = 20;
        this.flagRightGroup.addChild(flag_right);
        flag_right.playFile(EFFECT + "flag", -1);
        egret.Tween.get(this).to({ alpha: 1 }, 1000, egret.Ease.circIn).call(function () {
            egret.Tween.removeTweens(_this);
            _this.addMainCom();
            egret.Tween.get(_this.outBtn).to({ top: 20 }, 600, egret.Ease.circOut).call(function () {
                egret.Tween.removeTweens(_this.outBtn);
            }, _this);
            egret.Tween.get(_this.battleBtn).to({ bottom: 10 }, 600, egret.Ease.circOut).call(function () {
                egret.Tween.removeTweens(_this.battleBtn);
            }, _this);
            if (!role_job) {
                ViewManager.ins().open(SelectWayPopUp, [{ cb: _this.selectCall, arg: _this }]);
            }
        }, this);
        // this.createShowSoldierGroup({left:150},`${EFFROLESHOW}show_soldier_1`,-15,0);
        // this.createShowSoldierGroup({left:120,top:550},`${EFFROLESHOW}show_soldier_1`,-15,1);
        // this.createShowSoldierGroup({horizontalCenter:-50},`${EFFROLESHOW}show_soldier_2`,0,2);
        // this.createShowSoldierGroup({horizontalCenter:-50,top:550},`${EFFROLESHOW}show_soldier_2`,0,3);
        // this.createShowSoldierGroup({right:260},`${EFFROLESHOW}show_soldier_1`,15,4,-1);
        // this.createShowSoldierGroup({right:240,top:550},`${EFFROLESHOW}show_soldier_1`,15,5,-1);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.addTouchEvent(this.battleBtn, this.onBattle, true);
        this.addTouchEvent(this.outBtn, this.onOut, true);
        eui.Binding.bindHandler(GameApp.ins(), ["role_gold"], this.onGoldChage, this);
        eui.Binding.bindHandler(GameApp.ins(), ["role_job"], this.jobChange, this);
        eui.Binding.bindHandler(GameApp.ins(), ["curExp"], this.onExpChange, this);
    };
    GameMainView.prototype.onExpChange = function (value) {
        if (!this.cityMark) {
            return;
        }
        ;
        var needGold = (GameApp.ins().role_job + 1) * 300;
        if (value >= GameApp.ins().curLevelMaxExp && (GameApp.ins().role_gold >= needGold)) {
            //当前经验大于了当前升级所需总经验 && 元宝足够
            this.cityMark.playFile(EFFECT + "point", -1);
            this.cityMark.visible = true;
        }
        else {
            this.cityMark.stop();
            this.cityMark.visible = false;
        }
    };
    GameMainView.prototype.jobChange = function (value) {
        if (!this.generalMark) {
            return;
        }
        ;
        var trainState = egret.localStorage.getItem(LocalStorageEnum.TRAIN_STATE);
        if (value >= this.trainUnlockJob && (GameApp.ins().role_gold >= 200) && (!trainState)) {
            //职业达到武将解锁 && 拥有练兵需要的金钱 && 没有在练兵状态
            this.generalMark.playFile(EFFECT + "point", -1);
            this.generalMark.visible = true;
        }
    };
    GameMainView.prototype.onGoldChage = function (value) {
        if (value >= 200) {
            if (this.answerMark) {
                this.answerMark.playFile(EFFECT + "point", -1);
                this.answerMark.visible = true;
            }
            var trainState = egret.localStorage.getItem(LocalStorageEnum.TRAIN_STATE);
            if (this.generalMark && GameApp.ins().role_job >= this.trainUnlockJob && (!trainState)) {
                //当前职业达到解锁职业 。&& 没有处于练兵状态
                this.generalMark.playFile(EFFECT + "point", -1);
                this.generalMark.visible = true;
            }
            else {
                if (this.generalMark) {
                    this.generalMark.stop();
                    this.generalMark.visible = false;
                }
            }
        }
        else {
            if (this.answerMark) {
                this.answerMark.stop();
                this.answerMark.visible = false;
            }
            if (this.generalMark) {
                this.generalMark.stop();
                this.generalMark.visible = false;
            }
        }
        var needGold = (GameApp.ins().role_job + 1) * 300;
        if (this.cityMark && GameApp.ins().curExp >= GameApp.ins().curLevelMaxExp && (value >= needGold)) {
            //当前经验足够 && 元宝也足够了 。可以提升
            this.cityMark.playFile(EFFECT + "point", -1);
            this.cityMark.visible = true;
        }
        else {
            if (this.cityMark) {
                this.cityMark.stop();
                this.cityMark.visible = false;
            }
        }
    };
    // private createShowSoldierGroup(attr:any,res:string,offset:number,index:number,scaleX:number = 1):void{
    // 	let soldierRect:TrainingItemRect = new TrainingItemRect(offset,res,5,2,2,scaleX);
    // 	this.addChildAt(soldierRect,4+index);
    // 	soldierRect.top = 420;
    // 	for(let key in attr){
    // 		soldierRect[key] = attr[key];
    // 	}
    // }
    GameMainView.prototype.onBattle = function () { };
    GameMainView.prototype.onOut = function () { };
    GameMainView.prototype.refreshPage = function () {
        var _this = this;
        egret.Tween.get(this).to({ alpha: 1 }, 1000, egret.Ease.circIn).call(function () {
            _this.touchEnabled = true;
            egret.Tween.removeTweens(_this);
        }, this);
    };
    GameMainView.prototype.onTouchTap = function (evt) {
        var _this = this;
        switch (evt.target) {
            case this.npc_city:
                ViewManager.ins().open(SelectWayPopUp);
                break;
            case this.npc_answer:
            case this.npc_general:
                var roleJob = egret.localStorage.getItem(LocalStorageEnum.ROLE_JOB);
                if (!roleJob) {
                    UserTips.ins().showTips("请先参军，再进行答题");
                    return;
                }
                if (evt.target == this.npc_answer) {
                    ViewManager.ins().open(AnswerPopUp);
                }
                else if (evt.target == this.npc_general) {
                    //点击了武将
                    if (parseInt(roleJob) < this.trainUnlockJob) {
                        UserTips.ins().showTips("\u664B\u5347-<font color=0xfc3434>" + GameApp.jobCfg[this.trainUnlockJob] + "</font>\u5F00\u542F\u7EC3\u5175");
                        return;
                    }
                    var trainState = egret.localStorage.getItem(LocalStorageEnum.TRAIN_STATE);
                    if (trainState) {
                        ViewManager.ins().open(TrainingShowView);
                    }
                    else {
                        egret.localStorage.setItem(LocalStorageEnum.TRAIN_STATE, "true");
                        ViewManager.ins().open(TrainingPopUp);
                    }
                }
                break;
            case this.outBtn:
                this.touchEnabled = false;
                ViewManager.ins().open(CollectView);
                egret.Tween.get(this).to({ alpha: 0 }, 1000, egret.Ease.circIn).call(function () {
                    egret.Tween.removeTweens(_this);
                }, this);
                break;
            case this.battleBtn:
                // this.touchEnabled = false;
                //点击了战役按钮
                ViewManager.ins().open(LevelSelectView);
                break;
        }
    };
    /**选择方式返回 */
    GameMainView.prototype.selectCall = function () {
    };
    GameMainView.prototype.close = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.removeTouchEvent(this.battleBtn, this.onBattle);
        this.removeTouchEvent(this.outBtn, this.onOut);
    };
    return GameMainView;
}(BaseEuiView));
__reflect(GameMainView.prototype, "GameMainView");
ViewManager.ins().reg(GameMainView, LayerManager.UI_Main);
//# sourceMappingURL=GameMainView.js.map