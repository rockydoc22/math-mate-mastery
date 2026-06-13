import { User, Users, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";

const PERSONAS = [
  {
    icon: User,
    name: "Solo student",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    title: "Studying for the SAT alone",
    points: [
      "10-minute Daily Challenge keeps the streak alive",
      "Adaptive boosters target your weakest skills first",
      "Score Predictor estimates your real-test score weekly",
    ],
  },
  {
    icon: Users,
    name: "Parent + kid",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    title: "Practicing alongside your child",
    points: [
      "Family Hub shows side-by-side weekly progress",
      "Combined family challenge for shared goals",
      "Safe for all ages — no ads, no tracking",
    ],
  },
  {
    icon: GraduationCap,
    name: "Classroom",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    title: "Teachers running a class",
    points: [
      "6-character classroom codes for quick joins",
      "Automated alerts for students below 60% accuracy",
      "Per-student mastery and assignment tracking",
    ],
  },
];

export default function HowFamiliesUse() {
  return (
    <section className="px-6 py-12 bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2">How families use AlphaOmega</h2>
        <p className="text-sm text-muted-foreground text-center mb-8">
          One app, three ways to grow — pick the path that fits you.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {PERSONAS.map(p => (
            <Card key={p.name} className="p-5">
              <div className={`w-10 h-10 rounded-xl ${p.bg} ${p.color} flex items-center justify-center mb-3`}>
                <p.icon className="w-5 h-5" />
              </div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">{p.name}</div>
              <h3 className="font-semibold mb-3">{p.title}</h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {p.points.map((pt, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}