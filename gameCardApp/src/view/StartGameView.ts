class StartGameView extends BaseEuiView{

	private enterBtn:eui.Button;
	public constructor() {
		super();
	}
	public open(...param):void{
		
	}
	public close():void{

	}
}
ViewManager.ins<ViewManager>().reg(StartGameView,LayerManager.UI_Main);