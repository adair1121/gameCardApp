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
	private redP:eui.Image;
	public constructor() {
		super();
		this.skinName = "UpgradeItemSkin";
	}
	protected childrenCreated():void{
		this.rebornBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onReborn,this)
		this.upgradeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onUpgrade,this);
	}
	private onReborn():void{
		ViewManager.inst().open(RebornPanel,[{skillId:this._skillId}]);
	}
	private onUpgrade():void{
		let userGold:number = GameApp.inst().gold;
		if(this._curCost > userGold){
			UserTips.inst().showTips("金币不足");
			return;
		}
		GameApp.inst().gold -= this._curCost;
		
		GameApp.skillCfg[this._skillId].level += 1;
		if(this._skillId  >= 1000){
			GameApp.skillCfg[this._skillId].atk = 5*GameApp.skillCfg[this._skillId].level+45;
			GameApp.skillCfg[this._skillId].hp = 50*GameApp.skillCfg[this._skillId].level+550;
			GameApp.skillCfg[this._skillId].cost = 10*GameApp.skillCfg[this._skillId].level+90;
		}else{
			if(this._skillId == 101 || this._skillId == 102){
				GameApp.skillCfg[this._skillId].atk = 0.5*GameApp.skillCfg[this._skillId].level+7.5;
				GameApp.skillCfg[this._skillId].cost = 5*GameApp.skillCfg[this._skillId].level+25;
			}else{
				GameApp.skillCfg[this._skillId].atk = 2*GameApp.skillCfg[this._skillId].level+18;
				GameApp.skillCfg[this._skillId].cost = 10*GameApp.skillCfg[this._skillId].level+90;
			}
			
		}
		egret.localStorage.setItem(LocalStorageEnum.REBORNCFG,JSON.stringify(GameApp.skillCfg));
		// let levelstr:string = egret.localStorage.getItem(LocalStorageEnum.SKILL_LEVEL + this._skillId);
		// let curLevel:number = parseInt(levelstr)+1
		// egret.localStorage.setItem(LocalStorageEnum.SKILL_LEVEL + this._skillId,(curLevel).toString());
		this._curCost = GameApp.skillCfg[this._skillId].cost
		this.levelLab.text = "Lv."+GameApp.skillCfg[this._skillId].level;
		this.costLab.text = this._curCost.toString();
		this.atkLab.text = GameApp.skillCfg[this._skillId].atk.toString();
		UserTips.inst().showTips("升级成功");
	}
	protected dataChanged():void{
		this.refresh(this.data);
	}
	public refresh(data):void{
		this.skillIcon.source = data.skillIcon;
		this.skillTitle.source = data.skillTitle;
		this.skillDesc.text = data.desc;
		this._skillId = data.skillId;
		let levelstr:string = data.level
		this.atkLab.text = data.atk.toString();
		this._curCost =  data.cost;
		this.costLab.text = this._curCost.toString();
		if(GameApp.roleGold >= this._curCost){
			this.redP.visible = true;
		}
		this.levelLab.text = "Lv."+levelstr;
		this.rebornBtn.visible = false;
		if(this.data.skillType == 1){
			this.rebornBtn.visible = true;
		}
	}
	public changeRedPointShow(boo:boolean){
		this.redP.visible = boo;
	}
	public get skillId():number{
		return this._skillId;
	}
	public dispose():void{
		this.rebornBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onReborn,this)
		this.upgradeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onUpgrade,this)
	}
}