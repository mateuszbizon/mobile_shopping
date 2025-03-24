import { z } from "zod";

export const categorySchema = z.object({
    name: z.string().min(1, "Kategoria nie może być pusta").max(30, "Maksymalna długość kategorii to 30 znaków")
})

export type CategorySchema = z.infer<typeof categorySchema>