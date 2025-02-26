import { Elysia } from 'elysia'
import { createTable } from './utils/db'
import { swagger } from '@elysiajs/swagger'
import { users } from './routes/users'
import { auth } from './routes/auth'
import { register } from './routes/register'
new Elysia()
    .use(
        swagger({
            documentation: {
                info: {
                    title: 'Elysia Documentation example',
                    version: '0.0.0',
                },
            },
        })
    )
    .use(users)
    .use(auth)
    .use(register)

    .listen(3000, async () => {
        await createTable()
        console.log('Server is running on http://localhost:3000')
    })
