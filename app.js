const { config } = require('dotenv')

const port = process.env.PORT || 3000;

const express = require('express')
const app = express()

app.use(express.json())// Definimos la comunicacion en JSON

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App runnign on:\n http://localhost:${port}`)
})
