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
var WxApi = (function (_super) {
    __extends(WxApi, _super);
    function WxApi() {
        return _super.call(this) || this;
    }
    WxApi.getInstance = function () {
        if (this._instance == null) {
            this._instance = new WxApi();
        }
        return this._instance;
    };
    WxApi.prototype.init = function () {
        if (GameConst.web == 1) {
            GameLogic.getInstance().init();
        }
        else {
            this.login();
        }
        this.showShareMenu();
        //视频cd
        var cd = this.getLocalData("rewardcd");
        this.starttime = cd == null || cd == "" ? null : parseInt(cd);
    };
    /**登录 */
    WxApi.prototype.login = function () {
        var _this = this;
        var wx = window["wx"];
        if (wx == null) {
            return;
        }
        wx.login({
            success: function (res) {
                console.log("wxloginsuccess:", res);
                _this.logincode = res['code'];
                GameLogic.getInstance().init();
            },
            fail: function () {
            },
            complete: function () {
            },
        });
    };
    /**主动转发
     * @param query 转发携带参数 必须是 key1=val1&key2=val2 的格式 用于区分其他用户点开这个分享链接时是否打开排行榜等操作
    */
    WxApi.prototype.share = function (title, query) {
        if (title === void 0) { title = null; }
        if (query === void 0) { query = null; }
        var wx = window["wx"];
        if (wx == null) {
            return;
        }
        title = title == null ? WxApi.getInstance().shareInfo.share_game_title : title;
        query = query == null ? "" : query;
        this.updateShareMenu(true);
        wx.shareAppMessage({
            title: title,
            imageUrl: WxApi.getInstance().shareInfo.share_game_img,
            query: query
        });
    };
    /**炫耀 */
    WxApi.prototype.showoff = function () {
        var wx = window["wx"];
        if (wx == null) {
            return;
        }
        this.updateShareMenu(true);
        wx.shareAppMessage({
            title: PlayerConst.highestScore + "分，不服来战！",
            imageUrl: WxApi.getInstance().shareInfo.share_group_img,
            query: WxApi.getInstance().shareInfo.query
        });
    };
    WxApi.prototype.drawBMP = function () {
        var con = new egret.DisplayObjectContainer();
        var result = new egret.Bitmap();
        var texture = RES.getRes("over_json.game_over_share");
        result.texture = texture;
        con.addChild(result);
        // let img_head = new eui.Image();
        // img_head.source = WxApi.getInstance().userInfo.avatarUrl;
        // img_head.smoothing = true;
        // img_head.width = img_head.height = 50;
        // img_head.x = (con.width - 50) >> 1;
        // img_head.y = 260;
        // con.addChild(img_head);
        // let circle: egret.Shape = new egret.Shape();
        // circle.graphics.beginFill(0x000000);
        // circle.graphics.drawCircle(0, 0, 25);
        // circle.graphics.endFill();
        // circle.x = (con.width - circle.width) >> 1;
        // circle.y = img_head.y;
        // con.addChild(circle);
        // img_head.mask = circle;
        var lbl_name = new egret.TextField();
        lbl_name.text = WxApi.getInstance().userInfo.nickName;
        lbl_name.width = 200;
        lbl_name.height = 24;
        lbl_name.size = 24;
        lbl_name.textAlign = "center";
        lbl_name.fontFamily = "SimHei";
        lbl_name.x = (con.width - lbl_name.width) >> 1;
        lbl_name.y = 310;
        con.addChild(lbl_name);
        var tf_score = new egret.TextField();
        tf_score.text = PlayerConst.highestScore + "分";
        tf_score.width = 300;
        tf_score.height = 24;
        tf_score.size = 40;
        tf_score.textAlign = "center";
        tf_score.fontFamily = "SimHei";
        tf_score.x = (con.width - tf_score.width) >> 1;
        tf_score.y = 352;
        con.addChild(tf_score);
        var trrrr = new egret.RenderTexture();
        trrrr.drawToTexture(con);
        return new egret.Bitmap(trrrr);
    };
    /**点击别人转发进来的 ，获取shareTicket*/
    WxApi.prototype.checkShareInfo = function () {
        var _this = this;
        console.log("checkShareInfo");
        var wx = window["wx"];
        if (wx == null) {
            return;
        }
        var info = wx.getLaunchOptionsSync();
        console.log("info:", info);
        //如果是从群里点开的
        if (info != null && info.shareTicket != null && info.shareTicket != "") {
            //查看群排行
            if (info.query != null && info.query.grouprank == "1") {
                wx.getShareInfo({
                    shareTicket: info.shareTicket,
                    success: function (res) {
                        console.log("getShareInfo:success:", res);
                        var event = new GameEvent(GameEvent.OPENRANK);
                        event.data = info.shareTicket;
                        _this.dispatchEvent(event);
                    },
                    fail: function (res) {
                        console.log("getShareInfo:fail:", res);
                    },
                    complete: function () {
                        console.log("getShareInfo:complete:");
                    }
                });
            }
        }
    };
    WxApi.prototype.toast = function (str) {
        if (!this.checkWx()) {
            return;
        }
        wx.showToast({
            title: str,
            icon: 'none',
            duration: 2000
        });
    };
    /**右上角转发 */
    WxApi.prototype.showShareMenu = function (info) {
        if (info === void 0) { info = null; }
        console.log("showShareMenu:", info);
        if (info == null) {
            info = { share_game_title: "每天练习5分钟，提高孩子注意力", share_game_img: "resource/assets/share.jpg", query: "" };
        }
        this.shareInfo = info;
        var wx = window["wx"];
        if (wx == null) {
            return;
        }
        wx.showShareMenu();
        this.onShare();
        this.initRewardVideoAd();
        this.checkShareInfo();
    };
    /**监听用户点击右上角菜单的“转发”按钮时触发的事件
     * @param query 转发携带参数 必须是 key1=val1&key2=val2 的格式 用于区分其他用户点开这个分享链接时是否打开排行榜等操作
     */
    WxApi.prototype.onShare = function (query) {
        if (query === void 0) { query = "rightup=1"; }
        var wx = window["wx"];
        if (wx == null) {
            return;
        }
        this.updateShareMenu(true);
        console.log("onShareAppMessage:", this.shareInfo);
        wx.onShareAppMessage(function () {
            return {
                title: WxApi.getInstance().shareInfo.share_game_title,
                imageUrl: WxApi.getInstance().shareInfo.share_game_img,
                query: WxApi.getInstance().shareInfo.query
            };
        });
    };
    /**转发参数 */
    WxApi.prototype.updateShareMenu = function (withShareTicket) {
        var wx = window["wx"];
        if (wx == null) {
            return;
        }
        console.log("updateShareMenu:withShareTicket:", withShareTicket);
        wx.updateShareMenu({
            withShareTicket: withShareTicket,
            success: function (res) {
                console.log("updateShareMenu:success:", res);
            },
            fail: function (res) {
                console.log("updateShareMenu:fail:", res);
            },
            complete: function () {
                console.log("updateShareMenu:complete:");
            }
        });
    };
    /**联系客服 */
    WxApi.prototype.feedBack = function () {
        var wx = window["wx"];
        if (wx == null) {
            return;
        }
        wx.openCustomerServiceConversation({
            success: function (res) {
                console.log("success:", res);
            },
            fail: function (res) {
                console.log("fail:", res);
            },
            complete: function (res) {
                console.log("complete:", res);
            }
        });
    };
    /** 对用户托管数据进行写数据操作，允许同时写多组 KV 数据
     * @param	KVDataList	要修改的 KV 数据列表
    */
    WxApi.prototype.setHigherScore = function (type, id, v) {
        var wx = window["wx"];
        if (wx == null) {
            return;
        }
        // let n = PlayerConst.highestScore;
        // if (v <= n) {
        // 	return;
        // }
        // PlayerConst.highestScore = v;
        var ranktype = "score_" + type + "_" + id;
        var KVDataList = [];
        wx.setUserCloudStorage({
            KVDataList: [
                { key: ranktype, value: v + "" }
            ],
            success: function (res) {
                console.log("setUserCloudStorage:res:", res);
            },
            fail: function (err) {
                console.log("setUserCloudStorage:error:", err);
            },
            complete: function () {
                console.log("setUserCloudStorage:complete:");
            }
        });
    };
    /**banner广告 */
    WxApi.prototype.showBanner = function () {
        console.log("系统信息：", wx.getSystemInfoSync());
        if (this.bannerAd == null) {
            var phoneWidth = wx.getSystemInfoSync().screenWidth; //手机屏幕宽度
            var phoneHeight = wx.getSystemInfoSync().screenHeight; //手机屏幕高度
            this.bannerAd = wx.createBannerAd({
                adUnitId: 'adunit-465b0f38397b8e3f',
                style: {
                    left: 10,
                    top: phoneHeight - 100,
                    width: phoneWidth - 20,
                }
            });
        }
        if (this.bannerAd != null) {
            this.bannerAd.onLoad(function () {
                console.log('banner 广告加载成功');
            });
            this.bannerAd.show();
        }
    };
    WxApi.prototype.hideBanner = function () {
        if (this.bannerAd != null) {
            this.bannerAd.hide();
        }
    };
    /** 预加载激励视频 */
    WxApi.prototype.initRewardVideoAd = function () {
        var _this = this;
        var wx = window["wx"];
        if (wx == null) {
            return;
        }
        this.rewardAd = wx.createRewardedVideoAd({ adUnitId: "adunit-922e89b51b9d9336" });
        this.rewardAd.onLoad(function () {
            console.log('激励视频 广告加载成功');
        });
        this.rewardAd.onError(function (err) {
            console.log("rewardAderror:", err);
        });
        this.rewardAd.onClose(function (res) {
            // 用户点击了【关闭广告】按钮
            var state;
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            if (res && res.isEnded || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                state = 0;
            }
            else {
                // 播放中途退出，不下发游戏奖励
                state = 1;
            }
            _this.rewardAdCDStart();
            _this.dispatchGameEvent(GameEvent.REWARDAD_CLOSE_EVENT, state);
        });
    };
    WxApi.prototype.rewardAdCDStart = function () {
        this.starttime = new Date().getTime();
        this.setLocalDataByString("rewardcd", this.starttime + "");
    };
    WxApi.prototype.getRewardCD = function () {
        var nowtime = new Date().getTime();
        if (this.starttime == null) {
            return 0;
        }
        else {
            return 180 - Math.floor((nowtime - this.starttime) / 1000);
        }
    };
    /**存取本地数据 */
    WxApi.prototype.setLocalDataByObject = function (key, obj) {
        var value = JSON.stringify(obj);
        this.setLocalDataByString(key, value);
    };
    /**存取本地数据 */
    WxApi.prototype.setLocalDataByString = function (key, value) {
        if (!this.checkWx()) {
            return null;
        }
        try {
            return wx.setStorageSync(key, value);
        }
        catch (e) {
            return null;
        }
    };
    WxApi.prototype.showRewardAd = function (type) {
        var _this = this;
        this.adtype = type;
        if (this.rewardAd != null) {
            try {
                this.rewardAd.show()
                    .catch(function (err) {
                    console.log("showRewardAd:", err);
                    _this.dispatchGameEvent(GameEvent.REWARDAD_CLOSE_EVENT, 2);
                });
            }
            catch (e) {
                this.dispatchGameEvent(GameEvent.REWARDAD_CLOSE_EVENT, 2);
            }
        }
        else {
            this.dispatchGameEvent(GameEvent.REWARDAD_CLOSE_EVENT, 2);
        }
    };
    WxApi.prototype.dispatchGameEvent = function (eventname, data) {
        console.log("dispatchGameEvent:", eventname, this.adtype, data);
        var event = new GameEvent(eventname);
        event.data = { type: this.adtype, data: data };
        this.dispatchEvent(event);
    };
    /** --------------------------------------- 本地缓存 ------------------------------------------------------- */
    /**检测wx是否启用 */
    WxApi.prototype.checkWx = function () {
        var wx = window['wx'];
        return wx != null;
    };
    /**存取本地数据 */
    WxApi.prototype.setLocalData = function (key, value) {
        if (!this.checkWx()) {
            return null;
        }
        try {
            return wx.setStorageSync(key, value);
        }
        catch (e) {
            return null;
        }
    };
    /**读取本地数据 */
    WxApi.prototype.getLocalData = function (key) {
        if (!this.checkWx()) {
            return null;
        }
        try {
            return wx.getStorageSync(key);
        }
        catch (e) {
            return null;
        }
    };
    /**删除缓存 */
    WxApi.prototype.clearLocalData = function (key) {
        if (!this.checkWx()) {
            return null;
        }
        try {
            return wx.clearStorageSync(key);
        }
        catch (e) {
            return null;
        }
    };
    /**跳转到其他小程序 */
    WxApi.prototype.skipToProgram = function () {
        try {
            wx.navigateToMiniProgram({
                appId: "wx5ccf73a5edb50795",
                extraData: "qiuqiu",
                success: function (res) {
                    console.log("navigateToMiniProgram:", res);
                },
                fail: function (err) {
                    console.log("navigateToMiniProgram:error:", err);
                },
                complete: function () {
                    console.log("navigateToMiniProgram:complete:");
                }
            });
        }
        catch (e) {
            wx.showToast({
                title: '该功能暂未开放',
                icon: 'none',
                duration: 2000
            });
        }
    };
    /**给开放域发消息 */
    WxApi.prototype.postToDataContext = function (data) {
        if (wx == null) {
            return;
        }
        console.log("postToDataContext:", data);
        wx.getOpenDataContext().postMessage(data);
    };
    return WxApi;
}(egret.EventDispatcher));
__reflect(WxApi.prototype, "WxApi");
//# sourceMappingURL=WxApi.js.map