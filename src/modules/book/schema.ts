import z from "zod";

export const bookSchema = z
  .object({
    id: z.uuid(),
    author: z.string().min(1),
    title: z.string().min(1),
  })
  .strict();
export type BookSchema = z.infer<typeof bookSchema>;

export const addBookSchema = z
  .object({
    author: z.string().min(1),
    title: z.string().min(1),
  })
  .strict();
export type AddBookSchema = z.infer<typeof addBookSchema>;
