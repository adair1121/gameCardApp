class UpgradeItem extends eui.ItemRenderer{

	private skillIcon:eui.Image;
	private skillTitle:eui.Image;
	private atkLab:eui.Label;
	private skillDesc:eui.Label;
	private rebornBtn:eui.Image;
	private upgradeBtn:eui.Group;
	private levelLab:eui.Label;
	private costLab:eui.Label;
	private _curCost:number;
	private _skillId:number;
	public constructor() {
		super();
		this.skinName = "UpgradeItemSkin";
	}
	protected childrenCreated():void{
		this.rebornBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onReborn,this)
		this.upgradeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onUpgrade,this);
	}
	private onReborn():void{
		ViewManager.ins<ViewManager>().open(RebornPanel);
	}
	private onUpgrade():void{
		let userGold:number = GameApp.ins<GameApp>().gold;
		if(this._curCost > userGold){
			UserTips.ins<UserTips>().showTips("元宝不足");
			return;
		}
		GameApp.ins<GameApp>().gold -= this._curCost;
		let levelstr:string = egret.localStorage.getItem(LocalStorageEnum.SKILL_LEVEL + this._skillId);
		let curLevel:number = parseInt(levelstr)+1
		egret.localStorage.setItem(LocalStorageEnum.SKILL_LEVEL + this._skillId,(curLevel).toString());
		this._curCost = (curLevel * 1000);
		this.costLab.text = this._curCost.toString();
		this.atkLab.text = (curLevel*1530).toString();
	}
	protected dataChanged():void{
		this.skillIcon.source = this.data.skillIcon;
		this.skillTitle.source = this.data.skillTitle;
		this.skillDesc.text = this.data.desc;
		this._skillId = this.data.skillId;
		let levelstr:string = egret.localStorage.getItem(LocalStorageEnum.SKILL_LEVEL + this._skillId);
		this.atkLab.text = (parseInt(levelstr)*1530).toString();
		this._curCost = (parseInt(levelstr) * 1000);
		this.costLab.text = this._curCost.toString();
		this.levelLab.text = "Lv."+levelstr;
		this.rebornBtn.visible = false;
		if(this.data.skillId == 103){
			this.rebornBtn.visible = true;
		}
	}
	public dispose():void{
		this.rebornBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onReborn,this)
		this.upgradeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onUpgrade,this)
	}
}