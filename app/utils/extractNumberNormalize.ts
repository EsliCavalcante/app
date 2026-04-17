export function extractNumberNormalize(value: string): number {
	let result = value.replace(/[^\d.,-]/g, "");

	// mantém apenas um "-" no início
	result = result.replace(/(?!^)-/g, "");

	// troca vírgula por ponto
	result = result.replace(/,/g, ".");

	result = Number(result).toFixed(1);
	return Number(result);
}
