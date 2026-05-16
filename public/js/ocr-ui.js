const btnAnalizar = document.getElementById('btn-analizar')
const loading = document.getElementById('loading')
const resultados = document.getElementById('resultados')
const errorBox = document.getElementById('error-box')
const errorMsg = document.getElementById('error-msg')

btnAnalizar.addEventListener('click', async () => {
    const url = document.getElementById('input-url').value.trim()

    if (!url) {
        alert('Por favor ingresa una URL de imagen.')
        return
    }

    mostrarLoading(true)
    resultados.classList.add('d-none')
    errorBox.classList.add('d-none')

    try {
        const resultado = await fetchLeerTexto(url)
        renderResultados(resultado)
    } catch (error) {
        mostrarError(error.message)
    } finally {
        mostrarLoading(false)
    }
})

function renderResultados(resultado) {
    document.getElementById('texto-resultado').textContent = resultado.lineas.join('\n')
    resultados.classList.remove('d-none')
    resultados.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function mostrarError(mensaje) {
    errorMsg.textContent = mensaje
    errorBox.classList.remove('d-none')
}

function mostrarLoading(show) {
    loading.classList.toggle('d-none', !show)
    btnAnalizar.disabled = show
}
