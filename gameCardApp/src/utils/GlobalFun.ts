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
     /**外法光 */
    public static lighting(obj:egret.DisplayObject,color:number = 0x33CCFF,boo:boolean = false):void{
        var color:number = color;        /// 光晕的颜色，十六进制，不包含透明度
        var alpha:number = 0.8;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        var blurX:number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY:number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength:number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality:number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        var inner:boolean = boo;            /// 指定发光是否为内侧发光，暂未实现
        var knockout:boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
        var glowFilter:egret.GlowFilter = new egret.GlowFilter( color, alpha, blurX, blurY,
            strength, quality, inner, knockout );
        obj.filters = [glowFilter]
        
        egret.Tween.get(glowFilter,{loop:true}).to({alpha:0.2},1000).to({alpha:0.8},1000);
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
    /**获取所有boss配置 */
    public static getBossCfg():CardVo[]{
        let cfgs:CardVo[] = MonsterCfg.cfgs;
        let arr:CardVo[] = [];
        for(let key in cfgs){
            if(cfgs[key].type == 1){
                arr.push(cfgs[key])
            }
        }
        return arr;
    }
    /**获取所有小怪配置 */
    public static getMonsterCfg():CardVo[]{
        let cfgs:CardVo[] = MonsterCfg.cfgs;
        let arr:CardVo[] = [];
        for(let key in cfgs){
            if(cfgs[key].type == 2){
                arr.push(cfgs[key])
            }
        }
        return arr;
    }
    /**根据id获取怪物配置 */
    public static getCardDataFromId(id:number):CardVo{
         let cfgs:CardVo[] = MonsterCfg.cfgs;
         for(let key in cfgs){
            if(cfgs[key].id == id){
                return cfgs[key];
            }
        }
    }
    public static deepCopy(obj):any{
        let obj2:any = {};
        for(let key in obj){
            obj2[key] = obj[key];
        }
        return obj2;
    }
    /**根据id获取技能神将配置 */
    public static getSkillGeneralCfg(id:number):CardVo{
        let cfgs:any[] = RebornCfg.cfg;
        let curCfg:CardVo = null;
         for(let key in cfgs){
            if(cfgs[key].mid == id){
                cfgs[key].id = id;
                curCfg = this.deepCopy(cfgs[key]);
                // curCfg.atkDis  = curCfg.atkDis + ((Math.random()*15))
                break;
            }
        }
        for(let key in GameApp.skillCfg){
            if(GameApp.skillCfg[key] && GameApp.skillCfg[key].rebornId && GameApp.skillCfg[key].rebornId == id){
                curCfg.level = GameApp.skillCfg[key].level;
                curCfg.atk = GameApp.skillCfg[key].atk;
                curCfg.hp = GameApp.skillCfg[key].hp;
                break;
            }
        }
        return curCfg;
    }
    /**获取宝箱刷新时间戳 */
    public static getBoxRfreshTimeSpan():number{
        let startTp:number = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1).getTime();
        let time:number = 5*60*60*1000;
        return startTp + time;
    }
    public static getSkillCfg(id:number):any{
        let skillcfgs:any[] = SkillCfg.skillCfg;
        for(let key in skillcfgs){
            if(skillcfgs[key].skillId == id){
                return skillcfgs[key];
            }
        }
    }
    public static getIndex():number{
		return ((Math.random()*100)>>0) > 50?1:-1;
	}
    /**
     * 创建技能特效显示
     * @param id 技能id
     * @param parent 父级容器
     * @param loopCount 循环次数
     * @param pos 位置
     * */
    public static createSkillEff(camp:number,id:number,parent:egret.DisplayObjectContainer,loopCount:number,pos:XY,entitys?:SoldierEntity[],atk?:number):void{
        // let skillCfg:any = SkillCfg.skillCfg[camp];
        // let skillCfg:any
        // let curUseSkill:any;
        let loop:boolean = true;
        let skillNames:string[] = ["旋转雷球","龙腾","地爆","狂怒斩","凤凰展翅","双龙戏珠","践踏","霸刀斩","炎爆","裂地","雷霆万钧"];

        let skillName:string = skillNames[id-1];
        let res:string = "skilleff"+id;
        
        // if(id == 100001 || id == 100002 || id == 100003 || id == 100004){
        //     loop = true;
        // }
        // for(let key in skillCfg){
        //     if(skillCfg[key].skillId == id){
        //         curUseSkill = skillCfg[key];
        //         break;
        //     }
        // }

        let textInfo:eui.Label =new eui.Label();
        textInfo.size = 40;
		textInfo.scaleX = textInfo.scaleY = 1;
		textInfo.textColor = 0xff0000;
        if(camp == -1){
            // textInfo.textColor = 0xfc3434;
        }else{
             res = "skill_"+id;
        }
		parent.addChild(textInfo);
        textInfo.x = pos.x;
        textInfo.y = pos.y - 150;
        textInfo.text = skillName;
        
        egret.Tween.get(textInfo).to({scaleX:2,scaleY:2},600,egret.Ease.circIn).wait(500).call(()=>{
			egret.Tween.removeTweens(textInfo);
			if(textInfo && textInfo.parent){
				textInfo.parent.removeChild(textInfo);
			}
			textInfo = null;
		},this)

        if(loop){
            let count = 1;
            let minx:number = 150;
            let maxx:number = StageUtils.inst().getWidth() - 240;
            let miny:number = 150;
            let maxy:number = StageUtils.inst().getHeight() - 100;
            let mc:MovieClip = new MovieClip();
            mc.scaleX = mc.scaleY = 1;
            parent.addChild(mc);
            mc.playFile(`${SKILL_EFF}${res}`,loopCount,null,true);
            mc.x = (Math.random()*(maxx - minx)+minx)>>0;
            mc.y = (Math.random()*(maxy - miny)+miny)>>0;
            if(entitys && atk){
                for(let i:number = 0;i<entitys.length;i++){
                    if(entitys[i] && !entitys[i].isDead){
                        let dis:number = egret.Point.distance(new egret.Point(entitys[i].x,entitys[i].y),new egret.Point(mc.x,mc.y));
                        if(dis <= 100){
                            entitys[i].reduceHp(atk + ((this.getIndex()*0.2)>>0))
                        }
                    }
                }
            }
            
            let interVal = setInterval(()=>{
                count += 1;
                let mc:MovieClip = new MovieClip();
                mc.scaleX = mc.scaleY = 0.7;
                parent.addChild(mc);
                mc.playFile(`${SKILL_EFF}${res}`,loopCount,null,true);
                mc.x = (Math.random()*(maxx - minx)+minx)>>0;
                mc.y = (Math.random()*(maxy - miny)+miny)>>0;
                if(entitys && atk){
                    for(let i:number = 0;i<entitys.length;i++){
                        if(entitys[i] && !entitys[i].isDead){
                            let dis:number = egret.Point.distance(new egret.Point(entitys[i].x,entitys[i].y),new egret.Point(mc.x,mc.y));
                            if(dis <= 100){
                                entitys[i].reduceHp(atk)
                            }
                        }
                    }
                }
                
                if(count >= 10){
                    clearInterval(interVal);
                }
            },200)
        }
    }
}
