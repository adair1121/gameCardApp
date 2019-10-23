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
	public reduceHp(dmg:number):void{
		if(this.buffHp > 0){
			this.buffHp -= dmg;
		}else{
			this._hp-=(dmg - this.buffDef);
			if(this._hp<=0){
				this._hp = 0;
				this._isDead = true;
			}
		}
	}
	//计算方向
	public calculEntityDic(angle:number):void{
		if((angle >= -90 && angle < 0) || (angle >= 0 && angle <= 90)){
			this._dic = 1
		}else{
			this._dic = -1;
		}
		this.scaleX = this._dic*this.scaleX;
	}
	protected dispose():void{
		
	}
}