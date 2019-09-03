/**
 * Created by yangsong on 2014/11/24.
 * 显示对象工具类
 */
class DisplayUtils {

	private static openShake: boolean = true;

	public static setShakeOn($on: boolean) {
		this.openShake = $on;
	}

	/**
	 * 创建一个Bitmap
	 * @param resName resource.json中配置的name
	 * @returns {egret.Bitmap}
	 */
	public static createBitmap(resName: string): egret.Bitmap {
		let result: egret.Bitmap = new egret.Bitmap();
		let texture: egret.Texture = RES.getRes(resName);
		result.texture = texture;
		return result;
	}

	/**
	 * 创建一张Gui的图片
	 * @param resName
	 * @returns {egret.Bitmap}
	 */
	public static createEuiImage(resName: string): eui.Image {
		let result: eui.Image = new eui.Image();
		let texture: egret.Texture = RES.getRes(resName);
		result.source = texture;
		return result;
	}

	/**
	 * 从父级移除child
	 * @param child
	 */
	public static removeFromParent(child: egret.DisplayObject) {
		if (!child || child.parent == null)
			return;

		child.parent.removeChild(child);
	}

	private static shakingList = {};

	/**
	 * 震动指定的显示对象
	 * @param target 震动的对象
	 * @param range 震动幅度 单位像素
	 * @param duration 一组震动（四方向）持续的时间
	 * @param times 震动的次数 （4方向为一次）
	 * @param condition 条件 传入判断的方法 执行返回false则不执行震动
	 */
	public static shakeIt(target: egret.DisplayObject,
		range: number,
		duration: number,
		times: number = 1,
		condition: Function = () => {
			return true
		}) {
		if (!this.openShake || !target || times < 1 || !condition()) return;
		let shakeSet = [
			{ anchorOffsetX: 0, anchorOffsetY: -range },
			{ anchorOffsetX: 0, anchorOffsetY: +range },
			{ anchorOffsetX: 0, anchorOffsetY: 0 },
		];
		egret.Tween.removeTweens(target);
		let delay: number = duration / shakeSet.length;
		egret.Tween.get(target).to(
			shakeSet[0], delay
		).to(
			shakeSet[1], delay
			).to(
			shakeSet[2], delay
			).call(() => {
				DisplayUtils.shakeIt(target, range, duration, --times);
			}, this
			);
	}

	public static shakeItHeji(target: egret.DisplayObject,
		range: number,
		duration: number,
		times: number = 1,
		condition: Function = () => {
			return true
		}): void {
		if (!this.openShake || !target || times < 1 || !condition()) return;
		let shakeSet = [
			{ anchorOffsetX: +range * 0.1, anchorOffsetY: +range },
			{ anchorOffsetX: -range * 0.1, anchorOffsetY: -range },
			{ anchorOffsetX: +range * 0.1, anchorOffsetY: +range },
			{ anchorOffsetX: -range * 0.1, anchorOffsetY: -range },
			{ anchorOffsetX: (+range >> 1) * 0.1, anchorOffsetY: +range >> 1 },
			{ anchorOffsetX: (-range >> 1) * 0.1, anchorOffsetY: -range >> 1 },
			{ anchorOffsetX: (+range >> 2) * 0.1, anchorOffsetY: +range >> 2 },
			{ anchorOffsetX: 0, anchorOffsetY: 0 },
		];
		egret.Tween.removeTweens(target);
		let delay: number = duration / shakeSet.length;
		egret.Tween.get(target).to(
			shakeSet[0], delay
		).to(
			shakeSet[1], delay
			).to(
			shakeSet[2], delay
			).to(
			shakeSet[3], delay
			).to(
			shakeSet[4], delay
			).to(
			shakeSet[5], delay
			).to(
			shakeSet[6], delay
			).to(
			shakeSet[7], delay
			).call(() => {
				DisplayUtils.shakeIt(target, range, duration, --times);
			}, this
			);

	}

	static shakeItEntity(target: egret.DisplayObject,
		range: number,
		duration: number,
		times: number = 1,
		condition: Function = () => {
			return true
		}) {
		if (!this.openShake || !target || times < 1 || !condition()) return;

		let shakeSet = [
			{ anchorOffsetX: 0, anchorOffsetY: -range },
			{ anchorOffsetX: -range, anchorOffsetY: 0 },
			{ anchorOffsetX: range, anchorOffsetY: 0 },
			{ anchorOffsetX: 0, anchorOffsetY: range },
			{ anchorOffsetX: 0, anchorOffsetY: 0 },
		];
		egret.Tween.removeTweens(target);
		let delay: number = duration / 5;
		egret.Tween.get(target).to(
			shakeSet[0], delay
		).to(
			shakeSet[1], delay
			).to(
			shakeSet[2], delay
			).to(
			shakeSet[3], delay
			).to(
			shakeSet[4], delay
			).call(() => {
				this.shakeIt(target, range, duration, --times);
			}, this
			);
	}

	/**画扇形 */
	public static drawCir(shape: egret.Shape, radius: number, angle: number, anticlockwise?: boolean): egret.Shape {
		if (shape == null) {
			shape = new egret.Shape();
		}

		function changeGraphics(): void {
			shape.graphics.clear();

			shape.graphics.beginFill(0x00ffff, 1);
			shape.graphics.moveTo(0, 0);
			shape.graphics.lineTo(radius, 0);
			shape.graphics.drawArc(0, 0, radius, 0, angle * Math.PI / 180, anticlockwise);
			shape.graphics.lineTo(0, 0);
			shape.graphics.endFill();
		}

		changeGraphics();

		return shape;
	}

	/**画矩形 */
	public static drawrect(shape: egret.Shape, width: number, height: number, anticlockwise?: boolean): egret.Shape {
		if (shape == null) {
			shape = new egret.Shape();
		}

		function changeGraphics(): void {
			shape.graphics.clear();
			shape.graphics.beginFill(0x00ffff, 1);
			shape.graphics.drawRect(0, 0, width, height);
			shape.graphics.endFill();
		}

		changeGraphics();
		return shape;
	}

	/**
	 * 根据特效名返回特效路径
	 * @param effectName
	 * @returns {string}
	 */
	// public static getEffectPath(effectName: string): string {
	// 	return RES_DIR_EFF + effectName;
	// }
    /**滚动条滚动至底部 */
	public static scrollerToBottom(scroller: eui.Scroller): void {
		scroller.viewport.validateNow();
		if (scroller.viewport.contentHeight > scroller.height) {
			scroller.viewport.scrollV = scroller.viewport.contentHeight - scroller.height;
		}
	}
}
