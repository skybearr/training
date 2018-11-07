var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var LogoUI = (function (_super) {
    __extends(LogoUI, _super);
    function LogoUI() {
        var _this = _super.call(this) || this;
        /** 工作室logo */
        _this.logo_src = "logo_png";
        /** 工作室口号 */
        _this.logo_txt = "Domore Games\nGames can do more";
        _this.init();
        return _this;
    }
    LogoUI.prototype.init = function () {
        var _this = this;
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
        egret.Tween.get(this.logo).to({ y: GameConst.stageHeight / 2 - 100, scaleX: 1, scaleY: 1 }, 500, egret.Ease.backInOut).wait(100).call(function () {
            egret.Tween.get(_this.tf).to({ alpha: 1 }, 500).wait(1000).call(function () {
                fw.GameManager.getInstance().logoOver();
            }, _this);
        }, this);
    };
    return LogoUI;
}(egret.DisplayObjectContainer));
__reflect(LogoUI.prototype, "LogoUI");
//# sourceMappingURL=LogoUI.js.map