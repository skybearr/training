var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Int64 = (function () {
    function Int64(lowerUint, higherUint) {
        if (lowerUint === void 0) { lowerUint = 0; }
        if (higherUint === void 0) { higherUint = 0; }
        this._highValue = 0;
        this._lowValue = 0;
        /**
         * 缓存的字符串
         */
        this.cacheString = new Array();
        this._lowValue = lowerUint;
        this._highValue = higherUint;
    }
    Object.defineProperty(Int64.prototype, "higherUint", {
        /**
         * 高32位整型数字
         */
        get: function () {
            return this._highValue;
        },
        set: function (value) {
            if (this._highValue == value)
                return;
            this._highValue = value;
            this.cacheBytes = null;
            this.cacheString = [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Int64.prototype, "lowerUint", {
        /**
         * 低32位整型数字
         */
        get: function () {
            return this._lowValue;
        },
        set: function (value) {
            this._lowValue = value;
            if (this._lowValue == value)
                return;
            this.cacheBytes = null;
            this.cacheString = [];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 从字符串生成数字
     * @param value 要转换为数字的字符串。
     * @param radix 要用于字符串到数字的转换的基数（从 2 到 36）。如果未指定 radix 参数，则默认值为 10。
     */
    Int64.prototype.fromString = function (value, radix) {
        if (radix === void 0) { radix = 10; }
        if (!value) {
            this.reset();
            return;
        }
        value = value.toLowerCase();
        var div = 4294967296;
        var low = 0;
        var high = 0;
        for (var i = 0; i < value.length; i++) {
            var num = value.charCodeAt(i) - 48;
            if (num > 9)
                num -= 39;
            low = low * radix + num;
            high = high * radix + (low / div >> 0);
            low = low % div;
        }
        this._lowValue = low;
        this._highValue = high;
        this.cacheString = [];
        this.cacheString[radix] = value;
        this.cacheBytes = null;
    };
    /**
     * 从字节流数组中读取uint64数字
     * @param bytes 包含64位无符号整型的字节流
     * @param postion 要从字节流中开始读取的偏移量
     */
    Int64.prototype.fromBytes = function (bytes, postion) {
        if (postion === void 0) { postion = 0; }
        try {
            bytes.position = postion;
            if (bytes.endian == egret.Endian.LITTLE_ENDIAN) {
                this._lowValue = bytes.readUnsignedInt();
                this._highValue = bytes.readUnsignedInt();
            }
            else {
                this._highValue = bytes.readUnsignedInt();
                this._lowValue = bytes.readUnsignedInt();
            }
        }
        catch (e) {
            this.reset();
            return;
        }
        this.cacheBytes = null;
        this.cacheString = [];
    };
    /**
     * 重置为0
     */
    Int64.prototype.reset = function () {
        this._highValue = 0;
        this._lowValue = 0;
        this.cacheBytes = null;
        this.cacheString = [];
    };
    /**
     * 克隆一个数字
     */
    Int64.prototype.clone = function () {
        return new Int64(this._lowValue, this._highValue);
    };
    Int64.prototype.copy = function (value) {
        this.reset();
        this._lowValue = value._lowValue;
        this._highValue = value._highValue;
    };
    Int64.prototype.cloneTo = function (value) {
        if (value == null) {
            value = new Int64();
        }
        value.copy(this);
        return value;
    };
    Int64.prototype.equals = function (value) {
        if (value == null)
            return false;
        return this._highValue == value._highValue && this._lowValue == value._lowValue;
    };
    Object.defineProperty(Int64.prototype, "bytes", {
        /**
         * 返回数字的字节流数组形式,存储方式为Endian.LITTLE_ENDIAN。
         */
        get: function () {
            if (this.cacheBytes)
                return this.cacheBytes;
            this.cacheBytes = new egret.ByteArray();
            this.cacheBytes.endian = egret.Endian.LITTLE_ENDIAN;
            this.cacheBytes.writeUnsignedInt(this._lowValue);
            this.cacheBytes.writeUnsignedInt(this._highValue);
            return this.cacheBytes;
        },
        enumerable: true,
        configurable: true
    });
    Int64.prototype.toNumber = function () {
        var value = this.toString();
        return value == "" ? 0 : parseInt(value);
    };
    /**
     * 返回数字的字符串表示形式。
     * @param radix 指定要用于数字到字符串的转换的基数（从 2 到 36）。如果未指定 radix 参数，则默认值为 10。
     */
    Int64.prototype.toString = function (radix) {
        if (radix === void 0) { radix = 10; }
        if (radix < 2 || radix > 36) {
            throw new RangeError("基数参数必须介于 2 到 36 之间；当前值为 " + radix + "。");
        }
        if (this.cacheString[radix])
            return this.cacheString[radix];
        var result = "";
        var lowUint = this._lowValue;
        var highUint = this._highValue;
        var highRemain;
        var lowRemain;
        var tempNum;
        var MaxLowUint = Math.pow(2, 32);
        while (highUint != 0 || lowUint != 0) {
            highRemain = (highUint % radix);
            tempNum = highRemain * MaxLowUint + lowUint;
            lowRemain = tempNum % radix;
            result = lowRemain.toString(radix) + result;
            highUint = (highUint - highRemain) / radix;
            lowUint = (tempNum - lowRemain) / radix;
        }
        this.cacheString[radix] = result == "" ? "0" : result;
        return this.cacheString[radix];
    };
    Int64.prototype.parseData = function (data) {
        this._highValue = data.readUnsignedInt();
        this._lowValue = data.readUnsignedInt();
    };
    Int64.prototype.toData = function (data) {
        data.writeUnsignedInt(this._highValue);
        data.writeUnsignedInt(this._lowValue);
    };
    Int64.prototype.gc = function () {
        this.cacheBytes = null;
        this.cacheString = null;
    };
    return Int64;
}());
__reflect(Int64.prototype, "Int64");
//# sourceMappingURL=Int64.js.map