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
    <div className="vcard-content-card">
      {/* Header & Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-[#383838]">
        <div className="flex items-center gap-3">
          <div className="vcard-icon-box">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#fafafa] flex items-center gap-2">
              {lang === 'en'
                ? 'HELIX — 923MHz LoRa Telemetry Simulator'
                : 'จำลองการส่งสัญญาณหมวกกันน็อกอัจฉริยะ HELIX LoRa 923MHz'}
            </h4>
            <p className="text-xs text-[#d6d6d6]/70 mt-0.5">
              {lang === 'en'
                ? 'Simulate C++ packets from Heltec WiFi LoRa 32 V2 to Firebase & Flutter Command Center'
                : 'ทดสอบส่งแพ็กเก็ตจากบอร์ด Heltec V2 ผ่านคลื่น 923MHz ไปยัง Firebase และแอป Flutter'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-xl bg-[#121212] p-1 border border-[#383838]">
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                activeTab === 'pipeline'
                  ? 'bg-[#2b2b2c] text-[#ffdb70] border border-[#ffdb70]/40'
                  : 'text-[#d6d6d6]/70 hover:text-white'
              }`}
            >
              {lang === 'en' ? 'Live Telemetry Flow' : 'จำลองการส่งสัญญาณ'}
            </button>
            <button
              onClick={() => setActiveTab('pinout')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                activeTab === 'pinout'
                  ? 'bg-[#2b2b2c] text-[#ffdb70] border border-[#ffdb70]/40'
                  : 'text-[#d6d6d6]/70 hover:text-white'
              }`}
            >
              {lang === 'en' ? 'Heltec V2 GPIO Pinout' : 'ผังขาพิน Heltec V2'}
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'pipeline' ? (
        <div className="mt-5 space-y-5">
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <button onClick={() => triggerPacket('NOMINAL')} className="vcard-btn !py-2 !px-3.5 !text-xs">
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{lang === 'en' ? 'Transmit 923MHz LoRa Packet' : 'ส่งแพ็กเก็ต LoRa 923MHz'}</span>
              </button>

              <button
                onClick={() => triggerPacket('IMPACT_SOS')}
                className="inline-flex items-center gap-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/40 font-medium text-xs px-3.5 py-2 transition"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Simulate Impact SOS' : 'จำลองเหตุกระแทกฉุกเฉิน'}</span>
              </button>

              <button
                onClick={() => setAutoStream((s) => !s)}
                className={`inline-flex items-center gap-2 rounded-xl border text-xs px-3 py-2 font-mono transition ${
                  autoStream
                    ? 'bg-[#ffdb70]/20 border-[#ffdb70]/50 text-[#ffdb70]'
                    : 'bg-[#121212] border-[#383838] text-[#d6d6d6] hover:border-[#ffdb70]/40'
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${autoStream ? 'animate-spin' : ''}`} />
                <span>{autoStream ? 'Auto: ON' : 'Auto: OFF'}</span>
              </button>
            </div>

            <div className="font-mono text-xs text-[#d6d6d6]/70">
              SEQ <span className="text-[#ffdb70] font-semibold">#{packet.seq}</span> · {packet.timestamp}
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
                        ? 'bg-rose-950/40 border-rose-400 scale-[1.02]'
                        : 'bg-[#2b2b2c] border-[#ffdb70] shadow-lg scale-[1.02]'
                      : isPassed
                      ? 'bg-[#1e1e1f] border-[#ffdb70]/40'
                      : 'bg-[#121212]/90 border-[#383838]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`p-2 rounded-lg ${
                        isCurrent
                          ? isSos
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-[#ffdb70]/20 text-[#ffdb70]'
                          : 'bg-[#2b2b2c] text-[#ffdb70]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#1e1e1f] text-[#d6d6d6]/80 border border-[#383838]">
                      {isCurrent ? 'TX/RX...' : isPassed ? 'ACK' : 'READY'}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#fafafa]">{st.title}</div>
                  <div className="font-mono text-[11px] text-[#ffdb70] mt-0.5">{st.sub}</div>
                  <div className="font-mono text-[11px] text-[#d6d6d6]/70 mt-2 pt-2 border-t border-[#383838] truncate">
                    {st.detail}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Decoded Telemetry HUD & JSON Payload */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-1">
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl bg-[#121212] border border-[#383838] p-3">
                <div className="flex items-center gap-1.5 text-[#d6d6d6]/70 text-xs">
                  <BatteryCharging className="w-3.5 h-3.5 text-[#ffdb70]" />
                  <span>LiPo Battery</span>
                </div>
                <div className="font-mono text-base font-bold text-[#fafafa] mt-1">
                  {packet.batteryV}V{' '}
                  <span className="text-xs font-normal text-[#ffdb70]">({packet.batteryPct}%)</span>
                </div>
                <div className="text-[11px] text-[#d6d6d6]/60 mt-0.5">1S 3.7V JST Rail</div>
              </div>

              <div className="rounded-xl bg-[#121212] border border-[#383838] p-3">
                <div className="flex items-center gap-1.5 text-[#d6d6d6]/70 text-xs">
                  <Radio className="w-3.5 h-3.5 text-[#ffdb70]" />
                  <span>LoRa Link</span>
                </div>
                <div className="font-mono text-base font-bold text-[#fafafa] mt-1">
                  {packet.rssi} <span className="text-xs font-normal text-[#d6d6d6]/70">dBm</span>
                </div>
                <div className="text-[11px] text-[#ffdb70] font-mono mt-0.5">SNR +{packet.snr} dB</div>
              </div>

              <div className="rounded-xl bg-[#121212] border border-[#383838] p-3">
                <div className="flex items-center gap-1.5 text-[#d6d6d6]/70 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#ffdb70]" />
                  <span>NEO-M8U GPS</span>
                </div>
                <div className="font-mono text-xs font-bold text-[#fafafa] mt-1.5">
                  {packet.lat}° N
                </div>
                <div className="font-mono text-[11px] text-[#d6d6d6]/70">{packet.lng}° E</div>
              </div>

              <div className="rounded-xl bg-[#121212] border border-[#383838] p-3">
                <div className="flex items-center gap-1.5 text-[#d6d6d6]/70 text-xs">
                  <Activity className="w-3.5 h-3.5 text-[#ffdb70]" />
                  <span>Status</span>
                </div>
                <div className="mt-1.5">
                  {packet.status === 'IMPACT_SOS' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-rose-300 font-mono text-[11px] font-bold">
                      <AlertTriangle className="w-3 h-3" /> SOS
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#ffdb70]/15 border border-[#ffdb70]/40 text-[#ffdb70] font-mono text-[11px] font-bold">
                      <CheckCircle2 className="w-3 h-3" /> NOMINAL
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-[#d6d6d6]/60 mt-1">{packet.helmetId}</div>
              </div>
            </div>

            {/* Webhook JSON preview */}
            <div className="lg:col-span-5 rounded-xl bg-[#121212] border border-[#383838] p-3 font-mono text-[11px] text-[#d6d6d6] overflow-x-auto">
              <div className="flex items-center justify-between text-[#d6d6d6]/60 pb-1.5 mb-1.5 border-b border-[#383838]">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-[#ffdb70]" />
                  POST /lora-uplink → Firestore
                </span>
                <span className="text-[#ffdb70]">200 OK</span>
              </div>
              <pre className="leading-relaxed text-[#ffdb70]/90">
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
        <div className="mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {HELTEC_PINOUT.map((pin) => (
              <div
                key={pin.fn}
                className="rounded-xl bg-[#121212] border border-[#383838] p-3.5 flex flex-col justify-between"
              >
                <div className="text-xs font-semibold text-[#fafafa]">{pin.fn}</div>
                <div className="font-mono text-sm font-bold text-[#ffdb70] mt-1">{pin.gpio}</div>
                <div className="text-[11px] text-[#d6d6d6]/70 mt-1">{pin.bus}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
