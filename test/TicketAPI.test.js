const TicketAPI = require('../lib/TicketAPI')


test('New instance of TicketAPI class', () => {
    expect(newticketApi = new TicketAPI('hetsgdtteu3')).toBeInstanceOf(TicketAPI);
  });