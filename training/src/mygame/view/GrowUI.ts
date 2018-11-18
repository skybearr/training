class GrowUI extends fw.BaseUI {
	public constructor() {
		super("GrowSkin");
	}

	private scroller_left: eui.Group;
	private list_left: eui.List;
	private arr_data_left: eui.ArrayCollection;
	private charpters: fw.Map<CharpterVO>;

	private scroller_right: eui.Group;
	private list_right: eui.List;
	private arr_data_right: eui.ArrayCollection;
	private missions: CharpterMissionVO[];

	private btn_back: eui.Button;
	private btn_start: eui.Button;

	private crtChapter: number;
	/** 当前章节的 当前关卡索引 0开始 */
	private crtMission: number;
	private clickMission: CharpterMissionVO;

	private crtLeftItem: GrowLeftItemUI;
	private crtRightItem: GrowRightItemUI;


	/**初始化数据 */
	protected initData() {
		this.list_left.itemRenderer = GrowLeftItemUI;
		this.arr_data_left = new eui.ArrayCollection();
		this.list_right.itemRenderer = GrowRightItemUI;
		this.arr_data_right = new eui.ArrayCollection();
	}

	/**初始化界面 */
	protected initView() {
		this.charpters = MissionTrainLogic.getInstance().getChaprters();
		this.crtChapter = MissionTrainLogic.getInstance().crtChapter;
		this.initLeftList();
	}

	private initLeftList() {
		this.arr_data_left.removeAll();
		for (let i in this.charpters) {
			this.arr_data_left.addItem(this.charpters[i]);
		}
		this.list_left.dataProvider = this.arr_data_left;

		this.list_left.validateNow();
		this.list_left.selectedIndex = this.crtChapter - 1;

		this.missions = MissionTrainLogic.getInstance().getMissionsByChapterID(this.crtChapter);
		this.crtMission = MissionTrainLogic.getInstance().getCrtMissionInCharpter(this.crtChapter);
		this.crtLeftItem = this.list_left.getElementAt(this.crtChapter - 1) as GrowLeftItemUI;
		this.crtLeftItem.isSelected(true);
		this.initRightList();
	}

	private initRightList() {
		this.arr_data_right.removeAll();
		for (let i = 0; i < this.missions.length; i++) {
			this.arr_data_right.addItem(this.missions[i]);
		}
		this.list_right.dataProvider = this.arr_data_right;

		this.list_right.validateNow();
		this.list_right.selectedIndex = this.crtMission;
		this.clickMission = this.missions[this.crtMission];
		this.crtRightItem = this.list_right.getElementAt(this.crtMission - 1) as GrowRightItemUI;
		this.crtRightItem.isSelected(true);
	}

	/**初始化事件 */
	protected initEvent() {
		this.list_left.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemLeftClick, this);
		this.list_right.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemRightClick, this);
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
		this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
	}

	private clickStart() {
		if (this.clickMission != null) {
			MissionTrainLogic.getInstance().startMissionGame(this.clickMission);
		}
	}

	private clickBack() {
		GameTrainLogic.getInstance().openStart();
	}

	private itemLeftClick(e: eui.ItemTapEvent) {
		let vo = this.list_left.selectedItem as CharpterVO;
		if (vo.state == 0) {
			return;
		}
		if (this.crtLeftItem != null) {
			this.crtLeftItem.isSelected(false);
		}
		let i = this.list_left.selectedIndex;
		this.crtLeftItem = this.list_left.getElementAt(i) as GrowLeftItemUI;
		this.crtLeftItem.isSelected(true);
		this.missions = vo.missions;
		this.crtMission = MissionTrainLogic.getInstance().getCrtMissionInCharpter(this.crtChapter);
		
		this.initRightList();
	}


	private itemRightClick(e: eui.ItemTapEvent) {
		let vo = this.list_right.selectedItem as CharpterMissionVO;
		if (vo.state == 0) {
			return;
		}
		this.clickMission = vo;
		if (this.crtRightItem != null) {
			this.crtRightItem.isSelected(false);
		}
		let i = this.list_right.selectedIndex;
		this.crtRightItem = this.list_right.getElementAt(i) as GrowRightItemUI;
		this.crtRightItem.isSelected(true);
	}

	protected clear() {
		super.clear();
		this.list_left.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemLeftClick, this);
		this.list_right.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemRightClick, this);
		this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
		this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
		this.list_left.dataProvider = null;
		this.list_right.dataProvider = null;
		this.arr_data_left = null;
		this.arr_data_right = null;
		this.charpters = null;
		this.missions = null;
		this.clickMission = null;
	}
}