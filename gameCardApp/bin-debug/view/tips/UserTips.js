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
var UserTips = (function (_super) {
    __extends(UserTips, _super);
    function UserTips() {
        return _super.call(this) || this;
    }
    Object.defineProperty(UserTips.prototype, "view", {
        get: function () {
            if (!this._view || !this._view.parent) {
                ViewManager.ins().open(TipsView);
                this._view = ViewManager.ins().getView(TipsView);
            }
            return this._view;
        },
        enumerable: true,
        configurable: true
    });
    UserTips.prototype.showTips = function (str, func) {
        DelayOptManager.ins().addDelayOptFunction(this.view, this.view.showTips, str);
    };
    return UserTips;
}(BaseClass));
__reflect(UserTips.prototype, "UserTips");
//# sourceMappingURL=UserTips.js.map