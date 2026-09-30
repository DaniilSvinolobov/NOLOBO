/**
 * NOLOBO Studio — Single source of truth for all content, copy, and project assets.
 * Supports EN, DE, ES, CA (Catalan / Mallorquí), and RU (Russian) localization.
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
export type LocalizedString = Record<Language, string>;
export type LocalizedList = Record<Language, string[]>;

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

export interface MaterialItem {
  id: string;
  name: LocalizedString;
  localName: string;
  subtitle: LocalizedString;
  description: LocalizedString;
  origin: string;
  distance: string;
  image: string;
  spec: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  location: string;
  year: string;
  category: LocalizedString;
  area: string;
  orientation: string;
  materials: string;
  image: string;
  aspect: string;
  summary: LocalizedString;
  details: Record<Language, {
    challenge: string;
    solution: string;
    collaboration: string;
  }>;
  specSheet: {
    label: string;
    value: string;
  }[];
}

export interface ApproachStep {
  step: string;
  phase: LocalizedString;
  title: LocalizedString;
  description: LocalizedString;
  deliverables: LocalizedList;
  protocolMetric: {
    label: string;
    value: string;
  };
}

export interface ServiceItem {
  id: string;
  number: string;
  title: LocalizedString;
  summary: LocalizedString;
  scope: LocalizedList;
  typicalScale: string;
}

export interface ContentData {
  meta: {
    brand: string;
    tagline: LocalizedString;
    coordinates: string;
    elevation: string;
    locationName: string;
    timezone: string;
    availability: LocalizedString;
    documentTitle: LocalizedString;
    description: LocalizedString;
  };
  nav: {
    approach: LocalizedString;
    services: LocalizedString;
    work: LocalizedString;
    materials: LocalizedString;
    studio: LocalizedString;
    contact: LocalizedString;
  };
  aria: {
    skipLink: LocalizedString;
    mainNav: LocalizedString;
    langSelect: LocalizedString;
    openMenu: LocalizedString;
    closeMenu: LocalizedString;
    homeLink: LocalizedString;
    closeModal: LocalizedString;
    prevMaterial: LocalizedString;
    nextMaterial: LocalizedString;
    prevProject: LocalizedString;
    nextProject: LocalizedString;
    inspectSpec: LocalizedString;
    backToTop: LocalizedString;
    interactiveModel: LocalizedString;
  };
  hero: {
    headline: LocalizedString;
    subline: LocalizedString;
    ctaWork: LocalizedString;
    ctaInquire: LocalizedString;
    labels: {
      listen: LocalizedString;
      study: LocalizedString;
      preserve: LocalizedString;
      localMaterials?: LocalizedString;
      closeCollaboration?: LocalizedString;
      digitalPrecision?: LocalizedString;
    };
    model: {
      header: LocalizedString;
      locationCode: string;
      tabs: LocalizedString[];
      captions: LocalizedString[];
      readouts: {
        scan: {
          title: LocalizedString;
          hoursSimulated: LocalizedString;
          treesMapped: LocalizedString;
          solarExposure: LocalizedString;
          prevailingWind: LocalizedString;
          windVal: LocalizedString;
          simulatedSunLabel: LocalizedString;
        };
        fit: {
          title: LocalizedString;
          testedCount: LocalizedString;
          morningSun: LocalizedString;
          terraceShade: LocalizedString;
          seaView: LocalizedString;
          treesKept: LocalizedString;
          optimalEnvelope: LocalizedString;
        };
        ground: {
          title: LocalizedString;
          cut: LocalizedString;
          fill: LocalizedString;
          reused: LocalizedString;
          trucks: LocalizedString;
          materialFlow: LocalizedString;
        };
        build: {
          title: LocalizedString;
          componentsTracked: LocalizedString;
          avgDistance: LocalizedString;
          carbon: LocalizedString;
          carbonVal: LocalizedString;
          plinthTag: LocalizedString;
          roofTag: LocalizedString;
          glazingTag: LocalizedString;
          rings: { km: string; label: LocalizedString }[];
        };
        evolve: {
          title: LocalizedString;
          year: LocalizedString;
          canopyCover: LocalizedString;
          waterRetained: LocalizedString;
          energyBalance: LocalizedString;
          netPositive: LocalizedString;
          sensorMoisture: LocalizedString;
          sensorFlux: LocalizedString;
          sensorCistern: LocalizedString;
        };
      };
      controls: {
        orbit: LocalizedString;
        paused: LocalizedString;
        prev: LocalizedString;
        next: LocalizedString;
        seaDatum: LocalizedString;
        dragHint: LocalizedString;
        treeKept: LocalizedString;
      };
    };
    stats: {
      coordLabel: string;
      statusLabel: LocalizedString;
      modelSpec: string;
      cycle: string;
    };
  };
  approach: {
    sectionNumber: string;
    kicker: LocalizedString;
    headline: LocalizedString;
    intro: LocalizedString;
    closeCollaboration: LocalizedString;
    steps: ApproachStep[];
  };
  services: {
    sectionNumber: string;
    kicker: LocalizedString;
    headline: LocalizedString;
    intro: LocalizedString;
    items: ServiceItem[];
  };
  materialsSection: {
    sectionNumber: string;
    kicker: LocalizedString;
    headline: LocalizedString;
    intro?: LocalizedString;
    gridTab: LocalizedString;
    schematicsTab: LocalizedString;
    prevBtn: LocalizedString;
    nextBtn: LocalizedString;
    inspectBtn: LocalizedString;
    closeBtn: LocalizedString;
    navigateLabel: LocalizedString;
    provenanceLabel: LocalizedString;
    jumpToLabel: LocalizedString;
    dossierTitle: LocalizedString;
    footerPalette: LocalizedString;
    footerHint: LocalizedString;
  };
  work: {
    sectionNumber: string;
    kicker: LocalizedString;
    headline: LocalizedString;
    filterAll: LocalizedString;
    filterResidential: LocalizedString;
    filterInterior: LocalizedString;
    viewDetails: LocalizedString;
    closeSpec: LocalizedString;
    modalSpecTitle: LocalizedString;
    modalOverview: LocalizedString;
    modalChallenge: LocalizedString;
    modalSolution: LocalizedString;
    modalCollaboration: LocalizedString;
    modalTechSpec: LocalizedString;
    primaryPalette: LocalizedString;
    inquireSimilar: LocalizedString;
    prevProject: LocalizedString;
    nextProject: LocalizedString;
    projects: Project[];
  };
  materials: MaterialItem[];
  studio: {
    sectionNumber: string;
    label: LocalizedString;
    kicker: LocalizedString;
    headline: LocalizedString;
    subline: LocalizedString;
    blocks: {
      number: string;
      title: LocalizedString;
      text: LocalizedString;
      full: LocalizedString;
    }[];
    mapLabels: {
      studio: LocalizedString;
      artisans: LocalizedString;
      specialists: LocalizedString;
      sites: LocalizedString;
    };
    readouts: {
      mode: LocalizedString;
      projectsPerYear: LocalizedString;
      disciplines: LocalizedString;
    };
    manifesto?: {
      p1: LocalizedString;
      p2: LocalizedString;
    };
    metrics?: {
      label: LocalizedString;
      value: string;
      note: LocalizedString;
    }[];
    networkNodes?: string[];
  };
  contact: {
    sectionNumber: string;
    kicker: LocalizedString;
    headline: LocalizedString;
    subtext: LocalizedString;
    email: string;
    phone: string;
    address: string;
    form: {
      nameLabel: LocalizedString;
      emailLabel: LocalizedString;
      projectTypeLabel: LocalizedString;
      projectTypes: {
        value: string;
        label: LocalizedString;
      }[];
      locationScaleLabel: LocalizedString;
      messageLabel: LocalizedString;
      namePlaceholder?: LocalizedString;
      scalePlaceholder?: LocalizedString;
      messagePlaceholder?: LocalizedString;
      submitBtn: LocalizedString;
      submitting: LocalizedString;
      successTitle: LocalizedString;
      successDesc: LocalizedString;
      successRef: LocalizedString;
      resetBtn: LocalizedString;
      validation: {
        nameRequired: LocalizedString;
        emailRequired: LocalizedString;
        messageRequired: LocalizedString;
      };
    };
  };
  footer: {
    legalNotice: LocalizedString;
    privacy: LocalizedString;
    impressum: LocalizedString;
    backToTop: LocalizedString;
    rights: string;
    impressumContent: LocalizedString;
    privacyContent: LocalizedString;
  };
}

export const content: ContentData = {
  meta: {
    brand: "NOLOBO",
    tagline: {
      en: "Architecture & Landscape · Mallorca",
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
    documentTitle: {
      en: "NOLOBO — Architecture that starts with the site",
      es: "NOLOBO — Arquitectura que parte del lugar",
      ca: "NOLOBO — Arquitectura que parteix del lloc",
      de: "NOLOBO — Architektur, die beim Ort beginnt",
      ru: "NOLOBO — Архитектура, которая начинается с места"
    },
    description: {
      en: "Architects and landscape architects in Mallorca. We listen first, work with local materials and use digital tools where they make a difference.",
      es: "Arquitectos y paisajistas en Mallorca. Primero escuchamos, trabajamos con materiales locales y usamos herramientas digitales donde marcan la diferencia.",
      ca: "Arquitectes i paisatgistes a Mallorca. Primer escoltam, treballam amb materials locals i utilitzam eines digitals on marquen la diferència.",
      de: "Architekten und Landschaftsarchitekten auf Mallorca. Wir hören zuerst zu, arbeiten mit lokalen Materialien und setzen digitale Werkzeuge dort ein, wo sie den Unterschied machen.",
      ru: "Архитекторы и ландшафтные архитекторы на Майорке. Сначала слушаем, работаем с местными материалами и используем цифровые инструменты там, где они действительно помогают."
    }
  },
  nav: {
    approach: { en: "Approach", de: "Ansatz", es: "Método", ca: "Mètode", ru: "Подход" },
    services: { en: "Services", de: "Leistungen", es: "Servicios", ca: "Serveis", ru: "Услуги" },
    work: { en: "Selected Work", de: "Projekte", es: "Obras", ca: "Projectes", ru: "Проекты" },
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
    homeLink: { en: "NOLOBO Architecture Homepage", de: "NOLOBO Architektur Startseite", es: "NOLOBO Arquitectura Inicio", ca: "NOLOBO Arquitectura Inici", ru: "NOLOBO Главная страница" },
    closeModal: { en: "Close dialog", de: "Dialog schließen", es: "Cerrar ventana", ca: "Tancar finestra", ru: "Закрыть окно" },
    prevMaterial: { en: "Previous material", de: "Vorheriges Material", es: "Material anterior", ca: "Material anterior", ru: "Предыдущий материал" },
    nextMaterial: { en: "Next material", de: "Nächstes Material", es: "Siguiente material", ca: "Següent material", ru: "Следующий материал" },
    prevProject: { en: "Previous project", de: "Vorheriges Projekt", es: "Proyecto anterior", ca: "Projecte anterior", ru: "Предыдущий проект" },
    nextProject: { en: "Next project", de: "Nächstes Projekt", es: "Siguiente proyecto", ca: "Següent projecte", ru: "Следующий проект" },
    inspectSpec: { en: "Inspect specifications", de: "Spezifikationen einsehen", es: "Ver especificaciones", ca: "Veure especificacions", ru: "Изучить спецификацию" },
    backToTop: { en: "Scroll back to top of page", de: "Zurück zum Seitenanfang", es: "Volver arriba de la página", ca: "Tornar a dalt de la pàgina", ru: "Вернуться в начало страницы" },
    interactiveModel: {
      en: "Interactive 3D model: The site designs the house. Nothing is wasted.",
      de: "Interaktives 3D-Modell: Der Ort entwirft das Haus. Nichts wird verschwendet.",
      es: "Modelo 3D interactivo: El lugar diseña la casa. Nada se desperdicia.",
      ca: "Model 3D interactiu: El lloc dissenya la casa. Res no es malbarata.",
      ru: "Интерактивная 3D-модель: Место проектирует дом. Ничего не пропадает."
    }
  },
  hero: {
    headline: {
      en: "Your values.\nThe island's character.\nOur tools.",
      es: "Tus valores.\nEl carácter de la isla.\nNuestras herramientas.",
      ca: "Els teus valors.\nEl caràcter de l'illa.\nLes nostres eines.",
      de: "Ihre Werte.\nDer Charakter der Insel.\nUnsere Werkzeuge.",
      ru: "Ваши ценности.\nХарактер острова.\nНаши инструменты."
    },
    subline: {
      en: "First we understand what you value. Then we study the site with local knowledge and advanced technology to reduce energy, waste and impact. And we build so Mallorca stays Mallorca.",
      es: "Primero entendemos lo que valoras. Después estudiamos el lugar con conocimiento local y tecnología avanzada para reducir energía, residuos e impacto. Y construimos para que Mallorca siga siendo Mallorca.",
      ca: "Primer entenem allò que valores. Després estudiam el lloc amb coneixement local i tecnologia avançada per reduir energia, residus i impacte. I construïm perquè Mallorca continuï essent Mallorca.",
      de: "Zuerst verstehen wir, was Ihnen wichtig ist. Dann untersuchen wir den Ort mit lokalem Wissen und moderner Technologie, um Energie, Abfall und Eingriffe zu reduzieren. Und wir bauen so, dass Mallorca Mallorca bleibt.",
      ru: "Сначала мы понимаем, что важно для вас. Затем изучаем участок, опираясь на местный опыт и современные технологии, чтобы сократить энергопотребление, отходы и воздействие на природу. И строим так, чтобы Майорка оставалась Майоркой."
    },
    ctaWork: {
      en: "See projects",
      es: "Ver proyectos",
      ca: "Veure projectes",
      de: "Projekte ansehen",
      ru: "Смотреть проекты"
    },
    ctaInquire: {
      en: "Start a conversation",
      es: "Hablemos",
      ca: "Parlem",
      de: "Kontakt aufnehmen",
      ru: "Обсудить проект"
    },
    labels: {
      listen: {
        en: "01 Listen",
        es: "01 Escuchar",
        ca: "01 Escoltar",
        de: "01 Zuhören",
        ru: "01 Слушать"
      },
      study: {
        en: "02 Study",
        es: "02 Estudiar",
        ca: "02 Estudiar",
        de: "02 Verstehen",
        ru: "02 Изучать"
      },
      preserve: {
        en: "03 Preserve",
        es: "03 Preservar",
        ca: "03 Preservar",
        de: "03 Bewahren",
        ru: "03 Сохранять"
      },
      localMaterials: {
        en: "01 Listen",
        es: "01 Escuchar",
        ca: "01 Escoltar",
        de: "01 Zuhören",
        ru: "01 Слушать"
      },
      closeCollaboration: {
        en: "02 Study",
        es: "02 Estudiar",
        ca: "02 Estudiar",
        de: "02 Verstehen",
        ru: "02 Изучать"
      },
      digitalPrecision: {
        en: "03 Preserve",
        es: "03 Preservar",
        ca: "03 Preservar",
        de: "03 Bewahren",
        ru: "03 Сохранять"
      }
    },
    model: {
      header: {
        en: "The site designs the house. Nothing is wasted.",
        es: "El lugar diseña la casa. Nada se desperdicia.",
        ca: "El lloc dissenya la casa. Res no es malbarata.",
        de: "Der Ort entwirft das Haus. Nichts wird verschwendet.",
        ru: "Место проектирует дом. Ничего не пропадает."
      },
      locationCode: "DEIÀ TRANSECT · 39°45'N 2°39'E",
      tabs: [
        { en: "Scan", es: "Análisis", ca: "Anàlisi", de: "Analyse", ru: "Анализ" },
        { en: "Fit", es: "Encaje", ca: "Encaix", de: "Setzung", ru: "Посадка" },
        { en: "Ground", es: "Terreno", ca: "Terreny", de: "Gelände", ru: "Рельеф" },
        { en: "Build", es: "Obra", ca: "Obra", de: "Bau", ru: "Строительство" },
        { en: "Evolve", es: "Evolución", ca: "Evolució", de: "Entwicklung", ru: "Развитие" }
      ],
      captions: [
        {
          en: "One year of sun, wind and shade, simulated before the first sketch.",
          es: "Un año de sol, viento y sombra, simulado antes del primer boceto.",
          ca: "Un any de sol, vent i ombra, simulat abans del primer esbós.",
          de: "Ein Jahr Sonne, Wind und Schatten – simuliert vor der ersten Skizze.",
          ru: "Год солнца, ветра и тени — смоделирован до первого эскиза."
        },
        {
          en: "Thousands of options tested. Scored by how you live.",
          es: "Miles de opciones probadas. Valoradas según cómo vives.",
          ca: "Milers d'opcions provades. Valorades segons com vius.",
          de: "Tausende Varianten geprüft. Bewertet nach Ihrem Alltag.",
          ru: "Тысячи вариантов проверены. Оценены по вашему образу жизни."
        },
        {
          en: "What we dig out becomes the walls.",
          es: "Lo que excavamos se convierte en muros.",
          ca: "El que excavam es converteix en murs.",
          de: "Was wir ausheben, wird zur Mauer.",
          ru: "Выкопанный грунт становится стенами."
        },
        {
          en: "Every piece tracked, from source to site.",
          es: "Cada pieza trazada, del origen a la obra.",
          ca: "Cada peça traçada, de l'origen a l'obra.",
          de: "Jedes Bauteil nachverfolgt – von der Quelle bis zur Baustelle.",
          ru: "Каждый элемент отслежен — от источника до стройплощадки."
        },
        {
          en: "The model keeps working after handover.",
          es: "El modelo sigue trabajando tras la entrega.",
          ca: "El model continua treballant després de l'entrega.",
          de: "Das Modell arbeitet nach der Übergabe weiter.",
          ru: "Модель продолжает работать после сдачи объекта."
        }
      ],
      readouts: {
        scan: {
          title: { en: "YEAR SIMULATION ACTIVE", es: "SIMULACIÓN ANUAL ACTIVA", ca: "SIMULACIÓ ANUAL ACTIVA", de: "JAHRESSIMULATION AKTIV", ru: "ГОДОВОЕ МОДЕЛИРОВАНИЕ" },
          hoursSimulated: { en: "HOURS SIMULATED:", es: "HORAS SIMULADAS:", ca: "HORES SIMULADES:", de: "SIMULIERTE STUNDEN:", ru: "ЧАСОВ СМОДЕЛИРОВАНО:" },
          treesMapped: { en: "TREES MAPPED:", es: "ÁRBOLES CARTOGRAFIADOS:", ca: "ARBRES CATALOGATS:", de: "KARTIERTE BÄUME:", ru: "ДЕРЕВЬЕВ НА ПЛАНЕ:" },
          solarExposure: { en: "SOLAR EXPOSURE:", es: "RADIACIÓN SOLAR:", ca: "RADIACIÓ SOLAR:", de: "SOLAREINSTRAHLUNG:", ru: "СОЛНЕЧНАЯ ИНСОЛЯЦИЯ:" },
          prevailingWind: { en: "PREVAILING WIND:", es: "VIENTO PREDOMINANTE:", ca: "VENT PREDOMINANT:", de: "VORHERRSCHENDER WIND:", ru: "ГОСПОДСТВУЮЩИЙ ВЕТЕР:" },
          windVal: { en: "14 KN · SW (EMBAT)", es: "14 ND · SO (EMBAT)", ca: "14 NUSOS · SO (EMBAT)", de: "14 KN · SW (EMBAT)", ru: "14 УЗЛОВ · ЮЗ (ЭМБАТ)" },
          simulatedSunLabel: { en: "SIMULATED SUN", es: "SOL SIMULADO", ca: "SOL SIMULAT", de: "SIMULIERTE SONNE", ru: "МОДЕЛЬ СОЛНЦА" }
        },
        fit: {
          title: { en: "FIT SCORING MATRIX", es: "MATRIZ DE VALORACIÓN", ca: "MATRIU DE VALORACIÓ", de: "BEWERTUNGSMATRIX", ru: "МАТРИЦА ОЦЕНКИ" },
          testedCount: { en: "TESTED", es: "PROBADAS", ca: "PROVADES", de: "GEPRÜFT", ru: "ПРОВЕРЕНО" },
          morningSun: { en: "Morning sun · kitchen", es: "Sol de mañana · cocina", ca: "Sol de matí · cuina", de: "Morgensonne · Küche", ru: "Утреннее солнце · кухня" },
          terraceShade: { en: "Shade · terrace 16:00", es: "Sombra · terraza 16:00", ca: "Ombra · terrassa 16:00", de: "Schatten · Terrasse 16:00", ru: "Тень · терраса 16:00" },
          seaView: { en: "Sea view · bedroom", es: "Vistas al mar · dormitorio", ca: "Vistes al mar · dormitori", de: "Meerblick · Schlafzimmer", ru: "Вид на море · спальня" },
          treesKept: { en: "Trees kept", es: "Árboles conservados", ca: "Arbres conservats", de: "Erhaltene Bäume", ru: "Сохраненные деревья" },
          optimalEnvelope: { en: "OPTIMAL ENVELOPE [98.4%]", es: "ENVOLVENTE ÓPTIMA [98.4%]", ca: "ENVOLVENT ÒPTIMA [98.4%]", de: "OPTIMALE SETZUNG [98.4%]", ru: "ОПТИМАЛЬНАЯ ПОСАДКА [98.4%]" }
        },
        ground: {
          title: { en: "CUT & FILL EQUILIBRIUM", es: "EQUILIBRIO DE DESMONTE Y TERRAPLÉN", ca: "EQUILIBRI DE DESMUNT I REBLE", de: "AUSGLEICH ABTRAG & AUFTRAG", ru: "БАЛАНС ЗЕМЛЯНЫХ РАБОТ" },
          cut: { en: "CUT:", es: "DESMONTE:", ca: "DESMUNT:", de: "AUSHUB:", ru: "ВЫЕМКА ГРУНТА:" },
          fill: { en: "FILL:", es: "TERRAPLÉN:", ca: "REBLE:", de: "AUFFÜLLUNG:", ru: "НАСЫПЬ:" },
          reused: { en: "REUSED ON SITE:", es: "REUTILIZADO EN OBRA:", ca: "REUTILITZAT A L'OBRA:", de: "VOR ORT WIEDERVERWENDET:", ru: "ПОВТОРНО ИСПОЛЬЗОВАНО:" },
          trucks: { en: "TRUCKS LEAVING SITE:", es: "CAMIONES QUE SALEN:", ca: "CAMIONS QUE SURTEN:", de: "LKW-FAHRTEN:", ru: "ВЫВЕЗЕНО ГРУЗОВИКАМИ:" },
          materialFlow: { en: "EXCAVATED STONE → WALL MASONRY [95%]", es: "PIEDRA EXCAVADA → MUROS DE MARGEN [95%]", ca: "PEDRA EXCAVADA → MARGES [95%]", de: "AUSHUBSTEIN → TROCKENMAUERWERK [95%]", ru: "ВЫКОПАННЫЙ КАМЕНЬ → СТЕНЫ [95%]" }
        },
        build: {
          title: { en: "MATERIAL SOURCING RADAR", es: "RADAR DE PROCEDENCIA DE MATERIALES", ca: "RADAR D'ORIGEN DE MATERIALS", de: "HERKUNFTSRADAR MATERIALIEN", ru: "РАДИУС ДОСТАВКИ МАТЕРИАЛОВ" } ,
          componentsTracked: { en: "COMPONENTS TRACKED:", es: "COMPONENTES TRAZADOS:", ca: "COMPONENTS TRAÇATS:", de: "ERFASSTE BAUTEILE:", ru: "ОТСЛЕЖЕННЫХ ЭЛЕМЕНТОВ:" },
          avgDistance: { en: "AVG. SOURCING DISTANCE:", es: "DISTANCIA MEDIA DE ORIGEN:", ca: "DISTÀNCIA MITJANA D'ORIGEN:", de: "Ø TRANSPORTWEG:", ru: "СРЕДНЕЕ РАССТОЯНИЕ:" },
          carbon: { en: "EMBODIED CARBON:", es: "HUELLA DE CARBONO:", ca: "PETJADA DE CARBONI:", de: "GRAUE ENERGIE / CO₂:", ru: "УГЛЕРОДНЫЙ БАЛАНС:" },
          carbonVal: { en: "-42 t (CO₂ SINK)", es: "-42 t (SUMIDERO CO₂)", ca: "-42 t (EMBORNAL CO₂)", de: "-42 t (CO₂-SENKE)", ru: "-42 т (ПОГЛОЩЕНИЕ CO₂)" },
          plinthTag: { en: "ST-01 PLINTH", es: "ST-01 ZÓCALO", ca: "ST-01 SÒCOL", de: "ST-01 SOCKEL", ru: "ST-01 ЦОКОЛЬ" },
          roofTag: { en: "RF-02 GREEN ROOF", es: "RF-02 CUBIERTA VEGETAL", ca: "RF-02 COBERTA VEGETAL", de: "RF-02 GRÜNDACH", ru: "RF-02 ЗЕЛЕНАЯ КРОВЛЯ" },
          glazingTag: { en: "GL-06 LOW-E GLAZING", es: "GL-06 VIDRIO BAJO EMISIVO", ca: "GL-06 VIDRE BAIX EMISSIU", de: "GL-06 WÄRMESCHUTZGLAS", ru: "GL-06 ЭНЕРГОСБЕРЕГАЮЩЕЕ ОСТЕКЛЕНИЕ" },
          rings: [
            { km: "14 km", label: { en: "Marratxí clay tiles", es: "Tejas de Marratxí", ca: "Teules de Marratxí", de: "Marratxí Tonziegel", ru: "Черепица из Маррачи" } },
            { km: "26 km", label: { en: "Tramuntana stone", es: "Piedra de Tramuntana", ca: "Pedra de Tramuntana", de: "Tramuntana Bruchstein", ru: "Камень Трамунтаны" } },
            { km: "34 km", label: { en: "Porreres marès", es: "Marès de Porreres", ca: "Marès de Porreres", de: "Porreres Marès-Sandstein", ru: "Песчаник марес из Порререса" } },
            { km: "48 km", label: { en: "Santanyí limestone", es: "Piedra de Santanyí", ca: "Pedra de Santanyí", de: "Santanyí Kalkstein", ru: "Известняк из Сантаньи" } },
          ]
        },
        evolve: {
          title: { en: "HANDOVER & EVOLUTION", es: "ENTREGA Y EVOLUCIÓN", ca: "ENTREGA I EVOLUCIÓ", de: "ÜBERGABE & ENTWICKLUNG", ru: "СДАЧА И РАЗВИТИЕ" },
          year: { en: "YEAR", es: "AÑO", ca: "ANY", de: "JAHR", ru: "ГОД" },
          canopyCover: { en: "CANOPY COVER:", es: "COBERTURA VEGETAL:", ca: "COBERTURA VEGETAL:", de: "KRONENABDECKUNG:", ru: "КРОНОВОЕ ПОКРЫТИЕ:" },
          waterRetained: { en: "WATER RETAINED:", es: "AGUA RETENIDA:", ca: "AIGUA RETINGUDA:", de: "WASSERRÜCKHALT:", ru: "УДЕРЖАНИЕ ВОДЫ:" },
          energyBalance: { en: "ENERGY BALANCE:", es: "BALANCE ENERGÉTICO:", ca: "BALANÇ ENERGÈTIC:", de: "ENERGIEBILANZ:", ru: "ЭНЕРГОБАЛАНС:" },
          netPositive: { en: "NET POSITIVE (+14%)", es: "POSITIVO NETO (+14%)", ca: "POSITIU NET (+14%)", de: "PLUSENERGIE (+14%)", ru: "ПОЛОЖИТЕЛЬНЫЙ (+14%)" },
          sensorMoisture: { en: "SN-01 SOIL MOISTURE 34%", es: "SN-01 HUMEDAD DEL SUELO 34%", ca: "SN-01 HUMITAT DEL SÒL 34%", de: "SN-01 BODENFEUCHTE 34%", ru: "SN-01 ВЛАЖНОСТЬ ПОЧВЫ 34%" },
          sensorFlux: { en: "SN-02 THERMAL FLUX 0.18 W/M²K", es: "SN-02 FLUJO TÉRMICO 0.18 W/M²K", ca: "SN-02 FLUX TÈRMIC 0.18 W/M²K", de: "SN-02 WÄRMESTROM 0.18 W/M²K", ru: "SN-02 ТЕПЛОВОЙ ПОТОК 0.18 ВТ/М²К" },
          sensorCistern: { en: "SN-03 CISTERN 82%", es: "SN-03 ALJIBE 82%", ca: "SN-03 CISTERNA 82%", de: "SN-03 ZISTERNE 82%", ru: "SN-03 ЦИСТЕРНА 82%" }
        }
      },
      controls: {
        orbit: { en: "ORBIT", es: "ÓRBITA", ca: "ÒRBITA", de: "ORBIT", ru: "ОРБИТА" },
        paused: { en: "PAUSED", es: "PAUSA", ca: "PAUSA", de: "PAUSIERT", ru: "ПАУЗА" },
        prev: { en: "← PREV", es: "← ANTERIOR", ca: "← ANTERIOR", de: "← ZURÜCK", ru: "← НАЗАД" },
        next: { en: "NEXT →", es: "SIGUIENTE →", ca: "SEGÜENT →", de: "WEITER →", ru: "ВПЕРЕД →" },
        seaDatum: { en: "● SEA LEVEL ±0.0M", es: "● NIVEL DEL MAR ±0.0M", ca: "● NIVELL DEL MAR ±0.0M", de: "● MEERESSPIEGEL ±0.0M", ru: "● УРОВЕНЬ МОРЯ ±0.0М" },
        dragHint: { en: "DRAG TO ORBIT · AUTO-CYCLE", es: "ARRASTRA PARA ROTAR · CICLO AUTO", ca: "ARROSSEGA PER ROTAR · CICLE AUTO", de: "ZIEHEN ZUM DREHEN · AUTO-ZYKLUS", ru: "ВРАЩЕНИЕ МЫШЬЮ · АВТО-ЦИКЛ" },
        treeKept: { en: "KEPT", es: "CONSERVADO", ca: "CONSERVAT", de: "ERHALTEN", ru: "СОХРАНЕНО" }
      }
    },
    stats: {
      coordLabel: "MALLORCA 39.57°N / 2.65°E",
      statusLabel: {
        en: "ACCEPTING PROJECTS 2027",
        de: "PROJEKTAUFNAHME 2027",
        es: "ADMISIÓN DE PROYECTOS 2027",
        ca: "ADMISSIÓ DE PROJECTES 2027",
        ru: "ПРИЕМ ПРОЕКТОВ 2027"
      },
      modelSpec: "TERRAIN & EMBEDDED ARCHITECTURE",
      cycle: "COMMISSION CYCLE 2027"
    }
  },
  approach: {
    sectionNumber: "01",
    kicker: {
      en: "Process & Philosophy",
      de: "Prozess & Haltung",
      es: "Proceso y filosofía",
      ca: "Procés i filosofia",
      ru: "Процесс и философия"
    },
    headline: {
      en: "Architecture with people.",
      de: "Architektur mit Menschen.",
      es: "Arquitectura con personas.",
      ca: "Arquitectura amb persones.",
      ru: "Архитектура для людей."
    },
    closeCollaboration: {
      en: "CLOSE COLLABORATION",
      de: "ENGE ZUSAMMENARBEIT",
      es: "COLABORACIÓN CERCANA",
      ca: "COL·LABORACIÓ PROPERA",
      ru: "ТЕСНОЕ СОТРУДНИЧЕСТВО"
    },
    intro: {
      en: "We listen first, study the land, and unite local craftsmanship with digital clarity. Every home is a personal collaboration.",
      de: "Wir hören zuerst zu, erforschen das Land und verbinden lokales Handwerk mit digitaler Klarheit. Jedes Haus ist eine persönliche Zusammenarbeit.",
      es: "Escuchamos primero, leemos el terreno y unimos la artesanía local con la claridad digital. Cada vivienda es una colaboración cercana.",
      ca: "Escoltem primer, llegim el terreny i unim l'artesania local amb la claredat digital. Cada llar és una col·laboració propera.",
      ru: "Мы сначала слушаем, изучаем землю и соединяем местное ремесло с цифровой точностью. Каждый дом — это личное партнерство."
    },
    steps: [
      {
        step: "01",
        phase: {
          en: "Listen",
          de: "Zuhören",
          es: "Escuchar",
          ca: "Escoltar",
          ru: "Диалог"
        },
        title: {
          en: "Understanding the client, their daily life and wishes",
          de: "Verständnis für den Bauherrn, ihren Alltag und persönliche Wünsche",
          es: "Comprender al cliente, su vida cotidiana y anhelos",
          ca: "Comprendre el client, la seva vida quotidiana i desitjos",
          ru: "Понимание клиента, его повседневной жизни и желаний"
        },
        description: {
          en: "Understanding how you live, your rhythms, family rituals, and quiet aspirations before making any design decisions.",
          de: "Wie Sie leben, Ihre Rhythmen, familiäre Rituale und Wünsche verstehen, bevor die ersten Linien entstehen.",
          es: "Comprender su forma de habitar, ritmos diarios y aspiraciones antes de trazar cualquier línea de diseño.",
          ca: "Comprendre com viviu, els vostres ritmes i aspiracions abans de prendre qualsevol decisió de disseny.",
          ru: "Понимание ваших привычек, ритма жизни, семейных традиций и пожеланий до начала проектирования."
        },
        deliverables: {
          en: ["Client Dialogue & Brief", "Spatial Lifestyle Mapping", "Living Patterns Synthesis"],
          de: ["Bauherrn-Dialog & Briefing", "Lebensraum-Mapping", "Wohnmuster-Analyse"],
          es: ["Diálogo y briefing", "Mapeo de estilo de vida", "Síntesis de patrones de habitar"],
          ca: ["Diàleg i briefing", "Mapeig d'estil de vida", "Síntesi de patrons d'habitabilitat"],
          ru: ["Диалог и техзадание", "Карта сценариев жизни", "Синтез паттернов проживания"]
        },
        protocolMetric: {
          label: "DIALOGUE",
          value: "PEOPLE FIRST"
        }
      },
      {
        step: "02",
        phase: {
          en: "Site",
          de: "Ort",
          es: "Lugar",
          ca: "Lloc",
          ru: "Место"
        },
        title: {
          en: "Reading the terrain, light, wind and vegetation",
          de: "Gelände, Licht, Wind und Vegetation lesen",
          es: "Leer el terreno, la luz, el viento y la vegetación",
          ca: "Llegir el terreny, la llum, el vent i la vegetació",
          ru: "Чтение рельефа, света, ветра и растительности"
        },
        description: {
          en: "Immersion in the land: reading Mallorca's topography, seasonal sun paths, prevailing sea breezes, and native flora.",
          de: "Eintauchen in das Grundstück: Topografie, Sonnenbahnen, Meeresbrisen und die einheimische Vegetation Mallorcas verstehen.",
          es: "Inmersión en el territorio: interpretar la topografía, trayectorias solares, brisas marinas y arbolado autóctono.",
          ca: "Immersió en el territori: interpretar la topografia, trajectòries solars, brises marines i flora autòctona.",
          ru: "Погружение в ландшафт: анализ рельефа, сезонного солнца, морских бризов и местной флоры."
        },
        deliverables: {
          en: ["Topographic Reading", "Sun & Breeze Studies", "Flora & Microclimate Survey"],
          de: ["Topografische Bestandsaufnahme", "Sonnen- & Windstudien", "Flora & Mikroklima-Audit"],
          es: ["Lectura topográfica", "Estudios de sol y brisas", "Inventario de flora y microclima"],
          ca: ["Lectura topogràfica", "Estudis de sol i brises", "Inventari de flora i microclima"],
          ru: ["Анализ рельефа", "Инсоляция и роза ветров", "Аудит флоры и микроклимата"]
        },
        protocolMetric: {
          label: "LANDSCAPE",
          value: "MICROCLIMATE"
        }
      },
      {
        step: "03",
        phase: {
          en: "Design",
          de: "Entwurf",
          es: "Diseño",
          ca: "Disseny",
          ru: "Проект"
        },
        title: {
          en: "Architecture and landscape as one",
          de: "Architektur und Landschaft als Einheit",
          es: "Arquitectura y paisaje como uno solo",
          ca: "Arquitectura i paisatge com un sol organisme",
          ru: "Архитектура и ландшафт как единое целое"
        },
        description: {
          en: "Conceiving low-profile volumes that nest into the hillside, using stepped terraces and courtyards that merge with the terrain.",
          de: "Entwicklung flacher Baukörper, die sich harmonisch in den Hang schmiegen und durch Terrassierungen mit der Landschaft verschmelzen.",
          es: "Concepción de volúmenes horizontales integrados en la ladera, con terrazas y patios que se funden con el paisaje.",
          ca: "Concepció de volums horitzontals integrats al pendent, amb terrasses i patis que es fonen amb el paisatge.",
          ru: "Создание горизонтальных объемов, гармонично вписанных в склон, с террасами и внутренними дворами."
        },
        deliverables: {
          en: ["Landscape-Integrated Models", "Spatial Sequence Plans", "Tactile Material Boards"],
          de: ["Landschaftsintegrierte Modelle", "Raumsequenz-Pläne", "Taktile Materialcollagen"],
          es: ["Modelos integrados en el terreno", "Planos de secuencia espacial", "Muestrarios táctiles"],
          ca: ["Models integrats al terreny", "Plànols de seqüència espacial", "Mostrari tàctil de materials"],
          ru: ["Интегрированные 3D-модели", "Планы пространств", "Тактильные мудборды"]
        },
        protocolMetric: {
          label: "APPROACH",
          value: "INTEGRATED FORM"
        }
      },
      {
        step: "04",
        phase: {
          en: "Craft",
          de: "Handwerk",
          es: "Oficio",
          ca: "Artesania",
          ru: "Ремесло"
        },
        title: {
          en: "Craft: local materials",
          de: "Handwerk: lokale Materialien",
          es: "Oficio: materiales locales",
          ca: "Artesania: materials locals",
          ru: "Ремесло: местные материалы"
        },
        description: {
          en: "Celebrating tactile Mallorcan stone, lime plaster, wild olive timber, and terracotta through dedicated artisanal techniques.",
          de: "Achtsamer Umgang mit mallorquinischem Naturstein, Kalkputz, Olivenholz und Terracotta durch meisterhafte Handwerkstechniken.",
          es: "Puesta en valor de la piedra mallorquina, revoques de cal, madera de acebuche y cerámica mediante técnicas artesanales.",
          ca: "Posada en valor de la pedra mallorquina, calç viva, fusta d'ullastre i ceràmica mitjançant tècniques artesanes.",
          ru: "Использование натурального камня Майорки, известковой штукатурки, оливкового дерева и терракоты через искусное ремесло."
        },
        deliverables: {
          en: ["Local Material Curation", "Dry-Stone & Joinery Details", "Bespoke Millwork Specifications"],
          de: ["Lokale Materialkuration", "Naturstein- & Holzdetails", "Maßgefertigte Werkstattpläne"],
          es: ["Selección de materiales autóctonos", "Detalles de cantería y carpintería", "Planos de taller a medida"],
          ca: ["Selecció matèrica autòctona", "Detalls de pedra seca i fusteria", "Especificacions a mida"],
          ru: ["Кураторство местных материалов", "Узлы кладки и столярки", "Авторские чертежи деталей"]
        },
        protocolMetric: {
          label: "MATERIAL",
          value: "ISLAND ROOTS"
        }
      },
      {
        step: "05",
        phase: {
          en: "Tech",
          de: "Technik",
          es: "Tecnología",
          ca: "Tecnologia",
          ru: "Технологии"
        },
        title: {
          en: "High-end tech for optimisation, analysis, and aftercare",
          de: "High-End-Technologie für Optimierung, Analyse und Nachsorge",
          es: "Tecnología avanzada para optimización, análisis y posventa",
          ca: "Tecnologia avançada per a optimització, anàlisi i cura posterior",
          ru: "Передовые технологии для оптимизации, анализа и сопровождения"
        },
        description: {
          en: "Precise digital twins, climate simulations, and sensor-grounded diagnostics to optimize performance, backed by long-term building aftercare.",
          de: "Präzise digitale Zwillinge, Klimasimulationen und Messdaten zur Performance-Optimierung, begleitet von langfristiger Betreuung.",
          es: "Gemelos digitales, simulaciones bioclimáticas y optimización térmica, acompañando la vida de la casa mucho después de la entrega.",
          ca: "Bessons digitals d'alta precisió, simulacions climàtiques i acompanyament continu després de la finalització.",
          ru: "Высокоточные цифровые двойники, климатический анализ и мониторинг для долгосрочной заботы о здании."
        },
        deliverables: {
          en: ["Digital Twin & Microclimate Audit", "Performance Optimisation", "Ongoing Aftercare Lifecycle"],
          de: ["Digitaler Zwilling & Mikroklima-Audit", "Performance-Optimierung", "Langfristige Nachbetreuung"],
          es: ["Gemelo digital y auditoría bioclimática", "Optimización de confort", "Acompañamiento a largo plazo"],
          ca: ["Bessó digital i auditoria bioclimàtica", "Optimització de rendiment", "Acompanyament a llarg termini"],
          ru: ["Цифровой двойник и климат-аудит", "Оптимизация параметров", "Долгосрочное сопровождение"]
        },
        protocolMetric: {
          label: "PRECISION",
          value: "LONG-TERM CARE"
        }
      }
    ]
  },
  services: {
    sectionNumber: "02",
    kicker: {
      en: "Disciplines",
      de: "Disziplinen",
      es: "Disciplinas",
      ca: "Disciplines",
      ru: "Направления"
    },
    headline: {
      en: "What we create.",
      de: "Was wir schaffen.",
      es: "Lo que creamos.",
      ca: "El que creem.",
      ru: "Что мы создаем."
    },
    intro: {
      en: "We do not leave you with drawings to figure out alone. Every commission encompasses total technical stewardship from zoning permits to bespoke millwork installation.",
      de: "Wir überlassen Sie nicht fertigen Zeichnungen. Jedes Mandat umfasst die vollständige Betreuung von Baugenehmigungen bis zum maßgefertigten Innenausbau.",
      es: "No entregamos meros planos en papel. Cada encargo abarca la gestión técnica total, desde licencias urbanísticas hasta la instalación del mobiliario a medida.",
      ca: "No lliurem senzills plànols en paper. Cada projecte inclou la gestió integral, des de llicències municipals fins al mobiliari a mida.",
      ru: "Мы не оставляем вас с чертежами один на один. Каждый проект охватывает полное сопровождение от разрешений до авторской мебели."
    },
    items: [
      {
        id: "terrain",
        number: "01",
        title: {
          en: "Landscape Architecture & Terrain",
          de: "Landschaftsarchitektur & Topografie",
          es: "Arquitectura del paisaje y terreno",
          ca: "Arquitectura del paisatge i terreny",
          ru: "Ландшафтная архитектура и рельеф"
        },
        summary: {
          en: "Topographic integration, dry-stone stepped terracing, Mediterranean water catchment, and endemic botanical curation.",
          de: "Topografische Integration, Trockenstein-Terrassen, mediterrane Regenwassernutzung und endemische Bepflanzung.",
          es: "Integración topográfica, bancales de piedra en seco, captación de agua mediterránea y curación botánica autóctona.",
          ca: "Integració topogràfica, marjades de pedra en sec, gestió hídrica mediterrània i selecció de flora autòctona.",
          ru: "Интеграция в рельеф, террасирование сухой кладкой, сбор дождевой воды и эндемичное озеленение."
        },
        scope: {
          en: ["Slope stabilization & pedra en sec", "Hydrological cistern routing", "Xeriscaping & Mediterranean flora", "Solar microclimate micro-zoning"],
          de: ["Hangstabilisierung & Trockensteinbau", "Regenwasser-Zisternensysteme", "Mediterrane Bepflanzung", "Mikroklimatische Zonen"],
          es: ["Estabilización de laderas y piedra seca", "Cisternas y drenaje sostenible", "Xerojardinería con flora balear", "Microzonificación bioclimática"],
          ca: ["Estabilització de pendents i pedra en sec", "Xarxa de cisternes i drenatge", "Xerojardineria autòctona", "Microclima i assolellament"],
          ru: ["Укрепление склонов и сухая кладка", "Системы сбора и фильтрации воды", "Ксерофитное озеленение", "Микроклиматическое зонирование"]
        },
        typicalScale: "500 — 5,000 M²"
      },
      {
        id: "arch",
        number: "02",
        title: {
          en: "Residential Architecture",
          de: "Wohnungsbau & Architektur",
          es: "Arquitectura residencial",
          ca: "Arquitectura residencial",
          ru: "Жилая архитектура"
        },
        summary: {
          en: "New-build private villas and coastal pavilions calibrated to Mallorca's topography, light, and urban planning framework.",
          de: "Neubau von privaten Villen und Pavillons, präzise abgestimmt auf Mallorcas Topografie, Licht und Baurecht.",
          es: "Villas y pabellones de obra nueva adaptados a la topografía mallorquina, su luz y el marco urbanístico.",
          ca: "Vil·les i pavellons d'obra nova adaptats a la topografia de l'illa, la llum i el planejament urbanístic.",
          ru: "Частные виллы и прибрежные павильоны, адаптированные к рельефу, свету и градостроительным нормам."
        },
        scope: {
          en: ["Full Proyecto Básico & de Ejecución", "Ajuntament permitting & licensing", "Thermal envelope & solar shading", "Passive ventilation design"],
          de: ["Komplette Genehmigungsplanung", "Behörden- und Bauantragsmanagement", "Thermische Gebäudehülle", "Passive Lüftungskonzepte"],
          es: ["Proyecto Básico y de Ejecución", "Gestión de licencias municipales", "Envolvente bioclimática pasiva", "Optimización de sombras y ventilación"],
          ca: ["Projecte Bàsic i d'Execució", "Gestió de llicències d'obra", "Envolupant tèrmica eficient", "Ventilació natural creuada"],
          ru: ["Полный рабочий проект и согласования", "Получение разрешений в муниципалитетах", "Пассивный тепловой контур", "Естественная кросс-вентиляция"]
        },
        typicalScale: "350 — 1,600 M²"
      },
      {
        id: "interior",
        number: "03",
        title: {
          en: "Tactile Interior Architecture",
          de: "Taktile Innenarchitektur",
          es: "Arquitectura interior táctil",
          ca: "Arquitectura interior tàctil",
          ru: "Тактильный интерьер"
        },
        summary: {
          en: "Monolithic stone carving, custom wild olive millwork, natural lime plaster finishes, and integrated acoustic comfort.",
          de: "Monolithische Natursteinarbeiten, maßgefertigte Einbauten in Olivenholz, Kalkputz und Raumakustik.",
          es: "Cantería monolítica en piedra, carpinterías a medida en acebuche, estucos de cal viva y confort acústico.",
          ca: "Canteria monolítica en pedra, ebenisteria en ullastre, acabats de calç viva i confort acústic.",
          ru: "Монолитные элементы из камня, столярка из дикой оливы, известковая штукатурка и акустика."
        },
        scope: {
          en: ["Custom joinery drawings (1:1 / 1:5)", "Tactile material curation: Marès, lime, bronze", "Concealed ambient illumination", "Circadian lighting & spatial flow"],
          de: ["Detaillierte Werkstattpläne (1:1 / 1:5)", "Materialkuration: Marès, Kalk, Bronze", "Verdeckte Lichtkonzepte", "Raumsequenzen & Akustik"],
          es: ["Planos de detalle para carpintería (1:1)", "Selección matérica: Marès, cal, bronce", "Iluminación indirecta empotrada", "Transiciones espaciales serenas"],
          ca: ["Plànols de taller per a fusteria (1:1)", "Materials autòctons: Marès, calç, bronze", "Il·luminació càlida encastada", "Continuïtat espacial"],
          ru: ["Деталировочные чертежи 1:1 и 1:5", "Палитра: марес, известь, бронза", "Скрытое архитектурное освещение", "Плавная геометрия пространств"]
        },
        typicalScale: "200 — 1,200 M²"
      },
      {
        id: "direction",
        number: "04",
        title: {
          en: "Site Oversight & Craft Direction",
          de: "Bauleitung & Handwerkskoordination",
          es: "Dirección de obra y coordinación artesanal",
          ca: "Direcció d'obra i coordinació artesanal",
          ru: "Авторский надзор и управление стройкой"
        },
        summary: {
          en: "Direct on-island oversight alongside master builders, transparent quality control, schedule enforcement, and turnkey delivery.",
          de: "Direkte Bauüberwachung vor Ort mit Meisterbetrieben, transparente Qualitätskontrolle und schlüsselfertige Übergabe.",
          es: "Supervisión directa a pie de obra con constructores cualificados, control de calidad exhaustivo y entrega llave en mano.",
          ca: "Supervisió directa a peu d'obra amb artesans locals, control de qualitat rigorós i lliurament clau en mà.",
          ru: "Непосредственный надзор на стройплощадке, контроль качества мастеров, соблюдение сроков и сдача под ключ."
        },
        scope: {
          en: ["Dirección Facultativa de Obra", "Contractor & artisan coordination", "Budget adherence & milestone sign-off", "Final occupancy certificate (Licencia)"],
          de: ["Amtliche Bauleitung (Dirección de Obra)", "Handwerker- und Baustellensteuerung", "Budget- und Meilensteinkontrolle", "Behördliche Endabnahme"],
          es: ["Dirección Facultativa colegiada", "Coordinación de gremios y artesanos", "Seguimiento riguroso de costes", "Licencia de Primera Ocupación"],
          ca: ["Direcció Facultativa col·legiada", "Coordinació d'industrials i artesans", "Control pressupostari estricte", "Cèdula d'habitabilitat"],
          ru: ["Официальный авторский надзор", "Координация подрядчиков и мастеров", "Финансовый контроль этапов", "Ввод в эксплуатацию и сертификаты"]
        },
        typicalScale: "COMPLETE MANDATE"
      }
    ]
  },
  materialsSection: {
    sectionNumber: "03",
    kicker: {
      en: "Local Materials",
      de: "Lokale Materialien",
      es: "Materiales autóctonos",
      ca: "Materials autòctons",
      ru: "Материалы острова"
    },
    headline: {
      en: "Materials from here.",
      de: "Materialien von hier.",
      es: "Materiales de aquí.",
      ca: "Materials d'aquí.",
      ru: "Материалы острова."
    },
    intro: {
      en: "Architecture rooted in Balearic geology, traditional quarrying, and centuries of artisan craft. Tactile materials that breathe with the island climate.",
      de: "Architektur, verwurzelt in balearischer Geologie, traditionsreichen Steinbrüchen und jahrhundertealtem Handwerk.",
      es: "Arquitectura enraizada en la geología balear, canteras históricas y técnicas centenarias que respiran con el clima insular.",
      ca: "Arquitectura arrelada a la geologia balear, pedreres històriques i oficis que respiren amb el clima de l'illa.",
      ru: "Архитектура, укорененная в геологии Балеарских островов, исторических карьерах и традициях ручной работы."
    },
    gridTab: {
      en: "Materials Grid (6)",
      de: "Materialraster (6)",
      es: "Muestrario de materiales (6)",
      ca: "Mostrari de materials (6)",
      ru: "Сетка материалов (6)"
    },
    schematicsTab: {
      en: "Site Schematics (5)",
      de: "Geländeschemata (5)",
      es: "Esquemas de terreno (5)",
      ca: "Esquemes de terreny (5)",
      ru: "Схемы ландшафта (5)"
    },
    prevBtn: { en: "← PREV", de: "← ZURÜCK", es: "← ANTERIOR", ca: "← ANTERIOR", ru: "← НАЗАД" },
    nextBtn: { en: "NEXT →", de: "WEITER →", es: "SIGUIENTE →", ca: "SEGÜENT →", ru: "ВПЕРЕД →" },
    inspectBtn: { en: "Inspect Material", de: "Material ansehen", es: "Ver material", ca: "Veure material", ru: "Подробнее" },
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
      en: "BALEARIC TACTILE PALETTE · SANTANYÍ · MARÈS · CALÇ · PEDRA EN SEC",
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
    sectionNumber: "04",
    kicker: {
      en: "Selected Architecture",
      de: "Ausgewählte Arbeiten",
      es: "Obras seleccionadas",
      ca: "Obres seleccionades",
      ru: "Избранные проекты"
    },
    headline: {
      en: "Built projects.",
      de: "Realisierte Projekte.",
      es: "Obras construidas.",
      ca: "Obres construïdes.",
      ru: "Реализованные объекты."
    },
    filterAll: { en: "All Works", de: "Alle Werke", es: "Todas las obras", ca: "Totes les obres", ru: "Все проекты" },
    filterResidential: { en: "Architecture", de: "Architektur", es: "Arquitectura", ca: "Arquitectura", ru: "Архитектура" },
    filterInterior: { en: "Interior", de: "Innenausbau", es: "Interior", ca: "Interior", ru: "Интерьер" },
    viewDetails: { en: "Inspect Specifications", de: "Spezifikationen einsehen", es: "Ver especificaciones", ca: "Veure fitxa tècnica", ru: "Спецификация" },
    closeSpec: { en: "Close [ESC ✕]", de: "Schließen [ESC ✕]", es: "Cerrar [ESC ✕]", ca: "Tancar [ESC ✕]", ru: "Закрыть [ESC ✕]" },
    modalSpecTitle: {
      en: "PROJECT SPECIFICATION",
      de: "PROJEKTSPEZIFIKATION",
      es: "FICHA TÉCNICA DEL PROYECTO",
      ca: "FITXA TÈCNICA DEL PROJECTE",
      ru: "СПЕЦИФИКАЦИЯ ОБЪЕКТА"
    },
    modalOverview: {
      en: "EXECUTIVE SUMMARY",
      de: "PROJEKTÜBERSICHT",
      es: "MEMORIA EJECUTIVA",
      ca: "MEMÒRIA EXECUTIVA",
      ru: "КРАТКОЕ ОПИСАНИЕ"
    },
    modalChallenge: {
      en: "THE SPATIAL CHALLENGE",
      de: "DIE RAUMAUFGABE",
      es: "EL DESAFÍO ESPACIAL",
      ca: "EL DESAFIAMENT ESPACIAL",
      ru: "ПРОСТРАНСТВЕННАЯ ЗАДАЧА"
    },
    modalSolution: {
      en: "ARCHITECTURAL RESOLUTION",
      de: "ARCHITEKTONISCHE LÖSUNG",
      es: "RESOLUCIÓN ARQUITECTÓNICA",
      ca: "RESOLUCIÓ ARQUITECTÒNICA",
      ru: "АРХИТЕКТУРНОЕ РЕШЕНИЕ"
    },
    modalCollaboration: {
      en: "SPECIALIST COLLABORATION NETWORK",
      de: "NETZWERK & FACHPLANER",
      es: "RED DE ESPECIALISTAS Y ARTESANOS",
      ca: "XARXA D'ESPECIALISTES I ARTESANS",
      ru: "СЕТЬ СПЕЦИАЛИСТОВ И МАСТЕРОВ"
    },
    modalTechSpec: {
      en: "TECHNICAL SHEET",
      de: "DATENBLATT",
      es: "HOJA TÉCNICA",
      ca: "FITXA TÈCNICA",
      ru: "ТЕХНИЧЕСКИЙ ПАСПОРТ"
    },
    primaryPalette: {
      en: "PRIMARY PALETTE",
      de: "MATERIALPALETTE",
      es: "PALETA DE MATERIALES",
      ca: "PALETA DE MATERIALS",
      ru: "ОСНОВНЫЕ МАТЕРИАЛЫ"
    },
    inquireSimilar: {
      en: "Inquire on Similar Commission →",
      de: "Ähnliches Projekt anfragen →",
      es: "Consultar proyecto similar →",
      ca: "Demanar informació per a un projecte similar →",
      ru: "Запросить аналогичный проект →"
    },
    prevProject: { en: "[PREV ←]", de: "[ZURÜCK ←]", es: "[ANTERIOR ←]", ca: "[ANTERIOR ←]", ru: "[НАЗАД ←]" },
    nextProject: { en: "[NEXT →]", de: "[WEITER →]", es: "[SIGUIENTE →]", ca: "[SEGÜENT →]", ru: "[ВПЕРЕД →]" },
    projects: [
      {
        id: "tramuntana-villa",
        number: "01",
        title: "Casa Tramuntana",
        location: "Deià, Serra de Tramuntana",
        year: "2025",
        category: {
          en: "Residential Architecture",
          de: "Wohnungsbau",
          es: "Arquitectura residencial",
          ca: "Arquitectura residencial",
          ru: "Жилая вилла"
        },
        area: "620 m²",
        orientation: "North-West · 315°",
        materials: "Santanyí Limestone, Pigmented Concrete, Teak",
        image: tramuntanaImg,
        aspect: "16:9",
        summary: {
          en: "A monolithic villa terraced into the UNESCO-protected Tramuntana slope, creating shaded microclimatic courtyards and framing sea horizons.",
          de: "Eine monolithische Villa an den UNESCO-geschützten Hängen der Tramuntana mit schattigen Innenhöfen und freiem Meerblick.",
          es: "Villa monolítica aterrazada en las laderas de la Tramuntana (UNESCO), articulando patios sombreados con vistas abiertas al horizonte marino.",
          ca: "Vil·la monolítica integrada als bancals de la Tramuntana (UNESCO), amb patis interiors frescos i vistes al mar.",
          ru: "Монолитная вилла, встроенная в террасы Трамунтаны (ЮНЕСКО), с тенистыми внутренними двориками и видом на море."
        },
        details: {
          en: {
            challenge: "Strict municipal landscape conservation restrictions combined with an aggressive 38-degree slope requiring zero visual impact from the coastal road.",
            solution: "Subterranean volume excavation utilizing excavated stone for dry-stone retaining facades; low-profile cantilevered concrete slabs that blend into olive grove terraces.",
            collaboration: "Structural engineering by Ingenia Zurich; dry-stone craftsmanship by Mestre Marger Gabriel; building automation by KNX Systems Palma."
          },
          de: {
            challenge: "Strenge Landschaftsschutzauflagen an einem steilen 38-Grad-Hang ohne visuelle Beeinträchtigung von der Küstenstraße.",
            solution: "Teilweise unterirdischer Baukörper unter Wiederverwendung des Aushubs für traditionelle Bruchsteinmauern; weit auskragende Betondächer.",
            collaboration: "Tragwerksplanung Ingenia Zürich; Bruchsteinmauerwerk Mestre Marger Gabriel; Gebäudeautomation KNX Palma."
          },
          es: {
            challenge: "Normativa restrictiva de protección paisajística en pendiente pronunciada de 38º con exigencia de nula visibilidad desde la carretera de la costa.",
            solution: "Volumen semienterrado reutilizando la piedra de excavación en bancales de piedra en seco ('marges'); losas voladas de hormigón integradas entre olivos.",
            collaboration: "Cálculo estructural por Ingenia Zúrich; maestros margers de Deià; domótica e integración climática por KNX Palma."
          },
          ca: {
            challenge: "Normativa restrictiva de protecció paisatgística en un fort pendent de 38 graus, amb nul·la visibilitat des de la carretera.",
            solution: "Volum semisoterrat reutilitzant la pedra extreta per a marjades tradicionals de pedra en sec i cobertes ajardinades.",
            collaboration: "Càlcul estructural per Ingenia Zúric; mestres margers locals de Deià; automatització per KNX Palma."
          },
          ru: {
            challenge: "Строгие природоохранные ограничения на склоне в 38 градусов с требованием нулевой видимости с прибрежной дороги.",
            solution: "Полуподземный объем с повторным использованием вынутого камня для террасных подпорных стен сухой кладки.",
            collaboration: "Инженерия Ingenia (Цюрих); сухая кладка маэстро Габриэля; автоматика KNX Palma."
          }
        },
        specSheet: [
          { label: "COORDINATES", value: "39.7521° N · 2.6480° E" },
          { label: "GROSS FLOOR AREA", value: "620 m² / Plot: 3,400 m²" },
          { label: "ENERGY RATING", value: "Class A+ (Passivhaus Envelope)" },
          { label: "STRUCTURAL SYSTEM", value: "In-situ cast white concrete & cyclopean stone" },
          { label: "GLAZING SPEC", value: "Minimal framing 24mm profile · Solar heat gain 0.28" }
        ]
      },
      {
        id: "palma-penthouse",
        number: "02",
        title: "Ático Calatrava",
        location: "Palma Historic Old Town",
        year: "2024",
        category: {
          en: "Interior Architecture",
          de: "Innenarchitektur",
          es: "Arquitectura interior",
          ca: "Arquitectura interior",
          ru: "Интерьер пентхауса"
        },
        area: "310 m²",
        orientation: "South-East · 135°",
        materials: "Continuous Microcement, White Oak, Santanyí Stone",
        image: palmaImg,
        aspect: "4:3",
        summary: {
          en: "Minimalist intervention in a 17th-century palacio attic, removing centuries of claustrophobic partitions to reveal continuous spatial flow and natural light.",
          de: "Minimalistischer Umbau eines Dachgeschosses im Stadtpalais des 17. Jahrhunderts: Offene Raumfolgen und gezielte Tageslichtführung.",
          es: "Intervención minimalista en la planta ático de un palacio del siglo XVII, liberando tabiques para generar un flujo espacial continuo inundado de luz natural.",
          ca: "Intervenció minimalista a l'àtic d'un casal del segle XVII, obrint envans històrics per crear un flux espacial inundat de llum.",
          ru: "Минималистичная трансформация мансарды дворца XVII века: удаление лишних перегородок для создания непрерывного света."
        },
        details: {
          en: {
            challenge: "Fragile heritage timber roof trusses and non-orthogonal structural masonry walls with height variations up to 45cm.",
            solution: "Concealed steel tension ties stabilizing the historical trusses, paired with a floating continuous microcement datum plane and monolithic Santanyí kitchen sculpture.",
            collaboration: "Heritage restoration consultancy by Palma Patrimoni; custom woodwork by Fusteria Artesana Manacor."
          },
          de: {
            challenge: "Historische Holzdachstühle und ungleichmäßige Steinwände mit Höhenunterschieden von bis zu 45 cm.",
            solution: "Versteckte Stahlzuganker zur Stabilisierung, kombiniert mit einem fugenlosen Mikrozementboden und einem skulpturalen Küchenblock aus Naturstein.",
            collaboration: "Denkmalfachliche Begleitung durch Palma Patrimoni; Schreinereiarbeiten durch Fusteria Artesana Manacor."
          },
          es: {
            challenge: "Estructura original de cerchas de madera del siglo XVII y muros de carga irregulares con desniveles de hasta 45 cm.",
            solution: "Tirantes de acero ocultos para estabilizar las cerchas, acompañados por un plano de suelo continuo de microcemento y una isla de cocina maciza en piedra de Santanyí.",
            collaboration: "Asesoría patrimonial con Palma Patrimoni; ebanistería a medida por Fusteria Artesana Manacor."
          },
          ca: {
            challenge: "Estructura patrimonial de fusta del segle XVII i murs de maçoneria irregulars amb desnivells de fins a 45 cm.",
            solution: "Tirants d'acer ocults per estabilitzar l'encavallada, paviment continu i illa de cuina esculpida en pedra de Santanyí.",
            collaboration: "Assessorament amb la Comissió de Patrimoni; fusteria artesana de Manacor."
          },
          ru: {
            challenge: "Хрупкие исторические деревянные балки XVII века и перепады высоты несущих стен до 45 см.",
            solution: "Скрытые стальные затяжки для стабилизации ферм, бесшовный пол и монолитный кухонный остров из камня Сантаньи.",
            collaboration: "Реставрационная экспертиза Palma Patrimoni; столярные работы мастеров из Манакора."
          }
        },
        specSheet: [
          { label: "COORDINATES", value: "39.5670° N · 2.6515° E" },
          { label: "INTERNAL AREA", value: "310 m² + 85 m² Private Terrace" },
          { label: "JOINERY", value: "Fumed European White Oak · Zero-trim details" },
          { label: "CLIMATE CONTROL", value: "Concealed ducted aerothermal system (Daikin)" },
          { label: "ACOUSTIC PERFORMANCE", value: "Sound dampening ceiling baffles (Rw = 54dB)" }
        ]
      },
      {
        id: "cliff-pavilion",
        number: "03",
        title: "Pavilion Cala Llamp",
        location: "Port d'Andratx",
        year: "2026",
        category: {
          en: "Coastal Architecture",
          de: "Küstenarchitektur",
          es: "Arquitectura de costa",
          ca: "Arquitectura de costa",
          ru: "Прибрежная архитектура"
        },
        area: "480 m²",
        orientation: "South-West · 225°",
        materials: "Lime Plaster, Marine Grade Stainless Steel, Low-Iron Glass",
        image: cliffImg,
        aspect: "16:9",
        summary: {
          en: "A cantilevered marine pavilion hovering above the Mediterranean cliffs, engineered to withstand aggressive marine salt air with minimal visual mass.",
          de: "Ein auskragender Pavillon über den Klippen von Andratx, materialisiert in meerwasserbeständigem Edelstahl und natürlichem Kalkputz.",
          es: "Pabellón en voladizo sobre los acantilados de Andratx, diseñado para resistir la salinidad marina con una masa visual limpia y austera.",
          ca: "Pavelló en voladís damunt els penya-segats d'Andratx, resistent a la salinitat marina amb una silueta lleugera i serena.",
          ru: "Консольный павильон над скалами Порт-д'Андратч, спроектированный для морского климата с чистой минималистичной массой."
        },
        details: {
          en: {
            challenge: "Extreme exposure to marine salt spray, intense summer solar gain, and high wind shear along the coastal cliff face.",
            solution: "Ultra-high performance lime plaster envelope with deep solar overhangs, recessed motorized sliding panels, and 316L marine-grade stainless hardware.",
            collaboration: "Coastal wind engineering by Buro Happold; custom facade fabrication by Schüco Marine Lab."
          },
          de: {
            challenge: "Extreme Salzluftbelastung, intensive sommerliche Sonneneinstrahlung und starke Windkräfte an der Felskante.",
            solution: "Hochleistungs-Kalkputzfassade mit tiefen Vordächern, versenkten Schiebeelementen und seewasserfesten Edelstahlbeschlägen (316L).",
            collaboration: "Windtechnisches Gutachten Buro Happold; Fassadensonderbau Schüco Marine Lab."
          },
          es: {
            challenge: "Exposición severa al salitre marítimo, radiación solar extrema en verano y fuertes ráfagas de viento sobre el cantil rocoso.",
            solution: "Revoque de cal de alta resistencia con voladizos de sombra calculados, carpintería embutida motorizada y fijaciones en acero 316L.",
            collaboration: "Ingeniería de vientos costeros Buro Happold; carpinterías de altas prestaciones Schüco Marine."
          },
          ca: {
            challenge: "Forta salinitat ambiental, radiació solar intensa d'estiu i ràfegues de vent sobre el penya-segat marí.",
            solution: "Envolupant de calç mineral d'alta durabilitat amb ràfecs de protecció solar i acer inoxidable nàutic 316L.",
            collaboration: "Enginyeria de vent marí per Buro Happold; façanes especials Schüco Marine."
          },
          ru: {
            challenge: "Экстремальное воздействие морской соли, интенсивное летнее солнце и ветровые нагрузки на обрыве.",
            solution: "Оболочка из минеральной извести, глубокие навесы для затенения и морская нержавеющая сталь 316L.",
            collaboration: "Ветровые расчеты Buro Happold; специализированное остекление Schüco Marine."
          }
        },
        specSheet: [
          { label: "COORDINATES", value: "39.5398° N · 2.3871° E" },
          { label: "VOLUME", value: "480 m² enclosed · 220 m² shaded pergolas" },
          { label: "SALT RESISTANCE", value: "Marine Class C5-M compliant coatings" },
          { label: "SOLAR SHADING", value: "Motorized micro-perforated tensioned screens" },
          { label: "WATER CYCLE", value: "100% On-site rainwater filtration cistern" }
        ]
      },
      {
        id: "finca-son-vida",
        number: "04",
        title: "Finca Son Vida",
        location: "Son Vida, Palma",
        year: "2025",
        category: {
          en: "Heritage Transformation",
          de: "Historische Transformation",
          es: "Rehabilitación patrimonial",
          ca: "Rehabilitació patrimonial",
          ru: "Реновация усадьбы"
        },
        area: "890 m²",
        orientation: "South · 180°",
        materials: "Original Fieldstone, Blackened Steel, Lime Mortar",
        image: fincaImg,
        aspect: "4:3",
        summary: {
          en: "Dialog between a 19th-century agricultural estate and a razor-thin blackened steel intervention housing the living gallery and lap pool.",
          de: "Spannungsreicher Dialog zwischen einem Landgut des 19. Jahrhunderts und einem präzisen Baukörper aus geschwärztem Stahl.",
          es: "Diálogo entre una finca rústica del siglo XIX y una intervención ligera de acero pavonado que acoge la galería principal y piscina lineal.",
          ca: "Diàleg entre una possessió del segle XIX i una subtil intervenció en acer fosc que acull la galeria i la piscina.",
          ru: "Диалог исторической усадьбы XIX века и лаконичного объема из вороненой стали с жилой галереей и бассейном."
        },
        details: {
          en: {
            challenge: "Reconciling damp traditional fieldstone masonry with the strict temperature and humidity requirements of a contemporary art collection.",
            solution: "Detached thermal envelope inside the historic volume, forming a continuous breathing air cavity and invisible perimeter floor convection vents.",
            collaboration: "Restoration masons from Alaró; steelwork engineered and crafted by Metal·lister Palma."
          },
          de: {
            challenge: "Feuchtes altes Feldsteinmauerwerk mit den strengen Klimaanforderungen einer Kunstsammlung in Einklang zu bringen.",
            solution: "Thermisch entkoppelte Innenhülle mit hinterlüfteter Ebene und unsichtbaren Konvektionsschlitzen im Bodenbelag.",
            collaboration: "Restaurierungsbetrieb Alaró; Stahlbau und Detaillierung durch Metal·lister Palma."
          },
          es: {
            challenge: "Superar la humedad del muro de mampostería tradicional para albergar una colección privada de arte contemporáneo con microclima controlado.",
            solution: "Cámara ventilada interior térmicamente desacoplada, con rejillas perimetrales invisibles integradas en la piedra de pavimento.",
            collaboration: "Canteros especialistas de Alaró; cerrajería técnica ejecutada por Metal·lister Palma."
          },
          ca: {
            challenge: "Compatibilitzar els murs de pedra tradicionals amb els requeriments tèrmics d'una col·lecció d'art contemporani.",
            solution: "Envolupant interior transpirable amb cambra d'aire desconnectada i difusors invisibles integrats a la pedra.",
            collaboration: "Picapedrers especialistes d'Alaró; serralleria tècnica per Metal·lister Palma."
          },
          ru: {
            challenge: "Устранение сырости каменной исторической кладки для размещения коллекции современного искусства.",
            solution: "Внутренний независимый вентилируемый контур с незаметными конвекционными решетками в каменном полу.",
            collaboration: "Мастера-реставраторы из Аларо; прецизионные стальные конструкции Metal·lister Palma."
          }
        },
        specSheet: [
          { label: "COORDINATES", value: "39.5982° N · 2.5991° E" },
          { label: "TOTAL AREA", value: "890 m² interior · 12,000 m² agricultural estate" },
          { label: "ENERGY SOURCE", value: "Ground-source geothermal loop (8 boreholes)" },
          { label: "STEEL FINISH", value: "Matte black oxide sealed with natural beeswax" },
          { label: "AGRICULTURE", value: "Preservation of 60 centenary olive trees" }
        ]
      },
      {
        id: "santanyi-studio",
        number: "05",
        title: "Espacio Santanyí",
        location: "Santanyí, Migjorn",
        year: "2026",
        category: {
          en: "Interior & Millwork",
          de: "Ausbau & Möbelarchitektur",
          es: "Interiorismo y mobiliario",
          ca: "Interiorisme i mobiliari",
          ru: "Интерьер и столярка"
        },
        area: "195 m²",
        orientation: "East · 090°",
        materials: "Solid Santanyí Stone, Raw Brass, Textured Lime",
        image: santanyiImg,
        aspect: "4:3",
        summary: {
          en: "An exercise in subtractive geometry: monolithic kitchen and bathroom volumes milled from single blocks of quarry-selected limestone.",
          de: "Subtraktive Geometrie: Monolithische Küchen- und Badblöcke, gefräst aus massiven Santanyí-Natursteinblöcken.",
          es: "Ejercicio de geometría sustractiva: volúmenes de cocina y baño esculpidos a partir de bloques macizos de piedra caliza de cantera local.",
          ca: "Geometria sostractiva: blocs de cuina i bany esculpits a partir de peces massisses de pedra de canteres locals.",
          ru: "Субтрактивная геометрия: монолитные объемы кухни и ванной, высеченные из цельных блоков местного известняка."
        },
        details: {
          en: {
            challenge: "Milling and hoisting a 2.4-ton continuous Santanyí block through a narrow pedestrian alley in central Santanyí village.",
            solution: "Pre-milled internal weight-reduction honeycomb geometry at the quarry CNC facility, dropping dead weight by 42% without altering visible continuous grain.",
            collaboration: "Canteras de Santanyí stone engineers; 5-axis CNC machining by Pedres Mallorca."
          },
          de: {
            challenge: "Einbringen eines 2,4 Tonnen schweren Steinblocks durch die engen Gassen im Ortskern von Santanyí.",
            solution: "Gewichtsreduktion durch verdeckte CNC-Wabenfräsung im Steinbruch, wodurch das Gewicht um 42% gesenkt wurde bei unversehrter Textur.",
            collaboration: "Canteras de Santanyí; 5-Achs-CNC-Präzisionsfräsung Pedres Mallorca."
          },
          es: {
            challenge: "Transporte e izado de una pieza monolítica de piedra de Santanyí de 2,4 toneladas a través de un callejón peatonal histórico.",
            solution: "Aligeramiento interno mediante fresado CNC en nido de abeja en cantera, reduciendo el peso un 42% preservando la continuidad de la veta.",
            collaboration: "Ingenieros de Canteras de Santanyí; mecanizado CNC a 5 ejes por Pedres Mallorca."
          },
          ca: {
            challenge: "Transport i col·locació d'una peça de 2,4 tones de pedra de Santanyí a través d'un carreró estret del nucli antic.",
            solution: "Buidat interior en niu d'abella a cantera, reduint el pes un 42% mentre es manté la continuïtat de la veta.",
            collaboration: "Enginyers de pedreres de Santanyí; mecanitzat a 5 eixos per Pedres Mallorca."
          },
          ru: {
            challenge: "Доставка и подъем 2,4-тонного монолитного блока камня Сантаньи через узкие средневековые улочки.",
            solution: "Внутреннее облегчение сотовой структурой на фрезерном станке в карьере: снижение веса на 42% без изменения текстуры.",
            collaboration: "Инженеры карьеров Santanyí; прецизионная 5-осевая обработка Pedres Mallorca."
          }
        },
        specSheet: [
          { label: "COORDINATES", value: "39.3541° N · 3.1298° E" },
          { label: "BLOCK WEIGHT", value: "1,390 kg net (milled from 2,400 kg rough block)" },
          { label: "STONE ORIGIN", value: "Quarry Bed No. 4, Santanyí (Local Km 0)" },
          { label: "SURFACE TREATMENT", value: "Honed matte finish with nano-mineral silicate seal" },
          { label: "HARDWARE", value: "Custom patinated untreated brass tapware" }
        ]
      }
    ]
  },
  materials: [
    {
      id: "mares",
      name: {
        en: "Marès Sandstone",
        de: "Marès-Kalksandstein",
        es: "Piedra de Marès",
        ca: "Pedra de Marès",
        ru: "Песчаник Марес"
      },
      localName: "Pedra de Marès",
      subtitle: {
        en: "Golden sedimentary calcarenite quarried on Mallorca",
        de: "Goldener sedimentärer Kalkarenit aus Mallorcas Steinbrüchen",
        es: "Calcarenita sedimentaria dorada extraída en Mallorca",
        ca: "Calcarenita sedimentària daurada extreta a Mallorca",
        ru: "Золотистый известняковый песчаник из карьеров Майорки"
      },
      description: {
        en: "The foundational building block of Balearic architectural heritage. Highly porous with natural thermal buffering, cut into monolithic blocks directly from island quarries.",
        de: "Der historische Baustein des balearischen Architekturerbes. Hohe thermische Trägheit, gewonnen in lokalen Steinbrüchen.",
        es: "El material fundacional de la arquitectura balear. Gran inercia térmica y textura porosa, extraída directamente de canteras locales.",
        ca: "El material patrimonial fundacional de les Balears. Gran inèrcia tèrmica natural, tallat en blocs massissos directament a les pedreres de l'illa.",
        ru: "Главный традиционный строительный материал Балеарских островов. Высокая теплоемкость и пористость, добывается в исторических карьерах острова."
      },
      origin: "Llucmajor & Porreres Quarries",
      distance: "Porreres · 34 km",
      image: maresImg,
      spec: "KM 0 QUARRY · THERMAL BUFFER"
    },
    {
      id: "santanyi",
      name: {
        en: "Santanyí Stone",
        de: "Santanyí-Naturstein",
        es: "Piedra de Santanyí",
        ca: "Pedra de Santanyí",
        ru: "Камень Сантаньи"
      },
      localName: "Pedra de Santanyí",
      subtitle: {
        en: "Compact crystalline limestone with warm creamy undertones",
        de: "Kompakter kristalliner Kalkstein mit warmem cremefarbenem Ton",
        es: "Caliza cristalina compacta de tonos crema cálidos",
        ca: "Calcària cristal·lina compacta de tons crema càlids",
        ru: "Плотный кристаллический известняк теплого кремового оттенка"
      },
      description: {
        en: "Fine-grained, dense Balearic limestone quarried in southeastern Mallorca. Exceptional structural density and weather resistance, ideal for carved architectural monoliths and precision masonry.",
        de: "Feinkörniger, dichter balearischer Kalkstein aus dem Südosten Mallorcas. Höchste Druckfestigkeit und Witterungsbeständigkeit für monolithische Werkstücke.",
        es: "Caliza balear densa de grano fino extraída en el sureste de la isla. Resistencia excepcional a la intemperie, ideal para piezas monolíticas y cantería de precisión.",
        ca: "Calcària balear de gra fi extreta al sud-est de Mallorca. Densitat estructural i resistència a la intempèrie, òptima per a peces massisses.",
        ru: "Мелкозернистый плотный известняк из юго-восточной части острова. Исключительная прочность и долговечность для монолитных архитектурных элементов."
      },
      origin: "Santanyí Quarries",
      distance: "Santanyí · 48 km",
      image: santanyiStoneImg,
      spec: "FINE GRAIN LIMESTONE · HIGH DENSITY"
    },
    {
      id: "lime",
      name: {
        en: "Lime Plaster",
        de: "Traditioneller Kalkputz",
        es: "Revoque de Cal Viva",
        ca: "Calç Viva Artesanal",
        ru: "Традиционная известь"
      },
      localName: "Calç Viva Artesanal",
      subtitle: {
        en: "Hand-troweled breathable mineral finish",
        de: "Handgeglätteter, atmungsaktiver Mineralputz",
        es: "Acabado mineral artesanal y transpirable",
        ca: "Acabat mineral artesanal i transpirable",
        ru: "Дышащее минеральное покрытие ручного нанесения"
      },
      description: {
        en: "Formulated with local slaked lime and river sands. Naturally antiseptic, vapor-permeable, actively regulating humidity while reflecting intense Mediterranean sunlight.",
        de: "Aus traditionell gelöschtem Kalk und feinen Sanden gefertigt. Diffusionsoffen, feuchtigkeitsregulierend und sonnenreflektierend.",
        es: "Elaborado con cal viva apagada y arenas de la isla. Transpirable, antiséptico y termorregulador frente a la intensa radiación solar.",
        ca: "Elaborat amb calç apagada tradicional i àrids locals. Transpirable, antisèptic i reflecteix suaument la llum mediterrània.",
        ru: "Создается из гашеной извести и островного песка. Естественный антисептик, регулирует влажность и отражает солнечный жар."
      },
      origin: "Traditional Balearic Kilns",
      distance: "Manacor · 52 km",
      image: limeImg,
      spec: "NATURAL MINERAL · VAPOR PERMEABLE"
    },
    {
      id: "dry-stone",
      name: {
        en: "Dry-Stone Walling",
        de: "Trockensteinmauern",
        es: "Paredes de Piedra en Seco",
        ca: "Pedra en Sec (Marjades)",
        ru: "Сухая каменная кладка"
      },
      localName: "Pedra en Sec",
      subtitle: {
        en: "UNESCO Intangible Cultural Heritage technique",
        de: "UNESCO Immaterielles Kulturerbe",
        es: "Técnica declarada Patrimonio Cultural UNESCO",
        ca: "Patrimoni Cultural Immaterial UNESCO",
        ru: "Техника нематериального наследия ЮНЕСКО"
      },
      description: {
        en: "Mortarless hillside stabilization crafted stone by stone by master margers. Terraced slopes allow rainwater to infiltrate without hydraulic pressure.",
        de: "Mörtelloser Hangbau, Stein für Stein durch Mestre Margers gefügt. Ermöglicht natürliche Wasserableitung und Hangstabilisierung.",
        es: "Mampostería sin argamasa ejecutada por maestros margers. Aterraza las laderas de la Tramuntana permitiendo el drenaje natural del agua.",
        ca: "Mamposteria sense morter executada per mestres margers. Aterraça les vessants de la Tramuntana permetent el drenatge natural de l'aigua.",
        ru: "Укрепление горных склонов без раствора руками мастеров-маржеров. Террасы фильтруют осадки и предотвращают эрозию."
      },
      origin: "Serra de Tramuntana Slopes",
      distance: "Tramuntana · 26 km",
      image: dryStoneImg,
      spec: "UNESCO HERITAGE · ZERO MORTAR"
    },
    {
      id: "olive-wood",
      name: {
        en: "Olive Wood",
        de: "Wildes Olivenholz",
        es: "Madera de Acebuche",
        ca: "Fusta d'Ullastre",
        ru: "Древесина дикой оливы"
      },
      localName: "Ullastre Mallorquí",
      subtitle: {
        en: "Dense, slow-grown native Balearic timber",
        de: "Dichtes, langsam gewachsenes Inselholz",
        es: "Madera noble autóctona de lento crecimiento",
        ca: "Fusta noble autòctona de creixement lent",
        ru: "Плотное реликтовое дерево медленного роста"
      },
      description: {
        en: "Reclaimed from landscape stewardship and pruning. Prized for its extreme density, twisted grain, and warm oils, shaped into bespoke millwork and handles.",
        de: "Aus nachhaltiger Landschaftspflege gewonnen. Außergewöhnlich dicht und reich an natürlichen Ölen, verarbeitet zu maßgefertigten Details.",
        es: "Recuperada de podas y podas de saneamiento de fincas. Madera de altísima densidad con vetas sinuosas para piezas singulares y tiradores.",
        ca: "Recuperada de podes i gestió forestal sostenible. Fusta d'altíssima densitat i vetes úniques per a tiradors i ebenisteria d'autor.",
        ru: "Получена при санитарной обрезке вековых деревьев. Исключительная плотность, выразительный рисунок волокон и теплый оттенок."
      },
      origin: "Pla de Mallorca Woodlands",
      distance: "Pla de Mallorca · 31 km",
      image: oliveWoodImg,
      spec: "RECLAIMED TIMBER · BESPOKE JOINERY"
    },
    {
      id: "ceramic",
      name: {
        en: "Local Ceramic Tile",
        de: "Handgefertigte Keramik",
        es: "Baldosas de Barro Cocido",
        ca: "Rajoles de Fang Artesanals",
        ru: "Глиняная терракота"
      },
      localName: "Rajoles de Fang Artesanals",
      subtitle: {
        en: "Local terracotta and clay breeze-soles",
        de: "Lokale Terracotta und Ton-Schattengitter",
        es: "Terracota artesanal y celosías cerámicas",
        ca: "Terracota artesanal i gelosies de fang",
        ru: "Островная терракота и керамические решетки"
      },
      description: {
        en: "Fired in wood-burning kilns in central Mallorca. Warm earthy floors that remain cool under barefoot summer contact, paired with sunscreen lattices.",
        de: "In traditionellen Öfen im Inselinneren gebrannt. Angenehm kühl im Sommer und taktil wärmend in der Farbgebung.",
        es: "Cocidas en alfares tradicionales del centro de Mallorca. Pavimentos frescos bajo los pies descalzos y celosías que tamizan la luz mediterránea.",
        ca: "Cuites en forns tradicionals de llenya al centre de Mallorca. Terres frescos sota els peus descalços i gelosies que filtren la llum.",
        ru: "Обжигается в дровяных печах в центре острова. Приятная прохлада под босыми ногами летом и естественное рассеивание света."
      },
      origin: "Marratxí & Campos Workshops",
      distance: "Marratxí · 14 km",
      image: ceramicImg,
      spec: "LOCAL CLAY · PASSIVE COOLING"
    }
  ],
  studio: {
    sectionNumber: "04",
    label: {
      en: "04 · Studio",
      es: "04 · Estudio",
      ca: "04 · Estudi",
      de: "04 · Studio",
      ru: "04 · Студия"
    },
    kicker: {
      en: "04 · Studio",
      es: "04 · Estudio",
      ca: "04 · Estudi",
      de: "04 · Studio",
      ru: "04 · Студия"
    },
    headline: {
      en: "Small by choice.",
      es: "Pequeños por elección.",
      ca: "Petits per elecció.",
      de: "Bewusst klein.",
      ru: "Небольшие — осознанно."
    },
    subline: {
      en: "Architecture, urbanism and landscape. Based in Mallorca.",
      es: "Arquitectura, urbanismo y paisaje. Desde Mallorca.",
      ca: "Arquitectura, urbanisme i paisatge. Des de Mallorca.",
      de: "Architektur, Städtebau und Landschaft. Mit Sitz auf Mallorca.",
      ru: "Архитектура, градостроительство и ландшафт. Базируемся на Майорке."
    },
    blocks: [
      {
        number: "01",
        title: {
          en: "Local",
          es: "Locales",
          ca: "Locals",
          de: "Vor Ort",
          ru: "Местные"
        },
        text: {
          en: "We live on the island. We know its terrain, climate, rules and habitats, and we work to keep them intact.",
          es: "Vivimos en la isla. Conocemos su terreno, su clima, su normativa y sus hábitats, y trabajamos para conservarlos.",
          ca: "Vivim a l'illa. Coneixem el seu terreny, el clima, la normativa i els hàbitats, i treballam per conservar-los.",
          de: "Wir leben auf der Insel. Wir kennen Gelände, Klima, Vorschriften und Lebensräume – und arbeiten daran, sie zu erhalten.",
          ru: "Мы живём на острове. Знаем его рельеф, климат, нормы и природную среду — и работаем, чтобы их сохранить."
        },
        full: {
          en: "Local — We live on the island. We know its terrain, climate, rules and habitats, and we work to keep them intact.",
          es: "Locales — Vivimos en la isla. Conocemos su terreno, su clima, su normativa y sus hábitats, y trabajamos para conservarlos.",
          ca: "Locals — Vivim a l'illa. Coneixem el seu terreny, el clima, la normativa i els hàbitats, i treballam per conservar-los.",
          de: "Vor Ort — Wir leben auf der Insel. Wir kennen Gelände, Klima, Vorschriften und Lebensräume – und arbeiten daran, sie zu erhalten.",
          ru: "Местные — Мы живём на острове. Знаем его рельеф, климат, нормы и природную среду — и работаем, чтобы их сохранить."
        }
      },
      {
        number: "02",
        title: {
          en: "Flexible",
          es: "Flexibles",
          ca: "Flexibles",
          de: "Flexibel",
          ru: "Гибкие"
        },
        text: {
          en: "Remote by default. Face to face whenever the project needs it: with you, on site, with builders.",
          es: "En remoto por defecto. En persona siempre que el proyecto lo pida: contigo, en obra y con las constructoras.",
          ca: "En remot per defecte. En persona sempre que el projecte ho demani: amb tu, a l'obra i amb les constructores.",
          de: "Standardmäßig remote. Persönlich, wann immer das Projekt es braucht: mit Ihnen, auf der Baustelle, mit den Baufirmen.",
          ru: "По умолчанию удалённо. Лично — всегда, когда это нужно проекту: с вами, на площадке, с подрядчиками."
        },
        full: {
          en: "Flexible — Remote by default. Face to face whenever the project needs it: with you, on site, with builders.",
          es: "Flexibles — En remoto por defecto. En persona siempre que el proyecto lo pida: contigo, en obra y con las constructoras.",
          ca: "Flexibles — En remot per defecte. En persona sempre que el projecte ho demani: amb tu, a l'obra i amb les constructores.",
          de: "Flexibel — Standardmäßig remote. Persönlich, wann immer das Projekt es braucht: mit Ihnen, auf der Baustelle, mit den Baufirmen.",
          ru: "Гибкие — По умолчанию удалённо. Лично — всегда, когда это нужно проекту: с вами, на площадке, с подрядчиками."
        }
      },
      {
        number: "03",
        title: {
          en: "Focused",
          es: "Enfocados",
          ca: "Enfocats",
          de: "Fokussiert",
          ru: "Сфокусированные"
        },
        text: {
          en: "A limited number of projects per year. Full attention for every client, a healthy team.",
          es: "Un número limitado de proyectos al año. Atención plena a cada cliente y un equipo con equilibrio.",
          ca: "Un nombre limitat de projectes a l'any. Atenció plena a cada client i un equip amb equilibri.",
          de: "Eine begrenzte Zahl an Projekten pro Jahr. Volle Aufmerksamkeit für jeden Kunden, ein Team mit Balance.",
          ru: "Ограниченное число проектов в год. Полное внимание каждому клиенту и команда без выгорания."
        },
        full: {
          en: "Focused — A limited number of projects per year. Full attention for every client, a healthy team.",
          es: "Enfocados — Un número limitado de proyectos al año. Atención plena a cada cliente y un equipo con equilibrio.",
          ca: "Enfocats — Un nombre limitat de projectes a l'any. Atenció plena a cada client i un equip amb equilibri.",
          de: "Fokussiert — Eine begrenzte Zahl an Projekten pro Jahr. Volle Aufmerksamkeit für jeden Kunden, ein Team mit Balance.",
          ru: "Сфокусированные — Ограниченное число проектов в год. Полное внимание каждому клиенту и команда без выгорания."
        }
      },
      {
        number: "04",
        title: {
          en: "Experienced",
          es: "Con experiencia",
          ca: "Amb experiència",
          de: "Erfahren",
          ru: "Опытные"
        },
        text: {
          en: "Architecture, urbanism and landscape projects in Germany and Spain, national and international.",
          es: "Proyectos de arquitectura, urbanismo y paisaje en Alemania y España, nacionales e internacionales.",
          ca: "Projectes d'arquitectura, urbanisme i paisatge a Alemanya i Espanya, nacionals i internacionals.",
          de: "Architektur-, Städtebau- und Landschaftsprojekte in Deutschland und Spanien, national wie international.",
          ru: "Проекты в архитектуре, градостроительстве и ландшафте в Германии и Испании — национальные и международные."
        },
        full: {
          en: "Experienced — Architecture, urbanism and landscape projects in Germany and Spain, national and international.",
          es: "Con experiencia — Proyectos de arquitectura, urbanismo y paisaje en Alemania y España, nacionales e internacionales.",
          ca: "Amb experiència — Projectes d'arquitectura, urbanisme i paisatge a Alemanya i Espanya, nacionals i internacionals.",
          de: "Erfahren — Architektur-, Städtebau- und Landschaftsprojekte in Deutschland und Spanien, national wie international.",
          ru: "Опытные — Проекты в архитектуре, градостроительстве и ландшафте в Германии и Испании — национальные и международные."
        }
      },
      {
        number: "05",
        title: {
          en: "Connected",
          es: "Conectados",
          ca: "Connectats",
          de: "Vernetzt",
          ru: "Сеть партнёров"
        },
        text: {
          en: "Local artisans. Local specialists in analysis, computational design and engineering.",
          es: "Artesanos locales. Especialistas locales en análisis, diseño computacional e ingeniería.",
          ca: "Artesans locals. Especialistes locals en anàlisi, disseny computacional i enginyeria.",
          de: "Lokales Handwerk. Lokale Fachleute für Analyse, Computational Design und Ingenieurwesen.",
          ru: "Местные мастера. Местные специалисты по анализу, вычислительному проектированию и инженерии."
        },
        full: {
          en: "Connected — Local artisans. Local specialists in analysis, computational design and engineering.",
          es: "Conectados — Artesanos locales. Especialistas locales en análisis, diseño computacional e ingeniería.",
          ca: "Connectats — Artesans locals. Especialistes locals en anàlisi, disseny computacional i enginyeria.",
          de: "Vernetzt — Lokales Handwerk. Lokale Fachleute für Analyse, Computational Design und Ingenieurwesen.",
          ru: "Сеть партнёров — Местные мастера. Местные специалисты по анализу, вычислительному проектированию и инженерии."
        }
      }
    ],
    mapLabels: {
      studio: {
        en: "Studio",
        es: "Estudio",
        ca: "Estudi",
        de: "Studio",
        ru: "Студия"
      },
      artisans: {
        en: "Artisans",
        es: "Artesanos",
        ca: "Artesans",
        de: "Handwerk",
        ru: "Мастера"
      },
      specialists: {
        en: "Specialists",
        es: "Especialistas",
        ca: "Especialistes",
        de: "Fachleute",
        ru: "Специалисты"
      },
      sites: {
        en: "Sites",
        es: "Proyectos",
        ca: "Projectes",
        de: "Projekte",
        ru: "Объекты"
      }
    },
    readouts: {
      mode: {
        en: "Mode: Remote · On site",
        es: "Modalidad: Remoto · En obra",
        ca: "Modalitat: Remot · A l'obra",
        de: "Modus: Remote · Vor Ort",
        ru: "Режим: Удалённо · На площадке"
      },
      projectsPerYear: {
        en: "Projects / year: [X]",
        es: "Proyectos / año: [X]",
        ca: "Projectes / any: [X]",
        de: "Projekte / Jahr: [X]",
        ru: "Проектов в год: [X]"
      },
      disciplines: {
        en: "Disciplines: 3",
        es: "Disciplinas: 3",
        ca: "Disciplines: 3",
        de: "Disziplinen: 3",
        ru: "Направлений: 3"
      }
    }
  },
  contact: {
    sectionNumber: "06",
    kicker: {
      en: "Get In Touch",
      de: "Kontakt",
      es: "Contacto",
      ca: "Contacte",
      ru: "Контакты"
    },
    headline: {
      en: "Start a conversation.",
      de: "Gespräch beginnen.",
      es: "Iniciar conversación.",
      ca: "Iniciar conversa.",
      ru: "Начать диалог."
    },
    subtext: {
      en: "We collaborate with clients in Mallorca and across Europe. Reach out directly to discuss a site, an idea, or an upcoming commission.",
      de: "Wir arbeiten mit Bauherren auf Mallorca und in ganz Europa. Kontaktieren Sie uns für Ihr Grundstück, eine Idee oder ein Bauvorhaben.",
      es: "Colaboramos con clientes en Mallorca y en toda Europa. Escríbanos directamente para valorar una parcela, una idea o un nuevo proyecto.",
      ca: "Col·laborem amb clients a Mallorca i a tot Europa. Escriviu-nos directament per valorar una parcel·la, una idea o un nou projecte.",
      ru: "Мы работаем с клиентами на Майорке и по всей Европе. Свяжитесь с нами, чтобы обсудить участок, замысел или будущий проект."
    },
    email: "studio@nolobo.es",
    phone: "+34 971 88 42 10",
    address: "Carrer de Sant Feliu 17, 07012 Palma de Mallorca, Illes Balears",
    form: {
      nameLabel: {
        en: "Full Name / Organization",
        de: "Vollständiger Name / Organisation",
        es: "Nombre completo / Entidad",
        ca: "Nom complet / Entitat",
        ru: "Имя / Организация"
      },
      emailLabel: {
        en: "Direct Email Address",
        de: "Direkte E-Mail-Adresse",
        es: "Correo electrónico directo",
        ca: "Correu electrònic directe",
        ru: "Электронная почта"
      },
      projectTypeLabel: {
        en: "Typology of Project",
        de: "Projekt-Typologie",
        es: "Tipología del proyecto",
        ca: "Tipologia del projecte",
        ru: "Тип проекта"
      },
      projectTypes: [
        {
          value: "new_build",
          label: {
            en: "New-Build Villa / Residence",
            de: "Neubau Villa / Wohnresidenz",
            es: "Obra nueva: Villa / Residencia",
            ca: "Obra nova: Vil·la / Residència",
            ru: "Новое строительство: вилла / резиденция"
          }
        },
        {
          value: "heritage_renovation",
          label: {
            en: "Historic Finca / Palacio Renovation",
            de: "Finca- / Palais-Sanierung",
            es: "Rehabilitación de Finca / Palacio",
            ca: "Rehabilitació de Finca / Casal històric",
            ru: "Реновация исторической усадьбы или паласио"
          }
        },
        {
          value: "interior_architecture",
          label: {
            en: "High-End Interior Architecture",
            de: "Exklusiver Innenausbau",
            es: "Arquitectura interior de alta gama",
            ca: "Arquitectura interior i mobiliari d'autor",
            ru: "Премиальная интерьерная архитектура"
          }
        },
        {
          value: "landscape_architecture",
          label: {
            en: "Landscape Architecture & Land Integration",
            de: "Landschaftsarchitektur & Geländegestaltung",
            es: "Arquitectura del paisaje e integración",
            ca: "Arquitectura del paisatge i integració",
            ru: "Ландшафтная архитектура и интеграция"
          }
        }
      ],
      locationScaleLabel: {
        en: "Approximate Location & Scale (m²)",
        de: "Standort & ungefähre Fläche (m²)",
        es: "Ubicación aproximada y escala (m²)",
        ca: "Ubicació aproximada i superfície (m²)",
        ru: "Примерная локация и площадь (м²)"
      },
      messageLabel: {
        en: "Project Scope & Intent",
        de: "Projektumfang & Zielsetzung",
        es: "Alcance e intenciones del proyecto",
        ca: "Abast i intencions del projecte",
        ru: "Пожелания и цели проекта"
      },
      submitBtn: {
        en: "Send Message",
        de: "Nachricht senden",
        es: "Enviar consulta",
        ca: "Enviar missatge",
        ru: "Отправить запрос"
      },
      submitting: {
        en: "Transmitting...",
        de: "Übertrage...",
        es: "Enviando...",
        ca: "Enviant...",
        ru: "Отправка..."
      },
      successTitle: {
        en: "Conversation Initiated",
        de: "Anfrage erfasst",
        es: "Consulta iniciada con éxito",
        ca: "Conversa iniciada amb èxit",
        ru: "Запрос успешно отправлен"
      },
      successDesc: {
        en: "Thank you for reaching out. A studio partner will review your inquiry and get in touch within 24 business hours.",
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
        en: "Send Another Inquiry",
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
          en: "Please specify project scope or wishes.",
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
    rights: "© 2026 NOLOBO STUDIO S.L.P. · ALL RIGHTS RESERVED.",
    impressumContent: {
      en: "NOLOBO STUDIO S.L.P. is a registered architectural consultancy with the Col·legi Oficial d'Arquitectes de les Illes Balears (COAIB). Registered office: Carrer de Sant Feliu 17, 07012 Palma de Mallorca, Spain. CIF: B-07982411. Managing Partners: Licensed Architects COAIB.",
      de: "NOLOBO STUDIO S.L.P. ist eine bei der Architektenkammer der Balearen (COAIB) eingetragene Gesellschaft. Sitz: Carrer de Sant Feliu 17, 07012 Palma de Mallorca, Spanien. CIF: B-07982411. Vertretungsberechtigte Partner: Freie Architekten COAIB.",
      es: "NOLOBO STUDIO S.L.P. es una sociedad profesional de arquitectura inscrita en el Col·legi Oficial d'Arquitectes de les Illes Balears (COAIB). Domicilio social: Carrer de Sant Feliu 17, 07012 Palma de Mallorca, España. CIF: B-07982411.",
      ca: "NOLOBO STUDIO S.L.P. és una societat professional d'arquitectura inscrita al Col·legi Oficial d'Arquitectes de les Illes Balears (COAIB). Domicili social: Carrer de Sant Feliu 17, 07012 Palma de Mallorca, Espanya. CIF: B-07982411.",
      ru: "NOLOBO STUDIO S.L.P. — архитектурная компания, зарегистрированная в Официальной коллегии архитекторов Балеарских островов (COAIB). Юридический адрес: Carrer de Sant Feliu 17, 07012 Palma de Mallorca, Spain. CIF: B-07982411."
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
