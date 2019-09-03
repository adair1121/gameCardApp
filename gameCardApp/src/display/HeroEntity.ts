class HeroEntity extends BaseEntity{

	private _roleMc:MovieClip;
	public gx:number;
	public gy:number;
	private curAction:number;
	private curDic:number;
	public constructor() {
		super();
	}
	protected initialize():void{
		this.createShadow();
		this._roleMc = new MovieClip();
		this.addChild(this._roleMc);
		this._id = this.hashCode;
		GameApp.ins<GameApp>().role_insId = this._id;
		this._camp = 1;
		this._hp = 800;
	}
	private createShadow():void{
		let jobstr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_JOB);
		let w:number = (jobstr && jobstr != "0")?60:30;
		let h:number = (jobstr && jobstr != "0")?30:15;
		let sp:egret.Shape = new egret.Shape();
		sp.graphics.beginFill(0x000000,0.4);
		sp.graphics.drawEllipse(0,0,w,h);
		sp.graphics.endFill();
		this.addChild(sp);
		sp.anchorOffsetX = sp.width>>1;
		sp.anchorOffsetY = sp.height>>1;
		sp.y  = (jobstr && jobstr != "0")?20:10;
	}
	/**
	 * name:特效名称
	 * dic 方向
	 */
	public playAction(action:number,playCount:number = -1):void{
		if(this.curAction == action && this.curDic == this.dic){
			return;
		}
		this.curAction = action;
		this.curDic = this.dic;
		let name = GlobalFun.getMainEntityRes(action);
		this._roleMc.playFile(`${EFFECT}${name}`,playCount,null,false,this._dic.toString());
	}
	
	
}