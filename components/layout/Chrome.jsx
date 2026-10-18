import { nav, cta } from '@/content/home';
import { MenuIcon, CloseIcon } from '@/components/ui/icons';

// Capas de fondo: cuadrícula azul, grano, brillo del hero y foco que sigue al cursor
export function Background() {
  return (
    <>
      <div className="gridbg" aria-hidden="true"></div>
      <canvas className="grain" id="grain" aria-hidden="true"></canvas>
      <div className="heroglow" aria-hidden="true"></div>
      <div className="spot" id="spot" aria-hidden="true"><i></i></div>
    </>
  );
}

function NavLinks() {
  return nav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>);
}

export function Header() {
  return (
    <header className="hdr" id="hdr">
      <div className="wrap">
        <a className="logo" href="#top" aria-label="ÄCOVERSO, ir al inicio">
          <img src="/img/logo.png" alt="ÄCOVERSO" width="58" height="28" />
        </a>
        <nav className="nav" aria-label="Principal"><NavLinks /></nav>
        <a className="btn btn--sm" href={cta.href}>{cta.label}</a>
        <button className="burger" id="burger" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="menu">
          <MenuIcon />
        </button>
      </div>
    </header>
  );
}

export function MobileMenu() {
  return (
    <div className="menu" id="menu" hidden>
      <div className="menu-top">
        <img src="/img/logo.png" alt="ÄCOVERSO" style={{ height: 24, width: 'auto' }} />
        <button className="burger" id="menuClose" type="button" aria-label="Cerrar menú"><CloseIcon /></button>
      </div>
      <nav aria-label="Menú móvil"><NavLinks /></nav>
      <a className="btn" href={cta.href}>{cta.label}</a>
    </div>
  );
}

// Botón fijo inferior en móvil (aparece fuera del hero, la agenda y el cierre)
export function MobileDock() {
  return (
    <div className="dock" id="dock"><a className="btn" href={cta.href}>{cta.label}</a></div>
  );
}
