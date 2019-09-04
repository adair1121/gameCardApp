class StartGameView extends BaseEuiView{

	private enterBtn:eui.Button;
	private storyBtn:eui.Image;
	public constructor() {
		super();
	}
	public open(...param):void{
		let firstStr:string = egret.localStorage.getItem(LocalStorageEnum.ENTER_FIRST);
		if(!firstStr){
			egret.localStorage.setItem(LocalStorageEnum.ENTER_FIRST,"1");
			ViewManager.ins<ViewManager>().open(StoryPopUp);
		}
		this.addTouchEvent(this.storyBtn,this.onLookStory,true);
		this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onEnter,this);
	}
	/**进入游戏 */
	private onEnter(evt:egret.TouchEvent):void{
		ViewManager.ins<ViewManager>().close(StartGameView);
		ViewManager.ins<ViewManager>().open(GameMainView);
	}
	/**查看故事 */
	private onLookStory():void{
		ViewManager.ins<ViewManager>().open(StoryPopUp);
	}
	public close():void{
		this.addTouchEvent(this.storyBtn,this.onLookStory,true);
		this.enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onEnter,this);
	}
}
ViewManager.ins<ViewManager>().reg(StartGameView,LayerManager.UI_Main);