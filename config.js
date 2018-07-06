const url = 'http://103.211.47.132:9091'
const APIV1 = '/api/v1'
const APIV2 = '/api/v2'

module.exports = {
  header: new Headers({
    'content-type': 'application/json', 
    token: 'shukun111222'
  }), 
  APIV1,
  APIV2,
  api: {
    getGoals: `${url}${APIV1}/goals`,
    getOwners: `${url}${APIV1}/users`,
  },
}