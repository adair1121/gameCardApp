class GuideView extends BaseEuiView{

	private rect:eui.Image;
	private bg_left:eui.Rect;
	private bg_top:eui.Rect;
	private bg_bottom:eui.Rect;
	private bg_right:eui.Rect;

	/**id值 引导的对象 宽 高 */
	private data:{ "id": string, "comObj": any, width: number, height: number ,offsetX?:number,offsetY?:number};
	private rectData: Array<number>;
	public constructor() {

		super();
	}
	public open(...param):void{
		// this.data = param[0].data 
		// this.setRect();
	}
	//执行下一步
	public nextStep(data:{ "id": string, "comObj": any, width: number, height: number ,offsetX?:number,offsetY?:number}):void{
		this.data = data;
		this.setRect();
	}
	private setRect(): void {
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

		_w = StageUtils.ins<StageUtils>().getWidth() - worldX;
		_w = _w<0?0:_w;
		this.bg_top.width = _w;
		this.bg_top.height = worldY;

		_w = StageUtils.ins<StageUtils>().getWidth() - worldX - this.rect.width;
		_w = _w<0?0:_w;
		_h = StageUtils.ins<StageUtils>().getHeight() - worldY;
		_h = _h<0?0:_h;
		this.bg_right.width = _w;
		this.bg_right.height = _h;

		_h = StageUtils.ins<StageUtils>().getHeight() - worldY - this.rect.height;
		_h = _h<0?0:_h;
		this.bg_bottom.width = worldX + this.rect.width;
		this.bg_bottom.height = _h;
	}
	//设置焦点箭头
	private setArrow(): void {
			
	}
	public close():void{

	}
}
ViewManager.ins<ViewManager>().reg(GuideView,LayerManager.UI_Pop);