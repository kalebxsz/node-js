// modulos externos 
const inquirer = require('inquirer')
const chalk = require('chalk')

// modulos internos 
const fs = require('fs')

console.log('Iniciamos o Accounts')

operation()

function operation() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action', 
      message: 'O que você quer fazer? ',
      choices: ['Criar conta', 'Consultar saldo', 'Depositar', 'Sacar', 'Sair'],
    },
  ])
  .then((answer) => {
    const action = answer ['action']

    if(action === 'Criar conta'){
      createAccount()
    } else if(action === 'Depositar') {
      deposit()

    } else if(action === 'Consultar saldo') {

    } else if(action === 'Sacar') {


    } else if(action === 'Sair'){
      console.log(chalk.bgBlue.black('Obrigado por usar nosso banco!'))
      process.exit()
      

    }
  })
  .catch((err) => console.log(err))
}

// create account
function createAccount() {
  console.log(chalk.bgGreen.black('Obrigado por escolher o nosso banco'));
  console.log(chalk.green('Defina as opções da sua conta a seguir'))  
  
  buildAccount()
}

function buildAccount() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Digite um nome para a sua conta:'
    },
  ]).then((answer) => {
    const accountName = answer['accountName']

    console.info(accountName)

    // Verificação de arquivo criado
    if(!fs.existsSync('accounts')){
      fs.mkdirSync('accounts')
    }

    // Verificar se usuário já existe 

    if(fs.existsSync(`accounts/${accountName}.json`)) {
      console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome!'),)
      buildAccount()
    }
    
    fs.writeFileSync(`accounts/${accountName}.json`,
       '{"balance": 0}',
        function(err) {
      console.log(err)
      },
  )

  console.log(chalk.green('Parabens sua conta foi criada com sucesso'));
  operation()
  

  }).catch((err) => console.log(err))
}


// add an amount to user account
function deposit() {
   
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Qual o nome da sua conta?'
    }
  ])
  .then((answer) => {
    const accountName = answer['accountName']
    // verificando se a conta existe
    if(!checkAccount(accountName)) {
      return deposit()
    }

    inquirer.prompt([
      {
        name: 'amount',
        message: 'Quanto você deseja depositar? '
      }
    ]).then((answer) =>{

      const amount = answer['amount']


      //ADD AN AMOUNT 
      addAmount(accountName, amount)
      operation()

    }).catch((err) => console.log(err))
    
  })
  .catch((err) => console.log(err))
}

function checkAccount(accountName) {
  if(!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black('Essa conta não existe, escolha outro nome!'))
    return false
  }
  return true
}
// FUNÇÃO PARA ADICIO O VALOR E INFORMATIVO DE ERRO CASO NÃO SEJA ENVIADO NADA 
function addAmount(accountName, amount){
    const accountData = getAccount(accountName)

    if(!amount) {
      console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!!'))
      return deposit()
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(
      `accounts/${accountName}.json`,
    JSON.stringify(accountData),
  function(err){
    console.log(err)
  },

  console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta.`))
)
}

/// FUNÇÃO PARA ENVIAR O VALOR PARA A CONTA 
function getAccount(accountName){
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`,{
    encoding: 'utf-8',
    flag: 'r'
  })
  return JSON.parse(accountJSON)
}