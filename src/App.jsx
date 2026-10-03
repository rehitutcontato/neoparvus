import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OpeningDoor from './components/OpeningDoor';
import ProblemSection from './components/ProblemSection';
import SolutionsGrid from './components/SolutionsGrid';
import ParvusAutomateSection from './components/ParvusAutomateSection';
import Deliverables from './components/Deliverables';
import ClientProjects from './components/ClientProjects';
import Investment from './components/Investment';
import About from './components/About';
import Process from './components/Process';
import FAQ from './components/FAQ';
import CTAFinal from './components/CTAFinal';
import Footer from './components/Footer';
import MediaKitPage from './components/MediaKitPage';
import EnterprisePage from './components/EnterprisePage';

export default function App() {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Global scroll animations for legacy data-reveal elements
  useGSAP(() => {
    gsap.utils.toArray('[data-reveal]').forEach((elem) => {
      ScrollTrigger.create({
        trigger: elem,
        start: 'top 85%',
        once: true,
        onEnter: () => elem.classList.add('revealed')
      });
    });
  });

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      if (targetId === '#midiakit') {
        window.dispatchEvent(new CustomEvent('open-midiakit'));
      } else if (targetId === '#enterprise') {
        window.dispatchEvent(new CustomEvent('open-enterprise'));
      }

      const selector = (targetId === '#midiakit' || targetId === '#enterprise') ? '#solucoes' : targetId;
      const target = document.querySelector(selector);
      if (target) {
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  if (route === '/midiakit') {
    return <MediaKitPage />;
  }

  if (route === '/enterprise') {
    return <EnterprisePage />;
  }

  return (
    <div className="volcanic-dust">
      <Navbar />

      <main>
        <Hero />

        {/* OPENING DOOR (Replaces the empty ScrollSequence) */}
        <OpeningDoor />

        <ProblemSection />

        <SolutionsGrid />
        <ParvusAutomateSection />
        <Deliverables />
        <ClientProjects />
        <Investment />
        <About />
        <Process />
        <FAQ />
        <CTAFinal />
      </main>

      <Footer />
    </div>
  );
}
