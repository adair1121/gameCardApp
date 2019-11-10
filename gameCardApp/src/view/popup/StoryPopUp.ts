class StoryPopUp extends BaseEuiView{
	private returnBtn:eui.Image;
	private font:eui.Image;
	private content:eui.Group;
	private fontMask:eui.Image;
	private _cb:()=>void;
	private _arg:any;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.font.mask = this.fontMask;
		this.fontMask.width = 0;
		if(param[0]){
			this._cb = param[0].cb;
			this._arg = param[0].arg;
		}
		egret.Tween.get(this.content).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			egret.Tween.get(this.fontMask).to({width:734},30000).call(()=>{
				egret.Tween.removeTweens(this.fontMask);
			},this);
		},this)
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
	}
	private onReturn():void{
		// egret.Tween.removeAllTweens();
		egret.Tween.get(this.content).to({verticalCenter:-600},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			ViewManager.inst().close(StoryPopUp);
			if(this._cb && this._arg){
				this._cb.call(this._arg);
			}
		},this)
	}
	public close():void{
		this.removeTouchEvent(this.returnBtn,this.onReturn);
	}
}
ViewManager.inst().reg(StoryPopUp,LayerManager.UI_Pop);