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
        this.addTouchEvent(this.btnReturn, this.onReturn, true);
        this.arrayCollect = new eui.ArrayCollection();
        this.list.itemRenderer = RebornItem;
        this.list.dataProvider = this.arrayCollect;
        this.scroller.viewport = this.list;
        this.scroller.verticalScrollBar.autoVisibility = false;
        this.scroller.verticalScrollBar.visible = false;
        var dataArr = [];
        var cfgs = RebornCfg.cfg;
        for (var key in cfgs) {
            var obj = cfgs[key];
            if (!!~GameApp.rebornIds.indexOf(cfgs[key].id)) {
                obj["rebornBoo"] = true;
            }
            else {
                obj["rebornBoo"] = false;
            }
            dataArr.push(obj);
        }
        this.arrayCollect.source = dataArr;
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    RebornPanel.prototype.onItemTap = function (evt) {
        var item = this.list.getChildAt(evt.itemIndex);
        if (item.ifReborn) {
            UserTips.inst().showTips("已转生过此职业");
            return;
        }
        ViewManager.inst().open(RebornTipPopUp, [{ cost: item.cost, mid: item.mid }]);
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
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    return RebornPanel;
}(BaseEuiView));
__reflect(RebornPanel.prototype, "RebornPanel");
ViewManager.inst().reg(RebornPanel, LayerManager.UI_Pop);
//# sourceMappingURL=RebornPanel.js.map