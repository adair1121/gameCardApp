class GuideView extends BaseEuiView{

	private rect:eui.Image;
	private bg_left:eui.Rect;
	private bg_top:eui.Rect;
	private bg_bottom:eui.Rect;
	private bg_right:eui.Rect;

	/**id值 引导的对象 宽 高 */
	private data:{ "id": string, "comObj": any, width: number, height: number ,offsetX?:number,offsetY?:number};
	private rectData: Array<number>;
	private _handMc:MovieClip
	public constructor() {

		super();
	}
	public open(...param):void{
		// this.data = param[0].data 
		// this.setRect();
		this._handMc = new MovieClip();
		this.addChild(this._handMc);
		this._handMc.touchEnabled = false;
		this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onGuideTap,this);
	}
	private onGuideTap(evt:egret.TouchEvent):void{
		let guideId:string = this.data.id;
		let guideCfgs:any  = GuideCfg.guidecfg;
		let itemCfg:any = guideCfgs[guideId];

		let event:StartGameEvent = new StartGameEvent(itemCfg.event,itemCfg.param);
		StageUtils.inst().getStage().dispatchEvent(event);

		if(!itemCfg.next){
			ViewManager.inst().close(GuideView);
		}
	}
	//执行下一步
	public nextStep(data:{ "id": string, "comObj": any, width: number, height: number ,offsetX?:number,offsetY?:number}):void{
		this.data = data;
		this.setRect();
	}
	private setRect(): void {
		if(this.data.comObj instanceof egret.DisplayObject){
			let point: egret.Point = this.data.comObj.parent.localToGlobal(this.data.comObj.x, this.data.comObj.y);
			if((this.data.offsetX==40)&&(this.data.offsetY==50))
			{
				this.data.offsetX=0;
				this.data.offsetY=0;
				this.rectData = [point.x + (this.data.offsetX||0), point.y + (this.data.offsetY||0), this.data.width-(this.data.offsetX||0), this.data.height];
			}else
			{
				this.rectData = [point.x + (this.data.offsetX||0), point.y + (this.data.offsetY||0), this.data.width, this.data.height];
			}
		}else{
			this.rectData = [this.data.comObj.x,this.data.comObj.y, this.data.width, this.data.height];
		}
		
		
		this.rect.x = this.rectData[0];
		this.rect.y = this.rectData[1];
		this.rect.width = this.data.width;
		this.rect.height = this.data.height;
		
		this.setBgdSize();
		this.setArrow();
	}
	private setBgdSize():void {
		let worldX = this.rect.x;
		let worldY = this.rect.y;

		let _w,_h;
		_w = worldX > 0 ? worldX : 0;
		_h = worldY + this.rect.height > 0 ? (worldY + this.rect.height) : 0;
		this.bg_left.width = _w;
		this.bg_left.height = _h;

		_w = StageUtils.inst().getWidth() - worldX;
		_w = _w<0?0:_w;
		this.bg_top.width = _w;
		this.bg_top.height = worldY;

		_w = StageUtils.inst().getWidth() - worldX - this.rect.width;
		_w = _w<0?0:_w;
		_h = StageUtils.inst().getHeight() - worldY;
		_h = _h<0?0:_h;
		this.bg_right.width = _w;
		this.bg_right.height = _h;

		_h = StageUtils.inst().getHeight() - worldY - this.rect.height;
		_h = _h<0?0:_h;
		this.bg_bottom.width = worldX + this.rect.width;
		this.bg_bottom.height = _h;
	}
	//设置焦点箭头
	private setArrow(): void {
		this._handMc.playFile(`${EFFECT}fingerClick`,-1);
		this._handMc.x = this.rect.x + (this.rect.width);
		this._handMc.y = this.rect.y + (this.rect.height);
	}
	public close():void{
		this.removeChildren();
		this._handMc = null;
		this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onGuideTap,this);
	}
}
ViewManager.inst().reg(GuideView,LayerManager.UI_Pop);