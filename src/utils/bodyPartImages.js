import { getAllBodyPartPhoto } from './exercisePhotoFallback';

const bodyPartImages = {
  all: getAllBodyPartPhoto(),
  back: 'https://images.unsplash.com/photo-1603287528386-cab79cbb6eb5?w=220&h=140&fit=crop&auto=format',
  cardio: 'https://images.unsplash.com/photo-1476480862126-209bfaa8a6b2?w=220&h=140&fit=crop&auto=format',
  chest: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=220&h=140&fit=crop&auto=format',
  'lower arms': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=220&h=140&fit=crop&auto=format',
  'lower legs': 'https://images.unsplash.com/photo-1434682881908-33a995acd56b?w=220&h=140&fit=crop&auto=format',
  neck: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=220&h=140&fit=crop&auto=format',
  shoulders: 'https://images.unsplash.com/photo-1583454114551-04745d2de5c9?w=220&h=140&fit=crop&auto=format',
  'upper arms': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=220&h=140&fit=crop&auto=format',
  'upper legs': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=220&h=140&fit=crop&auto=format',
  waist: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=220&h=140&fit=crop&auto=format',
  arms: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=220&h=140&fit=crop&auto=format',
  legs: 'https://images.unsplash.com/photo-1434682881908-33a995acd56b?w=220&h=140&fit=crop&auto=format',
  yoga: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=220&h=140&fit=crop&auto=format',
  stretching: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=220&h=140&fit=crop&auto=format',
};

export const getBodyPartImage = (bodyPart) => {
  const key = bodyPart?.toLowerCase?.() ?? '';
  return bodyPartImages[key] || getAllBodyPartPhoto();
};

export default bodyPartImages;
