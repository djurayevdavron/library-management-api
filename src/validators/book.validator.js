import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(2),

  author: z.string().min(3),

  description: z.string().min(10),

  price: z.number().positive(),

  stock: z.number().int().min(0),

  category: z.string().min(2)
});