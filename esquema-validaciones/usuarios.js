import * as v from "valibot"; 

const esquemaLoginUsuario = v.object({
	username: v.pipe(
		v.string(),
		v.trim(),
		v.minLength(1)
	),
	password: v.pipe(
		v.string(),
		v.trim(),
		v.minLength(1)
	),
});


export const validarLoginUsuario = v.parser(esquemaLoginUsuario);