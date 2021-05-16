#!/usr/bin/env node

const chalk = require('chalk')
const clear = require('clear')
const title = require('./lib/appTitle')
const TicketAPI = require('./lib/TicketAPI')
const inquirer = require('./lib/inquirer')
const requestApiToken = require('./lib/reqApiToken')


// clear console
clear()

// display title
title()
// main execution
const run = async () => {
    let tokens;
    const tokenIsSet = requestApiToken.checkTokenIsStored();
    let signedIn = false;

    if (tokenIsSet) {

        console.log(chalk.green(`Authentication token found`))

        tokens = requestApiToken.getApiToken();
        
        
        signedIn = true
    } else {
        console.log(chalk.red('API token required, Please copy the token from submission email'));
        
    }
    while(!signedIn) {
        const response = await inquirer.getAPIToken()
        token_input = response;
        tokens = token_input.getApiToken;
        requestApiToken.setApiToken(tokens);
        signedIn = true;
        break;
    }
    

    while (signedIn) {
        const ticketAPI = new TicketAPI(tokens);

        console.log('\n')
        const { option } = await inquirer.mainOptions()

        
        clear();
        title();
        

        switch (option) {

        case 'View All Tickets':
            
            
            try {
                const result = await ticketAPI.getAllTickets();
                let current_page = 1;
                let pages;
                if (result.length % 25 === 0){
                    pages = result.length / 25
                } else {
                    pages = (result.length / 25) + 1
                }
                
                console.log(chalk.blue(`Viewing Page ${current_page} of ${pages}`));
                console.log((result.slice(0, 25)).join(''));
                

                while (result.length > 25){
                    
                    if (current_page === 4){
                        break;
                        
                    }
                    
                    

                    for(let i = 25; i < result.length; i+=25) {
                        
                        
                        const { page_options } = await inquirer.pageOptions();
                       
                        switch (page_options) {
                            case 'Next Page':
                                current_page++;
                                clear();
                                title();
                                console.log(chalk.blue(`Viewing Page ${current_page} of ${pages}`));
                                console.log((result.slice(i, i+25)).join(''));
                                continue;
                            
                            case 'Exit':
                                
                                break;
                                
                            
                            default:
                                console.log(result.slice(0, 25))
                        }

                        
                    }
                    
                }
            } catch (error) {
                console.log(chalk.yellow(error.message))
            }
            break;
        
        case 'View a Single Ticket':
            
            const ticketId  = await inquirer.getTicketId()

            try {
                const single_result = await ticketAPI.getSingleTickets(ticketId.ticketId); 
                console.log(single_result);
            } catch (error) {
                console.log(chalk.yellow(error.message));
            }
           
            break;

        case 'Exit':
            requestApiToken.clearApiToken();
            clear();
            process.exit()
            

        default:
            console.log(chalk.grey('Option not yet implemented'))
        }
    }
}

run()