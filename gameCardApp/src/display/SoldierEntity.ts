class SoldierEntity extends BaseEntity{
	private _atkTar:SoldierEntity;
	private _mc:MovieClip;
	private _res:string;
	private _direc:number;
	//攻击距离
	private _atkDis:number;
	//移动速度 s为单位 。 v*t = d 
	private _speed:number;
	private curState:string = ActionState.STAND;
	private _typeId:number;

	
	public constructor() {
		super();
	}
	protected initialize():void{
		
	}
	public setSoldierData(camp:number,res:string,_atkDis:number,_speed:number,id:number):void{
		this._camp = camp;
		this._direc = this._camp == 1?1:-1;
		this._atkDis = _atkDis;
		this._res = `${SOLDIER}${res}`;
		this._speed = _speed;
		this._mc = new MovieClip();
		this._typeId = id;
		// let scale:number = 0.7
		// if(id == SoldierType.SOLDIER_QI){
		// 	scale = 0.5;
		// }
		let scale = id == SoldierType.SOLDIER_QI?0.5:0.7;
		if(id ==-1){scale =1}
		this.scaleX = this._mc.scaleY = scale;
		if(id != -1){
			this.scaleX *=this._direc;
		}
		this.addChild(this._mc);
		this._mc.playFile(this._res,-1,null,false,ActionState.STAND);
	}
	/**执行攻击动作 */
	public execAtkAction():void{
		if(this._atkTar && !this._atkTar._isDead && this.isInAtkDis()){
			if(this.curState != ActionState.ATTACK){
				this.curState = ActionState.ATTACK;
				egret.Tween.removeTweens(this);
				this._mc.playFile(this._res,1,null,false,ActionState.ATTACK);
				if(this._typeId == SoldierType.SOLDIER_TOUSHICHE){
					this.createStone();
				}
				//当前实体执行攻击动作 目标实体血量值减少
				let self = this;
				let timeout = setTimeout(function() {
					clearTimeout(timeout);
					if(self && self._mc){
						self.curState = ActionState.STAND;
						self._mc.playFile(self._res,-1,null,false,ActionState.STAND);
					}
					if(self && self._atkTar){
						self._atkTar.reduceHp(self.attack);
					}	
				}, 700);
			}
			
		}
	}
	private createStone():void{
		let dict:number = this.camp == 1?1:-1;
		let atkStone:AttackStoneItem = new AttackStoneItem(this._atkTar.x,this._atkTar.y,this.x - 60*dict,this.y - 30,this.camp);
		this.parent.addChild(atkStone);
		atkStone.anchorOffsetX = atkStone.width>>1;
		atkStone.anchorOffsetY = atkStone.height>>1;
		atkStone.x = this.x - 60*dict;
		atkStone.y = this.y - 30;
		atkStone.scaleX = atkStone.scaleY = 0.6;
	}
	
	/**执行前往目标附近位置 */
	public execMoveAction():void{
		if(this.curState != ActionState.RUN){
			this.curState = ActionState.RUN;
			this._mc.playFile(this._res,-1,null,false,ActionState.RUN);
		}
		if(this && this._atkTar && !this._atkTar.isDead){
			let startP:egret.Point = new egret.Point(this.x,this.y);
			let endP:egret.Point = new egret.Point(this._atkTar.x,this._atkTar.y);
			let distance:number = Math.sqrt(Math.pow(startP.x-endP.x,2) + Math.pow(startP.y-endP.y,2));
			egret.Tween.removeTweens(this);
			let time:number = distance/this._speed;
			egret.Tween.get(this,{loop:false,onChange:()=>{
				if(this.isInAtkDis()){
					egret.Tween.removeTweens(this)
				}
			},onChangeObj:this}).to({x:this._atkTar.x,y:this._atkTar.y},time*1000).call(()=>{
				egret.Tween.removeTweens(this);
			})
		}
	}
	/**执行站立状态 */
	public execStandAction():void{
		this.curState = ActionState.STAND;
		this._mc.playFile(this._res,-1,null,false,ActionState.STAND);
	}
	/**获取到目标位置的距离 是否达到攻击距离 */
	public isInAtkDis():boolean{
		if(this && this._atkTar && !this._atkTar.isDead){
			let startP:egret.Point = new egret.Point(this.x,this.y);
			let endP:egret.Point = new egret.Point(this._atkTar.x,this._atkTar.y);
			let distance:number = Math.sqrt(Math.pow(endP.x - startP.x,2) + Math.pow(endP.y - startP.y,2));
			return Math.abs(distance) <= this._atkDis;
		}
		return false;
		
	}
	/**锁定目标 */
	public lookAt(_atkTar:SoldierEntity):void{
		if(!this._atkTar ||(this._atkTar && this._atkTar._isDead)){
			//重新锁定目标
			this._atkTar = _atkTar;
		}else{
			return;
		}
	}
	public get isDead():boolean{
		return this._isDead;
	}
	public dispose():void{
		this._mc.playFile(this._res,1,null,true,ActionState.DEAD);
		let self = this;
		let timeout = setTimeout(function() {
			clearTimeout(timeout)
			self._atkTar = null;
			if(self && self._mc){
				self.removeChild(self._mc);
				self._mc = null;
			}
			if(self && self.parent){
				self.parent.removeChild(self);
			}
		}, 600);
		
	}
	public set hp(value:number){
		this._hp = value;
	}
	public get atkTar():SoldierEntity{
		return this._atkTar;
	}
}