abstract class BaseEuiView extends eui.Component implements IBaseEuiView{
	private _instance:any;
	private closeBtn:eui.Image;
	protected removed:boolean = false;
	public constructor() {
		super();
		this.skinName = `${egret.getQualifiedClassName(this)}Skin`;
		this.percentHeight = 100;
        this.percentWidth = 100;
	}
	protected ins<T>():T{
		let Class:any = this;
		if(!this._instance){
			this._instance = new Class();
		}
		return this._instance;
	}
	public showClose(cls,bottom:boolean = false,callBackFun:()=>void = null,thisArg:any = null):void{
		this.closeBtn = new eui.Image();
		this.closeBtn.source = "close_btn_png";
		this.addChild(this.closeBtn);
		this.closeBtn.top = 60;
		this.closeBtn.right = 30;
		this.addTouchEvent(this.closeBtn,()=>{
			// let removeCls = null;
			// if(this.removed){
			// 	removeCls = StartGameView;
			// }
			ViewManager.inst().close(cls);
			if(callBackFun && thisArg){
				callBackFun.call(thisArg);
			}
		},true);
	}
	private onRouteFront(nameOrClass):void{
		
	}
	
	
	abstract open(...param):void

	abstract close():void;

	public addToParent(p:eui.UILayer):void{
		p.addChild(this);
	}
	/**路由回界面的刷新方法 */
	public refreshPage():void{}
	/**移除界面 */
	public removeFromeParent():void{
		if(this && this.parent){
			this.close();
			this.parent.removeChild(this);
		}
	}
	public addTouchEvent(obj: any, func: Function,startEffect:boolean = false) {
		if(startEffect){
			obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBeginTouch,this);
			obj.addEventListener(egret.TouchEvent.TOUCH_END,this.onEndTouch,this);
			obj.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onEndTouch,this);
			obj.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onEndTouch,this);
		}
		this.addEvent(egret.TouchEvent.TOUCH_TAP, obj, func);
	}
	private onBeginTouch(evt:egret.TouchEvent):void{
		if(evt.target){
			this.changeFilter(evt.target);
		}
	}
	private onEndTouch(evt:egret.TouchEvent):void{
		if(evt.target && evt.target.filters){
			evt.target.filters = [];
		}
		SoundManager.inst().stopEffect();
		SoundManager.inst().playEffect(`${RES_AUDIO}buttonClick.mp3`);
	}
	private changeFilter(obj:egret.DisplayObjectContainer):void{
		var colorMatrix = [
			0.3,0.6,0,0,0,
			0.3,0.6,0,0,0,
			0.3,0.6,0,0,0,
			0,0,0,1,0
		];
		var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
		obj.filters = [colorFlilter];
	}
	public removeTouchEvent(obj: any, func: Function) {
		if (obj) obj.removeEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
		if(obj.hasEventListener("touchBegin")){
			obj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBeginTouch,this);
		}
		if(obj.hasEventListener("touchEnd")){
			obj.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEndTouch,this);
		}
		if(obj.hasEventListener("touchCancel")){
			obj.removeEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onEndTouch,this);
		}
		if(obj.hasEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE)){
			obj.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onEndTouch,this);
		}
	}
	public addEvent(ev: string, obj: any, func: Function) {
		if (!obj) {
			console.log(`不存在绑定对象`);
			return;
		}
		obj.addEventListener(ev, func, this);
	}
}