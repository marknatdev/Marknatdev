import React, { useState } from 'react';
import {
  ShieldCheck,
  Trophy,
  OctagonAlert,
  Play,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
} from 'lucide-react';
import { Language } from '../data/portfolioData';

interface Props {
  lang: Language;
}

interface ChallengerBot {
  id: string;
  role: 'CHAMPION' | 'CHALLENGER';
  name: string;
  params: string;
  shadowTrades: number;
  oosScore: number;
  maxDd: number;
  status: 'LIVE_ACTIVE' | 'PROMOTED' | 'SHADOW_TESTING' | 'GUARDRAIL_HOLD';
}

export const FxCommandSimulator: React.FC<Props> = ({ lang }) => {
  const [selectedSymbol, setSelectedSymbol] = useState<'XAUUSD' | 'EURUSD' | 'GBPUSD'>('XAUUSD');
  const [killSwitchTripped, setKillSwitchTripped] = useState(false);
  const [signalCount, setSignalCount] = useState(42);
  const [lastOrderMessage, setLastOrderMessage] = useState<string>(
    'Order #42891 FILLED · 0.35 lots @ Risk 0.50% (ATR SL: 18.4 pips, TP: 36.8 pips)'
  );

  const [arenaBots, setArenaBots] = useState<ChallengerBot[]>([
    {
      id: 'c0',
      role: 'CHAMPION',
      name: 'EMA Cross (Trend-Gated v1.4)',
      params: 'EMA(9,21) + EMA(200) · ATR×1.8 SL',
      shadowTrades: 68,
      oosScore: 1.72,
      maxDd: 2.1,
      status: 'LIVE_ACTIVE',
    },
    {
      id: 'c1',
      role: 'CHALLENGER',
      name: 'Challenger #1 · Donchian Breakout',
      params: 'DC(20) + ADX(14)>22 · ATR×1.5 SL',
      shadowTrades: 29,
      oosScore: 1.94,
      maxDd: 1.6,
      status: 'SHADOW_TESTING',
    },
    {
      id: 'c2',
      role: 'CHALLENGER',
      name: 'Challenger #2 · RSI Mean-Reversion',
      params: 'RSI(14) 28/72 + ADX Filter · ATR×1.6 SL',
      shadowTrades: 34,
      oosScore: 1.58,
      maxDd: 2.4,
      status: 'GUARDRAIL_HOLD',
    },
  ]);

  const riskChecks = [
    {
      name: lang === 'en' ? '1. Max Spread & Fresh Quote' : '1. ตรวจสอบค่า Spread และราคาสด',
      detail: selectedSymbol === 'XAUUSD' ? '1.4 pips ≤ 2.5 max · Quote age 18ms' : '0.6 pips ≤ 1.5 max · Quote age 12ms',
      passed: !killSwitchTripped,
    },
    {
      name: lang === 'en' ? '2. Session Trading Window' : '2. ช่วงเวลาอนุญาตเทรด (Window)',
      detail: '08:00–21:00 UTC Active · Pre-Flight OK',
      passed: !killSwitchTripped,
    },
    {
      name: lang === 'en' ? '3. Position Cap (Session & Global)' : '3. จำนวนสถานะคงค้างสูงสุด',
      detail: '2 / 5 Session max · 4 / 12 Global max',
      passed: !killSwitchTripped,
    },
    {
      name: lang === 'en' ? '4. Daily Loss Circuit Breaker' : '4. เพดานขาดทุนรายวันสูงสุด',
      detail: 'Current PnL +1.15% (Floor: -2.00% daily cap)',
      passed: !killSwitchTripped,
    },
    {
      name: lang === 'en' ? '5. ATR Dynamic Lot Sizing' : '5. คำนวณขนาด Lot ตามระยะ ATR',
      detail: 'Risk 0.50% · Broker Stop-Level Verified',
      passed: !killSwitchTripped,
    },
    {
      name: lang === 'en' ? '6. Signal Filter ML Held-Out Lift' : '6. ตัวกรองสัญญาณ ML (Signal Filter)',
      detail: 'Regime probability 0.78 ≥ 0.55 threshold',
      passed: !killSwitchTripped,
    },
  ];

  const handleEvaluateSignal = () => {
    if (killSwitchTripped) return;
    const nextCount = signalCount + 1;
    setSignalCount(nextCount);
    const lots = +(0.25 + Math.random() * 0.25).toFixed(2);
    const atrSl = +(12 + Math.random() * 10).toFixed(1);
    setLastOrderMessage(
      `Order #${42850 + nextCount} [${selectedSymbol}] PASSED 6/6 Risk Gates → Sized ${lots} lots @ 0.50% risk (ATR SL: ${atrSl} pips)`
    );
  };

  const handleStepArena = () => {
    if (killSwitchTripped) return;
    setArenaBots((prev) =>
      prev.map((bot) => {
        if (bot.id === 'c1') {
          const nextTrades = bot.shadowTrades + 1;
          const promoted = nextTrades >= 30;
          return {
            ...bot,
            role: promoted ? 'CHAMPION' : 'CHALLENGER',
            shadowTrades: nextTrades,
            oosScore: +(bot.oosScore + 0.02).toFixed(2),
            status: promoted ? 'PROMOTED' : 'SHADOW_TESTING',
          };
        }
        if (bot.id === 'c0') {
          const c1Next = (prev.find((b) => b.id === 'c1')?.shadowTrades ?? 29) + 1;
          return {
            ...bot,
            shadowTrades: bot.shadowTrades + 1,
            role: c1Next >= 30 ? 'CHALLENGER' : 'CHAMPION',
            status: c1Next >= 30 ? 'SHADOW_TESTING' : 'LIVE_ACTIVE',
          };
        }
        return {
          ...bot,
          shadowTrades: bot.shadowTrades + 1,
        };
      })
    );
  };

  const handleReset = () => {
    setKillSwitchTripped(false);
    setLastOrderMessage('Engine Restored · Magic-Number Sessions Ready (60× Sim / Paper / MT5)');
    setArenaBots([
      {
        id: 'c0',
        role: 'CHAMPION',
        name: 'EMA Cross (Trend-Gated v1.4)',
        params: 'EMA(9,21) + EMA(200) · ATR×1.8 SL',
        shadowTrades: 68,
        oosScore: 1.72,
        maxDd: 2.1,
        status: 'LIVE_ACTIVE',
      },
      {
        id: 'c1',
        role: 'CHALLENGER',
        name: 'Challenger #1 · Donchian Breakout',
        params: 'DC(20) + ADX(14)>22 · ATR×1.5 SL',
        shadowTrades: 29,
        oosScore: 1.94,
        maxDd: 1.6,
        status: 'SHADOW_TESTING',
      },
      {
        id: 'c2',
        role: 'CHALLENGER',
        name: 'Challenger #2 · RSI Mean-Reversion',
        params: 'RSI(14) 28/72 + ADX Filter · ATR×1.6 SL',
        shadowTrades: 34,
        oosScore: 1.58,
        maxDd: 2.4,
        status: 'GUARDRAIL_HOLD',
      },
    ]);
  };

  return (
    <div className="vcard-content-card">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-[#383838]">
        <div className="flex items-center gap-3">
          <div className="vcard-icon-box">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#fafafa]">
              {lang === 'en'
                ? 'FXCommand — Pre-Trade Risk Gate & Walk-Forward Arena'
                : 'ระบบจำลองเอ็นจิ้น FXCommand Risk Gate & Walk-Forward Arena'}
            </h4>
            <p className="text-xs text-[#d6d6d6]/70 mt-0.5">
              {lang === 'en'
                ? 'Simulate 6-layer Risk Gate validation, Challenger promotion (≥30 trades), and Kill Switch'
                : 'ทดสอบด่านกรองความเสี่ยง 6 ชั้น การเลื่อนขั้นกลยุทธ์เมื่อครบ 30 เทรด และปุ่มฉุกเฉิน Kill Switch'}
            </p>
          </div>
        </div>

        {/* Symbol selector */}
        <div className="flex flex-wrap items-center gap-2">
          {(['XAUUSD', 'EURUSD', 'GBPUSD'] as const).map((sym) => (
            <button
              key={sym}
              onClick={() => setSelectedSymbol(sym)}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition border ${
                selectedSymbol === sym
                  ? 'bg-[#2b2b2c] text-[#ffdb70] border-[#ffdb70]/50'
                  : 'bg-[#121212] text-[#d6d6d6]/70 border-[#383838] hover:text-white'
              }`}
            >
              {sym} · M15
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleEvaluateSignal}
            disabled={killSwitchTripped}
            className="vcard-btn !py-2 !px-3.5 !text-xs disabled:opacity-40"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{lang === 'en' ? 'Evaluate Trade Signal' : 'ส่งสัญญาณเทรดผ่าน Risk Gate'}</span>
          </button>

          <button
            onClick={handleStepArena}
            disabled={killSwitchTripped}
            className="inline-flex items-center gap-2 rounded-xl bg-[#121212] hover:bg-[#2b2b2c] disabled:opacity-40 text-[#ffdb70] border border-[#383838] font-medium text-xs px-3.5 py-2 transition"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Advance Shadow Bar (+1 Trade)' : 'รันเทรดจำลองใน Arena (+1)'}</span>
          </button>

          {!killSwitchTripped ? (
            <button
              onClick={() => {
                setKillSwitchTripped(true);
                setLastOrderMessage(
                  'KILL SWITCH ENGAGED · Closed all FXCommand Magic-Number positions; manual/external EA trades untouched.'
                );
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/40 font-medium text-xs px-3.5 py-2 transition"
            >
              <OctagonAlert className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Trigger Kill Switch' : 'กดปุ่ม Kill Switch'}</span>
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl bg-[#ffdb70]/20 hover:bg-[#ffdb70]/30 text-[#ffdb70] border border-[#ffdb70]/40 font-medium text-xs px-3.5 py-2 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Reset Engine' : 'รีเซ็ตระบบ'}</span>
            </button>
          )}
        </div>

        <div className="font-mono text-xs text-[#d6d6d6]/70">
          Journal Signals: <span className="text-[#ffdb70] font-semibold">{signalCount}</span>
        </div>
      </div>

      {/* Status Banner */}
      <div
        className={`mt-4 rounded-xl px-4 py-2.5 border font-mono text-xs flex items-center justify-between gap-2 ${
          killSwitchTripped
            ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
            : 'bg-[#121212] border-[#383838] text-[#ffdb70]'
        }`}
      >
        <span className="truncate">{lastOrderMessage}</span>
        <span className="shrink-0 uppercase text-[10px] px-2 py-0.5 rounded bg-[#1e1e1f] border border-[#383838] text-[#d6d6d6]">
          {killSwitchTripped ? 'HALTED' : '60× SIM / MT5'}
        </span>
      </div>

      {/* Two Columns: 6-Layer Risk Gate & Champion/Challenger Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">
        <div className="lg:col-span-6 space-y-2.5">
          <div className="text-xs font-mono uppercase tracking-wider text-[#d6d6d6]/70 mb-2 flex items-center justify-between">
            <span>{lang === 'en' ? 'Pre-Trade Risk Gate' : 'ด่านตรวจสอบความเสี่ยง 6 ชั้น'}</span>
            <span className="text-[#ffdb70]">{killSwitchTripped ? '0/6 BLOCKED' : '6/6 PASSING'}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {riskChecks.map((chk) => (
              <div
                key={chk.name}
                className={`rounded-xl p-3 border transition ${
                  chk.passed
                    ? 'bg-[#121212] border-[#383838]'
                    : 'bg-rose-950/20 border-rose-500/30'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-[#fafafa]">{chk.name}</span>
                  {chk.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-[#ffdb70] shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  )}
                </div>
                <div className="font-mono text-[11px] text-[#d6d6d6]/70 mt-1">{chk.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 space-y-2.5">
          <div className="text-xs font-mono uppercase tracking-wider text-[#d6d6d6]/70 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#ffdb70]" />
              {lang === 'en'
                ? `Walk-Forward Arena (${selectedSymbol})`
                : `สนามประลองกลยุทธ์ (${selectedSymbol})`}
            </span>
            <span className="text-[#ffdb70]">Guardrail: ≥30 Trades</span>
          </div>

          <div className="space-y-2.5">
            {arenaBots.map((bot) => {
              const isChamp = bot.role === 'CHAMPION';
              return (
                <div
                  key={bot.id}
                  className={`rounded-xl p-3.5 border transition ${
                    isChamp
                      ? 'bg-[#2b2b2c] border-[#ffdb70]/60'
                      : 'bg-[#121212] border-[#383838]'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                          isChamp
                            ? 'bg-[#ffdb70] text-[#121212]'
                            : 'bg-[#1e1e1f] text-[#d6d6d6] border border-[#383838]'
                        }`}
                      >
                        {bot.role}
                      </span>
                      <span className="text-xs font-semibold text-[#fafafa]">{bot.name}</span>
                    </div>

                    {bot.status === 'PROMOTED' && (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#ffdb70] bg-[#ffdb70]/15 border border-[#ffdb70]/40 px-2 py-0.5 rounded">
                        <Sparkles className="w-3 h-3" /> PROMOTED!
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-2 border-t border-[#383838] font-mono text-[11px]">
                    <span className="text-[#d6d6d6]/70">{bot.params}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[#ffdb70] font-semibold">
                        Trades: {bot.shadowTrades}/30
                      </span>
                      <span className="text-[#fafafa]">OOS: {bot.oosScore}</span>
                      <span className="text-[#d6d6d6]/70">DD: {bot.maxDd}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
