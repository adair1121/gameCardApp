var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 方向工具
 */
var DirUtil = (function () {
    function DirUtil() {
    }
    /**
     * 通过2点，获取8方向值
     * p1 起始点
     * p2 结束点
     */
    DirUtil.get8DirBy2Point = function (p1, p2) {
        //计算方向
        var angle = MathUtils.getAngle(MathUtils.getRadian2(p1.x, p1.y, p2.x, p2.y));
        return this.angle2dir(angle);
    };
    /**
     * 通过2点，获取4方向值
     * p1 起始点
     * p2 结束点
     */
    DirUtil.get4DirBy2Point = function (p1, p2) {
        return p1.x < p2.x ? (p1.y < p2.y ? 3 : 1) : (p1.y < p2.y ? 5 : 7);
    };
    /** 方向转角度 */
    DirUtil.dir2angle = function (dir) {
        dir *= 45;
        dir -= 90;
        return dir;
    };
    /** 角度转方向 */
    DirUtil.angle2dir = function (angle) {
        if (angle < -90)
            angle += 360;
        return Math.round((angle + 90) / 45) % 8;
    };
    /** 反方向 */
    DirUtil.dirOpposit = function (dir) {
        // 7 == 3
        // 6 == 2
        // 5 == 1
        // 4 == 0
        return dir < 4 ? dir + 4 : dir - 4;
    };
    /** 8方向转5方向资源方向 */
    DirUtil.get5DirBy8Dir = function (dir8) {
        return dir8 - this.isScaleX(dir8);
    };
    /** 当前方向是否需要翻转 */
    DirUtil.isScaleX = function (dir8) {
        var td = 2 * (dir8 - 4);
        if (td < 0)
            td = 0;
        return td;
    };
    return DirUtil;
}());
__reflect(DirUtil.prototype, "DirUtil");
//# sourceMappingURL=DirUtil.js.map