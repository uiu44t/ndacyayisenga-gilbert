import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, Clock, ArrowRight, User, X } from 'lucide-react';

interface Article {
  id: string;
  category: 'Tech News' | 'Product Reviews' | 'Buying Guides' | 'Tips & Tricks';
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export default function BlogSection() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const articles: Article[] = [
    {
      id: 'b1',
      category: 'Tech News',
      title: 'The Future of Solid-State EV Batteries in Rwanda',
      excerpt: 'How local infrastructure hubs are preparing for next-generation solid-state battery cells for hyper-efficient charging.',
      content: 'Electric mobility in East Africa is entering a massive evolution stage. Solid-state EV batteries offer three times the energy density of standard lithium-ion, meaning a single charge could cover from Kigali to Mombasa with zero intermediate recharges. Local micro-grids and charging networks are currently undergoing upgrades to sustain extreme current pulses required for 5-minute ultra-fast recharge channels. Bruce Rii Automotive is collaborating with clean-tech startups to pilot the first solid-state cell cells in the region.',
      author: 'Jean Paul Habimana',
      date: 'June 18, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1558441719-ff34b0524a24?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'b2',
      category: 'Product Reviews',
      title: 'In-Depth Review: Stealth Carbon-1000 Track Capability',
      excerpt: 'We take the flagship carbon-clad superbike to its absolute limits around the Mugello Circuit to audit its stability.',
      content: 'The Bruce Rii Stealth Carbon-1000 is not just a motorcycle; it is a masterpiece of precision aerodynamic engineering. Built entirely around an autoclave carbon fiber monocoque chassis, its power-to-weight ratio matches MotoGP specs. We audited the cornering traction control algorithms across 50 high-speed laps. Under heavy trail braking, the Ohlins semi-active suspension stabilizes the nose beautifully, while the titanium Akrapovič setup unleashes a raw, mechanical rumble.',
      author: 'Marcus Vance',
      date: 'May 29, 2026',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'b3',
      category: 'Buying Guides',
      title: 'Enterprise Laptops vs. Workstation Hardware: 2026 Guide',
      excerpt: 'Unsure if you need standard ultra-portables or dedicated high-frequency CPU workstations? Here is a breakdown of computational workflows.',
      content: 'For heavy rendering, micro-architecture compiling, or continuous AI modeling, standard enterprise laptops quickly bottleneck due to thermal throttling. Workstation-grade laptops offer continuous peak wattage with dual high-frequency fan systems and ECC memory which prevents software crashes. When selecting your layout, ensure you assess physical GPU architectures rather than just bulk RAM capacity.',
      author: 'Bruce Rii Engineering',
      date: 'April 14, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'b4',
      category: 'Tips & Tricks',
      title: 'How to Prevent Battery Corrosion in Humid Climates',
      excerpt: 'Simple environmental calibration tricks to double the lifespan of your laptop and smartphone power banks.',
      content: 'Relative humidity levels above 70% can accelerate electrochemical degradation inside modern lithium batteries. This creates microscopic copper dendritic formations that cause quick discharge patterns or premature swelling. To prevent corrosion: keep devices off cold tiles, use silica dry gels inside laptop bags, and avoid leaving chargers connected to unstable power grids during sudden lightning storms.',
      author: 'Gilbert Ndacyayisenga',
      date: 'March 22, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const filteredArticles = activeFilter === 'All' 
    ? articles 
    : articles.filter(a => a.category === activeFilter);

  const filters = ['All', 'Tech News', 'Product Reviews', 'Buying Guides', 'Tips & Tricks'];

  return (
    <section id="blog-section" className="py-12 space-y-8 text-left">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold tracking-widest uppercase mb-1">
            <BookOpen className="w-3.5 h-3.5 text-secondary" />
            <span>The Bruce Rii Chronicle</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Insights, Reviews & Guides
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-light mt-1">
            Keep up with advanced technical reports, performance reviews, and computer hardware calibration guides.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5 self-start md:self-auto text-xs font-mono">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-xl cursor-pointer border transition-all ${
                activeFilter === f
                  ? 'bg-primary border-primary text-white font-bold'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-850'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredArticles.map(art => (
          <div
            key={art.id}
            className="group flex flex-col justify-between bg-slate-50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900/85 border border-slate-200 dark:border-slate-850 hover:border-primary/30 rounded-2xl p-4 transition-all duration-300 shadow-sm cursor-pointer"
            onClick={() => setSelectedArticle(art)}
          >
            <div className="space-y-3">
              <div className="aspect-video rounded-xl bg-slate-100 dark:bg-slate-950 overflow-hidden relative border border-slate-200 dark:border-slate-800">
                <img
                  src={art.image}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  alt={art.title}
                />
                <span className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-md text-white font-mono text-[9px] px-2 py-0.5 rounded-md font-medium uppercase tracking-wider">
                  {art.category}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                  <span>{art.date}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>
                <h3 className="font-bold text-slate-950 dark:text-white text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light line-clamp-3 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-150 dark:border-slate-850/60 flex items-center justify-between text-[11px] font-mono text-slate-500 group-hover:text-primary transition-all">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                {art.author}
              </span>
              <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Overlay Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col text-left"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-white transition-all cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="aspect-video relative bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                <img
                  src={selectedArticle.image}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  alt={selectedArticle.title}
                />
                <span className="absolute bottom-4 left-4 bg-primary text-white font-mono text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold shadow-md">
                  {selectedArticle.category}
                </span>
              </div>

              <div className="p-6 sm:p-8 space-y-4 overflow-y-auto max-h-[350px]">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-mono">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-primary" />
                    {selectedArticle.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {selectedArticle.readTime}
                  </span>
                  <span>•</span>
                  <span>{selectedArticle.date}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 dark:text-white leading-tight">
                  {selectedArticle.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed whitespace-pre-line pt-2">
                  {selectedArticle.content}
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-150 dark:border-slate-850 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white rounded-xl text-xs font-mono transition-all cursor-pointer"
                >
                  Close article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
