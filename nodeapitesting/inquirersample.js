const inquirer = require('inquirer');

inquirer.prompt([{
  message: 'Hello, how are you?',
  name: 'howareyou',
  type: 'confirm'
},{ message: 'What do you do?',
name: 'whatdoyoudo',
type: 'input'
}, {message: 'What is your name?', name: 'whatisyourname', type: 'input'}])
.then(allAnswers => {
  console.log('all answers = ', allAnswers);
}).catch(err => {
  console.log('err = ', err);
})