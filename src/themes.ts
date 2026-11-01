import type { FaceColor } from './order'

export type Theme = {
  panel: string
  bezel: string
  unlit: string
  lit: string
  glow: string
  wall: string
  swatch: string
}

export const THEMES: Record<FaceColor, Theme> = {
  standard: {
    panel: '#14181d',
    bezel: '#0c0e11',
    unlit: 'rgba(176, 186, 196, 0.32)',
    lit: '#5ad4ff',
    glow: 'rgba(90, 212, 255, 0.95)',
    wall: 'rgba(70, 170, 230, 0.55)',
    swatch: '#5ad4ff',
  },
  white: {
    panel: '#f3f1ec',
    bezel: '#e3dfd6',
    unlit: 'rgba(40, 40, 40, 0.34)',
    lit: '#1c1c1c',
    glow: 'rgba(60, 60, 60, 0.28)',
    wall: 'rgba(255, 255, 255, 0.72)',
    swatch: '#f7f7f4',
  },
  gray: {
    panel: '#59626b',
    bezel: '#3d454d',
    unlit: 'rgba(22, 26, 30, 0.38)',
    lit: '#ffffff',
    glow: 'rgba(255, 255, 255, 0.9)',
    wall: 'rgba(198, 206, 214, 0.45)',
    swatch: '#8d969e',
  },
  beige: {
    panel: '#d8c4a4',
    bezel: '#c2aa86',
    unlit: 'rgba(70, 48, 24, 0.35)',
    lit: '#fffaf3',
    glow: 'rgba(255, 230, 190, 0.9)',
    wall: 'rgba(210, 180, 140, 0.5)',
    swatch: '#c9ae86',
  },
  cream: {
    panel: '#cbb892',
    bezel: '#b49a72',
    unlit: 'rgba(72, 48, 24, 0.38)',
    lit: '#fffaf3',
    glow: 'rgba(255, 236, 206, 0.95)',
    wall: 'rgba(232, 196, 140, 0.55)',
    swatch: '#e7d3ae',
  },
  custom: {
    panel: '#1c2430',
    bezel: '#121820',
    unlit: 'rgba(180, 190, 200, 0.32)',
    lit: '#d7c4ff',
    glow: 'rgba(190, 160, 255, 0.9)',
    wall: 'rgba(140, 110, 220, 0.45)',
    swatch: 'conic-gradient(#e7d3ae, #f7f7f4, #8d969e, #c9ae86, #e7d3ae)',
  },
}
