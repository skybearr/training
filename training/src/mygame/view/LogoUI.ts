class LogoUI extends egret.DisplayObjectContainer {
	public constructor() {
		super();

		this.init();
	}

	private logo: egret.Bitmap;
	private tf: egret.TextField;

	/** 工作室logo */
	private logo_src:string = "logo_png";
	/** 工作室口号 */
	private logo_txt:string = "Domore Games\nGames can do more";

	private init() {
		this.addChild(GameUtil.getShape(GameConst.stageWidth, GameConst.stageWidth, 0x888888, 0.2));

		this.logo = new egret.Bitmap(RES.getRes(this.logo_src));
		this.logo.anchorOffsetX = this.logo.width / 2;
		this.logo.anchorOffsetY = this.logo.height / 2;
		this.logo.x = GameConst.stageWidth / 2;
		this.logo.y = this.logo.height / 2 + 40;
		this.addChild(this.logo);

		this.tf = GameUtil.createTextField(null, 650, GameConst.stageWidth, null, GameConst.stageWidth, null, 0x2FEA13, 50, "Comic Sans MS");
		this.tf.lineSpacing = 10;
		this.tf.multiline = this.tf.wordWrap = true;
		this.tf.text = this.logo_txt;
		this.tf.y = GameConst.stageHeight / 2 + 100;
		this.tf.alpha = 0;
		this.addChild(this.tf);

		egret.Tween.get(this.logo).to({ y: GameConst.stageHeight / 2 - 100, scaleX: 1, scaleY: 1 }, 500, egret.Ease.backInOut).wait(100).call(() => {
			egret.Tween.get(this.tf).to({ alpha: 1 }, 500).wait(1000).call(() => {
				fw.GameManager.getInstance().logoOver();
			}, this);
		}, this);
	}
}