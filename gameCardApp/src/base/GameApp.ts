/**
 * @author
 */
class GameApp extends BaseClass {
	
	public static pay_cbDdata:string;
	public static phurseState:boolean = false;
	
	public static roleGold:number = 0;
	public static roleGem:number = 0;
	public static reborns:any= {};
	public static level:number = 1;

	/**总波数 增加 比例 5关加一波 */;
	public static totalCount:number = 5;
	/**背景音乐volume */
	public static bgMusic:number = 0.5;
	/**特效音乐 */
	public static effectMusic:number = 0.5;
	/**技能转生配置 */
	public static skillCfg:any;

	public static gameaEnd:boolean = true;
	public constructor() {
		super();
	}
	public static inst():GameApp{
		let _inst:GameApp = super.single<GameApp>();
		return _inst
	}
	public load() {
		
		eui.Label.default_fontFamily = "Microsoft YaHei";
		// GlobalConfig.parserData();
		// GameMap.init(RES.getRes("map_json"));
		LoadingUI.inst().hide();
		ViewManager.inst().open(GameMainView);
		ViewManager.inst().open(StartGameView);

		let goldstr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_GOLD);
		if(!goldstr){
			GameApp.roleGold = 200;
		}else{
			GameApp.roleGold = parseInt(goldstr);
		}
		let gemstr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_GEM);
		if(!gemstr){
			GameApp.roleGem = 10;
		}else{
			GameApp.roleGem = parseInt(gemstr);
		}

		let rebonidstr:string = egret.localStorage.getItem(LocalStorageEnum.REBORNIDS);
		if(!rebonidstr){
			GameApp.reborns = {};
		}else{
			GameApp.reborns = JSON.parse(rebonidstr);
		}

		let rebornCfg:any = egret.localStorage.getItem(LocalStorageEnum.REBORNCFG);
		if(rebornCfg){
			GameApp.skillCfg = JSON.parse(rebornCfg);
		}
		let levelstr:string = egret.localStorage.getItem(LocalStorageEnum.LEVEL);
		if(!levelstr){
			GameApp.level = 1;
		}else{
			GameApp.level = parseInt(levelstr);
		}
		eui.Binding.bindHandler(GameApp,["level"],this.levelChange,this);

		recharge.sendToNativeLoadEnd();
	}
	private levelChange():void{
		egret.localStorage.setItem(LocalStorageEnum.LEVEL,GameApp.level.toString());
	}
	private onDataCallBack(value:string):void{
		if(value){
			GameApp.phurseState = false;
			GameApp.pay_cbDdata = "";
			UserTips.inst().showTips(`购买成功,获得元宝x${value}`);
		}
	}
	public refreshTimespan():void{
		let refreshTimestr:string = egret.localStorage.getItem(LocalStorageEnum.BOX_REFRESH_TIMESPAN);
        if(refreshTimestr){
            let nowTime:number = new Date().getTime();
            if(nowTime >= parseInt(refreshTimestr)){
                //刷新
                egret.localStorage.setItem(LocalStorageEnum.BOX_REWARD_GET,"0");
                egret.localStorage.setItem(LocalStorageEnum.BOX_REFRESH_TIMESPAN,"0");
                egret.localStorage.setItem(LocalStorageEnum.BOX_REFRESH_TIMESPAN,GlobalFun.getBoxRfreshTimeSpan().toString());
            }
        }else{
            egret.localStorage.setItem(LocalStorageEnum.BOX_REFRESH_TIMESPAN,GlobalFun.getBoxRfreshTimeSpan().toString());
        }
	}
	public get gold():number{
		return GameApp.roleGold;
	}
	public set gold(value:number){
		GameApp.roleGold = value;
		egret.localStorage.setItem(LocalStorageEnum.ROLE_GOLD,value.toString())
	}
	public get gem():number{
		return GameApp.roleGem;
	}
	public set gem(value:number){
		GameApp.roleGem = value;
		egret.localStorage.setItem(LocalStorageEnum.ROLE_GEM,value.toString())
	}
	public postPerLoadProgress(itemsLoaded: number, itemsTotal: number): number[] {
		return [itemsLoaded, itemsTotal];
	}
}
MessageCenter.compile(GameApp);