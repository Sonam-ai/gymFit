import React, { useState } from 'react';
import { Box } from '@mui/material';
import HeroBanner from '../components/HeroBanner';
import FitnessCalculator from '../components/FitnessCalculator';
import SearchExercises from '../components/SearchExercises';
import Exercises from '../components/Exercises';
import WorkoutGenerator from '../components/WorkoutGenerator';

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');
  const [isSearchResult, setIsSearchResult] = useState(false);

  const handleBodyPartChange = (part) => {
    setIsSearchResult(false);
    setBodyPart(part);
  };

  const handleWorkoutSuggestion = (part) => {
    handleBodyPartChange(part);
    setTimeout(() => {
      document.getElementById('exercises')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <Box>
      <HeroBanner />
      <FitnessCalculator onSelectWorkout={handleWorkoutSuggestion} />
      <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={handleBodyPartChange}
        setIsSearchResult={setIsSearchResult}
      />
      <Exercises
        exercises={exercises}
        setExercises={setExercises}
        bodyPart={bodyPart}
        isSearchResult={isSearchResult}
      />

      <WorkoutGenerator
        onBrowseBodyPart={handleBodyPartChange}
        onScrollToExercises={() => {
          document.getElementById('exercises')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </Box>
  );
};

export default Home;
