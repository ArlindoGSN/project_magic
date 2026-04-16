# Chronomagical Tracker (MTG Deck Explorer)

A modern, highly-polished Next.js application that allows Magic: The Gathering players to paste their MTG Arena decklists and instantly analyze the Standard rotation lifespan of their cards.

## Features

- **MTG Arena Import**: Simply paste your exported decklist from MTG Arena.
- **Smart Rotation Analysis**: Automatically queries the Scryfall API, filtering out non-Standard sets (like Commander, Masters, and Alchemy) to determine the true lifecycle of your cards.
- **Visual Analytics**: Interactive cards displaying exact quantities, fetched artwork, and color-coded expiration timelines (Red for `< 6 months`, Yellow for `<= 12 months`, Green for safe spells).
- **Graceful Error Handling**: Detects and compiles a list of cards that couldn't be parsed or found, returning them clearly to the user.
- **Premium Mystical Aesthetic**: Built with Tailwind CSS, featuring modern glassmorphism, responsive grids, animated ambient background glows, and a deeply atmospheric space-magic Dark UI.

## Built With

- [Next.js](https://nextjs.org/) (App Router & Server Actions)
- [React](https://reactjs.org/) 
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Scryfall API](https://scryfall.com/docs/api) (Data & Artwork)

## Getting Started

### Prerequisites

You need Node.js installed on your machine. We recommend using `pnpm`, but `npm` or `yarn` will work perfectly as well.

### Installation

1. Navigate into the directory:
   ```bash
   cd project_magic
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or npm install
   # or yarn install
   ```

3. Run the local development server:
   ```bash
   pnpm dev
   # or npm run dev
   # or yarn dev
   ```

4. Open your browser and visit: [http://localhost:3000](http://localhost:3000)

## Usage

1. Open the web app in your browser.
2. In MTG Arena, browse your decks and click **Export**.
3. Paste the contents into the text area of the application. Make sure your client is set to English to avoid mismatched translations, as Scryfall's exact search performs best with original names!
4. Click **Scan Rotation**. Depending on the size of your submitted deck, the Chronomagical Tracker will fetch data asynchronously with a built-in 500ms rate-limiting protection to avoid server blocks.
5. See when your deck becomes unplayable in Standard and plan your next moves!

## Legal and License

This project is for educational and community use. 
Portions of the materials used are property of Wizards of the Coast. ©Wizards of the Coast LLC.
Powered by the incredibly generous [Scryfall API](https://scryfall.com/).
