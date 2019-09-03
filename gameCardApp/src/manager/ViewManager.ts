class ViewManager extends BaseClass{

	/**
	 * 已注册的UI信息
	 */
	private _regesterInfo: any;

	/**显示的ui实体 */
	private _views:BaseEuiView[];
	public constructor() {
		super();
		this._regesterInfo = {};
		this._views = [];
	}
	/**获取当前界面是否注册 */
	private getKey(nameOrClass: any): string {
		let key: string = "";
		let keys = Object.keys(this._regesterInfo);
		for (let i: number = 0, len = keys.length; i < len; i++) {
			let tempKey: string = keys[i];
			if (this._regesterInfo[tempKey][0] == nameOrClass) {
				key = tempKey;
				break;
			}
		}
		return key;
	}
	/**获取当前界面是否存在 */
	private isExistView(view:any):any{
		for(let i:number = 0;i<this._views.length;i++){
			if(this._views[i] instanceof view){
				return {view:this._views[i],index:i};
			}
		}
		return null;
	}
	/**
	 * 面板注册
	 * @param view 面板类
	 * @param layer 层级
	 */
	public reg(viewClass: any, layer:eui.UILayer): void {
		if (viewClass == null) {
			return;
		}
		let keys: string = egret.getQualifiedClassName(viewClass);
		if (this._regesterInfo[keys]) {
			return;
		}
		this._regesterInfo[keys] = [viewClass, layer];
	}
	public open(nameOrClass: any, param: any[] = null,startEffect:boolean = false):void{
		let keys: string = this.getKey(nameOrClass);
		if(keys){
			//当前界面已经注册
			let info: any[] = this._regesterInfo[keys];
			let obj = this.isExistView(info[0]);
			let view: BaseEuiView = obj?obj.view:null;
			let index = obj?obj.index -1:0;
			if (view == null) {
				view = new info[0]();
				view.addToParent(info[1]);
				view.open.apply(view, param);
				this._views.push(view);
			}else{
				if(view.refreshPage){
					view.refreshPage.apply(view,param);
				}
			}
			
			if(startEffect){
				let curView:BaseEuiView = this._views[index];
				if(curView){
					curView.left = 0
					egret.Tween.get(curView).to({left:-100},500,egret.Ease.circOut).call(()=>{
						egret.Tween.removeTweens(curView);
					},this)
				}
				view.left = view.width;
				egret.Tween.get(view).to({left:0},500,egret.Ease.circOut).call(()=>{
					egret.Tween.removeTweens(view);
				},this)
			}
		}else{
			//当前界面未注册
			console.log("当前界面未注册----"+nameOrClass);
		}
	}
	public getView(nameOrClass: any): BaseEuiView {
		let keys: string = this.getKey(nameOrClass);
		let info: any[] = this._regesterInfo[keys];
		let obj = this.isExistView(info[0]);
		let view: BaseEuiView = obj?obj.view:null;
		// if (this._views[keys] instanceof Array)
		// 	return null;
		return view
	}
	public closeReturnEffect(nameOrClass:any,removed:boolean = false,_preView = null):void{
		let keys: string = this.getKey(nameOrClass);
		if(keys){
			let info: any[] = this._regesterInfo[keys];
			let obj = this.isExistView(info[0]);
			let index = obj?obj.index:0;
			let view: BaseEuiView = this._views[index];
			let preView:BaseEuiView = this._views[index-1];
			if(view){
				egret.Tween.get(view).to({left:view.width},500,egret.Ease.circOut).call(()=>{
					egret.Tween.removeTweens(view);
					if(removed){
						//需要移除这个界面;
						this.close(nameOrClass);
					}
				},this)
			}
			if(_preView){
				let keys2: string = this.getKey(_preView);
				if(keys2){
					let info2: any[] = this._regesterInfo[keys2];
					let obj2 = this.isExistView(info2[0]);
					let index2 = -1;
					if(obj2)index2 = obj2.index;
					if(index2 != -1)preView = this._views[index2];
				}
			}
			if(preView){
				if(preView.refreshPage){
					preView.refreshPage();
				}
				egret.Tween.get(preView).to({left:0},500,egret.Ease.circOut).call(()=>{
					egret.Tween.removeTweens(preView);
				})
			}
		}
		
	}
	public close(nameOrClass: any):void{
		let keys: string = this.getKey(nameOrClass);
		if(keys){
			//当前界面已经注册
			let info: any[] = this._regesterInfo[keys];
			let obj = this.isExistView(info[0]);
			if(!obj){return null}
			let index = obj?obj.index:0;
			let view: BaseEuiView = this._views[index];
			if (view == null) {
				return null;
			}else{
				this._views.splice(index,1)
				view.removeFromeParent();
			}
			
		}else{
			//当前界面未注册
			console.log("当前界面未注册----"+nameOrClass);
		}
	}
	
}