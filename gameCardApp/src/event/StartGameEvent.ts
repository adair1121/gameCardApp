class StartGameEvent extends egret.Event{
	
	public static readonly START:string = "start";
	public static readonly VJ_END:string = "vjEnd";
	public static readonly GAMELOADINGEND:string = "gameloadingend";
	public static readonly REMOVE_ITEM:string = "remove_item";

	public static readonly CLICK_GUIDE_SKILL:string = "click_guide_skill";
	public static readonly USE_GUIDE_SKILL:string = "use_guide_skill";
	public data:any;
	public constructor(type: string,data:any = null, bubbles: boolean = false, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
		this.data = data;
	}
}