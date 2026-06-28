import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SEO } from "@/components/SEO";

const Terms = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="Terms of Service — AlphaOmega"
      description="Terms of Service for AlphaOmega, the free standardized-test prep platform at 40squared.club."
      path="/terms"
    />
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: June 28, 2026</p>

      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold">1. Acceptance</h2>
          <p>By accessing or using AlphaOmega ("the App", "we", "us"), operated at 40squared.club, you agree to these Terms. If you do not agree, do not use the App.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. Eligibility &amp; Parental Consent</h2>
          <p>Children under 13 must use the App through a parent-created kid profile. A parent or legal guardian is responsible for all activity on their family account.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. Free Use</h2>
          <p>AlphaOmega is provided free of charge for personal, non-commercial study. We may add optional paid features in the future; if so, they will be clearly marked.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. Intellectual Property</h2>
          <p>All content in the App — including question banks, AI-generated explanations, mascots, brand marks ("AlphaOmega", "40²", "One App, Every Test"), UI design, code, copy, curricula, and learning algorithms — is owned by AlphaOmega and protected by U.S. and international copyright, trademark, and trade-secret laws.</p>
          <p>You receive a limited, revocable, non-exclusive, non-transferable license to use the App for personal study only. You may <strong>not</strong>:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Copy, scrape, download in bulk, mirror, or redistribute questions, explanations, or any other content.</li>
            <li>Use automated tools, crawlers, or AI agents to extract content from the App.</li>
            <li>Train, fine-tune, or evaluate machine-learning models on App content without our prior written consent.</li>
            <li>Resell, sublicense, or commercially exploit the App or its content.</li>
            <li>Reverse-engineer, decompile, or attempt to derive source code from the App.</li>
            <li>Remove or alter copyright, trademark, or attribution notices.</li>
          </ul>
          <p>Official standardized-test names (SAT, PSAT, ACT, AP, etc.) are trademarks of their respective owners and are used here for descriptive purposes only. AlphaOmega is not affiliated with or endorsed by those organizations.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">5. Acceptable Use</h2>
          <p>You agree not to misuse the App, including by abusing rate limits, attempting to access other users' data, uploading harmful content, or interfering with App security.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">6. AI-Generated Content</h2>
          <p>Some explanations, hints, and practice items are AI-generated and may contain errors. Use them as study aids, not as authoritative answers. Always verify with official materials before high-stakes decisions.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">7. Disclaimer of Warranties</h2>
          <p>The App is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose, accuracy, or non-infringement. We do not guarantee any specific test score outcome.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">8. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, AlphaOmega and its operators are not liable for any indirect, incidental, consequential, or punitive damages arising from your use of the App.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">9. Termination</h2>
          <p>We may suspend or terminate accounts that violate these Terms, including any account engaged in bulk content extraction or other infringing activity.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">10. Changes</h2>
          <p>We may update these Terms from time to time. Continued use of the App after changes constitutes acceptance of the revised Terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">11. Contact</h2>
          <p>Questions about these Terms? Visit our <Link to="/support" className="underline">Support</Link> page.</p>
        </section>
      </div>
    </div>
  </div>
);

export default Terms;