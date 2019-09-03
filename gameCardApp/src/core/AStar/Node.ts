/**
 * Node 节点
 * @author chenkai
 * @since 2017/11/3
 */
namespace astar{
	export class Node {
		public x:number;    //列
		public y:number;    //行
		public f:number;    //代价 f = g+h
		public g:number;    //起点到当前点代价
		public h:number;    //当前点到终点估计代价
		public walkable:boolean = true;
		public parent:Node;
		public costMultiplier:number = 1.0;
	
		public constructor(x:number , y:number) {
			this.x = x;
			this.y = y;
		}
	}
}
