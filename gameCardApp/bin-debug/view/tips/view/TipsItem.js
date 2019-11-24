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
 *
 */
var TipsItem = (function (_super) {
    __extends(TipsItem, _super);
    function TipsItem() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        _this.skinName = "TipsSkin";
        // this.bg.visible = false;
        _this.lab.stroke = 1;
        _this.lab.strokeColor = 0x000000;
        return _this;
    }
    TipsItem.prototype.setIndex = function (value) {
        this.index = value;
    };
    Object.defineProperty(TipsItem.prototype, "labelText", {
        get: function () {
            return this._labelText;
        },
        set: function (value) {
            this._labelText = value;
            this.lab.textFlow = TextFlowMaker.generateTextFlow(this._labelText);
            this.lab.alpha = 1;
            this.lab.verticalCenter = -1;
            this.pic.width = this.lab.width + 20;
            if (!this.addToEvent) {
                this.addToEvent = true;
                TimerManager.inst().doTimer(2000, 1, this.removeFromParent, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    TipsItem.prototype.removeFromParent = function () {
        this.addToEvent = false;
        DisplayUtils.removeFromParent(this);
        egret.Tween.removeTweens(this);
        ObjectPool.push(this);
    };
    return TipsItem;
}(BaseView));
__reflect(TipsItem.prototype, "TipsItem");
//# sourceMappingURL=TipsItem.js.map