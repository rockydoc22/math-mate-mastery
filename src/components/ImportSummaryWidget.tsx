import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertTriangle, BookOpen, Play, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buildImportSummary } from '@/data/supplemental';

export function ImportSummaryWidget() {
  const summary = useMemo(() => buildImportSummary(), []);
  const [showIssues, setShowIssues] = useState(false);
  const hasIssues = summary.issues.length > 0;

  return (
    <Card className="p-4 mb-4 border-2 border-primary/20">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-bold text-sm">New Question Import</h3>
            <p className="text-xs text-muted-foreground">
              {summary.validCount}/{summary.totalLoaded} validated
            </p>
          </div>
        </div>
        {hasIssues ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
            <AlertTriangle className="w-3 h-3" /> {summary.issues.length} flagged
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
            <CheckCircle2 className="w-3 h-3" /> All clean
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs mb-3">
        <div>
          <p className="font-semibold text-muted-foreground mb-1">By Subject</p>
          <ul className="space-y-0.5">
            {Object.entries(summary.bySubject).map(([k, v]) => (
              <li key={k} className="flex justify-between">
                <span>{k}</span>
                <span className="font-mono">{v}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-muted-foreground mb-1">By Period</p>
          <ul className="space-y-0.5">
            {Object.entries(summary.byPeriod).map(([k, v]) => (
              <li key={k} className="flex justify-between">
                <span>{k}</span>
                <span className="font-mono">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {hasIssues && (
        <div className="mb-3">
          <button
            onClick={() => setShowIssues(!showIssues)}
            className="text-xs font-medium text-amber-700 dark:text-amber-300 inline-flex items-center gap-1"
          >
            {showIssues ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {showIssues ? 'Hide' : 'Show'} validation issues
          </button>
          {showIssues && (
            <ul className="mt-2 space-y-1 text-xs max-h-40 overflow-auto bg-muted/40 rounded p-2">
              {summary.issues.slice(0, 30).map((iss, i) => (
                <li key={i}>
                  <span className="font-mono">#{iss.id}</span>{' '}
                  <span className="text-muted-foreground">({iss.source})</span>:{' '}
                  {iss.problems.join('; ')}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <Link to="/ap-study?subject=us-history">
        <Button size="sm" className="w-full gap-2">
          <Play className="w-4 h-4" /> Start practice
        </Button>
      </Link>
    </Card>
  );
}