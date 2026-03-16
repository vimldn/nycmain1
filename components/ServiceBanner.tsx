'use client'

import Link from 'next/link'
import {
  Truck, Package, Archive, Trash2, Sparkles, ClipboardCheck,
  Shield, Wifi, Key, Wrench, PaintBucket, Bug, Thermometer,
  Droplets, Zap, AlertOctagon, ArrowRight,
} from 'lucide-react'
import type { ServiceMatch } from '@/lib/service-matcher'

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'moving-companies':    <Truck size={22} />,
  'packing-services':    <Package size={22} />,
  'storage-facilities':  <Archive size={22} />,
  'junk-removal':        <Trash2 size={22} />,
  'cleaning-services':   <Sparkles size={22} />,
  'building-inspectors': <ClipboardCheck size={22} />,
  'renters-insurance':   <Shield size={22} />,
  'internet-providers':  <Wifi size={22} />,
  locksmith:             <Key size={22} />,
  'furniture-assembly':  <Wrench size={22} />,
  painters:              <PaintBucket size={22} />,
  'pest-control':        <Bug size={22} />,
  'hvac-repair':         <Thermometer size={22} />,
  plumbers:              <Droplets size={22} />,
  electricians:          <Zap size={22} />,
  'mold-remediation':    <AlertOctagon size={22} />,
}

type Props = {
  service: ServiceMatch
  className?: string
}

export default function ServiceBanner({ service, className = '' }: Props) {
  const icon = SERVICE_ICONS[service.slug] ?? <ArrowRight size={22} />

  return (
    <div className={`rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 flex items-center justify-between gap-4 flex-wrap ${className}`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <p className="font-semibold text-[var(--text-primary)] leading-tight">{service.label}</p>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">{service.description}</p>
        </div>
      </div>
      <Link
        href={`/services/${service.slug}`}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold transition flex-shrink-0"
      >
        Find a Pro <ArrowRight size={14} />
      </Link>
    </div>
  )
}
