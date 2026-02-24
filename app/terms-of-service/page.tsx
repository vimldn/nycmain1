import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service | Building Health X',
  description:
    'Terms governing your use of Building Health X, the NYC building research and renter services platform.',
}

export default function TermsOfServicePage() {
  const lastUpdated = 'January 2025'

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white">
      <Header />

      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-10">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="text-white">Terms of Service</span>
          </nav>

          <h1 className="text-4xl font-bold mb-3">Terms of Service</h1>
          <p className="text-slate-400 mb-12 text-sm">Last updated: {lastUpdated}</p>

          <div className="prose prose-invert prose-slate max-w-none space-y-10 text-slate-300 leading-relaxed">

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using Building Health X ("the Platform"), you agree to be bound by these Terms
                of Service. If you do not agree to these terms, please do not use our platform.
              </p>
              <p className="mt-3">
                Building Health X is a building research and renter services platform operated at{' '}
                <a href="https://www.buildinghealthx.com" className="text-blue-400 hover:text-blue-300">
                  www.buildinghealthx.com
                </a>
                . These terms apply to all visitors and users of the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Nature of the Service</h2>
              <p>
                Building Health X aggregates publicly available data from NYC government sources including the
                NYC Department of Housing Preservation and Development (HPD), the Department of Buildings (DOB),
                311, the NYC Automated City Register Information System (ACRIS), the Department of Health and
                Mental Hygiene (DOHMH), and others.
              </p>
              <p className="mt-4">
                <strong className="text-white">Important limitations:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  The data displayed is sourced from third-party government databases. We do not guarantee its
                  accuracy, completeness, or timeliness.
                </li>
                <li>
                  Building Health X is an informational tool only. It is not a substitute for professional legal,
                  real estate, or inspection advice.
                </li>
                <li>
                  Data may be delayed, incomplete, or subject to change. Always verify critical information
                  directly with the relevant NYC agency before making decisions.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Services Marketplace</h2>
              <p>
                Building Health X connects renters with third-party local service providers including but not
                limited to moving companies, pest control operators, cleaners, and tradespeople.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  We are a referral platform, not a service provider. We do not employ, endorse, or guarantee the
                  work of any service provider listed or matched through the Platform.
                </li>
                <li>
                  Any contract, payment, or dispute is directly between you and the service provider. We accept no
                  liability for the quality, safety, or outcome of any service arranged via the Platform.
                </li>
                <li>
                  Service providers are independent businesses. Always verify their licences, insurance, and
                  credentials independently before engaging them.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. User Responsibilities</h2>
              <p>By using the Platform, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Use the Platform for lawful purposes only</li>
                <li>
                  Not attempt to scrape, harvest, or systematically download data from the Platform without our
                  prior written consent
                </li>
                <li>Not submit false, misleading, or fraudulent information through any form on the Platform</li>
                <li>Not attempt to interfere with, disable, or compromise the security of the Platform</li>
                <li>
                  Not use the Platform to harass, defame, or harm any individual, business, or property owner
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Intellectual Property</h2>
              <p>
                The design, layout, original written content, and software of the Building Health X platform are
                owned by or licensed to us. You may not reproduce, distribute, or create derivative works from
                our original content without our written permission.
              </p>
              <p className="mt-3">
                Data sourced from NYC Open Data and other government databases is subject to the respective
                licences of those sources. This data is public information; our curation and presentation of it
                is proprietary.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Disclaimers and Limitation of Liability</h2>
              <p>
                The Platform is provided on an "as is" and "as available" basis without warranties of any kind,
                either express or implied.
              </p>
              <p className="mt-4">
                To the maximum extent permitted by law, Building Health X shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Reliance on inaccurate or incomplete building data</li>
                <li>Decisions made based on information displayed on the Platform</li>
                <li>The conduct, quality, or outcome of any third-party service provider</li>
                <li>Loss of data, revenue, or opportunity arising from use of the Platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Building Health X, its officers, employees, and agents
                from any claims, damages, or expenses (including reasonable legal fees) arising from your use of
                the Platform or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Third-Party Links and Content</h2>
              <p>
                The Platform may contain links to third-party websites, including NYC government portals. These
                links are provided for convenience only. We have no control over the content of those sites and
                accept no responsibility for them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Modifications to the Platform</h2>
              <p>
                We reserve the right to modify, suspend, or discontinue any part of the Platform at any time
                without notice. We shall not be liable to you or any third party for any such modification,
                suspension, or discontinuation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Changes to These Terms</h2>
              <p>
                We may update these Terms of Service from time to time. The "last updated" date at the top of
                this page will reflect any changes. Continued use of the Platform after changes constitutes
                acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">11. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of New
                York, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">12. Contact</h2>
              <p>If you have questions about these Terms of Service, please contact us:</p>
              <div className="mt-4 p-5 bg-white/5 border border-white/10 rounded-xl">
                <p className="font-semibold text-white">Building Health X</p>
                <p className="mt-1">
                  Website:{' '}
                  <a href="https://www.buildinghealthx.com" className="text-blue-400 hover:text-blue-300">
                    www.buildinghealthx.com
                  </a>
                </p>
              </div>
            </section>

          </div>

          {/* Related legal links */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-4 text-sm text-slate-400">
            <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/data-sources" className="hover:text-white transition">Data Sources</Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
