const {
  default: api
} = require("../../api/api");
const app = getApp()

Page({
  data: {

  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  onLoad() {

  },

  getWxFile() {
    if (wx.getStorageSync('token') !== '') {
      wx.chooseMessageFile({
        count: 1,
        type: 'file',
        success: res => {
          let tempFile = res.tempFiles[0]
          wx.navigateTo({
            url: '../fileUpload/fileUpload',
            success: res => {
              res.eventChannel.emit('accData', {
                data: tempFile
              })
            }
          })
          this.setData({
            modalName: null
          })
        }
      })
    } else {
      this.setData({
        modalName: 'login'
      })
    }
  },
  getWxPicture() {
    wx.chooseMessageFile({
      count: 1,
      type: 'image',
      success: res => {
        let tempFile = res.tempFiles[0]
        wx.navigateTo({
          url: '../fileUpload/fileUpload',
          success: res => {
            res.eventChannel.emit('accData', {
              data: tempFile
            })
          }
        })
      }
    })
  },
  getLocalPicture() {
    wx.chooseImage({
      count: 1,
      success: res => {
        let tempFile = res.tempFiles[0]
        wx.navigateTo({
            url: '../fileUpload/fileUpload',
            success: res => {
              res.eventChannel.emit('accData', {
                data: tempFile
              })
            }
          }),
          this.setData({
            modalName: e.currentTarget.dataset.target
          })
      }
    })
  },
  test() {
    wx.navigateTo({
      url: '/pages/systemFile/systemFile',
    })
  },
  toMy() {
    wx.switchTab({
      url: '/pages/my/my',
    })
    this.setData({
      modalName: null
    })
  },
  onShareAppMessage: function () {
    return {
      title: '欢迎使用墨韵打印打印',
      path: '/page/index/index'
    }
  },
  onShareTimeline: function () {
    const img = app.globalData.userInfo
    console.log(img.avatarUrl)
    return {
      title: '欢迎使用印象云打印',
      imageUrl: img.avatarUrl
    }
  },
  goAbout: function () {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  }
})