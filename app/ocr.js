require('dotenv').config()
const suscriptionkey = process.env.COGNITIVE_KEY
const endpoint = process.env.COGNITIVE_ENDPOINT

const apiUrl = `${endpoint}/vision/v3.2/read/analyze`

async function leerTexto(imageURL) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            "Ocp-Apim-Subscription-Key": suscriptionkey,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: imageURL })
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error.message)
    }

    const operationLocation = response.headers.get('operation-location')

    let result = null
    while (true) {
        const checkResponse = await fetch(operationLocation, {
            headers: { "Ocp-Apim-Subscription-Key": suscriptionkey }
        })
        result = await checkResponse.json()

        if (result.status === 'succeeded') break
        if (result.status === 'failed') throw new Error('Azure no pudo analizar la imagen.')

        await new Promise(resolve => setTimeout(resolve, 1000))
    }

    const lineas = []
    result.analyzeResult.readResults.forEach(page => {
        page.lines.forEach(line => lineas.push(line.text))
    })

    return { lineas }
}

module.exports = { leerTexto }
