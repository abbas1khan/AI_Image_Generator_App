// src/store/imageStore.ts

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './storage';
import { ImageData } from './types';

interface ImageStoreState {
  images: ImageData[];
  storeImage: (imageData: ImageData) => void;
  deleteImage: (id: string) => void;
  deleteMultipleImages: (ids: string[]) => void;
  deleteAllImages: () => void;
}

export const useImageStore = create<ImageStoreState>()(
  persist(
    (set) => ({
      images: [],

      storeImage: (imageData: ImageData): void => {
        set((state) => ({ images: [imageData, ...state.images] }));
      },

      deleteImage: (id: string): void => {
        set((state) => ({
          images: state.images.filter((img) => img.id !== id),
        }));
      },

      deleteMultipleImages: (ids: string[]): void => {
        const idSet = new Set(ids);
        set((state) => ({
          images: state.images.filter((img) => !idSet.has(img.id)),
        }));
      },

      deleteAllImages: (): void => {
        set({ images: [] });
      },
    }),
    {
      name: 'generated-images',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
