export class UserAdapter {
    static adaptLegacyUser(legacyString) {
        // Valida que venga el formato rígido: ID_Apellido, Nombre
        if (!legacyString || !legacyString.includes('_') || !legacyString.includes(',')) {
            throw new Error("Formato de usuario antiguo no válido.");
        }

        const [idPart, namePart] = legacyString.split('_');
        const [lastName, firstName] = namePart.split(',');

        return {
            id: parseInt(idPart.trim()),
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            fullName: ${firstName.trim()} ${lastName.trim()}
        };
    }
    
}