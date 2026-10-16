import React from 'react';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { GUIDES_DATA } from '../data/guides';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface GuidesHubPageProps {
  onNavigate: (path: string) => void;
}

export const GuidesHubPage: React.FC<GuidesHubPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumbs items={[{ label: 'Guides & Learning Hub' }]} onNavigate={onNavigate} />

      <section className="pt-8 pb-12 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Image Engineering Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            PNG Guides & Image Comparisons
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            In-depth technical guides, format comparisons, transparency tutorials, and compression insights written by digital image architects.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Master Article Banner */}
        {(() => {
          const featured = GUIDES_DATA.find((g) => g.slug === 'ultimate-image-to-png-master-guide');
          if (!featured) return null;
          return (
            <article className="mb-10 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 text-xs">
                  <span className="bg-blue-500/30 text-blue-200 border border-blue-400/30 px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px]">
                    ⭐ Flagship Masterclass
                  </span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.readingTime}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                  <a
                    href={`/guides/${featured.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/guides/${featured.slug}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-blue-200 transition-colors"
                  >
                    {featured.title}
                  </a>
                </h2>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl mb-6">
                  {featured.summary}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs text-slate-300">
                  <span>Updated {featured.lastUpdated}</span>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate(`/guides/${featured.slug}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-md cursor-pointer"
                  >
                    <span>Read Master Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          );
        })()}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GUIDES_DATA.filter((g) => g.slug !== 'ultimate-image-to-png-master-guide').map((guide) => (
            <article
              key={guide.slug}
              className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-blue-600 uppercase tracking-wider text-[11px] bg-blue-50 px-2 py-0.5 rounded">
                    {guide.category}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {guide.readingTime}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                  <a
                    href={`/guides/${guide.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/guides/${guide.slug}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {guide.title}
                  </a>
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {guide.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Updated {guide.lastUpdated}</span>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate(`/guides/${guide.slug}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
