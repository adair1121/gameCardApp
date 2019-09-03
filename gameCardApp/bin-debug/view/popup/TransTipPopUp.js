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
/**公共的提示 */
var TransTipPopUp = (function (_super) {
    __extends(TransTipPopUp, _super);
    function TransTipPopUp() {
        return _super.call(this) || this;
    }
    TransTipPopUp.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (param[0].cb) {
            this.cb = param[0].cb;
        }
        if (param[0].arg) {
            this.arg = param[0].arg;
        }
        if (param[0].txt) {
            this.txtLab.text = param[0].txt;
        }
        this.addTouchEvent(this.sureBtn, this.onSure, true);
        this.addTouchEvent(this.cancleBtn, this.onCancle, true);
    };
    TransTipPopUp.prototype.onSure = function () {
        if (this.cb && this.arg) {
            this.cb.call(this.arg, 1);
        }
        ViewManager.ins().close(TransTipPopUp);
    };
    TransTipPopUp.prototype.onCancle = function () {
        if (this.cb && this.arg) {
            this.cb.call(this.arg, 0);
        }
        ViewManager.ins().close(TransTipPopUp);
    };
    TransTipPopUp.prototype.close = function () {
        this.removeTouchEvent(this.sureBtn, this.onSure);
        this.removeTouchEvent(this.cancleBtn, this.onCancle);
    };
    return TransTipPopUp;
}(BaseEuiView));
__reflect(TransTipPopUp.prototype, "TransTipPopUp");
ViewManager.ins().reg(TransTipPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=TransTipPopUp.js.map