import { useState, useCallback, useRef } from 'react';
import { lookupWord } from '@/data/satVocabulary';
import { supabase } from '@/integrations/supabase/client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { BookOpen, Loader2 } from 'lucide-react';

interface ClickableTextProps {
  text: string;
  className?: string;
}

const MIN_WORD_LENGTH = 4;

// Words to skip (common/simple words that don't need definitions)
const SKIP_WORDS = new Set([
  'that', 'this', 'with', 'from', 'have', 'been', 'were', 'will', 'what',
  'when', 'your', 'each', 'they', 'them', 'then', 'than', 'also', 'more',
  'most', 'much', 'many', 'some', 'does', 'done', 'into', 'over', 'such',
  'only', 'very', 'just', 'about', 'would', 'could', 'should', 'their',
  'there', 'these', 'those', 'which', 'where', 'while', 'after', 'before',
  'being', 'other', 'under', 'still', 'between', 'because', 'through',
  'during', 'without', 'however', 'another', 'around', 'every', 'never',
  'always', 'since', 'until', 'above', 'below', 'again', 'here', 'both',
]);

export const ClickableText = ({ text, className = '' }: ClickableTextProps) => {
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [definition, setDefinition] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const cacheRef = useRef<Record<string, string>>({});

  const fetchDefinition = useCallback(async (word: string) => {
    const lower = word.toLowerCase();
    
    // Check cache first
    if (cacheRef.current[lower]) {
      setDefinition(cacheRef.current[lower]);
      return;
    }

    // Check built-in dictionary
    const builtIn = lookupWord(lower);
    if (builtIn) {
      cacheRef.current[lower] = builtIn;
      setDefinition(builtIn);
      return;
    }

    // Fall back to AI
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('define-word', {
        body: { word: lower, context: text.substring(0, 200) },
      });
      
      if (error) throw error;
      const def = data?.definition || 'Definition not available.';
      cacheRef.current[lower] = def;
      setDefinition(def);
    } catch (err) {
      console.error('Failed to fetch definition:', err);
      setDefinition('Could not load definition. Try again later.');
    } finally {
      setLoading(false);
    }
  }, [text]);

  const handleWordClick = useCallback((word: string) => {
    const clean = word.replace(/[^a-zA-Z'-]/g, '');
    if (clean.length < MIN_WORD_LENGTH || SKIP_WORDS.has(clean.toLowerCase())) return;
    
    setActiveWord(clean);
    setDefinition(null);
    setPopoverOpen(true);
    fetchDefinition(clean);
  }, [fetchDefinition]);

  // Split text into words while preserving spaces and punctuation
  const parts = text.split(/(\s+)/);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        // Whitespace - render as-is
        if (/^\s+$/.test(part)) return <span key={i}>{part}</span>;
        
        // Extract the clean word
        const clean = part.replace(/[^a-zA-Z'-]/g, '');
        const isClickable = clean.length >= MIN_WORD_LENGTH && !SKIP_WORDS.has(clean.toLowerCase());
        
        if (!isClickable) return <span key={i}>{part}</span>;

        const isActive = activeWord === clean && popoverOpen;

        return (
          <Popover key={i} open={isActive} onOpenChange={(open) => {
            if (!open) {
              setPopoverOpen(false);
              setActiveWord(null);
            }
          }}>
            <PopoverTrigger asChild>
              <span
                onClick={() => handleWordClick(part)}
                className={`cursor-pointer border-b border-dotted border-muted-foreground/30 hover:border-primary hover:text-primary transition-colors ${
                  isActive ? 'text-primary border-primary' : ''
                }`}
              >
                {part}
              </span>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-3" side="top" align="center">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="font-semibold text-sm capitalize">{activeWord}</span>
                </div>
                {loading ? (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground py-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Looking up definition...
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground leading-relaxed">{definition}</p>
                )}
              </div>
            </PopoverContent>
          </Popover>
        );
      })}
    </span>
  );
};
