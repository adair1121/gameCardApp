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
//# sourceMappingURL=ViewManager.js.map