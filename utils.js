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

module.exports = { converter }
