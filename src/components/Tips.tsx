import { Goal } from '@/lib/dietCalculations';
import { Lightbulb, TrendingUp, AlertTriangle, Scale, Target } from 'lucide-react';

interface TipsProps {
  goal: Goal;
}

export function Tips({ goal }: TipsProps) {
  const tips = getTipsForGoal(goal);

  return (
    <div className="space-y-4 animate-slide-up">
      <h3 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-warning" />
        Weekly Adjustment Tips
      </h3>

      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div 
            key={index}
            className="p-4 rounded-xl bg-card border border-border flex gap-3"
          >
            <tip.icon className={`w-5 h-5 ${tip.color} flex-shrink-0 mt-0.5`} />
            <div>
              <p className="font-medium text-foreground text-sm">{tip.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="p-4 rounded-xl bg-muted/50 border border-border">
        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground">Disclaimer:</strong> This calculator provides general guidance for natural bodybuilding nutrition. Individual needs may vary. Consult a healthcare professional or registered dietitian for personalized advice. These recommendations are not medical advice.
        </p>
      </div>
    </div>
  );
}

function getTipsForGoal(goal: Goal) {
  const baseTips = [
    {
      icon: Scale,
      color: 'text-primary',
      title: 'Track Your Progress',
      description: 'Weigh yourself weekly, same time (morning, after bathroom). Look at 2-4 week trends, not daily fluctuations.',
    },
  ];

  switch (goal) {
    case 'bulk':
      return [
        ...baseTips,
        {
          icon: TrendingUp,
          color: 'text-success',
          title: 'Aim for 0.25-0.5 kg/week',
          description: 'If gaining less than 0.25 kg/week, add 100-150 more carbs. Slow and steady gains minimize fat accumulation.',
        },
        {
          icon: AlertTriangle,
          color: 'text-warning',
          title: 'Monitor Your Waist',
          description: 'If waist increases too fast (>2cm/month), slightly reduce carbs or fats by 10-15%. Some fat gain is normal.',
        },
        {
          icon: Target,
          color: 'text-primary',
          title: 'Progressive Overload',
          description: 'The surplus only works if you\'re training hard. Focus on adding weight or reps to compound lifts each week.',
        },
      ];
    case 'cut':
      return [
        ...baseTips,
        {
          icon: TrendingUp,
          color: 'text-destructive',
          title: 'Aim for 0.5-1% bodyweight/week',
          description: 'Faster cuts risk muscle loss. If losing faster, add 100-150 carbs. Patience preserves muscle.',
        },
        {
          icon: AlertTriangle,
          color: 'text-warning',
          title: 'Maintain Protein High',
          description: 'Never reduce protein during a cut. It\'s crucial for muscle preservation. Reduce carbs/fats instead if needed.',
        },
        {
          icon: Target,
          color: 'text-primary',
          title: 'Keep Lifting Heavy',
          description: 'Maintain training intensity. This signals your body to preserve muscle. Volume can be reduced, but intensity shouldn\'t.',
        },
      ];
    default:
      return [
        ...baseTips,
        {
          icon: Target,
          color: 'text-warning',
          title: 'Weight Should Stay Stable',
          description: 'Fluctuations of ±0.5 kg are normal. If trending up or down for 2+ weeks, adjust calories accordingly.',
        },
        {
          icon: TrendingUp,
          color: 'text-success',
          title: 'Focus on Performance',
          description: 'Without weight changes as a goal, focus on strength gains, recovery quality, and training consistency.',
        },
      ];
  }
}
