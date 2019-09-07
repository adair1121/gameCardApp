/**
 * 神将技能----神将转生提示弹窗
 */
class RebornTipPopUp extends BaseEuiView{

	private content:eui.Group;
	private _cb:()=>void;
	private _arg:any;
	private _param:any;

	private returnBtn:eui.Image;
	private tipLab:eui.Image;
	private costLab:eui.Label;
	private sureBtn:eui.Image;
	private cancleBtn:eui.Image;
	private _cost:number;
	public constructor() {
		super();
	}
	public open(...param):void{
		egret.Tween.get(this.content).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this);
		},this)
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		this.addTouchEvent(this.sureBtn,this.onSure,true);
		this.addTouchEvent(this.cancleBtn,this.onCancle,true);
		if(param && param.length){
			if(param[0].cost){
				this._cost = param[0].cost;
			}
			if(param[0].cb){
				this._cb = param[0].cb;
			}
			if(param[0].arg){
				this._arg = param[0].arg
			}
		}
		
	}
	private onSure():void{
		let goldNum:number = GameApp.ins<GameApp>().gold;
		if(this._cost){
			this._param = 1;
			if(this._cost > goldNum){
				UserTips.ins<UserTips>().showTips("金币不足");
				return;
			}else{
				GameApp.ins<GameApp>().gold -= this._cost;
				UserTips.ins<UserTips>().showTips("转生成功");
			}
		}else{
			this._param = -1;
		}
		this.onReturn();
		
	}
	private onCancle():void{
		this._param = 0;
		this.onReturn();
	}
	private onReturn():void{
		egret.Tween.get(this.content).to({verticalCenter:-500},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			ViewManager.ins<ViewManager>().close(RebornTipPopUp);
			if(this._cb && this._arg){
				this._cb.call(this._arg,this._param);
			}
		},this)
	}
	public close():void{
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		this.removeTouchEvent(this.sureBtn,this.onSure);
		this.removeTouchEvent(this.cancleBtn,this.onCancle);
	}
}
ViewManager.ins<ViewManager>().reg(RebornTipPopUp,LayerManager.UI_Pop);