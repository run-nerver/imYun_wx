
import httpUrl from "./url.js";


const app = getApp();


let host = httpUrl.URL_SERVER;
let request = (url, data, type) => new Promise((resolve, reject) => {
  
  wx.request({
    url: host + url,
    data: data,
    method: type,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': wx.getStorageSync('token')
    },
    success(res) {
      if (res.statusCode === 200) {
        resolve(res)
      }
    }
  })
})

let uploadHost = httpUrl.URL_SERVER + httpUrl.URL_FILE_UPLOAD;
let upload = (filePath, params) => new Promise((resolve, reject) => {
  wx.uploadFile({
    url: uploadHost,
    filePath: filePath,
    name: 'file',
    formData: params,
    header:{
      'Authorization': wx.getStorageSync('token')
    },
    success(res) {
      // console.log(res)
      if (res.statusCode === 200) {
        resolve(res)
      }
    },
    fail(err) {
      console.log(err)
    },
    complete(res) {
      // console.log(res)
    }
  })
})

module.exports = {
  request,
  upload
}
