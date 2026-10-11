import { z } from "zod";

export const signupSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Skriv mindst 3tegn.")
    .max(60, "Navnet må højst være 60 tegn."),
  creativeRole: z
    .string()
    .trim()
    .min(2, "Fortæl kort, hvad du arbejder med.")
    .max(60, "Rollen må højst være 60 tegn."),
  goal: z
    .string()
    .trim()
    .min(10, "Skriv mindst 10 tegn om dit mål.")
    .max(240, "Hold dit svar under 240 tegn."),
  email: z.string().trim().email("Skriv en gyldig e-mailadresse."),
  password: z
    .string()
    .min(8, "Adgangskoden skal være mindst 8 tegn.")
    .regex(/[A-Za-zÆØÅæøå]/, "Adgangskoden skal indeholde et bogstav.")
    .regex(/[0-9]/, "Adgangskoden skal indeholde et tal."),
  acceptedTerms: z.boolean().refine(Boolean, {
    message: "Du skal acceptere, at dette er en portfolio-demo.",
  }),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Skriv en gyldig e-mailadresse."),
  password: z.string().min(1, "Skriv din adgangskode."),
});

export const demoMessageSchema = z.object({
  author: z.string().trim().min(1).max(40),
  message: z.string().trim().min(1).max(280),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
