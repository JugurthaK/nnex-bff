const express = require('express')
const axios = require('axios')
const cors = require('cors')
const utils = require('./utils')
const { getArticle } = require('./utils')
const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 8080

//
// https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pmc&id=7664070&tool=my_tool&email=my_email@example.com

app.post('/articles', async (req, res) => {
  let terms = ''
  if (req.body.terms.length > 0) {
    terms = req.body.terms.join('+')
    start = req.body.start
    console.log('Start', start)
    let data = await utils.getArticles(terms, start)
    res.send(data)
  } else res.send({ articles: null, error: 'Terms not found' })
})

// 7664306

app.listen(PORT)
