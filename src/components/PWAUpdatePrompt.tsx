import { usePWAUpdate } from '@/hooks/usePWAUpdate';
import { Button } from '@/components/ui/button';
import { RefreshCw, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function PWAUpdatePrompt() {
  const { hasUpdate, forceUpdate, isUpdating } = usePWAUpdate();

  return (
    <AnimatePresence>
      {hasUpdate && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-md"
        >
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl p-4 shadow-2xl border-2 border-primary-foreground/20 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Download className="h-6 w-6 animate-bounce" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-yellow-400 rounded-full animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold">🆕 New Update Available!</span>
                <span className="text-xs opacity-90">Tap to get the latest features</span>
              </div>
            </div>
            <Button
              size="sm"
              variant="secondary"
              onClick={forceUpdate}
              disabled={isUpdating}
              className="shrink-0 font-semibold"
            >
              {isUpdating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Now'
              )}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
