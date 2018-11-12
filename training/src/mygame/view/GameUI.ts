class GameUI extends fw.BaseUI {
	public constructor(obj) {
		super("GameSkin");
		this.vo = obj.params;
	}

	private list: eui.List;
	private lbl_time: eui.Label;
	private lbl_des: eui.Label;
	private gp: eui.Group;
	private btn_start: eui.Button;
	private img_1: eui.Image;
	private btn_back: eui.Button;
	private lbl_num: eui.Label;
	private btn_tips: eui.Button;
	private btn_mission: eui.Button;
	private lbl_hp: eui.Label;
	private starttime: number;
	private vo: TrainMissionVO;
	private arr: string[];
	private arr_data: eui.ArrayCollection;
	private btn_back1:eui.Button;

	protected checkFit() {
		super.checkFit();
		platform.bannerdestroy();
		this.img_1.height = GameConst.stageHeight;
	}

	/**初始化数据 */
	protected initData() {
		this.arr_data = new eui.ArrayCollection();

		switch (this.vo.type) {
			case 1:
				this.initType1();
				break;
			case 2:
				this.initType2();
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

	private initType2() {
		let index = this.vo.content.indexOf(",");
		let s = index != -1 ? "," : "";

		this.arr = this.vo.content.split(s);
		let a = this.shuffle(this.arr);
		let size = 60;
		if (this.vo.type == 2 && (this.vo.id == 8 || this.vo.id == 9)) {
			size = 48;
		}
		let row = (this.vo.id < 3 || this.vo.id > 8) ? 5 : 4;
		for (let i = 0; i < a.length; i++) {
			this.arr_data.addItem({ id: a[i], row: this.vo.id < 3 ? 5 : 5, size: size });
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
		this.lbl_hp.text = "剩余体力：" + PropLogic.getInstance().getPropByID(COINTYPE.HP).num;
		this.lbl_des.text = this.vo.des;
		this.list.itemRenderer = GameItemUI;
		this.list.dataProvider = this.arr_data;
		this.btn_back.visible = true;// this.vo.type != 1 || this.vo.id > 3;
	}


	private addHP(e:GameEvent){
		if (e.data.type == WATCHTYPE.ADDHP && e.data.data == 0) {
			PropLogic.getInstance().updateProp(COINTYPE.HP,DataBase.REWARD_ADD_WATCHAD);
			this.lbl_hp.text = "剩余体力：" + PropLogic.getInstance().getPropByID(COINTYPE.HP).num;
		}
	}

	private timeId: number;
	private clickStart() {
		if (PropLogic.getInstance().getPropByID(COINTYPE.HP).num < 10) {
			WxApi.getInstance().showRewardAd(WATCHTYPE.ADDHP);
		}
		else {
			PropLogic.getInstance().updateProp(COINTYPE.HP,-10);
			this.lbl_hp.text = "剩余体力：" + PropLogic.getInstance().getPropByID(COINTYPE.HP).num;
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


	}

	private start() {
		GameTrainLogic.getInstance().crtclick = 0;
		GameTrainLogic.getInstance().crtClickStr = this.arr[GameTrainLogic.getInstance().crtclick];
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
		this.btn_back1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
		
		this.btn_mission.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickMission, this);
		WxApi.getInstance().addEventListener(GameEvent.REWARDAD_CLOSE_EVENT,this.addHP,this);
	}
	private clickBack() {
		GameTrainLogic.getInstance().openStart();
	}

	private itemClick(e: eui.ItemTapEvent) {
		let i = e.itemIndex;
		let id = e.item.id;
		let item = e.itemRenderer as GameItemUI;

		if (GameTrainLogic.getInstance().crtClickStr == id) {
			GameTrainLogic.getInstance().crtclick++;
			if (GameTrainLogic.getInstance().crtclick >= this.arr.length) {
				this.gameover();
			}
			else {
				GameTrainLogic.getInstance().crtClickStr = this.arr[GameTrainLogic.getInstance().crtclick];
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

	private clickMission() {
		fw.UIManager.getInstance().openUI(UIConst.MISSION);
	}

	protected clear() {
		super.clear();
		this.vo = null;
		GameTrainLogic.getInstance().crtclick = 0;
		egret.clearTimeout(this.timeId);
		egret.Tween.removeTweens(this.lbl_num);
		this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
		this.removeEventListener(egret.Event.ENTER_FRAME, this.enterframe, this);
		this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemClick, this);
		this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
		this.btn_back1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
		this.btn_mission.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickMission, this);
		WxApi.getInstance().removeEventListener(GameEvent.REWARDAD_CLOSE_EVENT,this.addHP,this);
	}
}
window['GameUI'] = GameUI;