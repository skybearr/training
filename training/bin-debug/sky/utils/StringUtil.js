var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StringUtil = (function () {
    function StringUtil() {
    }
    /**
     * 带文本替换功能的字符串：返回富文本
     * @param StrID
     * @param valArr
     * @return
     */
    StringUtil.getSwfLangTextFlowVar = function (StrID, valArr) {
        return new egret.HtmlTextParser().parser(StringUtil.getSwfLangStrVar(StrID, valArr));
    };
    StringUtil.getSwfLangStrVarByID = function (StrID, valArr) {
        if (DataBase.strings == null) {
            return StrID;
        }
        var data = DataBase.strings[StrID];
        if (data == null) {
            return StrID;
        }
        return StringUtil.getSwfLangStrVar(data, valArr);
    };
    /**
     * 带文本替换功能的字符串
     * @param StrID
     * @param valArr
     * @return
     */
    StringUtil.getSwfLangStrVar = function (strData, valArr) {
        var indexpre;
        var indexback;
        var strget;
        indexpre = strData.indexOf("{");
        indexback = strData.indexOf("}");
        //下一次搜索的起始偏移量,防止{@}嵌套时，造成死循环
        var nextOffset = 0;
        var firstIndex;
        var strFlagPre;
        var strFlagBack;
        var strFlag;
        while (indexpre != -1 && indexback != -1) {
            strget = strData.substring(indexpre, indexback + 1);
            firstIndex = strData.indexOf("@", nextOffset);
            //var number: int = int(strData.charAt(strData.indexOf("@", nextOffset) + 1));
            var numberic = parseInt(strData.substring(firstIndex + 1, strData.indexOf(":", firstIndex))) - 1;
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
            var strreplace = valArr[numberic].toString();
            strData = strData.replace(strget, strreplace);
            nextOffset = indexpre + strreplace.length;
            indexpre = strData.indexOf("{", nextOffset);
            indexback = strData.indexOf("}", nextOffset);
        }
        return strData;
    };
    /**
     * 获取配置好的字符串
     * @param StrID
     * @return
     *
     */
    StringUtil.getSwfLangStr = function (StrID) {
        if (DataBase.strings == null) {
            return StrID;
        }
        var data = DataBase.strings[StrID];
        if (data == null) {
            return StrID;
        }
        return data.toString();
    };
    return StringUtil;
}());
__reflect(StringUtil.prototype, "StringUtil");
//# sourceMappingURL=StringUtil.js.map