class StartGameView extends BaseEuiView{

	private enterBtn:eui.Button;
	private storyBtn:eui.Image;
	private customFilter1;
	private clickBegin:boolean = false;
	private _interval;
	private roleimg2:eui.Image;
	public constructor() {
		super();
	}
	public open(...param):void{
		egret.Tween.removeAllTweens();
		this.roleimg2.width = StageUtils.inst().getWidth();
		this.roleimg2.height = StageUtils.inst().getHeight() - 10;
		this.roleimg2.anchorOffsetX = this.roleimg2.width>>1;
		this.roleimg2.anchorOffsetY = this.roleimg2.height>>1;
		this.roleimg2.x = this.roleimg2.width>>1;
		this.roleimg2.y = this.roleimg2.height>>1;
		this.roleimg2.alpha = 0;
		egret.Tween.get(this.roleimg2,{loop:true}).to({alpha:1,scaleX:1.01,scaleY:1.01},500).to({alpha:0,scaleX:1,scaleY:1},500).wait(1500);
		let firstStr:string = egret.localStorage.getItem(LocalStorageEnum.ENTER_FIRST);
		this.enterBtn.alpha = 0;
		if(!firstStr){
			egret.localStorage.setItem(LocalStorageEnum.ENTER_FIRST,"1");
			// this.enterBtn.visible = false;
			ViewManager.inst().open(StoryPopUp,[{cb:this.onShowBtn,arg:this}]);
		}else{
			this.onShowBtn();
		}
		this.addTouchEvent(this.storyBtn,this.onLookStory,true);
		this.addTouchEvent(this.enterBtn,this.onEnter,true);
		

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
		let fragmentSrc1 =
            "precision lowp float;\n" +
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
		this.customFilter1 = new egret.CustomFilter(
            vertexSrc,
            fragmentSrc1,
            {
                customUniform: 0
            }
        );
		this.filters = [this.customFilter1]
		this.addEventListener(egret.Event.ENTER_FRAME,this.onFrame,this);
		SoundManager.inst().playBg(`${RES_AUDIO}game.mp3`);
		let self = this;
		// let rangeX:number = (608*(StageUtils.inst().getWidth()/1136 - 0.1));
		let tarY:number = (StageUtils.inst().getHeight()>>1) + 100;
		this._interval = setInterval(()=>{
			
			let num:number = ((Math.random()*100)>>0) > 50?6:5;
			for(let i:number = 0;i<num;i++){
				let index:number = (Math.random()*7+1)>>0;
				let res:string = `item_fire_${index}_png`;
				let img:eui.Image = new eui.Image();
				this.addChild(img);
				img.source = res;
				img.bottom = -50;
				img.x = (Math.random()*(StageUtils.inst().getWidth())>>0)
				let y:number = tarY-((Math.random()*150)>>0);
				let angle:number = img.rotation;
				let dic:number = ((Math.random()*100)>>0) > 50?1:-1;
				egret.Tween.get(img,{loop:false,onChange:()=>{
					if(angle % 80 == 0){
						dic*=-1;
					}
					img.scaleX -= 0.001;
					img.scaleY -= 0.001;
					angle += 0.3*dic;
					img.rotation = angle;
				},onChangeObj:this}).to({bottom:y,alpha:0},5000).call(()=>{
					egret.Tween.removeTweens(img);
					this.removeChild(img);
				})
			}
		},3000)
	}
	private onShowBtn():void{
		egret.Tween.get(this.enterBtn).to({alpha:1},600).call(()=>{
			egret.Tween.removeTweens(this.enterBtn);
		},this)
	}
	private onFrame(evt:egret.TouchEvent):void{
		if(this.clickBegin){
			this.onReturn();
		}else{
			this.customFilter1.uniforms.customUniform += 0.05;
			if (this.customFilter1.uniforms.customUniform > Math.PI * 2) {
				this.customFilter1.uniforms.customUniform = 0.0;
			}
		}
		
		
	}
	private onReturn():void{
		egret.Tween.get(this).to({alpha:0},1000).call(()=>{
			egret.Tween.removeTweens(this);
			ViewManager.inst().close(StartGameView);
		},this)
		let view:GameMainView = ViewManager.inst().getView(GameMainView) as GameMainView;
		if(!view){
			ViewManager.inst().open(GameMainView);
			view = ViewManager.inst().getView(GameMainView) as GameMainView;
		}
		view.initialize(true);
		
	}
	/**进入游戏 */
	private onEnter(evt:egret.TouchEvent):void{
		this.touchEnabled = false;
		SoundManager.inst().touchBg();
		this.clickBegin = true;
	}
	/**查看故事 */
	private onLookStory():void{
		ViewManager.inst().open(StoryPopUp);
	}
	public close():void{
		if(this._interval){
			clearInterval(this._interval);
		}
		egret.Tween.removeTweens(this.roleimg2);
		this.removeTouchEvent(this.storyBtn,this.onLookStory);
		this.removeTouchEvent(this.enterBtn,this.onEnter);
		this.removeEventListener(egret.Event.ENTER_FRAME,this.onFrame,this);
	}
}
ViewManager.inst().reg(StartGameView,LayerManager.UI_Main);