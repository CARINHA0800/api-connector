import { z } from "zod";

// Task validation constants
export const TASK_TITLE_MAX_LENGTH = 200;
export const TASK_DESCRIPTION_MAX_LENGTH = 2000;

// Task validation schema
export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "O título é obrigatório" })
    .max(TASK_TITLE_MAX_LENGTH, { 
      message: `O título deve ter no máximo ${TASK_TITLE_MAX_LENGTH} caracteres` 
    }),
  description: z
    .string()
    .trim()
    .max(TASK_DESCRIPTION_MAX_LENGTH, { 
      message: `A descrição deve ter no máximo ${TASK_DESCRIPTION_MAX_LENGTH} caracteres` 
    })
    .optional()
    .or(z.literal("")),
});

export type TaskFormData = z.infer<typeof taskSchema>;
