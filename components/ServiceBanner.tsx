'use client'

import Link from 'next/link'
import {
  Truck, Package, Archive, Trash2, Sparkles, ClipboardCheck,
  Shield, Wifi, Key, Wrench, PaintBucket, Bug, Thermometer,
  Droplets, Zap, AlertOctagon, ArrowUpRight,
} from 'lucide-react'
import type { ServiceMatch } from '@/lib/service-matcher'

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'moving-companies':    <Truck size={28} strokeWidth={1.5} />,
  'packing-services':    <Package size={28} strokeWidth={1.5} />,
  'storage-facilities':  <Archive size={28} strokeWidth={1.5} />,
  'junk-removal':        <Trash2 size={28} strokeWidth={1.5} />,
  'cleaning-services':   <Sparkles size={28} strokeWidth={1.5} />,
  'building-inspectors': <ClipboardCheck size={28} strokeWidth={1.5} />,
  'renters-insurance':   <Shield size={28} strokeWidth={1.5} />,
  'internet-providers':  <Wifi size={28} strokeWidth={1.5} />,
  locksmith:             <Key size={28} strokeWidth={1.5} />,
  'furniture-assembly':  <Wrench size={28} strokeWidth={1.5} />,
  painters:              <PaintBucket size={28} strokeWidth={1.5} />,
  'pest-control':        <Bug size={28} strokeWidth={1.5} />,
  'hvac-repair':         <Thermometer size={28} strokeWidth={1.5} />,
  plumbers:              <Droplets size={28} strokeWidth={1.5} />,
  electricians:          <Zap size={28} strokeWidth={1.5} />,
  'mold-remediation':    <AlertOctagon size={28} strokeWidth={1.5} />,
}

type Props = {
  service: ServiceMatch
  className?: string
}

export default function ServiceBanner({ service, className = '' }: Props) {
  const icon = SERVICE_ICONS[service.slug] ?? <ArrowUpRight size={28} strokeWidth={1.5} />

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(14,165,233,0.12) 0%, rgba(56,189,248,0.05) 50%, rgba(99,102,241,0.08) 100%)',
        border: '1px solid rgba(14,165,233,0.25)',
      }}
    >
      {/* Background grid lines */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(14,165,233,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Glow blob */}
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 p-6 flex flex-col sm:flex-row sm:items-center gap-5">

        {/* Left: icon + text */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Icon box */}
          <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(56,189,248,0.1))',
              border: '1px solid rgba(14,165,233,0.3)',
              color: 'rgb(56,189,248)',
              boxShadow: '0 0 20px rgba(14,165,233,0.15)',
            }}
          >
            {icon}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase"
                style={{ color: 'rgb(56,189,248)' }}
              >
                Building Health X
              </span>
              <span className="w-1 h-1 rounded-full bg-sky-500/50" />
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--text-muted)]">
                Verified Pros
              </span>
            </div>
            <p className="text-lg font-black leading-tight text-[var(--text-primary)] tracking-tight">
              Need {service.label}?
            </p>
            <p className="text-sm text-[var(--text-secondary)] mt-0.5 leading-snug">
              {service.description}
            </p>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/services/${service.slug}`}
          className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-200 flex-shrink-0 self-start sm:self-center"
          style={{
            background: 'linear-gradient(135deg, rgb(14,165,233), rgb(56,189,248))',
            color: '#fff',
            boxShadow: '0 4px 20px rgba(14,165,233,0.35)',
          }}
        >
          Find a Pro
          <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
        </Link>
      </div>
    </div>
  )
}
