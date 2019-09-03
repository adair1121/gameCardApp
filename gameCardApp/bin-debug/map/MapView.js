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
 * 游戏地图
 * @author
 */
var MapView = (function (_super) {
    __extends(MapView, _super);
    // private _transMc:MovieClip;
    // private _npcWoodGroup:eui.Group;
    // private _npc_wood:eui.Image;
    // private _npcWoodTitle:eui.Image;
    function MapView() {
        var _this = _super.call(this) || this;
        _this.initia = false;
        return _this;
    }
    MapView.prototype.initMap = function () {
        if (this.initia) {
            return;
        }
        this.initia = true;
        this._mapImage = new MapViewBg();
        LayerManager.MAP_LAYER.addChild(this._mapImage);
        this._itemLayer = new egret.DisplayObjectContainer();
        LayerManager.MAP_LAYER.addChild(this._itemLayer);
        // this._npcWoodGroup = new eui.Group();
        // LayerManager.MAP_LAYER.addChild(this._npcWoodGroup);
        // this._npcWoodGroup.x = 1157;
        // this._npcWoodGroup.y = 154;
        // this._npc_wood = new eui.Image();
        // this._npc_wood.source = "npc_wood_png"
        // this._npcWoodGroup.addChild(this._npc_wood);
        // this._npcWoodTitle = new eui.Image();
        // this._npcWoodGroup.addChild(this._npcWoodTitle);
        // this._npcWoodTitle.source = "npc_wood_title_png";
        // this._npcWoodTitle.horizontalCenter = 0;
        // this._npcWoodTitle.verticalCenter = -35;
        // this._transMc = new MovieClip();
        // LayerManager.MAP_LAYER.addChild(this._transMc);
        // this._transMc.playFile(`${EFFECT}trans`,-1);
        // this._transMc.x = 2553;
        // this._transMc.y = 600;
        // this.drawTestGrid();
    };
    /**清除item */
    MapView.prototype.clearItem = function () {
        this._itemLayer.removeChildren();
    };
    /**开启新手收集过程 mapview中随机添加一些物品 返回区域格子*/
    MapView.prototype.addToMapLayer = function (obj) {
        var collectItem = new CollectItem();
        collectItem.Cfg = obj;
        this._itemLayer.addChild(collectItem);
        return collectItem.area;
    };
    /**刷新地图视口 */
    MapView.prototype.refrehMapViewPort = function (offestX, offestY) {
        if (offestX === void 0) { offestX = 0; }
        if (offestY === void 0) { offestY = 0; }
        this._offestX = offestX >> 0;
        this._offestY = offestY >> 0;
        this._offestGridPos = GameMap.point2Grid(offestX, offestY);
        var hero = EntityManager.ins().getEntity(GameApp.ins().role_insId);
        this._hero = hero;
        var speedX = hero.x + (offestX >> 0);
        var speedY = hero.y + (offestY >> 0);
        hero.x = speedX;
        hero.y = speedY;
        this.globP = hero.parent.localToGlobal(hero.x, hero.y);
        // let centerXDis:number = Math.abs(globalP.x - (StageUtils.ins<StageUtils>().getWidth()>>1));
        // let centerYDis:number = Math.abs(globalP.y - (StageUtils.ins<StageUtils>().getHeight()>>1));
        if (!this.juageIfInXBorder()) {
            this.judageMapImgX();
        }
        if (!this.juageIfInYBorder()) {
            this.judageMapImgY();
        }
        if (this._hero.x < (this._hero.width >> 1)) {
            this._hero.x = (this._hero.width >> 1);
        }
        if (this._hero.x > GameMap.MAX_WIDTH - this._hero.width) {
            this._hero.x = GameMap.MAX_WIDTH - this._hero.width;
        }
        if (this._hero.y < (this._hero.height >> 1)) {
            this._hero.y = (this._hero.height >> 1);
        }
        if (this._hero.y > GameMap.MAX_HEIGHT - this._hero.height) {
            this._hero.y = GameMap.MAX_HEIGHT - this._hero.height;
        }
        this.hitItem(hero.x, hero.y);
    };
    //item层 位置检测 。处于人物周围的物品被收取
    MapView.prototype.hitItem = function (x, y) {
        var _this = this;
        var heroP = LayerManager.MAP_LAYER.localToGlobal(x, y);
        var _loop_1 = function (i) {
            var item = this_1._itemLayer.getChildAt(i);
            var p = this_1._itemLayer.localToGlobal(item.x, item.y);
            var disX = Math.abs(heroP.x - p.x);
            var disY = Math.abs(heroP.y - p.y);
            if (disX <= 80 && disY <= 80 && !item.hitState) {
                if (item.Cfg.resType) {
                    //触发答题宝箱
                    // item.parent.removeChild(item);
                    item.hitState = true;
                    var timeout_1 = setTimeout(function () {
                        clearTimeout(timeout_1);
                        if (item) {
                            item.hitState = false;
                        }
                    }, 5000);
                    StageUtils.ins().getStage().dispatchEvent(new StartGameEvent(StartGameEvent.VJ_END));
                    ViewManager.ins().open(AnswerPopUp, [{ isWild: 1, cb: function () {
                                StageUtils.ins().getStage().dispatchEvent(new StartGameEvent(StartGameEvent.REMOVE_ITEM, { area: item.area }));
                                item.parent.removeChild(item);
                            }, arg: this_1 }]);
                }
                else {
                    egret.Tween.get(item).to({ alpha: 0 }, 200, egret.Ease.circIn).call(function () {
                        StageUtils.ins().getStage().dispatchEvent(new StartGameEvent(StartGameEvent.REMOVE_ITEM, { area: item.area }));
                        egret.Tween.removeTweens(item);
                        item.parent.removeChild(item);
                        _this.refreshGoods(item.Cfg.res, item.Cfg.itemName);
                    }, this_1);
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < this._itemLayer.numChildren; i++) {
            _loop_1(i);
        }
    };
    MapView.prototype.refreshGoods = function (key, name, minValue, offestValue) {
        if (minValue === void 0) { minValue = 4; }
        if (offestValue === void 0) { offestValue = 5; }
        var goodsStr = egret.localStorage.getItem(LocalStorageEnum.GOODS);
        var randomNum = (Math.random() * minValue + offestValue) >> 0;
        if (goodsStr) {
            var obj = JSON.parse(goodsStr);
            if (obj[key]) {
                obj[key] += randomNum;
            }
            else {
                obj[key] = randomNum;
            }
            egret.localStorage.setItem(LocalStorageEnum.GOODS, JSON.stringify(obj));
        }
        else {
            var obj = {};
            obj[key] = randomNum;
            egret.localStorage.setItem(LocalStorageEnum.GOODS, JSON.stringify(obj));
        }
        UserTips.ins().showTips("\u83B7\u5F97" + name + "+" + randomNum);
        var ownNum = egret.localStorage.getItem(LocalStorageEnum.GOODS_NUM);
        var num = ownNum ? (parseInt(ownNum) + randomNum) : randomNum;
        egret.localStorage.setItem(LocalStorageEnum.GOODS_NUM, num.toString());
        return randomNum;
    };
    //判断是否在X边界
    MapView.prototype.juageIfInXBorder = function () {
        return (this._hero.x <= StageUtils.ins().getWidth() >> 1) || (this._hero.x >= (GameMap.MAX_WIDTH - (StageUtils.ins().getWidth() >> 1)));
    };
    //判断是否在X边界
    MapView.prototype.juageIfInYBorder = function () {
        return (this._hero.y <= StageUtils.ins().getHeight() >> 1) || (this._hero.y >= (GameMap.MAX_HEIGHT - (StageUtils.ins().getHeight() >> 1)));
    };
    //判断地图x边界移动处理
    MapView.prototype.judageMapImgX = function () {
        LayerManager.MAP_LAYER.x -= this._offestX;
        if (LayerManager.MAP_LAYER.x < -(GameMap.MAX_WIDTH - StageUtils.ins().getWidth())) {
            LayerManager.MAP_LAYER.x = -(GameMap.MAX_WIDTH - StageUtils.ins().getWidth());
        }
        if (LayerManager.MAP_LAYER.x > 0) {
            LayerManager.MAP_LAYER.x = 0;
        }
    };
    //判断地图y边界移动处理
    MapView.prototype.judageMapImgY = function () {
        LayerManager.MAP_LAYER.y -= this._offestY;
        if (LayerManager.MAP_LAYER.y < -(GameMap.MAX_HEIGHT - StageUtils.ins().getHeight())) {
            LayerManager.MAP_LAYER.y = -(GameMap.MAX_HEIGHT - StageUtils.ins().getHeight());
        }
        if (LayerManager.MAP_LAYER.y > 0) {
            LayerManager.MAP_LAYER.y = 0;
        }
    };
    MapView.prototype.drawTestGrid = function () {
        this._shapeContainer = new egret.DisplayObjectContainer();
        this._shapeContainer.cacheAsBitmap = true;
        this._shapeContainer.touchEnabled = false;
        this._shapeContainer.touchChildren = false;
        var maxX = GameMap.COL;
        var maxY = GameMap.ROW;
        for (var i = 0; i < maxY; i++) {
            for (var j = 0; j < maxX; j++) {
                if (!GameMap.walkable(i, j)) {
                    var rect = new egret.Shape();
                    rect.graphics.clear();
                    rect.graphics.lineStyle(0.1);
                    rect.graphics.beginFill(0xff0000, 0.3);
                    rect.graphics.drawRect(i * GameMap.CELL_SIZE, j * GameMap.CELL_SIZE, GameMap.CELL_SIZE, GameMap.CELL_SIZE);
                    rect.graphics.endFill();
                    var text = new eui.Label();
                    text.size = 12;
                    text.text = i + "," + j;
                    text.x = i * GameMap.CELL_SIZE;
                    text.y = j * GameMap.CELL_SIZE;
                    this._shapeContainer.addChild(rect);
                    this._shapeContainer.addChild(text);
                }
            }
        }
        LayerManager.MAP_LAYER.addChild(this._shapeContainer);
    };
    return MapView;
}(BaseClass));
__reflect(MapView.prototype, "MapView");
//# sourceMappingURL=MapView.js.map