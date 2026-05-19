export const FAVORITE_EXERCISES_KEY = 'favorite-exercises';

export const getFavoriteExercises = () => {
  try {
    const favorites = JSON.parse(localStorage.getItem(FAVORITE_EXERCISES_KEY));
    return Array.isArray(favorites) ? favorites : [];
  } catch (error) {
    return [];
  }
};

export const saveFavoriteExercises = (favorites) => {
  localStorage.setItem(FAVORITE_EXERCISES_KEY, JSON.stringify(favorites));
};

export const isFavoriteExercise = (exerciseId) => (
  getFavoriteExercises().some((favorite) => favorite.id === exerciseId)
);

export const toggleFavoriteExercise = (exercise) => {
  const favorites = getFavoriteExercises();
  const exists = favorites.some((favorite) => favorite.id === exercise.id);
  const nextFavorites = exists
    ? favorites.filter((favorite) => favorite.id !== exercise.id)
    : [
      ...favorites,
      {
        id: exercise.id,
        name: exercise.name,
        bodyPart: exercise.bodyPart,
        target: exercise.target,
        equipment: exercise.equipment,
        gifUrl: exercise.gifUrl,
        instructions: exercise.instructions || [],
        stepCount: exercise.stepCount,
      },
    ];

  saveFavoriteExercises(nextFavorites);
  window.dispatchEvent(new Event('favorite-exercises-updated'));

  return !exists;
};
