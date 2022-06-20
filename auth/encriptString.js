const crypto = require('crypto')

module.exports = (string) => {
  return new Promise((resolve, reject) => {
    const encrypted = crypto
      .createHash('sha256')
      .update(string)
      .digest('hex')
    resolve(encrypted)
  })
}