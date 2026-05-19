const unsplash = (photoId) =>
  `https://images.unsplash.com/${photoId}?w=640&h=480&fit=crop&auto=format&q=85`;

const bodyPartPhotos = {
  back: unsplash('photo-1603287528386-cab79cbb6eb5'),
  cardio: unsplash('photo-1476480862126-209bfaa8a6b2'),
  chest: unsplash('photo-1571019614242-c5c5dee9f50b'),
  'lower arms': unsplash('photo-1581009146145-b5ef050c2e1e'),
  'lower legs': unsplash('photo-1434682881908-33a995acd56b'),
  neck: unsplash('photo-1518611012118-696072aa579a'),
  shoulders: unsplash('photo-1583454114551-04745d2de5c9'),
  'upper arms': unsplash('photo-1534438327276-14e5300c3a48'),
  'upper legs': unsplash('photo-1517836357463-d5f99be501cd'),
  waist: unsplash('photo-1571019613454-1cb2f99b2d8b'),
  arms: unsplash('photo-1534438327276-14e5300c3a48'),
  legs: unsplash('photo-1434682881908-33a995acd56b'),
};

const nameKeywords = [
  { match: /push.?up|press|bench|fly|chest/i, photo: bodyPartPhotos.chest },
  { match: /pull|row|deadlift|back|lat/i, photo: bodyPartPhotos.back },
  { match: /squat|lunge|leg|calf|hamstring/i, photo: bodyPartPhotos.legs },
  { match: /curl|tricep|bicep|arm/i, photo: bodyPartPhotos.arms },
  { match: /shoulder|raise|press over/i, photo: bodyPartPhotos.shoulders },
  { match: /run|cardio|jump|burpee|cycle/i, photo: bodyPartPhotos.cardio },
  { match: /plank|crunch|ab|core|waist/i, photo: bodyPartPhotos.waist },
  { match: /stretch|yoga|mobility/i, photo: unsplash('photo-1544367567-0f2fcb009e0b') },
];

const defaultPhoto = unsplash('photo-1534438327276-14e5300c3a48');

export const getExercisePhotoFallback = (exercise) => {
  if (!exercise) return defaultPhoto;

  const name = exercise.name || '';
  const bodyPart = (exercise.bodyPart || '').toLowerCase();

  const byKeyword = nameKeywords.find(({ match }) => match.test(name));
  if (byKeyword) return byKeyword.photo;

  if (bodyPartPhotos[bodyPart]) return bodyPartPhotos[bodyPart];

  return defaultPhoto;
};

export const getAllBodyPartPhoto = () =>
  unsplash('photo-1571902943202-507ec2618e8f');
