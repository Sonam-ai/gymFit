export const DEFAULT_BODY_PARTS = [
  'all',
  'back',
  'cardio',
  'chest',
  'lower arms',
  'lower legs',
  'neck',
  'shoulders',
  'upper arms',
  'upper legs',
  'waist',
];

const MOCK_EXERCISE_DATA = [
  {
    id: 'fallback-pull-up',
    name: 'assisted pull-up',
    bodyPart: 'back',
    target: 'lats',
    equipment: 'body weight',
    instructions: [
      'Hold the bar slightly wider than shoulder-width.',
      'Pull your chest toward the bar while keeping control.',
      'Lower yourself slowly to the starting position.',
    ],
  },
  {
    id: 'fallback-jumping-jacks',
    name: 'jumping jacks',
    bodyPart: 'cardio',
    target: 'cardiovascular system',
    equipment: 'body weight',
    instructions: [
      'Stand tall with arms by your sides.',
      'Jump your feet out while raising your arms overhead.',
      'Jump back to the starting position and repeat.',
    ],
  },
  {
    id: 'fallback-push-up',
    name: 'push-up',
    bodyPart: 'chest',
    target: 'pectorals',
    equipment: 'body weight',
    instructions: [
      'Start in a high plank with hands under your shoulders.',
      'Lower your chest toward the floor with control.',
      'Push back up until your arms are straight.',
    ],
  },
  {
    id: 'fallback-wrist-curl',
    name: 'wrist curl',
    bodyPart: 'lower arms',
    target: 'forearms',
    equipment: 'dumbbell',
    instructions: [
      'Sit with your forearm supported and palm facing up.',
      'Curl the wrist upward using a controlled motion.',
      'Lower the weight slowly and repeat.',
    ],
  },
  {
    id: 'fallback-calf-raise',
    name: 'standing calf raise',
    bodyPart: 'lower legs',
    target: 'calves',
    equipment: 'body weight',
    instructions: [
      'Stand tall with feet hip-width apart.',
      'Rise onto the balls of your feet.',
      'Pause briefly, then lower with control.',
    ],
  },
  {
    id: 'fallback-neck-flexion',
    name: 'neck flexion stretch',
    bodyPart: 'neck',
    target: 'levator scapulae',
    equipment: 'body weight',
    instructions: [
      'Sit tall with relaxed shoulders.',
      'Gently lower your chin toward your chest.',
      'Hold briefly without forcing the stretch.',
    ],
  },
  {
    id: 'fallback-shoulder-press',
    name: 'dumbbell shoulder press',
    bodyPart: 'shoulders',
    target: 'delts',
    equipment: 'dumbbell',
    instructions: [
      'Hold dumbbells at shoulder height.',
      'Press overhead until your arms are extended.',
      'Lower back to shoulder height with control.',
    ],
  },
  {
    id: 'fallback-biceps-curl',
    name: 'biceps curl',
    bodyPart: 'upper arms',
    target: 'biceps',
    equipment: 'dumbbell',
    instructions: [
      'Stand tall with dumbbells at your sides.',
      'Curl the weights toward your shoulders.',
      'Lower slowly without swinging.',
    ],
  },
  {
    id: 'fallback-squat',
    name: 'bodyweight squat',
    bodyPart: 'upper legs',
    target: 'quads',
    equipment: 'body weight',
    instructions: [
      'Stand with feet about shoulder-width apart.',
      'Push your hips back and bend your knees.',
      'Drive through your feet to stand tall again.',
    ],
  },
  {
    id: 'fallback-plank',
    name: 'front plank',
    bodyPart: 'waist',
    target: 'abs',
    equipment: 'body weight',
    instructions: [
      'Place forearms on the floor and extend your legs back.',
      'Keep your body in a straight line.',
      'Hold while breathing steadily.',
    ],
  },
];

export const FALLBACK_EXERCISES = MOCK_EXERCISE_DATA.map((exercise) => ({
  gifUrl: '',
  secondaryMuscles: [],
  description: 'Temporary local mock exercise used when ExerciseDB is unavailable.',
  difficulty: '',
  category: '',
  ...exercise,
}));

export const MOCK_EXERCISES = FALLBACK_EXERCISES;
