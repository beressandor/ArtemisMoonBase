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
    summary: "Build the first operating layer for lunar exploration with deliveries, demonstrations, and crewed return.",
    focus: ["CLPS deliveries", "Artemis crewed return", "surface power", "communications", "mobility demos"],
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "phase-two",
    programId: "moon-base",
    title: "Phase Two",
    dateLabel: "2029-2032",
    startYear: 2029,
    endYear: 2032,
    summary: "Extend stays and infrastructure with stronger logistics, pressurized mobility, and operational surface systems.",
    focus: ["longer surface stays", "pressurized rover", "habitation", "in-situ science", "cargo cadence"],
    sourceUrls: [sourceLinks.moonBasePhases]
  },
  {
    id: "phase-three",
    programId: "moon-base",
    title: "Phase Three",
    dateLabel: "2032-beyond",
    startYear: 2032,
    summary: "Transition from episodic sorties toward sustained lunar base operations and a broader surface economy.",
    focus: ["sustained presence", "resource utilization", "international logistics", "science outposts", "Mars-forward systems"],
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
    heroImageUrl: "https://images-assets.nasa.gov/image/NHQ202211160008/NHQ202211160008~large.jpg",
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
    imageUrl: "https://images-assets.nasa.gov/image/NHQ202211160008/NHQ202211160008~large.jpg",
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
    relatedMissionIds: ["artemis-v"],
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
    relatedMissionIds: ["clps-cargo-cadence", "moon-base-phase-one"],
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
    relatedMissionIds: ["clps-cargo-cadence", "moon-base-phase-one"],
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
    relatedMissionIds: ["moon-base-phase-one"],
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
    relatedMissionIds: ["artemis-v", "moon-base-phase-one"],
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
    relatedMissionIds: ["phase-two-sustained-stays", "phase-three-lunar-base"],
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
    relatedMissionIds: ["moon-base-phase-one", "phase-two-sustained-stays", "phase-three-lunar-base"],
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
    relatedMissionIds: ["phase-two-sustained-stays", "phase-three-lunar-base"],
    imageQuery: "NASA Artemis lunar surface habitat",
    sourceUrls: [sourceLinks.moonBaseSystems, sourceLinks.nasaImages]
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
