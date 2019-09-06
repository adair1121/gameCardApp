var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuideCfg = (function () {
    function GuideCfg() {
    }
    GuideCfg.guidecfg = {
        "1_1": { "event": StartGameEvent.CLICK_GUIDE_SKILL, next: "1_2", param: { id: "1_2" } },
        "1_2": { "event": StartGameEvent.USE_GUIDE_SKILL, next: "", param: { skillId: 100002 } },
    };
    return GuideCfg;
}());
__reflect(GuideCfg.prototype, "GuideCfg");
//# sourceMappingURL=GuideCfg.js.map