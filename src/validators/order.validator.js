import { z } from "zod";

export const createOrderSchema = z.object({
  bookId: z.string().length(24),

  quantity: z.number().int().positive()
});