import inquirer from 'inquirer'

inquirer.prompt([{
  name: 'p1',
  message: 'Qual foi a nota da sua prova? ',
},
{
  name: 'p2',
  message: 'Qual foi a nota da segunda prova? ',
}])
.then((answers) => {
  console.log(answers)
  const media = (parseInt(answers.p1) + parseInt(answers.p2)) / 2
  console.log(`A média é: ${media}`)
})
.catch((err) => console.log(err))