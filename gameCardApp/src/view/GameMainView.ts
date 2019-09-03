class GameMainView extends BaseEuiView{

	private npc_city:eui.Group;
	private npc_answer:eui.Group;
	private npc_general:eui.Group;
	private outBtn:eui.Image;
	private battleBtn:eui.Image;
	private shopBtn:eui.Image;
	private flagRightGroup:eui.Group;
	private flagLeftGroup:eui.Group;
	private trainUnlockJob:number = 1;
	private answerMark:MovieClip;
	private cityMark:MovieClip;
	private generalMark:MovieClip;
	public constructor() {
		super()
	}
	public open(...param):void{
		this.alpha = 0;
		/**提前加载 */
		MapView.ins<MapView>().initMap();
		EntityManager.ins<EntityManager>().init();
		MapView.ins<MapView>().refrehMapViewPort();
		//--------------
		let role_job:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_JOB);
		let cityNpc:MovieClip = new MovieClip();
		this.npc_city.addChild(cityNpc);
		let cityTitle:eui.Image = new eui.Image();
		this.npc_city.addChild(cityTitle);

		let city_mark:MovieClip = new MovieClip();
		this.npc_city.addChild(city_mark);
		city_mark.scaleX = city_mark.scaleY = 0.6;
		city_mark.visible = false;
		this.cityMark = city_mark;
		
		cityTitle.horizontalCenter = 0;
		cityTitle.top = -60;
		cityTitle.source = "npc_city_title_png";
		let self = this;
		cityNpc.playFile(`${EFFECT}npc_city`,-1,null,false,"",()=>{
			cityNpc.x = self.npc_city.width>>1;
			cityNpc.y = self.npc_city.height>>1;
			city_mark.x = cityNpc.x ;
			city_mark.y = cityNpc.y - 120
		});

		let answerNpc:MovieClip = new MovieClip();
		this.npc_answer.addChild(answerNpc);

		let answer_mark:MovieClip = new MovieClip();
		this.npc_answer.addChild(answer_mark);
		answer_mark.scaleX = answer_mark.scaleY = 0.6;
		answer_mark.stop();
		answer_mark.visible = false;
		this.answerMark = answer_mark;

		let answerTitle:eui.Image = new eui.Image();
		this.npc_answer.addChild(answerTitle);
		answerTitle.horizontalCenter = 0;
		answerTitle.top = -60;
		answerTitle.source = "npc_answer_title_png";
		answerNpc.playFile(`${EFFECT}npc_answer`,-1,null,false,"",()=>{
			answerNpc.x = self.npc_answer.width>>1;
			answerNpc.y = self.npc_answer.height>>1;
			answer_mark.x = answerNpc.x;
			answer_mark.y = answerNpc.y - 120;
		});

		let generalNpc:MovieClip = new MovieClip();
		this.npc_general.addChild(generalNpc);

		let general_mark:MovieClip = new MovieClip();
		this.npc_general.addChild(general_mark);
		general_mark.scaleX = general_mark.scaleY = 0.6;
		general_mark.visible = false;
		this.generalMark = general_mark;

		let generalTitle:eui.Image = new eui.Image();
		this.npc_general.addChild(generalTitle);
		generalTitle.horizontalCenter = 0;
		generalTitle.top = -40;
		generalTitle.source = "npc_general_title_png"
		generalNpc.playFile(`${EFFECT}npc_general`,-1,null,false,"",()=>{
			generalNpc.x = self.npc_general.width>>1;
			generalNpc.y = self.npc_general.height>>1;
			general_mark.x = generalNpc.x ;
			general_mark.y = generalNpc.y - 100;
		});
		let flag_left:MovieClip = new MovieClip();
		flag_left.x = 8;
		flag_left.y = 20;
		this.flagLeftGroup.addChild(flag_left);
		flag_left.playFile(`${EFFECT}flag`,-1);

		let flag_right:MovieClip = new MovieClip();
		flag_right.x = 8;
		flag_right.y = 20;
		this.flagRightGroup.addChild(flag_right);
		flag_right.playFile(`${EFFECT}flag`,-1);

		egret.Tween.get(this).to({alpha:1},1000,egret.Ease.circIn).call(()=>{
			egret.Tween.removeTweens(this);
			this.addMainCom();
			egret.Tween.get(this.outBtn).to({top:20},600,egret.Ease.circOut).call(()=>{
				egret.Tween.removeTweens(this.outBtn);
			},this)
			egret.Tween.get(this.battleBtn).to({bottom:10},600,egret.Ease.circOut).call(()=>{
				egret.Tween.removeTweens(this.battleBtn)
			},this)
			
			if(!role_job){
				ViewManager.ins<ViewManager>().open(SelectWayPopUp,[{cb:this.selectCall,arg:this}])
			}
		},this)

		// this.createShowSoldierGroup({left:150},`${EFFROLESHOW}show_soldier_1`,-15,0);
		// this.createShowSoldierGroup({left:120,top:550},`${EFFROLESHOW}show_soldier_1`,-15,1);
		// this.createShowSoldierGroup({horizontalCenter:-50},`${EFFROLESHOW}show_soldier_2`,0,2);
		// this.createShowSoldierGroup({horizontalCenter:-50,top:550},`${EFFROLESHOW}show_soldier_2`,0,3);
		// this.createShowSoldierGroup({right:260},`${EFFROLESHOW}show_soldier_1`,15,4,-1);
		// this.createShowSoldierGroup({right:240,top:550},`${EFFROLESHOW}show_soldier_1`,15,5,-1);
		
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.addTouchEvent(this.battleBtn,this.onBattle,true);
		this.addTouchEvent(this.outBtn,this.onOut,true);
		eui.Binding.bindHandler(GameApp.ins<GameApp>(),["role_gold"],this.onGoldChage,this);
		eui.Binding.bindHandler(GameApp.ins<GameApp>(),["role_job"],this.jobChange,this);
		eui.Binding.bindHandler(GameApp.ins<GameApp>(),["curExp"],this.onExpChange,this);
	}
	private onExpChange(value:number):void{
		if(!this.cityMark){return};
		let needGold:number = (GameApp.ins<GameApp>().role_job+1)*300;
		if(value >= GameApp.ins<GameApp>().curLevelMaxExp && (GameApp.ins<GameApp>().role_gold >= needGold)){
			//当前经验大于了当前升级所需总经验 && 元宝足够
			this.cityMark.playFile(`${EFFECT}point`,-1);
			this.cityMark.visible = true;
		}else{
			this.cityMark.stop();
			this.cityMark.visible = false;
		}
	}
	private jobChange(value:number):void{
		if(!this.generalMark){return};
		let trainState:string = egret.localStorage.getItem(LocalStorageEnum.TRAIN_STATE);
		if(value >= this.trainUnlockJob && (GameApp.ins<GameApp>().role_gold >= 200) && (!trainState)){
			//职业达到武将解锁 && 拥有练兵需要的金钱 && 没有在练兵状态
			this.generalMark.playFile(`${EFFECT}point`,-1);
			this.generalMark.visible = true;
		}
	}
	private onGoldChage(value:number):void{
		if(value >= 200){
			if(this.answerMark){
				this.answerMark.playFile(`${EFFECT}point`,-1);
				this.answerMark.visible = true;
			}
			let trainState:string = egret.localStorage.getItem(LocalStorageEnum.TRAIN_STATE);
			if(this.generalMark && GameApp.ins<GameApp>().role_job >= this.trainUnlockJob && (!trainState)){
				//当前职业达到解锁职业 。&& 没有处于练兵状态
				this.generalMark.playFile(`${EFFECT}point`,-1);
				this.generalMark.visible = true;
			}else{
				if(this.generalMark){
					this.generalMark.stop();
					this.generalMark.visible = false;
				}
			}
		}else{
			if(this.answerMark){
				this.answerMark.stop();
				this.answerMark.visible = false;
			}
			if(this.generalMark){
				this.generalMark.stop();
				this.generalMark.visible = false;
			}
		}
		let needGold:number = (GameApp.ins<GameApp>().role_job+1)*300;
		if(this.cityMark && GameApp.ins<GameApp>().curExp >= GameApp.ins<GameApp>().curLevelMaxExp && (value >= needGold)){
			//当前经验足够 && 元宝也足够了 。可以提升
			this.cityMark.playFile(`${EFFECT}point`,-1);
			this.cityMark.visible = true;
		}else{
			if(this.cityMark){
				this.cityMark.stop();
				this.cityMark.visible = false;
			}
			
		}
	}
	// private createShowSoldierGroup(attr:any,res:string,offset:number,index:number,scaleX:number = 1):void{
	// 	let soldierRect:TrainingItemRect = new TrainingItemRect(offset,res,5,2,2,scaleX);
	// 	this.addChildAt(soldierRect,4+index);
	// 	soldierRect.top = 420;
	// 	for(let key in attr){
	// 		soldierRect[key] = attr[key];
	// 	}
	// }
	
	private onBattle():void{}
	private onOut():void{}
	public refreshPage():void{
		egret.Tween.get(this).to({alpha:1},1000,egret.Ease.circIn).call(()=>{
			this.touchEnabled = true;
			egret.Tween.removeTweens(this);
		},this)
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.npc_city:
				ViewManager.ins<ViewManager>().open(SelectWayPopUp)
				break;
			case this.npc_answer:
			case this.npc_general:
				let roleJob:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_JOB);
				if(!roleJob){
					UserTips.ins<UserTips>().showTips("请先参军，再进行答题");
					return;
				}
				if(evt.target == this.npc_answer){
					ViewManager.ins<ViewManager>().open(AnswerPopUp);
				}else if(evt.target == this.npc_general){
					//点击了武将
					if(parseInt(roleJob) < this.trainUnlockJob){
						UserTips.ins<UserTips>().showTips(`晋升-<font color=0xfc3434>${GameApp.jobCfg[this.trainUnlockJob]}</font>开启练兵`);
						return;
					}
					let trainState:string = egret.localStorage.getItem(LocalStorageEnum.TRAIN_STATE);
					if(trainState){
						ViewManager.ins<ViewManager>().open(TrainingShowView);
					}else{
						egret.localStorage.setItem(LocalStorageEnum.TRAIN_STATE,"true");
						ViewManager.ins<ViewManager>().open(TrainingPopUp);
					}
				}
				break;
			case this.outBtn:
				this.touchEnabled = false;
				ViewManager.ins<ViewManager>().open(CollectView);
				egret.Tween.get(this).to({alpha:0},1000,egret.Ease.circIn).call(()=>{
					egret.Tween.removeTweens(this);
				},this)
				break;
			case this.battleBtn:
				// this.touchEnabled = false;
				//点击了战役按钮
				ViewManager.ins<ViewManager>().open(LevelSelectView);
				break;
		}
	}
	/**选择方式返回 */
	private selectCall():void{

	}
	public close():void{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.removeTouchEvent(this.battleBtn,this.onBattle);
		this.removeTouchEvent(this.outBtn,this.onOut)
	}
}
ViewManager.ins<ViewManager>().reg(GameMainView,LayerManager.UI_Main);