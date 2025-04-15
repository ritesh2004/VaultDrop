import { z } from 'zod';
import { emailField, nameField, passwordField } from '../fields/supabase.fields.ts';

export const resgisterUserSchema = z.object({
    name: nameField,
    email: emailField,
    password: passwordField,
});

export const loginUserSchema = z.object({
    email: emailField,
    password: passwordField,
});