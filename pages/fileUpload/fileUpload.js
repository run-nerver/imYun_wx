// pages/upload_file/upload_file.js
const {
  default: api
} = require("../../api/api");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileName: undefined,
    filePath: undefined,
    processNum: undefined,
    color: '0', // 黑白彩色
    paperFormat: 'A4',
    direction: '1',
    singleSide: '0',
    num: '1', // 打印份数
    remarks: '',
    fileHistory: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('accData', data => {
      this.setData({
        fileName: data.data.name
      })
      this.data.fileName = data.data.name
      this.data.filePath = data.data.path
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.Progress()
  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  // 自定义函数
  preview() {
    let that = this
    let filePath = this.data.filePath
    let index = filePath.lastIndexOf(".")
    let ext = filePath.substr(index + 1)
    if (this.isAssetTypeAnImage(ext) == true) {
      wx.previewImage({
        urls: [filePath],
        current: filePath
      })
    } else {
      wx.openDocument({
        filePath: that.data.filePath,
        success: res => {
          console.log(res)
        }
      })
    }
  },
  // 颜色
  isColor(event) {
    this.data.color = event.detail.value
    console.log(this.data.color)
  },
  // 纸张大小
  isPaperFormat(event) {
    this.data.paperFormat = event.detail.value
  },
  // 横纵
  isDirection(event) {
    this.data.direction = event.detail.value
  },
  // 单双
  isSingleSide(event) {
    this.data.singleSide = event.detail.value
  },
  // 打印份数
  onNum(event) {
    this.data.num = event.detail.value
  },
  // 备注
  onRemarks(event) {
    this.data.color = event.detail.value
  },
  textareaAInput(event) {
    this.data.remarks = event.detail.value
  },
  againPrint() {

  },
  // 上传
  upload(e) {
    let that = this
    that.setData({
      modalName: e.currentTarget.dataset.target

    })
    that.data.processNum = 0
    api.IUploadFile(that.data.filePath, {
      printerid: 1,
      color: parseInt(that.data.color),
      paperFormat: that.data.paperFormat,
      fileName: that.data.fileName,
      direction: parseInt(that.data.direction),
      singleSide: parseInt(that.data.singleSide),
      num: parseInt(that.data.num),
      remarks: that.data.remarks
    }).then(res => {
      setTimeout(function () {
        that.setData({
          processNum: 100
        })
      }, 1000)
      wx.redirectTo({
        url: '/pages/fileHistory/fileHistory',
      })
    }).catch(function (error) {
      console.log(error)
    });
  },

  // 判断图片
  isAssetTypeAnImage(ext) {
    return [
      'png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'svg',
    ].indexOf(ext.toLowerCase()) !== -1;
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  goHome() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})