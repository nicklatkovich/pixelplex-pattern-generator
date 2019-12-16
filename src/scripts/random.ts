export function rand(base: number): number {
	if (!Number.isSafeInteger(base)) throw new Error('random base is not a safe integer');
	if (base <= 0) throw new Error('random base is not positive');
	return Math.floor(Math.random() * base);
}
