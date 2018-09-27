class StringUtil {
	public constructor() {
	}

	/**
	 * 带文本替换功能的字符串：返回富文本
	 * @param StrID
	 * @param valArr
	 * @return 
	 */
	public static getSwfLangTextFlowVar(StrID: string, valArr: string[]): egret.ITextElement[] {
		return new egret.HtmlTextParser().parser(StringUtil.getSwfLangStrVar(StrID, valArr));
	}

	public static getSwfLangStrVarByID(StrID: string, valArr: string[]): string {
		if (DataBase.strings == null) {
			return StrID;
		}
		var data: any = DataBase.strings[StrID];

		if (data == null) {
			return StrID;
		}
		return StringUtil.getSwfLangStrVar(data,valArr);
	}

	/**
	 * 带文本替换功能的字符串
	 * @param StrID
	 * @param valArr
	 * @return 
	 */
	public static getSwfLangStrVar(strData: string, valArr: string[]): string {

		var indexpre: number;
		var indexback: number;
		var strget: string;

		indexpre = strData.indexOf("{");
		indexback = strData.indexOf("}");

		//下一次搜索的起始偏移量,防止{@}嵌套时，造成死循环
		var nextOffset: number = 0;

		var firstIndex: number;

		var strFlagPre: number;
		var strFlagBack: number;
		var strFlag: string;

		while (indexpre != -1 && indexback != -1) {
			strget = strData.substring(indexpre, indexback + 1);

			firstIndex = strData.indexOf("@", nextOffset);
			//var number: int = int(strData.charAt(strData.indexOf("@", nextOffset) + 1));
			var numberic: number = parseInt(strData.substring(firstIndex + 1, strData.indexOf(":", firstIndex))) - 1;
			if (numberic == NaN) {
				return "stringError:" + strData;
			}

			//处理填充字符串参数（如果有）
			strFlagPre = strData.indexOf("!#[", nextOffset) + 3;

			if (strFlagPre > 2) {
				//前缀{!#[PeerageRank_]@0:}
				strFlagBack = strData.indexOf("]@", nextOffset);
				strFlag = strData.substring(strFlagPre, strFlagBack);
				valArr[numberic] = StringUtil.getSwfLangStr(strFlag + valArr[numberic]);
			}

			var strreplace: string = valArr[numberic].toString();

			strData = strData.replace(strget, strreplace);

			nextOffset = indexpre + strreplace.length;

			indexpre = strData.indexOf("{", nextOffset);
			indexback = strData.indexOf("}", nextOffset);
		}

		return strData;
	}

	/**
	 * 获取配置好的字符串
	 * @param StrID
	 * @return 
	 * 
	 */
	public static getSwfLangStr(StrID: string): string {
		if (DataBase.strings == null) {
			return StrID;
		}

		var data: any = DataBase.strings[StrID];

		if (data == null) {
			return StrID;
		}
		return data.toString();
	}
}