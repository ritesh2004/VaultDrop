import { z } from 'zod';

export const emailField = z.string({ message: "Email is required" }).email().nonempty('Email is required').max(255, 'Email must be less than 255 characters');
export const passwordField = z.string({ message: "Password is required" }).min(6, 'Password must be at least 6 characters long').max(255, 'Password must be less than 255 characters');

export const nameField = z.string({ message: "Name is required" }).nonempty('Name is required').max(255, 'Name must be less than 255 characters');