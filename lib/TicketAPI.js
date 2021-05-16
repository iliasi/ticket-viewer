const axios = require('axios').default;
const errorHandler = require('./errorHandler');




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

module.exports = TicketAPI;