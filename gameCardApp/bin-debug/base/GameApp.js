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
    /**总波数 增加 比例 5关加一波 */ ;
    GameApp.inst = function () {
        var _inst = _super.single.call(this);
        return _inst;
    };
    GameApp.prototype.load = function () {
        eui.Label.default_fontFamily = "Microsoft YaHei";
        GlobalConfig.parserData();
        GameMap.init(RES.getRes("map_json"));
        LoadingUI.inst().hide();
        ViewManager.inst().open(GameMainView);
        ViewManager.inst().open(StartGameView);
        var goldstr = egret.localStorage.getItem(LocalStorageEnum.ROLE_GOLD);
        if (!goldstr) {
            GameApp.roleGold = 100000;
        }
        else {
            GameApp.roleGold = parseInt(goldstr);
        }
        var gemstr = egret.localStorage.getItem(LocalStorageEnum.ROLE_GEM);
        if (!gemstr) {
            GameApp.roleGem = 10;
        }
        else {
            GameApp.roleGem = parseInt(gemstr);
        }
        var rebonidstr = egret.localStorage.getItem(LocalStorageEnum.REBORNIDS);
        if (!rebonidstr) {
            GameApp.rebornIds = [];
        }
        else {
            GameApp.rebornIds = JSON.parse(rebonidstr);
        }
        var levelstr = egret.localStorage.getItem(LocalStorageEnum.LEVEL);
        if (!levelstr) {
            GameApp.level = 1;
        }
        else {
            GameApp.level = parseInt(levelstr);
        }
        eui.Binding.bindHandler(GameApp, ["level"], this.levelChange, this);
    };
    GameApp.prototype.levelChange = function () {
        egret.localStorage.setItem(LocalStorageEnum.LEVEL, GameApp.level.toString());
    };
    GameApp.prototype.onDataCallBack = function (value) {
        if (value) {
            GameApp.phurseState = false;
            GameApp.pay_cbDdata = "";
            UserTips.inst().showTips("\u8D2D\u4E70\u6210\u529F,\u83B7\u5F97\u5143\u5B9Dx" + value);
        }
    };
    GameApp.prototype.refreshTimespan = function () {
        var refreshTimestr = egret.localStorage.getItem(LocalStorageEnum.BOX_REFRESH_TIMESPAN);
        if (refreshTimestr) {
            var nowTime = new Date().getTime();
            if (nowTime >= parseInt(refreshTimestr)) {
                //刷新
                egret.localStorage.setItem(LocalStorageEnum.BOX_REWARD_GET, "0");
                egret.localStorage.setItem(LocalStorageEnum.BOX_REFRESH_TIMESPAN, "0");
                egret.localStorage.setItem(LocalStorageEnum.BOX_REFRESH_TIMESPAN, GlobalFun.getBoxRfreshTimeSpan().toString());
            }
        }
        else {
            egret.localStorage.setItem(LocalStorageEnum.BOX_REFRESH_TIMESPAN, GlobalFun.getBoxRfreshTimeSpan().toString());
        }
    };
    Object.defineProperty(GameApp.prototype, "gold", {
        get: function () {
            return GameApp.roleGold;
        },
        set: function (value) {
            GameApp.roleGold = value;
            egret.localStorage.setItem(LocalStorageEnum.ROLE_GOLD, value.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameApp.prototype, "gem", {
        get: function () {
            return GameApp.roleGem;
        },
        set: function (value) {
            GameApp.roleGem = value;
            egret.localStorage.setItem(LocalStorageEnum.ROLE_GEM, value.toString());
        },
        enumerable: true,
        configurable: true
    });
    GameApp.prototype.postPerLoadProgress = function (itemsLoaded, itemsTotal) {
        return [itemsLoaded, itemsTotal];
    };
    GameApp.phurseState = false;
    GameApp.roleGold = 0;
    GameApp.roleGem = 0;
    GameApp.rebornIds = [];
    GameApp.level = 1;
    GameApp.totalCount = 5;
    return GameApp;
}(BaseClass));
__reflect(GameApp.prototype, "GameApp");
MessageCenter.compile(GameApp);
//# sourceMappingURL=GameApp.js.map