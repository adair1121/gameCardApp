class CollectView extends BaseEuiView{

	private vj:VirtualJoystick;
	private _angle:number;
	
	//木材商人范围矩阵
	private npcWoodRect:egret.Rectangle = new egret.Rectangle(1157,154,320,240);

	//传送条件
	// private condition_gold:number = 5;

	private infoGroup:eui.Group;
	private rect:eui.Rect;
	private collectBtn:eui.Image;
	private collectNum:number = 10;

	private param:any;
	private _first:boolean = false;

	// private atkBtn:eui.Image;

	private _enemyEntity:EnemyEntity;

	private cityBtn:eui.Image;

	/**传送阵矩阵格子范围 */
	// private _transRectGridArea:XY[] = [];

	private _fingerMc:MovieClip;

	public constructor() {
		super();
	}
	public open(...param):void{
		
		let firststr:string = egret.localStorage.getItem(LocalStorageEnum.ENTER_FIRST);
		this._first = !!firststr;
		this.rect.touchEnabled = false;
		this.param = param;
		this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseInfo,this);
		this.collectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseInfo,this)
		this.alpha = 0;
		EntityManager.ins<EntityManager>().reestRolePos()
		this.rect.visible = false;
		
		egret.Tween.get(this).to({alpha:1},1000,egret.Ease.circIn).call(()=>{
			egret.Tween.removeTweens(this);
			if(!this._first){
				this.rect.visible = true;
				egret.localStorage.setItem(LocalStorageEnum.ENTER_FIRST,"true");
				egret.Tween.get(this.infoGroup).to({bottom:0},600,egret.Ease.circOut).call(()=>{
					this.rect.touchEnabled = true;
					egret.Tween.removeTweens(this.infoGroup);
				},this)
			}else{
				this.onCloseInfo();
			}
		},this)
		// this.addTouchEvent(this.atkBtn,this.onAttack,true);
		this.addTouchEvent(this.cityBtn,this.judgeifTrans,true);
		StageUtils.ins<StageUtils>().getStage().addEventListener(StartGameEvent.VJ_END,this.onVjEnd,this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAttack,this);
		StageUtils.ins<StageUtils>().getStage().addEventListener(StartGameEvent.REMOVE_ITEM,this.onRemoveItem,this);
		// this._transRectGridArea = GameMap.calculBuildGridArea(this.transRect);
		// this.clearRunGrid(this._transRectGridArea);
		// let npcWoodRect:XY[] = GameMap.calculBuildGridArea(this.npcWoodRect);
		// this.clearRunGrid(npcWoodRect);
	}
	private onRemoveItem(evt):void{
		let area:XY[] = evt.data.area;
		for(let i:number = 0;i<area.length;i++){
			for(let j:number = 0;j<this.walkedGrid.length;j++){
				let itemGrid:{row:number,col:number} = this.walkedGrid[j];
				if(itemGrid.col == area[i].x && itemGrid.row == area[i].y){
					this.walkedGrid.splice(j,1);
				}
			}
		}
		let self = this;
		let timeout = setTimeout(function() {
			clearTimeout(timeout);
			self.addCollectItem();
		}, 2000);
		
	}
	private onAttack(evt:egret.TouchEvent):void{
		if(!this._enemyEntity){return}
		let globalP:egret.Point = this._enemyEntity.parent.localToGlobal(this._enemyEntity.x,this._enemyEntity.y);
		let disx:number = Math.abs(evt.stageX - globalP.x);
		let disy:number = Math.abs(evt.stageY - globalP.x);
		if(disx > 100 && disy > 100){
			return;
		}
		if(!this._enemyEntity || (this._enemyEntity && this._enemyEntity.isDead)){return}
		if(Math.abs(this._hero.x - this._enemyEntity.x) <= 80 && Math.abs(this._hero.y - this._enemyEntity.y) <= 80){
			this._hero.playAction(ActionEnum.attack,1);
			let self = this;
			let timout2 = setTimeout(function() {
				self._hero.playAction(ActionEnum.stand,-1);
			}, 600);
			this._enemyEntity.reduceHp();
			if(this._enemyEntity.hpcount <= 0){
				//已经死亡;
				// this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onAttack,this);
				let getGold:number = (Math.random()*10+5)>>0;
				GameApp.ins<GameApp>().gold+=getGold;
				UserTips.ins<UserTips>().showTips("恭喜您击杀山贼获得元宝x"+getGold);

				this._enemyEntity.showSpeak("青山不改、绿水长流");
				this._enemyEntity.playAction(ActionEnum.stand,-1);
				EntityManager.ins<EntityManager>().removeEntityFromList(this._enemyEntity);
				clearInterval(this.timeInterval);
				clearTimeout(this.endTimeOut)
				let self = this;
				let timeout = setTimeout(()=>{
					clearTimeout(timeout);
					egret.Tween.removeTweens(self._enemyEntity);
					self._enemyEntity.parent.removeChild(self._enemyEntity);
					self._enemyEntity = null;
				},1000)
			}
		}
	}
	private onCloseInfo():void{
		egret.Tween.get(this.infoGroup).to({bottom:-170},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.infoGroup)
			this.infoGroup.parent.removeChild(this.infoGroup);
			this.collectBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseInfo,this);
			this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseInfo,this);
			this.rect.parent.removeChild(this.rect);
			this._fingerMc = new MovieClip();
			
			egret.Tween.get(this.vj).to({left:30},600,egret.Ease.circOut).call(()=>{
				egret.Tween.removeTweens(this.vj);
			},this)
			egret.Tween.get(this.cityBtn).to({top:20},600,egret.Ease.circOut).call(()=>{
				egret.Tween.removeTweens(this.cityBtn);
			},this)
			this.vj.start();
			this.vj.addEventListener(VJEvent.VJ_START,this.onVjStart, this);
			this.vj.addEventListener(VJEvent.VJ_MOVE, this.onVjChange, this);
			this.vj.addEventListener(VJEvent.VJ_END, this.onVjEnd, this);
			this._hero = EntityManager.ins<EntityManager>().getEntity<HeroEntity>(GameApp.ins<GameApp>().role_insId);
			this.addCollectItem();
			this.startEnemyMoveAI();
			LayerManager.MAP_LAYER.addChild(this._fingerMc);
			this._fingerMc.visible = false;
			this.addMainCom(this.param);
		},this)
	}
	private runGrid:{row:number,col:number}[];
	/**开启敌人移动ai */
	private startEnemyMoveAI():void{
		let index:number = (Math.random()*100)>>0;
		if(index>=70){
			if(!this.runGrid){
				this.runGrid = [];
				this.runGrid = this.runGrid.concat(GameMap.runGrid)
			}
			let posIndex:number = (Math.random()*this.runGrid.length)>>0;
			let posObj:{row:number,col:number} = this.runGrid[posIndex];
			let xy:XY = GameMap.grid2Point(posObj.col,posObj.row);
			this._enemyEntity = EntityManager.ins<EntityManager>().createEntity(xy);
			this.touchEnabled = true;
			
			// egret.Tween.get(this.atkBtn).to({right:39},600,egret.Ease.circOut).call(()=>{
			// 	egret.Tween.removeTweens(this.atkBtn);
			// },this)
			this.moveEnd(600);
		}
	}
	private endTimeOut;
	/**判断移动完成 */
	private moveEnd(time:number = 5000):void{
		this._enemyEntity.playAction(ActionEnum.stand,-1);
		let self = this;
		if(!this.runGrid){
			this.runGrid = [];
			this.runGrid = this.runGrid.concat(GameMap.runGrid);
		}
		this.endTimeOut = setTimeout(()=>{
			clearTimeout(self.endTimeOut);
			let index:number = (Math.random()*this.runGrid.length)>>0;
			let runGrid = this.runGrid[index];
			self.findPath(runGrid.col,runGrid.row);
		},time)
	}
	private timeInterval;
	//执行攻击
	private execAtk():void{
		if(!this._enemyEntity || (this._enemyEntity && this._enemyEntity.isDead)){return}
		let gold:number = GameApp.ins<GameApp>().gold;
		this._enemyEntity.touchEnabled = true;
		if(this._fingerMc.visible == false ){
			let self = this;
			this._fingerMc.playFile(`${EFFECT}fingerClick`,-1);
			this._fingerMc.x = this._enemyEntity.x;
			this._fingerMc.y = this._enemyEntity.y;
			this._fingerMc.visible = true;
			let timeout = setTimeout(function() {
				clearTimeout(timeout);
				self._fingerMc.visible = false;
			}, 3000);
		}
		if(gold <= 0){
			//当前没有元宝
			this._enemyEntity.playAction(ActionEnum.stand,-1);
			this._enemyEntity.showSpeak("竟如此穷困潦倒...罢了，罢了");
			GameApp.ins<GameApp>().gold += 3;
			UserTips.ins<UserTips>().showTips("获得山贼的怜悯,元宝+"+3);
			//随机一个点走
			this.moveEnd();
		}else{
			this._enemyEntity.showSpeak("此山是我开,此树是我栽，若打此山过，留下买路财");
			this._enemyEntity.playAction(ActionEnum.attack,-1);
			let self = this;
			this.timeInterval = setInterval(()=>{
				let curGold:number = GameApp.ins<GameApp>().gold;
				if(Math.abs(self._hero.x - self._enemyEntity.x) > 80 && Math.abs(self._hero.y - self._enemyEntity.y) > 80){
					//当前人物已经远离
					let heroPos:XY = GameMap.point2Grid(self._hero.x,self._hero.y);
					self.findPath(heroPos.x,heroPos.y);
					clearInterval(self.timeInterval);
					return;
				}
				if(curGold <= 0){
					self._enemyEntity.showSpeak("青山不改、绿水长流");
					EntityManager.ins<EntityManager>().removeEntityFromList(self._enemyEntity);
					clearInterval(self.timeInterval);
					egret.Tween.get(self._enemyEntity).to({alpha:0},1000).call(()=>{
						egret.Tween.removeTweens(self._enemyEntity);
						self._enemyEntity.parent.removeChild(self._enemyEntity);
						self._enemyEntity = null;
					},self)
				}else{
					let index:number = (Math.random()*100)>>0;
					if(index >= 95){
						GameApp.ins<GameApp>().gold -= 1;
						UserTips.ins<UserTips>().showTips("失去元宝x"+1);
					}
					let angle:number = Math.atan2(self._hero.y - self._enemyEntity.y,self._hero.x - self._enemyEntity.x)*180/Math.PI;
					EntityManager.ins<EntityManager>().calculEntityDic(self._enemyEntity,angle);
					self._enemyEntity.playAction(ActionEnum.attack, -1)
				}
			},1000)
		}
	}
	private findPath(ex:number,ey:number):any[]{
		if(!this._enemyEntity || (this._enemyEntity && this._enemyEntity.isDead)){return}
		GameMap.AstarNode.setEndNode(ex,ey);

		let pxy:XY = GameMap.point2Grid(this._enemyEntity.x ,this._enemyEntity.y);
		GameMap.AstarNode.setStartNode(pxy.x, pxy.y);

		var aStar:astar.AStar = new astar.AStar();
		if(aStar.findPath(GameMap.AstarNode))
		{
			let _path = aStar.path;
			this.runPath(_path);
			return _path
		}
		return null;
	}
	private runPath(pathlist):void{
		if(!this._enemyEntity || (this._enemyEntity && this._enemyEntity.isDead)){return}
		let node = pathlist.shift();
		let gx:number = node.x;
		let gy:number = node.y;
		
		let xy:XY = GameMap.grid2Point(gx,gy);
		let angle:number = Math.atan2(xy.y - this._enemyEntity.y,xy.x - this._enemyEntity.x)*180/Math.PI;
		EntityManager.ins<EntityManager>().calculEntityDic(this._enemyEntity,angle);
		this._enemyEntity.playAction(ActionEnum.run);
		egret.Tween.removeTweens(this._enemyEntity)
		egret.Tween.get(this._enemyEntity,{loop:false,onChange:()=>{
			if(Math.abs(this._hero.x - this._enemyEntity.x) <= 80 && Math.abs(this._hero.y - this._enemyEntity.y) <= 80){
				//当前已经在人物附近
				this.execAtk();
				egret.Tween.removeTweens(this._enemyEntity)
			}else{
				this._enemyEntity.touchEnabled = false;
				this._fingerMc.visible = false;
			}
		},onChangeObj:this}).to({x:xy.x,y:xy.y},800).call(()=>{
			egret.Tween.removeTweens(this._enemyEntity);
			if(pathlist.length){
				this.runPath(pathlist);
			}else{
				this.moveEnd(2000)
			}
		},this)
	}
	private walkedGrid:{row:number,col:number}[] = [];
	//添加收集物 判断空闲的格子
	private addCollectItem():void{
		if(!this.runGrid){
			this.runGrid = [];
			this.runGrid = this.runGrid.concat(GameMap.runGrid);
		}

		let index:number = (Math.random()*this.runGrid.length)>>0;
		let curG:{row:number,col:number} = this.runGrid[index];
		if(this.isInWalked(curG)){
			//当前的点在阻挡点中 需要再次随机
			this.addCollectItem();
			return;
		}
		// this.walkedGrid.push(this.runGrid[index]);
		let p:XY = GameMap.grid2Point(curG.col,curG.row);
		p.x += GameMap.CELL_SIZE/2;
		p.y += GameMap.CELL_SIZE/2;
		let resObj = GlobalFun.getResUrl();
		
		let obj:{x:number,y:number,w:number,h:number,res:string,itemName:string,resType:number} = {
			x:p.x,y:p.y,w:resObj.attr["w"],h:resObj.attr["h"],res:resObj.res,itemName:resObj.attr["name"],resType:resObj.attr["resType"]
		}
		let grids:XY[] = MapView.ins<MapView>().addToMapLayer(obj);
		for(let i:number = 0;i<grids.length;i++){
			let xy:XY = grids[i];
			for(let j:number = 0;j<this.runGrid.length;j++){
				let itemGrid:{row:number,col:number} = this.runGrid[j];
				if(itemGrid.col == xy.x && itemGrid.row == xy.y){
					this.walkedGrid.push(this.runGrid[j])
					break;
				}
			}
		}
		this.collectNum -= 1;
		if(this.collectNum > 0){
			this.addCollectItem();
		}else{
			this.collectNum = 0;
		}
	}
	/**是否在阻挡格子集合中 */
	private isInWalked(g:{row:number,col:number}):boolean{
		for(let j:number = 0;j<this.walkedGrid.length;j++){
			let itemGrid:{row:number,col:number} = this.walkedGrid[j];
			if(itemGrid.col == g.col && itemGrid.row == g.row){
				return true;
			}
		}
		return false;
	}
	private onVjStart():void{
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}
	private onVjChange(evt:VJEvent):void{
		this._angle = evt.data;
	}
	private _hero:HeroEntity;
	private onEnterFrame(evt:egret.Event):void{
		if(this._angle){
			
			let offestX:number = Math.cos(this._angle)*6;
			let offestY:number = Math.sin(this._angle)*6;
			let speedX = this._hero.x + offestX>>0;
			let speedY = this._hero.y + offestY>>0;
			// let point: egret.Point = qmr.SceneModel.prototype.mainScene.globalToLocal(evt.stageX, evt.stageY);
			let xy:XY = GameMap.point2Grid(speedX,speedY);
			let moveable: boolean = GameMap.walkable(xy.x,xy.y);
			EntityManager.ins<EntityManager>().calculEntityDic(this._hero,this._angle*180/Math.PI);
			if (moveable) {
				let enemyIndex:number = LayerManager.MAP_LAYER.getChildIndex(this._enemyEntity);
				if(this._enemyEntity){
					if(this._hero.y > this._enemyEntity.y){
						LayerManager.MAP_LAYER.setChildIndex(this._hero,enemyIndex+1);
					}else{
						LayerManager.MAP_LAYER.setChildIndex(this._hero,enemyIndex - 1);
					}
				}
				
				this._hero.playAction(ActionEnum.run)
				MapView.ins<MapView>().refrehMapViewPort(offestX,offestY);
				// this.judgeifTrans()
			}
		}
	}
	/**判断是否靠近了木材商人 */
	private isNearByNpcWood():void{

	}
	/**判断是否可以传送 */
	private judgeifTrans():void{
		let jobstr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_JOB);
		let goldStr:string = egret.localStorage.getItem(LocalStorageEnum.GOLD_NUM);
		
		if(parseInt(jobstr) < 1 && parseInt(goldStr) < 200){
			//未参军 且参军条件不足
			UserTips.ins<UserTips>().showTips("达到军士等级或交纳300元宝才能进城。")
			return;
		}
		this.onVjEnd();
		this.touchEnabled = false;
		ViewManager.ins<ViewManager>().open(GameMainView);
		egret.Tween.get(this).to({alpha:0},1000,egret.Ease.circIn).call(()=>{
			egret.Tween.removeTweens(this);
			ViewManager.ins<ViewManager>().close(CollectView);
		},this)
		
	}
	private onVjEnd():void{
		this._angle = null;
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		this._hero.playAction(ActionEnum.stand);
	}
	public close():void{
		if(this.timeInterval){
			clearInterval(this.timeInterval);
		}
		if(this.endTimeOut){
			egret.clearTimeout(this.endTimeOut);
		}
		if(this._enemyEntity){
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onAttack,this);
			EntityManager.ins<EntityManager>().removeEntityFromList(this._enemyEntity);
			if(this._enemyEntity.parent){
				this._enemyEntity.parent.removeChild(this._enemyEntity);
			}
		}
		this.runGrid = null;
		this.walkedGrid = [];
		StageUtils.ins<StageUtils>().getStage().removeEventListener(StartGameEvent.VJ_END,this.onVjEnd,this);
		StageUtils.ins<StageUtils>().getStage().removeEventListener(StartGameEvent.REMOVE_ITEM,this.onRemoveItem,this);
		this.vj.removeEventListener(VJEvent.VJ_START,this.onVjStart, this);
		this.vj.removeEventListener(VJEvent.VJ_MOVE, this.onVjChange, this);
		this.vj.removeEventListener(VJEvent.VJ_END, this.onVjEnd, this);
		this.removeTouchEvent(this.cityBtn,this.judgeifTrans);
		// this.removeTouchEvent(this.atkBtn,this.onAttack);
		
		MapView.ins<MapView>().clearItem();
		this.removeOtherEvent();
	}
}
ViewManager.ins<ViewManager>().reg(CollectView,LayerManager.UI_Main)