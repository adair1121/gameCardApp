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
 *  动画类
 * @author
 */
var MovieClip = (function (_super) {
    __extends(MovieClip, _super);
    function MovieClip() {
        var _this = _super.call(this) || this;
        /**倍率 ,越大越快*/
        _this.rate = 1;
        _this.pixelHitTest = false;
        _this._mcFactory = new egret.MovieClipDataFactory();
        return _this;
    }
    MovieClip.prototype.playFile = function (name, playCount, compFun, remove, framesLabel, _loadFun, frameRate) {
        var _this = this;
        if (playCount === void 0) { playCount = 1; }
        if (compFun === void 0) { compFun = null; }
        if (remove === void 0) { remove = true; }
        if (framesLabel === void 0) { framesLabel = ""; }
        if (name.indexOf("chargeff1") != -1 || name.indexOf("forceguildeff") != -1 || name.indexOf("qianghua") != -1 ||
            name.indexOf("forgeSuccess") != -1 || name.indexOf("neigongbaozhaeff") != -1 || name.indexOf("piaodongqipaohuang") != -1) {
            return;
        }
        this.time = egret.getTimer();
        this._compFun = compFun;
        this._loadFun = _loadFun;
        this.playCount = playCount;
        this.remove = remove;
        TimerManager.ins().remove(this.playComp, this);
        if (this.texture && this.texture.bitmapData == null) {
            //资源已经被释放掉
        }
        else if (this.name == name) {
            this.createBody(framesLabel, frameRate);
            return;
        }
        this.name = name;
        if (this.texture) {
            MovieClip.removeDisplayObject(this, this.texture.bitmapData);
        }
        this.jsonData = null;
        this.texture = null;
        RES.getResByUrl(this.name + ".json", function (data, url) {
            if (_this.name + ".json" != url || !data)
                return;
            _this.jsonData = data;
            _this.createBody(framesLabel, frameRate);
        }, this, RES.ResourceItem.TYPE_JSON);
        RES.getResByUrl(this.name + ".png", function (data, url) {
            if (_this.name + ".png" != url || !data)
                return;
            _this.texture = data;
            if (_this.stage) {
                MovieClip.addDisplayObject(_this, _this.texture.bitmapData);
            }
            _this.createBody(framesLabel, frameRate);
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    /**
     * @private
     * 显示对象添加到舞台
     */
    MovieClip.prototype.$onAddToStage = function (stage, nestLevel) {
        _super.prototype.$onAddToStage.call(this, stage, nestLevel);
        if (this.texture) {
            MovieClip.addDisplayObject(this, this.texture.bitmapData);
        }
    };
    /**
     * @private
     * 显示对象从舞台移除
     */
    MovieClip.prototype.$onRemoveFromStage = function () {
        _super.prototype.$onRemoveFromStage.call(this);
        if (this.texture) {
            MovieClip.removeDisplayObject(this, this.texture.bitmapData);
        }
    };
    /**
     * 创建主体动画
     */
    MovieClip.prototype.createBody = function (framesLaebl, frameRate) {
        if (framesLaebl === void 0) { framesLaebl = ""; }
        if (!this.jsonData || !this.texture)
            return;
        this._mcFactory.clearCache();
        this._mcFactory.mcDataSet = this.jsonData;
        this._mcFactory.texture = this.texture;
        var temp = this.name.split("/");
        var tempName = temp.pop();
        this.movieClipData = this._mcFactory.generateMovieClipData(tempName);
        if (!(this.name in MovieClip.originalRate)) {
            MovieClip.originalRate[this.name] = this.movieClipData.frameRate;
        }
        this.frameRate = frameRate ? frameRate : (MovieClip.originalRate[this.name] * this.rate) >> 0;
        //从第一帧开始自动播放
        try {
            this.gotoAndPlay(framesLaebl ? framesLaebl : 1, this.playCount);
        }
        catch (error) {
            console.warn("错误动画文件:", this.name);
        }
        // this.visible = true;
        if (this.playCount > 0) {
            var tempTime = egret.getTimer() - this.time;
            tempTime = this.playTime * this.playCount - tempTime;
            if (tempTime > 0)
                TimerManager.ins().doTimer(tempTime, 1, this.playComp, this);
            else
                this.playComp();
        }
        if (this._loadFun) {
            this._loadFun();
        }
        //抛出内容已经改变事件
        this.dispatchEventWith(egret.Event.CHANGE);
    };
    /**
     * 自动播放次数完成处理
     * @param e
     */
    MovieClip.prototype.playComp = function () {
        if (this.stage && this._compFun)
            this._compFun();
        if (this.remove)
            DisplayUtils.removeFromParent(this);
    };
    Object.defineProperty(MovieClip.prototype, "playTime", {
        /** 播放总时长(毫秒) */
        get: function () {
            if (!this.movieClipData)
                return 0;
            return 1 / this.frameRate * this.totalFrames * 1000;
        },
        enumerable: true,
        configurable: true
    });
    MovieClip.prototype.clearComFun = function () {
        this._compFun = null;
    };
    //释放
    MovieClip.prototype.dispose = function () {
        this.stop();
        this.resetMovieClip();
        this.clearComFun();
        TimerManager.ins().removeAll(this);
    };
    //回收
    MovieClip.prototype.destroy = function () {
        DisplayUtils.removeFromParent(this);
        this.dispose();
        ObjectPool.push(this);
    };
    MovieClip.prototype.resetMovieClip = function () {
        var mc = this;
        mc.rotation = 0;
        mc.scaleX = 1;
        mc.scaleY = 1;
        mc.alpha = 1;
        mc.anchorOffsetX = 0;
        mc.anchorOffsetY = 0;
        mc.x = 0;
        mc.y = 0;
        mc.rate = 1;
        mc.$renderNode.cleanBeforeRender();
        mc._mcFactory.clearCache();
        mc._mcFactory.mcDataSet = null;
        mc._mcFactory.texture = null;
        mc.name = null;
        mc.jsonData = null;
        mc.filters = null;
        var bitmapData = mc.texture;
        if (bitmapData) {
            MovieClip.removeDisplayObject(mc, bitmapData.bitmapData);
        }
        mc.texture = null;
        mc.remove = false;
        egret.Tween.removeTweens(mc);
    };
    MovieClip.addDisplayObject = function (displayObject, bitmapData) {
        if (!bitmapData)
            return;
        var hashCode = bitmapData.hashCode;
        if (!MovieClip.displayList[hashCode]) {
            MovieClip.displayList[hashCode] = [displayObject];
            return;
        }
        var tempList = MovieClip.displayList[hashCode];
        if (tempList.indexOf(displayObject) < 0) {
            tempList.push(displayObject);
        }
    };
    MovieClip.removeDisplayObject = function (displayObject, bitmapData) {
        if (!bitmapData)
            return;
        var hashCode = bitmapData.hashCode;
        if (!MovieClip.displayList[hashCode]) {
            return;
        }
        var tempList = MovieClip.displayList[hashCode];
        var index = tempList.indexOf(displayObject);
        if (index >= 0) {
            tempList.splice(index, 1);
        }
        if (tempList.length == 0) {
            delete MovieClip.displayList[hashCode];
        }
    };
    /** 原始帧频 */
    MovieClip.originalRate = {};
    MovieClip.displayList = egret.createMap();
    return MovieClip;
}(egret.MovieClip));
__reflect(MovieClip.prototype, "MovieClip");
//# sourceMappingURL=MovieClip.js.map