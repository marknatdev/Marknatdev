import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  Globe,
  Mail,
  Github,
  User,
  FolderGit2,
  ArrowUpRight,
  Award,
} from 'lucide-react';
import { Language, PROFILE_LINKS } from '../data/portfolioData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onToggleLang: (next: Language) => void;
}

export const CommandPalette: React.FC<Props> = ({
  isOpen,
  onClose,
  lang,
  onToggleLang,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'achievements',
      title: lang === 'en' ? 'Jump to Achievements (Awards & Selections)' : 'ไปยังส่วนผลงานและการคัดเลือก (Achievements)',
      category: 'Section',
      icon: Award,
      run: () => {
        document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'work',
      title: lang === 'en' ? 'Jump to Selected Work (Flagships & Projects)' : 'ไปยังส่วนผลงานที่คัดสรร (Selected Work)',
      category: 'Section',
      icon: FolderGit2,
      run: () => {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'about',
      title: lang === 'en' ? 'Jump to About, Capabilities & TCAS Timeline' : 'ไปยังส่วนเกี่ยวกับฉัน และประวัติการศึกษา (TCAS)',
      category: 'Section',
      icon: User,
      run: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'contact',
      title: lang === 'en' ? 'Jump to Contact & Socials' : 'ไปยังส่วนติดต่อ (Contact)',
      category: 'Section',
      icon: Mail,
      run: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'lang',
      title:
        lang === 'en'
          ? 'Switch Language to Thai (เปลี่ยนเป็นภาษาไทย)'
          : 'Switch Language to English (เปลี่ยนเป็นภาษาอังกฤษ)',
      category: 'Language',
      icon: Globe,
      run: () => {
        onToggleLang(lang === 'en' ? 'th' : 'en');
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
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-foreground/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-sm border border-border bg-card shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
          <Search className="size-4 text-accent" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === 'en'
                ? 'Jump to section or switch language (Achievements, Work, About, Thai)...'
                : 'ค้นหาส่วนต่างๆ หรือเปลี่ยนภาษา (Achievements, Work, About)...'
            }
            className="w-full bg-transparent text-sm text-foreground placeholder-muted-foreground focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-muted-foreground hover:text-foreground hover:bg-secondary"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="p-2 max-h-80 overflow-y-auto divide-y divide-border/50">
          {filtered.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.run}
                className="w-full flex items-center justify-between gap-3 px-3.5 py-3 rounded-sm hover:bg-secondary/70 text-left transition group"
              >
                <div className="flex items-center gap-3">
                  <Icon className="size-4 text-muted-foreground group-hover:text-accent" />
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-foreground group-hover:text-accent">
                      {item.title}
                    </div>
                    <div className="font-mono text-[11px] text-muted-foreground">
                      {item.category}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-accent" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
