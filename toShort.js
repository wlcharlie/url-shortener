function toShort() {
  const pattern = 'ABCDEFGHIJKLMNOPQUSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz'
  let shortUrl = []

  for (let i = 0; i < 5; i++) {
    let random = Math.floor(Math.random() * pattern.length)
    shortUrl.push(pattern[random])
  }

  return shortUrl.join('')
}

module.exports = toShort