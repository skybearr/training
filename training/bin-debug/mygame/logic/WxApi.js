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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
    /** 初始化游戏所需 api */
    WxApi.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, userinfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.inited = false;
                        return [4 /*yield*/, platform.login()];
                    case 1:
                        res = _a.sent();
                        this.logincode = res.code;
                        console.log("logincod:", res.code);
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 2:
                        userinfo = _a.sent();
                        PlayerConst.userInfo.avatarUrl = userinfo.avatarUrl;
                        PlayerConst.userInfo.city = userinfo.city;
                        PlayerConst.userInfo.country = userinfo.country;
                        PlayerConst.userInfo.gender = parseInt(userinfo.gender);
                        PlayerConst.userInfo.language = userinfo.language;
                        PlayerConst.userInfo.nickname = userinfo.nickName;
                        PlayerConst.userInfo.province = userinfo.province;
                        console.log("获取微信用户信息：", PlayerConst.userInfo);
                        //本地debug版本测试
                        if (PlayerConst.userInfo.nickname == "debug_nickName") {
                            PlayerConst.token = "1D1C1C1C1C1C181L1L181F1F1C1G1E1F1H1C";
                            HttpCommand.getInstance().once(HttpEvent.postUser, this.postUsersResponse, this);
                            HttpCommand.getInstance().postUser(PlayerConst.userInfo);
                        }
                        else {
                            //一，根据logincode请求接口
                            HttpCommand.getInstance().once(HttpEvent.getToken, this.getTokenResponse, this);
                            HttpCommand.getInstance().getToken(this.logincode);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /** 二，得到token以后把微信的用户信息以后发给服务器 */
    WxApi.prototype.getTokenResponse = function (e) {
        PlayerConst.token = e.data.token;
        HttpCommand.getInstance().once(HttpEvent.postUser, this.postUsersResponse, this);
        HttpCommand.getInstance().postUser(PlayerConst.userInfo);
    };
    /** 三，从服务器获取用户的所有信息 */
    WxApi.prototype.postUsersResponse = function (e) {
        HttpCommand.getInstance().once(HttpEvent.getUser, this.getUserResponse, this);
        HttpCommand.getInstance().getUser();
    };
    /** 四，获取用户信息，初始化所有数据 */
    WxApi.prototype.getUserResponse = function (e) {
        PlayerConst.openId = e.data.openid;
        PlayerConst.appid_server = e.data.appid;
        PlayerConst.uid = e.data.id;
        PropLogic.getInstance().initProps(e.data.prop);
        InviteLogic.getInstance().initInvite();
        TurnLogic.getInstance().initTurns();
        GameLogic.getInstance().init(e.data);
        MissionTrainLogic.getInstance().initData();
        AchieveLogic.getInstance().initAchieves();
        //被动分享
        this.share(4);
        this.initRewardVideoAd();
        this.checkLauchOptions();
        this.initOver();
    };
    /** 初始化OK，关闭loading */
    WxApi.prototype.initOver = function () {
        console.log("api与接口初始化ok，可以开始游戏");
        this.inited = true;
        fw.UIManager.getInstance().showLoading(false);
    };
    /** 是否需要打开群排行 */
    WxApi.prototype.checkLauchOptions = function () {
        var info = platform.getLaunchOptionsSync();
        console.log("checkLauchOptions", info);
        if (info.query != null) {
            if (info.query.invite != null) {
                HttpCommand.getInstance().postInvite(info.query.invite);
            }
            if (info.query.grouprank != null && info.shareTicket != null && info.shareTicket != "") {
                fw.UIManager.getInstance().openUI(UIConst.RANK, info.shareTicket);
            }
        }
    };
    /**分享
     * @param type fw.SHARETYPE.XXX分享类型 1主动分享  2炫耀  3当前分数 4被动分享 5群排行
     */
    WxApi.prototype.share = function (type, title, img) {
        if (type === void 0) { type = 1; }
        if (title === void 0) { title = null; }
        if (img === void 0) { img = null; }
        var query = "invite=" + PlayerConst.uid;
        switch (type) {
            case fw.SHARETYPE.ACTIVE:
                platform.share("每天练习5分钟，提高孩子注意力", "resource/assets/share.jpg", query);
                break;
            case fw.SHARETYPE.SHOWOFF:
                platform.share("每天练习5分钟，提高孩子注意力", "resource/assets/share.jpg", query);
                break;
            case fw.SHARETYPE.CRTSCORE:
                platform.share(title, "resource/assets/share.jpg", query);
                break;
            case fw.SHARETYPE.PASSIVE:
                platform.showShareMenu();
                platform.updateShareMenu(true);
                platform.onShareAppMessage("每天练习5分钟，提高孩子注意力", "resource/assets/share.jpg", query);
                break;
            case fw.SHARETYPE.GROUPRANK:
                query += "&grouprank=1";
                platform.share("每天练习5分钟，提高孩子注意力", "resource/assets/share.jpg", query);
                break;
            case fw.SHARETYPE.INVITE:
                platform.share("玩了舒尔特方格，我上课注意力变的集中了，你也来试试吧", "resource/assets/share.jpg", query);
                break;
            case fw.SHARETYPE.INVITE_DAILY:
                break;
        }
    };
    /**联系客服 */
    WxApi.prototype.connectGM = function () {
        platform.openCustomerServiceConversation();
    };
    /** 在左上角创建游戏圈按钮 */
    WxApi.prototype.createGameClubButton = function (btnstr) {
        if (btnstr === void 0) { btnstr = "游戏圈"; }
        platform.createGameClubButton(btnstr);
    };
    /** 手机振动
     * @param short  true短震动  false长振动
     */
    WxApi.prototype.vibrate = function (short) {
        if (short === void 0) { short = true; }
        platform.vibrate(short);
    };
    /** 跳转到其他小程序
     * @param appid 其他小程序的appid
     * @param extraData 其他参数 obj
     */
    WxApi.prototype.skipToProgram = function (appid, extraData) {
        platform.skipToProgram(appid, extraData);
    };
    /**	对用户托管数据进行写数据操作，允许同时写多组 KV 数据
        * @param KVDataList     [{ key: "newscore", value:"9999"}]
      */
    WxApi.prototype.setUserCloudStorage = function (KVDataList) {
        platform.setUserCloudStorage(KVDataList);
    };
    /** 游戏结束 记录数据到服务器和开放域
     * @param type
     * @param id
     * @param score
     */
    WxApi.prototype.setScore = function (type, id, score) {
        HttpCommand.getInstance().postWorldRank(score, "1", type + "_" + id);
        var key = "score_" + type + "_" + id;
        var KVDataList = [{ key: key, value: score + "" }];
        this.setUserCloudStorage(KVDataList);
    };
    /** 存储本地数据
     * @param key
     * @param value   string|obj
     * @param isobj 是否为obj，本地缓存数据时需要用，微信不需要
     */
    WxApi.prototype.setStorage = function (key, value, isobj) {
        if (isobj === void 0) { isobj = false; }
        platform.setStorageSync(key, value, isobj);
    };
    /** 获取本地缓存
     * @param key
     * @param isobj 是否为obj，本地缓存数据时需要用，微信不需要
     * @return 如果没有 返回空字符串 ""
     */
    WxApi.prototype.getStorage = function (key, isobj) {
        if (isobj === void 0) { isobj = false; }
        return platform.getStorageSync(key, isobj);
    };
    /** 向开放域发数据
    * @param data  shareTicket: this.shareticket,
                userinfo: WxApi.getInstance().userInfo,
                stageW: GlobalConst.GameStage.stageWidth,
                stageH: GlobalConst.GameStage.stageHeight,
                command: "open"
    */
    WxApi.prototype.postMessageToDataContext = function (data) {
        platform.postMessage(data);
    };
    /** 埋点统计 */
    WxApi.prototype.initBuryingSDK = function () {
        platform.initBuryingSDK();
    };
    /** 埋点统计 */
    WxApi.prototype.buryingPoint = function (key, value) {
        if (value === void 0) { value = null; }
        platform.buryingPoint(key, value);
    };
    /** 弹出提示
     * @param content 内容
     * @param type 1悬浮 2弹出窗
     * @param title 弹出窗时的标题
     */
    WxApi.prototype.toast = function (content, type, title, surestr) {
        if (type === void 0) { type = 1; }
        if (title === void 0) { title = "友情提示"; }
        if (surestr === void 0) { surestr = "确定"; }
        if (type == 1) {
            platform.toast(content);
        }
        else if (type == 2) {
            platform.showModal(content, title, surestr);
        }
    };
    /** 展示banner广告 */
    WxApi.prototype.bannershow = function () {
        platform.bannershow(GameConst.bannerId);
    };
    /** 隐藏banner广告 */
    WxApi.prototype.bannerhide = function () {
        platform.bannerhide();
    };
    /** 销毁banner广告 */
    WxApi.prototype.bannerdestroy = function () {
        platform.bannerdestroy();
    };
    /** 获取开放域的资源形成一个图片 */
    WxApi.prototype.getOpenDataBMP = function () {
        if (platform.isdebug()) {
            return null;
        }
    };
    WxApi.prototype.rewardAdCDStart = function () {
        this.starttime = new Date().getTime();
        this.setStorage(GameConst.localdata_key_reward_cd, this.starttime + "");
    };
    WxApi.prototype.getRewardCD = function () {
        var nowtime = new Date().getTime();
        if (this.starttime == null) {
            return 0;
        }
        else {
            return PlayerConst.settingInfo.rewardCD - Math.floor((nowtime - this.starttime) / 1000);
        }
    };
    /** 预加载激励视频 */
    WxApi.prototype.initRewardVideoAd = function () {
        var _this = this;
        var wx = window["wx"];
        if (wx == null) {
            return;
        }
        this.rewardAd = wx.createRewardedVideoAd({ adUnitId: GameConst.rewardAdId });
        this.rewardAd.onLoad(function () {
            console.log('激励视频 广告加载成功');
        });
        this.rewardAd.onError(function (err) {
            platform.toast("广告拉取失败，请稍后尝试");
        });
        this.rewardAd.onClose(function (res) {
            // 用户点击了【关闭广告】按钮
            var state;
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            if (res && res.isEnded || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                state = 0;
                // this.rewardAdCDStart();
            }
            else {
                // 播放中途退出，不下发游戏奖励
                state = 1;
            }
            _this.dispatchGameEvent(GameEvent.REWARDAD_CLOSE_EVENT, state);
        });
    };
    /** 观看视频 关闭视频监听GameEvent.REWARDAD_CLOSE_EVENT
     * @param type 观看视频来源类型 WATCHTYPE.XXXX
     */
    WxApi.prototype.showRewardAd = function (type) {
        var _this = this;
        this.adtype = type;
        if (this.rewardAd != null) {
            try {
                this.rewardAd.show()
                    .catch(function (err) {
                    _this.toast("广告加载失败");
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
        if (eventname == GameEvent.REWARDAD_CLOSE_EVENT && data == 2) {
            this.toast("暂无视频可观看，过会再来看看吧");
        }
        var event = new GameEvent(eventname);
        event.data = { type: this.adtype, data: data };
        this.dispatchEvent(event);
    };
    return WxApi;
}(egret.EventDispatcher));
__reflect(WxApi.prototype, "WxApi");
//# sourceMappingURL=WxApi.js.map