import { z } from 'zod';


export const configSchema = z.object({
    PORT: z.number().default(8080),
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    SUPABASE_URL: z.string().url(),
    SUPABASE_ANON_KEY: z.string(),
})

export type Config = z.infer<typeof configSchema>;

export const config: Config = {
    PORT: Number(process.env.PORT) || 8080,
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production' || 'development',
    SUPABASE_URL: process.env.SUPABASE_URL || '',
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || ''
}

const validateConfig = configSchema.parse(config);

if (!validateConfig) {
    throw new Error('Invalid configuration');
}

export default config