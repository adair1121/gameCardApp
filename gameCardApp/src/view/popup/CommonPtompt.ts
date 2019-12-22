class CommonPtompt extends BaseEuiView{

	private returnBtn:eui.Image;
	private tipGroup:eui.Group;

	private cancleBtn:eui.Image;
	private sureBtn:eui.Image;
	private _cb:()=>void;
	private _arg:any;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.tipGroup.alpha = 0;
		this.tipGroup.scaleX = this.tipGroup.scaleY = 0;
		egret.Tween.get(this.tipGroup).to({alpha:1,scaleX:1,scaleY:1},600,egret.Ease.backOut).call(()=>{
			egret.Tween.removeTweens(this.tipGroup);
		},this)

		this.addTouchEvent(this.cancleBtn,this.onReturn,true);
		this.addTouchEvent(this.sureBtn,this.onSure,true);
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		if(param[0]){
			if(param[0].cb){
				this._cb = param[0].cb;
			}
			if(param[0].arg){
				this._arg = param[0].arg;
			}
		}
	}
	private oper:number = 0;
	private onSure():void{
		if(GameApp.roleGold < 300){
			UserTips.inst().showTips("金币不足");
			return;
		}else{
			this.oper = 1;
			GameApp.roleGold -= 300;
			UserTips.inst().showTips("刷新成功");
		}
		this.onReturn();
	}
	private onReturn():void{
		egret.Tween.get(this.tipGroup).to({alpha:0,scaleX:0,scaleY:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.tipGroup);
			ViewManager.inst().close(CommonPtompt);
			if(this._cb && this._arg){
				this._cb.call(this._arg,this.oper);
			}
		},this)
	}
	public close():void{
		this.removeTouchEvent(this.cancleBtn,this.onReturn);
		this.removeTouchEvent(this.sureBtn,this.onSure);
		this.removeTouchEvent(this.returnBtn,this.onReturn);
	}
}
ViewManager.inst().reg(CommonPtompt,LayerManager.UI_Pop);