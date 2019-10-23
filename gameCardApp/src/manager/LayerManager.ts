class LayerManager extends BaseClass{
	public static readonly MAP_LAYER:eui.UILayer = new eui.UILayer();

	public static readonly UNIT_LAYER:eui.UILayer = new eui.UILayer();

	public static readonly EFFECT_LAYER:eui.UILayer = new eui.UILayer();

	public static readonly UI_Main:eui.UILayer = new eui.UILayer();

	public static readonly UI_MAIN_NAV:eui.UILayer = new eui.UILayer();

	public static readonly UI_Pop:eui.UILayer = new eui.UILayer();

	public static readonly TIPS_LAYER:eui.UILayer = new eui.UILayer();
	

	public iniaizlize(p:egret.DisplayObjectContainer):void{
		p.addChild(LayerManager.MAP_LAYER);
		LayerManager.MAP_LAYER.name = "layer_map";
		LayerManager.MAP_LAYER.touchThrough = true;

		p.addChild(LayerManager.UNIT_LAYER);
		LayerManager.UNIT_LAYER.touchThrough = true;

		p.addChild(LayerManager.EFFECT_LAYER);
		LayerManager.EFFECT_LAYER.name = "layer_effect";
		LayerManager.EFFECT_LAYER.touchEnabled = true;
		p.addChild(LayerManager.UI_Main);
		LayerManager.UI_Main.name = "layer_main";
		LayerManager.UI_Main.touchThrough = true;

		p.addChild(LayerManager.UI_MAIN_NAV);
		LayerManager.UI_MAIN_NAV.touchThrough = true;

		p.addChild(LayerManager.UI_Pop);
		LayerManager.UI_Pop.name = "layer_pop";
		LayerManager.UI_Pop.touchThrough = true;

		p.addChild(LayerManager.TIPS_LAYER);
		LayerManager.TIPS_LAYER.touchThrough = true;
	}
	public static inst():LayerManager{
		let _inst:LayerManager = super.single<LayerManager>();
		return _inst
	}
}