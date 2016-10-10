import axios from 'axios';
import { getToken } from './func';

export const api = (method, controller, id, data) => {
  axios.defaults.baseURL = 'http://putao-yyw.dev.izhuyan.com/restful/';
  axios.defaults.withCredentials = true;
  if (getToken()) {
    axios.defaults.headers.common['Authorization'] = getToken().replace(/(^\")|(\"$)/g, '');
  }
  axios.defaults.transformRequest = [function (data) {
    var str = [];
    for(var p in data)
      if (data.hasOwnProperty(p) && data[p]) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
      }
    return str.join('&');
  }];
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  return axios[method]((controller ? ('/' + controller) : '')+(id ? ('/' + id) : ''), data);
};