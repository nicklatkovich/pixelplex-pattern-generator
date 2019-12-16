export function validateInt(num: number): number {
	if (!Number.isSafeInteger(num)) throw new Error("is not a safe integer");
	return num;
}

export function validatePositiveInt(num: number): number {
	num = validateInt(num);
	if (num <= 0) throw new Error("is not positive");
	return num;
}
