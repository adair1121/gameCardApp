class MessageManager extends BaseClass{

	public constructor() {
		super();
	}
	public static inst():MessageManager{
		let _inst:MessageManager = this.single<MessageManager>();
		return _inst
	}
	/**
	 * 发送自定义事件 CustomEvt 中注册
	 */
	public dispatch(event:string,param?:any):void{
		let customEvent:CustomEvt = new CustomEvt(event,param);
		StageUtils.inst().getStage().dispatchEvent(customEvent);
	}
	/**注册事件 */
	public addListener(event:string,_cb:(evt:CustomEvt)=>void,_arg:any):void{
		StageUtils.inst().getStage().addEventListener(event,_cb,_arg);
	}
	
	/**移除事件 */
	public removeListener(event:string,_cb,_arg):void{
		StageUtils.inst().getStage().removeEventListener(event,_cb,_arg);
	}
}
