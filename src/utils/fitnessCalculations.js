export const GOALS = [
  { value: 'lose weight', label: 'Lose weight' },
  { value: 'maintain', label: 'Maintain weight' },
  { value: 'gain muscle', label: 'Build muscle' },
];

export const calculateBmi = (weightKg, heightCm) => {
  if (!weightKg || !heightCm) return null;
  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
};

export const getBmiCategory = (bmi) => {
  if (bmi == null) return { label: '—', color: 'default', advice: '' };
  if (bmi < 18.5) {
    return {
      label: 'Underweight',
      color: 'info',
      advice: 'Focus on strength training and balanced nutrition to build healthy mass.',
    };
  }
  if (bmi < 25) {
    return {
      label: 'Normal',
      color: 'success',
      advice: 'Great range — combine strength and cardio for overall fitness.',
    };
  }
  if (bmi < 30) {
    return {
      label: 'Overweight',
      color: 'warning',
      advice: 'Cardio plus resistance training can support sustainable fat loss.',
    };
  }
  return {
    label: 'Obese',
    color: 'error',
    advice: 'Start with low-impact cardio and gradual strength work; consult a doctor if needed.',
  };
};

export const calculateBmr = (weightKg, heightCm, age) =>
  Math.round(10 * weightKg + 6.25 * heightCm - 5 * age - 78);

export const calculateDailyCalories = (bmr, goal) => {
  const activityMultiplier = {
    'lose weight': 1.4,
    maintain: 1.55,
    'gain muscle': 1.65,
  };

  const adjustment = {
    'lose weight': -500,
    maintain: 0,
    'gain muscle': 300,
  };

  const tdee = bmr * (activityMultiplier[goal] || 1.55);
  const target = Math.round(tdee + (adjustment[goal] || 0));

  return {
    maintenance: Math.round(tdee),
    target: Math.max(target, 1200),
    adjustment: adjustment[goal] || 0,
  };
};

export const getWorkoutSuggestions = (bmi, goal) => {
  const suggestions = [];

  if (goal === 'lose weight') {
    suggestions.push(
      { title: 'Cardio', bodyPart: 'cardio', description: 'Burn calories and improve heart health' },
      { title: 'Full-body circuits', bodyPart: 'waist', description: 'Core + metabolic conditioning' },
      { title: 'Lower body', bodyPart: 'upper legs', description: 'Large muscle groups = higher calorie burn' },
    );
    if (bmi >= 25) {
      suggestions.push(
        { title: 'Low-impact cardio', bodyPart: 'cardio', description: 'Walking, cycling, swimming' },
      );
    }
  } else if (goal === 'gain muscle') {
    suggestions.push(
      { title: 'Chest & push', bodyPart: 'chest', description: 'Pressing movements for upper body mass' },
      { title: 'Back & pull', bodyPart: 'back', description: 'Rows and pulls for posture and width' },
      { title: 'Legs', bodyPart: 'upper legs', description: 'Squats and lunges for lower-body growth' },
      { title: 'Shoulders', bodyPart: 'shoulders', description: 'Overhead work for balanced physique' },
    );
  } else {
    suggestions.push(
      { title: 'Balanced strength', bodyPart: 'chest', description: 'Maintain muscle with compound lifts' },
      { title: 'Cardio', bodyPart: 'cardio', description: 'Keep cardiovascular fitness steady' },
      { title: 'Core & stability', bodyPart: 'waist', description: 'Support spine and daily movement' },
    );
  }

  if (bmi != null && bmi < 18.5) {
    suggestions.unshift(
      { title: 'Strength focus', bodyPart: 'upper arms', description: 'Progressive resistance to gain healthy weight' },
    );
  }

  if (bmi != null && bmi >= 30 && goal === 'lose weight') {
    suggestions.unshift(
      { title: 'Gentle cardio', bodyPart: 'cardio', description: 'Start steady — consistency beats intensity' },
    );
  }

  const unique = [];
  const seen = new Set();
  suggestions.forEach((item) => {
    const key = item.bodyPart + item.title;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(item);
    }
  });

  return unique.slice(0, 5);
};

export const validateInputs = ({ height, weight, age }) => {
  const h = Number(height);
  const w = Number(weight);
  const a = Number(age);

  if (!h || h < 100 || h > 250) return 'Enter height between 100–250 cm';
  if (!w || w < 30 || w > 300) return 'Enter weight between 30–300 kg';
  if (!a || a < 10 || a > 100) return 'Enter age between 10–100';

  return null;
};
