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
    function SoldierShapeEntity() {
        return _super.call(this) || this;
    }
    SoldierShapeEntity.inst = function () {
        var _inst = _super.single.call(this);
        return _inst;
    };
    SoldierShapeEntity.prototype.initData = function (shape, res, id, parent, xy, cb, thisArg) {
        this._shapeType = shape;
        if (shape == SoldierShapType.TYPE_CIRCLE) {
            xy.y += 80;
        }
        // else if(shape == SoldierShapType.TYPE_ARROW){
        // 	xy.y += 40;
        // }
        this.w = this.h = 60;
        this._res = res;
        this._id = id;
        this._parent = parent;
        this._baseXY = xy;
        this._cb = cb;
        this._arg = thisArg;
        this.arr = [];
        this.onCreateShape();
    };
    SoldierShapeEntity.prototype.onCreateShape = function () {
        switch (this._shapeType) {
            // case SoldierShapType.TYPE_ARROW:
            // 	this.createArrow();
            // 	if(this._cb && this._arg){
            // 		this._cb.call(this._arg,this.arr)
            // 	}
            // 	break;
            case SoldierShapType.TYPE_CIRCLE:
                this.createCircle();
                if (this._cb && this._arg) {
                    this._cb.call(this._arg, this.arr);
                }
                break;
            case SoldierShapType.TYPE_CROSS:
                this.createCross();
                if (this._cb && this._arg) {
                    this._cb.call(this._arg, this.arr);
                }
                break;
            case SoldierShapType.TYPE_HALFCIRCLE:
                this.createHalfCircle();
                if (this._cb && this._arg) {
                    this._cb.call(this._arg, this.arr);
                }
                break;
            // case SoldierShapType.TYPE_LINGXING:
            // this.createLingxing();
            // break;
            case SoldierShapType.TYPE_RECT:
                this.createRect();
                if (this._cb && this._arg) {
                    this._cb.call(this._arg, this.arr);
                }
                break;
            case SoldierShapType.TYPE_TIXING:
                this.createTiXing();
                if (this._cb && this._arg) {
                    this._cb.call(this._arg, this.arr);
                }
                break;
            case SoldierShapType.TYPE_TRIANGLE:
                this.createTriangle(5, 0, 0, -100);
                if (this._cb && this._arg) {
                    this._cb.call(this._arg, this.arr);
                }
                break;
        }
    };
    /**创建方阵 */
    SoldierShapeEntity.prototype.createRect = function (rotation, _rows, _cols, offx, offy) {
        if (offx === void 0) { offx = 0; }
        if (offy === void 0) { offy = 0; }
        var row = 4;
        var col = 4;
        if (_rows) {
            row = _rows;
        }
        if (_cols) {
            col = _cols;
        }
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                var sp = this.createShape();
                this._parent.addChild(sp);
                this.arr.push(sp);
                sp.x = j * (this.w + 10) + offx + this._baseXY.x;
                sp.y = i * (this.h + 10) + offy + this._baseXY.y;
                if (rotation) {
                    sp.rotation = rotation;
                }
            }
        }
    };
    /**创建圆形阵 */
    SoldierShapeEntity.prototype.createCircle = function () {
        var radius = 200;
        var angles = [0, 45, 90, 135, 180, -45, -90, -135];
        for (var i = 0; i < 1; i++) {
            radius -= 100;
            for (var j = 0; j < angles.length; j++) {
                var x = Math.cos(angles[j] * Math.PI / 180) * radius;
                var y = Math.sin(angles[j] * Math.PI / 180) * radius;
                var sp = this.createShape();
                this._parent.addChild(sp);
                this.arr.push(sp);
                sp.x = x + this._baseXY.x;
                sp.y = y + this._baseXY.y + 50;
            }
        }
    };
    /**创建半月形阵 */
    SoldierShapeEntity.prototype.createHalfCircle = function () {
        var radius = 200;
        var angles = [-90, -45, 0, 45, 90];
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < angles.length; j++) {
                var x = Math.cos(angles[j] * Math.PI / 180) * radius;
                var y = Math.sin(angles[j] * Math.PI / 180) * radius;
                var sp = this.createShape();
                this._parent.addChild(sp);
                this.arr.push(sp);
                sp.x = x + this._baseXY.x;
                sp.y = y + this._baseXY.y + 70;
            }
            radius -= 100;
        }
    };
    // /**创建菱形阵 */
    // private createLingxing():void{
    // 	this.createRect(-45);
    // 	this.shapCon.anchorOffsetX = this.shapCon.width>>1;
    // 	this.shapCon.anchorOffsetY = this.shapCon.height>>1;
    // 	this.shapCon.rotation = 45;
    // }
    /**
     * 三角阵
     */
    SoldierShapeEntity.prototype.createTriangle = function (firstnum, offestX, _offy, extraY) {
        if (firstnum === void 0) { firstnum = 5; }
        if (offestX === void 0) { offestX = 0; }
        if (_offy === void 0) { _offy = 0; }
        if (extraY === void 0) { extraY = 0; }
        var firstColNum = firstnum;
        var offestY = 0;
        for (var i = 0; i < (firstnum - 1); i++) {
            firstColNum -= 1; //实际上第一列有6个
            offestY += 40;
            for (var j = 1; j <= firstColNum; j++) {
                var sp = this.createShape();
                this._parent.addChild(sp);
                this.arr.push(sp);
                sp.y = j * (this.h + 10) + offestY - _offy + this._baseXY.y + extraY;
                sp.x = i * (this.w + 10) + offestX + this._baseXY.x;
            }
        }
    };
    /**梯形阵 */
    SoldierShapeEntity.prototype.createTiXing = function () {
        var firstColNum = 6;
        var offestY = 0;
        for (var i = 0; i < 6; i++) {
            firstColNum -= 1; //实际上第一列有6个
            if (firstColNum <= 2) {
                break;
            }
            offestY += 30;
            for (var j = 1; j <= firstColNum; j++) {
                var sp = this.createShape();
                this._parent.addChild(sp);
                this.arr.push(sp);
                sp.y = j * (this.h + 10) + offestY + this._baseXY.y - 130;
                sp.x = i * (this.w + 10) + this._baseXY.x;
            }
        }
    };
    /**创建箭头形状 */
    SoldierShapeEntity.prototype.createArrow = function () {
        this.createRect(null, 2, 3);
        this.createTriangle(4, 3 * (60 + 10), 160);
    };
    /**创建加号形状 */
    SoldierShapeEntity.prototype.createCross = function () {
        this.createRect(null, 3, 4);
        // this.createRect(null,2,3,200);
        // this.createRect(null,3,2,60,-75);
        // this.createRect(null,3,2,60,50);
    };
    //测试 。创建shape
    SoldierShapeEntity.prototype.createShape = function () {
        var sp = new SoldierEntity();
        var cardVo = GlobalFun.getCardDataFromId(this._id);
        sp.setSoldierData(-1, this._res, cardVo);
        // sp.setSoldierData(1,)
        // sp.graphics.beginFill(0xff0000);
        // sp.graphics.drawRect(0,0,15,15);
        // sp.graphics.endFill();
        return sp;
    };
    return SoldierShapeEntity;
}(BaseClass));
__reflect(SoldierShapeEntity.prototype, "SoldierShapeEntity");
//# sourceMappingURL=SoldierShapeEntity.js.map