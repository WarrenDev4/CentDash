import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      setScrollProgress(progress);
      setIsScrolled(scrollTop > 40);
      setShowBackToTop(scrollTop > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>CentDash | ML-Powered Personal Finance</title>
        <meta name="description" content="Predict spending with LSTM and detect fraud with Isolation Forest." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] z-[2000] transition-[width] duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full flex items-center bg-[#050505]/95 backdrop-blur-md z-[1000] border-b border-[#222222] transition-all duration-300 ${
        isScrolled ? 'h-[72px] shadow-xl' : 'h-[100px]'
      }`}>
        <div className="max-w-[1100px] w-full mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <img src="/assets/CentDash (White) (1).png" alt="CentDash Logo" className="h-12 w-40" />
        </a>
          {/* Mobile Menu Toggle */}
          <button 
            className="flex flex-col gap-[6px] p-2 md:hidden cursor-pointer focus:outline-none z-[1001]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
            <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
          </button>

          {/* Nav Links */}
          <div className={`fixed md:relative top-0 ${isMobileMenuOpen ? 'right-0' : 'right-[-100%]'} md:right-auto w-4/5 md:w-auto h-screen md:h-auto bg-[#0a0a0a] md:bg-transparent flex flex-col md:flex-row items-center justify-center md:justify-end gap-8 md:gap-6 transition-all duration-400 ease-in-out border-l border-[#222222] md:border-none z-[1000]`}>
            <a href="#solutions" onClick={() => setIsMobileMenuOpen(false)} className="text-[#94a3b8] hover:text-white font-semibold text-sm transition-colors">Who It's For</a>
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-[#94a3b8] hover:text-white font-semibold text-sm transition-colors">ML Core Features</a>
            <a href="#how" onClick={() => setIsMobileMenuOpen(false)} className="text-[#94a3b8] hover:text-white font-semibold text-sm transition-colors">How It Works</a>
            <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-[#94a3b8] hover:text-white font-semibold text-sm transition-colors">Pricing</a>
            <a href="#get-started" onClick={() => setIsMobileMenuOpen(false)} className="bg-[#3b82f6] hover:brightness-115 text-white font-bold py-3 px-6 rounded-lg shadow-[0_4px_14px_0_rgba(59,130,246,0.3)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm">
              Get Early Access
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative text-center pt-[180px] pb-20 overflow-hidden min-h-[80vh] flex items-center">
        {/* Video Background (Update to your path) */}
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src="../assets/7691558-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[#050505]/80 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/40 to-black z-[1]" />

        <div className="max-w-[1100px] w-full mx-auto px-6 relative z-[2]">
          <div className="inline-flex items-center gap-2 bg-[#3b82f6]/10 border border-[#3b82f6]/40 text-[#bfdbfe] text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            <span className="w-[7px] h-[7px] rounded-full bg-[#bfdbfe] animate-pulse-dot" />
            Machine Learning Platform
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Predict your spending.<br />
            <span className="gradient-text">Detect anomalies in real-time.</span>
          </h1>
          
          <p className="text-[#94a3b8] text-base sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            CentDash uses advanced LSTM neural networks and Isolation Forest models to forecast your monthly expenses, spot suspicious activity instantly, and optimize your financial health.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#get-started" className="w-full sm:w-auto bg-[#3b82f6] hover:brightness-115 text-white font-bold py-4 px-10 rounded-xl shadow-[0_4px_14px_0_rgba(59,130,246,0.3)] transform hover:-translate-y-0.5 transition-all text-base">
              Get Early Access
            </a>
            <a href="#features" className="w-full sm:w-auto bg-transparent text-white border border-[#333333] hover:brightness-115 font-bold py-4 px-10 rounded-xl transform hover:-translate-y-0.5 transition-all text-base">
              Explore ML Models
            </a>
          </div>
        </div>
      </header>

      {/* Solutions */}
      <section id="solutions" className="py-20 border-t border-[#222222]">
        <div className="max-w-[1100px] w-full mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white">Intelligent analytics for every financial layer</h2>
            <p className="text-[#94a3b8] mt-3 text-base max-w-xl mx-auto">CentDash analyzes transactional telemetry to protect assets and predict budget trends continuously.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: 'fa-wallet', title: 'Personal Accounts', desc: 'Predict individual run rates and upcoming structural costs.' },
              { icon: 'fa-user-tie', title: 'High Net-Worth', desc: 'Secure asset distribution networks using pattern matching.' },
              { icon: 'fa-scale-balanced', title: 'Budget Conscious', desc: 'Dynamic alert bounds mapping micro-spending variances.' },
              { icon: 'fa-shield-halved', title: 'Security First Users', desc: 'Real-time classification engines isolating anomalous vectors.' }
            ].map((card, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-[#111111] border border-[#222222] hover:border-[#3b82f6]/45 transform hover:-translate-y-1 transition-all duration-300 flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center text-lg text-[#bfdbfe] shrink-0">
                  <i className={`fa-solid ${card.icon}`}></i>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{card.title}</div>
                  <div className="text-xs text-[#94a3b8] mt-1 leading-relaxed">{card.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core AI/ML Features */}
      <section id="features" className="py-20 bg-[#0a0a0a]/50 border-t border-[#222222]">
        <div className="max-w-[1100px] w-full mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white">Financial intelligence powered by ML</h2>
            <p className="text-[#94a3b8] mt-3 text-base">Mathematical certainty brought directly to your personal transaction ledger.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-[#111111] border border-[#222222] hover:border-[#3b82f6]/50 transform hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center text-xl text-[#bfdbfe] mb-5"><i className="fa-solid fa-chart-line"></i></div>
              <h3 className="text-lg font-bold text-white mb-2">LSTM Expenditure Forecasting</h3>
              <p className="text-sm text-[#94a3b8]">Processes historical sequences over rolling intervals to accurately map recurring expenses, cyclical spikes, and upcoming cashflow demands.</p>
              <span className="inline-block mt-4 text-xs font-semibold text-[#bfdbfe] bg-[#3b82f6]/10 px-3 py-1 rounded-md">Deep Learning Pipeline</span>
            </div>

            <div className="p-8 rounded-2xl bg-[#111111] border border-[#222222] hover:border-[#3b82f6]/50 transform hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center text-xl text-[#bfdbfe] mb-5"><i className="fa-solid fa-shield-virus"></i></div>
              <h3 className="text-lg font-bold text-white mb-2">Isolation Forest Detection</h3>
              <p className="text-sm text-[#94a3b8]">Isolates fraudulent profiles and processing outliers based on velocity, location parameters, and deviation trends instantly.</p>
              <span className="inline-block mt-4 text-xs font-semibold text-[#bfdbfe] bg-[#3b82f6]/10 px-3 py-1 rounded-md">Real-Time Anomaly Engine</span>
            </div>

            <div className="p-8 rounded-2xl bg-[#111111] border border-[#222222] hover:border-[#3b82f6]/50 transform hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center text-xl text-[#bfdbfe] mb-5"><i className="fa-solid fa-brain"></i></div>
              <h3 className="text-lg font-bold text-white mb-2">Automated Categorization</h3>
              <p className="text-sm text-[#94a3b8]">Transforms unformatted text descriptions into clear, semantic categories, ensuring flawless dataset cleaning before prediction cycles.</p>
              <span className="inline-block mt-4 text-xs font-semibold text-[#bfdbfe] bg-[#3b82f6]/10 px-3 py-1 rounded-md">Natural Language Parsing</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how" className="py-20 border-t border-[#222222]">
        <div className="max-w-[1100px] w-full mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white">The Analytics Lifecycle</h2>
            <p className="text-[#94a3b8] mt-3 text-base">From data streaming to preventative financial protection.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { num: 1, title: 'Secure Data Sync', desc: 'Securely map transactions using bank-level integrations to extract high-density structural records.' },
              { num: 2, title: 'Neural Model Run', desc: 'Our cloud platform pipes vectors through active neural nets to score anomalies and refresh forecast metrics.' },
              { num: 3, title: 'Proactive Dashboards', desc: 'Review future curves, monitor security flags, and track spending bounds effortlessly.' }
            ].map((step, idx) => (
              <div key={idx} className="group">
                <div className="w-14 h-14 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/40 flex items-center justify-center text-lg font-extrabold text-[#bfdbfe] mx-auto mb-4 group-hover:bg-[#3b82f6] group-hover:text-white transition-all duration-300">
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-[#94a3b8] leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 border-t border-[#222222] bg-[#0a0a0a]/30">
        <div className="max-w-[1100px] w-full mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white">Simple, honest pricing</h2>
            <p className="text-[#94a3b8] mt-3 text-base">Deploy individual nodes or secure an enterprise workspace.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Free */}
            <div className="p-8 rounded-2xl bg-[#111111] border border-[#222222] flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-2">Sandbox Node</div>
                <div className="text-4xl font-extrabold text-white mb-2">$0 <span className="text-sm font-normal text-[#94a3b8]">/ month</span></div>
                <div className="text-xs text-[#94a3b8] pb-6 mb-6 border-b border-[#222222]">Core platform data exploratory tier.</div>
                <ul className="space-y-3 mb-8 text-xs text-[#94a3b8]">
                  <li><i className="fa-solid fa-check text-[#bfdbfe] mr-2"></i> Historical trends review</li>
                  <li><i className="fa-solid fa-check text-[#bfdbfe] mr-2"></i> Standard LSTM forecast models</li>
                  <li><i className="fa-solid fa-check text-[#bfdbfe] mr-2"></i> Batch anomaly detection exports</li>
                </ul>
              </div>
              <a href="#get-started" className="w-full text-center bg-transparent border border-[#333333] hover:brightness-115 text-white font-bold py-3 rounded-lg text-xs transition-all">Get started free</a>
            </div>

            {/* Pro */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-[#1e293b] to-[#111111] border border-[#3b82f6] relative flex flex-col justify-between transform -translate-y-2">
              <div className="absolute top-[-13px] left-1/2 -translate-x-1/2 bg-[#3b82f6] text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider">Most Popular</div>
              <div>
                <div className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-2">Pro Node</div>
                <div className="text-4xl font-extrabold text-white mb-2">$19 <span className="text-sm font-normal text-[#94a3b8]">/ month</span></div>
                <div className="text-xs text-[#94a3b8] pb-6 mb-6 border-b border-[#222222]">Continuous cloud protection loop.</div>
                <ul className="space-y-3 mb-8 text-xs text-[#94a3b8]">
                  <li><i className="fa-solid fa-check text-[#bfdbfe] mr-2"></i> Unlimited dynamic transaction inputs</li>
                  <li><i className="fa-solid fa-check text-[#bfdbfe] mr-2"></i> Instant Isolation Forest monitoring</li>
                  <li><i className="fa-solid fa-check text-[#bfdbfe] mr-2"></i> Real-time telemetry webhooks</li>
                  <li><i className="fa-solid fa-check text-[#bfdbfe] mr-2"></i> Priority model compute queues</li>
                </ul>
              </div>
              <a href="#get-started" className="w-full text-center bg-[#3b82f6] hover:brightness-115 text-white font-bold py-3 rounded-lg text-xs shadow-md transition-all">Deploy Pro Node</a>
            </div>

            {/* Enterprise */}
            <div className="p-8 rounded-2xl bg-[#111111] border border-[#222222] flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider mb-2">Cluster Node</div>
                <div className="text-4xl font-extrabold text-white mb-2">$99 <span className="text-sm font-normal text-[#94a3b8]">/ month</span></div>
                <div className="text-xs text-[#94a3b8] pb-6 mb-6 border-b border-[#222222]">Dedicated multi-tenant clustering.</div>
                <ul className="space-y-3 mb-8 text-xs text-[#94a3b8]">
                  <li><i className="fa-solid fa-check text-[#bfdbfe] mr-2"></i> Everything in Pro Node</li>
                  <li><i className="fa-solid fa-check text-[#bfdbfe] mr-2"></i> Up to 10 user analytical accounts</li>
                  <li><i className="fa-solid fa-check text-[#bfdbfe] mr-2"></i> Custom LSTM hyperparameter tweaking</li>
                  <li><i className="fa-solid fa-check text-[#bfdbfe] mr-2"></i> SLA structured dedicated pipelines</li>
                </ul>
              </div>
              <a href="#get-started" className="w-full text-center bg-transparent border border-[#333333] hover:brightness-115 text-white font-bold py-3 rounded-lg text-xs transition-all">Contact Sales</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="get-started" className="max-w-[1100px] w-full mx-auto px-6 my-16">
        <div className="bg-gradient-to-br from-[#1e293b] to-[#050505] border border-[#222222] rounded-[30px] py-16 px-6 text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">Empower your cashflow logic through AI</h2>
          <p className="text-[#94a3b8] text-sm sm:text-base max-w-lg mx-auto mb-8">
            CentDash is a unified cloud-native web interface. Secure early beta access to local execution endpoints below.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Enter your professional email" 
              className="w-full bg-[#111111] border border-[#333333] focus:border-[#3b82f6] rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none transition-colors"
            />
            <button className="bg-[#3b82f6] hover:brightness-115 text-white font-bold px-6 py-3.5 rounded-xl text-sm whitespace-nowrap transition-all shadow-md">
              Request Access
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#222222] py-12 text-center text-[#94a3b8]">
        <div className="max-w-[1100px] w-full mx-auto px-6">
          <div className="text-lg font-bold text-white mb-6">
            <span className="text-[#60a5fa]">Cent</span>Dash
          </div>
          <div className="flex justify-center gap-8 mb-6 flex-wrap text-sm">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#how" className="hover:text-white transition-colors">How It Works</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Infrastructure</a>
          </div>
          <p className="text-xs">&copy; {new Date().getFullYear()} CentDash. All rights reserved.</p>
        </div>
      </footer>

      {/* Back to Top */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 w-11 h-11 rounded-full bg-[#3b82f6] text-white flex items-center justify-center shadow-[0_6px_18px_rgba(59,130,246,0.3)] cursor-pointer transition-all duration-300 z-[999] ${
          showBackToTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </>
  );
}