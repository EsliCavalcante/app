import { z } from "zod";

export const documentDialogSchema = z.object({
	fileName: z
		.string({ error: "Nome do arquivo e obrigatorio" })
		.trim()
		.min(1, "Nome do arquivo e obrigatorio")
		.min(4, "O nome deve ter no minimo 4 caracteres")
		.max(50, "O nome deve ter no maximo 50 caracteres"),
});

export type DocumentDialogSchema = z.infer<typeof documentDialogSchema>;
