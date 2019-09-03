class DebugUtils {
	/**
	 * 是否是调试模式
	 * @returns {boolean}
	 */
	public static get isDebug(): boolean {
		// return LocationProperty.gameId == 1;
		return true
	}

	public static log(msg: any, ...optionalParams: any[]): void {
		if (DebugUtils.isDebug) {
			egret.log(msg, ...optionalParams);
		}
	}

	public static warn(msg: any, ...optionalParams: any[]): void {
		if (DebugUtils.isDebug) {
			egret.warn(msg, ...optionalParams);
		}
	}

	public static error(msg: any, ...optionalParams: any[]): void {
		egret.error(msg, ...optionalParams);
	}
}

var debug = {
	log: DebugUtils.log,
	warn: DebugUtils.warn,
	error: DebugUtils.error
}
