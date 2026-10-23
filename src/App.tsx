import React, { useState, useEffect } from 'react';
import {
  Mail,
  MapPin,
  GraduationCap,
  Github,
  Instagram,
  Coffee,
  ChevronDown,
  ChevronUp,
  Cpu,
  TrendingUp,
  Smartphone,
  Sparkles,
  BookOpen,
  Briefcase,
  Eye,
  ExternalLink,
  Send,
  Copy,
  Check,
  Globe,
  Terminal as TerminalIcon,
  Radio,
  ShieldCheck,
  X,
  FolderGit2,
} from 'lucide-react';
import {
  Language,
  OTHER_PROJECTS,
  PROFILE_LINKS,
  UI_COPY,
} from './data/portfolioData';
import { HelixSimulator } from './components/HelixSimulator';
import { FxCommandSimulator } from './components/FxCommandSimulator';
import { TerminalWidget } from './components/TerminalWidget';
import { CommandPalette, VCardPage } from './components/CommandPalette';

interface PortfolioCardItem {
  id: string;
  title: string;
  category: 'Flagships' | 'IoT / Hardware' | 'AI / Web' | 'Mobile / Flutter' | 'Math / CV';
  subtitle: string;
  summary: string;
  highlights: string[];
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  hasSimulator?: 'helix' | 'fxcommand';
  accentGrad: string;
  iconType: 'helix' | 'fx' | 'iot' | 'ai' | 'mobile' | 'math';
}

export function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activePage, setActivePage] = useState<VCardPage>('about');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [cmdOpen, setCmdOpen] = useState<boolean>(false);
  const [portfolioFilter, setPortfolioFilter] = useState<string>('All');
  const [selectedModalProject, setSelectedModalProject] = useState<PortfolioCardItem | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [publicReposCount, setPublicReposCount] = useState<number>(16);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const t = UI_COPY[lang];

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

  useEffect(() => {
    fetch('https://api.github.com/users/marknatdev')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && typeof d.public_repos === 'number') {
          setPublicReposCount(d.public_repos);
        }
      })
      .catch(() => {});
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(PROFILE_LINKS.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Unified portfolio items (2 Flagships + 6 Other Projects)
  const allPortfolioItems: PortfolioCardItem[] = [
    {
      id: 'helix',
      title: 'HELIX — Smart Helmet LoRa & Command Center',
      category: 'Flagships',
      subtitle:
        lang === 'en'
          ? '923MHz LoRa (Heltec ESP32 V2) + Firebase + Flutter Fleet App'
          : 'ระบบหมวกกันน็อกอัจฉริยะ 923MHz LoRa + Firebase + Flutter',
      summary: t.flagships.helix.summary,
      highlights: t.flagships.helix.bullets,
      tags: ['ESP32', 'SX1276 923MHz LoRa', 'C++', 'Firebase', 'Firestore', 'Flutter'],
      githubUrl: 'https://github.com/marknatdev/helix',
      hasSimulator: 'helix',
      accentGrad: 'from-amber-500/30 via-orange-500/10 to-[#1e1e1f]',
      iconType: 'helix',
    },
    {
      id: 'fxcommand',
      title: 'FXCommand — Autonomous MT5 Engine & Arena',
      category: 'Flagships',
      subtitle:
        lang === 'en'
          ? 'Multi-Symbol Quantitative Engine · 6-Layer Risk Gate · Walk-Forward Arena'
          : 'ระบบเทรดอัตโนมัติหลายสินทรัพย์ · Risk Gate 6 ชั้น · สนามประลองกลยุทธ์',
      summary: t.flagships.fxcommand.summary,
      highlights: t.flagships.fxcommand.bullets,
      tags: ['Python', 'MetaTrader 5', 'Walk-Forward ML', 'Risk Gate', 'MCP Server', 'Playwright'],
      githubUrl: 'https://github.com/marknatdev/fxcommand',
      hasSimulator: 'fxcommand',
      accentGrad: 'from-yellow-500/30 via-amber-500/10 to-[#1e1e1f]',
      iconType: 'fx',
    },
    ...OTHER_PROJECTS.map((p): PortfolioCardItem => ({
      id: p.id,
      title: p.name,
      category: p.category,
      subtitle: p.badge[lang],
      summary: p.summary[lang],
      highlights: p.highlights[lang],
      tags: p.tags,
      githubUrl: p.githubUrl,
      liveUrl: p.liveUrl,
      accentGrad:
        p.category === 'IoT / Hardware'
          ? 'from-amber-500/20 via-stone-800/40 to-[#1e1e1f]'
          : p.category === 'AI / Web'
          ? 'from-yellow-500/20 via-neutral-800/40 to-[#1e1e1f]'
          : p.category === 'Mobile / Flutter'
          ? 'from-orange-500/20 via-stone-800/40 to-[#1e1e1f]'
          : 'from-amber-400/20 via-zinc-800/40 to-[#1e1e1f]',
      iconType:
        p.category === 'IoT / Hardware'
          ? 'iot'
          : p.category === 'AI / Web'
          ? 'ai'
          : p.category === 'Mobile / Flutter'
          ? 'mobile'
          : 'math',
    })),
  ];

  const filterCategories = [
    'All',
    'Flagships',
    'IoT / Hardware',
    'AI / Web',
    'Mobile / Flutter',
    'Math / CV',
  ];

  const filteredPortfolio =
    portfolioFilter === 'All'
      ? allPortfolioItems
      : allPortfolioItems.filter((item) => item.category === portfolioFilter);

  const skillsData = [
    {
      name: lang === 'en' ? 'Embedded C/C++, ESP32 & 923MHz LoRa (SX1276)' : 'สมองกลฝังตัว C/C++, ESP32 และคลื่น 923MHz LoRa',
      pct: 92,
    },
    {
      name: lang === 'en' ? 'Python, FastAPI & Quantitative Trading Engines (MT5)' : 'Python, FastAPI และเอ็นจิ้นอัลกอริทึมเทรดอัตโนมัติ',
      pct: 90,
    },
    {
      name: lang === 'en' ? 'Flutter & Dart Cross-Platform Applications' : 'การพัฒนาแอปพลิเคชันข้ามแพลตฟอร์มด้วย Flutter & Dart',
      pct: 88,
    },
    {
      name: lang === 'en' ? 'TypeScript, React 18, Next.js & Tailwind CSS' : 'การพัฒนาเว็บ Full-Stack (TypeScript, React, Next.js)',
      pct: 86,
    },
    {
      name: lang === 'en' ? 'Computer Vision (CIE Lab / Homography) & Applied AI' : 'คอมพิวเตอร์วิทัศน์ (CIE Lab / Homography) และ AI ประยุกต์',
      pct: 85,
    },
    {
      name: lang === 'en' ? 'Firebase Cloud Functions, Firestore & Supabase' : 'ระบบคลาวด์และฐานข้อมูล (Firebase, Firestore, Supabase)',
      pct: 85,
    },
  ];

  const serviceIcons = [Cpu, TrendingUp, Smartphone, Sparkles];

  const navItems: { id: VCardPage; label: string }[] = [
    { id: 'about', label: lang === 'en' ? 'About' : 'เกี่ยวกับฉัน' },
    { id: 'resume', label: lang === 'en' ? 'Resume' : 'ประวัติ & TCAS' },
    { id: 'portfolio', label: lang === 'en' ? 'Portfolio' : 'ผลงาน' },
    { id: 'lab', label: lang === 'en' ? 'Simulators' : 'จำลองระบบ' },
    { id: 'contact', label: lang === 'en' ? 'Contact' : 'ติดต่อ' },
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-[#d6d6d6] py-4 sm:py-12 px-3 sm:px-6 pb-24 lg:pb-16">
      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        lang={lang}
        onToggleLang={setLang}
        onSelectPage={(p) => {
          setActivePage(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Project Detail Modal (vCard style) */}
      {selectedModalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedModalProject(null)}
        >
          <div
            className="w-full max-w-2xl rounded-[20px] border border-[#383838] bg-[#1e1e1f] p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="vcard-icon-box !w-12 !h-12">
                  {selectedModalProject.iconType === 'helix' ||
                  selectedModalProject.iconType === 'iot' ? (
                    <Radio className="w-6 h-6" />
                  ) : selectedModalProject.iconType === 'fx' ? (
                    <ShieldCheck className="w-6 h-6" />
                  ) : (
                    <FolderGit2 className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-[#ffdb70]">
                    {selectedModalProject.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#fafafa]">
                    {selectedModalProject.title}
                  </h3>
                  <p className="text-xs text-[#d6d6d6]/70 mt-0.5">
                    {selectedModalProject.subtitle}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedModalProject(null)}
                className="w-8 h-8 rounded-lg bg-[#2b2b2c] text-[#fafafa] flex items-center justify-center opacity-80 hover:opacity-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="vcard-separator !my-3" />

            <p className="text-sm text-[#d6d6d6] leading-relaxed font-light">
              {selectedModalProject.summary}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#ffdb70]">
                {lang === 'en' ? 'Architectural Highlights' : 'จุดเด่นเชิงวิศวกรรม'}
              </h4>
              <ul className="space-y-2">
                {selectedModalProject.highlights.map((h, i) => (
                  <li key={i} className="text-xs sm:text-sm text-[#d6d6d6] font-light flex gap-2.5">
                    <span className="text-[#ffdb70] mt-0.5">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedModalProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[#2b2b2c] text-[#ffdb70] border border-[#383838]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-[#383838]">
              {selectedModalProject.hasSimulator && (
                <button
                  onClick={() => {
                    setSelectedModalProject(null);
                    setActivePage('lab');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="vcard-btn !text-xs"
                >
                  <Cpu className="w-4 h-4" />
                  <span>
                    {lang === 'en' ? 'Launch Interactive Simulator' : 'เปิดระบบจำลองแบบโต้ตอบ'}
                  </span>
                </button>
              )}

              {selectedModalProject.liveUrl && (
                <a
                  href={selectedModalProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="vcard-btn !text-xs"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Live Demo' : 'ทดลองใช้งานจริง'}</span>
                </a>
              )}

              <a
                href={selectedModalProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="vcard-btn !text-xs"
              >
                <Github className="w-4 h-4" />
                <span>{lang === 'en' ? 'View Repository' : 'ดูซอร์สโค้ดบน GitHub'}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MAIN VCARD LAYOUT (@codewithsadee/vcard-personal-portfolio) */}
      <main className="vcard-main max-w-[1200px] mx-auto">
        {/* ==========================================
            #SIDEBAR (LEFT VCARD)
        ========================================== */}
        <aside className="vcard-sidebar mb-4 xl:mb-0 relative">
          <div className="flex xl:flex-col items-center gap-4 sm:gap-6 relative">
            {/* Avatar Box */}
            <figure
              className="rounded-[20px] sm:rounded-[30px] p-1.5 shrink-0 relative"
              style={{ background: 'var(--bg-gradient-onyx)' }}
            >
              <img
                src={PROFILE_LINKS.avatar}
                alt="Mark (marknatdev)"
                className="w-20 h-20 sm:w-28 sm:h-28 xl:w-[140px] xl:h-[140px] rounded-[16px] sm:rounded-[24px] object-cover"
              />
              <span
                title="Available for collaboration"
                className="absolute bottom-2 right-2 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-4 ring-[#1e1e1f]"
              />
            </figure>

            {/* Name & Title Pill */}
            <div className="xl:text-center">
              <h1
                className="text-[#fafafa] text-lg sm:text-2xl font-medium tracking-tight mb-2"
                title="Mark (marknatdev)"
              >
                Mark <span className="text-[#ffdb70] font-normal text-base">(@marknatdev)</span>
              </h1>
              <p className="text-white bg-[#2b2b2c] text-[11px] sm:text-xs font-light px-3.5 py-1.5 rounded-lg w-max xl:mx-auto border border-[#383838]">
                {lang === 'en'
                  ? 'Full-Stack & LoRa IoT Developer'
                  : 'นักพัฒนา Full-Stack & สมองกลฝังตัว'}
              </p>
            </div>

            {/* Mobile/Tablet Show Contacts Button */}
            <button
              onClick={() => setSidebarOpen((o) => !o)}
              className="vcard-info-more-btn"
              aria-label="Show Contacts"
            >
              <span className="hidden sm:inline text-xs">
                {sidebarOpen
                  ? lang === 'en'
                    ? 'Hide Contacts'
                    : 'ซ่อนข้อมูลติดต่อ'
                  : lang === 'en'
                  ? 'Show Contacts'
                  : 'แสดงข้อมูลติดต่อ'}
              </span>
              {sidebarOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Collapsible Contact & Social Info (Always visible on >=1250px xl) */}
          <div
            className={`${
              sidebarOpen ? 'block' : 'hidden'
            } xl:block transition-all duration-300`}
          >
            <div className="vcard-separator" />

            {/* Contacts List */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
              <li className="flex items-center gap-4">
                <div className="vcard-icon-box">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase text-[#d6d6d6]/70">
                    {lang === 'en' ? 'Email' : 'อีเมล'}
                  </p>
                  <button
                    onClick={handleCopyEmail}
                    className="text-xs sm:text-sm text-[#fafafa] hover:text-[#ffdb70] truncate block text-left w-full transition"
                    title={PROFILE_LINKS.email}
                  >
                    {copiedEmail ? '✓ Copied!' : PROFILE_LINKS.email}
                  </button>
                </div>
              </li>

              <li className="flex items-center gap-4">
                <div className="vcard-icon-box">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase text-[#d6d6d6]/70">
                    {lang === 'en' ? 'School & Grade' : 'โรงเรียนและระดับชั้น'}
                  </p>
                  <p className="text-xs sm:text-sm text-[#fafafa] truncate">
                    {lang === 'en'
                      ? 'Saparachinee Trang (M.5)'
                      : 'ร.ร.สภาราชินี จ.ตรัง (ม.5)'}
                  </p>
                </div>
              </li>

              <li className="flex items-center gap-4">
                <div className="vcard-icon-box">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase text-[#d6d6d6]/70">
                    {lang === 'en' ? 'Location' : 'ที่อยู่'}
                  </p>
                  <address className="text-xs sm:text-sm text-[#fafafa] not-italic truncate">
                    {lang === 'en' ? 'Trang, Thailand' : 'จังหวัดตรัง, ประเทศไทย'}
                  </address>
                </div>
              </li>

              <li className="flex items-center gap-4">
                <div className="vcard-icon-box">
                  <FolderGit2 className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase text-[#d6d6d6]/70">GitHub</p>
                  <a
                    href={PROFILE_LINKS.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs sm:text-sm text-[#fafafa] hover:text-[#ffdb70] truncate block transition"
                  >
                    @marknatdev ({publicReposCount} repos)
                  </a>
                </div>
              </li>
            </ul>

            <div className="vcard-separator" />

            {/* Language & Command Palette Controls inside Sidebar */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <button
                onClick={() => setLang(lang === 'en' ? 'th' : 'en')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2b2b2c] border border-[#383838] hover:border-[#ffdb70]/50 text-xs font-medium text-[#fafafa] transition"
              >
                <Globe className="w-3.5 h-3.5 text-[#ffdb70]" />
                <span className={lang === 'en' ? 'text-[#ffdb70] font-semibold' : 'text-[#d6d6d6]/70'}>
                  EN
                </span>
                <span className="text-[#d6d6d6]/40">/</span>
                <span className={lang === 'th' ? 'text-[#ffdb70] font-semibold' : 'text-[#d6d6d6]/70'}>
                  TH
                </span>
              </button>

              <button
                onClick={() => setCmdOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2b2b2c] border border-[#383838] hover:border-[#ffdb70]/50 text-xs font-mono text-[#d6d6d6] hover:text-[#ffdb70] transition"
              >
                <span>Ctrl+K</span>
              </button>
            </div>

            {/* Social Icons */}
            <ul className="flex items-center justify-center gap-4">
              <li>
                <a
                  href={PROFILE_LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#d6d6d6]/70 hover:text-[#ffdb70] transition"
                  title="GitHub (@marknatdev)"
                >
                  <Github className="w-4 h-4" />
                </a>
              </li>
              <li>
                <a
                  href={PROFILE_LINKS.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#d6d6d6]/70 hover:text-[#ffdb70] transition"
                  title="Instagram (@mxrk._nat)"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PROFILE_LINKS.email}`}
                  className="text-[#d6d6d6]/70 hover:text-[#ffdb70] transition"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </li>
              <li>
                <a
                  href={PROFILE_LINKS.kofi}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#d6d6d6]/70 hover:text-[#ffdb70] transition"
                  title="Ko-fi (mxrk_nat)"
                >
                  <Coffee className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>
        </aside>

        {/* ==========================================
            #MAIN-CONTENT (RIGHT VCARD CONTAINER)
        ========================================== */}
        <div className="vcard-main-content relative">
          {/* #NAVBAR (Top-right rounded tab bar on desktop, fixed bottom bar on mobile) */}
          <nav className="vcard-navbar">
            <ul className="flex flex-wrap justify-center items-center gap-1 sm:gap-5 px-2 sm:px-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActivePage(item.id)}
                    className={`py-3.5 sm:py-4 px-2.5 sm:px-3 text-xs sm:text-[15px] font-medium transition ${
                      activePage === item.id
                        ? 'text-[#ffdb70]'
                        : 'text-[#d6d6d6] hover:text-[#d6d6d6]/70'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* ==========================================
              TAB 1: #ABOUT
          ========================================== */}
          {activePage === 'about' && (
            <article className="vcard-article">
              <header>
                <h2 className="vcard-article-title">
                  {lang === 'en' ? 'About Me' : 'เกี่ยวกับผม (About Me)'}
                </h2>
              </header>

              <section className="text-[#d6d6d6] text-sm sm:text-[15px] font-light leading-relaxed space-y-4 mb-9">
                <p>{t.hero.subheadline}</p>
                <p>{t.bento.academicBio}</p>
              </section>

              {/* What I'm Doing (2x2 vCard Service Grid) */}
              <section className="mb-9">
                <h3 className="text-lg sm:text-2xl font-semibold text-[#fafafa] mb-5">
                  {lang === 'en' ? "What I'm Doing" : 'สิ่งที่ผมเชี่ยวชาญและกำลังพัฒนา'}
                </h3>

                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {t.bento.domains.map((dom, idx) => {
                    const Icon = serviceIcons[idx % serviceIcons.length];
                    return (
                      <li
                        key={idx}
                        className="vcard-service-item flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4"
                      >
                        <div className="vcard-icon-box !w-12 !h-12 shrink-0">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-base sm:text-lg font-semibold text-[#fafafa] mb-1.5">
                            {dom.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#d6d6d6] font-light leading-relaxed">
                            {dom.desc}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>

              {/* Flagship Engineering Systems (vCard Testimonials-style Content Cards) */}
              <section className="mb-9">
                <div className="flex items-center justify-between gap-2 mb-6">
                  <h3 className="text-lg sm:text-2xl font-semibold text-[#fafafa]">
                    {lang === 'en'
                      ? 'Flagship Engineering Systems'
                      : '2 ผลงานวิศวกรรมเรือธง (Flagship Systems)'}
                  </h3>
                  <button
                    onClick={() => setActivePage('lab')}
                    className="text-xs font-mono text-[#ffdb70] hover:underline flex items-center gap-1"
                  >
                    <span>
                      {lang === 'en' ? 'Open Interactive Simulators →' : 'เปิดห้องแล็บจำลองระบบ →'}
                    </span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 pt-4">
                  {/* Flagship 1 Card: HELIX */}
                  <div
                    onClick={() => setSelectedModalProject(allPortfolioItems[0])}
                    className="vcard-content-card cursor-pointer group pt-8 relative"
                  >
                    <div
                      className="w-14 h-14 rounded-[16px] flex items-center justify-center text-[#ffdb70] absolute -top-5 left-6 shadow-lg border border-[#383838]"
                      style={{ background: 'var(--bg-gradient-onyx)' }}
                    >
                      <Radio className="w-7 h-7" />
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="text-base sm:text-lg font-semibold text-[#fafafa] group-hover:text-[#ffdb70] transition">
                        HELIX — Smart Helmet LoRa
                      </h4>
                      <span className="text-[11px] font-mono text-[#ffdb70] bg-[#2b2b2c] px-2.5 py-0.5 rounded-md border border-[#383838]">
                        923MHz IoT + Flutter
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#d6d6d6] font-light leading-relaxed line-clamp-3 mb-4">
                      {t.flagships.helix.summary}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#383838] text-xs">
                      <span className="text-[#ffdb70] font-medium">
                        {lang === 'en' ? 'Click to inspect architecture' : 'คลิกเพื่อดูรายละเอียด'}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePage('lab');
                        }}
                        className="font-mono text-[11px] px-2.5 py-1 rounded bg-[#2b2b2c] hover:bg-[#ffdb70] text-[#ffdb70] hover:text-[#121212] transition"
                      >
                        {lang === 'en' ? 'Run LoRa Sim →' : 'จำลองการส่ง LoRa →'}
                      </button>
                    </div>
                  </div>

                  {/* Flagship 2 Card: FXCommand */}
                  <div
                    onClick={() => setSelectedModalProject(allPortfolioItems[1])}
                    className="vcard-content-card cursor-pointer group pt-8 relative"
                  >
                    <div
                      className="w-14 h-14 rounded-[16px] flex items-center justify-center text-[#ffdb70] absolute -top-5 left-6 shadow-lg border border-[#383838]"
                      style={{ background: 'var(--bg-gradient-onyx)' }}
                    >
                      <ShieldCheck className="w-7 h-7" />
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="text-base sm:text-lg font-semibold text-[#fafafa] group-hover:text-[#ffdb70] transition">
                        FXCommand — MT5 Quant Engine
                      </h4>
                      <span className="text-[11px] font-mono text-[#ffdb70] bg-[#2b2b2c] px-2.5 py-0.5 rounded-md border border-[#383838]">
                        Python · MT5 · Arena
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#d6d6d6] font-light leading-relaxed line-clamp-3 mb-4">
                      {t.flagships.fxcommand.summary}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#383838] text-xs">
                      <span className="text-[#ffdb70] font-medium">
                        {lang === 'en' ? 'Click to inspect architecture' : 'คลิกเพื่อดูรายละเอียด'}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePage('lab');
                        }}
                        className="font-mono text-[11px] px-2.5 py-1 rounded bg-[#2b2b2c] hover:bg-[#ffdb70] text-[#ffdb70] hover:text-[#121212] transition"
                      >
                        {lang === 'en' ? 'Run Risk Gate Sim →' : 'จำลอง Risk Gate →'}
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Core Technologies Strip (vCard Clients-style section) */}
              <section>
                <h3 className="text-lg sm:text-2xl font-semibold text-[#fafafa] mb-4">
                  {lang === 'en' ? 'Core Tech Stack' : 'เทคโนโลยีที่ใช้พัฒนา'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'ESP32 (Heltec V2)',
                    'SX1276 923MHz LoRa',
                    'C / C++',
                    'Python 3.12',
                    'MetaTrader 5 IPC',
                    'Flutter & Dart',
                    'TypeScript',
                    'React & Next.js',
                    'Firebase & Firestore',
                    'Supabase',
                    'CIE Lab Computer Vision',
                    'MCP Server (.mcp.json)',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-2 rounded-xl bg-[#2b2b2c] border border-[#383838] hover:border-[#ffdb70]/50 text-xs font-mono text-[#fafafa] transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            </article>
          )}

          {/* ==========================================
              TAB 2: #RESUME (EDUCATION, TCAS & SKILLS)
          ========================================== */}
          {activePage === 'resume' && (
            <article className="vcard-article">
              <header>
                <h2 className="vcard-article-title">
                  {lang === 'en' ? 'Resume & Academic Track' : 'ประวัติการศึกษาและผลงาน (TCAS)'}
                </h2>
              </header>

              {/* Education Timeline */}
              <section className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="vcard-icon-box">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-semibold text-[#fafafa]">
                    {lang === 'en' ? 'Education' : 'การศึกษา'}
                  </h3>
                </div>

                <ol className="vcard-timeline-list">
                  <li className="vcard-timeline-item">
                    <h4 className="text-sm sm:text-base font-semibold text-[#fafafa] mb-1">
                      {t.bento.schoolName}
                    </h4>
                    <span className="text-xs sm:text-sm text-[#ceb15a] font-normal block mb-1.5">
                      2025 — Present · {t.bento.schoolSub}
                    </span>
                    <p className="text-xs sm:text-sm text-[#d6d6d6] font-light leading-relaxed">
                      {t.bento.academicBio}
                    </p>
                  </li>
                </ol>
              </section>

              {/* Engineering & Competition Milestones Timeline */}
              <section className="mb-9">
                <div className="flex items-center gap-4 mb-6">
                  <div className="vcard-icon-box">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-semibold text-[#fafafa]">
                    {t.bento.milestonesTitle}
                  </h3>
                </div>

                <ol className="vcard-timeline-list">
                  <li className="vcard-timeline-item">
                    <h4 className="text-sm sm:text-base font-semibold text-[#fafafa] mb-1">
                      {t.flagships.helix.title}
                    </h4>
                    <span className="text-xs sm:text-sm text-[#ceb15a] font-normal block mb-1.5">
                      2026 — Present · Flagship Hardware & Cloud IoT
                    </span>
                    <p className="text-xs sm:text-sm text-[#d6d6d6] font-light leading-relaxed">
                      {t.flagships.helix.summary}
                    </p>
                  </li>

                  <li className="vcard-timeline-item">
                    <h4 className="text-sm sm:text-base font-semibold text-[#fafafa] mb-1">
                      {t.flagships.fxcommand.title}
                    </h4>
                    <span className="text-xs sm:text-sm text-[#ceb15a] font-normal block mb-1.5">
                      2026 — Present · Flagship Quantitative Trading System
                    </span>
                    <p className="text-xs sm:text-sm text-[#d6d6d6] font-light leading-relaxed">
                      {t.flagships.fxcommand.summary}
                    </p>
                  </li>

                  {t.bento.milestones.map((ms, i) => (
                    <li key={i} className="vcard-timeline-item">
                      <h4 className="text-sm sm:text-base font-semibold text-[#fafafa] mb-1">
                        {ms.title}
                      </h4>
                      <span className="text-xs sm:text-sm text-[#ceb15a] font-normal block mb-1.5">
                        {ms.year}
                      </span>
                      <p className="text-xs sm:text-sm text-[#d6d6d6] font-light leading-relaxed">
                        {ms.desc}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>

              {/* My Skills (vCard Gold Progress Bars) */}
              <section>
                <h3 className="text-lg sm:text-2xl font-semibold text-[#fafafa] mb-5">
                  {lang === 'en' ? 'My Skills' : 'ทักษะความสามารถด้านวิศวกรรม'}
                </h3>

                <ul className="vcard-content-card space-y-5">
                  {skillsData.map((sk) => (
                    <li key={sk.name}>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h5 className="text-xs sm:text-sm font-medium text-[#fafafa]">{sk.name}</h5>
                        <data value={sk.pct} className="text-xs sm:text-sm font-light text-[#d6d6d6]">
                          {sk.pct}%
                        </data>
                      </div>
                      <div className="vcard-skill-progress-bg">
                        <div
                          className="vcard-skill-progress-fill"
                          style={{ width: `${sk.pct}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </article>
          )}

          {/* ==========================================
              TAB 3: #PORTFOLIO (PROJECT GRID)
          ========================================== */}
          {activePage === 'portfolio' && (
            <article className="vcard-article">
              <header>
                <h2 className="vcard-article-title">
                  {lang === 'en' ? 'Portfolio' : 'คลังผลงาน (Portfolio)'}
                </h2>
              </header>

              {/* Filter Tabs */}
              <ul className="flex flex-wrap items-center gap-3 sm:gap-6 mb-7 pl-1">
                {filterCategories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setPortfolioFilter(cat)}
                      className={`text-xs sm:text-[15px] transition ${
                        portfolioFilter === cat
                          ? 'text-[#ffdb70] font-medium'
                          : 'text-[#d6d6d6] hover:text-[#d6d6d6]/70 font-light'
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>

              {/* 3-Column vCard Project Grid */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {filteredPortfolio.map((item) => (
                  <li
                    key={item.id}
                    className="group cursor-pointer"
                    onClick={() => setSelectedModalProject(item)}
                  >
                    {/* Visual Banner Box with Hover Overlay & Gold Eye Icon */}
                    <div
                      className={`relative w-full h-44 rounded-[16px] overflow-hidden mb-3.5 border border-[#383838] bg-gradient-to-br ${item.accentGrad} p-5 flex flex-col justify-between`}
                    >
                      {/* Dark Hover Overlay + Eye Icon */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition duration-300 z-10 flex items-center justify-center">
                        <div className="bg-[#383838] text-[#ffdb70] p-3.5 rounded-xl opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition duration-300 shadow-lg">
                          <Eye className="w-5 h-5" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#121212]/80 text-[#ffdb70] border border-[#383838]">
                          {item.category}
                        </span>
                        {item.hasSimulator && (
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#ffdb70] text-[#121212] font-bold">
                            LIVE SIM
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="font-mono text-xs text-[#ffdb70] truncate">
                          {item.tags.slice(0, 3).join(' · ')}
                        </div>
                        <div className="text-sm font-semibold text-[#fafafa] line-clamp-1 mt-0.5">
                          {item.title}
                        </div>
                      </div>
                    </div>

                    {/* Project Title & Category below image (exact vCard layout) */}
                    <div className="px-2">
                      <h3 className="text-[#fafafa] text-sm sm:text-[15px] font-normal leading-snug group-hover:text-[#ffdb70] transition">
                        {item.title}
                      </h3>
                      <p className="text-[#d6d6d6]/70 text-xs sm:text-sm font-light mt-0.5 line-clamp-1">
                        {item.subtitle}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          )}

          {/* ==========================================
              TAB 4: #LAB (INTERACTIVE SIMULATORS & CLI)
          ========================================== */}
          {activePage === 'lab' && (
            <article className="vcard-article space-y-8">
              <header>
                <h2 className="vcard-article-title">
                  {lang === 'en' ? 'Interactive Engineering Lab' : 'ห้องแล็บจำลองสถาปัตยกรรม'}
                </h2>
                <p className="text-xs sm:text-sm text-[#d6d6d6] font-light">
                  {lang === 'en'
                    ? 'Test live simulations of my two flagship architectures (HELIX 923MHz LoRa & FXCommand MT5 Risk Gate) or inspect my profile via the interactive terminal.'
                    : 'ทดสอบการทำงานจำลองของ 2 ระบบเรือธง (HELIX 923MHz LoRa และ FXCommand MT5 Risk Gate) หรือพิมพ์คำสั่งสำรวจข้อมูลผ่านเทอร์มินัล'}
                </p>
              </header>

              <HelixSimulator lang={lang} />

              <FxCommandSimulator lang={lang} />

              <div className="space-y-3 pt-2">
                <h3 className="text-base sm:text-xl font-semibold text-[#fafafa] flex items-center gap-2">
                  <TerminalIcon className="w-5 h-5 text-[#ffdb70]" />
                  <span>{t.terminalSection.title}</span>
                </h3>
                <TerminalWidget lang={lang} onToggleLang={setLang} />
              </div>
            </article>
          )}

          {/* ==========================================
              TAB 5: #CONTACT (MAP & CONTACT FORM)
          ========================================== */}
          {activePage === 'contact' && (
            <article className="vcard-article">
              <header>
                <h2 className="vcard-article-title">
                  {lang === 'en' ? 'Contact' : 'ติดต่อ (Contact)'}
                </h2>
              </header>

              {/* Mapbox (Grayscale Inverted Map of Trang, Thailand) */}
              <section className="relative h-64 sm:h-80 w-full rounded-[18px] mb-8 border border-[#383838] overflow-hidden">
                <iframe
                  title="Trang, Thailand Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=99.5800%2C7.5350%2C99.6400%2C7.5800&layer=mapnik&marker=7.5563%2C99.6114"
                  className="w-full h-full border-0 grayscale invert contrast-125 opacity-85"
                  loading="lazy"
                />
              </section>

              {/* Quick Direct Links */}
              <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <button
                  onClick={handleCopyEmail}
                  className="vcard-content-card flex items-center gap-3 text-left hover:border-[#ffdb70]/40 transition"
                >
                  <div className="vcard-icon-box">
                    {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase text-[#d6d6d6]/70">
                      {copiedEmail ? 'Copied!' : 'Copy Email'}
                    </div>
                    <div className="text-xs text-[#fafafa] truncate">{PROFILE_LINKS.email}</div>
                  </div>
                </button>

                <a
                  href={PROFILE_LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="vcard-content-card flex items-center gap-3"
                >
                  <div className="vcard-icon-box">
                    <Github className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase text-[#d6d6d6]/70">GitHub</div>
                    <div className="text-xs text-[#fafafa] truncate">github.com/marknatdev</div>
                  </div>
                </a>

                <a
                  href={PROFILE_LINKS.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="vcard-content-card flex items-center gap-3"
                >
                  <div className="vcard-icon-box">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] uppercase text-[#d6d6d6]/70">Instagram</div>
                    <div className="text-xs text-[#fafafa] truncate">@mxrk._nat</div>
                  </div>
                </a>
              </section>

              {/* Contact Form (exact vCard style) */}
              <section>
                <h3 className="text-lg sm:text-2xl font-semibold text-[#fafafa] mb-5">
                  {lang === 'en' ? 'Contact Form' : 'ส่งข้อความติดต่อ'}
                </h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const subject = encodeURIComponent(
                      `Portfolio Inquiry from ${contactName || 'Visitor'}`
                    );
                    const body = encodeURIComponent(
                      `Name: ${contactName}\nEmail: ${contactEmail}\n\n${contactMessage}`
                    );
                    window.location.href = `mailto:${PROFILE_LINKS.email}?subject=${subject}&body=${body}`;
                  }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder={lang === 'en' ? 'Full name' : 'ชื่อ-นามสกุล'}
                      className="w-full bg-transparent text-[#fafafa] text-sm px-5 py-3.5 rounded-[14px] border border-[#383838] focus:border-[#ffdb70] outline-none transition"
                    />
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder={lang === 'en' ? 'Email address' : 'อีเมลของคุณ'}
                      className="w-full bg-transparent text-[#fafafa] text-sm px-5 py-3.5 rounded-[14px] border border-[#383838] focus:border-[#ffdb70] outline-none transition"
                    />
                  </div>

                  <textarea
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder={lang === 'en' ? 'Your Message' : 'ข้อความที่ต้องการติดต่อ...'}
                    className="w-full h-32 bg-transparent text-[#fafafa] text-sm px-5 py-3.5 rounded-[14px] border border-[#383838] focus:border-[#ffdb70] outline-none transition resize-y"
                  />

                  <div className="flex justify-end">
                    <button type="submit" className="vcard-btn !px-6 !py-3.5">
                      <Send className="w-4 h-4" />
                      <span>{lang === 'en' ? 'Send Message' : 'ส่งข้อความ'}</span>
                    </button>
                  </div>
                </form>
              </section>
            </article>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
