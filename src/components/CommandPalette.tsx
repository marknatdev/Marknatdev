import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  Cpu,
  Globe,
  Mail,
  Github,
  Briefcase,
  User,
  FolderGit2,
  ExternalLink,
} from 'lucide-react';
import { Language, PROFILE_LINKS } from '../data/portfolioData';

export type VCardPage = 'about' | 'resume' | 'portfolio' | 'lab' | 'contact';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onToggleLang: (next: Language) => void;
  onSelectPage: (page: VCardPage) => void;
}

export const CommandPalette: React.FC<Props> = ({
  isOpen,
  onClose,
  lang,
  onToggleLang,
  onSelectPage,
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
      id: 'about',
      title: lang === 'en' ? 'Open Tab: About Me & Flagships' : 'เปิดแท็บ: เกี่ยวกับฉันและผลงานหลัก',
      category: 'vCard Pages',
      icon: User,
      run: () => {
        onSelectPage('about');
        onClose();
      },
    },
    {
      id: 'resume',
      title: lang === 'en' ? 'Open Tab: Resume, Education (TCAS) & Skills' : 'เปิดแท็บ: ประวัติการศึกษา (TCAS) และทักษะ',
      category: 'vCard Pages',
      icon: Briefcase,
      run: () => {
        onSelectPage('resume');
        onClose();
      },
    },
    {
      id: 'portfolio',
      title: lang === 'en' ? 'Open Tab: Portfolio Projects Grid' : 'เปิดแท็บ: รวมโปรเจกต์ทั้งหมด',
      category: 'vCard Pages',
      icon: FolderGit2,
      run: () => {
        onSelectPage('portfolio');
        onClose();
      },
    },
    {
      id: 'lab',
      title:
        lang === 'en'
          ? 'Open Tab: Interactive Lab (HELIX LoRa & FXCommand Simulators)'
          : 'เปิดแท็บ: ห้องแล็บจำลองระบบ HELIX LoRa & FXCommand',
      category: 'Interactive Simulators',
      icon: Cpu,
      run: () => {
        onSelectPage('lab');
        onClose();
      },
    },
    {
      id: 'contact',
      title: lang === 'en' ? 'Open Tab: Contact & Trang Map' : 'เปิดแท็บ: ติดต่อและแผนที่ จ.ตรัง',
      category: 'vCard Pages',
      icon: Mail,
      run: () => {
        onSelectPage('contact');
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-[20px] border border-[#383838] bg-[#1e1e1f] shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#383838]">
          <Search className="w-4 h-4 text-[#ffdb70]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === 'en'
                ? 'Search vCard tabs or commands (About, Resume, Portfolio, Lab, Thai)...'
                : 'ค้นหาหน้าต่างๆ หรือคำสั่งลัด (About, Resume, Portfolio, Lab)...'
            }
            className="w-full bg-transparent text-sm text-[#fafafa] placeholder-[#d6d6d6]/50 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#d6d6d6]/70 hover:text-white hover:bg-[#2b2b2c]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-2 max-h-80 overflow-y-auto divide-y divide-[#383838]/40">
          {filtered.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.run}
                className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl hover:bg-[#2b2b2c] text-left transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="vcard-icon-box !w-9 !h-9">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-[#fafafa] group-hover:text-[#ffdb70]">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-[#d6d6d6]/60">{item.category}</div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#d6d6d6]/50 group-hover:text-[#ffdb70]" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
