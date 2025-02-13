import { Elysia } from 'elysia'
import { createTable, getDb } from './utils/db'

const app = new Elysia()

// Route pour récupérer tous les utilisateurs
app.get('/', async () => {
    try {
        const db = getDb()
        const rows = db.query('SELECT id, email FROM users').all()
        return rows
    } catch (error) {
        console.error('Error fetching users:', error)
        return { error: 'Internal server error' }
    }
})

// Route pour ajouter un utilisateur
app.post('/users', async ({ body }) => {
    try {
        const db = getDb()
        const { username, email, password } = body as {
            username: string
            email: string
            password: string
        }

        if (!username || !email || !password) {
            return { error: 'Missing required fields' }
        }

        db.run(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, password]
        )

        return { message: 'User created successfully' }
    } catch (error) {
        console.error('Error creating user:', error)
        return { error: 'Internal server error' }
    }
})

// Lancement du serveur
app.listen(3000, async () => {
    await createTable()
    console.log('Server is running on http://localhost:3000')
})
