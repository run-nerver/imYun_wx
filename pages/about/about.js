// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  phone: function () {
    wx.makePhoneCall({
      phoneNumber: '13526678185',
    }).catch((e) => {
      wx.showToast({
        title: '失败',
        icon: 'error'
      })
    })
  }
})