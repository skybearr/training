var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 所有后台配置数据
 * 根据自己需要在set data中处理数据
 */
var SettingVO = (function () {
    function SettingVO() {
        /** 播放视频间隔 */
        this.rewardCD = 180;
    }
    Object.defineProperty(SettingVO.prototype, "data", {
        get: function () {
            return this._data;
        },
        /** 所有后台配置数据在这 */
        set: function (o) {
            this._data = o;
            //自定义
        },
        enumerable: true,
        configurable: true
    });
    return SettingVO;
}());
__reflect(SettingVO.prototype, "SettingVO");
//# sourceMappingURL=SettingVO.js.map