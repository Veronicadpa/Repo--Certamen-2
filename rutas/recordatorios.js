import express from "express";
import { randomUUID } from "crypto";
import { authMiddleware } from "./usuarios.js";
import {obtenerRecordatorios,crearRecordatorios,actualizaRecordatorio,borrarRecordatorio, obtenerRecordatoriosID} from "../repositorios/recordatorios.js";
import { esquemaRecordatorios, validarActualizarRecordatorio } from "#esquema-validaciones/recodatorios.js";
import { ValiError } from "valibot";
import { manejarErrorValidacion } from "#esquema-validaciones/utils.js";
import { validarCuerpo, validarParametrosRuta } from "../middleware/validacion.js";
import { validarUuid } from "../esquema-validaciones/id.js";

const router = express.Router(); 

export const reminders = [];

router.use(express.json());
router.use(express.static("public"));
// Escriba su código a partir de aquí

//Obtener recordatorios
router.get("/api/reminders", authMiddleware, async (req, res) => {
		const reminders = await obtenerRecordatorios();
		res.json(reminders); 
	
});

//Obtener recordatorios por ID
router.get("/api/reminders/:id", authMiddleware, async (req, res) => {
		const reminders = await obtenerRecordatoriosID();
		res.json(reminders); 
	
}); 


//crear recordatorio
router.post("/api/reminders", validarCuerpo(esquemaRecordatorios), authMiddleware, async (req, res) => {
try {
	const datos = req.body; 
	const newReminder = await crearRecordatorios(datos); 
	res.status(201).json(newReminder);

}catch(ex) {
if (ex instanceof ValiError){
	return manejarErrorValidacion(res, ex)
}
throw ex 
}
});

router.patch("/api/reminders/:id", validarParametrosRuta(validarUuid), 
validarCuerpo(validarActualizarRecordatorio), authMiddleware, async (req, res) => {
	const { id } = req.params;
	const datos = req.body; 
	try {
		const updatedReminder  = await actualizaRecordatorio(id, datos);

		if (!updatedReminder ){
			return res.status(404).json({error: "Recordatorio no encontrado"});
		}

		return res.json(updatedReminder);
	}catch(ex) {
if (ex instanceof ValiError){
	return manejarErrorValidacion(res, ex)
							}	
throw ex 
				}
})

router.delete("/api/reminders/:id", authMiddleware, async (req, res) => {
	const { id } = req.params;
	const success = await borrarRecordatorio(id);

	if (!success) {
		return res.status(404).json({error: "Recordatorio no encontrado"});
	}

	res.status(204).end();
});

export default router 