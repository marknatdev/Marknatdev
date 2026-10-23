import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  Cpu,
  TrendingUp,
  Globe,
  Mail,
  Github,
  Terminal,
  GraduationCap,
  ExternalLink,
} from 'lucide-react';
import { Language, PROFILE_LINKS } from '../data/portfolioData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onToggleLang: (next: Language) => void;
}

export const CommandPalette: React.FC<Props> = ({ isOpen, onClose, lang, onToggleLang }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'helix',
      title: lang === 'en' ? 'Jump to Flagship #1: HELIX Smart Helmet LoRa' : 'ไปยังผลงาน #1: หมวกกันน็อกอัจฉริยะ HELIX LoRa',
      category: 'Flagship Systems',
      icon: Cpu,
      run: () => {
        document.getElementById('flagship-helix')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'fxcommand',
      title: lang === 'en' ? 'Jump to Flagship #2: FXCommand Trading Engine' : 'ไปยังผลงาน #2: ระบบเทรดอัตโนมัติ FXCommand',
      category: 'Flagship Systems',
      icon: TrendingUp,
      run: () => {
        document.getElementById('flagship-fxcommand')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'bento',
      title: lang === 'en' ? 'View Academic & TCAS Engineering Profile' : 'ดูข้อมูลการศึกษา โรงเรียนสภาราชินี จังหวัดตรัง (TCAS)',
      category: 'Navigation',
      icon: GraduationCap,
      run: () => {
        document.getElementById('bento-overview')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'terminal',
      title: lang === 'en' ? 'Open Interactive CLI Terminal' : 'ไปที่เทอร์มินัลโต้ตอบ (CLI Terminal)',
      category: 'Navigation',
      icon: Terminal,
      run: () => {
        document.getElementById('terminal-section')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'lang',
      title:
        lang === 'en'
          ? 'Switch Language to Thai (เปลี่ยนเป็นภาษาไทย)'
          : 'Switch Language to English (เปลี่ยนเป็นภาษาอังกฤษ)',
      category: 'Preferences',
      icon: Globe,
      run: () => {
        onToggleLang(lang === 'en' ? 'th' : 'en');
        onClose();
      },
    },
    {
      id: 'copy-email',
      title: `Copy Email (${PROFILE_LINKS.email})`,
      category: 'Contact',
      icon: Mail,
      run: () => {
        navigator.clipboard?.writeText(PROFILE_LINKS.email);
        onClose();
      },
    },
    {
      id: 'github',
      title: 'Open GitHub Profile (@marknatdev)',
      category: 'External',
      icon: Github,
      run: () => {
        window.open(PROFILE_LINKS.github, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
  ];

  const filtered = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-slate-700/80 bg-[#0C101A] shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800">
          <Search className="w-4 h-4 text-cyan-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === 'en'
                ? 'Type a command or search sections (HELIX, FXCommand, Thai, Email)...'
                : 'ค้นหาส่วนต่างๆ หรือคำสั่งลัด (HELIX, FXCommand, เปลี่ยนภาษา, อีเมล)...'
            }
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-2 max-h-80 overflow-y-auto divide-y divide-slate-800/40">
          {filtered.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.run}
                className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl hover:bg-cyan-500/10 text-left transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 group-hover:border-cyan-500/40">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-cyan-200">
                      {item.title}
                    </div>
                    <div className="text-[11px] font-mono text-slate-500">{item.category}</div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div className="py-8 text-center text-xs text-slate-500 font-mono">
              No matching commands found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
