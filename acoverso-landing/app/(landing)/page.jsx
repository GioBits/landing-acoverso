import { Background, Header, MobileMenu, MobileDock } from '@/components/layout/Chrome';
import { LegalNotice, Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/layout/CookieConsent';
import Hero from '@/components/sections/Hero';
import Agenda from '@/components/sections/Agenda';
import Problem from '@/components/sections/Problem';
import System from '@/components/sections/System';
import Models from '@/components/sections/Models';
import Process from '@/components/sections/Process';
import Cases from '@/components/sections/Cases';
import Faq from '@/components/sections/Faq';
import Closing from '@/components/sections/Closing';
import LandingBehaviors from '@/components/LandingBehaviors';
import { integrations } from '@/config/site';
import { legalFingerprints } from '@/lib/legal';

export const dynamic = 'force-static';

// Orden de la página. Para mover o quitar una sección, cambia esta lista.
export default function Home() {
  const docs = legalFingerprints();
  return (
    <>
      <div className="pg" id="top">
        <Background />
        <Header />
        <MobileMenu />
        <div className="wrap">
          <div className="layout">
            <Hero />
            <Agenda />
            <div className="rest">
              <Problem />
              <System />
              <Models />
              <Process />
              <Cases />
              <Faq />
              <Closing />
            </div>
          </div>
        </div>
        <LegalNotice />
        <Footer />
      </div>
      <CookieConsent />
      <MobileDock />
      <LandingBehaviors config={integrations} legalDocs={{ terminos: docs.terminos, privacidad: docs.privacidad }} />
    </>
  );
}
