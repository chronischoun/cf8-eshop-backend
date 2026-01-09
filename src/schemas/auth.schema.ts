import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email("Το email δεν είναι έγκυρο"),
    password: z.string().min(8, "Ο κωδικός πρέπει να είναι τουλάχιστον 8 χαρακτήρες"),
    name: z.string().min(2, "Το όνομα είναι πολύ μικρό")
  })
});