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
var UpgradePopUp = (function (_super) {
    __extends(UpgradePopUp, _super);
    function UpgradePopUp() {
        return _super.call(this) || this;
    }
    UpgradePopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        MessageManager.inst().dispatch("end");
        egret.Tween.get(this.upgradeGroup).to({ right: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.upgradeGroup);
        }, this);
        this.arraycollect = new eui.ArrayCollection();
        this.list.itemRenderer = UpgradeItem;
        this.list.dataProvider = this.arraycollect;
        this.scroller.viewport = this.list;
        var arr = [];
        arr = arr.concat(SkillCfg.skillCfg);
        arr.splice(2, 1);
        arr.pop();
        var boo = GameApp.skillCfg ? true : false;
        if (!boo) {
            GameApp.skillCfg = {};
        }
        for (var i = 0; i < arr.length; i++) {
            if (GameApp.skillCfg[arr[i].skillId]) {
                arr[i] = GameApp.skillCfg[arr[i].skillId];
            }
            else {
                GameApp.skillCfg[arr[i].skillId] = arr[i];
            }
        }
        for (var i = 0; i < 10; i++) {
            var item = { skillId: 1000 + i, rebornId: 1, skillIcon: "skill_103_png", skillTitle: "skill_103_title_png", level: 1, desc: "神将", atk: 50, hp: 550, atkDis: 100, cost: 100, skillType: 1 };
            if (GameApp.skillCfg[item.skillId]) {
                item = GameApp.skillCfg[item.skillId];
            }
            else {
                GameApp.skillCfg[item.skillId] = item;
            }
            arr.push(item);
        }
        if (!boo) {
            egret.localStorage.setItem(LocalStorageEnum.REBORNCFG, JSON.stringify(GameApp.skillCfg));
        }
        this.arraycollect.source = arr;
        this.addTouchEvent(this.btnClose, this.onReturn, true);
        this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        MessageManager.inst().addListener(CustomEvt.REBORNSUCCESS, this.onReborn, this);
        this.watcher = eui.Binding.bindHandler(GameApp, ["roleGold"], this.onGoldChange, this);
    };
    UpgradePopUp.prototype.onGoldChange = function () {
        var source = this.arraycollect.source;
        for (var i = 0; i < source.length; i++) {
            var item = this.list.$children[i];
            if (item) {
                item.changeRedPointShow(GameApp.roleGold >= source[i].cost);
            }
        }
    };
    UpgradePopUp.prototype.onReborn = function (evt) {
        for (var i = 0; i < this.list.$children.length; i++) {
            var curItem = this.list.$children[i];
            if (curItem.skillId == evt.data.skillId) {
                curItem.refresh(GameApp.skillCfg[evt.data.skillId]);
                break;
            }
        }
    };
    UpgradePopUp.prototype.onReturn = function () {
        var _this = this;
        var self = this;
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            self.rect.alpha = 0;
        }, 300);
        egret.Tween.get(this.upgradeGroup).to({ right: -500 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.upgradeGroup);
            ViewManager.inst().close(UpgradePopUp);
            MessageManager.inst().dispatch("start");
            MessageManager.inst().dispatch(CustomEvt.CANCLESKILLCDPAUSE);
        }, this);
    };
    UpgradePopUp.prototype.close = function () {
        this.removeTouchEvent(this.btnClose, this.onReturn);
        this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        if (this.watcher) {
            this.watcher.unwatch();
        }
        MessageManager.inst().removeListener(CustomEvt.REBORNSUCCESS, this.onReborn, this);
        var len = this.list.$children.length;
        for (var i = 0; i < len; i++) {
            var item = this.list.getChildAt(i);
            if (item) {
                item.dispose();
            }
        }
    };
    return UpgradePopUp;
}(BaseEuiView));
__reflect(UpgradePopUp.prototype, "UpgradePopUp");
ViewManager.inst().reg(UpgradePopUp, LayerManager.UI_Pop);
//# sourceMappingURL=UpgradePopUp.js.map