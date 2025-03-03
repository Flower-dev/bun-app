import { Elysia, t } from 'elysia'
import { jwt } from '@elysiajs/jwt'
import { compareSync } from 'bcrypt'
import { getDb } from '../utils/db'

const authQuery = t.Object({
    email: t.String(),
    password: t.String(),
})

const db = getDb()

export const auth = new Elysia({ prefix: '/auth' })
    .use(
        jwt({
            name: 'jwt',
            secret: process.env.JWT_SECRET || 'votre_secret_jwt',
        })
    )
    .post(
        '/login',
        async ({ body, jwt }) => {
            try {
                const user = await db.user.findUnique({
                    where: { email: body.email },
                })

                if (!user || !compareSync(body.password, user.password)) {
                    return {
                        status: 401,
                        message: 'Email ou mot de passe incorrect',
                    }
                }

                // Générer le token JWT
                const token = await jwt.sign({
                    userId: user.id,
                    email: user.email,
                })

                return {
                    status: 200,
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                    },
                }
            } catch (error) {
                console.error('Erreur lors de la connexion :', error)
                return {
                    status: 500,
                    message: 'Erreur serveur',
                }
            }
        },
        { body: authQuery }
    )
