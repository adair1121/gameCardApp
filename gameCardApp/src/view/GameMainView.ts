class GameMainView extends BaseEuiView{

	private awardBox:eui.Image;
	public constructor() {
		super();
	}
	public open(...param):void{
		console.log(111)
	}
	public close():void{

	}
}
ViewManager.ins<ViewManager>().reg(GameMainView,LayerManager.UI_Main);