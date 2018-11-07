class TurnUI extends fw.BaseUI {
	public constructor() {
		super("TurnSkin");
	}


	private btn_1: eui.Button;
	private btn_2: eui.Button;
	private lbl_cd1: eui.Label;
	private lbl_cd2: eui.Label;
	private gp_items: eui.Group;

	private can1: boolean;
	private can2: boolean;
	private isplaying: boolean;
	private turns: TurnVO[];
	private turnItems: TurnItemUI[];
	private crtItem: TurnItemUI;
	private weights: number[];

	/**初始化数据 */
	protected initData() {
		this.turnItems = [];
		this.weights = [];
		HttpCommand.getInstance().getTurntable();
	}

	/**初始化界面 */
	protected initView() {
		this.rewardCD();
	}

	private updateVideoCD() {
		let cd = WxApi.getInstance().getRewardCD();

		this.btn_1.touchEnabled = cd <= 0;
		this.btn_1.filters = cd <= 0 ? null : FilterUtil.getGrayFilter();
		this.can1 = cd <= 0;
		if (cd > 0) {
			this.lbl_cd1.text = GameUtil.ParseTime2Format(cd);
		}
		else {
			this.lbl_cd1.text = "";
		}
	}

	private updateFreeCD() {
		let cd2 = TurnLogic.getInstance().getFreeShareCD();

		this.btn_2.touchEnabled = cd2 <= 0;
		this.btn_2.filters = cd2 <= 0 ? null : FilterUtil.getGrayFilter();
		this.can2 = cd2 <= 0;
		if (cd2 > 0) {
			this.lbl_cd2.text = GameUtil.ParseTime2Format(cd2);
		}
		else {
			this.lbl_cd2.text = "";
		}

	}

	/**初始化事件 */
	protected initEvent() {
		this.btn_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
		this.btn_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);

		WxApi.getInstance().addEventListener(GameEvent.REWARDAD_CLOSE_EVENT, this.watchReward, this);
		HttpCommand.getInstance().addEventListener(HttpEvent.getTurntable, this.turnResponse, this);
		TimerManager.getInstance().addTimerCallBack(this.rewardCD, this);
	}

	private rewardCD() {
		this.updateVideoCD();
		this.updateFreeCD();
	}

	private watchReward(e: GameEvent) {
		if (e.data.type == WATCHTYPE.TURNPLAY && e.data.data == 0) {
			this.play();
			this.updateVideoCD();
		}
	}

	private clickBtn(e: egret.TouchEvent) {
		if (this.turns == null) {
			return;
		}
		switch (e.currentTarget) {
			case this.btn_1:
				this.turnPlay();
				break;
			case this.btn_2:
				this.freePlay();
				break;
		}
	}

	private turnPlay() {
		if (this.isplaying) {
			return;
		}
		WxApi.getInstance().showRewardAd(WATCHTYPE.TURNPLAY);
	}

	private freePlay() {
		if (this.isplaying) {
			return;
		}
		if (this.can2 && TurnLogic.getInstance().freetimes > 0) {
			this.play();
			TurnLogic.getInstance().setFreeTurn();
			this.updateFreeCD();
		}
	}

	private count: number;
	private crtIndex: number = 0;
	/** 转盘开始转 */
	private play() {
		this.isplaying = true;
		this.count = this.crtIndex;
		let round = 4;
		let min = this.turnItems.length * round;
		let i = GameUtil.getRandomByWeight(this.weights);
		let tar = min + i;
		egret.Tween.get(this, { onChange: this.update, onChangeObj: this }).to({ count: tar }, 5000, egret.Ease.quadInOut).call(() => {
			this.isplaying = false;
			this.getReward();
		}, this);
	}

	private update() {
		let index = Math.ceil(this.count) % this.turnItems.length;
		if (this.crtIndex == index) {
			return;
		}
		this.crtIndex = index;
		if (this.crtItem != null) {
			this.crtItem.selected(false);
		}
		this.crtItem = this.turnItems[index];
		this.crtItem.selected(true);
	}

	private getReward() {
		if (this.crtItem != null) {
			WxApi.getInstance().toast("获得奖励：" + this.crtItem.vo.name);
		}
	}

	private turnResponse() {
		this.turns = TurnLogic.getInstance().getTurnVOs();

		this.updateTurns();
	}

	/** 初始化所有奖励 */
	private updateTurns() {
		let l = this.turns.length / 4;
		let itemborder: number = 124;
		for (let i = 0; i < this.turns.length; i++) {
			let vo = this.turns[i];
			let item = new TurnItemUI(i, vo);
			let n = Math.floor(i / l);
			if (n == 0) {
				item.x = itemborder * i;
				item.y = 0;
			}
			else if (n == 1) {
				item.x = itemborder * l;
				item.y = itemborder * (i - l);
			}
			else if (n == 2) {
				item.x = itemborder * (l * 3 - i);
				item.y = itemborder * l;
			}
			else {
				item.x = 0;
				item.y = itemborder * (l * 4 - i);
			}

			this.gp_items.addChild(item);
			this.turnItems.push(item);
			this.weights.push(vo.weight);
		}
	}

	protected clickClose() {
		if (this.isplaying) {
			return;
		}
		super.clickClose();
	}

	protected clear() {
		super.clear();

		this.btn_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
		this.btn_2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
		WxApi.getInstance().removeEventListener(GameEvent.REWARDAD_CLOSE_EVENT, this.watchReward, this);
		HttpCommand.getInstance().removeEventListener(HttpEvent.getTurntable, this.turnResponse, this);
		TimerManager.getInstance().removeFun(this.rewardCD, this);

		this.isplaying = false;
	}
}
window['TurnUI'] = TurnUI;