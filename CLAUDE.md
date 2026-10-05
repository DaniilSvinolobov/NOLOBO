# NOLOBO — studio website
Architecture, urbanism and landscape studio based in Mallorca, led by architect Daniil Svinolobov (ETSAM Madrid, UPV/EHU Basque Country; projects in Spain and Germany, masterplanning and resilience work for Haiti). Solo-led and remote-first: specialists for computational design, structure and local knowledge are assembled per project. Never present NOLOBO as a large office.

## Concept
**We design conditions. Form is a consequence.** The studio's value is judgment, taste, observation and experience: understanding a place and deciding what should happen there before drawing the object.

Architecture is the physical apparatus that produces, protects or intensifies conditions: light, shade, air, heat, coolness, sound, silence, weight, texture, distance, threshold, movement, time.

Hierarchy, never reversed: **PLACE → CONDITIONS → ARCHITECTURE → TOOLS.**

- Technology is capability, never identity. Computation calculates, compares, verifies and coordinates. It does not decide what matters. Not anti-technology: the studio understands tools well enough not to mistake them for the author.
- Anchors: WE DESIGN CONDITIONS. FORM IS A CONSEQUENCE. TASTE IS TRAINED. THE COMPUTER DOESN'T HAVE TASTE. MATERIAL IS NOT A FINISH.
- Materials are described by what they physically do (stone stores heat, lime softens light, wood changes sound), not as a finish or a heritage mood.
- Mallorca is not the aesthetic. It is the set of conditions the architecture must understand: sun angle, summer heat, sea air, topography, stone, vegetation, water scarcity, shade, seasonality, construction culture.
- Visual idea: the interface looks technical, the content is human. The site is an instrument that measures life (light, temperature, shade, sound, wind, time, movement, occupation).
- The shared condition vocabulary lives in `content.conditions` (`ConditionId`). Reuse it for material tags and service tags, not for project pages.

## Copy principles
- Concrete over abstract.
- Physical over emotional.
- Observation over adjective.
- Short over explanatory.
- Never name the feeling when you can describe what causes it.
- No architecture-marketing clichés (timeless, unique, serene, harmonious, beautiful, thoughtful, rooted in place, sense of place, meaningful spaces, sustainable by design, where tradition meets innovation, architecture that belongs, designing for people, form follows function, less is more).
- No Mediterranean clichés (sun-drenched, Mediterranean lifestyle, island living, timeless Mallorca, vernacular soul).
- No unnecessary superlatives.
- Technology is capability, never identity.
- Do not anthropomorphise technology.
- Do not present computation as the source of design decisions. No "data informs, taste decides", "technology checks our decisions" or "simulation validates intuition".
- Use "we" for NOLOBO's work and project team. Use "I" only when Daniil is personally speaking.
- When possible, describe architecture through time, light, temperature, sound, movement and material behaviour. Present consequences rather than adjectives.
- If a sentence could appear unchanged on 100 architecture studio websites, rewrite it.
- Do not invent measurements or performance claims. Project pages are design concepts; their reasoning is illustrative. Anything presented as fact about a real project needs a source from Daniil.
- Project pages show reasoning, not measurement: a thesis, then condition → decision → consequence. The row labels come from that project's own site. No timestamps, sensor-style readouts or shared category lists unless a project genuinely needs them.

## Stack
React + Vite + Tailwind + motion. All copy lives in src/content.ts.

## Design rules
- JetBrains Mono for headlines (including section headings), body, labels and buttons. Only the NOLOBO wordmark stays in Inter Tight
- Colors: #F5F5F2 paper, #0E0E0E ink, #FF4D00 accent (sparingly)
- Hairline borders, grid-aligned layout, schematic and precise visuals
- Motion: cubic-bezier(0.16, 1, 0.3, 1), 0.8–1.6s, sequenced not simultaneous, no bouncing or looping; respect prefers-reduced-motion
- Copy tone: simple, direct, confident; no marketing words or poetic phrasing

## Languages
**Current phase: English only.** The site runs in English only for now (`ENABLED_LANGUAGES = ['en']` in content.ts, language switcher hidden). Write and edit only the `en` values. ES, CA, DE and RU are optional and fall back to English automatically, so new strings need English only. Don't add or update translations until I say so; leave existing ones as they are. When I ask, we translate all final copy at once and re-enable the switcher by adding the languages back to `ENABLED_LANGUAGES`.

Rules for when we translate:
Every visible string exists in EN, ES, CA, DE, RU in content.ts. Translate by meaning, not word for word. DE uses "Sie", ES/CA use "tú", RU uses "вы", CA uses Balearic forms (escoltam, treballam). Never hardcode text in components.

## Workflow
- Show the diff before every commit; never push without my OK
- Run the type check and build before committing
- Use a separate branch for bigger experiments
