/**
 * Created by yangsong on 15-1-14.
 * 音效类
 */
class SoundEffects extends BaseSound {
	private _volume:number;
	private _sound:egret.Sound;
	private _loaded = false;
	/**
	 * 构造函数
	 */
	public constructor() {
		super();
	}

	/**
	 * 播放一个音效
	 * @param effectName
	 */
	public play(effectName:string):void {
		this._loaded = true;
		this.getSound(effectName,(sound)=>{
			if (sound) {
				this._sound = sound;
				this.playSound(this._sound);
			}
		},this);
	}
	/**
	 * 停止一个音效
	 * @param effectName
	 */
	public stop():void {
		if (this._soundChannel) {
			this._soundChannel.stop();
		}
	}
	private _soundChannel:egret.SoundChannel
	/**
	 * 播放
	 * @param sound
	 */
	private playSound(sound:egret.Sound):void {
		if(this._soundChannel){
			this._soundChannel.stop();
		}
		this._soundChannel = sound.play(0, 1);
		this._soundChannel.volume = this._volume;
	}

	/**
	 * 设置音量
	 * @param volume
	 */
	public setVolume(volume:number):void {
		this._volume = volume;
	}


	/**
	 * 资源加载完成后处理播放
	 * @param key
	 */
	public loadedPlay(key:string):void {
		let sound = RES.getRes(key);
		//避免音频解码失败报错
		if (!sound) {
			return;
		}
		this.playSound(sound);
	}
}