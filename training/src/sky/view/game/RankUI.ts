class RankUI extends BaseUI {
	public constructor(ticket: string = null) {
		super("RankSkin");
		this.shareticket = ticket;
		this.skinName = "RankSkin";
	}

	private rect_bg: eui.Rect;
	private img_close: eui.Image;
	private img_rankgp: eui.Image;
	private lbl_title: eui.Label;
	private lbl_2: eui.Label;
	private list:eui.List;
	private btn1:eui.Button;
	private btn2:eui.Button;
	private btn3:eui.Button;

	private crtItem:RankTypeItemUI;

	private shareticket: string;

	/**初始化数据 */
	protected initData() {
		this.list.itemRenderer = RankTypeItemUI;
		this.arr_data = new eui.ArrayCollection();
	}

	protected checkFit(){
		this.rect_bg.height = GameLogic.getInstance().GameStage.stageHeight;
	}

	protected initView() {
		this.lbl_title.text = this.shareticket != null ? "群排行榜" : "好友排行榜";
		this.data = GameLogic.getInstance().getMissionData();
		this.crttype = 1;
		this.initList();
		this.validateNow();
		this.initDataContext();
	}
	private initList() {
		let arr = this.data[this.crttype];
		if (arr == null || arr.length == 0) {
			return;
		}
		this.arr_data.removeAll();
		for (let i = 0; i < arr.length; i++) {
			this.arr_data.addItem(arr[i]);
		}
		this.list.dataProvider = this.arr_data;
		this.initBtn();
	}
	private initBtn() {
		for (let i = 1; i <= 3; i++) {
			let btn: eui.Button = this['btn' + i];
			if (btn != null) {
				btn.filters = this.crttype != i ? FilterUtil.getGrayFilter() : null;
			}
		}
	}


	private arr_data: eui.ArrayCollection;
	private data: MissionVO[][];
	private crttype: number;
	protected initEvent() {
		this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickClose, this);
		this.img_rankgp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGroupRank, this);
		this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnClick,this);
		this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnClick,this);
		this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnClick,this);
		this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemClick, this);
	}

	private btnClick(e: egret.TouchEvent) {
		let i = parseInt(e.currentTarget.name);
		if (this.crttype == i) {
			return;
		}
		this.crttype = i;
		this.initList();
		this.list.validateNow();
		this.updateRank(i,1,this.list.getChildAt(0));
	}
	private itemClick(e: eui.ItemTapEvent) {
		let i = e.itemIndex;
		let arr = this.data[this.crttype];
		console.log("itemclick:",i,arr);
		
		if (arr == null || arr.length == 0) {
			return;
		}
		let vo = arr[i];
		if (vo == null) {
			return;
		}
		let rankkey = "score_" + vo.type + "_" + vo.id;
		this.updateRank(vo.type,vo.id,e.itemRenderer);
	}

	private bmp_context: egret.Bitmap;
	private bitmapdata: egret.BitmapData;
	private initDataContext() {
		//开放域主体
		let platform: any = window.platform;
		if (platform.openDataContext == null) {
			return;
		}
		// this.bmp_context = platform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight);

		this.bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
		this.bitmapdata.$deleteSource = false;
		const texture = new egret.Texture();
		texture._setBitmapData(this.bitmapdata);
		this.bmp_context = new egret.Bitmap(texture);
		this.bmp_context.width = GameConst.GameStage.stageWidth;
		this.bmp_context.height = GameConst.GameStage.stageHeight;
		this.bmp_context.x = this.bmp_context.y = 0;

		this.addChildAt(this.bmp_context, 4);//盖在底图上面，各种按钮下面

		egret.stopTick(this.tickerHandler, this);
		egret.startTick(this.tickerHandler, this);

		this.updateRank(1,3,this.list.getChildAt(2));
	}

	private updateRank(type,id,item) {
		console.log("updateRank:",type,id,item);
		
		if(this.crtItem != null){
			this.crtItem.setSelected(false);
		}
		this.crtItem = item;
		if(this.crtItem != null){
			this.crtItem.setSelected(true);
		}
		let rankkey = "score_" + type + "_" + id;
		WxApi.getInstance().postToDataContext({
			shareTicket: this.shareticket,
			userinfo: WxApi.getInstance().userInfo,
			stageW: GameConst.GameStage.stageWidth,
			stageH: GameConst.GameStage.stageHeight,
			rankkey: rankkey,
			command: "open"
		})
	}

	private tickerHandler(timeStarmp: number): boolean {
		egret.WebGLUtils.deleteWebGLTexture(this.bitmapdata.webGLTexture);
		this.bitmapdata.webGLTexture = null;
		return false;
	}


	private clickGroupRank() {
		WxApi.getInstance().share("grouprank=1");
	}

	private clickClose() {
		if (this.parent != null) {
			this.parent.removeChild(this);
		}
	}

	protected clear() {
		super.clear();

		this.img_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickClose, this);
		this.img_rankgp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGroupRank, this);
		this.btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.btnClick,this);
		this.btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.btnClick,this);
		this.btn3.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.btnClick,this);
		this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemClick, this);

		WxApi.getInstance().postToDataContext({
			command: "close"
		});

		if (this.bmp_context != null && this.bmp_context.parent != null) {
			this.bmp_context.parent.removeChild(this.bmp_context);
		}
		egret.stopTick(this.tickerHandler, this);
		this.bmp_context = null;
		this.bitmapdata = null;

	}
}
window["RankUI"] = RankUI;