import { Elysia, t } from 'elysia'
import { getDb } from '../utils/db'
import { jwtPlugin } from '../config/jwt'

type Feed = {
    id: number
    url: string
}

export const feeds = new Elysia().use(jwtPlugin).get(
    '/feeds',
    async ({ set, jwt, cookie: { auth } }) => {
        try {
            if (!auth.value) {
                set.status = 401
                return {
                    success: false,
                    message: 'Not authenticated',
                }
            }

            const payload = await jwt.verify(auth.value)
            if (!payload) {
                set.status = 401
                return {
                    success: false,
                    message: 'Invalid token',
                }
            }

            const db = getDb()
            const rows = db.query('SELECT id, url FROM feeds').all() as Feed[]

            set.status = 200
            return {
                success: true,
                feeds: rows,
            }
        } catch (error) {
            console.error('Error while fetching feeds:', error)
            set.status = 500
            return {
                success: false,
                message: 'Server error',
            }
        }
    },
    {
        response: t.Object({
            success: t.Boolean(),
            feeds: t.Optional(
                t.Array(
                    t.Object({
                        id: t.Number(),
                        url: t.String(),
                    })
                )
            ),
            message: t.Optional(t.String()),
        }),
    }
)

export const feed = new Elysia().use(jwtPlugin).post(
    '/newFeed',
    async ({ set, jwt, cookie: { auth }, body }) => {
        try {
            if (!auth.value) {
                set.status = 401
                return {
                    success: false,
                    message: 'Not authenticated',
                }
            }

            const payload = await jwt.verify(auth.value)
            if (!payload) {
                set.status = 401
                return {
                    success: false,
                    message: 'Invalid token',
                }
            }

            const db = getDb()

            const stmt = db.prepare('INSERT INTO feeds (url) VALUES (?)')
            stmt.run(body.url)

            // recuperer ID feed
            // insert id feed + id user in  user_feed

            set.status = 201
            return {
                success: true,
                message: 'Feed added successfully',
            }
        } catch (error) {
            console.error('Error while adding feed:', error)
            set.status = 500
            return {
                success: false,
                message: 'Server error',
            }
        }
    },
    {
        body: t.Object({
            url: t.String(),
        }),
        response: t.Object({
            success: t.Boolean(),
            message: t.Optional(t.String()),
        }),
    }
)
