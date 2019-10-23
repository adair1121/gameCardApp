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
var BaseEuiView = (function (_super) {
    __extends(BaseEuiView, _super);
    function BaseEuiView() {
        var _this = _super.call(this) || this;
        _this.removed = false;
        _this.skinName = egret.getQualifiedClassName(_this) + "Skin";
        _this.percentHeight = 100;
        _this.percentWidth = 100;
        return _this;
    }
    BaseEuiView.prototype.ins = function () {
        var Class = this;
        if (!this._instance) {
            this._instance = new Class();
        }
        return this._instance;
    };
    BaseEuiView.prototype.showClose = function (cls, bottom, callBackFun, thisArg) {
        if (bottom === void 0) { bottom = false; }
        if (callBackFun === void 0) { callBackFun = null; }
        if (thisArg === void 0) { thisArg = null; }
        this.closeBtn = new eui.Image();
        this.closeBtn.source = "close_btn_png";
        this.addChild(this.closeBtn);
        this.closeBtn.top = 60;
        this.closeBtn.right = 30;
        this.addTouchEvent(this.closeBtn, function () {
            // let removeCls = null;
            // if(this.removed){
            // 	removeCls = StartGameView;
            // }
            ViewManager.inst().close(cls);
            if (callBackFun && thisArg) {
                callBackFun.call(thisArg);
            }
        }, true);
    };
    BaseEuiView.prototype.onRouteFront = function (nameOrClass) {
    };
    BaseEuiView.prototype.addToParent = function (p) {
        p.addChild(this);
    };
    /**路由回界面的刷新方法 */
    BaseEuiView.prototype.refreshPage = function () { };
    /**移除界面 */
    BaseEuiView.prototype.removeFromeParent = function () {
        if (this && this.parent) {
            this.close();
            this.parent.removeChild(this);
        }
    };
    BaseEuiView.prototype.addTouchEvent = function (obj, func, startEffect) {
        if (startEffect === void 0) { startEffect = false; }
        if (startEffect) {
            obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBeginTouch, this);
            obj.addEventListener(egret.TouchEvent.TOUCH_END, this.onEndTouch, this);
            obj.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onEndTouch, this);
            obj.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEndTouch, this);
        }
        this.addEvent(egret.TouchEvent.TOUCH_TAP, obj, func);
    };
    BaseEuiView.prototype.onBeginTouch = function (evt) {
        if (evt.target) {
            this.changeFilter(evt.target);
        }
    };
    BaseEuiView.prototype.onEndTouch = function (evt) {
        if (evt.target && evt.target.filters) {
            evt.target.filters = [];
        }
        SoundManager.inst().stopEffect();
        SoundManager.inst().playEffect(RES_AUDIO + "buttonClick.mp3");
    };
    BaseEuiView.prototype.changeFilter = function (obj) {
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        obj.filters = [colorFlilter];
    };
    BaseEuiView.prototype.removeTouchEvent = function (obj, func) {
        if (obj)
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
    };
    BaseEuiView.prototype.addEvent = function (ev, obj, func) {
        if (!obj) {
            console.log("\u4E0D\u5B58\u5728\u7ED1\u5B9A\u5BF9\u8C61");
            return;
        }
        obj.addEventListener(ev, func, this);
    };
    return BaseEuiView;
}(eui.Component));
__reflect(BaseEuiView.prototype, "BaseEuiView");
//# sourceMappingURL=BaseEuiView.js.map