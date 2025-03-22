import {z} from "zod"

export const loginSchema = z.object({
    email: z.string().min(1, "Adres email nie może być pusty"),
    password: z.string().min(1, "Hasło nie może być puste")
})

export type LoginSchema = z.infer<typeof loginSchema>