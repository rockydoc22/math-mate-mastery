import { usePWAUpdate } from '@/hooks/usePWAUpdate';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function PWAUpdatePrompt() {
  const { hasUpdate, forceUpdate, isUpdating } = usePWAUpdate();

  return (
    <AnimatePresence>
      {hasUpdate && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-20 left-4 right-4 z-50 mx-auto max-w-md"
        >
          <div className="bg-primary text-primary-foreground rounded-lg p-4 shadow-lg flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <RefreshCw className={`h-5 w-5 ${isUpdating ? 'animate-spin' : ''}`} />
              <div className="flex flex-col">
                <span className="text-sm font-medium">New version available!</span>
                <a
                  href="/quick-fix.html"
                  className="text-xs opacity-90 underline underline-offset-4"
                >
                  If iPhone shows blank screen → Quick Fix
                </a>
              </div>
            </div>
            <Button
              size="sm"
              variant="secondary"
              onClick={forceUpdate}
              disabled={isUpdating}
              className="shrink-0"
            >
              {isUpdating ? 'Updating...' : 'Update Now'}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
