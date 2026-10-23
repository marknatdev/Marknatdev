import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles } from 'lucide-react';
import { Language, PROFILE_LINKS } from '../data/portfolioData';

interface Props {
  lang: Language;
  onToggleLang: (next: Language) => void;
}

interface LogLine {
  id: number;
  cmd?: string;
  output: string[];
}

export const TerminalWidget: React.FC<Props> = ({ lang, onToggleLang }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<LogLine[]>([
    {
      id: 1,
      cmd: 'whoami',
      output: [
        'Mark (@marknatdev) — Grade 11 (M.5) Student Developer @ Saparachinee Trang School, Thailand',
        'Focus: Embedded 923MHz LoRa IoT (ESP32) · Quantitative Trading Systems (Python/MT5) · Flutter & Full-Stack Web',
        'Type "help" or click any command chip below to inspect systems.',
      ],
    },
  ]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    let out: string[] = [];

    switch (cmd) {
      case 'help':
        out = [
          'Available portfolio commands:',
          '  whoami      → Student & developer profile summary',
          '  helix       → Inspect Flagship #1: HELIX 923MHz LoRa Smart Helmet & Command Center',
          '  fxcommand   → Inspect Flagship #2: FXCommand Autonomous MT5 Engine & Walk-Forward Arena',
          '  tcas        → Academic & competition portfolio (Saparachinee Trang School M.5)',
          '  skills      → Full hardware, systems, mobile & AI tech stack',
          '  repos       → List public GitHub repositories (@marknatdev)',
          '  contact     → Email, GitHub, Instagram & Ko-fi links',
          '  lang th     → Switch portfolio interface to Thai (ภาษาไทย)',
          '  lang en     → Switch portfolio interface to English',
          '  clear       → Clear terminal screen',
        ];
        break;
      case 'whoami':
        out =
          lang === 'en'
            ? [
                'Name:      Mark (marknatdev)',
                'Education: Grade 11 (Mattayom 5), Saparachinee Trang School (โรงเรียนสภาราชินี จังหวัดตรัง)',
                'Location:  Trang, Thailand',
                'Specialty: End-to-end hardware + software architectures (ESP32/LoRa, Python Quant Engines, Flutter, TypeScript)',
              ]
            : [
                'ชื่อ:        Mark (marknatdev)',
                'การศึกษา:   มัธยมศึกษาปีที่ 5 (Grade 11) โรงเรียนสภาราชินี จังหวัดตรัง',
                'ความถนัด:   พัฒนาฮาร์ดแวร์สมองกลฝังตัว ESP32/LoRa, ระบบเทรดอัตโนมัติ Python/MT5, Flutter และ Full-Stack Web',
              ];
        break;
      case 'helix':
        out = [
          '[FLAGSHIP 01] HELIX — Smart Helmet 923MHz LoRa Telemetry & Command Center',
          '  • Hardware: 2× Heltec WiFi LoRa 32 V2 (ESP32 + SX1276 923MHz + 0.96" OLED + NEO-M8U GPS + 3.7V LiPo ADC)',
          '  • Pipeline: sender.ino (Helmet) -> 923MHz LoRa -> receiver.ino (Gateway) -> Firebase /lora-uplink -> Firestore',
          '  • App:      Flutter multi-platform Command Center with Fleet Map, Live View, Alert Feed & Simulator',
          '  • Repos:    github.com/marknatdev/helix | github.com/marknatdev/helix-command-center',
        ];
        break;
      case 'fxcommand':
        out = [
          '[FLAGSHIP 02] FXCommand — Autonomous Multi-Symbol Trading Engine for MetaTrader 5',
          '  • Strategies: EMA Cross (Trend filter), Donchian Breakout, ADX-Gated RSI Mean Reversion (ATR SL/TP)',
          '  • Safety:     6-Layer Pre-Trade Risk Gate, Live Account Caps, Equity Floor & Magic-Number Kill Switch',
          '  • Learning:   Walk-Forward Champion vs. 3 Shadow Challengers Arena (≥30 trades & OOS guardrail) + Signal Filter ML',
          '  • Tooling:    60× Market Simulator, Paper Broker, Playwright E2E, Pytest & MCP Server (.mcp.json)',
          '  • Repo:       github.com/marknatdev/fxcommand',
        ];
        break;
      case 'tcas':
        out = [
          '[ACADEMIC & COMPETITION PORTFOLIO — SAPARACHINEE TRANG SCHOOL (GRADE 11 / M.5)]',
          '  • MMC 2026 (MMC 2569): Projective Homography & Shoelace Formula Land Area Modeling in Python (MMC011)',
          '  • RUTS Stage Demo:     10 Hz ESP32 USB-Serial Cascade Damper Control + CIE Lab CV Chilli Drying Detection',
          '  • MindfulBook AI:      Anti-Cyberbullying AI Social Media Testbed tailored for Thai users',
          '  • StudyForge:          Next.js + Supabase + OpenRouter AI Exam & Competition Study Planner',
          '  • Rescue-Boat:         Microcontroller-driven Emergency Water Rescue Prototype',
        ];
        break;
      case 'skills':
        out = [
          'Hardware / Embedded: ESP32, Heltec LoRa SX1276 (923MHz), Arduino, Raspberry Pi, C/C++, UART/SPI/I2C, WebSerial',
          'Backend / Quant:     Python, FastAPI, Flask, Django, MetaTrader 5 IPC, Node.js, Firebase Functions, Supabase',
          'Frontend / Mobile:   Flutter, Dart, TypeScript, React, Next.js, Tailwind CSS, HTML5 Canvas',
          'AI / Data / CV:      Computer Vision (CIE Lab / Homography), PyTorch, TensorFlow, OpenRouter LLMs, MCP Servers',
        ];
        break;
      case 'repos':
        out = [
          'Featured Public Repositories (https://github.com/marknatdev):',
          '  ★ helix / helix-command-center / helmet-pro  [Dart / C++ / Firebase]',
          '  ★ fxcommand                                  [Python / MT5 / TypeScript]',
          '  • ruts                                       [HTML / ESP32 WebSerial / CV]',
          '  • mindfulbook                                [TypeScript / Anti-Cyberbullying AI]',
          '  • study_plan (StudyForge)                    [TypeScript / Next.js / Supabase]',
          '  • Rot-Duam (รถด่วน)                           [Dart / Flutter / OpenStreetMap]',
          '  • MMC011                                     [Python / Math Modeling 2026]',
          '  • Rescue-Boat                                [Embedded Hardware / Robotics]',
        ];
        break;
      case 'contact':
        out = [
          `GitHub:    ${PROFILE_LINKS.github}`,
          `Email:     ${PROFILE_LINKS.email}`,
          `Instagram: ${PROFILE_LINKS.instagram}`,
          `Ko-fi:     ${PROFILE_LINKS.kofi}`,
        ];
        break;
      case 'lang th':
        onToggleLang('th');
        out = ['✓ เปลี่ยนภาษาหน้าเว็บเป็น ภาษาไทย (TH) เรียบร้อยแล้ว'];
        break;
      case 'lang en':
        onToggleLang('en');
        out = ['✓ Switched portfolio language to English (EN).'];
        break;
      default:
        out = [
          `Command not recognized: "${rawCmd}". Type "help" to see available commands (whoami, helix, fxcommand, tcas, skills, repos, contact).`,
        ];
    }

    setHistory((prev) => [...prev, { id: Date.now(), cmd: rawCmd, output: out }]);
    setInput('');
  };

  const quickChips = ['help', 'whoami', 'helix', 'fxcommand', 'tcas', 'skills', 'repos', 'contact', 'clear'];

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#080B12] overflow-hidden shadow-2xl">
      {/* Window Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0D121D] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-xs text-slate-300 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            mark@saparachinee-trang:~/portfolio
          </span>
        </div>
        <span className="font-mono text-[11px] text-slate-400 hidden sm:inline">
          interactive-shell · zsh
        </span>
      </div>

      {/* Quick Chips */}
      <div className="px-4 py-2.5 bg-slate-900/60 border-b border-slate-800/80 flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-mono text-slate-400 mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          {lang === 'en' ? 'Quick Run:' : 'คลิกรันคำสั่ง:'}
        </span>
        {quickChips.map((chip) => (
          <button
            key={chip}
            onClick={() => runCommand(chip)}
            className="px-2.5 py-1 rounded-md font-mono text-xs bg-slate-950 hover:bg-cyan-500/15 text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Terminal Output */}
      <div
        ref={containerRef}
        className="p-4 sm:p-5 font-mono text-xs sm:text-sm space-y-4 max-h-80 overflow-y-auto"
      >
        {history.map((item) => (
          <div key={item.id} className="space-y-1.5">
            {item.cmd && (
              <div className="flex items-center gap-2 text-slate-200">
                <span className="text-cyan-400 font-semibold">mark@portfolio:~$</span>
                <span className="font-bold text-white">{item.cmd}</span>
              </div>
            )}
            <div className="space-y-1 pl-3 border-l-2 border-slate-800 text-slate-300">
              {item.output.map((line, i) => (
                <div key={i} className="leading-relaxed whitespace-pre-wrap">
                  {line}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Input Line */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          runCommand(input);
        }}
        className="flex items-center gap-2 px-4 py-3 bg-[#0B0F19] border-t border-slate-800 font-mono text-xs sm:text-sm"
      >
        <span className="text-cyan-400 font-semibold shrink-0">mark@portfolio:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            lang === 'en'
              ? 'Type a command (help, helix, fxcommand, tcas, skills, contact)...'
              : 'พิมพ์คำสั่ง เช่น help, helix, fxcommand, tcas, skills, contact...'
          }
          className="w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs hover:bg-cyan-500/30 transition shrink-0"
        >
          <span>Run</span>
          <CornerDownLeft className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
};
