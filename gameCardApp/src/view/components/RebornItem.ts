class RebornItem extends eui.ItemRenderer{

	private headIcon:eui.Image;
	private titleImg:eui.Image;
	private rebornCostLab:eui.Label;
	private _cost:number;
	private _rebornBoo:boolean;
	private _id:number;
	public constructor() {
		super();
		this.skinName = "RebornItemSkin"
	}
	protected dataChanged():void{
		let index:number = this.itemIndex + 1;
		if(index >= 5){
			index = 4;
		}
		this.headIcon.source = `reborn_head_${index}_png`;
		this.titleImg.source = `reborn_title_${index}_png`;
		this.rebornCostLab.text = this.data.cost;
		if(this.data.rebornBoo){
			this.rebornCostLab.text = "已转生";
		}
		this._cost = this.data.cost;
		this._rebornBoo = this.data.rebornBoo;
		this._id = this.data.mid
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