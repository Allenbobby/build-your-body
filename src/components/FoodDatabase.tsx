import { FOOD_DATABASE } from '@/lib/dietCalculations';
import { Database, Beef, Wheat, Droplets } from 'lucide-react';

export function FoodDatabase() {
  return (
    <div className="space-y-4 animate-slide-up">
      <h3 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
        <Database className="w-5 h-5 text-primary" />
        Food Database Reference
      </h3>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Protein Sources */}
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 mb-3">
            <Beef className="w-4 h-4 text-red-400" />
            <h4 className="text-sm font-medium text-red-400 uppercase tracking-wider">Protein</h4>
          </div>
          <div className="space-y-2">
            {Object.entries(FOOD_DATABASE.protein).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{value.label}</span>
                <span className="text-foreground font-medium">{value.protein}g / {value.unit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Carb Sources */}
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 mb-3">
            <Wheat className="w-4 h-4 text-primary" />
            <h4 className="text-sm font-medium text-primary uppercase tracking-wider">Carbs</h4>
          </div>
          <div className="space-y-2">
            {Object.entries(FOOD_DATABASE.carbs).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{value.label}</span>
                <span className="text-foreground font-medium">{value.carbs}g / {value.unit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fat Sources */}
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 mb-3">
            <Droplets className="w-4 h-4 text-yellow-400" />
            <h4 className="text-sm font-medium text-yellow-400 uppercase tracking-wider">Fats</h4>
          </div>
          <div className="space-y-2">
            {Object.entries(FOOD_DATABASE.fats).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{value.label}</span>
                <span className="text-foreground font-medium">{value.fat}g / {value.unit}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Egg yolk</span>
              <span className="text-foreground font-medium">~5g / egg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
