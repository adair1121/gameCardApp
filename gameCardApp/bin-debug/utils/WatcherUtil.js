/**
 * Created by hrz on 2017/7/3.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
//# sourceMappingURL=WatcherUtil.js.map