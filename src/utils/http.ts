import { useAuth } from 'context/context-data/auth-context';
import qs from 'qs'
import * as auth from 'context/context-provider/auth-provider'
import { type } from 'node:os';

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object,
  token?: string
}

export const http = async (endPoint: string, {data, token, headers, ...customConfig}: Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-type': data ? 'application/json' : ''
    },
    ...customConfig
  }

  if (config.method.toUpperCase() === 'GET') {
    endPoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }
  return window.fetch(`${apiUrl}/${endPoint}`, config).then(response => {
    // 说明token失效
    if (response.status === 401) {
      auth.logout()
      window.location.reload()
      return Promise.reject({message: '请重新登录'})
    }
    const data = response.json()
    if (response.ok) {
      return data
    } else {
      // fetch 只有在网络连接失败才会抛出异常，不会因为状态码而抛出异常，因此这里我们手动抛出异常
      return Promise.reject(data)
    }
  })
}

// 在请求中自动添加token
export const useHttp = () => {
  const { user } = useAuth()
  // 使用Parameters解构http的类型定义
  return (...[endPoint, config]: Parameters<typeof http>) => http(endPoint, {...config, token: user?.token})
}