class SkilItem extends eui.ItemRenderer{

	private skillIcon:eui.Image;
	private skillTitle:eui.Image;
	private _skillId:number;
	private rect:eui.Rect;
	private numLab:eui.Label;
	private itemGroup:eui.Group;
	public constructor() {
		super();
		this.skinName = "SkillItemSkin";
	}
	protected dataChanged(): void{
		this.rect.visible = false;
		this.numLab.visible = false;
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
	public dongyixia():void{
		egret.Tween.get(this.itemGroup).to({rotation:this.itemGroup.rotation - 5},50).to({rotation:this.itemGroup.rotation + 5},50).to({rotation:this.itemGroup.rotation - 5},50).to({rotation:this.itemGroup.rotation + 5},50).call(()=>{
			this.itemGroup.rotation = 0;
			egret.Tween.removeTweens(this.itemGroup);
		},this)
	}
	public set num(value:number){
		this.numLab.visible = true;
		this.numLab.text = value.toString();
	}
	public get num():number{
		return parseInt(this.numLab.text);
	}
	public get skillId():number{
		return this._skillId;
	}
	public set focus(value){
		this.rect.visible = value
	}
}