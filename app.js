require('dotenv').config()
const express = require('express')
const path = require('path')
const { analizarSentimientos } = require('./app/text-analizer')

const port = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/sentimientos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'lnp.html'))
})

app.post('/api/analizar', async (req, res) => {
    const { texto } = req.body

    if (!texto || typeof texto !== 'string' || texto.trim().length === 0) {
        return res.status(400).json({ error: 'Debes enviar un texto para analizar.' })
    }

    try {
        const resultado = await analizarSentimientos(texto.trim())
        res.json({ resultado })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.listen(port, () => {
    console.log(`App running on:\n http://localhost:${port}`)
})
