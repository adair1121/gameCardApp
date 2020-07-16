var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var BaseClass = (function () {
    function BaseClass() {
    }
    /**
     * 获取一个单例
     * @returns {any}
     */
    BaseClass.single = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var Class = this;
        if (!Class._instance) {
            var argsLen = args.length;
            if (argsLen == 0) {
                Class._instance = new Class();
            }
            else if (argsLen == 1) {
                Class._instance = new Class(args[0]);
            }
            else if (argsLen == 2) {
                Class._instance = new Class(args[0], args[1]);
            }
            else if (argsLen == 3) {
                Class._instance = new Class(args[0], args[1], args[2]);
            }
            else if (argsLen == 4) {
                Class._instance = new Class(args[0], args[1], args[2], args[3]);
            }
            else if (argsLen == 5) {
                Class._instance = new Class(args[0], args[1], args[2], args[3], args[4]);
            }
        }
        return Class._instance;
    };
    return BaseClass;
}());
__reflect(BaseClass.prototype, "BaseClass");
var BaseEntity = (function (_super) {
    __extends(BaseEntity, _super);
    function BaseEntity() {
        var _this = _super.call(this) || this;
        //方向
        _this._dic = 3;
        _this._hp = 40;
        _this._thp = 40;
        _this._attack = 20;
        _this._changeValue = 0.1;
        _this._isDead = false;
        _this.buffAttack = 0;
        _this.buffHp = 0;
        _this.buffDef = 0;
        _this.scale = 1;
        _this.initialize();
        return _this;
    }
    BaseEntity.prototype.initialize = function () { };
    Object.defineProperty(BaseEntity.prototype, "camp", {
        get: function () {
            return this._camp;
        },
        set: function (value) {
            this._camp = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseEntity.prototype, "instId", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseEntity.prototype, "dic", {
        get: function () {
            return this._dic;
        },
        set: function (value) {
            this._dic = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseEntity.prototype, "attack", {
        get: function () {
            var index = (Math.random() * 100) >> 0;
            var dic = index >= 50 ? 1 : -1;
            return (this._attack + this.buffAttack) + dic * ((this._attack + this.buffAttack) * this._changeValue);
        },
        set: function (value) {
            this._attack = value;
        },
        enumerable: true,
        configurable: true
    });
    BaseEntity.prototype.getIndex = function () {
        return ((Math.random() * 100) >> 0) > 50 ? 1 : -1;
    };
    BaseEntity.prototype.reduceHp = function (dmg) {
        if (this.buffHp > 0) {
            this.buffHp -= dmg;
        }
        else {
            var changeNum = ((parseInt(dmg) * 0.2) >> 0) * this.getIndex();
            var dmgNum = (parseInt(dmg) - this.buffDef + changeNum);
            this._hp -= dmgNum;
            if (this._hp <= 0) {
                this._hp = 0;
                this._isDead = true;
            }
            var dmgfont_1 = new eui.BitmapLabel();
            dmgfont_1.scaleX = dmgfont_1.scaleY = 0.7;
            dmgfont_1.font = "dmg_fnt";
            if (this.parent) {
                this.parent.addChildAt(dmgfont_1, this.parent.numChildren - 1);
            }
            dmgfont_1.text = "-" + dmgNum;
            dmgfont_1.x = this.x;
            dmgfont_1.y = this.y + -100 + ((Math.random() * 50) >> 0);
            egret.Tween.get(dmgfont_1).to({ y: this.y - 150 }, 600 + ((Math.random() * 400) >> 0), egret.Ease.circIn).call(function () {
                egret.Tween.removeTweens(dmgfont_1);
                if (dmgfont_1 && dmgfont_1.parent) {
                    dmgfont_1.parent.removeChild(dmgfont_1);
                }
            }, this);
        }
    };
    //计算方向
    BaseEntity.prototype.calculEntityDic = function (angle) {
        if ((angle >= -90 && angle < 0) || (angle >= 0 && angle <= 90)) {
            this._dic = 1;
        }
        else {
            this._dic = -1;
        }
        this.scaleX = this._dic * this.scale * (-this.camp);
    };
    BaseEntity.prototype.dispose = function () {
    };
    return BaseEntity;
}(eui.Component));
__reflect(BaseEntity.prototype, "BaseEntity");
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
        // SoundManager.inst().stopEffect();
        // SoundManager.inst().playEffect(`${RES_AUDIO}buttonClick.mp3`);
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
/**
 * 服务端返回消息处理
 */
var MessageCenter = (function (_super) {
    __extends(MessageCenter, _super);
    /**
     * 构造函数
     * @param type 0:使用分帧处理 1:及时执行
     */
    function MessageCenter(type) {
        var _this = _super.call(this) || this;
        _this.flag = 0;
        _this.type = type;
        _this.dict = {};
        _this.eVec = [];
        if (_this.type == 0) {
            egret.startTick(_this.run, _this);
        }
        return _this;
    }
    /**
     * 清空处理
     */
    MessageCenter.prototype.clear = function () {
        this.dict = {};
        this.eVec.splice(0);
    };
    /**
     * 添加消息监听
     * @param type 消息唯一标识
     * @param listener 侦听函数
     * @param listenerObj 侦听函数所属对象
     *
     */
    MessageCenter.prototype.addListener = function (type, listener, listenerObj) {
        var arr = this.dict[type];
        if (!arr) {
            this.dict[type] = arr = [];
        }
        else if (this.flag != 0) {
            this.dict[type] = arr = arr.concat();
        }
        //检测是否已经存在
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var item = arr_1[_i];
            if (item[0] == listener && item[1] == listenerObj) {
                return;
            }
        }
        arr.push([listener, listenerObj]);
    };
    /**
     * 移除消息监听
     * @param type 消息唯一标识
     * @param listener 侦听函数
     * @param listenerObj 侦听函数所属对象
     */
    MessageCenter.prototype.removeListener = function (type, listener, listenerObj) {
        var arr = this.dict[type];
        if (!arr) {
            return;
        }
        if (this.flag != 0) {
            this.dict[type] = arr = arr.concat();
        }
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            if (arr[i][0] == listener && arr[i][1] == listenerObj) {
                arr.splice(i, 1);
                break;
            }
        }
        if (arr.length == 0) {
            this.dict[type] = null;
            delete this.dict[type];
        }
    };
    /**
     * 移除某一对象的所有监听
     * @param listenerObj 侦听函数所属对象
     */
    MessageCenter.prototype.removeAll = function (listenerObj) {
        var keys = Object.keys(this.dict);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var type = keys_1[_i];
            var arr = this.dict[type];
            if (this.flag != 0) {
                this.dict[type] = arr = arr.concat();
            }
            var length_1 = arr.length;
            for (var j = length_1 - 1; j >= 0; j--) {
                if (arr[j][1] == listenerObj) {
                    arr.splice(j, 1);
                }
            }
            if (arr.length == 0) {
                this.dict[type] = null;
                delete this.dict[type];
            }
        }
    };
    /**
     * 触发消息
     * @param type 消息唯一标识
     * @param param 消息参数
     *
     */
    MessageCenter.prototype.dispatch = function (type) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var vo = new MessageVo();
        vo.type = type;
        vo.param = param;
        if (this.type == 0) {
            this.eVec.push(vo);
        }
        else if (this.type == 1) {
            this.dealMsg(vo);
        }
        else {
            debug.log("MessageCenter未实现的类型");
        }
    };
    /**
     * 运行
     *
     */
    MessageCenter.prototype.run = function (time) {
        var currTime = egret.getTimer();
        while (this.eVec.length > 0) {
            this.dealMsg(this.eVec.shift());
            if ((egret.getTimer() - currTime) > 5) {
                break;
            }
        }
        return false;
    };
    MessageCenter.inst = function () {
        var _inst = _super.single.call(this);
        return _inst;
    };
    /**
     * 处理一条消息
     * @param msgVo
     */
    MessageCenter.prototype.dealMsg = function (msgVo) {
        var listeners = this.dict[msgVo.type];
        if (!listeners) {
            return;
        }
        var len = listeners.length;
        if (len == 0)
            return;
        this.flag++;
        for (var _i = 0, listeners_1 = listeners; _i < listeners_1.length; _i++) {
            var listener = listeners_1[_i];
            listener[0].apply(listener[1], msgVo.param);
        }
        this.flag--;
        msgVo.dispose();
    };
    MessageCenter.setFunction = function (ins, obj, name, ex) {
        if (name.indexOf(ex) == 0 && typeof (obj[name]) == "function") {
            var msgname_1 = egret.getQualifiedClassName(obj) + MessageCenter.splite + name + MessageCenter.msgIndex;
            MessageCenter.msgIndex += 1;
            var func_1 = obj[name];
            var newfunc = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var argsLen = args.length;
                var data;
                if (ins)
                    data = func_1.call.apply(func_1, [this].concat(args));
                else
                    data = func_1.apply(void 0, args);
                if (typeof data != "boolean" || data) {
                    MessageCenter.inst().dispatch(msgname_1, data);
                }
                return data;
            };
            newfunc["funcallname"] = msgname_1;
            obj[name] = newfunc;
            return true;
        }
        return false;
    };
    /**
     * 编译 静态函数不编译
     * */
    MessageCenter.compile = function (thisobj, ex) {
        if (ex === void 0) { ex = "post"; }
        var p = thisobj.prototype;
        for (var name_1 in p) {
            MessageCenter.setFunction(true, p, name_1, ex);
        }
        // for (let name in thisobj) {
        // 	MessageCenter.setFunction(false, thisobj, name, ex);
        // }
        // let keys = Object.keys(p);
        // for (let name of keys) {
        // 	MessageCenter.setFunction(true, p, name, ex);
        // }
    };
    MessageCenter.addListener = function (func, listener, thisObj, callobj) {
        if (callobj === void 0) { callobj = undefined; }
        if (func.funcallname) {
            MessageCenter.inst().addListener(func.funcallname, listener, thisObj);
            if (callobj)
                func.call(callobj);
            return true;
        }
        else {
            debug.log("MessageCenter.addListener error:" + egret.getQualifiedClassName(thisObj));
            return false;
        }
    };
    MessageCenter.splite = ".";
    MessageCenter.msgIndex = 1;
    return MessageCenter;
}(BaseClass));
__reflect(MessageCenter.prototype, "MessageCenter");
var MessageVo = (function () {
    function MessageVo() {
    }
    MessageVo.prototype.dispose = function () {
        this.type = null;
        this.param = null;
    };
    return MessageVo;
}());
__reflect(MessageVo.prototype, "MessageVo");
function post(target, key, descriptor) {
    var method = descriptor.value;
    var msgname = target.constructor.name + MessageCenter.splite + key;
    var newfunc = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var data = method.call.apply(method, [this].concat(args));
        if (typeof data != "boolean" || data) {
            MessageCenter.inst().dispatch(msgname, data);
        }
        return data;
    };
    newfunc["funcallname"] = msgname;
    descriptor.value = newfunc;
    return descriptor;
}
function callLater(target, key, descriptor) {
    var method = descriptor.value;
    var tkey = "$" + key + "CL";
    var newfunc = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        delete this[tkey];
        method.call.apply(method, [this].concat(args));
    };
    var newfunc2 = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this[tkey])
            return;
        egret.callLater.apply(egret, [newfunc, this].concat(args));
        this[tkey] = true;
    };
    descriptor.value = newfunc2;
    return descriptor;
}
function callDelay(delay) {
    var func = function (target, key, descriptor) {
        var method = descriptor.value;
        var tkey = "$isDelay" + key;
        var newfunc = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this[tkey] = false;
            method.call.apply(method, [this].concat(args));
        };
        var newfunc2 = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this[tkey])
                return;
            this[tkey] = true;
            egret.setTimeout.apply(egret, [newfunc, this, delay].concat(args));
            // TimerManager.ins().doTimer(delay, 1, newfunc.bind(this, ...args), this); //有隐患，假如TimerManager.ins().removeAll(this)之后，可能会出现异常
        };
        descriptor.value = newfunc2;
        return descriptor;
    };
    return func;
}
/**
 * Created by yangsong on 15-1-14.
 * Sound基类
 */
var BaseSound = (function () {
    /**
     * 构造函数
     */
    function BaseSound() {
        this._cache = {};
        this._loadingCache = new Array();
        TimerManager.inst().doTimer(1 * 60 * 1000, 0, this.dealSoundTimer, this);
    }
    /**
     * 处理音乐文件的清理
     */
    BaseSound.prototype.dealSoundTimer = function () {
        var currTime = egret.getTimer();
        var keys = Object.keys(this._cache);
        for (var i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            if (!this.checkCanClear(key))
                continue;
            if (currTime - this._cache[key] >= SoundManager.CLEAR_TIME) {
                //debug.log(key + "已clear")
                delete this._cache[key];
                RES.destroyRes(key);
            }
        }
    };
    /**
     * 获取Sound
     * @param key
     * @returns {egret.Sound}
     */
    BaseSound.prototype.getSound = function (key, callBackFunc, thisArg) {
        var _this = this;
        RES.getResByUrl(key, function (data) {
            var sound = data;
            if (sound) {
                if (_this._cache[key]) {
                    _this._cache[key] = egret.getTimer();
                }
            }
            else {
                if (_this._loadingCache.indexOf(key) != -1) {
                    return null;
                }
                _this._loadingCache.push(key);
                RES.getResAsync(key, _this.onResourceLoadComplete, _this);
            }
            if (callBackFunc && thisArg) {
                callBackFunc.call(thisArg, sound);
            }
        }, this, RES.ResourceItem.TYPE_SOUND);
    };
    /**
     * 资源加载完成
     * @param event
     */
    BaseSound.prototype.onResourceLoadComplete = function (data, key) {
        var index = this._loadingCache.indexOf(key);
        if (index != -1) {
            this._loadingCache.splice(index, 1);
            this._cache[key] = egret.getTimer();
            this.loadedPlay(key);
        }
    };
    /**
     * 资源加载完成后处理播放，子类重写
     * @param key
     */
    BaseSound.prototype.loadedPlay = function (key) {
    };
    /**
     * 检测一个文件是否要清除，子类重写
     * @param key
     * @returns {boolean}
     */
    BaseSound.prototype.checkCanClear = function (key) {
        return true;
    };
    return BaseSound;
}());
__reflect(BaseSound.prototype, "BaseSound");
var StartGameEvent = (function (_super) {
    __extends(StartGameEvent, _super);
    function StartGameEvent(type, data, bubbles, cancelable) {
        if (data === void 0) { data = null; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.data = data;
        return _this;
    }
    StartGameEvent.START = "start";
    StartGameEvent.VJ_END = "vjEnd";
    StartGameEvent.GAMELOADINGEND = "gameloadingend";
    StartGameEvent.REMOVE_ITEM = "remove_item";
    StartGameEvent.CLICK_GUIDE_SKILL = "click_guide_skill";
    StartGameEvent.USE_GUIDE_SKILL = "use_guide_skill";
    return StartGameEvent;
}(egret.Event));
__reflect(StartGameEvent.prototype, "StartGameEvent");
var LayerManager = (function (_super) {
    __extends(LayerManager, _super);
    function LayerManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayerManager.prototype.iniaizlize = function (p) {
        p.addChild(LayerManager.MAP_LAYER);
        LayerManager.MAP_LAYER.name = "layer_map";
        LayerManager.MAP_LAYER.touchThrough = true;
        p.addChild(LayerManager.UNIT_LAYER);
        LayerManager.UNIT_LAYER.touchThrough = true;
        p.addChild(LayerManager.EFFECT_LAYER);
        LayerManager.EFFECT_LAYER.name = "layer_effect";
        LayerManager.EFFECT_LAYER.touchEnabled = true;
        p.addChild(LayerManager.UI_Main);
        LayerManager.UI_Main.name = "layer_main";
        LayerManager.UI_Main.touchThrough = true;
        p.addChild(LayerManager.UI_MAIN_NAV);
        LayerManager.UI_MAIN_NAV.touchThrough = true;
        p.addChild(LayerManager.UI_Pop);
        LayerManager.UI_Pop.name = "layer_pop";
        LayerManager.UI_Pop.touchThrough = true;
        p.addChild(LayerManager.TIPS_LAYER);
        LayerManager.TIPS_LAYER.touchThrough = true;
    };
    LayerManager.inst = function () {
        var _inst = _super.single.call(this);
        return _inst;
    };
    LayerManager.MAP_LAYER = new eui.UILayer();
    LayerManager.UNIT_LAYER = new eui.UILayer();
    LayerManager.EFFECT_LAYER = new eui.UILayer();
    LayerManager.UI_Main = new eui.UILayer();
    LayerManager.UI_MAIN_NAV = new eui.UILayer();
    LayerManager.UI_Pop = new eui.UILayer();
    LayerManager.TIPS_LAYER = new eui.UILayer();
    return LayerManager;
}(BaseClass));
__reflect(LayerManager.prototype, "LayerManager");
var ViewManager = (function (_super) {
    __extends(ViewManager, _super);
    function ViewManager() {
        var _this = _super.call(this) || this;
        _this._regesterInfo = {};
        _this._views = [];
        return _this;
    }
    ViewManager.inst = function () {
        var _inst = _super.single.call(this);
        return _inst;
    };
    /**获取当前界面是否注册 */
    ViewManager.prototype.getKey = function (nameOrClass) {
        var key = "";
        var keys = Object.keys(this._regesterInfo);
        for (var i = 0, len = keys.length; i < len; i++) {
            var tempKey = keys[i];
            if (this._regesterInfo[tempKey][0] == nameOrClass) {
                key = tempKey;
                break;
            }
        }
        return key;
    };
    /**获取当前界面是否存在 */
    ViewManager.prototype.isExistView = function (view) {
        for (var i = 0; i < this._views.length; i++) {
            if (this._views[i] instanceof view) {
                return { view: this._views[i], index: i };
            }
        }
        return null;
    };
    /**
     * 面板注册
     * @param view 面板类
     * @param layer 层级
     */
    ViewManager.prototype.reg = function (viewClass, layer) {
        if (viewClass == null) {
            return;
        }
        var keys = egret.getQualifiedClassName(viewClass);
        if (this._regesterInfo[keys]) {
            return;
        }
        this._regesterInfo[keys] = [viewClass, layer];
    };
    ViewManager.prototype.open = function (nameOrClass, param, startEffect) {
        if (param === void 0) { param = null; }
        if (startEffect === void 0) { startEffect = false; }
        var keys = this.getKey(nameOrClass);
        if (keys) {
            //当前界面已经注册
            var info = this._regesterInfo[keys];
            var obj = this.isExistView(info[0]);
            var view_1 = obj ? obj.view : null;
            var index = obj ? obj.index - 1 : 0;
            if (view_1 == null) {
                view_1 = new info[0]();
                view_1.addToParent(info[1]);
                view_1.open.apply(view_1, param);
                this._views.push(view_1);
            }
            else {
                if (view_1.refreshPage) {
                    view_1.refreshPage.apply(view_1, param);
                }
            }
            if (startEffect) {
                var curView_1 = this._views[index];
                if (curView_1) {
                    curView_1.left = 0;
                    egret.Tween.get(curView_1).to({ left: -100 }, 500, egret.Ease.circOut).call(function () {
                        egret.Tween.removeTweens(curView_1);
                    }, this);
                }
                view_1.left = view_1.width;
                egret.Tween.get(view_1).to({ left: 0 }, 500, egret.Ease.circOut).call(function () {
                    egret.Tween.removeTweens(view_1);
                }, this);
            }
        }
        else {
            //当前界面未注册
            console.log("当前界面未注册----" + nameOrClass);
        }
    };
    ViewManager.prototype.getView = function (nameOrClass) {
        var keys = this.getKey(nameOrClass);
        var info = this._regesterInfo[keys];
        var obj = this.isExistView(info[0]);
        var view = obj ? obj.view : null;
        // if (this._views[keys] instanceof Array)
        // 	return null;
        return view;
    };
    ViewManager.prototype.closeReturnEffect = function (nameOrClass, removed, _preView) {
        var _this = this;
        if (removed === void 0) { removed = false; }
        if (_preView === void 0) { _preView = null; }
        var keys = this.getKey(nameOrClass);
        if (keys) {
            var info = this._regesterInfo[keys];
            var obj = this.isExistView(info[0]);
            var index = obj ? obj.index : 0;
            var view_2 = this._views[index];
            var preView_1 = this._views[index - 1];
            if (view_2) {
                egret.Tween.get(view_2).to({ left: view_2.width }, 500, egret.Ease.circOut).call(function () {
                    egret.Tween.removeTweens(view_2);
                    if (removed) {
                        //需要移除这个界面;
                        _this.close(nameOrClass);
                    }
                }, this);
            }
            if (_preView) {
                var keys2 = this.getKey(_preView);
                if (keys2) {
                    var info2 = this._regesterInfo[keys2];
                    var obj2 = this.isExistView(info2[0]);
                    var index2 = -1;
                    if (obj2)
                        index2 = obj2.index;
                    if (index2 != -1)
                        preView_1 = this._views[index2];
                }
            }
            if (preView_1) {
                if (preView_1.refreshPage) {
                    preView_1.refreshPage();
                }
                egret.Tween.get(preView_1).to({ left: 0 }, 500, egret.Ease.circOut).call(function () {
                    egret.Tween.removeTweens(preView_1);
                });
            }
        }
    };
    ViewManager.prototype.close = function (nameOrClass) {
        var keys = this.getKey(nameOrClass);
        if (keys) {
            //当前界面已经注册
            var info = this._regesterInfo[keys];
            var obj = this.isExistView(info[0]);
            if (!obj) {
                return null;
            }
            var index = obj ? obj.index : 0;
            var view = this._views[index];
            if (view == null) {
                return null;
            }
            else {
                this._views.splice(index, 1);
                view.removeFromeParent();
            }
        }
        else {
            //当前界面未注册
            console.log("当前界面未注册----" + nameOrClass);
        }
    };
    return ViewManager;
}(BaseClass));
__reflect(ViewManager.prototype, "ViewManager");
/**
 *
 * 地图网格辅助类
 */
var GameMap = (function () {
    function GameMap() {
    }
    /** 初始化 */
    GameMap.init = function (data) {
        var gds = data.grids;
        GameMap.grid = [];
        GameMap.runGrid = [];
        GameMap.CELL_SIZE = data.gridw;
        GameMap.MAX_WIDTH = data.pixwidth;
        GameMap.MAX_HEIGHT = data.pixheight;
        GameMap.COL = data.cols;
        GameMap.ROW = data.rows;
        this.AstarNode = new astar.Grid(data.cols, data.rows);
        for (var i = 0; i < data.rows; i++) {
            GameMap.grid[i] = [];
            for (var j = 0; j < data.cols; j++) {
                GameMap.grid[i][j] = gds[i * data.cols + j];
                if (GameMap.grid[i][j] == 1) {
                    var obj = { row: i, col: j };
                    GameMap.runGrid.push(obj);
                }
                if (GameMap.grid[i][j] == 0) {
                    this.AstarNode.setWalkable(j, i, false);
                }
            }
        }
    };
    /**像素转格子坐标 */
    GameMap.point2Grid = function (px, py) {
        var gridXnum = (px / GameMap.CELL_SIZE) >> 0;
        var gridYnum = (py / GameMap.CELL_SIZE) >> 0;
        return { x: gridXnum, y: gridYnum };
    };
    /**格子位置转像素 */
    GameMap.grid2Point = function (gx, gy) {
        var x = gx * GameMap.CELL_SIZE;
        var y = gy * GameMap.CELL_SIZE;
        return { x: x, y: y };
    };
    /**
     * 计算建筑物所占的格子集合
     * 返回所占的格子坐标的集合
     */
    GameMap.calculBuildGridArea = function (rect) {
        var blockXNum = Math.ceil(rect.width / GameMap.CELL_SIZE);
        var blockYNum = Math.ceil(rect.height / GameMap.CELL_SIZE);
        var xys = [];
        var firstGrid = GameMap.point2Grid(rect.x, rect.y);
        for (var i = 0; i < blockXNum; i++) {
            for (var j = 0; j < blockYNum; j++) {
                var xy = { x: firstGrid.x + i, y: firstGrid.y + j };
                xys.push(xy);
            }
        }
        return xys;
    };
    /**根据格子坐标判断是否处于阻挡点  */
    GameMap.walkable = function (x, y) {
        if (!(GameMap.grid[y])) {
            return null;
        }
        if (isNaN(GameMap.grid[y][x])) {
            return null;
        }
        var grid = GameMap.grid[y][x];
        if (grid == 3) {
            return null;
        }
        return grid;
    };
    /** 格子数据 */
    GameMap.buildTouch = false;
    GameMap.grid = [];
    GameMap.runGrid = [];
    return GameMap;
}());
__reflect(GameMap.prototype, "GameMap");
/**
 * @author
 */
var GameApp = (function (_super) {
    __extends(GameApp, _super);
    function GameApp() {
        return _super.call(this) || this;
    }
    /**总波数 增加 比例 5关加一波 */ ;
    GameApp.inst = function () {
        var _inst = _super.single.call(this);
        return _inst;
    };
    GameApp.prototype.load = function () {
        eui.Label.default_fontFamily = "Microsoft YaHei";
        // GlobalConfig.parserData();
        // GameMap.init(RES.getRes("map_json"));
        LoadingUI.inst().hide();
        ViewManager.inst().open(GameMainView);
        ViewManager.inst().open(StartGameView);
        var goldstr = egret.localStorage.getItem(LocalStorageEnum.ROLE_GOLD);
        if (!goldstr) {
            GameApp.roleGold = 800;
        }
        else {
            GameApp.roleGold = parseInt(goldstr);
        }
        var gemstr = egret.localStorage.getItem(LocalStorageEnum.ROLE_GEM);
        if (!gemstr) {
            GameApp.roleGem = 10;
        }
        else {
            GameApp.roleGem = parseInt(gemstr);
        }
        var rebonidstr = egret.localStorage.getItem(LocalStorageEnum.REBORNIDS);
        if (!rebonidstr) {
            GameApp.reborns = {};
        }
        else {
            GameApp.reborns = JSON.parse(rebonidstr);
        }
        var rebornCfg = egret.localStorage.getItem(LocalStorageEnum.REBORNCFG);
        if (rebornCfg) {
            GameApp.skillCfg = JSON.parse(rebornCfg);
        }
        var levelstr = egret.localStorage.getItem(LocalStorageEnum.LEVEL);
        if (!levelstr) {
            GameApp.level = 1;
        }
        else {
            GameApp.level = parseInt(levelstr);
        }
        eui.Binding.bindHandler(GameApp, ["level"], this.levelChange, this);
        recharge.sendToNativeLoadEnd();
    };
    GameApp.prototype.levelChange = function () {
        egret.localStorage.setItem(LocalStorageEnum.LEVEL, GameApp.level.toString());
    };
    GameApp.prototype.onDataCallBack = function (value) {
        if (value) {
            GameApp.phurseState = false;
            GameApp.pay_cbDdata = "";
            UserTips.inst().showTips("\u8D2D\u4E70\u6210\u529F,\u83B7\u5F97\u5143\u5B9Dx" + value);
        }
    };
    GameApp.prototype.refreshTimespan = function () {
        var refreshTimestr = egret.localStorage.getItem(LocalStorageEnum.BOX_REFRESH_TIMESPAN);
        if (refreshTimestr) {
            var nowTime = new Date().getTime();
            if (nowTime >= parseInt(refreshTimestr)) {
                //刷新
                egret.localStorage.setItem(LocalStorageEnum.BOX_REWARD_GET, "0");
                egret.localStorage.setItem(LocalStorageEnum.BOX_REFRESH_TIMESPAN, "0");
                egret.localStorage.setItem(LocalStorageEnum.BOX_REFRESH_TIMESPAN, GlobalFun.getBoxRfreshTimeSpan().toString());
            }
        }
        else {
            egret.localStorage.setItem(LocalStorageEnum.BOX_REFRESH_TIMESPAN, GlobalFun.getBoxRfreshTimeSpan().toString());
        }
    };
    Object.defineProperty(GameApp.prototype, "gold", {
        get: function () {
            return GameApp.roleGold;
        },
        set: function (value) {
            GameApp.roleGold = value;
            egret.localStorage.setItem(LocalStorageEnum.ROLE_GOLD, value.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameApp.prototype, "gem", {
        get: function () {
            return GameApp.roleGem;
        },
        set: function (value) {
            GameApp.roleGem = value;
            egret.localStorage.setItem(LocalStorageEnum.ROLE_GEM, value.toString());
        },
        enumerable: true,
        configurable: true
    });
    GameApp.prototype.postPerLoadProgress = function (itemsLoaded, itemsTotal) {
        return [itemsLoaded, itemsTotal];
    };
    GameApp.phurseState = false;
    GameApp.roleGold = 0;
    GameApp.roleGem = 0;
    GameApp.reborns = {};
    GameApp.level = 1;
    GameApp.totalCount = 5;
    /**背景音乐volume */
    GameApp.bgMusic = 0.5;
    /**特效音乐 */
    GameApp.effectMusic = 0.5;
    GameApp.gameaEnd = true;
    return GameApp;
}(BaseClass));
__reflect(GameApp.prototype, "GameApp");
MessageCenter.compile(GameApp);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else if (typeof generateJSON !== 'undefined') {
            if (url.indexOf(".exml") > -1) {
                var dataPath = url.split("/");
                dataPath.pop();
                var dirPath = dataPath.join("/") + "_EUI.json";
                if (!generateJSON.paths[url]) {
                    RES.getResByUrl(dirPath, function (data) {
                        window["JSONParseClass"]["setData"](data);
                        egret.callLater(function () {
                            onSuccess.call(thisObject, generateJSON.paths[url]);
                        }, _this);
                    }, this, RES.ResourceItem.TYPE_JSON);
                }
                else {
                    egret.callLater(function () {
                        onSuccess.call(thisObject, generateJSON.paths[url]);
                    }, this);
                }
            }
            else {
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateJSON);
                }, this);
            }
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
var GameConfig;
(function (GameConfig) {
    var platform;
    (function (platform) {
        /**程序发包设置 ios或者是wechat */
        platform.setting = "ios";
    })(platform = GameConfig.platform || (GameConfig.platform = {}));
})(GameConfig || (GameConfig = {}));
var GlobalConfig = (function () {
    function GlobalConfig() {
    }
    GlobalConfig.setData = function (data) {
        this.config = data;
    };
    GlobalConfig.parserData = function () {
        if (this.init)
            return;
        if (!this.config)
            return;
        var _loop_1 = function (key) {
            var value = this_1.config[key];
            var objCls = egret.getDefinitionByName(key);
            if (objCls) {
                //用来存储配置一个默认实例
                var objKey_1 = "_obj" + key;
                this_1[objKey_1] = new objCls();
                //用来确认配置表是否已经设置 __proto__ 为 储存的实例（this[objKey])
                var boolKey_1 = "_bool" + key;
                this_1[boolKey_1] = false;
                //将真正的配置存放在this[newKey]中
                var newKey_1 = "_" + key + "_";
                //创建key引用配置
                Object.defineProperty(this_1, key, {
                    get: function () {
                        var obj = this[newKey_1];
                        if (this[boolKey_1])
                            return obj;
                        var proto = this[objKey_1];
                        this.parseKeys(obj, proto, GlobalConfig.keys[key] || 0);
                        this[boolKey_1] = true;
                        return obj;
                    },
                    set: function (val) {
                        this[newKey_1] = val;
                    }
                });
            }
            //赋值
            this_1[key] = value;
        };
        var this_1 = this;
        for (var key in this.config) {
            _loop_1(key);
        }
        //数据初始完毕
        this.init = true;
        this.config = null;
    };
    GlobalConfig.parseKeys = function (obj, proto, key) {
        if (key == 0) {
            obj.__proto__ = proto;
        }
        else {
            for (var i in obj) {
                this.parseKeys(obj[i], proto, key - 1);
            }
        }
    };
    GlobalConfig.keys = {};
    return GlobalConfig;
}());
__reflect(GlobalConfig.prototype, "GlobalConfig");
var GuideCfg = (function () {
    function GuideCfg() {
    }
    GuideCfg.guidecfg = {
        "1_1": { "event": StartGameEvent.CLICK_GUIDE_SKILL, next: "1_2", param: { id: "1_2" } },
        "1_2": { "event": StartGameEvent.USE_GUIDE_SKILL, next: "", param: { skillId: 100002 } },
    };
    return GuideCfg;
}());
__reflect(GuideCfg.prototype, "GuideCfg");
var MonsterCfg = (function () {
    function MonsterCfg() {
    }
    MonsterCfg.cfgs = [
        {
            name: "名字",
            level: 1,
            atktype: 1,
            atkDis: 100,
            type: 1,
            spd: 60,
            atk: 100,
            hp: 500,
            id: 1,
            skillId: 0,
            model: "monster_1"
        },
        {
            name: "名字",
            level: 1,
            atktype: 1,
            atkDis: 100,
            type: 1,
            spd: 60,
            atk: 100,
            hp: 500,
            id: 2,
            skillId: 0,
            model: "monster_2"
        },
        {
            name: "名字",
            level: 1,
            atktype: 1,
            atkDis: 100,
            type: 1,
            spd: 60,
            atk: 100,
            hp: 500,
            id: 3,
            skillId: 0,
            model: "monster_3"
        },
        {
            name: "名字",
            level: 1,
            atktype: 1,
            atkDis: 100,
            type: 1,
            spd: 60,
            atk: 100,
            hp: 500,
            id: 4,
            skillId: 0,
            model: "monster_4"
        },
        {
            name: "名字",
            level: 1,
            atktype: 1,
            atkDis: 100,
            type: 1,
            spd: 60,
            atk: 100,
            hp: 500,
            id: 5,
            skillId: 0,
            model: "monster_5"
        },
        {
            name: "名字",
            level: 1,
            atktype: 1,
            atkDis: 100,
            type: 1,
            spd: 60,
            atk: 100,
            hp: 500,
            id: 6,
            skillId: 0,
            model: "monster_6"
        },
        {
            name: "名字",
            level: 1,
            atktype: 1,
            atkDis: 100,
            type: 1,
            spd: 60,
            atk: 100,
            hp: 500,
            id: 7,
            skillId: 0,
            model: "monster_7"
        },
        {
            name: "名字",
            level: 1,
            atktype: 1,
            atkDis: 100,
            type: 1,
            spd: 60,
            atk: 100,
            hp: 500,
            id: 8,
            skillId: 0,
            model: "monster_8"
        },
        {
            name: "名字",
            level: 1,
            atktype: 1,
            atkDis: 100,
            type: 1,
            spd: 60,
            atk: 100,
            hp: 500,
            id: 9,
            skillId: 0,
            model: "monster_9"
        },
        {
            name: "名字",
            level: 1,
            atktype: 1,
            atkDis: 100,
            type: 2,
            spd: 60,
            atk: 100,
            hp: 500,
            id: 10,
            skillId: 0,
            model: "s_monster_1"
        },
        {
            name: "名字",
            level: 1,
            atktype: 1,
            atkDis: 100,
            type: 2,
            spd: 60,
            atk: 100,
            hp: 500,
            id: 11,
            skillId: 0,
            model: "s_monster_2"
        },
        ,
        {
            name: "名字",
            level: 1,
            atktype: 1,
            atkDis: 100,
            type: 2,
            spd: 60,
            atk: 100,
            hp: 500,
            id: 12,
            skillId: 0,
            model: "s_monster_3"
        },
        {
            name: "名字",
            level: 1,
            atktype: 1,
            atkDis: 100,
            type: 2,
            spd: 60,
            atk: 100,
            hp: 500,
            id: 13,
            skillId: 0,
            model: "s_monster_4"
        },
        {
            name: "名字",
            level: 1,
            atktype: 1,
            atkDis: 100,
            type: 2,
            spd: 60,
            atk: 100,
            hp: 500,
            id: 14,
            skillId: 0,
            model: "s_monster_5"
        },
        {
            name: "名字",
            level: 1,
            atktype: 1,
            atkDis: 100,
            type: 2,
            spd: 60,
            atk: 100,
            hp: 500,
            id: 15,
            skillId: 0,
            model: "s_monster_6"
        },
        {
            name: "名字",
            level: 1,
            atktype: 1,
            atkDis: 100,
            type: 2,
            spd: 60,
            atk: 100,
            hp: 500,
            id: 16,
            skillId: 0,
            model: "s_monster_7"
        },
        {
            name: "名字",
            level: 1,
            atktype: 1,
            atkDis: 100,
            type: 2,
            spd: 60,
            atk: 100,
            hp: 500,
            id: 17,
            skillId: 0,
            model: "s_monster_8"
        },
        {
            name: "名字",
            level: 1,
            atktype: 1,
            atkDis: 100,
            type: 2,
            spd: 60,
            atk: 100,
            hp: 500,
            id: 18,
            skillId: 0,
            model: "s_monster_9"
        },
        {
            name: "名字",
            level: 1,
            atktype: 1,
            atkDis: 100,
            type: 2,
            spd: 60,
            atk: 100,
            hp: 500,
            id: 19,
            skillId: 0,
            model: "s_monster_10"
        },
        {
            name: "名字",
            level: 1,
            atktype: 1,
            atkDis: 100,
            type: 2,
            spd: 60,
            atk: 100,
            hp: 500,
            id: 20,
            skillId: 0,
            model: "s_monster_11"
        }
    ];
    return MonsterCfg;
}());
__reflect(MonsterCfg.prototype, "MonsterCfg");
var RebornCfg = (function () {
    function RebornCfg() {
    }
    RebornCfg.cfg = [
        {
            cost: 0,
            mid: 1,
            name: "神将",
            level: 1,
            atktype: 1,
            atkDis: 50,
            type: 1,
            spd: 100,
            atk: 50,
            hp: 500,
            id: 4,
            skillId: 0,
            model: "skill_103_1",
            skillType: 1,
            atkspd: 6,
            desc: "神将"
        },
        {
            cost: 1500,
            mid: 2,
            name: "剑圣",
            level: 1,
            rmodel: 1,
            atktype: 1,
            atkDis: 50,
            type: 1,
            spd: 100,
            atk: 50,
            hp: 500,
            id: 4,
            skillId: 0,
            model: "skill_103_2",
            skillType: 1,
            atkspd: 6,
            desc: "攻速暴增200%"
        },
        {
            cost: 2000,
            mid: 3,
            name: "天尊",
            level: 1,
            atktype: 1,
            atkDis: 50,
            rmodel: 3,
            type: 1,
            spd: 100,
            atk: 50,
            hp: 500,
            id: 4,
            skillId: 0,
            model: "skill_103_3",
            skillType: 1,
            atkspd: 6,
            desc: "全属性增加1倍"
        },
        {
            cost: 2500,
            mid: 4,
            name: "法神",
            level: 1,
            atktype: 1,
            atkDis: 200,
            rmodel: 2,
            type: 1,
            spd: 100,
            atk: 50,
            hp: 500,
            id: 4,
            skillId: 0,
            model: "skill_103_4",
            skillType: 1,
            atkspd: 6,
            desc: "攻击力增幅4倍"
        },
    ];
    return RebornCfg;
}());
__reflect(RebornCfg.prototype, "RebornCfg");
var ShopCfg = (function () {
    function ShopCfg() {
    }
    /**索引为 0时金币商城配置 。1为钻石商城配置*/
    ShopCfg.shopCfg = [
        [
            {
                cost: 6,
                costNum: 600,
                shopId: "0_1",
                desc: "600金",
                icon_title: "gold_font_1_png",
                icon: "goldIcon_1_png",
            },
            {
                cost: 30,
                costNum: 3000,
                shopId: "0_2",
                desc: "3000金",
                icon_title: "gold_font_2_png",
                icon: "goldIcon_2_png",
            },
            {
                cost: 68,
                costNum: 6800,
                shopId: "0_3",
                desc: "6800金",
                icon_title: "gold_font_3_png",
                icon: "goldIcon_3_png",
            },
            {
                cost: 128,
                costNum: 12800,
                shopId: "0_4",
                desc: "12800金",
                icon_title: "gold_font_4_png",
                icon: "goldIcon_4_png",
            },
            {
                cost: 328,
                costNum: 32800,
                shopId: "0_5",
                desc: "32800金",
                icon_title: "gold_font_5_png",
                icon: "goldIcon_5_png",
            }
        ]
    ];
    return ShopCfg;
}());
__reflect(ShopCfg.prototype, "ShopCfg");
var SkillCfg = (function () {
    function SkillCfg() {
    }
    SkillCfg.skillCfg = [
        { skillId: 101, skillIcon: "skill_101_png", skillTitle: "skill_101_title_png", desc: "连续点击怪物攻击", cd: 40, time: 3, level: 1, cost: 30, atk: 5, skillType: 0, buffTime: 10 },
        { skillId: 102, skillIcon: "skill_102_png", skillTitle: "skill_102_title_png", desc: "按住屏幕划动", cd: 40, time: 3, level: 1, cost: 30, atk: 5, skillType: 0, buffTime: 5 },
        { skillId: 103, skillIcon: "skill_103_png", skillTitle: "skill_103_title_png", desc: "点击战场召唤", cd: 0, time: 0, num: 10, level: 1, cost: 100, atk: 50, skillType: 0, buffTime: 0 },
        { skillId: 104, skillIcon: "skill_104_png", skillTitle: "skill_104_title_png", desc: "选择攻击区域", cd: 60, time: 0, level: 1, cost: 100, atk: 20, skillType: 0, buffTime: 0 },
        { skillId: 105, skillIcon: "skill_105_png", skillTitle: "skill_105_title_png", desc: "刷新技能cd", cd: 0, time: 0, level: 1, cost: 0, skillType: 0, buffTime: 0 }
    ];
    return SkillCfg;
}());
__reflect(SkillCfg.prototype, "SkillCfg");
/**
 * 内购共用方法
 *
 * 1 发送请求 recharge.sendToNativePhurse(_data:IpayParam,cb:(num)=>void,arg:any)
 * 参数: _data 遵循 {Key1:'600'} 支持最少1个 最多4个参数 。
 *      _cb(num)   回调函数 。ios回调回来以后会走这个方法 。arg 当前回调的作用域 参数num 为ios传回来的参数
 *
 * 2.发送加载完成
 *
 *   recharge.sendToNativeLoadEnd();
 *
 */
var recharge;
(function (recharge) {
    var _cb;
    var _arg;
    /**购买回调返回 */
    function payCallBack(param) {
        if (_cb && _arg) {
            _cb.call(_arg, param);
        }
    }
    /**发送到ios请求购买 */
    function sendToNativePhurse(_data, cb, arg) {
        window["callBack"] = payCallBack;
        _cb = cb;
        _arg = arg;
        if (window["webkit"] && window["webkit"].messageHandlers && window["webkit"].messageHandlers.funciap) {
            window["webkit"].messageHandlers.funciap.postMessage(_data);
        }
    }
    recharge.sendToNativePhurse = sendToNativePhurse;
    /**发送ios加载完成 */
    function sendToNativeLoadEnd() {
        if (window["webkit"] && window["webkit"].messageHandlers && window["webkit"].messageHandlers.loadingFinish) {
            window["webkit"].messageHandlers.loadingFinish.postMessage({});
        }
    }
    recharge.sendToNativeLoadEnd = sendToNativeLoadEnd;
})(recharge || (recharge = {}));
/**
 * A星寻路
 * @author chenkai
 * @since 2017/11/3
 */
var astar;
(function (astar) {
    var AStar = (function () {
        function AStar() {
            this._straightCost = 1.0; //上下左右走的代价
            this._diagCost = Math.SQRT2; //斜着走的代价 
            //this._heuristic = this.manhattan;  
            //this._heuristic = this.euclidian;
            this._heuristic = this.diagonal;
        }
        //寻路
        AStar.prototype.findPath = function (grid) {
            this._grid = grid;
            this._open = [];
            this._closed = [];
            this._startNode = this._grid.startNode;
            this._endNode = this._grid.endNode;
            this._startNode.g = 0;
            this._startNode.h = this._heuristic(this._startNode);
            this._startNode.f = this._startNode.g + this._startNode.h;
            return this.search();
        };
        //查找路径
        AStar.prototype.search = function () {
            var node = this._startNode;
            while (node != this._endNode) {
                var startX = Math.max(0, node.x - 1);
                var endX = Math.min(this._grid.numCols - 1, node.x + 1);
                var startY = Math.max(0, node.y - 1);
                var endY = Math.min(this._grid.numRows - 1, node.y + 1);
                for (var i = startX; i <= endX; i++) {
                    for (var j = startY; j <= endY; j++) {
                        //不让斜着走
                        // if(i != node.x && j != node.y){
                        // 	continue;
                        // }
                        var test = this._grid.getNode(i, j);
                        if (test == node ||
                            !test.walkable ||
                            !this._grid.getNode(node.x, test.y).walkable ||
                            !this._grid.getNode(test.x, node.y).walkable) {
                            continue;
                        }
                        var cost = this._straightCost;
                        if (!((node.x == test.x) || (node.y == test.y))) {
                            cost = this._diagCost;
                        }
                        var g = node.g + cost * test.costMultiplier;
                        var h = this._heuristic(test);
                        var f = g + h;
                        if (this.isOpen(test) || this.isClosed(test)) {
                            if (test.f > f) {
                                test.f = f;
                                test.g = g;
                                test.h = h;
                                test.parent = node;
                            }
                        }
                        else {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = node;
                            this._open.push(test);
                        }
                    }
                }
                for (var o = 0; o < this._open.length; o++) {
                }
                this._closed.push(node);
                if (this._open.length == 0) {
                    console.log("AStar >> no path found" + this._endNode);
                    return false;
                }
                var openLen = this._open.length;
                for (var m = 0; m < openLen; m++) {
                    for (var n = m + 1; n < openLen; n++) {
                        if (this._open[m].f > this._open[n].f) {
                            var temp = this._open[m];
                            this._open[m] = this._open[n];
                            this._open[n] = temp;
                        }
                    }
                }
                node = this._open.shift();
            }
            this.buildPath();
            return true;
        };
        //获取路径
        AStar.prototype.buildPath = function () {
            this._path = new Array();
            var node = this._endNode;
            this._path.push(node);
            while (node != this._startNode) {
                node = node.parent;
                this._path.unshift(node);
            }
        };
        Object.defineProperty(AStar.prototype, "path", {
            get: function () {
                return this._path;
            },
            enumerable: true,
            configurable: true
        });
        //是否待检查
        AStar.prototype.isOpen = function (node) {
            for (var i = 0; i < this._open.length; i++) {
                if (this._open[i] == node) {
                    return true;
                }
            }
            return false;
        };
        //是否已检查
        AStar.prototype.isClosed = function (node) {
            for (var i = 0; i < this._closed.length; i++) {
                if (this._closed[i] == node) {
                    return true;
                }
            }
            return false;
        };
        //曼哈顿算法
        AStar.prototype.manhattan = function (node) {
            return Math.abs(node.x - this._endNode.x) * this._straightCost + Math.abs(node.y + this._endNode.y) * this._straightCost;
        };
        AStar.prototype.euclidian = function (node) {
            var dx = node.x - this._endNode.x;
            var dy = node.y - this._endNode.y;
            return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
        };
        AStar.prototype.diagonal = function (node) {
            var dx = Math.abs(node.x - this._endNode.x);
            var dy = Math.abs(node.y - this._endNode.y);
            var diag = Math.min(dx, dy);
            var straight = dx + dy;
            return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
        };
        Object.defineProperty(AStar.prototype, "visited", {
            get: function () {
                return this._closed.concat(this._open);
            },
            enumerable: true,
            configurable: true
        });
        return AStar;
    }());
    astar.AStar = AStar;
    __reflect(AStar.prototype, "astar.AStar");
})(astar || (astar = {}));
/**
 * 网格类
 * @author chenkai
 * @since 2017/11/3
 */
var astar;
(function (astar) {
    var Grid = (function () {
        function Grid(numCols, numRows) {
            //形成格子区域
            this._numCols = numCols;
            this._numRows = numRows;
            this._nodes = [];
            for (var i = 0; i < numCols; i++) {
                this._nodes[i] = [];
                for (var j = 0; j < numRows; j++) {
                    this._nodes[i][j] = new astar.Node(i, j);
                }
            }
        }
        Grid.prototype.getNode = function (x, y) {
            return this._nodes[x][y];
        };
        Grid.prototype.setEndNode = function (x, y) {
            this._endNode = this._nodes[x][y];
        };
        Grid.prototype.setStartNode = function (x, y) {
            this._startNode = this._nodes[x][y];
        };
        Grid.prototype.setWalkable = function (x, y, value) {
            this._nodes[x][y].walkable = value;
        };
        Object.defineProperty(Grid.prototype, "endNode", {
            get: function () {
                return this._endNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Grid.prototype, "numCols", {
            get: function () {
                return this._numCols;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Grid.prototype, "numRows", {
            get: function () {
                return this._numRows;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Grid.prototype, "startNode", {
            get: function () {
                return this._startNode;
            },
            enumerable: true,
            configurable: true
        });
        return Grid;
    }());
    astar.Grid = Grid;
    __reflect(Grid.prototype, "astar.Grid");
})(astar || (astar = {}));
/**
 * Node 节点
 * @author chenkai
 * @since 2017/11/3
 */
var astar;
(function (astar) {
    var Node = (function () {
        function Node(x, y) {
            this.walkable = true;
            this.costMultiplier = 1.0;
            this.x = x;
            this.y = y;
        }
        return Node;
    }());
    astar.Node = Node;
    __reflect(Node.prototype, "astar.Node");
})(astar || (astar = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
/**
 * Created by yangsong on 15-1-14.
 * 背景音乐类
 */
var SoundBg = (function (_super) {
    __extends(SoundBg, _super);
    /**
     * 构造函数
     */
    function SoundBg() {
        var _this = _super.call(this) || this;
        _this._currBg = "";
        return _this;
    }
    /**
     * 停止当前音乐
     */
    SoundBg.prototype.stop = function () {
        if (this._currSoundChannel) {
            this.removeSoundChannel(this._currSoundChannel);
        }
        this._currSoundChannel = null;
        this._currSound = null;
        this._currBg = "";
    };
    /**
     * 播放某个音乐
     * @param effectName
     */
    SoundBg.prototype.play = function (effectName) {
        var _this = this;
        if (this._currBg == effectName)
            return;
        this.stop();
        this._currBg = effectName;
        this.getSound(effectName, function (sound) {
            _this.playSound(sound);
        }, this);
    };
    //主要是解决ios不播放的bug
    SoundBg.prototype.touchPlay = function () {
        if (this._currSoundChannel && this._currSound) {
            var pos = this._currSoundChannel.position;
            this.removeSoundChannel(this._currSoundChannel);
            this._currSoundChannel = this._currSound.play(pos, 1);
            this.addSoundChannel(this._currSoundChannel);
        }
    };
    /**
     * 播放
     * @param sound
     */
    SoundBg.prototype.playSound = function (sound) {
        this._currSound = sound;
        this._currSoundChannel = this._currSound.play(0, 1);
        this.addSoundChannel(this._currSoundChannel);
    };
    SoundBg.prototype.onSoundComplete = function () {
        if (this._currSoundChannel)
            this.removeSoundChannel(this._currSoundChannel);
        this.playSound(this._currSound);
    };
    SoundBg.prototype.addSoundChannel = function (channel) {
        channel.volume = this._volume;
        channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
    };
    SoundBg.prototype.removeSoundChannel = function (channel) {
        channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        channel.stop();
    };
    /**
     * 设置音量
     * @param volume
     */
    SoundBg.prototype.setVolume = function (volume) {
        this._volume = volume;
        if (this._currSoundChannel) {
            this._currSoundChannel.volume = this._volume;
        }
    };
    /**
     * 资源加载完成后处理播放
     * @param key
     */
    SoundBg.prototype.loadedPlay = function (key) {
        if (this._currBg == key) {
            var sound = RES.getRes(key);
            //避免音频解码失败报错
            if (!sound) {
                return;
            }
            this.playSound(sound);
        }
    };
    /**
     * 检测一个文件是否要清除
     * @param key
     * @returns {boolean}
     */
    SoundBg.prototype.checkCanClear = function (key) {
        return this._currBg != key;
    };
    return SoundBg;
}(BaseSound));
__reflect(SoundBg.prototype, "SoundBg");
/**
 * Created by yangsong on 15-1-14.
 * 音效类
 */
var SoundEffects = (function (_super) {
    __extends(SoundEffects, _super);
    /**
     * 构造函数
     */
    function SoundEffects() {
        var _this = _super.call(this) || this;
        _this._loaded = false;
        return _this;
    }
    /**
     * 播放一个音效
     * @param effectName
     */
    SoundEffects.prototype.play = function (effectName) {
        var _this = this;
        this._loaded = true;
        this.getSound(effectName, function (sound) {
            if (sound) {
                _this._sound = sound;
                _this.playSound(_this._sound);
            }
        }, this);
    };
    /**
     * 停止一个音效
     * @param effectName
     */
    SoundEffects.prototype.stop = function () {
        if (this._soundChannel) {
            this._soundChannel.stop();
        }
    };
    /**
     * 播放
     * @param sound
     */
    SoundEffects.prototype.playSound = function (sound) {
        if (this._soundChannel) {
            this._soundChannel.stop();
        }
        this._soundChannel = sound.play(0, 1);
        this._soundChannel.volume = this._volume;
    };
    /**
     * 设置音量
     * @param volume
     */
    SoundEffects.prototype.setVolume = function (volume) {
        this._volume = volume;
    };
    /**
     * 资源加载完成后处理播放
     * @param key
     */
    SoundEffects.prototype.loadedPlay = function (key) {
        var sound = RES.getRes(key);
        //避免音频解码失败报错
        if (!sound) {
            return;
        }
        this.playSound(sound);
    };
    return SoundEffects;
}(BaseSound));
__reflect(SoundEffects.prototype, "SoundEffects");
/**
 * Created by yangsong on 15-1-14.
 * Sound管理类
 */
var SoundManager = (function (_super) {
    __extends(SoundManager, _super);
    /**
     * 构造函数
     */
    function SoundManager() {
        var _this = _super.call(this) || this;
        _this.bgOn = true;
        _this.effectOn = true;
        _this.bgVolume = 0.5;
        _this.effectVolume = 0.5;
        _this.bg = new SoundBg();
        _this.bg.setVolume(_this.bgVolume);
        _this.effect = new SoundEffects();
        _this.effect.setVolume(_this.effectVolume);
        return _this;
    }
    SoundManager.inst = function () {
        var _inst = _super.single.call(this);
        return _inst;
    };
    /**
     * 播放音效
     * @param effectName
     */
    SoundManager.prototype.playEffect = function (effectName) {
        if (!this.effectOn)
            return;
        this.effect.play(effectName);
    };
    /**
     * 停止音效
     */
    SoundManager.prototype.stopEffect = function () {
        if (!this.effectOn)
            return;
        this.effect.stop();
    };
    /**
     * 播放背景音乐
     * @param key
     */
    SoundManager.prototype.playBg = function (bgName) {
        this.currBg = bgName;
        if (!this.bgOn)
            return;
        this.bg.play(bgName);
    };
    /**
     * 停止背景音乐
     */
    SoundManager.prototype.stopBg = function () {
        this.bg.stop();
    };
    //点击播放
    SoundManager.prototype.touchBg = function () {
        if (egret.Capabilities.isMobile && egret.Capabilities.os == 'iOS') {
            this.bg.touchPlay();
        }
    };
    /**
     * 设置音效是否开启
     * @param $isOn
     */
    SoundManager.prototype.setEffectOn = function ($isOn) {
        this.effectOn = $isOn;
    };
    /**
     * 设置背景音乐是否开启
     * @param $isOn
     */
    SoundManager.prototype.setBgOn = function ($isOn) {
        this.bgOn = $isOn;
        if (!this.bgOn) {
            this.stopBg();
        }
        else {
            if (this.currBg) {
                this.playBg(this.currBg);
            }
        }
    };
    /**
     * 设置背景音乐音量
     * @param volume
     */
    SoundManager.prototype.setBgVolume = function (volume) {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        this.bgVolume = volume;
        this.bg.setVolume(this.bgVolume);
    };
    /**
     * 获取背景音乐音量
     * @returns {number}
     */
    SoundManager.prototype.getBgVolume = function () {
        return this.bgVolume;
    };
    /**
     * 设置音效音量
     * @param volume
     */
    SoundManager.prototype.setEffectVolume = function (volume) {
        volume = Math.min(volume, 1);
        volume = Math.max(volume, 0);
        this.effectVolume = volume;
        this.effect.setVolume(this.effectVolume);
    };
    /**
     * 获取音效音量
     * @returns {number}
     */
    SoundManager.prototype.getEffectVolume = function () {
        return this.effectVolume;
    };
    /**
     * 音乐文件清理时间
     * @type {number}
     */
    SoundManager.CLEAR_TIME = 3 * 60 * 1000;
    return SoundManager;
}(BaseClass));
__reflect(SoundManager.prototype, "SoundManager");
/**
 * 素材需要提前加载好
 * 素材命名规则：类型_数值（有类型是因为一般会同时有几种数字图片，比如大小号或不同颜色）
 * 点号素材命名：类型_dot
 * 创建BitmapNumber使用createNumPic返回DisplayObjectContainer
 * 创建好的BitmapNumber数值需要变化是调用changeNum
 * 回收使用desstroyNumPic
 *
 * Created by Saco on 2014/8/1.
 */
var BitmapNumber = (function (_super) {
    __extends(BitmapNumber, _super);
    function BitmapNumber() {
        var _this = _super.call(this) || this;
        _this._imgPool = [];
        _this._containerPool = [];
        return _this;
    }
    /*
     * 根据需要的数字和类型返回一个DisplayObjectContainer
     * num数字值，支持小数点
     * type素材类型
     * */
    BitmapNumber.prototype.createNumPic = function (num, type, offset, offsetY) {
        if (offset === void 0) { offset = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var container = this.getContainer();
        var numStr = num.toString();
        var index = 0;
        var tempBm;
        for (index; index < numStr.length; index++) {
            tempBm = this.getSingleNumPic(numStr.charAt(index), type);
            container.addChild(tempBm);
        }
        this.repositionNumPic(container, offset, offsetY);
        return container;
    };
    //回收带数字的DisplayObjectContainer
    BitmapNumber.prototype.desstroyNumPic = function (picContainer) {
        this.clearContainer(picContainer);
        if (picContainer.parent)
            picContainer.parent.removeChild(picContainer);
        this._containerPool.push(picContainer);
    };
    /*
     * 改变带数字的DisplayObjectContainer数字值
     * 提供这个方法是为了提高效率，直接更换之前创建对象的texture，避免多余的删除和创建
     * */
    BitmapNumber.prototype.changeNum = function (picContainer, num, type, offset, offsetY) {
        if (offset === void 0) { offset = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var numStr = num.toString();
        if (!picContainer) {
            return;
        }
        //如果当前数字个数多于目标个数则把多余的回收
        if (picContainer.numChildren > numStr.length) {
            while (picContainer.numChildren > numStr.length) {
                this.recycleBM(picContainer.getChildAt(picContainer.numChildren - 1));
            }
        }
        var index = 0;
        var tempStr;
        for (index; index < numStr.length; index++) {
            //如果当前的Bitmap数量不够则获取新的Bitmap补齐
            if (index >= picContainer.numChildren)
                picContainer.addChild(this.getBitmap());
            tempStr = numStr.charAt(index);
            tempStr = tempStr == "." ? "dot" : tempStr;
            picContainer.getChildAt(index).texture = this.getTexture(tempStr, type);
        }
        this.repositionNumPic(picContainer, offset, offsetY);
    };
    //每个数字宽度不一样，所以重新排列
    BitmapNumber.prototype.repositionNumPic = function (container, offset, offsetY) {
        if (offset === void 0) { offset = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var index = 0;
        var lastX = 0;
        var temp;
        for (index; index < container.numChildren; index++) {
            temp = container.getChildAt(index);
            temp.x = lastX - offset;
            // temp.y = - offsetY;
            lastX = temp.x + temp.width;
        }
    };
    //清理容器
    BitmapNumber.prototype.clearContainer = function (picContainer) {
        while (picContainer.numChildren) {
            this.recycleBM(picContainer.getChildAt(picContainer.numChildren - 1));
        }
    };
    //回收Bitmap
    BitmapNumber.prototype.recycleBM = function (bm) {
        if (bm && bm.parent) {
            bm.parent.removeChild(bm);
            bm.texture = null;
            this._imgPool.push(bm);
        }
    };
    BitmapNumber.prototype.getContainer = function () {
        if (this._containerPool.length)
            return this._containerPool.shift();
        return new egret.DisplayObjectContainer();
    };
    //获得单个数字Bitmap
    BitmapNumber.prototype.getSingleNumPic = function (num, type) {
        if (num == ".")
            num = "dot";
        var bm = this.getBitmap();
        bm.texture = this.getTexture(num, type);
        return bm;
    };
    BitmapNumber.prototype.getTexture = function (num, type) {
        return RES.getRes(type + num + "_png");
    };
    BitmapNumber.prototype.getBitmap = function () {
        if (this._imgPool.length)
            return this._imgPool.shift();
        return new egret.Bitmap();
    };
    return BitmapNumber;
}(BaseClass));
__reflect(BitmapNumber.prototype, "BitmapNumber");
/**
 *  动画类
 * @author
 */
var MovieClip = (function (_super) {
    __extends(MovieClip, _super);
    function MovieClip() {
        var _this = _super.call(this) || this;
        /**倍率 ,越大越快*/
        _this.rate = 1;
        _this.pixelHitTest = false;
        _this._mcFactory = new egret.MovieClipDataFactory();
        return _this;
    }
    MovieClip.prototype.playFile = function (name, playCount, compFun, remove, framesLabel, _loadFun, frameRate) {
        var _this = this;
        if (playCount === void 0) { playCount = 1; }
        if (compFun === void 0) { compFun = null; }
        if (remove === void 0) { remove = true; }
        if (framesLabel === void 0) { framesLabel = ""; }
        if (name.indexOf("chargeff1") != -1 || name.indexOf("forceguildeff") != -1 || name.indexOf("qianghua") != -1 ||
            name.indexOf("forgeSuccess") != -1 || name.indexOf("neigongbaozhaeff") != -1 || name.indexOf("piaodongqipaohuang") != -1) {
            return;
        }
        this.time = egret.getTimer();
        this._compFun = compFun;
        this._loadFun = _loadFun;
        this.playCount = playCount;
        this.remove = remove;
        TimerManager.inst().remove(this.playComp, this);
        if (this.texture && this.texture.bitmapData == null) {
            //资源已经被释放掉
        }
        else if (this.name == name) {
            this.createBody(framesLabel, frameRate);
            return;
        }
        this.name = name;
        if (this.texture) {
            MovieClip.removeDisplayObject(this, this.texture.bitmapData);
        }
        this.jsonData = null;
        this.texture = null;
        RES.getResByUrl(this.name + ".json", function (data, url) {
            if (_this.name + ".json" != url || !data)
                return;
            _this.jsonData = data;
            _this.createBody(framesLabel, frameRate);
        }, this, RES.ResourceItem.TYPE_JSON);
        RES.getResByUrl(this.name + ".png", function (data, url) {
            if (_this.name + ".png" != url || !data)
                return;
            _this.texture = data;
            if (_this.stage) {
                MovieClip.addDisplayObject(_this, _this.texture.bitmapData);
            }
            _this.createBody(framesLabel, frameRate);
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    /**
     * @private
     * 显示对象添加到舞台
     */
    MovieClip.prototype.$onAddToStage = function (stage, nestLevel) {
        _super.prototype.$onAddToStage.call(this, stage, nestLevel);
        if (this.texture) {
            MovieClip.addDisplayObject(this, this.texture.bitmapData);
        }
    };
    /**
     * @private
     * 显示对象从舞台移除
     */
    MovieClip.prototype.$onRemoveFromStage = function () {
        _super.prototype.$onRemoveFromStage.call(this);
        if (this.texture) {
            MovieClip.removeDisplayObject(this, this.texture.bitmapData);
        }
    };
    /**
     * 创建主体动画
     */
    MovieClip.prototype.createBody = function (framesLaebl, frameRate) {
        if (framesLaebl === void 0) { framesLaebl = ""; }
        if (!this.jsonData || !this.texture)
            return;
        this._mcFactory.clearCache();
        this._mcFactory.mcDataSet = this.jsonData;
        this._mcFactory.texture = this.texture;
        var temp = this.name.split("/");
        var tempName = temp.pop();
        this.movieClipData = this._mcFactory.generateMovieClipData(tempName);
        if (!(this.name in MovieClip.originalRate)) {
            MovieClip.originalRate[this.name] = this.movieClipData.frameRate;
        }
        this.frameRate = frameRate ? frameRate : (MovieClip.originalRate[this.name] * this.rate) >> 0;
        //从第一帧开始自动播放
        try {
            this.gotoAndPlay(framesLaebl ? framesLaebl : 1, this.playCount);
        }
        catch (error) {
            console.warn("错误动画文件:", this.name);
        }
        // this.visible = true;
        if (this.playCount > 0) {
            var tempTime = egret.getTimer() - this.time;
            tempTime = this.playTime * this.playCount - tempTime;
            if (tempTime > 0)
                TimerManager.inst().doTimer(tempTime, 1, this.playComp, this);
            else
                this.playComp();
        }
        if (this._loadFun) {
            this._loadFun();
        }
        //抛出内容已经改变事件
        this.dispatchEventWith(egret.Event.CHANGE);
    };
    /**
     * 自动播放次数完成处理
     * @param e
     */
    MovieClip.prototype.playComp = function () {
        if (this.stage && this._compFun)
            this._compFun();
        if (this.remove)
            DisplayUtils.removeFromParent(this);
    };
    Object.defineProperty(MovieClip.prototype, "playTime", {
        /** 播放总时长(毫秒) */
        get: function () {
            if (!this.movieClipData)
                return 0;
            return 1 / this.frameRate * this.totalFrames * 1000;
        },
        enumerable: true,
        configurable: true
    });
    MovieClip.prototype.clearComFun = function () {
        this._compFun = null;
    };
    //释放
    MovieClip.prototype.dispose = function () {
        this.stop();
        this.resetMovieClip();
        this.clearComFun();
        TimerManager.inst().removeAll(this);
    };
    //回收
    MovieClip.prototype.destroy = function () {
        DisplayUtils.removeFromParent(this);
        this.dispose();
    };
    MovieClip.prototype.resetMovieClip = function () {
        var mc = this;
        mc.rotation = 0;
        mc.scaleX = 1;
        mc.scaleY = 1;
        mc.alpha = 1;
        mc.anchorOffsetX = 0;
        mc.anchorOffsetY = 0;
        mc.x = 0;
        mc.y = 0;
        mc.rate = 1;
        mc.$renderNode.cleanBeforeRender();
        mc._mcFactory.clearCache();
        mc._mcFactory.mcDataSet = null;
        mc._mcFactory.texture = null;
        mc.name = null;
        mc.jsonData = null;
        mc.filters = null;
        var bitmapData = mc.texture;
        if (bitmapData) {
            MovieClip.removeDisplayObject(mc, bitmapData.bitmapData);
        }
        mc.texture = null;
        mc.remove = false;
        egret.Tween.removeTweens(mc);
    };
    MovieClip.addDisplayObject = function (displayObject, bitmapData) {
        if (!bitmapData)
            return;
        var hashCode = bitmapData.hashCode;
        if (!MovieClip.displayList[hashCode]) {
            MovieClip.displayList[hashCode] = [displayObject];
            return;
        }
        var tempList = MovieClip.displayList[hashCode];
        if (tempList.indexOf(displayObject) < 0) {
            tempList.push(displayObject);
        }
    };
    MovieClip.removeDisplayObject = function (displayObject, bitmapData) {
        if (!bitmapData)
            return;
        var hashCode = bitmapData.hashCode;
        if (!MovieClip.displayList[hashCode]) {
            return;
        }
        var tempList = MovieClip.displayList[hashCode];
        var index = tempList.indexOf(displayObject);
        if (index >= 0) {
            tempList.splice(index, 1);
        }
        if (tempList.length == 0) {
            delete MovieClip.displayList[hashCode];
        }
    };
    /** 原始帧频 */
    MovieClip.originalRate = {};
    MovieClip.displayList = egret.createMap();
    return MovieClip;
}(egret.MovieClip));
__reflect(MovieClip.prototype, "MovieClip");
var SoldierEntity = (function (_super) {
    __extends(SoldierEntity, _super);
    function SoldierEntity() {
        var _this = _super.call(this) || this;
        //移动速度 s为单位 。 v*t = d 
        _this.curState = ActionState.STAND;
        _this.ObjectPoolKey = "SoldierEntity";
        _this.general = false;
        _this.camp = 1;
        //克制攻击力
        _this.restriceAtk = 0;
        _this.atkFrame = 6;
        _this.battleState = false;
        _this.isReleaseSkill = false;
        /**当前boss 的技能播放状态 */
        _this.playState = false;
        _this.isInAtk = false;
        return _this;
    }
    ;
    SoldierEntity.prototype.initialize = function () {
    };
    SoldierEntity.prototype.setSoldierData = function (camp, res, attr) {
        this._camp = camp;
        this.camp = camp;
        this.soldierAttr = attr;
        this.scaleX = this.scaleY = 0.7;
        this.scale = 0.7;
        if (this._camp == -1 && (!this.general)) {
            if (this._res != "s_monster_6" && this._res != "s_monster_5") {
                this.scaleX = this.scaleY = 0.6;
                this.scale = 0.6;
            }
            else {
                this.scaleX = this.scaleY = 0.9;
                this.scale = 0.9;
            }
        }
        if (this.camp == 1) {
            if (res != "monster_8") {
                this.scaleX = this.scaleY = 0.5;
                this.scale = 0.5;
            }
        }
        // if(res == "shanzei"){
        // 	this.scaleX = this.scaleY = 0.8;
        // }
        // if(this.general){
        // 	//当前是将领 基础属性增加
        // 	this.soldierAttr.hp = this.soldierAttr.hp;
        // 	this.soldierAttr.atk = this.soldierAttr.atk;
        // }
        // if(this._typeId == SoldierType.QI && !this.general){
        // 	this.scaleX = this.scaleY = 0.5;
        // }
        // if(_state == 2){
        // 	//打bioss
        // 	this.scaleX = this.scaleY = 1;
        // }
        this.hp = this.thp = this.soldierAttr.hp;
        var index = ((Math.random() * 100) >> 0) > 50 ? 1 : -1;
        this.soldierAttr.atkDis += ((Math.random() * 10) >> 0) * index;
        // this.w = this.soldierAttr.w;
        // this.h = this.soldierAttr.h;
        this._direc = this._camp == 1 ? 1 : -1;
        if (camp == 1) {
            this._res = "" + SKILL + res;
        }
        else {
            this._res = "" + MONSTER + res;
        }
        // if(_state == 2){
        // 	//打boss
        // 	this._res = `${EFFECT}${res}`
        // }
        this._mc = new MovieClip();
        // let scale:number = 0.7
        // if(id == SoldierType.SOLDIER_QI){
        // 	scale = 0.5;
        // }
        // let scale = id == SoldierType.SOLDIER_QI?0.5:0.7;
        // if(id ==-1){scale =1}
        // this.scaleX = this._mc.scaleY = scale;
        // if(id != -1){
        // 	this.scaleX *=this._direc;
        // }
        this.addChild(this._mc);
        this._mc.playFile(this._res, -1, null, false, this.curState);
        this.progressGroup = new eui.Group();
        this.progressGroup.anchorOffsetX = 40;
        this.progressGroup.width = 80;
        // this.progressGroup.scaleX = this.progressGroup.scaleY = 0.6;
        this.addChild(this.progressGroup);
        // this.progressGroup.x = -40;
        this.progressGroup.horizontalCenter = 0;
        this.progressGroup.y = -130;
        if (this.camp == 1) {
            // this.progressGroup.x = 0;
        }
        // let hpBg:eui.Image = new eui.Image();
        // hpBg.source = "hp_progress_bg_png";
        // this.progressGroup.addChild(hpBg);
        // if(this.general){
        // 	this.progressGroup.y =-150;
        // 	this.progressGroup.x = -10;
        // }else{
        // 	this.progressGroup.visible = false;
        // }
        // if(this.general){
        // let nametxt:eui.Label = new eui.Label;
        // this.progressGroup.addChild(nametxt);
        // nametxt.textColor = this.camp == 1?0xf7f7f7:0xfc3434;
        // nametxt.fontFamily = "yt";
        // nametxt.size = 12;
        // nametxt.text = this.attrCfg.name;
        // nametxt.left = 70;
        // nametxt.top = 6;
        // let levelLab:eui.Label = new eui.Label();
        // this.progressGroup.addChild(levelLab);
        // levelLab.fontFamily = "yt";
        // levelLab.size = 20;
        // levelLab.text = this.soldierAttr.level .toString()+"级";
        // levelLab.horizontalCenter = 0;
        // levelLab.top = -23;
        // }
        var barRes = camp == 1 ? 0x00ff00 : 0xfc3434;
        var barimg = new egret.Shape();
        barimg.anchorOffsetX = 40;
        barimg.graphics.beginFill(barRes, 1);
        barimg.graphics.drawRect(0, 0, 80, 10);
        barimg.graphics.endFill();
        this._barimg = barimg;
        this.progressGroup.addChild(barimg);
        if (this.general) {
            this.progressGroup.y = -200;
        }
        if (this._camp == -1 && this.general) {
            var title = new eui.Image();
            var index_1 = (Math.random() * 21 + 1) >> 0;
            title.source = "title_" + index_1 + "_png";
            title.scaleX = title.scaleY = 1;
            this.progressGroup.addChild(title);
            title.anchorOffsetX = title.width >> 1;
            title.anchorOffsetY = title.height;
            title.y = -20;
        }
        // this.soldierCampImg = new eui.Image();
        // this.progressGroup.addChild(this.soldierCampImg);
        // this.soldierCampImg.source = `type_${this._typeId}_png`;
        // this.soldierCampImg.left = 40;
        // this.soldierCampImg.top = 3;
        //测试代码
        // if(camp != 1 && this.general){
        // 	this.progressGroup.x = 0;
        // }
        //------
        this._watcher = eui.Binding.bindHandler(this, ["_hp"], this.onHpChange, this);
    };
    SoldierEntity.prototype.onHpChange = function (value) {
        if (!isNaN(value)) {
            var percent = value / this._thp;
            if (this._barimg) {
                this._barimg.graphics.clear();
                var barRes = this.camp == 1 ? 0x00ff00 : 0xfc3434;
                this._barimg.graphics.beginFill(barRes, 1);
                this._barimg.graphics.drawRect(0, 0, percent * 80, 10);
                this._barimg.graphics.endFill();
            }
        }
    };
    // private playCount:number = 1;
    /**执行攻击动作 */
    SoldierEntity.prototype.execAtkAction = function () {
        // if(GameApp.battleState == false){return}
        if (this.isInAtkDis() && !this.battleState) {
            if (this.curState != ActionState.ATTACK) {
                this.curState = ActionState.ATTACK;
                egret.Tween.removeTweens(this);
                this.battleState = true;
                var time = 900;
                if (this.camp == 1) {
                    if (this.soldierAttr.atkspd && this.soldierAttr.atkspd > 6) {
                        time = time >> 1;
                        this.atkFrame = 24;
                        // this.playCount = 2;
                    }
                }
                if (this._atkTar && !this._atkTar.isDead) {
                    var angle = Math.atan2(this._atkTar.y - this.y, this._atkTar.x - this.x) * 180 / Math.PI;
                    this.calculEntityDic(angle);
                }
                this._mc.playFile(this._res, 1, null, false, this.curState, null, this.atkFrame);
                if (this.soldierAttr.id == 4) {
                    var timeout_1 = setTimeout(function () {
                        clearTimeout(timeout_1);
                        if (self_1 && self_1._mc) {
                            var skillMc = new MovieClip();
                            skillMc.scaleX = skillMc.scaleY = 0.8;
                            skillMc.playFile(SKILL_EFF + "skill_fs", 1, null, true);
                            self_1.addChild(skillMc);
                            skillMc.x = self_1._mc.x;
                            skillMc.y = self_1._mc.y;
                            if (self_1.scaleX == -1) {
                                skillMc.scaleX = -0.8;
                            }
                        }
                    }, 600);
                }
                // if(this._typeId == SoldierType.ARROW){
                // 	this.createArrow();
                // }
                //当前实体执行攻击动作 目标实体血量值减少
                var self_1 = this;
                var timeout_2 = setTimeout(function () {
                    self_1.battleState = false;
                    clearTimeout(timeout_2);
                    if (self_1 && self_1._mc) {
                        self_1.curState = ActionState.STAND;
                        self_1._mc.playFile(self_1._res, -1, null, false, self_1.curState);
                    }
                    if (self_1 && self_1._atkTar) {
                        var index = (Math.random() * 15 + 5) >> 0;
                        var direct = ((Math.random() * 100) >> 0) >= 50 ? -1 : 1;
                        var atk = self_1.soldierAttr.atk - self_1.restriceAtk + direct * index;
                        // if(GameApp.curBattleLevel == 1 && self.camp == -1){
                        // 	atk = 30;
                        // }
                        self_1._atkTar.reduceHp(atk);
                        var hurtMc = new MovieClip();
                        hurtMc.playFile(SKILL_EFF + "hurt", 1, null, true);
                        self_1.parent.addChild(hurtMc);
                        hurtMc.x = self_1._atkTar.x;
                        hurtMc.y = self_1._atkTar.y;
                    }
                    else {
                        if (self_1._camp == -1 && self_1.x >= StageUtils.inst().getWidth() - 200) {
                            //直接攻击国王塔
                            MessageManager.inst().dispatch(CustomEvt.REDUCE_HP, { hp: self_1.soldierAttr.atk, camp: self_1.camp });
                            // if(self.soldierAttr.atktype == 2){
                            // 	let effectmc:MovieClip = new MovieClip();
                            // 	self.parent.addChild(effectmc);
                            // 	effectmc.playFile(`${EFFECT}skill/boom`,1,null,true);
                            // 	effectmc.x = self.x;
                            // 	effectmc.y = self.y - self.soldierAttr.atkDis;
                            // }
                        }
                    }
                }, time);
            }
        }
    };
    SoldierEntity.prototype.createArrow = function () {
        var img = new eui.Image();
        img.source = "arrow_png";
        this.parent.addChild(img);
        img.anchorOffsetX = 20;
        img.scaleX = -this.camp;
        var angle = Math.atan2(this.atkTar.y - this.y, this.atkTar.x - this.x) * 180 / Math.PI;
        img.rotation = angle;
        img.x = this.x;
        img.y = this.y - (this.h >> 1);
        egret.Tween.get(img).to({ x: this._atkTar.x, y: this._atkTar.y }, 400).call(function () {
            egret.Tween.removeTweens(img);
            img.parent.removeChild(img);
        }, this);
    };
    /**等待移动状态 */
    SoldierEntity.prototype.waitMoveAction = function () {
        this.battleState = false;
        if (this.curState != ActionState.RUN) {
            this.curState = ActionState.RUN;
            this._mc.playFile(this._res, -1, null, false, this.curState);
        }
        egret.Tween.removeTweens(this);
    };
    /**执行y轴一个身位的移动 */
    SoldierEntity.prototype.execYmoveAction = function (dis) {
        egret.Tween.removeTweens(this);
        if (this.curState != ActionState.RUN) {
            this.curState = ActionState.RUN;
            this._mc.playFile(this._res, -1, null, false, this.curState);
        }
        egret.Tween.get(this).to({ y: dis }, 600).call(function () {
            // egret.Tween.removeTweens(this);
        });
    };
    /**执行前往目标附近位置 */
    SoldierEntity.prototype.execMoveAction = function (xy, cb, thisarg, isquick) {
        var _this = this;
        if (isquick === void 0) { isquick = true; }
        this.battleState = false;
        if (xy) {
            var angle = Math.atan2(xy.y - this.y, xy.x - this.x) * 180 / Math.PI;
            this.calculEntityDic(angle);
            if (this.curState != ActionState.RUN) {
                this.curState = ActionState.RUN;
                this._mc.playFile(this._res, -1, null, false, this.curState);
            }
            var startP = new egret.Point(this.x, this.y);
            var endP = new egret.Point(xy.x, xy.y);
            var distance = Math.sqrt(Math.pow(startP.x - endP.x, 2) + Math.pow(startP.y - endP.y, 2));
            var time = distance / this.soldierAttr.spd;
            // let useTime:number = time*1000;
            // if(!this.general && isquick){
            // 	useTime = time*500;
            // }
            egret.Tween.removeTweens(this);
            egret.Tween.get(this, { loop: false, onChange: function () {
                    _this.judgeIfInView();
                }, onChangeObj: this }).to({ x: xy.x, y: xy.y }, time * 1000).call(function () {
                egret.Tween.removeTweens(_this);
                _this.curState = ActionState.STAND;
                if (_this._mc) {
                    _this._mc.playFile(_this._res, -1, null, false, _this.curState);
                }
                if (cb && thisarg) {
                    cb.call(thisarg);
                }
            });
        }
        else {
            if (this && this._atkTar && !this._atkTar.isDead) {
                var angle = Math.atan2(this._atkTar.y - this.y, this._atkTar.x - this.x) * 180 / Math.PI;
                this.calculEntityDic(angle);
                if (this.curState != ActionState.RUN) {
                    this.curState = ActionState.RUN;
                    if (this._mc) {
                        this._mc.playFile(this._res, -1, null, false, this.curState);
                    }
                }
                var startP = new egret.Point(this.x, this.y);
                var endP = new egret.Point(this._atkTar.x, this._atkTar.y);
                var distance = Math.sqrt(Math.pow(startP.x - endP.x, 2) + Math.pow(startP.y - endP.y, 2));
                egret.Tween.removeTweens(this);
                var time = distance / this.soldierAttr.spd;
                egret.Tween.get(this, { loop: false, onChange: function () {
                        _this.judgeIfInView();
                        if (_this.isInAtkDis()) {
                            egret.Tween.removeTweens(_this);
                        }
                    }, onChangeObj: this }).to({ x: this._atkTar.x, y: this._atkTar.y }, time * 1000).call(function () {
                    egret.Tween.removeTweens(_this);
                });
            }
        }
    };
    /**判断是否进入了页面中固定的位置 */
    SoldierEntity.prototype.judgeIfInView = function () {
        if (this._camp == 1 || this.isReleaseSkill || (!this.general)) {
            return;
        }
        var posx = 100 + ((Math.random() * 100) >> 0);
        if (this.x >= posx) {
            this.isReleaseSkill = true;
            this.playAtkAction(4);
            MessageManager.inst().dispatch(CustomEvt.BOSS_RELEASESKILL, { xy: { x: this.x, y: this.y } });
            return true;
        }
        return false;
    };
    /**执行站立状态 */
    SoldierEntity.prototype.execStandAction = function () {
        this.battleState = false;
        this.curState = ActionState.STAND;
        this._mc.playFile(this._res, -1, null, false, this.curState);
    };
    /**执行站立状态 */
    SoldierEntity.prototype.playAtkAction = function (framnum) {
        egret.Tween.removeTweens(this);
        this.curState = ActionState.ATTACK;
        this._mc.playFile(this._res, -1, null, false, this.curState, null, framnum);
        var releaseMc = new MovieClip();
        if (this && this.parent) {
            this.parent.addChild(releaseMc);
            releaseMc.playFile(EFFECT + "release", 3);
            releaseMc.x = this.x;
            releaseMc.y = this.y - 50;
            this.playState = true;
            var self_2 = this;
            var timeout_3 = setTimeout(function () {
                clearTimeout(timeout_3);
                self_2.playState = false;
            }, 1500);
        }
    };
    /**执行一次攻击动作 */
    SoldierEntity.prototype.execOneTimeAtk = function (cb, arg, i) {
        this.curState = ActionState.ATTACK;
        this._mc.playFile(this._res, 1, null, false, this.curState, null);
        var self = this;
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            self.curState = ActionState.STAND;
            self._mc.playFile(self._res, 1, null, false, self.curState, null);
            cb.call(arg, i);
        }, 600);
    };
    /**获取到目标位置的距离 是否达到攻击距离 */
    SoldierEntity.prototype.isInAtkDis = function () {
        if (this && this._atkTar && !this._atkTar.isDead) {
            var startP = new egret.Point(this.x, this.y);
            var endP = new egret.Point(this._atkTar.x, this._atkTar.y);
            var distance = Math.sqrt(Math.pow(endP.x - startP.x, 2) + Math.pow(endP.y - startP.y, 2));
            return Math.abs(distance) <= this.soldierAttr.atkDis;
        }
        return this.isInAtk;
    };
    /**锁定目标 */
    SoldierEntity.prototype.lookAt = function (_atkTar, isNew) {
        if (isNew === void 0) { isNew = false; }
        // this.addAttrRestrict();
        if (isNew) {
            this._atkTar = _atkTar;
            return;
        }
        if (!this._atkTar || (this._atkTar && this._atkTar._isDead)) {
            //重新锁定目标
            this._atkTar = _atkTar;
        }
        else {
            return;
        }
    };
    /**解锁目标 */
    SoldierEntity.prototype.unlookAt = function () {
        this._atkTar = null;
    };
    Object.defineProperty(SoldierEntity.prototype, "isDead", {
        get: function () {
            return this._isDead;
        },
        enumerable: true,
        configurable: true
    });
    SoldierEntity.prototype.dispose = function () {
        // ObjectPool.push(this);
        // this.curState = ActionState.DEAD;
        // this._mc.playFile(this._res,1,null,true,this.curState);
        // if(this._watcher){
        // 	this._watcher.unwatch();
        // }
        var self = this;
        // let timeout = setTimeout(function() {
        // 	clearTimeout(timeout)
        // 	self._atkTar = null;
        // 	if(self && self._mc){
        // 		self.removeChild(self._mc);
        // 		self._mc = null;
        // 	}
        // 	if(self && self.parent){
        // 		self.parent.removeChild(self);
        // 	}
        // }, 600);
        if (this._camp == -1) {
            var goldEff = new MovieClip();
            goldEff.playFile(EFFECT + "gold", 1, null, true);
            this.parent.addChild(goldEff);
            goldEff.x = this.x;
            goldEff.y = this.y;
            GameApp.inst().gold += ((Math.random() * 4 + 2) >> 0);
        }
        self._atkTar = null;
        if (self && self._mc) {
            self.removeChild(self._mc);
            self._mc = null;
        }
        if (self && self.parent) {
            self.parent.removeChild(self);
        }
    };
    Object.defineProperty(SoldierEntity.prototype, "hp", {
        // private addAttrRestrict():void{
        // 	if(!this._atkTar){return}
        // 	if(this._typeId == SoldierType.ARROW){
        // 		//当前我是弓箭手 克制盾 被克制骑兵
        // 		if(this._atkTar._typeId == SoldierType.QI){
        // 			this.restriceAtk = 50;
        // 		}else if(this._atkTar._typeId == SoldierType.SHIELD){
        // 			this.restriceAtk = -50;
        // 		}else{
        // 			this.restriceAtk = 0;
        // 		}
        // 	}else if(this._typeId == SoldierType.QI){
        // 		//当前我是骑兵
        // 		if(this._atkTar._typeId == SoldierType.ARROW){
        // 			this.restriceAtk = -50;
        // 		}else if(this._atkTar._typeId == SoldierType.SHIELD){
        // 			this.restriceAtk = 50;
        // 		}else{
        // 			this.restriceAtk = 0;
        // 		}
        // 	}else if(this._typeId == SoldierType.SHIELD){
        // 		if(this._atkTar._typeId == SoldierType.ARROW){
        // 			this.restriceAtk = 50;
        // 		}else if(this._atkTar._typeId == SoldierType.QI){
        // 			this.restriceAtk = -50;
        // 		}else{
        // 			this.restriceAtk = 0;
        // 		}
        // 	}
        // }
        set: function (value) {
            this._hp = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoldierEntity.prototype, "thp", {
        set: function (value) {
            this._thp = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoldierEntity.prototype, "atkTar", {
        get: function () {
            return this._atkTar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoldierEntity.prototype, "buffAtk", {
        set: function (value) {
            this.buffAttack = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoldierEntity.prototype, "buffHP", {
        set: function (value) {
            this.buffHp = value;
        },
        enumerable: true,
        configurable: true
    });
    return SoldierEntity;
}(BaseEntity));
__reflect(SoldierEntity.prototype, "SoldierEntity");
var SoldierShapeEntity = (function (_super) {
    __extends(SoldierShapeEntity, _super);
    function SoldierShapeEntity() {
        return _super.call(this) || this;
    }
    SoldierShapeEntity.inst = function () {
        var _inst = _super.single.call(this);
        return _inst;
    };
    SoldierShapeEntity.prototype.initData = function (shape, res, id, parent, xy, cb, thisArg) {
        this._shapeType = shape;
        if (shape == SoldierShapType.TYPE_CIRCLE) {
            xy.y += 80;
        }
        // else if(shape == SoldierShapType.TYPE_ARROW){
        // 	xy.y += 40;
        // }
        this.w = this.h = 60;
        this._res = res;
        this._id = id;
        this._parent = parent;
        this._baseXY = xy;
        this._cb = cb;
        this._arg = thisArg;
        this.arr = [];
        this.onCreateShape();
    };
    SoldierShapeEntity.prototype.onCreateShape = function () {
        switch (this._shapeType) {
            // case SoldierShapType.TYPE_ARROW:
            // 	this.createArrow();
            // 	if(this._cb && this._arg){
            // 		this._cb.call(this._arg,this.arr)
            // 	}
            // 	break;
            case SoldierShapType.TYPE_CIRCLE:
                this.createCircle();
                if (this._cb && this._arg) {
                    this._cb.call(this._arg, this.arr);
                }
                break;
            case SoldierShapType.TYPE_CROSS:
                this.createCross();
                if (this._cb && this._arg) {
                    this._cb.call(this._arg, this.arr);
                }
                break;
            case SoldierShapType.TYPE_HALFCIRCLE:
                this.createHalfCircle();
                if (this._cb && this._arg) {
                    this._cb.call(this._arg, this.arr);
                }
                break;
            // case SoldierShapType.TYPE_LINGXING:
            // this.createLingxing();
            // break;
            case SoldierShapType.TYPE_RECT:
                this.createRect();
                if (this._cb && this._arg) {
                    this._cb.call(this._arg, this.arr);
                }
                break;
            case SoldierShapType.TYPE_TIXING:
                this.createTiXing();
                if (this._cb && this._arg) {
                    this._cb.call(this._arg, this.arr);
                }
                break;
            case SoldierShapType.TYPE_TRIANGLE:
                this.createTriangle(5, 0, 0, -100);
                if (this._cb && this._arg) {
                    this._cb.call(this._arg, this.arr);
                }
                break;
        }
    };
    /**创建方阵 */
    SoldierShapeEntity.prototype.createRect = function (rotation, _rows, _cols, offx, offy) {
        if (offx === void 0) { offx = 0; }
        if (offy === void 0) { offy = 0; }
        var row = 4;
        var col = 4;
        if (_rows) {
            row = _rows;
        }
        if (_cols) {
            col = _cols;
        }
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                var sp = this.createShape();
                this._parent.addChild(sp);
                this.arr.push(sp);
                sp.x = j * (this.w + 10) + offx + this._baseXY.x;
                sp.y = i * (this.h + 10) + offy + this._baseXY.y;
                if (rotation) {
                    sp.rotation = rotation;
                }
            }
        }
    };
    /**创建圆形阵 */
    SoldierShapeEntity.prototype.createCircle = function () {
        var radius = 200;
        var angles = [0, 45, 90, 135, 180, -45, -90, -135];
        for (var i = 0; i < 1; i++) {
            radius -= 100;
            for (var j = 0; j < angles.length; j++) {
                var x = Math.cos(angles[j] * Math.PI / 180) * radius;
                var y = Math.sin(angles[j] * Math.PI / 180) * radius;
                var sp = this.createShape();
                this._parent.addChild(sp);
                this.arr.push(sp);
                sp.x = x + this._baseXY.x;
                sp.y = y + this._baseXY.y + 50;
            }
        }
    };
    /**创建半月形阵 */
    SoldierShapeEntity.prototype.createHalfCircle = function () {
        var radius = 200;
        var angles = [-90, -45, 0, 45, 90];
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < angles.length; j++) {
                var x = Math.cos(angles[j] * Math.PI / 180) * radius;
                var y = Math.sin(angles[j] * Math.PI / 180) * radius;
                var sp = this.createShape();
                this._parent.addChild(sp);
                this.arr.push(sp);
                sp.x = x + this._baseXY.x;
                sp.y = y + this._baseXY.y + 70;
            }
            radius -= 100;
        }
    };
    // /**创建菱形阵 */
    // private createLingxing():void{
    // 	this.createRect(-45);
    // 	this.shapCon.anchorOffsetX = this.shapCon.width>>1;
    // 	this.shapCon.anchorOffsetY = this.shapCon.height>>1;
    // 	this.shapCon.rotation = 45;
    // }
    /**
     * 三角阵
     */
    SoldierShapeEntity.prototype.createTriangle = function (firstnum, offestX, _offy, extraY) {
        if (firstnum === void 0) { firstnum = 5; }
        if (offestX === void 0) { offestX = 0; }
        if (_offy === void 0) { _offy = 0; }
        if (extraY === void 0) { extraY = 0; }
        var firstColNum = firstnum;
        var offestY = 0;
        for (var i = 0; i < (firstnum - 1); i++) {
            firstColNum -= 1; //实际上第一列有6个
            offestY += 40;
            for (var j = 1; j <= firstColNum; j++) {
                var sp = this.createShape();
                this._parent.addChild(sp);
                this.arr.push(sp);
                sp.y = j * (this.h + 10) + offestY - _offy + this._baseXY.y + extraY;
                sp.x = i * (this.w + 10) + offestX + this._baseXY.x;
            }
        }
    };
    /**梯形阵 */
    SoldierShapeEntity.prototype.createTiXing = function () {
        var firstColNum = 6;
        var offestY = 0;
        for (var i = 0; i < 6; i++) {
            firstColNum -= 1; //实际上第一列有6个
            if (firstColNum <= 2) {
                break;
            }
            offestY += 30;
            for (var j = 1; j <= firstColNum; j++) {
                var sp = this.createShape();
                this._parent.addChild(sp);
                this.arr.push(sp);
                sp.y = j * (this.h + 10) + offestY + this._baseXY.y - 130;
                sp.x = i * (this.w + 10) + this._baseXY.x;
            }
        }
    };
    /**创建箭头形状 */
    SoldierShapeEntity.prototype.createArrow = function () {
        this.createRect(null, 2, 3);
        this.createTriangle(4, 3 * (60 + 10), 160);
    };
    /**创建加号形状 */
    SoldierShapeEntity.prototype.createCross = function () {
        this.createRect(null, 3, 4);
        // this.createRect(null,2,3,200);
        // this.createRect(null,3,2,60,-75);
        // this.createRect(null,3,2,60,50);
    };
    //测试 。创建shape
    SoldierShapeEntity.prototype.createShape = function () {
        var sp = new SoldierEntity();
        var cardVo = GlobalFun.getCardDataFromId(this._id);
        sp.setSoldierData(-1, this._res, cardVo);
        // sp.setSoldierData(1,)
        // sp.graphics.beginFill(0xff0000);
        // sp.graphics.drawRect(0,0,15,15);
        // sp.graphics.endFill();
        return sp;
    };
    return SoldierShapeEntity;
}(BaseClass));
__reflect(SoldierShapeEntity.prototype, "SoldierShapeEntity");
/**
 * 自定义数据类型 以及枚举
 */
var ActionState = (function () {
    function ActionState() {
    }
    ActionState.RUN = "run";
    ActionState.ATTACK = "attack";
    ActionState.DEAD = 'dead';
    ActionState.STAND = "stand";
    ActionState.HIT = "hit";
    return ActionState;
}());
__reflect(ActionState.prototype, "ActionState");
var SoldierShapType;
(function (SoldierShapType) {
    SoldierShapType[SoldierShapType["TYPE_RECT"] = 0] = "TYPE_RECT";
    SoldierShapType[SoldierShapType["TYPE_CIRCLE"] = 1] = "TYPE_CIRCLE";
    SoldierShapType[SoldierShapType["TYPE_HALFCIRCLE"] = 2] = "TYPE_HALFCIRCLE";
    // TYPE_LINGXING,
    SoldierShapType[SoldierShapType["TYPE_TRIANGLE"] = 3] = "TYPE_TRIANGLE";
    SoldierShapType[SoldierShapType["TYPE_TIXING"] = 4] = "TYPE_TIXING";
    // TYPE_ARROW,
    SoldierShapType[SoldierShapType["TYPE_CROSS"] = 5] = "TYPE_CROSS";
})(SoldierShapType || (SoldierShapType = {}));
var LocalStorageEnum = (function () {
    function LocalStorageEnum() {
    }
    /**first enter */
    LocalStorageEnum.ENTER_FIRST = "enter_first";
    /**是否已经过了新手引导 */
    LocalStorageEnum.IS_PASS_GUIDE = "is_pass_guide";
    /**当前关卡 */
    LocalStorageEnum.LEVEL = "level";
    /**当天宝箱领取次数 */
    LocalStorageEnum.BOX_REWARD_GET = "box_reward_get";
    /**当前宝箱的时间戳 */
    LocalStorageEnum.BOX_REWARD_TIMESPAN = 'box_reward_timespan';
    /**宝箱刷新时间戳 */
    LocalStorageEnum.BOX_REFRESH_TIMESPAN = "box_refresh_timespan";
    /**人物货币数 */
    LocalStorageEnum.ROLE_GOLD = "role_gold";
    /**人物宝石数量 */
    LocalStorageEnum.ROLE_GEM = "role_gem";
    /**当前技能等级 */
    LocalStorageEnum.SKILL_LEVEL = "skill_level";
    /**当前技能召唤 转生id */
    LocalStorageEnum.REBORNIDS = "rebornIds";
    /**转生人物配置 */
    LocalStorageEnum.REBORNCFG = "rebornCfg";
    return LocalStorageEnum;
}());
__reflect(LocalStorageEnum.prototype, "LocalStorageEnum");
var RES_RESOURCE = "resource/";
var EFFECT = "resource/res/animate/";
var SKILL = EFFECT + "skill103/";
var MONSTER = "resource/res/animate/monster/";
var MAP_DIR = RES_RESOURCE + "map/";
var CFG_DIR = RES_RESOURCE + "config/";
var DEFAULT_FONT = RES_RESOURCE + "res/font/yt.ttf";
var RES_AUDIO = "resource/res/audio/";
var SKILL_EFF = EFFECT + "skill/";
var CustomEvt = (function (_super) {
    __extends(CustomEvt, _super);
    function CustomEvt(type, data, bubbles, cancelable) {
        if (data === void 0) { data = null; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this._data = data;
        return _this;
    }
    Object.defineProperty(CustomEvt.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    /**游戏loading完成 */
    CustomEvt.GAMELOADINGEND = 'gameLoadingEnd';
    CustomEvt.REDUCE_HP = 'reducehp';
    /**boss释放技能 */
    CustomEvt.BOSS_RELEASESKILL = "boos_releaseskill";
    /**转生成功 */
    CustomEvt.REBORNSUCCESS = "rebornsuccess";
    /**取消技能cd暂停 */
    CustomEvt.CANCLESKILLCDPAUSE = "cancleskillcdpause";
    return CustomEvt;
}(egret.Event));
__reflect(CustomEvt.prototype, "CustomEvt");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.inst = function () {
        if (!this._instance) {
            this._instance = new LoadingUI();
        }
        return this._instance;
    };
    LoadingUI.prototype.hide = function () {
        if (this.parent) {
            this.visible = false;
            this.parent.removeChild(this);
        }
    };
    LoadingUI.prototype.createView = function () {
        var self = this;
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            self.visible = true;
        }, 300);
        var rect = new eui.Rect();
        this.addChild(rect);
        rect.alpha = 0.3;
        rect.left = 0;
        rect.right = 0;
        rect.top = 0;
        rect.bottom = 0;
        this.progressPanel = new eui.Group();
        this.addChild(this.progressPanel);
        this._w = (StageUtils.inst().getWidth() - 200);
        this.progressPanel.horizontalCenter = 0;
        this.progressPanel.verticalCenter = 0;
        this.progressBg = new eui.Image();
        this.progressBg.source = "progress_bg_png";
        this.progressPanel.addChild(this.progressBg);
        this.progressBg.horizontalCenter = 0;
        this.progressBg.verticalCenter = 0;
        this.progressBar = new eui.Image();
        this.progressBar.source = "progress_bar_png";
        this.progressBar.horizontalCenter = 0;
        this.progressBar.verticalCenter = 0;
        this.progressPanel.addChild(this.progressBar);
        this.progressMask = new eui.Rect();
        this.progressMask.height = 110;
        this.progressMask.width = 104;
        this.progressPanel.addChild(this.progressMask);
        this.progressMask.x = (276 >> 1) - (this.progressMask.width >> 1);
        this.progressMask.bottom = (276 >> 1) - (110 >> 1);
        // this.progressMask.height = 0
        // this.progressMask.horizontalCenter = 0;
        // this.progressMask.verticalCenter = 0;
        this.progressBar.mask = this.progressMask;
        this.textField = new eui.Label();
        this.progressPanel.addChild(this.textField);
        this.textField.fontFamily = "yt";
        this.textField.size = 20;
        this.textField.bottom = 0;
        this.textField.horizontalCenter = 0;
        this.percentTxt = new eui.Label();
        this.progressPanel.addChild(this.percentTxt);
        this.percentTxt.fontFamily = "yt";
        this.percentTxt.size = 20;
        this.percentTxt.verticalCenter = 0;
        this.percentTxt.horizontalCenter = 0;
        var circle = new MovieClip();
        this.addChild(circle);
        circle.playFile(EFFECT + "circle", -1);
        circle.x = StageUtils.inst().getWidth() >> 1;
        circle.y = StageUtils.inst().getHeight() >> 1;
        circle.scaleX = circle.scaleY = 3;
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        var h = (current / total) * 110;
        if (h <= 0) {
            h = 0;
        }
        ;
        this.percentTxt.text = ((current / total * 100) >> 0) + "%";
        // this.textField.text = `加载中...`;
        this.progressMask.height = h;
    };
    return LoadingUI;
}(eui.UILayer));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
var VJEvent = (function (_super) {
    __extends(VJEvent, _super);
    function VJEvent(type, bubbles, data, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (data === void 0) { data = null; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.data = data;
        return _this;
    }
    VJEvent.VJ_START = "vj_start";
    VJEvent.VJ_END = "vj_end";
    VJEvent.VJ_MOVE = 'vj_move';
    return VJEvent;
}(egret.Event));
__reflect(VJEvent.prototype, "VJEvent");
var IBaseEuiView = (function () {
    function IBaseEuiView() {
    }
    return IBaseEuiView;
}());
__reflect(IBaseEuiView.prototype, "IBaseEuiView");
var DelayOptManager = (function (_super) {
    __extends(DelayOptManager, _super);
    function DelayOptManager() {
        var _this = _super.call(this) || this;
        //每帧运算逻辑的时间阈值，执行代码超过这个时间就跳过到下一帧继续执行，根据实际情况调整，因为每一帧除了这里的逻辑还有别的逻辑要做对吧
        _this.TIME_THRESHOLD = 2;
        _this._delayOpts = [];
        egret.startTick(_this.runCachedFun, _this);
        return _this;
    }
    DelayOptManager.inst = function () {
        var _inst = _super.single.call(this);
        return _inst;
    };
    DelayOptManager.prototype.addDelayOptFunction = function (thisObj, fun, funPara, callBack, para) {
        this._delayOpts.push({ "fun": fun, "funPara": funPara, "thisObj": thisObj, "callBack": callBack, "para": para });
    };
    DelayOptManager.prototype.clear = function () {
        this._delayOpts.length = 0;
    };
    // public stop(): void {
    // 	TimerManager.ins().remove(this.runCachedFun, this);
    // }
    DelayOptManager.prototype.runCachedFun = function (time) {
        if (this._delayOpts.length == 0) {
            return false;
        }
        var timeFlag = egret.getTimer();
        var funObj;
        while (this._delayOpts.length) {
            funObj = this._delayOpts.shift();
            if (funObj.funPara)
                funObj.fun.call(funObj.thisObj, funObj.funPara);
            else
                funObj.fun.call(funObj.thisObj);
            if (funObj.callBack) {
                if (funObj.para != undefined)
                    funObj.callBack.call(funObj.thisObj, funObj.para);
                else
                    funObj.callBack();
            }
            if (egret.getTimer() - timeFlag > this.TIME_THRESHOLD)
                break;
        }
        return false;
    };
    return DelayOptManager;
}(BaseClass));
__reflect(DelayOptManager.prototype, "DelayOptManager");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        StageUtils.init();
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            // egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            // egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        if (egret.Capabilities.runtimeType == egret.RuntimeType.RUNTIME2) {
            egret.TextField.default_fontFamily = "" + DEFAULT_FONT;
        }
        this.runGame().catch(function (e) {
            console.log(e);
        });
        window["payCallBack"] = GlobalFun.payCallBack;
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 2:
                        result = _a.sent();
                        this.startAnimation(result);
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "http://localhost:8080/resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        this.stage.addChild(LoadingUI.inst());
                        return [4 /*yield*/, RES.loadGroup("preload", 0, LoadingUI.inst())];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        eui.Button.prototype["autoSize"] = eui.Image.prototype["autoSize"] = eui.Rect.prototype["autoSize"] = eui.Group.prototype["autoSize"] = function () {
            var precentw = StageUtils.inst().getWidth() / 1136;
            var precenth = StageUtils.inst().getHeight() / 640;
            this.scaleX = this.scaleY = precentw;
            this.x *= precentw;
            this.y *= precenth;
        };
        eui.Rect.prototype["changeSize"] = function () {
            var precentw = StageUtils.inst().getWidth() / 1136;
            var precenth = StageUtils.inst().getHeight() / 640;
            this.width *= precentw;
            this.height *= precenth;
            this.x *= precentw;
            this.y *= precenth;
        };
        // egret.localStorage.clear();
        //获取平台参数;
        var platform_param = GlobalFun.getOption("pf");
        if (!platform) {
            GameConfig.platform.setting = "ios";
        }
        else {
            GameConfig.platform.setting = platform_param;
        }
        GameApp.inst().refreshTimespan();
        LayerManager.inst().iniaizlize(this);
        GameApp.inst().load();
        // let data = RES.getRes("config_zip");
        // JSZip.loadAsync(data).then((zipdata) => {
        //     return zipdata.file('config.json').async('text');
        // }).then(text => {
        //     GlobalConfig.setData(JSON.parse(text));
        //     GameApp.inst().load();
        // })
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
var MessageManager = (function (_super) {
    __extends(MessageManager, _super);
    function MessageManager() {
        return _super.call(this) || this;
    }
    MessageManager.inst = function () {
        var _inst = this.single();
        return _inst;
    };
    /**
     * 发送自定义事件 CustomEvt 中注册
     */
    MessageManager.prototype.dispatch = function (event, param) {
        var customEvent = new CustomEvt(event, param);
        StageUtils.inst().getStage().dispatchEvent(customEvent);
    };
    /**注册事件 */
    MessageManager.prototype.addListener = function (event, _cb, _arg) {
        StageUtils.inst().getStage().addEventListener(event, _cb, _arg);
    };
    /**移除事件 */
    MessageManager.prototype.removeListener = function (event, _cb, _arg) {
        StageUtils.inst().getStage().removeEventListener(event, _cb, _arg);
    };
    return MessageManager;
}(BaseClass));
__reflect(MessageManager.prototype, "MessageManager");
/**
 * Created by yangsong on 2014/11/23.
 * Timer管理器
 */
var TimerManager = (function (_super) {
    __extends(TimerManager, _super);
    /**
     * 构造函数
     */
    function TimerManager() {
        var _this = _super.call(this) || this;
        _this.currHandler = null;
        _this._handlers = [];
        _this.nexthandles = null;
        _this._currTime = egret.getTimer();
        _this._currFrame = 0;
        egret.startTick(_this.onEnterFrame, _this);
        return _this;
    }
    TimerManager.inst = function () {
        var _inst = _super.single.call(this);
        return _inst;
    };
    TimerManager.prototype.getFrameId = function () {
        return this._currFrame;
    };
    TimerManager.prototype.getCurrTime = function () {
        return this._currTime;
    };
    // 从大到小排序
    TimerManager.binFunc = function (b1, b2) {
        if (b1.exeTime > b2.exeTime)
            return -1;
        else if (b1.exeTime < b2.exeTime)
            return 1;
        else
            return 0;
    };
    TimerManager.DeleteHandle = function (handler) {
        handler.clear();
    };
    /**
     * 每帧执行函数
     * @param frameTime
     */
    TimerManager.prototype.onEnterFrame = function (time) {
        this._currFrame++;
        this._currTime = egret.getTimer();
        var currTime = 0;
        // process the nextlist first
        var nexthandles = this.nexthandles;
        this.nexthandles = null;
        if (nexthandles && nexthandles.length > 0) {
            for (var _i = 0, nexthandles_1 = nexthandles; _i < nexthandles_1.length; _i++) {
                var handler_1 = nexthandles_1[_i];
                handler_1.method.call(handler_1.methodObj);
                TimerManager.DeleteHandle(handler_1);
            }
            nexthandles = null;
        }
        if (this._handlers.length <= 0)
            return false;
        var handler = this._handlers[this._handlers.length - 1];
        while (handler.exeTime <= this._currTime) {
            this.currHandler = handler = this._handlers.pop();
            handler.method.call(handler.methodObj);
            currTime = egret.getTimer();
            handler.exeTime = currTime + handler.delay;
            var repeat = handler.forever;
            if (!repeat) {
                if (handler.repeatCount > 1) {
                    handler.repeatCount--;
                    repeat = true;
                }
                else {
                    if (handler.onFinish) {
                        handler.onFinish.apply(handler.finishObj);
                    }
                }
            }
            if (repeat) {
                var index = Algorithm.binSearch(this._handlers, handler, TimerManager.binFunc);
                this._handlers.splice(index, 0, handler);
            }
            else {
                TimerManager.DeleteHandle(handler);
            }
            if (currTime - this._currTime > 5)
                break;
            if (this._handlers.length <= 0)
                break;
            else
                handler = this._handlers[this._handlers.length - 1];
        }
        this.currHandler = null;
        return false;
    };
    TimerManager.prototype.create = function (startTime, delay, repeat, method, methodObj, onFinish, fobj) {
        if (delay < 0 || repeat < 0 || method == null) {
            return;
        }
        var handler = new TimerHandler();
        handler.forever = repeat == 0;
        handler.repeatCount = repeat;
        handler.delay = delay;
        handler.method = method;
        handler.methodObj = methodObj;
        handler.onFinish = onFinish;
        handler.finishObj = fobj;
        handler.exeTime = startTime + this._currTime;
        // this._handlers.push(handler);
        var index = Algorithm.binSearch(this._handlers, handler, TimerManager.binFunc);
        this._handlers.splice(index, 0, handler);
    };
    /**
     *
     * 定时执行
     * @param delay 执行间隔:毫秒
     * @param repeat 执行次数, 0为无限次
     * @param method 执行函数
     * @param methodObj 执行函数所属对象
     * @param onFinish 完成执行函数
     * @param fobj 完成执行函数所属对象
     * @param remove 是否删除已经存在的
     *
     */
    TimerManager.prototype.doTimer = function (delay, repeat, method, methodObj, onFinish, fobj) {
        if (onFinish === void 0) { onFinish = null; }
        if (fobj === void 0) { fobj = null; }
        this.create(delay, delay, repeat, method, methodObj, onFinish, fobj);
    };
    /**
     *
     * 定时执行
     * @param startTime 延迟多久第一次执行
     * @param delay 执行间隔:毫秒
     * @param repeat 执行次数, 0为无限次
     * @param method 执行函数
     * @param methodObj 执行函数所属对象
     * @param onFinish 完成执行函数
     * @param fobj 完成执行函数所属对象
     * @param remove 是否删除已经存在的
     *
     */
    TimerManager.prototype.doTimerDelay = function (startTime, delay, repeat, method, methodObj, onFinish, fobj) {
        if (onFinish === void 0) { onFinish = null; }
        if (fobj === void 0) { fobj = null; }
        this.create(startTime, delay, repeat, method, methodObj, onFinish, fobj);
    };
    // 下一帧执行，且只执行一次
    TimerManager.prototype.doNext = function (method, methodObj) {
        var handler = new TimerHandler();
        handler.method = method;
        handler.methodObj = methodObj;
        if (!this.nexthandles)
            this.nexthandles = [];
        this.nexthandles.push(handler);
    };
    /**
     * 清理
     * @param method 要移除的函数
     * @param methodObj 要移除的函数对应的对象
     */
    TimerManager.prototype.remove = function (method, methodObj) {
        var currHandler = this.currHandler;
        if (currHandler && currHandler.method == method &&
            currHandler.methodObj == methodObj) {
            currHandler.forever = false;
            currHandler.repeatCount = 0;
        }
        for (var i = this._handlers.length - 1; i >= 0; i--) {
            var handler = this._handlers[i];
            if (handler.method == method && handler.methodObj == methodObj) {
                this._handlers.splice(i, 1);
                TimerManager.DeleteHandle(handler);
            }
        }
    };
    /**
     * 清理
     * @param methodObj 要移除的函数对应的对象
     */
    TimerManager.prototype.removeAll = function (methodObj) {
        var currHandler = this.currHandler;
        if (currHandler && currHandler.methodObj == methodObj) {
            currHandler.forever = false;
            currHandler.repeatCount = 0;
        }
        for (var i = this._handlers.length - 1; i >= 0; i--) {
            var handler = this._handlers[i];
            if (handler.methodObj == methodObj) {
                this._handlers.splice(i, 1);
                TimerManager.DeleteHandle(handler);
            }
        }
    };
    /**
     * 检测是否已经存在
     * @param method
     * @param methodObj
     *
     */
    TimerManager.prototype.isExists = function (method, methodObj) {
        for (var _i = 0, _a = this._handlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            if (handler.method == method && handler.methodObj == methodObj) {
                return true;
            }
        }
        return false;
    };
    return TimerManager;
}(BaseClass));
__reflect(TimerManager.prototype, "TimerManager");
var TimerHandler = (function () {
    function TimerHandler() {
        /**执行间隔*/
        this.delay = 0;
        /**是否重复执行*/
        this.forever = false;
        /**重复执行次数*/
        this.repeatCount = 0;
        /**执行时间*/
        this.exeTime = 0;
    }
    /**清理*/
    TimerHandler.prototype.clear = function () {
        this.method = null;
        this.methodObj = null;
        this.onFinish = null;
        this.finishObj = null;
        this.forever = false;
    };
    return TimerHandler;
}());
__reflect(TimerHandler.prototype, "TimerHandler");
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
var GameLoadingUI = (function (_super) {
    __extends(GameLoadingUI, _super);
    function GameLoadingUI() {
        var _this = _super.call(this) || this;
        _this.total = 100;
        _this.cur = 0;
        return _this;
    }
    /**
     * 面板开启执行函数，用于子类继承
     * @param param 参数
     */
    GameLoadingUI.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.proBar.mask = this.barMask;
        this.progressLab.text = "0%请稍候...";
        var time = setInterval(function () {
            _this.cur += 5;
            if (_this.cur >= _this.total) {
                _this.cur = _this.total;
                clearInterval(time);
                if (param && param[0]) {
                    if (param[0].cb && param[0].arg) {
                        param[0].cb.call(param[0].arg);
                    }
                    if (param[0].param) {
                        _this._param = param[0].param;
                    }
                    if (param[0].cls) {
                        ViewManager.inst().open(param[0].cls, [_this._param]);
                    }
                    if (param[0].closeCls) {
                        ViewManager.inst().close(param[0].closeCls);
                    }
                }
                StageUtils.inst().getStage().dispatchEvent(new StartGameEvent(StartGameEvent.GAMELOADINGEND));
                ViewManager.inst().close(GameLoadingUI);
            }
            var percent = ((_this.cur / _this.total) * 100) >> 0;
            _this.progressLab.text = percent + "%请稍候...";
            _this.barMask.height = ((_this.cur / _this.total) * 206);
        }, 100);
        // this.leftImg.x = 0;
        // this.rightImg.x = StageUtils.inst().getWidth();
        // let cls:BaseEuiView = (param && param.length)?param[0].cls:null;
        // if(param && param.length){
        //     if(param[0].cb){
        //         this._cb = param[0].cb
        //     }
        //     if(param[0].arg){
        //         this._arg = param[0].arg
        //     }
        //     if(param[0].param){
        //         this._param = param[0].param;
        //     }
        //     if(param[0].closeCls){
        //         this._closeCls = param[0].closeCls
        //     }
        // }
        // this.loadAni(cls)
        // if(param[0] && param[0].route == "home"){
        // }else{
        //     this.loadAni(`${MAP_HOME}`,SceneEnum.HOME)
        // }
    };
    // private loadAni(cls:BaseEuiView):void{
    //     // RES.getResByUrl(`${str}map.json`, (data) => {
    //         // GameMap.curMap = curScene;
    //         let leftTween = egret.Tween.get(this.leftImg);
    //         let rightTween =  egret.Tween.get(this.rightImg);
    //         // //地图网格初始化
    //         // GameMap.init(data);
    //         leftTween.to({x:(StageUtils.inst().getWidth()>>1)+2},500,egret.Ease.circIn).wait(1500).to({x:-20},1000,egret.Ease.circOut).call(()=>{
    //             egret.Tween.removeTweens(leftTween);
    //         },this);
    //         rightTween.to({x:(StageUtils.inst().getWidth()>>1)-2},500,egret.Ease.circIn).call(()=>{
    //             GlobalFun.shakeObj(this,0.5,15,15);
    //             if(this._cb && this._arg){
    //                 this._cb.call(this._arg);
    //             }
    //             if(cls){
    //                 ViewManager.inst().open(cls,[this._param]);
    //             }
    //             if(this._closeCls){
    //                 ViewManager.inst().close(this._closeCls);
    //             }
    //         },this).wait(1500).to({x:(StageUtils.inst().getWidth()+20)},1000,egret.Ease.circOut).call(()=>{
    //             egret.Tween.removeTweens(leftTween);
    //             ViewManager.inst().close(GameLoadingUI);
    //         });
    //     // }, this);
    // }
    /**
     * 面板关闭执行函数，用于子类继承
     * @param param 参数
     */
    GameLoadingUI.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    return GameLoadingUI;
}(BaseEuiView));
__reflect(GameLoadingUI.prototype, "GameLoadingUI");
ViewManager.inst().reg(GameLoadingUI, LayerManager.UI_Pop);
/**
 * MapView
 */
var MapViewBg = (function (_super) {
    __extends(MapViewBg, _super);
    // private oldImgs = {};
    function MapViewBg() {
        var _this = _super.call(this) || this;
        _this._shape = new egret.Shape;
        _this.lastUpdateX = 0;
        _this.lastUpdateY = 0;
        _this.turn = 0;
        //this.cacheAsBitmap = true;
        _this.touchChildren = false;
        _this.touchEnabled = false;
        _this._imageList = [];
        _this.showImages = [];
        _this._poolImages = [];
        _this._fileDic = {};
        _this.updateHDMap(MAP_DIR + "/");
        return _this;
    }
    MapViewBg.prototype.clearHDMap = function () {
        this._imageList = [];
        this.showImages = [];
        this.removeChildren();
    };
    MapViewBg.prototype.getImage = function () {
        return this._poolImages.pop() || new eui.Image();
    };
    MapViewBg.prototype.updateHDMap = function (str) {
        this.clear();
        var imgSize = 256;
        this.maxImagX = Math.ceil(GameMap.MAX_WIDTH / imgSize);
        this.maxImagY = Math.ceil(GameMap.MAX_HEIGHT / imgSize);
        var shows = [];
        for (var i = 0; i < this.maxImagX; i++) {
            for (var j = 0; j < this.maxImagY; j++) {
                var sourceName = "" + str + i + "_" + j + ".jpg";
                var s = this.getImage();
                s.source = sourceName;
                s.name = sourceName;
                s.x = i * imgSize;
                s.y = j * imgSize;
                this.addChild(s);
            }
        }
    };
    MapViewBg.prototype.clear = function () {
        this.clearHDMap();
    };
    return MapViewBg;
}(egret.DisplayObjectContainer));
__reflect(MapViewBg.prototype, "MapViewBg");
/**
 * Created by zhangac on 2016/11/23.
 */
var Algorithm = (function () {
    function Algorithm() {
    }
    Algorithm.sortAsc = function (b1, b2) {
        if (b1 < b2)
            return -1;
        else if (b1 > b2)
            return 1;
        else
            return 0;
    };
    /**
 * 根据obj1 obj2的attr属性排序
 * 不传attr的时候直接根据obj1，obj2比较大小
 * @param obj1
 * @param obj2
 * @param attr
 */
    Algorithm.sortAscAttr = function (obj1, obj2, attr) {
        var result;
        if (attr == undefined) {
            result = Algorithm.sortAsc(obj1, obj2);
        }
        else {
            var attr1 = obj1[attr];
            var attr2 = obj2[attr];
            if (attr1 < attr2) {
                result = -1;
            }
            else if (attr1 > attr2) {
                result = 1;
            }
            else {
                result = 0;
            }
        }
        return result;
    };
    Algorithm.sortDesc = function (b1, b2) {
        if (b1 > b2)
            return -1;
        else if (b1 < b2)
            return 1;
        else
            return 0;
    };
    /**
     * 根据obj1 obj2的attr属性排序
     * 不传attr的时候直接根据obj1，obj2比较大小
     * @param obj1
     * @param obj2
     * @param attr
     */
    Algorithm.sortDescAttr = function (obj1, obj2, attr) {
        var result;
        if (attr == undefined) {
            result = Algorithm.sortDesc(obj1, obj2);
        }
        else {
            var attr1 = obj1[attr];
            var attr2 = obj2[attr];
            if (attr1 > attr2) {
                result = -1;
            }
            else if (attr1 < attr2) {
                result = 1;
            }
            else {
                result = 0;
            }
        }
        return result;
    };
    //二分查找
    //tab 要检索的表
    // item 要搜索的玩意儿
    // binFunc 用于比较的函数，当纯数字tab时该参数可以为空，默认检索到的位置是最后的插入位置
    Algorithm.binSearch = function (tab, item, binFunc) {
        if (binFunc === void 0) { binFunc = null; }
        if (!tab || tab.length == 0)
            return 0;
        if (!binFunc)
            binFunc = Algorithm.sortAsc;
        var low = 0;
        var high = tab.length - 1;
        while (low <= high) {
            var mid = (high + low) >> 1;
            var val = tab[mid];
            if (binFunc(val, item) <= 0) {
                low = mid + 1;
            }
            else {
                high = mid - 1;
            }
        }
        return low;
    };
    Algorithm.test = function () {
        var arr = [];
        var MAX = 10;
        for (var i = 0; i < MAX; i++) {
            var r = Math.floor(Math.random() * 100000);
            var index = Algorithm.binSearch(arr, r);
            arr.splice(index, 0, r);
        }
        if (arr.length != MAX)
            debug.log("test fail!count is " + arr.length + ", except:" + MAX);
        for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
            var val = arr_2[_i];
            debug.log(val);
        }
        for (var i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                debug.log("test fail!index:" + i);
                break;
            }
        }
    };
    return Algorithm;
}());
__reflect(Algorithm.prototype, "Algorithm");
/**
 * Created by yangsong on 15-8-19.
 * 平均数工具类
 */
var AverageUtils = (function () {
    /**
     * 构造函数
     * @param $maxNum 参与计算的最大值
     */
    function AverageUtils($maxNum) {
        if ($maxNum === void 0) { $maxNum = 10; }
        this.nums = [];
        this.numsLen = 0;
        this.numSum = 0;
        this.maxNum = $maxNum;
    }
    /**
     * 加入一个值
     * @param value
     */
    AverageUtils.prototype.push = function (value) {
        if (this.numsLen > this.maxNum) {
            this.numsLen--;
            this.numSum -= this.nums.shift();
        }
        this.nums.push(value);
        this.numSum += value;
        this.numsLen++;
    };
    /**
     * 获取平均值
     * @returns {number}
     */
    AverageUtils.prototype.getValue = function () {
        return this.numSum / this.numsLen;
    };
    /**
     * 清空
     */
    AverageUtils.prototype.clear = function () {
        this.nums.splice(0);
        this.numsLen = 0;
        this.numSum = 0;
    };
    return AverageUtils;
}());
__reflect(AverageUtils.prototype, "AverageUtils");
//因为PHP那边返回的信息压缩后，egret没有提供解压字节码的工具，
//所以PHP那边需要把返回信息做base64Encode处理，所以返回的数据需要解码先  base64decode
var Base64 = (function () {
    function Base64() {
    }
    Base64.base64encode = function (str) {
        var out, i, len;
        var c1, c2, c3;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += this.base64EncodeChars.charAt(c1 >> 2);
                out += this.base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += this.base64EncodeChars.charAt(c1 >> 2);
                out += this.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += this.base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += this.base64EncodeChars.charAt(c1 >> 2);
            out += this.base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += this.base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += this.base64EncodeChars.charAt(c3 & 0x3F);
        }
        return out;
    };
    Base64.base64decode = function (str) {
        var c1, c2, c3, c4;
        var i, len, out;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            /* c1 */
            do {
                c1 = this.base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c1 == -1);
            if (c1 == -1)
                break;
            /* c2 */
            do {
                c2 = this.base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c2 == -1);
            if (c2 == -1)
                break;
            out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
            /* c3 */
            do {
                c3 = str.charCodeAt(i++) & 0xff;
                if (c3 == 61)
                    return out;
                c3 = this.base64DecodeChars[c3];
            } while (i < len && c3 == -1);
            if (c3 == -1)
                break;
            out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
            /* c4 */
            do {
                c4 = str.charCodeAt(i++) & 0xff;
                if (c4 == 61)
                    return out;
                c4 = this.base64DecodeChars[c4];
            } while (i < len && c4 == -1);
            if (c4 == -1)
                break;
            out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
        }
        return out;
    };
    Base64.base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    Base64.base64DecodeChars = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
        52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
        -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
        -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];
    return Base64;
}());
__reflect(Base64.prototype, "Base64");
/**
 * 颜色相关处理工具
 */
var ColorUtil = (function () {
    function ColorUtil() {
    }
    // public static 
    /**
     * 合并颜色值
     */
    ColorUtil.mergeARGB = function ($a, $r, $g, $b) {
        return ($a << 24) | ($r << 16) | ($g << 8) | $b;
    };
    /**
     * 获取单个通道的颜色值
     * @param $argb 颜色值
     * @param $channel 要获取的颜色通道常量
     */
    ColorUtil.getChannel = function ($argb, $channel) {
        switch ($channel) {
            case this.ALPHA:
                return ($argb >> 24) & 0xff;
            case this.RED:
                return ($argb >> 16) & 0xff;
            case this.GREEN:
                return ($argb >> 8) & 0xff;
            case this.BLUE:
                return $argb & 0xff;
        }
        return 0;
    };
    /**
     * 颜色值表示法转换number转String
     * @param $number 需要转换的number值
     * @param $prefix 字符串前缀
     */
    ColorUtil.numberToString = function ($number, $prefix) {
        if ($prefix === void 0) { $prefix = "#"; }
        return $prefix + $number.toString(16);
    };
    ColorUtil.ALPHA = 0xf3311e00;
    ColorUtil.RED = 0xf3311e;
    ColorUtil.GREEN = 0x35e62d;
    ColorUtil.BLUE = 0x0000FF;
    ColorUtil.NORMAL_COLOR = 0xD1C28F;
    ColorUtil.RED_COLOR_N = 0xF3311E;
    ColorUtil.GREEN_COLOR_N = 0x35E62D;
    ColorUtil.GRAY_COLOR2 = 0x838383;
    ColorUtil.WHITE_COLOR2 = 0xD1C28F;
    ColorUtil.WHITE_COLOR = "#D1C28F";
    ColorUtil.RED_COLOR = "#F3311E";
    ColorUtil.GREEN_COLOR = "#35E62D";
    ColorUtil.GRAY_COLOR = "#8B898B";
    ColorUtil.COLOR_STR = ["white", "green", "purple", "orange", "red", "golden"];
    ColorUtil.ROLENAME_COLOR_YELLOW = 0xFFCE0B;
    ColorUtil.ROLENAME_COLOR_GREEN = 0x35E62D;
    ColorUtil.ROLENAME_COLOR_NORMAL = 0x35E62D;
    ColorUtil.JUEWEI_COLOR = [
        "#e2dfd4",
        "#35e62d",
        "#81adff",
        "#e27dff",
        "#ff9649",
        "#fc5959",
        "#ffd93f",
        "#ffff00"
    ];
    return ColorUtil;
}());
__reflect(ColorUtil.prototype, "ColorUtil");
var DateStyle = (function (_super) {
    __extends(DateStyle, _super);
    function DateStyle(format, from, to, isFormatNum) {
        var _this = _super.call(this) || this;
        /**格式 */
        _this.format = [];
        /** 起始精确度*/
        _this.from = 0;
        /**结束精确度 */
        _this.to = 0;
        /**是否补齐0 */
        _this.isFormatNum = false;
        _this.format = format;
        _this.from = from;
        _this.to = to;
        _this.isFormatNum = isFormatNum;
        return _this;
    }
    return DateStyle;
}(BaseClass));
__reflect(DateStyle.prototype, "DateStyle");
/**
 * Created by yangsong on 2014/11/22.
 * Date工具类
 */
var DateUtils = (function () {
    function DateUtils() {
    }
    /**
     * 获取时间格式化的字符串
     * @second 秒
     * @style 格式化风格, 例如 :DateUtils.STYLE_1
     *  */
    DateUtils.getFormatTimeByStyle = function (second, style) {
        if (style === void 0) { style = DateUtils.STYLE_1; }
        if (second < 0) {
            second = 0;
            debug.log("输入参数有误!时间为负数:" + second);
        }
        if (style.from > style.to) {
            debug.log("输入参数有误!to参数必须大于等于from参数,请检查style参数的值");
            return "";
        }
        second = second >> 0;
        var result = "";
        for (var i = style.to; i >= style.from; i--) {
            var time = second / this.mul[i]; //总共
            var timeStr = "";
            if (i != style.to)
                time = time % this.mod[i]; //剩余
            if (style.isFormatNum && time < 10)
                timeStr = "0" + (time >> 0).toString(); //补0
            else
                timeStr = (time >> 0).toString();
            result += (timeStr + style.format[i]);
        }
        return result;
    };
    /**
     * 获取时间格式化的字符串
     * @ms 毫秒
     * @style 格式化风格, 例如 :DateUtils.STYLE_1
     *  */
    DateUtils.getFormatTimeByStyle1 = function (ms, style) {
        if (style === void 0) { style = DateUtils.STYLE_1; }
        return this.getFormatTimeByStyle(ms / this.MS_PER_SECOND);
    };
    /**
     * 把MiniDateTime转化为距离1970-01-01的毫秒数
     * @param mdt 从2010年开始算起的秒数
     * @return 从1970年开始算起的毫秒数
     */
    DateUtils.formatMiniDateTime = function (mdt) {
        return DateUtils.MINI_DATE_TIME_BASE + (mdt & 0x7FFFFFFF) * DateUtils.MS_PER_SECOND;
    };
    /**转成服务器要用的时间***/
    DateUtils.formatServerTime = function (time) {
        return (time - DateUtils.MINI_DATE_TIME_BASE) / DateUtils.MS_PER_SECOND;
    };
    /**
     * 根据秒数格式化字符串
     * @param  {number} second            秒数
     * @param  {number=1} type            时间格式类型（参考DateUtils.TIME_FORMAT_1, DateUtils.TIME_FORMAT_2...)
     * @param  {showLength}    showLength    显示长度（一个时间单位为一个长度，且仅在type为DateUtils.TIME_FORMAT_5的情况下有效）
     * @returns string
     */
    DateUtils.getFormatBySecond = function (second, type, showLength) {
        if (type === void 0) { type = 1; }
        if (showLength === void 0) { showLength = 2; }
        var str = "";
        var ms = second * 1000;
        switch (type) {
            case this.TIME_FORMAT_1:
                str = this.format_1(ms);
                break;
            case this.TIME_FORMAT_2:
                str = this.format_2(ms);
                break;
            case this.TIME_FORMAT_3:
                str = this.format_3(ms);
                break;
            case this.TIME_FORMAT_4:
                str = this.format_4(ms);
                break;
            case this.TIME_FORMAT_5:
                str = this.format_5(ms, showLength);
                break;
            case this.TIME_FORMAT_6:
                str = this.format_6(ms);
                break;
            case this.TIME_FORMAT_7:
                str = this.format_7(ms);
                break;
            case this.TIME_FORMAT_8:
                str = this.format_8(ms);
                break;
            case this.TIME_FORMAT_9:
                str = this.format_9(ms);
                break;
            case this.TIME_FORMAT_10:
                str = this.format_10(ms);
                break;
            case this.TIME_FORMAT_11:
                str = this.format_11(ms);
                break;
            case this.TIME_FORMAT_12:
                str = this.format_12(ms);
                break;
            case this.TIME_FORMAT_13:
                str = this.format_13(ms);
                break;
            case this.TIME_FORMAT_14:
                str = this.format_14(ms);
                break;
            case this.TIME_FORMAT_15:
                str = this.format_15(ms);
                break;
        }
        return str;
    };
    /**
     * 获取到指定日期00：00的秒数
     * **/
    DateUtils.getRenainSecond = function (ms) {
        var tmpDate = ms ? new Date(ms) : new Date();
        //tmpDate.setDate(tmpDate.getDate()+1);
        var ptime = (DateUtils.getTodayZeroSecond(tmpDate) + 60 * 60 * 24) - tmpDate.getTime() / 1000;
        // debug.log("ptime = " + ptime);
        return ptime.toFixed(0);
    };
    /**
     * 今天已过去的秒数
     * **/
    DateUtils.getTodayPassedSecond = function () {
        var tmpDate = new Date();
        var tdyPassTime = ((Date.now() - (new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate()).getTime())) / 1000).toFixed(0);
        return parseInt(tdyPassTime);
    };
    /**
     * 获取指定日期00:00时刻的秒数
     * @parma 毫秒
     * @returns {number}
     */
    DateUtils.getTodayZeroSecond = function (tdate) {
        var tmpDate = tdate ? tdate : new Date();
        return parseInt(((new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate()).getTime()) / 1000).toFixed(0));
    };
    /**
     * 获取本周第一天
     * **/
    DateUtils.showWeekFirstDay = function () {
        var Nowdate = new Date();
        var day = Nowdate.getDay();
        day = day ? day : 7;
        var WeekFirstDay = new Date(Nowdate - (day - 1) * 86400000);
        // var M=Number(WeekFirstDay.getMonth())+1
        // return WeekFirstDay.getYear()+"-"+M+"-"+WeekFirstDay.getDate();
        return WeekFirstDay;
    };
    /**
     * 获取本周最后一天
     * @param 毫秒差
     */
    DateUtils.showWeekLastDay = function () {
        var Nowdate = new Date();
        var WeekFirstDay = DateUtils.showWeekFirstDay();
        var WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);
        // var M=Number(WeekLastDay.getMonth())+1
        // return WeekLastDay.getYear()+"-"+M+"-"+WeekLastDay.getDate();
        return WeekLastDay;
    };
    /**
     * 求出当前时间离下周一凌晨0点还差
     * @param 毫秒差
     * **/
    DateUtils.calcWeekFirstDay = function () {
        // var lastDay = showWeekLastDay().getDay();
        // lastDay = lastDay > 0?lastDay:7;
        var Nowdate = new Date();
        var curDay = Nowdate.getDay();
        curDay = curDay > 0 ? curDay : 7;
        var difday = 7 - curDay; //用
        var hours = Nowdate.getHours();
        var minutes = Nowdate.getMinutes();
        var seconds = Nowdate.getSeconds();
        // debug.log("difday = "+difday);
        // debug.log("hours = "+hours);
        // debug.log("minutes = "+minutes);
        // debug.log("seconds = "+seconds);
        var sum = difday * 86400 * 1000 + 86400 * 1000 - (hours * 3600 * 1000 + minutes * 60 * 1000 + seconds * 1000);
        return new Date(sum);
    };
    /**
     * 格式1  00:00:00
     * @param  {number} sec 毫秒数
     * @returns string
     */
    DateUtils.format_1 = function (ms) {
        var n = 0;
        var result = "##:##:##";
        n = Math.floor(ms / DateUtils.MS_PER_HOUR);
        result = result.replace("##", DateUtils.formatTimeNum(n));
        if (n)
            ms -= n * DateUtils.MS_PER_HOUR;
        n = Math.floor(ms / DateUtils.MS_PER_MINUTE);
        result = result.replace("##", DateUtils.formatTimeNum(n));
        if (n)
            ms -= n * DateUtils.MS_PER_MINUTE;
        n = Math.floor(ms / 1000);
        result = result.replace("##", DateUtils.formatTimeNum(n));
        return result;
    };
    /**
     * 格式2  yyyy-mm-dd h:m:s
     * @param  {number} ms        毫秒数
     * @returns string            返回自1970年1月1号0点开始的对应的时间点
     */
    DateUtils.format_2 = function (ms) {
        var date = new Date(ms);
        var year = date.getFullYear();
        var month = date.getMonth() + 1; //返回的月份从0-11；
        var day = date.getDate();
        var hours = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return year + "-" + month + "-" + day + " " + hours + ":" + minute + ":" + second;
    };
    /**
     * 格式3  00:00
     * @param  {number} ms        毫秒数
     * @returns string            分:秒
     */
    DateUtils.format_3 = function (ms) {
        var str = this.format_1(ms);
        var strArr = str.split(":");
        return strArr[1] + ":" + strArr[2];
    };
    /**
     * 格式4  xx天前，xx小时前，xx分钟前
     * @param  {number} ms        毫秒
     * @returns string
     */
    DateUtils.format_4 = function (ms) {
        if (ms < this.MS_PER_HOUR) {
            return Math.floor(ms / this.MS_PER_MINUTE) + "分钟前";
        }
        else if (ms < this.MS_PER_DAY) {
            return Math.floor(ms / this.MS_PER_HOUR) + "小时前";
        }
        else {
            return Math.floor(ms / this.MS_PER_DAY) + "天前";
        }
    };
    /**
     * 格式5 X天X小时X分X秒
     * @param  {number} ms                毫秒
     * @param  {number=2} showLength    显示长度（一个时间单位为一个长度）
     * @returns string
     */
    DateUtils.format_5 = function (ms, showLength) {
        if (showLength === void 0) { showLength = 2; }
        var result = "";
        var unitStr = ["天", "时", "分", "秒"];
        var arr = [];
        var d = Math.floor(ms / this.MS_PER_DAY);
        arr.push(d);
        ms -= d * this.MS_PER_DAY;
        var h = Math.floor(ms / this.MS_PER_HOUR);
        arr.push(h);
        ms -= h * this.MS_PER_HOUR;
        var m = Math.floor(ms / this.MS_PER_MINUTE);
        arr.push(m);
        ms -= m * this.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        arr.push(s);
        for (var k in arr) {
            if (arr[k] > 0) {
                result += this.formatTimeNum(arr[k], Number(k)) + unitStr[k];
                showLength--;
                if (showLength <= 0)
                    break;
            }
        }
        return result;
    };
    /**
     * 格式6  h:m:s
     * @param  {number} ms        毫秒
     * @returns string            返回自1970年1月1号0点开始的对应的时间点（不包含年月日）
     */
    DateUtils.format_6 = function (ms) {
        var date = new Date(ms);
        var hours = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return this.formatTimeNum(hours) + ":" + this.formatTimeNum(minute) + ":" + this.formatTimeNum(second);
    };
    /**
     * 格式7  X天/X小时/<1小时
     * @param  {number} ms        毫秒
     * @returns string
     */
    DateUtils.format_7 = function (ms) {
        if (ms < this.MS_PER_HOUR) {
            return "<1小时";
        }
        else if (ms < this.MS_PER_DAY) {
            return Math.floor(ms / this.MS_PER_HOUR) + "小时";
        }
        else {
            return Math.floor(ms / this.MS_PER_DAY) + "天";
        }
    };
    //8:yyyy-mm-dd h:m
    DateUtils.format_8 = function (time) {
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1; //返回的月份从0-11；
        var day = date.getDate();
        var hours = date.getHours();
        var minute = date.getMinutes();
        return year + "-" + month + "-" + day + " " + hours + ":" + minute;
    };
    /**
     * 格式9  x小时x分钟x秒
     * @param  {number} ms        毫秒
     * @returns string
     */
    DateUtils.format_9 = function (ms) {
        var h = Math.floor(ms / this.MS_PER_HOUR);
        ms -= h * this.MS_PER_HOUR;
        var m = Math.floor(ms / this.MS_PER_MINUTE);
        ms -= m * this.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        return h + "小时" + m + "分钟" + s + "秒";
    };
    /**
     * 格式10  x分x秒
     * @param  {number} ms        毫秒
     * @returns string
     */
    DateUtils.format_10 = function (ms) {
        // let h: number = Math.floor(ms / this.MS_PER_HOUR);
        // ms -= h * this.MS_PER_HOUR;
        var m = Math.floor(ms / this.MS_PER_MINUTE);
        ms -= m * this.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        return m + "分" + s + "秒";
    };
    DateUtils.format_11 = function (ms) {
        var h = Math.floor(ms / this.MS_PER_HOUR);
        ms -= h * this.MS_PER_HOUR;
        var m = Math.floor(ms / this.MS_PER_MINUTE);
        ms -= m * this.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        return h + "时" + m + "分" + s + "秒";
    };
    DateUtils.format_12 = function (ms) {
        var h = Math.floor(ms / this.MS_PER_HOUR);
        ms -= h * this.MS_PER_HOUR;
        var m = Math.floor(ms / this.MS_PER_MINUTE);
        ms -= m * this.MS_PER_MINUTE;
        var s = Math.floor(ms / 1000);
        return DateUtils.formatTimeNum(h) + ":" + DateUtils.formatTimeNum(m) + ":" + DateUtils.formatTimeNum(s);
    };
    /**x月x日（周几）h:m */
    DateUtils.format_13 = function (time) {
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1; //返回的月份从0-11；
        var week = date.getDay();
        var day = date.getDate();
        var hours = date.getHours();
        var minute = date.getMinutes();
        return month + "月" + day + "日(周" + this.WEEK_CN[week] + ") " + DateUtils.formatTimeNum(hours) + ":" + DateUtils.formatTimeNum(minute);
    };
    /**时 分 */
    DateUtils.format_14 = function (time) {
        var date = new Date(time);
        var hours = date.getHours();
        var minute = date.getMinutes();
        return hours + "时" + minute + "分";
    };
    //15:yyyy-mm-dd h:m
    DateUtils.format_15 = function (time) {
        var date = new Date(time);
        var month = date.getMonth() + 1; //返回的月份从0-11；
        var day = date.getDate();
        var hours = date.getHours();
        var minute = date.getMinutes();
        return DateUtils.formatTimeNum(month) + "-" + DateUtils.formatTimeNum(day) + " " + DateUtils.formatTimeNum(hours) + ":" + DateUtils.formatTimeNum(minute);
    };
    /**
     * 格式化时间数为两位数
     * @param  {number} t 时间数
     * @returns String
     */
    DateUtils.formatTimeNum = function (t, k) {
        return t >= 10 ? t.toString() : (k == 0 ? t.toString() : "0" + t);
    };
    /**
     * 检验时间是否大于现在时间+天数
     * @param  time时间
     * @param  days天数
     * @returns String
     */
    DateUtils.checkTime = function (time, days) {
        var currentDate = new Date().getTime();
        var t = (time > (currentDate + days * this.MS_PER_DAY));
        return t;
    };
    /**
     * 格式化当前时间
     * @param  time时间
     * @returns String 2018年12月12日（周二） 12:12
     */
    DateUtils.formatFullTime = function (time) {
        var format;
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var weekDay = date.getDay();
        var hour = date.getHours();
        var hourStr;
        if (hour < 10) {
            hourStr = "0" + hour;
        }
        else {
            hourStr = hour.toString();
        }
        var min = date.getMinutes();
        var minStr;
        if (min < 10) {
            minStr = "0" + min;
        }
        else {
            minStr = min.toString();
        }
        var weekDayStr;
        switch (weekDay) {
            case 1:
                weekDayStr = "Monday";
                break;
            case 2:
                weekDayStr = "Tuesday";
                break;
            case 3:
                weekDayStr = "Wednesday";
                break;
            case 4:
                weekDayStr = "Thursday";
                break;
            case 5:
                weekDayStr = "Friday";
                break;
            case 6:
                weekDayStr = "Saturday";
                break;
            case 0:
                weekDayStr = "Sunday";
                break;
        }
        format = year + "years" + month + "month" + day + "day（" + weekDayStr + "） " + hourStr + ":" + minStr;
        return format;
    };
    /**
     *把字符串时间转换为毫秒数
     * 2018.3.14-0:0
     * */
    DateUtils.formatStrTimeToMs = function (str) {
        var date = new Date();
        var strList = str.split(".");
        date.setFullYear(strList[0]);
        date.setMonth((+strList[1]) - 1);
        var strL2 = strList[2].split("-");
        date.setDate(strL2[0]);
        var strL3 = strL2[1].split(":");
        date.setHours(strL3[0]);
        date.setMinutes(strL3[1]);
        date.setSeconds(0);
        return date.getTime();
    };
    /**时间格式1 00:00:00 */
    DateUtils.TIME_FORMAT_1 = 1;
    /**时间格式2 yyyy-mm-dd h:m:s */
    DateUtils.TIME_FORMAT_2 = 2;
    /**时间格式3 00:00 */
    DateUtils.TIME_FORMAT_3 = 3;
    /**时间格式4 xx天前/xx小时前/xx分钟前 */
    DateUtils.TIME_FORMAT_4 = 4;
    /**时间格式5 x天x小时x分x秒 */
    DateUtils.TIME_FORMAT_5 = 5;
    /**时间格式6 h:m:s */
    DateUtils.TIME_FORMAT_6 = 6;
    /**时间格式7 xx天/xx小时/<1小时 */
    DateUtils.TIME_FORMAT_7 = 7;
    /**时间格式8 yyyy-mm-dd h:m */
    DateUtils.TIME_FORMAT_8 = 8;
    /**时间格式9 x小时x分钟x秒 */
    DateUtils.TIME_FORMAT_9 = 9;
    /**时间格式10 x分x秒**/
    DateUtils.TIME_FORMAT_10 = 10;
    /**时间格式11x时x分x秒**/
    DateUtils.TIME_FORMAT_11 = 11;
    /**时间格式12 x:x:x**/
    DateUtils.TIME_FORMAT_12 = 12;
    /**时间格式13 x月x日（周几）h:m**/
    DateUtils.TIME_FORMAT_13 = 13;
    /**时间格式14 x时x分**/
    DateUtils.TIME_FORMAT_14 = 14;
    /**时间格式15 mm-dd h:m */
    DateUtils.TIME_FORMAT_15 = 15;
    /**一秒的毫秒数 */
    DateUtils.MS_PER_SECOND = 1000;
    /**一分钟的毫秒数 */
    DateUtils.MS_PER_MINUTE = 60 * 1000;
    /**一小时的毫秒数 */
    DateUtils.MS_PER_HOUR = 60 * 60 * 1000;
    /**一天的毫秒数 */
    DateUtils.MS_PER_DAY = 24 * 60 * 60 * 1000;
    DateUtils.SECOND_PER_HOUR = 3600; //一小时的秒数
    DateUtils.SECOND_PER_DAY = 86400; //一天的秒数
    DateUtils.SECOND_PER_MONTH = 2592000; //一个月(30天)的秒数
    DateUtils.SECOND_PER_YEAR = 31104000; //一年(360天)的秒数
    DateUtils.DAYS_PER_WEEK = 7; //一周的天数
    DateUtils.YEAR_PER_YEAR = 1; //每年的年数
    DateUtils.MONTH_PER_YEAR = 12; //每年的月数
    DateUtils.DAYS_PER_MONTH = 30; //每月的天数
    DateUtils.HOURS_PER_DAY = 24; //每天的小时数
    DateUtils.MUNITE_PER_HOUR = 60; //每小时的分钟数
    DateUtils.SECOND_PER_MUNITE = 60; //每分钟的秒数
    DateUtils.SECOND_PER_SECOND = 1; //每秒的秒数字
    DateUtils.SECOND_2010 = 1262275200; //1970年~2010年1月1日0时0分0秒的时间戳(单位:秒)
    /**余数 ,用来计算时间*/
    DateUtils.mod = [DateUtils.SECOND_PER_MUNITE, DateUtils.MUNITE_PER_HOUR, DateUtils.HOURS_PER_DAY, DateUtils.DAYS_PER_MONTH, DateUtils.MONTH_PER_YEAR, DateUtils.YEAR_PER_YEAR];
    /**除数 用来计算用来计算时间*/
    DateUtils.mul = [DateUtils.SECOND_PER_SECOND, DateUtils.SECOND_PER_MUNITE, DateUtils.SECOND_PER_HOUR, DateUtils.SECOND_PER_DAY, DateUtils.SECOND_PER_MONTH, DateUtils.SECOND_PER_YEAR];
    /**一周的天数 */
    /**一天的小时数 */
    /** 本游戏中使用的MiniDateTime时间的起始日期相对于flash时间(1970-01-01)的时差（毫秒） */
    DateUtils.MINI_DATE_TIME_BASE = Date.UTC(2010, 0) + new Date().getTimezoneOffset() * DateUtils.MS_PER_MINUTE;
    /**
     * 时区偏移（毫秒数）<BR>
     * 目前中国采用东八区，即比世界协调时间（UTC）/格林尼治时间（GMT）快8小时的时区 */
    DateUtils.TIME_ZONE_OFFSET = 8 * DateUtils.MS_PER_HOUR;
    /**精确度 */
    DateUtils.TO_SECOND = 0;
    DateUtils.TO_MINUTE = 1;
    DateUtils.TO_HOUR = 2;
    DateUtils.TO_DAY = 3;
    DateUtils.TO_MONTH = 4;
    DateUtils.TO_YEAR = 5;
    /** n年n月n日n时n分n秒 */
    DateUtils.FORMAT_1 = ["秒", "分", "时", "天", "月", "年"];
    /** xx:xx:xx */
    DateUtils.FORMAT_2 = [":", ":", ":", ":", ":", ":"];
    DateUtils.WEEK_CN = ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"];
    /**x小时x分x秒 */
    DateUtils.STYLE_1 = new DateStyle(DateUtils.FORMAT_1, DateUtils.TO_SECOND, DateUtils.TO_HOUR, false);
    /** x天x小时x分钟x秒 */
    DateUtils.STYLE_2 = new DateStyle(DateUtils.FORMAT_1, DateUtils.TO_SECOND, DateUtils.TO_DAY, false);
    /** 00:00:00 */
    DateUtils.STYLE_3 = new DateStyle(DateUtils.FORMAT_2, DateUtils.TO_SECOND, DateUtils.TO_HOUR, true);
    /** x分x秒 */
    DateUtils.STYLE_4 = new DateStyle(DateUtils.FORMAT_1, DateUtils.TO_SECOND, DateUtils.TO_MINUTE, true);
    return DateUtils;
}());
__reflect(DateUtils.prototype, "DateUtils");
var DebugUtils = (function () {
    function DebugUtils() {
    }
    Object.defineProperty(DebugUtils, "isDebug", {
        /**
         * 是否是调试模式
         * @returns {boolean}
         */
        get: function () {
            // return LocationProperty.gameId == 1;
            return true;
        },
        enumerable: true,
        configurable: true
    });
    DebugUtils.log = function (msg) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (DebugUtils.isDebug) {
            egret.log.apply(egret, [msg].concat(optionalParams));
        }
    };
    DebugUtils.warn = function (msg) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        if (DebugUtils.isDebug) {
            egret.warn.apply(egret, [msg].concat(optionalParams));
        }
    };
    DebugUtils.error = function (msg) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        egret.error.apply(egret, [msg].concat(optionalParams));
    };
    return DebugUtils;
}());
__reflect(DebugUtils.prototype, "DebugUtils");
var debug = {
    log: DebugUtils.log,
    warn: DebugUtils.warn,
    error: DebugUtils.error
};
/**
 * Created by yangsong on 15-1-20.
 */
var DeviceUtils = (function () {
    function DeviceUtils() {
    }
    Object.defineProperty(DeviceUtils, "IsHtml5", {
        /**
         * 当前是否Html5版本
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return egret.Capabilities.runtimeType == egret.RuntimeType.WEB;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsNative", {
        /**
         * 当前是否是Native版本
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsMobile", {
        /**
         * 是否是在手机上
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return egret.Capabilities.isMobile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsPC", {
        /**
         * 是否是在PC上
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return !egret.Capabilities.isMobile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsQQBrowser", {
        /**
         * 是否是QQ浏览器
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return this.IsHtml5 && navigator.userAgent.indexOf('MQQBrowser') != -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsIEBrowser", {
        /**
         * 是否是IE浏览器
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return this.IsHtml5 && navigator.userAgent.indexOf("MSIE") != -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsFirefoxBrowser", {
        /**
         * 是否是Firefox浏览器
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return this.IsHtml5 && navigator.userAgent.indexOf("Firefox") != -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsChromeBrowser", {
        /**
         * 是否是Chrome浏览器
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return this.IsHtml5 && navigator.userAgent.indexOf("Chrome") != -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsSafariBrowser", {
        /**
         * 是否是Safari浏览器
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return this.IsHtml5 && navigator.userAgent.indexOf("Safari") != -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceUtils, "IsOperaBrowser", {
        /**
         * 是否是Opera浏览器
         * @returns {boolean}
         * @constructor
         */
        get: function () {
            return this.IsHtml5 && navigator.userAgent.indexOf("Opera") != -1;
        },
        enumerable: true,
        configurable: true
    });
    return DeviceUtils;
}());
__reflect(DeviceUtils.prototype, "DeviceUtils");
var Dictionary = (function () {
    function Dictionary() {
        this._keys = [];
        this._values = [];
    }
    Object.defineProperty(Dictionary.prototype, "values", {
        /**
         * 获取所有的子元素列表。
         */
        get: function () {
            return this._values;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dictionary.prototype, "keys", {
        /**
         * 获取所有的子元素键名列表。
         */
        get: function () {
            return this._keys;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 给指定的键名设置值。
     * @param   key 键名。
     * @param   value 值。
     */
    Dictionary.prototype.setKeyValue = function (key, value) {
        var index = this._keys.indexOf(key);
        if (index >= 0) {
            this._values[index] = value;
            return;
        }
        this._keys.push(key);
        this._values.push(value);
    };
    /**
     * 返回指定键名的值。
     * @param   key 键名对象。
     * @return 指定键名的值。
     */
    Dictionary.prototype.getValue = function (key) {
        var index = this._keys.indexOf(key);
        return index < 0 ? null : this._values[index];
    };
    /**
     * 移除指定键名的值。
     * @param   key 键名对象。
     * @return 是否成功移除。
     */
    Dictionary.prototype.remove = function (key) {
        var index = this._keys.indexOf(key);
        if (index >= 0) {
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
            return true;
        }
        return false;
    };
    /**
     * 清除此对象的键名列表和键值列表。
     */
    Dictionary.prototype.clear = function () {
        this._values.length = 0;
        this._keys.length = 0;
    };
    return Dictionary;
}());
__reflect(Dictionary.prototype, "Dictionary");
/**
 * 方向工具
 */
var DirUtil = (function () {
    function DirUtil() {
    }
    /**
     * 通过2点，获取8方向值
     * p1 起始点
     * p2 结束点
     */
    DirUtil.get8DirBy2Point = function (p1, p2) {
        //计算方向
        var angle = MathUtils.getAngle(MathUtils.getRadian2(p1.x, p1.y, p2.x, p2.y));
        return this.angle2dir(angle);
    };
    /**
     * 通过2点，获取4方向值
     * p1 起始点
     * p2 结束点
     */
    DirUtil.get4DirBy2Point = function (p1, p2) {
        return p1.x < p2.x ? (p1.y < p2.y ? 3 : 1) : (p1.y < p2.y ? 5 : 7);
    };
    /** 方向转角度 */
    DirUtil.dir2angle = function (dir) {
        dir *= 45;
        dir -= 90;
        return dir;
    };
    /** 角度转方向 */
    DirUtil.angle2dir = function (angle) {
        if (angle < -90)
            angle += 360;
        return Math.round((angle + 90) / 45) % 8;
    };
    /** 反方向 */
    DirUtil.dirOpposit = function (dir) {
        // 7 == 3
        // 6 == 2
        // 5 == 1
        // 4 == 0
        return dir < 4 ? dir + 4 : dir - 4;
    };
    /** 8方向转5方向资源方向 */
    DirUtil.get5DirBy8Dir = function (dir8) {
        return dir8 - this.isScaleX(dir8);
    };
    /** 当前方向是否需要翻转 */
    DirUtil.isScaleX = function (dir8) {
        var td = 2 * (dir8 - 4);
        if (td < 0)
            td = 0;
        return td;
    };
    return DirUtil;
}());
__reflect(DirUtil.prototype, "DirUtil");
/**
 * Created by yangsong on 2014/11/24.
 * 显示对象工具类
 */
var DisplayUtils = (function () {
    function DisplayUtils() {
    }
    DisplayUtils.setShakeOn = function ($on) {
        this.openShake = $on;
    };
    /**
     * 创建一个Bitmap
     * @param resName resource.json中配置的name
     * @returns {egret.Bitmap}
     */
    DisplayUtils.createBitmap = function (resName) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(resName);
        result.texture = texture;
        return result;
    };
    /**
     * 创建一张Gui的图片
     * @param resName
     * @returns {egret.Bitmap}
     */
    DisplayUtils.createEuiImage = function (resName) {
        var result = new eui.Image();
        var texture = RES.getRes(resName);
        result.source = texture;
        return result;
    };
    /**
     * 从父级移除child
     * @param child
     */
    DisplayUtils.removeFromParent = function (child) {
        if (!child || child.parent == null)
            return;
        child.parent.removeChild(child);
    };
    /**
     * 震动指定的显示对象
     * @param target 震动的对象
     * @param range 震动幅度 单位像素
     * @param duration 一组震动（四方向）持续的时间
     * @param times 震动的次数 （4方向为一次）
     * @param condition 条件 传入判断的方法 执行返回false则不执行震动
     */
    DisplayUtils.shakeIt = function (target, range, duration, times, condition) {
        if (times === void 0) { times = 1; }
        if (condition === void 0) { condition = function () {
            return true;
        }; }
        if (!this.openShake || !target || times < 1 || !condition())
            return;
        var shakeSet = [
            { anchorOffsetX: 0, anchorOffsetY: -range },
            { anchorOffsetX: 0, anchorOffsetY: +range },
            { anchorOffsetX: 0, anchorOffsetY: 0 },
        ];
        egret.Tween.removeTweens(target);
        var delay = duration / shakeSet.length;
        egret.Tween.get(target).to(shakeSet[0], delay).to(shakeSet[1], delay).to(shakeSet[2], delay).call(function () {
            DisplayUtils.shakeIt(target, range, duration, --times);
        }, this);
    };
    DisplayUtils.shakeItHeji = function (target, range, duration, times, condition) {
        if (times === void 0) { times = 1; }
        if (condition === void 0) { condition = function () {
            return true;
        }; }
        if (!this.openShake || !target || times < 1 || !condition())
            return;
        var shakeSet = [
            { anchorOffsetX: +range * 0.1, anchorOffsetY: +range },
            { anchorOffsetX: -range * 0.1, anchorOffsetY: -range },
            { anchorOffsetX: +range * 0.1, anchorOffsetY: +range },
            { anchorOffsetX: -range * 0.1, anchorOffsetY: -range },
            { anchorOffsetX: (+range >> 1) * 0.1, anchorOffsetY: +range >> 1 },
            { anchorOffsetX: (-range >> 1) * 0.1, anchorOffsetY: -range >> 1 },
            { anchorOffsetX: (+range >> 2) * 0.1, anchorOffsetY: +range >> 2 },
            { anchorOffsetX: 0, anchorOffsetY: 0 },
        ];
        egret.Tween.removeTweens(target);
        var delay = duration / shakeSet.length;
        egret.Tween.get(target).to(shakeSet[0], delay).to(shakeSet[1], delay).to(shakeSet[2], delay).to(shakeSet[3], delay).to(shakeSet[4], delay).to(shakeSet[5], delay).to(shakeSet[6], delay).to(shakeSet[7], delay).call(function () {
            DisplayUtils.shakeIt(target, range, duration, --times);
        }, this);
    };
    DisplayUtils.shakeItEntity = function (target, range, duration, times, condition) {
        var _this = this;
        if (times === void 0) { times = 1; }
        if (condition === void 0) { condition = function () {
            return true;
        }; }
        if (!this.openShake || !target || times < 1 || !condition())
            return;
        var shakeSet = [
            { anchorOffsetX: 0, anchorOffsetY: -range },
            { anchorOffsetX: -range, anchorOffsetY: 0 },
            { anchorOffsetX: range, anchorOffsetY: 0 },
            { anchorOffsetX: 0, anchorOffsetY: range },
            { anchorOffsetX: 0, anchorOffsetY: 0 },
        ];
        egret.Tween.removeTweens(target);
        var delay = duration / 5;
        egret.Tween.get(target).to(shakeSet[0], delay).to(shakeSet[1], delay).to(shakeSet[2], delay).to(shakeSet[3], delay).to(shakeSet[4], delay).call(function () {
            _this.shakeIt(target, range, duration, --times);
        }, this);
    };
    /**画扇形 */
    DisplayUtils.drawCir = function (shape, radius, angle, anticlockwise) {
        if (shape == null) {
            shape = new egret.Shape();
        }
        function changeGraphics() {
            shape.graphics.clear();
            shape.graphics.beginFill(0x00ffff, 1);
            shape.graphics.moveTo(0, 0);
            shape.graphics.lineTo(radius, 0);
            shape.graphics.drawArc(0, 0, radius, 0, angle * Math.PI / 180, anticlockwise);
            shape.graphics.lineTo(0, 0);
            shape.graphics.endFill();
        }
        changeGraphics();
        return shape;
    };
    /**画矩形 */
    DisplayUtils.drawrect = function (shape, width, height, anticlockwise) {
        if (shape == null) {
            shape = new egret.Shape();
        }
        function changeGraphics() {
            shape.graphics.clear();
            shape.graphics.beginFill(0x00ffff, 1);
            shape.graphics.drawRect(0, 0, width, height);
            shape.graphics.endFill();
        }
        changeGraphics();
        return shape;
    };
    /**
     * 根据特效名返回特效路径
     * @param effectName
     * @returns {string}
     */
    // public static getEffectPath(effectName: string): string {
    // 	return RES_DIR_EFF + effectName;
    // }
    /**滚动条滚动至底部 */
    DisplayUtils.scrollerToBottom = function (scroller) {
        scroller.viewport.validateNow();
        if (scroller.viewport.contentHeight > scroller.height) {
            scroller.viewport.scrollV = scroller.viewport.contentHeight - scroller.height;
        }
    };
    DisplayUtils.openShake = true;
    DisplayUtils.shakingList = {};
    return DisplayUtils;
}());
__reflect(DisplayUtils.prototype, "DisplayUtils");
/**
 * Created by hrz on 2017/7/11.
 */
var FilterUtil = (function () {
    function FilterUtil() {
    }
    Object.defineProperty(FilterUtil, "grayFilter", {
        get: function () {
            return new egret.ColorMatrixFilter([0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0, 0, 0, 1, 0]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterUtil, "grayFilter1", {
        get: function () {
            return new egret.ColorMatrixFilter([0.3086, 0.5, 0.0820, 0, 0, 0.3086, 0.5, 0.0820, 0, 0, 0.3086, 0.5, 0.0820, 0, 0, 0, 0, 0, 1, 0]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterUtil, "ARRAY_GRAY_FILTER", {
        //灰色滤镜
        get: function () {
            return [FilterUtil.grayFilter1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterUtil, "greenFilter", {
        get: function () {
            return new egret.ColorMatrixFilter([1, 0, 0, 0, 0, 0, 1, 0, 0, 100, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterUtil, "greenFilter1", {
        get: function () {
            return new egret.ColorMatrixFilter([0.1, 0, 0, 0, 0, 0, 0.80078125, 0, 0, 20, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0]); //19921875
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterUtil, "ARRAY_GREEN_FILTER", {
        get: function () {
            return [FilterUtil.greenFilter1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterUtil, "blurFilter", {
        get: function () {
            return new egret.BlurFilter(10, 10, 2 /* MEDIUM */);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterUtil, "ARRAY_BLUR_FILTER", {
        //模糊滤镜
        get: function () {
            return [FilterUtil.blurFilter];
        },
        enumerable: true,
        configurable: true
    });
    return FilterUtil;
}());
__reflect(FilterUtil.prototype, "FilterUtil");
/**
 * 共用方法
 */
var GlobalFun = (function () {
    function GlobalFun() {
    }
    GlobalFun.getOption = function (key) {
        if (window.location) {
            var search = location.search;
            if (search == "") {
                return "";
            }
            search = search.slice(1);
            var searchArr = search.split("&");
            var length_2 = searchArr.length;
            for (var i = 0; i < length_2; i++) {
                var str = searchArr[i];
                var arr = str.split("=");
                if (arr[0] == key) {
                    return arr[1];
                }
            }
        }
        return "";
    };
    /**外法光 */
    GlobalFun.lighting = function (obj, color, boo) {
        if (color === void 0) { color = 0x33CCFF; }
        if (boo === void 0) { boo = false; }
        var color = color; /// 光晕的颜色，十六进制，不包含透明度
        var alpha = 0.8; /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        var blurX = 35; /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY = 35; /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength = 2; /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality = 3 /* HIGH */; /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        var inner = boo; /// 指定发光是否为内侧发光，暂未实现
        var knockout = false; /// 指定对象是否具有挖空效果，暂未实现
        var glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        obj.filters = [glowFilter];
        egret.Tween.get(glowFilter, { loop: true }).to({ alpha: 0.2 }, 1000).to({ alpha: 0.8 }, 1000);
    };
    /**
     * 震动显示对象
     * @param        target    震动目标对象
     * @param        time      震动持续时长（秒）
     * @param        rate      震动频率(一秒震动多少次)
     * @param        maxDis    震动最大距离
     */
    GlobalFun.shakeObj = function (target, time, rate, maxDis) {
        this.target = target;
        this.initX = target.x;
        this.initY = target.y;
        this.maxDis = maxDis;
        this.count = time * rate;
        this.rate = rate;
        this.timer.delay = 1000 / rate;
        this.timer.repeatCount = this.count;
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.shaking, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.shakeComplete, this);
        this.timer.reset();
        this.timer.start();
    };
    GlobalFun.shaking = function () {
        egret.Tween.removeTweens(this.target);
        this.target.x = this.initX - this.maxDis + Math.random() * this.maxDis * 2;
        this.target.y = this.initY - this.maxDis + Math.random() * this.maxDis * 2;
        egret.Tween.get(this.target).to({ x: this.initX, y: this.initY }, 999 / this.rate);
    };
    GlobalFun.shakeComplete = function () {
        if (this.target) {
            egret.Tween.removeTweens(this.target);
            this.target.x = this.initX;
            this.target.y = this.initY;
        }
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.shaking, this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.shakeComplete, this);
    };
    /**停止震动 */
    GlobalFun.stop = function () {
        this.shakeComplete();
    };
    GlobalFun.filterToGrey = function (tar) {
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        tar.filters = [colorFlilter];
    };
    GlobalFun.clearFilters = function (tar) {
        tar.filters = [];
    };
    GlobalFun.sendToNativePhurse = function (_data) {
        if (window["webkit"] && window["webkit"].messageHandlers && window["webkit"].messageHandlers.payGood) {
            window["webkit"].messageHandlers.payGood.postMessage(JSON.stringify(_data));
        }
    };
    GlobalFun.payCallBack = function (_cb) {
        GameApp.pay_cbDdata = _cb;
    };
    /**获取所有boss配置 */
    GlobalFun.getBossCfg = function () {
        var cfgs = MonsterCfg.cfgs;
        var arr = [];
        for (var key in cfgs) {
            if (cfgs[key].type == 1) {
                arr.push(cfgs[key]);
            }
        }
        return arr;
    };
    /**获取所有小怪配置 */
    GlobalFun.getMonsterCfg = function () {
        var cfgs = MonsterCfg.cfgs;
        var arr = [];
        for (var key in cfgs) {
            if (cfgs[key].type == 2) {
                arr.push(cfgs[key]);
            }
        }
        return arr;
    };
    /**根据id获取怪物配置 */
    GlobalFun.getCardDataFromId = function (id) {
        var cfgs = MonsterCfg.cfgs;
        for (var key in cfgs) {
            if (cfgs[key].id == id) {
                return cfgs[key];
            }
        }
    };
    GlobalFun.deepCopy = function (obj) {
        var obj2 = {};
        for (var key in obj) {
            obj2[key] = obj[key];
        }
        return obj2;
    };
    /**根据id获取技能神将配置 */
    GlobalFun.getSkillGeneralCfg = function (id) {
        var cfgs = RebornCfg.cfg;
        var curCfg = null;
        for (var key in cfgs) {
            if (cfgs[key].mid == id) {
                cfgs[key].id = id;
                curCfg = this.deepCopy(cfgs[key]);
                // curCfg.atkDis  = curCfg.atkDis + ((Math.random()*15))
                break;
            }
        }
        for (var key in GameApp.skillCfg) {
            if (GameApp.skillCfg[key] && GameApp.skillCfg[key].rebornId && GameApp.skillCfg[key].rebornId == id) {
                curCfg.level = GameApp.skillCfg[key].level;
                curCfg.atk = GameApp.skillCfg[key].atk;
                curCfg.hp = GameApp.skillCfg[key].hp;
                break;
            }
        }
        return curCfg;
    };
    /**获取宝箱刷新时间戳 */
    GlobalFun.getBoxRfreshTimeSpan = function () {
        var startTp = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime();
        var time = 5 * 60 * 60 * 1000;
        return startTp + time;
    };
    GlobalFun.getSkillCfg = function (id) {
        var skillcfgs = SkillCfg.skillCfg;
        for (var key in skillcfgs) {
            if (skillcfgs[key].skillId == id) {
                return skillcfgs[key];
            }
        }
    };
    GlobalFun.getIndex = function () {
        return ((Math.random() * 100) >> 0) > 50 ? 1 : -1;
    };
    /**
     * 创建技能特效显示
     * @param id 技能id
     * @param parent 父级容器
     * @param loopCount 循环次数
     * @param pos 位置
     * */
    GlobalFun.createSkillEff = function (camp, id, parent, loopCount, pos, entitys, atk) {
        // let skillCfg:any = SkillCfg.skillCfg[camp];
        // let skillCfg:any
        // let curUseSkill:any;
        var loop = true;
        var skillNames = ["旋转雷球", "龙腾", "地爆", "狂怒斩", "凤凰展翅", "双龙戏珠", "践踏", "霸刀斩", "炎爆", "裂地", "雷霆万钧"];
        var skillName = skillNames[id - 1];
        var res = "skilleff" + id;
        // if(id == 100001 || id == 100002 || id == 100003 || id == 100004){
        //     loop = true;
        // }
        // for(let key in skillCfg){
        //     if(skillCfg[key].skillId == id){
        //         curUseSkill = skillCfg[key];
        //         break;
        //     }
        // }
        var textInfo = new eui.Label();
        textInfo.size = 40;
        textInfo.scaleX = textInfo.scaleY = 1;
        textInfo.textColor = 0xff0000;
        if (camp == -1) {
            // textInfo.textColor = 0xfc3434;
        }
        else {
            res = "skill_" + id;
        }
        parent.addChild(textInfo);
        textInfo.x = pos.x;
        textInfo.y = pos.y - 150;
        textInfo.text = skillName;
        egret.Tween.get(textInfo).to({ scaleX: 2, scaleY: 2 }, 600, egret.Ease.circIn).wait(500).call(function () {
            egret.Tween.removeTweens(textInfo);
            if (textInfo && textInfo.parent) {
                textInfo.parent.removeChild(textInfo);
            }
            textInfo = null;
        }, this);
        if (loop) {
            var count_1 = 1;
            var minx_1 = 150;
            var maxx_1 = StageUtils.inst().getWidth() - 240;
            var miny_1 = 150;
            var maxy_1 = StageUtils.inst().getHeight() - 100;
            var mc = new MovieClip();
            mc.scaleX = mc.scaleY = 1;
            parent.addChild(mc);
            mc.playFile("" + SKILL_EFF + res, loopCount, null, true);
            mc.x = (Math.random() * (maxx_1 - minx_1) + minx_1) >> 0;
            mc.y = (Math.random() * (maxy_1 - miny_1) + miny_1) >> 0;
            if (entitys && atk) {
                for (var i = 0; i < entitys.length; i++) {
                    if (entitys[i] && !entitys[i].isDead) {
                        var dis = egret.Point.distance(new egret.Point(entitys[i].x, entitys[i].y), new egret.Point(mc.x, mc.y));
                        if (dis <= 100) {
                            entitys[i].reduceHp(atk + ((this.getIndex() * 0.2) >> 0));
                        }
                    }
                }
            }
            var playCount_1 = 15;
            if (id == 104) {
                playCount_1 = 30;
            }
            var interVal_1 = setInterval(function () {
                count_1 += 1;
                var mc = new MovieClip();
                mc.scaleX = mc.scaleY = 0.7;
                parent.addChild(mc);
                mc.playFile("" + SKILL_EFF + res, loopCount, null, true);
                mc.x = (Math.random() * (maxx_1 - minx_1) + minx_1) >> 0;
                mc.y = (Math.random() * (maxy_1 - miny_1) + miny_1) >> 0;
                if (entitys && atk) {
                    for (var i = 0; i < entitys.length; i++) {
                        if (entitys[i] && !entitys[i].isDead) {
                            var dis = egret.Point.distance(new egret.Point(entitys[i].x, entitys[i].y), new egret.Point(mc.x, mc.y));
                            if (dis <= 100) {
                                entitys[i].reduceHp(atk);
                            }
                        }
                    }
                }
                if (count_1 >= playCount_1) {
                    clearInterval(interVal_1);
                }
            }, 200);
        }
    };
    GlobalFun.count = 0; //计时器次数
    GlobalFun.timer = new egret.Timer(1000);
    return GlobalFun;
}());
__reflect(GlobalFun.prototype, "GlobalFun");
/**
 * keycode枚举
 * @author Maliu
 */
var KeyCode = (function () {
    function KeyCode() {
    }
    /* 主键盘区的数字 */
    KeyCode.KC_1 = 49;
    KeyCode.KC_2 = 50;
    KeyCode.KC_3 = 51;
    KeyCode.KC_4 = 52;
    KeyCode.KC_5 = 53;
    KeyCode.KC_6 = 54;
    KeyCode.KC_7 = 55;
    KeyCode.KC_8 = 56;
    KeyCode.KC_9 = 57;
    KeyCode.KC_0 = 48;
    /* 字母键 */
    KeyCode.KC_A = 65;
    KeyCode.KC_B = 66;
    KeyCode.KC_C = 67;
    KeyCode.KC_D = 68;
    KeyCode.KC_E = 69;
    KeyCode.KC_F = 70;
    KeyCode.KC_G = 71;
    KeyCode.KC_H = 72;
    KeyCode.KC_I = 73;
    KeyCode.KC_J = 74;
    KeyCode.KC_K = 75;
    KeyCode.KC_L = 76;
    KeyCode.KC_M = 77;
    KeyCode.KC_N = 78;
    KeyCode.KC_O = 79;
    KeyCode.KC_P = 80;
    KeyCode.KC_Q = 81;
    KeyCode.KC_R = 82;
    KeyCode.KC_S = 83;
    KeyCode.KC_T = 84;
    KeyCode.KC_U = 85;
    KeyCode.KC_V = 86;
    KeyCode.KC_W = 87;
    KeyCode.KC_X = 88;
    KeyCode.KC_Y = 89;
    KeyCode.KC_Z = 90;
    /* F功能区 */
    KeyCode.KC_F1 = 112;
    KeyCode.KC_F2 = 113;
    KeyCode.KC_F3 = 114;
    KeyCode.KC_F4 = 115;
    KeyCode.KC_F5 = 116;
    KeyCode.KC_F6 = 117;
    KeyCode.KC_F7 = 118;
    KeyCode.KC_F8 = 119;
    KeyCode.KC_F9 = 120;
    KeyCode.KC_F10 = 121;
    KeyCode.KC_F11 = 122;
    KeyCode.KC_F12 = 123;
    KeyCode.KC_F13 = 124;
    KeyCode.KC_F14 = 125;
    KeyCode.KC_F15 = 126;
    /* 数字小键盘区 */
    KeyCode.KC_NUMPAD_0 = 96;
    KeyCode.KC_NUMPAD_1 = 97;
    KeyCode.KC_NUMPAD_2 = 98;
    KeyCode.KC_NUMPAD_3 = 99;
    KeyCode.KC_NUMPAD_4 = 100;
    KeyCode.KC_NUMPAD_5 = 101;
    KeyCode.KC_NUMPAD_6 = 102;
    KeyCode.KC_NUMPAD_7 = 103;
    KeyCode.KC_NUMPAD_8 = 104;
    KeyCode.KC_NUMPAD_9 = 105;
    KeyCode.KC_NUMPAD_MULTIPLY = 106; //*
    KeyCode.KC_NUMPAD_ADD = 107; //+
    KeyCode.KC_NUMPAD_ENTER = 108; //enter
    KeyCode.KC_NUMPAD_SUBTRACT = 109; //-
    KeyCode.KC_NUMPAD_DECIMAL = 110; //.
    KeyCode.KC_NUMPAD_DIVIDE = 111; ///
    /* 主键盘功能键 */
    KeyCode.KC_BACKSPACE = 8; //backspace 退格键
    KeyCode.KC_TAB = 9; //tab 换行键
    KeyCode.KC_ENTER = 13; //main ENTER 回车键（主键盘区）
    KeyCode.KC_SHIFT = 16; //shift 
    KeyCode.KC_CONTROL = 17; //ctrl
    KeyCode.KC_ESCAPE = 27; //esc
    KeyCode.KC_SPACE = 32; //space 空格键
    KeyCode.KC_WINDOWS = 91; //windows
    KeyCode.KC_MENU = 93; //menu
    /* 三个锁定键 */
    KeyCode.KC_CAPS_LOCK = 20; //caps lock
    KeyCode.KC_NUM_LOCK = 144; //num lock
    KeyCode.KC_SCROLL_LOCK = 145; //scroll lock
    /* 功能键 */
    KeyCode.KC_PAUSE = 19; //pause / break
    KeyCode.KC_PAGE_UP = 33; //page up
    KeyCode.KC_PAGE_DOWN = 34; //page down
    KeyCode.KC_END = 35; //end
    KeyCode.KC_HOME = 36; //home
    KeyCode.KC_INSERT = 45; //insert
    KeyCode.KC_DELETE = 46; //delete
    /* 方向键 */
    KeyCode.KC_LEFT = 37; //left arrow
    KeyCode.KC_UP = 38; //up arrow
    KeyCode.KC_RIGHT = 39; //right arrow
    KeyCode.KC_DOWN = 40; //down arrow
    /* 标点符号 */
    KeyCode.KC_SEMICOLON_COLON = 186; //;:
    KeyCode.KC_EQUAL_PLUS = 187; //=+
    KeyCode.KC_MINUS_UNDERLINE = 189; //-_
    KeyCode.KC_SLASH_QUESTIONMARK = 191; // /?
    KeyCode.KC_SPECIALCOMMA_EARTHWORM = 192; //`~
    KeyCode.KC_LEFT_BRACKET_BRACE = 219; //[{
    KeyCode.KC_BACKSLASH_VERTICALBAR = 220; //\|
    KeyCode.KC_RIGHT_BRACKET_BRACE = 221; //]}
    KeyCode.KC_QUOTE = 222; //'"
    KeyCode.KC_COMMA = 188; //,<
    KeyCode.KC_PERIOD = 190; //.>
    return KeyCode;
}());
__reflect(KeyCode.prototype, "KeyCode");
/**
 * Created by yangsong on 2014/11/22.
 * 数学计算工具类
 */
var MathUtils = (function () {
    function MathUtils() {
    }
    /**
     * 弧度制转换为角度值
     * @param radian 弧度制
     * @returns {number}
     */
    MathUtils.getAngle = function (radian) {
        return 180 * radian / Math.PI;
    };
    /**
     * 角度值转换为弧度制
     * @param angle
     */
    MathUtils.getRadian = function (angle) {
        return angle / 180 * Math.PI;
    };
    /**
     * 获取两点间弧度
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    MathUtils.getRadian2 = function (p1X, p1Y, p2X, p2Y) {
        var xdis = p2X - p1X;
        var ydis = p2Y - p1Y;
        return Math.atan2(ydis, xdis);
    };
    /**
     * 获取两点间距离
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    MathUtils.getDistance = function (p1X, p1Y, p2X, p2Y) {
        var disX = p2X - p1X;
        var disY = p2Y - p1Y;
        var disQ = disX * disX + disY * disY;
        return Math.sqrt(disQ);
    };
    MathUtils.getDistanceByObject = function (s, t) {
        return this.getDistance(s.x, s.y, t.x, t.y);
    };
    /**获取两个点的距离的平方 */
    MathUtils.getDistanceX2ByObject = function (s, t) {
        var disX = s.x - t.x;
        var disY = s.y - t.y;
        return disX * disX + disY * disY;
    };
    /** 角度移动点 */
    MathUtils.getDirMove = function (angle, distance, offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var radian = this.getRadian(angle);
        var p = { x: 0, y: 0 };
        p.x = Math.cos(radian) * distance + offsetX;
        p.y = Math.sin(radian) * distance + offsetY;
        return p;
    };
    /**
     * 获取一个区间的随机数
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    MathUtils.limit = function ($from, $end) {
        $from = Math.min($from, $end);
        $end = Math.max($from, $end);
        var range = $end - $from;
        return $from + Math.random() * range;
    };
    /**
     * 获取一个区间的随机数(帧数)
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    MathUtils.limitInteger = function ($from, $end) {
        return Math.round(this.limit($from, $end));
    };
    /**
     * 在一个数组中随机获取一个元素
     * @param arr 数组
     * @returns {any} 随机出来的结果
     */
    MathUtils.randomArray = function (arr) {
        var index = Math.floor(Math.random() * arr.length);
        return arr[index];
    };
    /**取整 */
    MathUtils.toInteger = function (value) {
        return value >> 0;
    };
    return MathUtils;
}());
__reflect(MathUtils.prototype, "MathUtils");
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
/*
 * Configurable letiables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var md5 = (function () {
    function md5() {
    }
    md5.obj_md5 = function (obj, verifyKey, ignoreKeys, isASC) {
        if (ignoreKeys === void 0) { ignoreKeys = []; }
        if (isASC === void 0) { isASC = true; }
        //key排序
        var keys = [];
        for (var key in obj) {
            keys.push(key);
        }
        if (isASC)
            keys.sort();
        //key拼接
        var str = [];
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (ignoreKeys.indexOf(key) == -1) {
                str.push(key + "=" + obj[key]);
            }
        }
        //md5串
        var md5Str = str.join("&");
        return this.hex_md5(md5Str + (verifyKey ? "&" + verifyKey : ""));
    };
    md5.obj_md5_args = function (obj, verifyKey, addSign, ignoreKeys, isASC) {
        if (ignoreKeys === void 0) { ignoreKeys = []; }
        if (isASC === void 0) { isASC = true; }
        //key排序
        var keys = [];
        for (var key in obj) {
            keys.push(key);
        }
        if (isASC)
            keys.sort();
        //key拼接
        var str = [];
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (ignoreKeys.indexOf(key) == -1) {
                str.push(key + "=" + obj[key]);
            }
        }
        //md5串
        var md5Str = str.join("&");
        if (addSign) {
            md5Str += "&sign=" + this.hex_md5(md5Str + (verifyKey ? "&" + verifyKey : ""));
        }
        //忽略key拼接
        for (var i = 0; i < ignoreKeys.length; i++) {
            var ignoreKey = ignoreKeys[i];
            md5Str += "&" + ignoreKey + "=" + obj[ignoreKey];
        }
        return md5Str;
    };
    md5.hex_md5 = function (s) {
        return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(s)));
    };
    md5.b64_md5 = function (s) {
        return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(s)));
    };
    md5.any_md5 = function (s, e) {
        return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(s)), e);
    };
    md5.hex_hmac_md5 = function (k, d) {
        return this.rstr2hex(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d)));
    };
    md5.b64_hmac_md5 = function (k, d) {
        return this.rstr2b64(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d)));
    };
    md5.any_hmac_md5 = function (k, d, e) {
        return this.rstr2any(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d)), e);
    };
    /*
     * Perform a simple self-test to see if the VM is working
     */
    md5.md5_vm_test = function () {
        return this.hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
    };
    /*
     * Calculate the MD5 of a raw string
     */
    md5.rstr_md5 = function (s) {
        return this.binl2rstr(this.binl_md5(this.rstr2binl(s), s.length * 8));
    };
    /*
     * Calculate the HMAC-MD5, of a key and some data (raw strings)
     */
    md5.rstr_hmac_md5 = function (key, data) {
        var bkey = this.rstr2binl(key);
        if (bkey.length > 16)
            bkey = this.binl_md5(bkey, key.length * 8);
        var ipad = Array(16), opad = Array(16);
        for (var i = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        var hash = this.binl_md5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);
        return this.binl2rstr(this.binl_md5(opad.concat(hash), 512 + 128));
    };
    /*
     * Convert a raw string to a hex string
     */
    md5.rstr2hex = function (input) {
        try {
            this.hexcase;
        }
        catch (e) {
            this.hexcase = 0;
        }
        var hex_tab = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var output = "";
        var x;
        for (var i = 0; i < input.length; i++) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F)
                + hex_tab.charAt(x & 0x0F);
        }
        return output;
    };
    /*
     * Convert a raw string to a base-64 string
     */
    md5.rstr2b64 = function (input) {
        try {
            this.b64pad;
        }
        catch (e) {
            this.b64pad = '';
        }
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var output = "";
        var len = input.length;
        for (var i = 0; i < len; i += 3) {
            var triplet = (input.charCodeAt(i) << 16)
                | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
                | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
            for (var j = 0; j < 4; j++) {
                if (i * 8 + j * 6 > input.length * 8)
                    output += this.b64pad;
                else
                    output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
            }
        }
        return output;
    };
    /*
     * Convert a raw string to an arbitrary string encoding
     */
    md5.rstr2any = function (input, encoding) {
        var divisor = encoding.length;
        var i, j, q, x, quotient;
        /* Convert to an array of 16-bit big-endian values, forming the dividend */
        var dividend = Array(Math.ceil(input.length / 2));
        for (i = 0; i < dividend.length; i++) {
            dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
        }
        /*
         * Repeatedly perform a long division. The binary array forms the dividend,
         * the length of the encoding is the divisor. Once computed, the quotient
         * forms the dividend for the next step. All remainders are stored for later
         * use.
         */
        var full_length = Math.ceil(input.length * 8 /
            (Math.log(encoding.length) / Math.log(2)));
        var remainders = Array(full_length);
        for (j = 0; j < full_length; j++) {
            quotient = Array();
            x = 0;
            for (i = 0; i < dividend.length; i++) {
                x = (x << 16) + dividend[i];
                q = Math.floor(x / divisor);
                x -= q * divisor;
                if (quotient.length > 0 || q > 0)
                    quotient[quotient.length] = q;
            }
            remainders[j] = x;
            dividend = quotient;
        }
        /* Convert the remainders to the output string */
        var output = "";
        for (i = remainders.length - 1; i >= 0; i--)
            output += encoding.charAt(remainders[i]);
        return output;
    };
    /*
     * Encode a string as utf-8.
     * For efficiency, this assumes the input is valid utf-16.
     */
    md5.str2rstr_utf8 = function (input) {
        var output = "";
        var i = -1;
        var x, y;
        while (++i < input.length) {
            /* Decode utf-16 surrogate pairs */
            x = input.charCodeAt(i);
            y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
            if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
                x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                i++;
            }
            /* Encode output as utf-8 */
            if (x <= 0x7F)
                output += String.fromCharCode(x);
            else if (x <= 0x7FF)
                output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F));
            else if (x <= 0xFFFF)
                output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
            else if (x <= 0x1FFFFF)
                output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
        }
        return output;
    };
    /*
     * Encode a string as utf-16
     */
    md5.str2rstr_utf16le = function (input) {
        var output = "";
        for (var i = 0; i < input.length; i++)
            output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF);
        return output;
    };
    md5.str2rstr_utf16be = function (input) {
        var output = "";
        for (var i = 0; i < input.length; i++)
            output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF);
        return output;
    };
    /*
     * Convert a raw string to an array of little-endian words
     * Characters >255 have their high-byte silently ignored.
     */
    md5.rstr2binl = function (input) {
        var output = Array(input.length >> 2);
        for (var i = 0; i < output.length; i++)
            output[i] = 0;
        for (var i = 0; i < input.length * 8; i += 8)
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
        return output;
    };
    /*
     * Convert an array of little-endian words to a string
     */
    md5.binl2rstr = function (input) {
        var output = "";
        for (var i = 0; i < input.length * 32; i += 8)
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
        return output;
    };
    /*
     * Calculate the MD5 of an array of little-endian words, and a bit length.
     */
    md5.binl_md5 = function (x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        for (var i = 0; i < x.length; i += 16) {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;
            a = this.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
            d = this.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = this.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = this.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = this.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = this.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = this.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = this.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = this.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = this.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = this.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = this.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = this.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = this.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = this.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = this.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
            a = this.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = this.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = this.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = this.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
            a = this.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = this.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = this.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = this.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = this.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = this.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = this.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = this.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = this.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = this.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = this.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = this.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = this.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
            d = this.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = this.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = this.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = this.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = this.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = this.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = this.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = this.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = this.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
            c = this.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = this.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = this.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = this.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = this.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = this.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = this.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
            d = this.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = this.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = this.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = this.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = this.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = this.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = this.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = this.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = this.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = this.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = this.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = this.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = this.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = this.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = this.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
            a = this.safe_add(a, olda);
            b = this.safe_add(b, oldb);
            c = this.safe_add(c, oldc);
            d = this.safe_add(d, oldd);
        }
        return [a, b, c, d];
    };
    /*
     * These privates implement the four basic operations the algorithm uses.
     */
    md5.md5_cmn = function (q, a, b, x, s, t) {
        return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(a, q), this.safe_add(x, t)), s), b);
    };
    md5.md5_ff = function (a, b, c, d, x, s, t) {
        return this.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    };
    md5.md5_gg = function (a, b, c, d, x, s, t) {
        return this.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    };
    md5.md5_hh = function (a, b, c, d, x, s, t) {
        return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
    };
    md5.md5_ii = function (a, b, c, d, x, s, t) {
        return this.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    };
    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    md5.safe_add = function (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    };
    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    md5.bit_rol = function (num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    };
    md5.hexcase = 0;
    md5.b64pad = "";
    return md5;
}());
__reflect(md5.prototype, "md5");
/**
 * 翻页数组
 * @author Peach.T 2010-5-3
 */
var PageArray = (function () {
    function PageArray(source, size) {
        if (size === void 0) { size = 20; }
        this.dataSource = source;
        this.size = size;
        this.currentPage = 0;
        this.setPageData();
    }
    Object.defineProperty(PageArray.prototype, "length", {
        /**
         *数据源长度
         */
        get: function () {
            return this.dataSource.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 设置数据源
     *
     */
    PageArray.prototype.setPageData = function () {
        this.pageData = [];
        var index = this.currentPage * this.size;
        var nextIndex = (this.currentPage + 1) * this.size;
        var min = Math.min(this.length, nextIndex);
        for (var i = index; i < min; i++) {
            this.pageData.push(this.dataSource[i]);
        }
    };
    PageArray.prototype.getDataSource = function () {
        return this.dataSource;
    };
    Object.defineProperty(PageArray.prototype, "totalPage", {
        get: function () {
            return Math.ceil(this.length / this.size);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 是否有前一页
     * @return
     *
     */
    PageArray.prototype.havePre = function () {
        return this.currentPage != 0; //没有数据，或者只有一页的情况，或者多页情况下在第一页的情况
    };
    /**
     * 是否有下一页
     * @return
     *
     */
    PageArray.prototype.haveNext = function () {
        return this.currentPage < this.totalPage - 1; //没有数据 ，或者在最后一页的情况
    };
    /**
     * 向前翻页
     *
     */
    PageArray.prototype.prev = function () {
        this.currentPage--;
        this.setPageData();
    };
    /**
     * 向后翻页
     *
     */
    PageArray.prototype.next = function () {
        this.currentPage++;
        this.setPageData();
    };
    /**
     * 首页
     *
     */
    PageArray.prototype.first = function () {
        this.currentPage = 0;
        this.setPageData();
    };
    /**
     * 末页
     *
     */
    PageArray.prototype.last = function () {
        this.currentPage = this.totalPage - 1;
        this.setPageData();
    };
    /**
     * 跳转到多少页
     * @param index 页数
     *
     */
    PageArray.prototype.gotoPage = function (index) {
        if (this.totalPage < index) {
            return;
        }
        else {
            this.currentPage = index - 1;
            this.setPageData();
        }
    };
    return PageArray;
}());
__reflect(PageArray.prototype, "PageArray");
/**
 * 游戏里使用到的正则
 * @author WynnLam
 *
 */
var RegExpUtil = (function () {
    function RegExpUtil() {
    }
    //换行符\r
    RegExpUtil.LINE_BREAK = /\r+/g;
    //空白字符和“\”号的正则
    RegExpUtil.BLANK_REG = /[\s\\]/g;
    //8位ARGB颜色
    RegExpUtil.ARGB_COLOR = /[a-fA-F0-9]{8}/;
    //html正则
    RegExpUtil.HTML = /<[^>]+>/g;
    //去除空格的正则表达式
    RegExpUtil.DELETE_SPACE = /\s/g; //去除空格字符
    RegExpUtil.REPLACE_STRING = /%s/g; //去除空格字符
    RegExpUtil.NumericExp = /^\d+$/;
    RegExpUtil.NonNumericExp = /\D/;
    RegExpUtil.ActorNameExp = /^([\u4e00-\u9fa5]?\w?[^>|!@#$%&*\^\?]){1,48}$/;
    return RegExpUtil;
}());
__reflect(RegExpUtil.prototype, "RegExpUtil");
var StageUtils = (function (_super) {
    __extends(StageUtils, _super);
    /**
     * 构造函数
     */
    function StageUtils() {
        var _this = _super.call(this) || this;
        if (StageUtils._uiStage == null) {
            StageUtils._uiStage = new eui.UILayer();
            StageUtils._uiStage.touchEnabled = false;
            StageUtils._uiStage.percentHeight = 100;
            StageUtils._uiStage.percentWidth = 100;
            _this.getStage().addChild(StageUtils._uiStage);
        }
        return _this;
    }
    StageUtils.inst = function () {
        var _inst = _super.single.call(this);
        return _inst;
    };
    /**
     * 获取游戏的高度
     * @returns {number}
     */
    StageUtils.prototype.getHeight = function () {
        return this.getStage().stageHeight;
    };
    /**
     * 获取游戏宽度
     * @returns {number}
     */
    StageUtils.prototype.getWidth = function () {
        return this.getStage().stageWidth;
    };
    /**
     * 指定此对象的子项以及子孙项是否接收鼠标/触摸事件
     * @param value
     */
    StageUtils.prototype.setTouchChildren = function (value) {
        this.getStage().touchChildren = value;
    };
    /**
     * 设置同时可触发几个点击事件，默认为2
     * @param value
     */
    StageUtils.prototype.setMaxTouches = function (value) {
        this.getStage().maxTouches = value;
    };
    /**
     * 设置帧频
     * @param value
     */
    StageUtils.prototype.setFrameRate = function (value) {
        this.getStage().frameRate = value;
    };
    /**
     * 设置适配方式
     * @param value
     */
    StageUtils.prototype.setScaleMode = function (value) {
        this.getStage().scaleMode = value;
    };
    /**
     * 获取游戏Stage对象
     * @returns {egret.MainContext}
     */
    StageUtils.prototype.getStage = function () {
        return egret.MainContext.instance.stage;
    };
    /**
     * 获取唯一UIStage
     * @returns {eui.UILayer}
     */
    StageUtils.prototype.getUIStage = function () {
        return StageUtils._uiStage;
    };
    StageUtils.getScaleMode = function () {
        if (StageUtils.isIphoneX())
            return egret.StageScaleMode.FIXED_WIDTH;
        var w = window.innerHeight / window.innerWidth;
        var minSizeProb = 1.4;
        var maxSizeProb = 1.8;
        var scaleMode = "";
        if (w <= minSizeProb) {
            scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
        }
        else if (w > minSizeProb && w < maxSizeProb) {
            scaleMode = egret.StageScaleMode.FIXED_WIDTH;
        }
        return scaleMode;
    };
    StageUtils.isIphoneX = function () {
        return (734 == window.innerWidth && 375 == window.innerHeight) ||
            (812 == window.innerWidth && 375 == window.innerHeight) ||
            (896 == window.innerWidth && 414 == window.innerHeight) ||
            (818 == window.innerWidth && 414 == window.innerHeight);
    };
    StageUtils.init = function () {
        this.changeStageSize();
        window.addEventListener("resize", this.changeStageSize);
    };
    StageUtils.changeStageSize = function () {
        var scaleMode = StageUtils.getScaleMode();
        if (this.lastOrientation != window.orientation) {
            document.body.style.height = "100%";
            this.lastOrientation = window.orientation;
        }
        StageUtils.inst().getStage().scaleMode = scaleMode;
    };
    return StageUtils;
}(BaseClass));
__reflect(StageUtils.prototype, "StageUtils");
/**
 * Created by yangsong on 14/12/18.
 * 字符串操作工具类
 */
var StringUtils = (function () {
    function StringUtils() {
    }
    /**
     * 去掉前后空格
     * @param str
     * @returns {string}
     */
    StringUtils.trimSpace = function (str) {
        return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
    };
    /**
     * 获取字符串长度，中文为2
     * @param str
     */
    StringUtils.getStringLength = function (str) {
        var strArr = str.split("");
        var length = 0;
        for (var i = 0; i < strArr.length; i++) {
            var s = strArr[i];
            if (this.isChinese(s)) {
                length += 2;
            }
            else {
                length += 1;
            }
        }
        return length;
    };
    /**
     * 判断一个字符串是否包含中文
     * @param str
     * @returns {boolean}
     */
    StringUtils.isChinese = function (str) {
        var reg = /^[\u4E00-\u9FA5]+$/;
        if (!reg.test(str)) {
            return true;
        }
        return false;
    };
    /**
     * 获取字符串的字节长度
     * 一个中文算2两个字节
     * @param str
     * @return
     */
    StringUtils.strByteLen = function (str) {
        var byteLen = 0;
        var strLen = str.length;
        for (var i = 0; i < strLen; i++) {
            byteLen += str.charCodeAt(i) >= 0x7F ? 2 : 1;
        }
        return byteLen;
    };
    /**
     * 补齐字符串
     * 因为这里使用的是字节长度（一个中文算2个字节）
     * 所以指定的长度是指字节长度，用来填补的字符按一个字节算
     * 如果填补的字符使用中文那么会导致结果不正确，但这里没有对填补字符做检测
     * @param str 源字符串
     * @param length 指定的字节长度
     * @param char 填补的字符
     * @param ignoreHtml 是否忽略HTML代码，默认为true
     * @return
     *
     */
    StringUtils.complementByChar = function (str, length, char, ignoreHtml) {
        if (char === void 0) { char = " "; }
        if (ignoreHtml === void 0) { ignoreHtml = true; }
        var byteLen = this.strByteLen(ignoreHtml ? str.replace(StringUtils.HTML, "") : str);
        return str + this.repeatStr(char, length - byteLen);
    };
    /**
     * 重复指定字符串count次
     * @param str
     * @param count
     * @return
     *
     */
    StringUtils.repeatStr = function (str, count) {
        var s = "";
        for (var i = 0; i < count; i++) {
            s += str;
        }
        return s;
    };
    /**
     * 为文字添加颜色
     * */
    StringUtils.addColor = function (content, color) {
        var colorStr;
        if (typeof (color) == "string")
            colorStr = String(color);
        else if (typeof (color) == "number")
            colorStr = Number(color).toString(10);
        return "<font color=\"" + colorStr + "\">" + content + "</font>";
    };
    /**
     * 这个函数还没改完,用来替代addColor
     *
     */
    StringUtils.addColor1 = function (content, color) {
        var obj = new Object;
        obj["style"] = new Object;
        obj["text"] = content;
        obj["textColor"] = Number(color).toString(16);
        return obj;
    };
    StringUtils.substitute = function (str) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var reg = RegExpUtil.REPLACE_STRING;
        var replaceReg = str.match(reg);
        if (replaceReg && replaceReg.length) {
            var len = replaceReg.length;
            for (var t_i = 0; t_i < len; t_i++) {
                str = str.replace(replaceReg[t_i], rest[t_i]);
            }
        }
        return str;
    };
    /**
     * 匹配替换字符串
     * @param 需要匹配替换的字符串
     * @param 匹配的字符串
     * @param 需要替换成的字符串
     * **/
    StringUtils.replaceStr = function (src, tar, des) {
        if (src.indexOf(tar) == -1)
            return src;
        var list = src.split(tar);
        return list[0] + des + list[1];
    };
    /**
     * 匹配替换颜色字符串
     * @param 需要匹配替换的字符串
     * @param 需要匹配目标颜色
     * @return 替换后的字符串
     * **/
    StringUtils.replaceStrColor = function (src, color) {
        // src = "0x102030asdas0xff1536tttt0xff15370x888888aabb0x789456";//测试
        var tci = src.indexOf("0x");
        var tci2 = tci;
        var arghr2 = "";
        var arghr3 = "";
        while (tci2 != -1) {
            arghr2 = src.substring(tci, tci + 8);
            src = src.replace(arghr2, color);
            tci += 8;
            arghr3 = src.substring(tci);
            tci2 = arghr3.indexOf("0x");
            tci = tci + tci2;
        }
        return src;
    };
    /**
     * 字符串匹配拼接
     * @param 需要拼接的字符串
     * @param 匹配项
     * @returns {string}
     */
    StringUtils.replace = function (str) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < args.length; i++) {
            str = str.replace("%s", args[i] + "");
        }
        return str;
    };
    /**
     * 根据正则匹配指定字符串 返回字符串中的包含所有数据的数组
     * @param 需要获取数字的字符串
     * @param 正则表达规则(缺省值)
     * **/
    StringUtils.getStrByRegExp = function (src, reg) {
        if (reg === void 0) { reg = /\d+/g; }
        var newStrlist = [];
        var newStr = src.replace(reg, function () {
            //调用方法时内部会产生 this 和 arguments
            // debug.log("arguments[0] = "+arguments[0]);//匹配的字符串值
            // debug.log("arguments[1] = "+arguments[1]);//字符串索引
            // debug.log("arguments[2] = "+arguments[2]);//原字符串
            //查找数字后，可以对数字进行其他操作
            newStrlist.push(arguments[0]);
            if (typeof arguments[0] == "number")
                return arguments[0].toString();
            else
                return arguments[0];
        });
        // debug.log("newStrlist = "+newStrlist);
        return newStrlist;
    };
    StringUtils.ChineseToNumber = function (chnStr) {
        var rtn = 0;
        var section = 0;
        var number = 0;
        var secUnit = false;
        var str = chnStr.split('');
        for (var i = 0; i < str.length; i++) {
            var num = StringUtils.chnNumCharCN[str[i]];
            if (typeof num !== 'undefined') {
                number = num;
                if (i === str.length - 1) {
                    section += number;
                }
            }
            else {
                var unit = StringUtils.chnNameValueCN[str[i]].value;
                secUnit = StringUtils.chnNameValueCN[str[i]].secUnit;
                if (secUnit) {
                    section = (section + number) * unit;
                    rtn += section;
                    section = 0;
                }
                else {
                    section += (number * unit);
                }
                number = 0;
            }
        }
        return rtn + section;
    };
    StringUtils.NumberToChinese = function (num) {
        var unitPos = 0;
        var strIns = '', chnStr = '';
        var needZero = false;
        var chnNumChar = StringUtils.chnNumChar;
        var chnUnitSection = StringUtils.chnUnitSection;
        if (num === 0) {
            return chnNumChar[0];
        }
        while (num > 0) {
            var section = num % 10000;
            if (needZero) {
                chnStr = chnNumChar[0] + chnStr;
            }
            strIns = StringUtils.SectionToChinese(section);
            strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
            chnStr = strIns + chnStr;
            needZero = (section < 1000) && (section > 0);
            num = Math.floor(num / 10000);
            unitPos++;
        }
        return chnStr;
    };
    //转万单位以下
    StringUtils.SectionToChinese = function (section) {
        var strIns = '', chnStr = '';
        var unitPos = 0;
        var zero = true;
        var chnNumChar = StringUtils.chnNumChar;
        var chnUnitChar = StringUtils.chnUnitChar;
        while (section > 0) {
            var v = section % 10;
            if (v === 0) {
                if (!zero) {
                    zero = true;
                    chnStr = chnNumChar[v] + chnStr;
                }
            }
            else {
                zero = false;
                strIns = chnNumChar[v];
                strIns += chnUnitChar[unitPos];
                chnStr = strIns + chnStr;
            }
            unitPos++;
            section = Math.floor(section / 10);
        }
        return chnStr;
    };
    StringUtils.HTML = /<[^>]+>/g;
    /**
     * 中文转数字
     * 例子:
     * StringUtils.ChineseToNumber(三百四十三) = 343 (number）
     * */
    StringUtils.chnNumCharCN = {
        "零": 0,
        "一": 1,
        "二": 2,
        "三": 3,
        "四": 4,
        "五": 5,
        "六": 6,
        "七": 7,
        "八": 8,
        "九": 9
    };
    StringUtils.chnNameValueCN = {
        "十": { value: 10, secUnit: false },
        "百": { value: 100, secUnit: false },
        "千": { value: 1000, secUnit: false },
        "万": { value: 10000, secUnit: true },
        "亿": { value: 100000000, secUnit: true }
    };
    /**
     * 数字转中文
     * 例子:
     * StringUtils.NumberToChinese(325) = "三百二十五" (string）
     * */
    StringUtils.chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    StringUtils.chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
    StringUtils.chnUnitChar = ["", "十", "百", "千"];
    return StringUtils;
}());
__reflect(StringUtils.prototype, "StringUtils");
/**
 * Created by Saco on 2015/10/26.
 */
var TextFlowMaker = (function () {
    function TextFlowMaker() {
    }
    /**
     * "你好|S:18&C:0xffff00&T:带颜色字号|S:50&T:大号字体|C:0x0000ff&T:带色字体";
     * |U: 下划线
     * 注意：请保证正确的HTML字符串输入，若无法保证（如拼合字符串包含玩家的输入）建议使用函数generateTextFlow1
     * @param sourceText
     * @returns {Array}
     */
    TextFlowMaker.generateTextFlow = function (sourceText) {
        if (!sourceText) {
            return new egret.HtmlTextParser().parser("");
        }
        var textArr = sourceText.split("|");
        var str = "";
        var result;
        for (var i = 0, len = textArr.length; i < len; i++) {
            str += TextFlowMaker.getSingleTextFlow1(textArr[i]);
        }
        try {
            result = new egret.HtmlTextParser().parser(str);
        }
        catch (e) {
            debug.log("错误的HTML输入");
            return new egret.HtmlTextParser().parser("");
        }
        return result;
    };
    /**
     * "你好|S:18&C:0xffff00&T:带颜色字号|S:50&T:大号字体|C:0x0000ff&T:带色字体|E:{str:string}&T:事件";
     * 注意：没有处理HTML标签
     * @param sourceText
     * @returns {Array}
     */
    TextFlowMaker.generateTextFlow1 = function (sourceText) {
        if (!sourceText) {
            return new egret.HtmlTextParser().parser("");
        }
        var textArr = sourceText.split("|");
        var result = [];
        for (var i = 0, len = textArr.length; i < len; i++) {
            var ele = TextFlowMaker.getSingleTextFlow(textArr[i]);
            if (ele.text && ele.text != "")
                result.push(ele);
        }
        return result;
    };
    TextFlowMaker.getOnlyName = function (sourceText) {
        if (!sourceText) {
            return "";
        }
        var index = sourceText.indexOf("<font");
        var str = sourceText;
        if (index != -1) {
            str = sourceText.slice(0, index);
        }
        return str;
    };
    TextFlowMaker.getSingleTextFlow1 = function (text) {
        var arrText = text.split("&T:", 2);
        if (arrText.length == 2) {
            var str = "<font";
            var textArr = arrText[0].split("&");
            var tempArr = void 0;
            var t = void 0;
            var underline = false;
            for (var i = 0, len = textArr.length; i < len; i++) {
                tempArr = textArr[i].split(":");
                switch (tempArr[0]) {
                    case TextFlowMaker.STYLE_SIZE:
                        str += " size=\"" + Math.floor(+tempArr[1]) + "\"";
                        break;
                    case TextFlowMaker.STYLE_COLOR:
                        str += " color=\"" + Math.floor(+tempArr[1]) + "\"";
                        break;
                    case TextFlowMaker.UNDERLINE_TEXT:
                        underline = true;
                        break;
                }
            }
            if (underline) {
                str += "><u>" + arrText[1] + "</u></font>";
            }
            else {
                str += ">" + arrText[1] + "</font>";
            }
            return str;
        }
        else {
            return '<font>' + text + '</font>';
        }
    };
    TextFlowMaker.getSingleTextFlow = function (text) {
        var arrText = text.split("&T:", 2);
        var textFlow = { "style": {} };
        if (arrText.length == 2) {
            var style = arrText[0];
            var textArr = text.split("&");
            var tempArr = void 0;
            for (var i = 0, len = textArr.length; i < len; i++) {
                tempArr = textArr[i].split(":");
                switch (tempArr[0]) {
                    case TextFlowMaker.STYLE_SIZE:
                        textFlow.style.size = +(tempArr[1]);
                        break;
                    case TextFlowMaker.STYLE_COLOR:
                        textFlow.style.textColor = +(tempArr[1]);
                        break;
                    case TextFlowMaker.UNDERLINE_TEXT:
                        textFlow.style.underline = true;
                        break;
                    case TextFlowMaker.EVENT:
                        textFlow.style.href = "event:" + tempArr[1];
                        break;
                }
            }
            textFlow.text = arrText[1];
        }
        else {
            textFlow.text = text;
        }
        return textFlow;
    };
    /**
     * 获取中文数字,目前只支持1-9
     *
     */
    TextFlowMaker.getCStr = function (num) {
        if (TextFlowMaker.numberList[num]) {
            return TextFlowMaker.numberList[num];
        }
        else {
            return "";
        }
    };
    TextFlowMaker.STYLE_COLOR = "C";
    TextFlowMaker.STYLE_SIZE = "S";
    TextFlowMaker.PROP_TEXT = "T";
    TextFlowMaker.UNDERLINE_TEXT = "U";
    TextFlowMaker.EVENT = "E";
    TextFlowMaker.numberList = ["Zero", 'One', 'Two', 'Three', 'Fout', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
        'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty'];
    return TextFlowMaker;
}());
__reflect(TextFlowMaker.prototype, "TextFlowMaker");
var uint64 = (function () {
    function uint64(v) {
        this._lowUint = 0;
        this._highUint = 0;
        this.value = v;
    }
    uint64.prototype.isEqual = function (target) {
        if (!target)
            return false;
        return this._lowUint == target._lowUint && this._highUint == target._highUint;
    };
    uint64.prototype.isGreaterThan = function (target) {
        if (target instanceof uint64)
            return this._highUint > target._highUint || (this._highUint == target._highUint && this._lowUint > target._lowUint);
        else {
            var u64 = new uint64();
            if (typeof target == 'string') {
                u64.value = target;
                return this.isGreaterThanOrEqual(u64);
            }
            if (typeof target == 'number') {
                u64.value = target.toString();
                return this.isGreaterThanOrEqual(u64);
            }
        }
    };
    uint64.prototype.isGreaterThanOrEqual = function (target) {
        if (target instanceof uint64)
            return this._highUint > target._highUint || (this._highUint == target._highUint && this._lowUint >= target._lowUint);
        else {
            var u64 = new uint64();
            if (typeof target == 'string') {
                u64.value = target;
                return this.isGreaterThanOrEqual(u64);
            }
            if (typeof target == 'number') {
                u64.value = target.toString();
                return this.isGreaterThanOrEqual(u64);
            }
        }
    };
    Object.defineProperty(uint64.prototype, "isZero", {
        get: function () {
            return this._lowUint == 0 && this._highUint == 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(uint64.prototype, "isGreaterThanZero", {
        /** 是否大于0 */
        get: function () {
            return this._lowUint > 0 || this._highUint > 0;
        },
        enumerable: true,
        configurable: true
    });
    uint64.prototype.writeByte = function (b) {
        b.writeUnsignedInt(this._lowUint);
        b.writeUnsignedInt(this._highUint);
    };
    uint64.prototype.setValue = function (lowerUint, higherUint) {
        if (lowerUint === void 0) { lowerUint = 0; }
        if (higherUint === void 0) { higherUint = 0; }
        this._lowUint = lowerUint;
        this._highUint = higherUint;
    };
    Object.defineProperty(uint64.prototype, "value", {
        set: function (v) {
            if (v instanceof egret.ByteArray) {
                this._lowUint = v.readUnsignedInt();
                this._highUint = v.readUnsignedInt();
            }
            else if (typeof v == 'string') {
                uint64.stringToUint64(v, 10, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(uint64.prototype, "valueByString", {
        set: function (value) {
            var num = 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 左移运算
     * @param num
     * @return
     */
    uint64.prototype.leftMove = function (num, result) {
        if (result === void 0) { result = null; }
        result = result || this;
        var bitMask = uint64.LeftMoveMask[num];
        var lowUintMaskNum = bitMask & this._lowUint;
        lowUintMaskNum = lowUintMaskNum >>> (32 - num);
        result._lowUint = this._lowUint << num;
        result._highUint = this._highUint << num;
        result._highUint = result._highUint | lowUintMaskNum;
    };
    /**
     *加法
     * @param value
     * @param result
     */
    uint64.prototype.add = function (value, result) {
        if (result === void 0) { result = null; }
        result = result || this;
        var num = this._lowUint + value._lowUint;
        result._highUint = this._highUint + value._highUint;
        if (num >= uint64.MaxLowUint) {
            result._highUint++;
            result._lowUint = num - uint64.MaxLowUint;
        }
        else {
            result._lowUint = num;
        }
    };
    /** 减法 */
    uint64.prototype.subtraction = function (value, result) {
        if (result === void 0) { result = null; }
        result = result || this;
        var num = this._lowUint - value._lowUint;
        result._highUint = this._highUint - value._highUint;
        if (num < 0) {
            result._highUint--;
            result._lowUint = num + uint64.MaxLowUint;
        }
        else {
            result._lowUint = num;
        }
    };
    /**
     * @param value
     * 注意value值不可过大，否则会计算错误
     */
    uint64.prototype.scale = function (value, result) {
        if (result === void 0) { result = null; }
        result = result || this;
        var num = this._lowUint * value;
        result._highUint = this._highUint * value;
        result._highUint += Math.floor(Math.abs(num / uint64.MaxLowUint));
        result._lowUint = num % uint64.MaxLowUint;
    };
    uint64.prototype.toString = function (radix) {
        if (radix === void 0) { radix = 10; }
        var result = "";
        var lowUint = this._lowUint;
        var highUint = this._highUint;
        var highRemain;
        var lowRemain;
        var tempNum;
        while (highUint != 0 || lowUint != 0) {
            highRemain = (highUint % radix);
            tempNum = highRemain * uint64.MaxLowUint + lowUint;
            lowRemain = tempNum % radix;
            result = lowRemain + result;
            highUint = (highUint - highRemain) / radix;
            lowUint = (tempNum - lowRemain) / radix;
        }
        return result.length ? result : "0";
    };
    /**
     *根据字符串导出成64位数据结构
     * @param value
     * @return
     */
    uint64.stringToUint64 = function (value, radix, result) {
        if (radix === void 0) { radix = 10; }
        if (result === void 0) { result = null; }
        result = result || new uint64;
        var lowUint = 0;
        var highUint = 0;
        var tempNum;
        var len = value.length;
        var char;
        for (var i = 0; i < len; i++) {
            char = parseInt(value.charAt(i));
            tempNum = lowUint * radix + char;
            highUint = highUint * radix + Math.floor(tempNum / uint64.MaxLowUint);
            lowUint = tempNum % uint64.MaxLowUint;
        }
        result.setValue(lowUint, highUint);
        return result;
    };
    uint64.LeftMoveMask = [0,
        0x80000000, 0x40000000, 0x20000000, 0x10000000,
        0x08000000, 0x04000000, 0x02000000, 0x01000000,
        0x00800000, 0x00400000, 0x00200000, 0x00100000,
        0x00080000, 0x00040000, 0x00020000, 0x00010000,
        0x00008000, 0x00004000, 0x00002000, 0x00001000,
        0x00000800, 0x00000400, 0x00000200, 0x00000100,
        0x00000080, 0x00000040, 0x00000020, 0x00000010,
        0x00000008, 0x00000004, 0x00000002, 0x00000001,
    ];
    uint64.MaxLowUint = 0xffffffff + 1;
    return uint64;
}());
__reflect(uint64.prototype, "uint64");
/**
 * Created by hrz on 2017/7/3.
 */
var WatcherUtil = (function () {
    function WatcherUtil() {
    }
    WatcherUtil.removeFromArrayCollection = function (dataPro) {
        if (dataPro && dataPro.source && dataPro.source.length) {
            WatcherUtil.removeFromArray(dataPro.source);
        }
    };
    WatcherUtil.removeFromArray = function (dataPro) {
        if (!dataPro)
            return;
        for (var _i = 0, dataPro_1 = dataPro; _i < dataPro_1.length; _i++) {
            var source = dataPro_1[_i];
            WatcherUtil.removeFromObject(source);
        }
    };
    WatcherUtil.removeFromObject = function (obj) {
        if (obj instanceof egret.EventDispatcher) {
            var event_1 = obj.$getEventMap();
            var list = event_1[eui.PropertyEvent.PROPERTY_CHANGE];
            if (list) {
                for (var index = list.length - 1; index >= 0; index--) {
                    var obj_1 = list[index];
                    if (obj_1.thisObject instanceof eui.Watcher) {
                        obj_1.thisObject.unwatch();
                        list.splice(index, 1);
                    }
                }
            }
        }
        else {
            var listeners = obj['__listeners__'];
            if (listeners && listeners.length) {
                for (var i = 0; i < listeners.length; i += 2) {
                    // let listener:Function = listeners[i];
                    var target = listeners[i + 1];
                    if (target instanceof eui.Watcher) {
                        target.unwatch();
                        // listeners.splice(i,2);  //在 eui.Watcher 中的 unwatch 已经移除
                        i -= 2;
                    }
                }
            }
        }
    };
    return WatcherUtil;
}());
__reflect(WatcherUtil.prototype, "WatcherUtil");
var GameMainView = (function (_super) {
    __extends(GameMainView, _super);
    function GameMainView() {
        var _this = _super.call(this) || this;
        //十分钟 时间戳  ms
        _this.awardBoxGetTime = 10 * 60 * 1000;
        _this.totalGetCount = 3;
        //宝箱领取金币
        _this.goldGetNum = 50;
        //当前波数
        _this.curCount = 1;
        //当前关卡总波数
        _this.totalCount = 1;
        _this._entitys = [];
        _this._ownEntitys = [];
        _this._levelEntitys = [];
        _this._singleFrame = 33.3;
        _this._curTime = 0;
        _this.actionExecStandTime = 1000;
        _this.showBlood = false;
        _this.rebornids = ["1000", "1001", "1002", "1003", "1004", "1005", "1006", "1007", "1008", "1009"];
        _this.extraBattle = false;
        _this.releaseSkill101 = false;
        _this.releaseSkill102 = false;
        _this.releaseSkill103 = false;
        _this.releaseSkill104 = false;
        return _this;
    }
    GameMainView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.alpha = 0;
        this._entitys = [];
        this._ownEntitys = [];
        this._levelEntitys = [];
        this.pos1["changeSize"]();
        this.pos2["changeSize"]();
        this.clickRect["changeSize"]();
        this.monGroup["autoSize"]();
        for (var i = 1; i <= 5; i++) {
            var skill1Level = egret.localStorage.getItem(LocalStorageEnum.SKILL_LEVEL + (100 + i));
            if (!skill1Level) {
                egret.localStorage.setItem(LocalStorageEnum.SKILL_LEVEL + (100 + i), "1");
            }
        }
        var skillCfg = egret.localStorage.getItem(LocalStorageEnum.REBORNCFG);
        if (!!skillCfg) {
            GameApp.skillCfg = JSON.parse(skillCfg);
        }
        var arr = [];
        arr = arr.concat(SkillCfg.skillCfg);
        var boo2 = GameApp.skillCfg ? true : false;
        if (!boo2) {
            GameApp.skillCfg = {};
            for (var i = 0; i < arr.length; i++) {
                GameApp.skillCfg[arr[i].skillId] = arr[i];
            }
            for (var i = 0; i < 10; i++) {
                var item = { skillId: 1000 + i, rebornId: 1, skillIcon: "skill_103_png", skillTitle: "skill_103_title_png", level: 1, desc: "神将", atk: 50, hp: 550, atkDis: 100, cost: 100, skillType: 1 };
                if (!GameApp.skillCfg[item.skillId]) {
                    GameApp.skillCfg[item.skillId] = item;
                }
            }
        }
        this.progressBar.mask = this.progressMark;
        this.totalHp = this.curHp = 50 * GameApp.level + 950;
        this.touchEnabled = false;
        this.touchChildren = false;
        this.addTouchEvent(this.settingBtn, this.onSetHandler, true);
        this.arraycollect = new eui.ArrayCollection();
        this.list.itemRenderer = SkilItem;
        this.list.dataProvider = this.arraycollect;
        this.scroller.viewport = this.list;
        var data = SkillCfg.skillCfg;
        this.arraycollect.source = data;
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        StageUtils.inst().getStage().addEventListener(StartGameEvent.CLICK_GUIDE_SKILL, this.onClickGuideSkill, this);
        StageUtils.inst().getStage().addEventListener(StartGameEvent.USE_GUIDE_SKILL, this.onUseGuideSkill, this);
        this.awardBox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardGet, this);
        this.timer = new egret.Timer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        MessageManager.inst().addListener("start", this.onStart, this);
        MessageManager.inst().addListener("end", this.onStop, this);
        MessageManager.inst().addListener(CustomEvt.CANCLESKILLCDPAUSE, this.cancleSkillCdPause, this);
        this.refreshRewardBoxState();
        var boo = this.changeTime();
        if (boo) {
            this.timer.start();
        }
        this.goldWatcher = eui.Binding.bindHandler(GameApp, ["roleGold"], this.roleGoldChange, this);
        this.gemWatcher = eui.Binding.bindHandler(GameApp, ["roleGem"], this.roleGemChange, this);
        // this.addTouchEvent(this.addGemBtn,this.onaddGem,true);
        this.addTouchEvent(this.addGoldBtn, this.onaddGold, true);
        this.addTouchEvent(this.upgradeBtn, this.onUpgrade, true);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEnd, this);
        MessageManager.inst().addListener(CustomEvt.REDUCE_HP, this.onTowerHpReduce, this);
        MessageManager.inst().addListener(CustomEvt.BOSS_RELEASESKILL, this.onBossReleaseSkill, this);
        MessageManager.inst().addListener("closeMain", this.onCloseMain, this);
        this.blood.visible = false;
        eui.Binding.bindHandler(GameApp, ["level"], this.onLevelChange, this);
        this.descLab.visible = false;
        this.descLab.alpha = 0;
        this.createLevelMonster();
        // 
    };
    GameMainView.prototype.onCloseMain = function () {
        // egret.Tween.removeAllTweens();
        ViewManager.inst().close(GameMainView);
        ViewManager.inst().open(StartGameView);
    };
    GameMainView.prototype.onStart = function () {
        // if(!GameApp.gameaEnd){
        egret.startTick(this.execAction, this);
        // }
    };
    GameMainView.prototype.onStop = function () {
        egret.stopTick(this.execAction, this);
        // egret.Tween.removeAllTweens();
        for (var i = 0; i < this._ownEntitys.length; i++) {
            egret.Tween.removeTweens(this._ownEntitys[i]);
        }
        for (var j = 0; j < this._levelEntitys.length; j++) {
            egret.Tween.removeTweens(this._levelEntitys[j]);
        }
    };
    GameMainView.prototype.onBegin = function (evt) {
        var _this = this;
        if (this.releaseSkill102 && evt.target == this.clickRect) {
            if (!this.skillrelease || (this.skillrelease && this.skillrelease != 102)) {
                this.skillrelease = 102;
                this.curItem.setCd();
                var skillCfg = GameApp.skillCfg[102];
                this.hideSkillUse();
                if (skillCfg.buffTime) {
                    this.showSkillUseTime(skillCfg.buffTime);
                }
            }
            var self_3 = this;
            this.beginPoint = new egret.Point(evt.stageX, evt.stageY);
            this.skill102 = new eui.Image("skill_102_pic_png");
            this.addChild(this.skill102);
            this.skill102.scaleX = this.skill102.scaleY = 0.5;
            this.skill102.anchorOffsetX = this.skill102.width >> 1;
            this.skill102.anchorOffsetY = this.skill102.height >> 1;
            this.skill102.x = evt.stageX;
            this.skill102.y = evt.stageY;
            GlobalFun.lighting(this.skill102, 0xF41AE3);
            this.interval = setInterval(function () {
                for (var i = 0; i < _this._levelEntitys.length; i++) {
                    var dis = egret.Point.distance(new egret.Point(_this._levelEntitys[i].x, _this._levelEntitys[i].y), new egret.Point(_this.skill102.x, _this.skill102.y));
                    if (dis <= 100) {
                        _this._levelEntitys[i].reduceHp(GameApp.skillCfg[102].atk + ((GameApp.skillCfg[102].atk * 0.2 * GlobalFun.getIndex()) >> 0));
                        egret.Tween.removeTweens(_this._levelEntitys[i]);
                        _this._levelEntitys[i].x -= ((Math.random() * 40) >> 0);
                        _this._levelEntitys[i].isInAtk = false;
                    }
                }
            }, 150);
        }
    };
    GameMainView.prototype.showSkillUseTime = function (time) {
        var _this = this;
        if (this.skillInterval) {
            return;
        }
        this.skillUseGroup.visible = true;
        var self = this;
        this.bar.mask = this.barMask;
        var count = 0;
        this.proTxt.text = "施法时间:" + time;
        this.skillInterval = setInterval(function () {
            count += 1;
            var precentw = 300 - count / time * 300;
            _this.proTxt.text = "施法时间:" + (time - count);
            self.barMask.width = precentw;
            if (count >= time) {
                clearInterval(self.skillInterval);
                if (self.curItem) {
                    self.curItem.focus = false;
                    self.curItem = null;
                    self.skillrelease = null;
                    self.releaseSkill101 = self.releaseSkill102 = false;
                    self.hideSkillUse();
                }
            }
        }, 1000);
    };
    GameMainView.prototype.hideSkillUse = function () {
        this.skillUseGroup.visible = false;
        this.barMask.width = 300;
        if (this.skillInterval) {
            clearInterval(this.skillInterval);
            this.skillInterval = null;
        }
    };
    GameMainView.prototype.onEnd = function (evt) {
        if (this.skill102) {
            if (this.interval) {
                clearInterval(this.interval);
            }
            this.skill102.parent.removeChild(this.skill102);
            this.skill102 = null;
        }
    };
    GameMainView.prototype.onMove = function (evt) {
        if (this.skill102 && this.releaseSkill102) {
            this.skill102.x = evt.stageX;
            this.skill102.y = evt.stageY;
            var angle = Math.atan2(evt.stageY - this.beginPoint.y, evt.stageX - this.beginPoint.x) * 180 / Math.PI;
            var rotation = 0;
            if ((angle >= -30 && angle <= 0) || (angle > 0 && angle <= 30)) {
                rotation = 0;
            }
            else if (angle > 30 && angle <= 70) {
                rotation = 45;
            }
            else if ((angle > 70 && angle <= 120)) {
                rotation = 90;
            }
            else if (angle > 120 && angle <= 150) {
                rotation = 135;
            }
            else if ((angle > 150 && angle <= 180) || (angle > -180 && angle <= -150)) {
                rotation = 180;
            }
            else if (angle > -150 && angle <= -120) {
                rotation = 225;
            }
            else if (angle > -120 && angle <= -70) {
                rotation = -90;
            }
            else {
                rotation = -45;
            }
            this.skill102.rotation = rotation;
            this.beginPoint.x = evt.stageX;
            this.beginPoint.y = evt.stageY;
        }
        else {
            this.onEnd(null);
        }
    };
    GameMainView.prototype.onBossReleaseSkill = function (evt) {
        var index = ((Math.random() * 9 + 1) >> 0);
        // let xy:XY = {x:this._levelEntitys[0].x,y:this._levelEntitys[0].y};
        GlobalFun.createSkillEff(-1, index, this, 2, evt.data.xy);
        for (var i = 0; i < this._ownEntitys.length; i++) {
            var dmg_1 = (GameApp.level) * ((Math.random() * 10) >> 0);
            this._ownEntitys[i].reduceHp(dmg_1);
        }
        var dmg = (GameApp.level) * ((Math.random() * 10) >> 0);
        this.curHp -= dmg;
        this.onTowerHpReduce({ data: { hp: dmg } });
    };
    GameMainView.prototype.onTowerHpReduce = function (evt) {
        var _this = this;
        this.curHp -= evt.data.hp;
        if (this.curHp <= 0) {
            this.curHp = 0;
            this.progressMark.width = this.curHp / this.totalHp * 277;
            this.gameFail();
        }
        if (!this.showBlood) {
            this.showBlood = true;
            this.blood.visible = true;
            this.blood.alpha = 0;
            egret.Tween.get(this.blood).to({ alpha: 1 }, 600).to({ alpha: 0 }, 600).to({ alpha: 1 }, 600).to({ alpha: 0 }, 600).call(function () {
                egret.Tween.removeTweens(_this.blood);
                _this.blood.visible = false;
                _this.showBlood = false;
            }, this);
        }
        this.showDmg(evt.data.hp);
        this.progressMark.width = this.curHp / this.totalHp * 277;
    };
    GameMainView.prototype.showDmg = function (dmg) {
        var dmgfont = new eui.BitmapLabel();
        dmgfont.scaleX = dmgfont.scaleY = 0.7;
        dmgfont.font = "dmg_fnt";
        this.addChild(dmgfont);
        dmgfont.text = "-" + Math.floor(dmg);
        dmgfont.bottom = 80;
        dmgfont.right = 150 + ((Math.random() * 50) >> 0);
        egret.Tween.get(dmgfont).to({ bottom: dmgfont.bottom + 100 }, 600 + ((Math.random() * 400) >> 0), egret.Ease.circIn).call(function () {
            egret.Tween.removeTweens(dmgfont);
            if (dmgfont && dmgfont.parent) {
                dmgfont.parent.removeChild(dmgfont);
            }
        }, this);
    };
    GameMainView.prototype.gameFail = function () {
        egret.stopTick(this.execAction, this);
        this.timer.stop();
        this.curReborns = null;
        GameApp.gameaEnd = true;
        var self = this;
        this.releaseSkill101 = this.releaseSkill102 = this.releaseSkill103 = this.releaseSkill104 = false;
        this.skillrelease = null;
        this.hideSkillUse();
        if (this.curItem) {
            this.curItem.focus = false;
            this.curItem = null;
        }
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            ViewManager.inst().open(BattleResultPopUp, [{ state: 0, cb: self.gameEnd, arg: self }]);
        }, 2000);
        console.log("游戏结束");
    };
    GameMainView.prototype.gameWin = function () {
        egret.stopTick(this.execAction, this);
        this.timer.stop();
    };
    GameMainView.prototype.gameEnd = function (param) {
        this.curReborns = null;
        this.rebornids = ["1000", "1001", "1002", "1003", "1004", "1005", "1006", "1007", "1008", "1009"];
        egret.stopTick(this.execAction, this);
        egret.Tween.removeAllTweens();
        this.descLab.visible = false;
        for (var i = 0; i < this._entitys.length; i++) {
            if (this._entitys[i] && this._entitys[i].parent) {
                this._entitys[i].parent.removeChild(this._entitys[i]);
            }
        }
        for (var i = 0; i < this._ownEntitys.length; i++) {
            if (this._ownEntitys[i] && this._ownEntitys[i].parent) {
                this._ownEntitys[i].dispose();
            }
        }
        for (var i = 0; i < this._levelEntitys.length; i++) {
            if (this._levelEntitys[i] && this._levelEntitys[i].parent) {
                this._levelEntitys[i].dispose();
            }
        }
        this._entitys = [];
        this._ownEntitys = [];
        this._levelEntitys = [];
        if (param == BattleResultPopUp.OPER_EXIT) {
            ViewManager.inst().close(GameMainView);
            ViewManager.inst().open(StartGameView);
        }
        else if (param == BattleResultPopUp.OPER_CONTINUE) {
            this.reset();
        }
        else if (param == BattleResultPopUp.OPER_NEXT) {
            var self_4 = this;
            GameApp.level += 1;
            for (var i = 0; i < this._ownEntitys.length; i++) {
                if (this._ownEntitys[i] && this._ownEntitys[i].parent) {
                    this._ownEntitys[i].dispose();
                }
            }
            this._entitys = [];
            this._ownEntitys = [];
            this._levelEntitys = [];
            var skillItem = this.list.getChildAt(2);
            skillItem.num = 10;
            for (var j = 0; j < this.list.numChildren; j++) {
                var item = this.list.getChildAt(2);
                item.removeCd();
            }
            var timeout_4 = setTimeout(function () {
                clearTimeout(timeout_4);
                self_4.showLevelTxt(function () {
                    self_4.createLevelMonster();
                    egret.startTick(self_4.execAction, self_4);
                });
            }, 1200);
        }
    };
    GameMainView.prototype.reset = function () {
        for (var i = 0; i < this._entitys.length; i++) {
            if (this._entitys[i] && this._entitys[i].parent) {
                this._entitys[i].parent.removeChild(this._entitys[i]);
            }
        }
        for (var i = 0; i < this.list.numChildren; i++) {
            var item = this.list.$children[i];
            if (item) {
                item.removeCd();
            }
        }
        this.rebornids = ["1000", "1001", "1002", "1003", "1004", "1005", "1006", "1007", "1008", "1009"];
        this.curReborns = null;
        this._entitys = [];
        this._ownEntitys = [];
        this._levelEntitys = [];
        this.curCount = 1;
        this.countNumLab.text = this.curCount + "/" + this.totalCount;
        this.totalHp = this.curHp = 50 * GameApp.level + 950;
        this.list.$children[2].num = 10;
        this.touchEnabled = false;
        this.touchChildren = false;
        this.refreshRewardBoxState();
        var boo = this.changeTime();
        if (boo) {
            this.timer.start();
        }
        this.blood.visible = false;
        this.descLab.visible = false;
        this.descLab.alpha = 0;
        this.createLevelMonster();
        this.initialize();
    };
    /**创建关卡怪物 */
    GameMainView.prototype.createLevelMonster = function (cx) {
        var _this = this;
        var count = ((GameApp.level / 5) >> 0) + 1;
        var centery = this.clickRect.y + 150;
        var centerx = -270;
        for (var i = 0; i < count; i++) {
            var shapIndex = (Math.random() * 6) >> 0;
            var monsterCfg = GlobalFun.getMonsterCfg();
            var index = (Math.random() * monsterCfg.length) >> 0;
            if (GameApp.level <= 11) {
                index = GameApp.level;
            }
            var monsterVo = monsterCfg[index];
            monsterVo.atk = 2 * GameApp.level + 18 + (2 * GameApp.level + 18) * 0.2 * this.direct();
            monsterVo.hp = 10 * GameApp.level + 90 + (10 * GameApp.level + 90) * 0.2 * this.direct();
            SoldierShapeEntity.inst().initData(shapIndex, monsterVo.model, monsterVo.id, this, { x: centerx, y: centery }, function (arr) {
                _this._levelEntitys = _this._levelEntitys.concat(arr);
                _this._entitys = _this._entitys.concat(arr);
            }, this);
            var boss = new SoldierEntity();
            this.addChild(boss);
            boss.general = true;
            var bossCfgs = GlobalFun.getBossCfg();
            var bossIndex = (Math.random() * bossCfgs.length) >> 0;
            if (GameApp.level <= 9) {
                bossIndex = GameApp.level - 1;
            }
            centerx -= 330;
            var bossVo = bossCfgs[bossIndex];
            bossVo.atk = 5 * GameApp.level + 45 + (5 * GameApp.level + 45) * 0.2 * this.direct();
            bossVo.hp = 30 * GameApp.level + 800 + this.direct() * (30 * GameApp.level + 270) * 0.2;
            boss.setSoldierData(-1, bossVo.model, bossVo);
            this._levelEntitys.push(boss);
            this._entitys.push(boss);
            boss.y = this.clickRect.y + (this.clickRect.height >> 1);
            boss.x = centerx;
            centerx -= 750;
        }
        this.dealLayerRelation();
    };
    GameMainView.prototype.direct = function () {
        var index = (Math.random() * 100) >> 0;
        return index > 50 ? 1 : -1;
    };
    /**创建我方神将 */
    GameMainView.prototype.createOwnGenral = function (xy) {
        var _this = this;
        var soldierEntity = new SoldierEntity();
        // let rebornSkillId:number = 1000 + ((Math.random()*10)>>0);
        if (!this.curReborns || (this.curReborns && !this.curReborns.length)) {
            this.curReborns = [];
            for (var key in GameApp.reborns) {
                var index = this.rebornids.indexOf(key);
                if (index != -1) {
                    this.rebornids.splice(index, 1);
                    this.curReborns.push(GameApp.reborns[key]);
                }
            }
        }
        var rebornsId = 1;
        if (this.curReborns && this.curReborns.length) {
            var rebornItem = this.curReborns.shift();
            rebornsId = rebornItem[0];
        }
        var skillres = "skill_103_" + rebornsId;
        var cardVo = GlobalFun.getSkillGeneralCfg(rebornsId);
        if (rebornsId == 2) {
            cardVo.atkspd *= 2;
        }
        else if (rebornsId == 3) {
            cardVo.atk *= 2;
            cardVo.hp *= 2;
        }
        else if (rebornsId == 4) {
            cardVo.atk *= 4;
        }
        soldierEntity.setSoldierData(1, skillres, cardVo);
        this.addChild(soldierEntity);
        soldierEntity.alpha = 0;
        soldierEntity.x = xy.x;
        soldierEntity.y = xy.y;
        var birthEff = new MovieClip();
        this.addChild(birthEff);
        birthEff.scaleX = birthEff.scaleY = 0.8;
        birthEff.playFile(EFFECT + "birth", 1, null, true);
        birthEff.x = xy.x;
        birthEff.y = xy.y;
        egret.Tween.get(soldierEntity).to({ alpha: 1 }, 600, egret.Ease.circIn).call(function () {
            _this._ownEntitys.push(soldierEntity);
            _this._entitys.push(soldierEntity);
        }, this);
    };
    GameMainView.prototype.execAction = function (timespan) {
        this._curTime += this._singleFrame;
        if (this._curTime >= this.actionExecStandTime) {
            this._curTime = 0;
            this.action(1);
            this.action(-1);
        }
        return false;
    };
    GameMainView.prototype.action = function (camp) {
        var ownEntitys = camp == 1 ? this._ownEntitys : this._levelEntitys;
        var levelEntitys = camp == 1 ? this._levelEntitys : this._ownEntitys;
        var _loop_2 = function (i) {
            var item = ownEntitys[i];
            if (item.isDead) {
                for (var j = 0; j < this_2._entitys.length; j++) {
                    if (this_2._entitys[j] == item) {
                        this_2._entitys.splice(j, 1);
                        break;
                    }
                }
                var deathMc = new MovieClip();
                this_2.addChild(deathMc);
                deathMc.x = item.x;
                deathMc.y = item.y;
                deathMc.playFile(EFFECT + "death", 1);
                item.dispose();
                ownEntitys.splice(i, 1);
                i -= 1;
                return out_i_1 = i, "continue";
            }
            else {
                if (camp == -1) {
                    var guidepassStr = egret.localStorage.getItem(LocalStorageEnum.IS_PASS_GUIDE);
                    if (!guidepassStr) {
                        if (item.x >= 100) {
                            this_2.onStop();
                            this_2.touchEnabled = true;
                            this_2.touchChildren = true;
                            egret.localStorage.setItem(LocalStorageEnum.IS_PASS_GUIDE, "1");
                            ViewManager.inst().open(GuideView);
                            var item_1 = this_2.list.getChildAt(2);
                            this_2.guideView = ViewManager.inst().getView(GuideView);
                            this_2.guideView.nextStep({ id: "1_1", comObj: item_1, width: 75, height: 75 });
                            return { value: void 0 };
                        }
                    }
                }
                var atkItem = void 0;
                atkItem = this_2.getNearByEntity(item, levelEntitys);
                if (camp == 1) {
                    if (atkItem && atkItem.x >= this_2.clickRect.x + 50) {
                        item.lookAt(atkItem);
                    }
                }
                else {
                    if (!item.isInAtk) {
                        item.lookAt(atkItem, true);
                    }
                }
                if (item.isInAtkDis()) {
                    //在攻击距离
                    // console.log("进入攻击距离");
                    item.execAtkAction();
                }
                else {
                    if (!item.playState) {
                        if (item.atkTar && !item.atkTar.isDead && camp == 1) {
                            item.execMoveAction();
                            if (this_2.checkXBlock(1, item, this_2._ownEntitys)) {
                                //x轴有阻挡
                                var moveY = item.y + (((Math.random() * 100) >> 0) > 50 ? 1 : -1) * 40;
                                if (moveY >= this_2.clickRect.y + this_2.clickRect.height || moveY <= this_2.clickRect.y) {
                                    item.execStandAction();
                                    egret.Tween.removeTweens(item);
                                }
                                else {
                                    item.execYmoveAction(moveY);
                                }
                            }
                        }
                        else {
                            if (camp == -1) {
                                var xy = { x: StageUtils.inst().getWidth() - 200, y: item.y };
                                item.execMoveAction({ x: xy.x, y: xy.y }, function () {
                                    //当前移动到了塔的附近 到达了攻击距离 //执行攻击
                                    item.unlookAt();
                                    item.isInAtk = true;
                                }, this_2);
                            }
                            else {
                                egret.Tween.removeTweens(item);
                                // item.execStandAction();
                                item.execMoveAction({ x: (this_2.clickRect.x + this_2.clickRect.width - 100 - ((Math.random() * 150) >> 0)), y: item.y });
                            }
                        }
                    }
                    // if(this.checkXBlock(camp,item,ownEntitys)){
                    // 	item.waitMoveAction();
                    // }
                }
            }
            out_i_1 = i;
        };
        var this_2 = this, out_i_1;
        for (var i = 0; i < ownEntitys.length; i++) {
            var state_1 = _loop_2(i);
            i = out_i_1;
            if (typeof state_1 === "object")
                return state_1.value;
        }
        if (this._levelEntitys.length <= 0) {
            //当前波数战斗完毕 。进行下一波
            this.execNextCount();
            egret.stopTick(this.execAction, this);
        }
        this.dealLayerRelation();
    };
    GameMainView.prototype.execNextCount = function () {
        var _this = this;
        if (this.curCount >= this.totalCount) {
            //当前波数也已经打完 进行下一关;
            if (!this.extraBattle) {
                var index = (Math.random() * 100) >> 0;
                if (index >= 80) {
                    //触发隐藏关卡；
                    this.extraBattle = true;
                    var count = (Math.random() * 15 + 10) >> 0;
                    var num_1 = count;
                    var _loop_3 = function (i) {
                        var transres = ((Math.random() * 100) >> 0) > 50 ? EFFECT + "trans" : EFFECT + "trans2";
                        var mc = new MovieClip();
                        mc.scaleX = mc.scaleY = 0.6;
                        mc.playFile(transres, 3, null, true);
                        this_3.addChild(mc);
                        mc.x = (Math.random() * (this_3.clickRect.width - 350) + this_3.clickRect.x + 80) >> 0;
                        mc.y = (Math.random() * (this_3.clickRect.height - 30) + this_3.clickRect.y + 50) >> 0;
                        var monsterCfg = GlobalFun.getMonsterCfg();
                        var index_2 = (Math.random() * monsterCfg.length) >> 0;
                        var monsterVo = monsterCfg[index_2];
                        monsterVo.atk = 2 * GameApp.level + 18 + (2 * GameApp.level + 18) * 0.2 * this_3.direct();
                        monsterVo.hp = 10 * GameApp.level + 90 + (10 * GameApp.level + 90) * 0.2 * this_3.direct();
                        var monsterEntity = new SoldierEntity();
                        monsterEntity.setSoldierData(-1, monsterVo.model, monsterVo);
                        this_3.addChild(monsterEntity);
                        monsterEntity.x = mc.x;
                        monsterEntity.y = mc.y;
                        monsterEntity.alpha = 0;
                        egret.Tween.get(monsterEntity).to({ alpha: 1 }, 1000).call(function () {
                            _this._levelEntitys.push(monsterEntity);
                            _this._entitys.push(monsterEntity);
                            if (i >= num_1 - 1) {
                                egret.startTick(_this.execAction, _this);
                            }
                        }, this_3);
                    };
                    var this_3 = this;
                    for (var i = 0; i < num_1; i++) {
                        _loop_3(i);
                    }
                }
                else {
                    for (var i = 0; i < this.list.numChildren; i++) {
                        var item = this.list.$children[i];
                        if (item) {
                            item.removeCd();
                        }
                    }
                    this.extraBattle = false;
                    egret.stopTick(this.execAction, this);
                    this.curReborns = null;
                    GameApp.gameaEnd = true;
                    var self_5 = this;
                    this.releaseSkill101 = this.releaseSkill102 = this.releaseSkill103 = this.releaseSkill104 = false;
                    this.skillrelease = null;
                    this.hideSkillUse();
                    if (this.curItem) {
                        this.curItem.focus = false;
                        this.curItem = null;
                    }
                    var timeout_5 = setTimeout(function () {
                        clearTimeout(timeout_5);
                        ViewManager.inst().open(BattleResultPopUp, [{ state: 1, cb: self_5.gameEnd, arg: self_5 }]);
                    }, 2000);
                }
            }
            else {
                this.extraBattle = false;
                egret.stopTick(this.execAction, this);
                this.curReborns = null;
                GameApp.gameaEnd = true;
                var self_6 = this;
                this.releaseSkill101 = this.releaseSkill102 = this.releaseSkill103 = this.releaseSkill104 = false;
                this.skillrelease = null;
                this.hideSkillUse();
                if (this.curItem) {
                    this.curItem.focus = false;
                    this.curItem = null;
                }
                var timeout_6 = setTimeout(function () {
                    clearTimeout(timeout_6);
                    ViewManager.inst().open(BattleResultPopUp, [{ state: 1, cb: self_6.gameEnd, arg: self_6 }]);
                }, 2000);
            }
        }
        else {
            //打下一波；
            this.curCount += 1;
            this.countNumLab.text = this.curCount + "/" + this.totalCount;
            var self_7 = this;
            this.curReborns = null;
            this.rebornids = ["1000", "1001", "1002", "1003", "1004", "1005", "1006", "1007", "1008", "1009"];
            this.releaseSkill101 = this.releaseSkill102 = this.releaseSkill103 = this.releaseSkill104 = false;
            this.skillrelease = null;
            this.hideSkillUse();
            if (this.curItem) {
                this.curItem.focus = false;
                this.curItem = null;
            }
            this.showLevelTxt(function () {
                self_7.createLevelMonster();
                egret.startTick(_this.execAction, _this);
            }, this.curCount);
        }
    };
    /**处理层级显示关系 */
    GameMainView.prototype.dealLayerRelation = function () {
        this._entitys.sort(this.sortFun);
        for (var i = 0; i < this._entitys.length; i++) {
            this.setChildIndex(this._entitys[i], 3 + i);
        }
    };
    GameMainView.prototype.sortFun = function (param1, param2) {
        var s1y = param1.y;
        var s2y = param2.y;
        if (s1y > s2y) {
            return 1;
        }
        else if (s1y < s2y) {
            return -1;
        }
        else {
            return 0;
        }
    };
    /**检测y轴是否有阻挡 */
    // private checkYBlock(camp:number,item:SoldierEntity,entitys:any[]):number{ 
    // 	let x:number = item.x;
    // 	let y:number = item.y;
    // 	let num:number = 0;
    // 	for(let i:number = 0;i<entitys.length;i++){
    // 		let otherItem:any = entitys[i];
    // 		if(item != otherItem){
    // 			let ox:number = otherItem.x;
    // 			let oy:number = otherItem.y;
    // 			if(oy > y && oy-y >= 40 && item.y <= (this.clickRect.y +this.clickRect.height -20)){
    // 				return 1;
    // 			}
    // 			if(oy < y && y-oy >= 40 && item.y >= this.clickRect.y + 20){
    // 				return -1
    // 			}
    // 		}
    // 	}
    // 	return num;
    // }
    /**检测X轴是否有阻挡 */
    GameMainView.prototype.checkXBlock = function (camp, item, entitys) {
        var x = item.x;
        var y = item.y;
        for (var i = 0; i < entitys.length; i++) {
            var otherItem = entitys[i];
            if (item != otherItem) {
                var ox = otherItem.x;
                var oy = otherItem.y;
                if (item.atkTar) {
                    var direct = item.x > item.atkTar.x ? 1 : -1;
                    var condition = false;
                    if (direct == 1) {
                        condition = (x - ox <= 40 && x > ox && Math.abs(y - oy) <= 20);
                    }
                    else {
                        condition = (ox - x <= 40 && ox > x && Math.abs(y - oy) <= 20);
                    }
                    if (condition) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    /**获取最近攻击单位 */
    GameMainView.prototype.getNearByEntity = function (atkEntity, soldiers) {
        var minEntity = soldiers.length > 1 ? soldiers[1] : soldiers[0]; //避免士兵第一个选择就是武将
        if (minEntity) {
            var dis = Math.sqrt(Math.pow(minEntity.x - atkEntity.x, 2) + Math.pow(minEntity.y - atkEntity.y, 2));
            // let len:number = soldiers.length;
            // if(len >= 15){
            // 	len = 15;
            // }
            // let index:number = (Math.random()*len)>>0;
            // minEntity = soldiers[index];
            for (var i = 0; i < soldiers.length; i++) {
                // if(atkEntity.general){
                // 	if(soldiers[i].general){
                // 		minEntity = soldiers[i];
                // 		break;
                // 	}
                // }
                var item1 = soldiers[i];
                var dis2 = Math.sqrt(Math.pow(item1.x - atkEntity.x, 2) + Math.pow(item1.y - atkEntity.y, 2));
                if (dis2 <= dis) {
                    minEntity = item1;
                    dis = dis2;
                }
            }
        }
        return minEntity;
    };
    GameMainView.prototype.onTouchTap = function (evt) {
        if (this.releaseSkill103 && evt.target == this.clickRect) {
            //当前可以释放技人物;
            this.skillrelease = 103;
            this.hideSkillUse();
            if (this.curItem) {
                if ((!this.curItem.num)) {
                    //神将已经召唤完毕
                    UserTips.inst().showTips("已无更多的神将");
                }
                else {
                    this.createOwnGenral({ x: evt.stageX, y: evt.stageY });
                    this.curItem.num -= 1;
                }
            }
        }
        else if (this.releaseSkill101 && evt.target == this.clickRect) {
            var skillCfg = GameApp.skillCfg[101];
            if (!this.skillrelease || (this.skillrelease && this.skillrelease != 101)) {
                this.skillrelease = 101;
                this.curItem.setCd();
                this.hideSkillUse();
                if (skillCfg.buffTime) {
                    this.showSkillUseTime(skillCfg.buffTime);
                }
            }
            var skillMc = new MovieClip();
            this.addChild(skillMc);
            skillMc.playFile(SKILL_EFF + "skill_101", 1, null, true);
            skillMc.scaleX = skillMc.scaleY = 0.4;
            skillMc.x = evt.stageX;
            skillMc.y = evt.stageY;
            for (var i = 0; i < this._levelEntitys.length; i++) {
                var dis = egret.Point.distance(new egret.Point(this._levelEntitys[i].x, this._levelEntitys[i].y), new egret.Point(evt.stageX, evt.stageY));
                if (dis <= 100) {
                    this._levelEntitys[i].reduceHp(skillCfg.atk + ((skillCfg.atk * GlobalFun.getIndex() * 0.2) >> 0));
                }
            }
        }
        else if (this.releaseSkill102 && evt.target == this.clickRect) {
        }
        else if (this.releaseSkill104 && evt.target == this.clickRect) {
            if (this.curItem && this.curItem.isCd) {
                return;
            }
            var skillCfg_1 = GameApp.skillCfg[104];
            this.skillrelease = 104;
            this.curItem.setCd();
            this.hideSkillUse();
            var mc = new MovieClip();
            this.addChild(mc);
            mc.x = this.pos1.x;
            mc.y = this.pos1.y;
            var mc2 = new MovieClip();
            this.addChild(mc2);
            mc2.x = this.pos2.x;
            mc2.y = this.pos2.y;
            mc.playFile(SKILL_EFF + "skill_104_c", 1, null, true);
            mc2.playFile(SKILL_EFF + "skill_104_c", 1, null, true);
            var self_8 = this;
            var timeout_7 = setTimeout(function () {
                clearTimeout(timeout_7);
                GlobalFun.createSkillEff(1, 104, self_8, 2, { x: StageUtils.inst().getWidth() - 200, y: 200 }, self_8._levelEntitys, skillCfg_1.atk);
                GlobalFun.shakeObj(self_8, 7, 15, 5);
            }, 800);
        }
    };
    GameMainView.prototype.onLevelChange = function () {
        this.levelNumLab.text = GameApp.level.toString();
        this.totalCount = ((GameApp.level / GameApp.totalCount) >> 0) + 1;
        this.curCount = 1;
        if (this.totalCount >= GameApp.totalCount) {
            this.totalCount = GameApp.totalCount;
        }
        this.totalHp = this.curHp = 50 * GameApp.level + 950;
        // this.totalHp = this.curHp = GameApp.level*2000;
        this.countNumLab.text = this.curCount + "/" + this.totalCount;
        this.progressMark.width = this.curHp / this.totalHp * 277;
    };
    GameMainView.prototype.onaddGem = function () {
        ViewManager.inst().open(ShopPopUp, [{ selectIndex: 1 }]);
        this.pauseSkillCd();
    };
    GameMainView.prototype.onaddGold = function () {
        ViewManager.inst().open(ShopPopUp, [{ selectIndex: 0 }]);
        this.pauseSkillCd();
    };
    GameMainView.prototype.onUpgrade = function () {
        ViewManager.inst().open(UpgradePopUp);
        this.pauseSkillCd();
    };
    //技能cd暂停
    GameMainView.prototype.pauseSkillCd = function () {
        for (var i = 0; i < this.list.numChildren; i++) {
            var skillItem = this.list.getChildAt(i);
            if (skillItem) {
                skillItem.pauseCd();
            }
        }
    };
    GameMainView.prototype.cancleSkillCdPause = function () {
        for (var i = 0; i < this.list.numChildren; i++) {
            var skillItem = this.list.getChildAt(i);
            if (skillItem) {
                skillItem.canclePause();
            }
        }
    };
    GameMainView.prototype.showEffect = function () {
        var _this = this;
        egret.Tween.get(this.itemGroup).to({ top: 4 }, 300, egret.Ease.backOut).call(function () {
            egret.Tween.removeTweens(_this.itemGroup);
        }, this);
        egret.Tween.get(this.awardBox).to({ left: 17 }, 400, egret.Ease.backOut).call(function () {
            egret.Tween.removeTweens(_this.awardBox);
        }, this);
        egret.Tween.get(this.levelGroup).to({ top: 14 }, 500, egret.Ease.backOut).call(function () {
            egret.Tween.removeTweens(_this.levelGroup);
        }, this);
        egret.Tween.get(this.settingBtn).to({ right: 21 }, 600, egret.Ease.backOut).call(function () {
            egret.Tween.removeTweens(_this.settingBtn);
        }, this);
        egret.Tween.get(this.upgradeBtn).to({ right: 17 }, 700, egret.Ease.backOut).call(function () {
            egret.Tween.removeTweens(_this.upgradeBtn);
            _this.upred.right = 14;
        });
        egret.Tween.get(this.skillGroup).to({ right: -13 }, 800, egret.Ease.backOut).call(function () {
            egret.Tween.removeTweens(_this.skillGroup);
        }, this);
        egret.Tween.get(this.hpGroup).to({ bottom: 0 }, 900, egret.Ease.backOut).call(function () {
            egret.Tween.removeTweens(_this.hpGroup);
        }, this);
    };
    GameMainView.prototype.initialize = function (boo) {
        var _this = this;
        //初始化
        // this.upred.visible = false;
        var guidepassStr = egret.localStorage.getItem(LocalStorageEnum.IS_PASS_GUIDE);
        GameApp.gameaEnd = false;
        var bossnum = 0;
        if (boo) {
            if (!guidepassStr) {
                this.monImg.visible = true;
                this.monGroup.visible = true;
                egret.Tween.get(this).to({ alpha: 1 }, 1000).call(function () {
                    egret.Tween.removeTweens(_this);
                    var centerx = _this.monGroup.width - 200;
                    var txts = ["小的们,随本王出征", '列队！准备攻城!!!'];
                    for (var i = 0; i < 2; i++) {
                        var shapIndex = (Math.random() * 6) >> 0;
                        var monsterCfg = GlobalFun.getMonsterCfg();
                        var index = (Math.random() * monsterCfg.length) >> 0;
                        var monsterVo = monsterCfg[index];
                        SoldierShapeEntity.inst().initData(shapIndex, monsterVo.model, monsterVo.id, _this.monGroup, { x: centerx - i * 450, y: 100 }, function (arr) {
                            var _loop_4 = function (i_1) {
                                arr[i_1].alpha = 0;
                                var y = arr[i_1].y;
                                arr[i_1].y -= 200;
                                egret.Tween.get(arr[i_1]).wait(150 * i_1).to({ alpha: 1, y: arr[i_1].y + 200 }, 150, egret.Ease.backOut).call(function () {
                                    egret.Tween.removeTweens(arr[i_1]);
                                    if (i_1 >= arr.length - 1) {
                                        for (var j = 0; j < arr.length; j++) {
                                            arr[j].execOneTimeAtk(function (index) {
                                                if (index >= arr.length - 1) {
                                                    var txt_1 = new eui.Label();
                                                    _this.monGroup.addChild(txt_1);
                                                    txt_1.text = txts.shift();
                                                    txt_1.alpha = 0.3;
                                                    txt_1.scaleX = txt_1.scaleY = 5;
                                                    txt_1.anchorOffsetX = txt_1.width >> 1;
                                                    txt_1.anchorOffsetY = txt_1.height >> 1;
                                                    txt_1.y = 0;
                                                    txt_1.x = centerx;
                                                    egret.Tween.get(txt_1).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 600, egret.Ease.circOut).wait(300).call(function () {
                                                        egret.Tween.removeTweens(txt_1);
                                                    }, _this);
                                                    var boss_1 = new SoldierEntity();
                                                    boss_1.alpha = 0;
                                                    _this.monGroup.addChild(boss_1);
                                                    boss_1.general = true;
                                                    var bossCfgs = GlobalFun.getBossCfg();
                                                    var bossIndex = (Math.random() * bossCfgs.length) >> 0;
                                                    egret.Tween.get(boss_1).to({ alpha: 1 }, 600).call(function () {
                                                        egret.Tween.removeTweens(boss_1);
                                                    }, _this);
                                                    centerx -= 140;
                                                    var bossVo = bossCfgs[bossIndex];
                                                    boss_1.setSoldierData(-1, bossVo.model, bossVo);
                                                    boss_1.execOneTimeAtk(function (finalIndex) {
                                                        // if(this.monGroup){this.monGroup.visible = false};
                                                        // if(this.monImg){this.monImg.visible = false}
                                                        bossnum += 1;
                                                        if (bossnum >= 2) {
                                                            var rect_1 = new eui.Rect(StageUtils.inst().getWidth(), StageUtils.inst().getHeight(), 0x000000);
                                                            _this.addChild(rect_1);
                                                            rect_1.alpha = 0;
                                                            egret.Tween.get(rect_1).wait(2000).to({ alpha: 0.9 }, 1000).wait(300).call(function () {
                                                                if (_this.monGroup) {
                                                                    _this.monGroup.visible = false;
                                                                }
                                                                ;
                                                                if (_this.monImg) {
                                                                    _this.monImg.visible = false;
                                                                }
                                                                // this.monGroup.parent.removeChild(this.monGroup);
                                                                // this.monImg.parent.removeChild(this.monImg);
                                                            }, _this).to({ alpha: 0 }, 2000).call(function () {
                                                                rect_1.parent.removeChild(rect_1);
                                                                egret.Tween.removeTweens(rect_1);
                                                                _this.showEffect();
                                                                _this.showText();
                                                            }, _this);
                                                        }
                                                    }, _this, i_1);
                                                    boss_1.y = 200;
                                                    boss_1.x = centerx;
                                                    centerx -= 350;
                                                }
                                            }, _this, j);
                                        }
                                    }
                                }, _this);
                            };
                            for (var i_1 = 0; i_1 < arr.length; i_1++) {
                                _loop_4(i_1);
                            }
                        }, _this);
                    }
                    // 
                }, this);
            }
            else {
                this.monImg.visible = this.monGroup.visible = false;
                egret.Tween.get(this).to({ alpha: 1 }, 1000).call(function () {
                    egret.Tween.removeTweens(_this);
                    _this.showEffect();
                    _this.showText();
                }, this);
            }
        }
        else {
            this.monImg.visible = false;
            this.monGroup.visible = false;
            this.showEffect();
            this.showText();
        }
    };
    GameMainView.prototype.showText = function () {
        var _this = this;
        this.touchEnabled = false;
        this.touchChildren = false;
        this.showLevelTxt(function () {
            var guidepassStr = egret.localStorage.getItem(LocalStorageEnum.IS_PASS_GUIDE);
            egret.startTick(_this.execAction, _this);
            if (guidepassStr) {
                //执行正常出怪的逻辑
                _this.touchEnabled = true;
                _this.touchChildren = true;
            }
            else {
                _this.touchEnabled = false;
                _this.touchChildren = false;
            }
        });
    };
    GameMainView.prototype.roleGoldChange = function (value) {
        this.goldLab.text = GameApp.roleGold.toString();
        var boo = false;
        for (var key in GameApp.skillCfg) {
            if (GameApp.roleGold >= GameApp.skillCfg[key].cost && GameApp.skillCfg[key].cost != 0) {
                boo = true;
                break;
            }
        }
        this.upred.visible = boo;
    };
    GameMainView.prototype.roleGemChange = function (value) {
        this.gemLab.text = value.toString();
    };
    /**点击了引导技能 */
    GameMainView.prototype.onClickGuideSkill = function (evt) {
        if (this.guideView) {
            var xx = (StageUtils.inst().getWidth() >> 1) + 100;
            var yy = StageUtils.inst().getHeight() >> 1;
            this.curItem = this.list.$children[2];
            this.curItem.focus = true;
            this.releaseSkill103 = true;
            this.guideView.nextStep({ id: evt.data.id, comObj: { x: xx, y: yy }, width: 75, height: 75 });
        }
    };
    /**点击使用了技能-- 神将 */
    GameMainView.prototype.onUseGuideSkill = function (evt) {
        console.log("使用了技能-----" + evt.data.skillId + "----神将召唤");
        egret.startTick(this.execAction, this);
        var xx = (StageUtils.inst().getWidth() >> 1) + 100;
        var yy = (StageUtils.inst().getHeight() >> 1) + 50;
        this.createOwnGenral({ x: xx, y: yy });
    };
    GameMainView.prototype.onRewardGet = function (evt) {
        var getcountstr = egret.localStorage.getItem(LocalStorageEnum.BOX_REWARD_GET);
        var boxTimestr = egret.localStorage.getItem(LocalStorageEnum.BOX_REWARD_TIMESPAN);
        var nowTime = new Date().getTime();
        if (!getcountstr || (getcountstr && getcountstr == "0") || (boxTimestr && (nowTime - parseInt(boxTimestr)) > this.awardBoxGetTime)) {
            //第一次进入 。第二天重置 。现在的时间-创建时间 〉 10分钟 。可以领取
            //增加金币数量
            var goldMc = new MovieClip();
            this.awardBox.addChild(goldMc);
            goldMc.playFile(EFFECT + "gold", 1, null, true);
            goldMc.x = this.awardBox.width >> 1;
            goldMc.y = this.awardBox.height >> 1;
            GameApp.inst().gold += this.goldGetNum;
            UserTips.inst().showTips("获得金币+" + this.goldGetNum);
            //刷新新的宝箱倒计时时间戳
            var countStr = egret.localStorage.getItem(LocalStorageEnum.BOX_REWARD_GET);
            egret.localStorage.setItem(LocalStorageEnum.BOX_REWARD_GET, (parseInt(countStr) + 1).toString());
            egret.localStorage.setItem(LocalStorageEnum.BOX_REWARD_TIMESPAN, new Date().getTime().toString());
            this.refreshRewardBoxState(1);
        }
        else {
            UserTips.inst().showTips("未达领取时间");
        }
    };
    /**刷新宝箱盒子状态 */
    GameMainView.prototype.refreshRewardBoxState = function (num) {
        if (num === void 0) { num = 0; }
        GameApp.inst().refreshTimespan();
        var countstr = egret.localStorage.getItem(LocalStorageEnum.BOX_REWARD_GET);
        if (countstr) {
            var count = parseInt(countstr) + num;
            this.awardBox.visible = !(count >= this.totalGetCount);
            if (this.awardBox.visible == false) {
                //说明当前次数已经使用完了
                this.timer.stop();
            }
            else {
                if (num) {
                    //当前有加的值 而且awardBox.visible = true 
                    this.timer.start();
                }
            }
        }
        else {
            egret.localStorage.setItem(LocalStorageEnum.BOX_REWARD_GET, "0");
            this.awardBox.visible = true;
            this.boxLab.text = "领取";
        }
    };
    GameMainView.prototype.changeTime = function () {
        //刷新界面的相关显示
        var boxTimestr = egret.localStorage.getItem(LocalStorageEnum.BOX_REWARD_TIMESPAN);
        var nowTime = new Date().getTime();
        var offValue = (nowTime - parseInt(boxTimestr));
        if (!boxTimestr || (boxTimestr && offValue >= this.awardBoxGetTime)) {
            //当前宝箱已经领取时间已超 可以领取
            this.timer.stop();
            this.boxLab.text = "领取";
            return false;
        }
        else {
            this.boxLab.text = DateUtils.getFormatBySecond((this.awardBoxGetTime - offValue) / 1000, DateUtils.TIME_FORMAT_3);
            return true;
        }
    };
    /**路由回界面的刷新方法 */
    GameMainView.prototype.refreshPage = function () {
    };
    GameMainView.prototype.onTimer = function () {
        this.changeTime();
    };
    /**音频设置界面 */
    GameMainView.prototype.onSetHandler = function () {
        ViewManager.inst().open(SettingPopUp);
        this.pauseSkillCd();
    };
    GameMainView.prototype.onItemTap = function (evt) {
        var _this = this;
        var curItem = this.list.getChildAt(evt.itemIndex);
        if (curItem.isCd) {
            UserTips.inst().showTips("技能冷却中");
            return;
        }
        var skillId = evt.item.skillId;
        var skillCfg = GlobalFun.getSkillCfg(skillId);
        if (skillCfg) {
            if (skillCfg.skillId == 105) {
                // egret.Tween.removeAllTweens();
                // egret.stopTick(this.execAction,this);
                this.onStop();
                ViewManager.inst().open(CommonPtompt, [{ cb: function (oper) {
                            if (oper == 1) {
                                //需要刷新全部技能;
                                for (var i = 0; i < _this.list.numChildren; i++) {
                                    var item = _this.list.$children[i];
                                    item.removeCd();
                                    if (item.skillId == 103) {
                                        item.num = 10;
                                    }
                                }
                            }
                            egret.startTick(_this.execAction, _this);
                        }, arg: this }]);
                return;
            }
            this.descLab.visible = true;
            this.descLab.alpha = 0;
            this.descLab.text = skillCfg.desc;
            egret.Tween.removeTweens(this.descLab);
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            egret.Tween.get(this.descLab, { loop: true }).to({ alpha: 1 }, 500).to({ alpha: 0 }, 500);
            var self_9 = this;
            this.timeout = setTimeout(function () {
                clearTimeout(self_9.timeout);
                self_9.descLab.visible = false;
                self_9.descLab.alpha = 0;
                egret.Tween.removeTweens(self_9.descLab);
            }, 2000);
            for (var i = 0; i < this.list.numChildren; i++) {
                var item = this.list.$children[i];
                item.focus = false;
            }
            curItem.focus = true;
            curItem.dongyixia();
            this.curItem = curItem;
            if (curItem.skillId == 103) {
                //当前是神将召唤
                this.releaseSkill103 = true;
                this.releaseSkill101 = this.releaseSkill102 = this.releaseSkill104 = false;
            }
            else if (curItem.skillId == 104) {
                this.releaseSkill104 = true;
                this.releaseSkill101 = this.releaseSkill102 = this.releaseSkill103 = false;
            }
            else if (curItem.skillId == 101) {
                this.releaseSkill101 = true;
                this.releaseSkill102 = this.releaseSkill103 = this.releaseSkill104 = false;
            }
            else if (curItem.skillId == 102) {
                this.releaseSkill101 = this.releaseSkill103 = this.releaseSkill104 = false;
                this.releaseSkill102 = true;
            }
        }
        console.log("触发了技能----" + skillId);
    };
    /**展示关卡显示文字 */
    GameMainView.prototype.showLevelTxt = function (cb, txtstr) {
        var txt = new eui.Label();
        this.addChild(txt);
        txt.fontFamily = "yt";
        txt.size = 30;
        var levelstr = egret.localStorage.getItem(LocalStorageEnum.LEVEL);
        var level = levelstr ? parseInt(levelstr) : 1;
        // txt.text = `d${txtstr?txtstr:level}${txtstr?"b":"g"}`;
        txt.textFlow = new egret.HtmlTextParser().parse("\u7B2C<font color=0xffff00>" + (txtstr ? txtstr : level) + "</font>" + (txtstr ? "波" : "关"));
        txt.x = (StageUtils.inst().getWidth() >> 1) - (txt.width >> 1) - 200;
        txt.y = (StageUtils.inst().getHeight() >> 1);
        txt.alpha = 0;
        txt.scaleX = txt.scaleY = 0;
        egret.Tween.get(txt).to({ alpha: 1, scaleX: 2, scaleY: 2, x: txt.x + 200 }, 1000, egret.Ease.circOut).wait(500).to({ alpha: 0, scaleX: 0, scaleY: 0, x: txt.x + 600 }, 1000, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(txt);
            txt.parent.removeChild(txt);
            cb();
        }, this);
    };
    GameMainView.prototype.close = function () {
        this.removeTouchEvent(this.settingBtn, this.onSetHandler);
        this.removeTouchEvent(this.upgradeBtn, this.onUpgrade);
        MessageManager.inst().removeListener("start", this.onStart, this);
        MessageManager.inst().removeListener("end", this.onStop, this);
        MessageManager.inst().removeListener("closeMain", this.onCloseMain, this);
        MessageManager.inst().removeListener(CustomEvt.CANCLESKILLCDPAUSE, this.cancleSkillCdPause, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onEnd, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEnd, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        StageUtils.inst().getStage().removeEventListener(StartGameEvent.CLICK_GUIDE_SKILL, this.onClickGuideSkill, this);
        StageUtils.inst().getStage().removeEventListener(StartGameEvent.USE_GUIDE_SKILL, this.onUseGuideSkill, this);
        this.awardBox.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRewardGet, this);
        MessageManager.inst().removeListener(CustomEvt.BOSS_RELEASESKILL, this.onBossReleaseSkill, this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        if (this.goldWatcher) {
            this.goldWatcher.unwatch();
        }
        if (this.gemWatcher) {
            this.gemWatcher.unwatch();
        }
    };
    return GameMainView;
}(BaseEuiView));
__reflect(GameMainView.prototype, "GameMainView");
ViewManager.inst().reg(GameMainView, LayerManager.UI_Main);
var GuideView = (function (_super) {
    __extends(GuideView, _super);
    function GuideView() {
        return _super.call(this) || this;
    }
    GuideView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        // this.data = param[0].data 
        // this.setRect();
        this._handMc = new MovieClip();
        this.addChild(this._handMc);
        this._handMc.touchEnabled = false;
        this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGuideTap, this);
    };
    GuideView.prototype.onGuideTap = function (evt) {
        var guideId = this.data.id;
        var guideCfgs = GuideCfg.guidecfg;
        var itemCfg = guideCfgs[guideId];
        var event = new StartGameEvent(itemCfg.event, itemCfg.param);
        StageUtils.inst().getStage().dispatchEvent(event);
        if (!itemCfg.next) {
            ViewManager.inst().close(GuideView);
        }
    };
    //执行下一步
    GuideView.prototype.nextStep = function (data) {
        this.data = data;
        this.setRect();
    };
    GuideView.prototype.setRect = function () {
        if (this.data.comObj instanceof egret.DisplayObject) {
            var point = this.data.comObj.parent.localToGlobal(this.data.comObj.x, this.data.comObj.y);
            if ((this.data.offsetX == 40) && (this.data.offsetY == 50)) {
                this.data.offsetX = 0;
                this.data.offsetY = 0;
                this.rectData = [point.x + (this.data.offsetX || 0), point.y + (this.data.offsetY || 0), this.data.width - (this.data.offsetX || 0), this.data.height];
            }
            else {
                this.rectData = [point.x + (this.data.offsetX || 0), point.y + (this.data.offsetY || 0), this.data.width, this.data.height];
            }
        }
        else {
            this.rectData = [this.data.comObj.x, this.data.comObj.y, this.data.width, this.data.height];
        }
        this.rect.x = this.rectData[0];
        this.rect.y = this.rectData[1];
        this.rect.width = this.data.width;
        this.rect.height = this.data.height;
        this.setBgdSize();
        this.setArrow();
    };
    GuideView.prototype.setBgdSize = function () {
        var worldX = this.rect.x;
        var worldY = this.rect.y;
        var _w, _h;
        _w = worldX > 0 ? worldX : 0;
        _h = worldY + this.rect.height > 0 ? (worldY + this.rect.height) : 0;
        this.bg_left.width = _w;
        this.bg_left.height = _h;
        _w = StageUtils.inst().getWidth() - worldX;
        _w = _w < 0 ? 0 : _w;
        this.bg_top.width = _w;
        this.bg_top.height = worldY;
        _w = StageUtils.inst().getWidth() - worldX - this.rect.width;
        _w = _w < 0 ? 0 : _w;
        _h = StageUtils.inst().getHeight() - worldY;
        _h = _h < 0 ? 0 : _h;
        this.bg_right.width = _w;
        this.bg_right.height = _h;
        _h = StageUtils.inst().getHeight() - worldY - this.rect.height;
        _h = _h < 0 ? 0 : _h;
        this.bg_bottom.width = worldX + this.rect.width;
        this.bg_bottom.height = _h;
    };
    //设置焦点箭头
    GuideView.prototype.setArrow = function () {
        this._handMc.playFile(EFFECT + "fingerClick", -1);
        this._handMc.x = this.rect.x + (this.rect.width);
        this._handMc.y = this.rect.y + (this.rect.height);
    };
    GuideView.prototype.close = function () {
        this.removeChildren();
        this._handMc = null;
        this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGuideTap, this);
    };
    return GuideView;
}(BaseEuiView));
__reflect(GuideView.prototype, "GuideView");
ViewManager.inst().reg(GuideView, LayerManager.UI_Pop);
var StartGameView = (function (_super) {
    __extends(StartGameView, _super);
    function StartGameView() {
        var _this = _super.call(this) || this;
        _this.clickBegin = false;
        return _this;
    }
    StartGameView.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        egret.Tween.removeAllTweens();
        this.roleimg2.width = StageUtils.inst().getWidth();
        this.roleimg2.height = StageUtils.inst().getHeight() - 10;
        this.roleimg2.anchorOffsetX = this.roleimg2.width >> 1;
        this.roleimg2.anchorOffsetY = this.roleimg2.height >> 1;
        this.roleimg2.x = this.roleimg2.width >> 1;
        this.roleimg2.y = this.roleimg2.height >> 1;
        this.roleimg2.alpha = 0;
        egret.Tween.get(this.roleimg2, { loop: true }).to({ alpha: 1, scaleX: 1.01, scaleY: 1.01 }, 500).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 500).wait(1500);
        var firstStr = egret.localStorage.getItem(LocalStorageEnum.ENTER_FIRST);
        this.enterBtn.alpha = 0;
        if (!firstStr) {
            egret.localStorage.setItem(LocalStorageEnum.ENTER_FIRST, "1");
            // this.enterBtn.visible = false;
            ViewManager.inst().open(StoryPopUp, [{ cb: this.onShowBtn, arg: this }]);
        }
        else {
            this.onShowBtn();
        }
        this.addTouchEvent(this.storyBtn, this.onLookStory, true);
        this.addTouchEvent(this.enterBtn, this.onEnter, true);
        var vertexSrc = "attribute vec2 aVertexPosition;\n" +
            "attribute vec2 aTextureCoord;\n" +
            "attribute vec2 aColor;\n" +
            "uniform vec2 projectionVector;\n" +
            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +
            "const vec2 center = vec2(-1.0, 1.0);\n" +
            "void main(void) {\n" +
            "   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
            "   vTextureCoord = aTextureCoord;\n" +
            "   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" +
            "}";
        var fragmentSrc1 = "precision lowp float;\n" +
            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +
            "uniform sampler2D uSampler;\n" +
            "uniform float customUniform;\n" +
            "void main(void) {\n" +
            "vec2 uvs = vTextureCoord.xy;\n" +
            "vec4 fg = texture2D(uSampler, vTextureCoord);\n" +
            "fg.rgb += sin(customUniform + uvs.x * 2. + uvs.y * 2.) * 0.1;\n" +
            "gl_FragColor = fg * vColor;\n" +
            "}";
        this.customFilter1 = new egret.CustomFilter(vertexSrc, fragmentSrc1, {
            customUniform: 0
        });
        this.filters = [this.customFilter1];
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        SoundManager.inst().playBg(RES_AUDIO + "game.mp3");
        var self = this;
        // let rangeX:number = (608*(StageUtils.inst().getWidth()/1136 - 0.1));
        var tarY = (StageUtils.inst().getHeight() >> 1) + 100;
        this._interval = setInterval(function () {
            var num = ((Math.random() * 100) >> 0) > 50 ? 6 : 5;
            var _loop_5 = function (i) {
                var index = (Math.random() * 7 + 1) >> 0;
                var res = "item_fire_" + index + "_png";
                var img = new eui.Image();
                _this.addChild(img);
                img.source = res;
                img.bottom = -50;
                img.x = (Math.random() * (StageUtils.inst().getWidth()) >> 0);
                var y = tarY - ((Math.random() * 150) >> 0);
                var angle = img.rotation;
                var dic = ((Math.random() * 100) >> 0) > 50 ? 1 : -1;
                egret.Tween.get(img, { loop: false, onChange: function () {
                        if (angle % 80 == 0) {
                            dic *= -1;
                        }
                        img.scaleX -= 0.001;
                        img.scaleY -= 0.001;
                        angle += 0.3 * dic;
                        img.rotation = angle;
                    }, onChangeObj: _this }).to({ bottom: y, alpha: 0 }, 5000).call(function () {
                    egret.Tween.removeTweens(img);
                    _this.removeChild(img);
                });
            };
            for (var i = 0; i < num; i++) {
                _loop_5(i);
            }
        }, 3000);
    };
    StartGameView.prototype.onShowBtn = function () {
        var _this = this;
        egret.Tween.get(this.enterBtn).to({ alpha: 1 }, 600).call(function () {
            egret.Tween.removeTweens(_this.enterBtn);
        }, this);
    };
    StartGameView.prototype.onFrame = function (evt) {
        if (this.clickBegin) {
            this.onReturn();
        }
        else {
            this.customFilter1.uniforms.customUniform += 0.05;
            if (this.customFilter1.uniforms.customUniform > Math.PI * 2) {
                this.customFilter1.uniforms.customUniform = 0.0;
            }
        }
    };
    StartGameView.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this).to({ alpha: 0 }, 1000).call(function () {
            egret.Tween.removeTweens(_this);
            ViewManager.inst().close(StartGameView);
        }, this);
        var view = ViewManager.inst().getView(GameMainView);
        if (!view) {
            ViewManager.inst().open(GameMainView);
            view = ViewManager.inst().getView(GameMainView);
        }
        view.initialize(true);
    };
    /**进入游戏 */
    StartGameView.prototype.onEnter = function (evt) {
        this.touchEnabled = false;
        SoundManager.inst().touchBg();
        this.clickBegin = true;
    };
    /**查看故事 */
    StartGameView.prototype.onLookStory = function () {
        ViewManager.inst().open(StoryPopUp);
    };
    StartGameView.prototype.close = function () {
        if (this._interval) {
            clearInterval(this._interval);
        }
        egret.Tween.removeTweens(this.roleimg2);
        this.removeTouchEvent(this.storyBtn, this.onLookStory);
        this.removeTouchEvent(this.enterBtn, this.onEnter);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
    };
    return StartGameView;
}(BaseEuiView));
__reflect(StartGameView.prototype, "StartGameView");
ViewManager.inst().reg(StartGameView, LayerManager.UI_Main);
var RebornItem = (function (_super) {
    __extends(RebornItem, _super);
    function RebornItem() {
        var _this = _super.call(this) || this;
        _this.descs = ["攻速暴增200%", "全属性增加1倍", "攻击力增幅4倍"];
        _this.skinName = "RebornItemSkin";
        return _this;
    }
    RebornItem.prototype.dataChanged = function () {
        var index = this.itemIndex + 1;
        this.descLab.text = this.descs[this.itemIndex];
        if (index >= 5) {
            index = 4;
        }
        this.headIcon.source = "reborn_" + this.data.rmodel + "_png";
        // if(this.itemIndex == 2){
        // 	this.headIcon.x
        // }
        this.titleImg.source = "reborn_title_" + this.data.rmodel + "_png";
        this.rebornCostLab.text = this.data.cost;
        var reborns = GameApp.reborns[this.data.skillId];
        if (reborns && (!!~reborns.indexOf(this.data.mid))) {
            this._rebornBoo = true;
            this.rebornCostLab.text = "已转生";
        }
        this._cost = this.data.cost;
        // this._rebornBoo = this.data.rebornBoo;
        this._id = this.data.mid;
    };
    RebornItem.prototype.reborn = function () {
        this._rebornBoo = true;
        this.rebornCostLab.text = "已转生";
        if (!GameApp.reborns[this.data.skillId]) {
            GameApp.reborns[this.data.skillId] = [this.data.mid];
        }
        else {
            GameApp.reborns[this.data.skillId].push(this.data.mid);
        }
        egret.localStorage.setItem(LocalStorageEnum.REBORNIDS, JSON.stringify(GameApp.reborns));
        var skillCfg = GameApp.skillCfg[this.data.skillId];
        var rebornCfg = RebornCfg.cfg;
        var curRebornCfg = null;
        for (var i = 0; i < rebornCfg.length; i++) {
            if (rebornCfg[i].mid == this.data.mid) {
                curRebornCfg = rebornCfg[i];
                break;
            }
        }
        1;
        var obj = { skillId: this.data.skillId, rebornId: this.data.mid, skillIcon: this.icon, skillTitle: "reborn_title_" + this.data.rmodel + "_png", level: skillCfg.level, desc: curRebornCfg.desc, atk: 5 * skillCfg.level + 45, hp: 50 * skillCfg.level + 550, atkDis: 100, cost: 10 * skillCfg.level + 90, skillType: 1 };
        GameApp.skillCfg[this.data.skillId] = obj;
        egret.localStorage.setItem(LocalStorageEnum.REBORNCFG, JSON.stringify(GameApp.skillCfg));
        MessageManager.inst().dispatch(CustomEvt.REBORNSUCCESS, { skillId: this.data.skillId });
    };
    Object.defineProperty(RebornItem.prototype, "icon", {
        get: function () {
            return "reborn_head_" + (this.itemIndex + 1) + "_png";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RebornItem.prototype, "cost", {
        get: function () {
            return this._cost;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RebornItem.prototype, "ifReborn", {
        get: function () {
            return this._rebornBoo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RebornItem.prototype, "mid", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    return RebornItem;
}(eui.ItemRenderer));
__reflect(RebornItem.prototype, "RebornItem");
var SkilItem = (function (_super) {
    __extends(SkilItem, _super);
    function SkilItem() {
        var _this = _super.call(this) || this;
        _this._isCd = false;
        _this.skinName = "SkillItemSkin";
        return _this;
    }
    SkilItem.prototype.dataChanged = function () {
        this.rect.visible = false;
        this.numLab.visible = false;
        if (this.data.skillIcon) {
            this.skillIcon.source = this.data.skillIcon;
        }
        if (this.data.skillTitle) {
            this.skillTitle.source = this.data.skillTitle;
        }
        if (this.data.skillId) {
            this._skillId = this.data.skillId;
        }
        this.cdGroup.visible = false;
    };
    SkilItem.prototype.setCd = function () {
        if (this.data.cd == 0) {
            return;
        }
        this.touchEnabled = false;
        this.touchChildren = false;
        // let cdTime:number = this.data.cd;
        this.cdGroup.visible = true;
        this.cdTime.text = this.data.cd.toString();
        this.count = 0;
        var self = this;
        this._isCd = true;
        this.cdInterval = setInterval(function () {
            self.count += 1;
            self.cdTime.text = (self.data.cd - self.count).toString();
            if (self.count >= self.data.cd) {
                clearInterval(self.cdInterval);
                self._isCd = false;
                self.touchEnabled = true;
                self.count = 0;
                self.touchChildren = true;
                self.cdGroup.visible = false;
            }
        }, 1000);
    };
    /**技能cd暂停 */
    SkilItem.prototype.pauseCd = function () {
        if (this.cdInterval) {
            clearInterval(this.cdInterval);
            this.cdInterval = null;
        }
    };
    /**技能cd取消暂停 */
    SkilItem.prototype.canclePause = function () {
        if (this.data.cd && this.count < this.data.cd && !this.cdInterval) {
            var self_10 = this;
            this.cdInterval = setInterval(function () {
                self_10.count += 1;
                self_10.cdTime.text = (self_10.data.cd - self_10.count).toString();
                if (self_10.count >= self_10.data.cd) {
                    clearInterval(self_10.cdInterval);
                    self_10._isCd = false;
                    self_10.count = 0;
                    self_10.touchEnabled = true;
                    self_10.touchChildren = true;
                    self_10.cdGroup.visible = false;
                }
            }, 1000);
        }
    };
    /**技能cd移除 */
    SkilItem.prototype.removeCd = function () {
        if (this.cdInterval) {
            clearInterval(this.cdInterval);
        }
        this.cdGroup.visible = false;
        this.touchEnabled = true;
        this.touchChildren = true;
        this.count = 0;
        this._isCd = false;
        this.cdTime.text = "0";
    };
    SkilItem.prototype.dongyixia = function () {
        var _this = this;
        egret.Tween.get(this.itemGroup).to({ rotation: this.itemGroup.rotation - 5 }, 50).to({ rotation: this.itemGroup.rotation + 5 }, 50).to({ rotation: this.itemGroup.rotation - 5 }, 50).to({ rotation: this.itemGroup.rotation + 5 }, 50).call(function () {
            _this.itemGroup.rotation = 0;
            egret.Tween.removeTweens(_this.itemGroup);
        }, this);
    };
    Object.defineProperty(SkilItem.prototype, "num", {
        get: function () {
            return parseInt(this.numLab.text);
        },
        set: function (value) {
            this.numLab.visible = true;
            this.numLab.text = value.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkilItem.prototype, "isCd", {
        get: function () {
            return this._isCd;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkilItem.prototype, "skillId", {
        get: function () {
            return this._skillId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkilItem.prototype, "focus", {
        set: function (value) {
            this.rect.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    return SkilItem;
}(eui.ItemRenderer));
__reflect(SkilItem.prototype, "SkilItem");
var UpgradeItem = (function (_super) {
    __extends(UpgradeItem, _super);
    function UpgradeItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "UpgradeItemSkin";
        return _this;
    }
    UpgradeItem.prototype.childrenCreated = function () {
        this.rebornBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReborn, this);
        this.upgradeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpgrade, this);
    };
    UpgradeItem.prototype.onReborn = function () {
        ViewManager.inst().open(RebornPanel, [{ skillId: this._skillId }]);
    };
    UpgradeItem.prototype.onUpgrade = function () {
        var userGold = GameApp.inst().gold;
        if (this._curCost > userGold) {
            UserTips.inst().showTips("金币不足");
            return;
        }
        GameApp.inst().gold -= this._curCost;
        GameApp.skillCfg[this._skillId].level += 1;
        if (this._skillId >= 1000) {
            GameApp.skillCfg[this._skillId].atk = 5 * GameApp.skillCfg[this._skillId].level + 45;
            GameApp.skillCfg[this._skillId].hp = 50 * GameApp.skillCfg[this._skillId].level + 550;
            GameApp.skillCfg[this._skillId].cost = 10 * GameApp.skillCfg[this._skillId].level + 90;
        }
        else {
            if (this._skillId == 101 || this._skillId == 102) {
                if (this._skillId == 101) {
                    GameApp.skillCfg[this._skillId].atk = GameApp.skillCfg[this._skillId].level + 8;
                }
                else {
                    GameApp.skillCfg[this._skillId].atk = GameApp.skillCfg[this._skillId].level + 6;
                }
                GameApp.skillCfg[this._skillId].cost = 5 * GameApp.skillCfg[this._skillId].level + 25;
            }
            else {
                if (this._skillId == 104) {
                    GameApp.skillCfg[this._skillId].atk = 5 * GameApp.skillCfg[this._skillId].level + 35;
                }
                else {
                    GameApp.skillCfg[this._skillId].atk = 2 * GameApp.skillCfg[this._skillId].level + 18;
                }
                GameApp.skillCfg[this._skillId].cost = 10 * GameApp.skillCfg[this._skillId].level + 90;
            }
        }
        egret.localStorage.setItem(LocalStorageEnum.REBORNCFG, JSON.stringify(GameApp.skillCfg));
        // let levelstr:string = egret.localStorage.getItem(LocalStorageEnum.SKILL_LEVEL + this._skillId);
        // let curLevel:number = parseInt(levelstr)+1
        // egret.localStorage.setItem(LocalStorageEnum.SKILL_LEVEL + this._skillId,(curLevel).toString());
        this._curCost = GameApp.skillCfg[this._skillId].cost;
        this.levelLab.text = "Lv." + GameApp.skillCfg[this._skillId].level;
        this.costLab.text = this._curCost.toString();
        this.atkLab.text = GameApp.skillCfg[this._skillId].atk.toString();
        UserTips.inst().showTips("升级成功");
    };
    UpgradeItem.prototype.dataChanged = function () {
        this.refresh(this.data);
    };
    UpgradeItem.prototype.refresh = function (data) {
        this.skillIcon.source = data.skillIcon;
        this.skillTitle.source = data.skillTitle;
        this.skillDesc.text = data.desc;
        this._skillId = data.skillId;
        var levelstr = data.level;
        this.atkLab.text = data.atk.toString();
        this._curCost = data.cost;
        this.costLab.text = this._curCost.toString();
        if (GameApp.roleGold >= this._curCost) {
            this.redP.visible = true;
        }
        this.levelLab.text = "Lv." + levelstr;
        this.rebornBtn.visible = false;
        if (this.data.skillType == 1) {
            this.rebornBtn.visible = true;
        }
    };
    UpgradeItem.prototype.changeRedPointShow = function (boo) {
        this.redP.visible = boo;
    };
    Object.defineProperty(UpgradeItem.prototype, "skillId", {
        get: function () {
            return this._skillId;
        },
        enumerable: true,
        configurable: true
    });
    UpgradeItem.prototype.dispose = function () {
        this.rebornBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReborn, this);
        this.upgradeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpgrade, this);
    };
    return UpgradeItem;
}(eui.ItemRenderer));
__reflect(UpgradeItem.prototype, "UpgradeItem");
/**
 * 虚拟摇杆
 * @author chenkai
 * @since 2017/5/4
 */
var VirtualJoystick = (function (_super) {
    __extends(VirtualJoystick, _super);
    function VirtualJoystick() {
        var _this = _super.call(this) || this;
        _this.circleRadius = 0; //圆环半径
        _this.ballRadius = 0; //小球半径
        _this.centerX = 0; //中心点坐标
        _this.centerY = 0;
        //触摸移动，设置小球的位置
        _this.p1 = new egret.Point();
        _this.p2 = new egret.Point();
        _this.skinName = "VirtualJoystickSkin";
        return _this;
    }
    VirtualJoystick.prototype.childrenCreated = function () {
        //获取圆环和小球半径
        this.circle.width = this.circle.height = 141;
        this.ball.width = this.ball.height = 42;
        this.circleRadius = this.circle.height / 2;
        this.ballRadius = this.ball.height / 2;
        //获取中心点
        this.centerX = this.circleRadius;
        this.centerY = this.circleRadius;
        //设置锚点
        this.ball.anchorOffsetX = this.ballRadius;
        this.ball.anchorOffsetY = this.ballRadius;
        //设置小球初始位置
        this.ball.x = this.centerX;
        this.ball.y = this.centerY;
    };
    //启动虚拟摇杆 
    VirtualJoystick.prototype.start = function () {
        this.ball.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        StageUtils.inst().getStage().addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        StageUtils.inst().getStage().addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    };
    //停止虚拟摇杆
    VirtualJoystick.prototype.stop = function () {
        this.ball.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        StageUtils.inst().getStage().removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        StageUtils.inst().getStage().removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    };
    //触摸开始，显示虚拟摇杆
    VirtualJoystick.prototype.onTouchBegin = function (e) {
        // if(this.parent){
        // 	return;
        // }
        this.touchID = e.touchPointID;
        this.x = e.stageX;
        this.y = e.stageY;
        this.ball.x = this.centerX;
        this.ball.y = this.centerY;
        // GameConst.stage.addChild(this);
        this.dispatchEvent(new VJEvent(VJEvent.VJ_START));
    };
    //触摸结束，隐藏虚拟摇杆
    VirtualJoystick.prototype.onTouchEnd = function (e) {
        if (this.touchID != e.touchPointID) {
            return;
        }
        this.touchID = null;
        this.ball.x = this.centerX;
        this.ball.y = this.centerY;
        // this.hide();
        this.dispatchEvent(new VJEvent(VJEvent.VJ_END));
    };
    VirtualJoystick.prototype.onTouchMove = function (e) {
        if (this.touchID != e.touchPointID) {
            return;
        }
        var stageP = this.localToGlobal(this.centerX, this.centerY);
        //获取手指和虚拟摇杆的距离
        // this.p1.x = this.x;
        // this.p1.y = this.y;
        this.p2.x = e.stageX;
        this.p2.y = e.stageY;
        var dist = egret.Point.distance(stageP, this.p2);
        var angle = Math.atan2(e.stageY - stageP.y, e.stageX - stageP.x);
        //手指距离在圆环范围内
        if (dist <= (this.circleRadius - this.ballRadius)) {
            var point = this.globalToLocal(e.stageX, e.stageY);
            // this.ball.x = this.centerX + e.stageX - this.x;
            // this.ball.y = this.centerY + e.stageY - this.y;
            this.ball.x = point.x;
            this.ball.y = point.y;
            //手指距离在圆环范围外
        }
        else {
            this.ball.x = Math.cos(angle) * (this.circleRadius - this.ballRadius) + this.centerX;
            this.ball.y = Math.sin(angle) * (this.circleRadius - this.ballRadius) + this.centerY;
        }
        //派发事件
        this.dispatchEvent(new VJEvent(VJEvent.VJ_MOVE, false, angle));
    };
    VirtualJoystick.prototype.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    return VirtualJoystick;
}(eui.Component));
__reflect(VirtualJoystick.prototype, "VirtualJoystick");
var BattleResultPopUp = (function (_super) {
    __extends(BattleResultPopUp, _super);
    function BattleResultPopUp() {
        return _super.call(this) || this;
    }
    BattleResultPopUp.prototype.open = function () {
        // this.alpha = 0;
        // egret.Tween.get(this).to({alpha:1},300,egret.Ease.circOut).call(()=>{
        // 	egret.Tween.removeTweens(this);
        // })
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var precentw = StageUtils.inst().getWidth() / 1136;
        this.winIcon["autoSize"]();
        // this.winIcon.scaleX *=precentw;
        // this.winIcon.scaleY *= precentw;
        this.resultImg["autoSize"]();
        this.resultImg2["autoSize"]();
        this.rewardGroup["autoSize"]();
        this.nextBtn["autoSize"]();
        this.continueBtn["autoSize"]();
        this.exitBtn["autoSize"]();
        this.rewardGroup.alpha = 0;
        this.winIcon.alpha = 0;
        this.winIcon.scaleX = this.winIcon.scaleY = 5;
        this.resultImg.alpha = 0;
        this.resultImg.scaleX = this.resultImg.scaleY = 5;
        this.resultImg2.alpha = 0;
        this.resultImg2.scaleX = this.resultImg2.scaleY = 5;
        if (param[0].state == 1) {
            this._state = "win";
            this.invalidateState();
            // this.skin.currentState = "win";
            // let levelstr:string = egret.localStorage.getItem(LocalStorageEnum.LEVEL);
            this.goldNum = 100 + ((Math.random() * 20) >> 0);
            egret.Tween.get(this.winIcon).to({ alpha: 1, scaleX: 0.7, scaleY: 0.7 }, 300, egret.Ease.circIn).call(function () {
                egret.Tween.removeTweens(_this.winIcon);
                egret.Tween.get(_this.resultImg).to({ alpha: 1, scaleX: precentw, scaleY: precentw }, 300, egret.Ease.circIn).call(function () {
                    egret.Tween.removeTweens(_this.resultImg);
                    egret.Tween.get(_this.rewardGroup).to({ alpha: 1 }, 300).call(function () {
                        egret.Tween.removeTweens(_this.rewardGroup);
                    }, _this);
                }, _this);
            }, this);
            // this.goldNum = parseInt(levelstr);
        }
        else {
            this._state = "fail";
            this.invalidateState();
            egret.Tween.get(this.winIcon).to({ alpha: 1, scaleX: 0.7, scaleY: 0.7 }, 300, egret.Ease.circIn).call(function () {
                egret.Tween.removeTweens(_this.winIcon);
                egret.Tween.get(_this.resultImg2).to({ alpha: 1, scaleX: precentw, scaleY: precentw }, 300, egret.Ease.circIn).call(function () {
                    egret.Tween.removeTweens(_this.resultImg2);
                    egret.Tween.get(_this.rewardGroup).to({ alpha: 1 }, 300).call(function () {
                        egret.Tween.removeTweens(_this.rewardGroup);
                    }, _this);
                }, _this);
            }, this);
            // this.skin.currentState = "fail";
            this.goldNum = 12 + ((Math.random() * 10) >> 0);
        }
        if (param[0].time) {
            // this.timeLab.text = param[0].time.toString();
        }
        if (param[0].cb) {
            this._cb = param[0].cb;
        }
        if (param[0].arg) {
            this._arg = param[0].arg;
        }
        this.goldNumLab.text = this.goldNum.toString();
        GameApp.inst().gold += this.goldNum;
        this.addTouchEvent(this.nextBtn, this.onNextLevel, true);
        this.addTouchEvent(this.continueBtn, this.onContinue, true);
        this.addTouchEvent(this.exitBtn, this.onExit, true);
    };
    BattleResultPopUp.prototype.getCurrentState = function () {
        return this._state;
    };
    BattleResultPopUp.prototype.onNextLevel = function () {
        this._param = BattleResultPopUp.OPER_NEXT;
        this.onReturn();
    };
    BattleResultPopUp.prototype.onContinue = function () {
        this._param = BattleResultPopUp.OPER_CONTINUE;
        this.onReturn();
    };
    BattleResultPopUp.prototype.onExit = function () {
        this._param = BattleResultPopUp.OPER_EXIT;
        this.onReturn();
    };
    BattleResultPopUp.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this).to({ alpha: 0 }, 300, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this);
            ViewManager.inst().close(BattleResultPopUp);
            if (_this._cb && _this._arg) {
                _this._cb.call(_this._arg, _this._param);
            }
        });
    };
    BattleResultPopUp.prototype.close = function () {
        this.removeTouchEvent(this.nextBtn, this.onNextLevel);
        this.removeTouchEvent(this.continueBtn, this.onContinue);
        this.removeTouchEvent(this.exitBtn, this.onExit);
    };
    BattleResultPopUp.OPER_CONTINUE = 1; //继续本关
    BattleResultPopUp.OPER_NEXT = 2; //进行下一关
    BattleResultPopUp.OPER_EXIT = 3; //退出;
    return BattleResultPopUp;
}(BaseEuiView));
__reflect(BattleResultPopUp.prototype, "BattleResultPopUp");
ViewManager.inst().reg(BattleResultPopUp, LayerManager.UI_Pop);
var CommonPtompt = (function (_super) {
    __extends(CommonPtompt, _super);
    function CommonPtompt() {
        var _this = _super.call(this) || this;
        _this.oper = 0;
        return _this;
    }
    CommonPtompt.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.tipGroup.alpha = 0;
        this.tipGroup.scaleX = this.tipGroup.scaleY = 0;
        egret.Tween.get(this.tipGroup).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 600, egret.Ease.backOut).call(function () {
            egret.Tween.removeTweens(_this.tipGroup);
        }, this);
        this.addTouchEvent(this.cancleBtn, this.onReturn, true);
        this.addTouchEvent(this.sureBtn, this.onSure, true);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        if (param[0]) {
            if (param[0].cb) {
                this._cb = param[0].cb;
            }
            if (param[0].arg) {
                this._arg = param[0].arg;
            }
        }
    };
    CommonPtompt.prototype.onSure = function () {
        if (GameApp.roleGold < 200) {
            UserTips.inst().showTips("金币不足");
            return;
        }
        else {
            this.oper = 1;
            GameApp.roleGold -= 200;
            UserTips.inst().showTips("刷新成功");
        }
        this.onReturn();
    };
    CommonPtompt.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.tipGroup).to({ alpha: 0, scaleX: 0, scaleY: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.tipGroup);
            ViewManager.inst().close(CommonPtompt);
            if (_this._cb && _this._arg) {
                _this._cb.call(_this._arg, _this.oper);
            }
        }, this);
    };
    CommonPtompt.prototype.close = function () {
        this.removeTouchEvent(this.cancleBtn, this.onReturn);
        this.removeTouchEvent(this.sureBtn, this.onSure);
        this.removeTouchEvent(this.returnBtn, this.onReturn);
    };
    return CommonPtompt;
}(BaseEuiView));
__reflect(CommonPtompt.prototype, "CommonPtompt");
ViewManager.inst().reg(CommonPtompt, LayerManager.UI_Pop);
var RebornPanel = (function (_super) {
    __extends(RebornPanel, _super);
    function RebornPanel() {
        return _super.call(this) || this;
    }
    RebornPanel.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        egret.Tween.get(this.rebornGroup).to({ left: 10 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.rebornGroup);
        });
        this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        this.addTouchEvent(this.btnReturn, this.onReturn, true);
        this.arrayCollect = new eui.ArrayCollection();
        this.list.itemRenderer = RebornItem;
        this.list.dataProvider = this.arrayCollect;
        this.scroller.viewport = this.list;
        this.scroller.horizontalScrollBar.autoVisibility = false;
        this.scroller.horizontalScrollBar.visible = false;
        var dataArr = [];
        this._skillId = param[0].skillId;
        var cfgs = RebornCfg.cfg;
        for (var key in cfgs) {
            if (cfgs[key].cost != 0) {
                var obj = cfgs[key];
                obj.skillId = this._skillId;
                // if(!!~GameApp.rebornIds.indexOf(cfgs[key].id)){
                // 	obj["rebornBoo"] = true;
                // }else{
                // 	obj["rebornBoo"] = false;
                // }
                dataArr.push(obj);
            }
        }
        this.arrayCollect.source = dataArr;
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    RebornPanel.prototype.onItemTap = function (evt) {
        var item = this.list.getChildAt(evt.itemIndex);
        if (item.ifReborn) {
            UserTips.inst().showTips("已切换转生职业");
            var skillCfg = GameApp.skillCfg[this._skillId];
            var rebornCfg = RebornCfg.cfg;
            var curRebornCfg = null;
            for (var i = 0; i < rebornCfg.length; i++) {
                if (rebornCfg[i].mid == item.mid) {
                    curRebornCfg = rebornCfg[i];
                    break;
                }
            }
            var obj = { skillId: this._skillId, rebornId: item.mid, skillIcon: item.icon, skillTitle: "reborn_title_" + curRebornCfg.rmodel + "_png", level: skillCfg.level, desc: curRebornCfg.desc, atk: 5 * skillCfg.level + 45, hp: 50 * skillCfg.level + 550, atkDis: 100, cost: 10 * skillCfg.level + 90, skillType: 1 };
            GameApp.skillCfg[this._skillId] = obj;
            egret.localStorage.setItem(LocalStorageEnum.REBORNCFG, JSON.stringify(GameApp.skillCfg));
            return;
        }
        ViewManager.inst().open(RebornTipPopUp, [{ cost: item.cost, mid: item.mid, skillId: this._skillId, cb: function (param) {
                    if (param) {
                        item.reborn();
                    }
                }, arg: this }]);
    };
    RebornPanel.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.rebornGroup).to({ left: -500 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.rebornGroup);
            ViewManager.inst().close(RebornPanel);
        });
    };
    RebornPanel.prototype.close = function () {
        this.removeTouchEvent(this.btnReturn, this.onReturn);
        this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    return RebornPanel;
}(BaseEuiView));
__reflect(RebornPanel.prototype, "RebornPanel");
ViewManager.inst().reg(RebornPanel, LayerManager.UI_Pop);
/**
 * 神将技能----神将转生提示弹窗
 */
var RebornTipPopUp = (function (_super) {
    __extends(RebornTipPopUp, _super);
    function RebornTipPopUp() {
        return _super.call(this) || this;
    }
    RebornTipPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        egret.Tween.get(this.content).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this);
        }, this);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        this.addTouchEvent(this.sureBtn, this.onSure, true);
        this.addTouchEvent(this.cancleBtn, this.onCancle, true);
        if (param && param.length) {
            if (param[0].cost) {
                this._cost = param[0].cost;
                this.costLab.text = this._cost.toString();
            }
            if (param[0].mid) {
                this._mid = param[0].mid;
            }
            if (param[0].skillId) {
                this._skillid = param[0].skillId;
            }
            if (param[0].cb) {
                this._cb = param[0].cb;
            }
            if (param[0].arg) {
                this._arg = param[0].arg;
            }
        }
    };
    RebornTipPopUp.prototype.onSure = function () {
        var goldNum = GameApp.inst().gold;
        if (this._cost) {
            this._param = 1;
            if (this._cost > goldNum) {
                this._param = 0;
                UserTips.inst().showTips("金币不足");
                return;
            }
            else {
                this._param = 1;
                GameApp.inst().gold -= this._cost;
                UserTips.inst().showTips("转生成功");
                // if(!GameApp.reborns[this._skillid]){
                // 	GameApp.reborns
                // }
                // GameApp.rebornIds.push(this._mid);
                if (this._cb && this._arg) {
                    this._cb.call(this._arg);
                }
                // egret.localStorage.setItem(LocalStorageEnum.REBORNIDS,JSON.stringify(GameApp.rebornIds));
            }
        }
        else {
            this._param = -1;
        }
        this.onReturn();
    };
    RebornTipPopUp.prototype.onCancle = function () {
        this._param = 0;
        this.onReturn();
    };
    RebornTipPopUp.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.content).to({ verticalCenter: -500 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.inst().close(RebornTipPopUp);
            if (_this._cb && _this._arg) {
                _this._cb.call(_this._arg, _this._param);
            }
        }, this);
    };
    RebornTipPopUp.prototype.close = function () {
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        this.removeTouchEvent(this.sureBtn, this.onSure);
        this.removeTouchEvent(this.cancleBtn, this.onCancle);
    };
    return RebornTipPopUp;
}(BaseEuiView));
__reflect(RebornTipPopUp.prototype, "RebornTipPopUp");
ViewManager.inst().reg(RebornTipPopUp, LayerManager.UI_Pop);
var SettingPopUp = (function (_super) {
    __extends(SettingPopUp, _super);
    function SettingPopUp() {
        var _this = _super.call(this) || this;
        _this._barWidth = 139;
        _this._minx = 0;
        _this._maxx = 0;
        //背景音乐事件处理
        _this.musicTouch = false;
        //------------------
        //------特效事件处理---------
        _this.effectTouch = false;
        return _this;
    }
    SettingPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        MessageManager.inst().dispatch("end");
        egret.Tween.get(this.content).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
        }, this);
        this.musicBar.mask = this.musicBarMask;
        this.effectBar.mask = this.effectBarMask;
        this._minx = this.musicBar.x;
        this._maxx = this.musicBar.x + this.musicBar.width;
        this.musicBarMask.width = this._barWidth * GameApp.bgMusic;
        this.m_sound_control.x = this.musicBarMask.x + this.musicBarMask.width;
        SoundManager.inst().setBgVolume(GameApp.bgMusic);
        this.effectBarMask.width = this._barWidth * GameApp.effectMusic;
        this.e_sound_control.x = this.effectBarMask.x + this.effectBarMask.width;
        SoundManager.inst().setEffectVolume(GameApp.effectMusic);
        this.m_sound_control.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMusicTouchBegin, this);
        StageUtils.inst().getStage().addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMusicTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onMusicTouchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onMusicTouchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onMusicTouchEnd, this);
        this.e_sound_control.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onEffectTouchBegin, this);
        this.addTouchEvent(this.btnClose, this.onReturn, true);
        this.addTouchEvent(this.continueBtn, this.onReturn, true);
        this.addTouchEvent(this.exitBtn, this.onExit, true);
    };
    SettingPopUp.prototype.onExit = function () {
        this.onReturn(null, true);
    };
    SettingPopUp.prototype.onReturn = function (evt, result) {
        var _this = this;
        if (result === void 0) { result = false; }
        var self = this;
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            self.rect.alpha = 0;
        }, 300);
        egret.Tween.get(this.content).to({ verticalCenter: -500 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.inst().close(SettingPopUp);
            if (result) {
                MessageManager.inst().dispatch("closeMain");
            }
            else {
                MessageManager.inst().dispatch("start");
                //只为了调刷新接口
                ViewManager.inst().open(GameMainView);
                MessageManager.inst().dispatch(CustomEvt.CANCLESKILLCDPAUSE);
            }
        }, this);
    };
    SettingPopUp.prototype.onMusicTouchBegin = function (evt) {
        this.musicTouch = true;
    };
    ;
    SettingPopUp.prototype.onMusicTouchMove = function (evt) {
        var localP = this.content.globalToLocal(evt.stageX, evt.stageY);
        if (localP.x <= this._minx) {
            localP.x = this._minx;
        }
        if (localP.x >= this._maxx) {
            localP.x = this._maxx;
        }
        var volum = (localP.x - this.musicBar.x) / this._barWidth;
        if (this.musicTouch) {
            this.m_sound_control.x = localP.x;
            this.musicBarMask.width = this._barWidth * volum;
            GameApp.bgMusic = volum;
            SoundManager.inst().setBgVolume(volum);
        }
        if (this.effectTouch) {
            this.e_sound_control.x = localP.x;
            this.effectBarMask.width = this._barWidth * volum;
            GameApp.effectMusic = volum;
            SoundManager.inst().setEffectVolume(volum);
        }
    };
    SettingPopUp.prototype.onMusicTouchEnd = function () {
        if (this.musicTouch) {
            this.musicTouch = false;
        }
        if (this.effectTouch) {
            this.effectTouch = false;
        }
    };
    SettingPopUp.prototype.onEffectTouchBegin = function () {
        this.effectTouch = true;
    };
    ;
    SettingPopUp.prototype.close = function () {
        this.m_sound_control.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMusicTouchBegin, this);
        StageUtils.inst().getStage().removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMusicTouchMove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onMusicTouchEnd, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onMusicTouchEnd, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onMusicTouchEnd, this);
        this.removeTouchEvent(this.btnClose, this.onReturn);
        this.removeTouchEvent(this.continueBtn, this.onReturn);
        this.removeTouchEvent(this.exitBtn, this.onExit);
        this.e_sound_control.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onEffectTouchBegin, this);
    };
    return SettingPopUp;
}(BaseEuiView));
__reflect(SettingPopUp.prototype, "SettingPopUp");
ViewManager.inst().reg(SettingPopUp, LayerManager.UI_Pop);
var ShopItem = (function (_super) {
    __extends(ShopItem, _super);
    function ShopItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "ShopItemSkin";
        return _this;
    }
    ShopItem.prototype.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuy, this);
    };
    ShopItem.prototype.onBuy = function () {
        recharge.sendToNativePhurse({ Key1: this.data.costNum.toString() }, function (num) {
            GameApp.roleGold += parseInt(num);
        }, this);
    };
    ShopItem.prototype.dataChanged = function () {
        if (this.data.cost) {
            this.costLab.text = this.data.cost + "元";
        }
        if (this.data.desc) {
            this.desc.text = this.data.desc;
        }
        if (this.data.icon_title) {
            this.icon_title.source = this.data.icon_title;
        }
        if (this.data.icon) {
            this.icon.source = this.data.icon;
        }
        if (this.data.shopId) {
            this.shopId = this.data.shopId;
        }
        if (this.data.costNum) {
            this.costNum = this.data.costNum;
        }
    };
    ShopItem.prototype.dispose = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuy, this);
    };
    return ShopItem;
}(eui.ItemRenderer));
__reflect(ShopItem.prototype, "ShopItem");
var ShopPopUp = (function (_super) {
    __extends(ShopPopUp, _super);
    function ShopPopUp() {
        var _this = _super.call(this) || this;
        _this.selectIndex = 0;
        _this.dataArr = [];
        return _this;
    }
    ShopPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        MessageManager.inst().dispatch("end");
        var precentw = StageUtils.inst().getWidth() / 1334;
        this.content.scaleX = this.content.scaleY = precentw;
        egret.Tween.get(this.content).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
        }, this);
        this.arrayCollect = new eui.ArrayCollection();
        this.list.itemRenderer = ShopItem;
        this.list.dataProvider = this.arrayCollect;
        this.scroller.viewport = this.list;
        if (param && param.length) {
            this.selectIndex = param[0].selectIndex;
        }
        this.refreshDataANDview();
        // this.addTouchEvent(this.goldBtn,this.onClickGold)
        // this.addTouchEvent(this.gemBtn,this.onClickGem)
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
    };
    ShopPopUp.prototype.onReturn = function () {
        var _this = this;
        var self = this;
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            self.rect.alpha = 0;
        }, 300);
        egret.Tween.get(this.content).to({ verticalCenter: -600 }, 600, egret.Ease.circOut).call(function () {
            MessageManager.inst().dispatch("start");
            egret.Tween.removeTweens(_this.content);
            ViewManager.inst().close(ShopPopUp);
            MessageManager.inst().dispatch(CustomEvt.CANCLESKILLCDPAUSE);
        }, this);
    };
    /**点击金币商城 */
    ShopPopUp.prototype.onClickGold = function () {
        this.selectIndex = 0;
        this.refreshDataANDview();
    };
    /**点击钻石商城 */
    ShopPopUp.prototype.onClickGem = function () {
        this.selectIndex = 1;
        this.refreshDataANDview();
    };
    /**刷新商城数据以及页面 */
    ShopPopUp.prototype.refreshDataANDview = function () {
        this.dataArr = [];
        // if(this.selectIndex ==0){
        // 	this.goldBtn.currentState = "down";
        // 	this.gemBtn.currentState = "up";
        // }else{
        // 	this.goldBtn.currentState = "up";
        // 	this.gemBtn.currentState = "down";
        // }
        var shopCfg = ShopCfg.shopCfg[this.selectIndex];
        this.dataArr = shopCfg;
        this.arrayCollect.source = this.dataArr;
        this.list.dataProviderRefreshed();
    };
    ShopPopUp.prototype.close = function () {
        // this.removeTouchEvent(this.goldBtn,this.onClickGold)
        // this.removeTouchEvent(this.gemBtn,this.onClickGem)
        this.removeTouchEvent(this.returnBtn, this.onReturn);
    };
    return ShopPopUp;
}(BaseEuiView));
__reflect(ShopPopUp.prototype, "ShopPopUp");
ViewManager.inst().reg(ShopPopUp, LayerManager.UI_Pop);
var StoryPopUp = (function (_super) {
    __extends(StoryPopUp, _super);
    function StoryPopUp() {
        return _super.call(this) || this;
    }
    StoryPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.font.mask = this.fontMask;
        this.fontMask.width = 0;
        if (param[0]) {
            this._cb = param[0].cb;
            this._arg = param[0].arg;
        }
        egret.Tween.get(this.content).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            egret.Tween.get(_this.fontMask).to({ width: 734 }, 30000).call(function () {
                egret.Tween.removeTweens(_this.fontMask);
            }, _this);
        }, this);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
    };
    StoryPopUp.prototype.onReturn = function () {
        var _this = this;
        // egret.Tween.removeAllTweens();
        egret.Tween.get(this.content).to({ verticalCenter: -600 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.inst().close(StoryPopUp);
            if (_this._cb && _this._arg) {
                _this._cb.call(_this._arg);
            }
        }, this);
    };
    StoryPopUp.prototype.close = function () {
        this.removeTouchEvent(this.returnBtn, this.onReturn);
    };
    return StoryPopUp;
}(BaseEuiView));
__reflect(StoryPopUp.prototype, "StoryPopUp");
ViewManager.inst().reg(StoryPopUp, LayerManager.UI_Pop);
var UpgradePopUp = (function (_super) {
    __extends(UpgradePopUp, _super);
    function UpgradePopUp() {
        return _super.call(this) || this;
    }
    UpgradePopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        MessageManager.inst().dispatch("end");
        egret.Tween.get(this.upgradeGroup).to({ right: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.upgradeGroup);
        }, this);
        this.arraycollect = new eui.ArrayCollection();
        this.list.itemRenderer = UpgradeItem;
        this.list.dataProvider = this.arraycollect;
        this.scroller.viewport = this.list;
        var arr = [];
        arr = arr.concat(SkillCfg.skillCfg);
        arr.splice(2, 1);
        arr.pop();
        var boo = GameApp.skillCfg ? true : false;
        if (!boo) {
            GameApp.skillCfg = {};
        }
        for (var i = 0; i < arr.length; i++) {
            if (GameApp.skillCfg[arr[i].skillId]) {
                arr[i] = GameApp.skillCfg[arr[i].skillId];
            }
            else {
                GameApp.skillCfg[arr[i].skillId] = arr[i];
            }
        }
        for (var i = 0; i < 10; i++) {
            var item = { skillId: 1000 + i, rebornId: 1, skillIcon: "skill_103_png", skillTitle: "skill_103_title_png", level: 1, desc: "神将", atk: 50, hp: 550, atkDis: 100, cost: 100, skillType: 1 };
            if (GameApp.skillCfg[item.skillId]) {
                item = GameApp.skillCfg[item.skillId];
            }
            else {
                GameApp.skillCfg[item.skillId] = item;
            }
            arr.push(item);
        }
        if (!boo) {
            egret.localStorage.setItem(LocalStorageEnum.REBORNCFG, JSON.stringify(GameApp.skillCfg));
        }
        this.arraycollect.source = arr;
        this.addTouchEvent(this.btnClose, this.onReturn, true);
        this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        MessageManager.inst().addListener(CustomEvt.REBORNSUCCESS, this.onReborn, this);
        this.watcher = eui.Binding.bindHandler(GameApp, ["roleGold"], this.onGoldChange, this);
    };
    UpgradePopUp.prototype.onGoldChange = function () {
        var source = this.arraycollect.source;
        for (var i = 0; i < source.length; i++) {
            var item = this.list.$children[i];
            if (item) {
                item.changeRedPointShow(GameApp.roleGold >= source[i].cost);
            }
        }
    };
    UpgradePopUp.prototype.onReborn = function (evt) {
        for (var i = 0; i < this.list.$children.length; i++) {
            var curItem = this.list.$children[i];
            if (curItem.skillId == evt.data.skillId) {
                curItem.refresh(GameApp.skillCfg[evt.data.skillId]);
                break;
            }
        }
    };
    UpgradePopUp.prototype.onReturn = function () {
        var _this = this;
        var self = this;
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            self.rect.alpha = 0;
        }, 300);
        egret.Tween.get(this.upgradeGroup).to({ right: -500 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.upgradeGroup);
            ViewManager.inst().close(UpgradePopUp);
            MessageManager.inst().dispatch("start");
            MessageManager.inst().dispatch(CustomEvt.CANCLESKILLCDPAUSE);
        }, this);
    };
    UpgradePopUp.prototype.close = function () {
        this.removeTouchEvent(this.btnClose, this.onReturn);
        this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        if (this.watcher) {
            this.watcher.unwatch();
        }
        MessageManager.inst().removeListener(CustomEvt.REBORNSUCCESS, this.onReborn, this);
        var len = this.list.$children.length;
        for (var i = 0; i < len; i++) {
            var item = this.list.getChildAt(i);
            if (item) {
                item.dispose();
            }
        }
    };
    return UpgradePopUp;
}(BaseEuiView));
__reflect(UpgradePopUp.prototype, "UpgradePopUp");
ViewManager.inst().reg(UpgradePopUp, LayerManager.UI_Pop);
var UserTips = (function (_super) {
    __extends(UserTips, _super);
    function UserTips() {
        return _super.call(this) || this;
    }
    UserTips.inst = function () {
        var _inst = _super.single.call(this);
        return _inst;
    };
    Object.defineProperty(UserTips.prototype, "view", {
        get: function () {
            if (!this._view || !this._view.parent) {
                ViewManager.inst().open(TipsView);
                this._view = ViewManager.inst().getView(TipsView);
            }
            return this._view;
        },
        enumerable: true,
        configurable: true
    });
    UserTips.prototype.showTips = function (str, func) {
        DelayOptManager.inst().addDelayOptFunction(this.view, this.view.showTips, str);
    };
    return UserTips;
}(BaseClass));
__reflect(UserTips.prototype, "UserTips");
/**
 *
 */
var TipsItem = (function (_super) {
    __extends(TipsItem, _super);
    function TipsItem() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        _this.skinName = "TipsSkin";
        // this.bg.visible = false;
        _this.lab.stroke = 1;
        _this.lab.strokeColor = 0x000000;
        return _this;
    }
    TipsItem.prototype.setIndex = function (value) {
        this.index = value;
    };
    Object.defineProperty(TipsItem.prototype, "labelText", {
        get: function () {
            return this._labelText;
        },
        set: function (value) {
            this._labelText = value;
            this.lab.textFlow = TextFlowMaker.generateTextFlow(this._labelText);
            this.lab.alpha = 1;
            this.lab.verticalCenter = -1;
            this.pic.width = this.lab.width + 20;
            if (!this.addToEvent) {
                this.addToEvent = true;
                TimerManager.inst().doTimer(2000, 1, this.removeFromParent, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    TipsItem.prototype.removeFromParent = function () {
        this.addToEvent = false;
        DisplayUtils.removeFromParent(this);
        egret.Tween.removeTweens(this);
    };
    return TipsItem;
}(BaseView));
__reflect(TipsItem.prototype, "TipsItem");
var TipsView = (function (_super) {
    __extends(TipsView, _super);
    function TipsView() {
        var _this = _super.call(this) || this;
        _this.labCount = 0;
        _this.list = [];
        _this.initUI();
        return _this;
    }
    TipsView.prototype.close = function () {
    };
    TipsView.prototype.initUI = function () {
        this.touchChildren = false;
        this.touchEnabled = false;
    };
    TipsView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    /**
     * 显示tips
     * @param str
     */
    TipsView.prototype.showTips = function (str) {
        var tips = new TipsItem();
        tips.horizontalCenter = 0;
        var bottomNum = (StageUtils.inst().getHeight() >> 1) + 120;
        tips.bottom = bottomNum;
        this.addChild(tips);
        tips.labelText = str;
        this.list.unshift(tips);
        tips.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeTipsItem, this);
        for (var i = this.list.length - 1; i >= 0; i--) {
            egret.Tween.removeTweens(this.list[i]);
            var t = egret.Tween.get(this.list[i]);
            t.to({ "bottom": bottomNum + (i * 30) }, 300);
        }
    };
    TipsView.prototype.removeTipsItem = function (e) {
        var tips = e.currentTarget;
        tips.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeTipsItem, this);
        tips.left = NaN;
        tips.bottom = NaN;
        var index = this.list.indexOf(tips);
        this.list.splice(index, 1);
    };
    return TipsView;
}(BaseEuiView));
__reflect(TipsView.prototype, "TipsView");
ViewManager.inst().reg(TipsView, LayerManager.TIPS_LAYER);
var CardVo = (function () {
    function CardVo() {
    }
    return CardVo;
}());
__reflect(CardVo.prototype, "CardVo");

;window.Main = Main;