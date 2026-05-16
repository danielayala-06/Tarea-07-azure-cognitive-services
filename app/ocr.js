require('dotenv').config()
// Variables de entorno
const suscriptionkey = process.env.COGNITIVE_KEY
const endpoint = process.env.COGNITIVE_ENDPOINT

const url = `${endpoint}/vision/v3.2/read/analyze`

const imageURL = `https://cdn.culturagenial.com/es/imagenes/poemas-mas-famosos-de-la-lengua-espanola-4-cke.jpg`

async function leerTexto(){
    try {
        console.log("Enviando imagen a Azure..")

        const response = await fetch(url,{
            method: 'POST',
			headers: {
                "Ocp-Apim-Subscription-Key": suscriptionkey,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({url: imageURL})
        })

       if(!response.ok){
			const errorData = await response.json()
			throw new Error(errorData.error.message)
		}

        // Luego de obtener una respuesta a nuestra peticion, esperamos el procesamiento de la imagen
        const operationLocation= response.headers.get('operation-location')
        console.log('Procesando... esperando resultados')

        // PARTE 2: Consultar URL de la operacion hasta que se encuentre como "succes" 
        let result = null;
        while(true){
            const checkResponse = await fetch(operationLocation,{
                headers: {"Ocp-Apim-Subscription-Key": suscriptionkey}
            })
            
            result = await checkResponse.json();

            if(result.status === 'succeeded')break; // Escapamos el while
            if(result.status === 'failed') throw new Error('Error analizando datos...');
            
            // Esperamos 1 segundo para voler a intentarlo
            await new Promise(resolve => setTimeout(resolve, 1000))
        }

        // PARTE 3: Extraer y mostrar el texto detectado
        console.log("texto detectado")
        result.analyzeResult.readResults.forEach(page => {
            page.lines.forEach(line => {console.log(line.text)})
        });

    } catch (error) {
        console.error(`Error en el servicio: ${error.message}`)
    }
}

leerTexto()
