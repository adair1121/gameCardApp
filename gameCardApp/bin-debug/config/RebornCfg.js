var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RebornCfg = (function () {
    function RebornCfg() {
    }
    RebornCfg.cfg = [
        {
            cost: 0,
            mid: 1,
            name: "神将",
            level: 1,
            atktype: 1,
            atkDis: 50,
            type: 1,
            spd: 100,
            atk: 50,
            hp: 500,
            id: 4,
            skillId: 0,
            model: "skill_103_1",
            skillType: 1,
            atkspd: 6,
            desc: "神将"
        },
        {
            cost: 1500,
            mid: 2,
            name: "剑圣",
            level: 1,
            rmodel: 1,
            atktype: 1,
            atkDis: 50,
            type: 1,
            spd: 100,
            atk: 50,
            hp: 500,
            id: 4,
            skillId: 0,
            model: "skill_103_2",
            skillType: 1,
            atkspd: 6,
            desc: "攻速暴增200%"
        },
        {
            cost: 2000,
            mid: 3,
            name: "天尊",
            level: 1,
            atktype: 1,
            atkDis: 50,
            rmodel: 3,
            type: 1,
            spd: 100,
            atk: 50,
            hp: 500,
            id: 4,
            skillId: 0,
            model: "skill_103_3",
            skillType: 1,
            atkspd: 6,
            desc: "全属性增加1倍"
        },
        {
            cost: 2500,
            mid: 4,
            name: "法神",
            level: 1,
            atktype: 1,
            atkDis: 200,
            rmodel: 2,
            type: 1,
            spd: 100,
            atk: 50,
            hp: 500,
            id: 4,
            skillId: 0,
            model: "skill_103_4",
            skillType: 1,
            atkspd: 6,
            desc: "攻击力增幅4倍"
        },
    ];
    return RebornCfg;
}());
__reflect(RebornCfg.prototype, "RebornCfg");
//# sourceMappingURL=RebornCfg.js.map