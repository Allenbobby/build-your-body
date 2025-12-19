import { ActivityLevel } from '@/lib/dietCalculations';
import { User, Zap } from 'lucide-react';

interface ActivitySelectorProps {
  value: ActivityLevel;
  onChange: (level: ActivityLevel) => void;
}

const levels: { value: ActivityLevel; label: string; icon: typeof User; multiplier: number; description: string }[] = [
  { value: 'normal', label: 'Normal', icon: User, multiplier: 36, description: 'Desk job, light exercise' },
  { value: 'high', label: 'High', icon: Zap, multiplier: 38, description: 'Active job, regular training' },
];

export function ActivitySelector({ value, onChange }: ActivitySelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        Activity Level
      </label>
      <div className="grid grid-cols-2 gap-3">
        {levels.map((level) => {
          const isActive = value === level.value;
          const Icon = level.icon;

          return (
            <button
              key={level.value}
              onClick={() => onChange(level.value)}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-300
                flex flex-col items-center gap-2
                ${isActive 
                  ? 'border-primary bg-primary/10 text-primary glow' 
                  : 'border-border bg-card hover:border-muted-foreground/50 text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Icon className="w-6 h-6" />
              <span className="font-display font-semibold">{level.label}</span>
              <span className="text-xs opacity-70">×{level.multiplier} multiplier</span>
              <span className="text-xs opacity-50">{level.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
