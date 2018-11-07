var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 *
 * 皮肤逻辑类
 *
 *
 */
var SkinLogic = (function (_super) {
    __extends(SkinLogic, _super);
    function SkinLogic() {
        return _super.call(this) || this;
    }
    SkinLogic.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SkinLogic();
        }
        return this._instance;
    };
    /** 初始化皮肤 */
    SkinLogic.prototype.initSkins = function (arr) {
        this.skins = {};
        HttpCommand.getInstance().addEventListener(HttpEvent.getSkinsInfo, this.skinAllResponse, this, false, 1);
        HttpCommand.getInstance().addEventListener(HttpEvent.getSkinsGot, this.skinGotResponse, this, false, 1);
        HttpCommand.getInstance().addEventListener(HttpEvent.postSkinGot, this.skinGotResponse, this, false, 1);
        this.updateskins(arr);
    };
    SkinLogic.prototype.skinGotResponse = function (e) {
        this.updateskins(e.data);
    };
    /** 初始化所有皮肤 */
    SkinLogic.prototype.skinAllResponse = function (e) {
        var arr = e.data;
        for (var i = 0; i < arr.length; i++) {
            var o = arr[i];
            var vo = this.skins[o.id];
            if (vo == null) {
                vo = new SkinVO();
                vo.id = parseInt(o.id);
                vo.imgurl = o.imgurl;
                vo.name = o.title;
            }
            vo.appid = o.appid;
            vo.baseline = o.baseline;
            this.skins[vo.id] = vo;
        }
    };
    /** 更新已拥有皮肤 */
    SkinLogic.prototype.updateskins = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            var o = arr[i];
            var vo = this.skins[o.skin_id];
            if (vo == null) {
                vo = new SkinVO();
                vo.id = parseInt(o.skin_id);
                vo.imgurl = o.imgurl;
                vo.name = o.title;
            }
            vo.isdefault = o.is_default == "1";
            vo.create_time = parseInt(o.create_time);
            this.skins[vo.id] = vo;
        }
    };
    /** 获得皮肤
     * @param id 皮肤id
    */
    SkinLogic.prototype.getSkin = function (id) {
        var vo = this.skins[id];
        if (vo == null) {
            console.log("没有找到成就" + id + "，请联系GM");
        }
        else {
            HttpCommand.getInstance().postSkinGet(id);
        }
    };
    return SkinLogic;
}(egret.EventDispatcher));
__reflect(SkinLogic.prototype, "SkinLogic");
//# sourceMappingURL=SkinLogic.js.map