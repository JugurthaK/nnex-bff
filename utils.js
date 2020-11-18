const { rejects } = require('assert')
const { resolve } = require('path')
const xml2js = require('xml2js')
const axios = require('axios')
const { type } = require('os')

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

const BASE_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils'

async function getArticles(terms, start) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/esearch.fcgi?db=pmc&term=${terms}&tool=nnex&email=jugurthak@protonmail.com&retmax=2&retstart=${start}&retmode=json`
    )
    const ids = data.esearchresult.idlist
    return Promise.all(
      ids.map((id) =>
        axios
          .get(
            `${BASE_URL}/efetch.fcgi?db=pmc&id=${+id}&tool=nnex&email=jugurthak@protonmail.com`
          )
          .then(async (response) => {
            let data = await converter(response.data)
            let pmid =
              data['pmc-articleset'].article[0].front[0]['article-meta'][0][
                'article-id'
              ][0]['_']

            let title =
              data['pmc-articleset'].article[0].front[0]['article-meta'][0][
                'title-group'
              ][0]['article-title'][0]
            if (typeof title !== 'string') title = title._

            let abstract
            try {
              abstract =
                data['pmc-articleset'].article[0].front[0]['article-meta'][0]
                  .abstract[0].p[0]._
            } catch (e) {
              abstract = ''
            }

            let day
            try {
              day =
                data['pmc-articleset'].article[0].front[0]['article-meta'][0][
                  'pub-date'
                ][0].day[0]
            } catch {
              day = ''
            }

            let month =
              data['pmc-articleset'].article[0].front[0]['article-meta'][0][
                'pub-date'
              ][0].month[0]

            let year =
              data['pmc-articleset'].article[0].front[0]['article-meta'][0][
                'pub-date'
              ][0].year[0]

            return {
              pmid,
              title,
              abstract,
              date: `${day} ${fromIntToMonth(month)} ${year}`,
            }
          })
      )
    )
  } catch (error) {
    console.error(error)
  }
}

module.exports = { converter, fromIntToMonth, getArticles }
