import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(1, "Produkt nie może być pusty").max(30, "Maksymalna długość produktu to 30 znaków"),
    categoryId: z.string().min(1)
})

export type ProductSchema = z.infer<typeof productSchema>