'use server'

import z from 'zod'
import bcrypt from 'bcryptjs'
import { db } from '@/db';
import { signupSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';

export const signup = async (values: z.infer<typeof signupSchema>) => {
  const validatedFields = signupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Input tidak valid!' }
  }

  const {
    name,
    password,
    email,
  } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email telah digunakan. Coba lagi!' }
  }

  await db.user.create({
    data: {
      password: hashedPassword,
      email,
      name,
      purchaseAmount: 0,
      totalPrice: 0
    }
  });

  return { success: 'Berhasil membuat akun. Halaman akan dialihkan!' }
}