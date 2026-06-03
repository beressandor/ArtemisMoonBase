import type { Rocket } from "@/lib/types";

const nasaSlsSource = {
  label: "NASA Space Launch System",
  url: "https://www.nasa.gov/reference/space-launch-system/",
  confidence: "official" as const
};

const nasaRs25Source = {
  label: "NASA RS-25 Core Stage Engine",
  url: "https://www.nasa.gov/reference/space-launch-system-rs-25-core-stage-engine/",
  confidence: "official" as const
};

const nasaSlsBoosterSource = {
  label: "NASA Worm Added to Moon Rocket Boosters",
  url: "https://www.nasa.gov/image-article/nasa-worm-added-moon-rocket-boosters/",
  confidence: "official" as const
};

const nasaRl10Source = {
  label: "NASA SLS RL10 Engine",
  url: "https://www.nasa.gov/reference/space-launch-system-rl10-engine/",
  confidence: "official" as const
};

const spacexStarshipSource = {
  label: "SpaceX Starship",
  url: "https://www.spacex.com/vehicles/starship/",
  confidence: "official" as const
};

const spacexPayloadGuideSource = {
  label: "SpaceX Starship Payload Guide",
  url: "https://www.spacex.com/media/starship_users_guide_v1.pdf",
  confidence: "official" as const
};

const starshipStackImageSource = {
  label: "NASA Starship HLS Stack Image",
  url: "https://commons.wikimedia.org/wiki/File:Starship_HLS_Stack.png",
  confidence: "official" as const
};

const spacexRaptorSeaVideoSource = {
  label: "SpaceX Raptor CGI",
  url: "https://content.spacex.com/cms-assets/assets/RAPTOR_SEA.mp4",
  confidence: "official" as const
};

const spacexRaptorVacuumVideoSource = {
  label: "SpaceX Raptor Vacuum CGI",
  url: "https://content.spacex.com/cms-assets/assets/RAPTOR_VACUUM.mp4",
  confidence: "official" as const
};

const blueOriginNewGlennSource = {
  label: "Blue Origin New Glenn",
  url: "https://www.blueorigin.com/new-glenn",
  confidence: "official" as const
};

const blueOriginUpgradeSource = {
  label: "Blue Origin New Glenn Update",
  url: "https://www.blueorigin.com/news/new-glenn-upgraded-engines-subcooled-components-drive-enhanced-performance",
  confidence: "official" as const
};

export const rockets: Rocket[] = [
  {
    id: "sls",
    name: "Space Launch System",
    owner: "NASA",
    status: "active",
    summary:
      "NASA's super heavy-lift Artemis rocket for Orion crew missions and large lunar cargo. The current Block 1 vehicle flies with ICPS, while Block 1B adds the Exploration Upper Stage for more ambitious missions.",
    imageUrl: "https://images-assets.nasa.gov/image/KSC-20221116-PH-CLC04_0043/KSC-20221116-PH-CLC04_0043~large.jpg",
    cardImageUrl: "local:sls-rocket-card",
    keyMetrics: [
      { label: "Height", value: { metric: "98 m", imperial: "322 ft" } },
      { label: "Diameter", value: { metric: "8.4 m core", imperial: "27.6 ft core" } },
      { label: "Payload LEO", value: { metric: "95-130 t", imperial: "209k-286k lb" } },
      { label: "Payload To Moon", value: { metric: "27-46 t", imperial: "59k-101k lb" } },
      { label: "Liftoff thrust", value: { metric: "39.1 MN", imperial: "8.8M lbf" } },
      { label: "Booster engines", value: "4 RS-25 + 2 SRBs" }
    ],
    specs: [
      { label: "Program role", value: "Artemis crew launch and deep-space cargo" },
      { label: "Primary configurations", value: "Block 1, Block 1B, Block 2" },
      { label: "Block 1 height", value: { metric: "98 m", imperial: "322 ft" } },
      { label: "Block 1 liftoff thrust", value: { metric: "39.1 MN", imperial: "8.8 million lbf" } },
      { label: "Payload to LEO", value: { metric: "95-130 metric tons depending on configuration", imperial: "209,000-286,000 lb depending on configuration" } },
      { label: "Block 1 lunar payload", value: { metric: "More than 27 metric tons to the Moon", imperial: "More than 59,500 lb to the Moon" } },
      { label: "Block 1B lunar payload", value: { metric: "38 metric tons to deep space with Orion and crew", imperial: "83,800 lb to deep space with Orion and crew" } },
      { label: "Block 2 lunar payload", value: { metric: "Up to 46 metric tons to deep space", imperial: "Up to 101,400 lb to deep space" } },
      { label: "Core stage", value: { metric: "64.6+ m tall, 8.4 m diameter, LOX/LH2 tanks", imperial: "212+ ft tall, 27.6 ft diameter, LOX/LH2 tanks" } },
      { label: "Prime propulsion", value: "Four RS-25 engines plus two five-segment solid rocket boosters" },
      { label: "Upper stage path", value: "ICPS on Block 1, Exploration Upper Stage beginning with Block 1B" }
    ],
    engines: [
      {
        id: "rs-25",
        name: "RS-25",
        role: "Core stage liquid engines",
        count: "4",
        propellant: "Liquid hydrogen / liquid oxygen",
        thrust: { metric: "2,279 kN max each; about 8.9 MN combined", imperial: "512,000 lbf max each; about 2M lbf combined" },
        imageUrl: "https://www.nasa.gov/wp-content/uploads/2021/10/rs-25_engine_call-outs.jpg",
        summary:
          "Shuttle-derived engines upgraded for SLS operating environments, providing the core stage thrust through the climb to orbit.",
        specs: [
          { label: "Manufacturer", value: "L3Harris Technologies / Aerojet Rocketdyne heritage" },
          { label: "Flight role", value: "Main propulsion on every SLS configuration" },
          { label: "Heritage", value: "Space Shuttle Main Engine family, modernized for SLS" }
        ],
        sourceUrls: [nasaRs25Source]
      },
      {
        id: "five-segment-srb",
        name: "Five-segment solid rocket boosters",
        role: "Side boosters",
        count: "2",
        propellant: "Solid propellant",
        thrust: { metric: "16 MN each", imperial: "3.6M lbf each" },
        imageUrl: "https://i.redd.it/6wl7rn406ys91.jpg",
        summary:
          "Two shuttle-derived boosters provide more than 75% of SLS thrust during the first two minutes of flight.",
        specs: [
          { label: "Height", value: { metric: "54 m each", imperial: "177 ft each" } },
          { label: "Diameter", value: { metric: "3.7 m each", imperial: "12 ft each" } },
          { label: "Contractor", value: "Northrop Grumman" }
        ],
        sourceUrls: [nasaSlsBoosterSource]
      },
      {
        id: "sls-rl10",
        name: "RL10 upper-stage engines",
        role: "In-space propulsion",
        count: "1 on ICPS; 4 on EUS",
        propellant: "Liquid hydrogen / liquid oxygen",
        thrust: { metric: "110 kN on ICPS; about 431 kN total on EUS", imperial: "24,750 lbf on ICPS; about 97,000 lbf total on EUS" },
        imageUrl: "https://www.nasa.gov/wp-content/uploads/2026/01/rl10-engine.jpg",
        summary:
          "RL10 engines handle the trans-lunar injection stage work: one RL10 on ICPS for Block 1, and four RL10C-3 engines on the Exploration Upper Stage for Block 1B.",
        specs: [
          { label: "Block 1", value: "Interim Cryogenic Propulsion Stage with one RL10" },
          { label: "Block 1B", value: "Exploration Upper Stage with four RL10C-3 engines" },
          { label: "Role", value: "Send Orion and payloads from Earth orbit toward the Moon" }
        ],
        sourceUrls: [nasaRl10Source]
      }
    ],
    relatedMissionIds: ["artemis-iii", "artemis-iv", "artemis-v"],
    sourceUrls: [nasaSlsSource, nasaRs25Source, nasaSlsBoosterSource, nasaRl10Source]
  },
  {
    id: "starship",
    name: "Starship",
    owner: "SpaceX",
    status: "in-development",
    summary:
      "A fully reusable Super Heavy booster and Starship spacecraft architecture. For Artemis, NASA uses a lunar-optimized Starship HLS derivative for crewed landing demonstrations and surface missions.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Starship_stack_HLS.jpg",
    cardImageUrl: "local:starship-rocket-card",
    keyMetrics: [
      { label: "Height", value: { metric: "123 m", imperial: "403 ft" } },
      { label: "Diameter", value: { metric: "9 m", imperial: "29.5 ft" } },
      { label: "Payload LEO", value: { metric: "Up to 150 t", imperial: "Up to 330k lb" } },
      { label: "Payload To Moon", value: "Not public" },
      { label: "Liftoff thrust", value: { metric: "74.3 MN", imperial: "16.7M lbf" } },
      { label: "Booster engines", value: "33 Raptor" }
    ],
    specs: [
      { label: "Program role", value: "Reusable launch system and Artemis Human Landing System architecture" },
      { label: "Stages", value: "Super Heavy booster and Starship spacecraft" },
      { label: "Vehicle height", value: { metric: "123 m", imperial: "403 ft" } },
      { label: "Diameter", value: { metric: "9 m", imperial: "29.5 ft" } },
      { label: "Reusable payload target", value: { metric: "Up to 150 metric tons", imperial: "Up to 330,000 lb" } },
      { label: "Payload to Moon", value: "Not published as a simple public TLI payload; Artemis HLS performance depends on orbital refueling and mission architecture" },
      { label: "Payload fairing", value: { metric: "9 m outer diameter with an 8 m payload dynamic envelope", imperial: "29.5 ft outer diameter with a 26 ft payload dynamic envelope" } },
      { label: "Propellant", value: "Liquid methane / liquid oxygen" },
      { label: "Booster engines", value: "33 Raptor engines on Super Heavy" },
      { label: "Ship engines", value: "6 Raptor engines on Starship" },
      { label: "Artemis connection", value: "Starship HLS supports NASA lunar landing demonstrations and surface missions" }
    ],
    engines: [
      {
        id: "raptor-super-heavy",
        name: "Raptor",
        role: "Super Heavy booster engines",
        count: "33",
        propellant: "Liquid methane / liquid oxygen",
        thrust: "High-thrust full-flow staged combustion family",
        imageUrl: "local:raptor-sea",
        summary:
          "Raptor engines power the Super Heavy first stage during ascent, with the booster designed for recovery and reuse after stage separation.",
        specs: [
          { label: "Cycle", value: "Full-flow staged combustion" },
          { label: "Fuel", value: "Methane" },
          { label: "Stage", value: "Reusable first stage booster" }
        ],
        sourceUrls: [spacexStarshipSource, spacexRaptorSeaVideoSource]
      },
      {
        id: "raptor-ship",
        name: "Raptor Vacuum / sea-level mix",
        role: "Starship spacecraft engines",
        count: "6",
        propellant: "Liquid methane / liquid oxygen",
        thrust: "Orbital insertion, landing, and mission maneuvers",
        imageUrl: "local:raptor-vacuum",
        summary:
          "The Starship upper stage uses six Raptor engines for ascent continuation, in-space maneuvers, and landing operations in the reusable architecture.",
        specs: [
          { label: "Stage", value: "Starship spacecraft / upper stage" },
          { label: "Payload bay", value: "Large clamshell-style payload section for cargo missions" },
          { label: "Artemis variant", value: "Lunar Starship HLS derivative for NASA landing operations" }
        ],
        sourceUrls: [spacexStarshipSource, spacexPayloadGuideSource, spacexRaptorVacuumVideoSource]
      }
    ],
    relatedMissionIds: ["artemis-iii", "artemis-iv", "artemis-v"],
    sourceUrls: [spacexStarshipSource, spacexPayloadGuideSource, spacexRaptorSeaVideoSource, spacexRaptorVacuumVideoSource, starshipStackImageSource]
  },
  {
    id: "new-glenn",
    name: "New Glenn",
    owner: "Blue Origin",
    status: "active",
    summary:
      "Blue Origin's reusable heavy-lift orbital rocket with a seven-meter fairing, a BE-4-powered first stage, and a hydrogen upper stage. Its roadmap also includes higher-performance New Glenn variants.",
    imageUrl: "https://d1o72l87sylvqg.cloudfront.net/blue-origin/newglenn_giant-among-rockets.jpg",
    cardImageUrl: "local:new-glenn-rocket-card",
    keyMetrics: [
      { label: "Height", value: { metric: "98+ m", imperial: "320+ ft" } },
      { label: "Diameter", value: { metric: "7 m fairing", imperial: "23 ft fairing" } },
      { label: "Payload LEO", value: { metric: "45+ t", imperial: "99k+ lb" } },
      { label: "Payload To Moon", value: "Not public" },
      { label: "Liftoff thrust", value: { metric: "17.3 MN", imperial: "3.9M lbf" } },
      { label: "Booster engines", value: "7 BE-4" }
    ],
    specs: [
      { label: "Program role", value: "Reusable heavy-lift launch vehicle for commercial, civil, national security, and deep-space missions" },
      { label: "Vehicle height", value: { metric: "More than 98 m", imperial: "More than 320 ft" } },
      { label: "Payload fairing", value: { metric: "7 m fairing with twice the volume of smaller 5 m class fairings", imperial: "23 ft fairing with twice the volume of smaller 16 ft class fairings" } },
      { label: "Payload to LEO", value: { metric: "More than 45 metric tons", imperial: "More than 99,000 lb" } },
      { label: "Payload to Moon", value: "Not published as a simple public TLI payload; Blue Moon lunar delivery uses the New Glenn launch architecture" },
      { label: "Payload to GTO", value: { metric: "More than 13 metric tons", imperial: "More than 28,700 lb" } },
      { label: "Baseline variant", value: "7x2: seven BE-4 booster engines and two BE-3U upper-stage engines" },
      { label: "Upper stage", value: "Hydrogen-powered upper stage for high-energy orbit delivery" },
      { label: "Reuse target", value: "Reusable first stage designed for repeated missions" },
      { label: "Upgrade path", value: "Blue Origin announced higher-thrust upgrades and a future 9x4 super-heavy class variant" }
    ],
    engines: [
      {
        id: "be-4",
        name: "BE-4",
        role: "Reusable booster engines",
        count: "7",
        propellant: "Liquefied natural gas / liquid oxygen",
        thrust: { metric: "2,446 kN current baseline; upgrade path to 2,847 kN", imperial: "550,000 lbf current baseline; upgrade path to 640,000 lbf" },
        imageUrl: "https://d1o72l87sylvqg.cloudfront.net/blue-origin/NG_blueorigin-be4-render.jpg",
        summary:
          "Seven BE-4 engines power New Glenn's reusable first stage; Blue Origin is increasing total booster thrust through engine and propellant upgrades.",
        specs: [
          { label: "Stage", value: "Reusable first stage" },
          { label: "Baseline total thrust", value: { metric: "17.3 MN across seven engines", imperial: "3.9 million lbf across seven engines" } },
          { label: "Upgrade total thrust", value: { metric: "20 MN across seven engines", imperial: "4.5 million lbf across seven engines" } }
        ],
        sourceUrls: [blueOriginNewGlennSource, blueOriginUpgradeSource]
      },
      {
        id: "be-3u",
        name: "BE-3U",
        role: "Upper-stage vacuum engines",
        count: "2",
        propellant: "Liquid hydrogen / liquid oxygen",
        thrust: { metric: "1,424 kN original total; upgrade path to 1,779 kN total", imperial: "320,000 lbf original total; upgrade path to 400,000 lbf total" },
        imageUrl: "https://d1o72l87sylvqg.cloudfront.net/blue-origin/NG_blueorigin-be3u-render.jpg",
        summary:
          "Two BE-3U engines power the hydrogen upper stage, optimized for vacuum operation and high-energy orbit insertion.",
        specs: [
          { label: "Stage", value: "Upper stage" },
          { label: "Heritage", value: "Built on BE-3PM flight heritage from New Shepard" },
          { label: "Role", value: "Direct injection to demanding LEO, MEO, GEO, and deep-space trajectories" }
        ],
        sourceUrls: [blueOriginNewGlennSource, blueOriginUpgradeSource]
      }
    ],
    relatedMissionIds: ["artemis-iii", "artemis-iv", "artemis-v"],
    sourceUrls: [blueOriginNewGlennSource, blueOriginUpgradeSource]
  }
];
