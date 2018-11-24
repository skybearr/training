/**
 * 
 * 小游戏游戏进程管理类
 * 
 * 
 */

module fw {
	export class GameManager extends egret.EventDispatcher {
		public constructor() {
			super();
		}

		private static _instance: GameManager;
		public static getInstance(): GameManager {
			if (this._instance == null) {
				this._instance = new GameManager();
			}
			return this._instance;
		}


		/** 游戏初始化 */
		public init() {
			/** 打开logo动画 */
			// fw.UIManager.getInstance().main.addChild(new LogoUI());
			fw.GameManager.getInstance().logoOver();
			WxApi.getInstance().init();
			platform.checkVersion();
		}

		/** logo动画结束，检测是否后台加载完毕 */
		public logoOver() {
			fw.UIManager.getInstance().openUI(UIConst.START);
			fw.UIManager.getInstance().showLoading(!WxApi.getInstance().inited);
		}


		private switchData: string[];
		private initSwitchData(str: string) {
			this.switchData = str.split("");
		}
		/**判断功能是否开启 SWITCHTYPE.xxxx*/
		public isSwitch(id: number): boolean {
			if (this.switchData == null) {
				return false;
			}
			return this.switchData[id] == "1";
		}

		private getParams(a2: string[]): number[] {
			let a1 = [];
			for (let i = 0; i < a2.length; i++) {
				a1.push(parseFloat(a2[i]));
			}
			return a1;
		}

	}
}