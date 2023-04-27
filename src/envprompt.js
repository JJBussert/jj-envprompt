import { envset } from 'jj-envset';
import inquirer from 'inquirer';

function envprompt(targetKey, envFilePath = '.env') {
    const questions = [
        {
            type: 'input',
            name: targetKey,
            message: `Please enter the value for ${targetKey}:`
        }
    ];

    inquirer.prompt(questions)
        .then((answers) => {
            console.log(answers);
            envset(targetKey, answers[targetKey], envFilePath);
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log("Prompt couldn't be rendered in the current environment");
            } else {
                console.log('Something else went wrong');
            }
        });
    
}

const isMainModule = import.meta.url === new URL(import.meta.url).pathname;
  
if (isMainModule) {
    envprompt();
}

export { envprompt };