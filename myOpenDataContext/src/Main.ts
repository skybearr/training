class Main extends egret.DisplayObjectContainer {

    /** 用户信息 */
    private userinfo: any;
    /** 群id */
    private shareTicket: string;
    /**排序规则 1升序 2降序 */
    private sorttype: number;
    /** 排行榜的key */
    private sortkey: string;
    /** 其他参数 */
    private params: any;

    /** 图片大小 */
    private stageW: number = 750;
    /** 图片大小 */
    private stageH: number = 1334;

    private listY: number = 242;
    private listWidth: number = 640;
    private listHeight: number;
    private itemWidth: number;
    private itemHeight: number = 100;
    private itemDis: number = 0;
    private itemNumPerPage: number = 7;
    private myItemY: number;
    private myItemDisList: number = 20;

    constructor() {
        super();

        wx.onMessage(data => {
            console.log("openData:onMessage:", data);
            let command = data.command;
            this.userinfo = data.userinfo;
            this.stageW = data.width;
            this.stageH = data.height;
            this.shareTicket = data.shareTicket;
            this.sorttype = data.sorttype;
            this.sortkey = data.sortkey;
            this.params = data.params;

            //先清空所有
            this.closeCloud();

            /** 自适应 */
            this.initBg();

            switch (command) {
                case "openrank"://开启好友排行
                    this.initRankData();
                    this.shareTicket == null ? this.openFriendCloud() : this.openGroupCloud();
                    break;
                default://其他命令
                    this.initCommand(command);
                    break;
            }
        });
    }

    private initBg() {
        let oldw = this.stage.stageWidth;
        let oldh = this.stage.stageHeight;
        console.log("openData:initBg:", oldw, oldh);

        this.scaleX = oldw / this.stageW;
        this.scaleY = oldh / this.stageH;
    }

    private initCommand(command: string) {
        wx.getFriendCloudStorage({
            keyList: [this.sortkey],
            success: res => {
                this.initItemsData(command, res.data);
            },
            fail: err => {
                console.log("getFriendCloudStorage:error:", err);
            },
            complete: () => {
                console.log("getFriendCloudStorage:complete:");
            }
        });

    }

    private initItemsData(command, dataArray: any[]) {
        let url = this.userinfo.avatarUrl != null ? this.userinfo.avatarUrl : "-1"
        //我的排名  从0开始 -1表示我没有成绩不在排行中
        let myrank = -1;
        let mydata;

        let arr = [];
        //去除没有成绩的好友
        for (let i = 0; i < dataArray.length; i++) {
            let data = dataArray[i];
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
        for (let i: number = 0; i < arr.length; i++) {
            let data = arr[i];
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
    }

    /** 下一个比自己高的 必要额外参数：当前分数
     * @param myrank 我的排名 0开始   -1表示未入榜
     * @param dataArray 所有有成绩的排行
     */
    private initNextScore(dataArray: any[]) {
        console.log("initNextScore:", dataArray);

        /** -1表示已经超越了所有人 -2表示好友中没有比自己成绩差的 */
        let nextIndex = -2;
        let myscore = parseInt(this.params.myscore);

        p1: for (let i = 0; i < dataArray.length; i++) {
            let data = dataArray[i];
            let kvs = data.KVDataList;
            let kvo = {};
            for (let j: number = 0; j < kvs.length; j++) {
                let o = kvs[j];
                if (o.key == this.sortkey) {
                    let value = parseInt(o.value);
                    //升序时，第一个成绩比我小的前面一个就是next
                    console.log("compare:", i, myscore, value);

                    if (this.sorttype == 1 && myscore < value) {
                        nextIndex = i == 0 ? -1 : i - 1;
                        break p1;
                    }
                    else if (this.sorttype == 2 && myscore > value) {//降序时，第一个成绩比我大的前面一个就是next
                        nextIndex = i == 0 ? -1 : i - 1;
                        break p1;
                    }
                }
            }
        }
        if (nextIndex == -2) {
            nextIndex = dataArray.length - 1;
        }
        let next = dataArray[nextIndex];
        if (next != null) {
            let item = new egret.DisplayObjectContainer();
            item.x = this.params.x;
            item.y = this.params.y;
            this.addChild(item);

            //底
            let shape: egret.Shape = new egret.Shape();
            shape.graphics.beginFill(0x1f1e23);
            shape.graphics.drawRect(0, 0, this.params.w, this.params.h);
            shape.graphics.endFill();
            item.addChild(shape);

            let tfh = (this.params.h - this.params.w) / 2;
            //即将超越
            let tf = this.createTextFieldNew(null, 0, this.params.w, null, this.params.w, tfh, 0xffffff, 24);
            tf.text = "即将超越";
            item.addChild(tf);

            //头像
            let imageLoader = new egret.ImageLoader();
            imageLoader.once(egret.Event.COMPLETE, (event: egret.Event) => {
                let imageLoader = <egret.ImageLoader>event.currentTarget;
                let tr = new egret.Texture();
                tr._setBitmapData(imageLoader.data);
                let bmp_head = this.createBitmapNew(tr, null, tfh, this.params.w, null, 0, this.params.w, this.params.w);
                item.addChild(bmp_head);
            }, this);
            imageLoader.load(next.avatarUrl);

            //昵称
            let tf_name = this.createTextFieldNew(null, this.params.w + tfh, this.params.w, null, this.params.w, tfh, 0xffffff, 24);
            tf_name.text = this.formatNameString(this.checkSpeName(next.nickname));
            item.addChild(tf_name);
        }
    }

    /** 超越了一个比自己高的 必要额外参数：当前分数和上一个分数
     * @param myrank 我的排名 0开始   -1表示未入榜
     * @param dataArray 所有有成绩的排行
     */
    private initExceed(myrank: number, dataArray: any[]) {
        console.log("initNextScore:", myrank, dataArray);

        let i = myrank + 1;
        let next = i >= 0 ? dataArray[i] : null;
        if (next != null) {
            let item = new egret.DisplayObjectContainer();
            item.x = this.params.x;
            item.y = this.params.y;
            this.addChild(item);

            //底
            let shape: egret.Shape = new egret.Shape();
            shape.graphics.beginFill(0x1f1e23);
            shape.graphics.drawRect(0, 0, this.params.w, this.params.h);
            shape.graphics.endFill();
            item.addChild(shape);

            let tfh = (this.params.h - this.params.w) / 2;
            //即将超越
            let tf = this.createTextFieldNew(null, 0, this.params.w, null, this.params.w, tfh, 0xffffff, 24);
            tf.text = "即将超越";
            item.addChild(tf);

            //头像
            let imageLoader = new egret.ImageLoader();
            imageLoader.once(egret.Event.COMPLETE, (event: egret.Event) => {
                let imageLoader = <egret.ImageLoader>event.currentTarget;
                let tr = new egret.Texture();
                tr._setBitmapData(imageLoader.data);
                let bmp_head = this.createBitmapNew(tr, null, tfh, this.params.w, null, 0, this.params.w, this.params.w);
                item.addChild(bmp_head);
            }, this);
            imageLoader.load(next.avatarUrl);

            //昵称
            let tf_name = this.createTextFieldNew(null, this.params.w + tfh, this.params.w, null, this.params.w, tfh, 0xffffff, 24);
            tf_name.text = this.formatNameString(this.checkSpeName(next.nickname));
            item.addChild(tf_name);
        }
    }

    /** 结算分段附近好友分段
     * @param myrank 我的排名 0开始   -1表示未入榜
     * @param dataArray 所有有成绩的排行
     */
    private initNear(myrank: number, dataArray: any[]) {
        let i = myrank + 1;
        let next = dataArray[i];
        if (next != null) {
            let item = new egret.DisplayObjectContainer();
            this.addChild(item);

            //底
            let shape: egret.Shape = new egret.Shape();
            shape.graphics.beginFill(0x1f1e23);
            shape.graphics.drawRect(0, 0, this.stageW, this.stageH);
            shape.graphics.endFill();
            item.addChild(shape);

            //排名，123名颜色区分
            let color = this.item_rankcolor;
            if (i == 0) {
                color = 0xff094c;
            }
            else if (i == 1) {
                color = 0xff5317;
            }
            else if (i == 2) {
                color = 0xffe117;
            }
            let tf_rank = this.createTextField(this.item_rankx, item.height, this.item_rankwidth, this.item_rankheight, color, this.item_rankfont, this.item_ranksize);
            tf_rank.text = i == -1 ? "" : (i + 1) + "";
            // item.addChild(tf_rank);

            //头像
            let imageLoader = new egret.ImageLoader();
            imageLoader.once(egret.Event.COMPLETE, (event: egret.Event) => {
                let imageLoader = <egret.ImageLoader>event.currentTarget;
                let tr = new egret.Texture();
                tr._setBitmapData(imageLoader.data);
                let bmp_head = this.createBitmap(tr, this.item_headx, item.height, this.item_headwidth, this.item_headheight);
                item.addChild(bmp_head);
            }, this);
            imageLoader.load(next.avatarUrl);

            //昵称
            let tf_name = this.createTextField(this.item_namex, item.height, this.item_namewidth, this.item_nameheight, this.item_namecolor, this.item_namefont, this.item_namesize, "left");
            tf_name.text = this.formatNameString(this.checkSpeName(next.nickname));
            item.addChild(tf_name);
        }
    }

    /** 结算超越了多少好友
     * @param myrank 我的排名 0开始   -1表示未入榜
     * @param dataArray 所有有成绩的排行
     */
    private initExceedFriend(myrank: number, dataArray: any[]) {
        let i = myrank + 1;
        let next = dataArray[i];
        if (next != null) {
            let item = new egret.DisplayObjectContainer();
            this.addChild(item);

            //底
            let shape: egret.Shape = new egret.Shape();
            shape.graphics.beginFill(0x1f1e23);
            shape.graphics.drawRect(0, 0, this.stageW, this.stageH);
            shape.graphics.endFill();
            item.addChild(shape);

            //排名，123名颜色区分
            let color = this.item_rankcolor;
            if (i == 0) {
                color = 0xff094c;
            }
            else if (i == 1) {
                color = 0xff5317;
            }
            else if (i == 2) {
                color = 0xffe117;
            }
            let tf_rank = this.createTextField(this.item_rankx, item.height, this.item_rankwidth, this.item_rankheight, color, this.item_rankfont, this.item_ranksize);
            tf_rank.text = i == -1 ? "" : (i + 1) + "";
            // item.addChild(tf_rank);

            //头像
            let imageLoader = new egret.ImageLoader();
            imageLoader.once(egret.Event.COMPLETE, (event: egret.Event) => {
                let imageLoader = <egret.ImageLoader>event.currentTarget;
                let tr = new egret.Texture();
                tr._setBitmapData(imageLoader.data);
                let bmp_head = this.createBitmap(tr, this.item_headx, item.height, this.item_headwidth, this.item_headheight);
                item.addChild(bmp_head);
            }, this);
            imageLoader.load(next.avatarUrl);

            //昵称
            let tf_name = this.createTextField(this.item_namex, item.height, this.item_namewidth, this.item_nameheight, this.item_namecolor, this.item_namefont, this.item_namesize, "left");
            tf_name.text = this.formatNameString(this.checkSpeName(next.nickname));
            item.addChild(tf_name);
        }
    }

    /** ------------------------------ 排行榜 ----------------------------------------------------------- */



    private initRankData() {
        this.listHeight = this.itemHeight * this.itemNumPerPage;
        this.itemWidth = this.listWidth;
        this.myItemY = this.listY + this.listHeight + this.myItemDisList;
    }

    /**好友排行榜 */
    private openFriendCloud() {
        console.log("openFriendCloud");

        wx.getFriendCloudStorage({
            //keylist 需要获取排行榜中的数据的key
            keyList: [this.sortkey],
            success: res => {
                this.initItems(res.data, true)
            },
            fail: err => {
                console.log("getFriendCloudStorage:error:", err);
            },
            complete: () => {
                console.log("getFriendCloudStorage:complete:");
            }
        });
    }
    /**群排行榜 */
    private openGroupCloud() {
        console.log("openGroupCloud");

        wx.getGroupCloudStorage({
            shareTicket: this.shareTicket,
            //keylist 需要获取排行榜中的数据的key
            keyList: [this.sortkey],
            success: res => {
                this.initItems(res.data, false)
            },
            fail: err => {
                console.log("getFriendCloudStorage:error:", err);
            },
            complete: () => {
                console.log("getFriendCloudStorage:complete:");
            }
        });
    }
    private closeCloud(): void {
        console.log("closeCloud", this.numChildren);
        this.removeChildren();
        this.scrollView.removeContent();
    }

    private readonly scrollView = new egret.ScrollView();
    private initItems(datarray, friend) {
        console.log("initItems:", datarray);

        const listContainer = new egret.DisplayObjectContainer();
        this.scrollView.setContent(listContainer);
        this.scrollView.width = this.listWidth;
        this.scrollView.height = this.listHeight;
        this.scrollView.x = (this.stageW - this.scrollView.width) / 2;
        this.addChild(this.scrollView);

        let url = this.userinfo.avatarUrl != null ? this.userinfo.avatarUrl : "-1"
        let myrank = -1;
        let mydata;

        let arr = [];
        for (let i = 0; i < datarray.length; i++) {
            let data = datarray[i];
            if (data != null && data.KVDataList != null && data.KVDataList[0] != null) {
                arr.push(data);
            }
        }

        arr = arr.sort(this.sortfun);
        if (this.sorttype == 1) {
            arr.reverse();
        }
        for (let i: number = 0; i < arr.length; i++) {
            let data = arr[i];
            if (url == data.avatarUrl) {
                console.log("myrank:", myrank);
                mydata = data;
                myrank = i;
            }

            let item = this.addItem(i, data);
            item.y = i * (this.itemHeight + this.itemDis);
            listContainer.addChild(item);
        }

        this.scrollView.y = this.listY;


        // this.initMyItem(myrank, mydata);
    }

    //分数按从高到低排序
    private sortfun(a: any, b: any) {
        if (a.KVDataList[0] == null || b.KVDataList[0] == null) {
            return -1;
        }
        let va = parseInt(a.KVDataList[0].value);
        let vb = parseInt(b.KVDataList[0].value);
        if (va > vb) {
            return -1;
        }
        else {
            return 1;
        }
    }

    private initMyItem(i, datarray) {
        if (datarray == null || this.userinfo == null || this.userinfo.avatarUrl == null) {
            return;
        }
        let data = {};
        data['avatarUrl'] = this.userinfo.avatarUrl;
        data['nickname'] = this.userinfo.nickname;
        data['KVDataList'] = datarray.KVDataList;
        let item = this.addItem(i, data);
        item.x = (this.stageW - item.width) / 2;
        item.y = this.myItemY;

        this.addChild(item);
    }

    private item_bg_color1: number = 0x1f1e23;
    private item_bg_color2: number = 0x2b2a30;

    private item_rankx: number = 40;
    private item_rankwidth: number = 50;
    private item_rankheight: number = 36;
    private item_ranksize: number = 36;
    private item_rankcolor: number = 0xffffff;
    private item_rankfont: string = "SimHei";

    private item_headx: number = 98;
    private item_headwidth: number = 48;
    private item_headheight: number = 48;

    private item_namex: number = 170;
    private item_namewidth: number = 264;
    private item_nameheight: number = 36;
    private item_namesize: number = 30;
    private item_namecolor: number = 0xffffff;
    private item_namefont: string = "SimHei";

    private item_scorex: number = 440;
    private item_scorewidth: number = 150;
    private item_scoreheight: number = 36;
    private item_scoresize: number = 36;
    private item_scorecolor: number = 0xffffff;
    private item_scorefont: string = "SimHei";

    private addItem(i: number, data: any): egret.DisplayObjectContainer {
        let kvs = data.KVDataList;
        let kvo = {};
        if (kvs == null || kvs.length == 0) {
            kvo[this.sortkey] = "未上榜";
            i = -1;
        }
        else {
            for (let j: number = 0; j < kvs.length; j++) {
                let o = kvs[j];
                kvo[o.key] = o.value;
            }
        }

        let item = new egret.DisplayObjectContainer();
        item.touchEnabled = true;
        item.touchChildren = false;
        item.width = this.itemWidth;
        item.height = this.itemHeight;

        //底
        let shape: egret.Shape = new egret.Shape();
        shape.graphics.beginFill(i % 2 == 0 ? this.item_bg_color1 : this.item_bg_color2);
        shape.graphics.drawRect(0, 0, this.itemWidth, this.itemHeight);
        shape.graphics.endFill();
        item.addChild(shape);

        //排名，123名颜色区分
        let color = this.item_rankcolor;
        if (i == 0) {
            color = 0xff094c;
        }
        else if (i == 1) {
            color = 0xff5317;
        }
        else if (i == 2) {
            color = 0xffe117;
        }
        let tf_rank = this.createTextField(this.item_rankx, item.height, this.item_rankwidth, this.item_rankheight, color, this.item_rankfont, this.item_ranksize);
        tf_rank.text = i == -1 ? "" : (i + 1) + "";
        item.addChild(tf_rank);

        //头像
        let imageLoader = new egret.ImageLoader();
        imageLoader.once(egret.Event.COMPLETE, (event: egret.Event) => {
            let imageLoader = <egret.ImageLoader>event.currentTarget;
            let tr = new egret.Texture();
            tr._setBitmapData(imageLoader.data);
            let bmp_head = this.createBitmap(tr, this.item_headx, item.height, this.item_headwidth, this.item_headheight);
            item.addChild(bmp_head);
        }, this);
        imageLoader.load(data.avatarUrl);

        //昵称
        let tf_name = this.createTextField(this.item_namex, item.height, this.item_namewidth, this.item_nameheight, this.item_namecolor, this.item_namefont, this.item_namesize, "left");

        tf_name.text = this.formatNameString(this.checkSpeName(data.nickname));
        item.addChild(tf_name);

        //分数
        let tf_score = this.createTextField(this.item_scorex, item.height, this.item_scorewidth, this.item_scoreheight, this.item_scorecolor, this.item_scorefont, this.item_scoresize, "right");
        tf_score.text = this.getText(kvo[this.sortkey]);
        item.addChild(tf_score);

        return item;
    }
    private getText(t) {
        let s = this.ParseTime2Format(Math.floor(t / 1000), "m:s");
        let hs = t % 1000;
        let ss = "";
        if (hs < 10) {
            ss = "00" + hs;
        }
        else if (hs < 100) {
            ss = "0" + hs;
        }
        else {
            ss = hs + "";;
        }
        return s + ":" + ss;
    }
    private ParseTime2Format(t: number, f: string = "h:m:s"): string {

        var h: number = Math.floor(t / 3600);
        var m: number = Math.floor((t % 3600) / 60);
        var s: number = (t % 3600) % 60;

        function parse_format(t: number): string {
            var s: string = t.toString();
            if (t < 10) {
                s = "0" + t;
            }
            return s;
        }

        if (f.indexOf("h") != -1) {
            f = f.replace(/h/g, parse_format(h));
        } else {
            m += h * 60;
        }
        if (f.indexOf("m") != -1) {
            f = f.replace(/m/g, parse_format(m));
        } else {
            if (f.indexOf("h") != -1) {
                s += m * 60;
            } else {
                s = t;
            }
        }
        if (f.indexOf("s") != -1) {
            f = f.replace(/s/g, parse_format(s));
        }
        return f;
    }

    private createTextField(x, y, w, h, color = 0x000000, font = "SimHei", size = 30, textalign = "center", veralign = "middle"): egret.TextField {
        let tf = new egret.TextField();
        tf.touchEnabled = false;
        tf.x = x;
        tf.width = w;
        tf.height = h;
        tf.textColor = color;
        tf.fontFamily = font;
        tf.size = size;
        tf.textAlign = textalign;
        tf.verticalAlign = veralign;
        tf.y = (y - h) / 2;//这个y是指父类的高度，y轴居中
        return tf;
    }

    /**创建文本
	 * @param x 如果为
	 * @param y
	 * @param pw 如果为null  设置x  否则 x=(pw-w)/2
	 * @param ph 如果为null  设置y  否则 y=(ph-h)/2
	 */
    public createTextFieldNew(x, y, pw, ph, w, h, color = 0xffffff, size = 30, font = "SimHei", textalign = "center", veralign = "middle"): egret.TextField {
        let tf = new egret.TextField();
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
    }

    private createBitmap(tr, x, y, w, h): egret.Bitmap {
        let bmp = new egret.Bitmap(tr);
        bmp.touchEnabled = false;
        bmp.x = x;
        bmp.width = w;
        bmp.height = h;
        bmp.y = (y - h) / 2;//这个y是指父类的高度，y轴居中
        return bmp;
    }

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
    public createBitmapNew(tr, x = 0, y = 0, pw = null, ph = null, center = 0, w = null, h = null): egret.Bitmap {
        let bmp = new egret.Bitmap(tr);
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
        let i = Math.floor(center / 3);
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
    }


    /**处理一些特殊字符导致的无法显示的名字 */
    private checkSpeName(str: string): string {
        let newstr = "";
        let i = 0;
        while (i < str.length) {
            let n = str.charCodeAt(i);
            let s = str.charAt(i);
            i++;
            if (n >= 65024 && n <= 65039) {//变量选择符
                continue;
            }
            newstr += s;
        }
        return newstr;
    }

    /**名字太长改为xxx.. */
    private formatNameString(str: string): string {
        var len = 0;
        let newstr: string = "";
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
                len += 2;
            } else {
                len++;
            }
            newstr += str.charAt(i);
            if (len > 12 && i < str.length - 1) {
                return newstr + "..";
            }
        }
        return str;
    }
}