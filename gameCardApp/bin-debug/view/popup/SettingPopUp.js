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
var SettingPopUp = (function (_super) {
    __extends(SettingPopUp, _super);
    function SettingPopUp() {
        var _this = _super.call(this) || this;
        _this._barWidth = 139;
        _this._minx = 0;
        _this._maxx = 0;
        //背景音乐事件处理
        _this.musicTouch = false;
        //------------------
        //------特效事件处理---------
        _this.effectTouch = false;
        return _this;
    }
    SettingPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        MessageManager.inst().dispatch("end");
        egret.Tween.get(this.content).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
        }, this);
        this.musicBar.mask = this.musicBarMask;
        this.effectBar.mask = this.effectBarMask;
        this._minx = this.musicBar.x;
        this._maxx = this.musicBar.x + this.musicBar.width;
        this.musicBarMask.width = this._barWidth * GameApp.bgMusic;
        this.m_sound_control.x = this.musicBarMask.x + this.musicBarMask.width;
        SoundManager.inst().setBgVolume(GameApp.bgMusic);
        this.effectBarMask.width = this._barWidth * GameApp.effectMusic;
        this.e_sound_control.x = this.effectBarMask.x + this.effectBarMask.width;
        SoundManager.inst().setEffectVolume(GameApp.effectMusic);
        this.m_sound_control.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMusicTouchBegin, this);
        StageUtils.inst().getStage().addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMusicTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onMusicTouchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onMusicTouchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onMusicTouchEnd, this);
        this.e_sound_control.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onEffectTouchBegin, this);
        this.addTouchEvent(this.btnClose, this.onReturn, true);
        this.addTouchEvent(this.continueBtn, this.onReturn, true);
        this.addTouchEvent(this.exitBtn, this.onExit, true);
    };
    SettingPopUp.prototype.onExit = function () {
        this.onReturn(null, true);
    };
    SettingPopUp.prototype.onReturn = function (evt, result) {
        var _this = this;
        if (result === void 0) { result = false; }
        var self = this;
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            self.rect.alpha = 0;
        }, 300);
        egret.Tween.get(this.content).to({ verticalCenter: -500 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.inst().close(SettingPopUp);
            if (result) {
                MessageManager.inst().dispatch("closeMain");
            }
            else {
                MessageManager.inst().dispatch("start");
                //只为了调刷新接口
                ViewManager.inst().open(GameMainView);
            }
        }, this);
    };
    SettingPopUp.prototype.onMusicTouchBegin = function (evt) {
        this.musicTouch = true;
    };
    ;
    SettingPopUp.prototype.onMusicTouchMove = function (evt) {
        var localP = this.content.globalToLocal(evt.stageX, evt.stageY);
        if (localP.x <= this._minx) {
            localP.x = this._minx;
        }
        if (localP.x >= this._maxx) {
            localP.x = this._maxx;
        }
        var volum = (localP.x - this.musicBar.x) / this._barWidth;
        if (this.musicTouch) {
            this.m_sound_control.x = localP.x;
            this.musicBarMask.width = this._barWidth * volum;
            GameApp.bgMusic = volum;
            SoundManager.inst().setBgVolume(volum);
        }
        if (this.effectTouch) {
            this.e_sound_control.x = localP.x;
            this.effectBarMask.width = this._barWidth * volum;
            GameApp.effectMusic = volum;
            SoundManager.inst().setEffectVolume(volum);
        }
    };
    SettingPopUp.prototype.onMusicTouchEnd = function () {
        if (this.musicTouch) {
            this.musicTouch = false;
        }
        if (this.effectTouch) {
            this.effectTouch = false;
        }
    };
    SettingPopUp.prototype.onEffectTouchBegin = function () {
        this.effectTouch = true;
    };
    ;
    SettingPopUp.prototype.close = function () {
        this.m_sound_control.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMusicTouchBegin, this);
        StageUtils.inst().getStage().removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMusicTouchMove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onMusicTouchEnd, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onMusicTouchEnd, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onMusicTouchEnd, this);
        this.removeTouchEvent(this.btnClose, this.onReturn);
        this.removeTouchEvent(this.continueBtn, this.onReturn);
        this.removeTouchEvent(this.exitBtn, this.onExit);
        this.e_sound_control.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onEffectTouchBegin, this);
    };
    return SettingPopUp;
}(BaseEuiView));
__reflect(SettingPopUp.prototype, "SettingPopUp");
ViewManager.inst().reg(SettingPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=SettingPopUp.js.map