class StoryPopUp extends BaseEuiView{
	private returnBtn:eui.Image;
	private font:eui.Image;
	private content:eui.Group;
	private fontMask:eui.Image;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.font.mask = this.fontMask;
		this.fontMask.width = 0;
		egret.Tween.get(this.content).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			egret.Tween.get(this.fontMask).to({width:734},4000).call(()=>{
				egret.Tween.removeTweens(this.fontMask);
			},this);
		},this)
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
	}
	private onReturn():void{
		egret.Tween.removeAllTweens();
		egret.Tween.get(this.content).to({verticalCenter:-600},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			ViewManager.ins<ViewManager>().close(StoryPopUp);
		},this)
	}
	public close():void{
		this.removeTouchEvent(this.returnBtn,this.onReturn);
	}
}
ViewManager.ins<ViewManager>().reg(StoryPopUp,LayerManager.UI_Pop);