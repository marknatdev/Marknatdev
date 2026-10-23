import React, { useState, useEffect } from 'react';
import {
  Radio,
  Cpu,
  Wifi,
  Cloud,
  Smartphone,
  Play,
  AlertTriangle,
  CheckCircle2,
  BatteryCharging,
  MapPin,
  Activity,
  Terminal,
  RefreshCw,
} from 'lucide-react';
import { HELTEC_PINOUT, Language } from '../data/portfolioData';

interface Props {
  lang: Language;
}

interface TelemetryPacket {
  seq: number;
  helmetId: string;
  batteryV: number;
  batteryPct: number;
  rssi: number;
  snr: number;
  lat: number;
  lng: number;
  status: 'NOMINAL' | 'IMPACT_SOS';
  timestamp: string;
}

export const HelixSimulator: React.FC<Props> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'pinout'>('pipeline');
  const [activeStage, setActiveStage] = useState<number>(-1);
  const [autoStream, setAutoStream] = useState<boolean>(false);
  const [packet, setPacket] = useState<TelemetryPacket>({
    seq: 1042,
    helmetId: 'HLX-TRANG-01',
    batteryV: 3.96,
    batteryPct: 86,
    rssi: -68,
    snr: 9.5,
    lat: 7.5563,
    lng: 99.6114,
    status: 'NOMINAL',
    timestamp: new Date().toLocaleTimeString(),
  });

  const triggerPacket = (mode: 'NOMINAL' | 'IMPACT_SOS' = 'NOMINAL') => {
    const nextV = Math.max(3.45, +(packet.batteryV - 0.01 + (Math.random() * 0.015 - 0.005)).toFixed(2));
    const nextPct = Math.min(100, Math.max(15, Math.round(((nextV - 3.3) / (4.2 - 3.3)) * 100)));
    const nextRssi = Math.round(-64 - Math.random() * 18);
    const nextSnr = +(8.2 + Math.random() * 3.1).toFixed(1);

    setPacket((prev) => ({
      seq: prev.seq + 1,
      helmetId: 'HLX-TRANG-01',
      batteryV: nextV,
      batteryPct: nextPct,
      rssi: nextRssi,
      snr: nextSnr,
      lat: +(7.5563 + (Math.random() - 0.5) * 0.0012).toFixed(5),
      lng: +(99.6114 + (Math.random() - 0.5) * 0.0012).toFixed(5),
      status: mode,
      timestamp: new Date().toLocaleTimeString(),
    }));

    setActiveStage(0);
  };

  useEffect(() => {
    if (activeStage >= 0 && activeStage < 4) {
      const timer = setTimeout(() => {
        setActiveStage((s) => s + 1);
      }, 280);
      return () => clearTimeout(timer);
    } else if (activeStage === 4) {
      const timer = setTimeout(() => {
        setActiveStage(-1);
      }, 650);
      return () => clearTimeout(timer);
    }
  }, [activeStage]);

  useEffect(() => {
    if (!autoStream) return;
    const interval = setInterval(() => {
      triggerPacket('NOMINAL');
    }, 2400);
    return () => clearInterval(interval);
  }, [autoStream, packet.seq]);

  const stages = [
    {
      id: 0,
      title: lang === 'en' ? '1. Helmet Node' : '1. บอร์ดหมวกกันน็อก',
      sub: 'sender.ino · ESP32 + NEO-M8U',
      detail: `${packet.batteryV}V LiPo · OLED HUD`,
      icon: Cpu,
    },
    {
      id: 1,
      title: lang === 'en' ? '2. 923MHz LoRa RF' : '2. คลื่นความถี่ 923MHz LoRa',
      sub: 'SX1276 Point-to-Point TX',
      detail: `RSSI ${packet.rssi} dBm · SNR +${packet.snr} dB`,
      icon: Radio,
    },
    {
      id: 2,
      title: lang === 'en' ? '3. Gateway Node' : '3. บอร์ดรับสัญญาณ Gateway',
      sub: 'receiver.ino · LoRa RX + WiFi',
      detail: 'Parse C Struct → JSON POST',
      icon: Wifi,
    },
    {
      id: 3,
      title: lang === 'en' ? '4. Cloud Functions' : '4. ระบบคลาวด์ Firebase',
      sub: 'POST /lora-uplink → Firestore',
      detail: 'Serverless Document Sync',
      icon: Cloud,
    },
    {
      id: 4,
      title: lang === 'en' ? '5. Command Center' : '5. แอปควบคุม Flutter',
      sub: 'Flutter Fleet Map & Alert Feed',
      detail: packet.status === 'IMPACT_SOS' ? 'SOS ALERT DISPATCHED' : 'Live Fleet State Updated',
      icon: Smartphone,
    },
  ];

  return (
    <div className="mt-6 rounded-2xl border border-cyan-500/25 bg-[#090D15] p-5 sm:p-6 shadow-2xl">
      {/* Header & Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 relative">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                packet.status === 'IMPACT_SOS' ? 'bg-rose-400' : 'bg-cyan-400'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${
                packet.status === 'IMPACT_SOS' ? 'bg-rose-500' : 'bg-cyan-500'
              }`}
            />
          </span>
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-semibold">
              {lang === 'en'
                ? 'INTERACTIVE ARCHITECTURE · HELIX 923MHz LORA TELEMETRY SIMULATOR'
                : 'ระบบจำลองสถาปัตยกรรม · การส่งข้อมูลหมวกกันน็อกอัจฉริยะ HELIX LoRa 923MHz'}
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'en'
                ? 'Test how C++ firmware packets travel from the Heltec V2 helmet board to the Flutter Fleet Command Center.'
                : 'จำลองการส่งแพ็กเก็ตจากบอร์ด Heltec V2 บนหมวกกันน็อก ผ่านคลื่น 923MHz ไปยัง Firebase และแอป Flutter'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg bg-slate-900/90 p-1 border border-slate-800">
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                activeTab === 'pipeline'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'en' ? 'Live Telemetry Flow' : 'จำลองการส่งสัญญาณ'}
            </button>
            <button
              onClick={() => setActiveTab('pinout')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                activeTab === 'pinout'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'en' ? 'Heltec V2 GPIO Pinout' : 'ผังขาพิน Heltec V2 GPIO'}
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'pipeline' ? (
        <div className="mt-5 space-y-5">
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => triggerPacket('NOMINAL')}
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs px-3.5 py-2 transition shadow-lg shadow-cyan-500/20"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {lang === 'en' ? 'Transmit 923MHz LoRa Packet' : 'ส่งแพ็กเก็ต LoRa 923MHz'}
              </button>

              <button
                onClick={() => triggerPacket('IMPACT_SOS')}
                className="inline-flex items-center gap-2 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/40 font-medium text-xs px-3.5 py-2 transition"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                {lang === 'en' ? 'Simulate Impact / SOS Alert' : 'จำลองเหตุกระแทกฉุกเฉิน (SOS)'}
              </button>

              <button
                onClick={() => setAutoStream((s) => !s)}
                className={`inline-flex items-center gap-2 rounded-lg border text-xs px-3 py-2 font-mono transition ${
                  autoStream
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${autoStream ? 'animate-spin' : ''}`} />
                {autoStream
                  ? lang === 'en'
                    ? 'Auto-Stream: ON'
                    : 'ส่งอัตโนมัติ: เปิด'
                  : lang === 'en'
                  ? 'Auto-Stream: OFF'
                  : 'ส่งอัตโนมัติ: ปิด'}
              </button>
            </div>

            <div className="font-mono text-xs text-slate-400">
              SEQ <span className="text-cyan-300 font-semibold">#{packet.seq}</span> · {packet.timestamp}
            </div>
          </div>

          {/* 5-Stage Pipeline Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {stages.map((st, idx) => {
              const Icon = st.icon;
              const isCurrent = activeStage === idx;
              const isPassed = activeStage > idx;
              const isSos = packet.status === 'IMPACT_SOS';

              return (
                <div
                  key={st.id}
                  className={`relative rounded-xl p-3.5 border transition-all duration-300 ${
                    isCurrent
                      ? isSos
                        ? 'bg-rose-950/40 border-rose-400 shadow-lg shadow-rose-500/20 scale-[1.02]'
                        : 'bg-cyan-950/40 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                      : isPassed
                      ? 'bg-slate-900/90 border-cyan-500/40'
                      : 'bg-slate-900/50 border-slate-800/90'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`p-2 rounded-lg ${
                        isCurrent
                          ? isSos
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-cyan-500/20 text-cyan-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                      {isCurrent ? 'TX/RX...' : isPassed ? 'ACK' : 'READY'}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-100">{st.title}</div>
                  <div className="font-mono text-[11px] text-cyan-400/90 mt-0.5">{st.sub}</div>
                  <div className="font-mono text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800/80 truncate">
                    {st.detail}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Decoded Telemetry HUD & JSON Payload */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-1">
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                  <span>LiPo Battery ADC</span>
                </div>
                <div className="font-mono text-lg font-bold text-slate-100 mt-1">
                  {packet.batteryV}V{' '}
                  <span className="text-xs font-normal text-emerald-400">({packet.batteryPct}%)</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">1S 3.7V JST Heltec Rail</div>
              </div>

              <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <Radio className="w-3.5 h-3.5 text-cyan-400" />
                  <span>LoRa Link Quality</span>
                </div>
                <div className="font-mono text-lg font-bold text-slate-100 mt-1">
                  {packet.rssi} <span className="text-xs font-normal text-slate-400">dBm</span>
                </div>
                <div className="text-[11px] text-cyan-400 font-mono mt-0.5">SNR +{packet.snr} dB · 923MHz</div>
              </div>

              <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>GPS (NEO-M8U)</span>
                </div>
                <div className="font-mono text-sm font-bold text-slate-100 mt-1.5">
                  {packet.lat}° N
                </div>
                <div className="font-mono text-xs text-slate-400">{packet.lng}° E</div>
              </div>

              <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <Activity className="w-3.5 h-3.5 text-amber-400" />
                  <span>Helmet Status</span>
                </div>
                <div className="mt-1.5">
                  {packet.status === 'IMPACT_SOS' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-rose-300 font-mono text-xs font-bold">
                      <AlertTriangle className="w-3 h-3" /> IMPACT SOS
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold">
                      <CheckCircle2 className="w-3 h-3" /> NOMINAL
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Node: {packet.helmetId}</div>
              </div>
            </div>

            {/* Webhook JSON preview */}
            <div className="lg:col-span-5 rounded-xl bg-slate-950 border border-slate-800/90 p-3 font-mono text-[11px] text-slate-300 overflow-x-auto">
              <div className="flex items-center justify-between text-slate-500 pb-1.5 mb-1.5 border-b border-slate-800">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-cyan-400" />
                  POST /lora-uplink → Firestore
                </span>
                <span className="text-emerald-400">200 OK</span>
              </div>
              <pre className="leading-relaxed text-cyan-200/90">
                {JSON.stringify(
                  {
                    helmet_id: packet.helmetId,
                    seq: packet.seq,
                    vbat: packet.batteryV,
                    rssi: packet.rssi,
                    snr: packet.snr,
                    gps: [packet.lat, packet.lng],
                    alert: packet.status === 'IMPACT_SOS',
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        </div>
      ) : (
        /* Hardware Pinout Table */
        <div className="mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {HELTEC_PINOUT.map((pin) => (
              <div
                key={pin.fn}
                className="rounded-xl bg-slate-900/70 border border-slate-800 p-3.5 flex flex-col justify-between"
              >
                <div className="text-xs font-semibold text-slate-200">{pin.fn}</div>
                <div className="font-mono text-sm font-bold text-cyan-400 mt-1">{pin.gpio}</div>
                <div className="text-[11px] text-slate-400 mt-1">{pin.bus}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
