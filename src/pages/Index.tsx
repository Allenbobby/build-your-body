import { useState, useMemo } from 'react';
import { Dumbbell } from 'lucide-react';
import { WeightInput } from '@/components/WeightInput';
import { GoalSelector } from '@/components/GoalSelector';
import { ActivitySelector } from '@/components/ActivitySelector';
import { MacroDisplay } from '@/components/MacroDisplay';
import { FoodPlan } from '@/components/FoodPlan';
import { Tips } from '@/components/Tips';
import { FoodDatabase } from '@/components/FoodDatabase';
import { 
  Goal, 
  ActivityLevel, 
  calculateMacros, 
  calculateFoodQuantities 
} from '@/lib/dietCalculations';

const Index = () => {
  const [bodyweight, setBodyweight] = useState<number>(70);
  const [goal, setGoal] = useState<Goal>('bulk');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('normal');

  const macros = useMemo(() => {
    if (!bodyweight || bodyweight < 30) return null;
    return calculateMacros(bodyweight, goal, activityLevel);
  }, [bodyweight, goal, activityLevel]);

  const foodQuantities = useMemo(() => {
    if (!macros) return null;
    return calculateFoodQuantities(macros);
  }, [macros]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-foreground">
                Diet Calculator
              </h1>
              <p className="text-sm text-muted-foreground">
                For Natural Bodybuilding
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl card-gradient border border-border space-y-6">
              <WeightInput value={bodyweight} onChange={setBodyweight} />
              <GoalSelector value={goal} onChange={setGoal} />
              <ActivitySelector value={activityLevel} onChange={setActivityLevel} />
            </div>

            {/* Quick Explanation */}
            <div className="p-4 rounded-xl bg-muted/30 border border-border">
              <h4 className="text-sm font-medium text-foreground mb-2">How it works</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <strong>Calories</strong> = Bodyweight × Activity Multiplier (±400 for bulk/cut)</li>
                <li>• <strong>Protein</strong> = 2.2g per kg bodyweight</li>
                <li>• <strong>Fats</strong> = 0.9g per kg bodyweight</li>
                <li>• <strong>Carbs</strong> = Remaining calories ÷ 4</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {macros ? (
              <>
                <MacroDisplay macros={macros} goal={goal} />
                {foodQuantities && <FoodPlan quantities={foodQuantities} />}
              </>
            ) : (
              <div className="p-8 rounded-2xl card-gradient border border-border text-center">
                <p className="text-muted-foreground">
                  Enter your bodyweight to see your personalized diet plan
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        {macros && (
          <div className="mt-8 grid lg:grid-cols-2 gap-8">
            <Tips goal={goal} />
            <FoodDatabase />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Built for natural bodybuilders • All values in metric (kg/g/ml)
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
