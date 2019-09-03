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
var GameLoadingUI = (function (_super) {
    __extends(GameLoadingUI, _super);
    function GameLoadingUI() {
        var _this = _super.call(this) || this;
        _this.total = 100;
        _this.cur = 0;
        return _this;
    }
    /**
     * 面板开启执行函数，用于子类继承
     * @param param 参数
     */
    GameLoadingUI.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.proBar.mask = this.barMask;
        this.progressLab.text = "0%请稍候...";
        var time = setInterval(function () {
            _this.cur += 5;
            if (_this.cur >= _this.total) {
                _this.cur = _this.total;
                clearInterval(time);
                if (param && param[0]) {
                    if (param[0].cb && param[0].arg) {
                        param[0].cb.call(param[0].arg);
                    }
                    if (param[0].param) {
                        _this._param = param[0].param;
                    }
                    if (param[0].cls) {
                        ViewManager.ins().open(param[0].cls, [_this._param]);
                    }
                    if (param[0].closeCls) {
                        ViewManager.ins().close(param[0].closeCls);
                    }
                }
                StageUtils.ins().getStage().dispatchEvent(new StartGameEvent(StartGameEvent.GAMELOADINGEND));
                ViewManager.ins().close(GameLoadingUI);
            }
            var percent = ((_this.cur / _this.total) * 100) >> 0;
            _this.progressLab.text = percent + "%请稍候...";
            _this.barMask.height = ((_this.cur / _this.total) * 206);
        }, 100);
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
    };
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
    GameLoadingUI.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    return GameLoadingUI;
}(BaseEuiView));
__reflect(GameLoadingUI.prototype, "GameLoadingUI");
ViewManager.ins().reg(GameLoadingUI, LayerManager.UI_Pop);
//# sourceMappingURL=GameLoadingUI.js.map