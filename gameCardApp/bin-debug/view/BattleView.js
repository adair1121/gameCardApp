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
var BattleView = (function (_super) {
    __extends(BattleView, _super);
    function BattleView() {
        var _this = _super.call(this) || this;
        _this.row = 7;
        _this.col = 4;
        _this._singleFrame = 33.3;
        _this._curTime = 0;
        _this.actionExecStandTime = 2000;
        return _this;
    }
    BattleView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.alpha = 0;
        this.addMainCom(null, false);
        this._centerX = StageUtils.ins().getWidth() >> 1;
        this._centerY = StageUtils.ins().getHeight() >> 1;
        this._ownEntitys = [];
        this._levelEntitys = [];
        this._entitys = [];
        if (param && param.length && param[0].level) {
            this._levelCfg = LevelCfg.levelCfg[param[0].level - 1];
        }
        this.bg.source = "battle_bg_" + this._levelCfg.level + "_png";
        this.levelNameLab.source = this._levelCfg.campaigName;
        this.roleName.text = this._levelCfg.name;
        this.jobName.source = "title_job_" + this._levelCfg.job + "_png";
        this.headIcon.source = this._levelCfg.headIcon;
        this.curhp = this.totalHp = this._levelCfg.soldierEnum.length * 10 * 100;
        this.hpNumLab.text = this.curhp + "/" + this.totalHp;
        this.hpBar.mask = this.barMask;
        StageUtils.ins().getStage().addEventListener(StartGameEvent.GAMELOADINGEND, this.onLoadingEnd, this);
    };
    BattleView.prototype.onLoadingEnd = function () {
        var _this = this;
        var img = new eui.Image();
        this.addChild(img);
        img.horizontalCenter = 0;
        img.verticalCenter = 0;
        img.source = "start_lab_png";
        img.scaleX = img.scaleY = 2.2;
        this.alpha = 1;
        this.createEntity();
        egret.Tween.get(img).to({ scaleX: 1, scaleY: 1 }, 600, egret.Ease.circIn).to({ alpha: 0 }, 600).call(function () {
            egret.Tween.removeTweens(img);
            img.parent.removeChild(img);
            _this.initialize();
        }, this);
    };
    BattleView.prototype.createEntity = function () {
        this.createLevelGroup(1);
        this.createLevelGroup(0);
        // if(!this.levelGeneralGroup){
        // 	this.levelGeneralGroup = new eui.Group();
        // 	this.addChild(this.levelGeneralGroup);
        // }
        var levelGeneral = new SoldierEntity();
        levelGeneral.setSoldierData(0, "general_1", 50, 130, -1);
        levelGeneral.scaleX = levelGeneral.scaleY = 1.2;
        levelGeneral.hp = 800;
        this.addChild(levelGeneral);
        this._entitys.push(levelGeneral);
        this._levelEntitys.push(levelGeneral);
        // let levelMc:MovieClip = new MovieClip();
        // this.levelGeneralGroup.addChild(levelMc);
        // let res2:string = GlobalFun.getMainEntityRes(ActionEnum.stand)
        // levelMc.playFile(`${EFFECT}level/level_${this._levelCfg.level}_idle`,-1);
        // this._levelMc = levelMc;  
        levelGeneral.x = this._centerX + 100;
        levelGeneral.y = this._centerY + 30;
        // this.levelGeneralGroup.scaleX = this.levelGeneralGroup.scaleY = 0.6;
        // this.levelGeneralGroup.scaleX = -0.6;  
        // if(!this.ownGeneralGroup){
        // 	this.ownGeneralGroup = new eui.Group();
        // 	this.addChild(this.ownGeneralGroup);
        // }
        // this.ownGeneralGroup.scaleX = this.ownGeneralGroup.scaleY = 0.6;
        // let ownMc:MovieClip = new MovieClip();
        // this.ownGeneralGroup.addChild(ownMc);
        // this._ownMc = ownMc;
        // let res:string = GlobalFun.getMainEntityRes(ActionEnum.stand)
        // ownMc.playFile(`${EFFECT}${res}`,-1,null,null,DirectionEnum.RIGHT.toString());
        var ownGeneral = new SoldierEntity();
        ownGeneral.setSoldierData(0, "own_general", 50, 130, -1);
        ownGeneral.scaleX = ownGeneral.scaleY = 1.2;
        ownGeneral.hp = 800;
        this.addChild(ownGeneral);
        this._ownEntitys.push(ownGeneral);
        this._entitys.push(ownGeneral);
        ownGeneral.x = this._centerX - 100;
        ownGeneral.y = this._centerY + 30;
    };
    /**初始化 */
    BattleView.prototype.initialize = function () {
        this._curTime = 0;
        // let self = this;
        // let timeout = setTimeout(()=>{
        // 	clearTimeout(timeout);
        // 	let index:number = (Math.random()*100)>>0;
        // 	let atkTar:SoldierRect;
        // 	let damageTar:SoldierRect;
        // 	let camp:number = 1;
        // 	if(index <= 50){//己方先手camp = 1;
        // 	}else{//敌方先手
        // 		camp = -1;
        // 	}
        // 	self.loopAtk(camp)
        // },1500)
        egret.startTick(this.actionExec, this);
    };
    /**动作执行 */
    BattleView.prototype.actionExec = function (timespan) {
        this._curTime += this._singleFrame;
        if (this._curTime >= this.actionExecStandTime) {
            this._curTime = 0;
            this.action(1);
            this.action(0);
        }
        return false;
    };
    BattleView.prototype.action = function (camp) {
        var ownEntitys = camp == 1 ? this._ownEntitys : this._levelEntitys;
        var levelEntitys = camp == 1 ? this._levelEntitys : this._ownEntitys;
        for (var i = 0; i < ownEntitys.length; i++) {
            var item = ownEntitys[i];
            if (item.isDead) {
                for (var j = 0; j < this._entitys.length; j++) {
                    if (this._entitys[j] == item) {
                        this._entitys.splice(j, 1);
                        break;
                    }
                }
                item.dispose();
                ownEntitys.splice(i, 1);
                i -= 1;
                continue;
            }
            else {
                var index = (Math.random() * levelEntitys.length) >> 0;
                var atkItem = void 0;
                if (!item.atkTar) {
                    atkItem = levelEntitys[index];
                }
                else {
                    atkItem = this.getNearByEntity(item, levelEntitys);
                }
                item.lookAt(atkItem);
                if (item.isInAtkDis()) {
                    //在攻击距离
                    item.execAtkAction();
                }
                else {
                    item.execMoveAction();
                }
            }
        }
        this.dealLayerRelation();
        if (!ownEntitys.length || !levelEntitys.length) {
            egret.stopTick(this.actionExec, this);
            for (var i = 0; i < this._entitys.length; i++) {
                this._entitys[i].execStandAction();
            }
            if (this._ownEntitys.length) {
                //胜利
                this.battleWin();
            }
            else {
                this.battleFail();
            }
        }
    };
    /**获取最近攻击单位 */
    BattleView.prototype.getNearByEntity = function (atkEntity, soldiers) {
        var minEntity = null;
        for (var i = 0; i < soldiers.length; i++) {
            var item = soldiers[i];
            var dis = Math.sqrt(Math.pow(item.x - atkEntity.x, 2) + Math.pow(item.y - atkEntity.y, 2));
            var item1 = soldiers[i + 1];
            if (item1) {
                var dis2 = Math.sqrt(Math.pow(item1.x - atkEntity.x, 2) + Math.pow(item1.y - atkEntity.y, 2));
                minEntity = dis <= dis2 ? item : item1;
            }
        }
        if (soldiers.length && !minEntity) {
            minEntity = soldiers[0];
        }
        return minEntity;
    };
    /**处理层级显示关系 */
    BattleView.prototype.dealLayerRelation = function () {
        var minEntity = null;
        this._entitys.sort(this.sortFun);
        for (var i = 0; i < this._entitys.length; i++) {
            this.setChildIndex(this._entitys[i], 4 + i);
        }
    };
    BattleView.prototype.sortFun = function (param1, param2) {
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
    //战斗失败处理
    BattleView.prototype.battleFail = function () {
        ViewManager.ins().open(ResultPopUp, [{ state: 0, cb: this.onReset, arg: this }]);
    };
    //战斗成功处理
    BattleView.prototype.battleWin = function () {
        ViewManager.ins().open(ResultPopUp, [{ state: 1, cb: this.onClose, arg: this }]);
    };
    BattleView.prototype.onReset = function (num) {
        if (num) {
            this.roleHeadCom.resetHp();
            this.clear();
            this.onLoadingEnd();
        }
        else {
            this.onClose();
        }
    };
    BattleView.prototype.onClose = function () {
        StageUtils.ins().getStage().removeEventListener(StartGameEvent.GAMELOADINGEND, this.onLoadingEnd, this);
        ViewManager.ins().open(GameLoadingUI, [{ closeCls: BattleView }]);
    };
    //生成陨石天降
    BattleView.prototype.createStone = function () {
        var curX = (Math.random() * 200 + (this._centerX + 150)) >> 0;
        var curY = -100;
        var tarX = (Math.random() * 300 + (this._centerX - 400)) >> 0;
        var tarY = (Math.random() * (StageUtils.ins().getHeight() - 200) + 200) >> 0;
        var stoneItem = new SkillStone("stone_png", tarX, tarY, curX, curY);
        this.addChild(stoneItem);
    };
    //生成火焰箭矢
    BattleView.prototype.createFireArrow = function (camp) {
        var curx = -((Math.random() * 150) >> 0);
        var tarx = (Math.random() * 300 + (curx + this._centerX + 130)) >> 0;
        var tary = (Math.random() * (StageUtils.ins().getHeight() - 300) + 100) >> 0;
        var curY = this._centerY;
        var attackitem = new AttackItem("arrow_png", tarx, tary, curx, curY, camp);
        this.addChild(attackitem);
        attackitem.doTween();
    };
    /**创建战役关卡组数据 */
    BattleView.prototype.createLevelGroup = function (camp) {
        var soldierResObj = GlobalFun.getSoldierRes(camp);
        var col = this.col;
        var row = this.row;
        var index = 4;
        if (soldierResObj.id == SoldierType.SOLDIER_TOUSHICHE) {
            col = 1;
        }
        else {
            if (camp == 1) {
                //创建我自己的阵容 。需要根据拥有的将领
                col *= GameApp.ownGeneralNum;
            }
            else {
                col *= ((this._levelCfg.level / 3) >> 0) + 1;
            }
        }
        for (var j = 0; j < col; j++) {
            if (j % this.col == 0) {
                soldierResObj = GlobalFun.getSoldierRes(camp);
            }
            if (soldierResObj.id == SoldierType.SOLDIER_TOUSHICHE) {
                col = 1;
            }
            else {
                if (camp == 1) {
                    //创建我自己的阵容 。需要根据拥有的将领
                    col *= GameApp.ownGeneralNum;
                }
                else {
                    col *= ((this._levelCfg.level / 3) >> 0) + 1;
                }
            }
            for (var i = 0; i < row; i++) {
                var soldier = new SoldierEntity();
                soldier.setSoldierData(camp, soldierResObj.res, soldierResObj.dist, soldierResObj.speed, soldierResObj.id);
                index += 1;
                this.addChildAt(soldier, index);
                var scale = soldierResObj.id == SoldierType.SOLDIER_QI ? 0.5 : 0.7;
                var direct = camp == 1 ? 1 : -1;
                soldier.x = this._centerX - 200 * direct - (j * (soldierResObj.wh.w * scale - 10)) * direct;
                soldier.y = this._centerY - 100 + i * (soldierResObj.wh.h * scale - 10);
                camp == 1 ? this._ownEntitys.push(soldier) : this._levelEntitys.push(soldier);
                this._entitys.push(soldier);
            }
        }
    };
    BattleView.prototype.clear = function () {
        this._levelEntitys = [];
        this._ownEntitys = [];
        for (var i = 0; i < this._entitys.length; i++) {
            if (this._entitys[i] && this._entitys[i].parent) {
                this._entitys[i].parent.removeChild(this._entitys[i]);
            }
        }
        this._entitys = [];
    };
    BattleView.prototype.close = function () {
        this.clear();
    };
    return BattleView;
}(BaseEuiView));
__reflect(BattleView.prototype, "BattleView");
ViewManager.ins().reg(BattleView, LayerManager.UI_Main);
//# sourceMappingURL=BattleView.js.map