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
        var vo = ObjectPool.pop("MessageVo");
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
        ObjectPool.push(msgVo);
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
                    MessageCenter.ins().dispatch(msgname_1, data);
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
            MessageCenter.ins().addListener(func.funcallname, listener, thisObj);
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
            MessageCenter.ins().dispatch(msgname, data);
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
//# sourceMappingURL=MessageCenter.js.map