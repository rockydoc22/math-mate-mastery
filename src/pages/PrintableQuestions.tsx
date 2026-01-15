import { useState } from "react";
import { questions } from "@/data/questions";
import { englishQuestions } from "@/data/englishQuestions";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Printer, Download, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type SubjectFilter = "all" | "math" | "english";

const PrintableQuestions = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState<SubjectFilter>("all");
  const [showAnswers, setShowAnswers] = useState(true);

  const allQuestions = [
    ...questions.map(q => ({ ...q, subject: "Math" as const })),
    ...englishQuestions.map(q => ({ ...q, subject: "English" as const }))
  ];

  const filteredQuestions = allQuestions.filter(q => {
    if (subject === "all") return true;
    if (subject === "math") return q.subject === "Math";
    if (subject === "english") return q.subject === "English";
    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadText = () => {
    let content = `SAT Question Bank Review\n`;
    content += `Generated: ${new Date().toLocaleDateString()}\n`;
    content += `Total Questions: ${filteredQuestions.length}\n`;
    content += `${"=".repeat(80)}\n\n`;

    filteredQuestions.forEach((q, index) => {
      content += `Question ${index + 1} [${q.subject}] - ID: ${q.id}\n`;
      content += `Difficulty: ${q.difficulty} | Domain: ${q.domain} | Skill: ${q.skill}\n`;
      content += `${"-".repeat(60)}\n`;
      content += `${q.question}\n\n`;
      
      q.options.forEach(opt => {
        const isCorrect = opt.letter === q.correctAnswer;
        content += `  ${opt.letter}. ${opt.text}${isCorrect ? " ✓ CORRECT" : ""}\n`;
      });
      
      content += `\nExplanation: ${q.explanation}\n`;
      content += `\n${"=".repeat(80)}\n\n`;
    });

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sat-questions-${subject}-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Controls - hidden when printing */}
      <div className="print:hidden sticky top-0 z-10 bg-background border-b p-4">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <Select value={subject} onValueChange={(v) => setSubject(v as SubjectFilter)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All ({allQuestions.length})</SelectItem>
              <SelectItem value="math">Math ({questions.length})</SelectItem>
              <SelectItem value="english">English ({englishQuestions.length})</SelectItem>
            </SelectContent>
          </Select>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showAnswers}
              onChange={(e) => setShowAnswers(e.target.checked)}
              className="rounded"
            />
            Show answers
          </label>

          <div className="flex-1" />

          <Button variant="outline" size="sm" onClick={handleDownloadText}>
            <Download className="h-4 w-4 mr-2" />
            Download TXT
          </Button>
          
          <Button size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print / Save PDF
          </Button>
        </div>
      </div>

      {/* Printable content */}
      <div className="max-w-4xl mx-auto p-8 print:p-4">
        <div className="text-center mb-8 print:mb-4">
          <h1 className="text-2xl font-bold">SAT Question Bank Review</h1>
          <p className="text-muted-foreground">
            {filteredQuestions.length} questions • Generated {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-6 print:space-y-4">
          {filteredQuestions.map((q, index) => (
            <div 
              key={q.id} 
              className="border rounded-lg p-4 print:border-gray-300 print:break-inside-avoid"
            >
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-2">
                <span className="font-mono bg-muted px-1.5 py-0.5 rounded">{q.id}</span>
                <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded">{q.subject}</span>
                <span>{q.difficulty}</span>
                <span>•</span>
                <span>{q.domain}</span>
                <span>•</span>
                <span>{q.skill}</span>
              </div>

              <div className="font-medium mb-3">
                <span className="text-muted-foreground mr-2">Q{index + 1}.</span>
                <span className="whitespace-pre-wrap">{q.question}</span>
              </div>

              <div className="grid gap-1.5 ml-6">
                {q.options.map(opt => {
                  const isCorrect = opt.letter === q.correctAnswer;
                  return (
                    <div 
                      key={opt.letter}
                      className={`flex gap-2 ${showAnswers && isCorrect ? "font-semibold text-green-600 print:text-black print:font-bold" : ""}`}
                    >
                      <span className="w-6">{opt.letter}.</span>
                      <span>{opt.text}</span>
                      {showAnswers && isCorrect && <span className="print:hidden">✓</span>}
                    </div>
                  );
                })}
              </div>

              {showAnswers && (
                <div className="mt-3 pt-3 border-t text-sm">
                  <span className="font-medium">Answer: {q.correctAnswer}</span>
                  <p className="text-muted-foreground mt-1 print:text-gray-600">{q.explanation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body { font-size: 11pt; }
          .print\\:hidden { display: none !important; }
          .print\\:break-inside-avoid { break-inside: avoid; }
        }
      `}</style>
    </div>
  );
};

export default PrintableQuestions;
