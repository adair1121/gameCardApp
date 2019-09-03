class GameLoadingUI extends BaseEuiView {

    // private leftImg:eui.Image;
    // private rightImg:eui.Image;
    // private _cb:()=>void;
    // private _arg:any;
    private _param:any;

    private barMask:eui.Image;
    private proBar:eui.Image;
    private progressLab:eui.Label;
    private total:number = 100;
    private cur:number = 0
	public constructor() {
		super();
	}
    /**
     * 面板开启执行函数，用于子类继承
     * @param param 参数
     */
    public open(...param: any[]): void {

        this.proBar.mask = this.barMask;
        this.progressLab.text = "0%请稍候...";
        let time = setInterval(()=>{
            this.cur +=5;
            if(this.cur >= this.total){
                this.cur = this.total;
                clearInterval(time);
                
                if(param && param[0]){
                    if(param[0].cb && param[0].arg){
                        param[0].cb.call(param[0].arg)
                    }
                    if(param[0].param){
                        this._param = param[0].param;
                    }
                    if(param[0].cls){
                       ViewManager.ins<ViewManager>().open(param[0].cls,[this._param]);
                    }
                    if(param[0].closeCls){
                        ViewManager.ins<ViewManager>().close(param[0].closeCls);
                    }
                }
                StageUtils.ins<StageUtils>().getStage().dispatchEvent(new StartGameEvent(StartGameEvent.GAMELOADINGEND));
                ViewManager.ins<ViewManager>().close(GameLoadingUI);
            }
            let percent:number = ((this.cur/this.total)*100)>>0
            this.progressLab.text = percent+"%请稍候...";
            this.barMask.height = ((this.cur/this.total)*206);
        },100)
        // this.leftImg.x = 0;
        // this.rightImg.x = StageUtils.ins<StageUtils>().getWidth();
        // let cls:BaseEuiView = (param && param.length)?param[0].cls:null;
        // if(param && param.length){
        //     if(param[0].cb){
        //         this._cb = param[0].cb
        //     }
        //     if(param[0].arg){
        //         this._arg = param[0].arg
        //     }
        //     if(param[0].param){
        //         this._param = param[0].param;
        //     }
        //     if(param[0].closeCls){
        //         this._closeCls = param[0].closeCls
        //     }
        // }
        // this.loadAni(cls)
        // if(param[0] && param[0].route == "home"){
            
        // }else{
        //     this.loadAni(`${MAP_HOME}`,SceneEnum.HOME)
        // }
       
    }
    // private loadAni(cls:BaseEuiView):void{
    //     // RES.getResByUrl(`${str}map.json`, (data) => {
    //         // GameMap.curMap = curScene;
    //         let leftTween = egret.Tween.get(this.leftImg);
    //         let rightTween =  egret.Tween.get(this.rightImg);
    //         // //地图网格初始化
    //         // GameMap.init(data);
    //         leftTween.to({x:(StageUtils.ins<StageUtils>().getWidth()>>1)+2},500,egret.Ease.circIn).wait(1500).to({x:-20},1000,egret.Ease.circOut).call(()=>{
    //             egret.Tween.removeTweens(leftTween);
    //         },this);
    //         rightTween.to({x:(StageUtils.ins<StageUtils>().getWidth()>>1)-2},500,egret.Ease.circIn).call(()=>{
    //             GlobalFun.shakeObj(this,0.5,15,15);
    //             if(this._cb && this._arg){
    //                 this._cb.call(this._arg);
    //             }
    //             if(cls){
    //                 ViewManager.ins<ViewManager>().open(cls,[this._param]);
    //             }
    //             if(this._closeCls){
    //                 ViewManager.ins<ViewManager>().close(this._closeCls);
    //             }
    //         },this).wait(1500).to({x:(StageUtils.ins<StageUtils>().getWidth()+20)},1000,egret.Ease.circOut).call(()=>{
    //             egret.Tween.removeTweens(leftTween);
    //             ViewManager.ins<ViewManager>().close(GameLoadingUI);
    //         });
    //     // }, this);
    // }

    /**
     * 面板关闭执行函数，用于子类继承
     * @param param 参数
     */
    public close(...param: any[]): void {
        
    }
}
ViewManager.ins<ViewManager>().reg(GameLoadingUI,LayerManager.UI_Pop)