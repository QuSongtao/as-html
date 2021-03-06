import axios from 'axios';
import router from '../router';
// import Utils from "../utils/util.class";
import {Loading, Message} from 'element-ui';
import store from '../store';

// let baseURL = process.env.BASE_API;
console.log(process.env.BASE_API);
axios.defaults.headers['Content-Type'] = 'Content-Type: application/json';
export default class Http {
  static toType (obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  static filterNull (o) {
    for (let i in o) {
      if (o[i] === null || o[i] === undefined || o[i] === '') {
        delete o[i];
      }
      if (this.toType(o[i]) === 'string') {
        o[i] = o[i].trim();
      } else if (this.toType(o[i]) === 'object') {
        o[i] = this.filterNull(o[i]);
      } else if (this.toType(o[i]) === 'array') {
        o[i] = this.filterNull(o[i]);
      }
    }
    return o;
  }
  static openApiAxios (request) {
    if (!store.state.accessToken && request.url !== '/mgr/login') {
    // if (!window.localStorage.getItem('accessToken') && request.url !== '/mgr/login') {
      router.push('/login');
      return;
    }
    axios.defaults.headers['accessToken'] = store.state.accessToken;
    request.data = this.filterNull(request.data);
    let _this = this;
    let _finally = '';
    let _beforeSuccess = '';
    let _success = '';
    let _error = '';
    if (request.finally && request.finally !== null) {
      _finally = request.finally;
    }
    if (request.success && request._uccess !== null) {
      _success = request.success;
    }
    if (request.beforeSuccess && request.beforeSuccess !== null) {
      _beforeSuccess = request.beforeSuccess;
    }
    if (request.error && request.error !== null) {
      _error = request.error;
    }
    this.LoadFlag++;
    let loadinginstace = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    axios({
      method: request.method || 'POST',
      url: request.url,
      params: request.params,
      data: request.data,
      // baseURL: baseURL,
      withCredentials: false,
      timeout: 20000,
      responseType: request.responseType
    }).then((res) => {
      this.LoadFlag--;
      if (this.LoadFlag === 0) {
        loadinginstace.close();
      }
      if (typeof _beforeSuccess === 'function') {
        _beforeSuccess(res.data.data);
      }
      if (typeof _success === 'function') {
        _success(res.data);
        loadinginstace.close();
      }
      // if (res.data.successful) {
      //   _success(res.data);
      // } else {
      //   // PP0008 PP0009 都直接取登录
      //   if (res.data.bizCode.code === 'PP0008' || res.data.bizCode.code === 'PP0009') {
      //     Message.error({
      //       message: res.data.bizCode.info
      //     });
      //   } else {
      //     if (_error) {
      //       _error(res.data);
      //     } else {
      //       // 弹出错误消息
      //       Message.error({
      //         message: res.data.bizCode.info
      //       });
      //     }
      //   }
      // }
      if (typeof _finally === 'function') {
        _finally();
      }
    }).catch(function (err) {
      _this.LoadFlag = 0;
      if (_error) {
        _error(err);
      }
      if (err) {
        let message = err.message;
        if (message.indexOf('504') > -1) {
          Message.error({
            message: '网关错误,检查服务是否启动!'
          });
        }
        if (message.indexOf('500') > -1) {
          Message.error({
            message: '服务内部错误!'
          });
        }
        if (message.indexOf('timeout') > -1) {
          Message.error({
            message: '请求超时，系统异常'
          });
        }
        if (message.indexOf('404') > -1) {
          Message.error({
            message: 'url路径错误'
          });
        }
      }
      loadinginstace.close();
    });
  }
}
