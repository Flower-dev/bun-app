import { Elysia } from 'elysia'
import { jwt } from '@elysiajs/jwt'
import bcrypt from 'bcrypt'
import { createTable, getDb } from './utils/db'

const app = new Elysia().use(
    jwt({
        name: 'jwt',
        secret: process.env.SECRET_KEY || 'fallback_secret',
        exp: '7d',
    })
)

app.onError(({ code, error }) => {
    console.error(`${code}: ${error?.toString()}`)
    return {
        error: 'Internal server error',
        code,
    }
})

    .get('/', async () => {
        try {
            const db = getDb()
            const rows = db.query('SELECT id, email, username FROM users').all()
            return rows
        } catch (error) {
            console.error('Error fetching users:', error)
            return { error: 'Internal server error' }
        }
    })

    .post('/register', async ({ body }) => {
        try {
            const db = getDb()
            const { username, email, password } = body as {
                username: string
                email: string
                password: string
            }

            if (!username || !email || !password) {
                return { error: 'All fields are required' }
            }

            // Hash pwd
            const saltRounds = 10
            const password_hash = await bcrypt.hash(password, saltRounds)

            db.run(
                'INSERT INTO users (id, username, email, password) VALUES (NULL,?, ?, ?)',
                [username, email, password_hash]
            )

            return { message: 'User created successfully' }
        } catch (error) {
            console.error('Error creating user:', error)
            return { error: 'Internal server error' }
        }
    })

    // .post('/login', async ({ body, jwt }) => {
    //     const db = getDb();
    //     const { email, password } = body as { email: string; password: string };

    //     if (!email || !password) {
    //         return { error: 'Email and password are required' };
    //     }

    //     // Vérifier si l'utilisateur existe
    //     const user = db.query('SELECT * FROM users WHERE email = ?').get(email);
    //     if (!user) {
    //         return { error: 'Invalid email or password' };
    //     }

    //     const isPasswordValid = await bcrypt.compare(password, user.password);
    //     if (!isPasswordValid) {
    //         return { error: 'Invalid email or password' };
    //     }

    //     // Generate JWT token
    //     const token = await jwt.sign({
    //         userId: user.id,
    //         username: user.username
    //     });

    //     return { message: 'Login successful', token };
    // })

    // .guard(
    //     {
    //         beforeHandle: async ({ jwt, request }) => {
    //             const authHeader = request.headers.get('Authorization');
    //             if (!authHeader) throw new Error('No token provided');

    //             const token = authHeader.split(' ')[1];
    //             if (!token) throw new Error('Invalid token format');

    //             const verified = await jwt.verify(token);
    //             if (!verified) throw new Error('Invalid or expired token');

    //             return verified;
    //         }
    //     },
    //     (app) =>
    //         app.get('/dashboard', async ({ store }) => {
    //             if (!store?.userId) {
    //                 throw new Error('Unauthorized');
    //             }
    //             return { message: 'Protected dashboard route', user: store };
    //         })
    // )

    .listen(3000, async () => {
        await createTable()
        console.log('Server is running on http://localhost:3000')
    })
