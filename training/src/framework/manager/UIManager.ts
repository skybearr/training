module fw {
	export class UIManager extends egret.EventDispatcher {
		public constructor() {
			super();
			this.init();
		}

		private static _instance: UIManager;
		public static getInstance(): UIManager {
			if (this._instance == null) {
				this._instance = new UIManager();
			}
			return this._instance;
		}

		/**主容器*/
		public main: eui.UILayer;
		/** 二级界面容器 */
		public secCon:egret.DisplayObjectContainer;

		/**战斗*/
		public fightCon: egret.DisplayObjectContainer;

		/**世界公告*/
		public broadcastCon: egret.DisplayObjectContainer;

		/**网络请求loading*/
		public loadingCon: egret.DisplayObjectContainer;

		/**剧情avg*/
		public avgCon: egret.DisplayObjectContainer;

		private init() {
			this.secCon = new egret.DisplayObjectContainer();
			this.broadcastCon = new egret.DisplayObjectContainer();
			this.fightCon = new egret.DisplayObjectContainer();
			this.loadingCon = new egret.DisplayObjectContainer();
			this.avgCon = new egret.DisplayObjectContainer();

			if (GameConst.GameStage != null) {
				GameConst.GameStage.addChild(this.secCon);
				GameConst.GameStage.addChild(this.broadcastCon);
				GameConst.GameStage.addChild(this.fightCon);
				GameConst.GameStage.addChild(this.avgCon);
				GameConst.GameStage.addChild(this.loadingCon);
			}
		}


		/**正在进行UI打开关闭动画，不能操作*/
		private is_fst_ui_tween: boolean;
		private is_sec_ui_tween:boolean;
		/**打开界面
		 * @param uiname 类名 在UIConst中定义
		 * @param uitype UI类型 fw.UITYPE.FIRST / SECOND
		 */
		public openUI(uiname: string, params: any = null, uitype: number = 1, tweentype: number = 0) {
			if( (uitype == fw.UITYPE.FIRST && this.is_fst_ui_tween) || (uitype == fw.UITYPE.SECOND && this.is_sec_ui_tween)){
				console.log("正在打开界面，禁止操作");
				return;
			}
			if(uitype == fw.UITYPE.FIRST){
				this.is_fst_ui_tween = true;
			}
			else{
				this.is_sec_ui_tween = true;
			}

			let obj_class: any = egret.getDefinitionByName(uiname);
			let obj = { params: params, tweentype: tweentype };
			let ui = new obj_class(obj);

			ui.setParams(obj);

			if (uitype == fw.UITYPE.FIRST) {
				this.openFirstUI(ui, tweentype);
			}
			else {
				this.openSecondUI(ui, tweentype);
			}

		}

		/** 打开2级界面
		 * @param ui
		 * @param tweentype 动画类型 默认1 小到大渐变
		 */
		private openFirstUI(ui, tweentype = 1) {
			this.main.addChild(ui);
			this.secCon.removeChildren();
			if (this.main.numChildren == 0) {
				this.openFirstUIFinish();
				return;
			}
			//只接受一个一级界面存在，所以当大于一个的时候，先移除底下多余的
			while (this.main.numChildren > 1) {
				this.main.removeChildAt(0);
			}

			switch (tweentype) {
				case TWEENTYPE.NONE:
					this.openFirstUIFinish();
					break;
				case TWEENTYPE.MOVE_OVERRIDE:

					break;
				case TWEENTYPE.MOVE_PUSH:

					break;
				case TWEENTYPE.SCALE:
					EffectUtil.Open(ui, this.openFirstUIFinish, this);
					break;
				case TWEENTYPE.ROTAION:

					break;
			}
		}

		private openFirstUIFinish(): void {
			this.is_fst_ui_tween = false;
			while (this.main.numChildren > 1) {
				this.main.removeChildAt(0);
			}			
		}

		/** 打开2级界面
		 * @param ui
		 * @param tweentype 动画类型 默认1 小到大渐变
		 */
		private openSecondUI(ui, tweentype = 1) {
			this.secCon.addChild(ui);
			switch (tweentype) {
				case TWEENTYPE.NONE:
					this.openSecondUIFinish();
					break;
				case TWEENTYPE.MOVE_OVERRIDE:

					break;
				case TWEENTYPE.MOVE_PUSH:

					break;
				case TWEENTYPE.SCALE:
					EffectUtil.Open(ui, this.openSecondUIFinish, this);
					break;
				case TWEENTYPE.ROTAION:

					break;
			}
		}

		private openSecondUIFinish(): void {
			this.is_sec_ui_tween = false;
		}





		public loadingView: LoadingUI;
		/** 显示loading界面
		 * @param b 是否显示  true显示  false关闭
		 * @param type 类型 LOADINGTYPE.XXXX 
		 */
		public showLoading(b: boolean, type: number = 1) {
			if (b) {
				if (this.loadingView == null) {
					this.loadingView = new LoadingUI();
				}
				UIManager.getInstance().loadingCon.addChild(this.loadingView);
				this.loadingView.setLoadType(type);
			}
			else {
				if (this.loadingView != null) {
					this.loadingView.reset();
					UIManager.getInstance().loadingCon.removeChildren();
				}
			}
		}

	}
}