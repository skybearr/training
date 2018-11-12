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
var fw;
(function (fw) {
    var UIManager = (function (_super) {
        __extends(UIManager, _super);
        function UIManager() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        UIManager.getInstance = function () {
            if (this._instance == null) {
                this._instance = new UIManager();
            }
            return this._instance;
        };
        UIManager.prototype.init = function () {
            this.secCon = new egret.DisplayObjectContainer();
            this.broadcastCon = new egret.DisplayObjectContainer();
            this.fightCon = new egret.DisplayObjectContainer();
            this.loadingCon = new egret.DisplayObjectContainer();
            this.avgCon = new egret.DisplayObjectContainer();
            if (GameConst.GameStage != null) {
                GameConst.GameStage.addChild(this.secCon);
                GameConst.GameStage.addChild(this.broadcastCon);
                GameConst.GameStage.addChild(this.fightCon);
                GameConst.GameStage.addChild(this.avgCon);
                GameConst.GameStage.addChild(this.loadingCon);
            }
        };
        /**打开界面
         * @param uiname 类名 在UIConst中定义
         * @param uitype UI类型 fw.UITYPE.FIRST / SECOND
         */
        UIManager.prototype.openUI = function (uiname, params, uitype, tweentype) {
            if (params === void 0) { params = null; }
            if (uitype === void 0) { uitype = 1; }
            if (tweentype === void 0) { tweentype = 0; }
            if ((uitype == fw.UITYPE.FIRST && this.is_fst_ui_tween) || (uitype == fw.UITYPE.SECOND && this.is_sec_ui_tween)) {
                console.log("正在打开界面，禁止操作");
                return;
            }
            if (uitype == fw.UITYPE.FIRST) {
                this.is_fst_ui_tween = true;
            }
            else {
                this.is_sec_ui_tween = true;
            }
            var obj_class = egret.getDefinitionByName(uiname);
            var obj = { params: params, tweentype: tweentype };
            var ui = new obj_class(obj);
            ui.setParams(obj);
            if (uitype == fw.UITYPE.FIRST) {
                this.openFirstUI(ui, tweentype);
            }
            else {
                this.openSecondUI(ui, tweentype);
            }
        };
        /** 打开2级界面
         * @param ui
         * @param tweentype 动画类型 默认1 小到大渐变
         */
        UIManager.prototype.openFirstUI = function (ui, tweentype) {
            if (tweentype === void 0) { tweentype = 1; }
            this.main.addChild(ui);
            this.secCon.removeChildren();
            if (this.main.numChildren == 0) {
                this.openFirstUIFinish();
                return;
            }
            //只接受一个一级界面存在，所以当大于一个的时候，先移除底下多余的
            while (this.main.numChildren > 1) {
                this.main.removeChildAt(0);
            }
            switch (tweentype) {
                case fw.TWEENTYPE.NONE:
                    this.openFirstUIFinish();
                    break;
                case fw.TWEENTYPE.MOVE_OVERRIDE:
                    break;
                case fw.TWEENTYPE.MOVE_PUSH:
                    break;
                case fw.TWEENTYPE.SCALE:
                    EffectUtil.Open(ui, this.openFirstUIFinish, this);
                    break;
                case fw.TWEENTYPE.ROTAION:
                    break;
            }
        };
        UIManager.prototype.openFirstUIFinish = function () {
            this.is_fst_ui_tween = false;
            while (this.main.numChildren > 1) {
                this.main.removeChildAt(0);
            }
        };
        /** 打开2级界面
         * @param ui
         * @param tweentype 动画类型 默认1 小到大渐变
         */
        UIManager.prototype.openSecondUI = function (ui, tweentype) {
            if (tweentype === void 0) { tweentype = 1; }
            this.secCon.addChild(ui);
            switch (tweentype) {
                case fw.TWEENTYPE.NONE:
                    this.openSecondUIFinish();
                    break;
                case fw.TWEENTYPE.MOVE_OVERRIDE:
                    break;
                case fw.TWEENTYPE.MOVE_PUSH:
                    break;
                case fw.TWEENTYPE.SCALE:
                    EffectUtil.Open(ui, this.openSecondUIFinish, this);
                    break;
                case fw.TWEENTYPE.ROTAION:
                    break;
            }
        };
        UIManager.prototype.openSecondUIFinish = function () {
            this.is_sec_ui_tween = false;
        };
        /** 显示loading界面
         * @param b 是否显示  true显示  false关闭
         * @param type 类型 LOADINGTYPE.XXXX
         */
        UIManager.prototype.showLoading = function (b, type) {
            if (type === void 0) { type = 1; }
            b = false;
            if (b) {
                if (this.loadingView == null) {
                    this.loadingView = new fw.LoadingUI();
                }
                UIManager.getInstance().loadingCon.addChild(this.loadingView);
                this.loadingView.setLoadType(type);
            }
            else {
                if (this.loadingView != null) {
                    this.loadingView.reset();
                    UIManager.getInstance().loadingCon.removeChildren();
                }
            }
        };
        return UIManager;
    }(egret.EventDispatcher));
    fw.UIManager = UIManager;
    __reflect(UIManager.prototype, "fw.UIManager");
})(fw || (fw = {}));
//# sourceMappingURL=UIManager.js.map