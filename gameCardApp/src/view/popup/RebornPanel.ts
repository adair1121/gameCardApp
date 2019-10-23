class RebornPanel extends BaseEuiView{

	private btnReturn:eui.Image;
	private scroller:eui.Scroller;
	private list:eui.List;
	private rebornGroup:eui.Group;
	private arrayCollect:eui.ArrayCollection;
	public constructor() {
		super();
	}
	public open(...param):void{
		egret.Tween.get(this.rebornGroup).to({left:10},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.rebornGroup);
		})
		this.addTouchEvent(this.btnReturn,this.onReturn,true);
		this.arrayCollect = new eui.ArrayCollection();
		this.list.itemRenderer = RebornItem;
		this.list.dataProvider = this.arrayCollect;
		this.scroller.viewport = this.list;
		this.scroller.verticalScrollBar.autoVisibility = false;
		this.scroller.verticalScrollBar.visible = false;
		let dataArr:any[] = [];
		let cfgs:any[] = RebornCfg.cfg;
		for(let key in cfgs){
			let obj:any = cfgs[key];
			if(!!~GameApp.rebornIds.indexOf(cfgs[key].id)){
				obj["rebornBoo"] = true;
			}else{
				obj["rebornBoo"] = false;
			}
			dataArr.push(obj)
		}
		this.arrayCollect.source = dataArr;
		this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		let item:RebornItem = this.list.getChildAt(evt.itemIndex) as RebornItem;
		if(item.ifReborn){
			UserTips.inst().showTips("已转生过此职业");
			return;
		}
		ViewManager.inst().open(RebornTipPopUp,[{cost:item.cost,mid:item.mid}])
	}
	private onReturn():void{
		egret.Tween.get(this.rebornGroup).to({left:-500},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.rebornGroup);
			ViewManager.inst().close(RebornPanel);
		})
	}
	public close():void{
		this.removeTouchEvent(this.btnReturn,this.onReturn);
		this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
	}
}
ViewManager.inst().reg(RebornPanel,LayerManager.UI_Pop);