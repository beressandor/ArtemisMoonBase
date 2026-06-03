import type {
  Equipment,
  LiveLink,
  Mission,
  MissionEvent,
  NewsItem,
  Phase,
  Program,
  Rocket,
  RocketEngine,
  SourceLink,
  UnitDisplayValue
} from "@/lib/types";
import type { Language } from "@/store/useLanguageStore";

type SpecValue = string | UnitDisplayValue;
type Spec = { label: string; value: SpecValue };
type EquipmentSpec = Equipment["specs"][number];

type MissionText = Partial<Pick<Mission, "title" | "subtitle" | "classificationLabel" | "summary" | "objectives" | "landingRegion">>;
type EventText = Partial<Pick<MissionEvent, "title" | "summary">>;
type PhaseText = Partial<Pick<Phase, "title" | "summary" | "focus">>;
type EquipmentText = Partial<Pick<Equipment, "name" | "summary" | "imageQuery">> & { specs?: EquipmentSpec[] };
type ProgramText = Partial<Pick<Program, "name" | "summary">>;
type LiveText = Partial<Pick<LiveLink, "title" | "provider" | "summary">>;
type NewsText = Partial<Pick<NewsItem, "title" | "summary" | "tags">>;
type EngineText = Partial<Pick<RocketEngine, "name" | "role" | "count" | "propellant" | "thrust" | "summary">> & {
  specs?: Spec[];
};
type RocketText = Partial<Pick<Rocket, "name" | "summary">> & {
  keyMetrics?: Spec[];
  specs?: Spec[];
  engines?: Record<string, EngineText>;
};

const classificationHu: Record<string, string> = {
  "Key Mission": "Kiemelt küldetés",
  "Key Demonstration": "Kiemelt demonstráció",
  "Key Capability": "Kiemelt képesség",
  "Key Infrastructure": "Kiemelt infrastruktúra",
  "Key Orbital Assets": "Kiemelt orbitális eszközök",
  "Key Surface Asset": "Kiemelt felszíni eszköz",
  "Key Surface Assets": "Kiemelt felszíni eszközök"
};

const sourceHu: Record<string, string> = {
  "NASA Moon Base Phases": "NASA Moon Base fázisok",
  "NASA Moon Base Systems": "NASA Moon Base rendszerek",
  "NASA Lunar Terrain Vehicle": "NASA holdjáró jármű",
  "NASA Astrolab CLV-1 Image": "NASA Astrolab CLV-1 kép",
  "NASA Lunar Outpost Pegasus Image": "NASA Lunar Outpost Pegasus kép",
  "NASA AxEMU Spacesuit Image": "NASA AxEMU szkafander kép",
  "NASA Artemis RSS": "NASA Artemis hírcsatorna",
  "NASA Artemis Architecture Update": "NASA Artemis architektúra-frissítés",
  "NASA Artemis II Launch": "NASA Artemis II indítás",
  "NASA Artemis II Return": "NASA Artemis II visszatérés",
  "NASA Images": "NASA képtár",
  "Launch Library 2": "Automatikus menetrend",
  "NASA Space Launch System": "NASA Space Launch System",
  "NASA RS-25 Core Stage Engine": "NASA RS-25 központi fokozat hajtómű",
  "NASA Worm Added to Moon Rocket Boosters": "NASA SLS oldalsó boosterek",
  "NASA SLS RL10 Engine": "NASA SLS RL10 hajtómű",
  "SpaceX Raptor CGI": "SpaceX Raptor CGI",
  "SpaceX Raptor Vacuum CGI": "SpaceX Raptor Vacuum CGI",
  "Blue Origin New Glenn Update": "Blue Origin New Glenn frissítés"
};

const programHu: Record<string, ProgramText> = {
  artemis: {
    summary: "Emberes holdkutatási küldetések SLS, Orion, Gateway és Human Landing System rendszerekkel."
  },
  gateway: {
    summary: "Hold körüli platform személyzeti átállásokhoz, tudományos munkához, logisztikához és kommunikációhoz."
  },
  clps: {
    summary: "Kereskedelmi holdi leszállítási szolgáltatások NASA tudományos és technológiai hasznos terhekkel."
  },
  "moon-base": {
    summary: "NASA lépcsőzetes terve a tartós holdfelszíni jelenlét kiépítésére."
  },
  "surface-systems": {
    name: "Felszíni rendszerek",
    summary: "Mobilitási, energia-, kommunikációs, lakó- és tudományos rendszerek a Holdon."
  }
};

const phaseHu: Record<string, PhaseText> = {
  "phase-one": {
    title: "Első fázis: tanulás és korai műveletek",
    summary:
      "Tanulás, tesztelés és építkezés robotikus küldetésekkel, korai felszíni demonstrációkkal és technológiai validációval a holdi Déli-sark közelében.",
    focus: ["Moon Base I-III", "MoonFall drónok", "LTV-k", "VIPER", "energia- és kommunikációs demók"]
  },
  "phase-two": {
    title: "Második fázis: hosszabb tartózkodások",
    summary:
      "A holdi kampány a hosszabb műveletek, a nyomás alatti mobilitás, a robusztusabb logisztika és a felszíni lakóegységek felé mozdul.",
    focus: ["Nyomás alatti rover", "felszíni lakóegységek", "energiaellátás", "kommunikáció", "logisztika"]
  },
  "phase-three": {
    title: "Harmadik fázis: tartós holdbázis",
    summary:
      "Hosszabb távú szakasz egy állandóbb holdi jelenlét, erőforrás-demonstrációk és Mars-előkészítő műveletek felé.",
    focus: ["Tartós infrastruktúra", "ISRU", "teher-visszahozás", "lakóegységek", "éves műveletek"]
  }
};

const missionHu: Record<string, MissionText> = {
  "moon-base-phase-one": {
    title: "Első fázis: tanulás és korai műveletek",
    subtitle: "Moon Base roadmap",
    summary:
      "Korai leszállítások, technológiai demonstrációk, robotikus felderítés és személyzettel végzett holdi architektúra előkészítése a Déli-sark közelében.",
    objectives: [
      "Kereskedelmi landerek és robotikus rendszerek kipróbálása",
      "Déli-sarki helyszínek és erőforrások felderítése",
      "Korai energia-, kommunikációs és mobilitási képességek validálása"
    ]
  },
  "clps-cargo-cadence": {
    title: "CLPS teherleszállítási ütem",
    subtitle: "Kereskedelmi holdi leszállítások",
    summary:
      "A kereskedelmi holdi hasznos teher leszállítások tudományos műszereket, technológiai demókat és felderítési adatokat biztosítanak a későbbi személyzettel végzett műveletekhez.",
    objectives: [
      "NASA hasznos terhek leszállítása",
      "Kereskedelmi leszállítási szolgáltatások demonstrálása",
      "Felszíni körülmények felderítése"
    ]
  },
  "artemis-iii": {
    title: "Artemis III",
    subtitle: "LEO dokkolási demonstráció",
    summary:
      "Integrált műveleti teszt Orionnal és egy vagy több kereskedelmi holdi leszállórendszerrel alacsony Föld körüli pályán, a későbbi felszíni leszállások előtt.",
    objectives: [
      "Orion és kereskedelmi holdi leszállórendszer integrált műveleteinek tesztelése",
      "Randevú- és dokkolási eljárások validálása alacsony Föld körüli pályán",
      "A személyzet, a szkafanderek és a leszállórendszer készenlétének megerősítése"
    ],
    landingRegion: "Alacsony Föld körüli pálya"
  },
  "starship-hls-demo": {
    title: "Starship HLS demonstráció",
    subtitle: "Lander demonstrációs figyelés",
    summary:
      "A Starship HLS nyilvános ütemezését figyeljük. Az időpont akkor frissül, amikor hivatalos esemény- vagy indítási rekord elérhető.",
    objectives: [
      "Követni a SpaceX HLS demonstráció nyilvános menetrendjét",
      "Összekötni a dátumváltozásokat a hivatalos forrásokkal",
      "Elkülöníteni a demonstrációt a személyzettel végzett felszíni küldetésektől"
    ]
  },
  "gateway-ppe-halo": {
    title: "Gateway PPE + HALO",
    subtitle: "Gateway architektúra-figyelés",
    summary:
      "A NASA Gateway oldala továbbra is jövőbeli, legkorábban 2027-es célként listázza a PPE/HALO első elemeket, de a frissített Artemis architektúra rövid távon a felszíni küldetéseket helyezi előtérbe.",
    objectives: [
      "Követni, hogy a NASA megtartja-e a PPE/HALO elemeket az aktív holdi architektúrában",
      "Figyelni az indítási időzítést és a partneri kötelezettségeket",
      "Elkülöníteni a Gateway-t a megerősített Artemis felszíni mérföldkövektől"
    ]
  },
  "artemis-iv": {
    title: "Artemis IV",
    subtitle: "Első Artemis holdfelszíni leszállási cél",
    summary:
      "A NASA 2028 elejét célozza az első Artemis holdi leszállásra a Hold Déli-sarkának közelében, SLS, Orion, szkafanderek és Human Landing System elemek használatával.",
    objectives: [
      "Végrehajtani az első Artemis személyzettel végzett holdfelszíni leszállást",
      "Tesztelni a Déli-sark környezetében végzett EVA-műveleteket",
      "Validálni a felszíni mobilitási, energia- és kommunikációs interfészeket"
    ],
    landingRegion: "Holdi Déli-sark célterületei"
  },
  "artemis-v": {
    title: "Artemis V",
    subtitle: "Következő felszíni küldetés",
    summary:
      "A NASA 2028 vége körülre tervezi ezt a holdfelszíni küldetést a standard SLS konfigurációval és a következő generációs felszíni rendszerekhez kapcsolódó képességekkel.",
    objectives: [
      "Bővíteni a személyzettel végzett holdfelszíni műveleteket",
      "Támogatni a következő lander- és LTV-képességeket",
      "Erősíteni a későbbi Moon Base fázisokhoz szükséges műveleti tapasztalatot"
    ],
    landingRegion: "Holdi Déli-sark régió"
  },
  "moon-base-i": {
    title: "Moon Base I",
    subtitle: "Blue Moon MK1 / Endurance",
    classificationLabel: "Key Mission",
    summary:
      "A Blue Origin Blue Moon Mark 1 / Endurance landere a Shackleton Connecting Ridge közelében demonstrálja a CLPS teherleszállítást és a korai Moon Base hasznos terheket.",
    objectives: [
      "NASA tudományos és technológiai hasznos terhek leszállítása",
      "Nagyobb kereskedelmi holdi leszállítókapacitás demonstrálása",
      "Adatgyűjtés a későbbi személyzettel végzett felszíni műveletekhez"
    ],
    landingRegion: "Shackleton Connecting Ridge közelében"
  },
  "moon-base-ii": {
    title: "Moon Base II",
    subtitle: "Astrobotic Griffin-1",
    classificationLabel: "Key Mission",
    summary:
      "Az Astrobotic Griffin Mission One a Nobile-krátert célozza NASA, ESA, Astrolab és kereskedelmi hasznos terhekkel, hogy demonstrálja a nagyobb kereskedelmi leszállítási és mobilitási képességeket.",
    objectives: [
      "Nobile-kráter célzása a holdi Déli-sark közelében",
      "Astrolab FLIP rover demonstráció leszállítása",
      "NASA, ESA, Astrobotic és kereskedelmi hasznos terhek szállítása"
    ],
    landingRegion: "Nobile-kráter"
  },
  "moon-base-iii": {
    title: "Moon Base III",
    subtitle: "Intuitive Machines IM-3 / Nova-C",
    classificationLabel: "Key Mission",
    summary:
      "Az Intuitive Machines IM-3 küldetése a Trinity Nova-C landerrel NASA Lunar Vertex tudományos és technológiai hasznos terheket juttat a Reiner Gamma térségébe.",
    objectives: [
      "Lunar Vertex tudományos hasznos terhek leszállítása",
      "A Nova-C lander ismételt CLPS-képességének validálása",
      "Nemzetközi partneri hasznos terhek szállítása"
    ],
    landingRegion: "Reiner Gamma"
  },
  "moonfall-drones": {
    title: "MoonFall drónok",
    subtitle: "Déli-sarki terepfelderítés",
    classificationLabel: "Key Mission",
    summary:
      "A NASA négy nagy mobilitású MoonFall drónt tervez bevetni meredek terep és tartósan árnyékos régiók felderítésére a holdi Déli-sark közelében.",
    objectives: [
      "Olyan terep felmérése, amelyhez roverek nehezen férnek hozzá",
      "Önálló működés nagyjából egy holdi nappalon át",
      "Kép- és helyszínadatok gyűjtése későbbi felszíni műveletekhez"
    ],
    landingRegion: "Holdi Déli-sark"
  },
  "lunar-terrain-vehicles-phase-one": {
    title: "Lunar Terrain Vehicles",
    subtitle: "Korai személyzeti mobilitás",
    classificationLabel: "Key Demonstration",
    summary:
      "A NASA az első LTV rendszereket CLPS feladatmegrendeléseken keresztül tervezi a holdfelszínre juttatni, személyzettel és személyzet nélkül végezhető mobilitási műveletekhez.",
    objectives: [
      "Személyzettel és távolról működtetett LTV-rendszerek demonstrálása",
      "Felszíni mobilitás biztosítása korai Artemis műveletekhez",
      "Astrolab és Lunar Outpost mérföldkövek követése"
    ],
    landingRegion: "Holdfelszín"
  },
  "radioisotope-heating-units": {
    title: "Radioizotópos fűtőegységek",
    subtitle: "Hidegtűrő felszíni rendszerek",
    classificationLabel: "Key Capability",
    summary:
      "A radioizotópos hőforrások segítenek életben tartani a műszereket és kisebb rendszereket extrém hidegben, holdi éjszaka és árnyékos régiók esetén.",
    objectives: [
      "Hőt biztosítani tartósan árnyékos és hideg régiókban",
      "Csökkenteni a felszíni rendszerek túlélési kockázatát",
      "Előkészíteni hosszabb autonóm műveleteket"
    ]
  },
  "lunar-relay-observation-satellites": {
    title: "Holdi relé- és megfigyelő műholdak",
    subtitle: "Orbitális támogató eszközök",
    classificationLabel: "Key Orbital Assets",
    summary:
      "A holdi relé- és megfigyelő eszközök kommunikációt, pozicionálást, navigációt és helyzetképet biztosítanak a növekvő felszíni műveletekhez.",
    objectives: [
      "LunaNet-kompatibilis relékapcsolatok támogatása",
      "Felszíni műveletek megfigyelése és adatkapcsolata",
      "A Déli-sark körüli lefedettség javítása"
    ]
  },
  "viper-moon-base": {
    title: "VIPER",
    subtitle: "Illóanyag-kutató rover leszállítása",
    classificationLabel: "Key Mission",
    summary:
      "A NASA VIPER rovere a tervek szerint a holdfelszínre kerül, hogy vízjeget és más illóanyagokat keressen a Hold Déli-sarkának közelében.",
    objectives: [
      "Vízjég és más illóanyagok feltérképezése",
      "A Déli-sark erőforrás-potenciáljának vizsgálata",
      "Hosszú távú Moon Base erőforrás-stratégia támogatása"
    ],
    landingRegion: "Holdi Déli-sark régió"
  },
  "pressurized-rover-phase-two": {
    title: "Nyomás alatti rover",
    subtitle: "Hosszabb felszíni bejárások",
    classificationLabel: "Key Surface Asset",
    summary:
      "A JAXA nyomás alatti rovere a második fázisban növeli a személyzet bejárási távolságát és többnapos holdfelszíni műveleteket tesz lehetővé.",
    objectives: [
      "Többnapos holdfelszíni bejárások támogatása",
      "Növelni az elérhető kutatási sugarat",
      "Biztonságos, nyomás alatti munkakörnyezet biztosítása"
    ]
  },
  "site-logistics-rovers-phase-two": {
    title: "Helyszíni és logisztikai roverek",
    subtitle: "Felszín-előkészítés és tehermozgatás",
    classificationLabel: "Key Surface Assets",
    summary:
      "Robotikus mobilitási rendszerek támogatják a helyszín-előkészítést, a regolitmozgatást és a korai felszíni logisztikát.",
    objectives: [
      "Felszín-előkészítés és regolitkezelés",
      "Tehermozgatás a leszállóhely és a munkaterületek között",
      "A későbbi bázislogisztika demonstrálása"
    ]
  },
  "nuclear-surface-power-demo": {
    title: "Nukleáris felszíni energia",
    subtitle: "Radioizotópos energia-demonstráció",
    classificationLabel: "Key Demonstration",
    summary:
      "A radioizotópos és későbbi nukleáris energiademonstrációk a nagyobb, ellenálló holdi energia-infrastruktúra előkészítését szolgálják.",
    objectives: [
      "Energia biztosítása holdi éjszaka és árnyékos régiók idején",
      "Túlélő és tartós energiaforrások demonstrálása",
      "Későbbi nagyobb felszíni energiaellátás előkészítése"
    ]
  },
  "solar-power-augmentation": {
    title: "Napelemes energia-bővítés",
    subtitle: "Napelemek és energiatárolás",
    classificationLabel: "Key Infrastructure",
    summary:
      "A NASA napelem-telepítést, akkumulátortechnológiákat és felszíni energiaelosztást tervez tesztelni a nagyobb holdi infrastruktúrához.",
    objectives: [
      "Napelemek és akkumulátorok demonstrálása",
      "Felszíni energiaelosztási architektúra kipróbálása",
      "A tartós bázis energiaigényének előkészítése"
    ]
  },
  "surface-communications-systems": {
    title: "Felszíni kommunikációs rendszerek",
    subtitle: "Holdfelszíni hálózat bővítése",
    classificationLabel: "Key Infrastructure",
    summary:
      "A NASA dedikált felszín-pálya kommunikációs állomásokat és helyi felszíni kommunikációs csomópontokat tervez demonstrálni.",
    objectives: [
      "Felszín-pálya kommunikációs állomások demonstrálása",
      "Helyi kommunikációs csomópontok kipróbálása",
      "Nagyobb Déli-sarki lefedettség biztosítása"
    ]
  },
  "lunar-habitats-phase-three": {
    title: "Lakóegységek",
    subtitle: "Tartós felszíni lakhatás",
    classificationLabel: "Key Infrastructure",
    summary:
      "A NASA a rövid idejű korai lakhatástól nagyobb modulok, fejlettebb életfenntartás, légzsilip és aggregációs csomópontok felé tervez továbblépni.",
    objectives: [
      "Nagyobb lakómodulok bevezetése",
      "Életfenntartó és légzsilip-rendszerek fejlesztése",
      "Tartós felszíni jelenlét támogatása"
    ]
  },
  "isru-capability": {
    title: "Helyi erőforrás-hasznosítás",
    subtitle: "Holdi nyersanyag-feldolgozás",
    classificationLabel: "Key Capability",
    summary:
      "Az ISRU rendszerek holdi erőforrásokat használnának fel, csökkentve a hosszú távú felszíni műveletek költségét és kockázatát.",
    objectives: [
      "Oxigén, víz, hidrogén és regolit feldolgozása",
      "Erőforrás-kitermelési folyamatok demonstrálása",
      "Hosszú távú műveletek ellátási kockázatának csökkentése"
    ]
  },
  "uncrewed-cargo-return": {
    title: "Személyzet nélküli teher-visszahozás",
    subtitle: "Minták és hasznos terhek visszajuttatása",
    classificationLabel: "Key Capability",
    summary:
      "Személyzet nélküli visszatérő képesség holdi minták, kutatási hasznos terhek és kritikus hardverek felszínről Földre juttatásához.",
    objectives: [
      "Tudományos minták visszahozása",
      "Kutatási hasznos terhek és hardverek visszajuttatása",
      "Felszín-Föld logisztikai lánc demonstrálása"
    ]
  },
  "lunar-logistics-network": {
    title: "Holdi logisztikai hálózat",
    subtitle: "Tartós Moon Base ellátási hálózat",
    classificationLabel: "Key Infrastructure",
    summary:
      "A NASA végponttól végpontig terjedő logisztikát tervez bővíteni, hogy a lakóegységek, energiaellátás, tudományos helyszínek és személyzet egész évben fenntartható legyen.",
    objectives: [
      "Szállítási, tárolási és mozgatási kapacitás bővítése",
      "Teher-visszahozás és újraellátás támogatása",
      "Tartós bázisműveletek logisztikai alapjainak kiépítése"
    ]
  },
  "phase-two-sustained-stays": {
    title: "Második fázis: hosszabb tartózkodások",
    subtitle: "Moon Base roadmap",
    summary:
      "A holdi kampány a hosszabb műveletek, a nyomás alatti mobilitás, a robusztusabb logisztika és a felszíni lakhatás felé mozdul.",
    objectives: ["Hosszabb személyzeti tartózkodások", "Nagyobb mobilitási sugár", "Több teher- és tudományos művelet"]
  },
  "phase-three-lunar-base": {
    title: "Harmadik fázis: tartós holdbázis",
    subtitle: "Moon Base roadmap",
    summary:
      "Hosszabb távú fázis egy állandóbb holdi jelenlét, erőforrás-demonstrációk és Mars-előkészítő műveletek felé.",
    objectives: ["Tartós infrastruktúra üzemeltetése", "Erőforrás-hasznosítás fejlesztése", "Mélyűri küldetések előkészítése"]
  }
};

const eventHu: Record<string, EventText> = {
  "moon-base-phase-one-window": {
    title: "Első fázis működési ablaka",
    summary: "Aktuális Moon Base fázis korai leszállításokkal, demonstrációkkal és személyzettel végzett holdi architektúrával."
  },
  "moon-base-i-landing": {
    title: "Moon Base I leszállási demonstráció",
    summary: "A Blue Moon Mark 1 / Endurance a Shackleton Connecting Ridge közelében landol NASA tudományos és technológiai hasznos terhekkel."
  },
  "moon-base-ii-landing": {
    title: "Griffin-1 Déli-sarki leszállás",
    summary: "Az Astrobotic Griffin-1 a Nobile-krátert célozza NASA, ESA, Astrolab és kereskedelmi hasznos terhekkel."
  },
  "moon-base-iii-landing": {
    title: "IM-3 / Nova-C Reiner Gamma leszállítás",
    summary: "Az Intuitive Machines Trinity Nova-C landere Lunar Vertex és nemzetközi hasznos terheket juttat a Reiner Gamma térségébe."
  },
  "moonfall-drones-launch": {
    title: "MoonFall drónok indítási célja",
    summary: "Négy MoonFall drón együtt indul és a süllyedés során válik le, hogy nehéz Déli-sarki terepet derítsen fel."
  },
  "ltv-phase-one-deployment": {
    title: "Első LTV telepítések",
    summary: "A NASA korai LTV rendszereket tervez a holdfelszínre juttatni CLPS feladatmegrendeléseken keresztül."
  },
  "radioisotope-heating-demo": {
    title: "Radioizotópos fűtőegység demonstrációs ablak",
    summary: "A hőtúlélési demonstrációk támogatják a jövőbeli hideg régiós és holdi éjszakai felszíni műveleteket."
  },
  "lunar-relay-assets": {
    title: "Kezdeti orbitális relé eszközök",
    summary: "Orbitális kommunikációs és megfigyelő eszközök támogatják a növekvő felszíni műveleteket és a LunaNet interoperabilitást."
  },
  "viper-delivery": {
    title: "VIPER leszállítása a holdfelszínre",
    summary: "A VIPER a tervek szerint 2027 végén jut a holdfelszínre CLPS keretben, Blue Moon MK1 fedélzetén."
  },
  "pressurized-rover-deployment": {
    title: "Nyomás alatti rover telepítési ablak",
    summary: "A JAXA nyomás alatti rovere a második fázisban várható, hogy bővítse az emberi felszíni bejárások képességét."
  },
  "site-logistics-rover-deployment": {
    title: "Helyszíni és logisztikai roverek telepítési ablaka",
    summary: "Robotikus mobilitási rendszerek támogatják a helyszín-előkészítést, a regolitkezelést és a korai felszíni logisztikát."
  },
  "nuclear-surface-power-demo-window": {
    title: "Nukleáris felszíni energia demonstrációs ablak",
    summary: "A radioizotópos energiademonstrációk segítik a későbbi nagy léptékű holdi energiarendszerek fejlesztését."
  },
  "solar-power-augmentation-window": {
    title: "Napelemes energia-bővítés demonstrációs ablaka",
    summary: "Napelem-, akkumulátor- és energiaelosztási demók készítik elő a nagyobb állandó infrastruktúrát."
  },
  "surface-communications-window": {
    title: "Felszíni kommunikáció bővítési ablak",
    summary: "Felszín-pálya állomások és helyi csomópontok biztosítanak nagyobb kapcsolatot a Déli-sark régiójában."
  },
  "expanded-habitat-window": {
    title: "Bővített lakóinfrastruktúra ablaka",
    summary: "Nagyobb lakóegységek, légzsilipek és aggregációs csomópontok támogatják a tartós emberi felszíni műveleteket."
  },
  "isru-capability-window": {
    title: "ISRU tartós képességi ablak",
    summary: "Az erőforrás-feldolgozási erőfeszítések a holdi oxigén, víz, hidrogén és regolit tartós használata felé fejlődnek."
  },
  "uncrewed-cargo-return-window": {
    title: "Személyzet nélküli teher-visszahozási képesség ablaka",
    summary: "A teher-visszahozó rendszerek tudományos minták, kutatási hasznos terhek és kritikus hardverek visszajuttatását támogatják."
  },
  "sustained-logistics-window": {
    title: "Tartós logisztikai bővítési ablak",
    summary: "A teljes logisztikai kapacitás lakóegységek, energiarendszerek, tudományos előőrsök és személyzet fenntartására skálázódik."
  },
  "artemis-ii-launch": {
    title: "Artemis II indítás",
    summary: "Az Artemis II személyzettel végzett holdkerülő tesztrepülésként futott le, és történeti mérföldkő marad az Artemis roadmapen."
  },
  "artemis-iii-leo-demo": {
    title: "LEO randevú- és dokkolási demonstráció",
    summary: "Az Artemis III integrált műveleteket tesztel Orionnal és egy vagy több kereskedelmi holdi landerrel alacsony Föld körüli pályán."
  },
  "starship-hls-demo-watch": {
    title: "HLS demonstrációs menetrend figyelése",
    summary: "A dinamikus dátum akkor véglegesíthető, amikor nyilvános esemény- vagy indítási rekord elérhető."
  },
  "gateway-initial-elements": {
    title: "PPE/HALO indítási státusz figyelése",
    summary: "A NASA Gateway oldala továbbra is jövőbeli indítási célként listázza a PPE/HALO elemeket, miközben a rövid távú Artemis architektúra felszíni küldetésekre finomodott."
  },
  "artemis-iv-lunar-landing": {
    title: "Első Artemis holdfelszíni leszállási cél",
    summary: "A NASA továbbra is 2028 elejét célozza az első Artemis holdi leszállásra a Hold Déli-sarkának közelében."
  },
  "artemis-v-planning-window": {
    title: "Artemis V tervezési ablak",
    summary: "A NASA 2028 végéig várja ennek a holdfelszíni küldetésnek az indítását a standard SLS rakétakonfigurációval."
  },
  "clps-cargo-cadence": {
    title: "Kereskedelmi holdi leszállítási ütem",
    summary: "A közelgő CLPS indításokat és leszállásokat automatikusan kell frissíteni, ahogy az ütemezések változnak."
  },
  "phase-two-start": {
    title: "Második fázis célzott kezdete",
    summary: "Tervezési átmenet a hosszabb felszíni műveletek felé."
  },
  "phase-three-start": {
    title: "Harmadik fázis célzott kezdete",
    summary: "Tervezési átmenet a tartós bázisműveletek felé."
  }
};

const equipmentHu: Record<string, EquipmentText> = {
  sls: {
    summary: "A NASA szupernehéz Artemis rakétája Orion és nagy Artemis hasznos terhek indításához.",
    specs: [
      { label: "Szerep", value: "Személyzet és teher indítása" },
      { label: "Program", value: "Artemis" },
      { label: "Felépítés", value: "Központi fokozat, boosterek, felső fokozat" }
    ]
  },
  orion: {
    name: "Orion űrhajó",
    summary: "Személyzeti űrhajó Artemis holdküldetésekhez, indításmegszakító, személyzeti modul és szervizmodul rendszerekkel.",
    specs: [
      { label: "Szerep", value: "Személyzetszállítás" },
      { label: "Személyzet", value: "Legfeljebb 4 űrhajós" },
      { label: "Partner", value: "ESA szervizmodul" }
    ]
  },
  "starship-hls": {
    summary: "Human Landing System változat Artemis holdfelszíni küldetésekhez.",
    specs: [
      { label: "Szerep", value: "Személyzeti holdi lander" },
      { label: "Szolgáltató", value: "SpaceX" },
      { label: "Függőség", value: "Személyzet nélküli demó a személyzettel végzett használat előtt" }
    ]
  },
  "blue-moon": {
    name: "Blue Moon MK1 / MK2",
    summary: "Holdi teher- és személyzeti landercsalád későbbi Artemis és kereskedelmi holdi leszállítási feladatokhoz.",
    specs: [
      { label: "Szerep", value: "Teher- és személyzeti kategóriájú holdi lander" },
      { label: "Szolgáltató", value: "Blue Origin" },
      { label: "Program", value: "Artemis / CLPS" }
    ]
  },
  "nova-c": {
    summary: "Kereskedelmi holdi lander-osztály CLPS tudományos és technológiai leszállításokhoz.",
    specs: [
      { label: "Szerep", value: "Kereskedelmi hasznos teher lander" },
      { label: "Szolgáltató", value: "Intuitive Machines" },
      { label: "Program", value: "CLPS" }
    ]
  },
  griffin: {
    name: "Griffin lander",
    summary: "Kereskedelmi holdi lander nagyobb CLPS hasznos terhek leszállításához.",
    specs: [
      { label: "Szerep", value: "Kereskedelmi holdi teher" },
      { label: "Szolgáltató", value: "Astrobotic" },
      { label: "Program", value: "CLPS" }
    ]
  },
  viper: {
    name: "VIPER rover",
    summary: "Illóanyagokat vizsgáló rover koncepció a holdi Déli-sark vízjég-erőforrásainak tudományos feltérképezéséhez.",
    specs: [
      { label: "Szerep", value: "Poláris illóanyag-kutatás" },
      { label: "Célterület", value: "Holdi Déli-sark" },
      { label: "Követés", value: "Ütemezési és státuszfigyelő elemként kezelve" }
    ]
  },
  "astrolab-clv-1": {
    summary:
      "Az Astrolab Crewed Lunar Vehicle, a FLEX architektúrából adaptálva, első fázisú LTV űrhajósszállításhoz, utánpótláshoz és távoli műveletekhez.",
    specs: [
      { label: "Díjazás", value: "$219M Phase 1 LTV feladatmegrendelés" },
      { label: "Cél", value: "Holdfelszíni telepítés 2028-ig" },
      { label: "Üzemmód", value: "Személyzettel és távolról működtetve" },
      { label: "Képesség", value: "Kb. 2 000 lb; több mint 6 mph sík terepen" }
    ]
  },
  "lunar-outpost-pegasus": {
    summary:
      "A Lunar Outpost Pegasus az Eagle küldetéskész továbbfejlesztése, a NASA frissített LTV követelményeihez és korai Moon Base mobilitáshoz.",
    specs: [
      { label: "Díjazás", value: "$220M Phase 1 LTV feladatmegrendelés" },
      { label: "Cél", value: "Holdfelszíni telepítés 2028-ig" },
      { label: "Üzemmód", value: "Kézi, autonóm vagy távvezérelt" },
      { label: "Képesség", value: "Akár egy év működés; több mint 9 mph" }
    ]
  },
  "pressurized-rover": {
    name: "Nyomás alatti rover",
    summary: "Nagy hatótávolságú, nyomás alatti mobilitási koncepció többnapos holdi bejárásokhoz.",
    specs: [
      { label: "Szerep", value: "Kiterjesztett személyzeti mobilitás" },
      { label: "Partner", value: "JAXA" },
      { label: "Fázis", value: "Második fázis" }
    ]
  },
  gateway: {
    summary:
      "Hold körüli állomáskoncepció személyzeti átállásokhoz, tudományhoz, logisztikához és kommunikációhoz, jelenleg Artemis architektúra-figyelő elemként kezelve.",
    specs: [
      { label: "Pálya", value: "Közel rektlineáris halo pálya" },
      { label: "Szerep", value: "Holdi átállás és tudomány" },
      { label: "Elemek", value: "PPE, HALO, I-HAB, logisztika" }
    ]
  },
  "lunar-surface-power": {
    name: "Felszíni energiarendszerek",
    summary: "Napelemes, tárolási és nukleáris hasadási energia-koncepciók ellenálló holdfelszíni műveletekhez.",
    specs: [
      { label: "Szerep", value: "Energiatermelés és tárolás" },
      { label: "Kihívás", value: "Hosszú holdi éjszaka" },
      { label: "Fázis", value: "Első fázistól tovább" }
    ]
  },
  "surface-habitat": {
    name: "Felszíni lakóegység",
    summary: "Lakóegység-rendszerek hosszabb holdfelszíni tartózkodásokhoz és későbbi tartós bázisműveletekhez.",
    specs: [
      { label: "Szerep", value: "Személyzeti élet- és munkatér" },
      { label: "Fázis", value: "Második fázistól tovább" },
      { label: "Fókusz", value: "Hosszabb felszíni jelenlét" }
    ]
  },
  "moonfall-drones": {
    name: "MoonFall drónok",
    summary: "Kis autonóm holdi drónok meredek és árnyékos Déli-sarki terep felderítésére, Moon Base helyszínismerethez.",
    specs: [
      { label: "Szerep", value: "Terepfelderítés" },
      { label: "Mennyiség", value: "Négy drón" },
      { label: "Fázis", value: "Első fázis" }
    ]
  },
  "radioisotope-heating-units": {
    name: "Radioizotópos fűtőegységek",
    summary: "Hőtúlélő egységek, amelyek radioizotópos hőt használnak műszerek és rendszerek melegen tartására extrém hidegben.",
    specs: [
      { label: "Szerep", value: "Hőtúlélés" },
      { label: "Felhasználás", value: "Holdi éjszaka és árnyékos régiók" },
      { label: "Fázis", value: "Első fázis" }
    ]
  },
  "lunar-relay-satellites": {
    name: "Relé- és megfigyelő műholdak",
    summary: "Orbitális kommunikációs és megfigyelő eszközök holdi reléhez, pozicionáláshoz, navigációhoz és felszíni támogatáshoz.",
    specs: [
      { label: "Szerep", value: "Relé és megfigyelés" },
      { label: "Hálózat", value: "LunaNet-kompatibilis szolgáltatások" },
      { label: "Fázis", value: "Első fázis" }
    ]
  },
  "site-logistics-rovers": {
    name: "Helyszíni logisztikai roverek",
    summary: "Robotikus roverek helyszín-előkészítéshez, regolitkezeléshez, tehermozgatáshoz és felszíni logisztikához.",
    specs: [
      { label: "Szerep", value: "Helyszín-előkészítés és tehermobilitás" },
      { label: "Műveletek", value: "Kitermelés, tömörítés, szállítás" },
      { label: "Fázis", value: "Második fázis" }
    ]
  },
  "nuclear-surface-power": {
    name: "Nukleáris felszíni energia",
    summary: "Radioizotópos és későbbi nukleáris energiademonstrációk ellenálló holdfelszíni energiaellátáshoz.",
    specs: [
      { label: "Szerep", value: "Energia holdi éjszakához és árnyékos régiókhoz" },
      { label: "Képesség", value: "Radioizotópos energia-demonstráció" },
      { label: "Fázis", value: "Második fázis" }
    ]
  },
  "solar-power-augmentation": {
    name: "Napelemes energia-bővítés",
    summary: "Telepíthető napelemek, akkumulátorok és energiaelosztási demonstrációk nagyobb holdfelszíni infrastruktúrához.",
    specs: [
      { label: "Szerep", value: "Energiatermelés és tárolás" },
      { label: "Rendszerek", value: "Napelemek, akkumulátorok, energiahubok" },
      { label: "Fázis", value: "Második fázis" }
    ]
  },
  "surface-communications": {
    name: "Felszíni kommunikációs rendszerek",
    summary: "Dedikált felszín-pálya állomások és helyi felszíni kommunikációs csomópontok nagyobb Moon Base hálózathoz.",
    specs: [
      { label: "Szerep", value: "Felszíni hálózat" },
      { label: "Architektúra", value: "Felszín-pálya és helyi csomópontok" },
      { label: "Fázis", value: "Második fázis" }
    ]
  },
  "isru-demo": {
    name: "ISRU rendszerek",
    summary: "Helyi erőforrás-hasznosító rendszerek oxigén, víz, hidrogén kinyerésére és holdi regolit feldolgozására.",
    specs: [
      { label: "Szerep", value: "Erőforrás-kitermelés és feldolgozás" },
      { label: "Anyagok", value: "Oxigén, víz, hidrogén, regolit" },
      { label: "Fázis", value: "Harmadik fázis" }
    ]
  },
  "cargo-return-system": {
    name: "Teher-visszahozó rendszer",
    summary: "Személyzet nélküli visszatérő képesség holdi minták, kutatási hasznos terhek és hardverek Földre juttatásához.",
    specs: [
      { label: "Szerep", value: "Felszín-Föld teher-visszahozás" },
      { label: "Kapacitás", value: "Legfeljebb 500 kg célkategória" },
      { label: "Fázis", value: "Harmadik fázis" }
    ]
  },
  "lunar-logistics-network": {
    name: "Holdi logisztikai hálózat",
    summary: "Tartós leszállítás, tárolás, mozgatás és visszahozás egy folyamatosan működő holdbázishoz.",
    specs: [
      { label: "Szerep", value: "Tartós felszíni logisztika" },
      { label: "Hatókör", value: "Szállítás, tárolás, mobilitás, visszahozás" },
      { label: "Fázis", value: "Harmadik fázis" }
    ]
  },
  "xemu-suits": {
    name: "Artemis szkafanderek",
    summary: "Következő generációs holdfelszíni szkafanderek Artemis személyzeti kutatásokhoz.",
    specs: [
      { label: "Szerep", value: "Személyzeti EVA" },
      { label: "Környezet", value: "Holdi Déli-sark" },
      { label: "Program", value: "Artemis" }
    ]
  }
};

const rocketHu: Record<string, RocketText> = {
  sls: {
    summary:
      "A NASA szupernehéz Artemis rakétája Orion személyzeti küldetésekhez és nagy holdi teherindításokhoz. A jelenlegi Block 1 ICPS felső fokozattal repül, a Block 1B pedig Exploration Upper Stage fokozatot kap.",
    keyMetrics: [
      { label: "Magasság", value: { metric: "98 m", imperial: "322 ft" } },
      { label: "Átmérő", value: { metric: "8,4 m központi fokozat", imperial: "27,6 ft központi fokozat" } },
      { label: "LEO hasznos teher", value: { metric: "95-130 t", imperial: "209k-286k lb" } },
      { label: "Hold felé", value: { metric: "27-46 t", imperial: "59k-101k lb" } },
      { label: "Indítási tolóerő", value: { metric: "39,1 MN", imperial: "8,8M lbf" } },
      { label: "Hajtóművek", value: "4 RS-25 + 2 SRB" }
    ],
    specs: [
      { label: "Programszerep", value: "Artemis személyzeti indítás és mélyűri teher" },
      { label: "Fő konfigurációk", value: "Block 1, Block 1B, Block 2" },
      { label: "Block 1 magasság", value: { metric: "98 m", imperial: "322 ft" } },
      { label: "Block 1 indítási tolóerő", value: { metric: "39,1 MN", imperial: "8,8 millió lbf" } },
      { label: "Hasznos teher LEO-ra", value: { metric: "95-130 tonna konfigurációtól függően", imperial: "209 000-286 000 lb konfigurációtól függően" } },
      { label: "Block 1 holdi hasznos teher", value: { metric: "Több mint 27 tonna a Hold felé", imperial: "Több mint 59 500 lb a Hold felé" } },
      { label: "Block 1B holdi hasznos teher", value: { metric: "38 tonna mélyűrbe Orionnal és személyzettel", imperial: "83 800 lb mélyűrbe Orionnal és személyzettel" } },
      { label: "Block 2 holdi hasznos teher", value: { metric: "Akár 46 tonna mélyűrbe", imperial: "Akár 101 400 lb mélyűrbe" } },
      { label: "Központi fokozat", value: { metric: "64,6+ m magas, 8,4 m átmérő, LOX/LH2 tartályok", imperial: "212+ ft magas, 27,6 ft átmérő, LOX/LH2 tartályok" } },
      { label: "Fő meghajtás", value: "Négy RS-25 hajtómű és két ötszegmenses szilárd rakétabooster" },
      { label: "Felső fokozat útja", value: "ICPS a Block 1-en, Exploration Upper Stage a Block 1B-től" }
    ],
    engines: {
      "rs-25": {
        role: "Központi fokozat folyékony hajtóművei",
        propellant: "Folyékony hidrogén / folyékony oxigén",
        thrust: { metric: "2 279 kN max. hajtóművenként; kb. 8,9 MN együtt", imperial: "512 000 lbf max. hajtóművenként; kb. 2M lbf együtt" },
        summary:
          "Az űrsikló örökségéből származó, SLS környezetre modernizált hajtóművek adják a központi fokozat tolóerejét az emelkedés során.",
        specs: [
          { label: "Gyártó", value: "L3Harris Technologies / Aerojet Rocketdyne örökség" },
          { label: "Repülési szerep", value: "Fő meghajtás minden SLS konfiguráción" },
          { label: "Örökség", value: "Space Shuttle Main Engine család, SLS-re modernizálva" }
        ]
      },
      "five-segment-srb": {
        name: "Ötszegmenses szilárd rakétaboosterek",
        role: "Oldalsó boosterek",
        propellant: "Szilárd hajtóanyag",
        thrust: { metric: "16 MN darabonként", imperial: "3,6M lbf darabonként" },
        summary: "A két űrsikló-örökségű booster az SLS tolóerejének több mint 75%-át adja a repülés első két percében.",
        specs: [
          { label: "Magasság", value: { metric: "54 m darabonként", imperial: "177 ft darabonként" } },
          { label: "Átmérő", value: { metric: "3,7 m darabonként", imperial: "12 ft darabonként" } },
          { label: "Vállalkozó", value: "Northrop Grumman" }
        ]
      },
      "sls-rl10": {
        name: "RL10 felsőfokozati hajtóművek",
        role: "Űrbeli meghajtás",
        propellant: "Folyékony hidrogén / folyékony oxigén",
        thrust: { metric: "110 kN az ICPS-en; kb. 431 kN összesen az EUS-on", imperial: "24 750 lbf az ICPS-en; kb. 97 000 lbf összesen az EUS-on" },
        summary:
          "Az RL10 hajtóművek végzik a Hold felé indító felsőfokozati munkát: egy RL10 az ICPS-en Block 1-nél, négy RL10C-3 az Exploration Upper Stage-en Block 1B-nél.",
        specs: [
          { label: "Block 1", value: "Interim Cryogenic Propulsion Stage egy RL10 hajtóművel" },
          { label: "Block 1B", value: "Exploration Upper Stage négy RL10C-3 hajtóművel" },
          { label: "Szerep", value: "Orion és hasznos terhek küldése Föld körüli pályáról a Hold felé" }
        ]
      }
    }
  },
  starship: {
    summary:
      "Teljesen újrafelhasználható Super Heavy booster és Starship űrhajó architektúra. Artemis esetén a NASA egy holdi használatra optimalizált Starship HLS változatot használ lander demonstrációkhoz és felszíni küldetésekhez.",
    keyMetrics: [
      { label: "Magasság", value: { metric: "123 m", imperial: "403 ft" } },
      { label: "Átmérő", value: { metric: "9 m", imperial: "29,5 ft" } },
      { label: "LEO hasznos teher", value: { metric: "Akár 150 t", imperial: "Akár 330k lb" } },
      { label: "Hold felé", value: "Nem nyilvános" },
      { label: "Indítási tolóerő", value: { metric: "74,3 MN", imperial: "16,7M lbf" } },
      { label: "Booster hajtóművek", value: "33 Raptor" }
    ],
    specs: [
      { label: "Programszerep", value: "Újrafelhasználható indítórendszer és Artemis Human Landing System architektúra" },
      { label: "Fokozatok", value: "Super Heavy booster és Starship űrhajó" },
      { label: "Járműmagasság", value: { metric: "123 m", imperial: "403 ft" } },
      { label: "Átmérő", value: { metric: "9 m", imperial: "29,5 ft" } },
      { label: "Újrafelhasználható hasznos teher cél", value: { metric: "Akár 150 tonna", imperial: "Akár 330 000 lb" } },
      { label: "Hasznos teher a Hold felé", value: "Nincs egyszerű nyilvános TLI adat; az Artemis HLS teljesítménye orbitális utántöltéstől és küldetésarchitektúrától függ" },
      { label: "Hasznos teher burkolat", value: { metric: "9 m külső átmérő, 8 m hasznos teher dinamikus borítékkal", imperial: "29,5 ft külső átmérő, 26 ft hasznos teher dinamikus borítékkal" } },
      { label: "Hajtóanyag", value: "Folyékony metán / folyékony oxigén" },
      { label: "Booster hajtóművek", value: "33 Raptor hajtómű a Super Heavy-n" },
      { label: "Űrhajó hajtóművei", value: "6 Raptor hajtómű a Starshipen" },
      { label: "Artemis kapcsolat", value: "A Starship HLS NASA holdi leszállási demonstrációkat és felszíni műveleteket támogat" }
    ],
    engines: {
      "raptor-super-heavy": {
        role: "Super Heavy booster hajtóművek",
        propellant: "Folyékony metán / folyékony oxigén",
        thrust: "Nagy tolóerejű, full-flow staged combustion hajtóműcsalád",
        summary:
          "A Raptor hajtóművek hajtják a Super Heavy első fokozatot emelkedés közben; a booster fokozatleválasztás után visszatérésre és újrafelhasználásra készül.",
        specs: [
          { label: "Ciklus", value: "Full-flow staged combustion" },
          { label: "Üzemanyag", value: "Metán" },
          { label: "Fokozat", value: "Újrafelhasználható első fokozatú booster" }
        ]
      },
      "raptor-ship": {
        name: "Raptor Vacuum / tengerszinti mix",
        role: "Starship űrhajó hajtóművek",
        propellant: "Folyékony metán / folyékony oxigén",
        thrust: "Pályára állítás, leszállás és küldetési manőverek",
        summary:
          "A Starship felső fokozat hat Raptor hajtóművet használ az emelkedés folytatásához, űrbeli manőverekhez és leszállási műveletekhez.",
        specs: [
          { label: "Fokozat", value: "Starship űrhajó / felső fokozat" },
          { label: "Hasznos teher tér", value: "Nagy, kagylószerű hasznos teher szekció teherküldetésekhez" },
          { label: "Artemis változat", value: "Holdi Starship HLS változat NASA leszállási műveletekhez" }
        ]
      }
    }
  },
  "new-glenn": {
    summary:
      "A Blue Origin újrafelhasználható nehézrakétája hétméteres burkolattal, BE-4 hajtóműves első fokozattal és hidrogénes felső fokozattal. Útvonalterve nagyobb teljesítményű New Glenn változatokat is tartalmaz.",
    keyMetrics: [
      { label: "Magasság", value: { metric: "98+ m", imperial: "320+ ft" } },
      { label: "Átmérő", value: { metric: "7 m burkolat", imperial: "23 ft burkolat" } },
      { label: "LEO hasznos teher", value: { metric: "45+ t", imperial: "99k+ lb" } },
      { label: "Hold felé", value: "Nem nyilvános" },
      { label: "Indítási tolóerő", value: { metric: "17,3 MN", imperial: "3,9M lbf" } },
      { label: "Booster hajtóművek", value: "7 BE-4" }
    ],
    specs: [
      { label: "Programszerep", value: "Újrafelhasználható nehézrakéta kereskedelmi, civil, nemzetbiztonsági és mélyűri küldetésekhez" },
      { label: "Járműmagasság", value: { metric: "Több mint 98 m", imperial: "Több mint 320 ft" } },
      { label: "Hasznos teher burkolat", value: { metric: "7 m burkolat, kétszeres térfogattal a kisebb 5 m osztályú burkolatokhoz képest", imperial: "23 ft burkolat, kétszeres térfogattal a kisebb 16 ft osztályhoz képest" } },
      { label: "Hasznos teher LEO-ra", value: { metric: "Több mint 45 tonna", imperial: "Több mint 99 000 lb" } },
      { label: "Hasznos teher a Hold felé", value: "Nincs egyszerű nyilvános TLI adat; a Blue Moon holdi szállítás a New Glenn indítási architektúrát használja" },
      { label: "Hasznos teher GTO-ra", value: { metric: "Több mint 13 tonna", imperial: "Több mint 28 700 lb" } },
      { label: "Alapváltozat", value: "7x2: hét BE-4 booster hajtómű és két BE-3U felsőfokozati hajtómű" },
      { label: "Felső fokozat", value: "Hidrogénes felső fokozat nagy energiájú pályákra" },
      { label: "Újrafelhasználás", value: "Újrafelhasználható első fokozat ismételt küldetésekre" },
      { label: "Fejlesztési út", value: "A Blue Origin nagyobb tolóerejű frissítéseket és jövőbeli 9x4 szupernehéz változatot jelentett be" }
    ],
    engines: {
      "be-4": {
        role: "Újrafelhasználható booster hajtóművek",
        propellant: "Cseppfolyósított földgáz / folyékony oxigén",
        thrust: { metric: "2 446 kN jelenlegi alap; fejlesztési út 2 847 kN-ig", imperial: "550 000 lbf jelenlegi alap; fejlesztési út 640 000 lbf-ig" },
        summary:
          "Hét BE-4 hajtómű hajtja a New Glenn újrafelhasználható első fokozatát; a Blue Origin motor- és hajtóanyag-frissítésekkel növeli az össztolóerőt.",
        specs: [
          { label: "Fokozat", value: "Újrafelhasználható első fokozat" },
          { label: "Alap össztolóerő", value: { metric: "17,3 MN hét hajtóművel", imperial: "3,9 millió lbf hét hajtóművel" } },
          { label: "Frissített össztolóerő", value: { metric: "20 MN hét hajtóművel", imperial: "4,5 millió lbf hét hajtóművel" } }
        ]
      },
      "be-3u": {
        role: "Felsőfokozati vákuumhajtóművek",
        propellant: "Folyékony hidrogén / folyékony oxigén",
        thrust: { metric: "1 424 kN eredeti összesen; fejlesztési út 1 779 kN-ig", imperial: "320 000 lbf eredeti összesen; fejlesztési út 400 000 lbf-ig" },
        summary:
          "Két BE-3U hajtómű hajtja a hidrogénes felső fokozatot, vákuumüzemre és nagy energiájú pályára állításra optimalizálva.",
        specs: [
          { label: "Fokozat", value: "Felső fokozat" },
          { label: "Örökség", value: "A New Shepard BE-3PM repülési örökségére épül" },
          { label: "Szerep", value: "Közvetlen injektálás igényes LEO, MEO, GEO és mélyűri pályákra" }
        ]
      }
    }
  }
};

const liveHu: Record<string, LiveText> = {
  "nasa-live": {
    title: "NASA élő adás",
    summary: "Hivatalos NASA élő műsorok és eseményközvetítések."
  },
  "nasa-events": {
    title: "NASA események",
    summary: "Hivatalos NASA eseménynaptár tájékoztatókhoz, indításokhoz és élő közvetítésekhez."
  },
  "ll2-upcoming": {
    title: "Indítási visszaszámláló",
    provider: "Küldetésmenetrend",
    summary: "Közelgő indítási és eseményidőzítési kontextus automatikus menetrendfrissítésekhez."
  },
  arow: {
    title: "Artemis valós idejű pályakövetés",
    summary: "Akkor használható, amikor a NASA nyilvános Artemis/Orion küldetéskövetést engedélyez. Nem szimulálunk telemetriát."
  },
  "dsn-now": {
    title: "DSN Now",
    summary: "Deep Space Network aktivitási nézet űreszköz-kommunikációs kontextushoz."
  }
};

const newsHu: Record<string, NewsText> = {
  "nasa-artemis-spacewalking-scott-wray-2026": {
    title: "Űrséta Scott Wrayjel, az Artemis EVA-kiképzés vezetőjével",
    summary:
      "A NASA bemutatja az Artemis holdfelszíni műveletek EVA-kiképzési munkáját, beleértve a szkafanderteszteket és az űrséta-felkészítést.",
    tags: ["Artemis", "EVA", "Szkafanderek"]
  },
  "nasa-artemis-daniel-stubbs-2026": {
    title: "Én vagyok Artemis: Daniel Stubbs",
    summary:
      "A NASA bemutatja az Artemis emberes leszállórendszereihez és a holdpor leszállás közbeni kihívásaihoz kapcsolódó mérnöki munkát.",
    tags: ["Artemis", "HLS", "Holdpor"]
  },
  "nasa-lunabotics-2026": {
    title: "NASA 2026 Lunabotics: diákcsapatok mérnöki munkája a holdi jövőért",
    summary:
      "A NASA Lunabotics Challenge az autonóm holdfelszíni mérnöki munkát kapcsolja össze az ügynökség tartós Moon Base terveivel.",
    tags: ["Moon Base", "Lunabotics", "Felszíni rendszerek"]
  }
};

const localizeSources = (sources: SourceLink[], language: Language): SourceLink[] => {
  if (language !== "hu") {
    return sources;
  }

  return sources.map((source) => ({
    ...source,
    label: sourceHu[source.label] ?? source.label
  }));
};

const localizeClassification = (label: string | undefined, language: Language): string | undefined => {
  if (!label || language !== "hu") {
    return label;
  }

  return classificationHu[label] ?? label;
};

export const localizeProgram = (program: Program, language: Language): Program => {
  if (language !== "hu") {
    return program;
  }

  const text = programHu[program.id];
  return {
    ...program,
    ...text,
    sourceUrls: localizeSources(program.sourceUrls, language)
  };
};

export const localizePhase = (phase: Phase, language: Language): Phase => {
  if (language !== "hu") {
    return phase;
  }

  const text = phaseHu[phase.id];
  return {
    ...phase,
    ...text,
    sourceUrls: localizeSources(phase.sourceUrls, language)
  };
};

export const localizeMission = (mission: Mission, language: Language): Mission => {
  if (language !== "hu") {
    return mission;
  }

  const text = missionHu[mission.id];
  return {
    ...mission,
    ...text,
    classificationLabel: localizeClassification(text?.classificationLabel ?? mission.classificationLabel, language),
    sourceUrls: localizeSources(mission.sourceUrls, language)
  };
};

export const localizeMissionEvent = (event: MissionEvent, language: Language): MissionEvent => {
  if (language !== "hu") {
    return event;
  }

  return {
    ...event,
    ...eventHu[event.id],
    sourceUrls: localizeSources(event.sourceUrls, language)
  };
};

export const localizeEquipment = (item: Equipment, language: Language): Equipment => {
  if (language !== "hu") {
    return item;
  }

  const text = equipmentHu[item.id];
  return {
    ...item,
    ...text,
    sourceUrls: localizeSources(item.sourceUrls, language)
  };
};

export const localizeLiveLink = (link: LiveLink, language: Language): LiveLink => {
  if (language !== "hu") {
    return link;
  }

  return {
    ...link,
    ...liveHu[link.id]
  };
};

export const localizeNewsItem = (item: NewsItem, language: Language): NewsItem => {
  if (language !== "hu") {
    return item;
  }

  return {
    ...item,
    ...newsHu[item.id],
    sourceUrls: localizeSources(item.sourceUrls, language)
  };
};

export const localizeRocket = (rocket: Rocket, language: Language): Rocket => {
  if (language !== "hu") {
    return rocket;
  }

  const text = rocketHu[rocket.id];
  const engines = rocket.engines.map((engine) => {
    const engineText = text?.engines?.[engine.id];
    return {
      ...engine,
      ...engineText,
      sourceUrls: localizeSources(engine.sourceUrls, language)
    };
  });

  return {
    ...rocket,
    name: text?.name ?? rocket.name,
    summary: text?.summary ?? rocket.summary,
    keyMetrics: text?.keyMetrics ?? rocket.keyMetrics,
    specs: text?.specs ?? rocket.specs,
    engines,
    sourceUrls: localizeSources(rocket.sourceUrls, language)
  };
};

export const localizeSourceLinks = localizeSources;
