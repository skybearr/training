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
var BaseUI = (function (_super) {
    __extends(BaseUI, _super);
    function BaseUI(skinname) {
        var _this = _super.call(this) || this;
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
    };
    /**适配处理 */
    BaseUI.prototype.checkFit = function () {
        this.img_bg.height = GameLogic.getInstance().GameStage.stageHeight;
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
    };
    return BaseUI;
}(eui.Component));
__reflect(BaseUI.prototype, "BaseUI");
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
        this.lbl.text = vo.id + "";
        this.lbl.textColor = vo.state == 0 ? 0xFF0000 : 0xffffff;
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
var DebugPlatform = (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
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
/**
 *
 * @author
 *
 */
var HttpCommand = (function () {
    function HttpCommand() {
        /** ---------------------游戏接口   ------------------------------- */
        this.api = "http://httpbin.org/";
    }
    HttpCommand.getInstance = function () {
        if (this.instance == null) {
            this.instance = new HttpCommand();
        }
        return this.instance;
    };
    /**测试 */
    HttpCommand.prototype.testGet = function () {
        var url = this.api + "get";
        var header = { type: "Content-Type", value: "application/json;charset=UTF-8" };
        this.sendRequest(INTERFACEAPI.TESTGET, url, [header]);
    };
    /**测试 */
    HttpCommand.prototype.testPost = function () {
        var url = this.api + "post";
        var header = { type: "Content-Type", value: "application/json;charset=UTF-8" };
        this.sendRequest(INTERFACEAPI.TESTPOST, url, [header], null, egret.HttpMethod.POST);
    };
    HttpCommand.prototype.sendRequest = function (interf, url, headers, data, method) {
        if (data === void 0) { data = null; }
        if (method === void 0) { method = "GET"; }
        console.log("发送消息:", interf, url, headers, data);
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, method); //isget ? egret.HttpMethod.GET : egret.HttpMethod.POST);
        for (var i = 0; i < headers.length; i++) {
            var o = headers[i];
            request.setRequestHeader(o['type'], o['value']);
        }
        request.once(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.once(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        request.once(egret.Event.COMPLETE, function (e) {
            var response = JSON.parse(e.currentTarget.response);
            console.log("收到消息:", interf, response);
            if (response['code'] != 200) {
                console.log("请求" + interf + "失败，错误代码：" + response['code']);
                return;
            }
            switch (interf) {
                case INTERFACEAPI.TESTGET:
                    break;
                case INTERFACEAPI.TESTPOST:
                    break;
            }
        }, this);
        request.send(data);
    };
    HttpCommand.prototype.onGetIOError = function (e) {
        var request = e.currentTarget.response;
        console.log("onGetIOError:", e);
    };
    HttpCommand.prototype.onGetProgress = function (e) {
    };
    return HttpCommand;
}());
__reflect(HttpCommand.prototype, "HttpCommand");
var GameEvent = (function (_super) {
    __extends(GameEvent, _super);
    function GameEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this.data = null;
        return _this;
    }
    GameEvent.REWARDAD_CLOSE_EVENT = "REWARDAD_CLOSE_EVENT";
    return GameEvent;
}(egret.Event));
__reflect(GameEvent.prototype, "GameEvent");
var GameLogic = (function (_super) {
    __extends(GameLogic, _super);
    function GameLogic() {
        return _super.call(this) || this;
    }
    GameLogic.getInstance = function () {
        if (this._instance == null) {
            this._instance = new GameLogic();
        }
        return this._instance;
    };
    GameLogic.prototype.init = function () {
        this.initData();
        this.openStart();
        WxApi.getInstance().userInfo = platform.getUserInfo();
        console.log("userinfo:", WxApi.getInstance().userInfo);
    };
    GameLogic.prototype.initData = function () {
        this.data = [, [], [], []];
        this.config = RES.getRes("config_json");
        var localdata = WxApi.getInstance().getLocalData(GameConst.localkey_missiondata);
        console.log("initdata:", localdata, localdata == "");
        if (localdata == null || localdata == "") {
            localdata = [, [], [], []];
        }
        if (this.config != null) {
            for (var i in this.config) {
                var o = this.config[i];
                if (i.length < 8) {
                    continue;
                }
                var vo = new MissionVO();
                vo.id = o['id'];
                vo.type = o['type'];
                vo.des = o['des'];
                vo.content = o['content'];
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
                if (localdata != null) {
                    var brr = localdata[vo.type];
                    if (brr != null) {
                        var o_1 = brr[vo.id];
                        if (o_1 != null) {
                            var t = parseInt(o_1);
                            for (var k = vo.times.length - 1; k >= 0; k--) {
                                if (t <= vo.times[k] * 1000) {
                                    vo.stars++;
                                }
                            }
                            if (vo.state == 0) {
                                vo.state = vo.stars > 0 ? 1 : 0;
                            }
                        }
                    }
                }
                this.data[vo.type].push(vo);
            }
        }
        WxApi.getInstance().setLocalData(GameConst.localkey_missiondata, localdata);
    };
    GameLogic.prototype.saveLocal = function (type, id, time) {
        var localdata = WxApi.getInstance().getLocalData(GameConst.localkey_missiondata);
        console.log("savelocal:", localdata);
        if (localdata == null) {
            localdata = [, [], [], []];
        }
        if (localdata[type] == null) {
            localdata[type] = [];
        }
        localdata[type][id] = time;
        WxApi.getInstance().setLocalData(GameConst.localkey_missiondata, localdata);
    };
    GameLogic.prototype.getRecond = function (type, id) {
        var key = type + "_" + id;
        var value = WxApi.getInstance().getLocalData(key);
        if (value == null || value == "") {
            value = 0;
        }
        return value;
    };
    GameLogic.prototype.openStart = function () {
        this.main.removeChildren();
        this.main.addChild(new StartUI());
    };
    GameLogic.prototype.startGame = function (vo) {
        this.main.removeChildren();
        this.main.addChild(new GameUI(vo));
    };
    GameLogic.prototype.openMission = function () {
        this.main.removeChildren();
        this.main.addChild(new MissionUI());
    };
    GameLogic.prototype.getMissionData = function () {
        return this.data;
    };
    GameLogic.prototype.getStartMission = function () {
        return this.data[1][2];
    };
    GameLogic.prototype.getStringByStar = function (n) {
        return this.config["str" + n];
    };
    return GameLogic;
}(egret.EventDispatcher));
__reflect(GameLogic.prototype, "GameLogic");
var DataBase = (function () {
    function DataBase() {
    }
    return DataBase;
}());
__reflect(DataBase.prototype, "DataBase");
var GameConst = (function () {
    function GameConst() {
    }
    /**web测试 0微信  1web本地 */
    GameConst.web = 1;
    GameConst.version = "201808181130";
    GameConst.localkey_missiondata = "localkey_missiondata";
    return GameConst;
}());
__reflect(GameConst.prototype, "GameConst");
var INTERFACEAPI;
(function (INTERFACEAPI) {
    INTERFACEAPI[INTERFACEAPI["TESTGET"] = 0] = "TESTGET";
    INTERFACEAPI[INTERFACEAPI["TESTPOST"] = 1] = "TESTPOST";
})(INTERFACEAPI || (INTERFACEAPI = {}));
var PlayerConst = (function () {
    function PlayerConst() {
    }
    return PlayerConst;
}());
__reflect(PlayerConst.prototype, "PlayerConst");
var Int64 = (function () {
    function Int64(lowerUint, higherUint) {
        if (lowerUint === void 0) { lowerUint = 0; }
        if (higherUint === void 0) { higherUint = 0; }
        this._highValue = 0;
        this._lowValue = 0;
        /**
         * 缓存的字符串
         */
        this.cacheString = new Array();
        this._lowValue = lowerUint;
        this._highValue = higherUint;
    }
    Object.defineProperty(Int64.prototype, "higherUint", {
        /**
         * 高32位整型数字
         */
        get: function () {
            return this._highValue;
        },
        set: function (value) {
            if (this._highValue == value)
                return;
            this._highValue = value;
            this.cacheBytes = null;
            this.cacheString = [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Int64.prototype, "lowerUint", {
        /**
         * 低32位整型数字
         */
        get: function () {
            return this._lowValue;
        },
        set: function (value) {
            this._lowValue = value;
            if (this._lowValue == value)
                return;
            this.cacheBytes = null;
            this.cacheString = [];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 从字符串生成数字
     * @param value 要转换为数字的字符串。
     * @param radix 要用于字符串到数字的转换的基数（从 2 到 36）。如果未指定 radix 参数，则默认值为 10。
     */
    Int64.prototype.fromString = function (value, radix) {
        if (radix === void 0) { radix = 10; }
        if (!value) {
            this.reset();
            return;
        }
        value = value.toLowerCase();
        var div = 4294967296;
        var low = 0;
        var high = 0;
        for (var i = 0; i < value.length; i++) {
            var num = value.charCodeAt(i) - 48;
            if (num > 9)
                num -= 39;
            low = low * radix + num;
            high = high * radix + (low / div >> 0);
            low = low % div;
        }
        this._lowValue = low;
        this._highValue = high;
        this.cacheString = [];
        this.cacheString[radix] = value;
        this.cacheBytes = null;
    };
    /**
     * 从字节流数组中读取uint64数字
     * @param bytes 包含64位无符号整型的字节流
     * @param postion 要从字节流中开始读取的偏移量
     */
    Int64.prototype.fromBytes = function (bytes, postion) {
        if (postion === void 0) { postion = 0; }
        try {
            bytes.position = postion;
            if (bytes.endian == egret.Endian.LITTLE_ENDIAN) {
                this._lowValue = bytes.readUnsignedInt();
                this._highValue = bytes.readUnsignedInt();
            }
            else {
                this._highValue = bytes.readUnsignedInt();
                this._lowValue = bytes.readUnsignedInt();
            }
        }
        catch (e) {
            this.reset();
            return;
        }
        this.cacheBytes = null;
        this.cacheString = [];
    };
    /**
     * 重置为0
     */
    Int64.prototype.reset = function () {
        this._highValue = 0;
        this._lowValue = 0;
        this.cacheBytes = null;
        this.cacheString = [];
    };
    /**
     * 克隆一个数字
     */
    Int64.prototype.clone = function () {
        return new Int64(this._lowValue, this._highValue);
    };
    Int64.prototype.copy = function (value) {
        this.reset();
        this._lowValue = value._lowValue;
        this._highValue = value._highValue;
    };
    Int64.prototype.cloneTo = function (value) {
        if (value == null) {
            value = new Int64();
        }
        value.copy(this);
        return value;
    };
    Int64.prototype.equals = function (value) {
        if (value == null)
            return false;
        return this._highValue == value._highValue && this._lowValue == value._lowValue;
    };
    Object.defineProperty(Int64.prototype, "bytes", {
        /**
         * 返回数字的字节流数组形式,存储方式为Endian.LITTLE_ENDIAN。
         */
        get: function () {
            if (this.cacheBytes)
                return this.cacheBytes;
            this.cacheBytes = new egret.ByteArray();
            this.cacheBytes.endian = egret.Endian.LITTLE_ENDIAN;
            this.cacheBytes.writeUnsignedInt(this._lowValue);
            this.cacheBytes.writeUnsignedInt(this._highValue);
            return this.cacheBytes;
        },
        enumerable: true,
        configurable: true
    });
    Int64.prototype.toNumber = function () {
        var value = this.toString();
        return value == "" ? 0 : parseInt(value);
    };
    /**
     * 返回数字的字符串表示形式。
     * @param radix 指定要用于数字到字符串的转换的基数（从 2 到 36）。如果未指定 radix 参数，则默认值为 10。
     */
    Int64.prototype.toString = function (radix) {
        if (radix === void 0) { radix = 10; }
        if (radix < 2 || radix > 36) {
            throw new RangeError("基数参数必须介于 2 到 36 之间；当前值为 " + radix + "。");
        }
        if (this.cacheString[radix])
            return this.cacheString[radix];
        var result = "";
        var lowUint = this._lowValue;
        var highUint = this._highValue;
        var highRemain;
        var lowRemain;
        var tempNum;
        var MaxLowUint = Math.pow(2, 32);
        while (highUint != 0 || lowUint != 0) {
            highRemain = (highUint % radix);
            tempNum = highRemain * MaxLowUint + lowUint;
            lowRemain = tempNum % radix;
            result = lowRemain.toString(radix) + result;
            highUint = (highUint - highRemain) / radix;
            lowUint = (tempNum - lowRemain) / radix;
        }
        this.cacheString[radix] = result == "" ? "0" : result;
        return this.cacheString[radix];
    };
    Int64.prototype.parseData = function (data) {
        this._highValue = data.readUnsignedInt();
        this._lowValue = data.readUnsignedInt();
    };
    Int64.prototype.toData = function (data) {
        data.writeUnsignedInt(this._highValue);
        data.writeUnsignedInt(this._lowValue);
    };
    Int64.prototype.gc = function () {
        this.cacheBytes = null;
        this.cacheString = null;
    };
    return Int64;
}());
__reflect(Int64.prototype, "Int64");
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
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
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
var TimeUtil = (function () {
    function TimeUtil() {
    }
    /**
     * 真正的当前时间
     */
    TimeUtil.getCurrentTime = function () {
        var time = new Date();
        return time.getTime(); // + time.getTimezoneOffset() * 60 * 1000; 这个时间不对，直接getTime是对的，除非这取的不是本地时间@zhang
    };
    /**获取当前的服务器时间 */
    TimeUtil.getCrtServerTime = function () {
        return new Date().getTime() / 1000 + this.offTime;
    };
    /**
     * 获取服务器日期
     */
    TimeUtil.getServerDate = function () {
        return new Date(TimeUtil.getCrtServerTime() * 1000);
    };
    /**
     * 返回一年中的第N天
     * @param t 秒
     */
    TimeUtil.GetDayInYear = function (t) {
        var time = new Date(t);
        var month = time.getUTCMonth() + 1;
        var year = time.getFullYear();
        var days = time.getDate();
        function get_month_days(m) {
            var d = 0;
            if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12)
                d = 31;
            else if (m == 4 || m == 6 || m == 9 || m == 11)
                d = 30;
            else if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0))
                d = 29;
            else
                d = 28;
            return d;
        }
        var all_days = 0;
        for (var i = 1; i <= month; i++) {
            if (i == month) {
                all_days += days;
            }
            else {
                all_days += get_month_days(i);
            }
        }
        return all_days;
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
        var h = Math.floor(t / 3600);
        var m = Math.floor((t % 3600) / 60);
        var s = (t % 3600) % 60;
        function parse_format(t) {
            var s = t.toString();
            if (t < 10) {
                s = "0" + t;
            }
            return s;
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
     * 获得带单位的时间字符串
     * * @param t 秒
     */
    TimeUtil.ParseTime2Units = function (t) {
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
        else if (t > 0) {
            str = t + "秒";
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
    WxApi.prototype.init = function () {
        if (GameConst.web == 1) {
            GameLogic.getInstance().init();
        }
        else {
            this.login();
        }
    };
    /**登录 */
    WxApi.prototype.login = function () {
        var _this = this;
        var wx = window["wx"];
        if (wx == null) {
            return;
        }
        wx.login({
            success: function (res) {
                console.log("wxloginsuccess:", res);
                _this.logincode = res['code'];
                GameLogic.getInstance().init();
            },
            fail: function () {
            },
            complete: function () {
            },
        });
    };
    /**主动转发
     * @param query 转发携带参数 必须是 key1=val1&key2=val2 的格式 用于区分其他用户点开这个分享链接时是否打开排行榜等操作
    */
    WxApi.prototype.share = function (query) {
        if (query === void 0) { query = null; }
        var wx = window["wx"];
        if (wx == null) {
            return;
        }
        this.updateShareMenu(true);
        wx.shareAppMessage({
            title: WxApi.getInstance().shareInfo.share_game_title,
            imageUrl: WxApi.getInstance().shareInfo.share_game_img,
            query: WxApi.getInstance().shareInfo.query
        });
    };
    /**炫耀 */
    WxApi.prototype.showoff = function () {
        var wx = window["wx"];
        if (wx == null) {
            return;
        }
        this.updateShareMenu(true);
        wx.shareAppMessage({
            title: PlayerConst.highestScore + "分，不服来战！",
            imageUrl: WxApi.getInstance().shareInfo.share_group_img,
            query: WxApi.getInstance().shareInfo.query
        });
    };
    WxApi.prototype.drawBMP = function () {
        var con = new egret.DisplayObjectContainer();
        var result = new egret.Bitmap();
        var texture = RES.getRes("over_json.game_over_share");
        result.texture = texture;
        con.addChild(result);
        // let img_head = new eui.Image();
        // img_head.source = WxApi.getInstance().userInfo.avatarUrl;
        // img_head.smoothing = true;
        // img_head.width = img_head.height = 50;
        // img_head.x = (con.width - 50) >> 1;
        // img_head.y = 260;
        // con.addChild(img_head);
        // let circle: egret.Shape = new egret.Shape();
        // circle.graphics.beginFill(0x000000);
        // circle.graphics.drawCircle(0, 0, 25);
        // circle.graphics.endFill();
        // circle.x = (con.width - circle.width) >> 1;
        // circle.y = img_head.y;
        // con.addChild(circle);
        // img_head.mask = circle;
        var lbl_name = new egret.TextField();
        lbl_name.text = WxApi.getInstance().userInfo.nickName;
        lbl_name.width = 200;
        lbl_name.height = 24;
        lbl_name.size = 24;
        lbl_name.textAlign = "center";
        lbl_name.fontFamily = "SimHei";
        lbl_name.x = (con.width - lbl_name.width) >> 1;
        lbl_name.y = 310;
        con.addChild(lbl_name);
        var tf_score = new egret.TextField();
        tf_score.text = PlayerConst.highestScore + "分";
        tf_score.width = 300;
        tf_score.height = 24;
        tf_score.size = 40;
        tf_score.textAlign = "center";
        tf_score.fontFamily = "SimHei";
        tf_score.x = (con.width - tf_score.width) >> 1;
        tf_score.y = 352;
        con.addChild(tf_score);
        var trrrr = new egret.RenderTexture();
        trrrr.drawToTexture(con);
        return new egret.Bitmap(trrrr);
    };
    /**点击别人转发进来的 ，获取shareTicket*/
    WxApi.prototype.checkShareInfo = function () {
        console.log("checkShareInfo");
        var wx = window["wx"];
        if (wx == null) {
            return;
        }
        var info = wx.getLaunchOptionsSync();
        console.log("info:", info);
        //如果是从群里点开的
        if (info != null && info.shareTicket != null && info.shareTicket != "") {
            //查看群排行
            if (info.query != null && info.query.grouprank == "1") {
                wx.getShareInfo({
                    shareTicket: info.shareTicket,
                    success: function (res) {
                        console.log("getShareInfo:success:", res);
                        // GameLogic.getInstance().openGroupdRank(info.shareTicket);
                    },
                    fail: function (res) {
                        console.log("getShareInfo:fail:", res);
                    },
                    complete: function () {
                        console.log("getShareInfo:complete:");
                    }
                });
            }
        }
    };
    /**右上角转发 */
    WxApi.prototype.showShareMenu = function (info) {
        if (info === void 0) { info = null; }
        console.log("showShareMenu:", info);
        if (info == null) {
            info = { title: "让你抓耳挠腮，虐你不留情面，来挑战啊", imageUrl: "resource/assets/share.png", query: "" };
        }
        else {
            this.shareInfo = info;
        }
        var wx = window["wx"];
        if (wx == null) {
            return;
        }
        wx.showShareMenu();
        this.onShare();
        this.initRewardVideoAd();
        this.checkShareInfo();
    };
    /**监听用户点击右上角菜单的“转发”按钮时触发的事件
     * @param query 转发携带参数 必须是 key1=val1&key2=val2 的格式 用于区分其他用户点开这个分享链接时是否打开排行榜等操作
     */
    WxApi.prototype.onShare = function (query) {
        if (query === void 0) { query = "rightup=1"; }
        var wx = window["wx"];
        if (wx == null) {
            return;
        }
        this.updateShareMenu(true);
        console.log("onShareAppMessage:", this.shareInfo);
        wx.onShareAppMessage(function () {
            return {
                title: WxApi.getInstance().shareInfo.share_game_title,
                imageUrl: WxApi.getInstance().shareInfo.share_game_img,
                query: WxApi.getInstance().shareInfo.query
            };
        });
    };
    /**转发参数 */
    WxApi.prototype.updateShareMenu = function (withShareTicket) {
        var wx = window["wx"];
        if (wx == null) {
            return;
        }
        console.log("updateShareMenu:withShareTicket:", withShareTicket);
        wx.updateShareMenu({
            withShareTicket: withShareTicket,
            success: function (res) {
                console.log("updateShareMenu:success:", res);
            },
            fail: function (res) {
                console.log("updateShareMenu:fail:", res);
            },
            complete: function () {
                console.log("updateShareMenu:complete:");
            }
        });
    };
    /**联系客服 */
    WxApi.prototype.feedBack = function () {
        var wx = window["wx"];
        if (wx == null) {
            return;
        }
        wx.openCustomerServiceConversation({
            success: function (res) {
                console.log("success:", res);
            },
            fail: function (res) {
                console.log("fail:", res);
            },
            complete: function (res) {
                console.log("complete:", res);
            }
        });
    };
    /** 对用户托管数据进行写数据操作，允许同时写多组 KV 数据
     * @param	KVDataList	要修改的 KV 数据列表
    */
    WxApi.prototype.setHigherScore = function (v) {
        //0不计入
        if (v <= 0) {
            return;
        }
        var wx = window["wx"];
        if (wx == null) {
            return;
        }
        var n = PlayerConst.highestScore;
        if (v <= n) {
            return;
        }
        PlayerConst.highestScore = v;
        var KVDataList = [];
        wx.setUserCloudStorage({
            KVDataList: [
                { key: "newscore", value: v + "" }
            ],
            success: function (res) {
                console.log("setUserCloudStorage:res:", res);
            },
            fail: function (err) {
                console.log("setUserCloudStorage:error:", err);
            },
            complete: function () {
                console.log("setUserCloudStorage:complete:");
            }
        });
    };
    /**banner广告 */
    WxApi.prototype.showBanner = function () {
        console.log("系统信息：", wx.getSystemInfoSync());
        if (this.bannerAd == null) {
            var phoneWidth = wx.getSystemInfoSync().screenWidth; //手机屏幕宽度
            var phoneHeight = wx.getSystemInfoSync().screenHeight; //手机屏幕高度
            this.bannerAd = wx.createBannerAd({
                adUnitId: 'adunit-465b0f38397b8e3f',
                style: {
                    left: 10,
                    top: phoneHeight - 100,
                    width: phoneWidth - 20,
                }
            });
        }
        if (this.bannerAd != null) {
            this.bannerAd.onLoad(function () {
                console.log('banner 广告加载成功');
            });
            this.bannerAd.show();
        }
    };
    WxApi.prototype.hideBanner = function () {
        if (this.bannerAd != null) {
            this.bannerAd.hide();
        }
    };
    /** 预加载激励视频 */
    WxApi.prototype.initRewardVideoAd = function () {
        var _this = this;
        var wx = window["wx"];
        if (wx == null) {
            return;
        }
        this.rewardAd = wx.createRewardedVideoAd({ adUnitId: "adunit-dbf18bd3a9ac0892" });
        this.rewardAd.onLoad(function () {
            console.log('激励视频 广告加载成功');
        });
        this.rewardAd.onError(function (err) {
            console.log("rewardAderror:", err);
        });
        this.rewardAd.onClose(function (res) {
            // 用户点击了【关闭广告】按钮
            var state;
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            if (res && res.isEnded || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                state = 0;
            }
            else {
                // 播放中途退出，不下发游戏奖励
                state = 1;
            }
            _this.dispatchGameEvent(GameEvent.REWARDAD_CLOSE_EVENT, state);
        });
    };
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
        var event = new GameEvent(eventname);
        event.data = { type: this.adtype, data: data };
        this.dispatchEvent(event);
    };
    /** --------------------------------------- 本地缓存 ------------------------------------------------------- */
    /**检测wx是否启用 */
    WxApi.prototype.checkWx = function () {
        var wx = window['wx'];
        return wx != null;
    };
    /**存取本地数据 */
    WxApi.prototype.setLocalData = function (key, value) {
        if (!this.checkWx()) {
            return null;
        }
        try {
            return wx.setStorageSync(key, value);
        }
        catch (e) {
            return null;
        }
    };
    /**读取本地数据 */
    WxApi.prototype.getLocalData = function (key) {
        if (!this.checkWx()) {
            return null;
        }
        try {
            return wx.getStorageSync(key);
        }
        catch (e) {
            return null;
        }
    };
    /**删除缓存 */
    WxApi.prototype.clearLocalData = function (key) {
        if (!this.checkWx()) {
            return null;
        }
        try {
            return wx.clearStorageSync(key);
        }
        catch (e) {
            return null;
        }
    };
    /**跳转到其他小程序 */
    WxApi.prototype.skipToProgram = function () {
        try {
            wx.navigateToMiniProgram({
                appId: "wx5ccf73a5edb50795",
                extraData: "qiuqiu",
                success: function (res) {
                    console.log("navigateToMiniProgram:", res);
                },
                fail: function (err) {
                    console.log("navigateToMiniProgram:error:", err);
                },
                complete: function () {
                    console.log("navigateToMiniProgram:complete:");
                }
            });
        }
        catch (e) {
            wx.showToast({
                title: '该功能暂未开放',
                icon: 'none',
                duration: 2000
            });
        }
    };
    /**给开放域发消息 */
    WxApi.prototype.postToDataContext = function (data) {
        if (wx == null) {
            return;
        }
        wx.getOpenDataContext().postMessage(data);
    };
    return WxApi;
}(egret.EventDispatcher));
__reflect(WxApi.prototype, "WxApi");
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
        this.rect_click.fillColor = GameLogic.getInstance().crtClickStr == this.data.id ? 0x42F907 : 0xFF0000;
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
        console.log("gameover:", this.vo);
        var recond = GameLogic.getInstance().getRecond(this.vo.type, this.vo.id);
        if (recond != 0) {
            this.lbl_best.text = "历史最快成绩：" + this.getText(recond);
        }
        if (recond == 0 || this.time < recond) {
            GameLogic.getInstance().saveLocal(this.vo.type, this.vo.id, this.time);
        }
        if (this.time < recond) {
            this.lbl_fast.visible = true;
        }
        this.lbl.text = GameLogic.getInstance().getStringByStar(this.vo.stars);
        this.lbl_time.text = this.getText(this.time);
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
    };
    GameOverUI.prototype.clickRestart = function () {
        GameLogic.getInstance().startGame(this.vo);
    };
    GameOverUI.prototype.clickBack = function () {
        GameLogic.getInstance().openStart();
    };
    GameOverUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.vo = null;
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.btn_restart.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRestart, this);
    };
    return GameOverUI;
}(BaseUI));
__reflect(GameOverUI.prototype, "GameOverUI");
var GameUI = (function (_super) {
    __extends(GameUI, _super);
    function GameUI(v) {
        var _this = _super.call(this, "GameSkin") || this;
        _this.vo = v;
        return _this;
    }
    GameUI.prototype.checkFit = function () {
        _super.prototype.checkFit.call(this);
        this.img_1.height = GameLogic.getInstance().GameStage.stageHeight;
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
        for (var i = 0; i < a.length; i++) {
            this.arr_data.addItem({ id: a[i], row: row });
        }
    };
    GameUI.prototype.initType2 = function () {
        var index = this.vo.content.indexOf(",");
        var s = index != -1 ? "," : "";
        this.arr = this.vo.content.split(s);
        this.arr = this.shuffle(this.arr);
        for (var i = 0; i < this.arr.length; i++) {
            this.arr_data.addItem({ id: this.arr[i], row: this.vo.id < 3 ? 5 : 4 });
        }
    };
    GameUI.prototype.initType3 = function () {
        var len = parseInt(this.vo.content);
        this.arr = [];
        for (var i = 0; i < len; i++) {
            this.arr.push(Math.floor(Math.random() * 10) + "");
        }
        this.arr = this.shuffle(this.arr);
        for (var i = 0; i < this.arr.length; i++) {
            this.arr_data.addItem({ id: this.arr[i], row: 3 });
        }
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
        this.btn_back.visible = this.vo.type != 1;
    };
    GameUI.prototype.clickStart = function () {
        this.gp.visible = false;
        this.start();
    };
    GameUI.prototype.start = function () {
        GameLogic.getInstance().crtclick = 0;
        GameLogic.getInstance().crtClickStr = this.arr[GameLogic.getInstance().crtclick];
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
    };
    GameUI.prototype.clickBack = function () {
        GameLogic.getInstance().openStart();
    };
    GameUI.prototype.itemClick = function (e) {
        var i = e.itemIndex;
        var id = e.item.id;
        var item = e.itemRenderer;
        if (GameLogic.getInstance().crtClickStr == id) {
            GameLogic.getInstance().crtclick++;
            if (GameLogic.getInstance().crtclick >= this.arr.length) {
                this.gameover();
            }
            else {
                GameLogic.getInstance().crtClickStr = this.arr[GameLogic.getInstance().crtclick];
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
    GameUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.vo = null;
        GameLogic.getInstance().crtclick = 0;
        this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterframe, this);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemClick, this);
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
    };
    return GameUI;
}(BaseUI));
__reflect(GameUI.prototype, "GameUI");
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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        GameLogic.getInstance().GameStage = this.stage;
        GameLogic.getInstance().main = this;
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
                        return [4 /*yield*/, platform.login()];
                    case 2:
                        _a.sent();
                        this.createGameScene();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
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
        WxApi.getInstance().init();
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
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
        this.data = GameLogic.getInstance().getMissionData();
        this.crttype = 1;
        this.initList();
    };
    MissionUI.prototype.initList = function () {
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
        GameLogic.getInstance().openStart();
    };
    MissionUI.prototype.btnClick = function (e) {
        var i = parseInt(e.currentTarget.name);
        if (this.crttype == i) {
            return;
        }
        this.crttype = i;
        this.initList();
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
        if (vo.state == 0) {
            return;
        }
        GameLogic.getInstance().startGame(vo);
    };
    MissionUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemClick, this);
        for (var i = 1; i <= 3; i++) {
            this['btn' + i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        }
        this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBack, this);
        this.list.dataProvider = null;
        this.arr_data = null;
        this.list = null;
        this.data = null;
    };
    return MissionUI;
}(BaseUI));
__reflect(MissionUI.prototype, "MissionUI");
var RankUI = (function (_super) {
    __extends(RankUI, _super);
    function RankUI(ticket) {
        if (ticket === void 0) { ticket = null; }
        var _this = _super.call(this, "RankSkin") || this;
        _this.shareticket = ticket;
        _this.skinName = "RankSkin";
        return _this;
    }
    /**初始化数据 */
    RankUI.prototype.initData = function () {
    };
    RankUI.prototype.initView = function () {
        this.lbl_title.text = this.shareticket != null ? "群排行榜" : "好友排行榜";
        this.initDataContext();
    };
    RankUI.prototype.initEvent = function () {
        this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickClose, this);
        this.img_rankgp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGroupRank, this);
    };
    RankUI.prototype.initDataContext = function () {
        //开放域主体
        var platform = window.platform;
        if (platform.openDataContext == null) {
            return;
        }
        // this.bmp_context = platform.openDataContext.createDisplayObject(null, this.stage.stageWidth, this.stage.stageHeight);
        this.bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
        this.bitmapdata.$deleteSource = false;
        var texture = new egret.Texture();
        texture._setBitmapData(this.bitmapdata);
        this.bmp_context = new egret.Bitmap(texture);
        this.bmp_context.width = GameConst.GameStage.stageWidth;
        this.bmp_context.height = GameConst.GameStage.stageHeight;
        this.bmp_context.x = this.bmp_context.y = 0;
        this.addChildAt(this.bmp_context, 4); //盖在底图上面，各种按钮下面
        egret.stopTick(this.tickerHandler, this);
        egret.startTick(this.tickerHandler, this);
        this.updateRank("score_1_3");
    };
    RankUI.prototype.updateRank = function (rankkey) {
        WxApi.getInstance().postToDataContext({
            shareTicket: this.shareticket,
            userinfo: WxApi.getInstance().userInfo,
            stageW: GameConst.GameStage.stageWidth,
            stageH: GameConst.GameStage.stageHeight,
            rankkey: rankkey,
            command: "open"
        });
    };
    RankUI.prototype.tickerHandler = function (timeStarmp) {
        egret.WebGLUtils.deleteWebGLTexture(this.bitmapdata.webGLTexture);
        this.bitmapdata.webGLTexture = null;
        return false;
    };
    RankUI.prototype.clickGroupRank = function () {
        WxApi.getInstance().share("grouprank=1");
    };
    RankUI.prototype.clickClose = function () {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    };
    RankUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.img_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickClose, this);
        this.img_rankgp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGroupRank, this);
        WxApi.getInstance().postToDataContext({
            command: "close"
        });
        if (this.bmp_context != null && this.bmp_context.parent != null) {
            this.bmp_context.parent.removeChild(this.bmp_context);
        }
        egret.stopTick(this.tickerHandler, this);
        this.bmp_context = null;
        this.bitmapdata = null;
    };
    return RankUI;
}(BaseUI));
__reflect(RankUI.prototype, "RankUI");
window["RankUI"] = RankUI;
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
    };
    /**初始化事件 */
    StartUI.prototype.initEvent = function () {
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
        this.btn_rank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRank, this);
        this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickShare, this);
        this.btn_mission.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickMission, this);
    };
    StartUI.prototype.clickStart = function () {
        GameLogic.getInstance().startGame(GameLogic.getInstance().getStartMission());
    };
    StartUI.prototype.clickRank = function () {
        this.addChild(new RankUI());
    };
    StartUI.prototype.clickShare = function () {
        WxApi.getInstance().share();
    };
    StartUI.prototype.clickMission = function () {
        GameLogic.getInstance().openMission();
    };
    StartUI.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStart, this);
        this.btn_rank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickRank, this);
        this.btn_share.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickShare, this);
        this.btn_mission.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickMission, this);
    };
    return StartUI;
}(BaseUI));
__reflect(StartUI.prototype, "StartUI");
var MissionVO = (function () {
    function MissionVO() {
    }
    return MissionVO;
}());
__reflect(MissionVO.prototype, "MissionVO");
;window.Main = Main;