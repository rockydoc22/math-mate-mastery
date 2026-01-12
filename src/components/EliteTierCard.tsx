import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Zap, Target, ChevronRight, CheckCircle } from 'lucide-react';
import { EliteTier } from '@/utils/eliteTiers';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface EliteTierCardProps {
  tier: EliteTier;
  isRecommended?: boolean;
}

export const EliteTierCard = ({ tier, isRecommended }: EliteTierCardProps) => {
  const navigate = useNavigate();

  const getIcon = () => {
    switch (tier.id) {
      case '1600_club':
        return <Crown className="w-6 h-6 text-amber-400" />;
      case 'elite_1500':
        return <Target className="w-6 h-6 text-purple-400" />;
      default:
        return <Zap className="w-6 h-6 text-blue-400" />;
    }
  };

  const handleStart = () => {
    navigate(`/elite-practice?tier=${tier.id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className={`relative overflow-hidden ${tier.bgColor} border-2 ${isRecommended ? 'border-primary' : 'border-transparent'}`}>
        {isRecommended && (
          <div className="absolute top-0 right-0">
            <Badge className="rounded-none rounded-bl-lg bg-primary text-primary-foreground">
              Recommended
            </Badge>
          </div>
        )}
        
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-background/50 backdrop-blur-sm">
              {getIcon()}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`font-bold text-lg ${tier.color}`}>
                  {tier.name}
                </h3>
                <Badge variant="outline" className="text-xs">
                  {tier.scoreRange.min}-{tier.scoreRange.max}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                {tier.description}
              </p>

              <div className="space-y-1.5 mb-4">
                {tier.features.slice(0, 3).map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <CheckCircle className="w-3 h-3 text-green-500 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
                {tier.features.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{tier.features.length - 3} more features
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">Difficulty:</span> {tier.difficultyRange.min}-{tier.difficultyRange.max}
                </div>
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">Pacing:</span> {tier.pacingThresholdMs / 1000}s
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={handleStart}
            className="w-full mt-4 gap-2"
            variant={isRecommended ? 'default' : 'outline'}
          >
            Start {tier.name} Practice
            <ChevronRight className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
