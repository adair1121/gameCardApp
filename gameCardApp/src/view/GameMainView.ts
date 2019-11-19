class GameMainView extends BaseEuiView{

	private awardBox:eui.Group;
	private boxLab:eui.Label;
	private settingBtn:eui.Image;
	private scroller:eui.Scroller;
	private list:eui.List;
	private arraycollect:eui.ArrayCollection;
	private guideView:GuideView;
	private goldLab:eui.Label;
	private gemLab:eui.Label;

	//十分钟 时间戳  ms
	private awardBoxGetTime = 10*60*1000;
	private totalGetCount:number = 3;
	//宝箱领取金币
	private goldGetNum:number = 50;

	private timer:egret.Timer;

	private goldWatcher:eui.Watcher;
	private gemWatcher:eui.Watcher;
	private addGoldBtn:eui.Image;
	private addGemBtn:eui.Image;

	private upgradeBtn:eui.Image;
	private levelNumLab:eui.Label;
	private countNumLab:eui.Label;

	//当前波数
	private curCount:number = 1;
	//当前关卡总波数
	private totalCount:number = 1;

	private descLab:eui.Label;

	private clickRect:eui.Rect;

	private _entitys:SoldierEntity[] = [];
	private _ownEntitys:SoldierEntity[] = [];
	private _levelEntitys:SoldierEntity[] = [];
	private _singleFrame:number = 33.3;
	private _curTime:number = 0;
	private actionExecStandTime:number = 1000;
	private totalHp:number;
	private curHp:number;

	private progressMark:eui.Rect;
	private progressBar:eui.Image;
	private blood:eui.Image;
	private showBlood:boolean = false;
	private pos1:eui.Rect;
	private pos2:eui.Rect;
	private upred:eui.Image;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.alpha = 0;
		this._entitys = [];
		this._ownEntitys = [];
		this._levelEntitys = [];
		this.pos1["autoSize"]();
		this.pos2["autoSize"]();
		for(let i:number = 1;i<=5;i++){
			let skill1Level:string = egret.localStorage.getItem(LocalStorageEnum.SKILL_LEVEL+(100+i))
			if(!skill1Level){
				egret.localStorage.setItem(LocalStorageEnum.SKILL_LEVEL+(100+i),"1");
			}
		}
		let skillCfg:string = egret.localStorage.getItem(LocalStorageEnum.REBORNCFG);
		if(!!skillCfg){
			GameApp.skillCfg = JSON.parse(skillCfg);
		}
		let arr:any[] = [];
		arr = arr.concat(SkillCfg.skillCfg);
		let boo2:boolean = GameApp.skillCfg?true:false;
		if(!boo2){
			GameApp.skillCfg = {};
			for(let i:number = 0;i<arr.length;i++){
				GameApp.skillCfg[arr[i].skillId] = arr[i];
			}
			for(let i:number = 0;i<10;i++){
				let item:any = {skillId:1000+i,rebornId:1,skillIcon:"skill_103_png",skillTitle:"skill_103_title_png",level:1,desc:"神将",atk:50,hp:500,atkDis:100,cost:100,skillType:1};
				if(!GameApp.skillCfg[item.skillId]){
					GameApp.skillCfg[item.skillId] = item;
				}
			}
		}
		this.clickRect["autoSize"]();
		this.progressBar.mask = this.progressMark;
		this.totalHp = this.curHp = 50*GameApp.level + 500;
		this.touchEnabled = false;
		this.touchChildren = false;
		this.addTouchEvent(this.settingBtn,this.onSetHandler,true);
		this.arraycollect = new eui.ArrayCollection();
		this.list.itemRenderer = SkilItem;
		this.list.dataProvider = this.arraycollect;
		this.scroller.viewport = this.list;
		let data:any[] = SkillCfg.skillCfg;
		this.arraycollect.source = data;
		this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		StageUtils.inst().getStage().addEventListener(StartGameEvent.CLICK_GUIDE_SKILL,this.onClickGuideSkill,this);
		StageUtils.inst().getStage().addEventListener(StartGameEvent.USE_GUIDE_SKILL,this.onUseGuideSkill,this);
		this.awardBox.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRewardGet,this);
		this.timer = new egret.Timer(1000);
		this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);

		this.refreshRewardBoxState();
		let boo:boolean = this.changeTime();
		if(boo){
			this.timer.start();
		}

		this.goldWatcher = eui.Binding.bindHandler(GameApp,["roleGold"],this.roleGoldChange,this);
		this.gemWatcher = eui.Binding.bindHandler(GameApp,["roleGem"],this.roleGemChange,this);

		this.addTouchEvent(this.addGemBtn,this.onaddGem,true);
		this.addTouchEvent(this.addGoldBtn,this.onaddGold,true);
		this.addTouchEvent(this.upgradeBtn,this.onUpgrade,true);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this);
		this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
		this.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd,this);
		this.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onEnd,this);
		this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onEnd,this);
		MessageManager.inst().addListener(CustomEvt.REDUCE_HP,this.onTowerHpReduce,this);
		MessageManager.inst().addListener(CustomEvt.BOSS_RELEASESKILL,this.onBossReleaseSkill,this);
		this.blood.visible = false;
		eui.Binding.bindHandler(GameApp,["level"],this.onLevelChange,this);
		this.descLab.visible = false;
		this.descLab.alpha = 0;
		this.createLevelMonster();
		
		// 
	}
	private skill102:eui.Image;
	private beginPoint:egret.Point;
	private interval;
	private onBegin(evt:egret.TouchEvent):void{
		if(this.releaseSkill102 && evt.target == this.clickRect){
			let self = this;
			this.beginPoint = new egret.Point(evt.stageX,evt.stageY)
			this.skill102 = new eui.Image("skill_102_pic_png");
			this.addChild(this.skill102);
			this.skill102.scaleX = this.skill102.scaleY = 0.5;
			this.skill102.anchorOffsetX = this.skill102.width>>1;
			this.skill102.anchorOffsetY = this.skill102.height>>1;
			this.skill102.x = evt.stageX;
			this.skill102.y = evt.stageY;
			GlobalFun.lighting(this.skill102,0xF41AE3)
			this.interval = setInterval(()=>{
				for(let i:number = 0;i<this._levelEntitys.length;i++){
					let dis:number = egret.Point.distance(new egret.Point(this._levelEntitys[i].x,this._levelEntitys[i].y),new egret.Point(this.skill102.x,this.skill102.y));
					if(dis <= 100){
						this._levelEntitys[i].reduceHp(GameApp.skillCfg[102].atk);
					}
				}
			},150)
		}
	}
	private onEnd(evt:egret.TouchEvent):void{
		if(this.skill102){
			if(this.interval){clearInterval(this.interval)}
			this.skill102.parent.removeChild(this.skill102);
			this.skill102 = null;
		}
	}
	private onMove(evt:egret.TouchEvent):void{
		if(this.skill102){
			this.skill102.x = evt.stageX;
			this.skill102.y = evt.stageY;
			let angle:number = Math.atan2(evt.stageY - this.beginPoint.y,evt.stageX - this.beginPoint.x)*180/Math.PI;
			let rotation:number = 0;
			if((angle >= -30 && angle <= 0 ) || (angle >0 && angle <= 30)){
				rotation = 0;
			}else if(angle > 30 && angle <= 70){
				rotation = 45;
			}else if((angle > 70 && angle <= 120)){
				rotation = 90;
			}else if(angle >120 && angle <= 150){
				rotation = 135;
			}else if((angle > 150 && angle <= 180) || (angle > -180 && angle <= -150)){
				rotation = 180;
			}else if(angle > -150 && angle <= - 120){
				rotation = 225;
			}else if(angle > -120 && angle<= -70){
				rotation = -90;
			}else{
				rotation = -45;
			}
			this.skill102.rotation = rotation;
			this.beginPoint.x = evt.stageX;
			this.beginPoint.y = evt.stageY;
			
		}
	}
	private onBossReleaseSkill():void{
		let index:number = ((Math.random()*9+1)>>0);
		let xy:XY = {x:this._levelEntitys[0].x,y:this._levelEntitys[0].y};
		GlobalFun.createSkillEff(-1,index,this,2,xy);
		for(let i:number = 0; i< this._ownEntitys.length;i++){
			let dmg:number = (GameApp.level)*((Math.random()*50)>>0);
			this._ownEntitys[i].reduceHp(dmg);
		}
		let dmg:number = (GameApp.level )*((Math.random()*50)>>0);
		this.curHp -= dmg
		this.onTowerHpReduce({data:{hp:dmg}})
	}
	private onTowerHpReduce(evt:any):void{
		this.curHp -= evt.data.hp;
		if(this.curHp <= 0){
			this.curHp = 0;
			this.gameFail();
		}
		if(!this.showBlood){
			this.showBlood = true;
			this.blood.visible = true;
			this.blood.alpha = 0;
			egret.Tween.get(this.blood).to({alpha:1},600).to({alpha:0},600).to({alpha:1},600).to({alpha:0},600).call(()=>{
				egret.Tween.removeTweens(this.blood);
				this.blood.visible = false;
				this.showBlood = false;
			},this)
		}
		this.showDmg(evt.data.hp);
		this.progressMark.width = this.curHp/this.totalHp*277;
	}
	private showDmg(dmg:number):void{
		let dmgfont:eui.BitmapLabel = new eui.BitmapLabel();
		dmgfont.scaleX = dmgfont.scaleY = 0.7;
		dmgfont.font = "dmg_fnt";
		this.addChild(dmgfont);
		dmgfont.text = "-"+dmg;
		dmgfont.bottom = 80;
		dmgfont.right = 150 + ((Math.random()*50)>>0);
		egret.Tween.get(dmgfont).to({bottom:dmgfont.bottom+100},600+((Math.random()*400)>>0),egret.Ease.circIn).call(()=>{
			egret.Tween.removeTweens(dmgfont);
			if(dmgfont && dmgfont.parent){
				dmgfont.parent.removeChild(dmgfont);
			}
		},this)
	}
	private gameFail():void{
		egret.stopTick(this.execAction,this);
		this.timer.stop();
		this.curReborns = null;
		ViewManager.inst().open(BattleResultPopUp,[{state:0,cb:this.gameEnd,arg:this}])
		console.log("游戏结束")
	}
	private gameWin():void{
		egret.stopTick(this.execAction,this);
		this.timer.stop();
	}
	private gameEnd(param):void{
		this.curReborns = null;
		this.rebornids = ["1000","1001","1002","1003","1004","1005","1006","1007","1008","1009"];
		if(param == BattleResultPopUp.OPER_EXIT){
			ViewManager.inst().close(GameMainView);
			ViewManager.inst().open(StartGameView);
		}else if(param == BattleResultPopUp.OPER_CONTINUE){
			this.reset();
		}else if(param == BattleResultPopUp.OPER_NEXT){
			let self = this;
			GameApp.level += 1;
			for(let i:number = 0;i<this._ownEntitys.length;i++){
				if(this._ownEntitys[i]&& this._ownEntitys[i].parent){
					this._ownEntitys[i].dispose();
				}
			}
			this._entitys = [];
			this._ownEntitys = [];
			this._levelEntitys = [];
			let skillItem:SkilItem = this.list.getChildAt(2) as SkilItem;
			skillItem.num = 10;
			let timeout = setTimeout(function() {
				clearTimeout(timeout);
				self.showLevelTxt(()=>{
					self.createLevelMonster();
					egret.startTick(self.execAction,self);
				})
			}, 1200);
		}
	}
	private reset():void{
		for(let i:number = 0;i<this._entitys.length;i++){
			if(this._entitys[i] && this._entitys[i].parent){
				this._entitys[i].parent.removeChild(this._entitys[i]);
			}
		}
		this.rebornids = ["1000","1001","1002","1003","1004","1005","1006","1007","1008","1009"];
		this.curReborns = null;
		this._entitys = [];
		this._ownEntitys = [];
		this._levelEntitys = [];
		this.totalHp = this.curHp = 50*GameApp.level + 500;
		this.touchEnabled = false;
		this.touchChildren = false;
		this.refreshRewardBoxState();
		let boo:boolean = this.changeTime();
		if(boo){
			this.timer.start();
		}
		this.blood.visible = false;
		this.descLab.visible = false;
		this.descLab.alpha = 0;
		this.createLevelMonster();
		this.initialize();
	}
	/**创建关卡怪物 */
	private createLevelMonster(cx?:number):void{
		let count:number = ((GameApp.level/5)>>0) + 1;
		let centery:number = this.clickRect.y + 150;
		let centerx:number = -300;
		for(let i:number = 0;i<count;i++){
			let shapIndex:number = (Math.random()*7)>>0;
			let monsterCfg:CardVo[] = GlobalFun.getMonsterCfg();
			let index:number = (Math.random()*monsterCfg.length)>>0;
			if(GameApp.level <= 11){
				index = GameApp.level;
			}
			let monsterVo:CardVo = monsterCfg[index];
			monsterVo.atk = 2*GameApp.level + 18 + (2*GameApp.level + 18)*0.2*this.direct();
			monsterVo.hp = 10*GameApp.level + 90 + (10*GameApp.level + 90)*0.2*this.direct();
			SoldierShapeEntity.inst().initData(shapIndex,monsterVo.model,monsterVo.id,this,{x:centerx,y:centery},(arr)=>{
				this._levelEntitys = this._levelEntitys.concat(arr);
				this._entitys = this._entitys.concat(arr);
			},this)

			let boss:SoldierEntity = new SoldierEntity();
			this.addChild(boss);		
			boss.general = true;
			let bossCfgs:CardVo[] = GlobalFun.getBossCfg();
			let bossIndex:number = (Math.random()*bossCfgs.length)>>0;
			if(GameApp.level <= 9){
				bossIndex = GameApp.level -1;
			}
			centerx -= 230;
			let bossVo:CardVo = bossCfgs[bossIndex];
			bossVo.atk = 5*GameApp.level + 45 + (5*GameApp.level + 45)*0.2*this.direct();
			bossVo.hp = 30*GameApp.level + 270 + this.direct()*(30*GameApp.level + 270)*0.2;
			boss.setSoldierData(-1,bossVo.model,bossVo);
			this._levelEntitys.push(boss);
			this._entitys.push(boss);
			boss.y = this.clickRect.y + (this.clickRect.height>>1);
			boss.x = centerx;
			centerx -= 650;
		}
		this.dealLayerRelation();
	}
	private direct():number{
		let index:number = (Math.random()*100)>>0;
		return index > 50?1:-1;
	}
	private curReborns:any;
	private rebornids:string[] = ["1000","1001","1002","1003","1004","1005","1006","1007","1008","1009"];
	/**创建我方神将 */
	private createOwnGenral(xy:XY):void{
		let soldierEntity:SoldierEntity = new SoldierEntity();
		// let rebornSkillId:number = 1000 + ((Math.random()*10)>>0);
		if(!this.curReborns || (this.curReborns && !this.curReborns.length)){
			this.curReborns = [];
			for(let key in GameApp.reborns){
				let index:number = this.rebornids.indexOf(key)
				if(index != -1){
					this.rebornids.splice(index,1);
					this.curReborns.push(GameApp.reborns[key]);
				}
			}
		}
		let rebornsId:number = 1;
		if(this.curReborns && this.curReborns.length){
			let rebornItem = this.curReborns.shift();
			rebornsId = rebornItem[0]
		}
		let skillres:string = `skill_103_${rebornsId}`;
		let cardVo:CardVo =GlobalFun.getSkillGeneralCfg(rebornsId);
		if(rebornsId == 2){
			cardVo.atkspd *=2;
		}else if(rebornsId == 3){
			cardVo.atk *=2;
			cardVo.hp *= 2;
		}else if(rebornsId == 4){
			cardVo.atk *= 4;
		}
		soldierEntity.setSoldierData(1,skillres,cardVo);
		this.addChild(soldierEntity);
		soldierEntity.alpha = 0;
		soldierEntity.x = xy.x;
		soldierEntity.y = xy.y;

		let birthEff:MovieClip = new MovieClip();
		this.addChild(birthEff);
		birthEff.scaleX = birthEff.scaleY = 0.8;
		birthEff.playFile(`${EFFECT}birth`,1,null,true);
		birthEff.x = xy.x;
		birthEff.y = xy.y;

		egret.Tween.get(soldierEntity).to({alpha:1},600,egret.Ease.circIn).call(()=>{
			this._ownEntitys.push(soldierEntity);
		    this._entitys.push(soldierEntity);
		},this)
		

	}
	private execAction(timespan:number):boolean{
		this._curTime += this._singleFrame;
		if(this._curTime >= this.actionExecStandTime){
			this._curTime = 0;
			this.action(1);
			this.action(-1);
		}
		return false;
	}
	private action(camp:number):void{
		let ownEntitys:SoldierEntity[] = camp ==1?this._ownEntitys:this._levelEntitys;
		let levelEntitys:SoldierEntity[] = camp == 1?this._levelEntitys:this._ownEntitys;
		for(let i:number = 0;i<ownEntitys.length;i++){
			let item:SoldierEntity = ownEntitys[i];
			if(item.isDead){
				for(let j:number = 0;j<this._entitys.length;j++){
					if(this._entitys[j] == item){
						this._entitys.splice(j,1);
						break;
					}
				}
				let deathMc:MovieClip = new MovieClip();
				this.addChild(deathMc);
				deathMc.x = item.x;
				deathMc.y = item.y;
				deathMc.playFile(`${EFFECT}death`,1);
				item.dispose();
				ownEntitys.splice(i,1);
				i-=1;
				continue;
			}else{
				let atkItem:any;
				atkItem = this.getNearByEntity(item,levelEntitys);
				item.lookAt(atkItem);
				if(item.isInAtkDis()){
					//在攻击距离
					console.log("进入攻击距离");
					item.execAtkAction();
				}else{
					if(!item.playState){
						if(item.atkTar && !item.atkTar.isDead && camp == 1){
							item.execMoveAction()
						}else{
							if(camp == -1){
								let xy:XY = {x:StageUtils.inst().getWidth() - 200,y:item.y}
								item.execMoveAction({x:xy.x,y:xy.y},()=>{
									//当前移动到了塔的附近 到达了攻击距离 //执行攻击
									item.isInAtk = true;
								},this);
							}else{
								item.execStandAction();
							}
						}
					}
					// if(this.checkXBlock(camp,item,ownEntitys)){
					// 	item.waitMoveAction();
					// }
				}
				
			}
		}
		if(this._levelEntitys.length <= 0){
			//当前波数战斗完毕 。进行下一波
			this.execNextCount();
			egret.stopTick(this.execAction,this);
		}
		this.dealLayerRelation();
	}
	private execNextCount():void{
		if(this.curCount >= this.totalCount){
			//当前波数也已经打完 进行下一关;
			egret.stopTick(this.execAction,this);
			this.curReborns = null;
			ViewManager.inst().open(BattleResultPopUp,[{state:1,cb:this.gameEnd,arg:this}])
		}else{
			//打下一波；
			this.curCount += 1;
			let self = this;
			this.curReborns = null;
			this.rebornids = ["1000","1001","1002","1003","1004","1005","1006","1007","1008","1009"];
			this.showLevelTxt(()=>{
				self.createLevelMonster();
				egret.startTick(this.execAction,this);
			},this.curCount)
		}
	}
	/**处理层级显示关系 */
	private dealLayerRelation():void{
		this._entitys.sort(this.sortFun);
		for(let i:number = 0;i<this._entitys.length;i++){
			this.setChildIndex(this._entitys[i],3+i);
		}
	}
	private sortFun(param1,param2):number{
		let s1y:number = param1.y;
		let s2y:number = param2.y;
		if(s1y > s2y){
			return 1;
		}else if(s1y < s2y){
			return -1;
		}else{
			return 0;
		}
	}
	/**检测X轴是否有阻挡 */
	private checkXBlock(camp:number,item:any,entitys:any[]):boolean{ 
		let x:number = item.x;
		let y:number = item.y;
		for(let i:number = 0;i<entitys.length;i++){
			let otherItem:any = entitys[i];
			if(item != otherItem){
				let ox:number = otherItem.x;
				let oy:number = otherItem.y;
				let contition:boolean = camp == -1  ?(ox - x <= 40 && ox - x>= 0):(x - ox <= 40 && x - ox>= 0)
				if(contition && Math.abs(oy - y) <= 10){
					return true
				}
			}
		}
		return false;
	}
	/**获取最近攻击单位 */
	private getNearByEntity(atkEntity:any,soldiers:any[]):any{
		let minEntity:any = soldiers.length > 1?soldiers[1]:soldiers[0]; //避免士兵第一个选择就是武将
		if(minEntity){
			let dis:number = Math.sqrt(Math.pow(minEntity.x - atkEntity.x,2)+Math.pow(minEntity.y -atkEntity.y,2));
			// let len:number = soldiers.length;
			// if(len >= 15){
			// 	len = 15;
			// }
			// let index:number = (Math.random()*len)>>0;
			// minEntity = soldiers[index];
			for(let i:number = 0;i<soldiers.length;i++){
				// if(atkEntity.general){
				// 	if(soldiers[i].general){
				// 		minEntity = soldiers[i];
				// 		break;
				// 	}
				// }
				let item1:any = soldiers[i];
				let dis2:number = Math.sqrt(Math.pow(item1.x - atkEntity.x,2)+Math.pow(item1.y -atkEntity.y,2));
				if(dis2 <= dis){
					minEntity = item1;
					dis = dis2;
				}
				
			}
		}
		return minEntity;
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		if(this.releaseSkill103 && evt.target == this.clickRect){
			//当前可以释放技人物;
			if((!this.curItem.num)){
				//神将已经召唤完毕
				UserTips.inst().showTips("已无更多的神将");	
			}else{
				this.createOwnGenral({x:evt.stageX,y:evt.stageY});
				this.curItem.num -= 1;
			}
		}else if(this.releaseSkill101 && evt.target == this.clickRect){
			let skillCfg:any = GameApp.skillCfg[101];
			let skillMc:MovieClip = new MovieClip();
			this.addChild(skillMc);
			skillMc.playFile(`${SKILL_EFF}skill_101`,1,null,true);
			skillMc.scaleX = skillMc.scaleY = 0.4;
			skillMc.x = evt.stageX;
			skillMc.y = evt.stageY;
			for(let i:number = 0;i<this._levelEntitys.length;i++){
				let dis:number = egret.Point.distance(new egret.Point(this._levelEntitys[i].x,this._levelEntitys[i].y),new egret.Point(evt.stageX,evt.stageY));
				if(dis <= 100){
					this._levelEntitys[i].reduceHp(skillCfg.atk)
				}
			}
		}else if(this.releaseSkill102 && evt.target == this.clickRect){


		}else if(this.releaseSkill104 && evt.target == this.clickRect){
			let skillCfg:any = GameApp.skillCfg[104];
			let mc:MovieClip = new MovieClip();
			this.addChild(mc);
			mc.x = this.pos1.x;
			mc.y = this.pos1.y;

			let mc2:MovieClip = new MovieClip();
			this.addChild(mc2);
			mc2.x = this.pos2.x;
			mc2.y = this.pos2.y;

			mc.playFile(`${SKILL_EFF}skill_104_c`,1,null,true);
			mc2.playFile(`${SKILL_EFF}skill_104_c`,1,null,true);
			let self = this;
			let timeout = setTimeout(function() {
				clearTimeout(timeout);
				GlobalFun.createSkillEff(1,104,self,2,{x:StageUtils.inst().getWidth() - 200,y:200},self._levelEntitys,skillCfg.atk);
			}, 800);
		}
	}
	private onLevelChange():void{
		this.levelNumLab.text = GameApp.level.toString();
		this.totalCount = ((GameApp.level/GameApp.totalCount)>>0)+1;
		this.curCount = 1;
		if(this.totalCount >= GameApp.totalCount){
			this.totalCount = GameApp.totalCount;
		}
		this.totalHp = this.curHp = 50*GameApp.level + 500;
		// this.totalHp = this.curHp = GameApp.level*2000;
		this.countNumLab.text = this.curCount+"/"+this.totalCount;
		this.progressMark.width = this.curHp/this.totalHp*277
	}
	private onaddGem():void{
		ViewManager.inst().open(ShopPopUp,[{selectIndex:1}])
	}
	private onaddGold():void{
		ViewManager.inst().open(ShopPopUp,[{selectIndex:0}])
	}
	private onUpgrade():void{
		ViewManager.inst().open(UpgradePopUp);
	}
	public initialize(boo?:boolean):void{
		//初始化
		console.log("game---initialize");
		if(boo){
			egret.Tween.get(this).to({alpha:1},1000).call(()=>{
				egret.Tween.removeTweens(this);
				this.showText();
			},this)
		}else{
			this.showText();
		}
	}
	private showText():void{
		this.touchEnabled = false;
		this.touchChildren = false;
		this.showLevelTxt(()=>{
			let guidepassStr:string = egret.localStorage.getItem(LocalStorageEnum.IS_PASS_GUIDE);
			this.touchEnabled = true;
			this.touchChildren = true;
			if(guidepassStr){
				//执行正常出怪的逻辑
				egret.startTick(this.execAction,this);
			}else{
				//需要过一下新手 指引操作
				egret.localStorage.setItem(LocalStorageEnum.IS_PASS_GUIDE,"1");
				ViewManager.inst().open(GuideView);
				let item:SkilItem = this.list.getChildAt(2) as SkilItem;
				this.guideView = ViewManager.inst().getView(GuideView) as GuideView;
				this.guideView.nextStep({id:"1_1",comObj:item,width:75,height:75});
			}
		})
	}
	private roleGoldChange(value:number):void{
		this.goldLab.text = GameApp.roleGold.toString();
		let boo:boolean = false;
		for(let key in GameApp.skillCfg){
			if(GameApp.roleGold >= GameApp.skillCfg[key].cost && GameApp.skillCfg[key].cost != 0){
				boo = true;
				break;
			}
		}
		this.upred.visible = boo;
	}
	private roleGemChange(value:number):void{
		this.gemLab.text =value.toString();
	}
	/**点击了引导技能 */
	private onClickGuideSkill(evt:StartGameEvent):void{
		if(this.guideView){
			let xx:number = (StageUtils.inst().getWidth()>>1)+ 100;
			let yy:number = StageUtils.inst().getHeight()>>1;
			this.guideView.nextStep({id:evt.data.id,comObj:{x:xx,y:yy},width:75,height:75})
		}
	}
	/**点击使用了技能-- 神将 */
	private onUseGuideSkill(evt:StartGameEvent):void{
		console.log("使用了技能-----"+evt.data.skillId+"----神将召唤");
		egret.startTick(this.execAction,this);
		let xx:number = (StageUtils.inst().getWidth()>>1)+ 100;
		let yy:number = (StageUtils.inst().getHeight()>>1) + 50;
		this.createOwnGenral({x:xx,y:yy})
	}
	private onRewardGet(evt:egret.TouchEvent):void{
		let getcountstr:string = egret.localStorage.getItem(LocalStorageEnum.BOX_REWARD_GET);

		let boxTimestr:string = egret.localStorage.getItem(LocalStorageEnum.BOX_REWARD_TIMESPAN);
		let nowTime:number = new Date().getTime();
		if(!getcountstr || (getcountstr && getcountstr == "0") || (boxTimestr && (nowTime - parseInt(boxTimestr)) > this.awardBoxGetTime)){
			//第一次进入 。第二天重置 。现在的时间-创建时间 〉 10分钟 。可以领取
			//增加金币数量
			let goldMc:MovieClip = new MovieClip();
			this.awardBox.addChild(goldMc);
			goldMc.playFile(`${EFFECT}gold`,1,null,true);
			goldMc.x = this.awardBox.width>>1;
			goldMc.y = this.awardBox.height>>1;
			GameApp.inst().gold += this.goldGetNum;
			UserTips.inst().showTips("获得金币+"+this.goldGetNum);
			//刷新新的宝箱倒计时时间戳
			let countStr:string = egret.localStorage.getItem(LocalStorageEnum.BOX_REWARD_GET);
			egret.localStorage.setItem(LocalStorageEnum.BOX_REWARD_GET,(parseInt(countStr)+1).toString())
			egret.localStorage.setItem(LocalStorageEnum.BOX_REWARD_TIMESPAN,new Date().getTime().toString());
			this.refreshRewardBoxState(1);
		}else{
			UserTips.inst().showTips("未达领取时间");
		}
	}
	/**刷新宝箱盒子状态 */
	private refreshRewardBoxState(num:number = 0):void{
		GameApp.inst().refreshTimespan();
		let countstr:string = egret.localStorage.getItem(LocalStorageEnum.BOX_REWARD_GET);
		if(countstr){
			let count:number = parseInt(countstr) + num;
			this.awardBox.visible = !(count >= this.totalGetCount);
			if(this.awardBox.visible == false){
				//说明当前次数已经使用完了
				this.timer.stop();
			}else{
				if(num){
					//当前有加的值 而且awardBox.visible = true 
					this.timer.start();
				}
			}
		}else{
			egret.localStorage.setItem(LocalStorageEnum.BOX_REWARD_GET,"0");
			this.awardBox.visible = true;
			this.boxLab.text = "领取";
		}
	}
	private changeTime():boolean{
		//刷新界面的相关显示
		let boxTimestr:string = egret.localStorage.getItem(LocalStorageEnum.BOX_REWARD_TIMESPAN);
		let nowTime:number = new Date().getTime();
		let offValue:number = (nowTime - parseInt(boxTimestr));
		if(!boxTimestr || (boxTimestr &&  offValue>= this.awardBoxGetTime)){
			//当前宝箱已经领取时间已超 可以领取
			this.timer.stop();
			this.boxLab.text = "领取";
			return false;
		}else{
			this.boxLab.text = DateUtils.getFormatBySecond((this.awardBoxGetTime - offValue)/1000,DateUtils.TIME_FORMAT_3);
			return true;
		}
	}
	/**路由回界面的刷新方法 */
	public refreshPage():void{
		
	}
	private onTimer():void{
		this.changeTime();
	}	
	/**音频设置界面 */
	private onSetHandler():void{
		ViewManager.inst().open(SettingPopUp);
	}
	private timeout;
	private releaseSkill101:boolean = false;
	private releaseSkill102:boolean = false;
	private releaseSkill103:boolean = false;
	private releaseSkill104:boolean = false;
	private curItem:SkilItem;
	private onItemTap(evt:eui.ItemTapEvent):void{
		let skillId:number = evt.item.skillId;
		let skillCfg:any = GlobalFun.getSkillCfg(skillId);
		if(skillCfg){
			this.descLab.visible = true;
			this.descLab.alpha = 0;
			this.descLab.text = skillCfg.desc;
			egret.Tween.removeTweens(this.descLab);
			if(this.timeout){
				clearTimeout(this.timeout);
			}
			egret.Tween.get(this.descLab,{loop:true}).to({alpha:1},500).to({alpha:0},500);
			let self = this;
			this.timeout = setTimeout(function() {
				clearTimeout(self.timeout);
				egret.Tween.removeTweens(self.descLab)
			}, 2000);

			for(let i:number = 0;i<this.list.numChildren;i++){
				let item:SkilItem = this.list.$children[i] as SkilItem;
				item.focus = false;
			}
			let curItem:SkilItem = this.list.getChildAt(evt.itemIndex) as SkilItem;
			curItem.focus = true;
			curItem.dongyixia();
			this.curItem = curItem;
			if(curItem.skillId == 103){
				//当前是神将召唤
				this.releaseSkill103 = true;	
				this.releaseSkill101 = this.releaseSkill102 = this.releaseSkill104 = false;
			}else if(curItem.skillId == 104){
				this.releaseSkill104 = true;
				this.releaseSkill101 = this.releaseSkill102 = this.releaseSkill103 = false;
			}else if(curItem.skillId == 101){
				this.releaseSkill101 = true;
				this.releaseSkill102 = this.releaseSkill103 = this.releaseSkill104 = false;
			}else if(curItem.skillId == 102){
				this.releaseSkill101 = this.releaseSkill103 = this.releaseSkill104 = false;
				this.releaseSkill102 = true;
			}
		}
		console.log("触发了技能----"+skillId);
	}
	
	/**展示关卡显示文字 */
	private showLevelTxt(cb:()=>void,txtstr?:number){
		let txt:eui.Label = new eui.Label();
		this.addChild(txt);
		txt.size = 25;
		txt.fontFamily = "yt";
		let levelstr:string = egret.localStorage.getItem(LocalStorageEnum.LEVEL);
		let level:number = levelstr?parseInt(levelstr):1;
		txt.textFlow = new egret.HtmlTextParser().parse(`第<font color=0x00ff00>${txtstr?txtstr:level}</font>${txtstr?"波":"关"}`);
		txt.x = (StageUtils.inst().getWidth()>>1) - (txt.width>>1) - 200;
		txt.y = (StageUtils.inst().getHeight()>>1);
		txt.alpha = 0;
		txt.scaleX = txt.scaleY = 0;
		egret.Tween.get(txt).to({alpha:1,scaleX:1,scaleY:1,x:txt.x+200},1000,egret.Ease.circOut).wait(500).to({alpha:0,scaleX:0,scaleY:0,x:txt.x+400},1000,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(txt);
			txt.parent.removeChild(txt);
			cb();
		},this)
	}
	public close():void{
		this.removeTouchEvent(this.settingBtn,this.onSetHandler);
		this.removeTouchEvent(this.upgradeBtn,this.onUpgrade);
		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this);
		this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEnd,this);
		this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onEnd,this);
		this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onEnd,this);
		this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
		this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		StageUtils.inst().getStage().removeEventListener(StartGameEvent.CLICK_GUIDE_SKILL,this.onClickGuideSkill,this);
		StageUtils.inst().getStage().removeEventListener(StartGameEvent.USE_GUIDE_SKILL,this.onUseGuideSkill,this);
		this.awardBox.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRewardGet,this);
		MessageManager.inst().removeListener(CustomEvt.BOSS_RELEASESKILL,this.onBossReleaseSkill,this);
		this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		if(this.goldWatcher){this.goldWatcher.unwatch()}
		if(this.gemWatcher){this.gemWatcher.unwatch()}
	}
}
ViewManager.inst().reg(GameMainView,LayerManager.UI_Main);