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
	public constructor() {
		super();
	}
	public open(...param):void{
		this._entitys = [];
		this._ownEntitys = [];
		this._levelEntitys = [];
		for(let i:number = 1;i<=5;i++){
			let skill1Level:string = egret.localStorage.getItem(LocalStorageEnum.SKILL_LEVEL+(100+i))
			if(!skill1Level){
				egret.localStorage.setItem(LocalStorageEnum.SKILL_LEVEL+(100+i),"1");
			}
		}
		this.progressBar.mask = this.progressMark;
		this.totalHp = this.curHp = GameApp.level*20000;
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
		MessageManager.inst().addListener(CustomEvt.REDUCE_HP,this.onTowerHpReduce,this);

		eui.Binding.bindHandler(GameApp,["level"],this.onLevelChange,this);
		this.descLab.visible = false;
		this.descLab.alpha = 0;
		this.createLevelMonster();
		egret.startTick(this.execAction,this);
	}
	private onTowerHpReduce(evt:CustomEvt):void{
		this.curHp -= evt.data.hp;
		if(this.curHp <= 0){
			this.curHp = 0;
			this.gameFail();
		}
		this.progressMark.width = this.curHp/this.totalHp*277;
	}
	private gameFail():void{
		egret.stopTick(this.execAction,this);
		this.timer.stop();
		console.log("游戏结束")
	}
	/**创建关卡怪物 */
	private createLevelMonster():void{
		let count:number = ((GameApp.level/5)>>0) + 1;
		let centery:number = this.clickRect.y + 150;
		let centerx:number = 100;
		for(let i:number = 0;i<count;i++){
			let shapIndex:number = (Math.random()*7)>>0;
			let monsterCfg:CardVo[] = GlobalFun.getMonsterCfg();
			let index:number = (Math.random()*monsterCfg.length)>>0;
			if(GameApp.level <= 11){
				index = GameApp.level;
			}
			let monsterVo:CardVo = monsterCfg[index];
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
				bossIndex = GameApp.level;
			}
			centerx -= 230;
			let bossVo:CardVo = bossCfgs[bossIndex];
			boss.setSoldierData(-1,bossVo.model,bossVo.id);
			this._levelEntitys.push(boss);
			this._entitys.push(boss);
			boss.y = this.clickRect.y + (this.clickRect.height>>1);
			boss.x = centerx;
			centerx -= 650;
		}
		this.dealLayerRelation();
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
					if(this.checkXBlock(item,ownEntitys)){
						item.waitMoveAction();
					}else{
						let xy:XY = {x:StageUtils.inst().getWidth() - 150,y:item.y}
						item.execMoveAction({x:xy.x,y:xy.y},()=>{
							//当前移动到了塔的附近 到达了攻击距离 //执行攻击
							item.isInAtk = true;
						},this);
					}
					
				}
				
			}
		}
		this.dealLayerRelation();
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
	private checkXBlock(item:any,entitys:any[]):boolean{ 
		let x:number = item.x;
		let y:number = item.y;
		for(let i:number = 0;i<entitys.length;i++){
			let otherItem:any = entitys[i];
			if(item != otherItem){
				let ox:number = otherItem.x;
				let oy:number = otherItem.y;
				if(ox - x <= 40 && ox - x>= 0 && Math.abs(oy - y) <= 10){
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
				if(atkEntity.general){
					if(soldiers[i].general){
						minEntity = soldiers[i];
						break;
					}
				}
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
	private onTouchTap():void{
		if(this.releaseSkill103){
			//当前可以释放技人物;
		}
	}
	private onLevelChange():void{
		this.levelNumLab.text = GameApp.level.toString();
		this.totalCount = ((GameApp.level/GameApp.totalCount)>>0)+1;
		if(this.totalCount >= GameApp.totalCount){
			this.totalCount = GameApp.totalCount;
		}
		this.totalHp = this.curHp = GameApp.level*2000;
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
	public initialize():void{
		//初始化
		console.log("game---initialize");
		this.touchEnabled = false;
		this.touchChildren = false;
		this.showLevelTxt(()=>{
			let guidepassStr:string = egret.localStorage.getItem(LocalStorageEnum.IS_PASS_GUIDE);
			this.touchEnabled = true;
			this.touchChildren = true;
			if(guidepassStr){
				//执行正常出怪的逻辑
			}else{
				//需要过一下新手 指引操作
				egret.localStorage.setItem(LocalStorageEnum.IS_PASS_GUIDE,"1");
				ViewManager.inst().open(GuideView);
				let item:SkilItem = this.list.getChildAt(2) as SkilItem;
				this.guideView = ViewManager.inst().getView(GuideView) as GuideView;
				this.guideView.nextStep({id:"1_1",comObj:item,width:75,height:75}) ;
			}
		})
		
	}
	private roleGoldChange(value:number):void{
		this.goldLab.text = value.toString();
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
		console.log("使用了技能-----"+evt.data.skillId+"----神将召唤")
	}
	private onRewardGet(evt:egret.TouchEvent):void{
		let getcountstr:string = egret.localStorage.getItem(LocalStorageEnum.BOX_REWARD_GET);

		let boxTimestr:string = egret.localStorage.getItem(LocalStorageEnum.BOX_REWARD_TIMESPAN);
		let nowTime:number = new Date().getTime();
		if(!getcountstr || (getcountstr && getcountstr == "0") || (boxTimestr && (nowTime - parseInt(boxTimestr)) > this.awardBoxGetTime)){
			//第一次进入 。第二天重置 。现在的时间-创建时间 〉 10分钟 。可以领取
			//增加金币数量
			GameApp.inst().gold += this.goldGetNum;
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
	private releaseSkill103:boolean = false;
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
			if(curItem.skillId == 103){
				//当前是神将召唤
				if(!curItem.num){
					//神将已经召唤完毕
					UserTips.inst().showTips("已无更多的神将");	
				}else{
					this.releaseSkill103 = true;
				}
			}else{
				this.releaseSkill103 = false;
				// 释放其他技能
			}
		}
		console.log("触发了技能----"+skillId);
	}
	
	/**展示关卡显示文字 */
	private showLevelTxt(cb:()=>void){
		let txt:eui.Label = new eui.Label();
		this.addChild(txt);
		txt.size = 25;
		txt.fontFamily = "yt";
		let levelstr:string = egret.localStorage.getItem(LocalStorageEnum.LEVEL);
		let level:number = levelstr?parseInt(levelstr):1;
		txt.textFlow = new egret.HtmlTextParser().parse(`第<font color=0x00ff00>${level}</font>关`);
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
		this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		StageUtils.inst().getStage().removeEventListener(StartGameEvent.CLICK_GUIDE_SKILL,this.onClickGuideSkill,this);
		StageUtils.inst().getStage().removeEventListener(StartGameEvent.USE_GUIDE_SKILL,this.onUseGuideSkill,this);
		this.awardBox.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRewardGet,this);
		this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		if(this.goldWatcher){this.goldWatcher.unwatch()}
		if(this.gemWatcher){this.gemWatcher.unwatch()}
	}
}
ViewManager.inst().reg(GameMainView,LayerManager.UI_Main);