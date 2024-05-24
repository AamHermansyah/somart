'use server'

import z from 'zod'
import { loginSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Input tidak valid' }
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email atau password tidak valid!" }
  }

  const passwordsMatch = await bcrypt.compare(
    password,
    existingUser.password,
  );

  const tokenJWT = jwt.sign({ userId: existingUser.id }, process.env.NEXT_PUBLIC_JWT_SECRET_KEY as string, {
    expiresIn: '7h', // You can adjust the expiration time as needed
  });

  if (passwordsMatch) return {
    user: {
      ...existingUser,
      password: ''
    },
    token: tokenJWT
  };

  return { error: 'Email atau kata sandi tidak sesuai!' }
}