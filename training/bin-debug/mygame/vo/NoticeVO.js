var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NoticeVO = (function () {
    function NoticeVO() {
        this.version_client = "1.1";
    }
    Object.defineProperty(NoticeVO.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (o) {
            this._data = o;
            //自定义
            this.content = o.content;
            this.update_time = parseInt(o.update_time);
            this.version_server = o.version;
            if (this.version_client != this.version_server) {
                fw.UIManager.getInstance().openUI(UIConst.NOTICE, null, fw.UITYPE.SECOND);
                this.version_client = this.version_server;
            }
        },
        enumerable: true,
        configurable: true
    });
    return NoticeVO;
}());
__reflect(NoticeVO.prototype, "NoticeVO");
//# sourceMappingURL=NoticeVO.js.map