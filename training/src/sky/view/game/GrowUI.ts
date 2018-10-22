class GrowUI extends BaseUI {
	public constructor() {
		super("GrowSkin");
	}

	private scroller_left: eui.Group;
	private list_left: eui.List;
	private arr_data_left: eui.ArrayCollection;
	private charpters: Map<CharpterVO>;

	private scroller_right: eui.Group;
	private list_right: eui.List;
	private arr_data_right: eui.ArrayCollection;
	private missions: CharpterMissionVO[];

	private btn_back: eui.Button;
	private btn_start: eui.Button;

	private crtChapter: number;
	/** 当前章节的 当前关卡索引 0开始 */
	private crtMission: number;
	private clickMission:CharpterMissionVO;

	/**初始化数据 */
	protected initData() {
		this.list_left.itemRenderer = GrowLeftItemUI;
		this.arr_data_left = new eui.ArrayCollection();
		this.list_right.itemRenderer = GrowLeftItemUI;
		this.arr_data_right = new eui.ArrayCollection();
	}

	/**初始化界面 */
	protected initView() {
		this.charpters = MissionLogic.getInstance().getChaprters();
		this.crtChapter = MissionLogic.getInstance().crtChapter;
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

		this.missions = MissionLogic.getInstance().getMissionsByChapterID(this.crtChapter);
		this.crtMission = MissionLogic.getInstance().getCrtMissionInCharpter(this.crtChapter);

		this.initRightList();
	}

	private initRightList() {
		this.arr_data_right.removeAll();
		for (let i=0;i<this.missions.length;i++) {
			this.arr_data_right.addItem(this.missions[i]);
		}
		this.list_right.dataProvider = this.arr_data_right;

		this.list_right.validateNow();
		this.list_right.selectedIndex = this.crtMission;
		this.clickMission = this.missions[this.crtMission];
	}

	/**初始化事件 */
	protected initEvent() {
		this.list_left.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemLeftClick, this);
		this.list_right.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemRightClick, this);
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
		this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
	}

	private clickStart() {
		if(this.clickMission == null){

		}
		MissionLogic.getInstance().startMissionGame(this.clickMission);
	}

	private clickBack() {
		GameLogic.getInstance().openStart();
	}

	private itemLeftClick(e: eui.ItemTapEvent) {
		let vo = this.list_left.selectedItem.data as CharpterVO;
		
		this.missions = vo.missions;
		this.crtMission = MissionLogic.getInstance().getCrtMissionInCharpter(this.crtChapter);

		this.initRightList();
	}

	private itemRightClick(e: eui.ItemTapEvent) {
		this.clickMission = this.list_left.selectedItem.data as CharpterMissionVO;
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