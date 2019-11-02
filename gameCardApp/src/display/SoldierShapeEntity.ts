class SoldierShapeEntity extends BaseClass{

	private _shapeType:number;
	/**
	 * shape :  ShapeType_1 ShapeType_2...
	 */
	private w:number;
	private h:number;
	private _res:string;
	private _id:number
	private _parent:egret.DisplayObjectContainer;
	private _baseXY:XY;
	private _cb:Function;
	private _arg:any;
	private arr:SoldierEntity[];
	public constructor() {
		super();
		
	}
	public static inst():SoldierShapeEntity{
		let _inst:SoldierShapeEntity = super.single<SoldierShapeEntity>();
		return _inst
	}
	public initData(shape:number,res:string,id:number,parent:egret.DisplayObjectContainer,xy:XY,cb:Function,thisArg:any):void{
		this._shapeType = shape;
		this.w = this.h = 60;
		this._res = res;
		this._id = id;
		this._parent = parent;
		this._baseXY = xy;
		this._cb = cb;
		this._arg = thisArg;
		this.arr = [];
		this.onCreateShape();
	}
	private onCreateShape():void{
		switch(this._shapeType){
			case SoldierShapType.TYPE_ARROW:
				this.createArrow();
				if(this._cb && this._arg){
					this._cb.call(this._arg,this.arr)
				}
				break;
			case SoldierShapType.TYPE_CIRCLE:
				this.createCircle();
				if(this._cb && this._arg){
					this._cb.call(this._arg,this.arr)
				}
				break;
			case SoldierShapType.TYPE_CROSS:
				this.createCross();
				if(this._cb && this._arg){
					this._cb.call(this._arg,this.arr)
				}
				break;
			case SoldierShapType.TYPE_HALFCIRCLE:
				this.createHalfCircle();
				if(this._cb && this._arg){
					this._cb.call(this._arg,this.arr)
				}
				break;
			// case SoldierShapType.TYPE_LINGXING:
				// this.createLingxing();
				// break;
			case SoldierShapType.TYPE_RECT:
				this.createRect();
				if(this._cb && this._arg){
					this._cb.call(this._arg,this.arr)
				}
				break;
			case SoldierShapType.TYPE_TIXING:
				this.createTiXing();
				if(this._cb && this._arg){
					this._cb.call(this._arg,this.arr)
				}
				break;
			case SoldierShapType.TYPE_TRIANGLE:
				this.createTriangle(5,0,0,-100);
				if(this._cb && this._arg){
					this._cb.call(this._arg,this.arr)
				}
				break;
		}
	}
	/**创建方阵 */
	private createRect(rotation?:number,_rows?:number,_cols?:number,offx:number= 0,offy:number = 0):void{
		let row:number = 4;
		let col:number = 4;
		if(_rows){row = _rows}
		if(_cols){col = _cols}
		for(let i:number = 0;i<row;i++){
			for(let j:number = 0;j<col;j++){
				let sp:SoldierEntity = this.createShape();
				this._parent.addChild(sp);
				this.arr.push(sp);
				sp.x = j*(this.w + 10) + offx + this._baseXY.x;
				sp.y = i*(this.h + 10) + offy + this._baseXY.y;
				if(rotation){
					sp.rotation = rotation
				}
			}
		}
	}
	/**创建圆形阵 */
	private createCircle():void{
		let radius:number = 200;
		let angles:number[] = [0,45,90,135,180,-45,-90,-135];
		for(let i:number = 0;i<1;i++){
			radius -= 100;
			for(let j:number = 0;j<angles.length;j++){
				let x:number = Math.cos(angles[j]*Math.PI/180)*radius;
				let y:number = Math.sin(angles[j]*Math.PI/180)*radius;
				let sp:SoldierEntity = this.createShape();
				this._parent.addChild(sp);
				this.arr.push(sp);
				sp.x = x + this._baseXY.x;
				sp.y = y + this._baseXY.y + 50;
			}
		}
	}
	/**创建半月形阵 */
	private createHalfCircle():void{
		let radius:number = 200;
		let angles:number[] = [-90,-45,0,45,90];
		for(let i:number = 0;i<2;i++){
			
			for(let j:number = 0;j<angles.length;j++){
				let x:number = Math.cos(angles[j]*Math.PI/180)*radius;
				let y:number = Math.sin(angles[j]*Math.PI/180)*radius;
				let sp:SoldierEntity = this.createShape();
				this._parent.addChild(sp);
				this.arr.push(sp);
				sp.x = x + this._baseXY.x;
				sp.y = y + this._baseXY.y + 70;
			}
			radius -= 100;
		}
	}
	// /**创建菱形阵 */
	// private createLingxing():void{
	// 	this.createRect(-45);
	// 	this.shapCon.anchorOffsetX = this.shapCon.width>>1;
	// 	this.shapCon.anchorOffsetY = this.shapCon.height>>1;
	// 	this.shapCon.rotation = 45;
	// }
	/**
	 * 三角阵
	 */
	private createTriangle(firstnum = 5,offestX:number = 0,_offy:number = 0,extraY:number = 0):void{
		let firstColNum:number = firstnum;
		let offestY:number = 0;
		for(let i:number = 0;i < (firstnum-1	);i++){
			firstColNum -= 1; //实际上第一列有6个
			offestY += 40;
			for(let j:number = 1;j<=firstColNum;j++){
				let sp:SoldierEntity = this.createShape();
				this._parent.addChild(sp);
				this.arr.push(sp);
				sp.y = j*(this.h + 10) + offestY - _offy + this._baseXY.y + extraY;
				sp.x = i*(this.w + 10) + offestX + this._baseXY.x;
			}
		}
	}
	/**梯形阵 */
	private createTiXing():void{
		let firstColNum:number = 6;
		let offestY:number = 0;
		for(let i:number = 0;i < 6;i++){
			firstColNum -= 1; //实际上第一列有6个
			if(firstColNum <= 2){
				break;
			}
			offestY += 30;
			for(let j:number = 1;j<=firstColNum;j++){
				let sp:SoldierEntity = this.createShape();
				this._parent.addChild(sp);
				this.arr.push(sp);
				sp.y = j*(this.h + 10) + offestY + this._baseXY.y - 130;
				sp.x = i*(this.w + 10) + this._baseXY.x;
			}
		}
	}
	/**创建箭头形状 */
	private createArrow():void{
		this.createRect(null,2,3);
		this.createTriangle(4,3*(60+10),160)
	}
	/**创建加号形状 */
	private createCross():void{
		this.createRect(null,3,4);
		// this.createRect(null,2,3,200);
		// this.createRect(null,3,2,60,-75);
		// this.createRect(null,3,2,60,50);
	}

	//测试 。创建shape
	private createShape():SoldierEntity{
		let sp:SoldierEntity = new SoldierEntity();
		let cardVo:CardVo = GlobalFun.getCardDataFromId(this._id)
		sp.setSoldierData(-1,this._res,cardVo);
		// sp.setSoldierData(1,)
		// sp.graphics.beginFill(0xff0000);
		// sp.graphics.drawRect(0,0,15,15);
		// sp.graphics.endFill();
		return sp;
	}
}
