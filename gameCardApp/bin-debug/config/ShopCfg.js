var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ShopCfg = (function () {
    function ShopCfg() {
    }
    /**索引为 0时金币商城配置 。1为钻石商城配置*/
    ShopCfg.shopCfg = [
        [
            {
                cost: 6,
                costNum: 600,
                shopId: "0_1",
                desc: "购买可获得600金币",
                icon_title: "gold_font_1_png",
                icon: "goldIcon_1_png",
            },
            {
                cost: 30,
                costNum: 3000,
                shopId: "0_2",
                desc: "购买可获得3000金币",
                icon_title: "gold_font_2_png",
                icon: "goldIcon_2_png",
            },
            {
                cost: 68,
                costNum: 6800,
                shopId: "0_3",
                desc: "购买可获得6800金币",
                icon_title: "gold_font_3_png",
                icon: "goldIcon_3_png",
            },
            {
                cost: 128,
                costNum: 12800,
                shopId: "0_4",
                desc: "购买可获得12800金币",
                icon_title: "gold_font_4_png",
                icon: "goldIcon_4_png",
            },
            {
                cost: 328,
                costNum: 32800,
                shopId: "0_5",
                desc: "购买可获得32800金币",
                icon_title: "gold_font_5_png",
                icon: "goldIcon_5_png",
            }
        ]
    ];
    return ShopCfg;
}());
__reflect(ShopCfg.prototype, "ShopCfg");
//# sourceMappingURL=ShopCfg.js.map