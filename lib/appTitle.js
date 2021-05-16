const chalk = require('chalk');
const figlet = require('figlet');

title = () => {
    console.log(`${
        chalk.yellow(
            figlet.textSync('Zendesk Ticket Viewer', {
                horizontalLayout: 'controlled smushing'
            })
        )

    }\n`)
}

module.exports = title;