import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | Building Health X',
  description:
    'How Building Health X collects, uses, and protects your personal data when you use our NYC building research tool.',
}

export default function PrivacyPolicyPage() {
  const lastUpdated = 'January 2025'

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#888] mb-10">
            <Link href="/" className="hover:text-[#0a0a0a] transition">Home</Link>
            <span>/</span>
            <span className="text-white">Privacy Policy</span>
          </nav>

          <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-[#555] mb-12 text-sm">Last updated: {lastUpdated}</p>

          <div className="prose prose-invert prose-slate max-w-none space-y-10 text-[#444] leading-relaxed">

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Who We Are</h2>
              <p>
                Building Health X ("we", "us", or "our") is an NYC building transparency platform that aggregates
                publicly available government data to help renters research residential buildings before signing a
                lease. Our website is located at{' '}
                <a href="https://www.buildinghealthx.com" className="text-[#1a56db] hover:text-[#1a56db]">
                  www.buildinghealthx.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>

              <h3 className="text-lg font-semibold text-white mb-2">Information You Provide</h3>
              <p>When you use our lead forms or request services, we may collect:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Name and contact details (email address, phone number)</li>
                <li>The NYC address or building you are researching</li>
                <li>The type of service you are requesting (e.g. moving companies, pest control)</li>
                <li>Any notes or messages you submit through our contact forms</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mt-6 mb-2">Information Collected Automatically</h3>
              <p>When you visit our site, we automatically collect certain technical data, including:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>IP address and approximate location</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on each page</li>
                <li>Referring website or search query</li>
                <li>Device type (desktop, mobile, tablet)</li>
              </ul>
              <p className="mt-3">
                We collect this data via analytics tools (such as Google Analytics) and standard server logs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Connect you with relevant local service providers based on your request</li>
                <li>Respond to enquiries and provide customer support</li>
                <li>Improve the functionality and content of our platform</li>
                <li>Analyse usage patterns to enhance the user experience</li>
                <li>Send relevant service-related communications (you may opt out at any time)</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p className="mt-4">
                We do <strong className="text-white">not</strong> sell your personal data to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Sharing Your Information</h2>
              <p>We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong className="text-white">Service providers you request:</strong> When you submit a lead form,
                  your contact details are shared with relevant local service businesses so they can follow up with
                  you directly.
                </li>
                <li>
                  <strong className="text-white">Analytics providers:</strong> We use Google Analytics to understand
                  how visitors use our site. This data is anonymised and aggregated.
                </li>
                <li>
                  <strong className="text-white">Legal requirements:</strong> We may disclose information if required
                  to do so by law, court order, or government authority.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to improve your experience on our site. Cookies
                help us remember your preferences, understand how you navigate the site, and measure the
                effectiveness of our content.
              </p>
              <p className="mt-3">
                You can control or disable cookies through your browser settings. Note that disabling cookies may
                affect the functionality of certain features on our site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to fulfil the purposes described in
                this policy, or as required by applicable law. Lead form submissions are retained for up to 24
                months. You may request deletion of your data at any time by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to or restrict how we process your data</li>
                <li>Withdraw consent at any time where processing is based on consent</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact us at the address below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites, including NYC government portals such as
                NYC Open Data, HPD Online, and 311. We are not responsible for the privacy practices of these
                external sites and encourage you to review their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Children's Privacy</h2>
              <p>
                Building Health X is not directed at children under the age of 13. We do not knowingly collect
                personal data from children. If you believe a child has provided us with personal information,
                please contact us and we will delete it promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. When we do, we will update the "last updated"
                date at the top of this page. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">11. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or how we handle your data, please contact us:
              </p>
              <div className="mt-4 p-5 bg-[#f5f5f5] border border-[#e0e0e0] ">
                <p className="font-semibold text-white">Building Health X</p>
                <p className="mt-1">
                  Website:{' '}
                  <a href="https://www.buildinghealthx.com" className="text-[#1a56db] hover:text-[#1a56db]">
                    www.buildinghealthx.com
                  </a>
                </p>
              </div>
            </section>

          </div>

          {/* Related legal links */}
          <div className="mt-16 pt-8 border-t border-[#e0e0e0] flex flex-wrap gap-4 text-sm text-[#555]">
            <Link href="/terms-of-service" className="hover:text-[#0a0a0a] transition">Terms of Service</Link>
            <Link href="/data-sources" className="hover:text-[#0a0a0a] transition">Data Sources</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
