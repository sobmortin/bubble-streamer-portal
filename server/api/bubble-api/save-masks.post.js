export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    console.log({ body })

    const thing = await $fetch('http://localhost:8000/save-masks', {
        method: 'POST',
        // Send as FormData and let fetch set the correct headers
        body: body,
    })

    return thing
})
