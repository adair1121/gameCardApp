abstract class BaseEuiView extends eui.Component implements IBaseEuiView{
	private _instance:any;
	private closeBtn:eui.Image;
	protected removed:boolean = false;
	protected roleHeadCom:RoleHeadCom;
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
			ViewManager.ins<ViewManager>().close(cls);
			if(callBackFun && thisArg){
				callBackFun.call(thisArg);
			}
		},true);
	}
	private onRouteFront(nameOrClass):void{
		
	}
	public bagImg:eui.Image;
	public shopImg:eui.Image;
	public joinImg:eui.Image;
	/**
	 * 添加主ui控件 头像组件,底部经验条
	 */
	public addMainCom(param?:any,bagBoo:boolean = true,parent:egret.DisplayObjectContainer = null):void{
		let roleCom:RoleHeadCom = new RoleHeadCom();
		this.roleHeadCom = roleCom;
		if(parent){
			parent.addChild(roleCom);
		}else{
			this.addChildAt(roleCom,1);
		}	
		roleCom.left = 10;
		roleCom.top = -100;
		if(param && param.length){
			roleCom.initialize({roleName:param[0].roleName,goldNum:"0",levelName:"",headIcon:param[0].headIcon});
		}
		egret.Tween.get(roleCom).to({top:20},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(roleCom);
		},this)

		// let progressCom:MainProgress = new MainProgress();
		// if(parent){
		// 	parent.addChild(progressCom);
		// }else{
		// 	this.addChild(progressCom);
		// }
		// progressCom.left = 0;
		// progressCom.right = 0;
		// progressCom.bottom = -50;
		// egret.Tween.get(progressCom).to({bottom:0},600,egret.Ease.circOut).call(()=>{
		// 	egret.Tween.removeTweens(progressCom);
		// },this)
		
		if(bagBoo){
			let bagimg:eui.Image = new eui.Image();
			this.bagImg = bagimg;
			bagimg.source = "main_pack_png";
			if(parent){
				parent.addChild(bagimg);
			}else{
				this.addChild(bagimg);
			}
			bagimg.right = 175;
			bagimg.bottom = -143;
			egret.Tween.get(bagimg).to({bottom:10},600,egret.Ease.circOut).call(()=>{
				egret.Tween.removeTweens(bagimg);
			},this)
			this.addTouchEvent(this.bagImg,this.onBagOpen,true);

			let joinImg:eui.Image = new eui.Image();
			this.joinImg = joinImg;
			joinImg.source = "joinBtn_png";
			if(parent){
				parent.addChild(joinImg);
			}else{
				this.addChild(joinImg);
			}
			joinImg.right = 90;
			joinImg.bottom = -143;
			egret.Tween.get(joinImg).to({bottom:10},600,egret.Ease.circOut).call(()=>{
				egret.Tween.removeTweens(joinImg);
			},this)
			this.addTouchEvent(joinImg,this.onJoinOpen,true);

			let shopImg:eui.Image = new eui.Image();
			this.shopImg = shopImg;
			shopImg.source = "shopBtn_png";
			if(parent){
				parent.addChild(shopImg);
			}else{
				this.addChild(shopImg);
			}
			shopImg.right = 11;
			shopImg.bottom = -143;
			egret.Tween.get(shopImg).to({bottom:10},600,egret.Ease.circOut).call(()=>{
				egret.Tween.removeTweens(shopImg)
			},this)
			this.addTouchEvent(this.shopImg,this.onShop,true);
		}
	}
	//点击内购
	private onShop():void{
		ViewManager.ins<ViewManager>().open(ShopView);
	}
	/**打开背包 */
	private onBagOpen():void{
		ViewManager.ins<ViewManager>().open(BagPopUp);
	}
	/**点击参军 */
	private onJoinOpen():void{
		ViewManager.ins<ViewManager>().open(SelectWayPopUp)
	}
	/** 移除其余事件*/
	public removeOtherEvent():void{
		this.removeTouchEvent(this.bagImg,this.onBagOpen);
		this.removeTouchEvent(this.shopImg,this.onShop);
		this.removeTouchEvent(this.joinImg,this.onJoinOpen);
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