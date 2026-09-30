# NOLOBO — studio website
Architecture, urbanism and landscape studio based in Mallorca. Architects and landscape architects supported by technology: people drive the tech, not the other way around. Focus on client values, local knowledge, local artisans and materials, and preserving the island's landscape and character. Remote-first team; local = artisans, techniques, materials, expertise and personal contact; computational design, engineering and analysis come from a remote network.

## Stack
React + Vite + Tailwind + motion. All copy lives in src/content.ts.

## Design rules
- JetBrains Mono for headlines, body, labels and buttons
- Colors: #F5F5F2 paper, #0E0E0E ink, #FF4D00 accent (sparingly)
- Hairline borders, grid-aligned layout, schematic and precise visuals
- Motion: cubic-bezier(0.16, 1, 0.3, 1), 0.8–1.6s, sequenced not simultaneous, no bouncing or looping; respect prefers-reduced-motion
- Copy tone: simple, direct, confident; no marketing words or poetic phrasing

## Languages
Every visible string exists in EN, ES, CA, DE, RU in content.ts. Translate by meaning, not word for word. DE uses "Sie", ES/CA use "tú", RU uses "вы", CA uses Balearic forms (escoltam, treballam). Never hardcode text in components.

## Workflow
- Show the diff before every commit; never push without my OK
- Run the type check and build before committing
- Use a separate branch for bigger experiments
