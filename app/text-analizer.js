require('dotenv').config()
const suscriptionkey = process.env.FOUNDRY_KEY
const endpoint = process.env.FOUNDRY_ENPOINT

const URL = `${endpoint}/language/:analyze-text?api-version=2023-04-01`

async function analizarSentimientos(texto) {
    const body = {
        kind: "SentimentAnalysis",
        analysisInput: {
            documents: [{ id: "1", language: "es", text: texto }]
        }
    }

    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            "Ocp-Apim-Subscription-Key": suscriptionkey,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error.message)
    }

    const data = await response.json()
    const doc = data.results.documents[0]

    return {
        texto,
        sentimiento: doc.sentiment,
        puntuaciones: doc.confidenceScores
    }
}

module.exports = { analizarSentimientos }
