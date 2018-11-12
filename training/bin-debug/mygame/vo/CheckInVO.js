var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CheckInVO = (function () {
    function CheckInVO() {
        /** 今日首次登陆 */
        this.login_first_today = true;
        /** 连续签到天数 */
        this.continue_num = 0;
        /** 上次签到时间(精确到天) */
        this.checkin_date = 0;
        /** 今日是否已签到 */
        this.signed_today = false;
    }
    Object.defineProperty(CheckInVO.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (o) {
            this._data = o;
            if (o == null) {
                PropLogic.getInstance().updateProp(COINTYPE.HP, 50);
            }
            else {
                //自定义
                this.uid = o.uid;
                this.checkin_date = parseInt(o.checkin_date);
                this.continue_num = parseInt(o.continue_num);
                this.update_time = parseInt(o.update_time);
                this.total_num = parseInt(o.total_num);
                this.signed_today = TimeUtil.checkToday(this.checkin_date);
            }
        },
        enumerable: true,
        configurable: true
    });
    return CheckInVO;
}());
__reflect(CheckInVO.prototype, "CheckInVO");
//# sourceMappingURL=CheckInVO.js.map