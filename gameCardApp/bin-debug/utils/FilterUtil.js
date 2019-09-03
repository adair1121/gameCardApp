/**
 * Created by hrz on 2017/7/11.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FilterUtil = (function () {
    function FilterUtil() {
    }
    Object.defineProperty(FilterUtil, "grayFilter", {
        get: function () {
            return new egret.ColorMatrixFilter([0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0, 0, 0, 1, 0]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterUtil, "grayFilter1", {
        get: function () {
            return new egret.ColorMatrixFilter([0.3086, 0.5, 0.0820, 0, 0, 0.3086, 0.5, 0.0820, 0, 0, 0.3086, 0.5, 0.0820, 0, 0, 0, 0, 0, 1, 0]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterUtil, "ARRAY_GRAY_FILTER", {
        //灰色滤镜
        get: function () {
            return [FilterUtil.grayFilter1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterUtil, "greenFilter", {
        get: function () {
            return new egret.ColorMatrixFilter([1, 0, 0, 0, 0, 0, 1, 0, 0, 100, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterUtil, "greenFilter1", {
        get: function () {
            return new egret.ColorMatrixFilter([0.1, 0, 0, 0, 0, 0, 0.80078125, 0, 0, 20, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0]); //19921875
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterUtil, "ARRAY_GREEN_FILTER", {
        get: function () {
            return [FilterUtil.greenFilter1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterUtil, "blurFilter", {
        get: function () {
            return new egret.BlurFilter(10, 10, 2 /* MEDIUM */);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilterUtil, "ARRAY_BLUR_FILTER", {
        //模糊滤镜
        get: function () {
            return [FilterUtil.blurFilter];
        },
        enumerable: true,
        configurable: true
    });
    return FilterUtil;
}());
__reflect(FilterUtil.prototype, "FilterUtil");
//# sourceMappingURL=FilterUtil.js.map