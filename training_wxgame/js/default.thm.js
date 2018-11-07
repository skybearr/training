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
                generateEUI.skins = {};generateEUI.paths['resource/skins/AvgSkin.exml'] = window.AvgSkin = (function (_super) {
	__extends(AvgSkin, _super);
	function AvgSkin() {
		_super.call(this);
		this.skinParts = ["bg","txt"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Rect1_i(),this.bg_i(),this._Rect2_i(),this.txt_i()];
	}
	var _proto = AvgSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0x180707;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Group();
		this.bg = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.y = 0;
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		t.alpha = 0.6;
		t.bottom = 0;
		t.fillColor = 0x372813;
		t.height = 560;
		t.width = 750;
		t.x = 0;
		return t;
	};
	_proto.txt_i = function () {
		var t = new eui.Label();
		this.txt = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft Sans Serif";
		t.height = 450;
		t.horizontalCenter = 0;
		t.lineSpacing = 5;
		t.size = 18;
		t.textAlign = "left";
		t.touchEnabled = false;
		t.verticalAlign = "top";
		t.width = 640;
		t.y = 820;
		return t;
	};
	return AvgSkin;
})(eui.Skin);generateEUI.paths['resource/skins/BaseButton1Skin.exml'] = window.BaseButton1Skin = (function (_super) {
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
		t.size = 32;
		t.text = "150体力";
		t.textAlign = "center";
		t.textColor = 0x161616;
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
})(eui.Skin);generateEUI.paths['resource/skins/GameSkin.exml'] = window.GameSkin = (function (_super) {
	__extends(GameSkin, _super);
	function GameSkin() {
		_super.call(this);
		this.skinParts = ["img_bg","lbl_time","list","btn_back","btn_mission","btn_tips","lbl_num","img_1","lbl_des","btn_start","gp"];
		
		this.width = 750;
		this.elementsContent = [this.img_bg_i(),this.lbl_time_i(),this.list_i(),this._Group1_i(),this.btn_tips_i(),this.lbl_num_i(),this.gp_i()];
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
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 1007;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.btn_back_i(),this.btn_mission_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 20;
		return t;
	};
	_proto.btn_back_i = function () {
		var t = new eui.Button();
		this.btn_back = t;
		t.height = 100;
		t.label = "返回首页";
		t.skinName = "BaseButton1Skin";
		t.width = 260;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.btn_mission_i = function () {
		var t = new eui.Button();
		this.btn_mission = t;
		t.height = 100;
		t.label = "返回训练模式";
		t.skinName = "BaseButton1Skin";
		t.width = 260;
		t.x = 0;
		t.y = 998;
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
})(eui.Skin);generateEUI.paths['resource/skins/InviteItemSkin.exml'] = window.InviteItemSkin = (function (_super) {
	__extends(InviteItemSkin, _super);
	function InviteItemSkin() {
		_super.call(this);
		this.skinParts = ["rect_bg","lbl_name","img","btn_get","lbl_num1","lbl_num2"];
		
		this.height = 300;
		this.width = 160;
		this.elementsContent = [this.rect_bg_i(),this.lbl_name_i(),this.img_i(),this.btn_get_i(),this._Image1_i(),this.lbl_num1_i(),this._Image2_i(),this.lbl_num2_i()];
	}
	var _proto = InviteItemSkin.prototype;

	_proto.rect_bg_i = function () {
		var t = new eui.Rect();
		this.rect_bg = t;
		t.fillColor = 0xd6660a;
		t.height = 300;
		t.width = 160;
		return t;
	};
	_proto.lbl_name_i = function () {
		var t = new eui.Label();
		this.lbl_name = t;
		t.bold = true;
		t.fontFamily = "SimHei";
		t.horizontalCenter = 0;
		t.size = 26;
		t.text = "邀请礼包";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.y = 19;
		return t;
	};
	_proto.img_i = function () {
		var t = new eui.Image();
		this.img = t;
		t.height = 20;
		t.horizontalCenter = 0;
		t.width = 20;
		t.y = 70;
		return t;
	};
	_proto.btn_get_i = function () {
		var t = new eui.Button();
		this.btn_get = t;
		t.bottom = 15;
		t.height = 40;
		t.horizontalCenter = 0;
		t.label = "领取";
		t.skinName = "BaseButton1Skin";
		t.width = 120;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 40;
		t.source = "star_a_png";
		t.width = 40;
		t.x = 20;
		t.y = 159;
		return t;
	};
	_proto.lbl_num1_i = function () {
		var t = new eui.Label();
		this.lbl_num1 = t;
		t.anchorOffsetX = 0;
		t.text = "1000";
		t.width = 85;
		t.x = 61;
		t.y = 165;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 40;
		t.source = "star_a_png";
		t.visible = false;
		t.width = 40;
		t.x = 20;
		t.y = 198;
		return t;
	};
	_proto.lbl_num2_i = function () {
		var t = new eui.Label();
		this.lbl_num2 = t;
		t.anchorOffsetX = 0;
		t.text = "1000";
		t.visible = false;
		t.width = 85;
		t.x = 61;
		t.y = 204;
		return t;
	};
	return InviteItemSkin;
})(eui.Skin);generateEUI.paths['resource/skins/InviteSkin.exml'] = window.InviteSkin = (function (_super) {
	__extends(InviteSkin, _super);
	function InviteSkin() {
		_super.call(this);
		this.skinParts = ["rect_bg","btn_close","btn_invite","list","scroller"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.rect_bg_i(),this._Label1_i(),this.btn_close_i(),this.btn_invite_i(),this.scroller_i()];
	}
	var _proto = InviteSkin.prototype;

	_proto.rect_bg_i = function () {
		var t = new eui.Rect();
		this.rect_bg = t;
		t.fillColor = 0x888888;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.fontFamily = "SimHei";
		t.horizontalCenter = 0;
		t.size = 50;
		t.text = "邀请礼包";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.y = 40;
		return t;
	};
	_proto.btn_close_i = function () {
		var t = new eui.Button();
		this.btn_close = t;
		t.bottom = 60;
		t.label = "关闭";
		t.skinName = "BaseButton1Skin";
		t.x = 565;
		return t;
	};
	_proto.btn_invite_i = function () {
		var t = new eui.Button();
		this.btn_invite = t;
		t.bottom = 60;
		t.horizontalCenter = -72;
		t.label = "邀请好友";
		t.skinName = "BaseButton1Skin";
		return t;
	};
	_proto.scroller_i = function () {
		var t = new eui.Scroller();
		this.scroller = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 300;
		t.horizontalCenter = 0;
		t.width = 658;
		t.y = 175;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	return InviteSkin;
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
		t.size = 36;
		t.stroke = 2;
		t.strokeColor = 0xff0000;
		t.text = "速记1";
		t.textAlign = "center";
		t.textColor = 0xead410;
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 80;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.visible = false;
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
		this.skinParts = ["img_bg","list","btn1","btn2","btn3","btn_back","gp_1"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.img_bg_i(),this._Label1_i(),this._Image1_i(),this.list_i(),this.btn1_i(),this.btn2_i(),this.btn3_i(),this.btn_back_i(),this.gp_1_i()];
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
		t.text = "训练模式";
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
		t.bottom = 233;
		t.height = 100;
		t.horizontalCenter = 0;
		t.label = "返回";
		t.skinName = "BaseButton1Skin";
		t.width = 260;
		return t;
	};
	_proto.gp_1_i = function () {
		var t = new eui.Group();
		this.gp_1 = t;
		t.x = 303;
		t.y = 460;
		t.elementsContent = [this._Image2_i(),this._Label2_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 120;
		t.scale9Grid = new egret.Rectangle(18,15,109,34);
		t.scaleY = -1;
		t.source = "skin_zibg_png";
		t.x = 0;
		t.y = 74;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.fontFamily = "SimHei";
		t.stroke = 2;
		t.text = "经典5x5";
		t.x = 20;
		t.y = 7;
		return t;
	};
	return MissionSkin;
})(eui.Skin);generateEUI.paths['resource/skins/NoticeSkin.exml'] = window.NoticeSkin = (function (_super) {
	__extends(NoticeSkin, _super);
	function NoticeSkin() {
		_super.call(this);
		this.skinParts = ["img_bg","lbl_version","lbl_content"];
		
		this.width = 750;
		this.elementsContent = [this.img_bg_i(),this._Label1_i(),this.lbl_version_i(),this.lbl_content_i()];
	}
	var _proto = NoticeSkin.prototype;

	_proto.img_bg_i = function () {
		var t = new eui.Image();
		this.img_bg = t;
		t.height = 1334;
		t.scale9Grid = new egret.Rectangle(24,6,150,40);
		t.source = "start_button_png";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.width = 750;
		t.x = -1;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 88;
		t.text = "世界公告";
		t.touchEnabled = false;
		t.verticalAlign = "bottom";
		t.y = 109.85;
		return t;
	};
	_proto.lbl_version_i = function () {
		var t = new eui.Label();
		this.lbl_version = t;
		t.fontFamily = "SimHei";
		t.horizontalCenter = 200;
		t.size = 32;
		t.text = "版本号：1.2";
		t.touchEnabled = false;
		t.verticalAlign = "bottom";
		t.y = 1255.31;
		return t;
	};
	_proto.lbl_content_i = function () {
		var t = new eui.Label();
		this.lbl_content = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "SimHei";
		t.height = 865.27;
		t.horizontalCenter = 0;
		t.size = 32;
		t.text = "世界公告";
		t.textAlign = "left";
		t.touchEnabled = false;
		t.verticalAlign = "top";
		t.width = 614.12;
		t.y = 286.36;
		return t;
	};
	return NoticeSkin;
})(eui.Skin);generateEUI.paths['resource/skins/RankItemSkin.exml'] = window.RankItemSkin = (function (_super) {
	__extends(RankItemSkin, _super);
	function RankItemSkin() {
		_super.call(this);
		this.skinParts = ["bg_rect","lbl_rank","img_rank","img_head","lbl_name","lbl_score"];
		
		this.height = 100;
		this.width = 640;
		this.elementsContent = [this.bg_rect_i(),this.lbl_rank_i(),this.img_rank_i(),this.img_head_i(),this.lbl_name_i(),this.lbl_score_i()];
	}
	var _proto = RankItemSkin.prototype;

	_proto.bg_rect_i = function () {
		var t = new eui.Rect();
		this.bg_rect = t;
		t.fillColor = 0x8defb6;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lbl_rank_i = function () {
		var t = new eui.Label();
		this.lbl_rank = t;
		t.bold = true;
		t.fontFamily = "SimHei";
		t.size = 36;
		t.text = "99";
		t.textAlign = "left";
		t.textColor = 0xf24343;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 50;
		t.x = 40;
		return t;
	};
	_proto.img_rank_i = function () {
		var t = new eui.Image();
		this.img_rank = t;
		t.source = "framework_json.rank_icon1";
		t.verticalCenter = 0;
		t.visible = false;
		t.x = 40;
		return t;
	};
	_proto.img_head_i = function () {
		var t = new eui.Image();
		this.img_head = t;
		t.height = 48;
		t.source = "";
		t.verticalCenter = 0;
		t.width = 48;
		t.x = 98;
		return t;
	};
	_proto.lbl_name_i = function () {
		var t = new eui.Label();
		this.lbl_name = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "SimHei";
		t.text = "名字最长几个字";
		t.textAlign = "left";
		t.textColor = 0xffffff;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 264;
		t.x = 170;
		return t;
	};
	_proto.lbl_score_i = function () {
		var t = new eui.Label();
		this.lbl_score = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "SimHei";
		t.right = 50;
		t.text = "567";
		t.textAlign = "right";
		t.textColor = 0xffffff;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 150;
		return t;
	};
	return RankItemSkin;
})(eui.Skin);generateEUI.paths['resource/skins/RankSkin.exml'] = window.RankSkin = (function (_super) {
	__extends(RankSkin, _super);
	function RankSkin() {
		_super.call(this);
		this.skinParts = ["rect_bg","lbl_title","lbl_2","list_world","scroller_world","img_rankgp","img_close","img_tag1","img_tag2","lbl_tag1","lbl_tag2","gp_world"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.rect_bg_i(),this.lbl_title_i(),this._Image1_i(),this.lbl_2_i(),this.scroller_world_i(),this.img_rankgp_i(),this.img_close_i(),this.gp_world_i()];
	}
	var _proto = RankSkin.prototype;

	_proto.rect_bg_i = function () {
		var t = new eui.Rect();
		this.rect_bg = t;
		t.fillColor = 0x1c1b1b;
		t.height = 1334;
		t.width = 750;
		t.x = 0;
		t.y = 0;
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
		t.y = 90;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 742;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(12,12,76,76);
		t.source = "framework_json.rank_bg";
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
	_proto.scroller_world_i = function () {
		var t = new eui.Scroller();
		this.scroller_world = t;
		t.anchorOffsetY = 0;
		t.height = 700;
		t.horizontalCenter = 0;
		t.width = 640;
		t.y = 242;
		t.viewport = this.list_world_i();
		return t;
	};
	_proto.list_world_i = function () {
		var t = new eui.List();
		this.list_world = t;
		return t;
	};
	_proto.img_rankgp_i = function () {
		var t = new eui.Image();
		this.img_rankgp = t;
		t.horizontalCenter = 0;
		t.source = "framework_json.rank_button";
		t.y = 1140;
		return t;
	};
	_proto.img_close_i = function () {
		var t = new eui.Image();
		this.img_close = t;
		t.source = "framework_json.rank_back";
		t.x = 30;
		t.y = 38;
		return t;
	};
	_proto.gp_world_i = function () {
		var t = new eui.Group();
		this.gp_world = t;
		t.visible = false;
		t.x = 55;
		t.y = 106;
		t.elementsContent = [this._Image2_i(),this.img_tag1_i(),this.img_tag2_i(),this.lbl_tag1_i(),this.lbl_tag2_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "framework_json.rank_tagbg";
		t.width = 640;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.img_tag1_i = function () {
		var t = new eui.Image();
		this.img_tag1 = t;
		t.source = "framework_json.rank_tag";
		t.width = 320;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.img_tag2_i = function () {
		var t = new eui.Image();
		this.img_tag2 = t;
		t.scaleX = -1;
		t.source = "framework_json.rank_tag";
		t.width = 320;
		t.x = 640;
		t.y = 0;
		return t;
	};
	_proto.lbl_tag1_i = function () {
		var t = new eui.Label();
		this.lbl_tag1 = t;
		t.bold = true;
		t.fontFamily = "SimHei";
		t.size = 36;
		t.text = "好友排行";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.x = 89;
		t.y = 22;
		return t;
	};
	_proto.lbl_tag2_i = function () {
		var t = new eui.Label();
		this.lbl_tag2 = t;
		t.bold = true;
		t.fontFamily = "SimHei";
		t.size = 36;
		t.text = "世界排行";
		t.textColor = 0x000000;
		t.touchEnabled = false;
		t.x = 405;
		t.y = 22;
		return t;
	};
	return RankSkin;
})(eui.Skin);generateEUI.paths['resource/skins/RankTypeItemSkin.exml'] = window.RankTypeItemSkin = (function (_super) {
	__extends(RankTypeItemSkin, _super);
	function RankTypeItemSkin() {
		_super.call(this);
		this.skinParts = ["rect_bg","lbl"];
		
		this.height = 30;
		this.width = 71;
		this.elementsContent = [this.rect_bg_i(),this.lbl_i()];
	}
	var _proto = RankTypeItemSkin.prototype;

	_proto.rect_bg_i = function () {
		var t = new eui.Rect();
		this.rect_bg = t;
		t.fillColor = 0xf2fc8d;
		t.percentHeight = 100;
		t.width = 71;
		return t;
	};
	_proto.lbl_i = function () {
		var t = new eui.Label();
		this.lbl = t;
		t.fontFamily = "SimHei";
		t.horizontalCenter = 0;
		t.size = 20;
		t.stroke = 2;
		t.text = "速记20";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 71;
		return t;
	};
	return RankTypeItemSkin;
})(eui.Skin);generateEUI.paths['resource/skins/StartSkin.exml'] = window.StartSkin = (function (_super) {
	__extends(StartSkin, _super);
	function StartSkin() {
		_super.call(this);
		this.skinParts = ["img_bg","btn_mission","btn_grow","lbl_hp","btn_sign","btn_turn","btn_invite","btn_role","btn_rank","btn_share","gp","btn_0","btn_1","btn_2","btn_3","btn_4","btn_5","btn_6","btn_7","btn_8"];
		
		this.width = 750;
		this.elementsContent = [this.img_bg_i(),this.gp_i(),this._Group3_i()];
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
		t.horizontalCenter = 0;
		t.y = 100;
		t.elementsContent = [this._Image1_i(),this._Label1_i(),this._Image2_i(),this._Label2_i(),this._Group1_i(),this.lbl_hp_i(),this._Group2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.height = 140;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(68,0,17,94);
		t.source = "yong_11_png";
		t.width = 640;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.bold = true;
		t.fontFamily = "SimHei";
		t.horizontalCenter = 0;
		t.italic = true;
		t.size = 60;
		t.text = "舒尔特方格";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 540;
		t.y = 37.04;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 210;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(68,66,50,25);
		t.source = "yong_11_png";
		t.width = 638.48;
		t.y = 156;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.anchorOffsetY = 0;
		t.fontFamily = "SimHei";
		t.height = 162;
		t.horizontalCenter = 0;
		t.lineSpacing = 6;
		t.multiline = true;
		t.size = 26;
		t.text = "“舒尔特方格”不但可以简单测量注意力水平，而且是很好的训练方法。舒尔特表可以通过动态的练习锻炼视神经末梢 培养注意力集中、分配、控制能力；拓展视幅；加快视频 ；提高视觉的稳定性、辨别力、定向搜索能力。";
		t.width = 560;
		t.wordWrap = true;
		t.y = 182;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.y = 420;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this.btn_mission_i(),this.btn_grow_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 20;
		return t;
	};
	_proto.btn_mission_i = function () {
		var t = new eui.Button();
		this.btn_mission = t;
		t.height = 120;
		t.label = "训练模式";
		t.skinName = "BaseButtonSkin";
		t.width = 400;
		t.x = 249;
		t.y = 0;
		return t;
	};
	_proto.btn_grow_i = function () {
		var t = new eui.Button();
		this.btn_grow = t;
		t.height = 120;
		t.label = "过关模式";
		t.skinName = "BaseButtonSkin";
		t.width = 400;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lbl_hp_i = function () {
		var t = new eui.Label();
		this.lbl_hp = t;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.fontFamily = "SimHei";
		t.horizontalCenter = 0;
		t.lineSpacing = 6;
		t.multiline = true;
		t.size = 36;
		t.stroke = 2;
		t.strokeColor = 0xbcff02;
		t.text = "当前体力：99999";
		t.textAlign = "center";
		t.textColor = 0xf78900;
		t.verticalAlign = "middle";
		t.width = 560;
		t.wordWrap = true;
		t.y = 732;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.width = 500;
		t.y = 802;
		t.layout = this._TileLayout1_i();
		t.elementsContent = [this.btn_sign_i(),this.btn_turn_i(),this.btn_invite_i(),this.btn_role_i(),this.btn_rank_i(),this.btn_share_i()];
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.orientation = "rows";
		t.verticalGap = 40;
		return t;
	};
	_proto.btn_sign_i = function () {
		var t = new eui.Button();
		this.btn_sign = t;
		t.bottom = 251;
		t.label = "每日签到";
		t.left = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BaseButton1Skin";
		t.x = -203.00000000000003;
		t.y = 0.6900000000000546;
		return t;
	};
	_proto.btn_turn_i = function () {
		var t = new eui.Button();
		this.btn_turn = t;
		t.label = "抽奖";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BaseButton1Skin";
		t.x = -112.99999999999997;
		t.y = -59;
		return t;
	};
	_proto.btn_invite_i = function () {
		var t = new eui.Button();
		this.btn_invite = t;
		t.label = "邀请礼包";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BaseButton1Skin";
		t.x = -92.99999999999997;
		t.y = -39;
		return t;
	};
	_proto.btn_role_i = function () {
		var t = new eui.Button();
		this.btn_role = t;
		t.label = "人物属性";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BaseButton1Skin";
		t.x = -82.99999999999997;
		t.y = -29;
		return t;
	};
	_proto.btn_rank_i = function () {
		var t = new eui.Button();
		this.btn_rank = t;
		t.label = "排行榜";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BaseButton1Skin";
		t.x = -72.99999999999997;
		t.y = -19;
		return t;
	};
	_proto.btn_share_i = function () {
		var t = new eui.Button();
		this.btn_share = t;
		t.label = "分享";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BaseButton1Skin";
		t.x = -62.99999999999997;
		t.y = -9;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = 513;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.btn_0_i(),this.btn_1_i(),this.btn_2_i(),this.btn_3_i(),this.btn_4_i(),this.btn_5_i(),this.btn_6_i(),this.btn_7_i(),this.btn_8_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 15;
		return t;
	};
	_proto.btn_0_i = function () {
		var t = new eui.Label();
		this.btn_0 = t;
		t.background = true;
		t.bold = true;
		t.height = 66;
		t.text = "0";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.width = 66;
		t.x = 471;
		t.y = 0;
		return t;
	};
	_proto.btn_1_i = function () {
		var t = new eui.Label();
		this.btn_1 = t;
		t.background = true;
		t.bold = true;
		t.height = 66;
		t.text = "1";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.width = 66;
		t.x = 481;
		t.y = 10;
		return t;
	};
	_proto.btn_2_i = function () {
		var t = new eui.Label();
		this.btn_2 = t;
		t.background = true;
		t.bold = true;
		t.height = 66;
		t.text = "2";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.width = 66;
		t.x = 491;
		t.y = 20;
		return t;
	};
	_proto.btn_3_i = function () {
		var t = new eui.Label();
		this.btn_3 = t;
		t.background = true;
		t.bold = true;
		t.height = 66;
		t.text = "3";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.width = 66;
		t.x = 501;
		t.y = 30;
		return t;
	};
	_proto.btn_4_i = function () {
		var t = new eui.Label();
		this.btn_4 = t;
		t.background = true;
		t.bold = true;
		t.height = 66;
		t.text = "4";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.width = 66;
		t.x = 511;
		t.y = 40;
		return t;
	};
	_proto.btn_5_i = function () {
		var t = new eui.Label();
		this.btn_5 = t;
		t.background = true;
		t.bold = true;
		t.height = 66;
		t.text = "5";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.width = 66;
		t.x = 521;
		t.y = 50;
		return t;
	};
	_proto.btn_6_i = function () {
		var t = new eui.Label();
		this.btn_6 = t;
		t.background = true;
		t.bold = true;
		t.height = 66;
		t.text = "6";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.width = 66;
		t.x = 531;
		t.y = 60;
		return t;
	};
	_proto.btn_7_i = function () {
		var t = new eui.Label();
		this.btn_7 = t;
		t.background = true;
		t.bold = true;
		t.height = 66;
		t.text = "7";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.width = 66;
		t.x = 541;
		t.y = 70;
		return t;
	};
	_proto.btn_8_i = function () {
		var t = new eui.Label();
		this.btn_8 = t;
		t.background = true;
		t.bold = true;
		t.height = 66;
		t.text = "8";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.width = 66;
		t.x = 551;
		t.y = 80;
		return t;
	};
	return StartSkin;
})(eui.Skin);generateEUI.paths['resource/skins/TurnItemSkin.exml'] = window.TurnItemSkin = (function (_super) {
	__extends(TurnItemSkin, _super);
	function TurnItemSkin() {
		_super.call(this);
		this.skinParts = ["rect","lbl"];
		
		this.height = 120;
		this.width = 120;
		this.elementsContent = [this.rect_i(),this.lbl_i()];
	}
	var _proto = TurnItemSkin.prototype;

	_proto.rect_i = function () {
		var t = new eui.Rect();
		this.rect = t;
		t.fillColor = 0x07f4ef;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lbl_i = function () {
		var t = new eui.Label();
		this.lbl = t;
		t.text = "Label";
		t.textColor = 0x000000;
		t.x = 20;
		t.y = 45;
		return t;
	};
	return TurnItemSkin;
})(eui.Skin);generateEUI.paths['resource/skins/TurnSkin.exml'] = window.TurnSkin = (function (_super) {
	__extends(TurnSkin, _super);
	function TurnSkin() {
		_super.call(this);
		this.skinParts = ["rect_bg","btn_close","gp_items","btn_1","btn_2","lbl_cd1","lbl_cd2"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.rect_bg_i(),this._Label1_i(),this.btn_close_i(),this.gp_items_i(),this._Group1_i(),this.lbl_cd1_i(),this.lbl_cd2_i()];
	}
	var _proto = TurnSkin.prototype;

	_proto.rect_bg_i = function () {
		var t = new eui.Rect();
		this.rect_bg = t;
		t.fillColor = 0x888888;
		t.height = 1334;
		t.width = 750;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.fontFamily = "SimHei";
		t.horizontalCenter = 0;
		t.size = 40;
		t.text = "抽奖";
		t.y = 17.03;
		return t;
	};
	_proto.btn_close_i = function () {
		var t = new eui.Button();
		this.btn_close = t;
		t.label = "关闭";
		t.skinName = "BaseButton1Skin";
		t.x = 557.4;
		t.y = 1239.18;
		return t;
	};
	_proto.gp_items_i = function () {
		var t = new eui.Group();
		this.gp_items = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.top = 200;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 1102.7;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.btn_1_i(),this.btn_2_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 60;
		return t;
	};
	_proto.btn_1_i = function () {
		var t = new eui.Button();
		this.btn_1 = t;
		t.label = "开始抽奖";
		t.skinName = "BaseButton1Skin";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.btn_2_i = function () {
		var t = new eui.Button();
		this.btn_2 = t;
		t.label = "免费抽奖";
		t.skinName = "BaseButton1Skin";
		t.x = 268.06;
		t.y = 0;
		return t;
	};
	_proto.lbl_cd1_i = function () {
		var t = new eui.Label();
		this.lbl_cd1 = t;
		t.text = "12:00:00";
		t.x = 209.02;
		t.y = 1162.7;
		return t;
	};
	_proto.lbl_cd2_i = function () {
		var t = new eui.Label();
		this.lbl_cd2 = t;
		t.text = "12:00:00";
		t.x = 428.24;
		t.y = 1162.7;
		return t;
	};
	return TurnSkin;
})(eui.Skin);