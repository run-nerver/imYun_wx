const {
  default: api
} = require("../../api/api");
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    console.log(this.userInfo)
    
    this.getLogin()
  },
  // 登录
  getLogin() {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res) {
          var code = encodeURIComponent(res.code);
          api.ILogin({
            Jscode: code
          }).then(res => {
            app.globalData.token = res.data.data.token
            wx.setStorageSync('token', res.data.data.token)
            this.uploadUser()
          }).catch(function (error) {
            console.log(error)
          });
        }
      }
    })
    this.setData({
      modalName: null
    })
  },
  // 上传用户信息
  uploadUser() {
    const userUp = app.globalData.userInfo
    console.log(userUp)
    api.IUploadUser({
      avatar: userUp['avatarUrl'],
      city: userUp['city'],
      gender: userUp['gender'],
      nickName: userUp['nickName'],
      province: userUp['province']
    }).then(res => {
      console.log(res)
    })
  },
  onShareAppMessage() {
    from: 'button'
    
  },
  goFileHistory() {
    wx.navigateTo({
      url: '/pages/fileHistory/fileHistory',
    })
  },
  goAbout() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  }
})