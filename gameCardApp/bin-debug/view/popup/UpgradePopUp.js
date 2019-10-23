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
        egret.Tween.get(this.upgradeGroup).to({ right: 10 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.upgradeGroup);
        }, this);
        this.arraycollect = new eui.ArrayCollection();
        this.list.itemRenderer = UpgradeItem;
        this.list.dataProvider = this.arraycollect;
        this.scroller.viewport = this.list;
        var arr = SkillCfg.skillCfg;
        this.arraycollect.source = arr;
        this.addTouchEvent(this.btnClose, this.onReturn, true);
    };
    UpgradePopUp.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.upgradeGroup).to({ right: -700 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.upgradeGroup);
            ViewManager.inst().close(UpgradePopUp);
        }, this);
    };
    UpgradePopUp.prototype.close = function () {
        this.removeTouchEvent(this.btnClose, this.onReturn);
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