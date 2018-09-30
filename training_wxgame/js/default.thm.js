var egret = window.egret;
                function __extends(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = {};
                generateEUI.paths = {};
                generateEUI.styles = undefined;
                generateEUI.skins = {};generateEUI.paths['resource/skins/BaseButton1Skin.exml'] = window.BaseButton1Skin = (function (_super) {
	__extends(BaseButton1Skin, _super);
	function BaseButton1Skin() {
		_super.call(this);
		this.skinParts = ["img_bg","labelDisplay"];
		
		this.height = 60;
		this.width = 160;
		this.elementsContent = [this.img_bg_i(),this.labelDisplay_i()];
	}
	var _proto = BaseButton1Skin.prototype;

	_proto.img_bg_i = function () {
		var t = new eui.Image();
		this.img_bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(33,25,130,4);
		t.source = "yong_6_png";
		t.top = 0;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.fontFamily = "SimHei";
		t.height = 34;
		t.horizontalCenter = 0;
		t.size = 23;
		t.text = "150体力 ";
		t.textAlign = "center";
		t.textColor = 0x161616;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 160;
		return t;
	};
	return BaseButton1Skin;
})(eui.Skin);generateEUI.paths['resource/skins/BaseButtonSkin.exml'] = window.BaseButtonSkin = (function (_super) {
	__extends(BaseButtonSkin, _super);
	function BaseButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.height = 158;
		this.width = 400;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image2","visible",false)
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","visible",false),
					new eui.SetProperty("_Image2","source","yong_8_png"),
					new eui.SetProperty("labelDisplay","left",30),
					new eui.SetProperty("labelDisplay","right",30),
					new eui.SetProperty("labelDisplay","top",6),
					new eui.SetProperty("labelDisplay","bottom",9),
					new eui.SetProperty("labelDisplay","textColor",0xc4c4c4)
				])
		];
	}
	var _proto = BaseButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(103,0,165,159);
		t.source = "yong_7_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(103,0,165,159);
		t.source = "yong_7_png";
		t.top = 0;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.bottom = 12;
		t.fontFamily = "Microsoft JhengHei";
		t.left = 30;
		t.right = 30;
		t.size = 54;
		t.text = "开始游戏";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.top = 3;
		t.verticalAlign = "middle";
		return t;
	};
	return BaseButtonSkin;
})(eui.Skin);generateEUI.paths['resource/skins/GameItemSkin.exml'] = window.GameItemSkin = (function (_super) {
	__extends(GameItemSkin, _super);
	function GameItemSkin() {
		_super.call(this);
		this.skinParts = ["rect_bg","rect_click","lbl"];
		
		this.height = 100;
		this.width = 100;
		this.elementsContent = [this.rect_bg_i(),this.rect_click_i(),this.lbl_i()];
	}
	var _proto = GameItemSkin.prototype;

	_proto.rect_bg_i = function () {
		var t = new eui.Rect();
		this.rect_bg = t;
		t.fillColor = 0x888888;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.rect_click_i = function () {
		var t = new eui.Rect();
		this.rect_click = t;
		t.fillColor = 0x0f00ff;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.visible = false;
		t.percentWidth = 100;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto.lbl_i = function () {
		var t = new eui.Label();
		this.lbl = t;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.fontFamily = "SimHei";
		t.height = 100;
		t.horizontalCenter = 0;
		t.size = 48;
		t.text = "双子";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 100;
		return t;
	};
	return GameItemSkin;
})(eui.Skin);generateEUI.paths['resource/skins/GameOverSkin.exml'] = window.GameOverSkin = (function (_super) {
	__extends(GameOverSkin, _super);
	function GameOverSkin() {
		_super.call(this);
		this.skinParts = ["img_bg","lbl_time","lbl_fast","lbl_best","lbl","btn_back","btn_restart","star1","star2","star3"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.img_bg_i(),this.lbl_time_i(),this.lbl_fast_i(),this.lbl_best_i(),this.lbl_i(),this._Group1_i(),this._Group2_i()];
	}
	var _proto = GameOverSkin.prototype;

	_proto.img_bg_i = function () {
		var t = new eui.Image();
		this.img_bg = t;
		t.height = 1334;
		t.scale9Grid = new egret.Rectangle(70,55,426,330);
		t.source = "reglogbg_png";
		t.width = 750;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lbl_time_i = function () {
		var t = new eui.Label();
		this.lbl_time = t;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.fontFamily = "SimHei";
		t.height = 50;
		t.horizontalCenter = 0;
		t.size = 40;
		t.text = "本次用时：1111";
		t.textAlign = "center";
		t.textColor = 0x1802f2;
		t.verticalAlign = "top";
		t.width = 640;
		t.y = 431;
		return t;
	};
	_proto.lbl_fast_i = function () {
		var t = new eui.Label();
		this.lbl_fast = t;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.fontFamily = "SimHei";
		t.height = 50;
		t.horizontalCenter = 0;
		t.size = 50;
		t.text = "超越了历史记录，恭喜你！";
		t.textAlign = "center";
		t.textColor = 0xef0e1c;
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 640;
		t.y = 490;
		return t;
	};
	_proto.lbl_best_i = function () {
		var t = new eui.Label();
		this.lbl_best = t;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.fontFamily = "SimHei";
		t.height = 50;
		t.horizontalCenter = 0;
		t.size = 40;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0xff0f0f;
		t.verticalAlign = "top";
		t.width = 640;
		t.y = 180;
		return t;
	};
	_proto.lbl_i = function () {
		var t = new eui.Label();
		this.lbl = t;
		t.anchorOffsetY = 0;
		t.fontFamily = "SimHei";
		t.height = 317;
		t.horizontalCenter = 0;
		t.size = 40;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "top";
		t.width = 640;
		t.y = 576;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 1000;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.btn_back_i(),this.btn_restart_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 60;
		return t;
	};
	_proto.btn_back_i = function () {
		var t = new eui.Button();
		this.btn_back = t;
		t.height = 80;
		t.label = "返回首页";
		t.skinName = "BaseButton1Skin";
		t.width = 250;
		t.x = 0;
		t.y = 11;
		return t;
	};
	_proto.btn_restart_i = function () {
		var t = new eui.Button();
		this.btn_restart = t;
		t.height = 80;
		t.label = "不服再来";
		t.skinName = "BaseButton1Skin";
		t.width = 250;
		t.x = 264;
		t.y = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 288;
		t.layout = this._HorizontalLayout2_i();
		t.elementsContent = [this.star1_i(),this.star2_i(),this.star3_i()];
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 10;
		return t;
	};
	_proto.star1_i = function () {
		var t = new eui.Image();
		this.star1 = t;
		t.source = "star_b_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.star2_i = function () {
		var t = new eui.Image();
		this.star2 = t;
		t.source = "star_b_png";
		t.x = 125;
		t.y = 0;
		return t;
	};
	_proto.star3_i = function () {
		var t = new eui.Image();
		this.star3 = t;
		t.source = "star_b_png";
		t.x = 264;
		t.y = 0;
		return t;
	};
	return GameOverSkin;
})(eui.Skin);generateEUI.paths['resource/skins/GameSkin.exml'] = window.GameSkin = (function (_super) {
	__extends(GameSkin, _super);
	function GameSkin() {
		_super.call(this);
		this.skinParts = ["img_bg","lbl_time","list","btn_back","btn_tips","lbl_num","img_1","lbl_des","btn_start","gp"];
		
		this.width = 750;
		this.elementsContent = [this.img_bg_i(),this.lbl_time_i(),this.list_i(),this.btn_back_i(),this.btn_tips_i(),this.lbl_num_i(),this.gp_i()];
	}
	var _proto = GameSkin.prototype;

	_proto.img_bg_i = function () {
		var t = new eui.Image();
		this.img_bg = t;
		t.height = 1334;
		t.scale9Grid = new egret.Rectangle(51,47,43,32);
		t.source = "yong_3_png";
		t.verticalCenter = 0;
		t.width = 750;
		t.x = 0;
		return t;
	};
	_proto.lbl_time_i = function () {
		var t = new eui.Label();
		this.lbl_time = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "SimHei";
		t.horizontalCenter = -0.5;
		t.size = 50;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0xaa0cff;
		t.verticalAlign = "middle";
		t.width = 355.27;
		t.y = 77.84;
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 800;
		t.horizontalCenter = -2;
		t.width = 720;
		t.y = 192;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalAlign = "left";
		t.horizontalGap = 34;
		t.orientation = "rows";
		t.verticalAlign = "top";
		t.verticalGap = 20;
		return t;
	};
	_proto.btn_back_i = function () {
		var t = new eui.Button();
		this.btn_back = t;
		t.bottom = 118;
		t.height = 100;
		t.horizontalCenter = 0;
		t.label = "返回首页";
		t.skinName = "BaseButton1Skin";
		t.visible = false;
		t.width = 260;
		return t;
	};
	_proto.btn_tips_i = function () {
		var t = new eui.Button();
		this.btn_tips = t;
		t.bottom = 138;
		t.height = 60;
		t.horizontalCenter = 257;
		t.label = "查看結果";
		t.skinName = "BaseButton1Skin";
		t.visible = false;
		t.width = 160;
		return t;
	};
	_proto.lbl_num_i = function () {
		var t = new eui.Label();
		this.lbl_num = t;
		t.fontFamily = "SimHei";
		t.horizontalCenter = 0;
		t.size = 60;
		t.text = "10457780";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 680;
		t.y = 127.92;
		return t;
	};
	_proto.gp_i = function () {
		var t = new eui.Group();
		this.gp = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this.img_1_i(),this.lbl_des_i(),this.btn_start_i()];
		return t;
	};
	_proto.img_1_i = function () {
		var t = new eui.Image();
		this.img_1 = t;
		t.height = 1334;
		t.scale9Grid = new egret.Rectangle(12,12,76,76);
		t.source = "rank_bg_png";
		t.width = 750;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lbl_des_i = function () {
		var t = new eui.Label();
		this.lbl_des = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.fontFamily = "SimHei";
		t.height = 270;
		t.size = 40;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "top";
		t.width = 670;
		t.x = 40;
		t.y = 532;
		return t;
	};
	_proto.btn_start_i = function () {
		var t = new eui.Button();
		this.btn_start = t;
		t.height = 100;
		t.label = "开始";
		t.skinName = "BaseButton1Skin";
		t.width = 260;
		t.x = 245;
		t.y = 1034;
		return t;
	};
	return GameSkin;
})(eui.Skin);generateEUI.paths['resource/skins/MissionItemSkin.exml'] = window.MissionItemSkin = (function (_super) {
	__extends(MissionItemSkin, _super);
	function MissionItemSkin() {
		_super.call(this);
		this.skinParts = ["img_bg","lbl","star1","star2","star3"];
		
		this.height = 100;
		this.width = 100;
		this.elementsContent = [this.img_bg_i(),this.lbl_i(),this._Group1_i()];
	}
	var _proto = MissionItemSkin.prototype;

	_proto.img_bg_i = function () {
		var t = new eui.Image();
		this.img_bg = t;
		t.height = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(47,44,50,37);
		t.source = "yong_11_png";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.width = 100;
		return t;
	};
	_proto.lbl_i = function () {
		var t = new eui.Label();
		this.lbl = t;
		t.anchorOffsetY = 0;
		t.fontFamily = "SimHei";
		t.height = 80;
		t.horizontalCenter = 0;
		t.size = 60;
		t.text = "1";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.verticalCenter = -3;
		t.width = 80;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.star1_i(),this.star2_i(),this.star3_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = -10;
		return t;
	};
	_proto.star1_i = function () {
		var t = new eui.Image();
		this.star1 = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.smoothing = true;
		t.source = "star_b_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.star2_i = function () {
		var t = new eui.Image();
		this.star2 = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.smoothing = true;
		t.source = "star_b_png";
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto.star3_i = function () {
		var t = new eui.Image();
		this.star3 = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.smoothing = true;
		t.source = "star_b_png";
		t.x = 20;
		t.y = 20;
		return t;
	};
	return MissionItemSkin;
})(eui.Skin);generateEUI.paths['resource/skins/MissionSkin.exml'] = window.MissionSkin = (function (_super) {
	__extends(MissionSkin, _super);
	function MissionSkin() {
		_super.call(this);
		this.skinParts = ["img_bg","list","btn1","btn2","btn3","btn_back"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.img_bg_i(),this._Label1_i(),this._Image1_i(),this.list_i(),this.btn1_i(),this.btn2_i(),this.btn3_i(),this.btn_back_i()];
	}
	var _proto = MissionSkin.prototype;

	_proto.img_bg_i = function () {
		var t = new eui.Image();
		this.img_bg = t;
		t.height = 1334;
		t.scale9Grid = new egret.Rectangle(51,47,43,32);
		t.source = "yong_3_png";
		t.verticalCenter = 0;
		t.width = 750;
		t.x = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.background = false;
		t.backgroundColor = 0xffffff;
		t.bold = true;
		t.fontFamily = "SimHei";
		t.horizontalCenter = 0;
		t.size = 50;
		t.text = "选择关卡";
		t.textAlign = "center";
		t.textColor = 0x341cef;
		t.verticalAlign = "middle";
		t.y = 75;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 720;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(70,55,426,330);
		t.source = "reglogbg_png";
		t.width = 720;
		t.y = 206;
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.height = 640;
		t.horizontalCenter = 0;
		t.width = 640;
		t.y = 246;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalAlign = "left";
		t.horizontalGap = 34;
		t.orientation = "rows";
		t.verticalAlign = "top";
		t.verticalGap = 20;
		return t;
	};
	_proto.btn1_i = function () {
		var t = new eui.Button();
		this.btn1 = t;
		t.label = "舒尔特";
		t.name = "1";
		t.skinName = "BaseButton1Skin";
		t.x = 20;
		t.y = 150;
		return t;
	};
	_proto.btn2_i = function () {
		var t = new eui.Button();
		this.btn2 = t;
		t.label = "趣味";
		t.name = "2";
		t.skinName = "BaseButton1Skin";
		t.x = 180;
		t.y = 150;
		return t;
	};
	_proto.btn3_i = function () {
		var t = new eui.Button();
		this.btn3 = t;
		t.label = "瞬间记忆";
		t.name = "3";
		t.skinName = "BaseButton1Skin";
		t.x = 340;
		t.y = 150;
		return t;
	};
	_proto.btn_back_i = function () {
		var t = new eui.Button();
		this.btn_back = t;
		t.bottom = 31;
		t.label = "返回";
		t.right = 37;
		t.skinName = "BaseButton1Skin";
		return t;
	};
	return MissionSkin;
})(eui.Skin);generateEUI.paths['resource/skins/RankSkin.exml'] = window.RankSkin = (function (_super) {
	__extends(RankSkin, _super);
	function RankSkin() {
		_super.call(this);
		this.skinParts = ["rect_bg","lbl_2","lbl_title","img_rankgp","img_close"];
		
		this.height = 1335;
		this.width = 750;
		this.elementsContent = [this.rect_bg_i(),this._Image1_i(),this.lbl_2_i(),this.lbl_title_i(),this.img_rankgp_i(),this.img_close_i()];
	}
	var _proto = RankSkin.prototype;

	_proto.rect_bg_i = function () {
		var t = new eui.Rect();
		this.rect_bg = t;
		t.height = 1334;
		t.width = 750;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 742;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(12,12,76,76);
		t.source = "rank_bg_png";
		t.touchEnabled = false;
		t.width = 640;
		t.y = 200;
		return t;
	};
	_proto.lbl_2_i = function () {
		var t = new eui.Label();
		this.lbl_2 = t;
		t.fontFamily = "SimHei";
		t.size = 24;
		t.text = "每周一凌晨刷新";
		t.textColor = 0x727891;
		t.touchEnabled = false;
		t.x = 67;
		t.y = 208;
		return t;
	};
	_proto.lbl_title_i = function () {
		var t = new eui.Label();
		this.lbl_title = t;
		t.bold = true;
		t.fontFamily = "SimHei";
		t.horizontalCenter = 0;
		t.size = 36;
		t.text = "好友排行榜";
		t.textColor = 0xfffffe;
		t.touchEnabled = false;
		t.y = 60;
		return t;
	};
	_proto.img_rankgp_i = function () {
		var t = new eui.Image();
		this.img_rankgp = t;
		t.horizontalCenter = 0;
		t.source = "rank_button_png";
		t.y = 1146;
		return t;
	};
	_proto.img_close_i = function () {
		var t = new eui.Image();
		this.img_close = t;
		t.source = "rank_back_png";
		t.x = 30;
		t.y = 44;
		return t;
	};
	return RankSkin;
})(eui.Skin);generateEUI.paths['resource/skins/StartSkin.exml'] = window.StartSkin = (function (_super) {
	__extends(StartSkin, _super);
	function StartSkin() {
		_super.call(this);
		this.skinParts = ["img_bg","btn_start","btn_mission","btn_rank","btn_share","gp"];
		
		this.width = 750;
		this.elementsContent = [this.img_bg_i(),this.gp_i()];
	}
	var _proto = StartSkin.prototype;

	_proto.img_bg_i = function () {
		var t = new eui.Image();
		this.img_bg = t;
		t.height = 1334;
		t.scale9Grid = new egret.Rectangle(51,47,43,32);
		t.source = "yong_3_png";
		t.width = 750;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.gp_i = function () {
		var t = new eui.Group();
		this.gp = t;
		t.verticalCenter = 0;
		t.x = 55;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.btn_start_i(),this.btn_mission_i(),this._Group1_i(),this._Label1_i(),this._Label2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.height = 160;
		t.scale9Grid = new egret.Rectangle(68,0,17,94);
		t.source = "yong_11_png";
		t.width = 640;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 580;
		t.scale9Grid = new egret.Rectangle(68,66,50,25);
		t.source = "yong_11_png";
		t.width = 638.48;
		t.x = 1;
		t.y = 188;
		return t;
	};
	_proto.btn_start_i = function () {
		var t = new eui.Button();
		this.btn_start = t;
		t.label = "开始游戏";
		t.skinName = "BaseButtonSkin";
		t.x = 120;
		t.y = 780;
		return t;
	};
	_proto.btn_mission_i = function () {
		var t = new eui.Button();
		this.btn_mission = t;
		t.label = "选择关卡";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BaseButton1Skin";
		t.x = 240;
		t.y = 939;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 148;
		t.y = 1030;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.btn_rank_i(),this.btn_share_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 25;
		return t;
	};
	_proto.btn_rank_i = function () {
		var t = new eui.Button();
		this.btn_rank = t;
		t.label = "排行榜";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BaseButton1Skin";
		t.x = -112.99999999999997;
		t.y = -59;
		return t;
	};
	_proto.btn_share_i = function () {
		var t = new eui.Button();
		this.btn_share = t;
		t.label = "分享";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BaseButton1Skin";
		t.x = -102.99999999999997;
		t.y = -49;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.bold = true;
		t.italic = true;
		t.size = 66;
		t.text = "舒尔特方格";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 540;
		t.x = 56;
		t.y = 45;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.anchorOffsetY = 0;
		t.fontFamily = "SimHei";
		t.height = 544.3;
		t.lineSpacing = 2;
		t.multiline = true;
		t.size = 26;
		t.text = "“舒尔特方格”不但可以简单测量注意力水平，而且是很好的训练方法。又是心理咨询师进行心理治疗时常用的基本方法。 舒尔特表可以通过动态的练习锻炼视神经末梢。心理学上用此表来研究和发展心理感知的速度，其中包括视觉定向搜索运动的速度。 培养注意力集中、分配、控制能力；拓展视幅；加快视频 ；提高视觉的稳定性、辨别力、定向搜索能力。 练习的时间越长，看表所需的时间会越短。随着练习的深入，眼球的末梢视觉能力提高，不仅初学者可以有效地拓展视幅，加快阅读节奏，锻炼眼睛快速认读；而且对于进入提高阶段之后，同时拓展纵横视幅，达到一目十行、一目一页非常有效。 每表按字符顺序，迅速找全所有的字符，平均1个字符用1秒钟成绩为优良，即9格用9秒、16格用16秒、25格用25秒。 练习开始，达不到标准是非常正常的，切莫急躁。应该从9格开始练起。感觉熟练或比较轻松达到要求之后，再逐渐增加难度，千万不要因急于求成而使学习热情受挫。";
		t.width = 560;
		t.wordWrap = true;
		t.x = 40;
		t.y = 215.32;
		return t;
	};
	return StartSkin;
})(eui.Skin);