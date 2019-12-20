import keccak256 from "keccak256";
import { randomBytes } from "crypto";
import BN from "bignumber.js";

let seed = new BN(randomBytes(32).toString("hex"), 16);
let salt = 0;
let it = new BN(keccak256(seed.toString(16)).toString("hex"), 16);

export function setSeed(_seed: Buffer) {
	seed = new BN(_seed.toString("hex"), 16);
	salt = 0;
	it = new BN(keccak256(seed.toString(16)).toString("hex"), 16);
}

export function rand(base: number): number {
	if (!Number.isSafeInteger(base)) throw new Error('random base is not a safe integer');
	if (base <= 0) throw new Error('random base is not positive');
	while (it.lt(base)) {
		salt++;
		it = it.times(new BN(2).pow(256)).plus(new BN(keccak256(seed.plus(salt).toString(16)).toString("hex"), 16));
	}
	const result = it.mod(base).toNumber();
	it = it.idiv(base);
	return result;
}
