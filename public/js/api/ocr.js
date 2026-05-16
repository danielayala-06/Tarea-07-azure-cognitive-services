async function fetchLeerTexto(imageURL) {
    const response = await fetch('/api/ocr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: imageURL })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Error desconocido del servidor.')
    }

    return data.resultado
}
