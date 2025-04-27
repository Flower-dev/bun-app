import { jwt } from '@elysiajs/jwt'

function generateRandomSecret(length = 32): string {
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
    let result = ''
    const randomValues = new Uint8Array(length)
    crypto.getRandomValues(randomValues)
    for (let i = 0; i < length; i++) {
        result += chars.charAt(randomValues[i] % chars.length)
    }
    return result
}

export const jwtPlugin = jwt({
    name: 'jwt',
    secret: process.env.JWT_SECRET || generateRandomSecret(),
})
