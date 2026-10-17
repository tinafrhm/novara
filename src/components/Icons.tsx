type IconProps = { size?: number }

export function LogoMark({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2.5v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17.8 7.2a7 7 0 1 1-11.6 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function TinyClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8.5V12l2.4 1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.41a10 10 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm5.76 14.18c-.24.68-1.4 1.3-1.94 1.38-.5.07-1.12.1-1.81-.11-.42-.14-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.2-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.28.64-.41 1.02-.41h.33c.3.01.44.03.64.5.24.58.82 2 .89 2.15.07.14.12.32.02.51-.09.19-.14.31-.28.49-.14.17-.29.37-.42.5-.14.14-.28.3-.12.57.16.27.7 1.15 1.5 1.87 1.03.92 1.9 1.21 2.17 1.34.27.14.44.12.6-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.6-.13.25.09 1.54.73 1.81.86.26.13.44.2.5.31.07.11.07.67-.17 1.35Z"
      />
    </svg>
  )
}

export function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7.2 3.8h2.2l1.2 3-1.6 1a12.5 12.5 0 0 0 6.2 6.2l1-1.6 3 1.2v2.2c0 .7-.5 1.3-1.2 1.4A16.2 16.2 0 0 1 5.8 5c.1-.7.7-1.2 1.4-1.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PrintIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 8V3.5h10V8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7 17H5.5A2.5 2.5 0 0 1 3 14.5v-4A2.5 2.5 0 0 1 5.5 8h13A2.5 2.5 0 0 1 21 10.5v4a2.5 2.5 0 0 1-2.5 2.5H17" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 14h10v6.5H7V14Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

export function WifiIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 9.5c4.4-4 11.6-4 16 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7 13c2.8-2.5 7.2-2.5 10 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 16.4c1.1-1 2.9-1 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
    </svg>
  )
}

export function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 3.5v2.2M12 18.3V20.5M3.5 12h2.2M18.3 12H20.5M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function PaletteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.5a8.5 8.5 0 0 0 0 17h1.2a2 2 0 0 0 0-4H12a2.2 2.2 0 0 1 0-4.4h.2A4.6 4.6 0 0 0 12 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="8" cy="10" r="0.9" fill="currentColor" />
      <circle cx="12" cy="8" r="0.9" fill="currentColor" />
      <circle cx="15.5" cy="10.5" r="0.9" fill="currentColor" />
    </svg>
  )
}

export function SpeakerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 10h3.2L11 6.5v11L7.2 14H4v-4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M15 9.5a3.5 3.5 0 0 1 0 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M17.2 7.2a6.5 6.5 0 0 1 0 9.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 16.5V11a6 6 0 1 1 12 0v5.5l1.2 1.5H4.8L6 16.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10 19.2a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function TimerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="14" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 14V10.5M9.5 3.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function GearIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 3.2v2.1M12 18.7v2.1M3.2 12h2.1M18.7 12h2.1M5.8 5.8l1.5 1.5M16.7 16.7l1.5 1.5M18.2 5.8l-1.5 1.5M7.3 16.7l-1.5 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
