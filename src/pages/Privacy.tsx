import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SEO } from "@/components/SEO";

const Privacy = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="Privacy Policy — AlphaOmega"
      description="How AlphaOmega collects, uses, and protects student and parent data. COPPA-compliant practices for our 4+ age-rated learning app."
      path="/privacy"
    />
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: June 20, 2026</p>

      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold">Who we are</h2>
          <p>AlphaOmega ("we", "us") is a free standardized-test prep platform operated at 40squared.club. This policy explains what we collect, how we use it, and the choices families have.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Information we collect</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Account info:</strong> username, email (parent email when a kid profile is created), hashed password.</li>
            <li><strong>Learning activity:</strong> question attempts, scores, time on task, streaks, and topic mastery.</li>
            <li><strong>Device info:</strong> browser type, OS, and crash diagnostics for reliability.</li>
          </ul>
          <p>We do <strong>not</strong> collect precise location, contacts, photos, microphone audio, or biometric data.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Children & COPPA</h2>
          <p>AlphaOmega is rated 4+ and designed for learners of all ages. For children under 13, a parent must create the account and add child sub-profiles from the Parent Dashboard. We:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Do not require children to provide more info than necessary to use the learning features.</li>
            <li>Do not show third-party advertising or use third-party ad SDKs.</li>
            <li>Use a parental gate before any external link or App Store purchase.</li>
            <li>Provide parents the ability to review, export, or delete their child's data by emailing support@40squared.club.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">How we use data</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Deliver the adaptive learning experience and track progress.</li>
            <li>Send parents a weekly summary email (opt-in, can be disabled any time).</li>
            <li>Improve question quality and platform reliability.</li>
          </ul>
          <p>We never sell personal data or share it with advertisers.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Subprocessors</h2>
          <p>We use Supabase (database/auth hosting) and Resend (transactional email). These vendors process data only on our behalf under data-processing agreements.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Data retention & deletion</h2>
          <p>Account data is retained while the account is active. You can delete your account from Settings, or email support@40squared.club to request full deletion. We will erase personal data within 30 days.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Security</h2>
          <p>Passwords are hashed. All traffic uses HTTPS. Database access is enforced by row-level security so users can only read their own records.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Contact</h2>
          <p>Questions or privacy requests: <a className="text-primary underline" href="mailto:support@40squared.club">support@40squared.club</a></p>
        </section>
      </div>
    </div>
  </div>
);

export default Privacy;
