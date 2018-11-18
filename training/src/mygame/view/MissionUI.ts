class MissionUI extends fw.BaseUI {
	public constructor() {
		super("MissionSkin");
	}

	private list: eui.List;
	private arr_data: eui.ArrayCollection;
	private data: TrainMissionVO[][];
	private crttype: number;
	private btn_back: eui.Button;
	private gp_1: eui.Group;


	/**初始化数据 */
	protected initData() {
		this.list.itemRenderer = MissionItemUI;
		this.arr_data = new eui.ArrayCollection();
	}

	/**初始化界面 */
	protected initView() {
		this.data = GameTrainLogic.getInstance().getMissionData();
		this.crttype = 1;
		this.initList(3);
		
		let y = this.gp_1.y;
		egret.Tween.get(this.gp_1, { loop: true }).to({ y: y - 30 }, 500).to(100).to({ y: y }, 500).wait(300);
	}

	private initList(id = null) {
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

		if (id != null) {
			this.list.validateNow();
			this.list.selectedIndex = id;
		}
	}

	/**初始化事件 */
	protected initEvent() {
		this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemClick, this);
		for (let i = 1; i <= 3; i++) {
			this['btn' + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
		}
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
	}

	private clickBack() {
		fw.UIManager.getInstance().openUI(UIConst.START);
	}



	private btnClick(e: egret.TouchEvent) {
		let i = parseInt(e.currentTarget.name);
		if (this.crttype == i) {
			return;
		}
		this.crttype = i;
		this.initList();

		this.gp_1.visible = i == 1;
	}

	private initBtn() {
		for (let i = 1; i <= 3; i++) {
			let btn: eui.Button = this['btn' + i];
			if (btn != null) {
				btn.filters = this.crttype != i ? FilterUtil.getGrayFilter() : null;
			}
		}
	}

	private itemClick(e: eui.ItemTapEvent) {
		let i = e.itemIndex;
		let arr = this.data[this.crttype];
		if (arr == null || arr.length == 0) {
			return;
		}
		let vo = arr[i];
		if (vo == null) {
			return;
		}
		fw.UIManager.getInstance().openUI(UIConst.GAME,vo);
	}

	protected clear() {
		super.clear();

		this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemClick, this);
		for (let i = 1; i <= 3; i++) {
			this['btn' + i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
		}
		this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);

		egret.Tween.removeTweens(this.gp_1);
		this.list.dataProvider = null;
		this.arr_data = null;
		this.list = null;
		this.data = null;
	}
}
window['MissionUI'] = MissionUI;