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
	public constructor() {
		super();
	}
	public open(...param):void{
		for(let i:number = 1;i<=5;i++){
			let skill1Level:string = egret.localStorage.getItem(LocalStorageEnum.SKILL_LEVEL+(100+i))
			if(!skill1Level){
				egret.localStorage.setItem(LocalStorageEnum.SKILL_LEVEL+(100+i),"1");
			}
		}
		

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
		StageUtils.ins<StageUtils>().getStage().addEventListener(StartGameEvent.CLICK_GUIDE_SKILL,this.onClickGuideSkill,this);
		StageUtils.ins<StageUtils>().getStage().addEventListener(StartGameEvent.USE_GUIDE_SKILL,this.onUseGuideSkill,this);
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
	}
	private onaddGem():void{
		ViewManager.ins<ViewManager>().open(ShopPopUp,[{selectIndex:1}])
	}
	private onaddGold():void{
		ViewManager.ins<ViewManager>().open(ShopPopUp,[{selectIndex:0}])
	}
	private onUpgrade():void{
		ViewManager.ins<ViewManager>().open(UpgradePopUp);
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
				ViewManager.ins<ViewManager>().open(GuideView);
				let item:SkilItem = this.list.getChildAt(2) as SkilItem;
				this.guideView = ViewManager.ins<ViewManager>().getView(GuideView) as GuideView;
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
			let xx:number = (StageUtils.ins<StageUtils>().getWidth()>>1)+ 100;
			let yy:number = StageUtils.ins<StageUtils>().getHeight()>>1;
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
			GameApp.ins<GameApp>().gold += this.goldGetNum;
			//刷新新的宝箱倒计时时间戳
			let countStr:string = egret.localStorage.getItem(LocalStorageEnum.BOX_REWARD_GET);
			egret.localStorage.setItem(LocalStorageEnum.BOX_REWARD_GET,(parseInt(countStr)+1).toString())
			egret.localStorage.setItem(LocalStorageEnum.BOX_REWARD_TIMESPAN,new Date().getTime().toString());
			this.refreshRewardBoxState(1);
		}else{
			UserTips.ins<UserTips>().showTips("未达领取时间");
		}
	}
	/**刷新宝箱盒子状态 */
	private refreshRewardBoxState(num:number = 0):void{
		GameApp.ins<GameApp>().refreshTimespan();
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
		ViewManager.ins<ViewManager>().open(SettingPopUp);
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		let skillId:number = evt.item.skillId;
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
		txt.x = (StageUtils.ins<StageUtils>().getWidth()>>1) - (txt.width>>1) - 200;
		txt.y = (StageUtils.ins<StageUtils>().getHeight()>>1);
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
		StageUtils.ins<StageUtils>().getStage().removeEventListener(StartGameEvent.CLICK_GUIDE_SKILL,this.onClickGuideSkill,this);
		StageUtils.ins<StageUtils>().getStage().removeEventListener(StartGameEvent.USE_GUIDE_SKILL,this.onUseGuideSkill,this);
		this.awardBox.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRewardGet,this);
		this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		if(this.goldWatcher){this.goldWatcher.unwatch()}
		if(this.gemWatcher){this.gemWatcher.unwatch()}
	}
}
ViewManager.ins<ViewManager>().reg(GameMainView,LayerManager.UI_Main);