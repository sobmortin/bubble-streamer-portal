export default defineEventHandler(async (event) => {
    const body = await readMultipartFormData(event) // Use this instead of readBody

    // Create a new FormData object to forward
    const formData = new FormData()

    // Append the files and data maintaining the same field names
    body.forEach((part) => {
        if (part.name === 'image') {
            formData.append('image', new Blob([part.data]), part.filename)
        } else if (part.name === 'data') {
            formData.append('data', part.data.toString())
        }
    })

    const thing = await $fetch('http://localhost:8000/get-masks', {
        method: 'POST',
        // Send as FormData and let fetch set the correct headers
        body: formData,
    })

    return thing
})
