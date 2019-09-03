class UserTips extends BaseClass {
	private _view: TipsView;

	constructor() {
		super();
	}

	public get view() {
		if (!this._view || !this._view.parent) {
			ViewManager.ins<ViewManager>().open(TipsView);
			this._view = ViewManager.ins<ViewManager>().getView(TipsView) as TipsView;
		}
		return this._view;
	}

	public showTips(str: string, func?: Function): void {
		
		DelayOptManager.ins<DelayOptManager>().addDelayOptFunction(this.view, this.view.showTips, str);
	}

	


}

