import { useEffect } from 'react';
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
import Deliverables from './components/Deliverables';
import Investment from './components/Investment';
import About from './components/About';
import Process from './components/Process';
import FAQ from './components/FAQ';
import CTAFinal from './components/CTAFinal';
import Footer from './components/Footer';

export default function App() {
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

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="volcanic-dust">
      <Navbar />

      <main>
        <Hero />

        {/* OPENING DOOR (Replaces the empty ScrollSequence) */}
        <OpeningDoor />

        <ProblemSection />

        <SolutionsGrid />
        <Deliverables />
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
