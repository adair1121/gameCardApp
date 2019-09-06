class SkilItem extends eui.ItemRenderer{

	private skillIcon:eui.Image;
	private skillTitle:eui.Image;
	private _skillId:number;
	public constructor() {
		super();
		this.skinName = "SkillItemSkin";
	}
	protected dataChanged(): void{
		if(this.data.skillIcon){
			this.skillIcon.source = this.data.skillIcon;
		}
		if(this.data.skillTitle){
			this.skillTitle.source = this.data.skillTitle;
		}
		if(this.data.skillId){
			this._skillId = this.data.skillId;
		}
	}
	public get skillId():number{
		return this._skillId;
	}
}