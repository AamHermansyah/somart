
import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string().min(1, { message: "Nama wajib diisi" }),
  email: z.string().email({ message: "Alamat email tidak valid" }),
  password: z.string().min(8, { message: "Kata sandi harus terdiri dari minimal 8 karakter" })
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Alamat email tidak valid" }),
  password: z.string().min(8, { message: "Kata sandi harus terdiri dari minimal 8 karakter" })
});

export const productSchemaRaw = {
  title: z.string().min(1, { message: "Judul produk harus diisi" }),
  description: z.string().min(1, { message: "Deskripsi produk harus diisi" }),
  price: z.string()
    .refine((value) => {
      const numericValue = parseFloat(value);
      return !isNaN(numericValue) && numericValue >= 0;
    }, {
      message: "Harga produk tidak valid",
    })
    .refine((value) => {
      const numericValue = parseFloat(value);
      return !isNaN(numericValue) && numericValue >= 1000;
    }, {
      message: "Harga produk minimal Rp 1.000",
    }),
  quantity: z.string().min(1, { message: "Jumlah/berat satuan harus diisi" }),
  stock: z.string()
    .refine((value) => {
      const numericValue = parseFloat(value);
      return !isNaN(numericValue) && numericValue >= 0;
    }, {
      message: "Stok produk tidak valid",
    })
    .refine((value) => {
      const numericValue = parseFloat(value);
      return !isNaN(numericValue) && numericValue >= 0;
    }, {
      message: "Stok produk minimal 1",
    }),
  category: z.string().min(1, { message: "Kategori produk harus diisi" }),
  image: z
    .custom<FileList[0] | undefined>()
    .refine((file) => !(file === undefined), {
      message: "Gambar harus diisi"
    })
    .refine((file) => file && (!!file && file.size <= 2 * 1024 * 1024), {
      message: "Gambar maksimal berukuran 2MB",
    })
    .refine((file) => file && (!!file && file.type?.startsWith("image")), {
      message: "Hanya tipe gambar yang diizinkan",
    }),
}

export const productSchema = z.object(productSchemaRaw);