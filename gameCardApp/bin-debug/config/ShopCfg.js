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
                cost: 1,
                costNum: 10,
                shopId: "0_1",
                desc: "购买可获得少量金币",
                icon_title: "gold_font_1_png",
                icon: "goldIcon_1_png",
            },
            {
                cost: 10,
                costNum: 100,
                shopId: "0_2",
                desc: "购买可获得大量金币",
                icon_title: "gold_font_2_png",
                icon: "goldIcon_2_png",
            },
            {
                cost: 20,
                costNum: 200,
                shopId: "0_3",
                desc: "购买可获得小堆金币",
                icon_title: "gold_font_3_png",
                icon: "goldIcon_3_png",
            },
            {
                cost: 50,
                costNum: 500,
                shopId: "0_4",
                desc: "购买可获得大堆金币",
                icon_title: "gold_font_4_png",
                icon: "goldIcon_4_png",
            }
        ],
        [
            {
                cost: 1,
                costNum: 10,
                shopId: "1_1",
                desc: "购买可获得少量钻石",
                icon_title: "gem_font_1_png",
                icon: "gemIcon_1_png",
            },
            {
                cost: 10,
                costNum: 100,
                shopId: "0_2",
                desc: "购买可获得大量钻石",
                icon_title: "gem_font_2_png",
                icon: "gemIcon_2_png",
            },
            {
                cost: 20,
                costNum: 200,
                shopId: "0_3",
                desc: "购买可获得小堆钻石",
                icon_title: "gem_font_3_png",
                icon: "gemIcon_3_png",
            },
            {
                cost: 50,
                costNum: 500,
                shopId: "0_4",
                desc: "购买可获得大堆钻石",
                icon_title: "gem_font_4_png",
                icon: "gemIcon_4_png",
            }
        ]
    ];
    return ShopCfg;
}());
__reflect(ShopCfg.prototype, "ShopCfg");
//# sourceMappingURL=ShopCfg.js.map