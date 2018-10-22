var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
        // GlobalConst.GameStage.addEventListener(egret.Event.ENTER_FRAME,this.enterFrame,this);
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
//# sourceMappingURL=TimerManager.js.map