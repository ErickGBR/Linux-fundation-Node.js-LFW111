#!/usr/bin/env node
import got from 'got'

const API = 'http://127.0.0.1:3000'

const usage = (msg = 'Back office for My App') => {
  console.log(`\n${msg}\n`)
  console.log(' usage: my-cli --amount <amount> <id>')
  console.log('    or: my-cli <id> --amount <amount>')
  console.log('    or: my-cli <id> <amount>')
}
const argv = process.argv.slice(2)
if (argv.length < 2) {
  usage()
  process.exit(1)
}

let id, amount

const amountIndex = argv.indexOf('--amount')
if (amountIndex !== -1) {
  if (argv.length < 3) {
    usage('Error: --amount flag requires both amount and id')
    process.exit(1)
  }
  if (amountIndex === 0) {
    amount = Number(argv[1])
    id = argv[2]
  } else if (amountIndex === 1) {
    id = argv[0]
    amount = Number(argv[2])
  } else {
    usage('Error: invalid argument format')
    process.exit(1)
  }
} else {
  if (argv.length < 2) {
    usage()
    process.exit(1)
  }
  id = argv[0]
  amount = Number(argv[1])
}

if (!id || id.trim() === '') {
  usage('Error: id must be provided')
  process.exit(1)
}

if (Number.isNaN(amount) || Number.isInteger(amount) === false) {
  usage('Error: amount must be an integer')
  process.exit(1)
}

try {
  await got.post(`${API}/orders/${id}`, {
    json: { amount }
  })
} catch (err) {
  console.log(err.message)
  process.exit(1)
}

