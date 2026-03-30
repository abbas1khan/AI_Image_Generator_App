import { ToastVariant } from './types';

export const VARIANTS: Record<
  ToastVariant,
  {
    borderColor: string;
    background: string;
    iconBackground: string;
    titleColor: string;
    descColor: string;
    icon: string;
    accentLeft: string;
  }
> = {
  [ToastVariant.Success]: {
    borderColor: '#2A6B4A',
    background: '#0D2E1E',
    iconBackground: '#173D28',
    titleColor: '#4ADEAA',
    descColor: '#6B9E85',
    icon: '✓',
    accentLeft: '#22C77A',
  },
  [ToastVariant.Error]: {
    borderColor: '#7A2030',
    background: '#2A0A10',
    iconBackground: '#3D1018',
    titleColor: '#F56F7E',
    descColor: '#A0606A',
    icon: '!',
    accentLeft: '#F25468',
  },
  [ToastVariant.Warning]: {
    borderColor: '#7A5A10',
    background: '#2A1E04',
    iconBackground: '#3D2D08',
    titleColor: '#F5B840',
    descColor: '#A08040',
    icon: '⚠',
    accentLeft: '#F5B840',
  },
  [ToastVariant.Info]: {
    borderColor: '#2A3A7A',
    background: '#0A1030',
    iconBackground: '#18223D',
    titleColor: '#7B8CF5',
    descColor: '#5A6AAA',
    icon: 'i',
    accentLeft: '#6677F0',
  },
};

