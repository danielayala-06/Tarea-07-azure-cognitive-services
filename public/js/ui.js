const btnAnalizar = document.getElementById('btn-analizar')
const loading = document.getElementById('loading')
const resultados = document.getElementById('resultados')
const textoContainer = document.getElementById('textos-container')


btnAnalizar.addEventListener('click', async () => {
    const input = textoContainer.querySelector('.texto-input')
    const texto = input.value.trim()

    if (texto.length < 50) {
        alert('Por favor ingrese un texto mas largo.')
        return
    }

    mostrarLoading(true)
    resultados.classList.add('d-none')

    try {
        const doc = await fetchAnalizarSentimientos(texto)
        renderResultados(doc)
    } catch (error) {
        mostrarError(error.message)
    } finally {
        mostrarLoading(false)
    }
})

function renderResultados(doc) {
    const positivo = Math.round(doc.puntuaciones.positive * 100)
    const negativo = Math.round(doc.puntuaciones.negative * 100)
    const neutral  = Math.round(doc.puntuaciones.neutral  * 100)

    document.getElementById('bar-positivo').style.width = `${positivo}%`
    document.getElementById('val-positivo').textContent  = `${positivo}%`

    document.getElementById('bar-negativo').style.width = `${negativo}%`
    document.getElementById('val-negativo').textContent  = `${negativo}%`

    document.getElementById('bar-neutral').style.width = `${neutral}%`
    document.getElementById('val-neutral').textContent  = `${neutral}%`

    resultados.classList.remove('d-none')
    resultados.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function mostrarError(mensaje) {
    alert(mensaje)
}

function mostrarLoading(show) {
    loading.classList.toggle('d-none', !show)
    btnAnalizar.disabled = show
}