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
var GuideView = (function (_super) {
    __extends(GuideView, _super);
    function GuideView() {
        return _super.call(this) || this;
    }
    GuideView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        // this.data = param[0].data 
        // this.setRect();
        this._handMc = new MovieClip();
        this.addChild(this._handMc);
        this._handMc.touchEnabled = false;
        this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGuideTap, this);
    };
    GuideView.prototype.onGuideTap = function (evt) {
        var guideId = this.data.id;
        var guideCfgs = GuideCfg.guidecfg;
        var itemCfg = guideCfgs[guideId];
        var event = new StartGameEvent(itemCfg.event, itemCfg.param);
        StageUtils.ins().getStage().dispatchEvent(event);
        if (!itemCfg.next) {
            ViewManager.ins().close(GuideView);
        }
    };
    //执行下一步
    GuideView.prototype.nextStep = function (data) {
        this.data = data;
        this.setRect();
    };
    GuideView.prototype.setRect = function () {
        if (this.data.comObj instanceof egret.DisplayObject) {
            var point = this.data.comObj.parent.localToGlobal(this.data.comObj.x, this.data.comObj.y);
            if ((this.data.offsetX == 40) && (this.data.offsetY == 50)) {
                this.data.offsetX = 0;
                this.data.offsetY = 0;
                this.rectData = [point.x + (this.data.offsetX || 0), point.y + (this.data.offsetY || 0), this.data.width - (this.data.offsetX || 0), this.data.height];
            }
            else {
                this.rectData = [point.x + (this.data.offsetX || 0), point.y + (this.data.offsetY || 0), this.data.width, this.data.height];
            }
        }
        else {
            this.rectData = [this.data.comObj.x, this.data.comObj.y, this.data.width, this.data.height];
        }
        this.rect.x = this.rectData[0];
        this.rect.y = this.rectData[1];
        this.rect.width = this.data.width;
        this.rect.height = this.data.height;
        this.setBgdSize();
        this.setArrow();
    };
    GuideView.prototype.setBgdSize = function () {
        var worldX = this.rect.x;
        var worldY = this.rect.y;
        var _w, _h;
        _w = worldX > 0 ? worldX : 0;
        _h = worldY + this.rect.height > 0 ? (worldY + this.rect.height) : 0;
        this.bg_left.width = _w;
        this.bg_left.height = _h;
        _w = StageUtils.ins().getWidth() - worldX;
        _w = _w < 0 ? 0 : _w;
        this.bg_top.width = _w;
        this.bg_top.height = worldY;
        _w = StageUtils.ins().getWidth() - worldX - this.rect.width;
        _w = _w < 0 ? 0 : _w;
        _h = StageUtils.ins().getHeight() - worldY;
        _h = _h < 0 ? 0 : _h;
        this.bg_right.width = _w;
        this.bg_right.height = _h;
        _h = StageUtils.ins().getHeight() - worldY - this.rect.height;
        _h = _h < 0 ? 0 : _h;
        this.bg_bottom.width = worldX + this.rect.width;
        this.bg_bottom.height = _h;
    };
    //设置焦点箭头
    GuideView.prototype.setArrow = function () {
        this._handMc.playFile(EFFECT + "fingerClick", -1);
        this._handMc.x = this.rect.x + (this.rect.width);
        this._handMc.y = this.rect.y + (this.rect.height);
    };
    GuideView.prototype.close = function () {
        this.removeChildren();
        this._handMc = null;
        this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGuideTap, this);
    };
    return GuideView;
}(BaseEuiView));
__reflect(GuideView.prototype, "GuideView");
ViewManager.ins().reg(GuideView, LayerManager.UI_Pop);
//# sourceMappingURL=GuideView.js.map