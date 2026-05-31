export const GOAL_OPTIONS = [
  { value: 'fat_loss', label: 'Fat Loss & Cardio' },
  { value: 'muscle_building', label: 'Muscle Building & Strength' },
  { value: 'endurance', label: 'Stamina & Endurance' },
];

export const EQUIPMENT_OPTIONS = [
  { value: 'all', label: 'Any Equipment' },
  { value: 'body weight', label: 'Bodyweight Only' },
  { value: 'dumbbell', label: 'Dumbbells Only' },
  { value: 'barbell', label: 'Barbell Only' },
];

export const EXPERIENCE_OPTIONS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'expert', label: 'Advanced / Expert' },
];

export const DURATION_OPTIONS = [
  { value: 15, label: '15 Minutes (Express)' },
  { value: 30, label: '30 Minutes (Standard)' },
  { value: 45, label: '45 Minutes (Intense)' },
];

const getRandomItems = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const generateWorkoutPlan = async ({ goal, equipment, experience, duration, localExercises = [] }) => {
  const pool = Array.isArray(localExercises) && localExercises.length > 0 ? localExercises : [];

  if (pool.length === 0) {
    throw new Error("Local dataset pool is empty.");
  }

  // Filter pool based on selected parameters
  let filtered = pool;
  if (equipment && equipment !== 'all') {
    filtered = filtered.filter(ex => String(ex.equipment).toLowerCase() === String(equipment).toLowerCase());
  }
  if (experience) {
    filtered = filtered.filter(ex => String(ex.level).toLowerCase() === String(experience).toLowerCase());
  }

  if (filtered.length === 0) filtered = pool;

  // Split your pools up cleanly for specific workout slot placement blocks
  const warmUpPool = filtered.filter(ex => String(ex.level).toLowerCase() === 'beginner');
  const mainPool = filtered;
  const coolDownPool = filtered.filter(ex => String(ex.force).toLowerCase() === 'pull');

  let count = 4;
  if (duration === 15) count = 3;
  if (duration === 45) count = 6;

  const rawWarmUp = getRandomItems(warmUpPool.length > 0 ? warmUpPool : pool, 2);
  const rawMain = getRandomItems(mainPool.length > 0 ? mainPool : pool, count);
  const rawCoolDown = getRandomItems(coolDownPool.length > 0 ? coolDownPool : pool, 2);

  // CRITICAL FIX: Forwarding the item ID property token so the detail pages match up!
  const mapSectionExercises = (items, defaultSets, defaultReps) => 
    items.map(item => ({
      id: item.id || '', // Binds the real JSON string identification value!
      name: item.name,
      bodyPart: (item.primaryMuscles && item.primaryMuscles[0]) || 'all', 
      sets: defaultSets,
      reps: defaultReps,
      rest: '30 sec',
    }));

  return {
    title: `${GOAL_OPTIONS.find(o => o.value === goal)?.label || 'Custom'} Plan`,
    subtitle: `${experience.toUpperCase()} Workout`,
    totalMinutes: duration,
    source: 'smart-engine',
    sections: [
      { name: 'Warm-up', duration: 5, exercises: mapSectionExercises(rawWarmUp, 1, '30s') },
      { name: 'Main workout', duration: duration - 8, exercises: mapSectionExercises(rawMain, 3, '12 reps') },
      { name: 'Cool-down', duration: 3, exercises: mapSectionExercises(rawCoolDown, 1, '1 min') },
    ],
  };
};