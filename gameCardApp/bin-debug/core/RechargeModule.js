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
//# sourceMappingURL=RechargeModule.js.map