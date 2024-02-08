import 'dotenv/config'
import {z} from 'zod'

// process.env: {NODE_ENV: 'dev', ...} 

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3333)
})

const _env = envSchema.safeParse(process.env)

if(!_env.success) {
    console.error('❌ Invalid enviroment variables.', _env.error.format())

    throw new Error('Invalid enviroment variables')
}

export const env = _env.data