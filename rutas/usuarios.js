import express from "express";
import { obtenerUsuarioPorToken, loguearUsuario } from "../repositorios/usuarios.js";
import { validarLoginUsuario } from "#esquema-validaciones/usuarios.js";
import { ValiError } from "valibot";
import { manejarErrorValidacion } from "#esquema-validaciones/utils.js";

const router = express.Router(); 
router.use(express.json());
router.use(express.static("public"));

// Escriba su código a partir de aquí


export function authMiddleware(req, res, next) {
    const token = req.get("X-Authorization");

    if (!token) {
        return res.status(401).json({
            error: "No se ha proporcionado un token de autorización",
        });
    }
    const user = obtenerUsuarioPorToken(token); 

    if (!user) {
        return res.status(401).json({
            error: "El token es inválido"
        })
    }
    next()
}

router.post("/api/auth/login", async (req, res) => {
   try {
		const { username, password } = validarLoginUsuario(req.body);

		const usuarioLogueado = await loguearUsuario(username, password);

		if (!usuarioLogueado) {
			return res.status(401).json({
				error: "Nombre de usuario o contraseña incorrectos",
			});
		}

		res.json(usuarioLogueado);
	}catch(ex){
if (ex instanceof ValiError){
    return manejarErrorValidacion(res, ex)
}
throw ex
    }
});

router.post("/api/auth/logout", authMiddleware, (req, res) => {
	const token = req.get("X-Authorization");

	if (!token) {
		return res.status(401).json({ error: "No se ha proporcionado un token" });
	}
	const exito = logoutUsuario(token);

	if (!exito) {
		return res.status(401).json({ error: "Token inválido" });
	}
	res.status(204).end(); 
});

export default router 