import type {
  Equipment,
  LiveLink,
  Mission,
  MissionEvent,
  Phase,
  Program,
  SourceLink
} from "@/lib/types";

const official = (label: string, url: string): SourceLink => ({
  label,
  url,
  confidence: "official"
});

const external = (label: string, url: string): SourceLink => ({
  label,
  url,
  confidence: "external"
});

export const sourceLinks = {
  moonBasePhases: official("NASA Moon Base Phases", "https://www.nasa.gov/moonbase-phases/"),
  moonBaseSystems: official("NASA Moon Base Systems", "https://www.nasa.gov/moonbase-systems/"),
  artemis: official("NASA Artemis", "https://www.nasa.gov/humans-in-space/artemis/"),
  nasaLive: official("NASA Live", "https://www.nasa.gov/live/"),
  launchLibrary: external("Launch Library 2", "https://ll.thespacedevs.com/docs"),
  nasaImages: official("NASA Images", "https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf"),
  dsn: official("NASA DSN Now", "https://eyes.nasa.gov/apps/dsn-now/dsn.html"),
  arow: official(
    "NASA AROW",
    "https://www.nasa.gov/missions/artemis/orion/track-nasas-artemis-i-mission-in-real-time"
  )
};

const moonBaseHeroImages = {
  moonBaseI: "https://www.nasa.gov/wp-content/uploads/2026/05/blue-origin-mk-1.jpg?w=1950",
  moonBaseII: "https://www.nasa.gov/wp-content/uploads/2026/05/astrobotic.jpg?w=2048",
  moonBaseIII: "https://www.nasa.gov/wp-content/uploads/2026/05/intuitive-machines.png?w=1580",
  moonfallDrones: "https://www.nasa.gov/wp-content/uploads/2026/05/moonfall-thumbnail-2-clean-1.jpg?w=2048",
  lunarTerrainVehicles: "https://www.nasa.gov/wp-content/uploads/2025/07/ltv-concept.png?w=1920",
  radioisotopeHeatingUnits: "https://www.nasa.gov/wp-content/uploads/2026/05/rhu-rover-hopper-beautyshot.png?w=2048",
  lunarRelaySatellites: "https://www.nasa.gov/wp-content/uploads/2026/05/lro-beautyshot.png?w=2048",
  viper: "https://www.nasa.gov/wp-content/uploads/2026/05/jsc2024e059358.jpg?w=2048",
  pressurizedRover: "https://www.nasa.gov/wp-content/uploads/2026/05/20250331-01.jpg?w=2048",
  logisticsRovers: "https://www.nasa.gov/wp-content/uploads/2026/05/logistics-rover-beautyshot.png?w=2048",
  nuclearSurfacePower: "https://www.nasa.gov/wp-content/uploads/2026/05/rtg-beautyshot.png?w=2048",
  solarPower: "https://www.nasa.gov/wp-content/uploads/2026/05/solararray-lander-beautyshot.png?w=2048",
  surfaceCommunications: "https://www.nasa.gov/wp-content/uploads/2026/05/cpnt-surf-terminal-beautyshot.png?w=2048",
  habitats: "https://www.nasa.gov/wp-content/uploads/2026/05/mph-beautyshot.png?w=2048",
  isru: "https://www.nasa.gov/wp-content/uploads/2026/05/isru-regolithprocessing-beautyshot.png?w=2048",
  cargoReturn: "https://www.nasa.gov/wp-content/uploads/2026/05/cargo-return-beautyshot.png?w=2048",
  logistics: "https://www.nasa.gov/wp-content/uploads/2026/05/cpc-logistics-actionshot.png?w=2048"
} as const;

const artemisHeroImages = {
  artemisII: "https://images-assets.nasa.gov/image/NHQ202211160008/NHQ202211160008~large.jpg",
  artemisIII: "https://www.nasa.gov/wp-content/uploads/2023/04/51476988575-254f09eb06-o.jpg?w=1536",
  starshipHlsDemo: "https://www.nasa.gov/wp-content/uploads/2024/11/11-03-24-artemis-3-on-surface.jpg?w=1024",
  gatewayPpeHalo: "https://www.nasa.gov/wp-content/uploads/2023/06/artemis-gateway-artemis-iv-gateway-landscapeorig.png?w=2048",
  artemisIV: "https://www.nasa.gov/wp-content/uploads/2023/06/artemis-gateway-artemis-iv-gateway-landscapeorig.png?w=2048",
  artemisV: "https://www.nasa.gov/wp-content/uploads/2023/05/bluemoon-nasa-option-2023-05-19-01.29.31-0.jpg?w=985"
} as const;

const equipmentImages = {
  sls: "https://www.nasa.gov/wp-content/uploads/2023/02/Artemis-I-launch.jpg",
  orion: "https://images-assets.nasa.gov/image/art001e000672/art001e000672~orig.jpg",
  starshipHls: "https://www.nasa.gov/wp-content/uploads/2023/01/spacex_starship_hls_artemis_iii_2_crew_0_0.jpg",
  gateway: "https://www.nasa.gov/wp-content/uploads/2023/03/gateway-full-configuration-hero-image-121123.png",
  surfacePower: moonBaseHeroImages.solarPower,
  ...moonBaseHeroImages
} as const;

export const programs: Program[] = [
  {
    id: "moon-base",
    name: "Moon Base",
    accent: "#8FE3FF",
    summary: "NASA's phased path toward sustained lunar surface operations.",
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "artemis",
    name: "Artemis",
    accent: "#FFFFFF",
    summary: "Crewed lunar exploration missions using SLS, Orion, Gateway, and Human Landing Systems.",
    sourceUrls: [sourceLinks.artemis]
  },
  {
    id: "gateway",
    name: "Gateway",
    accent: "#C7D2FE",
    summary: "A lunar-orbit platform for crew staging, science, logistics, and communications.",
    sourceUrls: [sourceLinks.artemis]
  },
  {
    id: "clps",
    name: "CLPS",
    accent: "#F8C471",
    summary: "Commercial lunar deliveries carrying NASA science and technology payloads.",
    sourceUrls: [sourceLinks.moonBaseSystems]
  },
  {
    id: "surface-systems",
    name: "Surface Systems",
    accent: "#9BE7C8",
    summary: "Rovers, habitats, power, communications, and science systems for longer stays.",
    sourceUrls: [sourceLinks.moonBaseSystems]
  }
];

export const phases: Phase[] = [
  {
    id: "phase-one",
    programId: "moon-base",
    title: "Phase One",
    dateLabel: "Now-2029",
    startYear: 2024,
    endYear: 2029,
    summary: "Learn, test, and build through robotic missions, early surface demonstrations, and technology validation near the lunar South Pole.",
    focus: ["Moon Base I-III", "MoonFall drones", "LTVs", "VIPER", "power and communications demos"],
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "phase-two",
    programId: "moon-base",
    title: "Phase Two",
    dateLabel: "2029-2032",
    startYear: 2029,
    endYear: 2032,
    summary: "Early habitation and logistics phase with expanded power, pressurized mobility, site preparation, and surface communications.",
    focus: ["pressurized rover", "site logistics", "nuclear power", "solar augmentation", "surface communications"],
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "phase-three",
    programId: "moon-base",
    title: "Phase Three",
    dateLabel: "2032-beyond",
    startYear: 2032,
    summary: "Scale toward sustained human presence with larger habitats, ISRU, cargo return, logistics, and continuous surface activity.",
    focus: ["habitats", "ISRU", "cargo return", "sustained logistics", "continuous surface activity"],
    sourceUrls: [sourceLinks.moonBasePhases]
  }
];

export const missions: Mission[] = [
  {
    id: "moon-base-phase-one",
    title: "Phase One: Foundational Surface Capability",
    subtitle: "Moon Base roadmap",
    programIds: ["moon-base", "surface-systems", "clps"],
    phaseId: "phase-one",
    status: "active",
    dateLabel: "Now-2029",
    datePrecision: "range",
    summary: "A combined phase for robotic deliveries, crewed return, early mobility, power, comms, and surface operations.",
    objectives: [
      "Demonstrate recurring lunar deliveries",
      "Prepare crewed lunar landing architecture",
      "Deploy initial surface power and communications",
      "Validate rover and cargo operations"
    ],
    equipmentIds: ["nova-c", "griffin", "viper", "ltv", "lunar-surface-power"],
    sourceUrls: [sourceLinks.moonBasePhases, sourceLinks.moonBaseSystems]
  },
  {
    id: "artemis-ii",
    title: "Artemis II",
    subtitle: "Crewed lunar flyby",
    programIds: ["artemis"],
    phaseId: "phase-one",
    status: "watch",
    dateLabel: "Schedule watch",
    datePrecision: "tbd",
    summary: "The first crewed Artemis flight test will send astronauts around the Moon and back aboard Orion.",
    objectives: ["Validate Orion life support", "Demonstrate crew operations", "Return safely after lunar flyby"],
    equipmentIds: ["sls", "orion"],
    heroImageUrl: artemisHeroImages.artemisII,
    sourceUrls: [sourceLinks.artemis, sourceLinks.launchLibrary]
  },
  {
    id: "artemis-iii",
    title: "Artemis III",
    subtitle: "Crewed lunar landing architecture",
    programIds: ["artemis", "surface-systems"],
    phaseId: "phase-one",
    status: "in-development",
    dateLabel: "2027 planning baseline",
    datePrecision: "year",
    summary: "Targets the next major crewed lunar surface milestone with Orion, SLS, spacesuits, and a Human Landing System.",
    objectives: ["Crew lunar surface operations", "Validate HLS crew transfer", "Return samples and surface data"],
    equipmentIds: ["sls", "orion", "starship-hls", "xemu-suits"],
    landingRegion: "Lunar south polar region",
    heroImageUrl: artemisHeroImages.artemisIII,
    sourceUrls: [sourceLinks.artemis, sourceLinks.launchLibrary]
  },
  {
    id: "starship-hls-demo",
    title: "Starship HLS Demonstration",
    subtitle: "Uncrewed lander demo",
    programIds: ["artemis", "surface-systems"],
    phaseId: "phase-one",
    status: "watch",
    dateLabel: "2027 watch",
    datePrecision: "year",
    summary: "Uncrewed Human Landing System demonstration tracked as a dependency for crewed surface missions.",
    objectives: ["Demonstrate HLS landing", "Validate surface ascent concept", "Exercise mission operations"],
    equipmentIds: ["starship-hls"],
    heroImageUrl: artemisHeroImages.starshipHlsDemo,
    sourceUrls: [sourceLinks.artemis, sourceLinks.launchLibrary]
  },
  {
    id: "gateway-ppe-halo",
    title: "Gateway PPE + HALO",
    subtitle: "First Gateway elements",
    programIds: ["gateway", "artemis"],
    phaseId: "phase-one",
    status: "in-development",
    dateLabel: "Late 2020s",
    datePrecision: "range",
    summary: "The Power and Propulsion Element and HALO habitation module form the first Gateway configuration.",
    objectives: ["Deploy lunar-orbit staging platform", "Provide power and propulsion", "Enable crew logistics"],
    equipmentIds: ["gateway", "halo", "ppe"],
    heroImageUrl: artemisHeroImages.gatewayPpeHalo,
    sourceUrls: [sourceLinks.artemis, sourceLinks.launchLibrary]
  },
  {
    id: "artemis-iv",
    title: "Artemis IV",
    subtitle: "Gateway assembly and lunar mission",
    programIds: ["artemis", "gateway"],
    phaseId: "phase-one",
    status: "planned",
    dateLabel: "Early 2028 planning baseline",
    datePrecision: "half",
    summary: "Planned to expand Gateway capability while continuing crewed lunar exploration operations.",
    objectives: ["Deliver Gateway elements", "Support crewed lunar campaign", "Extend deep-space logistics"],
    equipmentIds: ["sls", "orion", "gateway", "ihab"],
    heroImageUrl: artemisHeroImages.artemisIV,
    sourceUrls: [sourceLinks.artemis]
  },
  {
    id: "artemis-v",
    title: "Artemis V",
    subtitle: "Surface mobility expansion",
    programIds: ["artemis", "surface-systems"],
    phaseId: "phase-one",
    status: "planned",
    dateLabel: "Late 2028 planning baseline",
    datePrecision: "half",
    summary: "Planned as an expanding surface mission with stronger mobility and infrastructure dependencies.",
    objectives: ["Increase surface exploration range", "Integrate next-generation surface systems", "Advance lunar base operations"],
    equipmentIds: ["sls", "orion", "blue-moon", "ltv", "gateway"],
    heroImageUrl: artemisHeroImages.artemisV,
    sourceUrls: [sourceLinks.artemis]
  },
  {
    id: "clps-cargo-cadence",
    title: "CLPS Cargo Cadence",
    subtitle: "Commercial deliveries",
    programIds: ["clps", "moon-base"],
    phaseId: "phase-one",
    status: "active",
    dateLabel: "Rolling schedule",
    datePrecision: "tbd",
    summary: "Commercial lunar payload deliveries provide science instruments, tech demos, and scouting data for future crews.",
    objectives: ["Deliver NASA payloads", "Demonstrate commercial landing services", "Scout surface conditions"],
    equipmentIds: ["nova-c", "griffin", "blue-ghost"],
    sourceUrls: [sourceLinks.moonBaseSystems, sourceLinks.launchLibrary]
  },
  {
    id: "moon-base-i",
    title: "Moon Base I",
    subtitle: "Blue Moon Mark 1 / Endurance",
    programIds: ["moon-base", "clps", "surface-systems"],
    phaseId: "phase-one",
    status: "in-development",
    dateLabel: "2028",
    datePrecision: "year",
    classificationLabel: "Key Mission",
    summary: "Blue Origin's Blue Moon Mark 1 lander will deliver NASA science and technology payloads while demonstrating capabilities for sustained lunar surface operations.",
    objectives: [
      "Land near Shackleton Connecting Ridge",
      "Demonstrate precision landing and autonomous guidance",
      "Carry plume-surface cameras and a laser retroreflective array"
    ],
    equipmentIds: ["blue-moon", "lunar-surface-power"],
    landingRegion: "Shackleton Connecting Ridge",
    heroImageUrl: moonBaseHeroImages.moonBaseI,
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "moon-base-ii",
    title: "Moon Base II",
    subtitle: "Astrobotic Griffin-1",
    programIds: ["moon-base", "clps", "surface-systems"],
    phaseId: "phase-one",
    status: "planned",
    dateLabel: "Now-2029",
    datePrecision: "range",
    classificationLabel: "Key Mission",
    summary: "Astrobotic's Griffin Mission One will demonstrate commercial lunar landing and mobility capabilities while delivering NASA and partner payloads.",
    objectives: [
      "Target Nobile Crater near the lunar South Pole",
      "Deliver Astrolab's FLIP rover demonstration",
      "Carry NASA, ESA, Astrobotic, and commercial payloads"
    ],
    equipmentIds: ["griffin", "site-logistics-rovers"],
    landingRegion: "Nobile Crater",
    heroImageUrl: moonBaseHeroImages.moonBaseII,
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "moon-base-iii",
    title: "Moon Base III",
    subtitle: "Intuitive Machines IM-3 / Nova-C",
    programIds: ["moon-base", "clps", "surface-systems"],
    phaseId: "phase-one",
    status: "planned",
    dateLabel: "Now-2029",
    datePrecision: "range",
    classificationLabel: "Key Mission",
    summary: "Intuitive Machines' IM-3 mission will deliver NASA science and technology payloads to Reiner Gamma using the Nova-C lander Trinity.",
    objectives: [
      "Deliver Lunar Vertex science payloads",
      "Investigate magnetic anomalies and lunar swirls",
      "Carry international partner payloads"
    ],
    equipmentIds: ["nova-c"],
    landingRegion: "Reiner Gamma",
    heroImageUrl: moonBaseHeroImages.moonBaseIII,
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "moonfall-drones",
    title: "MoonFall Drones",
    subtitle: "South Pole scouting drones",
    programIds: ["moon-base", "surface-systems"],
    phaseId: "phase-one",
    status: "in-development",
    dateLabel: "2028",
    datePrecision: "year",
    classificationLabel: "Key Mission",
    summary: "NASA plans to deploy four highly mobile MoonFall drones to scout steep terrain and permanently shadowed regions near the lunar South Pole.",
    objectives: [
      "Survey terrain that rovers cannot easily access",
      "Operate independently over roughly one lunar day",
      "Collect imagery and site data for future surface operations"
    ],
    equipmentIds: ["moonfall-drones"],
    landingRegion: "Lunar South Pole region",
    heroImageUrl: moonBaseHeroImages.moonfallDrones,
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "lunar-terrain-vehicles-phase-one",
    title: "Lunar Terrain Vehicles",
    subtitle: "Phase One surface mobility",
    programIds: ["moon-base", "surface-systems", "clps"],
    phaseId: "phase-one",
    status: "in-development",
    dateLabel: "2028",
    datePrecision: "year",
    classificationLabel: "Key Surface Assets",
    summary: "NASA plans to begin deploying crewed and uncrewed Lunar Terrain Vehicles to establish early surface mobility for the Moon Base.",
    objectives: [
      "Deploy crewed and uncrewed mobility systems",
      "Support teleoperation and early exploration",
      "Prepare longer-range surface traverses"
    ],
    equipmentIds: ["ltv", "blue-moon"],
    landingRegion: "Lunar South Pole region",
    heroImageUrl: moonBaseHeroImages.lunarTerrainVehicles,
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "radioisotope-heating-units",
    title: "Radioisotope Heating Units",
    subtitle: "Lunar night survival demo",
    programIds: ["moon-base", "surface-systems"],
    phaseId: "phase-one",
    status: "planned",
    dateLabel: "Now-2029",
    datePrecision: "range",
    classificationLabel: "Key Demonstration",
    summary: "NASA plans to demonstrate radioisotope heating technologies that can keep instruments, batteries, and mechanisms warm in shadowed lunar environments.",
    objectives: [
      "Support survival through long lunar nights",
      "Enable operations in cold, shadowed regions",
      "Mature thermal systems for sustained surface missions"
    ],
    equipmentIds: ["radioisotope-heating-units"],
    heroImageUrl: moonBaseHeroImages.radioisotopeHeatingUnits,
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "lunar-relay-observation-satellites",
    title: "Communications and Observation Satellites",
    subtitle: "Initial lunar relay assets",
    programIds: ["moon-base", "surface-systems"],
    phaseId: "phase-one",
    status: "planned",
    dateLabel: "Now-2029",
    datePrecision: "range",
    classificationLabel: "Key Orbital Assets",
    summary: "NASA anticipates deploying orbital relay and observation assets to expand communications, positioning, and navigation support for lunar surface operations.",
    objectives: [
      "Improve Earth-to-surface communications",
      "Demonstrate early LunaNet interoperability",
      "Support growing lunar surface operations"
    ],
    equipmentIds: ["lunar-relay-satellites"],
    heroImageUrl: moonBaseHeroImages.lunarRelaySatellites,
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "viper-moon-base",
    title: "VIPER",
    subtitle: "Volatiles rover delivery",
    programIds: ["moon-base", "clps", "surface-systems"],
    phaseId: "phase-one",
    status: "planned",
    dateLabel: "Late 2027",
    datePrecision: "half",
    classificationLabel: "Key Mission",
    summary: "NASA's VIPER rover is planned for delivery to the lunar surface to search for water ice and other volatiles near the Moon's South Pole.",
    objectives: [
      "Map water ice and other volatile resources",
      "Use a one-meter drill to analyze lunar soil",
      "Inform long-term Moon Base resource strategy"
    ],
    equipmentIds: ["viper", "blue-moon"],
    landingRegion: "Lunar South Pole region",
    heroImageUrl: moonBaseHeroImages.viper,
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "pressurized-rover-phase-two",
    title: "Pressurized Rover",
    subtitle: "JAXA mobile habitat rover",
    programIds: ["moon-base", "surface-systems"],
    phaseId: "phase-two",
    status: "planned",
    dateLabel: "2029-2032",
    datePrecision: "range",
    classificationLabel: "Key Surface Asset",
    summary: "JAXA's pressurized rover is expected to give astronauts a mobile habitat and laboratory for longer traverses across the lunar South Pole region.",
    objectives: [
      "Support two astronauts in a shirt-sleeve environment",
      "Enable traverses lasting up to 30 days",
      "Extend science operations beyond fixed landing sites"
    ],
    equipmentIds: ["pressurized-rover"],
    heroImageUrl: moonBaseHeroImages.pressurizedRover,
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "site-logistics-rovers-phase-two",
    title: "Site Preparation and Logistics Rovers",
    subtitle: "Phase Two robotic surface logistics",
    programIds: ["moon-base", "surface-systems"],
    phaseId: "phase-two",
    status: "planned",
    dateLabel: "2029-2032",
    datePrecision: "range",
    classificationLabel: "Key Surface Assets",
    summary: "NASA plans to deploy site preparation and logistics rovers for regolith handling, soil compaction, cargo transport, and early surface logistics.",
    objectives: [
      "Prepare and maintain surface work sites",
      "Move cargo and logistics across the base area",
      "Support excavation, compaction, and transport operations"
    ],
    equipmentIds: ["site-logistics-rovers"],
    heroImageUrl: moonBaseHeroImages.logisticsRovers,
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "nuclear-surface-power-demo",
    title: "Nuclear Surface Power Capability",
    subtitle: "RTG and power process demo",
    programIds: ["moon-base", "surface-systems"],
    phaseId: "phase-two",
    status: "planned",
    dateLabel: "2029-2032",
    datePrecision: "range",
    classificationLabel: "Key Demonstration",
    summary: "Phase Two includes nuclear surface power demonstrations using radioisotope power systems to inform future large-scale lunar power systems.",
    objectives: [
      "Demonstrate radioisotope power systems",
      "Support night survival and shadowed-region operations",
      "Mature processes for future large-scale nuclear power"
    ],
    equipmentIds: ["nuclear-surface-power", "lunar-surface-power"],
    heroImageUrl: moonBaseHeroImages.nuclearSurfacePower,
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "solar-power-augmentation",
    title: "Solar Power Augmentation",
    subtitle: "Surface energy storage and distribution",
    programIds: ["moon-base", "surface-systems"],
    phaseId: "phase-two",
    status: "planned",
    dateLabel: "2029-2032",
    datePrecision: "range",
    classificationLabel: "Key Demonstration",
    summary: "NASA plans to test solar array deployment, battery technologies, and surface power distribution for more capable lunar power infrastructure.",
    objectives: [
      "Demonstrate deployable solar arrays",
      "Test batteries and surface power hubs",
      "Inform high-capacity power generation and storage"
    ],
    equipmentIds: ["solar-power-augmentation", "lunar-surface-power"],
    heroImageUrl: moonBaseHeroImages.solarPower,
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "surface-communications-systems",
    title: "Surface Communications Systems",
    subtitle: "Lunar surface network expansion",
    programIds: ["moon-base", "surface-systems"],
    phaseId: "phase-two",
    status: "planned",
    dateLabel: "2029-2032",
    datePrecision: "range",
    classificationLabel: "Key Infrastructure",
    summary: "NASA plans to demonstrate dedicated surface-to-orbit communications stations and local surface communications nodes.",
    objectives: [
      "Increase surface data throughput",
      "Provide local communications coverage",
      "Create a more resilient lunar communications architecture"
    ],
    equipmentIds: ["surface-communications"],
    heroImageUrl: moonBaseHeroImages.surfaceCommunications,
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "lunar-habitats-phase-three",
    title: "Habitats",
    subtitle: "Sustained surface habitation",
    programIds: ["moon-base", "surface-systems"],
    phaseId: "phase-three",
    status: "planned",
    dateLabel: "2032+",
    datePrecision: "range",
    classificationLabel: "Key Infrastructure",
    summary: "NASA plans to expand from early short-duration habitation toward larger modules with improved life support, airlocks, and aggregation nodes.",
    objectives: [
      "Expand crew living and operations volume",
      "Add airlocks and interconnected habitat nodes",
      "Support longer-duration human surface presence"
    ],
    equipmentIds: ["surface-habitat"],
    heroImageUrl: moonBaseHeroImages.habitats,
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "isru-capability",
    title: "In-situ Resource Utilization",
    subtitle: "Lunar resource processing",
    programIds: ["moon-base", "surface-systems"],
    phaseId: "phase-three",
    status: "planned",
    dateLabel: "2032+",
    datePrecision: "range",
    classificationLabel: "Key Capability",
    summary: "NASA plans to mature ISRU systems that can use lunar resources and reduce the cost and risk of long-duration surface operations.",
    objectives: [
      "Extract oxygen, water, and hydrogen from lunar material",
      "Explore construction with regolith processing",
      "Reduce launch mass for sustained lunar operations"
    ],
    equipmentIds: ["isru-demo"],
    heroImageUrl: moonBaseHeroImages.isru,
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "uncrewed-cargo-return",
    title: "Uncrewed Cargo Return",
    subtitle: "Sample and payload return capability",
    programIds: ["moon-base", "surface-systems"],
    phaseId: "phase-three",
    status: "planned",
    dateLabel: "2032+",
    datePrecision: "range",
    classificationLabel: "Key Capability",
    summary: "NASA plans to implement cargo return capabilities from the lunar surface to Earth for science samples, research payloads, and critical hardware.",
    objectives: [
      "Return up to 500 kilograms of material",
      "Move science samples and payloads back to Earth",
      "Support evaluation of lunar surface hardware"
    ],
    equipmentIds: ["cargo-return-system"],
    heroImageUrl: moonBaseHeroImages.cargoReturn,
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "lunar-logistics-network",
    title: "Logistics",
    subtitle: "Sustained Moon Base supply network",
    programIds: ["moon-base", "surface-systems"],
    phaseId: "phase-three",
    status: "planned",
    dateLabel: "2032+",
    datePrecision: "range",
    classificationLabel: "Key Capability",
    summary: "NASA plans to expand end-to-end logistics so habitats, power systems, science sites, and crews can be sustained year-round.",
    objectives: [
      "Increase delivered logistics capacity",
      "Support crews, habitats, and surface systems",
      "Enable sustained lunar base operations"
    ],
    equipmentIds: ["lunar-logistics-network", "site-logistics-rovers"],
    heroImageUrl: moonBaseHeroImages.logistics,
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "phase-two-sustained-stays",
    title: "Phase Two: Sustained Stays",
    subtitle: "Moon Base roadmap",
    programIds: ["moon-base", "surface-systems", "gateway"],
    phaseId: "phase-two",
    status: "planned",
    dateLabel: "2029-2032",
    datePrecision: "range",
    summary: "Shifts the lunar campaign toward longer operations with pressurized mobility, more robust logistics, and surface habitation.",
    objectives: ["Enable longer crew stays", "Expand mobility radius", "Increase cargo and science cadence"],
    equipmentIds: ["pressurized-rover", "surface-habitat", "lunar-surface-power", "gateway"],
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "phase-three-lunar-base",
    title: "Phase Three: Sustained Lunar Base",
    subtitle: "Moon Base roadmap",
    programIds: ["moon-base", "surface-systems"],
    phaseId: "phase-three",
    status: "planned",
    dateLabel: "2032-beyond",
    datePrecision: "range",
    summary: "A longer-term phase for a more permanent lunar presence, resource demonstrations, and Mars-forward operations.",
    objectives: ["Operate persistent infrastructure", "Mature resource utilization", "Support deep-space mission prep"],
    equipmentIds: ["surface-habitat", "isru-demo", "pressurized-rover", "lunar-surface-power"],
    sourceUrls: [sourceLinks.moonBasePhases]
  }
];

export const missionEvents: MissionEvent[] = [
  {
    id: "phase-one-begins",
    missionId: "moon-base-phase-one",
    title: "Phase One operating window",
    dateLabel: "Now-2029",
    datePrecision: "range",
    status: "active",
    summary: "Current Moon Base phase covering early deliveries, demonstrations, and crewed lunar architecture.",
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "moon-base-i-landing",
    missionId: "moon-base-i",
    title: "Moon Base I landing demonstration",
    dateLabel: "2028",
    datePrecision: "year",
    status: "in-development",
    summary: "Blue Moon Mark 1 / Endurance lands near Shackleton Connecting Ridge with NASA science and technology payloads.",
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "moon-base-ii-landing",
    missionId: "moon-base-ii",
    title: "Griffin-1 South Pole landing",
    dateLabel: "Now-2029",
    datePrecision: "range",
    status: "planned",
    summary: "Astrobotic Griffin-1 targets Nobile Crater with NASA, ESA, Astrolab, and commercial payloads.",
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "moon-base-iii-landing",
    missionId: "moon-base-iii",
    title: "IM-3 / Nova-C Reiner Gamma delivery",
    dateLabel: "Now-2029",
    datePrecision: "range",
    status: "planned",
    summary: "Intuitive Machines' Nova-C lander Trinity delivers Lunar Vertex and international payloads to Reiner Gamma.",
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "moonfall-drones-launch",
    missionId: "moonfall-drones",
    title: "MoonFall drone launch target",
    dateLabel: "2028",
    datePrecision: "year",
    status: "in-development",
    summary: "Four MoonFall drones launch together and deploy during descent to scout difficult South Pole terrain.",
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "ltv-phase-one-deployment",
    missionId: "lunar-terrain-vehicles-phase-one",
    title: "Initial LTV deployments",
    dateLabel: "2028",
    datePrecision: "year",
    status: "in-development",
    summary: "NASA expects early LTV systems to be delivered to the lunar surface through CLPS task orders.",
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "rhu-phase-one-demo",
    missionId: "radioisotope-heating-units",
    title: "Radioisotope heating unit demo window",
    dateLabel: "Now-2029",
    datePrecision: "range",
    status: "planned",
    summary: "Thermal survival demonstrations support future cold-region and lunar night surface operations.",
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "relay-satellites-phase-one",
    missionId: "lunar-relay-observation-satellites",
    title: "Initial orbital relay assets",
    dateLabel: "Now-2029",
    datePrecision: "range",
    status: "planned",
    summary: "Orbital communications and observation assets support growing lunar surface operations and LunaNet interoperability.",
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "viper-delivery",
    missionId: "viper-moon-base",
    title: "VIPER delivery to lunar surface",
    dateLabel: "Late 2027",
    datePrecision: "half",
    status: "planned",
    summary: "VIPER is scheduled for delivery to the lunar surface in late 2027 through CLPS aboard Blue Moon MK1.",
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "pressurized-rover-phase-two-window",
    missionId: "pressurized-rover-phase-two",
    title: "Pressurized rover deployment window",
    startsAt: "2029-01-01T00:00:00Z",
    dateLabel: "2029-2032",
    datePrecision: "range",
    status: "planned",
    summary: "JAXA's pressurized rover is expected during Phase Two to extend human surface traverse capability.",
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "site-logistics-rovers-window",
    missionId: "site-logistics-rovers-phase-two",
    title: "Site and logistics rover deployment window",
    startsAt: "2029-01-01T00:00:00Z",
    dateLabel: "2029-2032",
    datePrecision: "range",
    status: "planned",
    summary: "Robotic mobility systems support site preparation, regolith handling, and early surface logistics.",
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "nuclear-power-phase-two-window",
    missionId: "nuclear-surface-power-demo",
    title: "Nuclear surface power demo window",
    startsAt: "2029-01-01T00:00:00Z",
    dateLabel: "2029-2032",
    datePrecision: "range",
    status: "planned",
    summary: "Radioisotope power demonstrations help mature future large-scale lunar power systems.",
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "solar-power-phase-two-window",
    missionId: "solar-power-augmentation",
    title: "Solar power augmentation demo window",
    startsAt: "2029-01-01T00:00:00Z",
    dateLabel: "2029-2032",
    datePrecision: "range",
    status: "planned",
    summary: "Solar array, battery, and power distribution demos prepare for larger permanent infrastructure.",
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "surface-comms-phase-two-window",
    missionId: "surface-communications-systems",
    title: "Surface communications expansion window",
    startsAt: "2029-01-01T00:00:00Z",
    dateLabel: "2029-2032",
    datePrecision: "range",
    status: "planned",
    summary: "Surface-to-orbit stations and local nodes provide greater connectivity across the South Pole region.",
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "habitats-phase-three-window",
    missionId: "lunar-habitats-phase-three",
    title: "Expanded habitat infrastructure window",
    startsAt: "2032-01-01T00:00:00Z",
    dateLabel: "2032+",
    datePrecision: "range",
    status: "planned",
    summary: "Larger habitats, airlocks, and aggregation nodes support sustained human surface operations.",
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "isru-phase-three-window",
    missionId: "isru-capability",
    title: "ISRU sustained capability window",
    startsAt: "2032-01-01T00:00:00Z",
    dateLabel: "2032+",
    datePrecision: "range",
    status: "planned",
    summary: "Resource processing efforts mature toward sustained use of lunar oxygen, water, hydrogen, and regolith.",
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "cargo-return-phase-three-window",
    missionId: "uncrewed-cargo-return",
    title: "Uncrewed cargo return capability window",
    startsAt: "2032-01-01T00:00:00Z",
    dateLabel: "2032+",
    datePrecision: "range",
    status: "planned",
    summary: "Cargo return systems support return of scientific samples, research payloads, and critical hardware.",
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "logistics-phase-three-window",
    missionId: "lunar-logistics-network",
    title: "Sustained logistics expansion window",
    startsAt: "2032-01-01T00:00:00Z",
    dateLabel: "2032+",
    datePrecision: "range",
    status: "planned",
    summary: "End-to-end logistics capacity scales to sustain habitats, power systems, science outposts, and crews.",
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "artemis-ii-schedule-watch",
    missionId: "artemis-ii",
    title: "Artemis II launch tracking",
    dateLabel: "Tracked by LL2",
    datePrecision: "tbd",
    status: "watch",
    summary: "Schedule should be refreshed from Launch Library 2 and official NASA updates.",
    sourceUrls: [sourceLinks.artemis, sourceLinks.launchLibrary],
    externalSourceId: "launch-library-2"
  },
  {
    id: "artemis-iii-landing-campaign",
    missionId: "artemis-iii",
    title: "Crewed landing campaign",
    dateLabel: "2027 planning baseline",
    datePrecision: "year",
    status: "in-development",
    summary: "Major crewed landing milestone connected to HLS demonstration and spacesuit readiness.",
    sourceUrls: [sourceLinks.artemis]
  },
  {
    id: "starship-hls-demo-event",
    missionId: "starship-hls-demo",
    title: "HLS demo schedule watch",
    dateLabel: "2027 watch",
    datePrecision: "year",
    status: "watch",
    summary: "Dynamic date should be resolved from Launch Library 2 when a public event or launch record is available.",
    sourceUrls: [sourceLinks.launchLibrary]
  },
  {
    id: "gateway-initial-elements",
    missionId: "gateway-ppe-halo",
    title: "Initial Gateway element launch",
    dateLabel: "Late 2020s",
    datePrecision: "range",
    status: "in-development",
    summary: "PPE and HALO establish Gateway's first lunar-orbit configuration.",
    sourceUrls: [sourceLinks.artemis, sourceLinks.launchLibrary]
  },
  {
    id: "artemis-iv-window",
    missionId: "artemis-iv",
    title: "Artemis IV planning window",
    dateLabel: "Early 2028",
    datePrecision: "half",
    status: "planned",
    summary: "Gateway assembly and crewed lunar campaign milestone.",
    sourceUrls: [sourceLinks.artemis]
  },
  {
    id: "artemis-v-window",
    missionId: "artemis-v",
    title: "Artemis V planning window",
    dateLabel: "Late 2028",
    datePrecision: "half",
    status: "planned",
    summary: "Surface mobility and expanded exploration milestone.",
    sourceUrls: [sourceLinks.artemis]
  },
  {
    id: "clps-cadence-watch",
    missionId: "clps-cargo-cadence",
    title: "Commercial lunar delivery cadence",
    dateLabel: "Rolling schedule",
    datePrecision: "tbd",
    status: "active",
    summary: "Upcoming CLPS launches and landings should be refreshed from Launch Library 2.",
    sourceUrls: [sourceLinks.moonBaseSystems, sourceLinks.launchLibrary]
  },
  {
    id: "phase-two-start",
    missionId: "phase-two-sustained-stays",
    title: "Phase Two target start",
    startsAt: "2029-01-01T00:00:00Z",
    dateLabel: "2029",
    datePrecision: "year",
    status: "planned",
    summary: "Planning transition toward longer surface operations.",
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "phase-three-start",
    missionId: "phase-three-lunar-base",
    title: "Phase Three target start",
    startsAt: "2032-01-01T00:00:00Z",
    dateLabel: "2032+",
    datePrecision: "range",
    status: "planned",
    summary: "Planning transition toward sustained base operations.",
    sourceUrls: [sourceLinks.moonBasePhases]
  }
];

export const equipment: Equipment[] = [
  {
    id: "sls",
    name: "Space Launch System",
    category: "launch",
    owner: "NASA",
    status: "active",
    summary: "NASA super heavy-lift rocket for Orion and large Artemis payloads.",
    specs: [
      { label: "Role", value: "Crew and cargo launch" },
      { label: "Program", value: "Artemis" },
      { label: "Stack", value: "Core stage, boosters, upper stage" }
    ],
    relatedMissionIds: ["artemis-ii", "artemis-iii", "artemis-iv", "artemis-v"],
    imageUrl: equipmentImages.sls,
    imageQuery: "NASA Space Launch System Artemis launch",
    sourceUrls: [sourceLinks.artemis, sourceLinks.nasaImages]
  },
  {
    id: "orion",
    name: "Orion Spacecraft",
    category: "crew",
    owner: "NASA / ESA",
    status: "active",
    summary: "Crew spacecraft for Artemis lunar missions, including launch abort, crew module, and service module systems.",
    specs: [
      { label: "Role", value: "Crew transport" },
      { label: "Crew", value: "Up to 4 astronauts" },
      { label: "Partner", value: "ESA service module" }
    ],
    relatedMissionIds: ["artemis-ii", "artemis-iii", "artemis-iv", "artemis-v"],
    imageUrl: equipmentImages.orion,
    imageQuery: "NASA Orion spacecraft Artemis",
    sourceUrls: [sourceLinks.artemis, sourceLinks.nasaImages]
  },
  {
    id: "starship-hls",
    name: "Starship HLS",
    category: "lander",
    owner: "SpaceX",
    status: "in-development",
    summary: "Human Landing System variant selected for Artemis lunar surface missions.",
    specs: [
      { label: "Role", value: "Crew lunar lander" },
      { label: "Provider", value: "SpaceX" },
      { label: "Dependency", value: "Uncrewed demo before crew use" }
    ],
    relatedMissionIds: ["artemis-iii", "starship-hls-demo"],
    imageUrl: equipmentImages.starshipHls,
    imageQuery: "NASA Starship Human Landing System Artemis",
    sourceUrls: [sourceLinks.artemis, sourceLinks.nasaImages]
  },
  {
    id: "blue-moon",
    name: "Blue Moon MK1 / MK2",
    category: "lander",
    owner: "Blue Origin",
    status: "in-development",
    summary: "Lunar cargo and crew lander family tied to later Artemis and commercial lunar delivery work.",
    specs: [
      { label: "Role", value: "Cargo and crew-class lunar lander" },
      { label: "Provider", value: "Blue Origin" },
      { label: "Program", value: "Artemis / CLPS" }
    ],
    relatedMissionIds: ["artemis-v", "moon-base-i", "viper-moon-base", "lunar-terrain-vehicles-phase-one"],
    imageUrl: equipmentImages.moonBaseI,
    imageQuery: "NASA Blue Moon lunar lander",
    sourceUrls: [sourceLinks.artemis, sourceLinks.nasaImages]
  },
  {
    id: "nova-c",
    name: "Nova-C",
    category: "lander",
    owner: "Intuitive Machines",
    status: "active",
    summary: "Commercial lunar lander class used for CLPS science and technology deliveries.",
    specs: [
      { label: "Role", value: "Commercial payload lander" },
      { label: "Provider", value: "Intuitive Machines" },
      { label: "Program", value: "CLPS" }
    ],
    relatedMissionIds: ["clps-cargo-cadence", "moon-base-phase-one", "moon-base-iii"],
    imageUrl: equipmentImages.moonBaseIII,
    imageQuery: "NASA Intuitive Machines Nova-C lunar lander",
    sourceUrls: [sourceLinks.moonBaseSystems, sourceLinks.launchLibrary]
  },
  {
    id: "griffin",
    name: "Griffin Lander",
    category: "lander",
    owner: "Astrobotic",
    status: "watch",
    summary: "Commercial lunar lander planned for larger CLPS payload deliveries.",
    specs: [
      { label: "Role", value: "Commercial lunar cargo" },
      { label: "Provider", value: "Astrobotic" },
      { label: "Program", value: "CLPS" }
    ],
    relatedMissionIds: ["clps-cargo-cadence", "moon-base-phase-one", "moon-base-ii"],
    imageUrl: equipmentImages.moonBaseII,
    imageQuery: "NASA Astrobotic Griffin lunar lander",
    sourceUrls: [sourceLinks.moonBaseSystems, sourceLinks.launchLibrary]
  },
  {
    id: "viper",
    name: "VIPER Rover",
    category: "rover",
    owner: "NASA",
    status: "watch",
    summary: "Volatiles-investigating rover concept associated with lunar south pole ice resource science.",
    specs: [
      { label: "Role", value: "Polar volatiles prospecting" },
      { label: "Target", value: "Lunar south pole" },
      { label: "Tracking", value: "Keep as schedule/status watch item" }
    ],
    relatedMissionIds: ["moon-base-phase-one", "viper-moon-base"],
    imageUrl: equipmentImages.viper,
    imageQuery: "NASA VIPER rover lunar south pole",
    sourceUrls: [sourceLinks.moonBaseSystems, sourceLinks.nasaImages]
  },
  {
    id: "ltv",
    name: "Lunar Terrain Vehicle",
    category: "rover",
    owner: "NASA / Commercial providers",
    status: "in-development",
    summary: "Unpressurized rover capability for crewed Artemis surface exploration.",
    specs: [
      { label: "Role", value: "Crew surface mobility" },
      { label: "Mode", value: "Crewed and remotely operated" },
      { label: "Program", value: "Artemis surface systems" }
    ],
    relatedMissionIds: ["artemis-v", "moon-base-phase-one", "lunar-terrain-vehicles-phase-one"],
    imageUrl: equipmentImages.lunarTerrainVehicles,
    imageQuery: "NASA Lunar Terrain Vehicle Artemis",
    sourceUrls: [sourceLinks.moonBaseSystems, sourceLinks.nasaImages]
  },
  {
    id: "pressurized-rover",
    name: "Pressurized Rover",
    category: "rover",
    owner: "NASA / JAXA",
    status: "planned",
    summary: "Long-range pressurized mobility concept for multi-day lunar traverses.",
    specs: [
      { label: "Role", value: "Extended crew mobility" },
      { label: "Partner", value: "JAXA" },
      { label: "Phase", value: "Phase Two" }
    ],
    relatedMissionIds: ["phase-two-sustained-stays", "phase-three-lunar-base", "pressurized-rover-phase-two"],
    imageUrl: equipmentImages.pressurizedRover,
    imageQuery: "NASA JAXA pressurized lunar rover",
    sourceUrls: [sourceLinks.moonBaseSystems, sourceLinks.nasaImages]
  },
  {
    id: "gateway",
    name: "Gateway",
    category: "station",
    owner: "NASA / International partners",
    status: "in-development",
    summary: "Lunar orbit station for staging, science, logistics, and communications.",
    specs: [
      { label: "Orbit", value: "Near-rectilinear halo orbit" },
      { label: "Role", value: "Lunar staging and science" },
      { label: "Elements", value: "PPE, HALO, I-HAB, logistics" }
    ],
    relatedMissionIds: ["gateway-ppe-halo", "artemis-iv", "phase-two-sustained-stays"],
    imageUrl: equipmentImages.gateway,
    imageQuery: "NASA Gateway lunar orbit station",
    sourceUrls: [sourceLinks.artemis, sourceLinks.nasaImages]
  },
  {
    id: "lunar-surface-power",
    name: "Surface Power Systems",
    category: "power",
    owner: "NASA / Partners",
    status: "in-development",
    summary: "Solar, storage, and nuclear fission power concepts for resilient lunar surface operations.",
    specs: [
      { label: "Role", value: "Power generation and storage" },
      { label: "Challenge", value: "Long lunar night" },
      { label: "Phase", value: "Phase One onward" }
    ],
    relatedMissionIds: [
      "moon-base-phase-one",
      "phase-two-sustained-stays",
      "phase-three-lunar-base",
      "nuclear-surface-power-demo",
      "solar-power-augmentation"
    ],
    imageUrl: equipmentImages.surfacePower,
    imageQuery: "NASA lunar surface power Artemis",
    sourceUrls: [sourceLinks.moonBaseSystems, sourceLinks.nasaImages]
  },
  {
    id: "surface-habitat",
    name: "Surface Habitat",
    category: "habitat",
    owner: "NASA / Partners",
    status: "planned",
    summary: "Habitation systems for longer lunar surface stays and future sustained base operations.",
    specs: [
      { label: "Role", value: "Crew living and operations" },
      { label: "Phase", value: "Phase Two onward" },
      { label: "Focus", value: "Longer duration surface presence" }
    ],
    relatedMissionIds: ["phase-two-sustained-stays", "phase-three-lunar-base", "lunar-habitats-phase-three"],
    imageUrl: equipmentImages.habitats,
    imageQuery: "NASA Artemis lunar surface habitat",
    sourceUrls: [sourceLinks.moonBaseSystems, sourceLinks.nasaImages]
  },
  {
    id: "moonfall-drones",
    name: "MoonFall Drones",
    category: "science",
    owner: "NASA",
    status: "in-development",
    summary: "Small autonomous lunar drones planned to scout steep and shadowed South Pole terrain for Moon Base site knowledge.",
    specs: [
      { label: "Role", value: "Terrain scouting" },
      { label: "Quantity", value: "Four drones" },
      { label: "Phase", value: "Phase One" }
    ],
    relatedMissionIds: ["moonfall-drones"],
    imageUrl: equipmentImages.moonfallDrones,
    imageQuery: "NASA lunar hopper drone Moon South Pole",
    sourceUrls: [sourceLinks.moonBasePhases, sourceLinks.nasaImages]
  },
  {
    id: "radioisotope-heating-units",
    name: "Radioisotope Heating Units",
    category: "power",
    owner: "NASA",
    status: "planned",
    summary: "Thermal survival units that use radioisotope heat to keep lunar instruments and systems warm in extreme cold.",
    specs: [
      { label: "Role", value: "Thermal survival" },
      { label: "Use case", value: "Lunar night and shadowed regions" },
      { label: "Phase", value: "Phase One" }
    ],
    relatedMissionIds: ["radioisotope-heating-units"],
    imageUrl: equipmentImages.radioisotopeHeatingUnits,
    imageQuery: "NASA radioisotope heater unit lunar surface",
    sourceUrls: [sourceLinks.moonBasePhases, sourceLinks.nasaImages]
  },
  {
    id: "lunar-relay-satellites",
    name: "Relay and Observation Satellites",
    category: "communications",
    owner: "NASA / Partners",
    status: "planned",
    summary: "Orbital communications and observation assets for lunar relay, positioning, navigation, and surface support.",
    specs: [
      { label: "Role", value: "Relay and observation" },
      { label: "Network", value: "LunaNet-compatible services" },
      { label: "Phase", value: "Phase One" }
    ],
    relatedMissionIds: ["lunar-relay-observation-satellites"],
    imageUrl: equipmentImages.lunarRelaySatellites,
    imageQuery: "NASA lunar relay satellite LunaNet",
    sourceUrls: [sourceLinks.moonBasePhases, sourceLinks.nasaImages]
  },
  {
    id: "site-logistics-rovers",
    name: "Site Logistics Rovers",
    category: "rover",
    owner: "NASA / Commercial providers",
    status: "planned",
    summary: "Robotic rovers for site preparation, regolith handling, cargo movement, and surface logistics.",
    specs: [
      { label: "Role", value: "Site preparation and cargo mobility" },
      { label: "Operations", value: "Excavation, compaction, transport" },
      { label: "Phase", value: "Phase Two" }
    ],
    relatedMissionIds: ["moon-base-ii", "site-logistics-rovers-phase-two", "lunar-logistics-network"],
    imageUrl: equipmentImages.logisticsRovers,
    imageQuery: "NASA lunar logistics rover regolith excavation",
    sourceUrls: [sourceLinks.moonBasePhases, sourceLinks.nasaImages]
  },
  {
    id: "nuclear-surface-power",
    name: "Nuclear Surface Power",
    category: "power",
    owner: "NASA / DOE",
    status: "planned",
    summary: "Radioisotope and future nuclear power demonstrations for resilient lunar surface energy.",
    specs: [
      { label: "Role", value: "Night and shadowed-region power" },
      { label: "Capability", value: "Radioisotope power demonstration" },
      { label: "Phase", value: "Phase Two" }
    ],
    relatedMissionIds: ["nuclear-surface-power-demo"],
    imageUrl: equipmentImages.nuclearSurfacePower,
    imageQuery: "NASA lunar nuclear surface power",
    sourceUrls: [sourceLinks.moonBasePhases, sourceLinks.nasaImages]
  },
  {
    id: "solar-power-augmentation",
    name: "Solar Power Augmentation",
    category: "power",
    owner: "NASA / Partners",
    status: "planned",
    summary: "Deployable solar arrays, batteries, and power distribution demonstrations for larger lunar surface infrastructure.",
    specs: [
      { label: "Role", value: "Power generation and storage" },
      { label: "Systems", value: "Solar arrays, batteries, hubs" },
      { label: "Phase", value: "Phase Two" }
    ],
    relatedMissionIds: ["solar-power-augmentation"],
    imageUrl: equipmentImages.solarPower,
    imageQuery: "NASA lunar surface solar array battery power hub",
    sourceUrls: [sourceLinks.moonBasePhases, sourceLinks.nasaImages]
  },
  {
    id: "surface-communications",
    name: "Surface Communications Systems",
    category: "communications",
    owner: "NASA / Partners",
    status: "planned",
    summary: "Dedicated surface-to-orbit stations and local surface communication nodes for a larger Moon Base network.",
    specs: [
      { label: "Role", value: "Surface networking" },
      { label: "Architecture", value: "Surface-to-orbit and local nodes" },
      { label: "Phase", value: "Phase Two" }
    ],
    relatedMissionIds: ["surface-communications-systems"],
    imageUrl: equipmentImages.surfaceCommunications,
    imageQuery: "NASA lunar surface communications station LunaNet",
    sourceUrls: [sourceLinks.moonBasePhases, sourceLinks.nasaImages]
  },
  {
    id: "isru-demo",
    name: "ISRU Systems",
    category: "science",
    owner: "NASA / Partners",
    status: "planned",
    summary: "In-situ resource utilization systems for extracting oxygen, water, and hydrogen and processing lunar regolith.",
    specs: [
      { label: "Role", value: "Resource extraction and processing" },
      { label: "Materials", value: "Oxygen, water, hydrogen, regolith" },
      { label: "Phase", value: "Phase Three" }
    ],
    relatedMissionIds: ["isru-capability", "phase-three-lunar-base"],
    imageUrl: equipmentImages.isru,
    imageQuery: "NASA lunar ISRU oxygen water regolith processing",
    sourceUrls: [sourceLinks.moonBasePhases, sourceLinks.nasaImages]
  },
  {
    id: "cargo-return-system",
    name: "Cargo Return System",
    category: "science",
    owner: "NASA / Commercial providers",
    status: "planned",
    summary: "Uncrewed return capability for lunar samples, research payloads, and hardware from the surface back to Earth.",
    specs: [
      { label: "Role", value: "Surface-to-Earth cargo return" },
      { label: "Capacity", value: "Up to 500 kg target class" },
      { label: "Phase", value: "Phase Three" }
    ],
    relatedMissionIds: ["uncrewed-cargo-return"],
    imageUrl: equipmentImages.cargoReturn,
    imageQuery: "NASA lunar cargo return vehicle sample return",
    sourceUrls: [sourceLinks.moonBasePhases, sourceLinks.nasaImages]
  },
  {
    id: "lunar-logistics-network",
    name: "Lunar Logistics Network",
    category: "science",
    owner: "NASA / Partners",
    status: "planned",
    summary: "Sustained delivery, storage, movement, and return logistics for a continuously operating lunar base.",
    specs: [
      { label: "Role", value: "Sustained surface logistics" },
      { label: "Scope", value: "Delivery, storage, mobility, return" },
      { label: "Phase", value: "Phase Three" }
    ],
    relatedMissionIds: ["lunar-logistics-network"],
    imageUrl: equipmentImages.logistics,
    imageQuery: "NASA lunar base logistics cargo delivery",
    sourceUrls: [sourceLinks.moonBasePhases, sourceLinks.nasaImages]
  },
  {
    id: "xemu-suits",
    name: "Artemis Spacesuits",
    category: "crew",
    owner: "NASA / Axiom Space",
    status: "in-development",
    summary: "Next-generation lunar surface suits for Artemis crew exploration.",
    specs: [
      { label: "Role", value: "Crew EVA" },
      { label: "Environment", value: "Lunar south pole" },
      { label: "Program", value: "Artemis" }
    ],
    relatedMissionIds: ["artemis-iii"],
    imageQuery: "NASA Artemis lunar spacesuit Axiom",
    sourceUrls: [sourceLinks.artemis, sourceLinks.nasaImages]
  }
];

export const liveLinks: LiveLink[] = [
  {
    id: "nasa-live",
    title: "NASA Live",
    type: "stream",
    provider: "NASA",
    url: "https://www.nasa.gov/live/",
    status: "active",
    summary: "Official NASA live programming and event coverage.",
    isEmbedSafe: false,
    lastSyncedAt: "2026-05-29T00:00:00Z"
  },
  {
    id: "nasa-events",
    title: "NASA Events",
    type: "schedule",
    provider: "NASA",
    url: "https://www.nasa.gov/events/",
    status: "active",
    summary: "Official NASA event schedule for briefings, launches, and live coverage.",
    isEmbedSafe: false,
    lastSyncedAt: "2026-05-29T00:00:00Z"
  },
  {
    id: "ll2-upcoming",
    title: "Launch Library Countdown",
    type: "launch-countdown",
    provider: "The Space Devs",
    url: "https://ll.thespacedevs.com/docs",
    status: "active",
    summary: "Upcoming launch and event timing source for automated schedule refreshes.",
    isEmbedSafe: false
  },
  {
    id: "arow",
    title: "Artemis Real-time Orbit Website",
    type: "tracking",
    provider: "NASA",
    url: sourceLinks.arow.url,
    status: "watch",
    summary: "Use when NASA enables public Artemis/Orion mission tracking. Do not fake telemetry.",
    isEmbedSafe: true
  },
  {
    id: "dsn-now",
    title: "DSN Now",
    type: "tracking",
    provider: "NASA",
    url: sourceLinks.dsn.url,
    status: "active",
    summary: "Deep Space Network activity view for spacecraft communication context.",
    isEmbedSafe: true
  }
];
