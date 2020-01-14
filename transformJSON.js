const { Transform } = require('stream')

const keysToSkip = ['Amount']
const keysToConvertToFloat = ['Price']

const transformJSON = new Transform({
  transform: (chunk, encoding, done) => {
    try {
      const item = JSON.parse(chunk.toString())

      const result = Object.keys(item).reduce((acc, key) => {
        if (keysToSkip.includes(key)) return acc

        const value = item[key]

        const convertedValue = keysToConvertToFloat.includes(key)
          ? Number.parseFloat(value)
          : value

        return {
          ...acc,
          [key.toLowerCase()]: convertedValue,
        }
      }, {})

      done(null, JSON.stringify(result) + '\n')
    } catch (e) {
      done(e)
    }
  },
})

export default transformJSON