async function fetchAnalizarSentimientos(texto) {
    const response = await fetch('/api/analizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Error desconocido del servidor.')
    }

    return data.resultado
}
