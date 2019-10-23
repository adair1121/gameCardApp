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
var StageUtils = (function (_super) {
    __extends(StageUtils, _super);
    /**
     * 构造函数
     */
    function StageUtils() {
        var _this = _super.call(this) || this;
        if (StageUtils._uiStage == null) {
            StageUtils._uiStage = new eui.UILayer();
            StageUtils._uiStage.touchEnabled = false;
            StageUtils._uiStage.percentHeight = 100;
            StageUtils._uiStage.percentWidth = 100;
            _this.getStage().addChild(StageUtils._uiStage);
        }
        return _this;
    }
    StageUtils.inst = function () {
        var _inst = _super.single.call(this);
        return _inst;
    };
    /**
     * 获取游戏的高度
     * @returns {number}
     */
    StageUtils.prototype.getHeight = function () {
        return this.getStage().stageHeight;
    };
    /**
     * 获取游戏宽度
     * @returns {number}
     */
    StageUtils.prototype.getWidth = function () {
        return this.getStage().stageWidth;
    };
    /**
     * 指定此对象的子项以及子孙项是否接收鼠标/触摸事件
     * @param value
     */
    StageUtils.prototype.setTouchChildren = function (value) {
        this.getStage().touchChildren = value;
    };
    /**
     * 设置同时可触发几个点击事件，默认为2
     * @param value
     */
    StageUtils.prototype.setMaxTouches = function (value) {
        this.getStage().maxTouches = value;
    };
    /**
     * 设置帧频
     * @param value
     */
    StageUtils.prototype.setFrameRate = function (value) {
        this.getStage().frameRate = value;
    };
    /**
     * 设置适配方式
     * @param value
     */
    StageUtils.prototype.setScaleMode = function (value) {
        this.getStage().scaleMode = value;
    };
    /**
     * 获取游戏Stage对象
     * @returns {egret.MainContext}
     */
    StageUtils.prototype.getStage = function () {
        return egret.MainContext.instance.stage;
    };
    /**
     * 获取唯一UIStage
     * @returns {eui.UILayer}
     */
    StageUtils.prototype.getUIStage = function () {
        return StageUtils._uiStage;
    };
    StageUtils.getScaleMode = function () {
        if (StageUtils.isIphoneX())
            return egret.StageScaleMode.FIXED_WIDTH;
        var w = window.innerHeight / window.innerWidth;
        var minSizeProb = 1.4;
        var maxSizeProb = 1.8;
        var scaleMode = "";
        if (w <= minSizeProb) {
            scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
        }
        else if (w > minSizeProb && w < maxSizeProb) {
            scaleMode = egret.StageScaleMode.FIXED_WIDTH;
        }
        return scaleMode;
    };
    StageUtils.isIphoneX = function () {
        return window.innerHeight == 812 && window.innerWidth == 375;
    };
    StageUtils.init = function () {
        this.changeStageSize();
        window.addEventListener("resize", this.changeStageSize);
    };
    StageUtils.changeStageSize = function () {
        var scaleMode = StageUtils.getScaleMode();
        if (this.lastOrientation != window.orientation) {
            document.body.style.height = "100%";
            this.lastOrientation = window.orientation;
        }
        StageUtils.inst().getStage().scaleMode = scaleMode;
    };
    return StageUtils;
}(BaseClass));
__reflect(StageUtils.prototype, "StageUtils");
//# sourceMappingURL=StageUtils.js.map