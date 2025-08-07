// mais de uma valor 

const x = 10 
const y = 'algum valor'
const z = [1, 2]

console.log(x, y, z)

// contagem de impressões 
console.count(`o valor de x é: ${x}, contagem`)
console.count(`o valor de x é: ${x}, contagem`)
console.count(`o valor de x é: ${x}, contagem`)
console.count(`o valor de x é: ${x}, contagem`)

// Variavel entre string

console.log(`O nome é %s, ele é programador'`)

// limpar o console

setTimeout(() => {
  console.clear()
}, 2000)