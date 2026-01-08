export function PropMgmtLanding() {
  return (
    <div className="landing-page">
      <style>{`
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        .landing-page {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          line-height: 1.6;
          color: #1a1a1a;
          margin: 0;
          padding: 0;
          width: 100vw;
          overflow-x: hidden;
        }

        .landing-page * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Header */
        .landing-header {
          background: #ffffff;
          padding: 20px 32px;
          border-bottom: 1px solid #e5e7eb;
        }

        .landing-logo {
          height: 32px;
        }

        /* Hero Section */
        .hero-section {
          background: #000000;
          color: #ffffff;
          padding: 80px 32px 100px;
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 300px;
          background: linear-gradient(90deg, 
            rgba(0, 255, 255, 0.3) 0%, 
            rgba(0, 128, 255, 0.3) 25%, 
            rgba(128, 0, 255, 0.3) 50%, 
            rgba(0, 255, 128, 0.3) 75%, 
            rgba(0, 255, 255, 0.3) 100%);
          opacity: 0.6;
          filter: blur(40px);
          animation: wave-animation 8s ease-in-out infinite;
        }

        @keyframes wave-animation {
          0%, 100% {
            transform: translateX(0) scale(1);
          }
          50% {
            transform: translateX(-20px) scale(1.05);
          }
        }

        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .hero-section h1 {
          font-size: 56px;
          font-weight: 800;
          margin-bottom: 24px;
          line-height: 1.1;
        }

        .hero-section .hero-subtitle {
          font-size: 24px;
          margin-bottom: 16px;
          opacity: 0.9;
          color: #10b981;
          font-weight: 600;
        }

        .hero-section p {
          font-size: 20px;
          margin-bottom: 40px;
          opacity: 0.9;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 600px;
          margin: 0 auto 40px;
          text-align: left;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 16px;
        }

        .feature-item::before {
          content: '✓';
          color: #10b981;
          font-weight: bold;
          font-size: 20px;
        }

        .button-group {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 14px 32px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .btn-primary {
          background: #10b981;
          color: #ffffff;
        }

        .btn-primary:hover {
          background: #059669;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
        }

        .btn-secondary {
          background: transparent;
          color: #ffffff;
          border: 2px solid #ffffff;
        }

        .btn-secondary:hover {
          background: #ffffff;
          color: #000000;
        }

        /* Stats Section */
        .stats-section {
          background: #f9fafb;
          padding: 60px 32px;
        }

        .stats-container {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .stat-card {
          text-align: center;
        }

        .stat-number {
          font-size: 48px;
          font-weight: 800;
          color: #10b981;
          display: block;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 16px;
          color: #6b7280;
        }

        /* Demo Section */
        .demo-section {
          background: #ffffff;
          padding: 80px 32px;
        }

        .section-content {
          max-width: 1000px;
          margin: 0 auto;
        }

        .demo-section h2 {
          font-size: 40px;
          font-weight: 800;
          margin-bottom: 16px;
          text-align: center;
          color: #1a1a1a;
        }

        .demo-section > .section-content > p {
          font-size: 18px;
          color: #6b7280;
          text-align: center;
          margin-bottom: 40px;
        }

        .calendar-container {
          background: #ffffff;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
          min-height: 700px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .calendar-placeholder {
          width: 100%;
          height: 600px;
          border-radius: 8px;
          overflow: hidden;
        }

        .calendar-placeholder iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        .demo-features {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-top: 24px;
          flex-wrap: wrap;
          font-size: 14px;
          color: #6b7280;
        }

        .demo-features span::before {
          content: '✓';
          color: #10b981;
          margin-right: 8px;
          font-weight: bold;
        }

        /* Benefits Section */
        .benefits-section {
          background: #f9fafb;
          padding: 80px 32px;
        }

        .benefits-section h2 {
          font-size: 40px;
          font-weight: 800;
          margin-bottom: 48px;
          text-align: center;
          color: #1a1a1a;
        }

        .benefits-grid {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }

        .benefit-card {
          background: #ffffff;
          padding: 32px;
          border-radius: 12px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .benefit-card h3 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 16px;
          color: #1a1a1a;
        }

        .benefit-card p {
          font-size: 16px;
          color: #6b7280;
          line-height: 1.8;
        }

        .benefit-number {
          display: inline-block;
          background: #10b981;
          color: #ffffff;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          text-align: center;
          line-height: 40px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        /* CTA Section */
        .cta-section {
          background: #000000;
          color: #ffffff;
          padding: 100px 32px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 300px;
          background: linear-gradient(90deg, 
            rgba(0, 255, 255, 0.2) 0%, 
            rgba(0, 128, 255, 0.2) 25%, 
            rgba(128, 0, 255, 0.2) 50%, 
            rgba(0, 255, 128, 0.2) 75%, 
            rgba(0, 255, 255, 0.2) 100%);
          opacity: 0.6;
          filter: blur(60px);
        }

        .cta-content {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .cta-section h2 {
          font-size: 40px;
          font-weight: 800;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .cta-section p {
          font-size: 20px;
          margin-bottom: 32px;
          opacity: 0.9;
        }

        /* Footer */
        .landing-footer {
          background: #ffffff;
          padding: 40px 32px;
          border-top: 1px solid #e5e7eb;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
        }

        .footer-logo-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .footer-logo {
          height: 32px;
        }

        .footer-social {
          display: flex;
          gap: 16px;
        }

        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          text-decoration: none;
          color: #6b7280;
        }

        .social-link:hover {
          background: #10b981;
          color: #ffffff;
          transform: translateY(-2px);
        }

        .footer-text {
          text-align: center;
          width: 100%;
          margin-top: 24px;
        }

        .footer-text p {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 8px;
        }

        .footer-text p:last-child {
          font-size: 12px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-section h1 {
            font-size: 36px;
          }

          .hero-section p {
            font-size: 18px;
          }

          .stats-container,
          .benefits-grid {
            grid-template-columns: 1fr;
          }

          .demo-section h2,
          .benefits-section h2,
          .cta-section h2 {
            font-size: 32px;
          }

          .button-group {
            flex-direction: column;
          }

          .btn {
            width: 100%;
          }

          .calendar-container {
            padding: 20px;
          }

          .calendar-placeholder {
            height: 500px;
          }

          .footer-content {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

      {/* Header */}
      <header className="landing-header">
        <img 
          src="/paycile-logo.svg" 
          alt="Paycile" 
          className="landing-logo"
        />
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-subtitle">For Property Management Finance Teams</div>
          <h1>Native Yardi Integration for Payment Reconciliation</h1>
          <p>
            Reconcile payments across your entire portfolio without leaving Yardi. Automate rent payments, deposits, and multi-property reconciliation.
          </p>
          <div className="feature-list">
            <div className="feature-item">Native Yardi Voyager integration</div>
            <div className="feature-item">Auto-reconcile rent & deposit payments</div>
            <div className="feature-item">Multi-property portfolio management</div>
            <div className="feature-item">Real-time cash position by property</div>
          </div>
          <div className="button-group">
            <a href="#demo" className="btn btn-primary">
              See the Yardi Integration
            </a>
            <a href="#benefits" className="btn btn-secondary">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <span className="stat-number">85%</span>
            <span className="stat-label">Time Saved on Reconciliation</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">100%</span>
            <span className="stat-label">Yardi-Native</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">Real-Time</span>
            <span className="stat-label">Multi-Property View</span>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section" id="benefits">
        <h2>Built for Yardi Users</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-number">1</div>
            <h3>Native Yardi Voyager Integration</h3>
            <p>
              Work directly within Yardi—no exports, imports, or switching between systems. Paycile integrates seamlessly with your existing Yardi Voyager environment, preserving your workflows and data integrity.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-number">2</div>
            <h3>Multi-Property Reconciliation</h3>
            <p>
              Reconcile payments across your entire portfolio from a single dashboard. Whether you manage 5 properties or 500, see exactly where every dollar is across your entire portfolio in real-time.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-number">3</div>
            <h3>Automated Rent & Deposit Matching</h3>
            <p>
              Automatically match rent payments, security deposits, pet deposits, and application fees to the correct units and tenants. Handle partial payments, late fees, and multi-unit payments automatically.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-number">4</div>
            <h3>Portfolio-Wide Cash Visibility</h3>
            <p>
              Know your exact cash position for each property, management company, and owner account. Make better decisions with real-time visibility into collections, occupancy impact on cash, and cash flow forecasting.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="demo-section" id="demo">
        <div className="section-content">
          <h2>See the Yardi Integration Live</h2>
          <p>Watch how property management teams are automating reconciliation without leaving Yardi.</p>
          <div className="calendar-container">
            <div className="calendar-placeholder">
              <iframe
                src="https://meetings-na2.hubspot.com/jim-fitzgerald?embed=true"
                title="Book a Demo"
                allowFullScreen
              />
            </div>
          </div>
          <div className="demo-features">
            <span>Live Yardi integration demo</span>
            <span>Multi-property use cases</span>
            <span>Implementation timeline</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to automate reconciliation in Yardi?</h2>
          <p>Join property management teams who've eliminated manual reconciliation across their entire portfolio.</p>
          <a href="#demo" className="btn btn-primary">
            Schedule Your Demo
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-logo-section">
            <img 
              src="/paycile-logo.svg" 
              alt="Paycile" 
              className="footer-logo"
            />
          </div>
          <div className="footer-social">
            <a 
              href="https://www.facebook.com/profile.php?id=61574850180022" 
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/company/paycile?trk=blended-typeahead" 
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-text">
          <p>© 2025 Paycile. All rights reserved.</p>
          <p>Paycile Inc is a registered ISO of Fifth Third Bank, N.A., Cincinnati, OH.</p>
        </div>
      </footer>
    </div>
  );
}















