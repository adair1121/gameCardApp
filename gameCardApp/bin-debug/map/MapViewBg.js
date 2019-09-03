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
 * MapView
 */
var MapViewBg = (function (_super) {
    __extends(MapViewBg, _super);
    // private oldImgs = {};
    function MapViewBg() {
        var _this = _super.call(this) || this;
        _this._shape = new egret.Shape;
        _this.lastUpdateX = 0;
        _this.lastUpdateY = 0;
        _this.turn = 0;
        //this.cacheAsBitmap = true;
        _this.touchChildren = false;
        _this.touchEnabled = false;
        _this._imageList = [];
        _this.showImages = [];
        _this._poolImages = [];
        _this._fileDic = {};
        _this.updateHDMap(MAP_DIR + "/");
        return _this;
    }
    MapViewBg.prototype.clearHDMap = function () {
        this._imageList = [];
        this.showImages = [];
        this.removeChildren();
    };
    MapViewBg.prototype.getImage = function () {
        return this._poolImages.pop() || new eui.Image();
    };
    MapViewBg.prototype.updateHDMap = function (str) {
        this.clear();
        var imgSize = 256;
        this.maxImagX = Math.ceil(GameMap.MAX_WIDTH / imgSize);
        this.maxImagY = Math.ceil(GameMap.MAX_HEIGHT / imgSize);
        var shows = [];
        for (var i = 0; i < this.maxImagX; i++) {
            for (var j = 0; j < this.maxImagY; j++) {
                var sourceName = "" + str + i + "_" + j + ".jpg";
                var s = this.getImage();
                s.source = sourceName;
                s.name = sourceName;
                s.x = i * imgSize;
                s.y = j * imgSize;
                this.addChild(s);
            }
        }
    };
    MapViewBg.prototype.clear = function () {
        this.clearHDMap();
    };
    return MapViewBg;
}(egret.DisplayObjectContainer));
__reflect(MapViewBg.prototype, "MapViewBg");
//# sourceMappingURL=MapViewBg.js.map