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
 * 素材需要提前加载好
 * 素材命名规则：类型_数值（有类型是因为一般会同时有几种数字图片，比如大小号或不同颜色）
 * 点号素材命名：类型_dot
 * 创建BitmapNumber使用createNumPic返回DisplayObjectContainer
 * 创建好的BitmapNumber数值需要变化是调用changeNum
 * 回收使用desstroyNumPic
 *
 * Created by Saco on 2014/8/1.
 */
var BitmapNumber = (function (_super) {
    __extends(BitmapNumber, _super);
    function BitmapNumber() {
        var _this = _super.call(this) || this;
        _this._imgPool = [];
        _this._containerPool = [];
        return _this;
    }
    /*
     * 根据需要的数字和类型返回一个DisplayObjectContainer
     * num数字值，支持小数点
     * type素材类型
     * */
    BitmapNumber.prototype.createNumPic = function (num, type, offset, offsetY) {
        if (offset === void 0) { offset = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var container = this.getContainer();
        var numStr = num.toString();
        var index = 0;
        var tempBm;
        for (index; index < numStr.length; index++) {
            tempBm = this.getSingleNumPic(numStr.charAt(index), type);
            container.addChild(tempBm);
        }
        this.repositionNumPic(container, offset, offsetY);
        return container;
    };
    //回收带数字的DisplayObjectContainer
    BitmapNumber.prototype.desstroyNumPic = function (picContainer) {
        this.clearContainer(picContainer);
        if (picContainer.parent)
            picContainer.parent.removeChild(picContainer);
        this._containerPool.push(picContainer);
    };
    /*
     * 改变带数字的DisplayObjectContainer数字值
     * 提供这个方法是为了提高效率，直接更换之前创建对象的texture，避免多余的删除和创建
     * */
    BitmapNumber.prototype.changeNum = function (picContainer, num, type, offset, offsetY) {
        if (offset === void 0) { offset = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var numStr = num.toString();
        if (!picContainer) {
            return;
        }
        //如果当前数字个数多于目标个数则把多余的回收
        if (picContainer.numChildren > numStr.length) {
            while (picContainer.numChildren > numStr.length) {
                this.recycleBM(picContainer.getChildAt(picContainer.numChildren - 1));
            }
        }
        var index = 0;
        var tempStr;
        for (index; index < numStr.length; index++) {
            //如果当前的Bitmap数量不够则获取新的Bitmap补齐
            if (index >= picContainer.numChildren)
                picContainer.addChild(this.getBitmap());
            tempStr = numStr.charAt(index);
            tempStr = tempStr == "." ? "dot" : tempStr;
            picContainer.getChildAt(index).texture = this.getTexture(tempStr, type);
        }
        this.repositionNumPic(picContainer, offset, offsetY);
    };
    //每个数字宽度不一样，所以重新排列
    BitmapNumber.prototype.repositionNumPic = function (container, offset, offsetY) {
        if (offset === void 0) { offset = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var index = 0;
        var lastX = 0;
        var temp;
        for (index; index < container.numChildren; index++) {
            temp = container.getChildAt(index);
            temp.x = lastX - offset;
            // temp.y = - offsetY;
            lastX = temp.x + temp.width;
        }
    };
    //清理容器
    BitmapNumber.prototype.clearContainer = function (picContainer) {
        while (picContainer.numChildren) {
            this.recycleBM(picContainer.getChildAt(picContainer.numChildren - 1));
        }
    };
    //回收Bitmap
    BitmapNumber.prototype.recycleBM = function (bm) {
        if (bm && bm.parent) {
            bm.parent.removeChild(bm);
            bm.texture = null;
            this._imgPool.push(bm);
        }
    };
    BitmapNumber.prototype.getContainer = function () {
        if (this._containerPool.length)
            return this._containerPool.shift();
        return new egret.DisplayObjectContainer();
    };
    //获得单个数字Bitmap
    BitmapNumber.prototype.getSingleNumPic = function (num, type) {
        if (num == ".")
            num = "dot";
        var bm = this.getBitmap();
        bm.texture = this.getTexture(num, type);
        return bm;
    };
    BitmapNumber.prototype.getTexture = function (num, type) {
        return RES.getRes(type + num + "_png");
    };
    BitmapNumber.prototype.getBitmap = function () {
        if (this._imgPool.length)
            return this._imgPool.shift();
        return new egret.Bitmap();
    };
    return BitmapNumber;
}(BaseClass));
__reflect(BitmapNumber.prototype, "BitmapNumber");
//# sourceMappingURL=BitmapNumber.js.map