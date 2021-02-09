const {
	default: api
} = require("../../api/api")

// pages/fileHistory/fileHistory.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		file: [],
		offset: 0
	},
	onLoad: function (options) {
		this.getFileHistort()
	},
	onPullDownRefresh: function () {

	},

	onReachBottom: function () {
		this.getFileHistort()
	},

	onShareAppMessage: function () {

	},
	getFileHistort: function () {
		let that = this
		api.IFileHistory({
			limit: 10,
			offset: that.data.offset
		}).then(res => {
			if (res.data.code === 1000) {
				let fileList = res.data.data.items
				fileList.forEach(function (item, index) {
					that.setData({
						file: that.data.file.concat(item),
					})
				})
				console.log(that.data.file)
				that.setData({
					offset: that.data.offset + 10,
				})
			}
		})
	}
})