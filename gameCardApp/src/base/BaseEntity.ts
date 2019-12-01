class BaseEntity extends eui.Component{
	//阵营
	protected _camp:number;
	//entityid值
	protected _id:number;
	//方向
	protected _dic:number = 3;

	protected _hp:number = 40;
	protected _thp:number = 40;
	protected _attack:number = 20;
	protected _changeValue:number = 0.1;
	protected _isDead:boolean = false;

	protected buffAttack:number = 0;
	protected buffHp:number = 0;
	protected buffDef:number = 0;
	protected scale:number = 1;
	public constructor() {
		super();
		this.initialize();
	}
	protected initialize():void{}

	public get camp():number{
		return this._camp;
	}
	public get instId():number{
		return this._id;
	}
	public set dic(value:number){
		this._dic = value;
	}
	public get dic():number{
		return this._dic;
	}
	public get attack():number{
		let index:number = (Math.random()*100)>>0;
		let dic:number = index >= 50?1:-1;
		return (this._attack+this.buffAttack) + dic*((this._attack+this.buffAttack)*this._changeValue);
	}
	public set attack(value:number){
		this._attack = value;
	}
	public getIndex():number{
		return ((Math.random()*100)>>0) > 50?1:-1;
	}
	public reduceHp(dmg):void{
		if(this.buffHp > 0){
			this.buffHp -= dmg;
		}else{
			let changeNum:number = ((parseInt(dmg)*0.2)>>0)*this.getIndex();
			let dmgNum:number =(parseInt(dmg) - this.buffDef + changeNum);
			this._hp-=dmgNum;
			if(this._hp<=0){
				this._hp = 0;
				this._isDead = true;
			}
			let dmgfont:eui.BitmapLabel = new eui.BitmapLabel();
			dmgfont.scaleX = dmgfont.scaleY = 0.7;
			dmgfont.font = "dmg_fnt";
			if(this.parent){
				this.parent.addChildAt(dmgfont,this.parent.numChildren - 1);
			}
			dmgfont.text = "-"+dmgNum;
			dmgfont.x = this.x;
			dmgfont.y = this.y + -100 + ((Math.random()*50)>>0);
			egret.Tween.get(dmgfont).to({y:this.y-150},600+((Math.random()*400)>>0),egret.Ease.circIn).call(()=>{
				egret.Tween.removeTweens(dmgfont);
				if(dmgfont && dmgfont.parent){
					dmgfont.parent.removeChild(dmgfont);
				}
			},this)
		}
	}
	//计算方向
	public calculEntityDic(angle:number):void{
		if((angle >= -90 && angle < 0) || (angle >= 0 && angle <= 90)){
			this._dic = 1
		}else{
			this._dic = -1;
		}
		this.scaleX = this._dic*this.scale*(-this.camp);
	}
	protected dispose():void{
		
	}
}