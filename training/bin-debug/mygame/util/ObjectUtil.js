var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ObjectUtil = (function () {
    function ObjectUtil() {
    }
    //删除所有数据
    ObjectUtil.delObjectProp = function (o) {
        for (var key in o) {
            delete o[key];
        }
    };
    ObjectUtil.cloneObject = function (o) {
        var str = egret.getQualifiedClassName(o);
        var objClass = egret.getDefinitionByName(str);
        var obj = new objClass();
        if (str == "function") {
            return obj.constructor;
        }
        for (var k in o) {
            if (k == "callBackList") {
                continue;
            }
            if (k == "function") {
                return;
            }
            var value = o[k];
            if (typeof (value) == "number" ||
                typeof (value) == "string" ||
                typeof (value) == "boolean") {
                obj[k] = value;
            }
            else {
                var str = egret.getQualifiedClassName(value);
                if (str == "") {
                    continue;
                }
                obj[k] = this.cloneObject(value);
            }
        }
        return obj;
    };
    /**
     * 获取状态位
     * @param result  结果 值
     * @param crtV    当前值
     * @ return   Boolean  返回状态
     */
    ObjectUtil.getState = function (result, crtV) {
        var boo = false;
        if ((1 << crtV) & result) {
            boo = true;
        }
        return boo;
    };
    /**
     * 将num 左移 bit位。
     */
    ObjectUtil.push_bit = function (num, bit) {
        return num << bit;
    };
    return ObjectUtil;
}());
__reflect(ObjectUtil.prototype, "ObjectUtil");
//# sourceMappingURL=ObjectUtil.js.map