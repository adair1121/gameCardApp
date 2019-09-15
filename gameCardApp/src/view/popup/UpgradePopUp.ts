class UpgradePopUp extends BaseEuiView{

	private scroller:eui.Scroller;
	private list:eui.List;
	private arraycollect:eui.ArrayCollection;
	private btnClose:eui.Image;
	private upgradeGroup:eui.Group;
	public constructor() {
		super();
	}
	public open(...param):void{
		egret.Tween.get(this.upgradeGroup).to({right:10},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.upgradeGroup);
		},this)
		this.arraycollect = new eui.ArrayCollection();
		this.list.itemRenderer = UpgradeItem;
		this.list.dataProvider = this.arraycollect;
		this.scroller.viewport = this.list;
		let arr:any[] = SkillCfg.skillCfg;
		this.arraycollect.source = arr;
		this.addTouchEvent(this.btnClose,this.onReturn,true);
	}
	private onReturn():void{
		egret.Tween.get(this.upgradeGroup).to({right:-700},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.upgradeGroup);
			ViewManager.ins<ViewManager>().close(UpgradePopUp);
		},this)
	}
	public close():void{
		this.removeTouchEvent(this.btnClose,this.onReturn);
		let len:number = this.list.$children.length;
		for(let i:number = 0;i<len;i++){
			let item:UpgradeItem = this.list.getChildAt(i) as UpgradeItem;
			if(item){
				item.dispose();
			}
		}
	}
}
ViewManager.ins<ViewManager>().reg(UpgradePopUp,LayerManager.UI_Pop);