const EXERCISE_POOL = {
  bodyweight: {
    fat_loss: [
      { name: 'Jumping jacks', bodyPart: 'cardio' },
      { name: 'Burpees', bodyPart: 'cardio' },
      { name: 'Mountain climbers', bodyPart: 'cardio' },
      { name: 'High knees', bodyPart: 'cardio' },
      { name: 'Bodyweight squats', bodyPart: 'upper legs' },
      { name: 'Lunges', bodyPart: 'upper legs' },
      { name: 'Plank', bodyPart: 'waist' },
      { name: 'Bicycle crunches', bodyPart: 'waist' },
    ],
    muscle_gain: [
      { name: 'Push-ups', bodyPart: 'chest' },
      { name: 'Pike push-ups', bodyPart: 'shoulders' },
      { name: 'Pull-ups or inverted rows', bodyPart: 'back' },
      { name: 'Bulgarian split squats', bodyPart: 'upper legs' },
      { name: 'Glute bridge', bodyPart: 'upper legs' },
      { name: 'Dips (chair)', bodyPart: 'upper arms' },
      { name: 'Dead bug', bodyPart: 'waist' },
    ],
  },
  dumbbells: {
    fat_loss: [
      { name: 'Dumbbell thrusters', bodyPart: 'upper legs' },
      { name: 'Renegade rows', bodyPart: 'back' },
      { name: 'Dumbbell swings', bodyPart: 'upper legs' },
      { name: 'Goblet squats', bodyPart: 'upper legs' },
      { name: 'Dumbbell clean and press', bodyPart: 'shoulders' },
      { name: 'Farmers carry', bodyPart: 'waist' },
    ],
    muscle_gain: [
      { name: 'Dumbbell bench press', bodyPart: 'chest' },
      { name: 'Dumbbell rows', bodyPart: 'back' },
      { name: 'Romanian deadlift', bodyPart: 'upper legs' },
      { name: 'Shoulder press', bodyPart: 'shoulders' },
      { name: 'Bicep curls', bodyPart: 'upper arms' },
      { name: 'Tricep extensions', bodyPart: 'upper arms' },
      { name: 'Lateral raises', bodyPart: 'shoulders' },
    ],
  },
  barbell: {
    fat_loss: [
      { name: 'Barbell complex (light)', bodyPart: 'upper legs' },
      { name: 'Front squats', bodyPart: 'upper legs' },
      { name: 'Romanian deadlift', bodyPart: 'upper legs' },
      { name: 'Push press', bodyPart: 'shoulders' },
    ],
    muscle_gain: [
      { name: 'Barbell back squat', bodyPart: 'upper legs' },
      { name: 'Bench press', bodyPart: 'chest' },
      { name: 'Barbell row', bodyPart: 'back' },
      { name: 'Overhead press', bodyPart: 'shoulders' },
      { name: 'Deadlift', bodyPart: 'upper legs' },
    ],
  },
  resistance_bands: {
    fat_loss: [
      { name: 'Band squats', bodyPart: 'upper legs' },
      { name: 'Band pull-aparts', bodyPart: 'back' },
      { name: 'Band punches', bodyPart: 'cardio' },
      { name: 'Band lateral walks', bodyPart: 'upper legs' },
    ],
    muscle_gain: [
      { name: 'Band chest press', bodyPart: 'chest' },
      { name: 'Band rows', bodyPart: 'back' },
      { name: 'Band face pulls', bodyPart: 'shoulders' },
      { name: 'Band leg press', bodyPart: 'upper legs' },
    ],
  },
  full_gym: {
    fat_loss: [
      { name: 'Treadmill intervals', bodyPart: 'cardio' },
      { name: 'Rowing machine', bodyPart: 'cardio' },
      { name: 'Leg press', bodyPart: 'upper legs' },
      { name: 'Cable woodchops', bodyPart: 'waist' },
      { name: 'Battle ropes', bodyPart: 'cardio' },
    ],
    muscle_gain: [
      { name: 'Leg press', bodyPart: 'upper legs' },
      { name: 'Lat pulldown', bodyPart: 'back' },
      { name: 'Cable fly', bodyPart: 'chest' },
      { name: 'Seated leg curl', bodyPart: 'upper legs' },
      { name: 'Machine shoulder press', bodyPart: 'shoulders' },
    ],
  },
};

const WARMUP = [
  { name: 'Arm circles', sets: 1, reps: '30 sec', rest: '0 sec' },
  { name: 'Hip openers', sets: 1, reps: '10 each side', rest: '0 sec' },
  { name: 'Light cardio march', sets: 1, reps: '2 min', rest: '0 sec' },
];

const COOLDOWN = [
  { name: 'Hamstring stretch', sets: 1, reps: '30 sec each', rest: '0 sec' },
  { name: 'Chest doorway stretch', sets: 1, reps: '30 sec', rest: '0 sec' },
  { name: 'Deep breathing', sets: 1, reps: '1 min', rest: '0 sec' },
];

const PRESETS = {
  beginner: { sets: 3, reps: '12', rest: '60 sec', rounds: 1 },
  intermediate: { sets: 3, reps: '10', rest: '45 sec', rounds: 1 },
  advanced: { sets: 4, reps: '8', rest: '30 sec', rounds: 2 },
};

const pickExercises = (pool, count) => {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const exerciseCountForDuration = (minutes, experience) => {
  const base = Math.max(3, Math.floor((minutes - 10) / 6));
  if (experience === 'advanced') return base + 1;
  if (experience === 'beginner') return Math.max(3, base - 1);
  return base;
};

export const GOAL_OPTIONS = [
  { value: 'fat_loss', label: 'Fat loss' },
  { value: 'muscle_gain', label: 'Muscle gain' },
];

export const EQUIPMENT_OPTIONS = [
  { value: 'bodyweight', label: 'Bodyweight only' },
  { value: 'dumbbells', label: 'Dumbbells' },
  { value: 'barbell', label: 'Barbell' },
  { value: 'resistance_bands', label: 'Resistance bands' },
  { value: 'full_gym', label: 'Full gym' },
];

export const EXPERIENCE_OPTIONS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

export const DURATION_OPTIONS = [
  { value: 15, label: '15 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 45, label: '45 minutes' },
  { value: 60, label: '60 minutes' },
];

export const generateCustomWorkoutPlan = ({
  goal,
  equipment,
  experience,
  duration,
}) => {
  const goalKey = goal === 'muscle_gain' ? 'muscle_gain' : 'fat_loss';
  const pool = EXERCISE_POOL[equipment]?.[goalKey] || EXERCISE_POOL.bodyweight[goalKey];
  const preset = PRESETS[experience] || PRESETS.intermediate;
  const mainCount = exerciseCountForDuration(duration, experience);

  const mainExercises = pickExercises(pool, mainCount).map((ex) => ({
    ...ex,
    sets: preset.sets,
    reps: goalKey === 'fat_loss' ? '15' : preset.reps,
    rest: goalKey === 'fat_loss' ? '30 sec' : preset.rest,
    notes: goalKey === 'fat_loss' ? 'Controlled tempo, stay in motion' : 'Focus on form, last reps challenging',
  }));

  const warmupMinutes = Math.min(5, Math.floor(duration * 0.15));
  const cooldownMinutes = Math.min(5, Math.floor(duration * 0.1));
  const mainMinutes = duration - warmupMinutes - cooldownMinutes;

  const goalLabel = GOAL_OPTIONS.find((g) => g.value === goal)?.label || goal;
  const equipLabel = EQUIPMENT_OPTIONS.find((e) => e.value === equipment)?.label || equipment;
  const expLabel = EXPERIENCE_OPTIONS.find((e) => e.value === experience)?.label || experience;

  const tips =
    goalKey === 'fat_loss'
      ? [
          'Keep rest periods short to elevate heart rate.',
          'Stay hydrated and maintain steady breathing.',
          'Pair this plan with a slight calorie deficit for best results.',
        ]
      : [
          'Progressively increase weight or reps each week.',
          'Prioritize compound movements early in the session.',
          'Eat enough protein (roughly 1.6–2g per kg bodyweight).',
        ];

  return {
    title: `${duration}-Min ${goalLabel} Workout`,
    subtitle: `${expLabel} · ${equipLabel}`,
    totalMinutes: duration,
    source: 'smart-engine',
    sections: [
      {
        name: 'Warm-up',
        duration: warmupMinutes,
        exercises: WARMUP.slice(0, experience === 'beginner' ? 2 : 3),
      },
      {
        name: 'Main workout',
        duration: mainMinutes,
        exercises: mainExercises,
      },
      {
        name: 'Cool-down',
        duration: cooldownMinutes,
        exercises: COOLDOWN,
      },
    ],
    tips,
  };
};
