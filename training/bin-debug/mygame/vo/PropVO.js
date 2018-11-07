var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PropVO = (function () {
    function PropVO() {
        /** 备用参数 1*/
        this.extradata1 = "";
        /** 备用参数 2*/
        this.extradata2 = "";
    }
    Object.defineProperty(PropVO.prototype, "id", {
        get: function () {
            return this._id;
        },
        /** id */
        set: function (v) {
            this._id = v;
            this.type = v < 10 ? PROPTYPE.COIN : PROPTYPE.PROP;
        },
        enumerable: true,
        configurable: true
    });
    return PropVO;
}());
__reflect(PropVO.prototype, "PropVO");
//# sourceMappingURL=PropVO.js.map