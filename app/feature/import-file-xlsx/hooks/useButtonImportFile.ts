import React, { useRef, useState } from "react";

import { FILE_TYPE } from "../config/constants";

export default function useButtonImportFile({
	onError,
	onLoadSuccess,
}: {
	onError?: (error: string | null) => void;
	onLoadSuccess?: (file: File) => void;
}) {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleInputChangeFile = async (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		if (!e.currentTarget.files) throw new Error("File error");

		const file = e.currentTarget.files[0];

		try {
			if (!(file.type === FILE_TYPE)) throw new Error("File Invalid");
			if (onLoadSuccess) onLoadSuccess(file);
		} catch (error) {
			const e = error as Error;
			if (onError) onError(e.message);
		} finally {
			if (!inputRef.current) throw new Error("Indefinite reference");
			inputRef.current.value = "";
		}
	};

	const handleImportFile = () => {
		if (!inputRef.current) return;

		inputRef.current.click();
	};

	const inputProps: React.ComponentProps<"input"> = {
		ref: inputRef,
		type: "file",
		accept: ".xlsx",
		onChange: handleInputChangeFile,
		onClick: undefined,
		className: "hidden",
	};
	const buttonProps: React.ComponentProps<"button"> = {
		type: "button",
		onClick: handleImportFile,
		className: "py-5.5 w-42",
	};

	return { inputRef, inputProps, buttonProps };
}
