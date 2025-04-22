import { z } from 'zod';

export const expiring_inField = z.number().optional().default(0).refine((val) => val >= 0, {
    message: 'expiring_in must be a non-negative number',
});
export const limitField = z.number().optional().default(0).refine((val) => val >= 0, {
    message: 'limit must be a non-negative number',
});
export const is_downloadableField = z.boolean().optional().default(false);
export const allowed_usersField = z.array(z.string()).optional().default([]).refine((val) => val.length <= 10, {
    message: 'allowed_users must have at most 10 elements',
});
export const fileField = z.object({
    size: z.number().refine((size) => size <= 10 * 1024 * 1024, {
        message: 'File size must be less than or equal to 10MB',
    }),
    type: z.string().refine((type) => ['image/jpeg', 'image/png', 'application/pdf'].includes(type), {
        message: 'File type must be JPEG, PNG, or PDF',
    }),
});