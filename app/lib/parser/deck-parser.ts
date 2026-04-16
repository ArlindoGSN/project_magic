export function parseDeckList(deckText: string) {
    return deckText
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean)
        .map(line => {
            const match = line.match(/^(\d+)\s+(.+)$/);

            if (!match) return null;

            // Strip off MTG Arena set and collector identifiers like " (MID) 47" or " (NEO) 22b"
            const parsedName = match[2].replace(/\s+\([A-Za-z0-9]+\)\s+\S+$/, "").trim();

            return {
                quantity: Number(match[1]),
                name: parsedName,
            };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);
}