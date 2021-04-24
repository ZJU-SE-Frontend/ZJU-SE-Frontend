import crypto from 'crypto';

const salt1 = "call 10086"
const salt2 = "call 10010"

function getHash(plain, salt){
	var sha256 = crypto.createHash('sha256');
	return sha256.update(plain + salt).digest('hex');
}

export function getEncryptedPassword(plain) {
	return getHash(getHash(plain, salt1), salt2)
}