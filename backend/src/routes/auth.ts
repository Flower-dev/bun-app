import { Elysia, t } from 'elysia'

const authQuery = t.Object({
    email: t.String(),
    password: t.String(),
})

export const auth = new Elysia().post(
    '/auth',
    ({ body }) => {
        return body
    },
    {
        body: authQuery,
    }
)
