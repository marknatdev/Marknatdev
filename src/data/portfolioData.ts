export type Language = 'en' | 'th';

export interface ProjectItem {
  id: string;
  name: string;
  repoName: string;
  category: 'IoT / Hardware' | 'AI / Web' | 'Mobile / Flutter' | 'Math / CV';
  language: string;
  githubUrl: string;
  liveUrl?: string;
  badge: { en: string; th: string };
  summary: { en: string; th: string };
  highlights: { en: string[]; th: string[] };
  tags: string[];
}

export const PROFILE_LINKS = {
  github: 'https://github.com/marknatdev',
  instagram: 'https://instagram.com/mxrk._nat',
  email: 'englishorspanishsek@gmail.com',
  kofi: 'https://ko-fi.com/mxrk_nat',
  avatar: 'https://avatars.githubusercontent.com/u/214594522?v=4',
};

export const HELTEC_PINOUT = [
  { fn: 'LoRa NSS (CS)', gpio: 'GPIO 18', bus: 'SPI Chip Select' },
  { fn: 'LoRa DIO0 (IRQ)', gpio: 'GPIO 26', bus: 'Packet Interrupt' },
  { fn: 'LoRa RST', gpio: 'GPIO 14', bus: 'Hardware Reset' },
  { fn: 'LoRa DIO1', gpio: 'GPIO 35', bus: 'Radio DIO1' },
  { fn: 'SPI SCK / MISO / MOSI', gpio: 'GPIO 5 / 19 / 27', bus: 'SX1276 Transceiver' },
  { fn: 'OLED SDA / SCL / RST', gpio: 'GPIO 4 / 15 / 16', bus: '0.96" I2C Display' },
  { fn: 'Vext Power Control', gpio: 'GPIO 21', bus: 'Active LOW OLED Rail' },
  { fn: 'GPS UART (NEO-M8U)', gpio: '9600 baud UART', bus: 'Position Telemetry' },
];

export const OTHER_PROJECTS: ProjectItem[] = [
  {
    id: 'ruts',
    name: 'RUTS — Cascade Damper & CV Chilli Dryer',
    repoName: 'ruts',
    category: 'IoT / Hardware',
    language: 'HTML / WebSerial / CV',
    githubUrl: 'https://github.com/marknatdev/ruts',
    badge: {
      en: 'Live Stage Demo · 10Hz ESP32 + Computer Vision',
      th: 'ระบบสาธิตบนเวที · 10Hz ESP32 + Computer Vision',
    },
    summary: {
      en: 'Single-page offline stage dashboard streaming 10 Hz ESP32 USB-serial temperature plots for a cascade damper control system, paired with CIE Lab color-space computer vision to detect chilli drying doneness in real time.',
      th: 'แดชบอร์ดทำงานแบบออฟไลน์สำหรับสาธิตระบบควบคุมอุณหภูมิ Cascade Damper รับข้อมูลจาก ESP32 ความถี่ 10 Hz ผ่าน USB Serial พร้อมโมเดลตรวจจับสีพริกแห้งในปริภูมิสี CIE Lab แบบเรียลไทม์',
    },
    highlights: {
      en: [
        'Zero-build, zero-CDN offline architecture designed for reliable live stage execution',
        '10 Hz newline-delimited serial telemetry plotting with cascade damper setpoint tracking',
        'Fixed-camera CIE Lab color analysis & vendored detection model for automated drying cutoff',
      ],
      th: [
        'สถาปัตยกรรมไฟล์เดียวทำงานออฟไลน์ 100% เพื่อความเสถียรสูงสุดในการสาธิตสดบนเวที',
        'พล็อตกราฟอุณหภูมิความถี่ 10 Hz จากไมโครคอนโทรลเลอร์ ESP32 แบบเรียลไทม์',
        'วิเคราะห์ค่าสี CIE Lab จากกล้องเพื่อตัดสินความแห้งของพริกโดยอัตโนมัติ',
      ],
    },
    tags: ['ESP32', 'WebSerial API', 'CIE Lab CV', 'Cascade Control', 'HTML5 Canvas'],
  },
  {
    id: 'mindfulbook',
    name: 'MindfulBook (Mindful Connect)',
    repoName: 'mindfulbook',
    category: 'AI / Web',
    language: 'TypeScript',
    githubUrl: 'https://github.com/marknatdev/mindfulbook',
    liveUrl: 'https://marknatdev.github.io/mindfulbook',
    badge: {
      en: 'Anti-Cyberbullying AI Testbed',
      th: 'แพลตฟอร์มทดสอบ AI ป้องกันการกลั่นแกล้งออนไลน์',
    },
    summary: {
      en: 'Interactive social media prototype built as an experimental testbed for an Anti-Cyberbullying AI tailored to the Thai demographic, intervening in real time before toxic or harmful posts are published.',
      th: 'ต้นแบบโซเชียลมีเดียสำหรับทดสอบระบบ AI สกัดกั้นการกลั่นแกล้งทางไซเบอร์ (Anti-Cyberbullying) ออกแบบสำหรับบริบทภาษาและผู้ใช้ในไทย ช่วยเตือนและแทรกแซงก่อนโพสต์ข้อความที่เป็นพิษ',
    },
    highlights: {
      en: [
        'Simulates a familiar social feed to test real-world behavioral nudges and AI moderation',
        'Real-time toxicity analysis and empathetic rephrasing prompts for Thai/English posts',
        'Deployed live on GitHub Pages for interactive user studies',
      ],
      th: [
        'จำลองหน้าฟีดโซเชียลมีเดียที่คุ้นเคยเพื่อศึกษาพฤติกรรมการตัดสินใจของผู้ใช้งาน',
        'วิเคราะห์ความรุนแรงของข้อความแบบเรียลไทม์พร้อมเสนอแนะการปรับถ้อยคำอย่างสร้างสรรค์',
        'เปิดให้ทดสอบใช้งานจริงผ่าน GitHub Pages',
      ],
    },
    tags: ['TypeScript', 'AI Moderation', 'NLP', 'UX Research', 'React'],
  },
  {
    id: 'study_plan',
    name: 'StudyForge — AI Competition Study Planner',
    repoName: 'study_plan',
    category: 'AI / Web',
    language: 'TypeScript',
    githubUrl: 'https://github.com/marknatdev/study_plan',
    liveUrl: 'https://study-plan-ebon.vercel.app',
    badge: {
      en: 'Next.js + Supabase + OpenRouter AI',
      th: 'ระบบจัดตารางเตรียมสอบด้วย AI (Next.js + Supabase)',
    },
    summary: {
      en: 'Full-stack AI web application that transforms exam syllabi or PDF documents into structured, day-by-day preparation roadmaps and interactive calendars for academic competitions.',
      th: 'เว็บแอปพลิเคชัน Full-Stack ที่ใช้ AI วิเคราะห์เนื้อหาการสอบหรือไฟล์ PDF เพื่อสร้างตารางอ่านหนังสือรายวันและแผนเตรียมตัวแข่งขันทางวิชาการแบบอัตโนมัติ',
    },
    highlights: {
      en: [
        'PDF syllabus parsing & LLM-driven milestone decomposition via OpenRouter',
        'Interactive calendar scheduling with progress tracking backed by Supabase',
        'Deployed in production on Vercel with responsive dark UI',
      ],
      th: [
        'รองรับการอัปโหลดไฟล์ PDF เนื้อหาสอบและแปลงเป็นแผนการเรียนรายวันด้วย LLM',
        'ปฏิทินโต้ตอบพร้อมระบบบันทึกความก้าวหน้าบนฐานข้อมูล Supabase',
        'เปิดใช้งานจริงบน Vercel',
      ],
    },
    tags: ['Next.js', 'TypeScript', 'Supabase', 'OpenRouter', 'Tailwind CSS'],
  },
  {
    id: 'rot-duam',
    name: 'Rot-Duam (รถด่วน) — Multimodal Thai Transit',
    repoName: 'Rot-Duam',
    category: 'Mobile / Flutter',
    language: 'Dart',
    githubUrl: 'https://github.com/marknatdev/Rot-Duam',
    badge: {
      en: 'Door-to-Door Bangkok Transit App',
      th: 'แอปนำทางขนส่งสาธารณะไทยแบบ Door-to-Door',
    },
    summary: {
      en: 'Cross-platform Flutter mobile application providing door-to-door route planning across Thailand, unifying BTS, MRT, SRT rail networks, and public bus transfers with OpenStreetMap Nominatim geocoding.',
      th: 'แอปพลิเคชัน Flutter สำหรับวางแผนการเดินทางแบบ Door-to-Door ในประเทศไทย เชื่อมต่อโครงข่ายรถไฟฟ้า BTS, MRT, SRT และรถประจำทาง พร้อมค้นหาพิกัดผ่าน OpenStreetMap Nominatim',
    },
    highlights: {
      en: [
        'Multi-modal graph routing across BTS, MRT, SRT, and local transit links',
        'OpenStreetMap Nominatim search with offline/fallback station resolution',
        'Built natively in Dart/Flutter for smooth mobile map & step-by-step guidance',
      ],
      th: [
        'คำนวณเส้นทางเชื่อมต่อหลายรูปแบบขนส่ง (BTS, MRT, SRT และรถเมล์)',
        'ค้นหาสถานที่ต้นทาง-ปลายทางด้วย OpenStreetMap Nominatim',
        'พัฒนาด้วย Flutter/Dart รองรับการแสดงผลขั้นตอนการเดินทางที่เข้าใจง่าย',
      ],
    },
    tags: ['Flutter', 'Dart', 'OpenStreetMap', 'Routing Algorithms', 'Mobile UI'],
  },
  {
    id: 'mmc011',
    name: 'MMC 2026 — Geometric Area Modeling (MMC011)',
    repoName: 'MMC011',
    category: 'Math / CV',
    language: 'Python',
    githubUrl: 'https://github.com/marknatdev/MMC011',
    badge: {
      en: 'Mathematical Modeling Challenge 2026 (MMC 2569)',
      th: 'การแข่งขัน Mathematical Modeling Challenges 2026',
    },
    summary: {
      en: 'Computational geometry & computer vision pipeline built for the 2026 Mathematical Modeling Challenge (MMC 2569) to rectify perspective-distorted aerial/field imagery and compute irregular land areas via the Shoelace theorem.',
      th: 'โปรแกรมคำนวณเชิงเรขาคณิตและประมวลผลภาพสำหรับโจทย์ปัญหาการแข่งขัน Mathematical Modeling Challenges 2026 (MMC 2569) แปลงมุมมองภาพ (Perspective Transform) และคำนวณพื้นที่รูปหลายเหลี่ยมด้วยสูตร Shoelace',
    },
    highlights: {
      en: [
        '4-point projective homography transformation to calibrate scale against a 1,600 sq.m reference frame',
        'Interactive polygon vertex capture and exact planar area integration using the Shoelace formula',
        'Automated pixel-to-metric conversion for irregular real-world terrain boundaries',
      ],
      th: [
        'ดัดแก้ความบิดเบี้ยวของมุมกล้องด้วย 4-Point Perspective Homography เทียบสเกลอ้างอิง 1,600 ตร.ม.',
        'กำหนดจุดยอดรูปหลายเหลี่ยมและคำนวณพื้นที่จริงด้วยทฤษฎีบท Shoelace อย่างแม่นยำ',
        'พัฒนาด้วย Python สำหรับงานประยุกต์คณิตศาสตร์และคอมพิวเตอร์วิทัศน์',
      ],
    },
    tags: ['Python', 'Computer Vision', 'Shoelace Formula', 'Homography', 'Math Modeling'],
  },
  {
    id: 'rescue-boat',
    name: 'Rescue-Boat — Emergency Marine Robotics',
    repoName: 'Rescue-Boat',
    category: 'IoT / Hardware',
    language: 'C++ / Embedded',
    githubUrl: 'https://github.com/marknatdev/Rescue-Boat',
    badge: {
      en: 'Unmanned Surface Rescue Prototype',
      th: 'ต้นแบบเรือกู้ภัยบังคับและระบบสมองกลฝังตัว',
    },
    summary: {
      en: 'Hardware and microcontroller engineering project developing a rapid-response unmanned rescue boat platform for flood and water emergency assistance.',
      th: 'โครงงานพัฒนาต้นแบบเรือกู้ภัยควบคุมด้วยไมโครคอนโทรลเลอร์ สำหรับภารกิจช่วยเหลือผู้ประสบภัยทางน้ำและอุทกภัย',
    },
    highlights: {
      en: [
        'Embedded motor propulsion control and telemetry stabilization for water surfaces',
        'Designed for flood response and emergency flotation deployment in Southern Thailand',
      ],
      th: [
        'ออกแบบระบบขับเคลื่อนและวงจรควบคุมไมโครคอนโทรลเลอร์สำหรับสภาพแวดล้อมทางน้ำ',
        'มุ่งเน้นการประยุกต์ใช้ช่วยเหลือผู้ประสบอุทกภัยและเหตุฉุกเฉินทางน้ำ',
      ],
    },
    tags: ['Microcontrollers', 'Embedded C++', 'Robotics', 'Hardware Prototyping'],
  },
];

export const UI_COPY = {
  en: {
    nav: {
      bento: 'Overview',
      flagships: 'Flagship Systems',
      simulators: 'Live Architecture',
      experiments: 'Experiments',
      terminal: 'Terminal',
      contact: 'Contact',
      cmdHint: 'Ctrl+K',
    },
    hero: {
      statusBadge: 'GRADE 11 (M.5) @ SAPARACHINEE TRANG SCHOOL · OPEN TO COLLABORATION',
      greeting: 'Hi, I’m Mark',
      handle: '@marknatdev',
      headline: 'Engineering Embedded LoRa Networks, Autonomous Trading Engines & Full-Stack Systems.',
      subheadline:
        'Student Developer at Saparachinee Trang School (Grade 11 / M.5) bridging hardware microcontrollers (ESP32 / 923MHz LoRa), quantitative algorithmic software, and modern cross-platform applications.',
      ctaPrimary: 'Explore Flagship Case Studies',
      ctaSecondary: 'Launch Interactive Terminal',
      metrics: [
        { label: 'Flagship Systems', value: '2 Deep-Dives', sub: 'HELIX IoT & FXCommand' },
        { label: 'Public Repositories', value: '16+ Repos', sub: 'Python · Dart · TS · C++' },
        { label: 'Hardware Stack', value: 'ESP32 + LoRa', sub: 'SX1276 923MHz · CV · Telemetry' },
        { label: 'Academic Track', value: 'Grade 11 (M.5)', sub: 'Saparachinee Trang School' },
      ],
    },
    bento: {
      sectionTitle: 'Engineering Profile & Academic Overview',
      sectionSubtitle: 'A hybrid developer & TCAS engineering portfolio combining hardware prototyping, algorithmic rigor, and production software.',
      academicTitle: 'Student & Academic Identity (TCAS Portfolio)',
      schoolName: 'Saparachinee Trang School',
      schoolSub: 'Grade 11 (Mattayom 5) · Trang, Thailand',
      academicBio:
        'Passionate about Computer Engineering, Embedded Systems, and Artificial Intelligence. I build complete end-to-end systems—from soldering and programming ESP32 LoRa nodes in C++ to architecting cloud pipelines and fault-tolerant Python engines.',
      milestonesTitle: 'Competition & Research Milestones',
      milestones: [
        {
          year: '2026',
          title: 'Mathematical Modeling Challenge (MMC 2569)',
          desc: 'Developed homography perspective rectification & Shoelace theorem area estimation in Python (MMC011).',
        },
        {
          year: '2026',
          title: 'RUTS Live Stage Engineering Demo',
          desc: 'Built 10 Hz ESP32 USB-serial cascade damper dashboard with CIE Lab computer vision chilli drying detection.',
        },
        {
          year: '2025–2026',
          title: 'HELIX Smart Helmet & Rescue-Boat Hardware',
          desc: 'Engineered 923MHz LoRa point-to-point telemetry nodes and unmanned surface rescue prototypes.',
        },
        {
          year: '2025–2026',
          title: 'MindfulBook & StudyForge AI Systems',
          desc: 'Created an Anti-Cyberbullying AI social testbed for Thai users and an LLM-powered exam planner.',
        },
      ],
      domainsTitle: 'Core Engineering Pillars',
      domains: [
        {
          title: 'Embedded & LoRa IoT',
          desc: 'Heltec ESP32 V2, SX1276 923MHz LoRa, UART GPS, OLED telemetry, WebSerial & sensor fusion.',
        },
        {
          title: 'Algorithmic & Quant Systems',
          desc: 'Multi-symbol execution engines, walk-forward shadow arenas, strict pre-trade risk gates & MT5 IPC.',
        },
        {
          title: 'Full-Stack & Flutter Mobile',
          desc: 'Cross-platform Flutter command centers, React/Next.js apps, Firebase Cloud Functions, Firestore & Supabase.',
        },
        {
          title: 'Applied AI & Computer Vision',
          desc: 'CIE Lab vision pipelines, projective homography, NLP moderation, and MCP servers for AI agents.',
        },
      ],
    },
    flagships: {
      badge: 'FLAGSHIP ENGINEERING CASE STUDIES',
      title: 'Production-Grade Systems Built From Scratch',
      subtitle:
        'Deep-dive technical breakdowns of my two primary architectures—complete with interactive telemetry and execution simulators below.',
      helix: {
        tag: 'FLAGSHIP 01 · HARDWARE IoT + CLOUD + FLUTTER FLEET COMMAND',
        title: 'HELIX — Smart Helmet 923MHz LoRa Telemetry & Command Center',
        repos: ['helix', 'helix-command-center', 'helmet-pro'],
        summary:
          'An end-to-end safety and fleet management ecosystem for smart helmets. Custom C++ firmware on Heltec WiFi LoRa 32 V2 (ESP32 + SX1276) transmits real-time GPS, battery ADC, and status structs over 923 MHz LoRa to a WiFi Gateway, which bridges packets through Firebase Cloud Functions into Cloud Firestore and a multi-platform Flutter Command Center.',
        specs: [
          { label: 'Radio Link', value: '923 MHz LoRa (SX1276)' },
          { label: 'MCU Boards', value: '2× Heltec WiFi LoRa 32 V2' },
          { label: 'Cloud Pipeline', value: 'Firebase Functions + Firestore' },
          { label: 'Client App', value: 'Flutter (Fleet Map & Live View)' },
        ],
        bullets: [
          'Dual-Firmware Embedded Architecture: Dedicated C++ firmware for the Helmet Sender Node (GPS UART @ 9600 baud, 3.7V LiPo ADC sensing, 0.96" I2C OLED HUD, SX1276 TX) and Gateway Receiver Node (LoRa RX struct parser, OLED diagnostics, WiFi HTTP POST webhook).',
          'Serverless Telemetry Ingestion: Node.js Firebase Cloud Function (`POST /lora-uplink`) validates incoming gateway payloads, normalizes device state, and streams real-time updates to Cloud Firestore.',
          'Flutter Command Center (`helix-command-center`): Features interactive Fleet Map, Live Telemetry View, Real-Time Alert Feed, Device Pairing System, and built-in Data Flow Simulator.',
        ],
      },
      fxcommand: {
        tag: 'FLAGSHIP 02 · QUANTITATIVE TRADING ENGINE + WALK-FORWARD ARENA',
        title: 'FXCommand — Autonomous Multi-Symbol MT5 Engine & Self-Improving Arena',
        repos: ['fxcommand'],
        summary:
          'A fault-tolerant quantitative trading platform and execution engine for MetaTrader 5 controlled from a unified web dashboard and MCP agent server. Combines multi-session symbol assignments, a deterministic 6-check Risk Gate, a magic-number isolated Kill Switch, and a Walk-Forward Champion/Challenger shadow-trading arena.',
        specs: [
          { label: 'Execution Modes', value: '60× Sim · Paper · Live MT5' },
          { label: 'Strategies v1', value: 'EMA Cross · Donchian · ADX-RSI' },
          { label: 'Safety Architecture', value: 'Risk Gate + Equity Floor Kill Switch' },
          { label: 'AI Integration', value: 'Walk-Forward Arena + MCP Server' },
        ],
        bullets: [
          'Pre-Trade Risk Gate & Account Safety: Sizes positions dynamically by risk % using ATR stops while enforcing max spread/stale quote checks, trading windows, session & global position limits, daily loss circuit breakers, live caps, and a magic-number isolated Kill Switch.',
          'Self-Improving Walk-Forward Arena: Every Symbol + Timeframe runs a live Champion alongside up to 3 shadow-trading Challengers on identical real bars. Challengers only promote after passing strict guardrails (30+ shadow trades, deflated out-of-sample lift, drawdown check) with automatic rollback.',
          'Signal Filter ML & Full Observability: Learns from closed trade journals which signal regimes underperform, paired with Playwright E2E tests, Pytest suite, Telegram alerts, and an `.mcp.json` server for AI agent supervision.',
        ],
      },
    },
    experiments: {
      badge: 'OTHER REPOSITORIES & EXPERIMENTS',
      title: 'Research, Competitions & Open-Source Builds',
      subtitle:
        'Additional projects across computer vision, AI social platforms, transit routing, and hardware prototyping—synced live with GitHub.',
      filterAll: 'All Projects',
      viewCode: 'Source Code',
      viewLive: 'Live Demo',
      liveSyncLabel: 'Live GitHub API Sync Active',
    },
    terminalSection: {
      badge: 'INTERACTIVE CLI INSPECTOR',
      title: 'Query My Portfolio via Terminal',
      subtitle: 'Click any command chip below or type directly into the shell (`help`, `whoami`, `helix`, `fxcommand`, `tcas`, `skills`, `contact`).',
    },
    contact: {
      badge: 'COLLABORATION & ADMISSIONS CONTACT',
      title: 'Let’s Build Something Impactful Together',
      subtitle:
        'Whether you are a university admissions reviewer, fellow hardware/software builder, or open-source collaborator—feel free to reach out.',
      copyEmail: 'Copy Email Address',
      copied: 'Copied to Clipboard!',
    },
  },
  th: {
    nav: {
      bento: 'ข้อมูลสรุป',
      flagships: 'ผลงานชิ้นเอก',
      simulators: 'จำลองสถาปัตยกรรม',
      experiments: 'ผลงานอื่นๆ',
      terminal: 'เทอร์มินัล',
      contact: 'ติดต่อ',
      cmdHint: 'Ctrl+K',
    },
    hero: {
      statusBadge: 'นักเรียนชั้น ม.5 โรงเรียนสภาราชินี จังหวัดตรัง · พร้อมร่วมงานและพัฒนาโปรเจกต์',
      greeting: 'สวัสดีครับ ผมมาร์ค (Mark)',
      handle: '@marknatdev',
      headline: 'พัฒนาเครือข่ายสมองกลฝังตัว LoRa IoT, ระบบเทรดอัตโนมัติเชิงปริมาณ และซอฟต์แวร์ Full-Stack',
      subheadline:
        'นักเรียนนักพัฒนา (Grade 11 / ม.5) โรงเรียนสภาราชินี จังหวัดตรัง ผสานการออกแบบฮาร์ดแวร์ไมโครคอนโทรลเลอร์ (ESP32 / 923MHz LoRa) เข้ากับวิศวกรรมซอฟต์แวร์อัลกอริทึม และแอปพลิเคชันข้ามแพลตฟอร์ม',
      ctaPrimary: 'ดูเจาะลึกผลงานชิ้นเอก (HELIX & FXCommand)',
      ctaSecondary: 'เปิดเทอร์มินัลโต้ตอบ',
      metrics: [
        { label: 'ระบบเรือธงหลัก', value: '2 ระบบใหญ่', sub: 'HELIX IoT และ FXCommand' },
        { label: 'คลังโค้ดสาธารณะ', value: '16+ Repos', sub: 'Python · Dart · TS · C++' },
        { label: 'ฮาร์ดแวร์และสมองกล', value: 'ESP32 + LoRa', sub: 'SX1276 923MHz · CV · Telemetry' },
        { label: 'สถานะการศึกษา', value: 'มัธยมศึกษาปีที่ 5', sub: 'โรงเรียนสภาราชินี จังหวัดตรัง' },
      ],
    },
    bento: {
      sectionTitle: 'ข้อมูลวิศวกรรมและแฟ้มสะสมผลงานวิชาการ (TCAS Portfolio)',
      sectionSubtitle: 'พอร์ตโฟลิโอที่รวมผลงานด้านการพัฒนาซอฟต์แวร์ ฮาร์ดแวร์ IoT และผลงานการแข่งขันทางวิชาการอย่างครบวงจร',
      academicTitle: 'ข้อมูลการศึกษาและตัวตนนักพัฒนา (TCAS)',
      schoolName: 'โรงเรียนสภาราชินี จังหวัดตรัง',
      schoolSub: 'ระดับชั้นมัธยมศึกษาปีที่ 5 (Grade 11) · จังหวัดตรัง',
      academicBio:
        'มีความมุ่งมั่นด้านวิศวกรรมคอมพิวเตอร์ ระบบสมองกลฝังตัว (Embedded Systems) และปัญญาประดิษฐ์ (AI) ถนัดการสร้างระบบตั้งแต่ต้นน้ำถึงปลายน้ำ ตั้งแต่การเขียนเฟิร์มแวร์ C++ บนบอร์ด ESP32 LoRa ไปจนถึงระบบ Cloud และเอ็นจิ้นประมวลผลด้วย Python',
      milestonesTitle: 'ผลงานการแข่งขันและงานวิจัยประยุกต์',
      milestones: [
        {
          year: '2026',
          title: 'Mathematical Modeling Challenges 2026 (MMC 2569)',
          desc: 'พัฒนาโปรแกรมแปลงมุมมองภาพ Homography และคำนวณพื้นที่จริงด้วยทฤษฎีบท Shoelace ด้วยภาษา Python (MMC011)',
        },
        {
          year: '2026',
          title: 'ระบบสาธิตควบคุมอุณหภูมิและตรวจจับสีพริกแห้ง (RUTS)',
          desc: 'สร้างแดชบอร์ดรับค่าอุณหภูมิ 10 Hz จาก ESP32 ผ่าน USB Serial พร้อมโมเดลตรวจจับความแห้งของพริกในปริภูมิสี CIE Lab',
        },
        {
          year: '2025–2026',
          title: 'หมวกกันน็อกอัจฉริยะ HELIX และต้นแบบเรือกู้ภัย (Rescue-Boat)',
          desc: 'พัฒนาระบบสื่อสารไร้สายระยะไกล LoRa 923MHz และฮาร์ดแวร์หุ่นยนต์กู้ภัยทางน้ำด้วยไมโครคอนโทรลเลอร์',
        },
        {
          year: '2025–2026',
          title: 'แพลตฟอร์ม AI เพื่อสังคมและการศึกษา (MindfulBook & StudyForge)',
          desc: 'สร้างระบบทดสอบ AI ป้องกันการกลั่นแกล้งออนไลน์สำหรับผู้ใช้ไทย และเว็บวางแผนการเรียนด้วย LLM',
        },
      ],
      domainsTitle: '4 แกนหลักด้านวิศวกรรม',
      domains: [
        {
          title: 'ระบบสมองกลฝังตัวและ LoRa IoT',
          desc: 'Heltec ESP32 V2, คลื่นความถี่ SX1276 923MHz LoRa, พิกัด GPS UART, จอ OLED และการสื่อสารผ่าน WebSerial',
        },
        {
          title: 'ระบบอัลกอริทึมและการคำนวณเชิงปริมาณ',
          desc: 'เอ็นจิ้นส่งคำสั่งหลายสินทรัพย์, ระบบจำลองกลยุทธ์ Champion/Challenger และระบบควบคุมความเสี่ยง (Risk Gate)',
        },
        {
          title: 'เว็บและแอปพลิเคชันข้ามแพลตฟอร์ม',
          desc: 'แดชบอร์ดควบคุมด้วย Flutter/Dart, เว็บแอป React/Next.js, Firebase Cloud Functions, Firestore และ Supabase',
        },
        {
          title: 'AI ประยุกต์และคอมพิวเตอร์วิทัศน์',
          desc: 'วิเคราะห์สี CIE Lab, การแปลงเรขาคณิตภาพ, AI กรองข้อความไม่พึงประสงค์ และเซิร์ฟเวอร์ MCP สำหรับเอเจนต์',
        },
      ],
    },
    flagships: {
      badge: 'เจาะลึก 2 ผลงานวิศวกรรมชิ้นเอก (FLAGSHIP CASE STUDIES)',
      title: 'สถาปัตยกรรมระบบที่ออกแบบและพัฒนาขึ้นเองทั้งหมด',
      subtitle:
        'รายละเอียดเชิงลึกของ 2 โปรเจกต์หลักที่สะท้อนทักษะทั้งฝั่งฮาร์ดแวร์ IoT และซอฟต์แวร์อัลกอริทึม พร้อมระบบจำลองการทำงานแบบโต้ตอบด้านล่าง',
      helix: {
        tag: 'FLAGSHIP 01 · ฮาร์ดแวร์ LoRa IoT + คลาวด์ + ศูนย์บัญชาการ FLUTTER',
        title: 'HELIX — ระบบหมวกกันน็อกอัจฉริยะผ่านคลื่น 923MHz LoRa และศูนย์ควบคุมกลาง',
        repos: ['helix', 'helix-command-center', 'helmet-pro'],
        summary:
          'ระบบนิเวศฮาร์ดแวร์และซอฟต์แวร์เพื่อความปลอดภัยและบริหารจัดการหมวกกันน็อกอัจฉริยะแบบครบวงจร เฟิร์มแวร์ C++ บนบอร์ด Heltec WiFi LoRa 32 V2 (ESP32 + SX1276) อ่านค่าพิกัด GPS และแรงดันแบตเตอรี่ส่งผ่านคลื่นความถี่ 923 MHz LoRa ไปยังบอร์ด Gateway เพื่อส่งต่อผ่าน Firebase Cloud Functions ลงฐานข้อมูล Firestore และแสดงผลเรียลไทม์บนแอปพลิเคชัน Flutter',
        specs: [
          { label: 'คลื่นสื่อสารไร้สาย', value: '923 MHz LoRa (SX1276)' },
          { label: 'บอร์ดไมโครคอนโทรลเลอร์', value: '2× Heltec WiFi LoRa 32 V2' },
          { label: 'ระบบคลาวด์', value: 'Firebase Functions + Firestore' },
          { label: 'แอปศูนย์ควบคุม', value: 'Flutter (แผนที่และสถานะสด)' },
        ],
        bullets: [
          'สถาปัตยกรรมเฟิร์มแวร์คู่ (Sender & Receiver): บอร์ดฝั่งหมวกกันน็อก (`sender.ino`) อ่านค่า GPS (NEO-M8U), แรงดันแบตเตอรี่ LiPo 3.7V และแสดงผลบนจอ OLED 0.96" ก่อนส่งแพ็กเก็ตผ่าน LoRa 923MHz ไปยังบอร์ดรับสัญญาณ (`receiver.ino`) ที่เชื่อมต่อ WiFi',
          'ไปป์ไลน์คลาวด์แบบไร้เซิร์ฟเวอร์: ฟังก์ชัน `POST /lora-uplink` บน Firebase รับข้อมูล JSON จาก Gateway ตรวจสอบความถูกต้องและอัปเดตสถานะเข้าสู่ Cloud Firestore ทันที',
          'ศูนย์บัญชาการ Flutter (`helix-command-center`): แสดงแผนที่ติดตามหมวกกันน็อกทุกใบ (Fleet Map), หน้าจอ Telemetry สด, ระบบแจ้งเตือนเหตุฉุกเฉิน (Alert Feed), ระบบจับคู่อุปกรณ์ และตัวจำลองการไหลของข้อมูล',
        ],
      },
      fxcommand: {
        tag: 'FLAGSHIP 02 · เอ็นจิ้นเทรดอัตโนมัติเชิงปริมาณ + สนามประลองกลยุทธ์อัจฉริยะ',
        title: 'FXCommand — ระบบเทรดอัตโนมัติหลายสินทรัพย์สำหรับ MT5 และระบบเรียนรู้ด้วยตนเอง',
        repos: ['fxcommand'],
        summary:
          'แพลตฟอร์มและเอ็นจิ้นส่งคำสั่งซื้อขายอัตโนมัติสำหรับ MetaTrader 5 ที่ควบคุมผ่านแดชบอร์ดเดียวและรองรับการสั่งงานด้วย AI Agent ผ่านโปรโตคอล MCP โดดเด่นด้วยด่านตรวจสอบความเสี่ยง 6 ชั้น (Risk Gate), ปุ่มหยุดฉุกเฉินแยกเลข Magic Number (Kill Switch) และระบบคัดเลือกกลยุทธ์อัตโนมัติแบบ Walk-Forward Champion/Challenger Arena',
        specs: [
          { label: 'โหมดการรันระบบ', value: 'จำลอง 60× · Paper · พอร์ตจริง MT5' },
          { label: 'กลยุทธ์ในระบบ', value: 'EMA Cross · Donchian · ADX-RSI' },
          { label: 'ระบบความปลอดภัย', value: 'Risk Gate + Equity Floor Kill Switch' },
          { label: 'การเชื่อมต่อ AI', value: 'Walk-Forward Arena + MCP Server' },
        ],
        bullets: [
          'ระบบ Risk Gate และความปลอดภัยของพอร์ต: คำนวณขนาด Lot ตาม % ความเสี่ยงและระยะ ATR Stop-Loss โดยอัตโนมัติ พร้อมตรวจสอบค่า Spread, ช่วงเวลาเทรด, จำนวนออเดอร์สูงสุด และเพดานขาดทุนรายวัน หากเกินกำหนดระบบจะสั่งหยุดอัตโนมัติทันที',
          'สนามประลองกลยุทธ์ Walk-Forward Arena: ในทุกคู่เงินและ Timeframe จะมีกลยุทธ์หลัก (Champion) ทำงานคู่กับผู้ท้าชิง (Challengers) สูงสุด 3 ตัวที่เทรดจำลองบนกราฟจริงเดียวกัน และจะเลื่อนขั้นขึ้นมาแทนที่เมื่อผ่านเกณฑ์ความปลอดภัยครบทุกข้อเท่านั้น พร้อมระบบ Rollback อัตโนมัติ',
          'ตัวกรองสัญญาณ ML และการตรวจสอบครบวงจร: มีระบบ Signal Filter เรียนรู้จากประวัติที่ปิดไปแล้วเพื่อบล็อกสัญญาณที่มักขาดทุน พร้อมชุดทดสอบ Pytest, Playwright E2E, แจ้งเตือน Telegram และ MCP Server',
        ],
      },
    },
    experiments: {
      badge: 'คลังโปรเจกต์และการทดลองอื่นๆ',
      title: 'งานวิจัย การแข่งขัน และโอเพนซอร์ส',
      subtitle:
        'โปรเจกต์ด้านคอมพิวเตอร์วิทัศน์ โซเชียลมีเดีย AI แอปขนส่งสาธารณะ และต้นแบบฮาร์ดแวร์ เชื่อมต่อข้อมูลล่าสุดจาก GitHub API โดยตรง',
      filterAll: 'ทั้งหมด',
      viewCode: 'ดูซอร์สโค้ด',
      viewLive: 'ทดลองใช้งานจริง',
      liveSyncLabel: 'ซิงค์ข้อมูลสดจาก GitHub API',
    },
    terminalSection: {
      badge: 'เทอร์มินัลโต้ตอบสำหรับนักพัฒนา',
      title: 'สำรวจข้อมูลพอร์ตโฟลิโอผ่าน Command Line',
      subtitle: 'คลิกปุ่มคำสั่งลัดด้านล่าง หรือพิมพ์คำสั่งด้วยตัวเอง (`help`, `whoami`, `helix`, `fxcommand`, `tcas`, `skills`, `contact`)',
    },
    contact: {
      badge: 'ช่องทางการติดต่อและพูดคุย',
      title: 'พร้อมเรียนรู้ ร่วมงาน และสร้างสรรค์นวัตกรรม',
      subtitle:
        'ไม่ว่าจะเป็นอาจารย์ผู้พิจารณาแฟ้มสะสมผลงาน (TCAS) เพื่อนนักพัฒนา หรือผู้ที่สนใจร่วมทำโปรเจกต์ สามารถติดต่อผมได้ทุกช่องทางด้านล่างครับ',
      copyEmail: 'คัดลอกอีเมล',
      copied: 'คัดลอกอีเมลเรียบร้อยแล้ว!',
    },
  },
};
