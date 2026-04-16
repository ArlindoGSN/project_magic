"use server";

import { parseDeckList } from "@/app/lib/parser/deck-parser";
import { mtgClient } from "@/app/lib/mtg/mtg-client";
import {
    calculateRotationDate,
    getMonthsUntilRotation,
} from "@/app/lib/mtg/rotation-service";

export async function analyzeDeckAction(prevState: any, formData: FormData) {
    const deckText = formData.get("deck")?.toString() || "";
    const cards = parseDeckList(deckText);

    const result = [];
    console.log("Parsed cards:", cards);

    for (const card of cards) {
        try {
            console.log(`Fetching card: "${card.name}"`);
            const mtgCard = await mtgClient.getCardByName(card.name);
            
            if (!mtgCard) {
                console.log(`[WARN] Card not found in API: ${card.name}`);
                continue;
            }
            if (!mtgCard.set) {
                console.log(`[WARN] Card has no set: ${card.name}`);
                continue;
            }

            console.log(`Found ${mtgCard.name} from set ${mtgCard.set}`);
            const set = await mtgClient.getSetByCode(mtgCard.set);
            
            if (!set) {
                console.log(`[WARN] Set not found in API: ${mtgCard.set}`);
                continue;
            }

            const rotationDate = calculateRotationDate(set.releaseDate);

            result.push({
                ...card,
                set: set.name,
                monthsLeft: getMonthsUntilRotation(rotationDate),
            });
            // Small delay to prevent rate limiting (using 3 seconds)
            await new Promise((resolve) => setTimeout(resolve, 3000));
        } catch (e) {
            console.error(`Error fetching ${card.name}:`, e);
        }
    }

    return result.filter(Boolean);
}