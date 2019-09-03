class EntityManager extends BaseClass{
	
	private _entitys:any[];
	private _entityList:SoldierEntity[];
	private _isinit:boolean = false;
	public constructor() {
		super();
	}
	public init():void{
		if(this._isinit){
			
			return
		}
		this._entityList = [];
		this._isinit = true;
		let heroEntity:HeroEntity = new HeroEntity();
		LayerManager.MAP_LAYER.addChild(heroEntity);
		heroEntity.playAction(ActionEnum.stand);
		heroEntity.x = StageUtils.ins<StageUtils>().getWidth()>>1;
		heroEntity.y = StageUtils.ins<StageUtils>().getHeight()>>1;
		let pos:XY = GameMap.point2Grid(heroEntity.x,heroEntity.y);
		heroEntity.gx = pos.x;
		heroEntity.gy = pos.y;
		this._entitys = [heroEntity];
	}
	public reestRolePos():void{
		let heroEntity:HeroEntity = this.getEntity(GameApp.ins<GameApp>().role_insId) as HeroEntity;
		// heroEntity.x -= 100;
	}
	public createEntity(xy:XY):EnemyEntity{
		let enemtyEntity:EnemyEntity = new EnemyEntity();
		LayerManager.MAP_LAYER.addChild(enemtyEntity);
		enemtyEntity.playAction(ActionEnum.stand);
		enemtyEntity.x = xy.x;
		enemtyEntity.y = xy.y;
		this._entitys.push(enemtyEntity);
		return enemtyEntity;
	}
	public getEntity<T>(id:number):T{
		for(let i:number = 0;i<this._entitys.length;i++){
			let entity = this._entitys[i];
			if(entity.instId == id){
				return entity;
			}
		}
	}
	/**获取敌人列表 */
	public getEnemyList():EnemyEntity[]{
		let arr:EnemyEntity[] = [];
		for(let i:number = 0;i<this._entitys.length;i++){
			if(this._entitys[i].camp ==2){
				arr.push(this._entitys[i])
			}
		}
		return arr;
	}
	/**从列表移除实体 */
	public removeEntityFromList(entity:BaseEntity):void{
		for(let i:number = 0;i<this._entitys.length;i++){
			if(this._entitys[i].instId == entity.instId){
				this._entitys.splice(i,1);
				break;
			}
		}
	}
	//计算方向
	public calculEntityDic(entity:BaseEntity,angle:number):void{
		if(angle >= -20 && angle <= 20){
			entity.dic = DirectionEnum.RIGHT;
			entity.scaleX = 1;
		}else if(angle < -20 && angle >= -70){
			entity.dic = DirectionEnum.TR;
			entity.scaleX = 1;
		}else if(angle < -70 && angle > -110){
			entity.dic = DirectionEnum.TOP;
			entity.scaleX = 1;
		}else if(angle >20 && angle <= 70){
			entity.dic = DirectionEnum.RB
			entity.scaleX = 1;
		}else if(angle >70&& angle<=110){
			entity.dic = DirectionEnum.BOTTOM;
			entity.scaleX = 1;
		}else if(angle > 110 && angle <= 160){
			entity.dic = DirectionEnum.RB;
			entity.scaleX = -1;
		}else if((angle > 160 && angle <= 200)){
			entity.dic = DirectionEnum.RIGHT;
			entity.scaleX = -1;
		}else if(angle >-160 && angle <= -110){
			entity.dic = DirectionEnum.TR;
			entity.scaleX = -1;
		}
	}
}