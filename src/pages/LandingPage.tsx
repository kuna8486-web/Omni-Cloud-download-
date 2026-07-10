import React from 'react';
import { motion } from 'motion/react';
import { Download, Cloud, FolderTree, Zap, Shield, ChevronRight, Menu, X } from 'lucide-react';
import { useAdminStore } from '../lib/store';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

function HeroSection({ data }: { data: any }) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="hero-glow" style={{ top: '-100px', left: '-100px' }}></div>
      {/* Background Image with Overlay */}
      <motion.div 
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={data.heroBackgroundUrl} 
          alt="Omni Cloud Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/20" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-sm font-medium text-white/80 tracking-wide uppercase">Omni Cloud is Live</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-none text-white mb-6"
        >
          Store • Organize • Access
          <br className="hidden md:block" />
          <span className="accent-gradient"> Your Files</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mb-12 leading-relaxed"
        >
          {data.appDescription}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a href="#download" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold shadow-lg shadow-blue-900/20 transition-all duration-300 transform hover:scale-105 active:scale-95">
            <Download className="w-5 h-5" />
            Download Latest APK
          </a>
          <a href="#features" className="inline-flex items-center justify-center gap-2 px-8 py-4 glass hover:bg-white/5 text-white font-semibold transition-all duration-300">
            View Features
            <ChevronRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function DownloadSection({ release }: { release: any }) {
  if (!release) return null;
  return (
    <section id="download" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-500/5 mix-blend-screen" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto glass p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-blue-500/10 blur-[100px] rounded-full" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
              <div className="flex-1">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-blue-500 mb-2">Latest Release</h3>
                <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
                  <span className="text-xl font-bold">Update {release.version}</span>
                  <span className="text-gray-500 text-sm ml-auto">Released {release.releaseDate}</span>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div>
                    <h4 className="text-white/80 font-medium mb-1 text-sm uppercase tracking-wider">What's New</h4>
                    <p className="text-gray-400 text-sm">{release.whatsNew}</p>
                  </div>
                  {(release.bugFixes || release.performance) && (
                    <div className="grid grid-cols-2 gap-4">
                      {release.bugFixes && (
                        <div>
                          <h4 className="text-white/80 font-medium mb-1 text-sm uppercase tracking-wider">Fixes</h4>
                          <p className="text-white/50 text-sm">{release.bugFixes}</p>
                        </div>
                      )}
                      {release.performance && (
                        <div>
                          <h4 className="text-white/80 font-medium mb-1 text-sm uppercase tracking-wider">Performance</h4>
                          <p className="text-white/50 text-sm">{release.performance}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="w-full md:w-auto">
                <a 
                  href={release.apkUrl || '#'} 
                  className={cn(
                    "flex flex-col items-center justify-center w-full md:w-64 aspect-square glass hover:bg-white/5 transition-all transform hover:scale-105 active:scale-95",
                    !release.apkUrl && "opacity-50 cursor-not-allowed hover:scale-100 grayscale"
                  )}
                  onClick={(e) => !release.apkUrl && e.preventDefault()}
                >
                  <Download className="w-12 h-12 text-blue-400 mb-4" />
                  <span className="text-white font-bold text-xl">Download APK</span>
                  <span className="text-gray-400 text-sm mt-2">{release.size || 'Size unknown'}</span>
                  {!release.apkUrl && <span className="text-white/60 text-sm mt-2">Not available yet</span>}
                </a>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}

const IconMap: Record<string, React.ElementType> = {
  'cloud': Cloud,
  'folder-tree': FolderTree,
  'zap': Zap,
  'shield': Shield,
};

function FeaturesSection({ features }: { features: any[] }) {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why Choose Omni Cloud</h2>
          <p className="text-white/50 max-w-2xl mx-auto">Experience a file management system designed for speed, security, and simplicity.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = IconMap[feature.iconName] || Cloud;
            return (
              <motion.div 
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-6 flex flex-col justify-between hover:bg-white/[0.05] transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-6 transition-colors">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-bold mt-2 text-white mb-2">{feature.title}</h3>
                <p className="text-xs text-gray-500">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection({ useCases }: { useCases: any[] }) {
  return (
    <section className="py-24 bg-black/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Everyday Use Cases</h2>
            <p className="text-white/50 max-w-xl">Discover how Omni Cloud fits perfectly into your daily routine, keeping what matters most safe and organized.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {useCases.map((useCase, i) => (
            <motion.div 
              key={useCase.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative glass overflow-hidden"
            >
              <div className="h-full p-8 flex flex-col justify-end min-h-[300px] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/90 to-transparent z-10" />
                <div className="relative z-20">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{useCase.title}</h3>
                  <p className="text-gray-400 text-sm">{useCase.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection({ screenshots }: { screenshots: any[] }) {
  if (!screenshots || screenshots.length === 0) return null;
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center">Beautiful Interface</h2>
      </div>
      <div className="flex gap-6 px-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar" style={{ scrollbarWidth: 'none' }}>
        {screenshots.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="snap-center shrink-0 w-[280px] md:w-[320px] rounded-[1.5rem] overflow-hidden border border-white/10 shadow-2xl glass p-2"
          >
            <img src={img.url} alt={`Screenshot ${i + 1}`} className="w-full h-auto object-cover rounded-xl" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function InstallGuideSection({ steps }: { steps: any[] }) {
  return (
    <section className="py-24 bg-black/30">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 text-center">Installation Guide</h2>
        <div className="max-w-3xl mx-auto space-y-12">
          {steps.sort((a, b) => a.stepNumber - b.stepNumber).map((step, i) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-6 items-start"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold border border-blue-500/30">
                {step.stepNumber}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/60 mb-4">{step.description}</p>
                {step.imageUrl && (
                  <img src={step.imageUrl} alt={step.title} className="rounded-xl border border-white/10 max-w-sm w-full" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection({ data }: { data: any }) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="glass p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="w-48 h-48 flex-shrink-0 rounded-[1.5rem] overflow-hidden border border-white/10 relative p-2 glass">
               <img src={data.developerPhotoUrl} alt={data.developerName} className="w-full h-full object-cover rounded-xl" />
               <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay" />
            </div>
            <div>
              <h4 className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-2">About the Developer</h4>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{data.developerName}</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                {data.developerBio}
              </p>
              <div className="flex gap-4">
                {data.contactGithub && <a href={`https://github.com/${data.contactGithub}`} className="text-gray-400 hover:text-white transition-colors text-sm font-semibold">GitHub</a>}
                {data.contactWebsite && <a href={data.contactWebsite} className="text-gray-400 hover:text-white transition-colors text-sm font-semibold">Website</a>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection({ faqs }: { faqs: any[] }) {
  return (
    <section className="py-24 bg-black/50">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <motion.div 
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6"
            >
              <h3 className="text-lg font-bold text-white mb-2">{faq.question}</h3>
              <p className="text-gray-400 text-sm">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ data }: { data: any }) {
  return (
    <footer className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest border-t border-white/5 py-8 container mx-auto px-6">
      <div>&copy; {new Date().getFullYear()} {data.developerName}. All rights reserved.</div>
      <div className="flex gap-6">
        <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-blue-500 transition-colors">Terms of Use</a>
      </div>
      <div>Made with <span className="text-red-500">❤️</span> by {data.developerName}</div>
    </footer>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
      scrolled ? "bg-black/80 backdrop-blur-xl border-white/10 py-4" : "bg-transparent py-6"
    )}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="text-white font-bold text-2xl tracking-tighter flex items-center gap-2">
          <Cloud className="w-8 h-8 text-blue-500" />
          Omni
        </div>
        
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#download" className="hover:text-white">Download</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
          <Link to="/admin" className="px-6 py-2 glass hover:bg-white/5 text-sm font-semibold text-white transition-colors">Admin Panel</Link>
        </nav>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#030712] border-b border-white/10 py-4 px-6 flex flex-col gap-4">
          <a href="#features" className="text-white/80" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#download" className="text-white/80" onClick={() => setMobileMenuOpen(false)}>Download</a>
          <a href="#faq" className="text-white/80" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          <Link to="/admin" className="text-white/80" onClick={() => setMobileMenuOpen(false)}>Admin Panel</Link>
        </div>
      )}
    </header>
  );
}

function ContactSection({ data }: { data: any }) {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="glass p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto text-sm">Have questions or feedback? We'd love to hear from you. Reach out through any of our channels.</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {data.contactEmail && (
              <a href={`mailto:${data.contactEmail}`} className="px-6 py-3 glass hover:bg-white/5 flex items-center gap-3 transition-colors">
                <span className="text-blue-500 font-semibold text-sm uppercase tracking-widest">Email</span>
                <span className="text-white text-sm font-medium">{data.contactEmail}</span>
              </a>
            )}
            {data.contactTelegram && (
              <a href={`https://t.me/${data.contactTelegram.replace('@', '')}`} className="px-6 py-3 glass hover:bg-white/5 flex items-center gap-3 transition-colors">
                <span className="text-blue-500 font-semibold text-sm uppercase tracking-widest">Telegram</span>
                <span className="text-white text-sm font-medium">{data.contactTelegram}</span>
              </a>
            )}
            {data.contactWebsite && (
              <a href={data.contactWebsite} className="px-6 py-3 glass hover:bg-white/5 flex items-center gap-3 transition-colors">
                <span className="text-blue-500 font-semibold text-sm uppercase tracking-widest">Website</span>
                <span className="text-white text-sm font-medium">{data.contactWebsite}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  const { data } = useAdminStore();

  return (
    <div className="min-h-screen bg-bg-base text-gray-50 selection:bg-blue-500/30 font-sans">
      <Navbar />
      <main>
        <HeroSection data={data} />
        <DownloadSection release={data.latestRelease} />
        <FeaturesSection features={data.features} />
        <UseCasesSection useCases={data.useCases} />
        <GallerySection screenshots={data.screenshots} />
        <InstallGuideSection steps={data.installSteps} />
        <AboutSection data={data} />
        <FAQSection faqs={data.faqs} />
        <ContactSection data={data} />
      </main>
      <Footer data={data} />
    </div>
  );
}
