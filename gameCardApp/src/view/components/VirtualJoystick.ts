/**
 * 虚拟摇杆
 * @author chenkai
 * @since 2017/5/4
 */
class VirtualJoystick extends eui.Component{
	private ball:eui.Image;          //圆环
	private circle:eui.Image;        //小球
	private circleRadius:number = 0; //圆环半径
	private ballRadius:number = 0;   //小球半径
	private centerX:number = 0;      //中心点坐标
	private centerY:number = 0;
	private touchID:number;          //触摸ID
	public constructor() {
		super();
		this.skinName = "VirtualJoystickSkin";
	}

	public childrenCreated(){
		//获取圆环和小球半径
		this.circle.width = this.circle.height = 141;
		this.ball.width = this.ball.height = 42;
		this.circleRadius = this.circle.height/2;
		this.ballRadius = this.ball.height/2;
		//获取中心点
		this.centerX = this.circleRadius;
		this.centerY = this.circleRadius;
		//设置锚点
		this.ball.anchorOffsetX = this.ballRadius;
		this.ball.anchorOffsetY = this.ballRadius;
		//设置小球初始位置
		this.ball.x = this.centerX;
		this.ball.y = this.centerY;
	}

	//启动虚拟摇杆 
	public start(){
		this.ball.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		StageUtils.ins<StageUtils>().getStage().addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		StageUtils.ins<StageUtils>().getStage().addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
	}

	//停止虚拟摇杆
	public stop(){
		this.ball.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		StageUtils.ins<StageUtils>().getStage().removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		StageUtils.ins<StageUtils>().getStage().removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
	}

	//触摸开始，显示虚拟摇杆
	private onTouchBegin(e:egret.TouchEvent){
		// if(this.parent){
		// 	return;
		// }
		this.touchID = e.touchPointID;
		this.x = e.stageX;
		this.y = e.stageY;
		this.ball.x = this.centerX;
		this.ball.y = this.centerY;
		// GameConst.stage.addChild(this);

		this.dispatchEvent(new VJEvent(VJEvent.VJ_START));
	}

	//触摸结束，隐藏虚拟摇杆
	private onTouchEnd(e:egret.TouchEvent){
		if(this.touchID != e.touchPointID){
			return;
		}
		this.touchID = null;
		this.ball.x = this.centerX;
		this.ball.y = this.centerY;
		// this.hide();
		this.dispatchEvent(new VJEvent(VJEvent.VJ_END));
	}
	//触摸移动，设置小球的位置
	private p1:egret.Point = new egret.Point();
	private p2:egret.Point = new egret.Point();
	private onTouchMove(e:egret.TouchEvent){
		if(this.touchID != e.touchPointID){
			return;
		}
		let stageP:egret.Point = this.localToGlobal(this.centerX,this.centerY);
		//获取手指和虚拟摇杆的距离
		// this.p1.x = this.x;
		// this.p1.y = this.y;
		this.p2.x = e.stageX;
		this.p2.y = e.stageY;
		var dist = egret.Point.distance(stageP, this.p2);
		var angle:number = Math.atan2(e.stageY - stageP.y, e.stageX - stageP.x)
		//手指距离在圆环范围内
		if(dist <= (this.circleRadius - this.ballRadius)){
			let point:egret.Point = this.globalToLocal(e.stageX,e.stageY);
			// this.ball.x = this.centerX + e.stageX - this.x;
			// this.ball.y = this.centerY + e.stageY - this.y;
			this.ball.x = point.x
			this.ball.y = point.y
		//手指距离在圆环范围外
		}else{
			this.ball.x = Math.cos(angle)*(this.circleRadius - this.ballRadius) + this.centerX;
			this.ball.y = Math.sin(angle)*(this.circleRadius - this.ballRadius) + this.centerY;
		}
		//派发事件
		this.dispatchEvent(new VJEvent(VJEvent.VJ_MOVE,false,angle))
	}

	private hide(){
		this.parent && this.parent.removeChild(this);
	}
}
namespace VJ_EVENT{
	
}