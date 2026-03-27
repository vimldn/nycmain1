import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NYC Building & Repair Guides | Building Health X',
  description:
    'Expert step-by-step guides on clearing NYC HPD/DOB violations, handling pest infestations, hiring certified contractors, and navigating NYC housing law.',
}

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
