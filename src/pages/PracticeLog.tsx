import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus, Clock, CheckCircle2, BookOpen, Trash2, Edit2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { BottomNav } from "@/components/BottomNav";
import { motion, AnimatePresence } from "framer-motion";
import { format, isToday, isYesterday, differenceInMinutes } from "date-fns";

interface LogEntry {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  subject: "math" | "english" | "both" | "other";
  activity: string;
  notes: string;
  questionsCompleted?: number;
  mood: "great" | "good" | "okay" | "tired";
}

const ACTIVITY_OPTIONS = [
  "Practice Questions", "Review Mistakes", "Concept Study",
  "Timed Practice", "Full Practice Test", "Flashcards",
  "Video Lessons", "Reading Practice", "Writing Practice", "Other",
];

const MOOD_OPTIONS: { value: LogEntry["mood"]; emoji: string; label: string }[] = [
  { value: "great", emoji: "🔥", label: "Great" },
  { value: "good", emoji: "😊", label: "Good" },
  { value: "okay", emoji: "😐", label: "Okay" },
  { value: "tired", emoji: "😴", label: "Tired" },
];

const PracticeLog = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [formSubject, setFormSubject] = useState<LogEntry["subject"]>("both");
  const [formActivity, setFormActivity] = useState(ACTIVITY_OPTIONS[0]);
  const [formStart, setFormStart] = useState("");
  const [formEnd, setFormEnd] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [formQuestions, setFormQuestions] = useState("");
  const [formMood, setFormMood] = useState<LogEntry["mood"]>("good");

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = () => {
    const saved = localStorage.getItem("practice-log-entries");
    if (saved) {
      try { setEntries(JSON.parse(saved)); } catch {}
    }
  };

  const saveEntries = (updated: LogEntry[]) => {
    setEntries(updated);
    localStorage.setItem("practice-log-entries", JSON.stringify(updated));
  };

  const resetForm = () => {
    setFormSubject("both");
    setFormActivity(ACTIVITY_OPTIONS[0]);
    setFormStart("");
    setFormEnd("");
    setFormNotes("");
    setFormQuestions("");
    setFormMood("good");
    setEditingId(null);
  };

  const handleSubmit = () => {
    const entry: LogEntry = {
      id: editingId || crypto.randomUUID(),
      date: new Date().toISOString().split("T")[0],
      startTime: formStart || format(new Date(), "HH:mm"),
      endTime: formEnd || format(new Date(), "HH:mm"),
      subject: formSubject,
      activity: formActivity,
      notes: formNotes,
      questionsCompleted: formQuestions ? parseInt(formQuestions) : undefined,
      mood: formMood,
    };

    let updated: LogEntry[];
    if (editingId) {
      updated = entries.map(e => e.id === editingId ? entry : e);
    } else {
      updated = [entry, ...entries];
    }

    saveEntries(updated);
    resetForm();
    setShowForm(false);
  };

  const deleteEntry = (id: string) => {
    saveEntries(entries.filter(e => e.id !== id));
  };

  const editEntry = (entry: LogEntry) => {
    setFormSubject(entry.subject);
    setFormActivity(entry.activity);
    setFormStart(entry.startTime);
    setFormEnd(entry.endTime);
    setFormNotes(entry.notes);
    setFormQuestions(entry.questionsCompleted?.toString() || "");
    setFormMood(entry.mood);
    setEditingId(entry.id);
    setShowForm(true);
  };

  const getDateLabel = (dateStr: string) => {
    const date = new Date(dateStr + "T12:00:00");
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "MMM d, yyyy");
  };

  const getDuration = (start: string, end: string) => {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const mins = (eh * 60 + em) - (sh * 60 + sm);
    if (mins <= 0) return "—";
    if (mins < 60) return `${mins}m`;
    return `${Math.floor(mins / 60)}h ${mins % 60}m`;
  };

  const totalMinutesToday = entries
    .filter(e => e.date === new Date().toISOString().split("T")[0])
    .reduce((sum, e) => {
      const [sh, sm] = e.startTime.split(":").map(Number);
      const [eh, em] = e.endTime.split(":").map(Number);
      return sum + Math.max(0, (eh * 60 + em) - (sh * 60 + sm));
    }, 0);

  const totalQuestionsToday = entries
    .filter(e => e.date === new Date().toISOString().split("T")[0])
    .reduce((sum, e) => sum + (e.questionsCompleted || 0), 0);

  // Group entries by date
  const grouped = entries.reduce<Record<string, LogEntry[]>>((acc, e) => {
    if (!acc[e.date]) acc[e.date] = [];
    acc[e.date].push(e);
    return acc;
  }, {});

  const getSubjectColor = (s: string) => {
    switch (s) {
      case "math": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "english": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "both": return "bg-primary/10 text-primary";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-foreground">Practice Log</h1>
          <p className="text-xs text-muted-foreground">Track your study sessions</p>
        </div>
        <Button size="sm" className="gap-1" onClick={() => { resetForm(); setShowForm(!showForm); }}>
          <Plus className="w-4 h-4" /> Log
        </Button>
      </div>

      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* Today's Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Today's Study</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-black text-foreground">
                  {totalMinutesToday < 60 ? `${totalMinutesToday}m` : `${Math.floor(totalMinutesToday / 60)}h ${totalMinutesToday % 60}m`}
                </p>
                <p className="text-[10px] text-muted-foreground">Time Studied</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-foreground">{totalQuestionsToday}</p>
                <p className="text-[10px] text-muted-foreground">Questions Done</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* New Entry Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <Card className="p-4 space-y-3">
                <h3 className="font-bold text-foreground">{editingId ? "Edit Entry" : "New Study Session"}</h3>

                {/* Subject */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Subject</p>
                  <div className="flex gap-1">
                    {(["math", "english", "both", "other"] as const).map(s => (
                      <Button key={s} variant={formSubject === s ? "default" : "outline"} size="sm" className="text-xs capitalize flex-1" onClick={() => setFormSubject(s)}>
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Activity */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Activity</p>
                  <select
                    value={formActivity}
                    onChange={e => setFormActivity(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-muted/50 border border-border text-foreground"
                  >
                    {ACTIVITY_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>

                {/* Times */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Start Time</p>
                    <input type="time" value={formStart} onChange={e => setFormStart(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg bg-muted/50 border border-border text-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">End Time</p>
                    <input type="time" value={formEnd} onChange={e => setFormEnd(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg bg-muted/50 border border-border text-foreground" />
                  </div>
                </div>

                {/* Questions */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Questions Completed (optional)</p>
                  <input type="number" value={formQuestions} onChange={e => setFormQuestions(e.target.value)}
                    placeholder="e.g. 20"
                    className="w-full px-3 py-2 text-sm rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground" />
                </div>

                {/* Mood */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">How did it go?</p>
                  <div className="flex gap-2">
                    {MOOD_OPTIONS.map(m => (
                      <button key={m.value} onClick={() => setFormMood(m.value)}
                        className={`flex-1 py-2 rounded-lg text-center transition-all ${
                          formMood === m.value ? "bg-primary text-primary-foreground ring-2 ring-primary/50" : "bg-muted/50 hover:bg-muted"
                        }`}>
                        <p className="text-lg">{m.emoji}</p>
                        <p className="text-[10px] font-medium">{m.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Notes (optional)</p>
                  <textarea value={formNotes} onChange={e => setFormNotes(e.target.value)}
                    placeholder="What did you learn today?"
                    rows={2}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground resize-none" />
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" onClick={handleSubmit}>
                    <CheckCircle2 className="w-4 h-4 mr-1" /> {editingId ? "Update" : "Save"}
                  </Button>
                  <Button variant="outline" onClick={() => { setShowForm(false); resetForm(); }}>Cancel</Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Entries */}
        {Object.keys(grouped).length === 0 ? (
          <Card className="p-8 text-center">
            <BookOpen className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">No entries yet. Start logging your study sessions!</p>
          </Card>
        ) : (
          Object.entries(grouped)
            .sort(([a], [b]) => b.localeCompare(a))
            .map(([date, dayEntries]) => (
              <div key={date}>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{getDateLabel(date)}</p>
                <div className="space-y-2">
                  {dayEntries.map(entry => (
                    <motion.div key={entry.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <Card className="p-3">
                        <div className="flex items-start gap-3">
                          <div className="text-lg">{MOOD_OPTIONS.find(m => m.value === entry.mood)?.emoji || "😊"}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm font-bold text-foreground">{entry.activity}</p>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${getSubjectColor(entry.subject)}`}>
                                {entry.subject}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                              <span className="flex items-center gap-0.5">
                                <Clock className="w-3 h-3" /> {entry.startTime} - {entry.endTime} ({getDuration(entry.startTime, entry.endTime)})
                              </span>
                              {entry.questionsCompleted && <span>{entry.questionsCompleted} questions</span>}
                            </div>
                            {entry.notes && <p className="text-xs text-muted-foreground mt-1">{entry.notes}</p>}
                          </div>
                          <div className="flex gap-1">
                            <button onClick={() => editEntry(entry)} className="p-1 text-muted-foreground hover:text-primary">
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => deleteEntry(entry.id)} className="p-1 text-muted-foreground hover:text-destructive">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default PracticeLog;
