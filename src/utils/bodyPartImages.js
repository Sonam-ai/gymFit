import { getAllBodyPartPhoto } from './exercisePhotoFallback';

const bodyPartImages = {
  all: getAllBodyPartPhoto(),
  back: 'https://images.unsplash.com/photo-1603287528386-cab79cbb6eb5?w=520&h=380&fit=crop&auto=format&q=85',
  cardio: 'https://images.unsplash.com/photo-1476480862126-209bfaa8a6b2?w=520&h=380&fit=crop&auto=format&q=85',
  chest: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=520&h=380&fit=crop&auto=format&q=85',
  'lower arms': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=520&h=380&fit=crop&auto=format&q=85',
  'lower legs': 'https://images.unsplash.com/photo-1434682881908-33a995acd56b?w=520&h=380&fit=crop&auto=format&q=85',
  neck: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=520&h=380&fit=crop&auto=format&q=85',
  shoulders: 'https://images.unsplash.com/photo-1583454114551-04745d2de5c9?w=520&h=380&fit=crop&auto=format&q=85',
  'upper arms': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=520&h=380&fit=crop&auto=format&q=85',
  'upper legs': 'https://images.unsplash.com/photo-1517836357463-d5f99be501cd?w=520&h=380&fit=crop&auto=format&q=85',
  waist: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=520&h=380&fit=crop&auto=format&q=85',
  arms: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=520&h=380&fit=crop&auto=format&q=85',
  legs: 'https://images.unsplash.com/photo-1434682881908-33a995acd56b?w=520&h=380&fit=crop&auto=format&q=85',
  yoga: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=520&h=380&fit=crop&auto=format&q=85',
  stretching: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=520&h=380&fit=crop&auto=format&q=85',
};

export const getBodyPartImage = (bodyPart) => {
  const key = bodyPart?.toLowerCase?.() ?? '';
  return bodyPartImages[key] || getAllBodyPartPhoto();
};

export default bodyPartImages;
