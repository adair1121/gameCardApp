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
		let arr:any[] = [];
		arr = arr.concat(SkillCfg.skillCfg);
		arr.splice(2,1);
		arr.pop();
		let boo:boolean = GameApp.skillCfg?true:false;
		if(!boo){
			GameApp.skillCfg = {};
		}
		for(let i:number = 0;i<arr.length;i++){
			if(GameApp.skillCfg[arr[i].skillId]){
				arr[i] = GameApp.skillCfg[arr[i].skillId];
			}else{
				GameApp.skillCfg[arr[i].skillId] = arr[i];
			}
		}
		for(let i:number = 0;i<10;i++){
			let item:any = {skillId:1000+i,rebornId:1,skillIcon:"skill_103_png",skillTitle:"skill_103_title_png",level:1,desc:"神将",atk:150,hp:400,atkDis:100,cost:10000,skillType:1};
			if(GameApp.skillCfg[item.skillId]){
				item = GameApp.skillCfg[item.skillId];
			}else{
				GameApp.skillCfg[item.skillId] = item;
			}
			arr.push(item);
		}
		if(!boo){
			egret.localStorage.setItem(LocalStorageEnum.REBORNCFG,JSON.stringify(GameApp.skillCfg));
		}		
		this.arraycollect.source = arr;
		this.addTouchEvent(this.btnClose,this.onReturn,true);
		MessageManager.inst().addListener(CustomEvt.REBORNSUCCESS,this.onReborn,this);
	}
	private onReborn(evt:CustomEvt):void{
		for(let i:number = 0;i<this.list.$children.length;i++){
			let curItem:UpgradeItem = this.list.$children[i] as UpgradeItem;
			if(curItem.skillId == evt.data.skillId){
				curItem.refresh(GameApp.skillCfg[evt.data.skillId]);
				break;
			}
		}
	}
	private onReturn():void{
		egret.Tween.get(this.upgradeGroup).to({right:-700},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.upgradeGroup);
			ViewManager.inst().close(UpgradePopUp);
		},this)
	}
	public close():void{
		this.removeTouchEvent(this.btnClose,this.onReturn);
		MessageManager.inst().removeListener(CustomEvt.REBORNSUCCESS,this.onReborn,this);
		let len:number = this.list.$children.length;
		for(let i:number = 0;i<len;i++){
			let item:UpgradeItem = this.list.getChildAt(i) as UpgradeItem;
			if(item){
				item.dispose();
			}
		}
	}
}
ViewManager.inst().reg(UpgradePopUp,LayerManager.UI_Pop);