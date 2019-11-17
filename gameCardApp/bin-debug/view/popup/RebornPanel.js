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
var RebornPanel = (function (_super) {
    __extends(RebornPanel, _super);
    function RebornPanel() {
        return _super.call(this) || this;
    }
    RebornPanel.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        egret.Tween.get(this.rebornGroup).to({ left: 10 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.rebornGroup);
        });
        this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        this.addTouchEvent(this.btnReturn, this.onReturn, true);
        this.arrayCollect = new eui.ArrayCollection();
        this.list.itemRenderer = RebornItem;
        this.list.dataProvider = this.arrayCollect;
        this.scroller.viewport = this.list;
        this.scroller.horizontalScrollBar.autoVisibility = false;
        this.scroller.horizontalScrollBar.visible = false;
        var dataArr = [];
        this._skillId = param[0].skillId;
        var cfgs = RebornCfg.cfg;
        for (var key in cfgs) {
            if (cfgs[key].cost != 0) {
                var obj = cfgs[key];
                obj.skillId = this._skillId;
                // if(!!~GameApp.rebornIds.indexOf(cfgs[key].id)){
                // 	obj["rebornBoo"] = true;
                // }else{
                // 	obj["rebornBoo"] = false;
                // }
                dataArr.push(obj);
            }
        }
        this.arrayCollect.source = dataArr;
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    RebornPanel.prototype.onItemTap = function (evt) {
        var item = this.list.getChildAt(evt.itemIndex);
        if (item.ifReborn) {
            UserTips.inst().showTips("已切换转生职业");
            var skillCfg = GameApp.skillCfg[this._skillId];
            var rebornCfg = RebornCfg.cfg;
            var curRebornCfg = null;
            for (var i = 0; i < rebornCfg.length; i++) {
                if (rebornCfg[i].mid == item.mid) {
                    curRebornCfg = rebornCfg[i];
                    break;
                }
            }
            var obj = { skillId: this._skillId, rebornId: item.mid, skillIcon: item.icon, skillTitle: "skill_103_title_png", level: skillCfg.level, desc: curRebornCfg.desc, atk: 5 * skillCfg.level + 45, hp: 50 * skillCfg.level + 450, atkDis: 100, cost: 10 * skillCfg.level + 90, skillType: 1 };
            GameApp.skillCfg[this._skillId] = obj;
            egret.localStorage.setItem(LocalStorageEnum.REBORNCFG, JSON.stringify(GameApp.skillCfg));
            return;
        }
        ViewManager.inst().open(RebornTipPopUp, [{ cost: item.cost, mid: item.mid, skillId: this._skillId, cb: function (param) {
                    if (param) {
                        item.reborn();
                    }
                }, arg: this }]);
    };
    RebornPanel.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.rebornGroup).to({ left: -500 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.rebornGroup);
            ViewManager.inst().close(RebornPanel);
        });
    };
    RebornPanel.prototype.close = function () {
        this.removeTouchEvent(this.btnReturn, this.onReturn);
        this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    return RebornPanel;
}(BaseEuiView));
__reflect(RebornPanel.prototype, "RebornPanel");
ViewManager.inst().reg(RebornPanel, LayerManager.UI_Pop);
//# sourceMappingURL=RebornPanel.js.map