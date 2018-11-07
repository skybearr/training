class AchieveItemUI extends eui.ItemRenderer {
	public constructor() {
		super();
		this.skinName = "AchieveItemSkin";
	}

	private lbl_name: eui.Label;
	private lbl_reward: eui.Label;
	private lbl_progress: eui.Label;
	private btn: eui.Button;

	protected childrenCreated() {
		super.childrenCreated();

		this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGet, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
	}

	protected dataChanged(): void {
		if (this.data == null) {
			return;
		}

		let vo: AchieveVO = this.data as AchieveVO;
		this.lbl_name.text = vo.title;
		let str: string = "";
		for (let i = 0; i < vo.reward.length; i++) {
			if (str.length > 0) {
				str += "";
			}
			let a = vo.reward[i].split(":");
			str += (PropLogic.getInstance().getPropNameByID(parseInt(a[0])) + " X" + parseInt(a[1]));
			if(i < vo.reward.length - 1){
				str += "\n";
			}
		}
		this.lbl_reward.text = str;
		// this.lbl_progress.text = "已" + StringUtil.getSwfLangStrVar(DataBase.ACHIEVE_STR[vo.type], [AchieveLogic.getInstance().getAchieveTypeValue(vo.type) + ""]);
		this.btn.label = vo.state == 0 ? "未达成" : (vo.state == 1 ? "领取" : "已领取");
		this.btn.filters = vo.state != 1 ? FilterUtil.getGrayFilter() : null;
	}

	private clickGet() {
		if (this.data.state != 1) {
			return;
		}
		this.data.state = 2;
		this.btn.label = this.data.state == 0 ? "未达成" : (this.data.state == 1 ? "领取" : "已领取");
		AchieveLogic.getInstance().getReward(this.data.id);
	}

	private clear() {
		this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGet, this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
		this.data = null;
	}

}