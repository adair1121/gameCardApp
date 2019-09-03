/**
 * 方向工具
 */
class DirUtil {

	/**
	 * 通过2点，获取8方向值
	 * p1 起始点
	 * p2 结束点
	 */
	public static get8DirBy2Point(p1: any, p2: any): number {
		//计算方向
		let angle: number = MathUtils.getAngle(MathUtils.getRadian2(p1.x, p1.y, p2.x, p2.y));
		return this.angle2dir(angle);
	}

	/**
	 * 通过2点，获取4方向值
	 * p1 起始点
	 * p2 结束点
	 */
	public static get4DirBy2Point(p1: any, p2: any): number {
		return p1.x < p2.x ? (p1.y < p2.y ? 3 : 1) : (p1.y < p2.y ? 5 : 7);
	}

	/** 方向转角度 */
	public static dir2angle(dir: number): number {
		dir *= 45;
		dir -= 90;
		return dir;
	}

	/** 角度转方向 */
	public static angle2dir(angle: number): number {
		if (angle < -90)
			angle += 360;
		return Math.round((angle + 90) / 45) % 8;
	}

	/** 反方向 */
	public static dirOpposit(dir: number): number {
		// 7 == 3
		// 6 == 2
		// 5 == 1
		// 4 == 0
		return dir < 4 ? dir + 4 : dir - 4;
	}

	/** 8方向转5方向资源方向 */
	public static get5DirBy8Dir(dir8: number): number {
		return dir8 - this.isScaleX(dir8);
	}

	/** 当前方向是否需要翻转 */
	public static isScaleX(dir8: number): number {
		let td: number = 2 * (dir8 - 4);
		if (td < 0) td = 0;
		return td;
	}

	/** 获取方向格子坐标后几格的坐标 */
	// public static getGridByDir(dir: number, pos: number = 1, p: { x: number, y: number } = {
	// 	x: 0,
	// 	y: 0
	// }): { x: number, y: number } {
	// 	let angle: number = this.dir2angle(this.dirOpposit(dir));
	// 	return MathUtils.getDirMove(angle, pos * GameMap.CELL_SIZE, p.x, p.y);
	// }
}