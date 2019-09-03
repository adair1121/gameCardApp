//显示基类,用于增加一些显示相关的共有函数
class BaseView extends eui.Component {

	/**
	 * 监听事件
	 * @param {Function} func 监听的事件标记
	 * @param {Function} myfunc 监听响应的函数
	 * @param callobj 是否立刻执行响应函数一次
	 */
	// public observe(func: Function, myfunc: Function, callobj: any = undefined) {
	// 	MessageCenter.addListener(func, myfunc, this, callobj);
	// }

	// public removeObserve() {
	// 	MessageCenter.ins().removeAll(this);
	// }

	public addTouchEvent(obj: any, func: Function,isStartEffect:boolean = false) {
		this.addEvent(egret.TouchEvent.TOUCH_TAP, obj, func);
		if(isStartEffect){
			obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBeginTouch,this);
			obj.addEventListener(egret.TouchEvent.TOUCH_END,this.onEndTouch,this);
			obj.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onEndTouch,this);
			obj.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onEndTouch,this);
		}
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
	public addTouchEndEvent(obj: any, func: Function) {
		this.addEvent(egret.TouchEvent.TOUCH_END, obj, func);
	}

	public addChangeEvent(obj: any, func: Function) {
		if (obj && obj instanceof eui.TabBar) {
			this.addEvent(egret.TouchEvent.CHANGE, obj, (...param) => {
				// SoundUtil.ins().playEffect(SoundUtil.WINDOW);
				func.call(this, ...param);
			});
		} else {
			this.addEvent(egret.TouchEvent.CHANGE, obj, func);
		}
	}
	
	/**hide 除了第一个页签意外的页签显示 */
    // public hidePageFunc(viewStack:eui.ViewStack):void{
    //     let len:number = viewStack.$children.length;
    //     for(let i:number = 1;i<len;i++){
    //         if(viewStack.$children.length >=2){
    //             let item:BaseComponent = <BaseComponent>viewStack.getChildAt(1);
    //             viewStack.removeChild(item);
    //         }
    //     }
    // }

	public addChangingEvent(obj: any, func: Function) {
		this.addEvent(egret.TouchEvent.CHANGING, obj, func);
	}

	public addEvent(ev: string, obj: any, func: Function) {
		if (!obj) {
			debug.error(`不存在绑定对象`);
			return;
		}
		obj.addEventListener(ev, func, this);
	}

	public removeTouchEvent(obj: any, func: Function) {
		if (obj) {
			obj.removeEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
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
	}

	public $onClose() {

		let fun = function (tar: egret.DisplayObjectContainer) {
			for (let i: number = 0; i < tar.numChildren; i++) {
				let obj = tar.getChildAt(i);
				if (obj instanceof BaseView) {
					(<BaseView>obj).$onClose();
				} else if (obj instanceof egret.DisplayObjectContainer) {
					fun(obj);
				}
			}
		};

		fun(this);

		// this.removeObserve();
	}
}