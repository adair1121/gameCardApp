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
var StartGameView = (function (_super) {
    __extends(StartGameView, _super);
    function StartGameView() {
        return _super.call(this) || this;
    }
    StartGameView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var firstStr = egret.localStorage.getItem(LocalStorageEnum.ENTER_FIRST);
        if (!firstStr) {
            egret.localStorage.setItem(LocalStorageEnum.ENTER_FIRST, "1");
            ViewManager.ins().open(StoryPopUp);
        }
        this.addTouchEvent(this.storyBtn, this.onLookStory, true);
        this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnter, this);
    };
    /**进入游戏 */
    StartGameView.prototype.onEnter = function (evt) {
        ViewManager.ins().close(StartGameView);
        ViewManager.ins().open(GameMainView);
    };
    /**查看故事 */
    StartGameView.prototype.onLookStory = function () {
        ViewManager.ins().open(StoryPopUp);
    };
    StartGameView.prototype.close = function () {
        this.addTouchEvent(this.storyBtn, this.onLookStory, true);
        this.enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnter, this);
    };
    return StartGameView;
}(BaseEuiView));
__reflect(StartGameView.prototype, "StartGameView");
ViewManager.ins().reg(StartGameView, LayerManager.UI_Main);
//# sourceMappingURL=StartGameView.js.map