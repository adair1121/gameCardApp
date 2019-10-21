/**
 * @author
 */
class GameApp extends BaseClass {
	
	public static pay_cbDdata:string;
	public static phurseState:boolean = false;
	
	public static roleGold:number = 0;
	public static roleGem:number = 0;
	public static rebornIds:number[]= [];
	public static level:number = 1;

	/**总波数 */;
	public static totalCount:number = 5;
	public constructor() {
		super();
	}
	public load() {
		eui.Label.default_fontFamily = "Microsoft YaHei";
		GlobalConfig.parserData();
		GameMap.init(RES.getRes("map_json"));
		LoadingUI.inst().hide();
		ViewManager.ins<ViewManager>().open(GameMainView);
		ViewManager.ins<ViewManager>().open(StartGameView);

		let goldstr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_GOLD);
		if(!goldstr){
			GameApp.roleGold = 1000;
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
			GameApp.rebornIds = [];
		}else{
			GameApp.rebornIds = JSON.parse(rebonidstr);
		}

		
		let levelstr:string = egret.localStorage.getItem(LocalStorageEnum.LEVEL);
		if(!levelstr){
			GameApp.level = 1;
		}else{
			GameApp.level = parseInt(levelstr);
		}
		eui.Binding.bindHandler(GameApp,["level"],this.levelChange,this);

	}
	private levelChange():void{
		egret.localStorage.setItem(LocalStorageEnum.LEVEL,GameApp.level.toString());
	}
	private onDataCallBack(value:string):void{
		if(value){
			GameApp.phurseState = false;
			GameApp.pay_cbDdata = "";
			UserTips.ins<UserTips>().showTips(`购买成功,获得元宝x${value}`);
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