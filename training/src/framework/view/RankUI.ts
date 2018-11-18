module fw {
	export class RankUI extends BaseUI {
		public constructor() {
			super("RankSkin");
		}

		private img_rankgp: eui.Image;
		private lbl_title: eui.Label;
		private lbl_2: eui.Label;

		//世界排行
		private scroller_world: eui.Scroller;
		private list_world: eui.List;
		private gp_world: eui.Group;
		private img_tag1: eui.Image;
		private img_tag2: eui.Image;
		private lbl_tag1: eui.Label;
		private lbl_tag2: eui.Label;
		private list: eui.List;
		private btn1: eui.Button;
		private btn2: eui.Button;
		private btn3: eui.Button;

		private shareticket: string;
		private openworld: boolean;
		/** 世界排行 */
		private arr_data: eui.ArrayCollection;
		/** 按钮中的小类型 */
		private arr_data1: eui.ArrayCollection;
		/** 0好友排行 1世界排行  */
		private ranktype: number;
		/** 当前类型 1舒尔特 2趣味 3速记 */
		private crttype: number;
		private rankkey: string = "score_1_3";

		protected childrenCreated() {
			super.childrenCreated();
			console.log("childrenCreated");
		}

		protected checkFit() {
			this.height = this.rect_bg.height = GameConst.GameStage.stageHeight;;
		}

		/** 打开UI时的附带参数 */
		protected setParams(params: any) {
			super.setParams(params);

			this.shareticket = this.args != null ? this.args.shareticket : null;
			this.openworld = this.args != null ? this.args.openworld : false;
		}

		protected initView() {
			platform.bannerhide();
			this.list.itemRenderer = RankTypeItemUI;
			this.arr_data = new eui.ArrayCollection();
			this.arr_data1 = new eui.ArrayCollection();
			this.data = GameTrainLogic.getInstance().getMissionData();
			this.crttype = 1;
			this.initList();
			if (this.openworld) {
				this.lbl_tag1.text = this.shareticket != null ? "群排行" : "好友排行";
				this.gp_world.visible = true;
				this.lbl_title.visible = false;
				this.initOpenRank();

				this.list_world.itemRenderer = RankItemUI;
				this.arr_data = new eui.ArrayCollection();
			}
			else {
				this.lbl_title.text = this.shareticket != null ? "群排行榜" : "好友排行榜";
				this.initOpenRank();
			}

		}

		private initOpenRank() {
			this.scroller_world.visible = false;
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
		}

		private initWorldRank() {
			this.scroller_world.visible = true;
			this.ranktype = 1;
			this.img_tag1.alpha = 0;
			this.img_tag2.alpha = 1;
			this.lbl_tag1.textColor = 0xffffff;
			this.lbl_tag2.textColor = 0x000000;

			if (this.bmp_context != null) {
				this.bmp_context.visible = false;
			}
		}

		private bmp_context: BitmapOpenDataContext;
		private initDataContext() {
			//开放域主体
			if (platform.isdebug()) {
				return;
			}

			this.bmp_context = new BitmapOpenDataContext();
			this.bmp_context.x = this.bmp_context.y = 0;

			this.addChildAt(this.bmp_context, 4);//盖在底图上面，各种按钮下面

			this.bmp_context.start();

			this.bmp_context.command(UIConst.command_openrank, null, "score_1_3", RANKSORTTYPE.ASC);
		}

		private data: TrainMissionVO[][];


		protected initEvent() {
			this.img_tag1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickOpenRank, this);
			this.img_tag2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickWorldRank, this);
			this.img_rankgp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGroupRank, this);
			HttpCommand.getInstance().addEventListener(HttpEvent.getWorldRank, this.initWorldData, this);
			this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
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
			this.updateRank(i, 1, this.list.getChildAt(0));
		}
		private initList() {
			let arr = this.data[this.crttype];
			if (arr == null || arr.length == 0) {
				return;
			}
			this.arr_data1.removeAll();
			for (let i = 0; i < arr.length; i++) {
				this.arr_data1.addItem(arr[i]);
			}
			this.list.dataProvider = this.arr_data1;
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
		private crtItem: RankTypeItemUI;
		private updateRank(type, id, item) {
			console.log("updateRank:", type, id, item);

			if (this.crtItem != null) {
				this.crtItem.setSelected(false);
			}
			this.crtItem = item;
			if (this.crtItem != null) {
				this.crtItem.setSelected(true);
			}
			this.rankkey = "score_" + type + "_" + id;
			if (this.ranktype == 0) {
				this.bmp_context.command(UIConst.command_openrank, null, this.rankkey, RANKSORTTYPE.ASC, this.shareticket);
			}
			else {
				let t = type + "_" + id;
				HttpCommand.getInstance().getWorldRank(20, 1, t);
			}
		}
		private itemClick(e: eui.ItemTapEvent) {
			let i = e.itemIndex;
			let arr = this.data[this.crttype];
			console.log("itemclick:", i, arr);

			if (arr == null || arr.length == 0) {
				return;
			}
			let vo = arr[i];
			if (vo == null) {
				return;
			}
			let rankkey = "score_" + vo.type + "_" + vo.id;
			this.updateRank(vo.type, vo.id, e.itemRenderer);
		}


		private initWorldData(e: HttpEvent) {
			this.arr_data.removeAll();
			let arr = e.data as string[];
			for (let i = 0; i < arr.length; i++) {
				let data = arr[i];
				let vo = new RankVO();
				vo.rank = i + 1;
				vo.head = data['user']['avatarurl'];
				vo.name = data['user']['nickname'];
				vo.score = data['score'];
				vo.gender = data['user']['gender'];
				vo.date = data['user']['ranking_date'];

				if (vo.score > 0) {
					this.arr_data.addItem(vo);
				}

			}
			this.list_world.dataProvider = this.arr_data;
		}

		private clickOpenRank() {
			if (this.ranktype == 0) {
				return;
			}
			this.initOpenRank();
		}

		private clickWorldRank() {
			if (this.ranktype == 1) {
				return;
			}
			this.initWorldRank();
		}

		private clickGroupRank() {
			WxApi.getInstance().buryingPoint(BuryingPoint.bp_grouprank_click);
			WxApi.getInstance().share(fw.SHARETYPE.GROUPRANK);
		}

		protected clear() {
			super.clear();

			this.img_tag1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickOpenRank, this);
			this.img_tag2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickWorldRank, this);
			this.img_rankgp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGroupRank, this);
			HttpCommand.getInstance().removeEventListener(HttpEvent.getWorldRank, this.initWorldData, this);
			this.btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this.btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this.btn3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemClick, this);

			if (this.bmp_context != null) {
				this.bmp_context.clear();
				this.bmp_context = null;
			}
		}
	}
}
window["RankUI"] = fw.RankUI;