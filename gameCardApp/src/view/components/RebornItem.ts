class RebornItem extends eui.ItemRenderer{

	private headIcon:eui.Image;
	private titleImg:eui.Image;
	private rebornCostLab:eui.Label;
	private _cost:number;
	private _rebornBoo:boolean;
	private _id:number;
	private descLab:eui.Label;
	private descs:string[] = ["攻速暴增200%","全属性增加1倍","攻击力增幅4倍"];
	public constructor() {
		super();
		this.skinName = "RebornItemSkin"
	}
	protected dataChanged():void{
		let index:number = this.itemIndex + 1;
		this.descLab.text = this.descs[this.itemIndex];
		if(index >= 5){
			index = 4;
		}
		this.headIcon.source = `reborn_${this.data.rmodel}_png`;
		// if(this.itemIndex == 2){
		// 	this.headIcon.x
		// }
		this.titleImg.source = `reborn_title_${this.data.rmodel}_png`;
		this.rebornCostLab.text = this.data.cost;
		let reborns:number[] = GameApp.reborns[this.data.skillId];
		if(reborns && (!!~reborns.indexOf(this.data.mid))){
			this._rebornBoo = true;
			this.rebornCostLab.text = "已转生";
		}
		this._cost = this.data.cost;
		// this._rebornBoo = this.data.rebornBoo;
		this._id = this.data.mid
	}
	public reborn():void{
		this._rebornBoo = true;
		this.rebornCostLab.text = "已转生";
		if(!GameApp.reborns[this.data.skillId]){
			GameApp.reborns[this.data.skillId] = [this.data.mid];
		}else{
			GameApp.reborns[this.data.skillId].push(this.data.mid);
		}
		egret.localStorage.setItem(LocalStorageEnum.REBORNIDS,JSON.stringify(GameApp.reborns));

		let skillCfg:any = GameApp.skillCfg[this.data.skillId];
		let rebornCfg:any[] = RebornCfg.cfg;
		let curRebornCfg:any = null;
		for(let i:number = 0;i<rebornCfg.length;i++){
			if(rebornCfg[i].mid == this.data.mid){
				curRebornCfg = rebornCfg[i];
				break;
			}
		}
		1
		let obj:any = {skillId:this.data.skillId,rebornId:this.data.mid,skillIcon:this.icon,skillTitle:`reborn_title_${this.data.rmodel}_png`,level:skillCfg.level,desc:curRebornCfg.desc,atk:5*skillCfg.level + 45,hp:50*skillCfg.level+550,atkDis:100,cost:10*skillCfg.level+90,skillType:1};
		GameApp.skillCfg[this.data.skillId] = obj;
		egret.localStorage.setItem(LocalStorageEnum.REBORNCFG,JSON.stringify(GameApp.skillCfg));

		MessageManager.inst().dispatch(CustomEvt.REBORNSUCCESS,{skillId:this.data.skillId});
	}
	public get icon():string{
		return `reborn_head_${this.itemIndex+1}_png`
	}
	public get cost():number{
		return this._cost;
	}
	public get ifReborn():boolean{
		return this._rebornBoo;
	}
	public get mid():number{
		return this._id;
	}
}