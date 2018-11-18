/**
 * 请在白鹭引擎的Main.ts中调用 platform.login() 方法调用至此处。
 */
var mta = require('./mta_analysis.js');
require('./utils/ald-game.js')
var bannerAd;
var rewardAd;
class WxgamePlatform {

  /** 是否debug */
  isdebug(){
    return false;
  }

  /**埋点初始化 */
  initBuryingSDK() {
    if (mta == null) {
      return;
    }
    console.log("initmta:", mta)

    mta.App.init({
      "appID": "500641675",
      "eventID": "500641683",
    });
    mta.Page.init()
  }

  /**添加埋点 */
  buryingPoint(id, data) {
    if (mta == null) {
      return;
    }
    console.log("mtaLoad:", id, data)
    mta.Event.stat(id, data);
    wx.aldSendEvent(id, {
      id: "true"
    });
  }

  /**登陆 */
  login() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          console.log("login:",res)
          resolve(res)
        },
        fail: (res) => {
          wx.showToast({
            title: "服务器繁忙，请稍后再试",
            icon: 'none',
            duration: 2000
          });
          resolve(null)
        }
      })
    })
  }

  /** 获取用户授权 */
  getUserInfo() {
    return new Promise((resolve, reject) => {
      let sysInfo = wx.getSystemInfoSync();
      let sdkVersion = sysInfo.SDKVersion;
      sdkVersion = sdkVersion.replace(/\./g, "");
      sdkVersion = sdkVersion.substr(0, 3);
      let sdkVersionNum = parseInt(sdkVersion);
      console.log("当前基础调试库版本:", sdkVersionNum);
      if (sdkVersionNum >= 206) { //基础调试库在2.0.6版本以上
        wx.getSetting({
          success: function (res) {
            var authSetting = res.authSetting
            if (authSetting['scope.userInfo'] === true) {
              // 用户已授权，可以直接调用相关 API
              console.log('用户已同意授权信息', res);
              wx.getUserInfo({ //自动开启弹窗获取授权
                withCredentials: true,
                success: res => {
                  resolve(res.userInfo);
                },
                fail: res => {
                  wx.showModal({
                    title: '友情提醒',
                    content: '授权失败，请重新授权或联系开发人员',
                    confirmText: "确定",
                    showCancel: false,
                    success: res => {
                      resolve(null);
                    }
                  });
                }
              });
            } else {
              // 未询问过用户授权或者用户已拒绝授权时，弹窗询问用户是否授权
              console.log('未获取到用户授权信息');
              var button = wx.createUserInfoButton({ //使用点击按钮弹窗
                type: 'image',
                image: 'resource/assets/framework/start_button.png',
                style: {
                  left: 0,
                  top: 0,
                  width: 400,
                  height: 900
                },
                withCredentials: true
              });
              button.onTap((res) => {
                console.log("用户授权:", res);
                var userInfo = res.userInfo;
                if (userInfo != null) {
                  userInfo.first = true;
                  button.destroy();
                  resolve(userInfo);
                } else {
                  wx.showModal({
                    title: '友情提醒',
                    content: '微信授权仅获取您的昵称和头像，不会涉及隐私信息，请放心授权，否则可能影响游戏体验',
                    confirmText: "确定",
                    showCancel: false
                  });
                }
              });
            }
          }
        })
      } else { //基础调试库在2.0.6版本以下
        wx.showModal({
          title: '友情提醒',
          content: '请升级微信到6.6.6版本或以上，否则可能影响游戏体验',
          confirmText: "确定",
          showCancel: false,
          success: res => {
            resolve(null);
          }
        });
      }
    });
  }

  /** 显示当前页面的转发按钮 */
  showShareMenu() {
    wx.showShareMenu({})
  }

  /** 主动分享 */
  share(title, imageUrl, query = null) {
    console.log("share:",title,imageUrl,query)
    return new Promise((resolve, reject) => {
      wx.shareAppMessage({
        title: title,
        imageUrl: imageUrl,
        query: query
      })
    })
  }

  /** 右上角被动分享 */
  onShareAppMessage(title, imageUrl, query) {
    wx.onShareAppMessage({
      title: title,
      imageUrl: imageUrl,
      query: query
    })
  }
  /**更新转发属性 */
  updateShareMenu(bool) {
    wx.updateShareMenu({
      withShareTicket: bool
    })
  }
  /**获取转发详细信息 */
  getShareInfo(ticket) {
    return new Promise((resolve, reject) => {
      wx.getShareInfo({
        shareTicket: ticket,
        success: res => {
          resolve(res);
        },
        fail: res => {
          resolve(reject);
        }
      })
    });
  }

  /**小程序启动参数 */
  getLaunchOptionsSync() {
    return wx.getLaunchOptionsSync();
  }

  /**游戏圈 */
  createGameClubButton(textstr) {
    return new Promise((resolve, reject) => {
      wx.createGameClubButton({
        icon: 'white',
        style: {
          left: 10,
          top: 40,
          width: 32,
          height: 32,
          text: textstr
        }
      });
    });
  }

  /**震动
   * @param short true短震动 false长震动
   */
  vibrate(short = true) {
    if (short) {
      return new Promise((resolve, reject) => {
        wx.vibrateShort({
          success: res => {
            resolve(res);
          },
          fail: res => { },
          complete: () => { }
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        wx.vibrateLong({
          success: res => {
            resolve(res);
          },
          fail: res => { },
          complete: () => { }
        });
      });
    }
  }

  bannershow(adunitId) {
      let sysInfo = wx.getSystemInfoSync();
      let sdkVersion = sysInfo.SDKVersion;
      sdkVersion = sdkVersion.replace(/\./g, "");
      sdkVersion = sdkVersion.substr(0, 3);
      let sdkVersionNum = parseInt(sdkVersion);
      console.log("showbaner:", sdkVersionNum)
      if (sdkVersionNum >= 204) { //基础调试库在2.0.6版本以上
        let phoneWidth = sysInfo.screenWidth; //手机屏幕宽度
        let phoneHeight = sysInfo.screenHeight; //手机屏幕高度
        console.log(phoneWidth, phoneHeight)
        bannerAd = wx.createBannerAd({
          adUnitId: adunitId,
          style: {
            left: 10,
            top: phoneHeight - 122,
            width: phoneWidth - 20,
          }
        })
        bannerAd.onError(err => {
          console.log("bannerAdError:", err)
        });
        bannerAd.show();
        console.log("bannerAdshow:", bannerAd != null)
      }
  }
  bannerhide() {
    console.log("bannerhide",bannerAd != null)
    if (bannerAd != null) {
      bannerAd.hide();
    }
  }
  bannerdestroy() {
    console.log("bannerdestroy", bannerAd != null)
    if (bannerAd != null) {
      bannerAd.destroy();
    }
  }

  /** 同步存储本地缓存
   * @param key 缓存的key
   * @param value 缓存数据 string|Object
   */
  setStorageSync(key, value) {
    wx.setStorageSync(key, value);
  }

  /** 同步读取本地缓存 */
  getStorageSync(key) {
    return wx.getStorageSync(key);
  }

  /** 跳转到其他小程序 */
  skipToProgram(appid, extraData) {
    return new Promise((resolve, reject) => {
      let sysInfo = wx.getSystemInfoSync();
      let sdkVersion = sysInfo.SDKVersion;
      sdkVersion = sdkVersion.replace(/\./g, "");
      sdkVersion = sdkVersion.substr(0, 3);
      let sdkVersionNum = parseInt(sdkVersion);
      console.log("当前基础调试库版本:", sdkVersionNum);
      if (sdkVersionNum >= 203) { //基础调试库在2.0.6版本以上
        wx.navigateToMiniProgram({
          appId: appid,
          extraData: extraData,
          success: function (res) {
            resolve(res);
          },
          fail: err => {
            resolve(reject)
          }
        });
      } else {
        wx.showModal({
          title: '友情提醒',
          content: '请升级微信到6.6.6版本或以上，否则可能影响游戏体验',
          confirmText: "确定",
          showCancel: false,
          success: res => {
            resolve(null);
          }
        });
      }
    });

  }

  /** 创建激励视频
   * @return 0正常看完有奖励 1看一半关闭没奖励 2打开失败 3加载失败 4加载成功 5版本过低
   */
  rewardAdCreate(adunitId) {
    return new Promise((resolve, reject) => {
      let sysInfo = wx.getSystemInfoSync();
      let sdkVersion = sysInfo.SDKVersion;
      sdkVersion = sdkVersion.replace(/\./g, "");
      sdkVersion = sdkVersion.substr(0, 3);
      let sdkVersionNum = parseInt(sdkVersion);
      console.log("当前基础调试库版本:", sdkVersionNum);
      if (sdkVersionNum >= 204) { //基础调试库在2.0.6版本以上
        rewardAd = wx.createRewardedVideoAd({
          adUnitId: adunitId
        });
        resolve(rewardAd);
      } else {
        wx.showModal({
          title: '友情提醒',
          content: '请升级微信到6.6.6版本或以上，否则可能影响游戏体验',
          confirmText: "确定",
          showCancel: false,
          success: res => {
            resolve(5);
          }
        });
      }
    });
  }

  /** 显示激励视频 
   * @return 0正常看完有奖励 1看一半关闭没奖励 2打开失败 3加载失败 4加载成功 5版本过低 
   */
  rerwardAdShow() {
    return new Promise((resolve, reject) => {
      if (rewardAd == null) {
        resolve(2)
      }
      let sysInfo = wx.getSystemInfoSync();
      let sdkVersion = sysInfo.SDKVersion;
      sdkVersion = sdkVersion.replace(/\./g, "");
      sdkVersion = sdkVersion.substr(0, 3);
      let sdkVersionNum = parseInt(sdkVersion);
      console.log("当前基础调试库版本:", sdkVersionNum);
      if (sdkVersionNum >= 204) { //基础调试库在2.0.6版本以上
        rewardAd.show();
        resolve(0);
      } else {
        wx.showModal({
          title: '友情提醒',
          content: '请升级微信到6.6.6版本或以上，否则可能影响游戏体验',
          confirmText: "确定",
          showCancel: false,
          success: res => {
            resolve(5);
          }
        });
      }
    });
  }

  /**对用户托管数据进行写数据操作，允许同时写多组 KV 数据
   * @param KVDataList     [{ key: "newscore", value:"9999"}]
   */
  setUserCloudStorage(KVDataList) {
    wx.setUserCloudStorage({
      KVDataList: KVDataList,
      success: res => {
        console.log("setUserCloudStorage:res:", res);
      },
      fail: err => {
        console.log("setUserCloudStorage:error:", err);
      },
      complete: () => {
        console.log("setUserCloudStorage:complete:");
      }
    });
  }

  /** 联系客服 */
  openCustomerServiceConversation() {
    let sysInfo = wx.getSystemInfoSync();
    let sdkVersion = sysInfo.SDKVersion;
    sdkVersion = sdkVersion.replace(/\./g, "");
    sdkVersion = sdkVersion.substr(0, 3);
    let sdkVersionNum = parseInt(sdkVersion);
    console.log("当前基础调试库版本:", sdkVersionNum);
    if (sdkVersionNum >= 203) { //基础调试库在2.0.6版本以上
      wx.openCustomerServiceConversation({
        success: (res) => {
          console.log("success:", res);
        },
        fail: (res) => {
          console.log("fail:", res);
        }
      });
    } else {
      wx.showModal({
        title: '友情提醒',
        content: '请升级微信到6.6.6版本或以上，否则可能影响游戏体验',
        confirmText: "确定",
        showCancel: false,
        success: res => {
          resolve(null);
        }
      });
    }

  }

  /** 弹出悬浮提示 */
  toast(str){
    wx.showToast({
      title: str,
      icon: 'none',
      duration: 2000
    });
  }

  /** 弹窗窗提示 */
  showModal(content,title,surestr){
    wx.showModal({
      title: title,
      content: content,
      confirmText: surestr,
      showCancel: false,
      success: res => {
        resolve(null);
      }
    });
  }

  /** 向开放域发数据
   * @param data  shareTicket: this.shareticket,
                userinfo: WxApi.getInstance().userInfo,
            stageW: GlobalConst.GameStage.stageWidth,
            stageH: GlobalConst.GameStage.stageHeight,
            command: "open"
   */
  postMessage(data) {
    wx.getOpenDataContext().postMessage(data);
  }

}


window.platform = new WxgamePlatform();