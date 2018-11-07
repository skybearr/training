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
var fw;
(function (fw) {
    var RankUI = (function (_super) {
        __extends(RankUI, _super);
        function RankUI() {
            return _super.call(this, "RankSkin") || this;
        }
        RankUI.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            console.log("childrenCreated");
        };
        RankUI.prototype.checkFit = function () {
            this.height = this.rect_bg.height = GameConst.GameStage.stageHeight;
            ;
        };
        /** 打开UI时的附带参数 */
        RankUI.prototype.setParams = function (params) {
            _super.prototype.setParams.call(this, params);
            this.shareticket = this.args != null ? this.args.shareticket : null;
            this.openworld = this.args != null ? this.args.openworld : false;
        };
        RankUI.prototype.initView = function () {
            this.me = new fw.RankItemUI();
            this.me.horizontalCenter = 0;
            this.me.y = 960;
            this.addChild(this.me);
            if (this.openworld) {
                this.lbl_tag1.text = this.shareticket != null ? "群排行" : "好友排行";
                this.gp_world.visible = true;
                this.lbl_title.visible = false;
                this.initOpenRank();
                this.list_world.itemRenderer = fw.RankItemUI;
                this.arr_data = new eui.ArrayCollection();
                HttpCommand.getInstance().getWorldRank();
            }
            else {
                this.lbl_title.text = this.shareticket != null ? "群排行榜" : "好友排行榜";
                this.initOpenRank();
            }
        };
        RankUI.prototype.initOpenRank = function () {
            this.scroller_world.visible = false;
            this.me.visible = false;
            this.ranktype = 0;
            this.img_tag2.alpha = 0;
            this.img_tag1.alpha = 1;
            this.lbl_tag2.textColor = 0xffffff;
            this.lbl_tag1.textColor = 0x000000;
            if (this.bmp_context != null) {
                this.bmp_context.visible = true;
            }
            else {
                this.initDataContext();
            }
        };
        RankUI.prototype.initWorldRank = function () {
            this.scroller_world.visible = true;
            this.me.visible = true;
            this.ranktype = 1;
            this.img_tag1.alpha = 0;
            this.img_tag2.alpha = 1;
            this.lbl_tag1.textColor = 0xffffff;
            this.lbl_tag2.textColor = 0x000000;
            if (this.bmp_context != null) {
                this.bmp_context.visible = false;
            }
        };
        RankUI.prototype.initDataContext = function () {
            //开放域主体
            if (platform.isdebug()) {
                return;
            }
            this.bmp_context = new BitmapOpenDataContext();
            this.bmp_context.x = this.bmp_context.y = 0;
            this.addChildAt(this.bmp_context, 4); //盖在底图上面，各种按钮下面
            this.bmp_context.start();
            this.bmp_context.command(UIConst.command_openrank, null, "score_1_3", fw.RANKSORTTYPE.ASC);
        };
        RankUI.prototype.initEvent = function () {
            this.img_tag1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickOpenRank, this);
            this.img_tag2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickWorldRank, this);
            this.img_rankgp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGroupRank, this);
            HttpCommand.getInstance().addEventListener(HttpEvent.getWorldRank, this.initWorldData, this);
        };
        RankUI.prototype.initWorldData = function (e) {
            this.arr_data.removeAll();
            var arr = e.data;
            for (var i = 0; i < arr.length; i++) {
                var data = arr[i];
                var vo = new fw.RankVO();
                vo.rank = i + 1;
                vo.head = data['user']['avatarurl'];
                vo.name = data['user']['nickname'];
                vo.score = data['score'];
                vo.gender = data['user']['gender'];
                vo.date = data['user']['ranking_date'];
                if (vo.head == PlayerConst.userInfo.avatarUrl) {
                    this.myvo = vo;
                }
                if (vo.score > 0) {
                    this.arr_data.addItem(vo);
                }
            }
            this.list_world.dataProvider = this.arr_data;
            if (this.myvo != null) {
                this.me.data = this.myvo;
            }
        };
        RankUI.prototype.clickOpenRank = function () {
            if (this.ranktype == 0) {
                return;
            }
            this.initOpenRank();
        };
        RankUI.prototype.clickWorldRank = function () {
            if (this.ranktype == 1) {
                return;
            }
            this.initWorldRank();
        };
        RankUI.prototype.clickGroupRank = function () {
            WxApi.getInstance().buryingPoint(BuryingPoint.bp_grouprank_click);
            WxApi.getInstance().share(fw.SHARETYPE.GROUPRANK);
        };
        RankUI.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.img_tag1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickOpenRank, this);
            this.img_tag2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickWorldRank, this);
            this.img_rankgp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGroupRank, this);
            HttpCommand.getInstance().removeEventListener(HttpEvent.getWorldRank, this.initWorldData, this);
            if (this.bmp_context != null) {
                this.bmp_context.clear();
                this.bmp_context = null;
            }
        };
        return RankUI;
    }(fw.BaseUI));
    fw.RankUI = RankUI;
    __reflect(RankUI.prototype, "fw.RankUI");
})(fw || (fw = {}));
window["RankUI"] = fw.RankUI;
//# sourceMappingURL=RankUI.js.map