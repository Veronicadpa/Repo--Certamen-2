import express from "express";
import rutasRecordatorios from "./rutas/recordatorios.js";
import rutasUsuarios from "./rutas/usuarios.js";

const PORT = process.env.PORT ?? 3000;

const app = express();
 
app.use(rutasUsuarios);
app.use(rutasRecordatorios);

app.listen(PORT, (error) => {
	if (error) {
		console.error(`No se puede ocupar el puerto ${PORT} :(`);
		return;
	}

	console.log(`Escuchando en el puerto ${PORT}`);
});

export default app
