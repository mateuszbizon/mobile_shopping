import {z} from "zod"

export const loginSchema = z.object({
    email: z.string().email("Niepoprawny adres email"),
    password: z.string().min(8, "Hasło musi mieć minimum 8 znaków")
})

export type LoginSchema = z.infer<typeof loginSchema>