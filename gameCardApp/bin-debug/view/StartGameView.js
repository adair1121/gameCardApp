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
        return _super.call(this) || this;
    }
    StartGameView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var firstStr = egret.localStorage.getItem(LocalStorageEnum.ENTER_FIRST);
        if (!firstStr) {
            egret.localStorage.setItem(LocalStorageEnum.ENTER_FIRST, "1");
            ViewManager.ins().open(StoryPopUp);
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
        var fragmentSrc4 = [
            "precision lowp float;\n" +
                "varying vec2 vTextureCoord;",
            "varying vec4 vColor;\n",
            "uniform sampler2D uSampler;",
            "uniform float lineWidth;",
            "uniform float offset;",
            "void main()",
            "{",
            "vec2 uv = vTextureCoord.xy;",
            "vec2 texCoord = uv;",
            "float modPart = mod(vTextureCoord.y, lineWidth);",
            "float solidPart = (1.0 - offset) * lineWidth;",
            "if(modPart > solidPart) {",
            "gl_FragColor = texture2D(uSampler, texCoord);",
            "} else {",
            "gl_FragColor = vec4(0., 0., 0., 0.);",
            "}",
            "}"
        ].join("\n");
        this.customFilter4 = new egret.CustomFilter(vertexSrc, fragmentSrc4, {
            lineWidth: 0.1,
            offset: 1
        });
        this.filters = [this.customFilter4];
        SoundManager.ins().playBg(RES_AUDIO + "game.mp3");
    };
    StartGameView.prototype.onFrame = function (evt) {
        this.customFilter4.uniforms.offset -= 0.05;
        if (this.customFilter4.uniforms.offset <= 0) {
            this.customFilter4.uniforms.offset = 0.0;
            ViewManager.ins().close(StartGameView);
            var view = ViewManager.ins().getView(GameMainView);
            view.initialize();
        }
    };
    /**进入游戏 */
    StartGameView.prototype.onEnter = function (evt) {
        this.touchEnabled = false;
        SoundManager.ins().touchBg();
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
    };
    /**查看故事 */
    StartGameView.prototype.onLookStory = function () {
        ViewManager.ins().open(StoryPopUp);
    };
    StartGameView.prototype.close = function () {
        this.removeTouchEvent(this.storyBtn, this.onLookStory);
        this.removeTouchEvent(this.enterBtn, this.onEnter);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
    };
    return StartGameView;
}(BaseEuiView));
__reflect(StartGameView.prototype, "StartGameView");
ViewManager.ins().reg(StartGameView, LayerManager.UI_Main);
//# sourceMappingURL=StartGameView.js.map