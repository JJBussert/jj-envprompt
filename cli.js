#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { envprompt } from './src/index.js';

const argv = yargs(hideBin(process.argv))
  .scriptName('jj-envprompt')
  .command(
    '$0 <targetKey>',
    'Prompt the user to enter a value for the target environment variable',
    (yargs) => {
      yargs
        .positional('targetKey', {
          describe: 'The target environment variable key',
          type: 'string',
        })
      }
  )
  .option('e', {
    alias: 'envFile',
    type: 'string',
    default: '.env',
    describe: 'The env file to save the environment variable',
  })
  .option('v', {
    alias: 'verbose',
    type: 'boolean',
    default: 'false',
    describe: 'Verbose console output'
  })
  .demandCommand(1, 'You must provide a targetKey')
  .argv;

  envprompt(argv.targetKey, argv.verbose, argv.envFile);