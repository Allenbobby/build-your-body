export type Goal = 'bulk' | 'maintain' | 'cut';
export type ActivityLevel = 'normal' | 'high';

export interface MacroResult {
  calories: number;
  protein: number;
  fats: number;
  carbs: number;
  proteinCalories: number;
  fatCalories: number;
  carbCalories: number;
}

export interface FoodQuantities {
  chicken: number; // grams
  eggs: number; // count
  wheyProtein: number; // scoops
  milk: number; // ml
  rice: number; // grams
  oats: number; // grams
  potato: number; // grams
  chapati: number; // count
  banana: number; // count
  peanuts: number; // grams
  oil: number; // tablespoons
}

// Food database with protein, carbs, and fats per unit
export const FOOD_DATABASE = {
  protein: {
    chicken: { protein: 22, unit: '100g', label: 'Chicken (raw)' },
    egg: { protein: 6, unit: 'egg', label: 'Whole Egg' },
    whey: { protein: 24, unit: 'scoop', label: 'Whey Protein' },
    milk: { protein: 8, unit: '250ml', label: 'Milk' },
    curd: { protein: 10, unit: '100g', label: 'Curd' },
  },
  carbs: {
    rice: { carbs: 78, unit: '100g', label: 'Rice (raw)' },
    oats: { carbs: 66, unit: '100g', label: 'Oats' },
    potato: { carbs: 17, unit: '100g', label: 'Potato (raw)' },
    chapati: { carbs: 20, unit: 'piece', label: 'Chapati' },
    banana: { carbs: 27, unit: 'piece', label: 'Banana' },
  },
  fats: {
    peanuts: { fat: 10, unit: '30g', label: 'Peanuts' },
    oil: { fat: 10, unit: 'tbsp', label: 'Oil' },
  },
};

export function calculateMacros(
  bodyweight: number,
  goal: Goal,
  activityLevel: ActivityLevel
): MacroResult {
  const activityMultiplier = activityLevel === 'normal' ? 36 : 38;
  const maintenanceCalories = bodyweight * activityMultiplier;

  let calories: number;
  switch (goal) {
    case 'bulk':
      calories = maintenanceCalories + 400;
      break;
    case 'cut':
      calories = maintenanceCalories - 400;
      break;
    default:
      calories = maintenanceCalories;
  }

  const protein = Math.round(bodyweight * 2.2);
  const fats = Math.round(bodyweight * 0.9);

  const proteinCalories = protein * 4;
  const fatCalories = fats * 9;
  const carbCalories = Math.max(0, calories - proteinCalories - fatCalories);
  const carbs = Math.round(carbCalories / 4);

  return {
    calories: Math.round(calories),
    protein,
    fats,
    carbs,
    proteinCalories,
    fatCalories,
    carbCalories,
  };
}

export function calculateFoodQuantities(macros: MacroResult): FoodQuantities {
  const { protein, carbs, fats } = macros;

  // Protein distribution: 60-70% from chicken, rest from eggs and whey
  const chickenProtein = protein * 0.65;
  const remainingProtein = protein - chickenProtein;
  const eggProtein = remainingProtein * 0.5;
  const wheyProtein = remainingProtein * 0.5;

  // Calculate quantities
  const chicken = Math.round((chickenProtein / 22) * 100); // grams
  const eggs = Math.round(eggProtein / 6); // count
  const wheyProteinScoops = Math.round(wheyProtein / 24); // scoops
  const milk = 250; // fixed 250ml for convenience

  // Carb distribution
  const riceCarbs = carbs * 0.4;
  const oatsCarbs = carbs * 0.15;
  const potatoCarbs = carbs * 0.15;
  const chapatiCarbs = carbs * 0.15;
  const bananaCarbs = carbs * 0.15;

  const rice = Math.round((riceCarbs / 78) * 100);
  const oats = Math.round((oatsCarbs / 66) * 100);
  const potato = Math.round((potatoCarbs / 17) * 100);
  const chapati = Math.round(chapatiCarbs / 20);
  const banana = Math.round(bananaCarbs / 27);

  // Fat sources (some from eggs, rest from peanuts/oil)
  const eggFat = eggs * 5; // ~5g fat per egg
  const remainingFat = Math.max(0, fats - eggFat);
  const peanuts = Math.round((remainingFat * 0.6) * 3); // 30g peanuts = 10g fat
  const oil = Math.round(remainingFat * 0.4 / 10); // tablespoons

  return {
    chicken,
    eggs,
    wheyProtein: Math.max(1, wheyProteinScoops),
    milk,
    rice,
    oats,
    potato,
    chapati: Math.max(1, chapati),
    banana: Math.max(1, banana),
    peanuts,
    oil: Math.max(1, oil),
  };
}

export function getGoalColor(goal: Goal): string {
  switch (goal) {
    case 'bulk':
      return 'text-success';
    case 'cut':
      return 'text-destructive';
    default:
      return 'text-warning';
  }
}

export function getGoalGradient(goal: Goal): string {
  switch (goal) {
    case 'bulk':
      return 'bg-gradient-to-r from-success/20 to-success/5';
    case 'cut':
      return 'bg-gradient-to-r from-destructive/20 to-destructive/5';
    default:
      return 'bg-gradient-to-r from-warning/20 to-warning/5';
  }
}
