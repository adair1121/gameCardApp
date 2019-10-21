var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RebornCfg = (function () {
    function RebornCfg() {
    }
    RebornCfg.cfg = [
        {
            cost: 10000,
            mid: 2,
        },
        {
            cost: 20000,
            mid: 3,
        },
        {
            cost: 30000,
            mid: 4,
        },
        {
            cost: 40000,
            mid: 5,
        },
        {
            cost: 50000,
            mid: 6,
        }
    ];
    return RebornCfg;
}());
__reflect(RebornCfg.prototype, "RebornCfg");
//# sourceMappingURL=RebornCfg.js.map