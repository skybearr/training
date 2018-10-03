var __reflect=this&&this.__reflect||function(t,e,n){t.__class__=e,n?n.push(e):n=[e],t.__types__=t.__types__?n.concat(t.__types__):n},__extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);n.prototype=e.prototype,t.prototype=new n},__awaiter=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))(function(r,o){function a(t){try{c(i.next(t))}catch(e){o(e)}}function s(t){try{c(i["throw"](t))}catch(e){o(e)}}function c(t){t.done?r(t.value):new n(function(e){e(t.value)}).then(a,s)}c((i=i.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){function n(t){return function(e){return i([t,e])}}function i(n){if(r)throw new TypeError("Generator is already executing.");for(;c;)try{if(r=1,o&&(a=o[2&n[0]?"return":n[0]?"throw":"next"])&&!(a=a.call(o,n[1])).done)return a;switch(o=0,a&&(n=[0,a.value]),n[0]){case 0:case 1:a=n;break;case 4:return c.label++,{value:n[1],done:!1};case 5:c.label++,o=n[1],n=[0];continue;case 7:n=c.ops.pop(),c.trys.pop();continue;default:if(a=c.trys,!(a=a.length>0&&a[a.length-1])&&(6===n[0]||2===n[0])){c=0;continue}if(3===n[0]&&(!a||n[1]>a[0]&&n[1]<a[3])){c.label=n[1];break}if(6===n[0]&&c.label<a[1]){c.label=a[1],a=n;break}if(a&&c.label<a[2]){c.label=a[2],c.ops.push(n);break}a[2]&&c.ops.pop(),c.trys.pop();continue}n=e.call(t,c)}catch(i){n=[6,i],o=0}finally{r=a=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var r,o,a,s,c={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:n(0),"throw":n(1),"return":n(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},BaseUI=function(t){function e(e){var n=t.call(this)||this;return n.skinName=e,n}return __extends(e,t),e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this),this.checkFit(),this.initData(),this.initView(),this.initEvent(),this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.clear,this)},e.prototype.checkFit=function(){this.img_bg.height=GameLogic.getInstance().GameStage.stageHeight},e.prototype.initData=function(){},e.prototype.initView=function(){},e.prototype.initEvent=function(){},e.prototype.clear=function(){this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.clear,this)},e}(eui.Component);__reflect(BaseUI.prototype,"BaseUI");var MissionItemUI=function(t){function e(){var e=t.call(this)||this;return e.skinName="MissionItemSkin",e}return __extends(e,t),e.prototype.setVO=function(t){this.initView(t)},e.prototype.dataChanged=function(){if(null!=this.data){var t=this.data;this.initView(t)}},e.prototype.initView=function(t){if(this.lbl.text=t.name,this.lbl.textColor=16777215,2==t.state)for(var e=1;3>=e;e++)this["star"+e].source=RES.getRes(e<=t.stars?"star_a_png":"star_b_png")},e}(eui.ItemRenderer);__reflect(MissionItemUI.prototype,"MissionItemUI"),window.MissionItemUI=MissionItemUI;var StringUtil=function(){function t(){}return t.getSwfLangTextFlowVar=function(e,n){return(new egret.HtmlTextParser).parser(t.getSwfLangStrVar(e,n))},t.getSwfLangStrVarByID=function(e,n){if(null==DataBase.strings)return e;var i=DataBase.strings[e];return null==i?e:t.getSwfLangStrVar(i,n)},t.getSwfLangStrVar=function(e,n){var i,r,o;i=e.indexOf("{"),r=e.indexOf("}");for(var a,s,c,h,l=0;-1!=i&&-1!=r;){o=e.substring(i,r+1),a=e.indexOf("@",l);var u=parseInt(e.substring(a+1,e.indexOf(":",a)))-1;if(0/0==u)return"stringError:"+e;s=e.indexOf("!#[",l)+3,s>2&&(c=e.indexOf("]@",l),h=e.substring(s,c),n[u]=t.getSwfLangStr(h+n[u]));var p=n[u].toString();e=e.replace(o,p),l=i+p.length,i=e.indexOf("{",l),r=e.indexOf("}",l)}return e},t.getSwfLangStr=function(t){if(null==DataBase.strings)return t;var e=DataBase.strings[t];return null==e?t:e.toString()},t}();__reflect(StringUtil.prototype,"StringUtil");var DebugPlatform=function(){function t(){}return t.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2,{nickName:"username"}]})})},t.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2]})})},t}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var ThemeAdapter=function(){function t(){}return t.prototype.getTheme=function(t,e,n,i){function r(t){e.call(i,t)}function o(e){e.resItem.url==t&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,o,null),n.call(i))}var a=this;"undefined"!=typeof generateEUI?egret.callLater(function(){e.call(i,generateEUI)},this):"undefined"!=typeof generateEUI2?RES.getResByUrl("resource/gameEui.json",function(t,n){window.JSONParseClass.setData(t),egret.callLater(function(){e.call(i,generateEUI2)},a)},this,RES.ResourceItem.TYPE_JSON):(RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,o,null),RES.getResByUrl(t,r,this,RES.ResourceItem.TYPE_TEXT))},t}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);var HttpCommand=function(){function t(){this.api="http://httpbin.org/"}return t.getInstance=function(){return null==this.instance&&(this.instance=new t),this.instance},t.prototype.testGet=function(){var t=this.api+"get",e={type:"Content-Type",value:"application/json;charset=UTF-8"};this.sendRequest(INTERFACEAPI.TESTGET,t,[e])},t.prototype.testPost=function(){var t=this.api+"post",e={type:"Content-Type",value:"application/json;charset=UTF-8"};this.sendRequest(INTERFACEAPI.TESTPOST,t,[e],null,egret.HttpMethod.POST)},t.prototype.sendRequest=function(t,e,n,i,r){void 0===i&&(i=null),void 0===r&&(r="GET"),console.log("发送消息:",t,e,n,i);var o=new egret.HttpRequest;o.responseType=egret.HttpResponseType.TEXT,o.open(e,r);for(var a=0;a<n.length;a++){var s=n[a];o.setRequestHeader(s.type,s.value)}o.once(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this),o.once(egret.ProgressEvent.PROGRESS,this.onGetProgress,this),o.once(egret.Event.COMPLETE,function(e){var n=JSON.parse(e.currentTarget.response);if(console.log("收到消息:",t,n),200!=n.code)return void console.log("请求"+t+"失败，错误代码："+n.code);switch(t){case INTERFACEAPI.TESTGET:break;case INTERFACEAPI.TESTPOST:}},this),o.send(i)},t.prototype.onGetIOError=function(t){t.currentTarget.response;console.log("onGetIOError:",t)},t.prototype.onGetProgress=function(t){},t}();__reflect(HttpCommand.prototype,"HttpCommand");var GameEvent=function(t){function e(e,n,i){void 0===n&&(n=!1),void 0===i&&(i=!1);var r=t.call(this,e,n,i)||this;return r.data=null,r}return __extends(e,t),e.REWARDAD_CLOSE_EVENT="REWARDAD_CLOSE_EVENT",e.OPENRANK="OPENRANK",e}(egret.Event);__reflect(GameEvent.prototype,"GameEvent");var GameLogic=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.getInstance=function(){return null==this._instance&&(this._instance=new e),this._instance},e.prototype.init=function(){this.initData(),this.openStart(),WxApi.getInstance().userInfo=platform.getUserInfo(),console.log("userinfo:",WxApi.getInstance().userInfo)},e.prototype.setNextMission=function(t,e,n){var i=this.data[t];if(null!=i){var r=i[e];null!=r&&(r.state=n)}},e.prototype.initData=function(){this.data=[,[],[],[]],this.config=RES.getRes("config_json");var t=WxApi.getInstance().getLocalData(GameConst.localkey_missiondata);if(console.log("initdata:",t,""==t),(null==t||""==t)&&(t=[,[],[],[]]),null!=this.config)for(var e in this.config){var n=this.config[e];if(!(e.length<8)){var i=new MissionVO;i.id=n.id,i.type=n.type,i.des=n.des,i.content=n.content,i.name=n.name,i.times=[];for(var r=n.time.split(":"),o=0;o<r.length;o++)i.times.push(parseInt(r[o]));i.state=1==i.type?0:1,1==i.type&&1==i.id&&(i.state=1),i.stars=0;var a=this.data[i.type][i.id-1];if(null!=a&&2==a.state&&(i.state=1),null!=t){var s=t[i.type];if(null!=s){var c=s[i.id];if(null!=c){for(var h=parseInt(c),l=i.times.length-1;l>=0;l--)h<=1e3*i.times[l]&&i.stars++;0==i.state&&(i.state=i.stars>0?1:0)}}}this.data[i.type].push(i)}}WxApi.getInstance().setLocalData(GameConst.localkey_missiondata,t)},e.prototype.saveLocal=function(t,e,n){var i=WxApi.getInstance().getLocalData(GameConst.localkey_missiondata);console.log("savelocal:",i),null==i&&(i=[,[],[],[]]),null==i[t]&&(i[t]=[]),i[t][e]=n,WxApi.getInstance().setLocalData(GameConst.localkey_missiondata,i)},e.prototype.getRecond=function(t,e){var n=t+"_"+e,i=WxApi.getInstance().getLocalData(n);return(null==i||""==i)&&(i=0),i},e.prototype.openStart=function(){this.main.removeChildren(),this.main.addChild(new StartUI)},e.prototype.startGame=function(t){this.main.removeChildren(),this.main.addChild(new GameUI(t))},e.prototype.openMission=function(){this.main.removeChildren(),this.main.addChild(new MissionUI)},e.prototype.getMissionData=function(){return this.data},e.prototype.getStartMission=function(){return this.data[1][2]},e.prototype.getStringByStar=function(t){return this.config["str"+t]},e}(egret.EventDispatcher);__reflect(GameLogic.prototype,"GameLogic");var DataBase=function(){function t(){}return t}();__reflect(DataBase.prototype,"DataBase");var GameConst=function(){function t(){}return t.web=1,t.version="201808181130",t.localkey_missiondata="localkey_missiondata",t}();__reflect(GameConst.prototype,"GameConst");var INTERFACEAPI;!function(t){t[t.TESTGET=0]="TESTGET",t[t.TESTPOST=1]="TESTPOST"}(INTERFACEAPI||(INTERFACEAPI={}));var PlayerConst=function(){function t(){}return t}();__reflect(PlayerConst.prototype,"PlayerConst");var Int64=function(){function t(t,e){void 0===t&&(t=0),void 0===e&&(e=0),this._highValue=0,this._lowValue=0,this.cacheString=new Array,this._lowValue=t,this._highValue=e}return Object.defineProperty(t.prototype,"higherUint",{get:function(){return this._highValue},set:function(t){this._highValue!=t&&(this._highValue=t,this.cacheBytes=null,this.cacheString=[])},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"lowerUint",{get:function(){return this._lowValue},set:function(t){this._lowValue=t,this._lowValue!=t&&(this.cacheBytes=null,this.cacheString=[])},enumerable:!0,configurable:!0}),t.prototype.fromString=function(t,e){if(void 0===e&&(e=10),!t)return void this.reset();t=t.toLowerCase();for(var n=4294967296,i=0,r=0,o=0;o<t.length;o++){var a=t.charCodeAt(o)-48;a>9&&(a-=39),i=i*e+a,r=r*e+(i/n>>0),i%=n}this._lowValue=i,this._highValue=r,this.cacheString=[],this.cacheString[e]=t,this.cacheBytes=null},t.prototype.fromBytes=function(t,e){void 0===e&&(e=0);try{t.position=e,t.endian==egret.Endian.LITTLE_ENDIAN?(this._lowValue=t.readUnsignedInt(),this._highValue=t.readUnsignedInt()):(this._highValue=t.readUnsignedInt(),this._lowValue=t.readUnsignedInt())}catch(n){return void this.reset()}this.cacheBytes=null,this.cacheString=[]},t.prototype.reset=function(){this._highValue=0,this._lowValue=0,this.cacheBytes=null,this.cacheString=[]},t.prototype.clone=function(){return new t(this._lowValue,this._highValue)},t.prototype.copy=function(t){this.reset(),this._lowValue=t._lowValue,this._highValue=t._highValue},t.prototype.cloneTo=function(e){return null==e&&(e=new t),e.copy(this),e},t.prototype.equals=function(t){return null==t?!1:this._highValue==t._highValue&&this._lowValue==t._lowValue},Object.defineProperty(t.prototype,"bytes",{get:function(){return this.cacheBytes?this.cacheBytes:(this.cacheBytes=new egret.ByteArray,this.cacheBytes.endian=egret.Endian.LITTLE_ENDIAN,this.cacheBytes.writeUnsignedInt(this._lowValue),this.cacheBytes.writeUnsignedInt(this._highValue),this.cacheBytes)},enumerable:!0,configurable:!0}),t.prototype.toNumber=function(){var t=this.toString();return""==t?0:parseInt(t)},t.prototype.toString=function(t){if(void 0===t&&(t=10),2>t||t>36)throw new RangeError("基数参数必须介于 2 到 36 之间；当前值为 "+t+"。");if(this.cacheString[t])return this.cacheString[t];for(var e,n,i,r="",o=this._lowValue,a=this._highValue,s=Math.pow(2,32);0!=a||0!=o;)e=a%t,i=e*s+o,n=i%t,r=n.toString(t)+r,a=(a-e)/t,o=(i-n)/t;return this.cacheString[t]=""==r?"0":r,this.cacheString[t]},t.prototype.parseData=function(t){this._highValue=t.readUnsignedInt(),this._lowValue=t.readUnsignedInt()},t.prototype.toData=function(t){t.writeUnsignedInt(this._highValue),t.writeUnsignedInt(this._lowValue)},t.prototype.gc=function(){this.cacheBytes=null,this.cacheString=null},t}();__reflect(Int64.prototype,"Int64");var FilterUtil=function(){function t(){}return t.getGrayFilter=function(){var t=[.3,.6,0,0,0,.3,.6,0,0,0,.3,.6,0,0,0,0,0,0,1,0],e=new egret.ColorMatrixFilter(t);return[e]},t.getColorFilter=function(){var t=[0,0,0,0,0,0,1,0,0,255,0,0,0,0,0,0,0,0,1,0],e=new egret.ColorMatrixFilter(t);return[e]},t.getBlurFilter=function(){var t=new egret.BlurFilter(1,1);return[t]},t.getTxtFilter=function(t){return void 0===t&&(t=0),[new egret.GlowFilter(t,1,2,2,4,1,!1,!1)]},t.getDropFilter=function(){var t=3,e=45,n=0,i=1,r=0,o=0,a=1.5,s=1,c=!1,h=!1,l=new egret.DropShadowFilter(t,e,n,i,r,o,a,s,c,h);return[l]},t}();__reflect(FilterUtil.prototype,"FilterUtil");var LoadingUI=function(t){function e(){var e=t.call(this)||this;return e.createView(),e}return __extends(e,t),e.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},e.prototype.onProgress=function(t,e){this.textField.text="Loading..."+t+"/"+e},e}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var TimeUtil=function(){function t(){}return t.getCurrentTime=function(){var t=new Date;return t.getTime()},t.getCrtServerTime=function(){return(new Date).getTime()/1e3+this.offTime},t.getServerDate=function(){return new Date(1e3*t.getCrtServerTime())},t.GetDayInYear=function(t){function e(t){var e=0;return e=1==t||3==t||5==t||7==t||8==t||10==t||12==t?31:4==t||6==t||9==t||11==t?30:r%400==0||r%4==0&&r%100!=0?29:28}for(var n=new Date(t),i=n.getUTCMonth()+1,r=n.getFullYear(),o=n.getDate(),a=0,s=1;i>=s;s++)a+=s==i?o:e(s);return a},t.getSecondInDay=function(t){return 3600*t.getHours()+60*t.getMinutes()+t.getSeconds()},t.ParseTime2Format=function(t,e){function n(t){var e=t.toString();return 10>t&&(e="0"+t),e}void 0===e&&(e="h:m:s");var i=Math.floor(t/3600),r=Math.floor(t%3600/60),o=t%3600%60;return-1!=e.indexOf("h")?e=e.replace(/h/g,n(i)):r+=60*i,-1!=e.indexOf("m")?e=e.replace(/m/g,n(r)):-1!=e.indexOf("h")?o+=60*r:o=t,-1!=e.indexOf("s")&&(e=e.replace(/s/g,n(o))),e},t.ParseTime2Date=function(t,e){function n(t){var e=t.toString();return 10>t&&(e="0"+t),e}void 0===e&&(e="Y-M-D h:m:s");var i=new Date(t),r=i.getFullYear(),o=i.getMonth()+1,a=i.getDate(),s=i.getHours(),c=i.getMinutes(),h=i.getSeconds();return-1!=e.indexOf("Y")&&(e=e.replace(/Y/g,n(r))),-1!=e.indexOf("M")&&(e=e.replace(/M/g,n(o))),-1!=e.indexOf("D")&&(e=e.replace(/D/g,n(a))),-1!=e.indexOf("h")&&(e=e.replace(/h/g,n(s))),-1!=e.indexOf("m")&&(e=e.replace(/m/g,n(c))),-1!=e.indexOf("s")&&(e=e.replace(/s/g,n(h))),e},t.ParseTime2Units=function(t){var e="";return t>=86400?e=Math.floor(t/86400)+"天":t>=3600?e=Math.floor(t/3600)+"小时":t>=60?e=Math.floor(t/60)+"分钟":t>0&&(e=t+"秒"),e},t.CreateCD=function(t,e,n,i){void 0===i&&(i=0);var r=new egret.Timer(n,i);return r.addEventListener(egret.TimerEvent.TIMER,t,e),r},t.RemoveCD=function(t,e,n){null!=t&&(t.stop(),t.removeEventListener(egret.TimerEvent.TIMER,e,n))},t}();__reflect(TimeUtil.prototype,"TimeUtil");var WxApi=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.getInstance=function(){return null==this._instance&&(this._instance=new e),this._instance},e.prototype.init=function(){1==GameConst.web?GameLogic.getInstance().init():this.login(),this.showShareMenu()},e.prototype.login=function(){var t=this,e=window.wx;null!=e&&e.login({success:function(e){console.log("wxloginsuccess:",e),t.logincode=e.code,GameLogic.getInstance().init()},fail:function(){},complete:function(){}})},e.prototype.share=function(t){void 0===t&&(t=null);var n=window.wx;null!=n&&(t=null==t?"":t,this.updateShareMenu(!0),n.shareAppMessage({title:e.getInstance().shareInfo.share_game_title,imageUrl:e.getInstance().shareInfo.share_game_img,query:t}))},e.prototype.showoff=function(){var t=window.wx;null!=t&&(this.updateShareMenu(!0),t.shareAppMessage({title:PlayerConst.highestScore+"分，不服来战！",imageUrl:e.getInstance().shareInfo.share_group_img,query:e.getInstance().shareInfo.query}))},e.prototype.drawBMP=function(){var t=new egret.DisplayObjectContainer,n=new egret.Bitmap,i=RES.getRes("over_json.game_over_share");n.texture=i,t.addChild(n);var r=new egret.TextField;r.text=e.getInstance().userInfo.nickName,r.width=200,r.height=24,r.size=24,r.textAlign="center",r.fontFamily="SimHei",r.x=t.width-r.width>>1,r.y=310,t.addChild(r);var o=new egret.TextField;o.text=PlayerConst.highestScore+"分",o.width=300,o.height=24,o.size=40,o.textAlign="center",o.fontFamily="SimHei",o.x=t.width-o.width>>1,o.y=352,t.addChild(o);var a=new egret.RenderTexture;return a.drawToTexture(t),new egret.Bitmap(a)},e.prototype.checkShareInfo=function(){var t=this;console.log("checkShareInfo");var e=window.wx;if(null!=e){var n=e.getLaunchOptionsSync();console.log("info:",n),null!=n&&null!=n.shareTicket&&""!=n.shareTicket&&null!=n.query&&"1"==n.query.grouprank&&e.getShareInfo({shareTicket:n.shareTicket,success:function(e){console.log("getShareInfo:success:",e);var i=new GameEvent(GameEvent.OPENRANK);i.data=n.shareTicket,t.dispatchEvent(i)},fail:function(t){console.log("getShareInfo:fail:",t)},complete:function(){console.log("getShareInfo:complete:")}})}},e.prototype.showShareMenu=function(t){void 0===t&&(t=null),console.log("showShareMenu:",t),null==t&&(t={share_game_title:"舒尔特方格，训练你的注意力",share_game_img:"resource/assets/share.jpg",query:""}),this.shareInfo=t;var e=window.wx;null!=e&&(e.showShareMenu(),this.onShare(),this.checkShareInfo())},e.prototype.onShare=function(t){void 0===t&&(t="rightup=1");var n=window.wx;null!=n&&(this.updateShareMenu(!0),console.log("onShareAppMessage:",this.shareInfo),n.onShareAppMessage(function(){return{title:e.getInstance().shareInfo.share_game_title,imageUrl:e.getInstance().shareInfo.share_game_img,query:e.getInstance().shareInfo.query}}))},e.prototype.updateShareMenu=function(t){var e=window.wx;null!=e&&(console.log("updateShareMenu:withShareTicket:",t),e.updateShareMenu({withShareTicket:t,success:function(t){console.log("updateShareMenu:success:",t)},fail:function(t){console.log("updateShareMenu:fail:",t)},complete:function(){console.log("updateShareMenu:complete:")}}))},e.prototype.feedBack=function(){var t=window.wx;null!=t&&t.openCustomerServiceConversation({success:function(t){console.log("success:",t)},fail:function(t){console.log("fail:",t)},complete:function(t){console.log("complete:",t)}})},e.prototype.setHigherScore=function(t,e,n){var i=window.wx;if(null!=i){var r="score_"+t+"_"+e;i.setUserCloudStorage({KVDataList:[{key:r,value:n+""}],success:function(t){console.log("setUserCloudStorage:res:",t)},fail:function(t){console.log("setUserCloudStorage:error:",t)},complete:function(){console.log("setUserCloudStorage:complete:")}})}},e.prototype.showBanner=function(){if(console.log("系统信息：",wx.getSystemInfoSync()),null==this.bannerAd){var t=wx.getSystemInfoSync().screenWidth,e=wx.getSystemInfoSync().screenHeight;this.bannerAd=wx.createBannerAd({adUnitId:"adunit-465b0f38397b8e3f",style:{left:10,top:e-100,width:t-20}})}null!=this.bannerAd&&(this.bannerAd.onLoad(function(){console.log("banner 广告加载成功")}),this.bannerAd.show())},e.prototype.hideBanner=function(){null!=this.bannerAd&&this.bannerAd.hide()},e.prototype.initRewardVideoAd=function(){var t=this,e=window.wx;null!=e&&(this.rewardAd=e.createRewardedVideoAd({adUnitId:"adunit-dbf18bd3a9ac0892"}),this.rewardAd.onLoad(function(){console.log("激励视频 广告加载成功")}),this.rewardAd.onError(function(t){console.log("rewardAderror:",t)}),this.rewardAd.onClose(function(e){var n;n=e&&e.isEnded||void 0===e?0:1,t.dispatchGameEvent(GameEvent.REWARDAD_CLOSE_EVENT,n)}))},e.prototype.showRewardAd=function(t){var e=this;if(this.adtype=t,null!=this.rewardAd)try{this.rewardAd.show()["catch"](function(t){console.log("showRewardAd:",t),e.dispatchGameEvent(GameEvent.REWARDAD_CLOSE_EVENT,2)})}catch(n){this.dispatchGameEvent(GameEvent.REWARDAD_CLOSE_EVENT,2)}else this.dispatchGameEvent(GameEvent.REWARDAD_CLOSE_EVENT,2)},e.prototype.dispatchGameEvent=function(t,e){console.log("dispatchGameEvent:",t,this.adtype,e);var n=new GameEvent(t);n.data={type:this.adtype,data:e},this.dispatchEvent(n)},e.prototype.checkWx=function(){var t=window.wx;return null!=t},e.prototype.setLocalData=function(t,e){if(!this.checkWx())return null;try{return wx.setStorageSync(t,e)}catch(n){return null}},e.prototype.getLocalData=function(t){if(!this.checkWx())return null;try{return wx.getStorageSync(t)}catch(e){return null}},e.prototype.clearLocalData=function(t){if(!this.checkWx())return null;try{return wx.clearStorageSync(t)}catch(e){return null}},e.prototype.skipToProgram=function(){try{wx.navigateToMiniProgram({appId:"wx5ccf73a5edb50795",extraData:"qiuqiu",success:function(t){console.log("navigateToMiniProgram:",t)},fail:function(t){console.log("navigateToMiniProgram:error:",t)},complete:function(){console.log("navigateToMiniProgram:complete:")}})}catch(t){wx.showToast({title:"该功能暂未开放",icon:"none",duration:2e3})}},e.prototype.postToDataContext=function(t){null!=wx&&(console.log("postToDataContext:",t),wx.getOpenDataContext().postMessage(t))},e}(egret.EventDispatcher);__reflect(WxApi.prototype,"WxApi");var AssetAdapter=function(){function t(){}return t.prototype.getAsset=function(t,e,n){function i(i){e.call(n,i,t)}if(RES.hasRes(t)){var r=RES.getRes(t);r?i(r):RES.getResAsync(t,i,this)}else RES.getResByUrl(t,i,this,RES.ResourceItem.TYPE_IMAGE)},t}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var GameItemUI=function(t){function e(){var e=t.call(this)||this;return e.skinName="GameItemSkin",e}return __extends(e,t),e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this),this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.begin,this),this.addEventListener(egret.TouchEvent.TOUCH_END,this.end,this),this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.clear,this)},e.prototype.begin=function(){this.rect_click.fillColor=GameLogic.getInstance().crtClickStr==this.data.id?4389127:16711680,this.rect_click.visible=!0},e.prototype.end=function(){this.rect_click.visible=!1},e.prototype.clear=function(){this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.begin,this),this.removeEventListener(egret.TouchEvent.TOUCH_END,this.end,this),this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.clear,this)},e.prototype.dataChanged=function(){if(null!=this.data){var t=720/this.data.row;this.width=this.height=this.rect_bg.width=this.rect_bg.height=this.rect_click.width=this.rect_click.height=t-30,console.log(this.data.id.length),this.lbl.size=this.data.size,this.lbl.text=this.data.id+""}},e}(eui.ItemRenderer);__reflect(GameItemUI.prototype,"GameItemUI"),window.MissionItemUI=MissionItemUI;var GameOverUI=function(t){function e(e,n){var i=t.call(this,"GameOverSkin")||this;return i.vo=e,i.time=n,i}return __extends(e,t),e.prototype.initView=function(){for(var t=0,e=this.vo.times.length-1;e>=0;e--)this.time<=1e3*this.vo.times[e]&&(t++,this["star"+(this.vo.times.length-e)].source=RES.getRes("star_a_png"));this.vo.stars=t,t>0&&(this.vo.state=2,GameLogic.getInstance().setNextMission(this.vo.type,this.vo.id,1)),console.log("gameover:",this.vo);var n=GameLogic.getInstance().getRecond(this.vo.type,this.vo.id);0!=n&&(this.lbl_best.text="历史最快成绩："+this.getText(n)),(0==n||this.time<n)&&(GameLogic.getInstance().saveLocal(this.vo.type,this.vo.id,this.time),WxApi.getInstance().setHigherScore(this.vo.type,this.vo.id,this.time)),this.time<n&&(this.lbl_fast.visible=!0),this.lbl.text=GameLogic.getInstance().getStringByStar(this.vo.stars),this.lbl_time.text="本局用时："+this.getText(this.time)},e.prototype.getText=function(t){var e=TimeUtil.ParseTime2Format(Math.floor(t/1e3),"m:s"),n=t%1e3,i="";return i=10>n?"00"+n:100>n?"0"+n:n+"",e+":"+i},e.prototype.initEvent=function(){this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickBack,this),this.btn_restart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickRestart,this)},e.prototype.clickRestart=function(){GameLogic.getInstance().startGame(this.vo)},e.prototype.clickBack=function(){GameLogic.getInstance().openStart()},e.prototype.clear=function(){t.prototype.clear.call(this),this.vo=null,this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickBack,this),this.btn_restart.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickRestart,this)},e}(BaseUI);__reflect(GameOverUI.prototype,"GameOverUI");var GameUI=function(t){function e(e){var n=t.call(this,"GameSkin")||this;return n.vo=e,n}return __extends(e,t),e.prototype.checkFit=function(){t.prototype.checkFit.call(this),this.img_1.height=GameLogic.getInstance().GameStage.stageHeight},e.prototype.initData=function(){switch(this.arr_data=new eui.ArrayCollection,this.vo.type){case 1:this.initType1();break;case 2:this.initType2();break;case 3:this.initType3()}},e.prototype.initType1=function(){var t=parseInt(this.vo.content);this.arr=[];for(var e=0;t>e;e++)this.arr.push(e+1+"");for(var n=Math.sqrt(t),i=this.shuffle(this.arr),r=60,e=0;e<i.length;e++)this.arr_data.addItem({id:i[e],row:n,size:r})},e.prototype.initType2=function(){var t=this.vo.content.indexOf(","),e=-1!=t?",":"";this.arr=this.vo.content.split(e);var n=this.shuffle(this.arr),i=60;2!=this.vo.type||8!=this.vo.id&&9!=this.vo.id||(i=48);for(var r=(this.vo.id<3||this.vo.id>8?5:4,0);r<n.length;r++)this.arr_data.addItem({id:n[r],row:(this.vo.id<3,5),size:i})},e.prototype.initType3=function(){var t=parseInt(this.vo.content);this.arr=[];for(var e="",n=0;t>n;n++){var i=Math.floor(10*Math.random())+"";this.arr.push(i),e+=i}this.lbl_num.visible=!0,this.lbl_num.alpha=1,this.lbl_num.text=e;for(var r=60,n=0;10>n;n++)this.arr_data.addItem({id:n+"",row:5,size:r});this.list.visible=!1},e.prototype.shuffle=function(t){for(var e=t.slice(),n=[];;){var i=Math.floor(Math.random()*e.length);if(n.push(e[i]),e.splice(i,1),0==e.length)break}return n},e.prototype.initView=function(){this.lbl_des.text=this.vo.des,this.list.itemRenderer=GameItemUI,this.list.dataProvider=this.arr_data,this.btn_back.visible=1!=this.vo.type},e.prototype.clickStart=function(){var t=this;if(this.gp.visible=!1,3==this.vo.type){egret.clearTimeout(this.timeId);var e=1e3*(parseInt(this.vo.content)-5);this.timeId=egret.setTimeout(function(){egret.Tween.get(t.lbl_num).to({alpha:0},3e3).call(function(){t.lbl_num.visible=!1,t.list.visible=!0,t.start()},t)},this,e)}else this.start()},e.prototype.start=function(){GameLogic.getInstance().crtclick=0,GameLogic.getInstance().crtClickStr=this.arr[GameLogic.getInstance().crtclick],this.starttime=egret.getTimer(),this.addEventListener(egret.Event.ENTER_FRAME,this.enterframe,this)},e.prototype.gameover=function(){var t=egret.getTimer(),e=t-this.starttime;this.addChild(new GameOverUI(this.vo,e))},e.prototype.initEvent=function(){this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickStart,this),this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.itemClick,this),this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickBack,this)},e.prototype.clickBack=function(){GameLogic.getInstance().openStart()},e.prototype.itemClick=function(t){var e=(t.itemIndex,t.item.id);t.itemRenderer;GameLogic.getInstance().crtClickStr==e&&(GameLogic.getInstance().crtclick++,GameLogic.getInstance().crtclick>=this.arr.length?this.gameover():GameLogic.getInstance().crtClickStr=this.arr[GameLogic.getInstance().crtclick])},e.prototype.enterframe=function(){var t=egret.getTimer(),e=t-this.starttime,n=TimeUtil.ParseTime2Format(Math.floor(e/1e3),"m:s"),i=e%1e3,r="";r=10>i?"00"+i:100>i?"0"+i:i+"",this.lbl_time.text=n+":"+r},e.prototype.clear=function(){t.prototype.clear.call(this),this.vo=null,GameLogic.getInstance().crtclick=0,egret.clearTimeout(this.timeId),egret.Tween.removeTweens(this.lbl_num),this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickStart,this),this.removeEventListener(egret.Event.ENTER_FRAME,this.enterframe,this),this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.itemClick,this),this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickBack,this)},e}(BaseUI);__reflect(GameUI.prototype,"GameUI");var Main=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.createChildren=function(){t.prototype.createChildren.call(this),GameLogic.getInstance().GameStage=this.stage,GameConst.GameStage=this.stage,GameLogic.getInstance().main=this,egret.lifecycle.addLifecycleListener(function(t){}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()};var e=new AssetAdapter;egret.registerImplementation("eui.IAssetAdapter",e),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.runGame()["catch"](function(t){console.log(t)})},e.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,this.loadResource()];case 1:return t.sent(),[4,platform.login()];case 2:return t.sent(),this.createGameScene(),[2]}})})},e.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var t,e;return __generator(this,function(n){switch(n.label){case 0:return n.trys.push([0,4,,5]),t=new LoadingUI,this.stage.addChild(t),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return n.sent(),[4,this.loadTheme()];case 2:return n.sent(),[4,RES.loadGroup("preload",0,t)];case 3:return n.sent(),this.stage.removeChild(t),[3,5];case 4:return e=n.sent(),console.error(e),[3,5];case 5:return[2]}})})},e.prototype.loadTheme=function(){var t=this;return new Promise(function(e,n){var i=new eui.Theme("resource/default.thm.json",t.stage);i.addEventListener(eui.UIEvent.COMPLETE,function(){e()},t)})},e.prototype.createGameScene=function(){WxApi.getInstance().init()},e}(eui.UILayer);__reflect(Main.prototype,"Main");var MissionUI=function(t){function e(){return t.call(this,"MissionSkin")||this}return __extends(e,t),e.prototype.initData=function(){this.list.itemRenderer=MissionItemUI,this.arr_data=new eui.ArrayCollection},e.prototype.initView=function(){this.data=GameLogic.getInstance().getMissionData(),this.crttype=1,this.initList()},e.prototype.initList=function(){var t=this.data[this.crttype];if(null!=t&&0!=t.length){this.arr_data.removeAll();for(var e=0;e<t.length;e++)this.arr_data.addItem(t[e]);this.list.dataProvider=this.arr_data,this.initBtn()}},e.prototype.initEvent=function(){this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.itemClick,this);for(var t=1;3>=t;t++)this["btn"+t].addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnClick,this);this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickBack,this)},e.prototype.clickBack=function(){GameLogic.getInstance().openStart()},e.prototype.btnClick=function(t){var e=parseInt(t.currentTarget.name);this.crttype!=e&&(this.crttype=e,this.initList())},e.prototype.initBtn=function(){for(var t=1;3>=t;t++){var e=this["btn"+t];null!=e&&(e.filters=this.crttype!=t?FilterUtil.getGrayFilter():null)}},e.prototype.itemClick=function(t){var e=t.itemIndex,n=this.data[this.crttype];if(null!=n&&0!=n.length){var i=n[e];null!=i&&GameLogic.getInstance().startGame(i)}},e.prototype.clear=function(){t.prototype.clear.call(this),this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.itemClick,this);for(var e=1;3>=e;e++)this["btn"+e].removeEventListener(egret.TouchEvent.TOUCH_TAP,this.btnClick,this);this.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickBack,this),this.list.dataProvider=null,this.arr_data=null,this.list=null,this.data=null},e}(BaseUI);__reflect(MissionUI.prototype,"MissionUI");var RankTypeItemUI=function(t){function e(){var e=t.call(this)||this;return e.skinName="RankTypeItemSkin",e}return __extends(e,t),e.prototype.setVO=function(t){this.initView(t)
},e.prototype.setSelected=function(t){this.rect_bg.fillColor=t?16026375:15924365},e.prototype.dataChanged=function(){if(null!=this.data){var t=this.data;this.initView(t)}},e.prototype.initView=function(t){this.lbl.text=t.name},e}(eui.ItemRenderer);__reflect(RankTypeItemUI.prototype,"RankTypeItemUI"),window.RankTypeItemUI=RankTypeItemUI;var RankUI=function(t){function e(e){void 0===e&&(e=null);var n=t.call(this,"RankSkin")||this;return n.shareticket=e,n.skinName="RankSkin",n}return __extends(e,t),e.prototype.initData=function(){this.list.itemRenderer=RankTypeItemUI,this.arr_data=new eui.ArrayCollection},e.prototype.checkFit=function(){this.rect_bg.height=GameLogic.getInstance().GameStage.stageHeight},e.prototype.initView=function(){this.lbl_title.text=null!=this.shareticket?"群排行榜":"好友排行榜",this.data=GameLogic.getInstance().getMissionData(),this.crttype=1,this.initList(),this.validateNow(),this.initDataContext()},e.prototype.initList=function(){var t=this.data[this.crttype];if(null!=t&&0!=t.length){this.arr_data.removeAll();for(var e=0;e<t.length;e++)this.arr_data.addItem(t[e]);this.list.dataProvider=this.arr_data,this.initBtn()}},e.prototype.initBtn=function(){for(var t=1;3>=t;t++){var e=this["btn"+t];null!=e&&(e.filters=this.crttype!=t?FilterUtil.getGrayFilter():null)}},e.prototype.initEvent=function(){this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickClose,this),this.img_rankgp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickGroupRank,this),this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnClick,this),this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnClick,this),this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnClick,this),this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.itemClick,this)},e.prototype.btnClick=function(t){var e=parseInt(t.currentTarget.name);this.crttype!=e&&(this.crttype=e,this.initList(),this.list.validateNow(),this.updateRank(e,1,this.list.getChildAt(0)))},e.prototype.itemClick=function(t){var e=t.itemIndex,n=this.data[this.crttype];if(console.log("itemclick:",e,n),null!=n&&0!=n.length){var i=n[e];if(null!=i){"score_"+i.type+"_"+i.id;this.updateRank(i.type,i.id,t.itemRenderer)}}},e.prototype.initDataContext=function(){var t=window.platform;if(null!=t.openDataContext){this.bitmapdata=new egret.BitmapData(window.sharedCanvas),this.bitmapdata.$deleteSource=!1;var e=new egret.Texture;e._setBitmapData(this.bitmapdata),this.bmp_context=new egret.Bitmap(e),this.bmp_context.width=GameConst.GameStage.stageWidth,this.bmp_context.height=GameConst.GameStage.stageHeight,this.bmp_context.x=this.bmp_context.y=0,this.addChildAt(this.bmp_context,4),egret.stopTick(this.tickerHandler,this),egret.startTick(this.tickerHandler,this),this.updateRank(1,3,this.list.getChildAt(2))}},e.prototype.updateRank=function(t,e,n){console.log("updateRank:",t,e,n),null!=this.crtItem&&this.crtItem.setSelected(!1),this.crtItem=n,null!=this.crtItem&&this.crtItem.setSelected(!0);var i="score_"+t+"_"+e;WxApi.getInstance().postToDataContext({shareTicket:this.shareticket,userinfo:WxApi.getInstance().userInfo,stageW:GameConst.GameStage.stageWidth,stageH:GameConst.GameStage.stageHeight,rankkey:i,command:"open"})},e.prototype.tickerHandler=function(t){return egret.WebGLUtils.deleteWebGLTexture(this.bitmapdata.webGLTexture),this.bitmapdata.webGLTexture=null,!1},e.prototype.clickGroupRank=function(){WxApi.getInstance().share("grouprank=1")},e.prototype.clickClose=function(){null!=this.parent&&this.parent.removeChild(this)},e.prototype.clear=function(){t.prototype.clear.call(this),this.img_close.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickClose,this),this.img_rankgp.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickGroupRank,this),this.btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.btnClick,this),this.btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.btnClick,this),this.btn3.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.btnClick,this),this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.itemClick,this),WxApi.getInstance().postToDataContext({command:"close"}),null!=this.bmp_context&&null!=this.bmp_context.parent&&this.bmp_context.parent.removeChild(this.bmp_context),egret.stopTick(this.tickerHandler,this),this.bmp_context=null,this.bitmapdata=null},e}(BaseUI);__reflect(RankUI.prototype,"RankUI"),window.RankUI=RankUI;var StartUI=function(t){function e(){return t.call(this,"StartSkin")||this}return __extends(e,t),e.prototype.initData=function(){},e.prototype.initView=function(){},e.prototype.initEvent=function(){this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickStart,this),this.btn_rank.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickRank,this),this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickShare,this),this.btn_mission.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickMission,this),WxApi.getInstance().addEventListener(GameEvent.OPENRANK,this.openRank,this)},e.prototype.clickStart=function(){GameLogic.getInstance().startGame(GameLogic.getInstance().getStartMission())},e.prototype.clickRank=function(){this.addChild(new RankUI)},e.prototype.openRank=function(t){var e=null==t?null:t.data;this.addChild(new RankUI(e))},e.prototype.clickShare=function(){WxApi.getInstance().share()},e.prototype.clickMission=function(){GameLogic.getInstance().openMission()},e.prototype.clear=function(){t.prototype.clear.call(this),this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickStart,this),this.btn_rank.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickRank,this),this.btn_share.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickShare,this),this.btn_mission.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickMission,this),WxApi.getInstance().removeEventListener(GameEvent.OPENRANK,this.openRank,this)},e}(BaseUI);__reflect(StartUI.prototype,"StartUI");var MissionVO=function(){function t(){}return t}();__reflect(MissionVO.prototype,"MissionVO");