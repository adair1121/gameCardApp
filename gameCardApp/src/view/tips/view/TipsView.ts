class TipsView extends BaseEuiView {
	constructor() {
		super();
		this.initUI();
	}
	public close():void{

	}
	public initUI(): void {

		this.touchChildren = false;
		this.touchEnabled = false;

	}

	private labCount: number = 0;

	private list: TipsItem[] = [];


	public open(...param: any[]): void {

	}

	/**
	 * 显示tips
	 * @param str
	 */
	public showTips(str: string): void {
		let tips: TipsItem = ObjectPool.pop("TipsItem");
		tips.horizontalCenter = 0;
		let bottomNum:number = (StageUtils.inst().getHeight()>>1) + 120;
		tips.bottom = bottomNum;
		this.addChild(tips);
		tips.labelText = str;
		this.list.unshift(tips);
		tips.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeTipsItem, this);
		for (let i: number = this.list.length - 1; i >= 0; i--) {
			egret.Tween.removeTweens(this.list[i]);
			let t: egret.Tween = egret.Tween.get(this.list[i]);
			t.to({"bottom": bottomNum + (i * 30)}, 300);
		}
	}
	private removeTipsItem(e: egret.Event): void {
		let tips = e.currentTarget;
		tips.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeTipsItem, this);
		tips.left = NaN;
		tips.bottom = NaN;
		let index: number = this.list.indexOf(tips);
		this.list.splice(index, 1);
		ObjectPool.push(tips);
	}
}

ViewManager.inst().reg(TipsView, LayerManager.TIPS_LAYER);
