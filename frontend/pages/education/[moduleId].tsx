import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MechanicaLayout } from '../../components/layout/mechanicaLayout';
import { MechanicaButton } from '../../components/ui/mechanicaButton';
import { MechanicaGear } from '../../components/ui/mechanicaGear';
import { modules } from '../../content/education/modules';
import { MechanicaCard } from '../../components/ui/mechanicaCard';

export default function ModuleViewer() {
  const router = useRouter();
  const { moduleId } = router.query;

  // Find the module
  const currentModule = modules.find(m => m.id === moduleId);

  // Loading state (only show if router is not ready)
  if (!router.isReady)
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-blue-400">
        Loading module data...
      </div>
    );

  // Not found state
  if (!currentModule) {
    return (
      <MechanicaLayout
        title="Lesson Not Found"
        description="We couldn't find that lesson."
      >
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-center p-4">
          <MechanicaGear
            size="xl"
            color="copper"
            speed="slow"
            className="mb-6 opacity-50"
          />
          <h1 className="text-3xl font-bold text-white mb-4">
            Lesson Not Found
          </h1>
          <p className="text-gray-400 mb-8">
            We couldn't find the lesson &quot;{moduleId}&quot;. Let's get you back on track.
          </p>
          <div className="mt-4">
            <MechanicaButton
              href="/learning-hub"
              variant="mechanical"
              size="lg"
            >
              Back to Learning Hub
            </MechanicaButton>
          </div>
        </div>
      </MechanicaLayout>
    );
  }

  return (
    <MechanicaLayout
      title={`${currentModule.title} | Learning Hub`}
      description={currentModule.description}
    >
      <Head>
        <title>{currentModule.title} | BeginnerInvestorHub</title>
      </Head>

      <div className="min-h-screen bg-slate-900 text-blue-50 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/img/grid.svg')] opacity-20"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]"></div>
        </div>

        {/* Top Navigation Bar */}
        <div className="bg-slate-800/80 backdrop-blur-md border-b border-blue-500/20 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Using Next Link or custom button effectively */}
              <Link
                href="/learning-hub"
                className="text-gray-400 hover:text-white transition-colors flex items-center text-sm font-medium"
              >
                ← Learning Hub
              </Link>
              <div className="h-4 w-px bg-gray-600 hidden sm:block"></div>
              <span className="text-blue-300 font-bold uppercase tracking-widest text-xs hidden sm:block">
                Lesson: {currentModule.title}
              </span>
            </div>
            {/* Progress Bar Mock */}
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono text-gray-500 hidden sm:inline">
                Progress: 0%
              </span>
              <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-1/4 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar: Lesson List */}
            <div className="lg:col-span-3">
              <div className="bg-slate-800/50 backdrop-blur border border-blue-500/20 rounded-xl p-4 sticky top-24">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-4 px-2">
                  Topics
                </h3>
                <div className="space-y-2">
                  {currentModule.lessons.map((lesson, idx) => (
                    <div
                      key={lesson.slug}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold transition-all flex items-center justify-between cursor-pointer ${idx === 0 ? 'bg-blue-600/90 text-white shadow-lg shadow-blue-900/50 border border-blue-400/30' : 'text-gray-400 hover:bg-slate-700 hover:text-blue-300 border border-transparent'}`}
                    >
                      <span className="truncate mr-2">
                        0{idx + 1}. {lesson.title}
                      </span>
                      {idx === 0 && (
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                      )}
                    </div>
                  ))}

                  {/* Locked Items Mock */}
                  <div className="pt-4 mt-4 border-t border-gray-700/50 opacity-50">
                    <div className="w-full text-left px-4 py-2 text-xs font-medium text-gray-500 flex items-center gap-2 cursor-not-allowed">
                      <span>🔒</span> Check Your Understanding
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9">
              <MechanicaCard
                variant="mechanical"
                animated
                className="min-h-[600px] flex flex-col relative overflow-hidden border-blue-500/30 shadow-2xl shadow-blue-900/10"
              >
                {/* Content Header */}
                <div className="p-8 border-b border-white/5 bg-gradient-to-r from-slate-800 to-slate-900">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <span className="inline-block px-2 py-1 rounded bg-blue-900/50 border border-blue-500/30 text-[10px] font-black uppercase tracking-widest text-blue-300 mb-2">
                        Current Topic 01
                      </span>
                      <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-tight">
                        {currentModule.lessons[0].title}
                      </h1>
                    </div>
                    <div className="hidden sm:block">
                      <MechanicaGear size="md" color="steel" speed="slow" />
                    </div>
                  </div>
                </div>

                {/* Content Body - Placeholder for lesson content */}
                <div className="p-8 flex-grow bg-slate-900/50 relative">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg text-blue-100 leading-relaxed font-light mb-8">
                      {currentModule.lessons[0].summary}
                    </p>

                    <div className="my-8 p-6 bg-slate-800/80 rounded-xl border-l-4 border-amber-500 shadow-lg">
                      <h4 className="text-amber-400 font-bold uppercase text-xs tracking-widest mb-2 flex items-center gap-2">
                        <span className="text-lg">💡</span> Note
                      </h4>
                      <p className="text-gray-300 m-0 leading-relaxed">
                        This is where you'll learn the key concepts, one simple step at a time.
                      </p>
                    </div>

                    <h3 className="text-xl font-bold text-white mt-12 mb-4">
                      Getting Started
                    </h3>
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      We know starting out can feel overwhelming, but we'll break it down so it's easy to understand.
                    </p>
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      Take your time. There's no rush, and you're in a safe place to learn.
                    </p>
                  </div>

                  {/* Completion Action */}
                  <div className="mt-16 flex justify-end pt-8 border-t border-white/5">
                    <MechanicaButton
                      variant="mechanical"
                      size="lg"
                      className="shadow-xl shadow-blue-500/20 w-full sm:w-auto justify-center"
                      href="/learning-hub"
                    >
                      Finish Topic & Return
                    </MechanicaButton>
                  </div>
                </div>
              </MechanicaCard>
            </div>
          </div>
        </div>
      </div>
    </MechanicaLayout>
  );
}
