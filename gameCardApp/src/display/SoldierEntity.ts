class SoldierEntity extends BaseEntity{
	private _atkTar:SoldierEntity;
	public _mc:MovieClip;
	private _res:string;
	private _direc:number;
	//移动速度 s为单位 。 v*t = d 
	private curState:string = ActionState.STAND;
	private _barimg:egret.Shape;;
	private _watcher:eui.Watcher;
	private progressGroup:eui.Group;
	public ObjectPoolKey:string = "SoldierEntity";

	public soldierAttr:CardVo;

	public general:boolean = false;

	public w:number;
	public h:number;
	private _typeId:number;

	private soldierCampImg:eui.Image;

	public camp:number = 1;
	public constructor() {
		super();
	}
	protected initialize():void{

	}
	public setSoldierData(camp:number,res:string,attr:CardVo):void{
		this._camp = camp;
		this.camp = camp;
		this.soldierAttr = attr;
		this.scaleX = this.scaleY = 0.7;
		this.scale = 0.7;
		if(this._camp == -1 && (!this.general)){
			this.scaleX = this.scaleY = 0.4;
			this.scale = 0.4;
		}
		if(this.camp == 1){
			this.scaleX = this.scaleY = 0.5;
			this.scale = 0.5;
		}
		// if(res == "shanzei"){
		// 	this.scaleX = this.scaleY = 0.8;
		// }
		
		// if(this.general){
		// 	//当前是将领 基础属性增加
		// 	this.soldierAttr.hp = this.soldierAttr.hp;
		// 	this.soldierAttr.atk = this.soldierAttr.atk;
		// }
		// if(this._typeId == SoldierType.QI && !this.general){
		// 	this.scaleX = this.scaleY = 0.5;
		// }
		// if(_state == 2){
		// 	//打bioss
		// 	this.scaleX = this.scaleY = 1;
		// }
		this.hp = this.thp = this.soldierAttr.hp;
		let index:number = ((Math.random()*100)>>0) >50?1:-1;
		this.soldierAttr.atkDis += ((Math.random()*20)>>0)*index
		// this.w = this.soldierAttr.w;
		// this.h = this.soldierAttr.h;
		this._direc = this._camp == 1?1:-1;
		if(camp == 1){
			this._res = `${SKILL}${res}`;
		}else{
			this._res = `${MONSTER}${res}`;
		}
		
		// if(_state == 2){
		// 	//打boss
		// 	this._res = `${EFFECT}${res}`
		// }
		this._mc = new MovieClip();
		// let scale:number = 0.7
		// if(id == SoldierType.SOLDIER_QI){
		// 	scale = 0.5;
		// }
		// let scale = id == SoldierType.SOLDIER_QI?0.5:0.7;
		// if(id ==-1){scale =1}
		// this.scaleX = this._mc.scaleY = scale;
		// if(id != -1){
		// 	this.scaleX *=this._direc;
		// }
		this.addChild(this._mc);
		this._mc.playFile(this._res,-1,null,false,this.curState);

		this.progressGroup = new eui.Group();
		this.progressGroup.anchorOffsetX = 40
		this.progressGroup.width = 80;
		// this.progressGroup.scaleX = this.progressGroup.scaleY = 0.6;
		this.addChild(this.progressGroup);
		// this.progressGroup.x = -40;
		this.progressGroup.horizontalCenter = 0;
		this.progressGroup.y = -130;
		if(this.camp == 1){
			// this.progressGroup.x = 0;
		}

		// let hpBg:eui.Image = new eui.Image();
		// hpBg.source = "hp_progress_bg_png";
		// this.progressGroup.addChild(hpBg);
		// if(this.general){
		// 	this.progressGroup.y =-150;
		// 	this.progressGroup.x = -10;
		// }else{
		// 	this.progressGroup.visible = false;
		// }
		// if(this.general){
			// let nametxt:eui.Label = new eui.Label;
			// this.progressGroup.addChild(nametxt);
			// nametxt.textColor = this.camp == 1?0xf7f7f7:0xfc3434;
			// nametxt.fontFamily = "yt";
			// nametxt.size = 12;
			// nametxt.text = this.attrCfg.name;
			// nametxt.left = 70;
			// nametxt.top = 6;

			// let levelLab:eui.Label = new eui.Label();
			// this.progressGroup.addChild(levelLab);
			// levelLab.fontFamily = "yt";
			// levelLab.size = 20;
			// levelLab.text = this.soldierAttr.level .toString()+"级";
			// levelLab.horizontalCenter = 0;
			// levelLab.top = -23;
		// }
		
		let barRes:number = camp == 1?0x00ff00:0xfc3434;
		let barimg:egret.Shape = new egret.Shape();
		barimg.anchorOffsetX = 40;
		barimg.graphics.beginFill(barRes,1);
		barimg.graphics.drawRect(0,0,80,10);
		barimg.graphics.endFill();
		this._barimg = barimg;
		this.progressGroup.addChild(barimg);

		if(this.general){
			this.progressGroup.y = -200;
		}
		if(this._camp == -1 && this.general){
			let title:eui.Image = new eui.Image();
			let index:number = (Math.random()*21+1)>>0;
			title.source = `title_${index}_png`;
			title.scaleX = title.scaleY = 1;
			this.progressGroup.addChild(title);
			title.anchorOffsetX = title.width>>1;
			title.anchorOffsetY = title.height
			title.y = -20;
		}

		// this.soldierCampImg = new eui.Image();
		// this.progressGroup.addChild(this.soldierCampImg);
		// this.soldierCampImg.source = `type_${this._typeId}_png`;
		// this.soldierCampImg.left = 40;
		// this.soldierCampImg.top = 3;

		

		//测试代码
		// if(camp != 1 && this.general){
		// 	this.progressGroup.x = 0;
		// }
		//------
		this._watcher = eui.Binding.bindHandler(this,["_hp"],this.onHpChange,this);
	}
	private onHpChange(value:number):void{
		if(!isNaN(value)){
			let percent:number = value/this._thp;
			if(this._barimg){
				this._barimg.graphics.clear();
				let barRes:number = this.camp == 1?0x00ff00:0xfc3434;
				this._barimg.graphics.beginFill(barRes,1);
				this._barimg.graphics.drawRect(0,0,percent*80,10);
				this._barimg.graphics.endFill();
			}
		}
	}
	//克制攻击力
	private restriceAtk:number = 0;
	private atkFrame:number = 6;
	// private playCount:number = 1;
	/**执行攻击动作 */
	public execAtkAction():void{
		// if(GameApp.battleState == false){return}
		if(this.isInAtkDis()){
			if(this.curState != ActionState.ATTACK){
				this.curState = ActionState.ATTACK;
				egret.Tween.removeTweens(this);
				let time:number = 900;
				if(this.camp == 1){
					if(this.soldierAttr.atkspd && this.soldierAttr.atkspd > 6){
						time = time>>1;
						this.atkFrame = 24;
						// this.playCount = 2;
					}
				}
				if(this._atkTar && !this._atkTar.isDead){
					let angle:number = Math.atan2(this._atkTar.y - this.y,this._atkTar.x-this.x)*180/Math.PI;
					this.calculEntityDic(angle);
				}
				this._mc.playFile(this._res,1,null,false,this.curState,null,this.atkFrame);
				if(this.soldierAttr.id == 4){
					let timeout = setTimeout(function() {
						clearTimeout(timeout)
						let skillMc:MovieClip = new MovieClip();
						skillMc.scaleX = skillMc.scaleY = 0.8;
						skillMc.playFile(`${SKILL_EFF}skill_fs`,1,null,true);
						self.addChild(skillMc);
						skillMc.x = self._mc.x;
						skillMc.y = self._mc.y;
						if(self.scaleX == -1){
							skillMc.scaleX = -0.8;
						}
					}, 600);
					
				}
				// if(this._typeId == SoldierType.ARROW){
				// 	this.createArrow();
				// }
				//当前实体执行攻击动作 目标实体血量值减少
				let self = this;
				
				let timeout = setTimeout(function() {
					clearTimeout(timeout);
					if(self && self._mc){
						self.curState = ActionState.STAND;
						self._mc.playFile(self._res,-1,null,false,self.curState);
					}
					if(self && self._atkTar){
						let index:number = (Math.random()*15 + 5)>>0;
						let direct:number = ((Math.random()*100)>>0) >= 50?-1:1;
						let atk:number = self.soldierAttr.atk - self.restriceAtk + direct*index;
						// if(GameApp.curBattleLevel == 1 && self.camp == -1){
						// 	atk = 30;
						// }
						self._atkTar.reduceHp(atk);
						let hurtMc:MovieClip = new MovieClip();
						hurtMc.playFile(`${SKILL_EFF}hurt`,1,null,true);
						self.parent.addChild(hurtMc);
						hurtMc.x = self._atkTar.x;
						hurtMc.y = self._atkTar.y;
					}else{
						if(self._camp == -1 && self.x >= StageUtils.inst().getWidth() - 200){
							//直接攻击国王塔
							MessageManager.inst().dispatch(CustomEvt.REDUCE_HP,{hp:self.soldierAttr.atk,camp:self.camp});
							// if(self.soldierAttr.atktype == 2){
							// 	let effectmc:MovieClip = new MovieClip();
							// 	self.parent.addChild(effectmc);
							// 	effectmc.playFile(`${EFFECT}skill/boom`,1,null,true);
							// 	effectmc.x = self.x;
							// 	effectmc.y = self.y - self.soldierAttr.atkDis;
							// }
						}
					}	
				}, time);
			}
			
		}
	}
	private createArrow():void{
		let img:eui.Image = new eui.Image();
		img.source = "arrow_png";
		this.parent.addChild(img);
		img.anchorOffsetX = 20;
		img.scaleX = -this.camp;
		let angle:number = Math.atan2(this.atkTar.y - this.y,this.atkTar.x - this.x)*180/Math.PI;
		img.rotation = angle;
		img.x = this.x;
		img.y = this.y - (this.h>>1);
		egret.Tween.get(img).to({x:this._atkTar.x,y:this._atkTar.y},400).call(()=>{
			egret.Tween.removeTweens(img);
			img.parent.removeChild(img);
		},this)
	}
	/**等待移动状态 */
	public waitMoveAction():void{
		if(this.curState != ActionState.RUN){
			this.curState = ActionState.RUN;
			this._mc.playFile(this._res,-1,null,false,this.curState);
		}
		egret.Tween.removeTweens(this);
	}
	/**执行y轴一个身位的移动 */
	public execYmoveAction(dit:number,dis:number):void{
		egret.Tween.removeTweens(this);
		if(this.curState != ActionState.RUN){
			this.curState = ActionState.RUN;
			this._mc.playFile(this._res,-1,null,false,this.curState);
		}
		egret.Tween.get(this).to({y:dis},600).call(()=>{
			// egret.Tween.removeTweens(this);
		})
	}
	/**执行前往目标附近位置 */
	public execMoveAction(xy?:XY,cb?:()=>void,thisarg?:any,isquick:boolean = true):void{
		
		
		if(xy){
			let angle:number = Math.atan2(xy.y - this.y,xy.x-this.x)*180/Math.PI;
			this.calculEntityDic(angle)
			if(this.curState != ActionState.RUN){
				this.curState = ActionState.RUN;
				this._mc.playFile(this._res,-1,null,false,this.curState);
			}
			let startP:egret.Point = new egret.Point(this.x,this.y);
			let endP:egret.Point = new egret.Point(xy.x,xy.y);
			let distance:number = Math.sqrt(Math.pow(startP.x-endP.x,2) + Math.pow(startP.y-endP.y,2));
			let time:number = distance/this.soldierAttr.spd;
			// let useTime:number = time*1000;
			// if(!this.general && isquick){
			// 	useTime = time*500;
			// }
			egret.Tween.removeTweens(this);
			egret.Tween.get(this,{loop:false,onChange:()=>{
				this.judgeIfInView();
			},onChangeObj:this}).to({x:xy.x,y:xy.y},time*1000).call(()=>{
				egret.Tween.removeTweens(this);
				this.curState = ActionState.STAND;
				if(this._mc){
					this._mc.playFile(this._res,-1,null,false,this.curState);
				}
				if(cb && thisarg){cb.call(thisarg);}
			})
		}else{
			if(this && this._atkTar && !this._atkTar.isDead){
				let angle:number = Math.atan2(this._atkTar.y - this.y,this._atkTar.x-this.x)*180/Math.PI;
				this.calculEntityDic(angle);
				if(this.curState != ActionState.RUN){
					this.curState = ActionState.RUN;
					if(this._mc){
						this._mc.playFile(this._res,-1,null,false,this.curState);
					}
				}
				let startP:egret.Point = new egret.Point(this.x,this.y);
				let endP:egret.Point = new egret.Point(this._atkTar.x,this._atkTar.y);
				let distance:number = Math.sqrt(Math.pow(startP.x-endP.x,2) + Math.pow(startP.y-endP.y,2));
				egret.Tween.removeTweens(this);
				let time:number = distance/this.soldierAttr.spd;
				egret.Tween.get(this,{loop:false,onChange:()=>{
					this.judgeIfInView();
					if(this.isInAtkDis()){
						egret.Tween.removeTweens(this)
					}
				},onChangeObj:this}).to({x:this._atkTar.x,y:this._atkTar.y},time*1000).call(()=>{
					egret.Tween.removeTweens(this);
				})
			}
		}
		
	}
	public isReleaseSkill:boolean = false;
	/**判断是否进入了页面中固定的位置 */
	public judgeIfInView():boolean{
		if(this._camp == 1 || this.isReleaseSkill || (!this.general)){return}
		let posx:number = 100 + ((Math.random()*100)>>0);
		if(this.x >= posx){
			this.isReleaseSkill = true;
			this.playAtkAction(4);
			MessageManager.inst().dispatch(CustomEvt.BOSS_RELEASESKILL)
			return true;
		}
		return false;
	}
	/**执行站立状态 */
	public execStandAction():void{
		this.curState = ActionState.STAND;
		this._mc.playFile(this._res,-1,null,false,this.curState);
	}
	/**当前boss 的技能播放状态 */
	public playState:boolean = false;
	/**执行站立状态 */
	public playAtkAction(framnum:number):void{
		egret.Tween.removeTweens(this);
		this.curState = ActionState.ATTACK;
		this._mc.playFile(this._res,-1,null,false,this.curState,null,framnum);
		let releaseMc:MovieClip = new MovieClip();
		this.parent.addChild(releaseMc);
		releaseMc.playFile(`${EFFECT}release`,3);
		releaseMc.x = this.x;
		releaseMc.y = this.y - 50;
		this.playState = true;
		let self = this;
		let timeout = setTimeout(function() {
			clearTimeout(timeout);
			self.playState = false;
		}, 1500);
	}
	public isInAtk:boolean = false;
	/**获取到目标位置的距离 是否达到攻击距离 */
	public isInAtkDis():boolean{

		if(this && this._atkTar && !this._atkTar.isDead){
			let startP:egret.Point = new egret.Point(this.x,this.y);
			let endP:egret.Point = new egret.Point(this._atkTar.x,this._atkTar.y);
			let distance:number = Math.sqrt(Math.pow(endP.x - startP.x,2) + Math.pow(endP.y - startP.y,2));
			return  Math.abs(distance) <= this.soldierAttr.atkDis;
		}
		return this.isInAtk;
		
	}
	/**锁定目标 */
	public lookAt(_atkTar:SoldierEntity,isNew:boolean = false):void{
		// this.addAttrRestrict();
		if(isNew){
			this._atkTar = _atkTar;
			return;
		}
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
		// ObjectPool.push(this);
		// this.curState = ActionState.DEAD;
		// this._mc.playFile(this._res,1,null,true,this.curState);
		// if(this._watcher){
		// 	this._watcher.unwatch();
		// }
		let self = this;
		// let timeout = setTimeout(function() {
		// 	clearTimeout(timeout)
		// 	self._atkTar = null;
		// 	if(self && self._mc){
		// 		self.removeChild(self._mc);
		// 		self._mc = null;
		// 	}
		// 	if(self && self.parent){
		// 		self.parent.removeChild(self);
		// 	}
		// }, 600);
		self._atkTar = null;
		if(self && self._mc){
			self.removeChild(self._mc);
			self._mc = null;
		}
		if(self && self.parent){
			self.parent.removeChild(self);
		}
	}
	// private addAttrRestrict():void{
	// 	if(!this._atkTar){return}
	// 	if(this._typeId == SoldierType.ARROW){
	// 		//当前我是弓箭手 克制盾 被克制骑兵
	// 		if(this._atkTar._typeId == SoldierType.QI){
	// 			this.restriceAtk = 50;
	// 		}else if(this._atkTar._typeId == SoldierType.SHIELD){
	// 			this.restriceAtk = -50;
	// 		}else{
	// 			this.restriceAtk = 0;
	// 		}
	// 	}else if(this._typeId == SoldierType.QI){
	// 		//当前我是骑兵
	// 		if(this._atkTar._typeId == SoldierType.ARROW){
	// 			this.restriceAtk = -50;
	// 		}else if(this._atkTar._typeId == SoldierType.SHIELD){
	// 			this.restriceAtk = 50;
	// 		}else{
	// 			this.restriceAtk = 0;
	// 		}
	// 	}else if(this._typeId == SoldierType.SHIELD){
	// 		if(this._atkTar._typeId == SoldierType.ARROW){
	// 			this.restriceAtk = 50;
	// 		}else if(this._atkTar._typeId == SoldierType.QI){
	// 			this.restriceAtk = -50;
	// 		}else{
	// 			this.restriceAtk = 0;
	// 		}
	// 	}
	// }
	public set hp(value:number){
		this._hp = value;
	}
	public set thp(value:number){
		this._thp = value;
	}
	public get atkTar():SoldierEntity{
		return this._atkTar;
	}
	public set buffAtk(value){
		this.buffAttack = value;
	}
	public set buffHP(value){
		this.buffHp = value;
	}
	// public set buffDefense(value:number){
	// 	this.buffDef = value;
	// }
}
