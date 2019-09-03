class StartGameView extends BaseEuiView{

	private startGame:eui.Image;
	// private head1:eui.Image;
	// private head2:eui.Image;
	// private nameLab:eui.Label;
	private curHeadSource:string = "head_1_png";
	// private selectGroup:eui.Group;
	//默认进主城限制

	private _enterLimit:number = 200;
	private customFilter1;
	private _interval;
	private roleimg:eui.Image;
	public constructor() {
		super();
	}
	public open(...param):void{
		
		LoadingUI.inst().hide();
		this.addTouchEvent(this.startGame,this.onStart,true);
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
		this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
		// egret.Tween.get(this.startGame,{loop:true}).to({scaleX:0.9,scaleY:0.9},800).to({scaleX:1,scaleY:1},800);

		// if(!this._first){
			
		// 	this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		// }	
		let self = this;
		self.createStaticRoleAct();
		let rangeX:number = (608*(StageUtils.ins<StageUtils>().getWidth()/1136 - 0.1));
		let tarY:number = StageUtils.ins<StageUtils>().getHeight()>>1;
		this._interval = setInterval(()=>{
			self.createStaticRoleAct();
			
			let num:number = ((Math.random()*100)>>0) > 50?3:2;
			for(let i:number = 0;i<num;i++){
				let index:number = (Math.random()*7+1)>>0;
				let res:string = `item_fire_${index}_png`;
				let img:eui.Image = new eui.Image();
				this.addChild(img);
				img.source = res;
				img.bottom = -50;
				img.x = (Math.random()*(StageUtils.ins<StageUtils>().getWidth()-rangeX)+rangeX)>>0
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
	private createStaticRoleAct():void{
		this.roleimg.alpha = 0;
		this.roleimg.width = StageUtils.ins<StageUtils>().getWidth();
		this.roleimg.height = StageUtils.ins<StageUtils>().getHeight();
		// img.scaleX = StageUtils.ins<StageUtils>().getWidth()/1136 - 0.2;
		// img.scaleY = StageUtils.ins<StageUtils>().getHeight()/640 - 0.2;
		egret.Tween.get(this.roleimg).to({alpha:1,scaleX:this.roleimg.scaleX+0.01,scaleY:this.roleimg.scaleY+0.01},300).to({alpha:0,scaleX:this.roleimg.scaleX,scaleY:this.roleimg.scaleY},300).call(()=>{
			egret.Tween.removeTweens(this.roleimg);
		})

	}
	private onFrame():void{
		this.customFilter1.uniforms.customUniform += 0.05;
		if (this.customFilter1.uniforms.customUniform > Math.PI * 2) {
			this.customFilter1.uniforms.customUniform = 0.0;
		}
	}
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
	private onStart(evt:egret.TouchEvent):void{
		// if(!StringUtils.getStringLength(this.nameLab.text) && !this._first){
		// 	UserTips.ins<UserTips>().showTips("请输入您的名称")
		// 	return;
		// }
		
		
		this.startGame.touchEnabled = false;
		// egret.Tween.removeTweens(this.startGame);
		let roleGoldStr:string = egret.localStorage.getItem(LocalStorageEnum.GOLD_NUM);
		if(!roleGoldStr || parseInt(roleGoldStr) < this._enterLimit){
			//进入收集页面
			ViewManager.ins<ViewManager>().open(CollectView,[{roleName:"刘备 字 玄德",headIcon:this.curHeadSource}]);
		}else{
			//第二次进入 。直接进入主城
			ViewManager.ins<ViewManager>().open(GameMainView);
		}
		egret.Tween.get(this).to({alpha:0},1000,egret.Ease.circIn).call(()=>{
			egret.Tween.removeTweens(this);
			ViewManager.ins<ViewManager>().close(StartGameView);
			
		},this)
	}
	public close():void{
		if(this._interval){
			clearInterval(this._interval);
		}
		this.filters = [];
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
		// this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.removeTouchEvent(this.startGame,this.onStart);
	}
}
ViewManager.ins<ViewManager>().reg(StartGameView,LayerManager.UI_Main);