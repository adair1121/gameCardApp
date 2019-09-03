var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
//# sourceMappingURL=DebugUtils.js.map