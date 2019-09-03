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
            ViewManager.ins().close(cls);
            if (callBackFun && thisArg) {
                callBackFun.call(thisArg);
            }
        }, true);
    };
    BaseEuiView.prototype.onRouteFront = function (nameOrClass) {
    };
    /**
     * 添加主ui控件 头像组件,底部经验条
     */
    BaseEuiView.prototype.addMainCom = function (param, bagBoo, parent) {
        if (bagBoo === void 0) { bagBoo = true; }
        if (parent === void 0) { parent = null; }
        var roleCom = new RoleHeadCom();
        this.roleHeadCom = roleCom;
        if (parent) {
            parent.addChild(roleCom);
        }
        else {
            this.addChildAt(roleCom, 1);
        }
        roleCom.left = 10;
        roleCom.top = -100;
        if (param && param.length) {
            roleCom.initialize({ roleName: param[0].roleName, goldNum: "0", levelName: "", headIcon: param[0].headIcon });
        }
        egret.Tween.get(roleCom).to({ top: 20 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(roleCom);
        }, this);
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
        if (bagBoo) {
            var bagimg_1 = new eui.Image();
            this.bagImg = bagimg_1;
            bagimg_1.source = "main_pack_png";
            if (parent) {
                parent.addChild(bagimg_1);
            }
            else {
                this.addChild(bagimg_1);
            }
            bagimg_1.right = 175;
            bagimg_1.bottom = -143;
            egret.Tween.get(bagimg_1).to({ bottom: 10 }, 600, egret.Ease.circOut).call(function () {
                egret.Tween.removeTweens(bagimg_1);
            }, this);
            this.addTouchEvent(this.bagImg, this.onBagOpen, true);
            var joinImg_1 = new eui.Image();
            this.joinImg = joinImg_1;
            joinImg_1.source = "joinBtn_png";
            if (parent) {
                parent.addChild(joinImg_1);
            }
            else {
                this.addChild(joinImg_1);
            }
            joinImg_1.right = 90;
            joinImg_1.bottom = -143;
            egret.Tween.get(joinImg_1).to({ bottom: 10 }, 600, egret.Ease.circOut).call(function () {
                egret.Tween.removeTweens(joinImg_1);
            }, this);
            this.addTouchEvent(joinImg_1, this.onJoinOpen, true);
            var shopImg_1 = new eui.Image();
            this.shopImg = shopImg_1;
            shopImg_1.source = "shopBtn_png";
            if (parent) {
                parent.addChild(shopImg_1);
            }
            else {
                this.addChild(shopImg_1);
            }
            shopImg_1.right = 11;
            shopImg_1.bottom = -143;
            egret.Tween.get(shopImg_1).to({ bottom: 10 }, 600, egret.Ease.circOut).call(function () {
                egret.Tween.removeTweens(shopImg_1);
            }, this);
            this.addTouchEvent(this.shopImg, this.onShop, true);
        }
    };
    //点击内购
    BaseEuiView.prototype.onShop = function () {
        ViewManager.ins().open(ShopView);
    };
    /**打开背包 */
    BaseEuiView.prototype.onBagOpen = function () {
        ViewManager.ins().open(BagPopUp);
    };
    /**点击参军 */
    BaseEuiView.prototype.onJoinOpen = function () {
        ViewManager.ins().open(SelectWayPopUp);
    };
    /** 移除其余事件*/
    BaseEuiView.prototype.removeOtherEvent = function () {
        this.removeTouchEvent(this.bagImg, this.onBagOpen);
        this.removeTouchEvent(this.shopImg, this.onShop);
        this.removeTouchEvent(this.joinImg, this.onJoinOpen);
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