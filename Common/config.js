const url = 'http://103.211.47.132:9091'
const APIV1 = '/api/v1'

module.exports = {
  header: new Headers({
    'content-type': 'application/json', 
    token: 'shukun111222'
  }), 
  APIV1,
  api: {
    getOwners: `${url}${APIV1}/users`,
    getDimens: `${url}${APIV1}/goaldimensionalities`,
    goals: `${url}${APIV1}/goals`,
    gdrecords: `${url}${APIV1}/gdrecords`,
    gdrecordkrs: `${url}${APIV1}/gdrecordkrs`,
    searchgdrecords: `${url}${APIV1}/gdrecords/actions/search`,
    deleterecordkrs: `${url}${APIV1}/gdrecords/actions/delete`,
  },
}