const axios = require('axios').default;



class TicketAPI {
  constructor(apiToken) {
    this.apiToken = apiToken;
    this.apiUrl = 'https://iliasone.zendesk.com/api/v2/tickets';
  }
  

  async getAllTickets() {
    try {
      const res = await axios.get(`${this.apiUrl}.json`, {
        headers: {
          'Authorization': `Basic ${this.apiToken}`
        }
      });

      let result = [];

      res.data.tickets.forEach((tickets) => {
        result.push(`Ticket ID: ${tickets.id} | Subject: ${tickets.subject} | Status: ${tickets.status}\n`);
      });

      return result;
    } catch (error) {
      errorHandler(error);
    }
  }

  async getSingleTickets(ticketId) {
    try {
      const res = await axios.get(`${this.apiUrl}/${ticketId}.json`, {
        headers: {
          'Authorization': `Basic ${this.apiToken}`
        }
      });

      let result = `Ticket ID: ${res.data.ticket.id} | Subject: ${res.data.ticket.subject} | Status: ${res.data.ticket.status}\n`;


      return result;
    } catch (error) {
      errorHandler(error);
    }
  }

  
}

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

module.exports = TicketAPI;