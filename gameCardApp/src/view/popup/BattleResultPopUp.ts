class BattleResultPopUp extends BaseEuiView{

	// private timeLab:eui.Label;
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
	private winIcon:eui.Image;
	private rewardGroup:eui.Group;
	private resultImg:eui.Image;
	private resultImg2:eui.Image;
	private _state:string;
	public constructor() {
		super();
	}
	public open(...param):void{
		// this.alpha = 0;
		// egret.Tween.get(this).to({alpha:1},300,egret.Ease.circOut).call(()=>{
		// 	egret.Tween.removeTweens(this);
		// })
		
		let precentw:number = StageUtils.inst().getWidth()/1136;
		this.winIcon["autoSize"]();
		this.resultImg["autoSize"]();
		this.resultImg2["autoSize"]();
		this.rewardGroup["autoSize"]();
		this.nextBtn["autoSize"]();
		this.continueBtn["autoSize"]();
		this.exitBtn["autoSize"]();
		this.rewardGroup.alpha = 0;
		this.winIcon.alpha = 0;
		this.winIcon.scaleX = this.winIcon.scaleY = 5;
		this.resultImg.alpha = 0;
		this.resultImg.scaleX = this.resultImg.scaleY = 5;
		this.resultImg2.alpha = 0;
		this.resultImg2.scaleX = this.resultImg2.scaleY = 5;
		if(param[0].state == 1){
			this._state = "win";
			this.invalidateState();
			// this.skin.currentState = "win";
			// let levelstr:string = egret.localStorage.getItem(LocalStorageEnum.LEVEL);
			this.goldNum = (10*GameApp.level+90) + ((Math.random()*20)>>0)
			egret.Tween.get(this.winIcon).to({alpha:1,scaleX:precentw,scaleY:precentw},300,egret.Ease.circIn).call(()=>{
			egret.Tween.removeTweens(this.winIcon);
			egret.Tween.get(this.resultImg).to({alpha:1,scaleX:precentw,scaleY:precentw},300,egret.Ease.circIn).call(()=>{
				egret.Tween.removeTweens(this.resultImg);
				egret.Tween.get(this.rewardGroup).to({alpha:1},300).call(()=>{
					egret.Tween.removeTweens(this.rewardGroup);
				},this)
			},this)
		},this)
			// this.goldNum = parseInt(levelstr);
		}else{
			this._state = "fail"
			this.invalidateState();
			egret.Tween.get(this.winIcon).to({alpha:1,scaleX:precentw,scaleY:precentw},300,egret.Ease.circIn).call(()=>{
			egret.Tween.removeTweens(this.winIcon);
			egret.Tween.get(this.resultImg2).to({alpha:1,scaleX:precentw,scaleY:precentw},300,egret.Ease.circIn).call(()=>{
				egret.Tween.removeTweens(this.resultImg2);
				egret.Tween.get(this.rewardGroup).to({alpha:1},300).call(()=>{
					egret.Tween.removeTweens(this.rewardGroup);
				},this)
			},this)
		},this)
			// this.skin.currentState = "fail";
			this.goldNum = (5*GameApp.level+20) + ((Math.random()*10)>>0);
		}
		if(param[0].time){
			// this.timeLab.text = param[0].time.toString();
		}
		if(param[0].cb){
			this._cb = param[0].cb;
		}
		if(param[0].arg){
			this._arg = param[0].arg;
		}
		
		
		this.goldNumLab.text = this.goldNum.toString();
		GameApp.inst().gold += this.goldNum;
		this.addTouchEvent(this.nextBtn,this.onNextLevel,true);
		this.addTouchEvent(this.continueBtn,this.onContinue,true);
		this.addTouchEvent(this.exitBtn,this.onExit,true);
	}
	protected getCurrentState(): string{
		return this._state;
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