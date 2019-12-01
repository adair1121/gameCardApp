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
var StartGameView = (function (_super) {
    __extends(StartGameView, _super);
    function StartGameView() {
        var _this = _super.call(this) || this;
        _this.clickBegin = false;
        return _this;
    }
    StartGameView.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        egret.Tween.removeAllTweens();
        this.roleimg2.width = StageUtils.inst().getWidth();
        this.roleimg2.height = StageUtils.inst().getHeight() - 10;
        this.roleimg2.anchorOffsetX = this.roleimg2.width >> 1;
        this.roleimg2.anchorOffsetY = this.roleimg2.height >> 1;
        this.roleimg2.x = this.roleimg2.width >> 1;
        this.roleimg2.y = this.roleimg2.height >> 1;
        this.roleimg2.alpha = 0;
        egret.Tween.get(this.roleimg2, { loop: true }).to({ alpha: 1, scaleX: 1.01, scaleY: 1.01 }, 500).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 500).wait(1500);
        var firstStr = egret.localStorage.getItem(LocalStorageEnum.ENTER_FIRST);
        this.enterBtn.alpha = 0;
        if (!firstStr) {
            egret.localStorage.setItem(LocalStorageEnum.ENTER_FIRST, "1");
            // this.enterBtn.visible = false;
            ViewManager.inst().open(StoryPopUp, [{ cb: this.onShowBtn, arg: this }]);
        }
        else {
            this.onShowBtn();
        }
        this.addTouchEvent(this.storyBtn, this.onLookStory, true);
        this.addTouchEvent(this.enterBtn, this.onEnter, true);
        var vertexSrc = "attribute vec2 aVertexPosition;\n" +
            "attribute vec2 aTextureCoord;\n" +
            "attribute vec2 aColor;\n" +
            "uniform vec2 projectionVector;\n" +
            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +
            "const vec2 center = vec2(-1.0, 1.0);\n" +
            "void main(void) {\n" +
            "   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
            "   vTextureCoord = aTextureCoord;\n" +
            "   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" +
            "}";
        var fragmentSrc1 = "precision lowp float;\n" +
            "varying vec2 vTextureCoord;\n" +
            "varying vec4 vColor;\n" +
            "uniform sampler2D uSampler;\n" +
            "uniform float customUniform;\n" +
            "void main(void) {\n" +
            "vec2 uvs = vTextureCoord.xy;\n" +
            "vec4 fg = texture2D(uSampler, vTextureCoord);\n" +
            "fg.rgb += sin(customUniform + uvs.x * 2. + uvs.y * 2.) * 0.1;\n" +
            "gl_FragColor = fg * vColor;\n" +
            "}";
        this.customFilter1 = new egret.CustomFilter(vertexSrc, fragmentSrc1, {
            customUniform: 0
        });
        this.filters = [this.customFilter1];
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        SoundManager.inst().playBg(RES_AUDIO + "game.mp3");
        var self = this;
        // let rangeX:number = (608*(StageUtils.inst().getWidth()/1136 - 0.1));
        var tarY = (StageUtils.inst().getHeight() >> 1) + 100;
        this._interval = setInterval(function () {
            var num = ((Math.random() * 100) >> 0) > 50 ? 6 : 5;
            var _loop_1 = function (i) {
                var index = (Math.random() * 7 + 1) >> 0;
                var res = "item_fire_" + index + "_png";
                var img = new eui.Image();
                _this.addChild(img);
                img.source = res;
                img.bottom = -50;
                img.x = (Math.random() * (StageUtils.inst().getWidth()) >> 0);
                var y = tarY - ((Math.random() * 150) >> 0);
                var angle = img.rotation;
                var dic = ((Math.random() * 100) >> 0) > 50 ? 1 : -1;
                egret.Tween.get(img, { loop: false, onChange: function () {
                        if (angle % 80 == 0) {
                            dic *= -1;
                        }
                        img.scaleX -= 0.001;
                        img.scaleY -= 0.001;
                        angle += 0.3 * dic;
                        img.rotation = angle;
                    }, onChangeObj: _this }).to({ bottom: y, alpha: 0 }, 5000).call(function () {
                    egret.Tween.removeTweens(img);
                    _this.removeChild(img);
                });
            };
            for (var i = 0; i < num; i++) {
                _loop_1(i);
            }
        }, 3000);
    };
    StartGameView.prototype.onShowBtn = function () {
        var _this = this;
        egret.Tween.get(this.enterBtn).to({ alpha: 1 }, 600).call(function () {
            egret.Tween.removeTweens(_this.enterBtn);
        }, this);
    };
    StartGameView.prototype.onFrame = function (evt) {
        if (this.clickBegin) {
            this.onReturn();
        }
        else {
            this.customFilter1.uniforms.customUniform += 0.05;
            if (this.customFilter1.uniforms.customUniform > Math.PI * 2) {
                this.customFilter1.uniforms.customUniform = 0.0;
            }
        }
    };
    StartGameView.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this).to({ alpha: 0 }, 1000).call(function () {
            egret.Tween.removeTweens(_this);
            ViewManager.inst().close(StartGameView);
        }, this);
        var view = ViewManager.inst().getView(GameMainView);
        if (!view) {
            ViewManager.inst().open(GameMainView);
            view = ViewManager.inst().getView(GameMainView);
        }
        view.initialize(true);
    };
    /**进入游戏 */
    StartGameView.prototype.onEnter = function (evt) {
        this.touchEnabled = false;
        SoundManager.inst().touchBg();
        this.clickBegin = true;
    };
    /**查看故事 */
    StartGameView.prototype.onLookStory = function () {
        ViewManager.inst().open(StoryPopUp);
    };
    StartGameView.prototype.close = function () {
        if (this._interval) {
            clearInterval(this._interval);
        }
        egret.Tween.removeTweens(this.roleimg2);
        this.removeTouchEvent(this.storyBtn, this.onLookStory);
        this.removeTouchEvent(this.enterBtn, this.onEnter);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
    };
    return StartGameView;
}(BaseEuiView));
__reflect(StartGameView.prototype, "StartGameView");
ViewManager.inst().reg(StartGameView, LayerManager.UI_Main);
//# sourceMappingURL=StartGameView.js.map