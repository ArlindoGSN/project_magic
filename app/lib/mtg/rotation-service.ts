import { addYears, differenceInMonths } from "date-fns";

export function calculateRotationDate(releaseDate: string) {
    return addYears(new Date(releaseDate), 3);
}

export function getMonthsUntilRotation(rotationDate: Date) {
    return differenceInMonths(rotationDate, new Date());
}