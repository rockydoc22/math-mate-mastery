import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Upload, Loader2, ArrowLeft, Sparkles, Trash2, ImageIcon, Type } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

const SOLVER_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/homework-solver`;

type InputMode = "text" | "photo";

const SUBJECTS = [
  { value: "math", label: "Math" },
  { value: "algebra", label: "Algebra" },
  { value: "geometry", label: "Geometry" },
  { value: "calculus", label: "Calculus" },
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
  { value: "biology", label: "Biology" },
  { value: "english", label: "English / Grammar" },
  { value: "history", label: "History" },
  { value: "general", label: "Other" },
];

const HomeworkSolver = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inputMode, setInputMode] = useState<InputMode>("text");
  const [textInput, setTextInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [subject, setSubject] = useState("math");
  const [solution, setSolution] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = useCallback((file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be under 10MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setImagePreview(dataUrl);
      setImageBase64(dataUrl.split(",")[1]);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) handleImageUpload(file);
  }, [handleImageUpload]);

  const solve = async () => {
    if (inputMode === "text" && !textInput.trim()) {
      toast.error("Enter a problem first");
      return;
    }
    if (inputMode === "photo" && !imageBase64) {
      toast.error("Upload a photo first");
      return;
    }

    setIsLoading(true);
    setSolution("");

    try {
      const resp = await fetch(SOLVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          ...(inputMode === "photo" ? { imageBase64 } : { textInput }),
          subject,
        }),
      });

      if (!resp.ok) {
        if (resp.status === 429) { toast.error("Too many requests. Please wait."); return; }
        if (resp.status === 402) { toast.error("AI credits exhausted."); return; }
        throw new Error("Failed to get solution");
      }
      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, idx);
          buf = buf.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const c = parsed.choices?.[0]?.delta?.content;
            if (c) { full += c; setSolution(full); }
          } catch {
            buf = line + "\n" + buf;
            break;
          }
        }
      }
    } catch (err) {
      console.error("Homework solver error:", err);
      toast.error("Failed to solve. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setSolution("");
    setTextInput("");
    setImagePreview(null);
    setImageBase64(null);
  };

  return (
    <div className="min-h-screen bg-background p-4 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            Homework Solver
          </h1>
          <p className="text-sm text-muted-foreground">
            Snap a photo or type a problem — get a step-by-step solution
          </p>
        </div>
      </div>

      {!solution ? (
        <div className="space-y-4">
          {/* Mode Toggle */}
          <div className="flex gap-2">
            <Button
              variant={inputMode === "text" ? "default" : "outline"}
              onClick={() => setInputMode("text")}
              className="flex-1 gap-2"
            >
              <Type className="w-4 h-4" />
              Type Problem
            </Button>
            <Button
              variant={inputMode === "photo" ? "default" : "outline"}
              onClick={() => setInputMode("photo")}
              className="flex-1 gap-2"
            >
              <Camera className="w-4 h-4" />
              Upload Photo
            </Button>
          </div>

          {/* Subject Selector */}
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {SUBJECTS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Input Area */}
          {inputMode === "text" ? (
            <Textarea
              placeholder="Type or paste your homework problem here...&#10;&#10;Example: Solve for x: 3x + 7 = 22"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="min-h-[160px] text-base"
              maxLength={5000}
            />
          ) : (
            <Card
              className="border-dashed border-2 border-muted-foreground/30 cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <CardContent className="flex flex-col items-center justify-center py-12 gap-3">
                {imagePreview ? (
                  <div className="relative w-full">
                    <img
                      src={imagePreview}
                      alt="Uploaded homework"
                      className="max-h-64 mx-auto rounded-lg object-contain"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreview(null);
                        setImageBase64(null);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      Tap to upload or drag & drop<br />
                      <span className="text-xs">Supports JPG, PNG, HEIC • Max 10MB</span>
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            }}
          />

          <Button
            onClick={solve}
            disabled={isLoading || (inputMode === "text" ? !textInput.trim() : !imageBase64)}
            className="w-full gap-2 h-12 text-base"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Solving...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Solve It
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating solution...
            </div>
          )}

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Solution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{solution}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>

          {!isLoading && (
            <div className="flex gap-2">
              <Button variant="outline" onClick={reset} className="flex-1 gap-2">
                <Upload className="w-4 h-4" />
                New Problem
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeworkSolver;
