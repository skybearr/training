class Main extends egret.DisplayObjectContainer {

    private userinfo: any;
    private shareTicket: string;
    private stageW: number = 750;
    private stageH: number = 1334;

    private listY:number = 242;
    private listWidth:number = 640;
    private listHeight:number;
    private itemWidth:number;
    private itemHeight:number = 100;
    private itemDis:number = 0;
    private itemNumPerPage:number = 7;
    private myItemY:number;
    private myItemDisList:number = 20;

    private rankkey:string;

    constructor() {
        super();
        
        wx.onMessage(data => {
            console.log("openData:onMessage:data:", data);
            let command = data['command'];
            this.userinfo = data['userinfo'];
            this.stageW = data['stageW'];
            this.stageH = data['stageH'];
            this.shareTicket = data['shareTicket'];
            this.rankkey = data['rankkey'];
            if(this.rankkey == ""){
                this.rankkey = "score_1_3";
            }
            this.initBg();

            if (command == "open") {
                this.shareTicket ? this.openGroupCloud() : this.openFriendCloud();
            }
            else {
                this.closeCloud();
            }
        });
    }

    private initBg() {
        let oldw = this.stage.stageWidth;
        let oldh = this.stage.stageHeight;
        // if (this.stageW != oldw) {
            this.scaleX = oldw / this.stageW;
        // }
        // if (this.stageH != oldh) {
            this.scaleY = oldh / this.stageH;
        // }

        this.listHeight = this.itemHeight * this.itemNumPerPage;
        this.itemWidth = this.listWidth;
        this.myItemY = this.listY + this.listHeight + this.myItemDisList;

        console.log(this.scaleX,this.scaleY,this.stageW,oldw,this.listHeight,this.itemWidth,this.myItemY);
    }

    /**好友排行榜 */
    private openFriendCloud() {
        console.log("openFriendCloud");

        wx.getFriendCloudStorage({
            //keylist 需要获取排行榜中的数据的key
            keyList: [this.rankkey],
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
            keyList: [this.rankkey],
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
        for (let i = 0, l = this.numChildren; i < l; i++) {
            this.removeChildAt(0);
        }
        this.scrollView.removeContent();
    }

    private readonly scrollView = new egret.ScrollView();
    private initItems(datarray, friend) {
        console.log("initItems:",datarray);

        const listContainer = new egret.DisplayObjectContainer();
        this.scrollView.setContent(listContainer);
        this.scrollView.width = this.listWidth;
        this.scrollView.height = this.listHeight;
        this.scrollView.x = (this.stageW - this.scrollView.width) / 2;
        this.addChild(this.scrollView);

        let url = this.userinfo.avatarUrl != null ? this.userinfo.avatarUrl : "-1"
        

        let arr = [];
        for (let i = 0; i < datarray.length; i++) {
            let data = datarray[i];
            
            if (data != null && data.KVDataList != null && data.KVDataList[0] != null) {
                arr.push(data);
            }
        }
        console.log("arr:",arr.length);
        
        let myrank = -1;
        let mydata;

        arr = arr.sort(this.sortfun);
        for (let i: number = 0; i < arr.length; i++) {
            let data = arr[i];

            if (url == data.avatarUrl) {
                mydata = data;
                myrank = i;
                console.log("myrank:", myrank);
            }
            let item = this.addItem(i, data);
            item.y = i * (this.itemHeight + this.itemDis);
            listContainer.addChild(item);
        }
        console.log("lsitcon:",listContainer.numChildren);
        
        this.scrollView.y = this.listY;

        this.initMyItem(myrank, mydata);
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
        data['nickname'] = this.userinfo.nickName;
        data['KVDataList'] = datarray.KVDataList;
        let item = this.addItem(i, data);
        item.x = (this.stageW - item.width) / 2;
        item.y = this.myItemY;

        this.addChild(item);
    }

    private item_bg_color1:number = 0x1f1e23;
    private item_bg_color2:number = 0x2b2a30;
    
    private item_rankx:number = 40;
    private item_rankwidth:number = 50;
    private item_rankheight:number = 36;
    private item_ranksize:number = 36;
    private item_rankcolor:number = 0xffffff;
    private item_rankfont:string = "SimHei";

    private item_headx:number = 98;
    private item_headwidth:number = 48;
    private item_headheight:number = 48;

    private item_namex:number = 170;
    private item_namewidth:number = 264;
    private item_nameheight:number = 36;
    private item_namesize:number = 30;
    private item_namecolor:number = 0xffffff;
    private item_namefont:string = "SimHei";
    
    private item_scorex:number = 470;
    private item_scorewidth:number = 150;
    private item_scoreheight:number = 36;
    private item_scoresize:number = 36;
    private item_scorecolor:number = 0xffffff;
    private item_scorefont:string = "SimHei";

    private addItem(i: number, data: any): egret.DisplayObjectContainer {
        let kvs = data.KVDataList;
        let kvo = {};
        if (kvs == null || kvs.length == 0) {
            kvo = { score: "未上榜" };
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
        let tf_rank = this.createTextField(this.item_rankx,item.height,this.item_rankwidth,this.item_rankheight,color,this.item_rankfont,this.item_ranksize);
        tf_rank.text = i == -1 ? "" : (i + 1) + "";
        item.addChild(tf_rank);

        //头像
        let imageLoader = new egret.ImageLoader();
        imageLoader.once(egret.Event.COMPLETE, (event: egret.Event) => {
            let imageLoader = <egret.ImageLoader>event.currentTarget;
            let tr = new egret.Texture();
            tr._setBitmapData(imageLoader.data);
            let bmp_head = this.createBitmap(tr,this.item_headx,item.height,this.item_headwidth,this.item_headheight);
            item.addChild(bmp_head);
        }, this);
        imageLoader.load(data.avatarUrl);

        //昵称
        let tf_name = this.createTextField(this.item_namex,item.height,this.item_namewidth,this.item_nameheight,this.item_namecolor,this.item_namefont,this.item_namesize,"left");
        tf_name.text = this.checkSpeName(data.nickname);
        item.addChild(tf_name);

        //分数
        let tf_score = this.createTextField(this.item_scorex,item.height,this.item_scorewidth,this.item_scoreheight,this.item_scorecolor,this.item_scorefont,this.item_scoresize,"right");
        tf_score.text = kvo['score'];
        item.addChild(tf_score);

        return item;
    }

    private createTextField(x,y,w,h,color,font,size,textalign="center",veralign="middle"):egret.TextField{
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

    private createBitmap(tr,x,y,w,h):egret.Bitmap{
        let bmp = new egret.Bitmap(tr);
        bmp.touchEnabled = false;
        bmp.x = x;
        bmp.width = w;
        bmp.height = h;
        bmp.y = (y - h) / 2;//这个y是指父类的高度，y轴居中
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
}