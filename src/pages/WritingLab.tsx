import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Search, Tag, BookOpen, Map } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { ThesisPicker } from "@/components/writing-lab/ThesisPicker";
import { EvidenceCommentaryHighlighter } from "@/components/writing-lab/EvidenceCommentaryHighlighter";
import { DocumentTagger } from "@/components/writing-lab/DocumentTagger";
import { HIPPCoach } from "@/components/writing-lab/HIPPCoach";
import { LineOfReasoningMap } from "@/components/writing-lab/LineOfReasoningMap";

const WritingLab = () => {
  const navigate = useNavigate();
  const [promptText, setPromptText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [thesisText, setThesisText] = useState("");
  const [activeTab, setActiveTab] = useState("setup");
  const [essayType, setEssayType] = useState<"dbq" | "lang" | "leq">("dbq");

  const hasEssay = responseText.trim().length > 50;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">✍️ Writing Lab</h1>
            <p className="text-xs text-muted-foreground">Interactive modules to strengthen your essay</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="setup" className="text-xs">Setup</TabsTrigger>
            <TabsTrigger value="thesis" className="text-xs" disabled={!hasEssay}>Thesis</TabsTrigger>
            <TabsTrigger value="evidence" className="text-xs" disabled={!hasEssay}>Evidence</TabsTrigger>
            {essayType === "dbq" && (
              <>
                <TabsTrigger value="docs" className="text-xs" disabled={!hasEssay}>Docs</TabsTrigger>
                <TabsTrigger value="hipp" className="text-xs" disabled={!hasEssay}>HIPP</TabsTrigger>
              </>
            )}
            <TabsTrigger value="reasoning" className="text-xs" disabled={!hasEssay}>Reasoning</TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">📋 Essay Setup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Essay Type</label>
                  <div className="flex gap-2">
                    {[
                      { id: "dbq" as const, label: "DBQ (History)" },
                      { id: "lang" as const, label: "AP Lang Essay" },
                      { id: "leq" as const, label: "LEQ (History)" },
                    ].map(t => (
                      <Button
                        key={t.id}
                        variant={essayType === t.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setEssayType(t.id)}
                      >
                        {t.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Essay Prompt</label>
                  <Textarea
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    placeholder="Paste the essay prompt here..."
                    className="min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Essay Response</label>
                  <Textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Paste or write your full essay response here..."
                    className="min-h-[200px]"
                  />
                </div>

                {hasEssay && (
                  <Button onClick={() => setActiveTab("thesis")} className="w-full">
                    Start Analysis →
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="thesis" className="mt-4">
            <ThesisPicker
              promptText={promptText}
              responseText={responseText}
              onThesisIdentified={(thesis, _status) => setThesisText(thesis)}
            />
          </TabsContent>

          <TabsContent value="evidence" className="mt-4">
            <EvidenceCommentaryHighlighter
              responseText={responseText}
              promptText={promptText}
              sourceMode={essayType === "dbq" ? "DBQ" : essayType === "lang" ? "Synthesis" : "None"}
            />
          </TabsContent>

          <TabsContent value="docs" className="mt-4">
            <DocumentTagger responseText={responseText} documentCount={7} />
          </TabsContent>

          <TabsContent value="hipp" className="mt-4">
            <HIPPCoach documentCount={7} />
          </TabsContent>

          <TabsContent value="reasoning" className="mt-4">
            <LineOfReasoningMap
              responseText={responseText}
              thesisText={thesisText}
              promptText={promptText}
            />
          </TabsContent>
        </Tabs>
      </div>
      <BottomNav />
    </div>
  );
};

export default WritingLab;
