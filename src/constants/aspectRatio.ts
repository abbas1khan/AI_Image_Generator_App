export const ASPECT_RATIOS: IAspectRatio[] = [
  {
    text: '1:1',
    value: 1,
  },
  {
    text: '2:3',
    value: 2 / 3,
  },
  {
    text: '3:2',
    value: 3 / 2,
  },
  {
    text: '3:4',
    value: 3 / 4,
  },
  {
    text: '4:3',
    value: 4 / 3,
  },
  {
    text: '9:16',
    value: 9 / 16,
  },
  {
    text: '16:9',
    value: 16 / 9,
  },
  {
    text: '21:9',
    value: 21 / 9,
  },
];

export type IAspectRatio = {
  text: string;
  value: number;
};
