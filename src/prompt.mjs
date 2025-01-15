import inquirer from 'inquirer';
// const inquirer = require('inquirer');
async function getUserPreferences() {
 return inquirer.prompt([
  {
   type: 'input',
   name: 'projectName',
   message: 'Enter your project name:',
   default: 'my-vite-app',
  },
  {
   type: 'checkbox',
   name: 'libraries',
   message: 'Select the libraries to include:',
   choices: [
    { name: 'Tailwind CSS', value: 'tailwind' },
    { name: 'ShadCN', value: 'shadcn' },
    { name: 'Framer Motion', value: 'framerMotion' },
    { name: 'React Router DOM', value: 'reactRouter' },
    { name: 'React Icons', value: 'reactIcons' },
   ],
  },
 ]);
}

export { getUserPreferences };
