import {z} from "zod"

export const registerSchema = z.object({
    email: z.string().email("Niepoprawny adres email"),
    password: z.string().min(8, "Hasło musi mieć minimum 8 znaków"),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Hasła muszą być takie same",
    path: ["confirmPassword"]
})

export type ResgisterSchema = z.infer<typeof registerSchema>