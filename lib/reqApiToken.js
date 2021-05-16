const Conf = require('conf');

const configStore = new Conf('cli')

module.exports = {
    // check if API token is already set
  checkTokenIsStored: () => {
    return configStore.get('token')
      ? true
      : false
  },

  // get API token
  getApiToken: () => {
    return configStore.get('token')
  },

  // set API token
  setApiToken: (token) => {
    configStore.set('token', token);
  },

  // clear API token
  clearApiToken: () => {
    configStore.clear('token');
  }
}