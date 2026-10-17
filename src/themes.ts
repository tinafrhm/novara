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
  cream: {
    panel: '#cbb892',
    bezel: '#b49a72',
    unlit: 'rgba(72, 48, 24, 0.38)',
    lit: '#fffaf3',
    glow: 'rgba(255, 236, 206, 0.95)',
    wall: 'rgba(232, 196, 140, 0.55)',
    swatch: '#e7d3ae',
  },
  black: {
    panel: '#090909',
    bezel: '#161616',
    unlit: 'rgba(170, 170, 170, 0.28)',
    lit: '#f4f7fb',
    glow: 'rgba(244, 247, 251, 0.9)',
    wall: 'rgba(190, 200, 210, 0.32)',
    swatch: '#141414',
  },
  blue: {
    panel: '#102033',
    bezel: '#0b1624',
    unlit: 'rgba(150, 190, 220, 0.3)',
    lit: '#9adfff',
    glow: 'rgba(120, 210, 255, 0.95)',
    wall: 'rgba(50, 140, 220, 0.55)',
    swatch: '#1d4f86',
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
}
