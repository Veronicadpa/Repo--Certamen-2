import { PrismaClient } from '../generated/prisma/client.js';
import { scrypt } from "crypto";

const prisma = new PrismaClient();
try {
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


async function hashPassword(password) {
    const { randomBytes } = await import("crypto");
    const salt = randomBytes(16).toString("hex");
    return hashPasswordWithSalt(password, salt);
}

    const password = await hashPassword("certamen123");

    await prisma.usuario.create({
        data: {
            username: "admin",
            name: "Gustavo Alfredo Marín Sáez",
            password,
        },
    });

     console.log("Seed ejecutada con éxito");
}catch{
    console.log("Problema con la Seed");
}
   
