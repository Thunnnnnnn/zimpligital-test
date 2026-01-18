export default defineEventHandler(() => {
    return {
        message: 'Hello Nuxt 4!',
        timestamp: new Date().toISOString(),
        version: '4.0.0'
    }
})