export function renderCell(value: string | number) {
	return value === "" ? " " : String(value);
}
