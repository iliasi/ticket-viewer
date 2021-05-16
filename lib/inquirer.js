const inquirer = require('inquirer')
const chalk = require('chalk')


module.exports = {

  mainOptions: async () =>
    inquirer.prompt([
      {
        name: 'option',
        type: 'list',
        message: 'Select an Option and Press Enter key: ',
        choices: [
          'View All Tickets',
          'View a Single Ticket',
          new inquirer.Separator(),
          'Exit',
        ]
      }
    
    ]),

    pageOptions: async () => 
      inquirer.prompt([
        {
            type: 'list',
            name: 'page_options',
            message: chalk.yellow('Press Enter key to go to the next page'),
            choices: [
                'Next Page',
            ]
                
        }
    ]),

    getAPIToken: async () => 
        inquirer.prompt([
            {
              name: 'getApiToken',
              type: 'input',
              message: 'Paste API Token and Press Enter key: ',
              validate: async (input) => {
                if (!input) {
                   return 'No response, Please paste API token';
                }
                return true;
              },
            }
        ]),
    
    getTicketId: async () => 
        inquirer.prompt([
            {
              name: 'ticketId',
              type: 'input',
              message: 'Enter Ticket ID and press Enter key: ',
              validate: async (input) => {
                if (!Number(input)) {
                  return 'Please enter number only!';
               }
               return true;
             },
            }
        ]),

};