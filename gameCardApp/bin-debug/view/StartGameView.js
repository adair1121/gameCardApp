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
        // private head1:eui.Image;
        // private head2:eui.Image;
        // private nameLab:eui.Label;
        _this.curHeadSource = "head_1_png";
        // private selectGroup:eui.Group;
        //默认进主城限制
        _this._enterLimit = 200;
        return _this;
    }
    StartGameView.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        LoadingUI.inst().hide();
        this.addTouchEvent(this.startGame, this.onStart, true);
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
        // egret.Tween.get(this.startGame,{loop:true}).to({scaleX:0.9,scaleY:0.9},800).to({scaleX:1,scaleY:1},800);
        // if(!this._first){
        // 	this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
        // }	
        var self = this;
        self.createStaticRoleAct();
        var rangeX = (608 * (StageUtils.ins().getWidth() / 1136 - 0.1));
        var tarY = StageUtils.ins().getHeight() >> 1;
        this._interval = setInterval(function () {
            self.createStaticRoleAct();
            var num = ((Math.random() * 100) >> 0) > 50 ? 3 : 2;
            var _loop_1 = function (i) {
                var index = (Math.random() * 7 + 1) >> 0;
                var res = "item_fire_" + index + "_png";
                var img = new eui.Image();
                _this.addChild(img);
                img.source = res;
                img.bottom = -50;
                img.x = (Math.random() * (StageUtils.ins().getWidth() - rangeX) + rangeX) >> 0;
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
    StartGameView.prototype.createStaticRoleAct = function () {
        var _this = this;
        this.roleimg.alpha = 0;
        this.roleimg.width = StageUtils.ins().getWidth();
        this.roleimg.height = StageUtils.ins().getHeight();
        // img.scaleX = StageUtils.ins<StageUtils>().getWidth()/1136 - 0.2;
        // img.scaleY = StageUtils.ins<StageUtils>().getHeight()/640 - 0.2;
        egret.Tween.get(this.roleimg).to({ alpha: 1, scaleX: this.roleimg.scaleX + 0.01, scaleY: this.roleimg.scaleY + 0.01 }, 300).to({ alpha: 0, scaleX: this.roleimg.scaleX, scaleY: this.roleimg.scaleY }, 300).call(function () {
            egret.Tween.removeTweens(_this.roleimg);
        });
    };
    StartGameView.prototype.onFrame = function () {
        this.customFilter1.uniforms.customUniform += 0.05;
        if (this.customFilter1.uniforms.customUniform > Math.PI * 2) {
            this.customFilter1.uniforms.customUniform = 0.0;
        }
    };
    // private onTouchTap(evt:egret.TouchEvent):void{
    // 	switch(evt.target){
    // 		case this.head1:
    // 			this.head1.scaleX = this.head1.scaleY = 1.2;
    // 			this.head2.scaleX = this.head2.scaleY = 1;
    // 			this.curHeadSource = "head_1_png";
    // 			break;
    // 		case this.head2:
    // 			this.head2.scaleX = this.head2.scaleY = 1.2;
    // 			this.head1.scaleX = this.head1.scaleY = 1;
    // 			this.curHeadSource = "head_2_png";
    // 			break;
    // 	}
    // }
    StartGameView.prototype.onStart = function (evt) {
        // if(!StringUtils.getStringLength(this.nameLab.text) && !this._first){
        // 	UserTips.ins<UserTips>().showTips("请输入您的名称")
        // 	return;
        // }
        var _this = this;
        this.startGame.touchEnabled = false;
        // egret.Tween.removeTweens(this.startGame);
        var roleGoldStr = egret.localStorage.getItem(LocalStorageEnum.GOLD_NUM);
        if (!roleGoldStr || parseInt(roleGoldStr) < this._enterLimit) {
            //进入收集页面
            ViewManager.ins().open(CollectView, [{ roleName: "刘备 字 玄德", headIcon: this.curHeadSource }]);
        }
        else {
            //第二次进入 。直接进入主城
            ViewManager.ins().open(GameMainView);
        }
        egret.Tween.get(this).to({ alpha: 0 }, 1000, egret.Ease.circIn).call(function () {
            egret.Tween.removeTweens(_this);
            ViewManager.ins().close(StartGameView);
        }, this);
    };
    StartGameView.prototype.close = function () {
        if (this._interval) {
            clearInterval(this._interval);
        }
        this.filters = [];
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        // this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
        this.removeTouchEvent(this.startGame, this.onStart);
    };
    return StartGameView;
}(BaseEuiView));
__reflect(StartGameView.prototype, "StartGameView");
ViewManager.ins().reg(StartGameView, LayerManager.UI_Main);
//# sourceMappingURL=StartGameView.js.map