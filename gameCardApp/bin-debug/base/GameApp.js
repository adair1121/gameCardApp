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
 * @author
 */
var GameApp = (function (_super) {
    __extends(GameApp, _super);
    function GameApp() {
        return _super.call(this) || this;
    }
    GameApp.prototype.load = function () {
        eui.Label.default_fontFamily = "Microsoft YaHei";
        GlobalConfig.parserData();
        GameMap.init(RES.getRes("map_json"));
        LoadingUI.inst().hide();
        ViewManager.ins().open(GameMainView);
        ViewManager.ins().open(StartGameView);
    };
    GameApp.prototype.onDataCallBack = function (value) {
        if (value) {
            GameApp.phurseState = false;
            GameApp.pay_cbDdata = "";
            UserTips.ins().showTips("\u8D2D\u4E70\u6210\u529F,\u83B7\u5F97\u5143\u5B9Dx" + value);
        }
    };
    GameApp.prototype.postPerLoadProgress = function (itemsLoaded, itemsTotal) {
        return [itemsLoaded, itemsTotal];
    };
    GameApp.phurseState = false;
    return GameApp;
}(BaseClass));
__reflect(GameApp.prototype, "GameApp");
MessageCenter.compile(GameApp);
//# sourceMappingURL=GameApp.js.map