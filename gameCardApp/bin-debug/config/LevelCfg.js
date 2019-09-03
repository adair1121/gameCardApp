var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 关卡配置
 */
var LevelCfg = (function () {
    function LevelCfg() {
    }
    LevelCfg.levelCfg = [
        {
            name: "张纯",
            job: 3,
            res: "level_1_idle",
            soldierEnum: [SoldierType.SOLDIER_QIANG, SoldierType.SOLDIER_DAO, SoldierType.SOLDIER_QI],
            skillRes: "",
            campaigName: "battle_title_1_png",
            headIcon: "level_1_head_png",
            level: 1
        },
        {
            name: "管亥",
            job: 4,
            res: "level_2_idle",
            soldierEnum: [SoldierType.SOLDIER_QIANG, SoldierType.SOLDIER_DAO, SoldierType.SOLDIER_QI, SoldierType.SOLDIER_QIANG],
            skillRes: "",
            campaigName: "battle_title_2_png",
            headIcon: "level_2_head_png",
            level: 2
        },
        {
            name: "曹操",
            job: 5,
            res: "level_3_idle",
            soldierEnum: [SoldierType.SOLDIER_QIANG, SoldierType.SOLDIER_DAO, SoldierType.SOLDIER_QI, SoldierType.SOLDIER_DAO, SoldierType.SOLDIER_QI],
            skillRes: "",
            campaigName: "battle_title_3_png",
            headIcon: "level_3_head_png",
            level: 3
        },
        {
            name: "张纯",
            job: 3,
            res: "level_1_idle",
            soldierEnum: [SoldierType.SOLDIER_QIANG, SoldierType.SOLDIER_DAO, SoldierType.SOLDIER_QI],
            skillRes: "",
            campaigName: "battle_title_1_png",
            headIcon: "level_1_head_png",
            level: 4
        },
        {
            name: "管亥",
            job: 4,
            res: "level_2_idle",
            soldierEnum: [SoldierType.SOLDIER_QIANG, SoldierType.SOLDIER_DAO, SoldierType.SOLDIER_QI, SoldierType.SOLDIER_QIANG],
            skillRes: "",
            campaigName: "battle_title_2_png",
            headIcon: "level_2_head_png",
            level: 5
        },
        {
            name: "曹操",
            job: 5,
            res: "level_3_idle",
            soldierEnum: [SoldierType.SOLDIER_QIANG, SoldierType.SOLDIER_DAO, SoldierType.SOLDIER_QI, SoldierType.SOLDIER_DAO, SoldierType.SOLDIER_QI],
            skillRes: "",
            campaigName: "battle_title_3_png",
            headIcon: "level_3_head_png",
            level: 6
        },
        {
            name: "张纯",
            job: 3,
            res: "level_1_idle",
            soldierEnum: [SoldierType.SOLDIER_QIANG, SoldierType.SOLDIER_DAO, SoldierType.SOLDIER_QI],
            skillRes: "",
            campaigName: "battle_title_1_png",
            headIcon: "level_1_head_png",
            level: 7
        },
        {
            name: "管亥",
            job: 4,
            res: "level_2_idle",
            soldierEnum: [SoldierType.SOLDIER_QIANG, SoldierType.SOLDIER_DAO, SoldierType.SOLDIER_QI, SoldierType.SOLDIER_QIANG],
            skillRes: "",
            campaigName: "battle_title_2_png",
            headIcon: "level_2_head_png",
            level: 8
        }
    ];
    return LevelCfg;
}());
__reflect(LevelCfg.prototype, "LevelCfg");
//# sourceMappingURL=LevelCfg.js.map