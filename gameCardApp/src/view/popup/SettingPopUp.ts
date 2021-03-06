class SettingPopUp extends BaseEuiView{

	private btnClose:eui.Image;

	private content:eui.Group;

	private musicBar:eui.Image;

	private musicBarMask:eui.Image;

	private m_sound_control:eui.Image;

	private effectBar:eui.Image;

	private effectBarMask:eui.Image;
	
	private e_sound_control:eui.Image;

	private _barWidth:number = 139;
	private _minx:number = 0;
	private _maxx:number = 0;
	private rect:eui.Rect;
	private continueBtn:eui.Image;
	private exitBtn:eui.Image;
	public constructor() {
		super();
	}
	public open(...param):void{
		MessageManager.inst().dispatch("end");
		egret.Tween.get(this.content).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
		},this)
		this.musicBar.mask = this.musicBarMask;
		this.effectBar.mask = this.effectBarMask;
		this._minx = this.musicBar.x;
		this._maxx = this.musicBar.x + this.musicBar.width;
		
	
		this.musicBarMask.width = this._barWidth*GameApp.bgMusic;
		this.m_sound_control.x = this.musicBarMask.x + this.musicBarMask.width;
		SoundManager.inst().setBgVolume(GameApp.bgMusic);

		this.effectBarMask.width = this._barWidth*GameApp.effectMusic;
		this.e_sound_control.x = this.effectBarMask.x + this.effectBarMask.width
		SoundManager.inst().setEffectVolume(GameApp.effectMusic);
		this.m_sound_control.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onMusicTouchBegin,this);
		StageUtils.inst().getStage().addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMusicTouchMove,this);
		this.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onMusicTouchEnd,this);
		this.addEventListener(egret.TouchEvent.TOUCH_END,this.onMusicTouchEnd,this);
		this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onMusicTouchEnd,this);

		this.e_sound_control.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onEffectTouchBegin,this);

		this.addTouchEvent(this.btnClose,this.onReturn,true);
		this.addTouchEvent(this.continueBtn,this.onReturn,true);
		this.addTouchEvent(this.exitBtn,this.onExit,true);
	}
	private onExit():void{
		this.onReturn(null,true)
	}
	private onReturn(evt:egret.TouchEvent,result:boolean = false):void{
		let self = this;
		let timeout = setTimeout(function() {
			clearTimeout(timeout);
			self.rect.alpha = 0;
		}, 300);
		egret.Tween.get(this.content).to({verticalCenter:-500},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			ViewManager.inst().close(SettingPopUp);
			if(result){
				MessageManager.inst().dispatch("closeMain");
			}else{
				MessageManager.inst().dispatch("start");
				//只为了调刷新接口
				ViewManager.inst().open(GameMainView);
				MessageManager.inst().dispatch(CustomEvt.CANCLESKILLCDPAUSE);
			}
			
		},this)
	}
	//背景音乐事件处理
	private musicTouch:boolean = false;
	private onMusicTouchBegin(evt:egret.TouchEvent):void{
		this.musicTouch = true;
	};
	private onMusicTouchMove(evt:egret.TouchEvent):void{
		let localP:egret.Point = this.content.globalToLocal(evt.stageX,evt.stageY)
		if(localP.x <= this._minx){localP.x = this._minx;}
		if(localP.x >= this._maxx){localP.x = this._maxx;}
		let volum:number = (localP.x - this.musicBar.x)/this._barWidth;
		if(this.musicTouch){
			this.m_sound_control.x = localP.x;
			this.musicBarMask.width = this._barWidth*volum;
			GameApp.bgMusic = volum;
			SoundManager.inst().setBgVolume(volum);
		}
		if(this.effectTouch){
			this.e_sound_control.x = localP.x;
			this.effectBarMask.width = this._barWidth*volum;
			GameApp.effectMusic = volum;
			SoundManager.inst().setEffectVolume(volum);
		}
	}
	private onMusicTouchEnd():void{
		if(this.musicTouch){
			this.musicTouch = false;
		}
		if(this.effectTouch){
			this.effectTouch = false;
		}
	}
	//------------------

	//------特效事件处理---------
	private effectTouch:boolean = false;
	private onEffectTouchBegin():void{
		this.effectTouch = true;
	};
	public close():void{
		this.m_sound_control.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onMusicTouchBegin,this);
		StageUtils.inst().getStage().removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMusicTouchMove,this);
		this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onMusicTouchEnd,this);
		this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onMusicTouchEnd,this);
		this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onMusicTouchEnd,this);
		this.removeTouchEvent(this.btnClose,this.onReturn)
		this.removeTouchEvent(this.continueBtn,this.onReturn);
		this.removeTouchEvent(this.exitBtn,this.onExit);

		this.e_sound_control.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onEffectTouchBegin,this);
	}
}
ViewManager.inst().reg(SettingPopUp,LayerManager.UI_Pop);