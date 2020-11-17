const express = require('express')
const axios = require('axios')
const utils = require('./utils')
const app = express()
app.use(express.json())

const PORT = process.env.PORT || 8080
const BASE_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils'

//
// https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pmc&id=7664070&tool=my_tool&email=my_email@example.com

app.post('/articles', (req, res) => {
  let terms = ''
  if (req.body.terms.length > 0) {
    terms = req.body.terms.join('+')
    axios
      .get(
        `${BASE_URL}/esearch.fcgi?db=pmc&term=${terms}&tool=nnex&email=jugurthak@protonmail.com&retmax=200&retmode=json`
      )
      .then((response) => res.json(response.data))
      .catch((err) => res.json({ articles: null, error: err.message }))
  } else res.send({ articles: null, error: 'Terms not found' })
})

// 7664306

app.get('/article/:id', (req, res) => {
  axios
    .get(
      `${BASE_URL}/efetch.fcgi?db=pmc&id=${req.params.id}&tool=nnex&email=jugurthak@protonmail.com`
    )
    .then(async (response) => {
      let data = await utils.converter(response.data)

      let pmid =
        data['pmc-articleset'].article[0].front[0]['article-meta'][0][
          'article-id'
        ][0]['_']

      let title =
        data['pmc-articleset'].article[0].front[0]['article-meta'][0][
          'title-group'
        ][0]['article-title'][0]

      let abstract =
        data['pmc-articleset'].article[0].front[0]['article-meta'][0]
          .abstract[0].p[0]._

      res.json({ pmid: pmid, title: title, abstract: abstract })
    })
    .catch((err) => res.json({ articles: null, error: err.message }))
})

app.listen(PORT)
