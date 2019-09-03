/**
 * 网格类
 * @author chenkai
 * @since 2017/11/3
 */
namespace astar{
	export  class Grid {
		private _startNode:Node;    //起点
		private _endNode:Node;      //终点
		private _nodes:Array<any>;  //Node数组
		private _numCols:number;    //网格行列
		private _numRows:number;

		public constructor(numCols:number, numRows:number) {
			//形成格子区域
			this._numCols = numCols;
			this._numRows = numRows;
			this._nodes = [];

			for(let i:number=0;i<numCols;i++){
				this._nodes[i] = [];
				for(let j:number=0;j<numRows;j++){
					this._nodes[i][j] = new Node(i,j);
				}
			}
		}

		public getNode(x:number , y:number):Node{
			return this._nodes[x][y];
		}

		public setEndNode(x:number, y:number){
			this._endNode = this._nodes[x][y];
		}

		public setStartNode(x:number, y:number){
			this._startNode = this._nodes[x][y];
		}

		public setWalkable(x:number, y:number, value:boolean){
			this._nodes[x][y].walkable = value;
		}

		public get endNode(){
			return this._endNode;
		}

		public get numCols(){
			return this._numCols;
		}

		public get numRows(){
			return this._numRows;
		}

		public get startNode(){
			return this._startNode;
		}
	}
}
