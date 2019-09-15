class RebornPanel extends BaseEuiView{

	private btnReturn:eui.Image;
	private scroller:eui.Scroller;
	private list:eui.List;
	private rebornGroup:eui.Group;
	public constructor() {
		super();
	}
	public open(...param):void{
		egret.Tween.get(this.rebornGroup).to({left:10},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.rebornGroup);
		})
		this.addTouchEvent(this.btnReturn,this.onReturn,true);
	}
	private onReturn():void{
		egret.Tween.get(this.rebornGroup).to({left:-500},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.rebornGroup);
			ViewManager.ins<ViewManager>().close(RebornPanel);
		})
	}
	public close():void{
		this.removeTouchEvent(this.btnReturn,this.onReturn);
	}
}
ViewManager.ins<ViewManager>().reg(RebornPanel,LayerManager.UI_Pop);