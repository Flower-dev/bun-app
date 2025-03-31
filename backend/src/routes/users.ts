import { Elysia, t } from 'elysia'
import { getDb } from '../utils/db'
import { jwtPlugin } from '../config/jwt'

type User = {
    id: number
    email: string
    username: string
}

export const users = new Elysia().use(jwtPlugin).get(
    '/users',
    async ({ set, jwt, cookie: { auth } }) => {
        try {
            if (!auth.value) {
                set.status = 401
                return {
                    success: false,
                    message: 'Non authentifié',
                }
            }

            const payload = await jwt.verify(auth.value)
            if (!payload) {
                set.status = 401
                return {
                    success: false,
                    message: 'Token invalide',
                }
            }

            const db = getDb()
            const rows = db
                .query('SELECT id, email, username FROM users')
                .all() as User[]

            set.status = 200
            return {
                success: true,
                users: rows,
            }
        } catch (error) {
            console.error(
                'Erreur lors de la récupération des utilisateurs:',
                error
            )
            set.status = 500
            return {
                success: false,
                message: 'Erreur serveur',
            }
        }
    },
    {
        response: t.Object({
            success: t.Boolean(),
            users: t.Optional(
                t.Array(
                    t.Object({
                        id: t.Number(),
                        email: t.String(),
                        username: t.String(),
                    })
                )
            ),
            message: t.Optional(t.String()),
        }),
    }
)

export const user = new Elysia().use(jwtPlugin).get(
    '/user/:id',
    async ({ params, set, jwt, cookie: { auth } }) => {
        try {
            if (!auth.value) {
                set.status = 401
                return {
                    success: false,
                    message: 'Non authentifié',
                }
            }

            const payload = await jwt.verify(auth.value)
            if (!payload) {
                set.status = 401
                return {
                    success: false,
                    message: 'Token invalide',
                }
            }

            const db = getDb()
            const stmt = db.prepare(
                'SELECT id, email, username FROM users WHERE id = ?'
            )
            const user = stmt.get(params.id) as User | null

            if (!user) {
                set.status = 404
                return {
                    success: false,
                    message: 'Utilisateur non trouvé',
                }
            }

            set.status = 200
            return {
                success: true,
                user,
            }
        } catch (error) {
            console.error(
                "Erreur lors de la récupération de l'utilisateur:",
                error
            )
            set.status = 500
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
        response: t.Object({
            success: t.Boolean(),
            user: t.Optional(
                t.Object({
                    id: t.Number(),
                    email: t.String(),
                    username: t.String(),
                })
            ),
            message: t.Optional(t.String()),
        }),
    }
)
