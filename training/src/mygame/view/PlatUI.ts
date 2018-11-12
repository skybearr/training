class PlatUI extends fw.BaseUI {
	public constructor() {
		super("PlatSkin");
	}

	private lbl:eui.Label;
	private btn_start:eui.Button;
	private btn_back:eui.Button;
	private gp:eui.Group;

	/**初始化数据 */
	protected initData() {
		
	}

	/**初始化界面 */
	protected initView() {
		let s2 = GameLogic.getInstance().getMyDataValueByID(MYDATA.PLAY_DATA);
		let s0 = "还没开始训练或你之前中断了训练，请点击下面的训练开始30天训练计划吧，坚持就能看到成果！加油！";
		if(s2 == null){
			this.lbl.text = s0;
			return;
		}
		let arr = s2.split("&");
		let max:number = 0;
		let min:number = 9999999999;
		let total:number = 0;
		let avg:number = 0;
		let lastvo:PlanVO;
		for(let i=0;i<arr.length;i++){
			let a1 = arr[i].split("=");
			let time = parseInt(a1[1]);
			if(time > max){
				max = time;
			}
			if(time < min){
				min = time;
			}
			total += time;
			let vo = new PlanVO();
			vo.id = parseInt(a1[0]);
			vo.time = time;
			let item = new PlanItemUI(vo);
			this.gp.addChild(item);
			lastvo = vo;
		}
		avg = Math.floor(total / arr.length);

		//1，连续坚持天数，最快，最慢，平均，
		//2，加油
		let str = "";
		if(lastvo == null){
			str = s0;
		}
		else{
			str = "你已坚持训练" + (lastvo.id + 1) + "天，\n" + 
														"最快用时" + this.getText(min) + "秒，\n" + 
														"最慢用时" + this.getText(max) + "秒，\n" + 
														"平均用时" + this.getText(avg) + "秒。\n" + 
														"你真棒！继续加油哦！";
		}
		this.lbl.text = str;
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


	/**初始化事件 */
	protected initEvent() {
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickBack,this);
		this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickStart,this);
	}

	private clickBack(){
		fw.UIManager.getInstance().openUI(UIConst.START);
	}

	private clickStart(){
		// fw.UIManager.getInstance().openUI(UIConst.MISSION);
		let vo = GameTrainLogic.getInstance().getStartMission();
		fw.UIManager.getInstance().openUI(UIConst.GAME,vo);
	}


	protected clickClose() {
		super.clickClose();
	}

	protected clear() {
		super.clear();

		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickBack,this);
		this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickStart,this);
		
	}
}
window['PlatUI'] = PlatUI;