import { differenceInMonths } from "date-fns";

export interface MtgSet {
    name: string;
    releaseDate: string;
}

export function calculateRotationDate(set: MtgSet): Date {
    const release = new Date(set.releaseDate);
    const releaseYear = release.getFullYear();

    // Foundations: validade estendida (mínimo 2029)
    if (set.name.toLowerCase().includes("foundation")) {
        const expirationYear = Math.max(2029, releaseYear + 3);
        return new Date(expirationYear, 0, 1);
    }

    // Standard e Universes Beyond: 3 anos (36 meses)
    let rotationYear = releaseYear + 3;

    // Gap de 2026 (Status de 2026: Rotation = False)
    if (rotationYear === 2026) {
        rotationYear = 2027;
    }

    // Rotação ocorre no início do ano civil (Janeiro)
    return new Date(rotationYear, 0, 1);
}

export function getMonthsUntilRotation(rotationDate: Date) {
    return differenceInMonths(rotationDate, new Date());
}