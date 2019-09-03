/**
 * 游戏地图
 * @author
 */
class MapView extends BaseClass {

    private _stepIndex: any;


    /**地图背景 */
    private _mapImage: MapViewBg;

    ///////////////////////////////对象层////////////////////////////////////

    /**建筑物对象层 */
    private _itemLayer: egret.DisplayObjectContainer;

    private _shapeContainer:egret.DisplayObjectContainer;

    private _offestX:number;
    private _offestY:number;
    private _offestGridPos:XY;
    private _hero:HeroEntity;
    private initia:boolean = false;
    // private _transMc:MovieClip;
    // private _npcWoodGroup:eui.Group;
    // private _npc_wood:eui.Image;
    // private _npcWoodTitle:eui.Image;
    public constructor() {
        super();
    }

    public initMap(): void {
        if(this.initia){return}
        this.initia = true;
        this._mapImage = new MapViewBg();
        LayerManager.MAP_LAYER.addChild(this._mapImage);

        this._itemLayer = new egret.DisplayObjectContainer();
        LayerManager.MAP_LAYER.addChild(this._itemLayer);

        // this._npcWoodGroup = new eui.Group();
        // LayerManager.MAP_LAYER.addChild(this._npcWoodGroup);
        // this._npcWoodGroup.x = 1157;
        // this._npcWoodGroup.y = 154;

        // this._npc_wood = new eui.Image();
        // this._npc_wood.source = "npc_wood_png"
        // this._npcWoodGroup.addChild(this._npc_wood);

        // this._npcWoodTitle = new eui.Image();
        // this._npcWoodGroup.addChild(this._npcWoodTitle);
        // this._npcWoodTitle.source = "npc_wood_title_png";
        // this._npcWoodTitle.horizontalCenter = 0;
        // this._npcWoodTitle.verticalCenter = -35;


        // this._transMc = new MovieClip();
        // LayerManager.MAP_LAYER.addChild(this._transMc);
        // this._transMc.playFile(`${EFFECT}trans`,-1);
        // this._transMc.x = 2553;
        // this._transMc.y = 600;
        // this.drawTestGrid();
    }
    /**清除item */
    public clearItem():void{
        this._itemLayer.removeChildren();
    }
    /**开启新手收集过程 mapview中随机添加一些物品 返回区域格子*/
    public addToMapLayer(obj:{res:string,x:number,y:number,w:number,h:number,itemName:string,resType:number}):XY[]{
        let collectItem:CollectItem = new CollectItem();
        collectItem.Cfg = obj;
        this._itemLayer.addChild(collectItem);
        return collectItem.area
    }   
    private globP:egret.Point;
    /**刷新地图视口 */
    public refrehMapViewPort(offestX:number = 0,offestY:number = 0):void{
        this._offestX = offestX>>0;
        this._offestY = offestY>>0;
        this._offestGridPos = GameMap.point2Grid(offestX,offestY);
        let hero:HeroEntity = EntityManager.ins<EntityManager>().getEntity<HeroEntity>(GameApp.ins<GameApp>().role_insId);
        this._hero = hero;
        let speedX = hero.x + (offestX>>0);
        let speedY = hero.y + (offestY>>0);
        hero.x = speedX;
        hero.y = speedY;
        this.globP = hero.parent.localToGlobal(hero.x,hero.y);
        // let centerXDis:number = Math.abs(globalP.x - (StageUtils.ins<StageUtils>().getWidth()>>1));
        // let centerYDis:number = Math.abs(globalP.y - (StageUtils.ins<StageUtils>().getHeight()>>1));
        if(!this.juageIfInXBorder()){
            this.judageMapImgX();
        }
        if(!this.juageIfInYBorder()){
             this.judageMapImgY();
        }
       if(this._hero.x < (this._hero.width>>1)){
            this._hero.x = (this._hero.width>>1);
        }
        if(this._hero.x > GameMap.MAX_WIDTH - this._hero.width){
            this._hero.x = GameMap.MAX_WIDTH - this._hero.width;
        }
        if(this._hero.y < (this._hero.height>>1)){
            this._hero.y = (this._hero.height>>1);
        }
        if(this._hero.y > GameMap.MAX_HEIGHT - this._hero.height){
            this._hero.y = GameMap.MAX_HEIGHT - this._hero.height;
        }
        this.hitItem(hero.x,hero.y);
    }
     //item层 位置检测 。处于人物周围的物品被收取
    private hitItem(x,y):void{
        let heroP:egret.Point = LayerManager.MAP_LAYER.localToGlobal(x,y);
        for(let i:number = 0;i<this._itemLayer.numChildren;i++){
            let item:CollectItem = this._itemLayer.getChildAt(i) as CollectItem;
            let p:egret.Point = this._itemLayer.localToGlobal(item.x,item.y);
            let disX:number = Math.abs(heroP.x - p.x);
            let disY:number = Math.abs(heroP.y - p.y);
            if(disX <= 80 && disY <= 80 && !item.hitState){
                if(item.Cfg.resType){
                    //触发答题宝箱
                    // item.parent.removeChild(item);
                    item.hitState = true;
                    let timeout = setTimeout(function() {
                        clearTimeout(timeout);
                        if(item){
                            item.hitState = false;
                        }
                    }, 5000);
                    StageUtils.ins<StageUtils>().getStage().dispatchEvent(new StartGameEvent(StartGameEvent.VJ_END));
                    ViewManager.ins<ViewManager>().open(AnswerPopUp,[{isWild:1,cb:()=>{
                        StageUtils.ins<StageUtils>().getStage().dispatchEvent(new StartGameEvent(StartGameEvent.REMOVE_ITEM,{area:item.area}));
                        item.parent.removeChild(item);
                    },arg:this}])
                }else{
                    egret.Tween.get(item).to({alpha:0},200,egret.Ease.circIn).call(()=>{
                        StageUtils.ins<StageUtils>().getStage().dispatchEvent(new StartGameEvent(StartGameEvent.REMOVE_ITEM,{area:item.area}));
                        egret.Tween.removeTweens(item);
                        item.parent.removeChild(item);
                        this.refreshGoods(item.Cfg.res,item.Cfg.itemName);
                    },this)
                }
               
            }
        }
    }
    public refreshGoods(key:string,name:string,minValue:number = 4,offestValue:number=5):number{
        let goodsStr:string = egret.localStorage.getItem(LocalStorageEnum.GOODS);
        let randomNum:number = (Math.random()*minValue+offestValue)>>0;
        if(goodsStr){
            let obj:any = JSON.parse(goodsStr);
            if(obj[key]){
                obj[key] += randomNum;
            }else{
                obj[key] = randomNum;
            }
            egret.localStorage.setItem(LocalStorageEnum.GOODS,JSON.stringify(obj));
        }else{
            let obj:any = {};
            obj[key] = randomNum;
            egret.localStorage.setItem(LocalStorageEnum.GOODS,JSON.stringify(obj))
        }
        UserTips.ins<UserTips>().showTips(`获得${name}+`+randomNum);
        let ownNum:string = egret.localStorage.getItem(LocalStorageEnum.GOODS_NUM);
        let num:number = ownNum?(parseInt(ownNum)+randomNum):randomNum;
        egret.localStorage.setItem(LocalStorageEnum.GOODS_NUM,num.toString());
        return randomNum;
    }
    //判断是否在X边界
    private juageIfInXBorder():boolean{
        return (this._hero.x <= StageUtils.ins<StageUtils>().getWidth()>>1) || (this._hero.x >= (GameMap.MAX_WIDTH - (StageUtils.ins<StageUtils>().getWidth()>>1)))
    }
    //判断是否在X边界
    private juageIfInYBorder():boolean{
        return (this._hero.y <= StageUtils.ins<StageUtils>().getHeight()>>1) || (this._hero.y >= (GameMap.MAX_HEIGHT - (StageUtils.ins<StageUtils>().getHeight()>>1)))
    }
    //判断地图x边界移动处理
    private judageMapImgX():void{
        LayerManager.MAP_LAYER.x -= this._offestX;
        if(LayerManager.MAP_LAYER.x < -(GameMap.MAX_WIDTH - StageUtils.ins<StageUtils>().getWidth())){
            LayerManager.MAP_LAYER.x  = -(GameMap.MAX_WIDTH - StageUtils.ins<StageUtils>().getWidth());
        }
        if(LayerManager.MAP_LAYER.x > 0){
            LayerManager.MAP_LAYER.x = 0;
        }
        
    }
    //判断地图y边界移动处理
    private judageMapImgY():void{
        LayerManager.MAP_LAYER.y -= this._offestY;
        if(LayerManager.MAP_LAYER.y < -(GameMap.MAX_HEIGHT - StageUtils.ins<StageUtils>().getHeight())){
            LayerManager.MAP_LAYER.y = -(GameMap.MAX_HEIGHT - StageUtils.ins<StageUtils>().getHeight());
        }
        if(LayerManager.MAP_LAYER.y > 0){
           LayerManager.MAP_LAYER.y = 0;
        }
        
    }
    private drawTestGrid():void{
       
        this._shapeContainer = new egret.DisplayObjectContainer();
        this._shapeContainer.cacheAsBitmap = true;
        this._shapeContainer.touchEnabled = false;
        this._shapeContainer.touchChildren = false;
        
        let maxX: number = GameMap.COL;
        let maxY: number = GameMap.ROW;
        for (let i: number = 0; i < maxY; i++) {
            for (let j: number = 0; j < maxX; j++) {
                if (!GameMap.walkable(i, j)){
                    let rect: egret.Shape = new egret.Shape();
                    rect.graphics.clear();
                    rect.graphics.lineStyle(0.1);
                    rect.graphics.beginFill(0xff0000, 0.3);
                    rect.graphics.drawRect(i * GameMap.CELL_SIZE, j * GameMap.CELL_SIZE, GameMap.CELL_SIZE, GameMap.CELL_SIZE);
                    rect.graphics.endFill();

                    let text: eui.Label = new eui.Label();
                    text.size = 12;
                    text.text = `${i},${j}`;
                    text.x = i * GameMap.CELL_SIZE;
                    text.y = j * GameMap.CELL_SIZE;
                    this._shapeContainer.addChild(rect)
                    this._shapeContainer.addChild(text);
                }
            }
        }
        LayerManager.MAP_LAYER.addChild(this._shapeContainer);
    }
}

