var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SkillCfg = (function () {
    function SkillCfg() {
    }
    SkillCfg.skillCfg = [
        { skillId: 100000, skillIcon: "skill_101_png", skillTitle: "skill_101_title_png" },
        { skillId: 100001, skillIcon: "skill_102_png", skillTitle: "skill_102_title_png" },
        { skillId: 100002, skillIcon: "skill_103_png", skillTitle: "skill_103_title_png" },
        { skillId: 100003, skillIcon: "skill_104_png", skillTitle: "skill_104_title_png" },
        { skillId: 100004, skillIcon: "skill_105_png", skillTitle: "skill_105_title_png" }
    ];
    return SkillCfg;
}());
__reflect(SkillCfg.prototype, "SkillCfg");
//# sourceMappingURL=SkillCfg.js.map