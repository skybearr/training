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
        /** 图片大小 */
        _this.stageW = 750;
        /** 图片大小 */
        _this.stageH = 1334;
        _this.listY = 242;
        _this.listWidth = 640;
        _this.itemHeight = 100;
        _this.itemDis = 0;
        _this.itemNumPerPage = 7;
        _this.myItemDisList = 20;
        _this.scrollView = new egret.ScrollView();
        _this.item_bg_color1 = 0x1f1e23;
        _this.item_bg_color2 = 0x2b2a30;
        _this.item_rankx = 40;
        _this.item_rankwidth = 50;
        _this.item_rankheight = 36;
        _this.item_ranksize = 36;
        _this.item_rankcolor = 0xffffff;
        _this.item_rankfont = "SimHei";
        _this.item_headx = 98;
        _this.item_headwidth = 48;
        _this.item_headheight = 48;
        _this.item_namex = 170;
        _this.item_namewidth = 264;
        _this.item_nameheight = 36;
        _this.item_namesize = 30;
        _this.item_namecolor = 0xffffff;
        _this.item_namefont = "SimHei";
        _this.item_scorex = 440;
        _this.item_scorewidth = 150;
        _this.item_scoreheight = 36;
        _this.item_scoresize = 36;
        _this.item_scorecolor = 0xffffff;
        _this.item_scorefont = "SimHei";
        var arr = [];
        if (arr[-1] == null) {
            console.log(111111);
            return _this;
        }
        else if (1 == 1) {
            return _this;
        }
        return _this;
        // wx.onMessage(data => {
        //     console.log("openData:onMessage:", data);
        //     let command = data.command;
        //     this.userinfo = data.userinfo;
        //     this.stageW = data.width;
        //     this.stageH = data.height;
        //     this.shareTicket = data.shareTicket;
        //     this.sorttype = data.sorttype;
        //     this.sortkey = data.sortkey;
        //     this.params = data.params;
        //     //先清空所有
        //     this.closeCloud();
        //     /** 自适应 */
        //     this.initBg();
        //     switch (command) {
        //         case "openrank"://开启好友排行
        //             this.initRankData();
        //             this.shareTicket == null ? this.openFriendCloud() : this.openGroupCloud();
        //             break;
        //         default://其他命令
        //             this.initCommand(command);
        //             break;
        //     }
        // });
    }
    Main.prototype.initBg = function () {
        var oldw = this.stage.stageWidth;
        var oldh = this.stage.stageHeight;
        console.log("openData:initBg:", oldw, oldh);
        this.scaleX = oldw / this.stageW;
        this.scaleY = oldh / this.stageH;
    };
    Main.prototype.initCommand = function (command) {
        var _this = this;
        wx.getFriendCloudStorage({
            keyList: [this.sortkey],
            success: function (res) {
                _this.initItemsData(command, res.data);
            },
            fail: function (err) {
                console.log("getFriendCloudStorage:error:", err);
            },
            complete: function () {
                console.log("getFriendCloudStorage:complete:");
            }
        });
    };
    Main.prototype.initItemsData = function (command, dataArray) {
        var url = this.userinfo.avatarUrl != null ? this.userinfo.avatarUrl : "-1";
        //我的排名  从0开始 -1表示我没有成绩不在排行中
        var myrank = -1;
        var mydata;
        var arr = [];
        //去除没有成绩的好友
        for (var i = 0; i < dataArray.length; i++) {
            var data = dataArray[i];
            if (data != null && data.KVDataList != null && data.KVDataList[0] != null) {
                arr.push(data);
            }
        }
        //排序
        arr = arr.sort(this.sortfun);
        if (this.sorttype == 1) {
            arr.reverse();
        }
        //找到我的位置
        for (var i = 0; i < arr.length; i++) {
            var data = arr[i];
            if (url == data.avatarUrl) {
                mydata = data;
                myrank = i;
            }
        }
        switch (command) {
            case "nextscore"://下一个比自己高的 必要额外参数：当前分数
                this.initNextScore(arr);
                break;
            case "exceed"://超越了一个比自己高的 必要额外参数：当前分数和上一个分数
                this.initExceed(myrank, arr);
                break;
            case "near"://结算分段附近好友分段
                this.initNear(myrank, arr);
                break;
            case "exceedfriend"://结算超越了多少好友
                this.initExceedFriend(myrank, arr);
                break;
        }
    };
    /** 下一个比自己高的 必要额外参数：当前分数
     * @param myrank 我的排名 0开始   -1表示未入榜
     * @param dataArray 所有有成绩的排行
     */
    Main.prototype.initNextScore = function (dataArray) {
        var _this = this;
        console.log("initNextScore:", dataArray);
        var next;
        var myscore = parseInt(this.params.myscore);
        for (var i = 0; i < dataArray.length; i++) {
            var data = dataArray[i];
            var kvs = data.KVDataList;
            var kvo = {};
            for (var j = 0; j < kvs.length; j++) {
                var o = kvs[j];
                if (o.key == this.sortkey) {
                    var value = parseInt(o.value);
                    //升序时，第一个成绩比我小的前面一个就是next
                    if (this.sorttype == 1 && myscore < value) {
                        next = dataArray[i - 1];
                        break;
                    }
                    else if (this.sorttype == 2 && myscore < value) {
                        break;
                    }
                }
            }
        }
        if (next == null) {
            next = dataArray[dataArray.length - 1];
        }
        if (next != null) {
            var item_1 = new egret.DisplayObjectContainer();
            item_1.x = this.params.x;
            item_1.y = this.params.y;
            this.addChild(item_1);
            //底
            var shape = new egret.Shape();
            shape.graphics.beginFill(0x1f1e23);
            shape.graphics.drawRect(0, 0, this.params.w, this.params.h);
            shape.graphics.endFill();
            item_1.addChild(shape);
            var tfh_1 = (this.params.h - this.params.w) / 2;
            //即将超越
            var tf = this.createTextFieldNew(null, 0, this.params.w, null, this.params.w, tfh_1, 0xffffff, 24);
            tf.text = "即将超越";
            item_1.addChild(tf);
            //头像
            var imageLoader = new egret.ImageLoader();
            imageLoader.once(egret.Event.COMPLETE, function (event) {
                var imageLoader = event.currentTarget;
                var tr = new egret.Texture();
                tr._setBitmapData(imageLoader.data);
                var bmp_head = _this.createBitmapNew(tr, null, tfh_1, _this.params.w, null, 0, _this.params.w, _this.params.w);
                item_1.addChild(bmp_head);
            }, this);
            imageLoader.load(next.avatarUrl);
            //昵称
            var tf_name = this.createTextFieldNew(null, this.params.w + tfh_1, this.params.w, null, this.params.w, tfh_1, 0xffffff, 24);
            tf_name.text = this.formatNameString(this.checkSpeName(next.nickname));
            item_1.addChild(tf_name);
        }
    };
    /** 超越了一个比自己高的 必要额外参数：当前分数和上一个分数
     * @param myrank 我的排名 0开始   -1表示未入榜
     * @param dataArray 所有有成绩的排行
     */
    Main.prototype.initExceed = function (myrank, dataArray) {
        var _this = this;
        console.log("initNextScore:", myrank, dataArray);
        var i = myrank + 1;
        var next = i >= 0 ? dataArray[i] : null;
        if (next != null) {
            var item_2 = new egret.DisplayObjectContainer();
            item_2.x = this.params.x;
            item_2.y = this.params.y;
            this.addChild(item_2);
            //底
            var shape = new egret.Shape();
            shape.graphics.beginFill(0x1f1e23);
            shape.graphics.drawRect(0, 0, this.params.w, this.params.h);
            shape.graphics.endFill();
            item_2.addChild(shape);
            var tfh_2 = (this.params.h - this.params.w) / 2;
            //即将超越
            var tf = this.createTextFieldNew(null, 0, this.params.w, null, this.params.w, tfh_2, 0xffffff, 24);
            tf.text = "即将超越";
            item_2.addChild(tf);
            //头像
            var imageLoader = new egret.ImageLoader();
            imageLoader.once(egret.Event.COMPLETE, function (event) {
                var imageLoader = event.currentTarget;
                var tr = new egret.Texture();
                tr._setBitmapData(imageLoader.data);
                var bmp_head = _this.createBitmapNew(tr, null, tfh_2, _this.params.w, null, 0, _this.params.w, _this.params.w);
                item_2.addChild(bmp_head);
            }, this);
            imageLoader.load(next.avatarUrl);
            //昵称
            var tf_name = this.createTextFieldNew(null, this.params.w + tfh_2, this.params.w, null, this.params.w, tfh_2, 0xffffff, 24);
            tf_name.text = this.formatNameString(this.checkSpeName(next.nickname));
            item_2.addChild(tf_name);
        }
    };
    /** 结算分段附近好友分段
     * @param myrank 我的排名 0开始   -1表示未入榜
     * @param dataArray 所有有成绩的排行
     */
    Main.prototype.initNear = function (myrank, dataArray) {
        var _this = this;
        var i = myrank + 1;
        var next = dataArray[i];
        if (next != null) {
            var item_3 = new egret.DisplayObjectContainer();
            this.addChild(item_3);
            //底
            var shape = new egret.Shape();
            shape.graphics.beginFill(0x1f1e23);
            shape.graphics.drawRect(0, 0, this.stageW, this.stageH);
            shape.graphics.endFill();
            item_3.addChild(shape);
            //排名，123名颜色区分
            var color = this.item_rankcolor;
            if (i == 0) {
                color = 0xff094c;
            }
            else if (i == 1) {
                color = 0xff5317;
            }
            else if (i == 2) {
                color = 0xffe117;
            }
            var tf_rank = this.createTextField(this.item_rankx, item_3.height, this.item_rankwidth, this.item_rankheight, color, this.item_rankfont, this.item_ranksize);
            tf_rank.text = i == -1 ? "" : (i + 1) + "";
            // item.addChild(tf_rank);
            //头像
            var imageLoader = new egret.ImageLoader();
            imageLoader.once(egret.Event.COMPLETE, function (event) {
                var imageLoader = event.currentTarget;
                var tr = new egret.Texture();
                tr._setBitmapData(imageLoader.data);
                var bmp_head = _this.createBitmap(tr, _this.item_headx, item_3.height, _this.item_headwidth, _this.item_headheight);
                item_3.addChild(bmp_head);
            }, this);
            imageLoader.load(next.avatarUrl);
            //昵称
            var tf_name = this.createTextField(this.item_namex, item_3.height, this.item_namewidth, this.item_nameheight, this.item_namecolor, this.item_namefont, this.item_namesize, "left");
            tf_name.text = this.formatNameString(this.checkSpeName(next.nickname));
            item_3.addChild(tf_name);
        }
    };
    /** 结算超越了多少好友
     * @param myrank 我的排名 0开始   -1表示未入榜
     * @param dataArray 所有有成绩的排行
     */
    Main.prototype.initExceedFriend = function (myrank, dataArray) {
        var _this = this;
        var i = myrank + 1;
        var next = dataArray[i];
        if (next != null) {
            var item_4 = new egret.DisplayObjectContainer();
            this.addChild(item_4);
            //底
            var shape = new egret.Shape();
            shape.graphics.beginFill(0x1f1e23);
            shape.graphics.drawRect(0, 0, this.stageW, this.stageH);
            shape.graphics.endFill();
            item_4.addChild(shape);
            //排名，123名颜色区分
            var color = this.item_rankcolor;
            if (i == 0) {
                color = 0xff094c;
            }
            else if (i == 1) {
                color = 0xff5317;
            }
            else if (i == 2) {
                color = 0xffe117;
            }
            var tf_rank = this.createTextField(this.item_rankx, item_4.height, this.item_rankwidth, this.item_rankheight, color, this.item_rankfont, this.item_ranksize);
            tf_rank.text = i == -1 ? "" : (i + 1) + "";
            // item.addChild(tf_rank);
            //头像
            var imageLoader = new egret.ImageLoader();
            imageLoader.once(egret.Event.COMPLETE, function (event) {
                var imageLoader = event.currentTarget;
                var tr = new egret.Texture();
                tr._setBitmapData(imageLoader.data);
                var bmp_head = _this.createBitmap(tr, _this.item_headx, item_4.height, _this.item_headwidth, _this.item_headheight);
                item_4.addChild(bmp_head);
            }, this);
            imageLoader.load(next.avatarUrl);
            //昵称
            var tf_name = this.createTextField(this.item_namex, item_4.height, this.item_namewidth, this.item_nameheight, this.item_namecolor, this.item_namefont, this.item_namesize, "left");
            tf_name.text = this.formatNameString(this.checkSpeName(next.nickname));
            item_4.addChild(tf_name);
        }
    };
    /** ------------------------------ 排行榜 ----------------------------------------------------------- */
    Main.prototype.initRankData = function () {
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
            keyList: [this.sortkey],
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
            keyList: [this.sortkey],
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
        this.removeChildren();
        this.scrollView.removeContent();
    };
    Main.prototype.initItems = function (datarray, friend) {
        console.log("initItems:", datarray);
        var listContainer = new egret.DisplayObjectContainer();
        this.scrollView.setContent(listContainer);
        this.scrollView.width = this.listWidth;
        this.scrollView.height = this.listHeight;
        this.scrollView.x = (this.stageW - this.scrollView.width) / 2;
        this.addChild(this.scrollView);
        var url = this.userinfo.avatarUrl != null ? this.userinfo.avatarUrl : "-1";
        var myrank = -1;
        var mydata;
        var arr = [];
        for (var i = 0; i < datarray.length; i++) {
            var data = datarray[i];
            if (data != null && data.KVDataList != null && data.KVDataList[0] != null) {
                arr.push(data);
            }
        }
        arr = arr.sort(this.sortfun);
        if (this.sorttype == 1) {
            arr.reverse();
        }
        for (var i = 0; i < arr.length; i++) {
            var data = arr[i];
            if (url == data.avatarUrl) {
                console.log("myrank:", myrank);
                mydata = data;
                myrank = i;
            }
            var item = this.addItem(i, data);
            item.y = i * (this.itemHeight + this.itemDis);
            listContainer.addChild(item);
        }
        this.scrollView.y = this.listY;
        this.initMyItem(myrank, mydata);
    };
    //分数按从高到低排序
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
        if (datarray == null || this.userinfo == null || this.userinfo.avatarUrl == null) {
            return;
        }
        var data = {};
        data['avatarUrl'] = this.userinfo.avatarUrl;
        data['nickname'] = this.userinfo.nickname;
        data['KVDataList'] = datarray.KVDataList;
        var item = this.addItem(i, data);
        item.x = (this.stageW - item.width) / 2;
        item.y = this.myItemY;
        this.addChild(item);
    };
    Main.prototype.addItem = function (i, data) {
        var _this = this;
        var kvs = data.KVDataList;
        var kvo = {};
        if (kvs == null || kvs.length == 0) {
            kvo[this.sortkey] = "未上榜";
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
        shape.graphics.beginFill(i % 2 == 0 ? this.item_bg_color1 : this.item_bg_color2);
        shape.graphics.drawRect(0, 0, this.itemWidth, this.itemHeight);
        shape.graphics.endFill();
        item.addChild(shape);
        //排名，123名颜色区分
        var color = this.item_rankcolor;
        if (i == 0) {
            color = 0xff094c;
        }
        else if (i == 1) {
            color = 0xff5317;
        }
        else if (i == 2) {
            color = 0xffe117;
        }
        var tf_rank = this.createTextField(this.item_rankx, item.height, this.item_rankwidth, this.item_rankheight, color, this.item_rankfont, this.item_ranksize);
        tf_rank.text = i == -1 ? "" : (i + 1) + "";
        item.addChild(tf_rank);
        //头像
        var imageLoader = new egret.ImageLoader();
        imageLoader.once(egret.Event.COMPLETE, function (event) {
            var imageLoader = event.currentTarget;
            var tr = new egret.Texture();
            tr._setBitmapData(imageLoader.data);
            var bmp_head = _this.createBitmap(tr, _this.item_headx, item.height, _this.item_headwidth, _this.item_headheight);
            item.addChild(bmp_head);
        }, this);
        imageLoader.load(data.avatarUrl);
        //昵称
        var tf_name = this.createTextField(this.item_namex, item.height, this.item_namewidth, this.item_nameheight, this.item_namecolor, this.item_namefont, this.item_namesize, "left");
        tf_name.text = this.formatNameString(this.checkSpeName(data.nickname));
        item.addChild(tf_name);
        //分数
        var tf_score = this.createTextField(this.item_scorex, item.height, this.item_scorewidth, this.item_scoreheight, this.item_scorecolor, this.item_scorefont, this.item_scoresize, "right");
        tf_score.text = kvo[this.sortkey];
        item.addChild(tf_score);
        return item;
    };
    Main.prototype.createTextField = function (x, y, w, h, color, font, size, textalign, veralign) {
        if (color === void 0) { color = 0x000000; }
        if (font === void 0) { font = "SimHei"; }
        if (size === void 0) { size = 30; }
        if (textalign === void 0) { textalign = "center"; }
        if (veralign === void 0) { veralign = "middle"; }
        var tf = new egret.TextField();
        tf.touchEnabled = false;
        tf.x = x;
        tf.width = w;
        tf.height = h;
        tf.textColor = color;
        tf.fontFamily = font;
        tf.size = size;
        tf.textAlign = textalign;
        tf.verticalAlign = veralign;
        tf.y = (y - h) / 2; //这个y是指父类的高度，y轴居中
        return tf;
    };
    /**创建文本
     * @param x 如果为
     * @param y
     * @param pw 如果为null  设置x  否则 x=(pw-w)/2
     * @param ph 如果为null  设置y  否则 y=(ph-h)/2
     */
    Main.prototype.createTextFieldNew = function (x, y, pw, ph, w, h, color, size, font, textalign, veralign) {
        if (color === void 0) { color = 0xffffff; }
        if (size === void 0) { size = 30; }
        if (font === void 0) { font = "SimHei"; }
        if (textalign === void 0) { textalign = "center"; }
        if (veralign === void 0) { veralign = "middle"; }
        var tf = new egret.TextField();
        if (x != null) {
            tf.x = x;
        }
        if (y != null) {
            tf.y = y;
        }
        if (pw != null) {
            tf.x = (pw - w) / 2;
        }
        if (ph != null) {
            tf.y = (ph - h) / 2;
        }
        if (w != null) {
            tf.width = w;
        }
        if (h != null) {
            tf.height = h;
        }
        tf.textColor = color;
        tf.size = size;
        tf.fontFamily = font;
        tf.textAlign = textalign;
        tf.verticalAlign = veralign;
        tf.touchEnabled = false;
        return tf;
    };
    Main.prototype.createBitmap = function (tr, x, y, w, h) {
        var bmp = new egret.Bitmap(tr);
        bmp.touchEnabled = false;
        bmp.x = x;
        bmp.width = w;
        bmp.height = h;
        bmp.y = (y - h) / 2; //这个y是指父类的高度，y轴居中
        return bmp;
    };
    /**创建图片
     * @param res 资源名
     * @param x 如果不为null，则设置为x
     * @param y 如果不为null，则设置为y
     * @param pw 如果为null  设置x  否则 x=(pw-w)/2
     * @param ph 如果为null  设置y  否则 y=(ph-h)/2
     * @param center 锚点 默认0左上角
     * @param w 图片宽 默认初始宽度
     * @param h 图片高 默认初始高度
    
     */
    Main.prototype.createBitmapNew = function (tr, x, y, pw, ph, center, w, h) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (pw === void 0) { pw = null; }
        if (ph === void 0) { ph = null; }
        if (center === void 0) { center = 0; }
        if (w === void 0) { w = null; }
        if (h === void 0) { h = null; }
        var bmp = new egret.Bitmap(tr);
        if (w != null) {
            bmp.width = w;
        }
        if (h != null) {
            bmp.height = h;
        }
        if (center % 3 == 1) {
            bmp.anchorOffsetX = bmp.width / 2;
        }
        else if (center % 3 == 2) {
            bmp.anchorOffsetX = bmp.width;
        }
        var i = Math.floor(center / 3);
        if (i == 1) {
            bmp.anchorOffsetY = bmp.height / 2;
        }
        else if (i == 2) {
            bmp.anchorOffsetY = bmp.height;
        }
        if (x != null) {
            bmp.x = x;
        }
        if (y != null) {
            bmp.y = y;
        }
        if (pw != null) {
            bmp.x = (pw - w) / 2;
        }
        if (ph != null) {
            bmp.y = (ph - h) / 2;
        }
        return bmp;
    };
    /**处理一些特殊字符导致的无法显示的名字 */
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
    /**名字太长改为xxx.. */
    Main.prototype.formatNameString = function (str) {
        var len = 0;
        var newstr = "";
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
                len += 2;
            }
            else {
                len++;
            }
            newstr += str.charAt(i);
            if (len > 12 && i < str.length - 1) {
                return newstr + "..";
            }
        }
        return str;
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map