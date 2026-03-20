export interface ImageData {
  id: string; // uuid v4
  prompt: string; // original user prompt
  imageUri: string; // base64 image data from Gemini
  mimeType: string; // e.g. 'image/png'
  createdAt: number; // Date.now()
  modelData: { name: string; model: string };
  aspectRatio: { text: string; value: number };
}
