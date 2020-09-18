import APIConfig from '../../Config/APIConfig'

const DOMAIN = `${APIConfig.baseUrl}/api`

export default {
  type: 'apple',
  socketURL: DOMAIN,
  baseURL: DOMAIN,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  },
  timeOut: 30000
}
