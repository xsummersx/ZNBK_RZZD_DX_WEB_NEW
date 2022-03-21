import request from '@/utils/request';

/**
 * @param params
 * @description 获取用户信息
 */
export const getUserInfo = (params) => {
  return request({
    url: '/getUserInfo',
    method: 'GET',
    params,
  });
};

/**
 * @param data
 * @description 示例
 */
export const example = (data) => {
  return request({
    url: '/API_URL',
    method: 'POST',
    data,
  });
};
