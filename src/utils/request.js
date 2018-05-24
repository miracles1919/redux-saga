/* global window */
import axios from 'axios';
import qs from 'qs';
import lodash from 'lodash';

const fetch = (options) => {
  let {
    method = 'get',
    data,
    url,
  } = options;

  const cloneData = lodash.cloneDeep(data);

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData,
      });
    case 'delete':
      return axios.delete(url, {
        data: cloneData,
      });
    case 'post':
      return axios.post(url, cloneData);
    case 'put':
      return axios.put(url, qs.stringify(cloneData));
    case 'patch':
      return axios.patch(url, cloneData);
    default:
      return axios(options);
  }
};

const request = (options) => {
  return fetch(options).then((response) => {
    const { statusText, status, data } = response;

    return Promise.resolve({
      success: true,
      message: statusText,
      statusCode: status,
      data,
    });
  }).catch((error) => {
    return Promise.reject(error);
  });
};

export default request;
