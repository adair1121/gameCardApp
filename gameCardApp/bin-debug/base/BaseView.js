var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
//显示基类,用于增加一些显示相关的共有函数
var BaseView = (function (_super) {
    __extends(BaseView, _super);
    function BaseView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    BaseView.prototype.addTouchEvent = function (obj, func, isStartEffect) {
        if (isStartEffect === void 0) { isStartEffect = false; }
        this.addEvent(egret.TouchEvent.TOUCH_TAP, obj, func);
        if (isStartEffect) {
            obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouch, this);
            obj.addEventListener(egret.TouchEvent.TOUCH_END, this.onEndTouch, this);
            obj.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onEndTouch, this);
            obj.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEndTouch, this);
        }
    };
    BaseView.prototype.onBeginTouch = function (evt) {
        if (evt.target) {
            this.changeFilter(evt.target);
        }
    };
    BaseView.prototype.onEndTouch = function (evt) {
        if (evt.target && evt.target.filters) {
            evt.target.filters = [];
        }
    };
    BaseView.prototype.changeFilter = function (obj) {
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        obj.filters = [colorFlilter];
    };
    BaseView.prototype.addTouchEndEvent = function (obj, func) {
        this.addEvent(egret.TouchEvent.TOUCH_END, obj, func);
    };
    BaseView.prototype.addChangeEvent = function (obj, func) {
        var _this = this;
        if (obj && obj instanceof eui.TabBar) {
            this.addEvent(egret.TouchEvent.CHANGE, obj, function () {
                var param = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    param[_i] = arguments[_i];
                }
                // SoundUtil.ins().playEffect(SoundUtil.WINDOW);
                func.call.apply(func, [_this].concat(param));
            });
        }
        else {
            this.addEvent(egret.TouchEvent.CHANGE, obj, func);
        }
    };
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
    BaseView.prototype.addChangingEvent = function (obj, func) {
        this.addEvent(egret.TouchEvent.CHANGING, obj, func);
    };
    BaseView.prototype.addEvent = function (ev, obj, func) {
        if (!obj) {
            debug.error("\u4E0D\u5B58\u5728\u7ED1\u5B9A\u5BF9\u8C61");
            return;
        }
        obj.addEventListener(ev, func, this);
    };
    BaseView.prototype.removeTouchEvent = function (obj, func) {
        if (obj) {
            obj.removeEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
            if (obj.hasEventListener("touchBegin")) {
                obj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouch, this);
            }
            if (obj.hasEventListener("touchEnd")) {
                obj.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEndTouch, this);
            }
            if (obj.hasEventListener("touchCancel")) {
                obj.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onEndTouch, this);
            }
            if (obj.hasEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE)) {
                obj.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEndTouch, this);
            }
        }
    };
    BaseView.prototype.$onClose = function () {
        var fun = function (tar) {
            for (var i = 0; i < tar.numChildren; i++) {
                var obj = tar.getChildAt(i);
                if (obj instanceof BaseView) {
                    obj.$onClose();
                }
                else if (obj instanceof egret.DisplayObjectContainer) {
                    fun(obj);
                }
            }
        };
        fun(this);
        // this.removeObserve();
    };
    return BaseView;
}(eui.Component));
__reflect(BaseView.prototype, "BaseView");
//# sourceMappingURL=BaseView.js.map