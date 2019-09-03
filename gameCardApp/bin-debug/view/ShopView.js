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
var ShopView = (function (_super) {
    __extends(ShopView, _super);
    function ShopView() {
        return _super.call(this) || this;
    }
    ShopView.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        egret.Tween.get(this.content).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
        });
        this.addTouchEvent(this.btnClose, this.onReturn, true);
        this.arrayCollect = new eui.ArrayCollection();
        this.list.itemRenderer = ShopItem;
        this.list.dataProvider = this.arrayCollect;
        var shopcfg = ShopCfg.shopCfgs;
        var arr = [];
        for (var key in shopcfg) {
            arr.push(shopcfg[key]);
        }
        this.arrayCollect.source = arr;
    };
    ShopView.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.content).to({ verticalCenter: -600 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.ins().close(ShopView);
        });
    };
    ShopView.prototype.close = function () {
        this.removeTouchEvent(this.btnClose, this.onReturn);
        var len = this.list.$children.length;
        for (var i = 0; i < len; i++) {
            var item = this.list.getChildAt(i);
            if (item) {
                item.dispose();
            }
        }
    };
    return ShopView;
}(BaseEuiView));
__reflect(ShopView.prototype, "ShopView");
ViewManager.ins().reg(ShopView, LayerManager.UI_Pop);
//# sourceMappingURL=ShopView.js.map