const { rejects } = require('assert')
const { resolve } = require('path')
const xml2js = require('xml2js')

async function converter(xml) {
  const result = await new Promise((resolve, rejects) =>
    xml2js.parseString(xml, (err, res) => {
      if (err) rejects(err)
      else resolve(res)
    })
  )

  return result
}

function fromIntToMonth(month) {
  const MONTHS = [
    'Janvier',
    'Fevrier',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Aout',
    'Septembre',
    'Octobre',
    'Novembre',
    'Decembre',
  ]

  return MONTHS[+month - 1]
}

module.exports = { converter, fromIntToMonth }
