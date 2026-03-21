import { useState } from 'react';
import { ASPECT_RATIOS } from '../../../constants/aspectRatio';
import { AI_MODELS } from '../../../constants/aimodels';
import { ImageData } from '../../../store/types';

const useHomeScreenStates = () => {
  const [aspectRatio, setAspectRatio] = useState(ASPECT_RATIOS[0]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [generatedImageData, setGeneratedImageData] =
    useState<ImageData | null>(null);
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0]);

  return {
    aspectRatio,
    setAspectRatio,
    isGenerating,
    setIsGenerating,
    isError,
    setIsError,
    generatedImageData,
    setGeneratedImageData,
    selectedModel,
    setSelectedModel,
  };
};

export default useHomeScreenStates;
export type HomeScreenStates = ReturnType<typeof useHomeScreenStates>;
