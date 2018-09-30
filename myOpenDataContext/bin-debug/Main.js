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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.stageW = 750;
        _this.stageH = 1334;
        _this.listY = 242;
        _this.listWidth = 640;
        _this.itemHeight = 100;
        _this.itemDis = 0;
        _this.itemNumPerPage = 7;
        _this.myItemDisList = 20;
        _this.scrollView = new egret.ScrollView();
        wx.onMessage(function (data) {
            console.log("openData:onMessage:data:", data);
            var command = data['command'];
            _this.userinfo = data['userinfo'];
            _this.stageW = data['stageW'];
            _this.stageH = data['stageH'];
            _this.shareTicket = data['shareTicket'];
            _this.initBg();
            if (command == "open") {
                _this.shareTicket ? _this.openGroupCloud() : _this.openFriendCloud();
            }
            else {
                _this.closeCloud();
            }
        });
        return _this;
    }
    Main.prototype.initBg = function () {
        var oldw = this.stage.stageWidth;
        var oldh = this.stage.stageHeight;
        if (this.stageW != oldw) {
            this.scaleX = oldw / this.stageW;
        }
        if (this.stageH != oldh) {
            this.scaleY = oldh / this.stageH;
        }
        this.listHeight = this.itemHeight * this.itemNumPerPage;
        this.itemWidth = this.listWidth;
        this.myItemY = this.listY + this.listHeight + this.myItemDisList;
    };
    /**好友排行榜 */
    Main.prototype.openFriendCloud = function () {
        var _this = this;
        console.log("openFriendCloud");
        wx.getFriendCloudStorage({
            //keylist 需要获取排行榜中的数据的key
            keyList: ["score"],
            success: function (res) {
                _this.initItems(res.data, true);
            },
            fail: function (err) {
                console.log("getFriendCloudStorage:error:", err);
            },
            complete: function () {
                console.log("getFriendCloudStorage:complete:");
            }
        });
    };
    /**群排行榜 */
    Main.prototype.openGroupCloud = function () {
        var _this = this;
        console.log("openGroupCloud");
        wx.getGroupCloudStorage({
            shareTicket: this.shareTicket,
            //keylist 需要获取排行榜中的数据的key
            keyList: ["score"],
            success: function (res) {
                _this.initItems(res.data, false);
            },
            fail: function (err) {
                console.log("getFriendCloudStorage:error:", err);
            },
            complete: function () {
                console.log("getFriendCloudStorage:complete:");
            }
        });
    };
    Main.prototype.closeCloud = function () {
        console.log("closeCloud", this.numChildren);
        for (var i = 0, l = this.numChildren; i < l; i++) {
            this.removeChildAt(0);
        }
        this.scrollView.removeContent();
    };
    Main.prototype.initItems = function (datarray, friend) {
        console.log(datarray);
        var listContainer = new egret.DisplayObjectContainer();
        this.scrollView.setContent(listContainer);
        this.scrollView.width = this.listWidth;
        this.scrollView.height = this.listHeight;
        this.scrollView.x = (this.stageW - this.scrollView.width) / 2;
        this.addChild(this.scrollView);
        var url = this.userinfo.avatarUrl != null ? this.userinfo.avatarUrl : "-1";
        var myrank = -1;
        var mydata;
        console.log("myrank:", myrank);
        var arr = [];
        for (var i = 0; i < datarray.length; i++) {
            var data = datarray[i];
            if (url == data.avatarUrl) {
                console.log("myrank:", myrank);
                mydata = data;
                myrank = i;
            }
            if (data != null && data.KVDataList != null && data.KVDataList[0] != null) {
                arr.push(data);
            }
        }
        // datarray = datarray.concat(datarray).concat(datarray).concat(datarray).concat(datarray).concat(datarray).concat(datarray).concat(datarray).concat(datarray).concat(datarray);
        arr = arr.sort(this.sortfun);
        for (var i = 0; i < arr.length; i++) {
            var data = arr[i];
            var item = this.addItem(i, data);
            item.y = i * (this.itemHeight + this.itemDis);
            listContainer.addChild(item);
        }
        this.scrollView.y = this.listY;
        console.log(this.stageH, this.scrollView.height, this.scrollView.y);
        this.initMyItem(myrank, mydata);
        console.log(this.stage, this);
    };
    Main.prototype.sortfun = function (a, b) {
        if (a.KVDataList[0] == null || b.KVDataList[0] == null) {
            return -1;
        }
        var va = parseInt(a.KVDataList[0].value);
        var vb = parseInt(b.KVDataList[0].value);
        if (va > vb) {
            return -1;
        }
        else {
            return 1;
        }
    };
    Main.prototype.initMyItem = function (i, datarray) {
        if (this.userinfo == null || this.userinfo.avatarUrl == null) {
            return;
        }
        var data = {};
        data['avatarUrl'] = this.userinfo.avatarUrl;
        data['nickname'] = this.userinfo.nickName;
        data['KVDataList'] = datarray.KVDataList;
        var item = this.addItem(i, data);
        item.x = (this.stageW - item.width) / 2;
        item.y = this.myItemY;
        this.addChild(item);
    };
    Main.prototype.addItem = function (i, data) {
        var kvs = data.KVDataList;
        var kvo = {};
        if (kvs == null || kvs.length == 0) {
            kvo = { score: "未上榜" };
            i = -1;
        }
        else {
            for (var j = 0; j < kvs.length; j++) {
                var o = kvs[j];
                kvo[o.key] = o.value;
            }
        }
        var item = new egret.DisplayObjectContainer();
        item.touchEnabled = true;
        item.touchChildren = false;
        item.width = this.itemWidth;
        item.height = this.itemHeight;
        //底
        var shape = new egret.Shape();
        shape.graphics.beginFill(i % 2 == 0 ? 0x1f1e23 : 0x2b2a30);
        shape.graphics.drawRect(0, 0, this.itemWidth, this.itemHeight);
        shape.graphics.endFill();
        item.addChild(shape);
        //排名
        var color = 0xffffff;
        if (i == 0) {
            color = 0xff094c;
        }
        else if (i == 1) {
            color = 0xff5317;
        }
        else if (i == 3) {
            color = 0xffe117;
        }
        var tf_rank = new egret.TextField();
        tf_rank.textAlign = "center";
        tf_rank.width = 50;
        tf_rank.height = 36;
        tf_rank.x = 40;
        tf_rank.size = 36;
        tf_rank.textColor = color;
        tf_rank.fontFamily = "SimHei";
        tf_rank.y = (item.height - tf_rank.height) >> 1;
        tf_rank.text = i == -1 ? "" : (i + 1) + "";
        item.addChild(tf_rank);
        //头像
        var imageLoader = new egret.ImageLoader();
        imageLoader.once(egret.Event.COMPLETE, function (event) {
            var imageLoader = event.currentTarget;
            var tr = new egret.Texture();
            tr._setBitmapData(imageLoader.data);
            var bmp_head = new egret.Bitmap(tr);
            bmp_head.width = bmp_head.height = 48;
            bmp_head.x = 98;
            bmp_head.y = (item.height - bmp_head.height) >> 1;
            item.addChild(bmp_head);
        }, this);
        imageLoader.load(data.avatarUrl);
        //昵称
        var tf_name = new egret.TextField();
        tf_name.textAlign = "left";
        tf_name.width = 264;
        tf_name.height = 30;
        tf_name.textColor = 0xffffff;
        tf_name.x = 170;
        tf_name.fontFamily = "SimHei";
        tf_name.y = (item.height - tf_name.height) >> 1;
        tf_name.text = this.checkSpeName(data.nickname);
        item.addChild(tf_name);
        //分数
        var tf_score = new egret.TextField();
        tf_score.textAlign = "left";
        tf_score.width = 117;
        tf_score.height = 36;
        tf_score.textColor = 0xffffff;
        tf_score.size = 36;
        tf_score.x = 470;
        tf_score.fontFamily = "SimHei";
        tf_score.y = (item.height - tf_score.height) >> 1;
        tf_score.text = kvo['score'];
        item.addChild(tf_score);
        return item;
    };
    /**处理一些无法显示的名字 */
    Main.prototype.checkSpeName = function (str) {
        var newstr = "";
        var i = 0;
        while (i < str.length) {
            var n = str.charCodeAt(i);
            var s = str.charAt(i);
            i++;
            if (n >= 65024 && n <= 65039) {
                continue;
            }
            newstr += s;
        }
        return newstr;
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
// // 微信关系数据的获取
// // 上传方法类似、开发者自行填写
// declare namespace wx {
//     /**
//      * 监听消息
//      */
//     const onMessage: (callback: (data: { [key: string]: any }) => void) => void;
//     /**
//      * 拉取当前用户所有同玩好友的托管数据。该接口只可在开放数据域下使用
//      * @param keyList 要拉取的 key 列表
//      * @param success 接口调用成功的回调函数
//      * @param fail 	接口调用失败的回调函数
//      * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
//      */
//     const getFriendCloudStorage: (Object: {
//         keyList?: string[],
//         success?: (res: {
//             data: UserGameData[]
//         }) => void,
//         fail?: (err: any) => void,
//         complete?: () => void,
//     }) => void;
//     const getUserInfo: (Object: {
//         openIdList?: string[],
//         lang: string,
//         success?: (res: any) => void,
//         fail?: (err: any) => void,
//         complete?: () => void,
//     }) => void;
//     const getUserCloudStorage: (Object: {
//         keyList?: string[],
//         success?: (res: UserGameData) => void,
//         fail?: (err: any) => void,
//         complete?: () => void,
//     }) => void;
//     /**
//      * 在小游戏是通过群分享卡片打开的情况下，可以通过调用该接口获取群同玩成员的游戏数据。该接口只可在开放数据域下使用。
//      * @param shareTicket 群分享对应的 shareTicket
//      * @param keyList 要拉取的 key 列表
//      * @param success 接口调用成功的回调函数
//      * @param fail 接口调用失败的回调函数
//      * @param complete 接口调用结束的回调函数（调用成功、失败都会执行）
//      */
//     const getGroupCloudStorage: (Object: {
//         shareTicket: string,
//         keyList: string[],
//         success?: (res: {
//             data: UserGameData[]
//         }) => void,
//         fail?: (err?: any) => void,
//         complete?: () => void,
//     }) => void;
//     /**
//      * 用户数据
//      */
//     type UserGameData = {
//         /** 用户的微信头像 url */
//         avatarUrl: string,
//         /** 用户的微信昵称 */
//         nickName: string,
//         /** 用户的 openId */
//         openId: string,
//         /**用户自定义数据 */
//         KVList: KVData[]
//     }
//     type KVData = {
//         key: string,
//         value: string
//     }
// } 
