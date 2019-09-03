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
var CollectItem = (function (_super) {
    __extends(CollectItem, _super);
    function CollectItem() {
        var _this = _super.call(this) || this;
        _this.hitState = false;
        return _this;
    }
    CollectItem.prototype.init = function () {
        // if(this._cfg.resType){
        // 	//mc
        // 	this._mc=  new MovieClip();
        // 	this.addChild(this._mc);
        // 	this.resetPos();
        // 	this._mc.playFile(`${EFFECT}${this._cfg.res}`,-1);
        // }else{
        this._img = new eui.Image();
        this._img.anchorOffsetX = this._cfg.w >> 1;
        this._img.anchorOffsetY = this._cfg.h >> 1;
        this.addChild(this._img);
        this._img.source = this._cfg.res;
        this.resetPos();
        // }
        var rect = new egret.Rectangle(this._cfg.x, this._cfg.y, this._cfg.w, this._cfg.h);
        this._area = GameMap.calculBuildGridArea(rect);
    };
    CollectItem.prototype.createShadow = function () {
        var sp = new egret.Shape();
        sp.graphics.beginFill(0x000000, 0.4);
        sp.graphics.drawEllipse(0, 0, 20, 10);
        sp.graphics.endFill();
        this.addChild(sp);
        sp.anchorOffsetX = sp.width >> 1;
        sp.anchorOffsetY = sp.height >> 1;
    };
    CollectItem.prototype.resetPos = function () {
        this.x = this._cfg.x;
        this.y = this._cfg.y;
    };
    Object.defineProperty(CollectItem.prototype, "Cfg", {
        get: function () {
            return this._cfg;
        },
        set: function (value) {
            this._cfg = value;
            this.init();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectItem.prototype, "area", {
        get: function () {
            return this._area;
        },
        enumerable: true,
        configurable: true
    });
    return CollectItem;
}(egret.Sprite));
__reflect(CollectItem.prototype, "CollectItem");
//# sourceMappingURL=CollectItem.js.map