class RebornPanel extends BaseEuiView{

	private btnReturn:eui.Image;
	private scroller:eui.Scroller;
	private list:eui.List;
	private rebornGroup:eui.Group;
	private arrayCollect:eui.ArrayCollection;
	private _skillId:number;
	private rect:eui.Rect;
	public constructor() {
		super();
	}
	public open(...param):void{
		egret.Tween.get(this.rebornGroup).to({left:10},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.rebornGroup);
		})
		this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onReturn,this);
		this.addTouchEvent(this.btnReturn,this.onReturn,true);
		this.arrayCollect = new eui.ArrayCollection();
		this.list.itemRenderer = RebornItem;
		this.list.dataProvider = this.arrayCollect;
		this.scroller.viewport = this.list;
		this.scroller.verticalScrollBar.autoVisibility = false;
		this.scroller.verticalScrollBar.visible = false;
		let dataArr:any[] = [];
		this._skillId = param[0].skillId;
		let cfgs:any[] = RebornCfg.cfg;
		for(let key in cfgs){
			if(cfgs[key].cost != 0){
				let obj:any = cfgs[key];
				obj.skillId = this._skillId;
				// if(!!~GameApp.rebornIds.indexOf(cfgs[key].id)){
				// 	obj["rebornBoo"] = true;
				// }else{
				// 	obj["rebornBoo"] = false;
				// }
				dataArr.push(obj)
			}
		}
		this.arrayCollect.source = dataArr;
		this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		let item:RebornItem = this.list.getChildAt(evt.itemIndex) as RebornItem;
		if(item.ifReborn){
			UserTips.inst().showTips("已切换转生职业");
			let skillCfg:any = GameApp.skillCfg[this._skillId];
			let rebornCfg:any[] = RebornCfg.cfg;
			let curRebornCfg:any = null;
			for(let i:number = 0;i<rebornCfg.length;i++){
				if(rebornCfg[i].mid == item.mid){
					curRebornCfg = rebornCfg[i];
					break;
				}
			}
			let obj:any = {skillId:this._skillId,rebornId:item.mid,skillIcon:item.icon,skillTitle:"skill_103_title_png",level:skillCfg.level,desc:curRebornCfg.desc,atk:curRebornCfg.atk*skillCfg.level,hp:curRebornCfg.hp*skillCfg.level,atkDis:100,cost:curRebornCfg.cost*skillCfg.level,skillType:1};
			GameApp.skillCfg[this._skillId] = obj;
			egret.localStorage.setItem(LocalStorageEnum.REBORNCFG,JSON.stringify(GameApp.skillCfg));
			return;
		}
		ViewManager.inst().open(RebornTipPopUp,[{cost:item.cost,mid:item.mid,skillId:this._skillId,cb:(param)=>{
			if(param){
				item.reborn();
			}
		},arg:this}])
	}
	private onReturn():void{
		egret.Tween.get(this.rebornGroup).to({left:-500},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.rebornGroup);
			ViewManager.inst().close(RebornPanel);
		})
	}
	public close():void{
		this.removeTouchEvent(this.btnReturn,this.onReturn);
		this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onReturn,this);
		this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
	}
}
ViewManager.inst().reg(RebornPanel,LayerManager.UI_Pop);