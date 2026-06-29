import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().email("Please enter a valid mail"),
    password: z
        .string()
        .min(6, "Password must be atleast 6 characters")
});

export const signupSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(2,"firstname must be atleast 2 characters"),
    lastName:z
        .string()
        .trim()
        .min(2,"firstname must be atleast 2 characters"),
  
    email: z.string().email("Please enter a valid mail"),

    password: z
        .string()
        .min(6, "Password must be atleast 6 characters"),

    confirmPassword: z.string()
})
        .refine(
            data => data.password === data.confirmPassword,
            {
                path:["confirmPassword"],
                message:"Passwords do not match",
            }
        );

export type LoginFormData = z.infer<typeof loginSchema>
export type SignupFormData = z.infer<typeof signupSchema>

