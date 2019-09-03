/**
 * 共用方法
 */
class GlobalFun {
	public constructor() {
	}
    
	public static getOption(key:string):string {
        if (window.location) {
            let search = location.search;
            if (search == "") {
                return "";
            }
            search = search.slice(1);
            let searchArr = search.split("&");
            let length = searchArr.length;
            for (let i:number = 0; i < length; i++) {
                let str = searchArr[i];
                let arr = str.split("=");
                if (arr[0] == key) {
                    return arr[1];
                }
            }
        }
        return "";
    } 
	private static initX:number;                //初始位置
    private static initY: number;  
    private static target:egret.DisplayObject;  //震动目标
    private static maxDis: number;              //震动距离
    private static count: number = 0;           //计时器次数
    private static rate: number;                //一秒震动次数
    private static timer:egret.Timer = new egret.Timer(1000);
	/**
     * 震动显示对象
     * @param        target    震动目标对象
     * @param        time      震动持续时长（秒）
     * @param        rate      震动频率(一秒震动多少次)
     * @param        maxDis    震动最大距离
     */
	public static shakeObj(target: egret.DisplayObject,time: number,rate: number,maxDis: number):void{
		this.target = target;
        this.initX = target.x;
        this.initY = target.y;
        this.maxDis = maxDis;
        this.count = time * rate;
        this.rate = rate;
        this.timer.delay = 1000/rate;
        this.timer.repeatCount = this.count;
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.shaking, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.shakeComplete, this);
        this.timer.reset();
        this.timer.start();
	}
	private static shaking(): void {
        egret.Tween.removeTweens(this.target);
        this.target.x = this.initX - this.maxDis + Math.random()*this.maxDis*2;
        this.target.y = this.initY - this.maxDis +  Math.random()*this.maxDis*2;
        egret.Tween.get(this.target).to({x:this.initX, y:this.initY},999/this.rate);    
    }
     
    private static shakeComplete(): void {
        if(this.target){
            egret.Tween.removeTweens(this.target);
            this.target.x = this.initX;
            this.target.y = this.initY;
        }
        this.timer.removeEventListener(egret.TimerEvent.TIMER,this.shaking,this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.shakeComplete,this);
    }
	/**停止震动 */
    public static stop(){
        this.shakeComplete();
    }
    public static getMainEntityRes(action:number):string{
        let jobstr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_JOB);
        let str:string = (jobstr && jobstr != "0")?"idle_ride":"idle_normal";
        switch(action){
            case ActionEnum.run:
                str = (jobstr && jobstr != "0")?"move_ride":"move_normal";
                break;
            case ActionEnum.stand:
                str = (jobstr && jobstr != "0")?"idle_ride":"idle_normal";
                break;
            case ActionEnum.attack:
                str = (jobstr && jobstr != "0")?"attack_ride":"attack_normal";
                break;
        }
        return str;
    }
    public static getEnemyRes(action:number):string{
        let str:string = "enemy_stand";
        switch(action){
            case ActionEnum.run:
                str = "enemy_run";
                break;
            case ActionEnum.stand:
                str = "enemy_stand";
                break;
            case ActionEnum.attack:
                str = "enemy_attack";
                break;
        }
        return str;
    }
    /**获取兵种资源 */
    public static getSoldierRes(camp):{res:string,id:number,wh:{w:number,h:number},speed:number,dist:number}{
        let soldiers:number[] = [SoldierType.SOLDIER_QIANG,SoldierType.SOLDIER_DAO,SoldierType.SOLDIER_QI,SoldierType.SOLDIER_TOUSHICHE];
        let whCfgs:{w:number,h:number}[] = [{w:136,h:102},{w:101,h:90},{w:177,h:139},{w:101,h:86},{w:122,h:110}]
        let speeds:number[] = [80,80,130,80,50];
        let atkdis:number[] = [50,50,50,400,550];
        let percent:number = (Math.random()*100)>>0;
        let index:number = 0;
        if(percent <= 35){index = 0}else if(percent <= 70){index = 1}else if(percent <= 95){index = 2}else{index = 3};
        let str:string = "";
        let id:number = soldiers[index];
        let whcfg:{w:number,h:number} = whCfgs[index];
        str = camp == 1?"soldier_"+id:"soldier_"+id;
        // switch(id){
        //     case SoldierType.SOLDIER_DAO:
        //     case SoldierType.SOLDIER_QIANG:
        //     case SoldierType.SOLDIER_QI:
                
        //         break;
        //     case SoldierType.SOLDIER_GONG:
        //         //暂时读这个资源
        //         str = "soldier_stand_"+SoldierType.SOLDIER_DAO;
        //         break;
        //     case SoldierType.SOLDIER_TOUSHICHE:
        //         //暂时读这个资源
        //         str = "soldier_stand_"+SoldierType.SOLDIER_GONG;
        //         break;
        // }
        return {res:str,id:id,wh:whcfg,speed:speeds[index],dist:atkdis[index]};
    }
    public static getResUrl():{res:string,attr:Object,resArr:string[],attrArr:any[],resType:number}{
        let arr:string[] = ["gold_icon_png","gem_icon_png","light_box_png"];
        let attr:any[] = [{w:27,h:28,name:"五铢钱",resType:0},{w:47,h:35,name:"矿石",resType:0},{w:71,h:59,name:"宝箱",resType:1}];
        let index:number = (Math.random()*attr.length)>>0;
        // let index:number = (Math.random()*100)>>0;
        // if(index<=30){index = 0}else if(index<=60){index = 1}else if(index<=90){index = 2}else{index = 3}
        return {res:arr[index],attr:attr[index],resArr:arr,attrArr:attr,resType:attr[index]["resType"]}
    }
    public static filterToGrey(tar:egret.DisplayObject):void{
        var colorMatrix = [
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0,0,0,1,0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        tar.filters = [colorFlilter];
    }
    public static clearFilters(tar:egret.DisplayObject):void{
        tar.filters = [];
    }
    public static sendToNativePhurse(_data:{goodid:number,goodname:number,goodtype:number,price:number}):void{
        if(window["webkit"] &&window["webkit"].messageHandlers && window["webkit"].messageHandlers.payGood)
        {
            window["webkit"].messageHandlers.payGood.postMessage(JSON.stringify(_data));
        }
    }
    public static payCallBack(_cb):void{
        GameApp.pay_cbDdata = _cb;
    }

}
