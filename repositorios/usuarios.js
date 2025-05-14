import { PrismaClient } from "../generated/prisma/client.js";
import { scrypt, randomBytes } from "crypto";

const prisma = new PrismaClient(); 

function hashPasswordWithSalt(password, salt) {
    return new Promise((resolve, reject) => {
        scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) {
                return reject(err);
            }
            resolve(`${salt}:${derivedKey.toString("hex")}`);
        });
    });
}

async function verifyPassword(password, hash) {
    const [salt] = hash.split(":");
    
    try {
        const hashedPassword = await hashPasswordWithSalt(password, salt);
        return hashedPassword === hash;
    } catch {
        return false;
    }
}


export async function obtenerUsuarioPorToken(token) {
	return await prisma.usuario.findFirst({
		where: { token },
	});
}

export async function loguearUsuario(username, password) {
	const user = await prisma.usuario.findUnique({
		where: { username },
	});

	if (!user) return null;

	const valido = await verifyPassword(password, user.password);
	if (!valido) return null;

	const token = randomBytes(48).toString("hex");

	await prisma.usuario.update({
		where: { username },
		data: { token },
	});

	return {
		username: user.username,
		name: user.name,
		token,
	};
}

export async function logoutUsuario(token) {
	const user = await prisma.usuario.findFirst({
		where: { token },
	});

	if (!user) return false;

	await prisma.usuario.update({
		where: { id: user.id },
		data: { token: null },
	});

	return true;
}

