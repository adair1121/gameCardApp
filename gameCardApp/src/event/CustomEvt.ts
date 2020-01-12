class CustomEvt extends egret.Event{

	/**游戏loading完成 */
	public static readonly GAMELOADINGEND:string = 'gameLoadingEnd';

	public static readonly REDUCE_HP:string = 'reducehp';

	/**boss释放技能 */
	public static readonly BOSS_RELEASESKILL:string = "boos_releaseskill";
	/**转生成功 */
	public static readonly REBORNSUCCESS:string = "rebornsuccess";

	/**取消技能cd暂停 */
	public static readonly CANCLESKILLCDPAUSE:string = "cancleskillcdpause";
	private _data:any;
	public constructor(type: string,data:any = null, bubbles: boolean = false, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
		this._data = data;
	}
	public get data():any{
		return this._data;
	}
}