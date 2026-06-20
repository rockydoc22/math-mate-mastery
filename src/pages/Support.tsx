import { Link } from "react-router-dom";
import { ArrowLeft, Mail, BookOpen, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";

const Support = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="Support — AlphaOmega"
      description="Get help with AlphaOmega: account issues, parent dashboard, weekly summaries, and learning content. Email us at support@40squared.club."
      path="/support"
    />
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      <h1 className="text-3xl font-bold mb-2">Support</h1>
      <p className="text-muted-foreground mb-8">We usually reply within one business day.</p>

      <Card className="p-5 mb-4 flex items-start gap-3">
        <Mail className="w-5 h-5 mt-1 text-primary" />
        <div>
          <h2 className="font-semibold">Email us</h2>
          <p className="text-sm text-muted-foreground mb-1">For account, billing, privacy, or content questions.</p>
          <a className="text-primary underline" href="mailto:support@40squared.club">support@40squared.club</a>
        </div>
      </Card>

      <Card className="p-5 mb-4 flex items-start gap-3">
        <BookOpen className="w-5 h-5 mt-1 text-primary" />
        <div>
          <h2 className="font-semibold">Common questions</h2>
          <ul className="text-sm text-muted-foreground list-disc pl-5 mt-2 space-y-1">
            <li><strong>How do I add a kid profile?</strong> Sign up as a parent, then open Parent Dashboard → Add child.</li>
            <li><strong>How do I get the weekly summary?</strong> Parent Dashboard → toggle "Email me a weekly summary".</li>
            <li><strong>How do I reset my password?</strong> Auth page → "Sign in with magic link", then change it in Settings.</li>
            <li><strong>How do I delete my account?</strong> Settings → Delete account, or email support@40squared.club.</li>
          </ul>
        </div>
      </Card>

      <Card className="p-5 flex items-start gap-3">
        <MessageCircle className="w-5 h-5 mt-1 text-primary" />
        <div>
          <h2 className="font-semibold">Report a question</h2>
          <p className="text-sm text-muted-foreground">Found a typo or unclear question? Tap the flag icon on any question inside the app and our team will review it.</p>
        </div>
      </Card>

      <p className="text-xs text-muted-foreground mt-8 text-center">
        AlphaOmega · 40squared.club · One App, Every Test
      </p>
    </div>
  </div>
);

export default Support;
