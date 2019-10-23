class ShopPopUp extends BaseEuiView{
	
	private content:eui.Group;
	private goldBtn:eui.Button;
	private gemBtn:eui.Button;
	private scroller:eui.Scroller;
	private list:eui.List;

	private arrayCollect:eui.ArrayCollection;
	private selectIndex = 0;
	private dataArr:any[] = [];
	private returnBtn:eui.Image;
	public constructor() {
		super();
	}
	public open(...param):void{
		egret.Tween.get(this.content).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
		},this)
		this.arrayCollect = new eui.ArrayCollection();
		this.list.itemRenderer = ShopItem;
		this.list.dataProvider = this.arrayCollect;
		this.scroller.viewport = this.list;
		if(param && param.length){
			this.selectIndex = param[0].selectIndex;
		}
		this.refreshDataANDview();
		this.addTouchEvent(this.goldBtn,this.onClickGold)
		this.addTouchEvent(this.gemBtn,this.onClickGem)
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
	}
	private onReturn():void{
		egret.Tween.get(this.content).to({verticalCenter:-600},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			ViewManager.inst().close(ShopPopUp);
		},this)
	}
	/**点击金币商城 */
	private onClickGold():void{
		this.selectIndex = 0;
		this.refreshDataANDview();
	}
	/**点击钻石商城 */
	private onClickGem():void{
		this.selectIndex = 1;
		this.refreshDataANDview();
	}
	/**刷新商城数据以及页面 */
	private refreshDataANDview():void{
		this.dataArr = [];
		if(this.selectIndex ==0){
			this.goldBtn.currentState = "down";
			this.gemBtn.currentState = "up";
		}else{
			this.goldBtn.currentState = "up";
			this.gemBtn.currentState = "down";
		}
		let shopCfg:any[] = ShopCfg.shopCfg[this.selectIndex];
		this.dataArr = shopCfg;
		this.arrayCollect.source = this.dataArr;
		this.list.dataProviderRefreshed();
	}
	public close():void{
		this.removeTouchEvent(this.goldBtn,this.onClickGold)
		this.removeTouchEvent(this.gemBtn,this.onClickGem)
		this.removeTouchEvent(this.returnBtn,this.onReturn);
	}
}
ViewManager.inst().reg(ShopPopUp,LayerManager.UI_Pop);