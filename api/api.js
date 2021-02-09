import baseApi from './baseApi';
import url from './url'

export default {
  // 用户登录
  ILogin(params) {
    return baseApi.request(url.URL_LOGIN, params, "POST");
  },
  // 上传文件
  IUploadFile(filePath, params) {
    return baseApi.upload(filePath, params);
    // return baseAPI.upload(filePath, folder);
  },
  // 上传用户信息
  IUploadUser(params) {
    return baseApi.request(url.URL_USER_UPLOAD, params, "POST")
  },
  // 
  IFileHistory(params) {
    return baseApi.request(url.URL_FILE_HISTORY, params, "GET")
  }
}