import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "../ui/button";
import { InputGroup, InputGroupInput } from "../ui/input-group";
import { Field, FieldError, FieldLabel } from "../ui/field";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "~/components/ui/item";
import type { UseFormReturn } from "react-hook-form";
import type { FormEventHandler } from "react";
import type { DocumentDialogSchema } from "./schemas/document-dialog.schema";

import PdfSvg from "./PdfSvg";

type DocumentDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: FormEventHandler<HTMLFormElement>;
	form: UseFormReturn<DocumentDialogSchema>;
	fileNameLength: number;
	fileNamePreview: string;
};

export default function DocumentDialog({
	open,
	onOpenChange,
	onSubmit,
	form,
	fileNameLength,
	fileNamePreview,
}: DocumentDialogProps) {
	const fileNameError = form.formState.errors.fileName;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-md">
				<form
					className="flex   flex-col gap-5"
					onSubmit={onSubmit}
					noValidate
				>
					<DialogHeader>
						<DialogTitle>Salvar Documento</DialogTitle>
						<DialogDescription className="pr-10">
							Preencha o nome do arquivo para salvar o PDF
						</DialogDescription>
					</DialogHeader>
					<Field className=" max-w-full gap-1 mb-4">
						<FieldLabel
							className="uppercase flex justify-between items-center px-1 text-xs"
							htmlFor="inline-start-input"
						>
							<span>Nome do arquivo</span>
							<span>{fileNameLength}/30</span>
						</FieldLabel>
						<InputGroup>
							<InputGroupInput
								id="inline-start-input"
								maxLength={30}
								placeholder="Ex: documento.pdf"
								aria-invalid={!!fileNameError}
								{...form.register("fileName")}
							/>
						</InputGroup>
						<FieldError
							className="text-xs px-1"
							errors={fileNameError ? [fileNameError] : []}
						/>
					</Field>
					<Item variant="outline">
						<ItemMedia className="mt-0.5">
							<div className="bg-red-500/20 p-1.5 rounded">
								<PdfSvg className="size-6" />
							</div>
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Preview</ItemTitle>
							<ItemDescription>{fileNamePreview}</ItemDescription>
						</ItemContent>
					</Item>
					<DialogFooter>
						<DialogClose asChild>
							<Button size={"lg"} variant="outline">
								Cancelar
							</Button>
						</DialogClose>
						<Button size={"lg"} type="submit">
							Salva PDF
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
