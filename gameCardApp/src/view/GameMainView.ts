class GameMainView extends BaseEuiView{

	private awardBox:eui.Image;
	public constructor() {
		super();
	}
	public open(...param):void{
		
	}
	public initialize():void{
		//初始化
		console.log("game---initialize")
	}
	public close():void{

	}
}
ViewManager.ins<ViewManager>().reg(GameMainView,LayerManager.UI_Main);