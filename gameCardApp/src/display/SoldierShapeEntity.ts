class SoldierShapeEntity extends eui.Component{

	private _shapeType:number;
	/**
	 * shape :  ShapeType_1 ShapeType_2...
	 */
	private shapCon:egret.DisplayObjectContainer;
	public constructor(shape:number) {
		super();
		this._shapeType = shape;
	}
	protected childrenCreated():void{
		this.shapCon = new egret.DisplayObjectContainer();
		this.addChild(this.shapCon);
		switch(this._shapeType){
			case SoldierShapType.TYPE_ARROW:
				this.createArrow();
				break;
			case SoldierShapType.TYPE_CIRCLE:
				this.createCircle();
				break;
			case SoldierShapType.TYPE_CROSS:
				this.createCross();
				break;
			case SoldierShapType.TYPE_HALFCIRCLE:
				this.createHalfCircle();
				break;
			case SoldierShapType.TYPE_LINGXING:
				this.createLingxing();
				break;
			case SoldierShapType.TYPE_RECT:
				this.createRect();
				break;
			case SoldierShapType.TYPE_TIXING:
				this.createTiXing();
				break;
			case SoldierShapType.TYPE_TRIANGLE:
				this.createTriangle();
				break;
		}
	}
	/**创建方阵 */
	private createRect(rotation?:number,_rows?:number,_cols?:number,offx:number= 0,offy:number = 0):void{
		let row:number = 5;
		let col:number = 5;
		if(_rows){row = _rows}
		if(_cols){col = _cols}
		for(let i:number = 0;i<row;i++){
			for(let j:number = 0;j<col;j++){
				let sp:egret.Shape = this.createShape();
				this.shapCon.addChild(sp);
				sp.x = j*(sp.width + 10) + offx;
				sp.y = i*(sp.height + 10) + offy;
				if(rotation){
					sp.rotation = rotation
				}
			}
		}
	}
	/**创建圆形阵 */
	private createCircle():void{
		let radius:number = 75;
		let angles:number[] = [0,45,90,135,180,-45,-90,-135];
		for(let i:number = 0;i<3;i++){
			radius -= 25;
			for(let j:number = 0;j<angles.length;j++){
				let x:number = Math.cos(angles[j]*Math.PI/180)*radius;
				let y:number = Math.sin(angles[j]*Math.PI/180)*radius;
				let sp:egret.Shape = this.createShape();
				this.shapCon.addChild(sp);
				sp.x = x;
				sp.y = y;
			}
		}
	}
	/**创建半月形阵 */
	private createHalfCircle():void{
		let radius:number = 130;
		let angles:number[] = [-90,-45,0,45,90];
		for(let i:number = 0;i<5;i++){
			radius -= 25;
			for(let j:number = 0;j<angles.length;j++){
				let x:number = Math.cos(angles[j]*Math.PI/180)*radius;
				let y:number = Math.sin(angles[j]*Math.PI/180)*radius;
				let sp:egret.Shape = this.createShape();
				this.shapCon.addChild(sp);
				sp.x = x;
				sp.y = y;
			}
		}
	}
	/**创建菱形阵 */
	private createLingxing():void{
		this.createRect(-45);
		this.shapCon.anchorOffsetX = this.shapCon.width>>1;
		this.shapCon.anchorOffsetY = this.shapCon.height>>1;
		this.shapCon.rotation = 45;
	}
	/**
	 * 三角阵
	 */
	private createTriangle(firstnum = 7,offestX:number = 0,_offy:number = 0):void{
		let firstColNum:number = firstnum;
		let offestY:number = 0;
		for(let i:number = 0;i < (firstnum-1	);i++){
			firstColNum -= 1; //实际上第一列有6个
			offestY += 10;
			for(let j:number = 1;j<=firstColNum;j++){
				let sp:egret.Shape = this.createShape();
				this.shapCon.addChild(sp);
				sp.y = j*(sp.height + 10) + offestY - _offy;
				sp.x = i*(sp.width + 10) + offestX;
			}
		}
	}
	/**梯形阵 */
	private createTiXing():void{
		let firstColNum:number = 8;
		let offestY:number = 0;
		for(let i:number = 0;i < 6;i++){
			firstColNum -= 1; //实际上第一列有6个
			if(firstColNum <= 2){
				break;
			}
			offestY += 10;
			for(let j:number = 1;j<=firstColNum;j++){
				let sp:egret.Shape = this.createShape();
				this.shapCon.addChild(sp);
				sp.y = j*(sp.height + 10) + offestY;
				sp.x = i*(sp.width + 10);
			}
		}
	}
	/**创建箭头形状 */
	private createArrow():void{
		this.createRect(null,2,5);
		this.createTriangle(6,5*(15+10),70)
	}
	/**创建加号形状 */
	private createCross():void{
		this.createRect(null,2,3);
		this.createRect(null,2,3,100);
		this.createRect(null,3,2,60,-75);
		this.createRect(null,3,2,60,50);
	}

	//测试 。创建shape
	private createShape():egret.Shape{
		let sp:egret.Shape = new egret.Shape();
		sp.graphics.beginFill(0xff0000);
		sp.graphics.drawRect(0,0,15,15);
		sp.graphics.endFill();
		return sp;
	}
}
