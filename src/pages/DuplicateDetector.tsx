import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Search, Download, Trash2, Copy, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { questions } from '@/data/questions';
import { englishQuestions } from '@/data/englishQuestions';
import { 
  generateDuplicateReport, 
  getDuplicateIdsToRemove,
  type DuplicateReport,
  type DuplicateGroup 
} from '@/utils/duplicateDetector';
import { toast } from 'sonner';

const DuplicateDetector = () => {
  const navigate = useNavigate();
  const [includeNearDuplicates, setIncludeNearDuplicates] = useState(false);
  const [threshold, setThreshold] = useState([0.85]);
  const [subject, setSubject] = useState<'math' | 'english' | 'all'>('all');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<DuplicateReport | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const allQuestions = useMemo(() => {
    if (subject === 'math') return questions;
    if (subject === 'english') return englishQuestions;
    return [...questions, ...englishQuestions];
  }, [subject]);

  const runAnalysis = () => {
    setIsAnalyzing(true);
    // Use setTimeout to allow UI to update
    setTimeout(() => {
      try {
        const result = generateDuplicateReport(
          allQuestions,
          includeNearDuplicates,
          threshold[0]
        );
        setReport(result);
        toast.success(`Analysis complete! Found ${result.duplicateCount} duplicates in ${result.duplicateGroups.length} groups`);
      } catch (error) {
        toast.error('Analysis failed');
        console.error(error);
      }
      setIsAnalyzing(false);
    }, 100);
  };

  const toggleGroup = (hash: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(hash)) {
      newExpanded.delete(hash);
    } else {
      newExpanded.add(hash);
    }
    setExpandedGroups(newExpanded);
  };

  const copyDuplicateIds = () => {
    if (!report) return;
    const ids = getDuplicateIdsToRemove(report);
    navigator.clipboard.writeText(JSON.stringify(ids, null, 2));
    toast.success(`Copied ${ids.length} duplicate IDs to clipboard`);
  };

  const downloadReport = () => {
    if (!report) return;
    
    const content = {
      summary: {
        totalQuestions: report.totalQuestions,
        uniqueQuestions: report.uniqueQuestions,
        duplicateCount: report.duplicateCount,
        groupCount: report.duplicateGroups.length
      },
      idsToRemove: getDuplicateIdsToRemove(report),
      groups: report.duplicateGroups.map(g => ({
        type: g.similarity,
        questions: g.questions.map(q => ({
          id: q.id,
          source: q.source,
          preview: q.question.slice(0, 100)
        }))
      }))
    };
    
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `duplicate-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Report downloaded');
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Duplicate Question Detector</h1>
          <p className="text-muted-foreground">
            Find and identify redundant questions across all question files
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Analysis Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Subject Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={subject === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSubject('all')}
              >
                All ({questions.length + englishQuestions.length})
              </Button>
              <Button
                variant={subject === 'math' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSubject('math')}
              >
                Math ({questions.length})
              </Button>
              <Button
                variant={subject === 'english' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSubject('english')}
              >
                English ({englishQuestions.length})
              </Button>
            </div>

            {/* Near Duplicates Toggle */}
            <div className="flex items-center space-x-2">
              <Switch
                id="near-duplicates"
                checked={includeNearDuplicates}
                onCheckedChange={setIncludeNearDuplicates}
              />
              <Label htmlFor="near-duplicates">
                Include near-duplicates (slower, more thorough)
              </Label>
            </div>

            {/* Threshold Slider */}
            {includeNearDuplicates && (
              <div className="space-y-2">
                <Label>Similarity Threshold: {(threshold[0] * 100).toFixed(0)}%</Label>
                <Slider
                  value={threshold}
                  onValueChange={setThreshold}
                  min={0.7}
                  max={0.99}
                  step={0.01}
                  className="w-full max-w-xs"
                />
                <p className="text-xs text-muted-foreground">
                  Higher = stricter matching (fewer false positives)
                </p>
              </div>
            )}

            <Button onClick={runAnalysis} disabled={isAnalyzing}>
              <Search className="h-4 w-4 mr-2" />
              {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {report && (
          <>
            {/* Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{report.totalQuestions.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Questions</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{report.uniqueQuestions.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Unique Questions</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-destructive">{report.duplicateCount}</div>
                  <div className="text-sm text-muted-foreground">Duplicates Found</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{report.duplicateGroups.length}</div>
                  <div className="text-sm text-muted-foreground">Duplicate Groups</div>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            {report.duplicateCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                <Button variant="outline" onClick={copyDuplicateIds}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy IDs to Remove
                </Button>
                <Button variant="outline" onClick={downloadReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </div>
            )}

            {/* Duplicate Groups */}
            {report.duplicateGroups.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    Duplicate Groups
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-4">
                      {report.duplicateGroups.map((group, idx) => (
                        <DuplicateGroupCard
                          key={group.hash}
                          group={group}
                          index={idx + 1}
                          isExpanded={expandedGroups.has(group.hash)}
                          onToggle={() => toggleGroup(group.hash)}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No duplicates found! Your question bank is clean.
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const DuplicateGroupCard = ({ 
  group, 
  index,
  isExpanded,
  onToggle
}: { 
  group: DuplicateGroup; 
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className="border rounded-lg p-4">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-muted-foreground">#{index}</span>
          <Badge variant={group.similarity === 'exact' ? 'destructive' : 'secondary'}>
            {group.similarity === 'exact' ? 'Exact Match' : 'Similar'}
          </Badge>
          <span className="text-sm">
            {group.questions.length} questions
          </span>
        </div>
        <span className="text-muted-foreground">{isExpanded ? '▼' : '▶'}</span>
      </div>
      
      {isExpanded && (
        <div className="mt-4 space-y-3">
          {group.questions.map((q, qIdx) => (
            <div 
              key={q.id} 
              className={`p-3 rounded border ${qIdx === 0 ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="font-mono text-xs">
                  {q.id}
                </Badge>
                <span className="text-xs text-muted-foreground">{q.source}</span>
                {qIdx === 0 && (
                  <Badge variant="outline" className="text-xs text-green-600">
                    Keep
                  </Badge>
                )}
                {qIdx > 0 && (
                  <Badge variant="outline" className="text-xs text-red-600">
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </Badge>
                )}
              </div>
              <p className="text-sm line-clamp-3">{q.question}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DuplicateDetector;
