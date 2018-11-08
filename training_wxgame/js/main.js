var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * 用户信息
 *
 */
var UserInfo = (function () {
    function UserInfo() {
    }
    return UserInfo;
}());
__reflect(UserInfo.prototype, "UserInfo");
var fw;
(function (fw) {
    var BaseUI = (function (_super) {
        __extends(BaseUI, _super);
        function BaseUI(skinname) {
            var _this = _super.call(this) || this;
            _this.tweentype = 0;
            _this.skinName = skinname;
            return _this;
        }
        BaseUI.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.checkFit();
            this.initData();
            this.initView();
            this.initEvent();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
            if (this.btn_close != null) {
                this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickClose, this);
            }
            if (this.img_close != null) {
                this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickClose, this);
            }
        };
        /** 打开UI时的附带参数 */
        BaseUI.prototype.setParams = function (params) {
            this.args = params.params;
            this.tweentype = params.tweentype;
        };
        /**适配处理 */
        BaseUI.prototype.checkFit = function () {
            this.height = GameConst.stageHeight;
            if (this.img_bg != null) {
                this.img_bg.height = GameConst.stageHeight;
            }
            if (this.rect_bg != null) {
                this.rect_bg.height = GameConst.stageHeight;
            }
        };
        /**初始化数据 */
        BaseUI.prototype.initData = function () {
        };
        /**初始化界面 */
        BaseUI.prototype.initView = function () {
        };
        /**初始化事件 */
        BaseUI.prototype.initEvent = function () {
        };
        BaseUI.prototype.clear = function () {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
            if (this.btn_close != null) {
                this.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickClose, this);
            }
            if (this.img_close != null) {
                this.img_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickClose, this);
            }
        };
        BaseUI.prototype.clickClose = function () {
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
        };
        return BaseUI;
    }(eui.Component));
    fw.BaseUI = BaseUI;
    __reflect(BaseUI.prototype, "fw.BaseUI");
})(fw || (fw = {}));
var MissionItemUI = (function (_super) {
    __extends(MissionItemUI, _super);
    function MissionItemUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "MissionItemSkin";
        return _this;
    }
    MissionItemUI.prototype.setVO = function (vo) {
        this.initView(vo);
    };
    MissionItemUI.prototype.dataChanged = function () {
        if (this.data == null) {
            return;
        }
        var vo = this.data;
        this.initView(vo);
    };
    MissionItemUI.prototype.initView = function (vo) {
        this.lbl.text = vo.name;
        this.lbl.textColor = 0xffffff;
        if (vo.state == 2) {
            for (var i = 1; i <= 3; i++) {
                this['star' + i].source = RES.getRes(i <= vo.stars ? "star_a_png" : "star_b_png");
            }
        }
    };
    return MissionItemUI;
}(eui.ItemRenderer));
__reflect(MissionItemUI.prototype, "MissionItemUI");
window['MissionItemUI'] = MissionItemUI;
/**
 * 过关模式基类
 * 过关类型
 * 1：舒尔特方格 tar：规定时间内完成，time最后一个
 * 2：速记 tar：记住所有
 * 3：舒尔特方格，坑爹游戏 tar：完成最后一步 star：time
 * 4：猜成语 tar：
 */
var GameBaseUI = (function (_super) {
    __extends(GameBaseUI, _super);
    function GameBaseUI(skinname, vo) {
        var _this = _super.call(this) || this;
        _this.skinName = skinname;
        _this.vo = vo;
        return _this;
    }
    GameBaseUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.checkFit();
        this.initData();
        this.initView();
        this.initEvent();
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
    };
    /**适配处理 */
    GameBaseUI.prototype.checkFit = function () {
        this.img_bg.height = this.img_1.height = GameConst.stageHeight;
    };
    /**初始化数据 */
    GameBaseUI.prototype.initData = function () {
    };
    /**初始化界面 */
    GameBaseUI.prototype.initView = function () {
    };
    /**初始化事件 */
    GameBaseUI.prototype.initEvent = function () {
    };
    GameBaseUI.prototype.clear = function () {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
        this.vo = null;
    };
    return GameBaseUI;
}(eui.Component));
__reflect(GameBaseUI.prototype, "GameBaseUI");
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
var NoticeVO = (function () {
    function NoticeVO() {
        this.version_client = "1.1";
    }
    Object.defineProperty(NoticeVO.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (o) {
            this._data = o;
            //自定义
            this.content = o.content;
            this.update_time = parseInt(o.update_time);
            this.version_server = o.version;
            if (this.version_client != this.version_server) {
                fw.UIManager.getInstance().openUI(UIConst.NOTICE, null, fw.UITYPE.SECOND);
                this.version_client = this.version_server;
            }
        },
        enumerable: true,
        configurable: true
    });
    return NoticeVO;
}());
__reflect(NoticeVO.prototype, "NoticeVO");
/**
 * 所有后台配置数据
 * 根据自己需要在set data中处理数据
 */
var SettingVO = (function () {
    function SettingVO() {
        /** 播放视频间隔 */
        this.rewardCD = 180;
    }
    Object.defineProperty(SettingVO.prototype, "data", {
        get: function () {
            return this._data;
        },
        /** 所有后台配置数据在这 */
        set: function (o) {
            this._data = o;
            //自定义
        },
        enumerable: true,
        configurable: true
    });
    return SettingVO;
}());
__reflect(SettingVO.prototype, "SettingVO");
/**
 *
 * 小游戏游戏进程管理类
 *
 *
 */
var fw;
(function (fw) {
    var GameManager = (function (_super) {
        __extends(GameManager, _super);
        function GameManager() {
            return _super.call(this) || this;
        }
        GameManager.getInstance = function () {
            if (this._instance == null) {
                this._instance = new GameManager();
            }
            return this._instance;
        };
        /** 游戏初始化 */
        GameManager.prototype.init = function () {
            /** 打开logo动画 */
            fw.UIManager.getInstance().main.addChild(new LogoUI());
            WxApi.getInstance().init();
        };
        /** logo动画结束，检测是否后台加载完毕 */
        GameManager.prototype.logoOver = function () {
            fw.UIManager.getInstance().openUI(UIConst.START);
            fw.UIManager.getInstance().showLoading(!WxApi.getInstance().inited);
        };
        GameManager.prototype.initSwitchData = function (str) {
            this.switchData = str.split("");
        };
        /**判断功能是否开启 SWITCHTYPE.xxxx*/
        GameManager.prototype.isSwitch = function (id) {
            if (this.switchData == null) {
                return false;
            }
            return this.switchData[id] == "1";
        };
        GameManager.prototype.getParams = function (a2) {
            var a1 = [];
            for (var i = 0; i < a2.length; i++) {
                a1.push(parseFloat(a2[i]));
            }
            return a1;
        };
        return GameManager;
    }(egret.EventDispatcher));
    fw.GameManager = GameManager;
    __reflect(GameManager.prototype, "fw.GameManager");
})(fw || (fw = {}));
/**
 *
 * @author
 *
 */
var fw;
(function (fw) {
    var SoundManager = (function () {
        function SoundManager() {
            this.bg_position = 0;
            this.sound_switch = true;
            this.sound_effect_switch = false;
        }
        SoundManager.getInstance = function () {
            if (this.instance == null) {
                this.instance = new SoundManager();
            }
            return this.instance;
        };
        /**打开/关闭背景音乐*/
        SoundManager.prototype.playBgSound = function (b) {
            this.sound_switch = b;
            if (b) {
                if (this.bgSound == null) {
                    this.bgSound = RES.getRes("bgm_1_mp3");
                }
                if (this.bgChannel != null) {
                    this.bgChannel.stop();
                    this.bgChannel = null;
                }
                this.bgChannel = this.bgSound.play(this.bg_position, 0);
            }
            else {
                if (this.bgChannel != null) {
                    this.bg_position = this.bgChannel.position;
                    this.bgChannel.stop();
                    this.bgChannel = null;
                }
                else {
                    this.bg_position = 0;
                }
            }
        };
        SoundManager.prototype.hideSound = function (b) {
            if (b) {
                if (this.sound_switch) {
                    if (this.bgSound == null) {
                        this.bgSound = RES.getRes("bgm_1_mp3");
                    }
                    if (this.bgChannel != null) {
                        this.bgChannel.stop();
                        this.bgChannel = null;
                    }
                    this.bgChannel = this.bgSound.play(this.bg_position, 0);
                    this.bg_position = 0;
                }
            }
            else {
                if (this.bgChannel != null) {
                    this.bg_position = this.bgChannel.position;
                    this.bgChannel.stop();
                    this.bgChannel = null;
                }
                else {
                    this.bg_position = 0;
                }
            }
        };
        /**音效开关*/
        SoundManager.prototype.setSoundEffectSwitch = function (b) {
            this.sound_effect_switch = b;
        };
        /**播放音效*/
        SoundManager.prototype.playEffectSound = function (str) {
            if (str === void 0) { str = "sound_11_wav"; }
            console.log("playEffectSound:", this.sound_effect_switch);
            if (!this.sound_switch) {
                return;
            }
            var sound = RES.getRes(str);
            if (sound != null) {
                var channel = sound.play(0, 1);
                var obj = { s: sound, c: channel };
                var complete = function () {
                    this.c.stop();
                    this.c = null;
                    this.s = null;
                };
                channel.addEventListener(egret.Event.SOUND_COMPLETE, complete, obj);
            }
        };
        return SoundManager;
    }());
    fw.SoundManager = SoundManager;
    __reflect(SoundManager.prototype, "fw.SoundManager");
})(fw || (fw = {}));
var TimerManager = (function () {
    function TimerManager() {
        this.timerFunList = [];
        this.clipFrameStatus = true;
        this.frameList = [];
        this.init();
    }
    TimerManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new TimerManager();
        }
        return this.instance;
    };
    /**添加每秒的时间回调
     * @param fun 回调的函数
     * @param _t this域
     * @param time 以秒为单位
     */
    TimerManager.prototype.addTimerCallBack = function (fun, _t, time) {
        if (time === void 0) { time = 1; }
        if (!this.checkHasCallBack(fun, _t)) {
            var timerVo = new TimerVo();
            timerVo.fun = fun;
            timerVo.time = time;
            timerVo.totalTime = time;
            timerVo.thisObj = _t;
            this.timerFunList.push(timerVo);
        }
    };
    /***
     * 检查是添加过相同的回调
     */
    TimerManager.prototype.checkHasCallBack = function (fun, _t) {
        for (var i = 0; i < this.timerFunList.length; i++) {
            var obj = this.timerFunList[i];
            if (fun == obj.fun && _t == obj.thisObj) {
                console.warn("on this same fun by TimerManager this: " + egret.getQualifiedClassName(_t) + ",fun:" + egret.getQualifiedClassName(fun) + ",please check!!!");
                return true;
            }
        }
        return false;
    };
    TimerManager.prototype.init = function () {
        var timer = new egret.Timer(1000);
        timer.addEventListener(egret.TimerEvent.TIMER, this.timerFun, this);
        timer.start();
        GameConst.GameStage.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
    };
    TimerManager.prototype.clipFrameChange = function () {
        if (this.clipFrameStatus) {
            GameConst.GameStage.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
        }
        else {
            GameConst.GameStage.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
            GameConst.GameStage.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
        }
        this.clipFrameStatus = !this.clipFrameStatus;
    };
    TimerManager.prototype.timerFun = function (e) {
        for (var i = 0; i < this.timerFunList.length; i++) {
            var timerVo = this.timerFunList[i];
            var fun = timerVo.fun;
            var t = timerVo.thisObj;
            timerVo.time--;
            if (timerVo.time <= 0) {
                timerVo.time = timerVo.totalTime;
                fun.call(t);
            }
        }
    };
    /**删除时间回调
     * fun 回调的函数
     * _t  执行回调函数的域
     */
    TimerManager.prototype.removeFun = function (f, _t) {
        for (var i = this.timerFunList.length - 1; i >= 0; i--) {
            var timerVo = this.timerFunList[i];
            var fun = timerVo.fun;
            var t = timerVo.thisObj;
            if (fun == f && _t == t) {
                this.timerFunList.splice(i, 1);
            }
        }
    };
    TimerManager.prototype.enterFrame = function () {
        var len = this.frameList.length;
        for (var i = 0; i < this.frameList.length; i++) {
            var vo = this.frameList[i];
            vo.fun.call(vo.thisObj);
        }
        //console.log("enter Frame count :" +len);
    };
    TimerManager.prototype.addEnterFrame = function (fun, thisobj) {
        var frame = new frameVo();
        frame.fun = fun;
        frame.thisObj = thisobj;
        this.frameList.push(frame);
    };
    TimerManager.prototype.removeEnterFrame = function (fun, thisobj) {
        var len = this.frameList.length;
        for (var i = 0; i < len; i++) {
            var vo = this.frameList[i];
            if (fun == vo.fun && thisobj == vo.thisObj) {
                this.frameList.splice(i, 1);
                break;
            }
        }
    };
    return TimerManager;
}());
__reflect(TimerManager.prototype, "TimerManager");
var TimerVo = (function () {
    function TimerVo() {
        this.totalTime = 0;
        this.time = 0;
    }
    return TimerVo;
}());
__reflect(TimerVo.prototype, "TimerVo");
var frameVo = (function () {
    function frameVo() {
    }
    return frameVo;
}());
__reflect(frameVo.prototype, "frameVo");
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
/**
 *
 * @author
 *
 */
var fw;
(function (fw) {
    var HttpManager = (function (_super) {
        __extends(HttpManager, _super);
        function HttpManager() {
            return _super.call(this) || this;
        }
        HttpManager.getInstance = function () {
            if (this.instance == null) {
                this.instance = new HttpManager();
            }
            return this.instance;
        };
        /**发送http请求
         * @param interf 接口编号
         * @param url   接口链接
         * @param headers 协议头
         * @param data 携带参数
         * @param method 请求类型 仅支持egret.HttpMethod.GET / egret.HttpMethod.POST
         */
        HttpManager.prototype.sendRequest = function (interf, url, headers, data, method) {
            if (data === void 0) { data = null; }
            if (method === void 0) { method = "GET"; }
            console.log("发送消息:", interf, url, data);
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(url, method);
            for (var i = 0; i < headers.length; i++) {
                var o = headers[i];
                request.setRequestHeader(o['type'], o['value']);
            }
            request.once(egret.IOErrorEvent.IO_ERROR, function (e) {
                console.log("IOERROR:", interf, e.currentTarget);
                WxApi.getInstance().toast("HttpIOERROR:" + interf);
            }, this);
            request.once(egret.ProgressEvent.PROGRESS, function (e) { }, this);
            request.once(egret.Event.COMPLETE, function (e) {
                var response = JSON.parse(e.currentTarget.response);
                var code = response['code'];
                if (code != 200) {
                    console.log("请求--" + interf + "--失败，错误代码：" + response['code']);
                    WxApi.getInstance().toast("HttpFailed:" + interf + ",  code:" + code);
                }
                else {
                    console.log("收到消息:", interf, response);
                    var event_1 = new HttpEvent(interf);
                    event_1.data = response.data;
                    HttpCommand.getInstance().dispatchEvent(event_1);
                }
            }, this);
            request.send(data);
        };
        return HttpManager;
    }(egret.EventDispatcher));
    fw.HttpManager = HttpManager;
    __reflect(HttpManager.prototype, "fw.HttpManager");
})(fw || (fw = {}));
var fw;
(function (fw) {
    var SocketManager = (function (_super) {
        __extends(SocketManager, _super);
        function SocketManager() {
            var _this = _super.call(this) || this;
            _this.isConnect = false;
            return _this;
        }
        SocketManager.getInstance = function () {
            if (this.instance == null) {
                this.instance = new SocketManager();
            }
            return this.instance;
        };
        SocketManager.prototype.initSocket = function () {
            this.socket = new egret.WebSocket();
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this.socket.addEventListener(egret.Event.CLOSE, this.socketClose, this);
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
            this.socket.connectByUrl("ws://10.0.0.225:8080/websocket");
        };
        SocketManager.prototype.onReceiveMessage = function (e) {
            var byte = new egret.ByteArray();
            byte.endian = egret.Endian.LITTLE_ENDIAN;
            this.socket.readBytes(byte);
            console.log("onReceiveMessage:", byte);
        };
        SocketManager.prototype.onSocketOpen = function (e) {
            this.isConnect = true;
            console.log("onSocketOpen:");
        };
        SocketManager.prototype.sendMessage = function (byte) {
            console.log("sendMessage:");
            if (this.isConnect == true) {
                this.socket.type = egret.WebSocket.TYPE_BINARY;
                byte.position = 0;
                this.socket.writeBytes(byte, 0, byte.bytesAvailable);
                this.socket.flush();
            }
            else {
            }
        };
        SocketManager.prototype.socketClose = function (e) {
            this.isConnect = false;
        };
        SocketManager.prototype.stopPingPong = function () {
            if (this.timer != null) {
                this.timer.reset();
            }
            if (this.timer1 != null) {
                this.timer1.reset();
            }
        };
        SocketManager.prototype.startPingPong = function () {
            if (this.timer == null) {
                this.timer = new egret.Timer(5000);
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.sendPingPong, this);
            }
            this.timer.start();
            this.heartCount = 0;
            if (this.timer1 == null) {
                this.timer1 = new egret.Timer(6000);
                this.timer1.addEventListener(egret.TimerEvent.TIMER, this.t1_handler, this);
            }
            this.timer1.start();
        };
        SocketManager.prototype.t1_handler = function (e) {
            if (this.heartBool) {
                this.heartCount = 0;
            }
            else {
                this.heartCount++;
            }
        };
        //发送心跳
        SocketManager.prototype.sendPingPong = function (e) {
            if (this.heartBool) {
                this.sendping = new Date().getTime();
            }
            this.heartBool = false;
        };
        //收到心跳
        SocketManager.prototype.pong = function () {
            this.heartBool = true;
            var ping = new Date().getTime() - this.sendping;
        };
        SocketManager.prototype.onSocketError = function (e) {
            console.log("onSocketError:", e);
        };
        return SocketManager;
    }(egret.EventDispatcher));
    fw.SocketManager = SocketManager;
    __reflect(SocketManager.prototype, "fw.SocketManager");
})(fw || (fw = {}));
/**
 * 游戏中的一些类型定义
 *
 *
 * @sky
 */
var fw;
(function (fw) {
    var Definition = (function () {
        function Definition() {
        }
        return Definition;
    }());
    fw.Definition = Definition;
    __reflect(Definition.prototype, "fw.Definition");
    var UITYPE;
    (function (UITYPE) {
        UITYPE[UITYPE["FIRST"] = 1] = "FIRST";
        UITYPE[UITYPE["SECOND"] = 2] = "SECOND";
    })(UITYPE = fw.UITYPE || (fw.UITYPE = {}));
    var TWEENTYPE;
    (function (TWEENTYPE) {
        TWEENTYPE[TWEENTYPE["NONE"] = 0] = "NONE";
        TWEENTYPE[TWEENTYPE["SCALE"] = 1] = "SCALE";
        TWEENTYPE[TWEENTYPE["MOVE_OVERRIDE"] = 2] = "MOVE_OVERRIDE";
        TWEENTYPE[TWEENTYPE["MOVE_PUSH"] = 3] = "MOVE_PUSH";
        TWEENTYPE[TWEENTYPE["ROTAION"] = 4] = "ROTAION";
    })(TWEENTYPE = fw.TWEENTYPE || (fw.TWEENTYPE = {}));
    /** 全屏加载时 加载界面 */
    var LOADINGTYPE;
    (function (LOADINGTYPE) {
        LOADINGTYPE[LOADINGTYPE["RESET"] = 0] = "RESET";
        LOADINGTYPE[LOADINGTYPE["CIRCLE"] = 1] = "CIRCLE";
        LOADINGTYPE[LOADINGTYPE["LOADING"] = 2] = "LOADING";
    })(LOADINGTYPE = fw.LOADINGTYPE || (fw.LOADINGTYPE = {}));
    /** 分享类型 */
    var SHARETYPE;
    (function (SHARETYPE) {
        SHARETYPE[SHARETYPE["ACTIVE"] = 1] = "ACTIVE";
        SHARETYPE[SHARETYPE["SHOWOFF"] = 2] = "SHOWOFF";
        SHARETYPE[SHARETYPE["CRTSCORE"] = 3] = "CRTSCORE";
        SHARETYPE[SHARETYPE["PASSIVE"] = 4] = "PASSIVE";
        SHARETYPE[SHARETYPE["GROUPRANK"] = 5] = "GROUPRANK";
        SHARETYPE[SHARETYPE["SCREENSHOT"] = 6] = "SCREENSHOT";
        SHARETYPE[SHARETYPE["INVITE"] = 7] = "INVITE";
        SHARETYPE[SHARETYPE["INVITE_DAILY"] = 8] = "INVITE_DAILY";
    })(SHARETYPE = fw.SHARETYPE || (fw.SHARETYPE = {}));
    /** 排行榜排序类型 */
    var RANKSORTTYPE;
    (function (RANKSORTTYPE) {
        RANKSORTTYPE[RANKSORTTYPE["ASC"] = 1] = "ASC";
        RANKSORTTYPE[RANKSORTTYPE["DESC"] = 2] = "DESC";
    })(RANKSORTTYPE = fw.RANKSORTTYPE || (fw.RANKSORTTYPE = {}));
})(fw || (fw = {}));
/**
 * 根据开放域好友数据生成的图片
 * 创建后加载到指定位置，然后通过start开始刷新，通过command生成不同类型
 *
 * @author sky
 */
var BitmapOpenDataContext = (function (_super) {
    __extends(BitmapOpenDataContext, _super);
    /** 根据开放域好友数据生成的图片
     * @param w 宽
     * @param h 高
     * @param dis 图片刷新间隔
     */
    function BitmapOpenDataContext(dis) {
        if (dis === void 0) { dis = 48; }
        var _this = _super.call(this) || this;
        _this.dis = dis;
        _this.bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
        _this.bitmapdata.$deleteSource = false;
        var texture = new egret.Texture();
        texture._setBitmapData(_this.bitmapdata);
        _this.texture = texture;
        _this.width = GameConst.stageWidth;
        _this.height = GameConst.stageHeight;
        return _this;
    }
    BitmapOpenDataContext.prototype.start = function () {
        egret.stopTick(this.tickerHandler, this);
        egret.startTick(this.tickerHandler, this);
    };
    BitmapOpenDataContext.prototype.stop = function () {
        egret.stopTick(this.tickerHandler, this);
    };
    BitmapOpenDataContext.prototype.tickerHandler = function (timeStarmp) {
        var newtime = egret.getTimer();
        if (this.lasttime != null && newtime - this.lasttime < this.dis) {
            return;
        }
        this.lasttime = newtime;
        egret.WebGLUtils.deleteWebGLTexture(this.bitmapdata.webGLTexture);
        this.bitmapdata.webGLTexture = null;
        return false;
    };
    /** 传入我的当前分数，显示下一个好友的分数
     * @param commandstr 命令  UICONST.command_xxxx;
     * @param params 额外参数
     * @param sortkey 排序参数
     * @param sorttype 排序规则 fw.RANKSORTTYPE.ASC升序/DESC降序
     * @param shareTicket 如果是群排行 传入群的ticket
     */
    BitmapOpenDataContext.prototype.command = function (commandstr, params, sortkey, sorttype, shareTicket) {
        if (params === void 0) { params = null; }
        if (sortkey === void 0) { sortkey = "score"; }
        if (sorttype === void 0) { sorttype = 2; }
        if (shareTicket === void 0) { shareTicket = null; }
        WxApi.getInstance().postMessageToDataContext({
            userinfo: PlayerConst.userInfo,
            width: GameConst.stageWidth,
            height: GameConst.stageHeight,
            command: commandstr,
            sortkey: sortkey,
            sorttype: sorttype,
            shareTicket: shareTicket,
            params: params
        });
    };
    BitmapOpenDataContext.prototype.clear = function () {
        this.command(UIConst.command_clear);
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
        egret.stopTick(this.tickerHandler, this);
        this.bitmapdata = null;
    };
    return BitmapOpenDataContext;
}(egret.Bitmap));
__reflect(BitmapOpenDataContext.prototype, "BitmapOpenDataContext");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var fw;
(function (fw) {
    var LoadingUI = (function (_super) {
        __extends(LoadingUI, _super);
        function LoadingUI() {
            var _this = _super.call(this) || this;
            _this.createView();
            return _this;
        }
        LoadingUI.prototype.createView = function () {
            this.bg = GameUtil.getShape(GameConst.stageWidth, GameConst.stageHeight, 0x000000, 0.1);
            this.bg.touchEnabled = true;
            this.addChild(this.bg);
            this.tf_progress = GameUtil.createTextField(null, 300, GameConst.stageWidth, null, 480, 100);
            this.addChild(this.tf_progress);
        };
        LoadingUI.prototype.onProgress = function (current, total) {
            this.tf_progress.text = "Loading..." + current + "/" + total;
        };
        LoadingUI.prototype.setLoadType = function (type) {
            switch (type) {
                case fw.LOADINGTYPE.RESET:
                    return;
                case fw.LOADINGTYPE.CIRCLE:
                    if (this.img_circle == null) {
                        this.createCircle();
                    }
                    else {
                        this.img_circle.visible = true;
                    }
                    egret.Tween.get(this.img_circle, { loop: true }).to({ rotation: 360 }, 5000);
                    break;
                case fw.LOADINGTYPE.LOADING:
                    this.tf_progress.visible = true;
                    break;
            }
        };
        LoadingUI.prototype.reset = function () {
            this.tf_progress.visible = false;
            if (this.img_circle == null) {
                this.createCircle();
            }
            else {
                this.img_circle.visible = false;
                egret.Tween.removeTweens(this.img_circle);
            }
        };
        LoadingUI.prototype.createCircle = function () {
            this.img_circle = GameUtil.createBitmap("logo_png", null, null, GameConst.stageWidth, GameConst.stageHeight, 4, null, null);
            this.img_circle.anchorOffsetX = this.img_circle.width / 2;
            this.img_circle.anchorOffsetY = this.img_circle.height / 2;
            this.img_circle.x = GameConst.stageWidth / 2;
            this.img_circle.y = GameConst.stageHeight / 2;
            this.addChild(this.img_circle);
        };
        return LoadingUI;
    }(egret.Sprite));
    fw.LoadingUI = LoadingUI;
    __reflect(LoadingUI.prototype, "fw.LoadingUI", ["RES.PromiseTaskReporter"]);
})(fw || (fw = {}));
var fw;
(function (fw) {
    var RankItemUI = (function (_super) {
        __extends(RankItemUI, _super);
        function RankItemUI() {
            var _this = _super.call(this) || this;
            _this.skinName = "RankItemSkin";
            return _this;
        }
        RankItemUI.prototype.dataChanged = function () {
            if (this.data == null) {
                return;
            }
            var vo = this.data;
            var color = 0xffffff;
            if (vo.rank == 1) {
                color = 0xff094c;
            }
            else if (vo.rank == 2) {
                color = 0xff5317;
            }
            else if (vo.rank == 3) {
                color = 0xffe117;
            }
            this.bg_rect.fillColor = vo.rank % 2 == 1 ? 0x1f1e23 : 0x2b2a30;
            this.lbl_rank.text = vo.rank + "";
            this.lbl_rank.textColor = color;
            if (!platform.isdebug()) {
                this.img_head.source = vo.head;
            }
            this.lbl_name.text = vo.name;
            this.lbl_score.text = vo.score + "";
        };
        return RankItemUI;
    }(eui.ItemRenderer));
    fw.RankItemUI = RankItemUI;
    __reflect(RankItemUI.prototype, "fw.RankItemUI");
})(fw || (fw = {}));
window['RankItemUI'] = fw.RankItemUI;
var fw;
(function (fw) {
    var RankUI = (function (_super) {
        __extends(RankUI, _super);
        function RankUI() {
            return _super.call(this, "RankSkin") || this;
        }
        RankUI.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            console.log("childrenCreated");
        };
        RankUI.prototype.checkFit = function () {
            this.height = this.rect_bg.height = GameConst.GameStage.stageHeight;
            ;
        };
        /** 打开UI时的附带参数 */
        RankUI.prototype.setParams = function (params) {
            _super.prototype.setParams.call(this, params);
            this.shareticket = this.args != null ? this.args.shareticket : null;
            this.openworld = this.args != null ? this.args.openworld : false;
        };
        RankUI.prototype.initView = function () {
            this.me = new fw.RankItemUI();
            this.me.horizontalCenter = 0;
            this.me.y = 960;
            this.addChild(this.me);
            if (this.openworld) {
                this.lbl_tag1.text = this.shareticket != null ? "群排行" : "好友排行";
                this.gp_world.visible = true;
                this.lbl_title.visible = false;
                this.initOpenRank();
                this.list_world.itemRenderer = fw.RankItemUI;
                this.arr_data = new eui.ArrayCollection();
                HttpCommand.getInstance().getWorldRank();
            }
            else {
                this.lbl_title.text = this.shareticket != null ? "群排行榜" : "好友排行榜";
                this.initOpenRank();
            }
        };
        RankUI.prototype.initOpenRank = function () {
            this.scroller_world.visible = false;
            this.me.visible = false;
            this.ranktype = 0;
            this.img_tag2.alpha = 0;
            this.img_tag1.alpha = 1;
            this.lbl_tag2.textColor = 0xffffff;
            this.lbl_tag1.textColor = 0x000000;
            if (this.bmp_context != null) {
                this.bmp_context.visible = true;
            }
            else {
                this.initDataContext();
            }
        };
        RankUI.prototype.initWorldRank = function () {
            this.scroller_world.visible = true;
            this.me.visible = true;
            this.ranktype = 1;
            this.img_tag1.alpha = 0;
            this.img_tag2.alpha = 1;
            this.lbl_tag1.textColor = 0xffffff;
            this.lbl_tag2.textColor = 0x000000;
            if (this.bmp_context != null) {
                this.bmp_context.visible = false;
            }
        };
        RankUI.prototype.initDataContext = function () {
            //开放域主体
            if (platform.isdebug()) {
                return;
            }
            this.bmp_context = new BitmapOpenDataContext();
            this.bmp_context.x = this.bmp_context.y = 0;
            this.addChildAt(this.bmp_context, 4); //盖在底图上面，各种按钮下面
            this.bmp_context.start();
            this.bmp_context.command(UIConst.command_openrank, null, "score_1_3", fw.RANKSORTTYPE.ASC);
        };
        RankUI.prototype.initEvent = function () {
            this.img_tag1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickOpenRank, this);
            this.img_tag2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickWorldRank, this);
            this.img_rankgp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGroupRank, this);
            HttpCommand.getInstance().addEventListener(HttpEvent.getWorldRank, this.initWorldData, this);
        };
        RankUI.prototype.initWorldData = function (e) {
            this.arr_data.removeAll();
            var arr = e.data;
            for (var i = 0; i < arr.length; i++) {
                var data = arr[i];
                var vo = new fw.RankVO();
                vo.rank = i + 1;
                vo.head = data['user']['avatarurl'];
                vo.name = data['user']['nickname'];
                vo.score = data['score'];
                vo.gender = data['user']['gender'];
                vo.date = data['user']['ranking_date'];
                if (vo.head == PlayerConst.userInfo.avatarUrl) {
                    this.myvo = vo;
                }
                if (vo.score > 0) {
                    this.arr_data.addItem(vo);
                }
            }
            this.list_world.dataProvider = this.arr_data;
            if (this.myvo != null) {
                this.me.data = this.myvo;
            }
        };
        RankUI.prototype.clickOpenRank = function () {
            if (this.ranktype == 0) {
                return;
            }
            this.initOpenRank();
        };
        RankUI.prototype.clickWorldRank = function () {
            if (this.ranktype == 1) {
                return;
            }
            this.initWorldRank();
        };
        RankUI.prototype.clickGroupRank = function () {
            WxApi.getInstance().buryingPoint(BuryingPoint.bp_grouprank_click);
            WxApi.getInstance().share(fw.SHARETYPE.GROUPRANK);
        };
        RankUI.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.img_tag1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickOpenRank, this);
            this.img_tag2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickWorldRank, this);
            this.img_rankgp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGroupRank, this);
            HttpCommand.getInstance().removeEventListener(HttpEvent.getWorldRank, this.initWorldData, this);
            if (this.bmp_context != null) {
                this.bmp_context.clear();
                this.bmp_context = null;
            }
        };
        return RankUI;
    }(fw.BaseUI));
    fw.RankUI = RankUI;
    __reflect(RankUI.prototype, "fw.RankUI");
})(fw || (fw = {}));
window["RankUI"] = fw.RankUI;
var fw;
(function (fw) {
    var RankVO = (function () {
        function RankVO() {
        }
        return RankVO;
    }());
    fw.RankVO = RankVO;
    __reflect(RankVO.prototype, "fw.RankVO");
})(fw || (fw = {}));
/**
 *
 * @author
 * 发送HTTP请求 HttpCommand.getInstance().dispatchEvent(HttpEvent.XXXX)
 *
 */
var HttpCommand = (function (_super) {
    __extends(HttpCommand, _super);
    function HttpCommand() {
        return _super.call(this) || this;
    }
    HttpCommand.getInstance = function () {
        if (this.instance == null) {
            this.instance = new HttpCommand();
        }
        return this.instance;
    };
    /** 登录
     * @param code 登录code
     */
    HttpCommand.prototype.getToken = function (code) {
        var url = HttpEvent.httpApi + "wx?code=" + code + "&appid=" + HttpEvent.appid;
        var header = { type: "Content-Type", value: "application/json;charset=UTF-8" };
        var header1 = { type: "version", value: HttpEvent.version };
        fw.HttpManager.getInstance().sendRequest(HttpEvent.getToken, url, [header, header1]);
    };
    /** 发送用户信息
     * @param userinfo
     */
    HttpCommand.prototype.postUser = function (userinfo) {
        this.sendRequest(HttpEvent.postUser, "users", userinfo, 1);
    };
    /** 获取用户信息 */
    HttpCommand.prototype.getUser = function () {
        this.sendRequest(HttpEvent.getUser, "users");
    };
    /** 发送货币道具信息 */
    HttpCommand.prototype.postProps = function (id, num) {
        var data = { type: id + "", num: num + "" };
        this.sendRequest(HttpEvent.postProps, "prop", data, 1);
    };
    /** 获取货币道具信息 */
    HttpCommand.prototype.getProps = function () {
        this.sendRequest(HttpEvent.getProps, "prop");
    };
    /** 发送 世界排行 分数
     * @param score 分数
     * @param sort 0从大到小  1从小到大
     * @param type 排序分类 0全部
     */
    HttpCommand.prototype.postWorldRank = function (score, sort, type) {
        if (sort === void 0) { sort = "0"; }
        if (type === void 0) { type = "0"; }
        var data = { sort: sort, type: type, score: score + "" };
        this.sendRequest(HttpEvent.postWorldRank, "ranking", data, 1);
    };
    /** 获取世界排行
     *  @param limit 请求个数
     * @param sort 0从大到小  1从小到大
     * @param type 排序分类 0全部
     * @param page 页数
     */
    HttpCommand.prototype.getWorldRank = function (limit, sort, type, page) {
        if (limit === void 0) { limit = 20; }
        if (sort === void 0) { sort = 0; }
        if (type === void 0) { type = 0; }
        if (page === void 0) { page = 1; }
        var url = "ranking?sort=" + sort + "&type=" + type + "&p=" + page + "&limit=" + limit;
        this.sendRequest(HttpEvent.getWorldRank, url);
    };
    /** 设置弹性字段 客户端存储的一些数据
     * @param str 存在服务端的一个数据 具体在Gamelogic中自行实现
    */
    HttpCommand.prototype.postMyData = function (str) {
        var data = { mydata: str };
        this.sendRequest(HttpEvent.postMyData, "users/mydata", data, 1);
    };
    /** 获取弹性字段
     *
    */
    HttpCommand.prototype.getMyData = function () {
        this.sendRequest(HttpEvent.getMyData, "users/mydata");
    };
    /** 获取转盘信息
     *
     */
    HttpCommand.prototype.getTurntable = function () {
        this.sendRequest(HttpEvent.getTurntable, "turntable");
    };
    /**
     * 获取所有皮肤信息
     */
    HttpCommand.prototype.getSkinsAll = function () {
        this.sendRequest(HttpEvent.getSkinsInfo, "skin/all");
    };
    /**
     * 设置皮肤获取
     * @param skin_id 皮肤Id
     */
    HttpCommand.prototype.postSkinGet = function (skin_id) {
        var data = { skin_id: skin_id + "" };
        this.sendRequest(HttpEvent.postSkinGot, "skin", data, 1);
    };
    /**
     * 设置默认皮肤
     * @param skin_id 皮肤Id
     */
    HttpCommand.prototype.postSkinDefault = function (skin_id) {
        var data = { skin_id: skin_id };
        this.sendRequest(HttpEvent.postSkinDefault, "skin/defaultSkin", data, 1);
    };
    /**
     * 获取用户所得的所有皮肤
     * @param skin_id 皮肤Id 可选，为null表示获取所有
     */
    HttpCommand.prototype.getSkinsGot = function (skin_id) {
        if (skin_id === void 0) { skin_id = null; }
        if (skin_id == null) {
            this.sendRequest(HttpEvent.getSkinsGot, "skin");
        }
        else {
            this.sendRequest(HttpEvent.getSkinsGot, "skin?skin_id=" + skin_id);
        }
    };
    /**
     * 获取所有关卡
     */
    HttpCommand.prototype.getMissionsAll = function () {
        this.sendRequest(HttpEvent.getMissionsInfo, "level/all");
    };
    /**
     * 提交用户关卡
     * @param mission_id 关卡Id
     * @param grade 过关成绩（可以是星级，分数，成绩）
     * @param extradata 备用，其他需要用的数据
     */
    HttpCommand.prototype.postMission = function (mission_id, grade, extradata) {
        if (grade === void 0) { grade = ""; }
        if (extradata === void 0) { extradata = ""; }
        var data = { level_id: mission_id + "", grade: grade, remark: extradata };
        this.sendRequest(HttpEvent.postMission, "level", data, 1);
    };
    /**
     * 获取用户的已通关关卡数据
     * @param missionId 关卡Id
     */
    HttpCommand.prototype.getMissionsPass = function (missionId) {
        if (missionId == null) {
            this.sendRequest(HttpEvent.getMissionsPass, "level");
        }
        else {
            this.sendRequest(HttpEvent.getMissionsPass, "level?level_id=" + missionId);
        }
    };
    /**
    * 获取所有成就
    */
    HttpCommand.prototype.getAchievesAll = function () {
        this.sendRequest(HttpEvent.getAchievesAll, "honor/all");
    };
    /**
     * 提交用户成就
     * @param honor_id 成就Id
     * @param grade 成就成绩
     * @param extradata 备用，其他需要用的数据
     */
    HttpCommand.prototype.postAchieve = function (honor_id, grade, extradata) {
        var data = { honor_id: honor_id + "", grade: grade, remark: extradata };
        this.sendRequest(HttpEvent.postAchieve, "honor", data, 1);
    };
    /**
    * 获取用户已达成成就
    */
    HttpCommand.prototype.getAchieveGot = function () {
        this.sendRequest(HttpEvent.getAchieveGot, "honor");
    };
    /** 签到 */
    HttpCommand.prototype.checkIn = function () {
        this.sendRequest(HttpEvent.checkIn, "checkin", null, 1);
    };
    /** 版本更新公告 */
    HttpCommand.prototype.notice = function () {
        this.sendRequest(HttpEvent.getNotice, "notice");
    };
    /** 新用户邀请判断 */
    HttpCommand.prototype.postInvite = function (uid) {
        this.sendRequest(HttpEvent.postInvite, "invite", { share_uid: uid }, 1);
    };
    /** 获取我邀请的用户 */
    HttpCommand.prototype.getInvite = function () {
        this.sendRequest(HttpEvent.getInvite, "invite");
    };
    /** 设置列表 */
    HttpCommand.prototype.getSetting = function () {
        this.sendRequest(HttpEvent.getSetting, "setting");
    };
    /** 分享信息数据 */
    HttpCommand.prototype.getShareSetting = function () {
        this.sendRequest(HttpEvent.getShareSetting, "shareinfo");
    };
    /** 广告列表 */
    HttpCommand.prototype.getAd = function () {
        this.sendRequest(HttpEvent.getAd, "ad");
    };
    /** 通用接口
     * 所有header有2个
     * @param interf    接口编号
     * @param url       链接
     * @param data      数据
     * @param method    0get 1post
     */
    HttpCommand.prototype.sendRequest = function (interf, url, data, method) {
        if (data === void 0) { data = null; }
        if (method === void 0) { method = 0; }
        url = HttpEvent.httpApi + url;
        var header = { type: "Content-Type", value: "application/json;charset=UTF-8" };
        var header1 = { type: "token", value: PlayerConst.token };
        var header2 = { type: "version", value: HttpEvent.version };
        fw.HttpManager.getInstance().sendRequest(interf, url, [header, header1, header2], data, method == 0 ? egret.HttpMethod.GET : egret.HttpMethod.POST);
    };
    return HttpCommand;
}(egret.EventDispatcher));
__reflect(HttpCommand.prototype, "HttpCommand");
/**
 *
 *
 */
var HttpEvent = (function (_super) {
    __extends(HttpEvent, _super);
    function HttpEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.data = null;
        return _this;
    }
    /**与服务端通信地址 */
    HttpEvent.httpApi = "https://common.zhuyuce.com/";
    /**游戏的appid */
    HttpEvent.appid = "wxd4950745d08c9e90";
    /** api接口版本 */
    HttpEvent.version = "1.0";
    /** ---------------------------- 接口协议 --------------------------------------- */
    /** 获取Token */
    HttpEvent.getToken = "getToken";
    /** 获取用户信息 */
    HttpEvent.getUser = "getUser";
    /** 发送用户信息 */
    HttpEvent.postUser = "postUser";
    /** 获取货币道具信息 */
    HttpEvent.getProps = "getProps";
    /** 发送货币道具信息 */
    HttpEvent.postProps = "postProps";
    /** 获取排行榜信息 */
    HttpEvent.getWorldRank = "getWorldRank";
    /** 发送排行榜信息 */
    HttpEvent.postWorldRank = "postWorldRank";
    HttpEvent.getMyData = "getMyData";
    HttpEvent.postMyData = "postMyData";
    HttpEvent.getTurntable = "getTurntable";
    HttpEvent.getSkinsInfo = "getSkinsInfo";
    HttpEvent.postSkinGot = "postSkinGot";
    HttpEvent.postSkinDefault = "postSkinDefault";
    HttpEvent.getSkinsGot = "getSkinsGot";
    HttpEvent.getMissionsInfo = "getMissionsInfo";
    HttpEvent.postMission = "postMission";
    HttpEvent.getMissionsPass = "getMissionsPass";
    HttpEvent.getAchievesAll = "getAchievesAll";
    HttpEvent.postAchieve = "postAchieve";
    HttpEvent.getAchieveGot = "getAchieveGot";
    HttpEvent.checkIn = "checkIn";
    HttpEvent.getInvite = "getInvite";
    HttpEvent.getNotice = "getNotice";
    HttpEvent.postInvite = "postInvite";
    HttpEvent.getSetting = "getSetting";
    HttpEvent.getShareSetting = "getShareSetting";
    HttpEvent.getAd = "getAd";
    return HttpEvent;
}(egret.Event));
__reflect(HttpEvent.prototype, "HttpEvent");
var GameEvent = (function (_super) {
    __extends(GameEvent, _super);
    function GameEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.data = null;
        return _this;
    }
    /** 视频观看结束 */
    GameEvent.REWARDAD_CLOSE_EVENT = "REWARDAD_CLOSE_EVENT";
    /** 开关banner广告 */
    GameEvent.BANNER_HIDE = "BANNER_HIDE";
    /** 道具变化 */
    GameEvent.PROP_NUM_CHANGE = "PROP_NUM_CHANGE";
    return GameEvent;
}(egret.Event));
__reflect(GameEvent.prototype, "GameEvent");
/**
 *
 * 成就逻辑类
 *
 *
 */
var AchieveLogic = (function (_super) {
    __extends(AchieveLogic, _super);
    function AchieveLogic() {
        return _super.call(this) || this;
    }
    AchieveLogic.getInstance = function () {
        if (this._instance == null) {
            this._instance = new AchieveLogic();
        }
        return this._instance;
    };
    /** 初始化成就 */
    AchieveLogic.prototype.initAchieves = function () {
        this.achieves = {};
        this.achievetypes = {};
        HttpCommand.getInstance().addEventListener(HttpEvent.getAchievesAll, this.achieveAllResponse, this, false, 1);
        HttpCommand.getInstance().addEventListener(HttpEvent.getAchieveGot, this.achieveGotResponse, this, false, 1);
        HttpCommand.getInstance().addEventListener(HttpEvent.postAchieve, this.achieveGotResponse, this, false, 1);
    };
    AchieveLogic.prototype.achieveGotResponse = function (e) {
        this.updateAchieves(e.data);
    };
    AchieveLogic.prototype.getAllAchieves = function () {
        return this.achieves;
    };
    /** 初始化所有成就 */
    AchieveLogic.prototype.achieveAllResponse = function (e) {
        var arr = e.data;
        for (var i = 0; i < arr.length; i++) {
            var o = arr[i];
            var vo = this.achieves[o.flow_id];
            if (vo == null) {
                vo = new AchieveVO();
                vo.id = parseInt(o.flow_id);
                vo.imgurl = o.imgurl;
                vo.title = o.title;
                vo.remark = o.remark;
            }
            vo.type = parseInt(o.extradata1);
            vo.appid = o.appid;
            vo.baseline = parseInt(o.baseline);
            //成绩
            vo.grade = this.achievetypes[vo.type];
            vo.reward = o.extradata2.split(";");
            var v = this.achievetypes[vo.type];
            if (vo.state != 2) {
                // vo.state = v < vo.baseline ? 0 : (this.hasGet(vo.id) ? 2 : 1);
                vo.state = v < vo.baseline ? 0 : 1;
            }
            this.achieves[vo.id] = vo;
        }
    };
    /** 该成就是否已领取奖励 */
    AchieveLogic.prototype.hasGet = function (id) {
        var str = GameLogic.getInstance().getMyDataValueByID(MYDATA.ACHIEVE_GET);
        var aaa = str == null ? [] : str.split("_");
        return aaa.indexOf(id + "") != -1;
    };
    /** 领取奖励 */
    AchieveLogic.prototype.getReward = function (id) {
        var vo = this.achieves[id];
        vo.state = 2;
        var str = GameLogic.getInstance().getMyDataValueByID(MYDATA.ACHIEVE_GET);
        if (str == null || str == "") {
            str = vo.id + "";
        }
        else {
            str += ("_" + vo.id);
        }
        // GameLogic.getInstance().updateMyDataValue(MYDATA.ACHIEVE_GET, str);//舒尔特测试用
        this.updateAchieve(id, "", "");
        console.log("getrward:", vo);
        for (var i = 0; i < vo.reward.length; i++) {
            var aaa = vo.reward[i].split(":");
            console.log("udpateprop:", aaa);
            PropLogic.getInstance().updateProp(parseInt(aaa[0]), parseInt(aaa[1]));
        }
    };
    /** 更新已达成成就 已过期(因当时测试无法配表，所以用mydata处理，如有需求可以重新开启)*/
    AchieveLogic.prototype.updateAchieves = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            var o = arr[i];
            var vo = this.achieves[o.flow_id];
            if (vo == null) {
                vo = new AchieveVO();
                vo.id = parseInt(o.flow_id);
                vo.imgurl = o.imgurl;
                vo.title = o.title;
            }
            vo.type = parseInt(o.extradata1);
            vo.grade = parseInt(o.grade);
            vo.create_time = parseInt(o.create_time);
            vo.remark = o.remark;
            vo.state = 2;
            this.achieves[vo.id] = vo;
        }
    };
    /** 成就更新 已过期(因当时测试无法配表，所以用mydata处理，如有需求可以重新开启)
     * @param id 成就id
     * @param grade 成就的成绩
     * @param remark 备用参数 可选
    */
    AchieveLogic.prototype.updateAchieve = function (id, grade, remark) {
        if (remark === void 0) { remark = ""; }
        var vo = this.achieves[id];
        if (vo == null) {
            console.log("没有找到成就" + id + "，请联系GM");
        }
        else {
            HttpCommand.getInstance().postAchieve(id, grade, remark);
        }
    };
    /** 检测是否更新成就
     * @param type 成就类型 ACHIEVETYPE.XXXX
     * @param value 值
     */
    AchieveLogic.prototype.updateAchieveType = function (type, value) {
        if (value == null || value.toString() == "NaN") {
            value = 0;
        }
        this.achievetypes[type] = value;
    };
    /** 获取成就进度 */
    AchieveLogic.prototype.getAchieveTypeValue = function (type) {
        return this.achievetypes[type] == null ? 0 : this.achievetypes[type];
    };
    /** 初始化Mydata中记录的成就数值 */
    AchieveLogic.prototype.initAchieveType = function () {
        //累计登录天数
        this.updateAchieveType(ACHIEVETYPE.LOGIN_TOTAL, PlayerConst.checkInfo.total_num);
        //单局得分
        var s1 = parseInt(GameLogic.getInstance().getMyDataValueByID(MYDATA.BEST_SCORE));
        this.updateAchieveType(ACHIEVETYPE.SCORE_SINGLE, s1);
        //邀请好友数量
        var s2 = parseInt(GameLogic.getInstance().getMyDataValueByID(MYDATA.INVITE_NUM));
        this.updateAchieveType(ACHIEVETYPE.INVITE_NUM, s2);
        //观看视频次数
        var s3 = parseInt(GameLogic.getInstance().getMyDataValueByID(MYDATA.REWARD_NUM));
        this.updateAchieveType(ACHIEVETYPE.REWARDAD_NUM, s3);
    };
    /** 更新观看视频次数成就 */
    AchieveLogic.prototype.updateRewardAchieve = function (add) {
        if (add === void 0) { add = 0; }
        var s1 = GameLogic.getInstance().getMyDataValueByID(MYDATA.REWARD_NUM);
        var n;
        if (s1 == null) {
            n = 1;
        }
        else {
            n = parseInt(s1);
        }
        GameLogic.getInstance().updateMyDataValue(MYDATA.REWARD_NUM, n);
        AchieveLogic.getInstance().updateAchieveType(ACHIEVETYPE.REWARDAD_NUM, n);
    };
    return AchieveLogic;
}(egret.EventDispatcher));
__reflect(AchieveLogic.prototype, "AchieveLogic");
/**
 *
 * 游戏逻辑类
 *
 *
 */
var GameLogic = (function (_super) {
    __extends(GameLogic, _super);
    function GameLogic() {
        var _this = _super.call(this) || this;
        /** ------------------ 其他数据 ------------------------------ */
        _this.mydata = {};
        return _this;
    }
    GameLogic.getInstance = function () {
        if (this._instance == null) {
            this._instance = new GameLogic();
        }
        return this._instance;
    };
    /** 初始化游戏数据
     * @param o 数据
     */
    GameLogic.prototype.init = function (o) {
        HttpCommand.getInstance().addEventListener(HttpEvent.checkIn, this.checkInResponse, this, false, 1);
        HttpCommand.getInstance().addEventListener(HttpEvent.getNotice, this.noticeResponse, this, false, 1);
        HttpCommand.getInstance().addEventListener(HttpEvent.postInvite, this.postInviteResponse, this, false, 1);
        HttpCommand.getInstance().addEventListener(HttpEvent.getSetting, this.getSettingResponse, this, false, 1);
        HttpCommand.getInstance().addEventListener(HttpEvent.getShareSetting, this.getShareResponse, this, false, 1);
        HttpCommand.getInstance().addEventListener(HttpEvent.getAd, this.getAdResponse, this, false, 1);
        HttpCommand.getInstance().addEventListener(HttpEvent.getMyData, this.getMyDataResponse, this, false, 1);
        this.updateCheckInfo(o.checkin);
        this.updateSetting(o.setting);
        this.updateMyData(o.mydata);
        this.checkLoginData();
        this.checkNotice();
    };
    /** 每次登陆检测   */
    GameLogic.prototype.checkLoginData = function () {
        var date = new Date();
        var todaykey = date.getFullYear() + ":" + date.getMonth() + ":" + date.getDate();
        //免费转盘
        var todayturnkey = todaykey + GameConst.localdata_key_turn;
        var todayturnvalue = WxApi.getInstance().getStorage(todayturnkey);
        if (todayturnvalue == null || todayturnvalue == "") {
            TurnLogic.getInstance().freetimes = 1;
        }
        else {
            TurnLogic.getInstance().freetimes = 1;
        }
        //视频cd
        var cd = WxApi.getInstance().getStorage(GameConst.localdata_key_reward_cd);
        WxApi.getInstance().starttime = cd == null || cd == "" ? null : parseInt(cd);
        //判断是否每日第一次登录
        var todayloginkey = todaykey + GameConst.localdata_key_lastlogintime;
        var lasttime = WxApi.getInstance().getStorage(todayloginkey);
        if (lasttime != "") {
            PlayerConst.checkInfo.login_first_today = false;
        }
        WxApi.getInstance().setStorage(todayloginkey, date.getTime() + "");
    };
    /** 更新我的数据
     * @param id MYDATA.xxxx
     * @param value 为字符串，禁止含有‘:’ ‘;’2种符号
     */
    GameLogic.prototype.updateMyDataValue = function (id, value) {
        this.mydata[id] = value;
        this.PostMyData();
    };
    GameLogic.prototype.PostMyData = function () {
        var str = "";
        for (var id in this.mydata) {
            str += (id + ":" + this.mydata[id] + ";");
        }
        str = str.slice(0, str.length - 1);
        HttpCommand.getInstance().postMyData(str);
    };
    /** 根据id获取我的数据
     * @param id MYDATA.xxxx
     * @return 自定义的一个字符串，没有返回null
     */
    GameLogic.prototype.getMyDataValueByID = function (id) {
        return this.mydata[id];
    };
    GameLogic.prototype.getMyDataResponse = function (e) {
        this.updateMyData(e.data);
    };
    /** 其他数据 key为 MYDATA.XXX
     * @param str 格式为 0:value;1:value;2:value
     */
    GameLogic.prototype.updateMyData = function (str) {
        this.mydata = {};
        var arr = str.split(";");
        for (var i = 0; i < arr.length; i++) {
            var sss = arr[i];
            var aaa = sss.split(":");
            this.mydata[aaa[0]] = aaa[1];
        }
    };
    /** 警告，勿用 */
    GameLogic.prototype.clearMyData = function () {
        HttpCommand.getInstance().postMyData("");
    };
    /** 获取更新公告,检测是否更新了新版本，是的话弹出更新公告  */
    GameLogic.prototype.noticeResponse = function (e) {
        PlayerConst.noticeInfo.data = e.data;
    };
    /** 点击分享进入游戏后 发送邀请好友信息 受邀成功获取奖励 */
    GameLogic.prototype.postInviteResponse = function (e) {
        // e.data.uid;//自己的
        // e.data.share_uid;//发送者的
        // e.data.create_time;//邀请成功时间
        //这里处理 受邀成功后的奖励
    };
    /** 后台配置数据列表
     */
    GameLogic.prototype.getSettingResponse = function (e) {
        this.updateSetting(e.data);
    };
    GameLogic.prototype.updateSetting = function (data) {
        //保存设置信息
        PlayerConst.settingInfo.data = data;
    };
    /** 后台配置数据列表 可放在setting中 */
    GameLogic.prototype.getShareResponse = function (e) {
    };
    /**  */
    GameLogic.prototype.getAdResponse = function (e) {
    };
    /** 签到 */
    GameLogic.prototype.signIn = function () {
        if (!PlayerConst.checkInfo.signed_today) {
            HttpCommand.getInstance().checkIn();
        }
        else {
            WxApi.getInstance().toast("今日已签到");
        }
    };
    /** 签到成功*/
    GameLogic.prototype.checkInResponse = function (e) {
        this.updateCheckInfo(e.data);
        PropLogic.getInstance().updateProp(COINTYPE.HP, DataBase.HP_ADD_SIGNIN);
    };
    GameLogic.prototype.updateCheckInfo = function (data) {
        PlayerConst.checkInfo.data = data;
    };
    return GameLogic;
}(egret.EventDispatcher));
__reflect(GameLogic.prototype, "GameLogic");
var InviteLogic = (function (_super) {
    __extends(InviteLogic, _super);
    function InviteLogic() {
        return _super.call(this) || this;
    }
    InviteLogic.getInstance = function () {
        if (this._instance == null) {
            this._instance = new InviteLogic();
        }
        return this._instance;
    };
    InviteLogic.prototype.initInvite = function () {
        this.invites = [];
        HttpCommand.getInstance().addEventListener(HttpEvent.getInvite, this.getInviteResponse, this, false, 1);
    };
    InviteLogic.prototype.getInviteResponse = function (e) {
        this.invites = [];
        var str = GameLogic.getInstance().getMyDataValueByID(MYDATA.INVITE_GET);
        var aaa = str == null ? [] : str.split("_");
        var arr = e.data;
        for (var i = 0; i < arr.length; i++) {
            var o = arr[i];
            var vo = new InviteVO();
            vo.avatarurl = o.avatarurl;
            vo.name = o.nickname;
            vo.uid = o.uid;
            vo.hasget = aaa.indexOf(vo.uid) != -1;
            vo.coinId1 = COINTYPE.HP;
            vo.num1 = DataBase.HP_ADD_INVITE;
            if (i % 5 == 4) {
                vo.num1 *= 2;
            }
            this.invites.push(vo);
        }
    };
    InviteLogic.prototype.getReward = function (uid) {
        for (var i = 0; i < this.invites.length; i++) {
            var vo = this.invites[i];
            if (vo.uid == uid) {
                vo.hasget = true;
                var str = GameLogic.getInstance().getMyDataValueByID(MYDATA.INVITE_GET);
                if (str == null || str == "") {
                    str = vo.uid;
                }
                else {
                    str += ("_" + vo.uid);
                }
                GameLogic.getInstance().updateMyDataValue(MYDATA.INVITE_GET, str);
                PropLogic.getInstance().updateProp(vo.coinId1, vo.num1);
                return;
            }
        }
    };
    InviteLogic.prototype.getInvites = function () {
        return this.invites;
    };
    return InviteLogic;
}(egret.EventDispatcher));
__reflect(InviteLogic.prototype, "InviteLogic");
/**
 *
 * 关卡逻辑类
 *
 *
 */
var MissionLogic = (function (_super) {
    __extends(MissionLogic, _super);
    function MissionLogic() {
        var _this = _super.call(this) || this;
        _this.charpters = {};
        return _this;
    }
    MissionLogic.getInstance = function () {
        if (this._instance == null) {
            this._instance = new MissionLogic();
        }
        return this._instance;
    };
    /** 初始化关卡 */
    MissionLogic.prototype.initMissions = function () {
        this.missions = {};
        var data = RES.getRes("mission_json");
        for (var id in data) {
            var o = data[id];
            var v = new MissionVO();
            v.id = parseInt(o.id);
            v.title = o.title;
            v.type = parseInt(o.type);
            v.content = o.content;
            v.des = o.des;
            v.times = o.time;
            v.setDialog(o.dialog);
            this.missions[v.id] = v;
        }
    };
    /** 初始化所有关卡配置 */
    MissionLogic.prototype.missionAllResponse = function (e) {
        //本地配置
        var data = RES.getRes("mission_json");
        for (var id in data) {
            var o = data[id];
            var v = new MissionVO();
            v.id = parseInt(o.id);
            v.title = o.title;
            v.type = parseInt(o.type);
            v.content = o.content;
            v.des = o.des;
            v.times = o.time;
            v.setDialog(o.dialog);
            this.missions[v.id] = v;
        }
        // //章节处理
        // let cid = Math.floor(parseInt(id) / 100);
        // let vo: CharpterVO = this.charpters[cid];
        // if (vo == null) {
        // 	vo = new CharpterVO();
        // 	vo.id = cid;
        // 	vo.missions = [];
        // 	if (cid == this.crtChapter) {
        // 		vo.state = 1;
        // 		v.state = mid < v.missionId ? 2 : (mid > v.missionId ? 0 : 1);
        // 	}
        // 	else {
        // 		vo.state = cid < this.crtChapter ? 2 : 0;
        // 	}
        // }
        // vo.missions.push(v);
        // this.charpters[cid] = vo;
    };
    /**  */
    MissionLogic.prototype.getNextMissionVO = function (id) {
        var nextid = id + 1;
        if (this.missions[nextid] != null) {
            return this.missions[nextid];
        }
        else {
            nextid = id - (id % 100) + 101;
            return this.missions[nextid];
        }
    };
    return MissionLogic;
}(egret.EventDispatcher));
__reflect(MissionLogic.prototype, "MissionLogic");
/**
 *
 * 道具逻辑类
 *
 *
 */
var PropLogic = (function (_super) {
    __extends(PropLogic, _super);
    function PropLogic() {
        var _this = _super.call(this) || this;
        _this.props = {};
        return _this;
    }
    PropLogic.getInstance = function () {
        if (this._instance == null) {
            this._instance = new PropLogic();
        }
        return this._instance;
    };
    /** 初始化道具货币 */
    PropLogic.prototype.initProps = function (arr) {
        this.props = {};
        HttpCommand.getInstance().addEventListener(HttpEvent.getProps, this.propResponse, this, false, 1);
        this.updateProps(arr);
    };
    /** 服务器只返回成功失败，不返回其他数据，不处理 */
    PropLogic.prototype.propResponse = function (e) {
    };
    PropLogic.prototype.updateProps = function (arr) {
        this.props = {};
        for (var i = 0; i < arr.length; i++) {
            var o = arr[i];
            var vo = new PropVO();
            vo.id = parseInt(o.type);
            vo.num = parseInt(o.num);
            vo.extradata1 = o.id;
            vo.extradata2 = o.uid;
            this.props[vo.id] = vo;
        }
    };
    /** 根据id获取一个道具的名字 (含货币)*/
    PropLogic.prototype.getPropNameByID = function (id) {
        if (id < 10) {
            return DataBase.COIN_NAME[id];
        }
        else {
            var vo = this.getPropByID(id);
            return vo == null ? id + "" : vo.name;
        }
    };
    /** 货币道具的变化
     * @param id 道具id
     * @param num 增加减少的数量
    */
    PropLogic.prototype.updateProp = function (id, num) {
        var vo = this.props[id];
        if (vo != null) {
            if (vo.num + num <= 0) {
                num = -vo.num;
            }
            vo.num += num;
        }
        else {
            vo = new PropVO();
            vo.id = id;
            if (num < 0) {
                num = 0;
            }
            vo.num = num;
            this.props[id] = vo;
        }
        var str = DataBase.COIN_NAME[id] + (num > 0 ? "增加" : "减少") + " " + num;
        WxApi.getInstance().toast(str);
        HttpCommand.getInstance().postProps(id, num);
        var event = new GameEvent(GameEvent.PROP_NUM_CHANGE);
        event.data = { id: id, num: num };
        this.dispatchEvent(event);
    };
    /** 获取奖励
     * @param reward 格式  1:100;2:200;3001:1
     */
    PropLogic.prototype.getReward = function (reward) {
        var arr = reward.split(";");
        for (var i = 0; i < arr.length; i++) {
            var aaa = arr[i].split(":");
            PropLogic.getInstance().updateProp(parseInt(aaa[0]), parseInt(aaa[1]));
        }
    };
    /** 获取道具 */
    PropLogic.prototype.getPropByID = function (id) {
        return this.props[id];
    };
    return PropLogic;
}(egret.EventDispatcher));
__reflect(PropLogic.prototype, "PropLogic");
/**
 *
 * 皮肤逻辑类
 *
 *
 */
var SkinLogic = (function (_super) {
    __extends(SkinLogic, _super);
    function SkinLogic() {
        return _super.call(this) || this;
    }
    SkinLogic.getInstance = function () {
        if (this._instance == null) {
            this._instance = new SkinLogic();
        }
        return this._instance;
    };
    /** 初始化皮肤 */
    SkinLogic.prototype.initSkins = function (arr) {
        this.skins = {};
        HttpCommand.getInstance().addEventListener(HttpEvent.getSkinsInfo, this.skinAllResponse, this, false, 1);
        HttpCommand.getInstance().addEventListener(HttpEvent.getSkinsGot, this.skinGotResponse, this, false, 1);
        HttpCommand.getInstance().addEventListener(HttpEvent.postSkinGot, this.skinGotResponse, this, false, 1);
        this.updateskins(arr);
    };
    SkinLogic.prototype.skinGotResponse = function (e) {
        this.updateskins(e.data);
    };
    /** 初始化所有皮肤 */
    SkinLogic.prototype.skinAllResponse = function (e) {
        var arr = e.data;
        for (var i = 0; i < arr.length; i++) {
            var o = arr[i];
            var vo = this.skins[o.id];
            if (vo == null) {
                vo = new SkinVO();
                vo.id = parseInt(o.id);
                vo.imgurl = o.imgurl;
                vo.name = o.title;
            }
            vo.appid = o.appid;
            vo.baseline = o.baseline;
            this.skins[vo.id] = vo;
        }
    };
    /** 更新已拥有皮肤 */
    SkinLogic.prototype.updateskins = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            var o = arr[i];
            var vo = this.skins[o.skin_id];
            if (vo == null) {
                vo = new SkinVO();
                vo.id = parseInt(o.skin_id);
                vo.imgurl = o.imgurl;
                vo.name = o.title;
            }
            vo.isdefault = o.is_default == "1";
            vo.create_time = parseInt(o.create_time);
            this.skins[vo.id] = vo;
        }
    };
    /** 获得皮肤
     * @param id 皮肤id
    */
    SkinLogic.prototype.getSkin = function (id) {
        var vo = this.skins[id];
        if (vo == null) {
            console.log("没有找到成就" + id + "，请联系GM");
        }
        else {
            HttpCommand.getInstance().postSkinGet(id);
        }
    };
    return SkinLogic;
}(egret.EventDispatcher));
__reflect(SkinLogic.prototype, "SkinLogic");
/**
 *
 * 转盘逻辑类
 *
 *
 */
var TurnLogic = (function (_super) {
    __extends(TurnLogic, _super);
    function TurnLogic() {
        var _this = _super.call(this) || this;
        _this.turns = [];
        _this.freetimes = 0;
        return _this;
    }
    TurnLogic.getInstance = function () {
        if (this._instance == null) {
            this._instance = new TurnLogic();
        }
        return this._instance;
    };
    /** 初始化转盘 */
    TurnLogic.prototype.initTurns = function () {
        this.turns = [];
        HttpCommand.getInstance().addEventListener(HttpEvent.getTurntable, this.turnResponse, this, false, 1);
    };
    TurnLogic.prototype.turnResponse = function (e) {
        this.updateTurns(e.data);
    };
    /** 初始化转盘数据 */
    TurnLogic.prototype.updateTurns = function (arr) {
        this.turns = [];
        for (var i = 0; i < arr.length; i++) {
            var o = arr[i];
            var vo = new TurnVO();
            vo.id = parseInt(o.id);
            vo.appid = o.appid;
            vo.imgurl = o.imgurl;
            vo.num = parseInt(o.num);
            vo.name = o.title;
            vo.type = parseInt(o.type);
            vo.weight = parseInt(o.weights);
            this.turns.push(vo);
        }
        this.turns = [];
        //读取本地配置
        for (var i = 0; i < 16; i++) {
            var vo = new TurnVO();
            vo.id = i + 1;
            vo.num = GameUtil.between(10, 1000);
            vo.name = "奖励" + vo.id;
            vo.weight = GameUtil.between(10, 100);
            this.turns.push(vo);
        }
    };
    /** 获取转盘信息 */
    TurnLogic.prototype.getTurnVOs = function () {
        return this.turns;
    };
    /** 免费抽奖的cd 0表示可以免费抽奖 */
    TurnLogic.prototype.getFreeShareCD = function () {
        if (this.freetimes == 0) {
            var a = 24 * 3600;
            var d = new Date();
            var h = d.getHours();
            var m = d.getMinutes();
            var s = d.getSeconds();
            return a - h * 3600 - m * 60 - s;
        }
        else {
            return 0;
        }
    };
    TurnLogic.prototype.setFreeTurn = function () {
        var date = new Date();
        var todaykey = date.getFullYear() + ":" + date.getMonth() + ":" + date.getDate();
        var todayturnkey = todaykey + GameConst.localdata_key_turn;
        WxApi.getInstance().setStorage(todayturnkey, "true");
        this.freetimes = 0;
    };
    return TurnLogic;
}(egret.EventDispatcher));
__reflect(TurnLogic.prototype, "TurnLogic");
var WxApi = (function (_super) {
    __extends(WxApi, _super);
    function WxApi() {
        return _super.call(this) || this;
    }
    WxApi.getInstance = function () {
        if (this._instance == null) {
            this._instance = new WxApi();
        }
        return this._instance;
    };
    /** 初始化游戏所需 api */
    WxApi.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, userinfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.inited = false;
                        return [4 /*yield*/, platform.login()];
                    case 1:
                        res = _a.sent();
                        this.logincode = res.code;
                        console.log("logincod:", res.code);
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 2:
                        userinfo = _a.sent();
                        PlayerConst.userInfo.avatarUrl = userinfo.avatarUrl;
                        PlayerConst.userInfo.city = userinfo.city;
                        PlayerConst.userInfo.country = userinfo.country;
                        PlayerConst.userInfo.gender = parseInt(userinfo.gender);
                        PlayerConst.userInfo.language = userinfo.language;
                        PlayerConst.userInfo.nickname = userinfo.nickName;
                        PlayerConst.userInfo.province = userinfo.province;
                        console.log("获取微信用户信息：", PlayerConst.userInfo);
                        //本地debug版本测试
                        if (PlayerConst.userInfo.nickname == "debug_nickName") {
                            PlayerConst.token = "1D1C1C1C1C1C181L1L181F1F1C1G1E1F1H1C";
                            HttpCommand.getInstance().once(HttpEvent.postUser, this.postUsersResponse, this);
                            HttpCommand.getInstance().postUser(PlayerConst.userInfo);
                        }
                        else {
                            //一，根据logincode请求接口
                            HttpCommand.getInstance().once(HttpEvent.getToken, this.getTokenResponse, this);
                            HttpCommand.getInstance().getToken(this.logincode);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /** 二，得到token以后把微信的用户信息以后发给服务器 */
    WxApi.prototype.getTokenResponse = function (e) {
        PlayerConst.token = e.data.token;
        HttpCommand.getInstance().once(HttpEvent.postUser, this.postUsersResponse, this);
        HttpCommand.getInstance().postUser(PlayerConst.userInfo);
    };
    /** 三，从服务器获取用户的所有信息 */
    WxApi.prototype.postUsersResponse = function (e) {
        HttpCommand.getInstance().once(HttpEvent.getUser, this.getUserResponse, this);
        HttpCommand.getInstance().getUser();
    };
    /** 四，获取用户信息，初始化所有数据 */
    WxApi.prototype.getUserResponse = function (e) {
        PlayerConst.openId = e.data.openid;
        PlayerConst.appid_server = e.data.appid;
        PlayerConst.uid = e.data.id;
        PropLogic.getInstance().initProps(e.data.prop);
        InviteLogic.getInstance().initInvite();
        TurnLogic.getInstance().initTurns();
        GameLogic.getInstance().init(e.data);
        MissionTrainLogic.getInstance().initData();
        AchieveLogic.getInstance().initAchieves();
        //被动分享
        this.share(4);
        this.initRewardVideoAd();
        this.checkLauchOptions();
        this.initOver();
    };
    /** 初始化OK，关闭loading */
    WxApi.prototype.initOver = function () {
        console.log("api与接口初始化ok，可以开始游戏");
        this.inited = true;
        fw.UIManager.getInstance().showLoading(false);
    };
    /** 是否需要打开群排行 */
    WxApi.prototype.checkLauchOptions = function () {
        var info = platform.getLaunchOptionsSync();
        console.log("checkLauchOptions", info);
        if (info.query != null) {
            if (info.query.invite != null) {
                HttpCommand.getInstance().postInvite(info.query.invite);
            }
            if (info.query.grouprank != null && info.shareTicket != null && info.shareTicket != "") {
                fw.UIManager.getInstance().openUI(UIConst.RANK, info.shareTicket);
            }
        }
    };
    /**分享
     * @param type fw.SHARETYPE.XXX分享类型 1主动分享  2炫耀  3当前分数 4被动分享 5群排行
     */
    WxApi.prototype.share = function (type, title, img) {
        if (type === void 0) { type = 1; }
        if (title === void 0) { title = null; }
        if (img === void 0) { img = null; }
        var query = "invite=" + PlayerConst.uid;
        switch (type) {
            case fw.SHARETYPE.ACTIVE:
                platform.share("每天练习5分钟，提高孩子注意力", "resource/assets/share.jpg", query);
                break;
            case fw.SHARETYPE.SHOWOFF:
                platform.share("每天练习5分钟，提高孩子注意力", "resource/assets/share.jpg", query);
                break;
            case fw.SHARETYPE.CRTSCORE:
                platform.share(title, "resource/assets/share.jpg", query);
                break;
            case fw.SHARETYPE.PASSIVE:
                platform.showShareMenu();
                platform.updateShareMenu(true);
                platform.onShareAppMessage("每天练习5分钟，提高孩子注意力", "resource/assets/share.jpg", query);
                break;
            case fw.SHARETYPE.GROUPRANK:
                query += "&grouprank=1";
                platform.share("每天练习5分钟，提高孩子注意力", "resource/assets/share.jpg", query);
                break;
            case fw.SHARETYPE.INVITE:
                platform.share("玩了舒尔特方格，我上课注意力变的集中了，你也来试试吧", "resource/assets/share.jpg", query);
                break;
            case fw.SHARETYPE.INVITE_DAILY:
                break;
        }
    };
    /**联系客服 */
    WxApi.prototype.connectGM = function () {
        platform.openCustomerServiceConversation();
    };
    /** 在左上角创建游戏圈按钮 */
    WxApi.prototype.createGameClubButton = function (btnstr) {
        if (btnstr === void 0) { btnstr = "游戏圈"; }
        platform.createGameClubButton(btnstr);
    };
    /** 手机振动
     * @param short  true短震动  false长振动
     */
    WxApi.prototype.vibrate = function (short) {
        if (short === void 0) { short = true; }
        platform.vibrate(short);
    };
    /** 跳转到其他小程序
     * @param appid 其他小程序的appid
     * @param extraData 其他参数 obj
     */
    WxApi.prototype.skipToProgram = function (appid, extraData) {
        platform.skipToProgram(appid, extraData);
    };
    /**	对用户托管数据进行写数据操作，允许同时写多组 KV 数据
        * @param KVDataList     [{ key: "newscore", value:"9999"}]
      */
    WxApi.prototype.setUserCloudStorage = function (KVDataList) {
        platform.setUserCloudStorage(KVDataList);
    };
    /** 游戏结束 记录数据到服务器和开放域
     * @param key
     * @param score
     */
    WxApi.prototype.setScore = function (key, score) {
        HttpCommand.getInstance().postWorldRank(score);
        var KVDataList = [{ key: key, value: score + "" }];
        this.setUserCloudStorage(KVDataList);
    };
    /** 存储本地数据
     * @param key
     * @param value   string|obj
     * @param isobj 是否为obj，本地缓存数据时需要用，微信不需要
     */
    WxApi.prototype.setStorage = function (key, value, isobj) {
        if (isobj === void 0) { isobj = false; }
        platform.setStorageSync(key, value, isobj);
    };
    /** 获取本地缓存
     * @param key
     * @param isobj 是否为obj，本地缓存数据时需要用，微信不需要
     * @return 如果没有 返回空字符串 ""
     */
    WxApi.prototype.getStorage = function (key, isobj) {
        if (isobj === void 0) { isobj = false; }
        return platform.getStorageSync(key, isobj);
    };
    /** 向开放域发数据
    * @param data  shareTicket: this.shareticket,
                userinfo: WxApi.getInstance().userInfo,
                stageW: GlobalConst.GameStage.stageWidth,
                stageH: GlobalConst.GameStage.stageHeight,
                command: "open"
    */
    WxApi.prototype.postMessageToDataContext = function (data) {
        platform.postMessage(data);
    };
    /** 埋点统计 */
    WxApi.prototype.initBuryingSDK = function () {
        platform.initBuryingSDK();
    };
    /** 埋点统计 */
    WxApi.prototype.buryingPoint = function (key, value) {
        if (value === void 0) { value = null; }
        platform.buryingPoint(key, value);
    };
    /** 弹出提示
     * @param content 内容
     * @param type 1悬浮 2弹出窗
     * @param title 弹出窗时的标题
     */
    WxApi.prototype.toast = function (content, type, title, surestr) {
        if (type === void 0) { type = 1; }
        if (title === void 0) { title = "友情提示"; }
        if (surestr === void 0) { surestr = "确定"; }
        if (type == 1) {
            platform.toast(content);
        }
        else if (type == 2) {
            platform.showModal(content, title, surestr);
        }
    };
    /** 展示banner广告 */
    WxApi.prototype.bannershow = function () {
        platform.bannershow(GameConst.bannerId);
    };
    /** 隐藏banner广告 */
    WxApi.prototype.bannerhide = function () {
        platform.bannerhide();
    };
    /** 销毁banner广告 */
    WxApi.prototype.bannerdestroy = function () {
        platform.bannerdestroy();
    };
    /** 获取开放域的资源形成一个图片 */
    WxApi.prototype.getOpenDataBMP = function () {
        if (platform.isdebug()) {
            return null;
        }
    };
    WxApi.prototype.rewardAdCDStart = function () {
        this.starttime = new Date().getTime();
        this.setStorage(GameConst.localdata_key_reward_cd, this.starttime + "");
    };
    WxApi.prototype.getRewardCD = function () {
        var nowtime = new Date().getTime();
        if (this.starttime == null) {
            return 0;
        }
        else {
            return PlayerConst.settingInfo.rewardCD - Math.floor((nowtime - this.starttime) / 1000);
        }
    };
    /** 预加载激励视频 */
    WxApi.prototype.initRewardVideoAd = function () {
        var _this = this;
        var wx = window["wx"];
        if (wx == null) {
            return;
        }
        this.rewardAd = wx.createRewardedVideoAd({ adUnitId: GameConst.rewardAdId });
        this.rewardAd.onLoad(function () {
            console.log('激励视频 广告加载成功');
        });
        this.rewardAd.onError(function (err) {
            console.log("视频拉取失败:", err);
        });
        this.rewardAd.onClose(function (res) {
            // 用户点击了【关闭广告】按钮
            var state;
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            if (res && res.isEnded || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                state = 0;
                _this.rewardAdCDStart();
            }
            else {
                // 播放中途退出，不下发游戏奖励
                state = 1;
            }
            _this.dispatchGameEvent(GameEvent.REWARDAD_CLOSE_EVENT, state);
        });
    };
    /** 观看视频 关闭视频监听GameEvent.REWARDAD_CLOSE_EVENT
     * @param type 观看视频来源类型 WATCHTYPE.XXXX
     */
    WxApi.prototype.showRewardAd = function (type) {
        var _this = this;
        this.adtype = type;
        if (this.rewardAd != null) {
            try {
                this.rewardAd.show()
                    .catch(function (err) {
                    console.log("showRewardAd:", err);
                    _this.dispatchGameEvent(GameEvent.REWARDAD_CLOSE_EVENT, 2);
                });
            }
            catch (e) {
                this.dispatchGameEvent(GameEvent.REWARDAD_CLOSE_EVENT, 2);
            }
        }
        else {
            this.dispatchGameEvent(GameEvent.REWARDAD_CLOSE_EVENT, 2);
        }
    };
    WxApi.prototype.dispatchGameEvent = function (eventname, data) {
        console.log("dispatchGameEvent:", eventname, this.adtype, data);
        if (eventname == GameEvent.REWARDAD_CLOSE_EVENT && data == 2) {
            this.toast("暂无视频可观看，过会再来看看吧");
        }
        var event = new GameEvent(eventname);
        event.data = { type: this.adtype, data: data };
        this.dispatchEvent(event);
    };
    return WxApi;
}(egret.EventDispatcher));
__reflect(WxApi.prototype, "WxApi");
var GameTrainLogic = (function (_super) {
    __extends(GameTrainLogic, _super);
    function GameTrainLogic() {
        return _super.call(this) || this;
    }
    GameTrainLogic.getInstance = function () {
        if (this._instance == null) {
            this._instance = new GameTrainLogic();
        }
        return this._instance;
    };
    GameTrainLogic.prototype.init = function () {
        // this.initData();
        // MissionTrainLogic.getInstance().initCharpter();
        // this.openStart();
        // WxApi.getInstance().userInfo = platform.getUserInfo();
        // console.log("userinfo:", WxApi.getInstance().userInfo);
    };
    GameTrainLogic.prototype.setNextMission = function (type, id, state) {
        var arr = this.data[type];
        if (arr != null) {
            var vo = arr[id];
            if (vo != null) {
                vo.state = state;
            }
        }
    };
    GameTrainLogic.prototype.initData = function () {
        this.data = [, [], [], []];
        this.config = RES.getRes("config_json");
        for (var i in this.config) {
            var o = this.config[i];
            if (i.length < 8) {
                continue;
            }
            var vo = new TrainMissionVO();
            vo.id = o['id'];
            vo.type = o['type'];
            vo.des = o['des'];
            vo.content = o['content'];
            vo.name = o['name'];
            vo.times = [];
            var ta = o['time'].split(":");
            for (var j = 0; j < ta.length; j++) {
                vo.times.push(parseInt(ta[j]));
            }
            vo.state = vo.type == 1 ? 0 : 1;
            if (vo.type == 1 && vo.id == 1) {
                vo.state = 1;
            }
            vo.stars = 0;
            var previewvo = this.data[vo.type][vo.id - 1];
            if (previewvo != null) {
                if (previewvo.state == 2) {
                    vo.state = 1;
                }
            }
            this.data[vo.type].push(vo);
        }
    };
    GameTrainLogic.prototype.saveLocal = function (type, id, time) {
        // let localdata = WxApi.getInstance().getLocalData(GameConst.localkey_missiondata);
        // console.log("savelocal:", localdata);
        // if (localdata == null) {
        // 	localdata = [, [], [], []];
        // }
        // if (localdata[type] == null) {
        // 	localdata[type] = [];
        // }
        // localdata[type][id] = time;
        // WxApi.getInstance().setLocalData(GameConst.localkey_missiondata, localdata);
    };
    GameTrainLogic.prototype.getRecond = function (id) {
        var value = 0;
        var str = GameLogic.getInstance().getMyDataValueByID(MYDATA.BEST_SCORE);
        if (str == null) {
            value = 0;
        }
        else {
            var arr = str.split("&");
            p1: for (var i = 0; i < arr.length; i++) {
                var brr = arr[i].split("=");
                if (id + "" == brr[0]) {
                    value = parseInt(brr[1]);
                    break p1;
                }
            }
        }
        return value;
    };
    GameTrainLogic.prototype.setRecond = function (id, time) {
        var sss = id + "=" + time;
        var str = GameLogic.getInstance().getMyDataValueByID(MYDATA.BEST_SCORE);
        if (str == null) {
            str = sss;
        }
        else {
            str += ("&" + sss);
        }
        GameLogic.getInstance().updateMyDataValue(MYDATA.BEST_SCORE, str);
        WxApi.getInstance().setScore("score_" + id, time);
    };
    GameTrainLogic.prototype.openStart = function () {
        fw.UIManager.getInstance().openUI(UIConst.START);
    };
    GameTrainLogic.prototype.startGame = function (vo) {
        fw.UIManager.getInstance().openUI(UIConst.GAME, vo);
    };
    GameTrainLogic.prototype.openMission = function () {
        fw.UIManager.getInstance().openUI(UIConst.MISSION);
    };
    GameTrainLogic.prototype.openGrow = function () {
        fw.UIManager.getInstance().openUI(UIConst.GROW);
    };
    GameTrainLogic.prototype.getMissionData = function () {
        return this.data;
    };
    GameTrainLogic.prototype.getStartMission = function () {
        return this.data[1][2];
    };
    GameTrainLogic.prototype.getStringByStar = function (n) {
        return this.config["str" + n];
    };
    return GameTrainLogic;
}(egret.EventDispatcher));
__reflect(GameTrainLogic.prototype, "GameTrainLogic");
var MissionTrainLogic = (function (_super) {
    __extends(MissionTrainLogic, _super);
    function MissionTrainLogic() {
        var _this = _super.call(this) || this;
        _this.charpters = {};
        _this.crtChapter = 1;
        _this.crtMission = 102;
        return _this;
    }
    MissionTrainLogic.getInstance = function () {
        if (this._instance == null) {
            this._instance = new MissionTrainLogic();
        }
        return this._instance;
    };
    MissionTrainLogic.prototype.initData = function () {
        this.initPassData();
        GameTrainLogic.getInstance().initData();
        this.initCharpter();
    };
    MissionTrainLogic.prototype.initPassData = function () {
        this.passdata = {};
        //格式  101=1151&102=313
        var str = GameLogic.getInstance().getMyDataValueByID(MYDATA.MISSION_DATA);
        if (str != null) {
            var arr = str.split("&");
            for (var i = 0; i < arr.length; i++) {
                var a1 = arr[i].split("=");
                this.passdata[a1[0]] = parseInt(a1[1]);
            }
        }
    };
    MissionTrainLogic.prototype.updatePassData = function (id, score) {
        this.passdata[id] = score;
        var s1 = "";
        for (var id_1 in this.passdata) {
            if (s1 != "") {
                s1 += "&";
            }
            s1 += (id_1 + "=" + this.passdata[id_1]);
        }
        GameLogic.getInstance().updateMyDataValue(MYDATA.MISSION_DATA, s1);
    };
    MissionTrainLogic.prototype.initCharpter = function () {
        var s1 = GameLogic.getInstance().getMyDataValueByID(MYDATA.MISSION_CRT);
        if (s1 == null) {
            this.crtMission = 101;
        }
        else {
            this.crtMission = parseInt(s1);
        }
        this.crtChapter = Math.floor(this.crtMission / 100);
        var data = RES.getRes("mission_json");
        var mid = this.crtMission % 100;
        for (var id in data) {
            var o = data[id];
            var v = new CharpterMissionVO();
            v.missionId = parseInt(o.id);
            v.title = o.title;
            v.type = parseInt(o.type);
            v.content = o.content;
            v.des = o.des;
            v.times = o.time.split(":");
            v.setDialog(o.dialog);
            var cid = Math.floor(parseInt(id) / 100);
            var vo = this.charpters[cid];
            if (vo == null) {
                vo = new CharpterVO();
                vo.id = cid;
                vo.missions = [];
                if (cid == this.crtChapter) {
                    vo.state = 1;
                    v.state = mid < v.missionId ? 2 : (mid > v.missionId ? 0 : 1);
                }
                else {
                    vo.state = cid < this.crtChapter ? 2 : 0;
                }
            }
            vo.missions.push(v);
            this.charpters[cid] = vo;
        }
    };
    MissionTrainLogic.prototype.getChaprters = function () {
        return this.charpters;
    };
    MissionTrainLogic.prototype.getMissionsByChapterID = function (charpterId) {
        var charpter = this.charpters[charpterId];
        return charpter.missions;
    };
    /** 当前章节的 当前关卡索引 0开始 */
    MissionTrainLogic.prototype.getCrtMissionInCharpter = function (charpterId) {
        var charpter = this.charpters[charpterId];
        var c = Math.floor(this.crtMission / 100);
        if (c == charpterId) {
            return this.crtMission % 100;
        }
        else {
            return charpter.missions.length;
        }
    };
    MissionTrainLogic.prototype.startMissionGame = function (vo) {
        var obj_class = egret.getDefinitionByName("GameUI" + vo.type);
        fw.UIManager.getInstance().main.addChild(new obj_class(vo));
    };
    return MissionTrainLogic;
}(egret.EventDispatcher));
__reflect(MissionTrainLogic.prototype, "MissionTrainLogic");
/**
 * 埋点
 */
var BuryingPoint = (function () {
    function BuryingPoint() {
    }
    BuryingPoint.bp_grouprank_click = "bp_grouprank_click";
    return BuryingPoint;
}());
__reflect(BuryingPoint.prototype, "BuryingPoint");
/**
 * 存放数据
 * 数据来源  本地配置
 *
 *
 *
 */
var DataBase = (function () {
    function DataBase() {
    }
    /** 货币名字 */
    DataBase.COIN_NAME = [, '体力', '金币', '钻石', '', '', '', '', '', '', '',];
    /** 挑战关卡需要消耗的体力 */
    DataBase.HP_REDUCE_BATTLE = 10;
    /** 每日签到奖励 */
    DataBase.REWARD_ADD_SIGNIN = "1:50;2:1000;3:10";
    /** 邀请好友给的体力 */
    DataBase.HP_ADD_INVITE = 100;
    return DataBase;
}());
__reflect(DataBase.prototype, "DataBase");
var GameConst = (function () {
    function GameConst() {
    }
    GameConst.version = "201808181130";
    /** 广告id */
    GameConst.bannerId = "adunit-758f00e035da3372";
    GameConst.rewardAdId = "adunit-922e89b51b9d9336";
    /** 缓存在本地的key */
    GameConst.localdata_key_reward_cd = "rewardadcd";
    GameConst.localdata_key_turn = "_turn";
    GameConst.localdata_key_lastlogintime = "_lastlogintime";
    return GameConst;
}());
__reflect(GameConst.prototype, "GameConst");
var PROPTYPE;
(function (PROPTYPE) {
    PROPTYPE[PROPTYPE["COIN"] = 1] = "COIN";
    PROPTYPE[PROPTYPE["PROP"] = 2] = "PROP";
})(PROPTYPE || (PROPTYPE = {}));
var COINTYPE;
(function (COINTYPE) {
    COINTYPE[COINTYPE["HP"] = 1] = "HP";
    COINTYPE[COINTYPE["MONEY"] = 2] = "MONEY";
    COINTYPE[COINTYPE["DIAMOND"] = 3] = "DIAMOND";
})(COINTYPE || (COINTYPE = {}));
var SWITCHTYPE;
(function (SWITCHTYPE) {
    SWITCHTYPE[SWITCHTYPE["ACHIEVE"] = 1] = "ACHIEVE";
    SWITCHTYPE[SWITCHTYPE["MISSION"] = 2] = "MISSION";
    SWITCHTYPE[SWITCHTYPE["SKIN"] = 3] = "SKIN";
    SWITCHTYPE[SWITCHTYPE["TURN"] = 4] = "TURN";
})(SWITCHTYPE || (SWITCHTYPE = {}));
var MYDATA;
(function (MYDATA) {
    MYDATA[MYDATA["INVITE_GET"] = 0] = "INVITE_GET";
    MYDATA[MYDATA["REWARD_NUM"] = 1] = "REWARD_NUM";
    MYDATA[MYDATA["BEST_SCORE"] = 2] = "BEST_SCORE";
    MYDATA[MYDATA["INVITE_NUM"] = 3] = "INVITE_NUM";
    MYDATA[MYDATA["ACHIEVE_GET"] = 4] = "ACHIEVE_GET";
    MYDATA[MYDATA["CURRENT_SKIN"] = 5] = "CURRENT_SKIN";
    MYDATA[MYDATA["MISSION_CRT"] = 6] = "MISSION_CRT";
    MYDATA[MYDATA["MISSION_DATA"] = 7] = "MISSION_DATA";
})(MYDATA || (MYDATA = {}));
var WATCHTYPE;
(function (WATCHTYPE) {
    WATCHTYPE[WATCHTYPE["TURNPLAY"] = 1] = "TURNPLAY";
})(WATCHTYPE || (WATCHTYPE = {}));
var ACHIEVETYPE;
(function (ACHIEVETYPE) {
    ACHIEVETYPE[ACHIEVETYPE["LOGIN_TOTAL"] = 1] = "LOGIN_TOTAL";
    ACHIEVETYPE[ACHIEVETYPE["SCORE_SINGLE"] = 2] = "SCORE_SINGLE";
    ACHIEVETYPE[ACHIEVETYPE["INVITE_NUM"] = 3] = "INVITE_NUM";
    ACHIEVETYPE[ACHIEVETYPE["REWARDAD_NUM"] = 4] = "REWARDAD_NUM";
})(ACHIEVETYPE || (ACHIEVETYPE = {}));
var PlayerConst = (function () {
    function PlayerConst() {
    }
    /** 微信用户信息，包含昵称和头像 和 游戏数据*/
    PlayerConst.userInfo = new UserInfo();
    /** 登录信息 */
    PlayerConst.checkInfo = new CheckInVO();
    /** 后台设置 */
    PlayerConst.settingInfo = new SettingVO();
    /** 更新公告 */
    PlayerConst.noticeInfo = new NoticeVO();
    return PlayerConst;
}());
__reflect(PlayerConst.prototype, "PlayerConst");
var UIConst = (function () {
    function UIConst() {
    }
    /** 一级界面 */
    UIConst.START = "StartUI";
    UIConst.GAME = "GameUI";
    /** 二级界面 */
    UIConst.NOTICE = "NoticeUI";
    UIConst.RANK = "RankUI";
    UIConst.TURN = "TurnUI";
    UIConst.INVITE = "InviteUI";
    UIConst.GROW = "GrowUI";
    UIConst.MISSION = "MissionUI";
    UIConst.ACHIEVE = "AchieveUI";
    /** ----------------------------------- 开放域好友激励命令  ----------------------------------------- */
    /** 下一个比自己高的 必要额外参数：当前分数*/
    UIConst.command_getnext = "nextscore";
    /** 超越了一个比自己高的 必要额外参数：当前分数和上一个分数*/
    UIConst.command_exceed = "exceed";
    /** 结算分段附近好友分段 */
    UIConst.command_nearfriend = "near";
    /** 结算超越了多少好友 */
    UIConst.command_exceedfriend = "exceedfriend";
    /** 开启排行 */
    UIConst.command_openrank = "openrank";
    /** 关闭 */
    UIConst.command_clear = "clear";
    return UIConst;
}());
__reflect(UIConst.prototype, "UIConst");
/**
 * 预设动画特效
 */
var EffectUtil = (function () {
    function EffectUtil() {
    }
    EffectUtil.Center = function (ui) {
        //锚点居中
        ui.anchorOffsetX = ui.width / 2;
        ui.anchorOffsetY = ui.height / 2;
        //位置居中
        if (ui.width == GameConst.stageWidth) {
            ui.x = ui.width / 2;
        }
        else if (ui.parent.width < GameConst.stageWidth) {
            ui.x = ui.parent.width / 2;
        }
        else {
            ui.x = GameConst.stageWidth / 2;
        }
        if (ui.height == GameConst.stageHeight) {
            ui.y = ui.height / 2;
        }
        else if (ui.parent.height < GameConst.stageHeight) {
            ui.y = ui.parent.height / 2;
        }
        else {
            ui.y = GameConst.stageHeight / 2;
        }
    };
    /**
     * 清除
     */
    EffectUtil.Clear = function (ui) {
        if (ui == null) {
            return;
        }
        for (var i = 0; i < ui.numChildren; i++) {
            var item = ui.getChildAt(i);
            egret.Tween.removeTweens(item);
        }
        egret.Tween.removeTweens(ui);
        if (ui.filters) {
            ui.filters = null;
        }
    };
    /**
     * 列表
     */
    EffectUtil.List = function (ui, delay) {
        if (delay === void 0) { delay = 0; }
        if (ui == null) {
            return;
        }
        for (var i = 0; i < ui.numChildren; i++) {
            var item = ui.getChildAt(i);
            item.y -= 10;
            item.alpha = 0;
            egret.Tween.get(item).wait(i * 100 + delay).to({ y: item.y + 10, alpha: 1 }, 100);
        }
    };
    /**
     * 纵向滚动到目标位置
     */
    EffectUtil.RollV = function (group, index, delay, ani) {
        if (delay === void 0) { delay = 0; }
        if (ani === void 0) { ani = true; }
        if (group == null || group.numChildren == 0 || index < 0 || index >= group.numChildren) {
            return;
        }
        //容器的Scroller
        var src = group.parent;
        //目标
        var item = group.getChildAt(index);
        //列表的中点位置
        var tar = (src.height - item.height) / 2;
        //目标点
        var end = item.y - tar;
        //列表实际高度(高度+间距)
        var gap = group.layout["gap"] != null ? group.layout["gap"] : 0;
        var size = (item.height + gap) * group.numChildren - gap;
        if (size <= src.height) {
            return;
        }
        //判断临界点
        if (end < 0) {
            end = 0;
        }
        else if (end > size - src.height) {
            end = size - src.height;
        }
        //执行滚动
        src.stopAnimation();
        if (ani) {
            egret.Tween.get(src.viewport).wait(delay).to({ scrollV: end }, 500, egret.Ease.circOut);
        }
        else {
            src.viewport.scrollV = end;
        }
    };
    /**
     * 横向滚动到目标位置
     */
    EffectUtil.RollH = function (group, index, delay, offset, ani) {
        if (delay === void 0) { delay = 0; }
        if (offset === void 0) { offset = 0; }
        if (ani === void 0) { ani = true; }
        if (group == null || group.numChildren == 0 || index < 0 || index >= group.numChildren) {
            return;
        }
        //容器的Scroller
        var src = group.parent;
        //目标
        var item = group.getChildAt(index);
        //列表的中点位置
        var tar = (src.width - item.width) / 2;
        //目标点
        var end = item.x - tar;
        //列表实际宽度(宽度+间距)
        var gap = group.layout["gap"] != null ? group.layout["gap"] : 0;
        var size = (item.width + gap) * group.numChildren - gap;
        if (size <= src.width) {
            return;
        }
        //判断临界点
        if (end < 0) {
            end = 0;
        }
        else if (end > size - src.width) {
            end = size - src.width + offset;
        }
        //执行滚动
        src.stopAnimation();
        if (ani) {
            egret.Tween.get(src.viewport).wait(delay).to({ scrollH: end }, 500, egret.Ease.circOut);
        }
        else {
            src.viewport.scrollH = end;
        }
    };
    /**
     * 打开
     */
    EffectUtil.Open = function (ui, back, reg) {
        if (back === void 0) { back = null; }
        if (reg === void 0) { reg = null; }
        if (ui == null) {
            return;
        }
        function remove() {
            // egret.Tween.removeTweens(ui);
            if (back) {
                back.call(reg);
            }
        }
        // egret.Tween.removeTweens(ui);
        EffectUtil.Center(ui);
        ui.scaleX = ui.scaleY = 0.1;
        egret.Tween.get(ui).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 300, egret.Ease.backOut).call(remove);
    };
    /**
     * 关闭
     */
    EffectUtil.Close = function (ui, back, reg) {
        if (back === void 0) { back = null; }
        if (reg === void 0) { reg = null; }
        if (ui == null) {
            return;
        }
        function remove() {
            // egret.Tween.removeTweens(ui);
            // ui.scaleX = ui.scaleY = 1;
            if (back) {
                back.call(reg);
            }
        }
        // egret.Tween.removeTweens(ui);
        ui.anchorOffsetX = ui.width / 2;
        ui.anchorOffsetY = ui.height / 2;
        egret.Tween.get(ui).to({ scaleX: 0.5, scaleY: 0.5 }, 100).call(remove);
    };
    /**
     * 淡入
     */
    EffectUtil.FadeIn = function (ui, time, delay) {
        if (time === void 0) { time = 500; }
        if (delay === void 0) { delay = 0; }
        if (ui == null) {
            return;
        }
        // function remove(){
        // 	if(back){
        // 		back.call(reg);
        // 	}
        // }
        // if(scale != 1){
        // 	if(ui.anchorOffsetX == 0){
        // 		ui.x += ui.width/2;
        // 	}
        // 	if(ui.anchorOffsetY == 0){
        // 		ui.y += ui.height/2;
        // 	}
        // 	ui.anchorOffsetX = ui.width/2;
        // 	ui.anchorOffsetY = ui.height/2;
        // 	ui.scaleX = ui.scaleY = scale;
        // }
        ui.alpha = 0;
        egret.Tween.get(ui).wait(delay).to({ alpha: 1 }, time);
    };
    /**
     * 淡出
     */
    EffectUtil.FadeOut = function (ui, time, delay) {
        if (time === void 0) { time = 500; }
        if (delay === void 0) { delay = 0; }
        if (ui == null) {
            return;
        }
        // function remove(){
        // 	if(back){
        // 		back.call(reg);
        // 	}
        // }
        // if(scale != 1){
        // if(ui.anchorOffsetX == 0){
        // 	ui.x += ui.width/2;
        // }
        // if(ui.anchorOffsetY == 0){
        // 	ui.y += ui.height/2;
        // }
        // ui.anchorOffsetX = ui.width/2;
        // ui.anchorOffsetY = ui.height/2;
        // ui.scaleX = ui.scaleY = scale;
        // }
        egret.Tween.get(ui).wait(delay).to({ alpha: 0 }, time);
    };
    /**
     * 变大
     */
    EffectUtil.Big = function (ui, delay) {
        if (delay === void 0) { delay = 0; }
        if (ui == null) {
            return;
        }
        // function remove(){
        // 	if(back){
        // 		back.call(reg);
        // 	}
        // }
        if (ui.anchorOffsetX == 0) {
            ui.x += ui.width / 2;
        }
        if (ui.anchorOffsetY == 0) {
            ui.y += ui.height / 2;
        }
        ui.anchorOffsetX = ui.width / 2;
        ui.anchorOffsetY = ui.height / 2;
        ui.scaleX = ui.scaleY = 0.8;
        egret.Tween.get(ui).wait(delay).to({ scaleX: 1, scaleY: 1 }, 500);
    };
    /**
     * 缩小
     */
    EffectUtil.small = function (ui, time, back, reg) {
        if (time === void 0) { time = 500; }
        if (ui == null) {
            return;
        }
        function remove() {
            if (back) {
                back.call(reg);
            }
        }
        if (ui.anchorOffsetX == 0) {
            ui.x += ui.width / 2;
        }
        if (ui.anchorOffsetY == 0) {
            ui.y += ui.height / 2;
        }
        ui.anchorOffsetX = ui.width / 2;
        ui.anchorOffsetY = ui.height / 2;
        // ui.scaleX = ui.scaleY = 0.8;
        egret.Tween.get(ui).to({ scaleX: 0, scaleY: 0 }, time).call(remove);
    };
    /**
     * 漂浮
     */
    EffectUtil.Float = function (ui) {
        if (ui == null) {
            return;
        }
        var speed = 1500;
        function move() {
            egret.Tween.get(ui).to({ y: ui.y + 10 }, speed).call(function () {
                egret.Tween.get(ui).to({ y: ui.y - 10 }, speed).call(move);
            });
        }
        move();
    };
    /**
     * 呼吸
     */
    EffectUtil.breathe = function (ui, speed) {
        if (speed === void 0) { speed = 800; }
        if (ui == null) {
            return;
        }
        function move() {
            egret.Tween.get(ui).to({ scaleX: 0.9, scaleY: 0.9 }, speed).call(function () {
                egret.Tween.get(ui).to({ scaleX: 1, scaleY: 1 }, speed).call(move);
            });
        }
        move();
    };
    /**
     * 移动
     */
    EffectUtil.Move = function (ui, back, reg, prop) {
        if (back === void 0) { back = null; }
        if (reg === void 0) { reg = null; }
        if (prop === void 0) { prop = {}; }
        if (ui == null) {
            return;
        }
        function remove() {
            if (back) {
                back.call(reg);
            }
        }
        if (prop.x == null) {
            prop.x = ui.x;
        }
        if (prop.y == null) {
            prop.y = ui.y;
        }
        egret.Tween.get(ui).to({ x: prop.x, y: prop.y }, 300, egret.Ease.circOut).call(remove);
    };
    /**
     * 数字变化
     * t Label或BitmapLabel
     */
    EffectUtil.NumChange = function (t, begin, end, time) {
        if (time === void 0) { time = 500; }
        var o = { n: begin };
        t.text = begin.toString();
        egret.Tween.get(o, {
            onChange: function () {
                t.text = Math.round(o.n).toString();
            }
        }, this).to({ n: end }, time);
    };
    /****淡出 加变大 */
    EffectUtil.outAlphaScale = function (ui, outValue, inValue, speedO, speedIn) {
        if (outValue === void 0) { outValue = 1.2; }
        if (inValue === void 0) { inValue = 1; }
        if (speedO === void 0) { speedO = 500; }
        if (speedIn === void 0) { speedIn = 200; }
        if (ui == null) {
            return;
        }
        egret.Tween.removeTweens(ui);
        function move() {
            egret.Tween.get(ui).to({ scaleX: outValue, scaleY: outValue, alpha: 0.2 }, speedO).call(function () {
                egret.Tween.get(ui).to({ scaleX: inValue, scaleY: inValue, alpha: 1 }, speedIn).call(move);
            });
        }
        move();
    };
    /****淡出 加变大 */
    EffectUtil.clearTween = function (ui) {
        if (ui == null) {
            return;
        }
        egret.Tween.removeTweens(ui);
    };
    return EffectUtil;
}());
__reflect(EffectUtil.prototype, "EffectUtil");
/**
 *
 * @author
 *
 */
var FilterUtil = (function () {
    function FilterUtil() {
    }
    /**灰色滤镜*/
    FilterUtil.getGrayFilter = function () {
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        return [colorFlilter];
    };
    /**绿色滤镜*/
    FilterUtil.getColorFilter = function () {
        var colorMatrix = [
            0, 0, 0, 0, 0,
            0, 1, 0, 0, 255,
            0, 0, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        return [colorFlilter];
    };
    /**模糊滤镜*/
    FilterUtil.getBlurFilter = function () {
        var blurFliter = new egret.BlurFilter(1, 1);
        return [blurFliter];
    };
    /**文字滤镜 */
    FilterUtil.getTxtFilter = function (color) {
        if (color === void 0) { color = 0x000000; }
        return [new egret.GlowFilter(color, 1, 2, 2, 4, 1, false, false)];
    };
    FilterUtil.getDropFilter = function () {
        var distance = 3; /// 阴影的偏移距离，以像素为单位
        var angle = 45; /// 阴影的角度，0 到 360 度
        var color = 0x000000; /// 阴影的颜色，不包含透明度
        var alpha = 1; /// 光晕的颜色透明度，是对 color 参数的透明度设定
        var blurX = 0; /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY = 0; /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength = 1.5; /// 压印的强度，值越大，压印的颜色越深，而且阴影与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality = 1 /* LOW */; /// 应用滤镜的次数，暂无实现
        var inner = false; /// 指定发光是否为内侧发光
        var knockout = false; /// 指定对象是否具有挖空效果
        var dropShadowFilter = new egret.DropShadowFilter(distance, angle, color, alpha, blurX, blurY, strength, quality, inner, knockout);
        return [dropShadowFilter];
    };
    return FilterUtil;
}());
__reflect(FilterUtil.prototype, "FilterUtil");
var GameUtil = (function () {
    function GameUtil() {
    }
    /**灰色滤镜*/
    GameUtil.getGrayFilter = function () {
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        return [colorFlilter];
    };
    /**根据2个坐标点获取角度 */
    GameUtil.getRotation = function (src, tar) {
        var dy = Math.abs(src.y - tar.y);
        var dx = Math.abs(src.x - tar.x);
        var r = Math.atan2(dx, dy) * 180 / Math.PI;
        if (tar.x > src.x) {
            if (tar.y < src.y) {
                r = r + 0;
            }
            else {
                r = 180 - r;
            }
        }
        else {
            if (tar.y < src.y) {
                r = 360 - r;
            }
            else {
                r = 180 + r;
            }
        }
        return r;
    };
    /** 根据权重随机 */
    GameUtil.getRandomByWeight = function (arr) {
        var total = 0;
        for (var i = 0; i < arr.length; i++) {
            total += arr[i];
        }
        var r = Math.floor(Math.random() * total);
        var index = 0;
        for (var i = 0; i < arr.length; i++) {
            if (i > 0) {
                r -= arr[i - 1];
            }
            if (r < arr[i]) {
                index = i;
                break;
            }
        }
        return index;
    };
    /**tip提示 */
    GameUtil.showMessage = function (str) {
        console.log("showMessage:", str);
    };
    /**给按钮做连续点击检测
     * @param btn 点击的按钮
     * @param delay 按钮连续点击间隔，delay间隔内不能连续点击
     * @return true 可以点击
     */
    GameUtil.CheckBtnContinuousClick = function (btn, delay) {
        if (delay === void 0) { delay = 1; }
        if (this.btnTimeDic == null) {
            this.btnTimeDic = {};
        }
        var key = btn.hashCode;
        var last = this.btnTimeDic[key];
        var now = new Date().getTime();
        var b = last == null || now - last > delay * 1000;
        if (b) {
            this.btnTimeDic[key] = now;
        }
        return b;
    };
    /**
     * @param
     * @param
     * @param floor 0不处理  1floor -1ceil 2[a,b]双闭区间，整数
     */
    GameUtil.between = function (a, b, floor) {
        if (floor === void 0) { floor = 2; }
        var r = Math.random() * (b - a) + a;
        if (floor == 0) {
            return r;
        }
        else if (floor == 1) {
            return Math.floor(r);
        }
        else if (floor == -1) {
            return Math.ceil(r);
        }
        else {
            return Math.floor(Math.random() * (b - a + 1) + a);
        }
    };
    /**对数组乱序 */
    GameUtil.shuffle = function (a) {
        var b = a.slice();
        var c = [];
        while (true) {
            var i = Math.floor(Math.random() * b.length);
            c.push(b[i]);
            b.splice(i, 1);
            if (b.length == 0) {
                break;
            }
        }
        return c;
    };
    GameUtil.getShape = function (width, height, color, alpha) {
        if (width === void 0) { width = 640; }
        if (height === void 0) { height = 960; }
        if (color === void 0) { color = 0x000000; }
        if (alpha === void 0) { alpha = 0.7; }
        var shp = new egret.Shape();
        shp.graphics.beginFill(color, alpha);
        shp.graphics.drawRect(0, 0, width, height);
        shp.graphics.endFill();
        shp.touchEnabled = false;
        return shp;
    };
    GameUtil.getRectShape = function (width, height, color, alpha, ellipseWidth, ellipseHeight) {
        if (width === void 0) { width = 640; }
        if (height === void 0) { height = 960; }
        if (color === void 0) { color = 0x000000; }
        if (alpha === void 0) { alpha = 0.7; }
        if (ellipseWidth === void 0) { ellipseWidth = 0; }
        if (ellipseHeight === void 0) { ellipseHeight = 0; }
        var shp = new egret.Shape();
        shp.graphics.beginFill(color, alpha);
        shp.graphics.drawRoundRect(0, 0, width, height, ellipseWidth, ellipseHeight);
        shp.graphics.endFill();
        shp.touchEnabled = false;
        return shp;
    };
    /**把一个数字转换
     * @param n 原始数字
     * @param s 10的s次幂
     */
    GameUtil.dealNum = function (n, s) {
        if (s === void 0) { s = 3; }
        var ss = Math.pow(10, s);
        return Math.round(n / ss);
    };
    /**
     * 倒计时转换为时间格式（h:m:s） ，可自定义
     * @param t 秒
     * @param f 格式
     */
    GameUtil.ParseTime2Format = function (t, f) {
        if (f === void 0) { f = "h:m:s"; }
        var d = Math.floor(t / 24 / 3600);
        var h = Math.floor((t / 3600) % 24);
        var m = Math.floor((t % 3600) / 60);
        var s = (t % 3600) % 60;
        function parse_format(t) {
            var s = t.toString();
            if (t < 10) {
                s = "0" + t;
            }
            return s;
        }
        if (f.indexOf("d") != -1) {
            f = f.replace(/d/g, parse_format(d));
        }
        else {
            h += d * 24;
        }
        if (f.indexOf("h") != -1) {
            f = f.replace(/h/g, parse_format(h));
        }
        else {
            m += h * 60;
        }
        if (f.indexOf("m") != -1) {
            f = f.replace(/m/g, parse_format(m));
        }
        else {
            if (f.indexOf("h") != -1) {
                s += m * 60;
            }
            else {
                s = t;
            }
        }
        if (f.indexOf("s") != -1) {
            f = f.replace(/s/g, parse_format(s));
        }
        return f;
    };
    /**创建文本
     * @param x 如果为
     * @param y
     * @param pw 如果为null  设置x  否则 x=(pw-w)/2
     * @param ph 如果为null  设置y  否则 y=(ph-h)/2
     */
    GameUtil.createTextField = function (x, y, pw, ph, w, h, color, size, font, textalign, veralign) {
        if (color === void 0) { color = 0xffffff; }
        if (size === void 0) { size = 30; }
        if (font === void 0) { font = "SimHei"; }
        if (textalign === void 0) { textalign = "center"; }
        if (veralign === void 0) { veralign = "middle"; }
        var tf = new egret.TextField();
        if (x != null) {
            tf.x = x;
        }
        if (y != null) {
            tf.y = y;
        }
        if (pw != null) {
            tf.x = (pw - w) / 2;
        }
        if (ph != null) {
            tf.y = (ph - h) / 2;
        }
        if (w != null) {
            tf.width = w;
        }
        if (h != null) {
            tf.height = h;
        }
        tf.textColor = color;
        tf.size = size;
        tf.fontFamily = font;
        tf.textAlign = textalign;
        tf.verticalAlign = veralign;
        tf.touchEnabled = false;
        return tf;
    };
    /**创建图片
     * @param res 资源名
     * @param x 如果不为null，则设置为x
     * @param y 如果不为null，则设置为y
     * @param pw 如果为null  设置x  否则 x=(pw-w)/2
     * @param ph 如果为null  设置y  否则 y=(ph-h)/2
     * @param center 锚点 默认0左上角
     * @param w 图片宽 默认初始宽度
     * @param h 图片高 默认初始高度
    
     */
    GameUtil.createBitmap = function (res, x, y, pw, ph, center, w, h) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (pw === void 0) { pw = null; }
        if (ph === void 0) { ph = null; }
        if (center === void 0) { center = 0; }
        if (w === void 0) { w = null; }
        if (h === void 0) { h = null; }
        var bmp = new egret.Bitmap();
        if (res != null) {
            bmp.texture = RES.getRes(res);
        }
        if (w != null) {
            bmp.width = w;
        }
        if (h != null) {
            bmp.height = h;
        }
        if (center % 3 == 1) {
            bmp.anchorOffsetX = bmp.width / 2;
        }
        else if (center % 3 == 2) {
            bmp.anchorOffsetX = bmp.width;
        }
        var i = Math.floor(center / 3);
        if (i == 1) {
            bmp.anchorOffsetY = bmp.height / 2;
        }
        else if (i == 2) {
            bmp.anchorOffsetY = bmp.height;
        }
        if (x != null) {
            bmp.x = x;
        }
        if (y != null) {
            bmp.y = y;
        }
        if (pw != null) {
            bmp.x = (pw - w) / 2;
        }
        if (ph != null) {
            bmp.y = (ph - h) / 2;
        }
        return bmp;
    };
    /**名字太长改为xxx.. */
    GameUtil.formatNameString = function (str) {
        var len = 0;
        var newstr = "";
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
                len += 2;
            }
            else {
                len++;
            }
            newstr += str.charAt(i);
            if (len > 12 && i < str.length - 1) {
                return newstr + "..";
            }
        }
        return str;
    };
    /**处理一些特殊字符导致的无法显示的名字 */
    GameUtil.checkSpeName = function (str) {
        var newstr = "";
        var i = 0;
        while (i < str.length) {
            var n = str.charCodeAt(i);
            var s = str.charAt(i);
            i++;
            if (n >= 65024 && n <= 65039) {
                continue;
            }
            newstr += s;
        }
        return newstr;
    };
    return GameUtil;
}());
__reflect(GameUtil.prototype, "GameUtil");
var ObjectUtil = (function () {
    function ObjectUtil() {
    }
    //删除所有数据
    ObjectUtil.delObjectProp = function (o) {
        for (var key in o) {
            delete o[key];
        }
    };
    ObjectUtil.cloneObject = function (o) {
        var str = egret.getQualifiedClassName(o);
        var objClass = egret.getDefinitionByName(str);
        var obj = new objClass();
        if (str == "function") {
            return obj.constructor;
        }
        for (var k in o) {
            if (k == "callBackList") {
                continue;
            }
            if (k == "function") {
                return;
            }
            var value = o[k];
            if (typeof (value) == "number" ||
                typeof (value) == "string" ||
                typeof (value) == "boolean") {
                obj[k] = value;
            }
            else {
                var str = egret.getQualifiedClassName(value);
                if (str == "") {
                    continue;
                }
                obj[k] = this.cloneObject(value);
            }
        }
        return obj;
    };
    /**
     * 获取状态位
     * @param result  结果 值
     * @param crtV    当前值
     * @ return   Boolean  返回状态
     */
    ObjectUtil.getState = function (result, crtV) {
        var boo = false;
        if ((1 << crtV) & result) {
            boo = true;
        }
        return boo;
    };
    /**
     * 将num 左移 bit位。
     */
    ObjectUtil.push_bit = function (num, bit) {
        return num << bit;
    };
    return ObjectUtil;
}());
__reflect(ObjectUtil.prototype, "ObjectUtil");
var StringUtil = (function () {
    function StringUtil() {
    }
    /**
     * 带文本替换功能的字符串：返回富文本
     * @param StrID
     * @param valArr
     * @return
     */
    StringUtil.getSwfLangTextFlowVar = function (StrID, valArr) {
        return new egret.HtmlTextParser().parser(StringUtil.getSwfLangStrVar(StrID, valArr));
    };
    StringUtil.getSwfLangStrVarByID = function (StrID, valArr) {
        if (DataBase.strings == null) {
            return StrID;
        }
        var data = DataBase.strings[StrID];
        if (data == null) {
            return StrID;
        }
        return StringUtil.getSwfLangStrVar(data, valArr);
    };
    /**
     * 带文本替换功能的字符串
     * @param StrID
     * @param valArr
     * @return
     */
    StringUtil.getSwfLangStrVar = function (strData, valArr) {
        var indexpre;
        var indexback;
        var strget;
        indexpre = strData.indexOf("{");
        indexback = strData.indexOf("}");
        //下一次搜索的起始偏移量,防止{@}嵌套时，造成死循环
        var nextOffset = 0;
        var firstIndex;
        var strFlagPre;
        var strFlagBack;
        var strFlag;
        while (indexpre != -1 && indexback != -1) {
            strget = strData.substring(indexpre, indexback + 1);
            firstIndex = strData.indexOf("@", nextOffset);
            //var number: int = int(strData.charAt(strData.indexOf("@", nextOffset) + 1));
            var numberic = parseInt(strData.substring(firstIndex + 1, strData.indexOf(":", firstIndex))) - 1;
            if (numberic == NaN) {
                return "stringError:" + strData;
            }
            //处理填充字符串参数（如果有）
            strFlagPre = strData.indexOf("!#[", nextOffset) + 3;
            if (strFlagPre > 2) {
                //前缀{!#[PeerageRank_]@0:}
                strFlagBack = strData.indexOf("]@", nextOffset);
                strFlag = strData.substring(strFlagPre, strFlagBack);
                valArr[numberic] = StringUtil.getSwfLangStr(strFlag + valArr[numberic]);
            }
            var strreplace = valArr[numberic].toString();
            strData = strData.replace(strget, strreplace);
            nextOffset = indexpre + strreplace.length;
            indexpre = strData.indexOf("{", nextOffset);
            indexback = strData.indexOf("}", nextOffset);
        }
        return strData;
    };
    /**
     * 获取配置好的字符串
     * @param StrID
     * @return
     *
     */
    StringUtil.getSwfLangStr = function (StrID) {
        if (DataBase.strings == null) {
            return StrID;
        }
        var data = DataBase.strings[StrID];
        if (data == null) {
            return StrID;
        }
        return data.toString();
    };
    return StringUtil;
}());
__reflect(StringUtil.prototype, "StringUtil");
//////////////////////////////////////////////////////////////////////////////////////
//
//  小游戏通用框架
//  将项目resource和src目录拷贝到新项目中
//
//
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        GameConst.GameStage = this.stage;
        GameConst.stageWidth = this.stage.stageWidth;
        GameConst.stageHeight = this.stage.stageHeight;
        fw.UIManager.getInstance().main = this;
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        fw.UIManager.getInstance().showLoading(true, fw.LOADINGTYPE.LOADING);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, fw.UIManager.getInstance().loadingView)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        fw.UIManager.getInstance().showLoading(false);
        fw.GameManager.getInstance().init();
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
/**
 *
 * @author
 *
 */
var ViewUtil = (function () {
    function ViewUtil() {
    }
    /**把一个DisObject画成一个位图
    * @param disobject 要画的disobject
    * @param scale 缩放比例
    */
    ViewUtil.drawBitmapFromDisObject = function (disobject, clipBounds, scale) {
        var renderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(disobject, clipBounds, scale);
        var bitmap = new egret.Bitmap(renderTexture);
        return bitmap;
    };
    /**屏幕或组件抖动 （为确保精确参数尽量用2的幂数）
     * @param dis 要抖动的容器 不能是stage
     * @param times 抖动次数
     * @param offset 抖动幅度
     * @param speed 抖动频率
     */
    ViewUtil.shake = function (dis, times, offset, speed) {
        var _this = this;
        if (times === void 0) { times = 1.5; }
        if (offset === void 0) { offset = 0.5; }
        if (speed === void 0) { speed = 50; }
        if (this.isShake) {
            return;
        }
        this.isShake = true;
        var point = new egret.Point(dis.x, dis.y);
        var offsetXYArray = [0, 0];
        var num = 0;
        var u = egret.setInterval(function () {
            offsetXYArray[num % 2] = (num++) % 4 < 2 ? 0 : offset;
            if (num > (times * 4 + 1)) {
                egret.clearInterval(u);
                num = 0;
                _this.isShake = false;
            }
            dis.x = offsetXYArray[0] + point.x;
            dis.y = offsetXYArray[1] + point.y;
        }, this, speed);
    };
    /**画一个箭头,默认箭头指向右侧*/
    ViewUtil.drawArrow = function (width, color) {
        if (width === void 0) { width = 50; }
        if (color === void 0) { color = 0xffff00; }
        var sp = new egret.Shape();
        sp.graphics.lineStyle(1, 0, 1);
        sp.graphics.beginFill(0xffff00);
        sp.graphics.moveTo(-width, -width / 2);
        sp.graphics.lineTo(0, -width / 2);
        sp.graphics.lineTo(0, -width);
        sp.graphics.lineTo(width, 0);
        sp.graphics.lineTo(0, width);
        sp.graphics.lineTo(0, width / 2);
        sp.graphics.lineTo(-width, width / 2);
        sp.graphics.lineTo(-width, -width / 2);
        sp.graphics.endFill();
        return sp;
    };
    ViewUtil.getShape = function (width, height, color, alpha) {
        if (width === void 0) { width = 640; }
        if (height === void 0) { height = 960; }
        if (color === void 0) { color = 0x000000; }
        if (alpha === void 0) { alpha = 0.7; }
        var shp = new egret.Shape();
        shp.graphics.beginFill(color, alpha);
        shp.graphics.drawRect(0, 0, width, height);
        shp.graphics.endFill();
        shp.touchEnabled = false;
        return shp;
    };
    ViewUtil.getArtNum = function (art_src, src) {
        var con = new egret.Sprite();
        var i = 0;
        while (i < src.length) {
            var texture = RES.getRes(art_src + src.charAt(i));
            var bmp = new egret.Bitmap(texture);
            bmp.x = con.width + 1;
            bmp.y = -texture.textureHeight / 2;
            con.addChild(bmp);
        }
        return con;
    };
    /**检测碰撞*/
    ViewUtil.hitTest = function (obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2);
    };
    ViewUtil.isShake = false;
    return ViewUtil;
}());
__reflect(ViewUtil.prototype, "ViewUtil");
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
var AchieveUI = (function (_super) {
    __extends(AchieveUI, _super);
    function AchieveUI() {
        return _super.call(this, "AchieveSkin") || this;
    }
    /**初始化数据 */
    AchieveUI.prototype.initData = function () {
    };
    /**初始化界面 */
    AchieveUI.prototype.initView = function () {
        this.list.itemRenderer = AchieveItemUI;
        this.arr_data = new eui.ArrayCollection();
        var dic = AchieveLogic.getInstance().getAllAchieves();
        for (var id in dic) {
            this.arr_data.addItem(dic[id]);
        }
        this.list.dataProvider = this.arr_data;
    };
    /**初始化事件 */
    AchieveUI.prototype.initEvent = function () {
    };
    AchieveUI.prototype.clickClose = function () {
        _super.prototype.clickClose.call(this);
    };
    AchieveUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.list.dataProvider = null;
        this.arr_data = null;
    };
    return AchieveUI;
}(fw.BaseUI));
__reflect(AchieveUI.prototype, "AchieveUI");
window['AchieveUI'] = AchieveUI;
var GameItemUI = (function (_super) {
    __extends(GameItemUI, _super);
    function GameItemUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameItemSkin";
        return _this;
    }
    GameItemUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.begin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.end, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
    };
    GameItemUI.prototype.begin = function () {
        this.rect_click.fillColor = GameTrainLogic.getInstance().crtClickStr == this.data.id ? 0x42F907 : 0xFF0000;
        this.rect_click.visible = true;
    };
    GameItemUI.prototype.end = function () {
        this.rect_click.visible = false;
    };
    GameItemUI.prototype.clear = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.begin, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.end, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
    };
    GameItemUI.prototype.dataChanged = function () {
        if (this.data == null) {
            return;
        }
        var len = 720 / this.data.row;
        this.width = this.height = this.rect_bg.width =
            this.rect_bg.height = this.rect_click.width = this.rect_click.height = len - 30;
        this.lbl.size = this.data.size;
        this.lbl.text = this.data.id + "";
    };
    return GameItemUI;
}(eui.ItemRenderer));
__reflect(GameItemUI.prototype, "GameItemUI");
window['MissionItemUI'] = MissionItemUI;
var GameOverUI = (function (_super) {
    __extends(GameOverUI, _super);
    function GameOverUI(v, t) {
        var _this = _super.call(this, "GameOverSkin") || this;
        _this.vo = v;
        _this.time = t;
        return _this;
    }
    GameOverUI.prototype.initView = function () {
        var star = 0;
        for (var i = this.vo.times.length - 1; i >= 0; i--) {
            if (this.time <= this.vo.times[i] * 1000) {
                star++;
                this['star' + (this.vo.times.length - i)].source = RES.getRes("star_a_png");
            }
        }
        this.vo.stars = star;
        if (star > 0) {
            this.vo.state = 2;
            GameTrainLogic.getInstance().setNextMission(this.vo.type, this.vo.id, 1);
        }
        console.log("gameover:", this.vo);
        var recond = GameTrainLogic.getInstance().getRecond(this.vo.id);
        if (recond != 0) {
            this.lbl_best.text = "历史最快成绩：" + this.getText(recond);
        }
        if (recond == 0 || this.time < recond) {
            GameTrainLogic.getInstance().setRecond(this.vo.id, this.time);
        }
        if (this.time < recond) {
            this.lbl_fast.visible = true;
        }
        this.lbl.text = GameTrainLogic.getInstance().getStringByStar(this.vo.stars);
        this.lbl_time.text = "本局用时：" + this.getText(this.time);
    };
    GameOverUI.prototype.getText = function (t) {
        var s = TimeUtil.ParseTime2Format(Math.floor(t / 1000), "m:s");
        var hs = t % 1000;
        var ss = "";
        if (hs < 10) {
            ss = "00" + hs;
        }
        else if (hs < 100) {
            ss = "0" + hs;
        }
        else {
            ss = hs + "";
            ;
        }
        return s + ":" + ss;
    };
    GameOverUI.prototype.initEvent = function () {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.btn_restart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRestart, this);
        this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickShare, this);
    };
    GameOverUI.prototype.clickRestart = function () {
        GameTrainLogic.getInstance().startGame(this.vo);
    };
    GameOverUI.prototype.clickBack = function () {
        GameTrainLogic.getInstance().openStart();
    };
    GameOverUI.prototype.clickShare = function () {
        var title = "这次舒尔特注意力训练" + this.vo.name + "关卡我只用了" + this.getText(this.time) + "秒，快来挑战我吧";
        WxApi.getInstance().share(fw.SHARETYPE.CRTSCORE, title);
    };
    GameOverUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.vo = null;
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.btn_restart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRestart, this);
        this.btn_share.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickShare, this);
    };
    return GameOverUI;
}(fw.BaseUI));
__reflect(GameOverUI.prototype, "GameOverUI");
var GameUI = (function (_super) {
    __extends(GameUI, _super);
    function GameUI(obj) {
        var _this = _super.call(this, "GameSkin") || this;
        _this.vo = obj.params;
        return _this;
    }
    GameUI.prototype.checkFit = function () {
        _super.prototype.checkFit.call(this);
        this.img_1.height = GameConst.stageHeight;
    };
    /**初始化数据 */
    GameUI.prototype.initData = function () {
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
    };
    GameUI.prototype.initType1 = function () {
        var len = parseInt(this.vo.content);
        this.arr = [];
        for (var i = 0; i < len; i++) {
            this.arr.push((i + 1) + "");
        }
        var row = Math.sqrt(len);
        var a = this.shuffle(this.arr);
        var size = 60;
        for (var i = 0; i < a.length; i++) {
            this.arr_data.addItem({ id: a[i], row: row, size: size });
        }
    };
    GameUI.prototype.initType2 = function () {
        var index = this.vo.content.indexOf(",");
        var s = index != -1 ? "," : "";
        this.arr = this.vo.content.split(s);
        var a = this.shuffle(this.arr);
        var size = 60;
        if (this.vo.type == 2 && (this.vo.id == 8 || this.vo.id == 9)) {
            size = 48;
        }
        var row = (this.vo.id < 3 || this.vo.id > 8) ? 5 : 4;
        for (var i = 0; i < a.length; i++) {
            this.arr_data.addItem({ id: a[i], row: this.vo.id < 3 ? 5 : 5, size: size });
        }
    };
    GameUI.prototype.initType3 = function () {
        var len = parseInt(this.vo.content);
        this.arr = [];
        var str = "";
        for (var i = 0; i < len; i++) {
            var n = Math.floor(Math.random() * 10) + "";
            this.arr.push(n);
            str += n;
        }
        this.lbl_num.visible = true;
        this.lbl_num.alpha = 1;
        this.lbl_num.text = str;
        var size = 60;
        for (var i = 0; i < 10; i++) {
            this.arr_data.addItem({ id: i + "", row: 5, size: size });
        }
        this.list.visible = false;
    };
    /**对数组乱序 */
    GameUI.prototype.shuffle = function (a) {
        var b = a.slice();
        var c = [];
        while (true) {
            var i = Math.floor(Math.random() * b.length);
            c.push(b[i]);
            b.splice(i, 1);
            if (b.length == 0) {
                break;
            }
        }
        return c;
    };
    /**初始化界面 */
    GameUI.prototype.initView = function () {
        this.lbl_des.text = this.vo.des;
        this.list.itemRenderer = GameItemUI;
        this.list.dataProvider = this.arr_data;
        this.btn_back.visible = true; // this.vo.type != 1 || this.vo.id > 3;
    };
    GameUI.prototype.clickStart = function () {
        var _this = this;
        this.gp.visible = false;
        if (this.vo.type == 3) {
            egret.clearTimeout(this.timeId);
            var t = (parseInt(this.vo.content) - 5) * 1000;
            this.timeId = egret.setTimeout(function () {
                egret.Tween.get(_this.lbl_num).to({ alpha: 0 }, 3000).call(function () {
                    _this.lbl_num.visible = false;
                    _this.list.visible = true;
                    _this.start();
                }, _this);
            }, this, t);
        }
        else {
            this.start();
        }
    };
    GameUI.prototype.start = function () {
        GameTrainLogic.getInstance().crtclick = 0;
        GameTrainLogic.getInstance().crtClickStr = this.arr[GameTrainLogic.getInstance().crtclick];
        this.starttime = egret.getTimer();
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterframe, this);
    };
    GameUI.prototype.gameover = function () {
        var newtime = egret.getTimer();
        var time = newtime - this.starttime;
        this.addChild(new GameOverUI(this.vo, time));
    };
    /**初始化事件 */
    GameUI.prototype.initEvent = function () {
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemClick, this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.btn_mission.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickMission, this);
    };
    GameUI.prototype.clickBack = function () {
        GameTrainLogic.getInstance().openStart();
    };
    GameUI.prototype.itemClick = function (e) {
        var i = e.itemIndex;
        var id = e.item.id;
        var item = e.itemRenderer;
        if (GameTrainLogic.getInstance().crtClickStr == id) {
            GameTrainLogic.getInstance().crtclick++;
            if (GameTrainLogic.getInstance().crtclick >= this.arr.length) {
                this.gameover();
            }
            else {
                GameTrainLogic.getInstance().crtClickStr = this.arr[GameTrainLogic.getInstance().crtclick];
            }
        }
    };
    GameUI.prototype.enterframe = function () {
        var newtime = egret.getTimer();
        var time = newtime - this.starttime;
        var s = TimeUtil.ParseTime2Format(Math.floor(time / 1000), "m:s");
        var hs = time % 1000;
        var ss = "";
        if (hs < 10) {
            ss = "00" + hs;
        }
        else if (hs < 100) {
            ss = "0" + hs;
        }
        else {
            ss = hs + "";
            ;
        }
        this.lbl_time.text = s + ":" + ss;
    };
    GameUI.prototype.clickMission = function () {
        fw.UIManager.getInstance().openUI(UIConst.MISSION);
    };
    GameUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.vo = null;
        GameTrainLogic.getInstance().crtclick = 0;
        egret.clearTimeout(this.timeId);
        egret.Tween.removeTweens(this.lbl_num);
        this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterframe, this);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemClick, this);
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.btn_mission.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickMission, this);
    };
    return GameUI;
}(fw.BaseUI));
__reflect(GameUI.prototype, "GameUI");
window['GameUI'] = GameUI;
var GrowLeftItemUI = (function (_super) {
    __extends(GrowLeftItemUI, _super);
    function GrowLeftItemUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "GrowLeftItemSkin";
        return _this;
    }
    GrowLeftItemUI.prototype.setVO = function (vo) {
        this.initView(vo);
    };
    GrowLeftItemUI.prototype.dataChanged = function () {
        if (this.data == null) {
            return;
        }
        var vo = this.data;
        this.initView(vo);
    };
    GrowLeftItemUI.prototype.initView = function (vo) {
        this.lbl.text = "第" + vo.id + "章";
        this.lbl_state.visible = vo.state != 1;
        this.lbl_state.text = vo.state == 0 ? "未解锁" : "通关";
        this.lbl_state.textColor = vo.state == 0 ? 0x8FFC02 : 0xF7DF07;
        this.rect_state.visible = vo.state == 0;
    };
    GrowLeftItemUI.prototype.isSelected = function (b) {
        this.rect_select.visible = b;
    };
    return GrowLeftItemUI;
}(eui.ItemRenderer));
__reflect(GrowLeftItemUI.prototype, "GrowLeftItemUI");
window['GrowLeftItemUI'] = GrowLeftItemUI;
var GrowRightItemUI = (function (_super) {
    __extends(GrowRightItemUI, _super);
    function GrowRightItemUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "GrowRightItemSkin";
        return _this;
    }
    GrowRightItemUI.prototype.setVO = function (vo) {
        this.initView(vo);
    };
    GrowRightItemUI.prototype.dataChanged = function () {
        if (this.data == null) {
            return;
        }
        var vo = this.data;
        this.initView(vo);
    };
    GrowRightItemUI.prototype.initView = function (vo) {
        this.lbl_title.text = vo.missionId + "." + vo.title;
        if (vo.best != null) {
            this.lbl_best.text = "最好成绩：" + TimeUtil.formatSecondT(vo.best);
        }
        else {
            this.lbl_best.text = "";
        }
        if (vo.state == 2) {
            for (var i = 1; i <= 5; i++) {
                this['star' + i].source = RES.getRes(i <= vo.stars ? "star_a_png" : "star_b_png");
            }
        }
        this.rect_state.visible = vo.state == 0;
    };
    GrowRightItemUI.prototype.isSelected = function (b) {
        this.rect_select.visible = b;
    };
    return GrowRightItemUI;
}(eui.ItemRenderer));
__reflect(GrowRightItemUI.prototype, "GrowRightItemUI");
window['GrowRightItemUI'] = GrowRightItemUI;
var GrowUI = (function (_super) {
    __extends(GrowUI, _super);
    function GrowUI() {
        return _super.call(this, "GrowSkin") || this;
    }
    /**初始化数据 */
    GrowUI.prototype.initData = function () {
        this.list_left.itemRenderer = GrowLeftItemUI;
        this.arr_data_left = new eui.ArrayCollection();
        this.list_right.itemRenderer = GrowRightItemUI;
        this.arr_data_right = new eui.ArrayCollection();
    };
    /**初始化界面 */
    GrowUI.prototype.initView = function () {
        this.charpters = MissionTrainLogic.getInstance().getChaprters();
        this.crtChapter = MissionTrainLogic.getInstance().crtChapter;
        this.initLeftList();
    };
    GrowUI.prototype.initLeftList = function () {
        this.arr_data_left.removeAll();
        for (var i in this.charpters) {
            this.arr_data_left.addItem(this.charpters[i]);
        }
        this.list_left.dataProvider = this.arr_data_left;
        this.list_left.validateNow();
        this.list_left.selectedIndex = this.crtChapter - 1;
        this.missions = MissionTrainLogic.getInstance().getMissionsByChapterID(this.crtChapter);
        this.crtMission = MissionTrainLogic.getInstance().getCrtMissionInCharpter(this.crtChapter);
        this.crtLeftItem = this.list_left.getElementAt(this.crtChapter - 1);
        this.crtLeftItem.isSelected(true);
        this.initRightList();
    };
    GrowUI.prototype.initRightList = function () {
        this.arr_data_right.removeAll();
        for (var i = 0; i < this.missions.length; i++) {
            this.arr_data_right.addItem(this.missions[i]);
        }
        this.list_right.dataProvider = this.arr_data_right;
        this.list_right.validateNow();
        this.list_right.selectedIndex = this.crtMission;
        this.clickMission = this.missions[this.crtMission];
        this.crtRightItem = this.list_right.getElementAt(this.crtMission - 1);
        this.crtRightItem.isSelected(true);
    };
    /**初始化事件 */
    GrowUI.prototype.initEvent = function () {
        this.list_left.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemLeftClick, this);
        this.list_right.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemRightClick, this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
    };
    GrowUI.prototype.clickStart = function () {
        if (this.clickMission != null) {
            MissionTrainLogic.getInstance().startMissionGame(this.clickMission);
        }
    };
    GrowUI.prototype.clickBack = function () {
        GameTrainLogic.getInstance().openStart();
    };
    GrowUI.prototype.itemLeftClick = function (e) {
        var vo = this.list_left.selectedItem;
        if (vo.state == 0) {
            return;
        }
        if (this.crtLeftItem != null) {
            this.crtLeftItem.isSelected(false);
        }
        var i = this.list_left.selectedIndex;
        this.crtLeftItem = this.list_left.getElementAt(i);
        this.crtLeftItem.isSelected(true);
        this.missions = vo.missions;
        this.crtMission = MissionTrainLogic.getInstance().getCrtMissionInCharpter(this.crtChapter);
        this.initRightList();
    };
    GrowUI.prototype.itemRightClick = function (e) {
        var vo = this.list_right.selectedItem;
        if (vo.state == 0) {
            return;
        }
        this.clickMission = vo;
        if (this.crtRightItem != null) {
            this.crtRightItem.isSelected(false);
        }
        var i = this.list_right.selectedIndex;
        this.crtRightItem = this.list_right.getElementAt(i);
        this.crtRightItem.isSelected(true);
    };
    GrowUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.list_left.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemLeftClick, this);
        this.list_right.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemRightClick, this);
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
        this.list_left.dataProvider = null;
        this.list_right.dataProvider = null;
        this.arr_data_left = null;
        this.arr_data_right = null;
        this.charpters = null;
        this.missions = null;
        this.clickMission = null;
    };
    return GrowUI;
}(fw.BaseUI));
__reflect(GrowUI.prototype, "GrowUI");
var InviteItemUI = (function (_super) {
    __extends(InviteItemUI, _super);
    function InviteItemUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "InviteItemSkin";
        return _this;
    }
    InviteItemUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.btn_get.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGet, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
    };
    InviteItemUI.prototype.dataChanged = function () {
        if (this.data == null) {
            return;
        }
        var vo = this.data;
        this.lbl_name.text = vo.name;
        this.lbl_num1.text = vo.num1 + "";
        if (!platform.isdebug()) {
            this.img.source = vo.avatarurl;
        }
        this.btn_get.label = vo.hasget ? "已领取" : "领取";
    };
    InviteItemUI.prototype.clickGet = function () {
        if (this.data.hasget) {
            return;
        }
        this.data.hasget = true;
        this.btn_get.label = this.data.hasget ? "已领取" : "领取";
        InviteLogic.getInstance().getReward(this.data.uid);
    };
    InviteItemUI.prototype.clear = function () {
        this.btn_get.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGet, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.clear, this);
        this.data = null;
    };
    return InviteItemUI;
}(eui.ItemRenderer));
__reflect(InviteItemUI.prototype, "InviteItemUI");
var InviteUI = (function (_super) {
    __extends(InviteUI, _super);
    function InviteUI() {
        return _super.call(this, "InviteSkin") || this;
    }
    /**初始化数据 */
    InviteUI.prototype.initData = function () {
        HttpCommand.getInstance().getInvite();
    };
    /**初始化界面 */
    InviteUI.prototype.initView = function () {
        this.list.itemRenderer = InviteItemUI;
    };
    /**初始化事件 */
    InviteUI.prototype.initEvent = function () {
        this.btn_invite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        HttpCommand.getInstance().addEventListener(HttpEvent.getInvite, this.getInviteResponse, this);
    };
    InviteUI.prototype.clickBtn = function () {
        WxApi.getInstance().share(fw.SHARETYPE.INVITE);
    };
    /** 数据处理在logic里处理了，这里直接获取结果 */
    InviteUI.prototype.getInviteResponse = function () {
        this.invites = InviteLogic.getInstance().getInvites();
        this.arr_data = new eui.ArrayCollection();
        this.invites = this.invites.concat(this.invites).concat(this.invites);
        for (var i = 0; i < this.invites.length; i++) {
            this.arr_data.addItem(this.invites[i]);
        }
        this.list.dataProvider = this.arr_data;
    };
    InviteUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.btn_invite.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        HttpCommand.getInstance().removeEventListener(HttpEvent.getInvite, this.getInviteResponse, this);
    };
    return InviteUI;
}(fw.BaseUI));
__reflect(InviteUI.prototype, "InviteUI");
window['InviteUI'] = InviteUI;
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
/**
 * DebugPlatform用于本地测试
 */
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.isdebug = function () {
        return true;
    };
    DebugPlatform.prototype.initBuryingSDK = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("debug_initBuryingSDK");
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.buryingPoint = function (id, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("debug_buryingPoint", id);
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { code: "1D1C1C1C1C1C181L1L181F1F1C1G1E1F1H1C" }];
            });
        });
    };
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                PlayerConst.token = "1D1C1C1C1C1C181L1L181F1F1C1G1E1F1H1C";
                return [2 /*return*/, { nickName: "debug_nickName", avatarUrl: "resource/assets/logo.png", city: "sz", country: "CHZ", gender: 1, language: "chinese", province: "js" }];
            });
        });
    };
    DebugPlatform.prototype.showShareMenu = function () {
    };
    DebugPlatform.prototype.share = function (title, imageUrl, query) {
        console.log("debug_share", title, imageUrl, query);
    };
    DebugPlatform.prototype.onShareAppMessage = function (title, imageUrl, query) {
        console.log("debug_onShareAppMessage", title, imageUrl, query);
    };
    DebugPlatform.prototype.updateShareMenu = function (bool) {
        console.log("debug_updateShareMenu", bool);
    };
    DebugPlatform.prototype.getShareInfo = function (ticket) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { encryptedData: "debug_encryptedData", iv: "debug_iv" }];
            });
        });
    };
    DebugPlatform.prototype.getLaunchOptionsSync = function () {
        return { info: { query: "debug_query" }, shareTicket: "debug_shareTicket" };
    };
    DebugPlatform.prototype.createGameClubButton = function (textstr) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("debug_createGameClubButton", textstr);
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.vibrate = function (short) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("debug_vibrate", short);
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.bannershow = function (bannerId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("debug_bannershow");
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.bannerdestroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("debug_bannerdestroy");
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.bannerhide = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("debug_bannerhide");
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.setStorageSync = function (key, value, isobj) {
        if (typeof (value) != "string") {
            value = JSON.stringify(value);
        }
        console.log("setStorageSync:", key, value);
        egret.localStorage.setItem(key, value);
    };
    DebugPlatform.prototype.getStorageSync = function (key, isobj) {
        var value = egret.localStorage.getItem(key);
        value = JSON.parse(value);
        console.log("getStorageSync:", key, value);
        return value;
    };
    DebugPlatform.prototype.skipToProgram = function (appid, extraData) {
        console.log("debug_postMessage", appid, extraData);
    };
    DebugPlatform.prototype.rewardAdCreate = function (adunitId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, 1];
            });
        });
    };
    DebugPlatform.prototype.rerwardAdShow = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, 2];
            });
        });
    };
    DebugPlatform.prototype.postMessage = function (data) {
        console.log("debug_postMessage", data);
    };
    DebugPlatform.prototype.setUserCloudStorage = function (KVDataList) {
        console.log("debug_setUserCloudStorage", KVDataList);
    };
    DebugPlatform.prototype.openCustomerServiceConversation = function () {
        console.log("debug_openCustomerServiceConversation");
    };
    DebugPlatform.prototype.toast = function (str) {
        console.log("debug_toast:", str);
    };
    DebugPlatform.prototype.showModal = function (content, title, surestr) {
        console.log("debug_showModal:", title, content, surestr);
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
var MissionUI = (function (_super) {
    __extends(MissionUI, _super);
    function MissionUI() {
        return _super.call(this, "MissionSkin") || this;
    }
    /**初始化数据 */
    MissionUI.prototype.initData = function () {
        this.list.itemRenderer = MissionItemUI;
        this.arr_data = new eui.ArrayCollection();
    };
    /**初始化界面 */
    MissionUI.prototype.initView = function () {
        this.data = GameTrainLogic.getInstance().getMissionData();
        this.crttype = 1;
        this.initList(3);
        var y = this.gp_1.y;
        egret.Tween.get(this.gp_1, { loop: true }).to({ y: y - 30 }, 500).to(100).to({ y: y }, 500).wait(300);
    };
    MissionUI.prototype.initList = function (id) {
        if (id === void 0) { id = null; }
        var arr = this.data[this.crttype];
        if (arr == null || arr.length == 0) {
            return;
        }
        this.arr_data.removeAll();
        for (var i = 0; i < arr.length; i++) {
            this.arr_data.addItem(arr[i]);
        }
        this.list.dataProvider = this.arr_data;
        this.initBtn();
        if (id != null) {
            this.list.validateNow();
            this.list.selectedIndex = id;
        }
    };
    /**初始化事件 */
    MissionUI.prototype.initEvent = function () {
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemClick, this);
        for (var i = 1; i <= 3; i++) {
            this['btn' + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        }
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
    };
    MissionUI.prototype.clickBack = function () {
        fw.UIManager.getInstance().openUI(UIConst.START);
    };
    MissionUI.prototype.btnClick = function (e) {
        var i = parseInt(e.currentTarget.name);
        if (this.crttype == i) {
            return;
        }
        this.crttype = i;
        this.initList();
        this.gp_1.visible = i == 1;
    };
    MissionUI.prototype.initBtn = function () {
        for (var i = 1; i <= 3; i++) {
            var btn = this['btn' + i];
            if (btn != null) {
                btn.filters = this.crttype != i ? FilterUtil.getGrayFilter() : null;
            }
        }
    };
    MissionUI.prototype.itemClick = function (e) {
        var i = e.itemIndex;
        var arr = this.data[this.crttype];
        if (arr == null || arr.length == 0) {
            return;
        }
        var vo = arr[i];
        if (vo == null) {
            return;
        }
        fw.UIManager.getInstance().openUI(UIConst.GAME, vo);
    };
    MissionUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemClick, this);
        for (var i = 1; i <= 3; i++) {
            this['btn' + i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        }
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        egret.Tween.removeTweens(this.gp_1);
        this.list.dataProvider = null;
        this.arr_data = null;
        this.list = null;
        this.data = null;
    };
    return MissionUI;
}(fw.BaseUI));
__reflect(MissionUI.prototype, "MissionUI");
window['MissionUI'] = MissionUI;
var NoticeUI = (function (_super) {
    __extends(NoticeUI, _super);
    function NoticeUI() {
        return _super.call(this, "NoticeSkin") || this;
    }
    /**初始化数据 */
    NoticeUI.prototype.initData = function () {
    };
    /**初始化界面 */
    NoticeUI.prototype.initView = function () {
        this.lbl_content.text = PlayerConst.noticeInfo.content;
        this.lbl_version.text = "版本号：" + PlayerConst.noticeInfo.version_server;
    };
    /**初始化事件 */
    NoticeUI.prototype.initEvent = function () {
        this.img_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickClose, this);
    };
    NoticeUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.img_bg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickClose, this);
    };
    return NoticeUI;
}(fw.BaseUI));
__reflect(NoticeUI.prototype, "NoticeUI");
window['NoticeUI'] = NoticeUI;
var StartUI = (function (_super) {
    __extends(StartUI, _super);
    function StartUI() {
        return _super.call(this, "StartSkin") || this;
    }
    /**初始化数据 */
    StartUI.prototype.initData = function () {
    };
    /**初始化界面 */
    StartUI.prototype.initView = function () {
        this.updateHp();
        this.updateCheckIn();
    };
    /**初始化事件 */
    StartUI.prototype.initEvent = function () {
        for (var i = 0; i < 9; i++) {
            this['btn_' + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        }
        this.btn_mission.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_grow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_sign.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_turn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_invite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_achieve.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_rank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        HttpCommand.getInstance().addEventListener(HttpEvent.checkIn, this.updateCheckIn, this);
        PropLogic.getInstance().addEventListener(GameEvent.PROP_NUM_CHANGE, this.propChange, this);
    };
    StartUI.prototype.updateHp = function () {
        var vo = PropLogic.getInstance().getPropByID(COINTYPE.HP);
        this.lbl_hp.text = "体力：" + (vo == null ? "0" : vo.num);
    };
    StartUI.prototype.updateCoin = function () {
        var vo = PropLogic.getInstance().getPropByID(COINTYPE.MONEY);
        this.lbl_coin.text = "金币：" + (vo == null ? "0" : vo.num);
    };
    StartUI.prototype.updateDiamond = function () {
        var vo = PropLogic.getInstance().getPropByID(COINTYPE.DIAMOND);
        this.lbl_diamond.text = "钻石：" + (vo == null ? "0" : vo.num);
    };
    StartUI.prototype.propChange = function (e) {
        switch (e.data.id) {
            case COINTYPE.HP:
                this.updateHp();
                break;
            case COINTYPE.MONEY:
                this.updateCoin();
                break;
            case COINTYPE.DIAMOND:
                this.updateDiamond();
                break;
        }
    };
    StartUI.prototype.updateCheckIn = function () {
        this.btn_sign.label = PlayerConst.checkInfo.signed_today ? "已签到" : "每日签到";
    };
    StartUI.prototype.clickBtn = function (e) {
        switch (e.currentTarget) {
            case this.btn_mission:
                fw.UIManager.getInstance().openUI(UIConst.MISSION);
                break;
            case this.btn_grow:
                fw.UIManager.getInstance().openUI(UIConst.GROW);
                break;
            case this.btn_sign:
                GameLogic.getInstance().signIn();
                break;
            case this.btn_turn:
                fw.UIManager.getInstance().openUI(UIConst.TURN, null, fw.UITYPE.SECOND);
                break;
            case this.btn_invite:
                fw.UIManager.getInstance().openUI(UIConst.INVITE, null, fw.UITYPE.SECOND);
                break;
            case this.btn_achieve:
                fw.UIManager.getInstance().openUI(UIConst.ACHIEVE, null, fw.UITYPE.SECOND);
                break;
            case this.btn_rank:
                fw.UIManager.getInstance().openUI(UIConst.RANK, { shareticket: null, openworld: true }, fw.UITYPE.SECOND);
                break;
            case this.btn_share:
                WxApi.getInstance().share(fw.SHARETYPE.ACTIVE);
                break;
        }
    };
    StartUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        for (var i = 0; i < 8; i++) {
            this['btn_' + i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        }
        this.btn_mission.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_grow.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_sign.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_turn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_invite.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_achieve.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_rank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_share.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        HttpCommand.getInstance().removeEventListener(HttpEvent.checkIn, this.updateCheckIn, this);
        PropLogic.getInstance().removeEventListener(GameEvent.PROP_NUM_CHANGE, this.propChange, this);
    };
    return StartUI;
}(fw.BaseUI));
__reflect(StartUI.prototype, "StartUI");
window['StartUI'] = StartUI;
var TurnItemUI = (function (_super) {
    __extends(TurnItemUI, _super);
    function TurnItemUI(i, vo) {
        var _this = _super.call(this) || this;
        _this.skinName = "TurnItemSkin";
        _this.vo = vo;
        _this.index = i;
        return _this;
    }
    TurnItemUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.lbl.text = this.vo.name;
    };
    TurnItemUI.prototype.selected = function (b) {
        this.rect.fillColor = b ? 0xDD930D : 0x07F4EF;
    };
    TurnItemUI.prototype.clear = function () {
        this.vo = null;
    };
    return TurnItemUI;
}(eui.Component));
__reflect(TurnItemUI.prototype, "TurnItemUI");
var TurnUI = (function (_super) {
    __extends(TurnUI, _super);
    function TurnUI() {
        var _this = _super.call(this, "TurnSkin") || this;
        _this.crtIndex = 0;
        return _this;
    }
    /**初始化数据 */
    TurnUI.prototype.initData = function () {
        this.turnItems = [];
        this.weights = [];
        HttpCommand.getInstance().getTurntable();
    };
    /**初始化界面 */
    TurnUI.prototype.initView = function () {
        this.rewardCD();
    };
    TurnUI.prototype.updateVideoCD = function () {
        var cd = WxApi.getInstance().getRewardCD();
        this.btn_1.touchEnabled = cd <= 0;
        this.btn_1.filters = cd <= 0 ? null : FilterUtil.getGrayFilter();
        this.can1 = cd <= 0;
        if (cd > 0) {
            this.lbl_cd1.text = GameUtil.ParseTime2Format(cd);
        }
        else {
            this.lbl_cd1.text = "";
        }
    };
    TurnUI.prototype.updateFreeCD = function () {
        var cd2 = TurnLogic.getInstance().getFreeShareCD();
        this.btn_2.touchEnabled = cd2 <= 0;
        this.btn_2.filters = cd2 <= 0 ? null : FilterUtil.getGrayFilter();
        this.can2 = cd2 <= 0;
        if (cd2 > 0) {
            this.lbl_cd2.text = GameUtil.ParseTime2Format(cd2);
        }
        else {
            this.lbl_cd2.text = "";
        }
    };
    /**初始化事件 */
    TurnUI.prototype.initEvent = function () {
        this.btn_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        WxApi.getInstance().addEventListener(GameEvent.REWARDAD_CLOSE_EVENT, this.watchReward, this);
        HttpCommand.getInstance().addEventListener(HttpEvent.getTurntable, this.turnResponse, this);
        TimerManager.getInstance().addTimerCallBack(this.rewardCD, this);
    };
    TurnUI.prototype.rewardCD = function () {
        this.updateVideoCD();
        this.updateFreeCD();
    };
    TurnUI.prototype.watchReward = function (e) {
        if (e.data.type == WATCHTYPE.TURNPLAY && e.data.data == 0) {
            this.play();
            this.updateVideoCD();
        }
    };
    TurnUI.prototype.clickBtn = function (e) {
        if (this.turns == null) {
            return;
        }
        switch (e.currentTarget) {
            case this.btn_1:
                this.turnPlay();
                break;
            case this.btn_2:
                this.freePlay();
                break;
        }
    };
    TurnUI.prototype.turnPlay = function () {
        if (this.isplaying) {
            return;
        }
        WxApi.getInstance().showRewardAd(WATCHTYPE.TURNPLAY);
    };
    TurnUI.prototype.freePlay = function () {
        if (this.isplaying) {
            return;
        }
        if (this.can2 && TurnLogic.getInstance().freetimes > 0) {
            this.play();
            TurnLogic.getInstance().setFreeTurn();
            this.updateFreeCD();
        }
    };
    /** 转盘开始转 */
    TurnUI.prototype.play = function () {
        var _this = this;
        this.isplaying = true;
        this.count = this.crtIndex;
        var round = 4;
        var min = this.turnItems.length * round;
        var i = GameUtil.getRandomByWeight(this.weights);
        var tar = min + i;
        egret.Tween.get(this, { onChange: this.update, onChangeObj: this }).to({ count: tar }, 5000, egret.Ease.quadInOut).call(function () {
            _this.isplaying = false;
            _this.getReward();
        }, this);
    };
    TurnUI.prototype.update = function () {
        var index = Math.ceil(this.count) % this.turnItems.length;
        if (this.crtIndex == index) {
            return;
        }
        this.crtIndex = index;
        if (this.crtItem != null) {
            this.crtItem.selected(false);
        }
        this.crtItem = this.turnItems[index];
        this.crtItem.selected(true);
    };
    TurnUI.prototype.getReward = function () {
        if (this.crtItem != null) {
            WxApi.getInstance().toast("获得奖励：" + this.crtItem.vo.name);
        }
    };
    TurnUI.prototype.turnResponse = function () {
        this.turns = TurnLogic.getInstance().getTurnVOs();
        this.updateTurns();
    };
    /** 初始化所有奖励 */
    TurnUI.prototype.updateTurns = function () {
        var l = this.turns.length / 4;
        var itemborder = 124;
        for (var i = 0; i < this.turns.length; i++) {
            var vo = this.turns[i];
            var item = new TurnItemUI(i, vo);
            var n = Math.floor(i / l);
            if (n == 0) {
                item.x = itemborder * i;
                item.y = 0;
            }
            else if (n == 1) {
                item.x = itemborder * l;
                item.y = itemborder * (i - l);
            }
            else if (n == 2) {
                item.x = itemborder * (l * 3 - i);
                item.y = itemborder * l;
            }
            else {
                item.x = 0;
                item.y = itemborder * (l * 4 - i);
            }
            this.gp_items.addChild(item);
            this.turnItems.push(item);
            this.weights.push(vo.weight);
        }
    };
    TurnUI.prototype.clickClose = function () {
        if (this.isplaying) {
            return;
        }
        _super.prototype.clickClose.call(this);
    };
    TurnUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.btn_1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this.btn_2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        WxApi.getInstance().removeEventListener(GameEvent.REWARDAD_CLOSE_EVENT, this.watchReward, this);
        HttpCommand.getInstance().removeEventListener(HttpEvent.getTurntable, this.turnResponse, this);
        TimerManager.getInstance().removeFun(this.rewardCD, this);
        this.isplaying = false;
    };
    return TurnUI;
}(fw.BaseUI));
__reflect(TurnUI.prototype, "TurnUI");
window['TurnUI'] = TurnUI;
/**
 *
 * @author
 *
 */
var AVGLogic = (function () {
    function AVGLogic() {
    }
    AVGLogic.getInstance = function () {
        if (this.instance == null) {
            this.instance = new AVGLogic();
        }
        return this.instance;
    };
    /**开始剧情*/
    AVGLogic.prototype.startAVG = function (id, type) {
        // UIManager.getInstance().storyCon.addChild(new AvgMainUI(id,type));
    };
    AVGLogic.prototype.getAVGVOByID = function (id) {
        return this.avg_data_arr[id - 1];
    };
    /**初始化json数据*/
    AVGLogic.prototype.iniData = function () {
        this.avg_data_arr = [];
        var arr = RES.getRes("avg_list_json");
        for (var i = 0; i < arr.length; i++) {
            var vo = new AvgVO();
            var o = arr[i];
            vo.id = o['id'];
            vo.name = o['name'];
            vo.bg = o['bg'];
            vo.dialogs = this.getDialog(o['dialog']);
            this.avg_data_arr.push(vo);
        }
    };
    AVGLogic.prototype.getDialog = function (a) {
        var arr = [];
        for (var i = 0; i < a.length; i++) {
            var v = new AvgDialogVO();
            var o = a[i];
            v.head = o['head'];
            v.words = o['words'];
            v.bg = o['bg'];
            v.name = o['name'];
            v.is_left = o['pos'] == 0;
            arr.push(v);
        }
        return arr;
    };
    AVGLogic.BEGIN_AVG = 0;
    AVGLogic.OVER_AVG = 1;
    return AVGLogic;
}());
__reflect(AVGLogic.prototype, "AVGLogic");
/**
 *
 * @author
 *
 */
var AvgMainUI = (function (_super) {
    __extends(AvgMainUI, _super);
    function AvgMainUI(id, type) {
        var _this = _super.call(this) || this;
        _this.avg_type = type;
        _this.vo = AVGLogic.getInstance().getAVGVOByID(id);
        _this.skinName = "AvgMainSkin";
        return _this;
    }
    AvgMainUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.bg_img = new eui.Image(RES.getRes(this.vo.bg));
        this.bg_img.bottom = 0;
        this.bg.addChild(this.bg_img);
        this.finger = new eui.Image(RES.getRes("finger_png"));
        this.finger.smoothing = true;
        this.finger.scaleX = this.finger.scaleY = 0.4;
        this.finger.right = 120;
        this.finger.bottom = 12;
        this.finger.visible = false;
        this.addChild(this.finger);
        this.timer = new egret.Timer(100);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.delay, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.dialogSubOver, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
        this.current_dialog_index = 0;
        this.start();
    };
    AvgMainUI.prototype.start = function () {
        this.finger.visible = false;
        this.current_dialog = this.vo.dialogs[this.current_dialog_index];
        this.words_index = 0;
        this.txt.text = "";
        this.words = this.current_dialog.words.split("");
        if (this.dialog_bg == null) {
            this.dialog_bg = new eui.Image();
        }
        if (this.dialog_bg_src != this.current_dialog.bg) {
            this.dialog_bg.texture = RES.getRes(this.current_dialog.bg);
        }
        if (this.head == null) {
            this.head = new eui.Image();
        }
        this.head.texture = RES.getRes(this.current_dialog.head);
        if (this.current_dialog.is_left) {
            this.head.left = 150;
            this.head.right = null;
        }
        else {
            this.head.left = null;
            this.head.right = 150;
        }
        this.head.bottom = 560;
        this.addChild(this.head);
        this.timer.start();
    };
    AvgMainUI.prototype.delay = function () {
        if (this.words_index >= this.words.length) {
            this.dialogSubOver();
        }
        else {
            this.txt.text += this.words[this.words_index];
            this.words_index++;
        }
    };
    AvgMainUI.prototype.dialogSubOver = function () {
        this.timer.reset();
        this.txt.text = this.current_dialog.words;
        this.finger.visible = true;
    };
    AvgMainUI.prototype.click = function () {
        if (this.timer.running) {
            this.dialogSubOver();
        }
        else {
            this.current_dialog_index++;
            if (this.current_dialog_index >= this.vo.dialogs.length) {
                this.over();
            }
            else {
                this.start();
            }
        }
    };
    /**剧情结束*/
    AvgMainUI.prototype.over = function () {
        if (this.parent != null) {
            this.parent.removeChild(this);
            this.clear();
        }
    };
    AvgMainUI.prototype.clear = function () {
        this.timer.start();
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.delay, this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.dialogSubOver, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
        this.current_dialog = null;
        this.vo = null;
    };
    return AvgMainUI;
}(eui.Component));
__reflect(AvgMainUI.prototype, "AvgMainUI");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
var GamesOverUI = (function (_super) {
    __extends(GamesOverUI, _super);
    function GamesOverUI(v, t) {
        var _this = _super.call(this, "GamesOverSkin") || this;
        _this.vo = v;
        _this.time = t;
        return _this;
    }
    GamesOverUI.prototype.initView = function () {
        var star = 0;
        for (var i = this.vo.times.length - 1; i >= 0; i--) {
            if (this.time <= this.vo.times[i] * 1000) {
                star++;
                this['star' + (this.vo.times.length - i)].source = RES.getRes("star_a_png");
            }
        }
        this.vo.stars = star;
        if (star > 0) {
            this.vo.state = 2;
            GameTrainLogic.getInstance().setNextMission(this.vo.type, this.vo.id, 1);
        }
        console.log("gameover:", this.vo);
        var recond = GameTrainLogic.getInstance().getRecond(this.vo.id);
        if (recond != 0) {
            this.lbl_best.text = "历史最快成绩：" + this.getText(recond);
        }
        if (recond == 0 || this.time < recond) {
            GameTrainLogic.getInstance().setRecond(this.vo.id, this.time);
        }
        if (this.time < recond) {
            this.lbl_fast.visible = true;
        }
        this.lbl.text = GameTrainLogic.getInstance().getStringByStar(this.vo.stars);
        this.lbl_time.text = "本局用时：" + this.getText(this.time);
    };
    GamesOverUI.prototype.getText = function (t) {
        var s = TimeUtil.ParseTime2Format(Math.floor(t / 1000), "m:s");
        var hs = t % 1000;
        var ss = "";
        if (hs < 10) {
            ss = "00" + hs;
        }
        else if (hs < 100) {
            ss = "0" + hs;
        }
        else {
            ss = hs + "";
            ;
        }
        return s + ":" + ss;
    };
    GamesOverUI.prototype.initEvent = function () {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.btn_restart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRestart, this);
        this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickShare, this);
    };
    GamesOverUI.prototype.clickRestart = function () {
        GameTrainLogic.getInstance().startGame(this.vo);
    };
    GamesOverUI.prototype.clickBack = function () {
        GameTrainLogic.getInstance().openStart();
    };
    GamesOverUI.prototype.clickShare = function () {
        var title = "这次舒尔特注意力训练" + this.vo.name + "关卡我只用了" + this.getText(this.time) + "秒，快来挑战我吧";
        WxApi.getInstance().share(fw.SHARETYPE.CRTSCORE, title);
    };
    GamesOverUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.vo = null;
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.btn_restart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRestart, this);
        this.btn_share.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickShare, this);
    };
    return GamesOverUI;
}(fw.BaseUI));
__reflect(GamesOverUI.prototype, "GamesOverUI");
var GameUI1 = (function (_super) {
    __extends(GameUI1, _super);
    function GameUI1(vo) {
        return _super.call(this, "Game1Skin", vo) || this;
    }
    GameUI1.prototype.checkFit = function () {
        _super.prototype.checkFit.call(this);
        this.img_1.height = GameConst.stageHeight;
    };
    /**初始化数据 */
    GameUI1.prototype.initData = function () {
        this.arr_data = new eui.ArrayCollection();
        switch (this.vo.type) {
            case 1:
                this.initType1();
                break;
            case 3:
                this.initType3();
                break;
        }
    };
    GameUI1.prototype.initType1 = function () {
        var len = parseInt(this.vo.content);
        this.arr = [];
        for (var i = 0; i < len; i++) {
            this.arr.push((i + 1) + "");
        }
        var row = Math.sqrt(len);
        var a = this.shuffle(this.arr);
        var size = 60;
        for (var i = 0; i < a.length; i++) {
            this.arr_data.addItem({ id: a[i], row: row, size: size });
        }
    };
    GameUI1.prototype.initType3 = function () {
        var len = parseInt(this.vo.content);
        this.arr = [];
        var str = "";
        for (var i = 0; i < len; i++) {
            var n = Math.floor(Math.random() * 10) + "";
            this.arr.push(n);
            str += n;
        }
        this.lbl_num.visible = true;
        this.lbl_num.alpha = 1;
        this.lbl_num.text = str;
        var size = 60;
        for (var i = 0; i < 10; i++) {
            this.arr_data.addItem({ id: i + "", row: 5, size: size });
        }
        this.list.visible = false;
    };
    /**对数组乱序 */
    GameUI1.prototype.shuffle = function (a) {
        var b = a.slice();
        var c = [];
        while (true) {
            var i = Math.floor(Math.random() * b.length);
            c.push(b[i]);
            b.splice(i, 1);
            if (b.length == 0) {
                break;
            }
        }
        return c;
    };
    /**初始化界面 */
    GameUI1.prototype.initView = function () {
        this.lbl_des.text = this.vo.des;
        this.list.itemRenderer = GameItemUI;
        this.list.dataProvider = this.arr_data;
        this.btn_back.visible = true; // this.vo.type != 1 || this.vo.id > 3;
    };
    GameUI1.prototype.clickStart = function () {
        var _this = this;
        this.gp.visible = false;
        if (this.vo.type == 3) {
            egret.clearTimeout(this.timeId);
            var t = (parseInt(this.vo.content) - 5) * 1000;
            this.timeId = egret.setTimeout(function () {
                egret.Tween.get(_this.lbl_num).to({ alpha: 0 }, 3000).call(function () {
                    _this.lbl_num.visible = false;
                    _this.list.visible = true;
                    _this.start();
                }, _this);
            }, this, t);
        }
        else {
            this.start();
        }
    };
    GameUI1.prototype.start = function () {
        GameTrainLogic.getInstance().crtclick = 0;
        GameTrainLogic.getInstance().crtClickStr = this.arr[GameTrainLogic.getInstance().crtclick];
        this.starttime = egret.getTimer();
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterframe, this);
    };
    GameUI1.prototype.gameover = function () {
        var newtime = egret.getTimer();
        var time = newtime - this.starttime;
        this.addChild(new GameOverUI(this.vo, time));
    };
    /**初始化事件 */
    GameUI1.prototype.initEvent = function () {
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemClick, this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.btn_mission.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickMission, this);
    };
    GameUI1.prototype.clickBack = function () {
        GameTrainLogic.getInstance().openStart();
    };
    GameUI1.prototype.itemClick = function (e) {
        var i = e.itemIndex;
        var id = e.item.id;
        var item = e.itemRenderer;
        if (GameTrainLogic.getInstance().crtClickStr == id) {
            GameTrainLogic.getInstance().crtclick++;
            if (GameTrainLogic.getInstance().crtclick >= this.arr.length) {
                this.gameover();
            }
            else {
                GameTrainLogic.getInstance().crtClickStr = this.arr[GameTrainLogic.getInstance().crtclick];
            }
        }
    };
    GameUI1.prototype.enterframe = function () {
        var newtime = egret.getTimer();
        var time = newtime - this.starttime;
        var s = TimeUtil.ParseTime2Format(Math.floor(time / 1000), "m:s");
        var hs = time % 1000;
        var ss = "";
        if (hs < 10) {
            ss = "00" + hs;
        }
        else if (hs < 100) {
            ss = "0" + hs;
        }
        else {
            ss = hs + "";
            ;
        }
        this.lbl_time.text = s + ":" + ss;
    };
    GameUI1.prototype.clickMission = function () {
        GameTrainLogic.getInstance().openMission();
    };
    GameUI1.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.vo = null;
        GameTrainLogic.getInstance().crtclick = 0;
        egret.clearTimeout(this.timeId);
        egret.Tween.removeTweens(this.lbl_num);
        this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterframe, this);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemClick, this);
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.btn_mission.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickMission, this);
    };
    return GameUI1;
}(GameBaseUI));
__reflect(GameUI1.prototype, "GameUI1");
var GameUI2 = (function (_super) {
    __extends(GameUI2, _super);
    function GameUI2(vo) {
        return _super.call(this, "Game1Skin", vo) || this;
    }
    /**初始化数据 */
    GameUI2.prototype.initData = function () {
    };
    /**初始化界面 */
    GameUI2.prototype.initView = function () {
    };
    /**初始化事件 */
    GameUI2.prototype.initEvent = function () {
    };
    GameUI2.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.vo = null;
    };
    return GameUI2;
}(GameBaseUI));
__reflect(GameUI2.prototype, "GameUI2");
var GameUI3 = (function (_super) {
    __extends(GameUI3, _super);
    function GameUI3(vo) {
        return _super.call(this, "Game1Skin", vo) || this;
    }
    /**初始化数据 */
    GameUI3.prototype.initData = function () {
    };
    /**初始化界面 */
    GameUI3.prototype.initView = function () {
    };
    /**初始化事件 */
    GameUI3.prototype.initEvent = function () {
    };
    GameUI3.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.vo = null;
    };
    return GameUI3;
}(GameBaseUI));
__reflect(GameUI3.prototype, "GameUI3");
var GameUI4 = (function (_super) {
    __extends(GameUI4, _super);
    function GameUI4(vo) {
        return _super.call(this, "Game1Skin", vo) || this;
    }
    /**初始化数据 */
    GameUI4.prototype.initData = function () {
    };
    /**初始化界面 */
    GameUI4.prototype.initView = function () {
    };
    /**初始化事件 */
    GameUI4.prototype.initEvent = function () {
    };
    GameUI4.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.vo = null;
    };
    return GameUI4;
}(GameBaseUI));
__reflect(GameUI4.prototype, "GameUI4");
var AchieveVO = (function () {
    function AchieveVO() {
    }
    Object.defineProperty(AchieveVO.prototype, "grade", {
        get: function () {
            return this._grade;
        },
        /** 达成成绩 暂无用 */
        set: function (v) {
            this._grade = v;
        },
        enumerable: true,
        configurable: true
    });
    return AchieveVO;
}());
__reflect(AchieveVO.prototype, "AchieveVO");
/**
 *
 * @author
 *
 */
var AvgDialogVO = (function () {
    function AvgDialogVO() {
    }
    return AvgDialogVO;
}());
__reflect(AvgDialogVO.prototype, "AvgDialogVO");
/**
 *
 * @author
 *
 */
var AvgVO = (function () {
    function AvgVO() {
    }
    return AvgVO;
}());
__reflect(AvgVO.prototype, "AvgVO");
var CharpterMissionVO = (function () {
    function CharpterMissionVO() {
    }
    CharpterMissionVO.prototype.setDialog = function (o) {
    };
    return CharpterMissionVO;
}());
__reflect(CharpterMissionVO.prototype, "CharpterMissionVO");
var CharpterVO = (function () {
    function CharpterVO() {
    }
    return CharpterVO;
}());
__reflect(CharpterVO.prototype, "CharpterVO");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
var InviteVO = (function () {
    function InviteVO() {
    }
    return InviteVO;
}());
__reflect(InviteVO.prototype, "InviteVO");
var MissionVO = (function () {
    function MissionVO() {
    }
    Object.defineProperty(MissionVO.prototype, "grade", {
        get: function () {
            return this._grade;
        },
        /** 达成成绩 */
        set: function (v) {
            this._grade = v;
            this.star = this.getStarByGrade(v);
        },
        enumerable: true,
        configurable: true
    });
    /** 根据成绩得出过关星级，项目自行编写 */
    MissionVO.prototype.getStarByGrade = function (v) {
        if (this.times == null) {
            return 0;
        }
        return 0;
    };
    /** 剧情对话 */
    MissionVO.prototype.setDialog = function (id) {
    };
    return MissionVO;
}());
__reflect(MissionVO.prototype, "MissionVO");
var MyDataVO = (function () {
    function MyDataVO() {
    }
    return MyDataVO;
}());
__reflect(MyDataVO.prototype, "MyDataVO");
var PropVO = (function () {
    function PropVO() {
        /** 备用参数 1*/
        this.extradata1 = "";
        /** 备用参数 2*/
        this.extradata2 = "";
    }
    Object.defineProperty(PropVO.prototype, "id", {
        get: function () {
            return this._id;
        },
        /** id */
        set: function (v) {
            this._id = v;
            this.type = v < 10 ? PROPTYPE.COIN : PROPTYPE.PROP;
        },
        enumerable: true,
        configurable: true
    });
    return PropVO;
}());
__reflect(PropVO.prototype, "PropVO");
var SkinVO = (function () {
    function SkinVO() {
    }
    return SkinVO;
}());
__reflect(SkinVO.prototype, "SkinVO");
var TrainMissionVO = (function () {
    function TrainMissionVO() {
    }
    return TrainMissionVO;
}());
__reflect(TrainMissionVO.prototype, "TrainMissionVO");
var TurnVO = (function () {
    function TurnVO() {
    }
    return TurnVO;
}());
__reflect(TurnVO.prototype, "TurnVO");
var TimeUtil = (function () {
    function TimeUtil() {
    }
    /** 判断这个时间是否是今天
     * @param t 时间 秒
     */
    TimeUtil.checkToday = function (t) {
        var today0 = Math.floor(TimeUtil.getTodayZero() / 1000);
        return t >= today0;
    };
    /** 获取今日的0点的时间
     * @return 毫秒
    */
    TimeUtil.getTodayZero = function () {
        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        var secs = h * 3600 + m * 60 + s;
        return d.getTime() - secs * 1000;
    };
    /** 00:00:000格式 */
    TimeUtil.formatSecondT = function (t) {
        var s = TimeUtil.ParseTime2Format(Math.floor(t / 1000), "m:s");
        var hs = t % 1000;
        var ss = "";
        if (hs < 10) {
            ss = "00" + hs;
        }
        else if (hs < 100) {
            ss = "0" + hs;
        }
        else {
            ss = hs + "";
            ;
        }
        return s + ":" + ss;
    };
    /**
     * 返回一年中的第N天
     * @param t 秒
     */
    TimeUtil.GetDayInYear = function (t) {
        var time = new Date(t);
        var month = time.getMonth() + 1;
        var year = time.getFullYear();
        var days = time.getDate();
        var sum = 0;
        var a = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var b = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
            for (var i = 0; i < month - 1; i++) {
                sum += b[i];
            }
            return sum + days;
        }
        else {
            for (var i = 0; i < month - 1; i++) {
                sum += a[i];
            }
            return sum + days;
        }
    };
    /**
     * 返回时间点在当天的秒数
     */
    TimeUtil.getSecondInDay = function (date) {
        return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
    };
    /**
     * 倒计时转换为时间格式（h:m:s） ，可自定义
     * @param t 秒
     * @param f 格式
     */
    TimeUtil.ParseTime2Format = function (t, f) {
        if (f === void 0) { f = "h:m:s"; }
        var d = Math.floor(t / 24 / 3600);
        var h = Math.floor((t / 3600) % 24);
        var m = Math.floor((t % 3600) / 60);
        var s = (t % 3600) % 60;
        function parse_format(t) {
            var s = t.toString();
            if (t < 10) {
                s = "0" + t;
            }
            return s;
        }
        if (f.indexOf("d") != -1) {
            f = f.replace(/d/g, parse_format(d));
        }
        else {
            h += d * 24;
        }
        if (f.indexOf("h") != -1) {
            f = f.replace(/h/g, parse_format(h));
        }
        else {
            m += h * 60;
        }
        if (f.indexOf("m") != -1) {
            f = f.replace(/m/g, parse_format(m));
        }
        else {
            if (f.indexOf("h") != -1) {
                s += m * 60;
            }
            else {
                s = t;
            }
        }
        if (f.indexOf("s") != -1) {
            f = f.replace(/s/g, parse_format(s));
        }
        return f;
    };
    /**
     * 转换为日期格式
     * @param t 毫秒
     * @param f 格式 Y/M/D h:m:s
     */
    TimeUtil.ParseTime2Date = function (t, f) {
        if (f === void 0) { f = "Y-M-D h:m:s"; }
        var d = new Date(t);
        var Y = d.getFullYear();
        var M = d.getMonth() + 1;
        var D = d.getDate();
        var h = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        function parse_format(t) {
            var s = t.toString();
            if (t < 10) {
                s = "0" + t;
            }
            return s;
        }
        if (f.indexOf("Y") != -1) {
            f = f.replace(/Y/g, parse_format(Y));
        }
        if (f.indexOf("M") != -1) {
            f = f.replace(/M/g, parse_format(M));
        }
        if (f.indexOf("D") != -1) {
            f = f.replace(/D/g, parse_format(D));
        }
        if (f.indexOf("h") != -1) {
            f = f.replace(/h/g, parse_format(h));
        }
        if (f.indexOf("m") != -1) {
            f = f.replace(/m/g, parse_format(m));
        }
        if (f.indexOf("s") != -1) {
            f = f.replace(/s/g, parse_format(s));
        }
        return f;
    };
    /**
     * 将时间转换为天/小时/分钟/秒
     * @param t 秒
     */
    TimeUtil.ParseTimeChangeToUtil = function (t) {
        var str = "";
        if (t >= 3600 * 24) {
            str = Math.floor(t / (3600 * 24)) + "天";
        }
        else if (t >= 3600) {
            str = Math.floor(t / 3600) + "小时";
        }
        else if (t >= 60) {
            str = Math.floor(t / 60) + "分钟";
        }
        else if (t < 60 && t > 0) {
            str = t + "秒";
        }
        return str;
    };
    /**
     * 获得带单位的时间字符串
     * * @param t 秒
     * @param f 格式 "d" "h" "m" "s"
     */
    TimeUtil.ParseTime2Units = function (t, f) {
        if (f === void 0) { f = "h"; }
        var str = "";
        if (f == "d") {
            str = Math.ceil(t / (3600 * 24)) + "天";
        }
        else if (f == "h") {
            str = Math.ceil(t / 3600) + "小时";
        }
        else if (f == "m") {
            str = Math.ceil(t / 60) + "分钟";
        }
        else if (f == "s") {
            str = t + "秒";
        }
        else {
            var d = Math.floor(t / (3600 * 24));
            var h = Math.floor(t / 3600);
            var m = Math.floor(t / 60);
            var s = t % 60;
            str = d + "天" + h + "时" + m + "分" + s + "秒";
        }
        return str;
    };
    /**
     * 注册倒计时
     * @param fun 回调
     * @param reg 域
     * @param tim 延时
     * @param rep 次数
     */
    TimeUtil.CreateCD = function (fun, reg, tim, rep) {
        if (rep === void 0) { rep = 0; }
        var t = new egret.Timer(tim, rep);
        t.addEventListener(egret.TimerEvent.TIMER, fun, reg);
        return t;
    };
    TimeUtil.RemoveCD = function (tim, fun, reg) {
        if (tim != null) {
            tim.stop();
            tim.removeEventListener(egret.TimerEvent.TIMER, fun, reg);
        }
    };
    return TimeUtil;
}());
__reflect(TimeUtil.prototype, "TimeUtil");

;window.Main = Main;