import React, { useState, useEffect } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Copy,
  Check,
  Radio,
  ShieldCheck,
  Cpu,
  Sparkles,
  MapPin,
  Compass,
  Award,
} from 'lucide-react';
import { Language, PROFILE_LINKS } from './data/portfolioData';
import { CommandPalette } from './components/CommandPalette';

interface WorkItem {
  id: string;
  title: string;
  description: { en: string; th: string };
  year: string;
  disciplines: string[];
  href: string;
  external?: boolean;
  previewType: 'helix' | 'fxcommand' | 'ruts' | 'mindfulbook' | 'studyforge' | 'rotduam';
}

interface Achievement {
  id: string;
  title: { en: string; th: string };
  result: { en: string; th: string };
  organizer: { en: string; th: string };
  date: { en: string; th: string };
  detail: { en: string; th: string };
  /** Photo in public/achievements/; a placeholder tile shows until it is added. */
  image?: string;
  featured?: boolean;
}

export function App() {
  const [lang, setLang] = useState<Language>('en');
  const [cmdOpen, setCmdOpen] = useState<boolean>(false);
  const [localTime, setLocalTime] = useState<string>('--:--');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  // Update Trang, Thailand clock (Asia/Bangkok)
  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Bangkok',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(now);
        setLocalTime(formatted);
      } catch {
        setLocalTime('12:00');
      }
    };
    updateClock();
    const timer = setInterval(updateClock, 10000);
    return () => clearInterval(timer);
  }, []);

  // Global Ctrl+K shortcut
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(PROFILE_LINKS.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const selectedWorks: WorkItem[] = [
    {
      id: 'helix',
      title: 'HELIX — Smart Helmet Fleet & 923MHz LoRa',
      description: {
        en: 'End-to-end 923MHz LoRa point-to-point helmet telemetry (Heltec ESP32 V2 + SX1276) bridged to Firebase Cloud Functions, Firestore, and a multi-platform Flutter Command Center.',
        th: 'ระบบหมวกกันน็อกอัจฉริยะส่งพิกัด GPS และสถานะแบตเตอรี่ผ่านคลื่น 923MHz LoRa (Heltec ESP32 V2) เชื่อมต่อเกตเวย์ขึ้นสู่ Firebase และศูนย์ควบคุม Flutter แบบเรียลไทม์',
      },
      year: '2026',
      disciplines: ['ESP32 + SX1276 LoRa', 'Embedded C++', 'Firebase Cloud', 'Flutter Fleet UI'],
      href: 'https://github.com/marknatdev/helix',
      external: true,
      previewType: 'helix',
    },
    {
      id: 'fxcommand',
      title: 'FXCommand — Autonomous MT5 Engine & Arena',
      description: {
        en: 'Multi-symbol quantitative execution engine for MetaTrader 5 with a deterministic 6-layer Risk Gate, magic-number Kill Switch, and Walk-Forward Champion/Challenger shadow-trading arena.',
        th: 'เอ็นจิ้นเทรดอัตโนมัติเชิงปริมาณหลายสินทรัพย์สำหรับ MetaTrader 5 พร้อมระบบกรองความเสี่ยง 6 ชั้น (Risk Gate), ปุ่มฉุกเฉิน Kill Switch และสนามประลองกลยุทธ์ Walk-Forward Arena',
      },
      year: '2026',
      disciplines: ['Quantitative Systems', 'Python & MT5', 'Walk-Forward ML', 'MCP Server'],
      href: 'https://github.com/marknatdev/fxcommand',
      external: true,
      previewType: 'fxcommand',
    },
    {
      id: 'ruts',
      title: 'RUTS — 10Hz ESP32 Damper & Chilli Vision',
      description: {
        en: 'Offline single-page stage dashboard plotting 10 Hz ESP32 USB-serial temperature telemetry for a cascade damper demo alongside CIE Lab colour-space computer vision.',
        th: 'แดชบอร์ดออฟไลน์สำหรับสาธิตบนเวที พล็อตกราฟอุณหภูมิ 10 Hz จาก ESP32 ผ่าน USB Serial คู่กับโมเดลตรวจจับความแห้งของพริกในปริภูมิสี CIE Lab',
      },
      year: '2026',
      disciplines: ['ESP32 WebSerial', 'CIE Lab Vision', 'Cascade Control'],
      href: 'https://github.com/marknatdev/ruts',
      external: true,
      previewType: 'ruts',
    },
    {
      id: 'mindfulbook',
      title: 'MindfulBook — Anti-Cyberbullying AI',
      description: {
        en: 'Interactive social media prototype built as an experimental testbed for an Anti-Cyberbullying AI tailored to Thai users, intervening before harmful posts go live.',
        th: 'ต้นแบบโซเชียลมีเดียสำหรับทดสอบ AI ป้องกันการกลั่นแกล้งทางไซเบอร์ ออกแบบเฉพาะสำหรับบริบทผู้ใช้ไทย',
      },
      year: '2025',
      disciplines: ['TypeScript', 'AI Moderation', 'Behavioral UX'],
      href: 'https://marknatdev.github.io/mindfulbook',
      external: true,
      previewType: 'mindfulbook',
    },
    {
      id: 'studyforge',
      title: 'StudyForge — AI Competition Study Planner',
      description: {
        en: 'Full-stack web application that converts competition syllabi and PDFs into personalized day-by-day preparation roadmaps using Next.js, Supabase, and OpenRouter.',
        th: 'เว็บแอปพลิเคชันที่แปลงไฟล์ PDF เนื้อหาสอบเป็นตารางเตรียมตัวแข่งขันรายวันด้วย AI พัฒนาด้วย Next.js, Supabase และ OpenRouter',
      },
      year: '2025',
      disciplines: ['Next.js', 'Supabase', 'OpenRouter LLM'],
      href: 'https://study-plan-ebon.vercel.app',
      external: true,
      previewType: 'studyforge',
    },
    {
      id: 'rotduam',
      title: 'Rot-Duam (รถด่วน) & MMC 2026 Modeling',
      description: {
        en: 'Door-to-door multimodal Thai transit planner in Flutter (BTS/MRT/SRT/bus) alongside Python projective homography & Shoelace land area modeling for MMC 2026.',
        th: 'แอปวางแผนเดินทางขนส่งสาธารณะไทยด้วย Flutter (BTS/MRT/SRT) และโปรแกรมคำนวณพื้นที่ด้วย Homography & Shoelace สำหรับการแข่งขัน MMC 2026',
      },
      year: '2026',
      disciplines: ['Flutter & Dart', 'OpenStreetMap', 'Math Modeling (MMC011)'],
      href: 'https://github.com/marknatdev/Rot-Duam',
      external: true,
      previewType: 'rotduam',
    },
  ];

  const achievements: Achievement[] = [
    {
      id: 'posn-camp1',
      featured: true,
      title: {
        en: 'POSN Computer Olympiad Camp 1',
        th: 'ค่าย 1 สอวน. คอมพิวเตอร์',
      },
      result: { en: 'Selected', th: 'ผ่านการคัดเลือก' },
      organizer: {
        en: 'POSN Foundation · Satree Phuket School',
        th: 'มูลนิธิ สอวน. · โรงเรียนสตรีภูเก็ต',
      },
      date: { en: '1–17 Oct 2026', th: '1–17 ต.ค. 2569' },
      detail: {
        en: '17 days of training in mathematics and C/C++ programming.',
        th: 'อบรมคณิตศาสตร์และการเขียนโปรแกรม C/C++ เป็นเวลา 17 วัน',
      },
    },
    {
      id: 'iot-nsw-2026',
      title: {
        en: 'IoT Invention & Innovation Contest',
        th: 'การประกวดสิ่งประดิษฐ์และนวัตกรรมด้าน IoT',
      },
      result: { en: 'Contestant', th: 'ผู้เข้าแข่งขัน' },
      organizer: {
        en: 'National Science Week 2026 · Suratthani Rajabhat University',
        th: 'สัปดาห์วิทยาศาสตร์แห่งชาติ 2569 · มหาวิทยาลัยราชภัฏสุราษฎร์ธานี',
      },
      date: { en: '18 Aug 2026', th: '18 ส.ค. 2569' },
      detail: {
        en: 'Entered "A Location-Tracking Safety Helmet with AI Emergency Alerts for Improved Safety" on behalf of Saparachinee Trang School.',
        th: 'ผลงาน "หมวกนิรภัยติดตามตำแหน่งพร้อมระบบแจ้งเตือนเหตุฉุกเฉินด้วย AI เพื่อยกระดับความปลอดภัย" ส่งในนามโรงเรียนสภาราชินี จังหวัดตรัง',
      },
    },
    {
      id: 'ysc-2027',
      title: {
        en: 'Young Scientist Competition (YSC) 2027',
        th: 'Young Scientist Competition (YSC) 2027',
      },
      result: { en: 'Proposal Round Qualifier', th: 'ผ่านรอบข้อเสนอโครงงาน' },
      organizer: { en: 'NSTDA', th: 'สวทช. (NSTDA)' },
      date: { en: 'Oct 2026', th: 'ต.ค. 2569' },
      detail: {
        en: 'Project proposal accepted; moving on to develop the project in the next round.',
        th: 'ข้อเสนอโครงงานผ่านการพิจารณา ได้ไปพัฒนาโครงงานต่อในรอบถัดไป',
      },
    },
  ];

  const renderAchievementPhoto = (a: Achievement, dark: boolean) =>
    a.image ? (
      <img
        src={a.image}
        alt={a.title[lang]}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    ) : (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-2 ${
          dark ? 'bg-[#22262d] text-[#a1a4aa]' : 'bg-muted text-muted-foreground'
        }`}
      >
        <Award className={`size-8 ${dark ? 'text-[#6b9bff]' : 'text-accent'}`} />
        <span className="px-3 text-center font-mono text-[10px] tracking-wide uppercase">
          {a.organizer[lang].split(' · ')[0]}
        </span>
      </div>
    );

  const featuredAchievement = achievements.find((a) => a.featured);
  const otherAchievements = achievements.filter((a) => !a.featured);

  const renderProjectPreview = (item: WorkItem) => {
    switch (item.previewType) {
      case 'helix':
        return (
          <div className="w-full h-full bg-[#191c21] text-[#fafaf9] p-6 sm:p-8 flex flex-col justify-between transition-transform duration-700 ease-out group-hover:scale-[1.03]">
            <div className="flex items-center justify-between font-mono text-[11px] text-[#fafaf9]/60">
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#1a5cdf] animate-pulse" />
                HELTEC WIFI LORA 32 V2 · 923MHz
              </span>
              <span>HLX-TRANG-01</span>
            </div>
            <div className="my-auto space-y-3">
              <div className="grid grid-cols-3 gap-2.5 font-mono">
                <div className="rounded-sm bg-white/5 border border-white/10 p-3">
                  <div className="text-[10px] text-white/50">LINK RSSI</div>
                  <div className="text-base sm:text-lg font-semibold text-white mt-0.5">-68 dBm</div>
                  <div className="text-[10px] text-[#5890ff]">SNR +9.5 dB</div>
                </div>
                <div className="rounded-sm bg-white/5 border border-white/10 p-3">
                  <div className="text-[10px] text-white/50">LIPO ADC</div>
                  <div className="text-base sm:text-lg font-semibold text-white mt-0.5">3.96 V</div>
                  <div className="text-[10px] text-emerald-400">86% NOMINAL</div>
                </div>
                <div className="rounded-sm bg-white/5 border border-white/10 p-3">
                  <div className="text-[10px] text-white/50">GPS LOCK</div>
                  <div className="text-xs sm:text-sm font-semibold text-white mt-1">7.5563° N</div>
                  <div className="text-[10px] text-white/60">99.6114° E</div>
                </div>
              </div>
              <div className="rounded-sm bg-white/5 border border-white/10 px-3.5 py-2.5 font-mono text-[11px] text-white/75 flex items-center justify-between">
                <span>sender.ino → 923MHz → receiver.ino → Firestore → Flutter</span>
                <Radio className="size-3.5 text-[#5890ff] shrink-0" />
              </div>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] text-white/50 pt-2 border-t border-white/10">
              <span>Click to launch live 923MHz packet simulator</span>
              <span className="text-white">INTERACTIVE ↘</span>
            </div>
          </div>
        );

      case 'fxcommand':
        return (
          <div className="w-full h-full bg-[#13161b] text-[#fafaf9] p-6 sm:p-8 flex flex-col justify-between transition-transform duration-700 ease-out group-hover:scale-[1.03]">
            <div className="flex items-center justify-between font-mono text-[11px] text-white/60">
              <span className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400" />
                MT5 EXECUTION ENGINE · 60× SIM
              </span>
              <span>XAUUSD · M15</span>
            </div>
            <div className="my-auto space-y-2.5 font-mono">
              <div className="rounded-sm bg-white/5 border border-white/10 p-3 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-emerald-400">CHAMPION · LIVE ACTIVE</div>
                  <div className="text-xs sm:text-sm font-medium text-white">
                    EMA Cross (9,21) + ATR×1.8 Stop
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-white">OOS 1.72</div>
                  <div className="text-[10px] text-white/50">68 Trades</div>
                </div>
              </div>
              <div className="rounded-sm bg-white/5 border border-white/10 p-3 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#5890ff]">CHALLENGER #1 · SHADOW ARENA</div>
                  <div className="text-xs sm:text-sm font-medium text-white">
                    Donchian(20) + ADX(14) Filter
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-emerald-400">OOS 1.94</div>
                  <div className="text-[10px] text-white/50">29/30 Guardrail</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] text-white/50 pt-2 border-t border-white/10">
              <span>6/6 Risk Gate Checks Passing · Kill Switch Armed</span>
              <ShieldCheck className="size-4 text-emerald-400" />
            </div>
          </div>
        );

      case 'ruts':
        return (
          <div className="w-full h-full bg-[#e6e4df] text-[#14161a] p-6 sm:p-8 flex flex-col justify-between transition-transform duration-700 ease-out group-hover:scale-[1.03]">
            <div className="flex items-center justify-between font-mono text-[11px] text-[#616368]">
              <span>ESP32 WEBSERIAL · 10 HZ STREAM</span>
              <span>CIE LAB VISION</span>
            </div>
            <div className="my-auto rounded-sm bg-[#fafaf9] border border-[#d5d4d1] p-4 space-y-3 shadow-sm">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-semibold">Cascade Damper Chamber</span>
                <span className="text-[#1a5cdf] font-semibold">64.2 °C</span>
              </div>
              <div className="h-12 flex items-end gap-1.5 pt-2">
                {[38, 45, 52, 58, 63, 68, 74, 79, 82, 85, 84, 86, 85, 87].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className="flex-1 bg-[#14161a]/80 rounded-t-[1px]"
                  />
                ))}
              </div>
              <div className="flex items-center justify-between font-mono text-[10px] text-[#616368] pt-1 border-t border-[#d5d4d1]">
                <span>L* 34.8 · a* 28.1 · b* 19.4</span>
                <span className="text-emerald-700 font-semibold">DONENESS: 94%</span>
              </div>
            </div>
            <div className="font-mono text-[11px] text-[#616368] flex justify-between">
              <span>Zero-dependency offline stage demo</span>
              <span>GITHUB ↗</span>
            </div>
          </div>
        );

      case 'mindfulbook':
        return (
          <div className="w-full h-full bg-[#dfe3ec] text-[#14161a] p-6 sm:p-8 flex flex-col justify-between transition-transform duration-700 ease-out group-hover:scale-[1.03]">
            <div className="flex items-center justify-between font-mono text-[11px] text-[#616368]">
              <span>MINDFUL CONNECT · AI SAFETY</span>
              <span>THAI NLP</span>
            </div>
            <div className="my-auto rounded-sm bg-[#fafaf9] border border-[#d5d4d1] p-4 space-y-2.5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-medium text-[#1a5cdf]">
                <Sparkles className="size-3.5" />
                <span>AI Empathy Nudge Triggered Before Post</span>
              </div>
              <p className="text-xs text-[#616368] leading-relaxed">
                “This comment may come across as hurtful. Would you like to rephrase it constructively before sharing?”
              </p>
              <div className="flex gap-2 pt-1 font-mono text-[10px]">
                <span className="px-2 py-1 rounded-sm bg-[#1a5cdf] text-white">Rephrase Kindly</span>
                <span className="px-2 py-1 rounded-sm bg-[#e4e3e0] text-[#14161a]">Edit Draft</span>
              </div>
            </div>
            <div className="font-mono text-[11px] text-[#616368] flex justify-between">
              <span>Live prototype on GitHub Pages</span>
              <span>LIVE DEMO ↗</span>
            </div>
          </div>
        );

      case 'studyforge':
        return (
          <div className="w-full h-full bg-[#e4e3e0] text-[#14161a] p-6 sm:p-8 flex flex-col justify-between transition-transform duration-700 ease-out group-hover:scale-[1.03]">
            <div className="flex items-center justify-between font-mono text-[11px] text-[#616368]">
              <span>STUDYFORGE · NEXT.JS + SUPABASE</span>
              <span>OPENROUTER AI</span>
            </div>
            <div className="my-auto rounded-sm bg-[#fafaf9] border border-[#d5d4d1] p-4 space-y-2 shadow-sm font-mono text-xs">
              <div className="flex justify-between text-[11px] text-[#616368] pb-1.5 border-b border-[#d5d4d1]">
                <span>SYLLABUS PDF → AI ROADMAP</span>
                <span className="text-[#1a5cdf]">DAY 01–14</span>
              </div>
              <div className="py-1 flex items-center justify-between">
                <span className="font-sans font-medium text-xs">POSN / Olympiad Graph Theory</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-[#e4e3e0] rounded-sm">2.5h</span>
              </div>
              <div className="py-1 flex items-center justify-between">
                <span className="font-sans font-medium text-xs">Dynamic Programming Practice</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-[#1a5cdf]/15 text-[#1a5cdf] rounded-sm">
                  DONE
                </span>
              </div>
            </div>
            <div className="font-mono text-[11px] text-[#616368] flex justify-between">
              <span>study-plan-ebon.vercel.app</span>
              <span>LIVE DEMO ↗</span>
            </div>
          </div>
        );

      case 'rotduam':
        return (
          <div className="w-full h-full bg-[#1d222b] text-[#fafaf9] p-6 sm:p-8 flex flex-col justify-between transition-transform duration-700 ease-out group-hover:scale-[1.03]">
            <div className="flex items-center justify-between font-mono text-[11px] text-white/60">
              <span>ROT-DUAM (รถด่วน) &amp; MMC 2026</span>
              <span>FLUTTER · PYTHON</span>
            </div>
            <div className="my-auto grid grid-cols-2 gap-3 font-mono">
              <div className="rounded-sm bg-white/5 border border-white/10 p-3.5 space-y-1.5">
                <Compass className="size-4 text-[#5890ff]" />
                <div className="text-xs font-medium text-white">BTS → MRT → SRT</div>
                <div className="text-[10px] text-white/60">
                  Door-to-door Bangkok multimodal transit routing
                </div>
              </div>
              <div className="rounded-sm bg-white/5 border border-white/10 p-3.5 space-y-1.5">
                <MapPin className="size-4 text-emerald-400" />
                <div className="text-xs font-medium text-white">Shoelace + Homography</div>
                <div className="text-[10px] text-white/60">
                  MMC 2569 1,600 sq.m perspective area solver
                </div>
              </div>
            </div>
            <div className="font-mono text-[11px] text-white/50 flex justify-between pt-2 border-t border-white/10">
              <span>OpenStreetMap Nominatim · OpenCV</span>
              <span className="text-white">GITHUB ↗</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        lang={lang}
        onToggleLang={setLang}
      />

      {/* ==========================================
          STICKY HEADER (exact folio-hazel-nu.vercel.app structure)
      ========================================== */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-2 items-center gap-4 px-5 py-4 md:grid-cols-4 md:px-8">
          <a href="#top" className="flex flex-col leading-tight">
            <span className="text-sm font-medium">Mark (marknatdev)</span>
            <span className="text-sm text-muted-foreground">
              {lang === 'en'
                ? 'Systems, IoT & Full-Stack Engineer'
                : 'วิศวกรรมสมองกลฝังตัว, อัลกอริทึม และซอฟต์แวร์'}
            </span>
          </a>

          <nav aria-label="Primary" className="col-span-2 hidden md:block">
            <ul className="flex gap-6 text-sm">
              <li>
                <a href="#achievements" className="transition-colors hover:text-accent">
                  {lang === 'en' ? 'Achievements' : 'ผลงานและรางวัล'}
                </a>
              </li>
              <li>
                <a href="#work" className="transition-colors hover:text-accent">
                  {lang === 'en' ? 'Work' : 'ผลงาน'}
                </a>
              </li>
              <li>
                <a href="#about" className="transition-colors hover:text-accent">
                  {lang === 'en' ? 'About' : 'เกี่ยวกับผม'}
                </a>
              </li>
              <li>
                <a href="#contact" className="transition-colors hover:text-accent">
                  {lang === 'en' ? 'Contact' : 'ติดต่อ'}
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-3 font-mono text-xs text-muted-foreground">
            <button
              onClick={() => setLang(lang === 'en' ? 'th' : 'en')}
              className="px-2 py-0.5 rounded-sm bg-secondary text-secondary-foreground hover:bg-accent hover:text-card transition-colors"
              title="Switch Language (EN / TH)"
            >
              {lang === 'en' ? 'EN / TH' : 'TH / EN'}
            </button>
            <button
              onClick={() => setCmdOpen(true)}
              className="hidden lg:inline-block px-2 py-0.5 rounded-sm border border-border hover:border-foreground text-muted-foreground hover:text-foreground transition-colors"
              title="Command Palette (Ctrl+K)"
            >
              Ctrl+K
            </button>
            <span className="hidden sm:inline">Trang, TH</span>
            <time>{localTime}</time>
          </div>
        </div>

        <nav aria-label="Primary mobile" className="border-t border-border/60 md:hidden">
          <ul className="flex gap-6 px-5 py-2 text-sm">
            <li>
              <a href="#achievements" className="transition-colors hover:text-accent">
                {lang === 'en' ? 'Awards' : 'รางวัล'}
              </a>
            </li>
            <li>
              <a href="#work" className="transition-colors hover:text-accent">
                {lang === 'en' ? 'Work' : 'ผลงาน'}
              </a>
            </li>
            <li>
              <a href="#about" className="transition-colors hover:text-accent">
                {lang === 'en' ? 'About' : 'เกี่ยวกับผม'}
              </a>
            </li>
            <li>
              <a href="#contact" className="transition-colors hover:text-accent">
                {lang === 'en' ? 'Contact' : 'ติดต่อ'}
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {/* ==========================================
            HERO SECTION (#top)
        ========================================== */}
        <section
          id="top"
          aria-labelledby="hero-title"
          className="mx-auto max-w-screen-2xl px-5 pt-16 pb-12 md:px-8 md:pt-28"
        >
          <h1
            id="hero-title"
            className="animate-rise text-[19vw] leading-[0.82] font-semibold tracking-[-0.06em] md:text-[15.5vw] 2xl:text-[238px]"
          >
            <span className="block">Mark</span>
            <span className="block text-right">
              Natdev<span className="text-accent">.</span>
            </span>
          </h1>

          <div
            className="animate-rise mt-12 grid gap-8 md:mt-20 md:grid-cols-4"
            style={{ animationDelay: '150ms' }}
          >
            <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
              (Intro)
            </p>

            <p className="max-w-2xl text-xl leading-snug text-pretty md:col-span-2 md:text-2xl">
              {lang === 'en'
                ? 'I’m a student developer at Saparachinee Trang School (Grade 11 / M.5) who engineers both the hardware and the code—turning complex ideas into 923MHz LoRa telemetry networks, autonomous trading engines, and considered software.'
                : 'ผมเป็นนักเรียนนักพัฒนาชั้น ม.5 โรงเรียนสภาราชินี จังหวัดตรัง ที่ลงมือสร้างทั้งฮาร์ดแวร์และซอฟต์แวร์ เปลี่ยนโจทย์ซับซ้อนให้กลายเป็นโครงข่ายสมองกลฝังตัว 923MHz LoRa, เอ็นจิ้นเทรดอัตโนมัติเชิงปริมาณ และแอปพลิเคชันที่ใช้งานได้จริง'}
            </p>

            <div className="flex flex-col items-start gap-4 md:items-end">
              <p className="flex items-center gap-2 text-sm">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                {lang === 'en'
                  ? 'Grade 11 (M.5) · Open to collaboration'
                  : 'ม.5 ร.ร.สภาราชินี จ.ตรัง · พร้อมร่วมพัฒนาโปรเจกต์'}
              </p>

              <a
                href="#achievements"
                className="group inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
              >
                <span>{lang === 'en' ? 'See achievements' : 'ดูผลงานและการคัดเลือก'}</span>
                <ArrowDownRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ==========================================
            ACHIEVEMENTS SECTION (#achievements)
        ========================================== */}
        <section
          id="achievements"
          aria-labelledby="achievements-title"
          className="mx-auto max-w-screen-2xl scroll-mt-24 px-5 py-16 md:px-8 md:py-24"
        >
          <div className="flex items-baseline justify-between border-t border-foreground pt-4">
            <h2 id="achievements-title" className="text-sm font-medium">
              {lang === 'en' ? 'Achievements' : 'ผลงานและการคัดเลือก (Achievements)'}
            </h2>
            <span className="font-mono text-xs text-muted-foreground">
              {achievements.length} {lang === 'en' ? 'entries' : 'รายการ'}
            </span>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-6">
            {featuredAchievement && (
              <article className="flex flex-col overflow-hidden rounded-sm bg-[#191c21] text-[#fafaf9]">
                <div className="aspect-[16/10] overflow-hidden">
                  {renderAchievementPhoto(featuredAchievement, true)}
                </div>

                <div className="flex flex-col gap-4 p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4 font-mono text-xs text-[#a1a4aa]">
                    <span className="inline-flex items-center gap-2 uppercase tracking-wide">
                      <Award className="size-4 text-[#6b9bff]" />
                      {lang === 'en' ? 'Main award' : 'ผลงานหลัก'}
                    </span>
                    <span className="shrink-0">{featuredAchievement.date[lang]}</span>
                  </div>
                  <span className="w-fit rounded-sm bg-[#6b9bff] px-2 py-1 text-xs font-medium text-[#14161a]">
                    {featuredAchievement.result[lang]}
                  </span>
                  <h3 className="text-2xl leading-tight font-medium text-balance sm:text-3xl">
                    {featuredAchievement.title[lang]}
                  </h3>
                  <p className="text-sm text-[#a1a4aa]">{featuredAchievement.organizer[lang]}</p>
                  <p className="max-w-xl leading-relaxed text-pretty">
                    {featuredAchievement.detail[lang]}
                  </p>
                </div>
              </article>
            )}

            <ol className="flex flex-col">
              {otherAchievements.map((a) => (
                <li
                  key={a.id}
                  className="grid grid-cols-[7rem_1fr] gap-4 border-t border-border py-5 sm:grid-cols-[11rem_1fr] sm:gap-6"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-sm border border-border/80">
                    {renderAchievementPhoto(a, false)}
                  </div>
                  <span className="flex flex-col gap-1">
                    <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <span className="text-xs font-medium text-accent">{a.result[lang]}</span>
                      <span className="font-mono text-xs text-muted-foreground">{a.date[lang]}</span>
                    </span>
                    <span className="font-medium">{a.title[lang]}</span>
                    <span className="text-sm text-muted-foreground">{a.organizer[lang]}</span>
                    <span className="mt-1 leading-relaxed text-pretty text-muted-foreground">
                      {a.detail[lang]}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ==========================================
            SELECTED WORK SECTION (#work)
        ========================================== */}
        <section
          id="work"
          aria-labelledby="work-title"
          className="mx-auto max-w-screen-2xl scroll-mt-24 px-5 py-16 md:px-8 md:py-24"
        >
          <div className="flex items-baseline justify-between border-t border-foreground pt-4">
            <h2 id="work-title" className="text-sm font-medium">
              {lang === 'en' ? 'Selected work' : 'ผลงานที่คัดสรร (Selected work)'}
            </h2>
            <span className="font-mono text-xs text-muted-foreground">
              {selectedWorks.length} projects
            </span>
          </div>

          <ul className="mt-10 grid gap-x-6 gap-y-14 md:grid-cols-2">
            {selectedWorks.map((item, idx) => (
              <li key={item.id} className={idx % 2 === 1 ? 'md:mt-24' : ''}>
                <a
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer' : undefined}
                  className="group flex flex-col gap-4"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted border border-border/80">
                    {renderProjectPreview(item)}
                    <span className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-card text-card-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-6">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg font-medium transition-colors group-hover:text-accent">
                        {item.title}
                      </h3>
                      <p className="leading-relaxed text-pretty text-muted-foreground">
                        {item.description[lang]}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground shrink-0">
                      {item.year}
                    </span>
                  </div>

                  <ul className="flex flex-wrap gap-1.5" aria-label="Disciplines">
                    {item.disciplines.map((d) => (
                      <li
                        key={d}
                        className="rounded-sm bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ==========================================
            ABOUT SECTION (#about — exact folio-hazel-nu.vercel.app layout)
        ========================================== */}
        <section
          id="about"
          aria-labelledby="about-title"
          className="mx-auto max-w-screen-2xl scroll-mt-24 px-5 py-16 md:px-8 md:py-24"
        >
          <div className="flex items-baseline justify-between border-t border-foreground pt-4">
            <h2 id="about-title" className="text-sm font-medium">
              {lang === 'en' ? 'About' : 'เกี่ยวกับผม (About)'}
            </h2>
            <span className="font-mono text-xs text-muted-foreground">
              Saparachinee Trang School · Grade 11 (M.5)
            </span>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-4 md:gap-6">
            {/* Grayscale Portrait Box */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted md:col-span-1 border border-border">
              <img
                src={PROFILE_LINKS.avatar}
                alt="Mark (marknatdev)"
                loading="lazy"
                className="h-full w-full object-cover grayscale contrast-110"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-4 text-white font-mono text-xs">
                <div>@marknatdev</div>
                <div className="text-white/70 text-[11px]">Trang, Thailand</div>
              </div>
            </div>

            <div className="flex flex-col gap-12 md:col-span-3 md:pl-6">
              <p className="max-w-3xl text-2xl leading-snug text-pretty md:text-3xl">
                {lang === 'en'
                  ? 'Building hardware and software side-by-side taught me that the most reliable systems are designed end-to-end—from soldering 923MHz LoRa transceivers in C++ to architecting cloud pipelines and fault-tolerant Python engines.'
                  : 'การได้ลงมือสร้างทั้งฮาร์ดแวร์และซอฟต์แวร์ควบคู่กัน ทำให้ผมเชื่อว่าระบบที่เสถียรที่สุดต้องถูกออกแบบอย่างเข้าใจตั้งแต่ต้นน้ำถึงปลายน้ำ ตั้งแต่การเขียนเฟิร์มแวร์ C++ บนไมโครคอนโทรลเลอร์ ไปจนถึงระบบคลาวด์และอัลกอริทึม'}
              </p>

              <div className="grid gap-10 lg:grid-cols-2">
                {/* What I do */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                    {lang === 'en' ? 'What I do' : 'ความเชี่ยวชาญหลัก'}
                  </h3>

                  <dl className="flex flex-col">
                    <div className="flex flex-col gap-1 border-t border-border py-4">
                      <dt className="font-medium">
                        {lang === 'en'
                          ? 'Embedded & 923MHz LoRa IoT'
                          : 'ระบบสมองกลฝังตัวและเครือข่าย LoRa IoT'}
                      </dt>
                      <dd className="leading-relaxed text-muted-foreground">
                        {lang === 'en'
                          ? 'Heltec ESP32 V2 firmware in C++, SX1276 923MHz point-to-point radio links, u-blox GPS UART, OLED HUDs, and WebSerial telemetry.'
                          : 'พัฒนาเฟิร์มแวร์ C++ บนบอร์ด ESP32, สื่อสารไร้สายระยะไกล SX1276 923MHz LoRa, พิกัด GPS UART และการอ่านค่าเซนเซอร์ความถี่สูง'}
                      </dd>
                    </div>

                    <div className="flex flex-col gap-1 border-t border-border py-4">
                      <dt className="font-medium">
                        {lang === 'en'
                          ? 'Quantitative & Algorithmic Systems'
                          : 'ระบบอัลกอริทึมและการคำนวณเชิงปริมาณ'}
                      </dt>
                      <dd className="leading-relaxed text-muted-foreground">
                        {lang === 'en'
                          ? 'Multi-symbol MetaTrader 5 execution engines in Python, deterministic 6-layer pre-trade risk gates, and walk-forward shadow arenas.'
                          : 'ออกแบบเอ็นจิ้นส่งคำสั่งเทรดอัตโนมัติด้วย Python เชื่อมต่อ MT5, ด่านตรวจสอบความเสี่ยง 6 ชั้น และสนามประลองกลยุทธ์ Walk-Forward'}
                      </dd>
                    </div>

                    <div className="flex flex-col gap-1 border-t border-border py-4">
                      <dt className="font-medium">
                        {lang === 'en'
                          ? 'Full-Stack & Cross-Platform Engineering'
                          : 'การพัฒนาเว็บและแอปพลิเคชันข้ามแพลตฟอร์ม'}
                      </dt>
                      <dd className="leading-relaxed text-muted-foreground">
                        {lang === 'en'
                          ? 'Production Flutter & Dart command centers, React and Next.js web applications, Firebase Cloud Functions, Firestore, and Supabase.'
                          : 'สร้างแดชบอร์ดและแอปมือถือด้วย Flutter/Dart, เว็บแอป React/Next.js, Firebase Cloud Functions, Firestore และ Supabase'}
                      </dd>
                    </div>

                    <div className="flex flex-col gap-1 border-t border-border py-4">
                      <dt className="font-medium">
                        {lang === 'en'
                          ? 'Computer Vision & Applied AI'
                          : 'คอมพิวเตอร์วิทัศน์และปัญญาประดิษฐ์ประยุกต์'}
                      </dt>
                      <dd className="leading-relaxed text-muted-foreground">
                        {lang === 'en'
                          ? 'CIE Lab color-space vision, 4-point projective homography (MMC 2026), NLP toxicity moderation, and MCP servers for AI agents.'
                          : 'วิเคราะห์ภาพในปริภูมิสี CIE Lab, การแปลงเรขาคณิตภาพ Homography, โมเดล AI คัดกรองข้อความ และ MCP Server สำหรับ AI Agent'}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Education & Milestones */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                    {lang === 'en'
                      ? 'Education & Milestones (TCAS)'
                      : 'การศึกษาและผลงานการแข่งขัน (TCAS)'}
                  </h3>

                  <ol className="flex flex-col">
                    <li className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-border py-4 sm:grid-cols-[9rem_1fr]">
                      <span className="font-mono text-xs leading-6 text-muted-foreground">
                        2025 - Now
                      </span>
                      <span className="flex flex-col">
                        <span className="font-medium">
                          {lang === 'en'
                            ? 'Saparachinee Trang School'
                            : 'โรงเรียนสภาราชินี จังหวัดตรัง'}
                        </span>
                        <span className="text-muted-foreground">
                          {lang === 'en'
                            ? 'Grade 11 (Mattayom 5) · Student Developer'
                            : 'มัธยมศึกษาปีที่ 5 (Grade 11) · นักเรียนนักพัฒนา'}
                        </span>
                      </span>
                    </li>

                    <li className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-border py-4 sm:grid-cols-[9rem_1fr]">
                      <span className="font-mono text-xs leading-6 text-muted-foreground">
                        2026
                      </span>
                      <span className="flex flex-col">
                        <span className="font-medium">HELIX &amp; FXCommand</span>
                        <span className="text-muted-foreground">
                          {lang === 'en'
                            ? 'Lead Architect · 923MHz LoRa Fleet & MT5 Quant Engine'
                            : 'ผู้พัฒนาหลัก · ระบบหมวกกันน็อก LoRa และระบบเทรด MT5'}
                        </span>
                      </span>
                    </li>

                    <li className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-border py-4 sm:grid-cols-[9rem_1fr]">
                      <span className="font-mono text-xs leading-6 text-muted-foreground">
                        2026
                      </span>
                      <span className="flex flex-col">
                        <span className="font-medium">MMC 2026 (MMC 2569)</span>
                        <span className="text-muted-foreground">
                          {lang === 'en'
                            ? 'Mathematical Modeling Challenge · Homography & Shoelace CV'
                            : 'การแข่งขัน Mathematical Modeling Challenges 2026 (MMC011)'}
                        </span>
                      </span>
                    </li>

                    <li className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-border py-4 sm:grid-cols-[9rem_1fr]">
                      <span className="font-mono text-xs leading-6 text-muted-foreground">
                        2026
                      </span>
                      <span className="flex flex-col">
                        <span className="font-medium">RUTS Stage Engineering Demo</span>
                        <span className="text-muted-foreground">
                          {lang === 'en'
                            ? '10Hz ESP32 Cascade Damper & CIE Lab Chilli Vision'
                            : 'ระบบควบคุมอุณหภูมิ ESP32 10Hz และตรวจจับสีพริกแห้ง'}
                        </span>
                      </span>
                    </li>

                    <li className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-border py-4 sm:grid-cols-[9rem_1fr]">
                      <span className="font-mono text-xs leading-6 text-muted-foreground">
                        2025 - 2026
                      </span>
                      <span className="flex flex-col">
                        <span className="font-medium">
                          MindfulBook, StudyForge &amp; Rescue-Boat
                        </span>
                        <span className="text-muted-foreground">
                          {lang === 'en'
                            ? 'Anti-Cyberbullying AI, LLM Study Planner & Marine Robotics'
                            : 'แพลตฟอร์ม AI เพื่อสังคม, ระบบจัดตารางสอบ และต้นแบบเรือกู้ภัย'}
                        </span>
                      </span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            CONTACT SECTION (#contact — exact folio-hazel-nu.vercel.app layout)
        ========================================== */}
        <section
          id="contact"
          aria-labelledby="contact-title"
          className="mx-auto max-w-screen-2xl scroll-mt-24 px-5 pt-16 md:px-8 md:py-24"
        >
          <div className="flex items-baseline justify-between border-t border-foreground pt-4">
            <h2 id="contact-title" className="text-sm font-medium">
              {lang === 'en' ? 'Contact' : 'ติดต่อ (Contact)'}
            </h2>
            <span className="font-mono text-xs text-muted-foreground">Trang, Thailand</span>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-4 md:gap-6">
            <p className="max-w-xl text-2xl leading-snug text-pretty md:col-span-2 md:text-3xl">
              {lang === 'en'
                ? 'Have a hardware or software project in mind, reviewing my academic portfolio, or just want to say hi? I’m always happy to chat.'
                : 'สนใจร่วมพัฒนาโปรเจกต์ฮาร์ดแวร์/ซอฟต์แวร์ พิจารณาแฟ้มสะสมผลงาน (TCAS) หรือต้องการพูดคุยแลกเปลี่ยน สามารถติดต่อผมได้เสมอครับ'}
            </p>

            <div className="flex flex-col gap-8 md:col-span-2">
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${PROFILE_LINKS.email}`}
                  className="group inline-flex w-fit items-center gap-2 text-xl font-medium tracking-tight break-all transition-colors hover:text-accent sm:text-2xl md:text-3xl"
                >
                  <span>{PROFILE_LINKS.email}</span>
                  <ArrowUpRight className="size-6 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="size-4 text-accent" />
                      <span aria-live="polite" className="text-accent font-medium">
                        {lang === 'en' ? 'Copied to clipboard' : 'คัดลอกอีเมลแล้ว'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-4" />
                      <span aria-live="polite">
                        {lang === 'en' ? 'Copy email' : 'คัดลอกอีเมล'}
                      </span>
                    </>
                  )}
                </button>
              </div>

              <ul className="grid grid-cols-2 border-t border-border sm:grid-cols-4">
                <li>
                  <a
                    href={PROFILE_LINKS.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-2 py-4 pr-4 text-sm transition-colors hover:text-accent"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href={PROFILE_LINKS.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-2 py-4 pr-4 text-sm transition-colors hover:text-accent"
                  >
                    <span>Instagram</span>
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href={PROFILE_LINKS.kofi}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-2 py-4 pr-4 text-sm transition-colors hover:text-accent"
                  >
                    <span>Ko-fi</span>
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/marknatdev?tab=repositories"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-2 py-4 pr-4 text-sm transition-colors hover:text-accent"
                  >
                    <span>All Repos</span>
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* ==========================================
          FOOTER (exact folio-hazel-nu.vercel.app structure)
      ========================================== */}
      <footer className="mx-auto mt-24 max-w-screen-2xl px-5 pb-8 md:px-8">
        <div className="flex flex-col gap-2 border-t border-border pt-6 font-mono text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <span>© 2026 Mark (marknatdev)</span>
          <span>Saparachinee Trang School (M.5) · Trang, Thailand</span>
          <a href="#top" className="transition-colors hover:text-accent">
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
