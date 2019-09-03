class BaseEntity extends eui.Component{
	//阵营
	protected _camp:number;
	//entityid值
	protected _id:number;
	//方向
	protected _dic:number = 3;

	protected _hp:number = 100;
	protected _attack:number = 20;
	protected _changeValue:number = 0.1;
	protected _isDead:boolean = false;
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
		return this._attack + dic*(this._attack*this._changeValue);
	}
	public reduceHp(dmg:number):void{
		this._hp-=dmg;
		if(this._hp<=0){
			this._hp = 0;
			this._isDead = true;
		}
	}
	protected dispose():void{
		
	}
}