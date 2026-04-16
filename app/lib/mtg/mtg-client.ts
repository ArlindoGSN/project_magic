export const mtgClient = {
    async getCardByName(name: string) {
        try {
            // Scryfall's exact match endpoint
            const response = await fetch(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(name)}`);
            if (!response.ok) return null;
            
            const data = await response.json();
            return {
                name: data.name,
                set: data.set, // set code e.g. "neo"
            };
        } catch (e) {
            console.error("Error fetching from Scryfall:", e);
            return null;
        }
    },

    async getSetByCode(code: string) {
        try {
            const response = await fetch(`https://api.scryfall.com/sets/${encodeURIComponent(code)}`);
            if (!response.ok) return null;
            
            const data = await response.json();
            return {
                name: data.name,
                // Scryfall returns 'released_at' like "2010-10-01"
                releaseDate: data.released_at,
            };
        } catch (e) {
            console.error("Error fetching set from Scryfall:", e);
            return null;
        }
    },
};