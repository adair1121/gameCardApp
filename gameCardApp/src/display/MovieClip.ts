/**
 *  动画类
 * @author
 */
class MovieClip extends egret.MovieClip {

	/** 原始帧频 */
	private static originalRate: any = {};

	/** 动画数据工厂类 */
	private _mcFactory: egret.MovieClipDataFactory;

	/** 播放次数 */
	public playCount: number;
	/** 播放完的回调函数 */
	public _compFun: () => void;
	/**加载完成 */
	public _loadFun:()=>void;
	/** 是否自动删除 */
	public remove: boolean;

	private jsonData: any;
	private texture: egret.Texture;

	private time: number;
	/**倍率 ,越大越快*/
	public rate: number = 1;

	public pixelHitTest: boolean = false;

	public constructor() {
		super();
		this._mcFactory = new egret.MovieClipDataFactory();
		
	}

	public playFile(name: string,
					playCount: number = 1,
					compFun: () => void = null,
					remove: boolean = true,framesLabel:string = "",_loadFun?:()=>void,frameRate?:number): void {
		if(name.indexOf("chargeff1") != -1 || name.indexOf("forceguildeff") != -1 || name.indexOf("qianghua") != -1 || 
		name.indexOf("forgeSuccess") != -1 || name.indexOf("neigongbaozhaeff")!=-1 || name.indexOf("piaodongqipaohuang")!= -1){
			return;
		}

		this.time = egret.getTimer();

		this._compFun = compFun;
		this._loadFun = _loadFun;
		this.playCount = playCount;
		this.remove = remove;

		TimerManager.inst().remove(this.playComp, this);

		if (this.texture && this.texture.bitmapData == null) {
			//资源已经被释放掉
		} else if (this.name == name) {
			this.createBody(framesLabel,frameRate);
			return;
		}

		this.name = name;

		if (this.texture) {
			MovieClip.removeDisplayObject(this, this.texture.bitmapData);
		}

		this.jsonData = null;
		this.texture = null;

		RES.getResByUrl(this.name + ".json", (data, url) => {
			if (this.name+".json" != url || !data)
				return;
			this.jsonData = data;
			this.createBody(framesLabel,frameRate);
		}, this, RES.ResourceItem.TYPE_JSON);

		RES.getResByUrl(this.name + ".png", (data, url) => {
			if (this.name+".png" != url || !data)
				return;
			this.texture = data;

			if (this.stage) {
				MovieClip.addDisplayObject(this, this.texture.bitmapData);
			}
			
			this.createBody(framesLabel,frameRate);
		}, this, RES.ResourceItem.TYPE_IMAGE);
	}

	/**
	 * @private
	 * 显示对象添加到舞台
	 */
	$onAddToStage(stage: egret.Stage, nestLevel: number): void {
		super.$onAddToStage(stage, nestLevel);

		if (this.texture) {
			MovieClip.addDisplayObject(this, this.texture.bitmapData);
		}
	}

	/**
	 * @private
	 * 显示对象从舞台移除
	 */
	$onRemoveFromStage(): void {
		super.$onRemoveFromStage();

		if (this.texture) {
			MovieClip.removeDisplayObject(this, this.texture.bitmapData);
		}
	}

	/**
	 * 创建主体动画
	 */
	private createBody(framesLaebl:string = "",frameRate?:number): void {
		if (!this.jsonData || !this.texture)
			return;
		
		this._mcFactory.clearCache();
		this._mcFactory.mcDataSet = this.jsonData;
		this._mcFactory.texture = this.texture;

		let temp = this.name.split("/");
		let tempName = temp.pop();

		this.movieClipData = this._mcFactory.generateMovieClipData(tempName);
		if (!(this.name in MovieClip.originalRate)) {
			MovieClip.originalRate[this.name] = this.movieClipData.frameRate;
		}
		this.frameRate = frameRate?frameRate:(MovieClip.originalRate[this.name] * this.rate) >> 0;

		//从第一帧开始自动播放
		try {
			this.gotoAndPlay(framesLaebl?framesLaebl:1, this.playCount);
		} catch (error) {
			console.warn("错误动画文件:", this.name);		
		}

		// this.visible = true;

		if (this.playCount > 0) {
			let tempTime = egret.getTimer() - this.time;
			tempTime = this.playTime * this.playCount - tempTime;
			if (tempTime > 0)
				TimerManager.inst().doTimer(tempTime, 1, this.playComp, this);
			else
				this.playComp();
		}
		if(this._loadFun){
			this._loadFun();
		}
		//抛出内容已经改变事件
		this.dispatchEventWith(egret.Event.CHANGE);
	}

	/**
	 * 自动播放次数完成处理
	 * @param e
	 */
	private playComp(): void {
		if (this.stage && this._compFun)
			this._compFun();

		if (this.remove)
			DisplayUtils.removeFromParent(this);
	}

	/** 播放总时长(毫秒) */
	private get playTime(): number {
		if (!this.movieClipData)
			return 0;
		return 1 / this.frameRate * this.totalFrames * 1000;
	}

	public clearComFun() {
		this._compFun = null;
	}

	//释放
	public dispose() {
		this.stop();
		this.resetMovieClip();
		this.clearComFun();
		TimerManager.inst().removeAll(this);
	}

	//回收
	public destroy() {
		DisplayUtils.removeFromParent(this);
		this.dispose();
		
	}

	private resetMovieClip() {
		let mc = this;
		mc.rotation = 0;
		mc.scaleX = 1;
		mc.scaleY = 1;
		mc.alpha = 1;
		mc.anchorOffsetX = 0;
		mc.anchorOffsetY = 0;
		mc.x = 0;
		mc.y = 0;

		mc.rate = 1;
		mc.$renderNode.cleanBeforeRender();

		mc._mcFactory.clearCache();
		mc._mcFactory.mcDataSet = null;
		mc._mcFactory.texture = null;

		mc.name = null;
		mc.jsonData = null;
		mc.filters = null;

		let bitmapData = mc.texture;
		if (bitmapData) {
			MovieClip.removeDisplayObject(mc, bitmapData.bitmapData);
		}

		mc.texture = null;
		mc.remove = false;

		egret.Tween.removeTweens(mc);
	}

	static displayList = egret.createMap<egret.DisplayObject[]>();
	static addDisplayObject(displayObject: egret.DisplayObject, bitmapData: egret.BitmapData): void {
		if (!bitmapData) return;
		let hashCode = bitmapData.hashCode;

		if (!MovieClip.displayList[hashCode]) {
			MovieClip.displayList[hashCode] = [displayObject];
			return;
		}

		let tempList: Array<egret.DisplayObject> = MovieClip.displayList[hashCode];
		if (tempList.indexOf(displayObject) < 0) {
			tempList.push(displayObject);
		}
	}

	static removeDisplayObject(displayObject: egret.DisplayObject, bitmapData: egret.BitmapData): void {
		if (!bitmapData) return;
		let hashCode = bitmapData.hashCode;

		if (!MovieClip.displayList[hashCode]) {
			return;
		}

		let tempList: Array<egret.DisplayObject> = MovieClip.displayList[hashCode];
		let index: number = tempList.indexOf(displayObject);
		if (index >= 0) {
			tempList.splice(index, 1);
		}

		if (tempList.length == 0) {
			delete MovieClip.displayList[hashCode];
		}
	}
}