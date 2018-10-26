class GameUI1 extends GameBaseUI {
	public constructor(vo) {
		super("Game1Skin", vo);
	}

	private list: eui.List;
	private lbl_time: eui.Label;
	private lbl_des: eui.Label;
	private gp: eui.Group;
	private btn_start: eui.Button;
	private btn_back: eui.Button;
	private lbl_num: eui.Label;
	private btn_tips: eui.Button;
	private btn_mission:eui.Button;

	private starttime: number;
	private arr: string[];
	private arr_data: eui.ArrayCollection;

	protected checkFit() {
		super.checkFit();

		this.img_1.height = GameLogic.getInstance().GameStage.stageHeight;
	}

	/**初始化数据 */
	protected initData() {
		this.arr_data = new eui.ArrayCollection();

		switch (this.vo.type) {
			case 1:
				this.initType1();
				break;
			case 3:
				this.initType3();
				break;
		}
	}

	private initType1() {
		let len = parseInt(this.vo.content);
		this.arr = [];
		for (let i = 0; i < len; i++) {
			this.arr.push((i + 1) + "");
		}
		let row = Math.sqrt(len);
		let a = this.shuffle(this.arr);
		let size = 60;
		for (let i = 0; i < a.length; i++) {
			this.arr_data.addItem({ id: a[i], row: row, size: size });
		}
	}


	private initType3() {
		let len = parseInt(this.vo.content);
		this.arr = [];
		let str: string = "";
		for (let i = 0; i < len; i++) {
			let n = Math.floor(Math.random() * 10) + "";
			this.arr.push(n);
			str += n;
		}
		this.lbl_num.visible = true;
		this.lbl_num.alpha = 1;
		this.lbl_num.text = str;
		let size = 60;
		for (let i = 0; i < 10; i++) {
			this.arr_data.addItem({ id: i + "", row: 5, size: size });
		}
		this.list.visible = false;
	}

	/**对数组乱序 */
	private shuffle(a: any[]): any[] {
		let b = a.slice();
		let c = [];
		while (true) {
			let i = Math.floor(Math.random() * b.length);
			c.push(b[i]);
			b.splice(i, 1);
			if (b.length == 0) {
				break;
			}
		}
		return c;
	}

	/**初始化界面 */
	protected initView() {
		this.lbl_des.text = this.vo.des;
		this.list.itemRenderer = GameItemUI;
		this.list.dataProvider = this.arr_data;
		this.btn_back.visible = true;// this.vo.type != 1 || this.vo.id > 3;
	}

	private timeId: number;
	private clickStart() {
		this.gp.visible = false;
		if (this.vo.type == 3) {
			egret.clearTimeout(this.timeId);
			let t = (parseInt(this.vo.content) - 5) * 1000;
			this.timeId = egret.setTimeout(() => {
				egret.Tween.get(this.lbl_num).to({ alpha: 0 }, 3000).call(() => {
					this.lbl_num.visible = false;
					this.list.visible = true;
					this.start();
				}, this);

			}, this, t);
		}
		else {
			this.start();
		}

	}

	private start() {
		GameLogic.getInstance().crtclick = 0;
		GameLogic.getInstance().crtClickStr = this.arr[GameLogic.getInstance().crtclick];
		this.starttime = egret.getTimer();
		this.addEventListener(egret.Event.ENTER_FRAME, this.enterframe, this);
	}

	private gameover() {
		let newtime = egret.getTimer();
		let time = newtime - this.starttime;
		this.addChild(new GameOverUI(this.vo, time));
	}

	/**初始化事件 */
	protected initEvent() {
		this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
		this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemClick, this);
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
		this.btn_mission.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickMission,this);
	}
	private clickBack() {
		GameLogic.getInstance().openStart();
	}

	private itemClick(e: eui.ItemTapEvent) {
		let i = e.itemIndex;
		let id = e.item.id;
		let item = e.itemRenderer as GameItemUI;

		if (GameLogic.getInstance().crtClickStr == id) {
			GameLogic.getInstance().crtclick++;
			if (GameLogic.getInstance().crtclick >= this.arr.length) {
				this.gameover();
			}
			else {
				GameLogic.getInstance().crtClickStr = this.arr[GameLogic.getInstance().crtclick];
			}
		}
	}

	private enterframe() {
		let newtime = egret.getTimer();
		let time = newtime - this.starttime;
		let s = TimeUtil.ParseTime2Format(Math.floor(time / 1000), "m:s");
		let hs = time % 1000;
		let ss = "";
		if (hs < 10) {
			ss = "00" + hs;
		}
		else if (hs < 100) {
			ss = "0" + hs;
		}
		else {
			ss = hs + "";;
		}
		this.lbl_time.text = s + ":" + ss;
	}

	private clickMission(){
		GameLogic.getInstance().openMission();
	}

	protected clear() {
		super.clear();
		this.vo = null;
		GameLogic.getInstance().crtclick = 0;
		egret.clearTimeout(this.timeId);
		egret.Tween.removeTweens(this.lbl_num);
		this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
		this.removeEventListener(egret.Event.ENTER_FRAME, this.enterframe, this);
		this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemClick, this);
		this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
		this.btn_mission.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickMission,this);
	}
}