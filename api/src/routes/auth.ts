import { Elysia, t } from 'elysia'
import { compareSync } from 'bcrypt'
import { getDb } from '../utils/db'
import { jwtPlugin } from '../config/jwt'

const authQuery = t.Object({
    email: t.String({
        format: 'email',
        error: 'A valid email is required',
    }),
    password: t.String({
        minLength: 6,
        error: 'Password must contain at least 6 characters',
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
                        message: 'Invalid email or password',
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
                console.error('Error during login:', error)
                set.status = 500
                return {
                    success: false,
                    message: 'Server error',
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
                message: 'Successfully logged out',
            }
        },
        {
            response: t.Object({
                success: t.Boolean(),
                message: t.String(),
            }),
        }
    )
