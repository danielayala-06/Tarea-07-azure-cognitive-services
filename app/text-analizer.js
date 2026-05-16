require('dotenv').config()
const suscriptionkey = process.env.FOUNDRY_KEY
const endpoint = process.env.FOUNDRY_ENPOINT

// Concatenamos nuestra base_url con el servicio que integraremos
const URL = `${endpoint}/language/:analyze-text?api-version=2023-04-01`

async function analizarSentimientos(){
    try {
        
        const documentoAnlizar = {
            kind: "SentimentAnalysis",
            analysisInput: {
                documents: [
                    {
                        id: "1",
                        language: "es",
                        text: "Que abra mil puertas Una hoja cae; algo pasa volando Cuanto miren los ojos creado sea, Y el alma del oyente quede temblando."
                    },
                    {
                        id: "2",
                        language: "es",
                        text: "Mientras la luna cubria su bello rostro, rompio a llorar y el solo pudo alejarse sabiendo que perdio al amor de su vida"
                    }
                ]// contenedor de todos los documentos
            }
        } // documentosAnalizar 

        console.log("Enviando multilpes documento a Azure...")
        
        const response = await fetch(URL,{
             method: 'POST',
            headers:{
                "Ocp-Apim-Subscription-Key": suscriptionkey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(documentoAnlizar)
        })

        if(!response.ok){
            const errorData = await response.json()
			throw new Error(errorData.error.message)
		}

        const data = await response.json()
        console.log(data)

        // Enviando los resultados
        data.results.documents.forEach(doc => {
            // Se muestra el id de cada documento
            console.log(`Documento # ${doc.id}`)

            // Contenido analizado
            const contenidoOriginal = documentoAnlizar.analysisInput.documents.find(d => d.id === doc.id).text

            console.log(contenidoOriginal)

            //PUNTUACIONES DE CONFIANZA
            const scores = doc.confidenceScores
            console.log("Puntuaciones de confianza:")
            console.log(`- positivo: ${scores.positive}`)
            console.log(`- negativo: ${scores.negative}`)
            console.log(`- neutral: ${scores.neutral}`)
        });

    } catch (error) {
        console.error(error.message)
    }
}
analizarSentimientos()