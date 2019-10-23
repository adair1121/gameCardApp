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
//# sourceMappingURL=MessageManager.js.map