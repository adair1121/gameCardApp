class ShopView extends BaseEuiView{
	private btnClose:eui.Image;
	private list:eui.List;
	private content:eui.Group;
	private arrayCollect:eui.ArrayCollection;
	public constructor() {
		super();
	}
	public open(...param):void{
		egret.Tween.get(this.content).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
		})
		this.addTouchEvent(this.btnClose,this.onReturn,true);
		this.arrayCollect = new eui.ArrayCollection();
		this.list.itemRenderer = ShopItem;
		this.list.dataProvider = this.arrayCollect;
		let shopcfg:any = ShopCfg.shopCfgs;
		let arr:any[] = [];
		for(let key in shopcfg){
			arr.push(shopcfg[key]);
		}
		this.arrayCollect.source = arr;
	}
	private onReturn():void{
		egret.Tween.get(this.content).to({verticalCenter:-600},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			ViewManager.ins<ViewManager>().close(ShopView);
		})
	}
	public close():void{
		this.removeTouchEvent(this.btnClose,this.onReturn);
		let len:number = this.list.$children.length;
		for(let i:number = 0;i<len;i++){
			let item:ShopItem = this.list.getChildAt(i) as ShopItem;
			if(item){
				item.dispose();
			}
		}
	}
}
ViewManager.ins<ViewManager>().reg(ShopView,LayerManager.UI_Pop);