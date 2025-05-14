import * as v from 'valibot'

const esquemaUuid = v.object({
    id: v.pipe(v.string(), v.uuid())
})

export const validarUuid = v.parser(esquemaUuid)