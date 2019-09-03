/**
 * MapView
 */
class MapViewBg extends egret.DisplayObjectContainer {

	private maxImagX: number;
	private maxImagY: number;

	private mapName: string;


	private _shape: egret.Shape = new egret.Shape;

	private _imageList: eui.Image[][];

	private lastUpdateX: number = 0;
	private lastUpdateY: number = 0;


	private showImages: eui.Image[];

	private _poolImages:eui.Image[];

	private turn: number = 0;

	private _fileDic:{[key:string]:number};
	// private oldImgs = {};

	constructor() {
		super();

		//this.cacheAsBitmap = true;

		this.touchChildren = false;
		this.touchEnabled = false;


		

		this._imageList = [];
		this.showImages = [];
		this._poolImages = [];
		this._fileDic = {};
		this.updateHDMap(`${MAP_DIR}/`);
	}

	private clearHDMap(): void {
		this._imageList = [];
		this.showImages = [];
		this.removeChildren();
	}

	private getImage(){
		return this._poolImages.pop() || new eui.Image();
	}

	public updateHDMap(str:string): void {
		this.clear();
		let imgSize: number = 256;
		this.maxImagX = Math.ceil(GameMap.MAX_WIDTH / imgSize);
		this.maxImagY = Math.ceil(GameMap.MAX_HEIGHT / imgSize);

		let shows: eui.Image[] = [];
		for (let i = 0; i < this.maxImagX; i++) {

			for (let j = 0; j < this.maxImagY; j++) {
				let sourceName: string = `${str}${i}_${j}.jpg`;
				let s: eui.Image = this.getImage();
				s.source = sourceName;
				s.name = sourceName;
				s.x = i * imgSize;
				s.y = j * imgSize;
				this.addChild(s);
			}
		}
	}
	public clear():void{
		this.clearHDMap()
	}
}