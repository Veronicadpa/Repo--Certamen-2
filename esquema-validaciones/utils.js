export function manejarErrorValidacion(response, ex) {
    response.status(400).json({
        error: ex.issues.map(issue => issue.message)
    });
}