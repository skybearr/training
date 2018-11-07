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
		private me: RankItemUI;

		private shareticket: string;
		private openworld: boolean;
		private arr_data: eui.ArrayCollection;
		private myvo: RankVO;
		/** 0好友排行 1世界排行  */
		private ranktype: number;

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
			this.me = new RankItemUI();
			this.me.horizontalCenter = 0;
			this.me.y = 960;
			this.addChild(this.me);

			if (this.openworld) {
				this.lbl_tag1.text = this.shareticket != null ? "群排行" : "好友排行";
				this.gp_world.visible = true;
				this.lbl_title.visible = false;
				this.initOpenRank();

				this.list_world.itemRenderer = RankItemUI;
				this.arr_data = new eui.ArrayCollection();

				HttpCommand.getInstance().getWorldRank();
			}
			else {
				this.lbl_title.text = this.shareticket != null ? "群排行榜" : "好友排行榜";
				this.initOpenRank();
			}
		}

		private initOpenRank() {
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
		}

		private initWorldRank() {
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

			this.bmp_context.command(UIConst.command_openrank,null,"score_1_3",RANKSORTTYPE.ASC);
		}

		protected initEvent() {
			this.img_tag1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickOpenRank, this);
			this.img_tag2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickWorldRank, this);
			this.img_rankgp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGroupRank, this);
			HttpCommand.getInstance().addEventListener(HttpEvent.getWorldRank, this.initWorldData, this);
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

			if(this.bmp_context != null){
				this.bmp_context.clear();
				this.bmp_context = null;
			}
		}
	}
}
window["RankUI"] = fw.RankUI;