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
var GameMainView = (function (_super) {
    __extends(GameMainView, _super);
    function GameMainView() {
        return _super.call(this) || this;
    }
    GameMainView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.settingBtn, this.onSetHandler, true);
        this.arraycollect = new eui.ArrayCollection();
        this.list.itemRenderer = SkilItem;
        this.list.dataProvider = this.arraycollect;
        this.scroller.viewport = this.list;
        var data = SkillCfg.skillCfg;
        this.arraycollect.source = data;
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        StageUtils.ins().getStage().addEventListener(StartGameEvent.CLICK_GUIDE_SKILL, this.onClickGuideSkill, this);
        StageUtils.ins().getStage().addEventListener(StartGameEvent.USE_GUIDE_SKILL, this.onUseGuideSkill, this);
    };
    /**点击了引导技能 */
    GameMainView.prototype.onClickGuideSkill = function (evt) {
        if (this.guideView) {
            var xx = (StageUtils.ins().getWidth() >> 1) + 100;
            var yy = StageUtils.ins().getHeight() >> 1;
            this.guideView.nextStep({ id: evt.data.id, comObj: { x: xx, y: yy }, width: 75, height: 75 });
        }
    };
    /**点击使用了技能-- 神将 */
    GameMainView.prototype.onUseGuideSkill = function (evt) {
        console.log("使用了技能-----" + evt.data.skillId + "----神将召唤");
    };
    GameMainView.prototype.onSetHandler = function () {
    };
    GameMainView.prototype.onItemTap = function (evt) {
        var skillId = evt.item.skillId;
        console.log("触发了技能----" + skillId);
    };
    GameMainView.prototype.initialize = function () {
        var _this = this;
        //初始化
        console.log("game---initialize");
        this.touchEnabled = false;
        this.showLevelTxt(function () {
            var guidepassStr = egret.localStorage.getItem(LocalStorageEnum.IS_PASS_GUIDE);
            _this.touchEnabled = true;
            if (guidepassStr) {
                //执行正常出怪的逻辑
            }
            else {
                //需要过一下新手 指引操作
                // egret.localStorage.setItem(LocalStorageEnum.IS_PASS_GUIDE,"1");
                ViewManager.ins().open(GuideView);
                var item = _this.list.getChildAt(2);
                _this.guideView = ViewManager.ins().getView(GuideView);
                _this.guideView.nextStep({ id: "1_1", comObj: item, width: 75, height: 75 });
            }
        });
    };
    /**展示关卡显示文字 */
    GameMainView.prototype.showLevelTxt = function (cb) {
        var txt = new eui.Label();
        this.addChild(txt);
        txt.size = 25;
        txt.fontFamily = "yt";
        var levelstr = egret.localStorage.getItem(LocalStorageEnum.LEVEL);
        var level = levelstr ? parseInt(levelstr) : 1;
        txt.textFlow = new egret.HtmlTextParser().parse("\u7B2C<font color=0x00ff00>" + level + "</font>\u5173");
        txt.x = (StageUtils.ins().getWidth() >> 1) - (txt.width >> 1) - 200;
        txt.y = (StageUtils.ins().getHeight() >> 1);
        txt.alpha = 0;
        txt.scaleX = txt.scaleY = 0;
        egret.Tween.get(txt).to({ alpha: 1, scaleX: 1, scaleY: 1, x: txt.x + 200 }, 1000, egret.Ease.circOut).wait(500).to({ alpha: 0, scaleX: 0, scaleY: 0, x: txt.x + 400 }, 1000, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(txt);
            txt.parent.removeChild(txt);
            cb();
        }, this);
    };
    GameMainView.prototype.close = function () {
        this.addTouchEvent(this.settingBtn, this.onSetHandler);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        StageUtils.ins().getStage().removeEventListener(StartGameEvent.CLICK_GUIDE_SKILL, this.onClickGuideSkill, this);
        StageUtils.ins().getStage().removeEventListener(StartGameEvent.USE_GUIDE_SKILL, this.onUseGuideSkill, this);
    };
    return GameMainView;
}(BaseEuiView));
__reflect(GameMainView.prototype, "GameMainView");
ViewManager.ins().reg(GameMainView, LayerManager.UI_Main);
//# sourceMappingURL=GameMainView.js.map