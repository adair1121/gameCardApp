class VJEvent extends egret.Event{

	public static readonly VJ_START:string = "vj_start";
	public static readonly VJ_END:string = "vj_end";
	public static readonly VJ_MOVE:string = 'vj_move';
	public static data:any;
	public constructor(type: string, bubbles: boolean = false,data:any = null, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
		this.data = data;
	}
}