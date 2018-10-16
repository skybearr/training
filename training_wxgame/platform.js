/**
 * 请在白鹭引擎的Main.ts中调用 platform.login() 方法调用至此处。
 */

class WxgamePlatform {

    name = 'wxgame'

    login() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: (res) => {
                    resolve(res)
                }
            })
        })
    }

  /**游戏圈 */
  createGameClubButton() {
    return new Promise((resolve, reject) => {
      wx.createGameClubButton({
        icon: 'white',
        style: {
          left: 10,
          top: 40,
          width: 32,
          height: 32,
          text: "游戏圈"
        }
      });
    });
  }

  /**获取授权 */
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
                  var userInfo = res.userInfo;
                  var nickName = userInfo.nickName;
                  var avatarUrl = userInfo.avatarUrl;
                  var gender = userInfo.gender; //性别 0：未知、1：男、2：女
                  var province = userInfo.province;
                  var city = userInfo.city;
                  var country = userInfo.country;
                  resolve(userInfo);
                }
              });
            } else {
              // 未询问过用户授权或者用户已拒绝授权时，弹窗询问用户是否授权
              console.log('未获取到用户授权信息');
              wx.getSystemInfo({
                success: function (res) {
                  console.log("getsysytem", res)
                  var button = wx.createUserInfoButton({ //使用点击按钮弹窗
                    type: 'image',
                    image: 'resource/assets/start_button.png',
                    style: {
                      left: 0,
                      top: 0,
                      width: res.screenWidth,
                      height: res.screenHeight
                    },
                    withCredentials: true
                  });
                  button.onTap((res) => {
                    console.log("用户授权:", res);
                    var userInfo = res.userInfo;
                    var nickName = userInfo.nickName;
                    var avatarUrl = userInfo.avatarUrl;
                    var gender = userInfo.gender; //性别 0：未知、1：男、2：女
                    var province = userInfo.province;
                    var city = userInfo.city;
                    var country = userInfo.country;
                    userInfo.first = true;
                    button.destroy();
                    resolve(userInfo);
                  });
                }
              })

            }
          }
        })
      } else { //基础调试库在2.0.6版本以下
        wx.getUserInfo({ //自动开启弹窗获取授权
          withCredentials: true,
          success: res => {
            var userInfo = res.userInfo;
            var nickName = userInfo.nickName;
            var avatarUrl = userInfo.avatarUrl;
            var gender = userInfo.gender; //性别 0：未知、1：男、2：女
            var province = userInfo.province;
            var city = userInfo.city;
            var country = userInfo.country;
            resolve(userInfo);
          },
          fail: res => {
            wx.showModal({
              title: '友情提醒',
              content: '请您在右上角菜单->关于（小程序名字）->右上角菜单->设置中手动开启授权开关，以获取您的公开信息用于游戏排行榜',
              confirmText: "确定",
              showCancel: false,
              success: res => {
                resolve(null);
              }
            });
          }
        });
      }
    });
  }

    openDataContext = new WxgameOpenDataContext();
}

class WxgameOpenDataContext {

    createDisplayObject(type, width, height) {
        const bitmapdata = new egret.BitmapData(sharedCanvas);
        bitmapdata.$deleteSource = false;
        const texture = new egret.Texture();
        texture._setBitmapData(bitmapdata);
        const bitmap = new egret.Bitmap(texture);
        bitmap.width = width;
        bitmap.height = height;

        if (egret.Capabilities.renderMode == "webgl") {
            const renderContext = egret.wxgame.WebGLRenderContext.getInstance();
            const context = renderContext.context;
            ////需要用到最新的微信版本
            ////调用其接口WebGLRenderingContext.wxBindCanvasTexture(number texture, Canvas canvas)
            ////如果没有该接口，会进行如下处理，保证画面渲染正确，但会占用内存。
            if (!context.wxBindCanvasTexture) {
                egret.startTick((timeStarmp) => {
                    egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
                    bitmapdata.webGLTexture = null;
                    return false;
                }, this);
            }
        }
        return bitmap;
    }


    postMessage(data) {
        const openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage(data);
    }
}


window.platform = new WxgamePlatform();