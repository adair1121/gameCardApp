/**
 * Created by Saco on 2015/10/26.
 */
class TextFlowMaker {
	private static STYLE_COLOR: string = "C";
	private static STYLE_SIZE: string = "S";
	private static PROP_TEXT: string = "T";
	private static UNDERLINE_TEXT: string = "U";
	private static EVENT: string = "E";
	private static numberList: string[] = ["Zero", 'One', 'Two', 'Three', 'Fout', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 
	'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen','Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen','Twenty'];

	public  constructor() {
		
	}

	/**
	 * "你好|S:18&C:0xffff00&T:带颜色字号|S:50&T:大号字体|C:0x0000ff&T:带色字体";
	 * |U: 下划线
	 * 注意：请保证正确的HTML字符串输入，若无法保证（如拼合字符串包含玩家的输入）建议使用函数generateTextFlow1
	 * @param sourceText
	 * @returns {Array}
	 */
	public static generateTextFlow(sourceText: string): egret.ITextElement[] {
		if (!sourceText) {
			return new egret.HtmlTextParser().parser("");
		}
		let textArr = sourceText.split("|");
		let str: string = "";
		let result: egret.ITextElement[];
		for (let i = 0, len = textArr.length; i < len; i++) {
			str += TextFlowMaker.getSingleTextFlow1(textArr[i]);
		}
		try {
			result = new egret.HtmlTextParser().parser(str);
		} catch (e) {
			debug.log("错误的HTML输入");
			return new egret.HtmlTextParser().parser("");
		}
		return result;
	}

	/**
	 * "你好|S:18&C:0xffff00&T:带颜色字号|S:50&T:大号字体|C:0x0000ff&T:带色字体|E:{str:string}&T:事件";
	 * 注意：没有处理HTML标签
	 * @param sourceText
	 * @returns {Array}
	 */
	public static generateTextFlow1(sourceText: string): egret.ITextElement[] {
		if (!sourceText) {
			return new egret.HtmlTextParser().parser("");
		}
		let textArr = sourceText.split("|");
		let result = [];
		for (let i = 0, len = textArr.length; i < len; i++) {
			let ele = TextFlowMaker.getSingleTextFlow(textArr[i]);
			if (ele.text && ele.text != "")
				result.push(ele);
		}
		return result;
	}
	public static getOnlyName(sourceText: string):string{
		if (!sourceText) {
			return ""
		}
		let index = sourceText.indexOf("<font");
		let str = sourceText;
		if(index != -1){
			str = sourceText.slice(0,index);
		}
		return str
	}

	private static getSingleTextFlow1(text: string): string {
		let arrText = text.split("&T:", 2);
		if (arrText.length == 2) {
			let str: string = "<font";
			let textArr = arrText[0].split("&");
			let tempArr: string[];
			let t: string;
			let underline: boolean = false;
			for (let i = 0, len = textArr.length; i < len; i++) {
				tempArr = textArr[i].split(":");
				switch (tempArr[0]) {
					case TextFlowMaker.STYLE_SIZE:
						str += ` size="${Math.floor(+tempArr[1])}"`;
						break;
					case TextFlowMaker.STYLE_COLOR:
						str += ` color="${Math.floor(+tempArr[1])}"`;
						break;
					case TextFlowMaker.UNDERLINE_TEXT:
						underline = true;
						break;
				}
			}
			if (underline) {
				str += `><u>${arrText[1]}</u></font>`;
			} else {
				str += `>${arrText[1]}</font>`;
			}
			return str;
		} else {
			return '<font>' + text + '</font>';
		}
	}


	private static getSingleTextFlow(text: string): egret.ITextElement {
		let arrText = text.split("&T:", 2);
		let textFlow: any = { "style": {} };
		if (arrText.length == 2) {
			let style = arrText[0];
			let textArr = text.split("&");
			let tempArr;

			for (let i = 0, len = textArr.length; i < len; i++) {
				tempArr = textArr[i].split(":");
				switch (tempArr[0]) {
					case TextFlowMaker.STYLE_SIZE:
						textFlow.style.size = +(tempArr[1]);
						break;
					case TextFlowMaker.STYLE_COLOR:
						textFlow.style.textColor = +(tempArr[1]);
						break;
					case TextFlowMaker.UNDERLINE_TEXT:
						textFlow.style.underline = true;
						break;
					case TextFlowMaker.EVENT:
						textFlow.style.href = "event:" + tempArr[1];
						break;
				}
			}
			textFlow.text = arrText[1];
		} else {
			textFlow.text = text;
		}
		return textFlow;
	}

	/**
	 * 获取中文数字,目前只支持1-9
	 *
	 */
	public static getCStr(num: number): string {
		if (TextFlowMaker.numberList[num]) {
			return TextFlowMaker.numberList[num]
		} else {
			return "";
		}
	}
}