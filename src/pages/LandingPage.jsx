import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthContainer from '../components/auth/AuthContainer';
import NavBrand from '../components/nav/NavBrand';
import { ChevronDownIcon, DocumentTextIcon, ChatBubbleBottomCenterTextIcon, BoltIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const LandingPage = () => {
  const { user } = useAuth();
  
  if (user) return <Navigate to="/knowledge" replace />;

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };
  
  const calculateMonthlyPrice = (storage) => {
    if (storage <= 200) return 49;
    const additionalStorage = storage - 200; // MB above base storage
    const additionalPrice = Math.floor(additionalStorage / 100) * 5; // $5 per 100MB
    return 49 + additionalPrice; // Cap at 199
  };
  
  const calculateYearlyPrice = (storage) => {
    if (storage <= 200) return 489;
    const additionalStorage = storage - 200; // MB above base storage
    const additionalPrice = Math.floor(additionalStorage / 100) * 50; // $50 per 100MB
    return 489 + additionalPrice; // Cap at 1979
  };
  
  const [monthlyStorage, setMonthlyStorage] = useState(200);
  const [yearlyStorage, setYearlyStorage] = useState(200);

  return (
    <div className="drawer drawer-end">
      <input id="auth-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content">
        <div className="min-h-screen">
          {/* Navigation Bar */}
          <div className="fixed top-0 left-0 right-0 bg-base-100/95 backdrop-blur-sm z-50">
            <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
              <NavBrand />
              <div className="flex gap-4 items-center">
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="btn btn-ghost btn-sm"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('pricing')} 
                  className="btn btn-ghost btn-sm"
                >
                  Pricing
                </button>
                <label htmlFor="auth-drawer" className="btn btn-primary btn-sm">
                  Get Started
                </label>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <section className="min-h-screen flex flex-col items-center justify-center pt-16 px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
                IT ALL<br />
                STARTS WITH A<br />
                <span className="text-5xl md:text-7xl text-primary">CONVERSATION</span>
              </h1>
              <p className="text-2xl mb-12 text-base-content/90 font-medium">
                Transform your documents into intelligent conversations. Upload, organize, and chat with your content using advanced AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <label htmlFor="auth-drawer" className="btn btn-primary btn-lg">
                  Start Free Trial
                </label>
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="btn btn-outline btn-lg"
                >
                  Learn More
                  <ChevronDownIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-24 bg-base-200">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                Everything you need to manage your documents intelligently
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <DocumentTextIcon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="card-title text-xl">Smart Organization</h3>
                    <p>Automatically organize and categorize your documents using our smart library features.</p>
                  </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <ChatBubbleBottomCenterTextIcon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="card-title text-xl">Interactive Chat</h3>
                    <p>Have natural conversations with your documents and get instant, accurate answers.</p>
                  </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <BoltIcon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="card-title text-xl">Lightning Fast</h3>
                    <p>Get immediate responses and insights from your entire document library in seconds.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-24">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                Simple, transparent pricing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title text-xl mb-2">Free Trial</h3>
                    <div className="text-3xl font-bold mb-4">$0</div>
                    <p className="text-base-content/70 mb-4">3 days of full access</p>
                    <ul className="space-y-2 mb-8">
                      <li>✓ All features included</li>
                      <li>✓ No credit card required</li>
                      <li>✓ 50 MB storage</li>
                    </ul>
                    <label htmlFor="auth-drawer" className="btn btn-primary w-full">
                      Start Trial
                    </label>
                  </div>
                </div>
                <div className="card bg-primary text-primary-content shadow-xl">
                  <div className="card-body flex flex-col justify-between">
                    <div>
                      <div className="h-40">
                        <h3 className="card-title text-xl mb-2">Monthly</h3>
                        <div className="text-3xl font-bold mb-4">
                          ${calculateMonthlyPrice(monthlyStorage)}
                        </div>
                        <p className="text-primary-content/70">per month</p>
                      </div>
                      <div className="form-control w-full mb-4">
                        <label className="label">
                          <span className="label-text text-primary-content">Storage: {monthlyStorage} MB</span>
                        </label>
                        <input 
                          type="range" 
                          min="200" 
                          max="5000" 
                          value={monthlyStorage}
                          onChange={(e) => setMonthlyStorage(Number(e.target.value))}
                          step="100"
                          className="range range-secondary"
                        />
                        <div className="w-full flex justify-between text-xs px-2 text-primary-content/70">
                          <span>200MB</span>
                          <span>5GB</span>
                        </div>
                      </div>
                      <ul className="space-y-2 mb-8">
                        <li>✓ Unlimited documents</li>
                        <li>✓ {monthlyStorage} MB storage</li>
                        <li>✓ Priority support</li>
                      </ul>
                    </div>
                    <label htmlFor="auth-drawer" className="btn btn-secondary w-full mt-auto">
                      Start with Monthly
                    </label>
                  </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body flex flex-col justify-between">
                    <div>
                      <div className="h-40">
                        <h3 className="card-title text-xl mb-2">Yearly</h3>
                        <div className="text-3xl font-bold mb-4">
                          ${calculateYearlyPrice(yearlyStorage)}
                        </div>
                        <p className="text-base-content/70">per year (2 months free!)</p>
                      </div>
                      <div className="form-control w-full mb-4">
                        <label className="label">
                          <span className="label-text">Storage: {yearlyStorage} MB</span>
                        </label>
                        <input 
                          type="range" 
                          min="200" 
                          max="5000" 
                          value={yearlyStorage}
                          onChange={(e) => setYearlyStorage(Number(e.target.value))}
                          step="100"
                          className="range range-primary"
                        />
                        <div className="w-full flex justify-between text-xs px-2 text-base-content/70">
                          <span>200MB</span>
                          <span>5GB</span>
                        </div>
                      </div>
                      <ul className="space-y-2 mb-8">
                        <li>✓ Unlimited documents</li>
                        <li>✓ {yearlyStorage} MB storage</li>
                        <li>✓ Premium support</li>
                        <li>✓ Save up to17% annually</li>
                      </ul>
                    </div>
                    <label htmlFor="auth-drawer" className="btn btn-primary w-full mt-auto">
                      Start with Yearly
                    </label>
                  </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title text-xl mb-2">Enterprise</h3>
                    <div className="text-3xl font-bold mb-4">Custom</div>
                    <p className="text-base-content/70 mb-4">Tailored to your needs</p>
                    <ul className="space-y-2 mb-8">
                      <li>✓ Unlimited storage</li>
                      <li>✓ Custom integrations</li>
                      <li>✓ Dedicated support</li>
                      <li>✓ SLA guarantees</li>
                      <li>✓ Team management</li>
                    </ul>
                    <a 
                      href="mailto:sales@pythiq.ai" 
                      className="btn btn-primary w-full"
                    >
                      Contact Sales
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="footer p-10 bg-base-200 text-base-content">
            <aside>
              <NavBrand />
              <p className="mt-2">Making document intelligence accessible since 2024</p>
            </aside>
            <nav>
              <h6 className="footer-title">Product</h6>
              <button onClick={() => scrollToSection('features')} className="link link-hover">Features</button>
              <button onClick={() => scrollToSection('pricing')} className="link link-hover">Pricing</button>
              <a href="mailto:support@pythiq.ai" className="link link-hover">Support</a>
            </nav>
            <nav>
              <h6 className="footer-title">Company</h6>
              <a href="mailto:sales@pythiq.ai" className="link link-hover">Contact</a>
              <a href="/privacy" className="link link-hover">Privacy Policy</a>
              <a href="/terms" className="link link-hover">Terms of Service</a>
            </nav>
            <nav>
              <h6 className="footer-title">Social</h6>
              <div className="grid grid-flow-col gap-4">
                <a href="https://youtube.com/@pythiq" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
                <a href="https://github.com/pythiq" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/company/pythiq" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
              <p className="mt-4">© {new Date().getFullYear()} PythiQ - All rights reserved</p>
            </nav>
          </footer>
        </div>
      </div>

      {/* Auth Drawer */}
      <div className="drawer-side">
        <label htmlFor="auth-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="p-4 w-80 min-h-full bg-base-200 pt-20">
          <AuthContainer />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;