
function errorHandler(error) {
    if (error.response.status === 401) {
      throw new Error('Invalid API token, Please get correct API token from submission email');
    } else if (error.response.status === 404) {
      if (error.response.data.error == 'RecordNotFound'){
        throw new Error('No ticket with that ID found!');
      } else {
        throw new Error('The API URL is invalid!');
      }
      
    } else if (error.response.status === 400)  {
      throw new Error('Request Error, Please try again');
    }
  }

module.exports = errorHandler;