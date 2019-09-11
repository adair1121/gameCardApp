class ShopItem extends eui.ItemRenderer{
	
	private icon_title:eui.Image;
	private icon:eui.Image;
	private desc:eui.Label;
	private shopBtn:eui.Group;
	private costLab:eui.Label;
	private shopId:string;
	private costNum:number;
	public constructor() {
		super();
		this.skinName = "ShopItemSkin";
	}
	protected childrenCreated():void{
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBuy,this);
	}
	private onBuy():void{
		console.log(this.shopId);
	}
	protected dataChanged():void{
		if(this.data.cost){
			this.costLab.text = this.data.cost + "元";
		}
		if(this.data.desc){
			this.desc.text = this.data.desc;
		}
		if(this.data.icon_title){
			this.icon_title.source = this.data.icon_title;
		}
		if(this.data.icon){
			this.icon.source = this.data.icon;
		}
		if(this.data.shopId){
			this.shopId = this.data.shopId;
		}
		if(this.data.costNum){
			this.costNum = this.data.costNum;
		}
	}
	public dispose():void{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onBuy,this);
	}
}