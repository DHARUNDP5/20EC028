const express = require('express')
const axios = require('axios')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const app = express()

async function fetchNumbersFromUrl(url) {
    try {
      const response = await axios.get(url, { timeout: 5000 })
      return response.data.numbers || []

    } catch (error) {
      return []
    }
  }

app.get('/numbers', async (req, res) => {
  const urls = req.query.url

  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'Invalid Urls' })
  }

  try {
    const promises = urls.map(fetchNumbersFromUrl)
    const numbersArrays = await Promise.all(promises)

    const numbersSet = new Set()
    numbersArrays.forEach(numbers => {
      numbers.forEach(number => numbersSet.add(number))
    })

    const numbers = Array.from(numbersSet).sort((a, b) => a - b)
    return res.json({ numbers })
  } catch (err) {
    return res.status(400).json({ error: 'Invalid Urls' })
  }
})

app.listen(port, () => { console.log(`Server started on port ${port}` )
})