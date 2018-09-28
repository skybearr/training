class GameOverUI extends BaseUI {
	public constructor(v, t) {
		super("GameOverSkin");
		this.vo = v;
		this.time = t;
	}

	private vo: MissionVO;
	private lbl: eui.Label;
	private btn_back: eui.Button;
	private btn_restart: eui.Button;
	private time: number;
	private lbl_time: eui.Label;
	private lbl_best:eui.Label;
	private lbl_fast:eui.Label;
	protected initView() {
		let star = 0;
		for (let i = this.vo.times.length - 1; i >= 0; i--) {
			if (this.time <= this.vo.times[i] * 1000){
				star ++;
				this['star' + (this.vo.times.length - i)].source = RES.getRes("star_a_png");
			}
		}
		this.vo.stars = star;
		console.log("gameover:",this.vo);
		
		let recond = GameLogic.getInstance().getRecond(this.vo.type,this.vo.id);
		if(recond != 0){
			this.lbl_best.text = "历史最快成绩：" + this.getText(recond);
		}
		if(recond == 0 || this.time < recond){
			GameLogic.getInstance().saveLocal(this.vo.type,this.vo.id,this.time);
		}
		if(this.time < recond){
			this.lbl_fast.visible = true;
		}
		

		this.lbl.text = GameLogic.getInstance().getStringByStar(this.vo.stars);

		this.lbl_time.text = this.getText(this.time);
	}

	private getText(t){
		let s = TimeUtil.ParseTime2Format(Math.floor(t / 1000), "m:s");
		let hs = t % 1000;
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
		return s + ":" + ss;
	}

	protected initEvent() {
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
		this.btn_restart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRestart, this);
	}

	private clickRestart() {
		GameLogic.getInstance().startGame(this.vo);
	}

	private clickBack() {
		GameLogic.getInstance().openStart();
	}

	protected clear() {
		super.clear();

		this.vo = null;

		this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
		this.btn_restart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRestart, this);
	}
}