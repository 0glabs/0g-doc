import React, { useEffect, useRef, useState } from 'react';

const SocialProofSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    partners: 0,
    accounts: 0,
    transactions: 0
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            // Start count-up animation
            animateCounts();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  const animateCounts = () => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    const targets = {
      partners: 350,
      accounts: 20,
      transactions: 250
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      // Use different easing for smaller numbers to keep them moving
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      // For accounts (20), use more linear progression to avoid getting stuck
      const accountsProgress = progress < 0.7 ? progress / 0.7 : 1;
      
      setCounts({
        partners: Math.floor(targets.partners * easeOutQuart),
        accounts: Math.floor(targets.accounts * accountsProgress * easeOutCubic),
        transactions: Math.floor(targets.transactions * easeOutQuart)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, interval);
  };

  return (
    <section className="social-proof-section" ref={sectionRef}>
      <div className="stats-container">
        <div className={`stat-item ${isVisible ? 'animate' : ''}`}>
          <div className="stat-number">
            <span className="count-up">{counts.partners}</span>+
          </div>
          <div className="stat-label">Partners</div>
        </div>
        <div className="stat-divider"></div>
        <div className={`stat-item ${isVisible ? 'animate' : ''}`}>
          <div className="stat-number">
            <span className="count-up">{counts.accounts}</span>M+
          </div>
          <div className="stat-label">Accounts</div>
        </div>
        <div className="stat-divider"></div>
        <div className={`stat-item ${isVisible ? 'animate' : ''}`}>
          <div className="stat-number">
            <span className="count-up">{counts.transactions}</span>M+
          </div>
          <div className="stat-label">Transactions</div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;