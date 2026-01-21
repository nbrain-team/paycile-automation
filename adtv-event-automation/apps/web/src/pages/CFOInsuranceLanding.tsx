import { useState } from 'react';

export function CFOInsuranceLanding() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    jobTitle: '',
    companySize: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    try {
      // Submit to backend API which will push to HubSpot
      const response = await fetch('/api/leads/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'CFO Insurance Landing Page',
          persona: 'cfo',
          campaign_name: 'CFO Insurance - Website Lead',
          status: 'new',
          lead_score: 50 // Initial score for form submission
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setFormStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        jobTitle: '',
        companySize: '',
        message: ''
      });

      // Scroll to success message
      setTimeout(() => {
        document.getElementById('form-success')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
      setErrorMessage('Something went wrong. Please try again or email us directly at jim@paycile.com');
    }
  };

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

        /* Lead Form Section */
        .lead-form-section {
          background: #ffffff;
          padding: 80px 32px;
        }

        .lead-form-section h2 {
          font-size: 40px;
          font-weight: 800;
          margin-bottom: 16px;
          text-align: center;
          color: #1a1a1a;
        }

        .lead-form-section > .section-content > p {
          font-size: 18px;
          color: #6b7280;
          text-align: center;
          margin-bottom: 40px;
        }

        .lead-form-container {
          max-width: 600px;
          margin: 0 auto;
          background: #f9fafb;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 12px 16px;
          font-size: 16px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          background: #ffffff;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }

        .form-group textarea {
          min-height: 100px;
          resize: vertical;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-submit-btn {
          width: 100%;
          padding: 14px 32px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #10b981;
          color: #ffffff;
          margin-top: 8px;
        }

        .form-submit-btn:hover:not(:disabled) {
          background: #059669;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
        }

        .form-submit-btn:disabled {
          background: #9ca3af;
          cursor: not-allowed;
          transform: none;
        }

        .form-success-message {
          background: #d1fae5;
          border: 2px solid #10b981;
          border-radius: 8px;
          padding: 24px;
          text-align: center;
          margin-top: 20px;
        }

        .form-success-message h3 {
          color: #065f46;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .form-success-message p {
          color: #047857;
          font-size: 16px;
        }

        .form-error-message {
          background: #fee2e2;
          border: 2px solid #ef4444;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
          margin-top: 20px;
          color: #991b1b;
        }

        .form-privacy {
          font-size: 12px;
          color: #6b7280;
          text-align: center;
          margin-top: 16px;
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
          .lead-form-section h2,
          .cta-section h2 {
            font-size: 32px;
          }

          .button-group {
            flex-direction: column;
          }

          .btn {
            width: 100%;
          }

          .calendar-container,
          .lead-form-container {
            padding: 20px;
          }

          .calendar-placeholder {
            height: 500px;
          }

          .form-row {
            grid-template-columns: 1fr;
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
          <div className="hero-subtitle">For Insurance CFOs & Financial Executives</div>
          <h1>Save 96 Days Per Year on Period-End Close</h1>
          <p>
            Automate payment reconciliation and gain real-time cash visibility across your insurance operations. No more manual matching, no more spreadsheet chaos.
          </p>
          <div className="feature-list">
            <div className="feature-item">Eliminate 96+ days of manual reconciliation work</div>
            <div className="feature-item">Real-time cash position across all entities</div>
            <div className="feature-item">Multi-carrier payment automation</div>
            <div className="feature-item">Strategic financial oversight, not data entry</div>
          </div>
          <div className="button-group">
            <a href="#contact" className="btn btn-primary">
              Get Free ROI Assessment
            </a>
            <a href="#benefits" className="btn btn-secondary">
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <span className="stat-number">96</span>
            <span className="stat-label">Days Saved Annually</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">100%</span>
            <span className="stat-label">Payment Accuracy</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Real-Time Visibility</span>
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section className="lead-form-section" id="contact">
        <div className="section-content">
          <h2>Get Your Free ROI Assessment</h2>
          <p>Find out exactly how much time and money you could save with automated reconciliation.</p>
          
          <div className="lead-form-container">
            {formStatus === 'success' ? (
              <div className="form-success-message" id="form-success">
                <h3>✓ Thank You!</h3>
                <p>We've received your information and will be in touch within 24 hours to schedule your executive demo and ROI assessment.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="John"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Business Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john.doe@company.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company Name *</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    placeholder="Your Insurance Company"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="jobTitle">Job Title *</label>
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      required
                      placeholder="CFO"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="companySize">Company Size</label>
                    <select
                      id="companySize"
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                    >
                      <option value="">Select...</option>
                      <option value="1-50">1-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501-1000">501-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">What are your biggest reconciliation challenges?</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your current process and pain points..."
                  />
                </div>

                <button 
                  type="submit" 
                  className="form-submit-btn"
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting' ? 'Submitting...' : 'Get Your Free Assessment'}
                </button>

                {formStatus === 'error' && (
                  <div className="form-error-message">
                    {errorMessage}
                  </div>
                )}

                <p className="form-privacy">
                  By submitting this form, you agree to receive communications from Paycile. 
                  We respect your privacy and will never share your information.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section" id="benefits">
        <h2>Built for Insurance Finance Leaders</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-number">1</div>
            <h3>Multi-Carrier Reconciliation</h3>
            <p>
              Automatically match payments from multiple insurance carriers, managing companies, and reinsurers. Handle complex commission structures, premium allocations, and claim settlements without manual intervention.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-number">2</div>
            <h3>Real-Time Cash Visibility</h3>
            <p>
              Know your exact cash position across all entities, carriers, and accounts at any moment. Make strategic decisions with confidence, not outdated spreadsheets from last week's close.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-number">3</div>
            <h3>Period-End Close Acceleration</h3>
            <p>
              Cut your month-end close from weeks to days. Automated reconciliation means your team spends time on analysis and strategy, not hunting down missing pennies across 50+ accounts.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-number">4</div>
            <h3>Audit-Ready Documentation</h3>
            <p>
              Complete audit trail for every transaction. Instantly produce reconciliation reports for auditors, regulators, or board meetings. Built-in compliance with insurance industry standards.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="demo-section" id="demo">
        <div className="section-content">
          <h2>Book Your Executive Demo</h2>
          <p>See how Paycile transforms payment reconciliation for insurance finance teams. No commitment required.</p>
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
            <span>30-minute executive briefing</span>
            <span>Live system walkthrough</span>
            <span>Insurance-specific use cases</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to reclaim 96 days per year?</h2>
          <p>Join insurance CFOs who've eliminated manual reconciliation and gained strategic financial control.</p>
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


















