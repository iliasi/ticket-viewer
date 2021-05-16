const Conf = require('conf');

const configStore = new Conf('cli')

module.exports = {
    // check if API token is already set
  checkTokenIsStored: () => {
    return configStore.get('token')
      ? true
      : false
  },

  getApiToken: () => {
    return configStore.get('token')
  },

  // set api token
  setApiToken: (token) => {
    configStore.set('token', token);
  },

  // clear api token
  clearApiToken: () => {
    configStore.clear('token');
  }
}