import * as v from "valibot"; 

const esquemaCrearRecodatorios  = v.object({
   content: v.pipe(
        v.string(),
        v.trim(),
        v.minLength(1), 
        v.maxLength(120)
    ),
     important: v.optional(
        v.pipe(
            v.boolean()
        )
    ) 
})

const esquemaActualizarRecordatorio = v.partial(esquemaCrearRecodatorios)

export const esquemaRecordatorios = v.parser(esquemaCrearRecodatorios)
export const validarActualizarRecordatorio = v.parser(esquemaActualizarRecordatorio)