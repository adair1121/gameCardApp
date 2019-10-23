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
var ShopPopUp = (function (_super) {
    __extends(ShopPopUp, _super);
    function ShopPopUp() {
        var _this = _super.call(this) || this;
        _this.selectIndex = 0;
        _this.dataArr = [];
        return _this;
    }
    ShopPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        egret.Tween.get(this.content).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
        }, this);
        this.arrayCollect = new eui.ArrayCollection();
        this.list.itemRenderer = ShopItem;
        this.list.dataProvider = this.arrayCollect;
        this.scroller.viewport = this.list;
        if (param && param.length) {
            this.selectIndex = param[0].selectIndex;
        }
        this.refreshDataANDview();
        this.addTouchEvent(this.goldBtn, this.onClickGold);
        this.addTouchEvent(this.gemBtn, this.onClickGem);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
    };
    ShopPopUp.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.content).to({ verticalCenter: -600 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.inst().close(ShopPopUp);
        }, this);
    };
    /**点击金币商城 */
    ShopPopUp.prototype.onClickGold = function () {
        this.selectIndex = 0;
        this.refreshDataANDview();
    };
    /**点击钻石商城 */
    ShopPopUp.prototype.onClickGem = function () {
        this.selectIndex = 1;
        this.refreshDataANDview();
    };
    /**刷新商城数据以及页面 */
    ShopPopUp.prototype.refreshDataANDview = function () {
        this.dataArr = [];
        if (this.selectIndex == 0) {
            this.goldBtn.currentState = "down";
            this.gemBtn.currentState = "up";
        }
        else {
            this.goldBtn.currentState = "up";
            this.gemBtn.currentState = "down";
        }
        var shopCfg = ShopCfg.shopCfg[this.selectIndex];
        this.dataArr = shopCfg;
        this.arrayCollect.source = this.dataArr;
        this.list.dataProviderRefreshed();
    };
    ShopPopUp.prototype.close = function () {
        this.removeTouchEvent(this.goldBtn, this.onClickGold);
        this.removeTouchEvent(this.gemBtn, this.onClickGem);
        this.removeTouchEvent(this.returnBtn, this.onReturn);
    };
    return ShopPopUp;
}(BaseEuiView));
__reflect(ShopPopUp.prototype, "ShopPopUp");
ViewManager.inst().reg(ShopPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=ShopPopUp.js.map