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
var AchieveItemUI = (function (_super) {
    __extends(AchieveItemUI, _super);
    function AchieveItemUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "AchieveItemSkin";
        return _this;
    }
    AchieveItemUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGet, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
    };
    AchieveItemUI.prototype.dataChanged = function () {
        if (this.data == null) {
            return;
        }
        var vo = this.data;
        this.lbl_name.text = vo.title;
        var str = "";
        for (var i = 0; i < vo.reward.length; i++) {
            if (str.length > 0) {
                str += "";
            }
            var a = vo.reward[i].split(":");
            str += (PropLogic.getInstance().getPropNameByID(parseInt(a[0])) + " X" + parseInt(a[1]));
            if (i < vo.reward.length - 1) {
                str += "\n";
            }
        }
        this.lbl_reward.text = str;
        // this.lbl_progress.text = "已" + StringUtil.getSwfLangStrVar(DataBase.ACHIEVE_STR[vo.type], [AchieveLogic.getInstance().getAchieveTypeValue(vo.type) + ""]);
        this.btn.label = vo.state == 0 ? "未达成" : (vo.state == 1 ? "领取" : "已领取");
        this.btn.filters = vo.state != 1 ? FilterUtil.getGrayFilter() : null;
    };
    AchieveItemUI.prototype.clickGet = function () {
        if (this.data.state != 1) {
            return;
        }
        this.data.state = 2;
        this.btn.label = this.data.state == 0 ? "未达成" : (this.data.state == 1 ? "领取" : "已领取");
        AchieveLogic.getInstance().getReward(this.data.id);
    };
    AchieveItemUI.prototype.clear = function () {
        this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGet, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
        this.data = null;
    };
    return AchieveItemUI;
}(eui.ItemRenderer));
__reflect(AchieveItemUI.prototype, "AchieveItemUI");
//# sourceMappingURL=AchieveItemUI.js.map