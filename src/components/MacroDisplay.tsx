import { MacroResult, Goal, getGoalColor } from '@/lib/dietCalculations';
import { Flame, Beef, Droplets, Wheat } from 'lucide-react';

interface MacroDisplayProps {
  macros: MacroResult;
  goal: Goal;
}

export function MacroDisplay({ macros, goal }: MacroDisplayProps) {
  const goalColor = getGoalColor(goal);
  const totalCalories = macros.proteinCalories + macros.fatCalories + macros.carbCalories;

  const proteinPercentage = (macros.proteinCalories / totalCalories) * 100;
  const fatPercentage = (macros.fatCalories / totalCalories) * 100;
  const carbPercentage = (macros.carbCalories / totalCalories) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Main Calories Display */}
      <div className="text-center p-6 rounded-2xl card-gradient border border-border">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Flame className={`w-6 h-6 ${goalColor}`} />
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Daily Calories
          </span>
        </div>
        <div className={`text-6xl font-display font-bold ${goalColor} animate-scale-in`}>
          {macros.calories.toLocaleString()}
        </div>
        <div className="text-muted-foreground mt-1">kcal / day</div>
      </div>

      {/* Macro Breakdown */}
      <div className="grid grid-cols-3 gap-4">
        <MacroCard
          icon={Beef}
          label="Protein"
          value={macros.protein}
          unit="g"
          calories={macros.proteinCalories}
          percentage={proteinPercentage}
          color="text-red-400"
          bgColor="bg-red-400/20"
        />
        <MacroCard
          icon={Droplets}
          label="Fats"
          value={macros.fats}
          unit="g"
          calories={macros.fatCalories}
          percentage={fatPercentage}
          color="text-yellow-400"
          bgColor="bg-yellow-400/20"
        />
        <MacroCard
          icon={Wheat}
          label="Carbs"
          value={macros.carbs}
          unit="g"
          calories={macros.carbCalories}
          percentage={carbPercentage}
          color="text-primary"
          bgColor="bg-primary/20"
        />
      </div>

      {/* Visual Bar */}
      <div className="h-4 rounded-full overflow-hidden flex bg-muted">
        <div 
          className="bg-red-400 transition-all duration-500"
          style={{ width: `${proteinPercentage}%` }}
        />
        <div 
          className="bg-yellow-400 transition-all duration-500"
          style={{ width: `${fatPercentage}%` }}
        />
        <div 
          className="bg-primary transition-all duration-500"
          style={{ width: `${carbPercentage}%` }}
        />
      </div>
    </div>
  );
}

interface MacroCardProps {
  icon: typeof Beef;
  label: string;
  value: number;
  unit: string;
  calories: number;
  percentage: number;
  color: string;
  bgColor: string;
}

function MacroCard({ icon: Icon, label, value, unit, calories, percentage, color, bgColor }: MacroCardProps) {
  return (
    <div className="p-4 rounded-xl card-gradient border border-border text-center">
      <div className={`inline-flex p-2 rounded-lg ${bgColor} mb-2`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div className={`text-2xl font-display font-bold ${color}`}>
        {value}
        <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>
      </div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
      <div className="text-xs text-muted-foreground/70 mt-1">
        {calories} kcal ({Math.round(percentage)}%)
      </div>
    </div>
  );
}
