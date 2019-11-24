/**
 * 自定义数据类型 以及枚举
 */

interface XY{
	x:number,
	y:number
}
class ActionState{
	public static readonly RUN:string = "run";

	public static readonly ATTACK:string = "attack";

	public static readonly DEAD:string = 'dead';

	public static readonly STAND:string = "stand";

	public static readonly HIT:string = "hit";
}

enum SoldierShapType{
	TYPE_RECT,
	TYPE_CIRCLE,
	TYPE_HALFCIRCLE,
	// TYPE_LINGXING,
	TYPE_TRIANGLE,
	TYPE_TIXING,
	// TYPE_ARROW,
	TYPE_CROSS,
}

