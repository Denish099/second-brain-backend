import z from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .regex(
      /^[a-zA-Z0-9_]{3,20}$/,
      "Username must be 3-20 characters long and contain only letters, numbers, or underscores"
    ),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least 8 characters long and include at least one letter and one number"
    ),
});
