import { Elysia, t } from 'elysia'
import { getDb } from '../utils/db'

export const users = new Elysia().get('/users', async () => {
    const db = getDb()
    const rows = db.query('SELECT id, email, username FROM users').all()
    return rows
})

export const user = new Elysia().get(
    '/user/:id',
    async ({ params }) => {
        try {
            const db = getDb()
            const stmt = db.prepare(
                'SELECT id, email, username FROM users WHERE id = ?'
            )
            const user = stmt.get(params.id)

            if (!user) {
                return {
                    success: false,
                    message: 'Utilisateur non trouvé',
                }
            }

            return {
                success: true,
                user,
            }
        } catch (error) {
            console.error(
                "Erreur lors de la récupération de l'utilisateur:",
                error
            )
            return {
                success: false,
                message: 'Erreur serveur',
            }
        }
    },
    {
        params: t.Object({
            id: t.String(),
        }),
    }
)
