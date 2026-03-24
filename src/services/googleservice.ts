import { GoogleGenAI, Modality } from '@google/genai';
import { DUMMY_RESPONSE } from '../../dummyresponse';

export const generateImageFromPrompt = async ({
  googleAI,
  model,
  prompt,
  aspectRatio,
}: {
  googleAI: GoogleGenAI;
  model: string;
  prompt: string;
  aspectRatio: string;
}) => {
  // return await googleAI.models.generateContent({
  //   model: model,
  //   contents: prompt,
  //   config: {
  //     responseModalities: [Modality.IMAGE, Modality.TEXT],
  //     imageConfig: {
  //       aspectRatio,
  //     },
  //   },
  // });

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(DUMMY_RESPONSE);
    }, 2000);
  });
};
