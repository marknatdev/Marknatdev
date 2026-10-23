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
      title: lang === 'en' ? '01 / Helmet Node' : '01 / บอร์ดหมวกกันน็อก',
      sub: 'sender.ino · ESP32 + NEO-M8U',
      detail: `${packet.batteryV}V LiPo · OLED HUD`,
      icon: Cpu,
    },
    {
      id: 1,
      title: lang === 'en' ? '02 / 923MHz LoRa RF' : '02 / คลื่น 923MHz LoRa',
      sub: 'SX1276 Point-to-Point TX',
      detail: `RSSI ${packet.rssi} dBm · SNR +${packet.snr} dB`,
      icon: Radio,
    },
    {
      id: 2,
      title: lang === 'en' ? '03 / Gateway Node' : '03 / บอร์ดรับสัญญาณ Gateway',
      sub: 'receiver.ino · LoRa RX + WiFi',
      detail: 'Parse C Struct → JSON POST',
      icon: Wifi,
    },
    {
      id: 3,
      title: lang === 'en' ? '04 / Cloud Functions' : '04 / ระบบคลาวด์ Firebase',
      sub: 'POST /lora-uplink → Firestore',
      detail: 'Serverless Document Sync',
      icon: Cloud,
    },
    {
      id: 4,
      title: lang === 'en' ? '05 / Command Center' : '05 / แอปควบคุม Flutter',
      sub: 'Flutter Fleet Map & Alert Feed',
      detail: packet.status === 'IMPACT_SOS' ? 'SOS ALERT DISPATCHED' : 'Live Fleet State Updated',
      icon: Smartphone,
    },
  ];

  return (
    <div className="rounded-sm border border-border bg-card p-5 sm:p-7">
      {/* Header & Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
            <span className="relative flex size-2">
              <span
                className={`absolute inline-flex size-full animate-ping rounded-full opacity-60 ${
                  packet.status === 'IMPACT_SOS' ? 'bg-red-600' : 'bg-accent'
                }`}
              />
              <span
                className={`relative inline-flex size-2 rounded-full ${
                  packet.status === 'IMPACT_SOS' ? 'bg-red-600' : 'bg-accent'
                }`}
              />
            </span>
            <span>Flagship 01 · Interactive Hardware Telemetry Simulator</span>
          </div>
          <h3 className="text-lg sm:text-xl font-medium text-foreground">
            {lang === 'en'
              ? 'HELIX — 923MHz LoRa Smart Helmet Architecture'
              : 'ระบบจำลองสถาปัตยกรรมหมวกกันน็อกอัจฉริยะ HELIX LoRa 923MHz'}
          </h3>
        </div>

        <div className="inline-flex rounded-sm bg-secondary p-1">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3 py-1.5 rounded-sm text-xs font-medium transition ${
              activeTab === 'pipeline'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {lang === 'en' ? 'Live Telemetry Flow' : 'จำลองการส่งสัญญาณ'}
          </button>
          <button
            onClick={() => setActiveTab('pinout')}
            className={`px-3 py-1.5 rounded-sm text-xs font-medium transition ${
              activeTab === 'pinout'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {lang === 'en' ? 'Heltec V2 GPIO Pinout' : 'ผังขาพิน Heltec V2'}
          </button>
        </div>
      </div>

      {activeTab === 'pipeline' ? (
        <div className="mt-6 space-y-6">
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => triggerPacket('NOMINAL')}
                className="inline-flex items-center gap-2 rounded-sm bg-foreground hover:bg-accent text-card font-medium text-xs px-4 py-2.5 transition-colors"
              >
                <Play className="size-3.5 fill-current" />
                <span>
                  {lang === 'en' ? 'Transmit 923MHz LoRa Packet' : 'ส่งแพ็กเก็ต LoRa 923MHz'}
                </span>
              </button>

              <button
                onClick={() => triggerPacket('IMPACT_SOS')}
                className="inline-flex items-center gap-2 rounded-sm border border-red-600/40 bg-red-600/10 hover:bg-red-600/20 text-red-700 font-medium text-xs px-3.5 py-2.5 transition-colors"
              >
                <AlertTriangle className="size-3.5" />
                <span>{lang === 'en' ? 'Simulate Impact SOS' : 'จำลองเหตุกระแทกฉุกเฉิน'}</span>
              </button>

              <button
                onClick={() => setAutoStream((s) => !s)}
                className={`inline-flex items-center gap-2 rounded-sm border text-xs px-3.5 py-2.5 font-mono transition-colors ${
                  autoStream
                    ? 'bg-accent text-card border-accent'
                    : 'bg-background border-border text-foreground hover:border-foreground'
                }`}
              >
                <RefreshCw className={`size-3.5 ${autoStream ? 'animate-spin' : ''}`} />
                <span>{autoStream ? 'Auto: ON' : 'Auto: OFF'}</span>
              </button>
            </div>

            <div className="font-mono text-xs text-muted-foreground">
              SEQ <span className="text-foreground font-semibold">#{packet.seq}</span> ·{' '}
              {packet.timestamp}
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
                  className={`rounded-sm p-4 border transition-all duration-300 ${
                    isCurrent
                      ? isSos
                        ? 'bg-red-50 border-red-600 shadow-sm'
                        : 'bg-accent/5 border-accent shadow-sm'
                      : isPassed
                      ? 'bg-background border-foreground/40'
                      : 'bg-background/60 border-border'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Icon
                      className={`size-4 ${
                        isCurrent
                          ? isSos
                            ? 'text-red-600'
                            : 'text-accent'
                          : 'text-muted-foreground'
                      }`}
                    />
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-sm bg-secondary text-secondary-foreground">
                      {isCurrent ? 'TX/RX' : isPassed ? 'ACK' : 'IDLE'}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-foreground">{st.title}</div>
                  <div className="font-mono text-[11px] text-accent mt-0.5">{st.sub}</div>
                  <div className="font-mono text-[11px] text-muted-foreground mt-2.5 pt-2 border-t border-border truncate">
                    {st.detail}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Decoded Telemetry HUD & JSON Payload */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-1">
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-sm bg-background border border-border p-3.5">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <BatteryCharging className="size-3.5 text-accent" />
                  <span>LiPo ADC</span>
                </div>
                <div className="font-mono text-base font-semibold text-foreground mt-1.5">
                  {packet.batteryV}V{' '}
                  <span className="text-xs font-normal text-muted-foreground">
                    ({packet.batteryPct}%)
                  </span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">1S 3.7V JST Rail</div>
              </div>

              <div className="rounded-sm bg-background border border-border p-3.5">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <Radio className="size-3.5 text-accent" />
                  <span>LoRa Link</span>
                </div>
                <div className="font-mono text-base font-semibold text-foreground mt-1.5">
                  {packet.rssi} <span className="text-xs font-normal text-muted-foreground">dBm</span>
                </div>
                <div className="text-[11px] text-accent font-mono mt-0.5">SNR +{packet.snr} dB</div>
              </div>

              <div className="rounded-sm bg-background border border-border p-3.5">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <MapPin className="size-3.5 text-accent" />
                  <span>NEO-M8U GPS</span>
                </div>
                <div className="font-mono text-xs font-semibold text-foreground mt-1.5">
                  {packet.lat}° N
                </div>
                <div className="font-mono text-[11px] text-muted-foreground">{packet.lng}° E</div>
              </div>

              <div className="rounded-sm bg-background border border-border p-3.5">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <Activity className="size-3.5 text-accent" />
                  <span>Node State</span>
                </div>
                <div className="mt-1.5">
                  {packet.status === 'IMPACT_SOS' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-red-600/10 text-red-700 font-mono text-[11px] font-semibold">
                      <AlertTriangle className="size-3" /> IMPACT SOS
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-accent/10 text-accent font-mono text-[11px] font-semibold">
                      <CheckCircle2 className="size-3" /> NOMINAL
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">{packet.helmetId}</div>
              </div>
            </div>

            {/* Webhook JSON preview */}
            <div className="lg:col-span-5 rounded-sm bg-foreground text-card p-3.5 font-mono text-[11px] overflow-x-auto">
              <div className="flex items-center justify-between text-card/60 pb-1.5 mb-1.5 border-b border-card/15">
                <span className="flex items-center gap-1.5">
                  <Terminal className="size-3" />
                  POST /lora-uplink → Firestore
                </span>
                <span className="text-emerald-400">200 OK</span>
              </div>
              <pre className="leading-relaxed text-card/90">
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
        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {HELTEC_PINOUT.map((pin) => (
              <div
                key={pin.fn}
                className="rounded-sm bg-background border border-border p-3.5 flex flex-col justify-between"
              >
                <div className="text-xs font-medium text-foreground">{pin.fn}</div>
                <div className="font-mono text-sm font-semibold text-accent mt-1">{pin.gpio}</div>
                <div className="text-[11px] text-muted-foreground mt-1">{pin.bus}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
