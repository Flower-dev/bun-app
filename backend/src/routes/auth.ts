import { Elysia, t } from 'elysia'
import { compareSync } from 'bcrypt'
import { getDb } from '../utils/db'
import { jwtPlugin } from '../config/jwt'

const authQuery = t.Object({
    email: t.String({
        format: 'email',
        error: 'Un email valide est requis',
    }),
    password: t.String({
        minLength: 6,
        error: 'Le mot de passe doit contenir au moins 6 caractères',
    }),
})

type User = {
    id: number
    email: string
    password: string
    username: string
}

export const auth = new Elysia({ prefix: '/auth' })
    .use(jwtPlugin)
    .post(
        '/login',
        async ({ body, set, jwt, cookie: { auth } }) => {
            try {
                const stmt = getDb().prepare(
                    'SELECT * FROM users WHERE email = ?'
                )
                const user = stmt.get(body.email) as User | null

                if (!user || !compareSync(body.password, user.password)) {
                    set.status = 401
                    return {
                        success: false,
                        message: 'Email ou mot de passe incorrect',
                    }
                }

                const token = await jwt.sign({
                    userId: user.id,
                    email: user.email,
                    username: user.username,
                })

                auth.set({
                    value: token,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    maxAge: 7 * 86400, // 7 days
                })

                set.status = 200
                return {
                    success: true,
                    user: {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                    },
                }
            } catch (error) {
                console.error('Erreur lors de la connexion :', error)
                set.status = 500
                return {
                    success: false,
                    message: 'Erreur serveur',
                }
            }
        },
        {
            body: authQuery,
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
    .post(
        '/logout',
        ({ set, cookie: { auth } }) => {
            auth.set({
                value: '',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 0,
            })

            set.status = 200
            return {
                success: true,
                message: 'Déconnexion réussie',
            }
        },
        {
            response: t.Object({
                success: t.Boolean(),
                message: t.String(),
            }),
        }
    )
