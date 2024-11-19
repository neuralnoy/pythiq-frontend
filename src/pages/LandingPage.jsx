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
  
  const calculatePrice = (basePrice, storage) => {
    if (storage <= 200) return basePrice;
    const additionalStorage = storage - 200; // MB above base storage
    const additionalPrice = Math.floor(additionalStorage / 100) * 2; // $2 per 100MB
    return basePrice + additionalPrice;
  };
  
  const calculateMonthlyPrice = (storage) => {
    if (storage <= 200) return 29;
    const additionalStorage = storage - 200; // MB above base storage
    const additionalPrice = Math.floor(additionalStorage / 100) * 2; // $2 per 100MB
    return Math.min(29 + additionalPrice, 199); // Cap at 199
  };
  
  const calculateYearlyPrice = (storage) => {
    if (storage <= 200) return 289;
    const additionalStorage = storage - 200; // MB above base storage
    const additionalPrice = Math.floor(additionalStorage / 100) * 20; // $20 per 100MB
    return Math.min(289 + additionalPrice, 1979); // Cap at 1979
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
              <p className="text-xl mb-12 text-base-content/80">
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
                    <p>Automatically organize and categorize your documents using AI-powered insights.</p>
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
                      Choose Monthly
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
                        <li>✓ Save 17% annually</li>
                      </ul>
                    </div>
                    <label htmlFor="auth-drawer" className="btn btn-primary w-full mt-auto">
                      Choose Yearly
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
                      <li>✓ Advanced security</li>
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
          <footer className="footer footer-center p-10 bg-base-200 text-base-content">
            <div>
              <p className="font-bold">
                PythiQ © {new Date().getFullYear()} - All rights reserved
              </p>
            </div>
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