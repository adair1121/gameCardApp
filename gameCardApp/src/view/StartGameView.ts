class StartGameView extends BaseEuiView{

	private enterBtn:eui.Button;
	private storyBtn:eui.Image;
	private customFilter4;
	public constructor() {
		super();
	}
	public open(...param):void{
		let firstStr:string = egret.localStorage.getItem(LocalStorageEnum.ENTER_FIRST);
		if(!firstStr){
			egret.localStorage.setItem(LocalStorageEnum.ENTER_FIRST,"1");
			ViewManager.ins<ViewManager>().open(StoryPopUp);
		}
		this.addTouchEvent(this.storyBtn,this.onLookStory,true);
		this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onEnter,this);

		 let vertexSrc =
            "attribute vec2 aVertexPosition;\n" +
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
		let fragmentSrc4 = [
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
		this.customFilter4 = new egret.CustomFilter(
            vertexSrc,
            fragmentSrc4,
            {
                lineWidth: 0.1,
                offset: 1
            }
        );
		this.filters = [this.customFilter4];
		
	}
	private onFrame(evt:egret.TouchEvent):void{
		this.customFilter4.uniforms.offset -= 0.05;
		if (this.customFilter4.uniforms.offset <= 0) {
			this.customFilter4.uniforms.offset = 0.0;
			ViewManager.ins<ViewManager>().close(StartGameView);
			let view:GameMainView = ViewManager.ins<ViewManager>().getView(GameMainView) as GameMainView;
			view.initialize();
		}
	}
	/**进入游戏 */
	private onEnter(evt:egret.TouchEvent):void{
		this.touchEnabled = false;
		this.addEventListener(egret.Event.ENTER_FRAME,this.onFrame,this);
	}
	/**查看故事 */
	private onLookStory():void{
		ViewManager.ins<ViewManager>().open(StoryPopUp);
	}
	public close():void{
		this.addTouchEvent(this.storyBtn,this.onLookStory,true);
		this.enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onEnter,this);
		this.removeEventListener(egret.Event.ENTER_FRAME,this.onFrame,this);
	}
}
ViewManager.ins<ViewManager>().reg(StartGameView,LayerManager.UI_Main);