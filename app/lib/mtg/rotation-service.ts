import { addYears, differenceInDays } from "date-fns";

export function calculateRotationDate(releaseDate: string) {
    return addYears(new Date(releaseDate), 3);
}

export function getDaysUntilRotation(rotationDate: Date) {
    return differenceInDays(rotationDate, new Date());
}