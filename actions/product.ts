'use server'

import { db } from "@/db"
import { productSchema, productSchemaRaw } from "@/schemas"
import { z } from "zod"

type ProductInput = Omit<z.infer<typeof productSchema>, 'image'> & {
  image: string;
}

const schema = z.object({
  ...productSchemaRaw,
  image: z.string().min(1)
})

export const createProduct = async (values: ProductInput) => {
  const validatedFields = schema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Input tidak valid' }
  }

  const {
    category,
    description,
    image,
    price,
    quantity,
    stock,
    title
  } = validatedFields.data;

  console.log(quantity)

  try {
    await db.product.create({
      data: {
        title,
        category,
        description,
        image,
        quantity,
        price: +price,
        stock: +stock
      }
    });

    return { success: 'Produk berhasil di unggah!' }
  } catch (error) {
    return { error: 'Terjadi kesalahan di server!' }
  }
}