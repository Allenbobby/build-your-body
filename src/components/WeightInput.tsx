import { Scale } from 'lucide-react';

interface WeightInputProps {
  value: number;
  onChange: (weight: number) => void;
}

export function WeightInput({ value, onChange }: WeightInputProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        Bodyweight
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
          <Scale className="w-5 h-5" />
        </div>
        <input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(Number(e.target.value))}
          placeholder="Enter your weight"
          min={30}
          max={200}
          className="
            w-full pl-12 pr-16 py-4 rounded-xl
            bg-card border-2 border-border
            text-foreground text-lg font-display font-semibold
            placeholder:text-muted-foreground placeholder:font-normal
            focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
            transition-all duration-300
          "
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
          kg
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Enter your current bodyweight in kilograms
      </p>
    </div>
  );
}
