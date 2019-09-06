class GameMainView extends BaseEuiView{

	private awardBox:eui.Image;
	private settingBtn:eui.Image;
	private scroller:eui.Scroller;
	private list:eui.List;
	private arraycollect:eui.ArrayCollection;
	private guideView:GuideView;
	public constructor() {
		super();
	}
	public open(...param):void{
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
	private onSetHandler():void{
		
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		let skillId:number = evt.item.skillId;
		console.log("触发了技能----"+skillId);
	}
	public initialize():void{
		//初始化
		console.log("game---initialize");
		this.touchEnabled = false;
		this.showLevelTxt(()=>{
			let guidepassStr:string = egret.localStorage.getItem(LocalStorageEnum.IS_PASS_GUIDE);
			this.touchEnabled = true;
			if(guidepassStr){
				//执行正常出怪的逻辑
			}else{
				//需要过一下新手 指引操作
				// egret.localStorage.setItem(LocalStorageEnum.IS_PASS_GUIDE,"1");
				ViewManager.ins<ViewManager>().open(GuideView);
				let item:SkilItem = this.list.getChildAt(2) as SkilItem;
				this.guideView = ViewManager.ins<ViewManager>().getView(GuideView) as GuideView;
				this.guideView.nextStep({id:"1_1",comObj:item,width:75,height:75}) ;
			}
		})
		
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
		this.addTouchEvent(this.settingBtn,this.onSetHandler);
		this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		StageUtils.ins<StageUtils>().getStage().removeEventListener(StartGameEvent.CLICK_GUIDE_SKILL,this.onClickGuideSkill,this);
		StageUtils.ins<StageUtils>().getStage().removeEventListener(StartGameEvent.USE_GUIDE_SKILL,this.onUseGuideSkill,this);
	}
}
ViewManager.ins<ViewManager>().reg(GameMainView,LayerManager.UI_Main);