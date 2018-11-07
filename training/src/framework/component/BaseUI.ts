module fw {
	export class BaseUI extends eui.Component {
		public constructor(skinname) {
			super();
			this.skinName = skinname;
		}

		protected img_bg: eui.Image;
		protected rect_bg: eui.Rect;
		protected btn_close:eui.Button;
		protected img_close:eui.Image;

		protected args: any;
		private tweentype: number = 0;


		protected childrenCreated() {
			super.childrenCreated();

			this.checkFit();
			this.initData();
			this.initView();
			this.initEvent();

			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
			if(this.btn_close != null){
				this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickClose,this);
			}
			if(this.img_close != null){
				this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickClose,this);
			}
		}

		/** 打开UI时的附带参数 */
		protected setParams(params: any) {
			this.args = params.params;
			this.tweentype = params.tweentype;
		}

		/**适配处理 */
		protected checkFit() {
			this.height = GameConst.stageHeight;
			if (this.img_bg != null) {
				this.img_bg.height = GameConst.stageHeight;
			}
			if (this.rect_bg != null) {
				this.rect_bg.height = GameConst.stageHeight;
			}
		}

		/**初始化数据 */
		protected initData() {

		}

		/**初始化界面 */
		protected initView() {

		}

		/**初始化事件 */
		protected initEvent() {

		}

		protected clear() {
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
			if(this.btn_close != null){
				this.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickClose,this);
			}
			if(this.img_close != null){
				this.img_close.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickClose,this);
			}
		}

		protected clickClose(){
			if(this.parent != null){
				this.parent.removeChild(this);
			}
		}
	}
}