export const mtgClient = {
    async getCardByName(name: string) {
        try {
            // Search for the card ignoring Commander, Masters, Alchemy to get the real Premier/Draft set for Standard rotation
            const query = `!"${name}" -st:commander -st:masterpiece -st:masters -st:alchemy -st:starter`;
            let response = await fetch(`https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}&order=released`);

            // Se falhar (exemplo, carta que SÓ existe em commander), busca pelo exact match como fallback
            if (!response.ok) {
                response = await fetch(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(name)}`);
                if (!response.ok) return null;

                const data = await response.json();
                return {
                    name: data.name,
                    set: data.set,
                };
            }

            const data = await response.json();
            const card = data.data && data.data[0];
            if (!card) return null;

            return {
                name: card.name,
                set: card.set, // set code e.g. "neo"
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