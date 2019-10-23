class BattleResultPopUp extends BaseEuiView{

	private timeLab:eui.Label;
	private goldNumLab:eui.Label;
	private continueBtn:eui.Image;
	private nextBtn:eui.Image;
	private exitBtn:eui.Image;

	public static OPER_CONTINUE:number = 1;//继续本关
	public static OPER_NEXT:number = 2;//进行下一关
	public static OPER_EXIT:number = 3;//退出;

	private goldNum:number;
	private _cb:()=>void;
	private _arg:any;
	private _param:number;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.alpha = 0;
		egret.Tween.get(this).to({alpha:1},300,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this);
		})

		if(param[0].state == 1){
			this.skin.currentState = "win";
			let levelstr:string = egret.localStorage.getItem(LocalStorageEnum.LEVEL);
			this.goldNum = parseInt(levelstr);
		}else{
			this.skin.currentState = "fail";
			this.goldNum = 0;
		}
		if(param[0].time){
			this.timeLab.text = param[0].time.toString();
		}
		if(param[0].cb){
			this._cb = param[0].cb;
		}
		if(param[0].arg){
			this._arg = param[0].arg;
		}
		GameApp.inst().gold += this.goldNum;
		this.addTouchEvent(this.nextBtn,this.onNextLevel,true);
		this.addTouchEvent(this.continueBtn,this.onContinue,true);
		this.addTouchEvent(this.exitBtn,this.onExit,true);
	}
	private onNextLevel():void{
		this._param = BattleResultPopUp.OPER_NEXT;
		this.onReturn();
	}
	private onContinue():void{
		this._param = BattleResultPopUp.OPER_CONTINUE;
		this.onReturn();
	}
	private onExit():void{
		this._param = BattleResultPopUp.OPER_EXIT;
		this.onReturn();
	}
	public onReturn():void{
		egret.Tween.get(this).to({alpha:0},300,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this);
			ViewManager.inst().close(BattleResultPopUp);
			if(this._cb && this._arg){
				this._cb.call(this._arg,this._param);
			}
		})
	}
	public close():void{
		this.removeTouchEvent(this.nextBtn,this.onNextLevel);
		this.removeTouchEvent(this.continueBtn,this.onContinue);
		this.removeTouchEvent(this.exitBtn,this.onExit);
	}
}
ViewManager.inst().reg(BattleResultPopUp,LayerManager.UI_Pop);