var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SkillCfg = (function () {
    function SkillCfg() {
    }
    SkillCfg.skillCfg = [
        { skillId: 101, skillIcon: "skill_101_png", skillTitle: "skill_101_title_png", desc: "连续点击怪物攻击", cd: 12, time: 3 },
        { skillId: 102, skillIcon: "skill_102_png", skillTitle: "skill_102_title_png", desc: "按住屏幕划动", cd: 12, time: 3 },
        { skillId: 103, skillIcon: "skill_103_png", skillTitle: "skill_103_title_png", desc: "点击战场召唤", cd: 12, time: 0, num: 10 },
        { skillId: 104, skillIcon: "skill_104_png", skillTitle: "skill_104_title_png", desc: "选择攻击区域", cd: 12, time: 0 },
        { skillId: 105, skillIcon: "skill_105_png", skillTitle: "skill_105_title_png", desc: "刷新技能cd", cd: 0, time: 0 }
    ];
    return SkillCfg;
}());
__reflect(SkillCfg.prototype, "SkillCfg");
//# sourceMappingURL=SkillCfg.js.map