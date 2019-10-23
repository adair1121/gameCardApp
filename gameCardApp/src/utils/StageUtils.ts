class StageUtils extends BaseClass {
	//UIStage单例
	private static _uiStage:eui.UILayer;
	private static lastOrientation:string|number;
	/**
	 * 构造函数
	 */
	public constructor() {
		super();

		if (StageUtils._uiStage == null) {
			StageUtils._uiStage = new eui.UILayer();
			StageUtils._uiStage.touchEnabled = false;
			StageUtils._uiStage.percentHeight = 100;
			StageUtils._uiStage.percentWidth = 100;
			this.getStage().addChild(StageUtils._uiStage);
		}
	}

	public static inst():StageUtils{
		let _inst:StageUtils = super.single<StageUtils>();
		return _inst
	}
	
	/**
	 * 获取游戏的高度
	 * @returns {number}
	 */
	public getHeight():number {
		return this.getStage().stageHeight;
	}

	/**
	 * 获取游戏宽度
	 * @returns {number}
	 */
	public getWidth():number {
		return this.getStage().stageWidth;
	}

	/**
	 * 指定此对象的子项以及子孙项是否接收鼠标/触摸事件
	 * @param value
	 */
	public setTouchChildren(value:boolean):void {
		this.getStage().touchChildren = value;
	}

	/**
	 * 设置同时可触发几个点击事件，默认为2
	 * @param value
	 */
	public setMaxTouches(value:number):void {
		this.getStage().maxTouches = value;
	}

	/**
	 * 设置帧频
	 * @param value
	 */
	public setFrameRate(value:number):void {
		this.getStage().frameRate = value;
	}

	/**
	 * 设置适配方式
	 * @param value
	 */
	public setScaleMode(value:string):void {
		this.getStage().scaleMode = value;
	}

	/**
	 * 获取游戏Stage对象
	 * @returns {egret.MainContext}
	 */
	public getStage():egret.Stage {
		return egret.MainContext.instance.stage;
	}
	
	/**
	 * 获取唯一UIStage
	 * @returns {eui.UILayer}
	 */
	public getUIStage():eui.UILayer {
		return StageUtils._uiStage;
	}
	public static getScaleMode():string{
		if(StageUtils.isIphoneX())return egret.StageScaleMode.FIXED_WIDTH;
		let w: number = window.innerHeight / window.innerWidth;
		let minSizeProb = 1.4;
		let maxSizeProb = 1.8;
		let scaleMode = "";
		if(w <= minSizeProb) {
			scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
		} else if (w > minSizeProb && w < maxSizeProb) {
			scaleMode = egret.StageScaleMode.FIXED_WIDTH;
		}
		return scaleMode;
	}
	private static isIphoneX():boolean{
		return window.innerHeight==812 && window.innerWidth==375;
	}
	public static init():void{
		this.changeStageSize();
		window.addEventListener("resize", this.changeStageSize);
	}
	public static changeStageSize(): void {
		var scaleMode = StageUtils.getScaleMode();
		if(this.lastOrientation != window.orientation) {
			document.body.style.height = "100%";
			this.lastOrientation = window.orientation;
		}
		StageUtils.inst().getStage().scaleMode = scaleMode;
	}
	
}
