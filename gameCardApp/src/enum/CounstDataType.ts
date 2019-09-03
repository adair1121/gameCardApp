/**
 * 自定义数据类型 以及枚举
 */

interface XY{
	x:number,
	y:number
}
interface ItemData{
	res:string,
	num:number
}
interface LevelItemCfg{
	/**守将名字 */
	name:string,
	/**守将职业 */
	job:number,
	/**守将资源 */
	res:string,
	/**拥有兵种枚举值 */
	soldierEnum:number[],
	/**技能资源 */
	skillRes:string,
	/**战役名称 */
	campaigName:string,
	/**守将头像res */
	headIcon:string
	/**关卡 */
	level:number
}
class ActionState{
	public static readonly RUN:string = "run";

	public static readonly ATTACK:string = "attack";

	public static readonly DEAD:string = 'dead';

	public static readonly STAND:string = "stand";

	public static readonly HIT:string = "hit";
}
enum ActionEnum{
	run = 0,
	attack,
	dead,
	stand
}
enum EntityType{
	enemy = 0,
	energy
}
enum  DirectionEnum{
	TOP = 1,
	TR,
	RIGHT,
	RB,
	BOTTOM
}
enum SoldierType{
	/**枪兵 */
	SOLDIER_QIANG = 0,
	/**刀兵 */
	SOLDIER_DAO,
	/**骑兵 */
	SOLDIER_QI,
	/**弓箭手 */
	SOLDIER_GONG,
	/**投石车 */
	SOLDIER_TOUSHICHE,
}
