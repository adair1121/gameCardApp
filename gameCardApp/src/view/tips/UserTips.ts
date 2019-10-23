class UserTips extends BaseClass {
	private _view: TipsView;

	constructor() {
		super();
	}
	public static inst():UserTips{
		let _inst:UserTips = super.single<UserTips>();
		return _inst
	}
	public get view() {
		if (!this._view || !this._view.parent) {
			ViewManager.inst().open(TipsView);
			this._view = ViewManager.inst().getView(TipsView) as TipsView;
		}
		return this._view;
	}

	public showTips(str: string, func?: Function): void {
		
		DelayOptManager.inst().addDelayOptFunction(this.view, this.view.showTips, str);
	}

	


}

