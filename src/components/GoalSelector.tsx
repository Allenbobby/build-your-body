import { Goal } from '@/lib/dietCalculations';
import { TrendingUp, Minus, TrendingDown } from 'lucide-react';

interface GoalSelectorProps {
  value: Goal;
  onChange: (goal: Goal) => void;
}

const goals: { value: Goal; label: string; icon: typeof TrendingUp; description: string }[] = [
  { value: 'bulk', label: 'Bulk', icon: TrendingUp, description: '+400 kcal' },
  { value: 'maintain', label: 'Maintain', icon: Minus, description: 'Baseline' },
  { value: 'cut', label: 'Cut', icon: TrendingDown, description: '-400 kcal' },
];

export function GoalSelector({ value, onChange }: GoalSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        Your Goal
      </label>
      <div className="grid grid-cols-3 gap-3">
        {goals.map((goal) => {
          const isActive = value === goal.value;
          const Icon = goal.icon;
          
          let activeClass = '';
          if (isActive) {
            switch (goal.value) {
              case 'bulk':
                activeClass = 'border-success bg-success/10 text-success';
                break;
              case 'maintain':
                activeClass = 'border-warning bg-warning/10 text-warning';
                break;
              case 'cut':
                activeClass = 'border-destructive bg-destructive/10 text-destructive';
                break;
            }
          }

          return (
            <button
              key={goal.value}
              onClick={() => onChange(goal.value)}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-300
                flex flex-col items-center gap-2
                ${isActive 
                  ? activeClass 
                  : 'border-border bg-card hover:border-muted-foreground/50 text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Icon className={`w-6 h-6 ${isActive ? '' : ''}`} />
              <span className="font-display font-semibold">{goal.label}</span>
              <span className="text-xs opacity-70">{goal.description}</span>
              {isActive && (
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-current animate-pulse-glow" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
