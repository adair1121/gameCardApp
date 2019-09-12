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
var SoldierShapeEntity = (function (_super) {
    __extends(SoldierShapeEntity, _super);
    function SoldierShapeEntity(shape) {
        var _this = _super.call(this) || this;
        _this._shapeType = shape;
        return _this;
    }
    SoldierShapeEntity.prototype.childrenCreated = function () {
        this.shapCon = new egret.DisplayObjectContainer();
        this.addChild(this.shapCon);
        switch (this._shapeType) {
            case SoldierShapType.TYPE_ARROW:
                this.createArrow();
                break;
            case SoldierShapType.TYPE_CIRCLE:
                this.createCircle();
                break;
            case SoldierShapType.TYPE_CROSS:
                this.createCross();
                break;
            case SoldierShapType.TYPE_HALFCIRCLE:
                this.createHalfCircle();
                break;
            case SoldierShapType.TYPE_LINGXING:
                this.createLingxing();
                break;
            case SoldierShapType.TYPE_RECT:
                this.createRect();
                break;
            case SoldierShapType.TYPE_TIXING:
                this.createTiXing();
                break;
            case SoldierShapType.TYPE_TRIANGLE:
                this.createTriangle();
                break;
        }
    };
    /**创建方阵 */
    SoldierShapeEntity.prototype.createRect = function (rotation, _rows, _cols, offx, offy) {
        if (offx === void 0) { offx = 0; }
        if (offy === void 0) { offy = 0; }
        var row = 5;
        var col = 5;
        if (_rows) {
            row = _rows;
        }
        if (_cols) {
            col = _cols;
        }
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                var sp = this.createShape();
                this.shapCon.addChild(sp);
                sp.x = j * (sp.width + 10) + offx;
                sp.y = i * (sp.height + 10) + offy;
                if (rotation) {
                    sp.rotation = rotation;
                }
            }
        }
    };
    /**创建圆形阵 */
    SoldierShapeEntity.prototype.createCircle = function () {
        var radius = 75;
        var angles = [0, 45, 90, 135, 180, -45, -90, -135];
        for (var i = 0; i < 3; i++) {
            radius -= 25;
            for (var j = 0; j < angles.length; j++) {
                var x = Math.cos(angles[j] * Math.PI / 180) * radius;
                var y = Math.sin(angles[j] * Math.PI / 180) * radius;
                var sp = this.createShape();
                this.shapCon.addChild(sp);
                sp.x = x;
                sp.y = y;
            }
        }
    };
    /**创建半月形阵 */
    SoldierShapeEntity.prototype.createHalfCircle = function () {
        var radius = 130;
        var angles = [-90, -45, 0, 45, 90];
        for (var i = 0; i < 5; i++) {
            radius -= 25;
            for (var j = 0; j < angles.length; j++) {
                var x = Math.cos(angles[j] * Math.PI / 180) * radius;
                var y = Math.sin(angles[j] * Math.PI / 180) * radius;
                var sp = this.createShape();
                this.shapCon.addChild(sp);
                sp.x = x;
                sp.y = y;
            }
        }
    };
    /**创建菱形阵 */
    SoldierShapeEntity.prototype.createLingxing = function () {
        this.createRect(-45);
        this.shapCon.anchorOffsetX = this.shapCon.width >> 1;
        this.shapCon.anchorOffsetY = this.shapCon.height >> 1;
        this.shapCon.rotation = 45;
    };
    /**
     * 三角阵
     */
    SoldierShapeEntity.prototype.createTriangle = function (firstnum, offestX, _offy) {
        if (firstnum === void 0) { firstnum = 7; }
        if (offestX === void 0) { offestX = 0; }
        if (_offy === void 0) { _offy = 0; }
        var firstColNum = firstnum;
        var offestY = 0;
        for (var i = 0; i < (firstnum - 1); i++) {
            firstColNum -= 1; //实际上第一列有6个
            offestY += 10;
            for (var j = 1; j <= firstColNum; j++) {
                var sp = this.createShape();
                this.shapCon.addChild(sp);
                sp.y = j * (sp.height + 10) + offestY - _offy;
                sp.x = i * (sp.width + 10) + offestX;
            }
        }
    };
    /**梯形阵 */
    SoldierShapeEntity.prototype.createTiXing = function () {
        var firstColNum = 8;
        var offestY = 0;
        for (var i = 0; i < 6; i++) {
            firstColNum -= 1; //实际上第一列有6个
            if (firstColNum <= 2) {
                break;
            }
            offestY += 10;
            for (var j = 1; j <= firstColNum; j++) {
                var sp = this.createShape();
                this.shapCon.addChild(sp);
                sp.y = j * (sp.height + 10) + offestY;
                sp.x = i * (sp.width + 10);
            }
        }
    };
    /**创建箭头形状 */
    SoldierShapeEntity.prototype.createArrow = function () {
        this.createRect(null, 2, 5);
        this.createTriangle(6, 5 * (15 + 10), 70);
    };
    /**创建加号形状 */
    SoldierShapeEntity.prototype.createCross = function () {
        this.createRect(null, 2, 3);
        this.createRect(null, 2, 3, 100);
        this.createRect(null, 3, 2, 60, -75);
        this.createRect(null, 3, 2, 60, 50);
    };
    //测试 。创建shape
    SoldierShapeEntity.prototype.createShape = function () {
        var sp = new egret.Shape();
        sp.graphics.beginFill(0xff0000);
        sp.graphics.drawRect(0, 0, 15, 15);
        sp.graphics.endFill();
        return sp;
    };
    return SoldierShapeEntity;
}(eui.Component));
__reflect(SoldierShapeEntity.prototype, "SoldierShapeEntity");
//# sourceMappingURL=SoldierShapeEntity.js.map