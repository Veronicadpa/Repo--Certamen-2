
import { manejarErrorValidacion } from "#esquema-validaciones/utils.js"
import { ValiError } from "valibot"

export function validarCuerpo(validarBody) {
    return validarComponentePeticion("body", validarBody)
}

export function validarQuery(validarQuery) {
    return validarComponentePeticion("query", validarQuery, "q")
}

export function validarParametrosRuta(validarParams) {
    return validarComponentePeticion("params", validarParams)
}

function validarComponentePeticion(componente, funcionValidadora, nuevoComponente) {
    return function(req, res, next) {
        try {
            req[nuevoComponente ?? componente] = funcionValidadora(req[componente])
            next()
        } catch (ex) {
            if (ex instanceof ValiError) {
              return manejarErrorValidacion(res, ex)
            }
            
            throw ex
        }
    }
}