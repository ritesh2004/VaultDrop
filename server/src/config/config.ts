import { z } from 'zod';


export const configSchema = z.object({
    PORT: z.number().default(8080),
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    SUPABASE_URL: z.string().url(),
    SUPABASE_ANON_KEY: z.string(),
    DATABASE_URL: z.string().url().optional(),
    DATABASE_HOST: z.string().optional(),
    DATABASE_PORT: z.number().optional(),
    DATABASE_NAME: z.string().optional(),
    DATABASE_USER: z.string().optional(),
    DATABASE_PASSWORD: z.string().optional(),
})

export type Config = z.infer<typeof configSchema>;

export const config: Config = {
    PORT: Number(process.env.PORT) || 8080,
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production' || 'development',
    SUPABASE_URL: process.env.SUPABASE_URL || '',
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || '',
    DATABASE_URL: process.env.DATABASE_URL || undefined,
    DATABASE_HOST: process.env.DATABASE_HOST || undefined,
    DATABASE_PORT: Number(process.env.DATABASE_PORT) || undefined,
    DATABASE_NAME: process.env.DATABASE_NAME || undefined,
    DATABASE_USER: process.env.DATABASE_USER || undefined,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || undefined,
}

const validateConfig = configSchema.parse(config);

if (!validateConfig) {
    throw new Error('Invalid configuration');
}

export default config