import React, { useState, useEffect } from 'react';
import {
  Github,
  Mail,
  Instagram,
  Coffee,
  ExternalLink,
  Cpu,
  TrendingUp,
  Layers,
  Award,
  GraduationCap,
  Terminal as TerminalIcon,
  Search,
  Copy,
  Check,
  Radio,
  Code2,
  Sparkles,
  Globe,
  ChevronRight,
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
import { CommandPalette } from './components/CommandPalette';

interface GithubLiveMeta {
  publicRepos: number;
  updatedMap: Record<string, string>;
}

export function App() {
  const [lang, setLang] = useState<Language>('en');
  const [cmdOpen, setCmdOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [ghMeta, setGhMeta] = useState<GithubLiveMeta>({
    publicRepos: 16,
    updatedMap: {},
  });

  const t = UI_COPY[lang];

  // Global Ctrl+K shortcut listener
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

  // Fetch live GitHub stats with graceful fallback
  useEffect(() => {
    let cancelled = false;
    async function fetchGithub() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/marknatdev'),
          fetch('https://api.github.com/users/marknatdev/repos?sort=updated&per_page=30'),
        ]);
        if (!userRes.ok || !reposRes.ok) return;
        const userData = await userRes.json();
        const reposData = await reposRes.json();
        if (cancelled) return;

        const map: Record<string, string> = {};
        if (Array.isArray(reposData)) {
          reposData.forEach((r: { name?: string; updated_at?: string }) => {
            if (r.name && r.updated_at) {
              map[r.name.toLowerCase()] = new Date(r.updated_at).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              });
            }
          });
        }
        setGhMeta({
          publicRepos: typeof userData.public_repos === 'number' ? userData.public_repos : 16,
          updatedMap: map,
        });
      } catch {
        // Fallback silently on offline or rate limit
      }
    }
    fetchGithub();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(PROFILE_LINKS.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const categories = ['ALL', 'IoT / Hardware', 'AI / Web', 'Mobile / Flutter', 'Math / CV'];
  const filteredExperiments =
    selectedCategory === 'ALL'
      ? OTHER_PROJECTS
      : OTHER_PROJECTS.filter((p) => p.category === selectedCategory);

  const techGroups = [
    {
      title: lang === 'en' ? 'Embedded & LoRa Hardware' : 'ฮาร์ดแวร์และสมองกลฝังตัว',
      color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
      items: [
        'ESP32 (Heltec V2)',
        'SX1276 923MHz LoRa',
        'Embedded C / C++',
        'u-blox NEO-M8U GPS',
        '0.96" I2C OLED',
        'Arduino & Raspberry Pi',
        'WebSerial API',
      ],
    },
    {
      title: lang === 'en' ? 'Algorithmic & Backend Systems' : 'ระบบอัลกอริทึมและแบ็กเอนด์',
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      items: [
        'Python 3.12+',
        'MetaTrader 5 IPC',
        'FastAPI / Flask',
        'Walk-Forward Optimization',
        'Firebase Cloud Functions',
        'Cloud Firestore',
        'Supabase / PostgreSQL',
      ],
    },
    {
      title: lang === 'en' ? 'Cross-Platform Mobile & Web' : 'แอปมือถือและเว็บสมัยใหม่',
      color: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
      items: [
        'Flutter & Dart',
        'TypeScript',
        'React 18',
        'Next.js',
        'Tailwind CSS',
        'OpenStreetMap / Leaflet',
        'Playwright E2E',
      ],
    },
    {
      title: lang === 'en' ? 'Applied AI, Vision & Math' : 'AI คอมพิวเตอร์วิทัศน์ และคณิตศาสตร์',
      color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
      items: [
        'CIE Lab Computer Vision',
        'Projective Homography',
        'Shoelace Geometry',
        'MCP Server (.mcp.json)',
        'OpenRouter / Genkit AI',
        'PyTorch & NumPy',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 bg-engineering-grid relative">
      <div className="bg-radial-glow pointer-events-none fixed inset-0 z-0" />

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        lang={lang}
        onToggleLang={setLang}
      />

      {/* Sticky Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#07090E]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#07090E] rounded-[10px] flex items-center justify-center font-mono font-bold text-sm text-cyan-400 group-hover:bg-transparent group-hover:text-slate-950 transition">
                MN
              </div>
            </div>
            <div>
              <div className="font-mono text-sm font-bold text-white flex items-center gap-1.5">
                marknatdev
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-[11px] text-slate-400 hidden sm:block">
                Saparachinee Trang · Systems & IoT
              </div>
            </div>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
            <a href="#bento-overview" className="hover:text-cyan-400 transition">
              {t.nav.bento}
            </a>
            <a href="#flagships" className="hover:text-cyan-400 transition">
              {t.nav.flagships}
            </a>
            <a href="#experiments" className="hover:text-cyan-400 transition">
              {t.nav.experiments}
            </a>
            <a href="#terminal-section" className="hover:text-cyan-400 transition">
              {t.nav.terminal}
            </a>
            <a href="#contact" className="hover:text-cyan-400 transition">
              {t.nav.contact}
            </a>
          </nav>

          {/* Right Controls: Language Switcher + Command Palette */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setLang(lang === 'en' ? 'th' : 'en')}
              aria-label="Toggle Language"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/80 bg-slate-900/90 hover:border-cyan-500/50 text-xs font-mono font-semibold text-slate-200 transition"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className={lang === 'en' ? 'text-cyan-400' : 'text-slate-400'}>EN</span>
              <span className="text-slate-600">/</span>
              <span className={lang === 'th' ? 'text-cyan-400' : 'text-slate-400'}>TH</span>
            </button>

            <button
              onClick={() => setCmdOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/70 hover:bg-slate-800/80 text-xs text-slate-300 transition"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline font-mono text-[11px] text-slate-400">
                {t.nav.cmdHint}
              </span>
            </button>

            <a
              href={PROFILE_LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg border border-slate-800 bg-slate-900/70 hover:border-slate-700 text-slate-300 hover:text-white transition"
              title="GitHub (@marknatdev)"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-24 space-y-24">
        {/* HERO SECTION */}
        <section className="space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-3xl space-y-6">
              {/* Telemetry Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-mono text-[11px] tracking-wide">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>{t.hero.statusBadge}</span>
              </div>

              {/* Greeting + Name */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                    {t.hero.greeting}
                  </h1>
                  <span className="font-mono text-lg sm:text-2xl font-semibold px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                    {t.hero.handle}
                  </span>
                </div>

                <h2 className="text-xl sm:text-3xl font-bold text-slate-200 leading-snug">
                  {t.hero.headline}
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
                {t.hero.subheadline}
              </p>

              {/* CTAs & Social Pills */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#flagships"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition"
                >
                  <span>{t.hero.ctaPrimary}</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                <a
                  href="#terminal-section"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/90 hover:border-cyan-500/50 text-slate-200 font-mono text-xs sm:text-sm transition"
                >
                  <TerminalIcon className="w-4 h-4 text-cyan-400" />
                  <span>{t.hero.ctaSecondary}</span>
                </a>

                <div className="flex items-center gap-2 ml-auto sm:ml-2">
                  <a
                    href={PROFILE_LINKS.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/70 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={PROFILE_LINKS.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/70 hover:border-pink-500/40 text-slate-300 hover:text-pink-300 transition"
                    title="Instagram (@mxrk._nat)"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${PROFILE_LINKS.email}`}
                    className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/70 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 transition"
                    title={PROFILE_LINKS.email}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <a
                    href={PROFILE_LINKS.kofi}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/70 hover:border-amber-500/40 text-slate-300 hover:text-amber-300 transition"
                    title="Ko-fi (mxrk_nat)"
                  >
                    <Coffee className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Avatar & Live Telemetry Identity Card */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="rounded-2xl border border-slate-800/90 bg-[#0B0F18]/90 p-5 shadow-2xl space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={PROFILE_LINKS.avatar}
                    alt="Mark (marknatdev)"
                    className="w-16 h-16 rounded-2xl border-2 border-cyan-500/40 object-cover shadow-md"
                  />
                  <div>
                    <div className="font-bold text-white text-base">Mark</div>
                    <div className="font-mono text-xs text-cyan-400">@marknatdev</div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {lang === 'en' ? 'Grade 11 (M.5) · Trang, TH' : 'ชั้น ม.5 · จ.ตรัง'}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-950/90 border border-slate-800/80 p-3 font-mono text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">SCHOOL</span>
                    <span className="text-slate-200">Saparachinee Trang</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">PRIMARY</span>
                    <span className="text-cyan-300">IoT · Quant · Full-Stack</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">PUBLIC REPOS</span>
                    <span className="text-emerald-400">{ghMeta.publicRepos} Active</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    GitHub API Connected
                  </span>
                  <a
                    href={PROFILE_LINKS.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    Profile <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            {t.hero.metrics.map((m, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-800/90 bg-[#0B0F18]/85 p-4 sm:p-5 hover:border-slate-700 transition"
              >
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  {m.label}
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  {i === 1 ? `${ghMeta.publicRepos} Repos` : m.value}
                </div>
                <div className="text-xs text-cyan-400/90 font-mono mt-1">{m.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* BENTO GRID OVERVIEW (ACADEMIC + DOMAINS + TECH STACK) */}
        <section id="bento-overview" className="scroll-mt-20 space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cyan-400">
              <Layers className="w-4 h-4" />
              <span>BENTO ENGINEERING & ACADEMIC OVERVIEW</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{t.bento.sectionTitle}</h2>
            <p className="text-sm text-slate-400 max-w-2xl">{t.bento.sectionSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Bento Card 1: Student & TCAS Identity + 4 Pillars */}
            <div className="lg:col-span-7 rounded-2xl border border-slate-800/90 bg-[#0B0F18]/90 p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase text-cyan-400">
                        {t.bento.academicTitle}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {t.bento.schoolName}
                      </h3>
                      <div className="text-xs text-slate-400">{t.bento.schoolSub}</div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">{t.bento.academicBio}</p>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-800/80">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  {t.bento.domainsTitle}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {t.bento.domains.map((dom, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl bg-slate-900/70 border border-slate-800/90 p-3.5"
                    >
                      <div className="text-xs font-bold text-cyan-300">{dom.title}</div>
                      <div className="text-xs text-slate-400 mt-1 leading-relaxed">{dom.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bento Card 2: Competition & Research Milestones */}
            <div className="lg:col-span-5 rounded-2xl border border-slate-800/90 bg-[#0B0F18]/90 p-6 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-amber-400">
                    TCAS & HACKATHON TRACK RECORD
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {t.bento.milestonesTitle}
                  </h3>
                </div>
              </div>

              <div className="space-y-3.5 pt-2">
                {t.bento.milestones.map((ms, i) => (
                  <div
                    key={i}
                    className="relative pl-4 border-l-2 border-slate-800 hover:border-cyan-500 transition space-y-1"
                  >
                    <span className="font-mono text-[11px] text-cyan-400 font-semibold">
                      {ms.year}
                    </span>
                    <div className="text-xs sm:text-sm font-bold text-slate-100">{ms.title}</div>
                    <p className="text-xs text-slate-400 leading-relaxed">{ms.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bento Card 3: Full-Width Categorized Tech Stack */}
            <div className="lg:col-span-12 rounded-2xl border border-slate-800/90 bg-[#0B0F18]/90 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Code2 className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {lang === 'en'
                      ? 'Full-Spectrum Hardware & Software Tech Stack'
                      : 'เทคโนโลยีและเครื่องมือที่ใช้พัฒนา (Hardware to Cloud)'}
                  </h3>
                </div>
                <span className="font-mono text-xs text-slate-400 hidden sm:inline">
                  C++ · Python · Dart · TypeScript
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {techGroups.map((group) => (
                  <div
                    key={group.title}
                    className="rounded-xl bg-slate-900/60 border border-slate-800/90 p-4 space-y-3"
                  >
                    <div className="text-xs font-mono font-bold text-slate-200">{group.title}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((tech) => (
                        <span
                          key={tech}
                          className={`text-[11px] font-mono px-2.5 py-1 rounded-md border ${group.color}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FLAGSHIP CASE STUDIES SECTION (HELIX & FXCOMMAND) */}
        <section id="flagships" className="scroll-mt-20 space-y-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cyan-400">
              <Sparkles className="w-4 h-4" />
              <span>{t.flagships.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">{t.flagships.title}</h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-3xl">{t.flagships.subtitle}</p>
          </div>

          {/* FLAGSHIP 01: HELIX */}
          <div
            id="flagship-helix"
            className="scroll-mt-24 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0C1322] to-[#090D16] p-6 sm:p-8 shadow-2xl space-y-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{t.flagships.helix.tag}</span>
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-white">
                  {t.flagships.helix.title}
                </h3>
              </div>

              {/* Repo Links */}
              <div className="flex flex-wrap items-center gap-2">
                {t.flagships.helix.repos.map((r) => (
                  <a
                    key={r}
                    href={`https://github.com/marknatdev/${r}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-300 transition"
                  >
                    <FolderGit2 className="w-3.5 h-3.5" />
                    <span>marknatdev/{r}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {t.flagships.helix.summary}
            </p>

            {/* Specs Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {t.flagships.helix.specs.map((sp) => (
                <div
                  key={sp.label}
                  className="rounded-xl bg-slate-900/90 border border-slate-800 p-3.5"
                >
                  <div className="text-[11px] font-mono uppercase text-slate-400">{sp.label}</div>
                  <div className="text-xs sm:text-sm font-bold text-cyan-300 mt-1">{sp.value}</div>
                </div>
              ))}
            </div>

            {/* Deep-dive Engineering Bullets */}
            <div className="space-y-2.5 pt-1">
              {t.flagships.helix.bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                  <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded px-2 py-0.5 mt-0.5">
                    0{i + 1}
                  </span>
                  <span className="leading-relaxed">{b}</span>
                </div>
              ))}
            </div>

            {/* Interactive HELIX LoRa Simulator */}
            <HelixSimulator lang={lang} />
          </div>

          {/* FLAGSHIP 02: FXCOMMAND */}
          <div
            id="flagship-fxcommand"
            className="scroll-mt-24 rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-[#0B151B] to-[#090D16] p-6 sm:p-8 shadow-2xl space-y-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{t.flagships.fxcommand.tag}</span>
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-white">
                  {t.flagships.fxcommand.title}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {t.flagships.fxcommand.repos.map((r) => (
                  <a
                    key={r}
                    href={`https://github.com/marknatdev/${r}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-emerald-300 transition"
                  >
                    <FolderGit2 className="w-3.5 h-3.5" />
                    <span>marknatdev/{r}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {t.flagships.fxcommand.summary}
            </p>

            {/* Specs Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {t.flagships.fxcommand.specs.map((sp) => (
                <div
                  key={sp.label}
                  className="rounded-xl bg-slate-900/90 border border-slate-800 p-3.5"
                >
                  <div className="text-[11px] font-mono uppercase text-slate-400">{sp.label}</div>
                  <div className="text-xs sm:text-sm font-bold text-emerald-300 mt-1">
                    {sp.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Bullets */}
            <div className="space-y-2.5 pt-1">
              {t.flagships.fxcommand.bullets.map((b, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded px-2 py-0.5 mt-0.5">
                    0{i + 1}
                  </span>
                  <span className="leading-relaxed">{b}</span>
                </div>
              ))}
            </div>

            {/* Interactive FXCommand Risk Gate & Walk-Forward Arena Simulator */}
            <FxCommandSimulator lang={lang} />
          </div>
        </section>

        {/* COMPACT OTHER EXPERIMENTS & REPOSITORIES GRID */}
        <section id="experiments" className="scroll-mt-20 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cyan-400">
                <FolderGit2 className="w-4 h-4" />
                <span>{t.experiments.badge}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">{t.experiments.title}</h2>
              <p className="text-sm text-slate-400 max-w-2xl">{t.experiments.subtitle}</p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition border ${
                    selectedCategory === cat
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {cat === 'ALL' ? t.experiments.filterAll : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredExperiments.map((proj) => {
              const updatedDate = ghMeta.updatedMap[proj.repoName.toLowerCase()];
              return (
                <div
                  key={proj.id}
                  className="rounded-2xl border border-slate-800/90 bg-[#0B0F18]/90 hover:border-cyan-500/40 p-5 flex flex-col justify-between transition group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-300">
                        {proj.category}
                      </span>
                      <span className="font-mono text-[11px] text-slate-500">
                        {updatedDate ? `Updated ${updatedDate}` : proj.language}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition">
                        {proj.name}
                      </h3>
                      <div className="text-xs font-mono text-amber-300/90 mt-0.5">
                        {proj.badge[lang]}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{proj.summary[lang]}</p>

                    <ul className="space-y-1.5 pt-1">
                      {proj.highlights[lang].map((hl, idx) => (
                        <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                          <span className="text-cyan-400 mt-0.5">▹</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/80 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-cyan-300 transition"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>{t.experiments.viewCode}</span>
                      </a>

                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition"
                        >
                          <span>{t.experiments.viewLive}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* INTERACTIVE TERMINAL SECTION */}
        <section id="terminal-section" className="scroll-mt-20 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cyan-400">
              <TerminalIcon className="w-4 h-4" />
              <span>{t.terminalSection.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {t.terminalSection.title}
            </h2>
            <p className="text-sm text-slate-400">{t.terminalSection.subtitle}</p>
          </div>

          <TerminalWidget lang={lang} onToggleLang={setLang} />
        </section>

        {/* CONTACT & COLLABORATION SECTION */}
        <section id="contact" className="scroll-mt-20">
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-[#0B111E] via-[#090D16] to-[#0D1520] p-8 sm:p-12 shadow-2xl">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-cyan-400">
                <Mail className="w-4 h-4" />
                <span>{t.contact.badge}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">{t.contact.title}</h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {t.contact.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition shadow-lg shadow-cyan-500/20"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{t.contact.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>
                        {t.contact.copyEmail} ({PROFILE_LINKS.email})
                      </span>
                    </>
                  )}
                </button>

                <a
                  href={PROFILE_LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/90 hover:border-cyan-500/50 text-slate-200 font-mono text-xs sm:text-sm transition"
                >
                  <Github className="w-4 h-4" />
                  <span>github.com/marknatdev</span>
                </a>

                <a
                  href={PROFILE_LINKS.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/90 hover:border-pink-500/50 text-slate-200 font-mono text-xs sm:text-sm transition"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>@mxrk._nat</span>
                </a>

                <a
                  href={PROFILE_LINKS.kofi}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/90 hover:border-amber-500/50 text-slate-200 font-mono text-xs sm:text-sm transition"
                >
                  <Coffee className="w-4 h-4 text-amber-400" />
                  <span>Ko-fi</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#05070B] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} Mark (@marknatdev) · Saparachinee Trang School (M.5)
          </div>
          <div className="flex items-center gap-4">
            <span>Built with React · TypeScript · Vite · Tailwind CSS</span>
            <button
              onClick={() => setCmdOpen(true)}
              className="text-cyan-400 hover:underline"
            >
              Press Ctrl+K
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
