/**
 * NOLOBO Studio — Single source of truth for all content, copy, and project assets.
 * English only for now; DE, ES, CA and RU fall back to English.
 */

import tramuntanaImg from './assets/images/tramuntana_villa_1790592318622.jpg';
import palmaImg from './assets/images/palma_penthouse_1790592331756.jpg';
import cliffImg from './assets/images/cliff_pavilion_1790592345065.jpg';
import fincaImg from './assets/images/finca_transformation_1790592357063.jpg';
import santanyiImg from './assets/images/santanyi_interior_1790592369589.jpg';
import maresImg from './assets/images/mares_sandstone_1790607863327.jpg';
import santanyiStoneImg from './assets/images/santanyi_stone_1790609065121.jpg';
import limeImg from './assets/images/lime_plaster_1790607879964.jpg';
import dryStoneImg from './assets/images/dry_stone_wall_1790607894578.jpg';
import oliveWoodImg from './assets/images/olive_wood_1790607904582.jpg';
import ceramicImg from './assets/images/ceramic_tile_1790607919348.jpg';

export type Language = 'en' | 'de' | 'es' | 'ca' | 'ru';

/**
 * Localized value as written in this file: English is required, the other
 * languages are optional and fall back to English at runtime.
 */
export type Localized<T> = { en: T } & Partial<Record<Exclude<Language, 'en'>, T>>;
type LocalizedStringSource = Localized<string>;
type LocalizedListSource = Localized<string[]>;

/** Localized value as components see it: every language is always present. */
export type LocalizedString = Record<Language, string>;
export type LocalizedList = Record<Language, string[]>;

/** Maps a source type (optional translations) to its resolved form (all languages present). */
type Resolved<T> = T extends { en: infer E }
  ? Record<Language, Resolved<E>>
  : T extends (infer U)[]
    ? Resolved<U>[]
    : T extends object
      ? { [K in keyof T]: Resolved<T[K]> }
      : T;

/**
 * Languages visible on the site. While copy is being finalised the site runs
 * in English only; the other translations stay in this file untouched and are
 * updated once the English copy is final. Add languages back here to re-enable
 * the switcher.
 */
export const ENABLED_LANGUAGES: Language[] = ['en'];

/**
 * Format numbers per locale:
 * EN: 1,240
 * DE, ES, CA: 1.240
 * RU: 1 240
 */
export function formatLocaleNumber(num: number, lang: Language): string {
  if (lang === 'en') {
    return num.toLocaleString('en-US');
  }
  if (lang === 'ru') {
    return num.toLocaleString('ru-RU').replace(/\u00A0/g, ' ');
  }
  return num.toLocaleString('de-DE');
}

/** The physical things the studio designs. One shared vocabulary for logs, materials and the hero. */
export type ConditionId = 'light' | 'shade' | 'air' | 'heat' | 'sound' | 'water' | 'weight' | 'time';

interface MaterialItemSource {
  id: string;
  name: LocalizedStringSource;
  localName: string;
  subtitle: LocalizedStringSource;
  /** What the material physically does, as one short sentence. */
  does: LocalizedStringSource;
  description: LocalizedStringSource;
  origin: string;
  distance: string;
  image: string;
  conditions: ConditionId[];
}

interface ReadoutRowSource {
  label: LocalizedStringSource;
  value: LocalizedStringSource;
}

interface ProjectSource {
  id: string;
  number: string;
  title: string;
  location: string;
  year: string;
  category: LocalizedStringSource;
  materials: string;
  image: string;
  aspect: string;
  /** One imperative sentence: the project's position. */
  thesis: LocalizedStringSource;
  /** Two or three short sentences under the thesis. */
  position: LocalizedStringSource;
  /** Condition → decision → consequence. Labels come from the project's own site. */
  reasoning: {
    label: LocalizedStringSource;
    condition: LocalizedStringSource;
    decision: LocalizedStringSource;
    consequence: LocalizedStringSource;
  }[];
}

interface ApproachStepSource {
  step: string;
  phase: LocalizedStringSource;
  title: LocalizedStringSource;
  description: LocalizedStringSource;
}

interface ServiceItemSource {
  id: string;
  number: string;
  title: LocalizedStringSource;
  summary: LocalizedStringSource;
  scope: LocalizedListSource;
  /** Conditions this discipline governs. */
  conditions: ConditionId[];
}

interface ContentSource {
  meta: {
    brand: string;
    tagline: LocalizedStringSource;
    coordinates: string;
    elevation: string;
    locationName: string;
    timezone: string;
    availability: LocalizedStringSource;
    conditions: {
      place: LocalizedStringSource;
      sunsetLabel: LocalizedStringSource;
      sunLabel: LocalizedStringSource;
      poleLabel: LocalizedStringSource;
      latitude: number;
      longitude: number;
    };
    documentTitle: LocalizedStringSource;
    description: LocalizedStringSource;
  };
  nav: {
    approach: LocalizedStringSource;
    services: LocalizedStringSource;
    work: LocalizedStringSource;
    materials: LocalizedStringSource;
    studio: LocalizedStringSource;
    contact: LocalizedStringSource;
  };
  aria: {
    skipLink: LocalizedStringSource;
    mainNav: LocalizedStringSource;
    langSelect: LocalizedStringSource;
    openMenu: LocalizedStringSource;
    closeMenu: LocalizedStringSource;
    homeLink: LocalizedStringSource;
    closeModal: LocalizedStringSource;
    prevMaterial: LocalizedStringSource;
    nextMaterial: LocalizedStringSource;
    prevProject: LocalizedStringSource;
    nextProject: LocalizedStringSource;
    inspectSpec: LocalizedStringSource;
    backToTop: LocalizedStringSource;
    interactiveModel: LocalizedStringSource;
  };
  hero: {
    headline: LocalizedStringSource;
    conditionWords: LocalizedStringSource[];
    closing: LocalizedStringSource;
    ctaWork: LocalizedStringSource;
    ctaInquire: LocalizedStringSource;
    model: {
      header: LocalizedStringSource;
      locationCode: string;
      tabs: LocalizedStringSource[];
      captions: LocalizedStringSource[];
      readouts: {
        scan: { title: LocalizedStringSource; rows: ReadoutRowSource[] };
        fit: { title: LocalizedStringSource; chosenLabel: LocalizedStringSource; rows: ReadoutRowSource[] };
        ground: { title: LocalizedStringSource; materialFlow: LocalizedStringSource; rows: ReadoutRowSource[] };
        build: {
          title: LocalizedStringSource;
          plinthTag: LocalizedStringSource;
          roofTag: LocalizedStringSource;
          glazingTag: LocalizedStringSource;
          rows: ReadoutRowSource[];
          rings: { km: string; label: LocalizedStringSource }[];
        };
        evolve: {
          title: LocalizedStringSource;
          year: LocalizedStringSource;
          sensorMoisture: LocalizedStringSource;
          sensorFlux: LocalizedStringSource;
          sensorCistern: LocalizedStringSource;
          rows: ReadoutRowSource[];
        };
      };
      controls: {
        orbit: LocalizedStringSource;
        paused: LocalizedStringSource;
        prev: LocalizedStringSource;
        next: LocalizedStringSource;
        seaDatum: LocalizedStringSource;
        dragHint: LocalizedStringSource;
        treeKept: LocalizedStringSource;
      };
    };
    stats: {
      coordLabel: string;
      statusLabel: LocalizedStringSource;
      modelSpec: string;
      cycle: string;
    };
  };
  approach: {
    sectionNumber: string;
    kicker: LocalizedStringSource;
    headline: LocalizedStringSource;
    intro: LocalizedStringSource;
    phaseLabels: {
      decided: LocalizedStringSource;
      calculated: LocalizedStringSource;
      built: LocalizedStringSource;
    };
    steps: ApproachStepSource[];
    commitments: LocalizedStringSource[];
  };
  services: {
    sectionNumber: string;
    kicker: LocalizedStringSource;
    headline: LocalizedStringSource;
    intro: LocalizedStringSource;
    toolsLabel: LocalizedStringSource;
    toolsLine: LocalizedStringSource;
    items: ServiceItemSource[];
  };
  materialsSection: {
    sectionNumber: string;
    kicker: LocalizedStringSource;
    headline: LocalizedStringSource;
    intro?: LocalizedStringSource;
    gridTab: LocalizedStringSource;
    schematicsTab: LocalizedStringSource;
    prevBtn: LocalizedStringSource;
    nextBtn: LocalizedStringSource;
    inspectBtn: LocalizedStringSource;
    closeBtn: LocalizedStringSource;
    navigateLabel: LocalizedStringSource;
    provenanceLabel: LocalizedStringSource;
    jumpToLabel: LocalizedStringSource;
    dossierTitle: LocalizedStringSource;
    footerPalette: LocalizedStringSource;
    footerHint: LocalizedStringSource;
  };
  work: {
    sectionNumber: string;
    kicker: LocalizedStringSource;
    headline: LocalizedStringSource;
    filterAll: LocalizedStringSource;
    filterResidential: LocalizedStringSource;
    filterInterior: LocalizedStringSource;
    viewDetails: LocalizedStringSource;
    closeSpec: LocalizedStringSource;
    modalSpecTitle: LocalizedStringSource;
    reasoningCondition: LocalizedStringSource;
    reasoningDecision: LocalizedStringSource;
    reasoningConsequence: LocalizedStringSource;
    sectionLabel: LocalizedStringSource;
    modalData: LocalizedStringSource;
    dataSite: LocalizedStringSource;
    dataYear: LocalizedStringSource;
    dataType: LocalizedStringSource;
    primaryPalette: LocalizedStringSource;
    conceptTag: LocalizedStringSource;
    inquireSimilar: LocalizedStringSource;
    prevProject: LocalizedStringSource;
    nextProject: LocalizedStringSource;
    projects: ProjectSource[];
  };
  materials: MaterialItemSource[];
  conditions: { id: ConditionId; label: LocalizedStringSource }[];
  studio: {
    sectionNumber: string;
    label: LocalizedStringSource;
    headline: LocalizedStringSource;
    subline: LocalizedStringSource;
    person: {
      name: string;
      role: LocalizedStringSource;
      education: string;
      years: LocalizedStringSource;
    };
    blocks: {
      number: string;
      title: LocalizedStringSource;
      text: LocalizedStringSource;
    }[];
    mapLabels: {
      studio: LocalizedStringSource;
    };
    map: Record<string, LocalizedStringSource>;
  };
  contact: {
    sectionNumber: string;
    kicker: LocalizedStringSource;
    headline: LocalizedStringSource;
    subtext: LocalizedStringSource;
    email: string;
    phone: string;
    address: string;
    portrait: {
      src: string;
      alt: LocalizedStringSource;
      line: LocalizedStringSource;
    };
    form: {
      nameLabel: LocalizedStringSource;
      emailLabel: LocalizedStringSource;
      projectTypeLabel: LocalizedStringSource;
      projectTypes: {
        value: string;
        label: LocalizedStringSource;
      }[];
      locationScaleLabel: LocalizedStringSource;
      messageLabel: LocalizedStringSource;
      namePlaceholder?: LocalizedStringSource;
      scalePlaceholder?: LocalizedStringSource;
      messagePlaceholder?: LocalizedStringSource;
      submitBtn: LocalizedStringSource;
      submitting: LocalizedStringSource;
      successTitle: LocalizedStringSource;
      successDesc: LocalizedStringSource;
      successRef: LocalizedStringSource;
      resetBtn: LocalizedStringSource;
      validation: {
        nameRequired: LocalizedStringSource;
        emailRequired: LocalizedStringSource;
        messageRequired: LocalizedStringSource;
      };
    };
  };
  footer: {
    legalNotice: LocalizedStringSource;
    privacy: LocalizedStringSource;
    impressum: LocalizedStringSource;
    backToTop: LocalizedStringSource;
    rights: string;
    impressumContent: LocalizedStringSource;
    privacyContent: LocalizedStringSource;
    labels: {
      studioTitle: LocalizedStringSource;
      hubsTitle: LocalizedStringSource;
      inquiriesTitle: LocalizedStringSource;
      legalTitle: LocalizedStringSource;
      legalDesc: LocalizedStringSource;
      accepting: LocalizedStringSource;
      coordinates: LocalizedStringSource;
      datum: LocalizedStringSource;
      basedIn: LocalizedStringSource;
      specialists: LocalizedStringSource;
    };
  };
}

export type MaterialItem = Resolved<MaterialItemSource>;
export type Project = Resolved<ProjectSource>;
export type ApproachStep = Resolved<ApproachStepSource>;
export type ServiceItem = Resolved<ServiceItemSource>;
export type ContentData = Resolved<ContentSource>;

const LANGUAGES: Language[] = ['en', 'de', 'es', 'ca', 'ru'];

/** Fills every missing translation with the English value, recursively. */
function withFallback<T>(value: T): Resolved<T> {
  if (Array.isArray(value)) {
    return value.map(withFallback) as Resolved<T>;
  }
  if (value !== null && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    if ('en' in obj) {
      return Object.fromEntries(
        LANGUAGES.map((lang) => [lang, withFallback(obj[lang] ?? obj.en)])
      ) as Resolved<T>;
    }
    return Object.fromEntries(
      Object.entries(obj).map(([key, v]) => [key, withFallback(v)])
    ) as Resolved<T>;
  }
  return value as Resolved<T>;
}

const source: ContentSource = {
  meta: {
    brand: "NOLOBO",
    tagline: {
      en: "Architecture, urbanism & landscape · Mallorca",
      de: "Architektur & Landschaft · Mallorca",
      es: "Arquitectura y Paisaje · Mallorca",
      ca: "Arquitectura i Paisatge · Mallorca",
      ru: "Архитектура и Ландшафт · Майорка"
    },
    coordinates: "39.5696° N · 2.6502° E",
    elevation: "14m ASL",
    locationName: "Palma de Mallorca, Illes Balears",
    timezone: "Europe/Madrid",
    availability: {
      en: "Accepting projects 2027",
      de: "Projekte für 2027 geöffnet",
      es: "Aceptando proyectos 2027",
      ca: "Acceptant projectes 2027",
      ru: "Прием проектов на 2027 год"
    },
    conditions: {
      place: { en: "Palma" },
      sunsetLabel: { en: "Sunset" },
      sunLabel: { en: "Sun" },
      poleLabel: { en: "1 m pole, shadow" },
      latitude: 39.5696,
      longitude: 2.6502
    },
    documentTitle: {
      en: "NOLOBO — Architecture, urbanism and landscape. Mallorca.",
      es: "NOLOBO — Arquitectura que parte del lugar",
      ca: "NOLOBO — Arquitectura que parteix del lloc",
      de: "NOLOBO — Architektur, die beim Ort beginnt",
      ru: "NOLOBO — Архитектура, которая начинается с места"
    },
    description: {
      en: "We design conditions: light, shade, air, heat, sound. Form is a consequence. Architecture, urbanism and landscape studio in Mallorca.",
      es: "Arquitectos y paisajistas en Mallorca. Primero escuchamos, trabajamos con materiales locales y usamos herramientas digitales donde marcan la diferencia.",
      ca: "Arquitectes i paisatgistes a Mallorca. Primer escoltam, treballam amb materials locals i utilitzam eines digitals on marquen la diferència.",
      de: "Architekten und Landschaftsarchitekten auf Mallorca. Wir hören zuerst zu, arbeiten mit lokalen Materialien und setzen digitale Werkzeuge dort ein, wo sie den Unterschied machen.",
      ru: "Архитекторы и ландшафтные архитекторы на Майорке. Сначала слушаем, работаем с местными материалами и используем цифровые инструменты там, где они действительно помогают."
    }
  },
  nav: {
    approach: { en: "Method", de: "Ansatz", es: "Método", ca: "Mètode", ru: "Подход" },
    services: { en: "Services", de: "Leistungen", es: "Servicios", ca: "Serveis", ru: "Услуги" },
    work: { en: "Projects", de: "Projekte", es: "Obras", ca: "Projectes", ru: "Проекты" },
    materials: { en: "Materials", de: "Materialien", es: "Materiales", ca: "Materials", ru: "Материалы" },
    studio: { en: "Studio", de: "Studio", es: "Estudio", ca: "Estudi", ru: "Студия" },
    contact: { en: "Contact", de: "Kontakt", es: "Contacto", ca: "Contacte", ru: "Контакты" }
  },
  aria: {
    skipLink: {
      en: "Skip to main content",
      de: "Zum Hauptinhalt springen",
      es: "Saltar al contenido principal",
      ca: "Saltar al contingut principal",
      ru: "Перейти к основному содержимому"
    },
    mainNav: { en: "Main Navigation", de: "Hauptnavigation", es: "Navegación principal", ca: "Navegació principal", ru: "Главная навигация" },
    langSelect: { en: "Language selection", de: "Sprachauswahl", es: "Selección de idioma", ca: "Selecció d'idioma", ru: "Выбор языка" },
    openMenu: { en: "Open menu", de: "Menü öffnen", es: "Abrir menú", ca: "Obrir menú", ru: "Открыть меню" },
    closeMenu: { en: "Close menu", de: "Menü schließen", es: "Cerrar menú", ca: "Tancar menú", ru: "Закрыть меню" },
    homeLink: { en: "NOLOBO homepage", de: "NOLOBO Architektur Startseite", es: "NOLOBO Arquitectura Inicio", ca: "NOLOBO Arquitectura Inici", ru: "NOLOBO Главная страница" },
    closeModal: { en: "Close dialog", de: "Dialog schließen", es: "Cerrar ventana", ca: "Tancar finestra", ru: "Закрыть окно" },
    prevMaterial: { en: "Previous material", de: "Vorheriges Material", es: "Material anterior", ca: "Material anterior", ru: "Предыдущий материал" },
    nextMaterial: { en: "Next material", de: "Nächstes Material", es: "Siguiente material", ca: "Següent material", ru: "Следующий материал" },
    prevProject: { en: "Previous project", de: "Vorheriges Projekt", es: "Proyecto anterior", ca: "Projecte anterior", ru: "Предыдущий проект" },
    nextProject: { en: "Next project", de: "Nächstes Projekt", es: "Siguiente proyecto", ca: "Següent projecte", ru: "Следующий проект" },
    inspectSpec: { en: "Open project", de: "Spezifikationen einsehen", es: "Ver especificaciones", ca: "Veure especificacions", ru: "Изучить спецификацию" },
    backToTop: { en: "Scroll back to top of page", de: "Zurück zum Seitenanfang", es: "Volver arriba de la página", ca: "Tornar a dalt de la pàgina", ru: "Вернуться в начало страницы" },
    interactiveModel: {
      en: "Interactive 3D model of a site: sun, wind, ground, material and time.",
      de: "Interaktives 3D-Modell: Der Ort entwirft das Haus. Nichts wird verschwendet.",
      es: "Modelo 3D interactivo: El lugar diseña la casa. Nada se desperdicia.",
      ca: "Model 3D interactiu: El lloc dissenya la casa. Res no es malbarata.",
      ru: "Интерактивная 3D-модель: Место проектирует дом. Ничего не пропадает."
    }
  },
  hero: {
    headline: { en: "We design\nconditions." },
    conditionWords: [
      { en: "Light." },
      { en: "Air." },
      { en: "Shade." },
      { en: "Heat." },
      { en: "Weight." },
      { en: "Silence." }
    ],
    closing: { en: "Architecture comes after." },
    ctaWork: { en: "Projects" },
    ctaInquire: { en: "Start a conversation" },
    model: {
      header: { en: "The place, before the drawing." },
      locationCode: "DEIÀ TRANSECT · 39°45'N 2°39'E",
      tabs: [
        { en: "Observe" },
        { en: "Decide" },
        { en: "Ground" },
        { en: "Material" },
        { en: "Time" }
      ],
      captions: [
        { en: "Sun, wind and shade, read before the first sketch." },
        { en: "Where the house goes. Which trees stay." },
        { en: "What we dig out becomes the walls." },
        { en: "Stone from 14 to 48 km away." },
        { en: "Trees grow. Shade moves. The site keeps changing." }
      ],
      readouts: {
        scan: {
          title: { en: "SUN + WIND" },
          rows: [
            { label: { en: "SUN PATH:" }, value: { en: "E → S → W" } },
            { label: { en: "TREES MAPPED:" }, value: { en: "23 / 23" } },
            { label: { en: "PREVAILING WIND:" }, value: { en: "SW · EMBAT" } }
          ]
        },
        fit: {
          title: { en: "SITING" },
          chosenLabel: { en: "CHOSEN ENVELOPE" },
          rows: [
            { label: { en: "Morning sun · kitchen" }, value: { en: "REACHES" } },
            { label: { en: "Shade · terrace 16:00" }, value: { en: "HOLDS" } },
            { label: { en: "Sea view · bedroom" }, value: { en: "OPEN" } },
            { label: { en: "Trees kept" }, value: { en: "23 / 23" } }
          ]
        },
        ground: {
          title: { en: "GROUND" },
          materialFlow: { en: "EXCAVATED STONE → WALL MASONRY" },
          rows: [
            { label: { en: "CUT:" }, value: { en: "EXCAVATED STONE" } },
            { label: { en: "FILL:" }, value: { en: "BACK INTO THE SLOPE" } },
            { label: { en: "WALLS:" }, value: { en: "BUILT FROM THE CUT" } }
          ]
        },
        build: {
          title: { en: "MATERIAL SOURCES" },
          plinthTag: { en: "PLINTH · STONE" },
          roofTag: { en: "ROOF · PLANTED" },
          glazingTag: { en: "GLASS · SHADED" },
          rows: [
            { label: { en: "NEAREST:" }, value: { en: "14 KM" } },
            { label: { en: "FARTHEST:" }, value: { en: "48 KM" } }
          ],
          rings: [
            { km: "14 km", label: { en: "Marratxí clay tiles" } },
            { km: "26 km", label: { en: "Tramuntana stone" } },
            { km: "34 km", label: { en: "Porreres marès" } },
            { km: "48 km", label: { en: "Santanyí limestone" } }
          ]
        },
        evolve: {
          title: { en: "TIME" },
          year: { en: "YEAR" },
          sensorMoisture: { en: "CANOPY · SHADE" },
          sensorFlux: { en: "WALL · HOLDS HEAT" },
          sensorCistern: { en: "CISTERN · RAINWATER" },
          rows: [
            { label: { en: "SHADE:" }, value: { en: "GROWS WITH THE TREES" } },
            { label: { en: "WATER:" }, value: { en: "HELD ON SITE" } }
          ]
        }
      },
      controls: {
        orbit: { en: "ORBIT" },
        paused: { en: "PAUSED" },
        prev: { en: "← PREV" },
        next: { en: "NEXT →" },
        seaDatum: { en: "● SEA LEVEL ±0.0M" },
        dragHint: { en: "DRAG TO ORBIT · AUTO-CYCLE" },
        treeKept: { en: "KEPT" }
      }
    },
    stats: {
      coordLabel: "MALLORCA 39.57°N / 2.65°E",
      statusLabel: { en: "ACCEPTING PROJECTS 2027" },
      modelSpec: "TERRAIN & EMBEDDED ARCHITECTURE",
      cycle: "COMMISSION CYCLE 2027"
    }
  },
  approach: {
    sectionNumber: "03",
    kicker: { en: "Method" },
    headline: { en: "The computer doesn't have taste." },
    intro: {
      en: "It calculates what we ask it to calculate. We use computational design, structural analysis and simulation on every project. They make a decision perform. They don't make the decision."
    },
    phaseLabels: {
      decided: { en: "DECIDED" },
      calculated: { en: "CALCULATED" },
      built: { en: "BUILT" }
    },
    steps: [
      {
        step: "01",
        phase: { en: "Observe" },
        title: { en: "What is already there?" },
        description: { en: "Sun, wind, slope, trees, water. And how you live." }
      },
      {
        step: "02",
        phase: { en: "Decide" },
        title: { en: "What stays, goes or gets stronger?" },
        description: { en: "Settled before any drawing exists." }
      },
      {
        step: "03",
        phase: { en: "Draw" },
        title: { en: "What is the minimum architecture needed?" },
        description: { en: "Only what produces the conditions." }
      },
      {
        step: "04",
        phase: { en: "Calculate" },
        title: { en: "Make it perform." },
        description: { en: "Computation and engineering serve the decision." }
      },
      {
        step: "05",
        phase: { en: "Build" },
        title: { en: "Make the idea survive construction." },
        description: { en: "We are on site. The drawing is not the building." }
      }
    ],
    commitments: [
      { en: "One architect from first meeting to handover" },
      { en: "On site regularly during construction" },
      { en: "Reply within one working day" },
      { en: "A limited number of projects per year" }
    ]
  },
  services: {
    sectionNumber: "04",
    kicker: { en: "Services" },
    headline: { en: "What we take on." },
    intro: { en: "Four ways in. Each starts with the place." },
    toolsLabel: { en: "TOOLS" },
    toolsLine: {
      en: "Computational design, structure, simulation and coordination, by specialists we assemble for each project."
    },
    items: [
      {
        id: "terrain",
        number: "01",
        title: { en: "Landscape & Terrain" },
        summary: { en: "Where water goes. Where shade falls. What the slope holds." },
        scope: {
          en: [
            "Slope stabilisation, pedra en sec",
            "Cisterns and water routing",
            "Planting for shade and water",
            "Sun and shade zoning"
          ]
        },
        conditions: ["water", "shade", "weight"]
      },
      {
        id: "arch",
        number: "02",
        title: { en: "Architecture" },
        summary: { en: "Heat, light and air first. Structure follows." },
        scope: {
          en: [
            "Proyecto Básico and de Ejecución",
            "Ajuntament permitting and licences",
            "Envelope and solar shading",
            "Natural ventilation"
          ]
        },
        conditions: ["heat", "light", "air"]
      },
      {
        id: "interior",
        number: "03",
        title: { en: "Interior Architecture" },
        summary: { en: "Texture, sound and light at arm's length." },
        scope: {
          en: [
            "Joinery drawings, 1:1 and 1:5",
            "Stone, lime, bronze: selection and detail",
            "Daylight and lamp light",
            "Acoustics"
          ]
        },
        conditions: ["light", "sound"]
      },
      {
        id: "direction",
        number: "04",
        title: { en: "Site Direction" },
        summary: { en: "Builders, artisans, schedule, budget. Directed on site." },
        scope: {
          en: [
            "Dirección facultativa de obra",
            "Builder and artisan coordination",
            "Budget and milestone control",
            "Final occupancy licence"
          ]
        },
        conditions: ["time"]
      }
    ]
  },
  materialsSection: {
    sectionNumber: "05",
    kicker: {
      en: "Materials",
      de: "Lokale Materialien",
      es: "Materiales autóctonos",
      ca: "Materials autòctons",
      ru: "Материалы острова"
    },
    headline: {
      en: "Material is not a finish.",
      de: "Materialien von hier.",
      es: "Materiales de aquí.",
      ca: "Materials d'aquí.",
      ru: "Материалы острова."
    },
    intro: {
      en: "Each one does a job. It stores heat, softens light, changes sound, lets water through, or turns sun into shade.",
      de: "Architektur, verwurzelt in balearischer Geologie, traditionsreichen Steinbrüchen und jahrhundertealtem Handwerk.",
      es: "Arquitectura enraizada en la geología balear, canteras históricas y técnicas centenarias que respiran con el clima insular.",
      ca: "Arquitectura arrelada a la geologia balear, pedreres històriques i oficis que respiren amb el clima de l'illa.",
      ru: "Архитектура, укорененная в геологии Балеарских островов, исторических карьерах и традициях ручной работы."
    },
    gridTab: {
      en: "Materials (6)",
      de: "Materialraster (6)",
      es: "Muestrario de materiales (6)",
      ca: "Mostrari de materials (6)",
      ru: "Сетка материалов (6)"
    },
    schematicsTab: {
      en: "Devices (6)",
      de: "Geländeschemata (5)",
      es: "Esquemas de terreno (5)",
      ca: "Esquemes de terreny (5)",
      ru: "Схемы ландшафта (5)"
    },
    prevBtn: { en: "← PREV", de: "← ZURÜCK", es: "← ANTERIOR", ca: "← ANTERIOR", ru: "← НАЗАД" },
    nextBtn: { en: "NEXT →", de: "WEITER →", es: "SIGUIENTE →", ca: "SEGÜENT →", ru: "ВПЕРЕД →" },
    inspectBtn: { en: "Open", de: "Material ansehen", es: "Ver material", ca: "Veure material", ru: "Подробнее" },
    closeBtn: { en: "Close [✕]", de: "Schließen [✕]", es: "Cerrar [✕]", ca: "Tancar [✕]", ru: "Закрыть [✕]" },
    navigateLabel: {
      en: "NAVIGATE MATERIALS:",
      de: "MATERIALIEN WÄHLEN:",
      es: "NAVEGAR MATERIALES:",
      ca: "NAVEGAR MATERIALS:",
      ru: "ВЫБОР МАТЕРИАЛА:"
    },
    provenanceLabel: {
      en: "PROVENANCE & LOGISTICS:",
      de: "HERKUNFT & LOGISTIK:",
      es: "PROCEDENCIA Y LOGÍSTICA:",
      ca: "PROCEDÈNCIA I LOGÍSTICA:",
      ru: "ПРОИСХОЖДЕНИЕ И ЛОГИСТИКА:"
    },
    jumpToLabel: {
      en: "JUMP TO:",
      de: "WECHSELN ZU:",
      es: "IR A:",
      ca: "ANAR A:",
      ru: "ПЕРЕЙТИ К:"
    },
    dossierTitle: {
      en: "MATERIAL DOSSIER",
      de: "MATERIALDOSSIER",
      es: "DOSIER DE MATERIAL",
      ca: "DOSSIER DE MATERIAL",
      ru: "ПАСПОРТ МАТЕРИАЛА"
    },
    footerPalette: {
      en: "MARÈS · SANTANYÍ · CALÇ · PEDRA EN SEC · ULLASTRE · FANG",
      de: "BALEARISCHE MATERIALPALETTE · SANTANYÍ · MARÈS · KALK · TROCKENSTEIN",
      es: "PALETA TÁCTIL BALEAR · SANTANYÍ · MARÈS · CAL VIVA · PIEDRA SECA",
      ca: "PALETA TÀCTIL BALEAR · SANTANYÍ · MARÈS · CALÇ · PEDRA EN SEC",
      ru: "БАЛЕАРСКАЯ ПАЛИТРА · САНТАНЬИ · МАРЕС · ИЗВЕСТЬ · СУХАЯ КЛАДКА"
    },
    footerHint: {
      en: "CLICK ANY MATERIAL TILE TO INSPECT · USE ARROWS (← / →) TO NAVIGATE",
      de: "KLICKEN ZUM INSPEZIEREN · PFEILTASTEN (← / →) ZUM BLÄTTERN",
      es: "PULSA CUALQUIER MATERIAL PARA EXAMINAR · FLECHAS (← / →) PARA NAVEGAR",
      ca: "PREMEU QUALSEVOL MATERIAL PER VEURE EL DETALL · FLETXES (← / →) PER NAVEGAR",
      ru: "КЛИКНИТЕ НА МАТЕРИАЛ ДЛЯ ДЕТАЛЕЙ · СТРЕЛКИ (← / →) ДЛЯ НАВИГАЦИИ"
    }
  },
  work: {
    sectionNumber: "01",
    kicker: { en: "Projects" },
    headline: { en: "Read by the hour." },
    filterAll: { en: "All" },
    filterResidential: { en: "Architecture" },
    filterInterior: { en: "Interior" },
    viewDetails: { en: "Open project" },
    closeSpec: { en: "Close [ESC ✕]" },
    modalSpecTitle: { en: "DESIGN CONCEPT" },
    reasoningCondition: { en: "WHAT THE SITE GAVE" },
    reasoningDecision: { en: "WHAT WE DID" },
    reasoningConsequence: { en: "WHAT IT DOES" },
    sectionLabel: { en: "SECTION · NOT TO SCALE" },
    modalData: { en: "PROJECT DATA" },
    dataSite: { en: "SITE" },
    dataYear: { en: "YEAR" },
    dataType: { en: "TYPE" },
    primaryPalette: { en: "MATERIALS" },
    conceptTag: { en: "CONCEPT" },
    inquireSimilar: { en: "Talk about a project like this →" },
    prevProject: { en: "[PREV ←]" },
    nextProject: { en: "[NEXT →]" },
    projects: [
      {
        id: "tramuntana-villa",
        number: "01",
        title: "Casa Tramuntana",
        location: "Deià, Serra de Tramuntana",
        year: "2025",
        category: { en: "Residential Architecture" },
        materials: "Santanyí Limestone, Pigmented Concrete, Teak",
        image: tramuntanaImg,
        aspect: "16:9",
        thesis: { en: "Build into the slope." },
        position: {
          en: "38° slope. We don't fight it. We dig in, and the stone we dig out holds the hill back."
        },
        reasoning: [
          { label: { en: "Slope" }, condition: { en: "38°" }, decision: { en: "House enters the terrain" }, consequence: { en: "Roofs sit level with the olive terraces." } },
          { label: { en: "Sun" }, condition: { en: "Western, in the afternoon" }, decision: { en: "Deep shade" }, consequence: { en: "Terraces and courtyards stay shaded after midday." } },
          { label: { en: "Air" }, condition: { en: "Evening sea air" }, decision: { en: "Courtyard opens to it" }, consequence: { en: "Sea air crosses the courtyard in the evening." } },
          { label: { en: "Stone" }, condition: { en: "Excavated on site" }, decision: { en: "Stone returns as retaining walls" }, consequence: { en: "The walls are made of the site." } },
          { label: { en: "Road" }, condition: { en: "Visible from the coast road" }, decision: { en: "Building stays below the skyline" }, consequence: { en: "From the road: terraces, no house." } }
        ]
      },
      {
        id: "palma-penthouse",
        number: "02",
        title: "Ático Calatrava",
        location: "Palma Historic Old Town",
        year: "2024",
        category: { en: "Interior Architecture" },
        materials: "Continuous Microcement, White Oak, Santanyí Stone",
        image: palmaImg,
        aspect: "4:3",
        thesis: { en: "Take out the walls. Keep the room." },
        position: {
          en: "A 17th-century attic, cut up by centuries of partitions. We removed them. The thick walls stay."
        },
        reasoning: [
          { label: { en: "Partitions" }, condition: { en: "Centuries of them" }, decision: { en: "Removed" }, consequence: { en: "Light and air cross the whole floor." } },
          { label: { en: "Walls" }, condition: { en: "17th-century, thick" }, decision: { en: "Kept as they are" }, consequence: { en: "Street heat and noise stay out." } },
          { label: { en: "Floor" }, condition: { en: "Santanyí stone" }, decision: { en: "Left bare" }, consequence: { en: "Cool underfoot in summer." } }
        ]
      },
      {
        id: "cliff-pavilion",
        number: "03",
        title: "Pavilion Cala Llamp",
        location: "Port d'Andratx",
        year: "2026",
        category: { en: "Coastal Architecture" },
        materials: "Lime Plaster, Marine Grade Stainless Steel, Low-Iron Glass",
        image: cliffImg,
        aspect: "16:9",
        thesis: { en: "Let the cliff decide." },
        position: {
          en: "Salt air, wind and low afternoon sun. Each one chose a material or a shape. The building stays off the edge."
        },
        reasoning: [
          { label: { en: "Salt" }, condition: { en: "Air at the cliff" }, decision: { en: "Lime, stainless steel, low-iron glass" }, consequence: { en: "Materials that stand salt air." } },
          { label: { en: "Edge" }, condition: { en: "The cliff drops away" }, decision: { en: "Cantilever" }, consequence: { en: "The building stays off the edge. Its mass stays small." } },
          { label: { en: "Sun" }, condition: { en: "Low, from the south-west, in the afternoon" }, decision: { en: "Deep eaves" }, consequence: { en: "The glass stays in shade." } }
        ]
      },
      {
        id: "finca-son-vida",
        number: "04",
        title: "Finca Son Vida",
        location: "Son Vida, Palma",
        year: "2025",
        category: { en: "Heritage Transformation" },
        materials: "Original Fieldstone, Blackened Steel, Lime Mortar",
        image: fincaImg,
        aspect: "4:3",
        thesis: { en: "The old stays. The new is thin." },
        position: {
          en: "A 19th-century finca with thick fieldstone walls. The new programme goes inside the old line, in blackened steel. The stone is not touched."
        },
        reasoning: [
          { label: { en: "Fieldstone" }, condition: { en: "19th-century walls" }, decision: { en: "Left untouched" }, consequence: { en: "The rooms stay as cool and dark as they were." } },
          { label: { en: "New use" }, condition: { en: "A gallery and a pool" }, decision: { en: "One thin steel addition" }, consequence: { en: "The new reads as new, inside the old line." } },
          { label: { en: "Pool" }, condition: { en: "Needs sun and shade" }, decision: { en: "Placed beside the old wall" }, consequence: { en: "Sun first, then the wall's shade." } }
        ]
      },
      {
        id: "santanyi-studio",
        number: "05",
        title: "Espacio Santanyí",
        location: "Santanyí, Migjorn",
        year: "2026",
        category: { en: "Interior & Millwork" },
        materials: "Solid Santanyí Stone, Raw Brass, Textured Lime",
        image: santanyiImg,
        aspect: "4:3",
        thesis: { en: "Cut it from one block." },
        position: {
          en: "Kitchen and bathroom are carved from single blocks of Santanyí limestone. Nothing is applied on top."
        },
        reasoning: [
          { label: { en: "Room" }, condition: { en: "Small" }, decision: { en: "Volumes carved from solid stone" }, consequence: { en: "No joints. No applied finish." } },
          { label: { en: "Light" }, condition: { en: "Low, from the east, in the morning" }, decision: { en: "Lime on the walls" }, consequence: { en: "The light stays soft." } },
          { label: { en: "Hand" }, condition: { en: "Where the hand lands" }, decision: { en: "Brass" }, consequence: { en: "Metal exactly where you touch." } }
        ]
      }
    ]
  },
  materials: [
    {
      id: "mares",
      name: { en: "Marès" },
      localName: "Pedra de Marès",
      subtitle: { en: "Calcarenite, quarried in Mallorca" },
      does: { en: "Stone stores heat." },
      description: {
        en: "Porous and heavy. It takes up the day's heat slowly and gives it back at night. Cut in blocks at the quarry."
      },
      origin: "Llucmajor & Porreres Quarries",
      distance: "Porreres · 34 km",
      image: maresImg,
      conditions: ["heat", "weight"]
    },
    {
      id: "santanyi",
      name: { en: "Santanyí Stone" },
      localName: "Pedra de Santanyí",
      subtitle: { en: "Fine-grained limestone" },
      does: { en: "Dense stone evens out the day." },
      description: {
        en: "Hard and fine-grained. Its mass slows temperature swings between noon and night. It takes a sharp edge, so it is cut to exact profiles."
      },
      origin: "Santanyí Quarries",
      distance: "Santanyí · 48 km",
      image: santanyiStoneImg,
      conditions: ["heat", "weight"]
    },
    {
      id: "lime",
      name: { en: "Lime Plaster" },
      localName: "Calç Viva Artesanal",
      subtitle: { en: "Slaked lime and river sand" },
      does: { en: "Lime softens light." },
      description: {
        en: "A matt mineral surface. It scatters sun instead of reflecting it, and lets the wall dry."
      },
      origin: "Traditional Balearic Kilns",
      distance: "Manacor · 52 km",
      image: limeImg,
      conditions: ["light", "water"]
    },
    {
      id: "dry-stone",
      name: { en: "Dry-Stone Walling" },
      localName: "Pedra en Sec",
      subtitle: { en: "Mortarless walling, a UNESCO-listed technique" },
      does: { en: "Dry stone lets water through." },
      description: {
        en: "Walls laid without mortar. Rain drains through them instead of pushing against them. Terraces hold the slope."
      },
      origin: "Serra de Tramuntana Slopes",
      distance: "Tramuntana · 26 km",
      image: dryStoneImg,
      conditions: ["water", "weight"]
    },
    {
      id: "olive-wood",
      name: { en: "Olive Wood" },
      localName: "Ullastre Mallorquí",
      subtitle: { en: "Dense, slow-grown timber" },
      does: { en: "Wood changes sound." },
      description: {
        en: "Reclaimed from pruning. Wood on walls and ceilings breaks up echo, so a room of hard surfaces stops ringing. Warm to the hand."
      },
      origin: "Pla de Mallorca Woodlands",
      distance: "Pla de Mallorca · 31 km",
      image: oliveWoodImg,
      conditions: ["sound"]
    },
    {
      id: "ceramic",
      name: { en: "Local Ceramic Tile" },
      localName: "Rajoles de Fang Artesanals",
      subtitle: { en: "Terracotta fired in wood kilns" },
      does: { en: "Clay stays cool underfoot." },
      description: {
        en: "Fired in wood-burning kilns in central Mallorca. A floor that stays cool on bare feet in summer."
      },
      origin: "Marratxí & Campos Workshops",
      distance: "Marratxí · 14 km",
      image: ceramicImg,
      conditions: ["heat"]
    }
  ],
  conditions: [
    { id: "light", label: { en: "Light" } },
    { id: "shade", label: { en: "Shade" } },
    { id: "air", label: { en: "Air" } },
    { id: "heat", label: { en: "Heat" } },
    { id: "sound", label: { en: "Sound" } },
    { id: "water", label: { en: "Water" } },
    { id: "weight", label: { en: "Weight" } },
    { id: "time", label: { en: "Time" } }
  ],
  studio: {
    sectionNumber: "02",
    label: { en: "Studio" },
    headline: { en: "Taste is trained." },
    subline: { en: "Not a feeling. Judgment accumulates." },
    person: {
      name: "Daniil Svinolobov",
      role: { en: "Architect. Leads every project." },
      education: "ETSAM, Madrid · UPV/EHU, Basque Country",
      years: { en: "2014–2020 Bachelor · 2021–22 Master" }
    },
    blocks: [
      { number: "01", title: { en: "Mallorca" }, text: { en: "Based in Palma. We know the quarries, kilns, builders and artisans in person." } },
      { number: "02", title: { en: "Remote-first" }, text: { en: "Specialists work remotely. We meet in person where it matters: with you, on site, with builders." } },
      { number: "03", title: { en: "Focused" }, text: { en: "A limited number of projects per year. Every project gets the architect's full attention." } },
      { number: "04", title: { en: "Experience" }, text: { en: "Architecture and landscape projects in Spain and Germany. Masterplanning and resilience work for Haiti." } },
      { number: "05", title: { en: "Specialists" }, text: { en: "Computational design, structure and local craft, assembled for each project. They calculate and build what we decide." } }
    ],
    mapLabels: { studio: {"en": "Studio", "es": "Estudio", "ca": "Estudi", "de": "Studio", "ru": "Студия"} },
    map: {
      fig: {"en": "Fig. 04 · Studio network", "es": "Fig. 04 · Red del estudio", "ca": "Fig. 04 · Xarxa de l'estudi", "de": "Abb. 04 · Studionetzwerk", "ru": "Рис. 04 · Сеть студии"},
      layerAria: {"en": "Map layers", "es": "Capas del mapa", "ca": "Capes del mapa", "de": "Kartenebenen", "ru": "Слои карты"},
      both: {"en": "Both", "es": "Todo", "ca": "Tot", "de": "Beides", "ru": "Всё"},
      island: {"en": "Island", "es": "Isla", "ca": "Illa", "de": "Insel", "ru": "Остров"},
      remote: {"en": "Remote", "es": "Remoto", "ca": "Remot", "de": "Remote", "ru": "Удалённо"},
      studioPlace: {"en": "Palma", "es": "Palma", "ca": "Palma", "de": "Palma", "ru": "Пальма"},
      site: {"en": "Site", "es": "Obra", "ca": "Obra", "de": "Projekt", "ru": "Объект"},
      stone: {"en": "Stone", "es": "Piedra", "ca": "Pedra", "de": "Naturstein", "ru": "Камень"},
      drystone: {"en": "Dry-stone walls", "es": "Piedra en seco", "ca": "Pedra en sec", "de": "Trockenmauern", "ru": "Сухая кладка"},
      ceramics: {"en": "Ceramics", "es": "Cerámica", "ca": "Ceràmica", "de": "Keramik", "ru": "Керамика"},
      wood: {"en": "Olive wood", "es": "Madera de olivo", "ca": "Fusta d'olivera", "de": "Olivenholz", "ru": "Оливковое дерево"},
      builders: {"en": "Builders", "es": "Constructoras", "ca": "Constructores", "de": "Baufirmen", "ru": "Подрядчики"},
      wetland: {"en": "Wetland", "es": "Humedal", "ca": "Zona humida", "de": "Feuchtgebiet", "ru": "Водно-болотные угодья"},
      peak: {"en": "Highest peak", "es": "Cima más alta", "ca": "Cim més alt", "de": "Höchster Gipfel", "ru": "Высшая точка"},
      remoteZone: {"en": "Specialists · remote", "es": "En remoto · desde cualquier lugar", "ca": "En remot · des de qualsevol lloc", "de": "Remote · ortsunabhängig", "ru": "Удалённо · из любой точки"},
      team: {"en": "Daniil", "es": "Equipo", "ca": "Equip", "de": "Studioteam", "ru": "Команда"},
      comp: {"en": "Computational design", "es": "Diseño computacional", "ca": "Disseny computacional", "de": "Computational Design", "ru": "Вычислительный дизайн"},
      eng: {"en": "Engineering", "es": "Ingeniería", "ca": "Enginyeria", "de": "Ingenieurwesen", "ru": "Инженерия"},
      analysis: {"en": "Analysis", "es": "Análisis", "ca": "Anàlisi", "de": "Analyse", "ru": "Анализ"},
      experience: {"en": "Project experience", "es": "Experiencia en proyectos", "ca": "Experiència en projectes", "de": "Projekterfahrung", "ru": "Опыт проектов"},
      legendInPerson: {"en": "In person", "es": "En persona", "ca": "En persona", "de": "Persönlich", "ru": "Лично"},
      legendRemote: {"en": "Remote", "es": "En remoto", "ca": "En remot", "de": "Remote", "ru": "Удалённо"},
      legendArtisans: {"en": "Artisans", "es": "Artesanos", "ca": "Artesans", "de": "Handwerk", "ru": "Мастера"},
      legendSites: {"en": "Sites", "es": "Obras", "ca": "Obres", "de": "Projekte", "ru": "Объекты"},
      legendHabitat: {"en": "Habitat", "es": "Hábitat", "ca": "Hàbitat", "de": "Lebensraum", "ru": "Природная среда"},
      dailyWork: {"en": "Daily work", "es": "Trabajo diario", "ca": "Feina diària", "de": "Tagesarbeit", "ru": "Ежедневная работа"},
      meetings: {"en": "Meetings", "es": "Reuniones", "ca": "Reunions", "de": "Termine", "ru": "Встречи"},
      projectsYear: {"en": "Projects / year", "es": "Proyectos / año", "ca": "Projectes / any", "de": "Projekte / Jahr", "ru": "Проектов в год"},
      disciplines: {"en": "Disciplines", "es": "Disciplinas", "ca": "Disciplines", "de": "Disziplinen", "ru": "Направлений"},
      north: {"en": "N", "es": "N", "ca": "N", "de": "N", "ru": "С"},
      mapAria: {"en": "Map of Mallorca showing the studio in Palma, local artisans, builders and project sites connected in person, and a remote network of specialists.", "es": "Mapa de Mallorca con el estudio en Palma, artesanos, constructoras y obras conectados en persona, y una red remota de especialistas.", "ca": "Mapa de Mallorca amb l'estudi a Palma, artesans, constructores i obres connectats en persona, i una xarxa remota d'especialistes.", "de": "Karte von Mallorca mit dem Studio in Palma, lokalem Handwerk, Baufirmen und Projekten vor Ort sowie einem Remote-Netzwerk von Fachleuten.", "ru": "Карта Майорки: студия в Пальме, мастера, подрядчики и объекты — лично, и удалённая сеть специалистов."}
    }
  },
  contact: {
    sectionNumber: "06",
    kicker: {
      en: "Contact",
      de: "Kontakt",
      es: "Contacto",
      ca: "Contacte",
      ru: "Контакты"
    },
    headline: {
      en: "Tell us about the place.",
      de: "Gespräch beginnen.",
      es: "Iniciar conversación.",
      ca: "Iniciar conversa.",
      ru: "Начать диалог."
    },
    subtext: {
      en: "Send the site, the brief and the year you want to build. Daniil replies within one working day.",
      de: "Wir arbeiten mit Bauherren auf Mallorca und in ganz Europa. Kontaktieren Sie uns für Ihr Grundstück, eine Idee oder ein Bauvorhaben.",
      es: "Colaboramos con clientes en Mallorca y en toda Europa. Escríbanos directamente para valorar una parcela, una idea o un nuevo proyecto.",
      ca: "Col·laborem amb clients a Mallorca i a tot Europa. Escriviu-nos directament per valorar una parcel·la, una idea o un nou projecte.",
      ru: "Мы работаем с клиентами на Майорке и по всей Европе. Свяжитесь с нами, чтобы обсудить участок, замысел или будущий проект."
    },
    email: "studio@nolobo.es",
    phone: "+34 971 88 42 10",
    address: "Carrer de Sant Feliu 17, 07012 Palma de Mallorca, Illes Balears",
    portrait: {
      // Placeholder until a real portrait is added to public/images/.
      src: "/images/portrait-placeholder.svg",
      alt: { en: "Portrait of Daniil" },
      line: { en: "You'll talk to Daniil directly." }
    },
    form: {
      nameLabel: {
        en: "Name",
        de: "Vollständiger Name / Organisation",
        es: "Nombre completo / Entidad",
        ca: "Nom complet / Entitat",
        ru: "Имя / Организация"
      },
      emailLabel: {
        en: "Email",
        de: "Direkte E-Mail-Adresse",
        es: "Correo electrónico directo",
        ca: "Correu electrònic directe",
        ru: "Электронная почта"
      },
      projectTypeLabel: {
        en: "Project type",
        de: "Projekt-Typologie",
        es: "Tipología del proyecto",
        ca: "Tipologia del projecte",
        ru: "Тип проекта"
      },
      projectTypes: [
        {
          value: "new_build",
          label: {
            en: "New house",
            de: "Neubau Villa / Wohnresidenz",
            es: "Obra nueva: Villa / Residencia",
            ca: "Obra nova: Vil·la / Residència",
            ru: "Новое строительство: вилла / резиденция"
          }
        },
        {
          value: "heritage_renovation",
          label: {
            en: "Renovation of a historic finca or palacio",
            de: "Finca- / Palais-Sanierung",
            es: "Rehabilitación de Finca / Palacio",
            ca: "Rehabilitació de Finca / Casal històric",
            ru: "Реновация исторической усадьбы или паласио"
          }
        },
        {
          value: "interior_architecture",
          label: {
            en: "Interior architecture",
            de: "Exklusiver Innenausbau",
            es: "Arquitectura interior de alta gama",
            ca: "Arquitectura interior i mobiliari d'autor",
            ru: "Премиальная интерьерная архитектура"
          }
        },
        {
          value: "landscape_architecture",
          label: {
            en: "Landscape architecture",
            de: "Landschaftsarchitektur & Geländegestaltung",
            es: "Arquitectura del paisaje e integración",
            ca: "Arquitectura del paisatge i integració",
            ru: "Ландшафтная архитектура и интеграция"
          }
        }
      ],
      locationScaleLabel: {
        en: "Site and size (m²)",
        de: "Standort & ungefähre Fläche (m²)",
        es: "Ubicación aproximada y escala (m²)",
        ca: "Ubicació aproximada i superfície (m²)",
        ru: "Примерная локация и площадь (м²)"
      },
      messageLabel: {
        en: "The place, and what should happen there",
        de: "Projektumfang & Zielsetzung",
        es: "Alcance e intenciones del proyecto",
        ca: "Abast i intencions del projecte",
        ru: "Пожелания и цели проекта"
      },
      submitBtn: {
        en: "Send",
        de: "Nachricht senden",
        es: "Enviar consulta",
        ca: "Enviar missatge",
        ru: "Отправить запрос"
      },
      submitting: {
        en: "Sending…",
        de: "Übertrage...",
        es: "Enviando...",
        ca: "Enviant...",
        ru: "Отправка..."
      },
      successTitle: {
        en: "Received.",
        de: "Anfrage erfasst",
        es: "Consulta iniciada con éxito",
        ca: "Conversa iniciada amb èxit",
        ru: "Запрос успешно отправлен"
      },
      successDesc: {
        en: "Daniil will reply within one working day.",
        de: "Vielen Dank für Ihre Nachricht. Ein Partner unseres Studios wird sich binnen 24 Geschäftsstunden bei Ihnen melden.",
        es: "Gracias por contactar con nosotros. Un socio director revisará su mensaje y le responderá en un plazo máximo de 24 horas laborables.",
        ca: "Gràcies per contactar amb nosaltres. Un soci director revisarà el vostre missatge i us respondrà en menys de 24 hores laborables.",
        ru: "Спасибо за обращение. Партнер студии изучит ваш запрос и свяжется с вами в течение 24 рабочих часов."
      },
      successRef: {
        en: "REFERENCE ID",
        de: "REFERENZNUMMER",
        es: "Nº REFERENCIA",
        ca: "NÚM. REFERÈNCIA",
        ru: "НОМЕР ОБРАЩЕНИЯ"
      },
      resetBtn: {
        en: "Send another",
        de: "Weitere Anfrage senden",
        es: "Enviar otra consulta",
        ca: "Enviar una altra consulta",
        ru: "Отправить еще запрос"
      },
      validation: {
        nameRequired: {
          en: "Please provide your name or organization.",
          de: "Bitte geben Sie Ihren Namen oder Ihre Organisation an.",
          es: "Indica tu nombre o entidad.",
          ca: "Indica el teu nom o entitat.",
          ru: "Пожалуйста, укажите ваше имя или организацию."
        },
        emailRequired: {
          en: "Valid email address required.",
          de: "Bitte geben Sie eine gültige E-Mail-Adresse an.",
          es: "Introduce una dirección de correo electrónico válida.",
          ca: "Introdueix una adreça de correu electrònic vàlida.",
          ru: "Пожалуйста, введите корректный адрес электронной почты."
        },
        messageRequired: {
          en: "Tell us about the place and the brief.",
          de: "Bitte beschreiben Sie Ihr Vorhaben oder Ihre Wünsche.",
          es: "Detalla el alcance o las intenciones de tu proyecto.",
          ca: "Detalla l'abast o les intencions del teu projecte.",
          ru: "Пожалуйста, опишите задачи или пожелания к проекту."
        }
      }
    }
  },
  footer: {
    legalNotice: { en: "Legal & Regulatory", de: "Rechtliches", es: "Aviso Legal", ca: "Avís Legal", ru: "Правовая информация" },
    privacy: { en: "Privacy Policy", de: "Datenschutz", es: "Privacidad", ca: "Privacitat", ru: "Конфиденциальность" },
    impressum: { en: "Studio Impressum", de: "Impressum", es: "Aviso Legal", ca: "Avís Legal", ru: "Выходные данные" },
    backToTop: { en: "Return to Top [↑]", de: "Nach oben [↑]", es: "Volver arriba [↑]", ca: "Tornar a dalt [↑]", ru: "Наверх [↑]" },
    rights: "© 2026 NOLOBO · ALL RIGHTS RESERVED.",
    labels: {
      studioTitle: { en: "STUDIO" },
      hubsTitle: { en: "BASE" },
      inquiriesTitle: { en: "CONTACT" },
      legalTitle: { en: "LEGAL" },
      legalDesc: { en: "Architecture, urbanism and landscape. Mallorca, Spain." },
      accepting: { en: "Accepting commissions 2027" },
      coordinates: { en: "COORDINATES" },
      datum: { en: "DATUM" },
      basedIn: { en: "Palma de Mallorca" },
      specialists: { en: "Specialists assembled per project" }
    },
    impressumContent: {
      en: "Legal information will be published here once the studio is registered."
    },
    privacyContent: {
      en: "In accordance with EU Regulation 2016/679 (GDPR) and the Spanish LOPD-GDD, project communications and submitted briefs are treated with strict professional confidentiality and used exclusively for architectural feasibility and correspondence.",
      de: "Gemäß EU-DSGVO und spanischem Datenschutzrecht (LOPD-GDD) werden Projektanfragen streng vertraulich behandelt und ausschließlich für Entwurfsprüfungen und mandatsbezogene Kommunikation verwendet.",
      es: "En cumplimiento del RGPD (UE) 2016/679 y la LOPD-GDD, los datos e información técnica recibidos son tratados bajo estricto secreto profesional y empleados exclusivamente para la gestión de encargos arquitectónicos.",
      ca: "En compliment del RGPD (UE) 2016/679 i la LOPD-GDD, les dades rebudes són tractades sota estricte secret professional i utilitzades exclusivament per a la gestió dels encàrrecs.",
      ru: "В соответствии с регламентом ЕС 2016/679 (GDPR) и законодательством Испании вся информация обрабатывается со строгой конфиденциальностью исключительно для архитектурного проектирования."
    }
  }
};

export const content: ContentData = withFallback(source);
