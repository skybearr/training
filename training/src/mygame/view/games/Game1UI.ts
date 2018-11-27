class Game1UI extends eui.Component {
	public constructor() {
		super();
		this.skinName = "Game2Skin";
	}

	private lbl_score: eui.Label;
	private gp1: eui.Group;
	private gp2: eui.Group;
	private btn1: eui.Button;
	private btn2: eui.Button;
	private btn3: eui.Button;
	private btn4: eui.Button;
	private rect_bg: eui.Rect;
	private gp_over: eui.Group;
	private lbl_over: eui.Label;
	private rect: eui.Rect;
	private lbl_cd: eui.Label;

	private icons: eui.Image[];
	private itemArr: eui.Image[] = [];
	private indexArr: number[] = [];

	private max: number = 400;
	private len: number = 20;
	private unitw: number = 64;
	private unitnum: number = 64;
	private crtIndex: number;

	protected childrenCreated() {
		super.childrenCreated();
		this.initData();
		this.initView();
		this.initEvent();
	}

	/**初始化数据 */
	protected initData() {
		this.len = 640 / this.unitw;
		this.max = this.len * this.len;
	}

	/**初始化界面 */
	protected initView() {
		this.reset();
		this.start();
	}

	private reset() {
		this.relifetime = 0;
		this.gp_over.visible = false;
		this.lbl_cd.visible = false;
		this.btn3.visible = false;
		this.btn4.visible = false;
		for (let i = 0; i < this.itemArr.length; i++) {
			this.itemArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickImage, this);
		}
		this.itemArr = [];
		this.indexArr = [];
		this.gp2.removeChildren();
		this.icons = [];
		let n = Math.floor(Math.random() * 4);
		let s1 = "icon" + (n + 1) + "_json.icon_";
		for (let i = 1; i <= this.unitnum; i++) {
			let key = s1 + (n * this.unitnum + i);
			let image: eui.Image = new eui.Image(key);
			image.smoothing = true;
			image.width = image.height = this.unitw;
			this.icons.push(image);
		}
		for (let i = 0; i < this.max; i++) {
			this.indexArr.push(i);
		}

		this.crtIndex = -1;
		this.updateScore();
	}

	private updateScore() {
		this.lbl_score.text = "已通过" + (this.crtIndex + 1) + "关";
	}

	private start() {
		this.next();
	}

	private isTween: boolean;
	private next() {
		this.crtIndex++;
		if (this.crtIndex >= this.max) {
			this.gameover();
		}
		let image = this.icons[this.crtIndex];
		let r = Math.floor(Math.random() * this.indexArr.length);
		let i = this.indexArr[r];
		this.indexArr.splice(r, 1);
		let a = i % this.len;
		let b = Math.floor(i / this.len);
		image.x = (this.unitw + 2) * a;
		image.y = (this.unitw + 2) * b;
		image.name = this.crtIndex + "";
		image.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickImage, this);
		this.itemArr.push(image);
		if (this.crtIndex == 0) {
			this.gp2.addChild(image);
		}
		else {
			this.isTween = true;
			// let t = Math.floor(Math.random() * 5);
			let t = Math.floor(this.crtIndex / 2) % 5;
			t = 3
			let s = 300;
			switch (t) {
				case 0://遮挡
					this.rect.x = 800;
					this.rect.visible = true;
					egret.Tween.get(this.rect).to({ x: 0 }, s).call(() => {
						this.gp2.addChild(image);
					}, this).wait(200).to({ x: -800 }, s).call(() => {
						this.isTween = false;
						this.rect.visible = false;
					});
					break;
				case 1://左右
					egret.Tween.get(this.gp1).to({ scaleX: 0 }, s).call(() => {
						this.gp2.addChild(image);
					}, this).to({ scaleX: 1 }, s).call(() => {
						this.isTween = false;
					});
					break;
				case 2://上下
					egret.Tween.get(this.gp1).to({ scaleY: 0 }, s).call(() => {
						this.gp2.addChild(image);
					}, this).to({ scaleY: 1 }, s).call(() => {
						this.isTween = false;
					});
					break;
				case 3://渐隐
					egret.Tween.get(this.gp1).to({ alpha: 0 }, s).call(() => {
						this.gp2.addChild(image);
					}, this).wait(300).to({ alpha: 1 }, 500).call(() => {
						this.isTween = false;
					});
					break;
				case 4://中心缩放
					egret.Tween.get(this.gp1).to({ scaleX: 0, scaleY: 0 }, s).call(() => {
						this.gp2.addChild(image);
					}, this).to({ scaleX: 1, scaleY: 1 }, s).call(() => {
						this.isTween = false;
					});
					break;
			}

		}


	}

	private clickImage(e: egret.TouchEvent) {
		if (this.isTween) {
			return;
		}
		if (e.currentTarget.name == this.crtIndex + "") {
			this.updateScore();
			this.next();
		}
		else {
			this.gameover();
		}
	}

	private gameover() {
		this.gp_over.visible = true;
		this.lbl_over.text = "点错啦，加油！";
		this.btn3.visible = true;
		this.btn4.visible = true;
		this.lbl_cd.visible = true;
	}

	/**初始化事件 */
	protected initEvent() {
		this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn1, this);
		this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn2, this);
		this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn3, this);
		this.btn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn4, this);
		WxApi.getInstance().addEventListener(GameEvent.REWARDAD_CLOSE_EVENT, this.watchReward, this);
		TimerManager.getInstance().addTimerCallBack(this.rewardCD, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
	}

	private clickBtn3() {
		let title: string = "我在记忆力训练中过了" + this.crtIndex + "关！你也来试试？";
		let image: string = "resource/assets/share1.png";
		platform.share(title, image, null);
	}

	private watchReward(e: GameEvent) {
		if (e.data.type == WATCHTYPE.RELIFE && e.data.data == 0) {
			this.gp_over.visible = false;
			this.btn3.visible = false;
			this.btn4.visible = false;
			this.lbl_cd.visible = false;

			let img = this.itemArr[this.itemArr.length - 1];
			this.isTween = true;
			let t = 200;
			egret.Tween.get(img).to({ alpha: 0 }, t).to({ alpha: 1 }, t).to({ alpha: 0 }, t).
				to({ alpha: 1 }, t).to({ alpha: 0 }, t).to({ alpha: 1 }, t).call(() => {
					this.isTween = false;
				}, this);
		}
	}

	private can1: boolean;
	private rewardCD() {
		let cd = WxApi.getInstance().getRewardCD();

		this.btn4.touchEnabled = cd <= 0;
		this.btn4.filters = cd <= 0 ? null : FilterUtil.getGrayFilter();
		this.can1 = cd <= 0;
		if (cd > 0) {
			this.lbl_cd.text = GameUtil.ParseTime2Format(cd);
		}
		else {
			this.lbl_cd.text = "";
		}
	}
	private relifetime:number = 0;
	private clickBtn4() {
		if(this.relifetime >= 3){
			WxApi.getInstance().toast("单局游戏只能复活3次");
			return;
		}
		this.relifetime ++;
		let cd = WxApi.getInstance().getRewardCD();
		if (cd > 0) {
			WxApi.getInstance().toast("看视频太快了，请稍后再试");
		}
		else {
			WxApi.getInstance().showRewardAd(WATCHTYPE.RELIFE);
		}

	}

	private clickBtn1() {
		if (this.parent != null) {
			this.parent.removeChild(this);
		}
	}

	private clickBtn2() {
		this.reset();
		this.start();
	}

	protected clear() {
		this.btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn1, this);
		this.btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn2, this);
		this.btn3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn3, this);
		this.btn4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn4, this);
		WxApi.getInstance().removeEventListener(GameEvent.REWARDAD_CLOSE_EVENT, this.watchReward, this);
		TimerManager.getInstance().removeFun(this.rewardCD, this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
	}
}