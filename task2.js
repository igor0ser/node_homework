const fs = require('fs')
const csv = require('csvtojson')
const transformJSON = require('./transformJSON')

const createErrorLogger = (proccessName) => (error) => {
  console.group(`Error while happened ${proccessName}`)
  console.log(error.message)
  console.groupEnd()
}

const csvToTxt = (csvPath, txtPath) => {
  const readStream = fs.createReadStream(csvPath);
  const writeStream = fs.createWriteStream(txtPath);

  readStream
    .on('error', createErrorLogger('reading csv file'))
    .pipe(csv())
    .on('error', createErrorLogger('converting csv to json'))
    .pipe(transformJSON)
    .on('error', createErrorLogger('transforming json to proper format'))
    .pipe(writeStream)
    .on('error', createErrorLogger('writing txt file'))
    .on('close', () => console.log('File successfully converted.'))
}

csvToTxt('./csv/data.csv', './data.txt')

