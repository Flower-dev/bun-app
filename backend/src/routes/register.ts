import { Elysia, t } from 'elysia'
import { hashSync } from 'bcrypt'
import { getDb } from '../utils/db'
import { jwtPlugin } from '../config/jwt'

const registerQuery = t.Object({
    email: t.String({
        format: 'email',
        error: 'Un email valide est requis',
    }),
    password: t.String({
        minLength: 6,
        error: 'Le mot de passe doit contenir au moins 6 caractères',
    }),
    username: t.String({
        minLength: 3,
        error: "Le nom d'utilisateur doit contenir au moins 3 caractères",
    }),
})

export const register = new Elysia().use(jwtPlugin).post(
    '/register',
    async ({ body, set, jwt, cookie: { auth } }) => {
        try {
            const db = getDb()
            db.run('BEGIN TRANSACTION')

            const userQuery = db.prepare('SELECT * FROM users WHERE email = ?')
            const existingUser = userQuery.get(body.email)

            if (existingUser) {
                db.run('ROLLBACK')
                set.status = 400
                return {
                    success: false,
                    message: 'Cet email est déjà utilisé',
                }
            }

            const hashedPassword = hashSync(body.password, 10)
            const insertUserQuery = db.prepare(
                'INSERT INTO users (email, password, username) VALUES (?, ?, ?)'
            )
            const result = insertUserQuery.run(
                body.email,
                hashedPassword,
                body.username
            )
            const userId = Number(result.lastInsertRowid)

            const token = await jwt.sign({
                userId,
                email: body.email,
                username: body.username,
            })

            auth.set({
                value: token,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 86400, // 7 days
            })

            db.run('COMMIT')
            set.status = 201
            return {
                success: true,
                user: {
                    id: userId,
                    email: body.email,
                    username: body.username,
                },
            }
        } catch (error) {
            const db = getDb()
            db.run('ROLLBACK')
            console.error("Erreur lors de l'inscription :", error)
            console.error(
                'Stack trace:',
                error instanceof Error ? error.stack : 'No stack trace'
            )
            set.status = 500
            return {
                success: false,
                message:
                    error instanceof Error ? error.message : 'Erreur serveur',
            }
        }
    },
    {
        body: registerQuery,
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
