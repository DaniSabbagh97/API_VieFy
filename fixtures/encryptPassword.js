const crypto = require('crypto')

const password = '123'

const encrypted = crypto
  .createHash('sha256')
  .update(password)
  .digest('hex')
console.log(encrypted)