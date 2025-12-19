import { FoodQuantities } from '@/lib/dietCalculations';
import { Drumstick, Egg, Cookie, Milk, Utensils, Apple, Croissant, Wheat, Droplets, Info } from 'lucide-react';

interface FoodPlanProps {
  quantities: FoodQuantities;
}

export function FoodPlan({ quantities }: FoodPlanProps) {
  return (
    <div className="space-y-6 animate-slide-up">
      <h3 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
        <Utensils className="w-5 h-5 text-primary" />
        Daily Food Plan
      </h3>

      {/* Protein Sources */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-red-400 uppercase tracking-wider flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          Protein Sources
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <FoodCard icon={Drumstick} name="Chicken (raw)" amount={quantities.chicken} unit="g" color="text-red-400" />
          <FoodCard icon={Egg} name="Whole Eggs" amount={quantities.eggs} unit="eggs" color="text-red-400" />
          <FoodCard icon={Cookie} name="Whey Protein" amount={quantities.wheyProtein} unit="scoops" color="text-red-400" />
          <FoodCard icon={Milk} name="Milk" amount={quantities.milk} unit="ml" color="text-red-400" />
        </div>
      </div>

      {/* Carb Sources */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-primary uppercase tracking-wider flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          Carb Sources
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <FoodCard icon={Wheat} name="Rice (raw)" amount={quantities.rice} unit="g" color="text-primary" />
          <FoodCard icon={Croissant} name="Oats" amount={quantities.oats} unit="g" color="text-primary" />
          <FoodCard icon={Apple} name="Potato (raw)" amount={quantities.potato} unit="g" color="text-primary" />
          <FoodCard icon={Croissant} name="Chapati" amount={quantities.chapati} unit="pcs" color="text-primary" />
          <FoodCard icon={Apple} name="Banana" amount={quantities.banana} unit="pcs" color="text-primary" />
        </div>
      </div>

      {/* Fat Sources */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-yellow-400 uppercase tracking-wider flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          Fat Sources
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <FoodCard icon={Cookie} name="Peanuts" amount={quantities.peanuts} unit="g" color="text-yellow-400" />
          <FoodCard icon={Droplets} name="Cooking Oil" amount={quantities.oil} unit="tbsp" color="text-yellow-400" />
        </div>
      </div>

      {/* Info Note */}
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex gap-3">
        <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Flexible Substitutions</p>
          <p>You can swap carb sources freely as long as total carbs are maintained. For example, replace rice with more potato or chapatis based on preference.</p>
        </div>
      </div>
    </div>
  );
}

interface FoodCardProps {
  icon: typeof Drumstick;
  name: string;
  amount: number;
  unit: string;
  color: string;
}

function FoodCard({ icon: Icon, name, amount, unit, color }: FoodCardProps) {
  return (
    <div className="p-3 rounded-lg bg-card border border-border flex items-center gap-3 transition-all hover:border-muted-foreground/30">
      <div className={`p-2 rounded-lg bg-secondary ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-muted-foreground truncate">{name}</div>
        <div className={`font-display font-semibold ${color}`}>
          {amount} <span className="text-xs text-muted-foreground font-normal">{unit}</span>
        </div>
      </div>
    </div>
  );
}
