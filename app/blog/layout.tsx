import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NYC Renter Guides & Tenant Rights Blog | Building Health X',
  description:
    'Expert guides on NYC tenant rights, building violations, lease agreements, pest issues, and how to research any NYC building before you sign. Covering all 5 boroughs.',
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
