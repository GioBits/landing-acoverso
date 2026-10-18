// Iconos SVG de la landing
const stroke = { fill: 'none', stroke: 'currentColor', 'aria-hidden': 'true' };

export const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.8" {...stroke}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.8" {...stroke}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const PlayIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="#fff" /></svg>
);
export const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" strokeWidth="3" {...stroke}><path d="M5 12l5 5 9-10" /></svg>
);
export const PlusIcon = () => (
  <svg className="sign" viewBox="0 0 24 24" strokeWidth="1.6" {...stroke}><path d="M12 5v14M5 12h14" /></svg>
);
export const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" {...stroke}><path d="M15 6l-6 6 6 6" /></svg>
);
export const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" {...stroke}><path d="M9 6l6 6-6 6" /></svg>
);
export const SoundOff = () => (
  <svg className="i-off" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.8" {...stroke}><path d="M4 9h4l5-4v14l-5-4H4z" /><path d="M17 9l4 6M21 9l-4 6" /></svg>
);
export const SoundOn = () => (
  <svg className="i-on" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.8" {...stroke}><path d="M4 9h4l5-4v14l-5-4H4z" /><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" /></svg>
);
