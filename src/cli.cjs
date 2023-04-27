#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

import('./envprompt.js').then(({ envprompt }) => {
  const argv = yargs(hideBin(process.argv))
  .command(
    '$0 <targetKey>',
    'Prompt the user to enter a value for the target environment variable',
    (yargs) => {
      yargs
        .positional('targetKey', {
          describe: 'The target environment variable key',
          type: 'string',
        })
        .option('envFile', {
          alias: 'e',
          type: 'string',
          default: '.env',
          describe: 'The env file to save the environment variable',
        });
    },
    ({ targetKey, envFile }) => {
      envprompt(targetKey, envFile);
    }
  )
  .help().argv;

  
}).catch(err => {
  console.error('Error:', err);
});

