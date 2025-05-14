import { PrismaClient } from "../generated/prisma/client.js";
import { randomUUID } from "crypto";
import { PrismaClientKnownRequestError } from "#generated/prisma/runtime/library.js";
const prisma = new PrismaClient();


export function obtenerRecordatorios() {
		return prisma.recordatorio.findMany({
            orderBy: {
                important: 'desc'
            }
        });

}
/*{
			id: randomUUID(),
			content,
			createdAt: new Date,
			important
		} */
export function crearRecordatorios(datos) {
	return  prisma.recordatorio.create({
		data: {...datos, 
			createdAt: new Date() 
		}			
	});
}
export async function actualizaRecordatorio(id, datos) {
	const recordatorio = await prisma.recordatorio.findUnique({ where: { id } });
	
	if (!recordatorio) return null;

	return await prisma.recordatorio.update({
		data: datos,
		where: { id },
		
	});
}

export async function borrarRecordatorio(id) {
	const recordatorio = await prisma.recordatorio.findUnique({ where: { id } });
	if (!recordatorio) return false;

	await prisma.recordatorio.delete({ where: { id } });
	return true;
}

export async function obtenerRecordatoriosID(id) {
	return await prisma.recordatorio.findUnique({ where: { id } }) || null;
}

